FROM alpine:latest

# Install services
RUN apk add --no-cache \
    nginx \
    php83 \
    php83-fpm \
    php83-mysqli \
    php83-session \
    php83-opcache \
    php83-curl \
    php83-mbstring \
    php83-json \
    php83-xml \
    php83-fileinfo \
    php83-zlib \
    mariadb \
    mariadb-client \
    supervisor \
    bash

# Create folders and set permissions
RUN mkdir -p /run/mysqld /var/lib/mysql /var/www/localhost/htdocs \
    && chown -R mysql:mysql /run/mysqld /var/lib/mysql

# Initialize MariaDB data directory
RUN mysql_install_db --user=mysql --basedir=/usr --datadir=/var/lib/mysql

# Copy init SQL + app + configs
COPY init-db.sql /docker-entrypoint-initdb.d/init-db.sql
COPY . /var/www/localhost/htdocs/
COPY nginx.conf /etc/nginx/http.d/default.conf
COPY supervisord.conf /etc/supervisord.conf

# Environment variables (can override on `docker run`)
ENV MYSQL_ROOT_PASSWORD=root \
    MYSQL_DATABASE=newsdb \
    MYSQL_USER=newsuser \
    MYSQL_PASSWORD=newspass

# Expose HTTP
EXPOSE 80

# Start services
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
