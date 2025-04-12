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

EXPOSE 80

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
