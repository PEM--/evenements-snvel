FROM alpine:3.3
MAINTAINER Pierre-Eric Marchandet <pemarchandet@gmail.com>

RUN apk --update add nginx

# Forward request and error logs to Docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

# Configuration files
COPY nginx.conf /etc/nginx/nginx.conf
COPY conf host-specific /etc/nginx/conf/

# Mount points for volumes
RUN mkdir -p /etc/certs /var/cache/nginx /var/tmp

# Source
# Raw source files exposed as HTTP and HTTPS
COPY raw /www/
# Project files exposed as HTTPS
COPY  bundle/programs/web.browser/*.js \
      bundle/programs/web.browser/*.css \
      bundle/programs/web.browser/app \
      /www/

# Ensure proper rights on static assets
# RUN groupadd -r www && \
#     useradd -r -g www www && \
#     chown -R www:www /www /var/cache /var/tmp

# Launch NGinx
COPY startNginx.sh /startNginx.sh
RUN chmod u+x /startNginx.sh
CMD ["/startNginx.sh"]

# Cleanup and remove build tools
# RUN rm -rf /var/cache/apk/*
