FROM php:8.2-apache
# Habilitamos CORS y reescritura de URL si fuera necesario
RUN a2enmod rewrite
# Instalamos extensiones necesarias para cURL (Reddit API)
RUN apt-get update && apt-get install -y libcurl4-openssl-dev pkg-config libssl-dev