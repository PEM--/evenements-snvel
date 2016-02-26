FROM alpine:3.3

# Bind
RUN apk --update add bind

RUN mkdir -p /etc/bind/zones
COPY named.conf /etc/bind
COPY db.pem.paris /etc/bind/zones
COPY db.192.168 /etc/bind/zones

# Cleanup and remove build tools
RUN rm -rf /var/cache/apk/*

# DNS
EXPOSE 53

# Start Bind
COPY ./entrypoint.sh /usr/bin/entrypoint.sh
RUN chmod ugo+x /usr/bin/entrypoint.sh
CMD /usr/bin/entrypoint.sh
