FROM alpine:latest

# Install Nginx, PHP 8.3, and Supervisor
RUN apk add --no-cache \
    nginx \
    php83 \
    php83-fpm \
    php83-mysqli \
    php83-pdo \
    php83-pdo_mysql \
    php83-session \
    php83-opcache \
    php83-curl \
    php83-mbstring \
    php83-json \
    php83-xml \
    php83-fileinfo \
    php83-zlib \
    supervisor \
    unzip \
    wget

# Clean default content and copy app
RUN rm -rf /var/www/localhost/htdocs/*
COPY . /var/www/localhost/htdocs/

# Download PHPMailer into vendor directory (AFTER app copy)
RUN mkdir -p /var/www/localhost/htdocs/vendor/phpmailer && \
    wget -O /tmp/phpmailer.zip https://github.com/PHPMailer/PHPMailer/archive/refs/heads/master.zip && \
    unzip /tmp/phpmailer.zip -d /tmp && \
    cp -r /tmp/PHPMailer-master/src/* /var/www/localhost/htdocs/vendor/phpmailer/ && \
    rm -rf /tmp/phpmailer.zip /tmp/PHPMailer-master

# Copy config files
COPY nginx.conf /etc/nginx/http.d/default.conf
COPY supervisord.conf /etc/supervisord.conf

# Configure PHP-FPM to expose environment variables to PHP scripts
RUN sed -i 's/^;*clear_env\s*=.*/clear_env = no/' /etc/php83/php-fpm.d/www.conf && \
    echo "env[BASE_URL] = \$BASE_URL" >> /etc/php83/php-fpm.d/www.conf && \
    echo "env[DB_HOST] = \$DB_HOST" >> /etc/php83/php-fpm.d/www.conf && \
    echo "env[DB_NAME] = \$DB_NAME" >> /etc/php83/php-fpm.d/www.conf && \
    echo "env[DB_USER] = \$DB_USER" >> /etc/php83/php-fpm.d/www.conf && \
    echo "env[DB_PASSWORD] = \$DB_PASSWORD" >> /etc/php83/php-fpm.d/www.conf

RUN sed -i 's/^upload_max_filesize.*/upload_max_filesize = 25M/' /etc/php83/php.ini && \
sed -i 's/^post_max_size.*/post_max_size = 25M/' /etc/php83/php.ini

    
# Set proper ownership and permissions for PHP files
RUN chown -R nobody:nobody /var/www/localhost/htdocs && \
    find /var/www/localhost/htdocs -type d -exec chmod 755 {} \; && \
    find /var/www/localhost/htdocs -type f -exec chmod 644 {} \;

EXPOSE 80

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
