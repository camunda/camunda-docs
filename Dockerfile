# For local development purposes only

FROM httpd:alpine

RUN rm -r /usr/local/apache2/htdocs/*
COPY /build /usr/local/apache2/htdocs/0.25/

# Remove SSL requirement
RUN sed -i \
        '/SERVER_PORT/d;/SERVER_NAME/d' \
        /usr/local/apache2/htdocs/0.25/.htaccess

# Enable the rewrite module
RUN sed -i \
        -e 's/^#\(LoadModule .*mod_rewrite.so\)/\1/' \
        /usr/local/apache2/conf/httpd.conf

# Enable rewrites
RUN sed -i '/<Directory "\/usr\/local\/apache2\/htdocs">/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /usr/local/apache2/conf/httpd.conf
