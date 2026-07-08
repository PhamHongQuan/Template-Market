FROM php:8.4-fpm

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zip \
    curl \
    libzip-dev \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libicu-dev \
    libonig-dev \
    libxml2-dev

RUN docker-php-ext-install \
    pdo \
    pdo_mysql \
    mysqli \
    zip \
    intl \
    mbstring \
    exif

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html