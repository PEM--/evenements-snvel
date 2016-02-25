FROM alpine:3.3

# Bind
RUN apk --update add bind
RUN apk --update add openntpd
EXPOSE 53
RUN mkdir -p /etc/bind/zones
COPY named.conf /etc/bind
COPY db.pem.paris /etc/bind/zones
COPY db.192.168 /etc/bind/zones

COPY ./entrypoint.sh /usr/bin/entrypoint.sh
CMD /usr/bin/entrypoint.sh
