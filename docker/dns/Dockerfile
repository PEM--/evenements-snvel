FROM alpine:latest

# Bind
RUN apk --update add bind
EXPOSE 53
RUN mkdir -p /etc/bind/zones
COPY named.conf /etc/bind
COPY db.pem.paris /etc/bind/zones
COPY db.192.168 /etc/bind/zones

CMD ["named", "-c", "/etc/bind/named.conf", "-g", "-u", "named"]
