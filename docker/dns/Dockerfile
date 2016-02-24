FROM alpine:latest

# Bind
RUN apk --update add bind
EXPOSE 53
RUN mkdir -p /etc/bind/zones
COPY named.conf /etc/bind
COPY db.nic.pem.paris /etc/bind/zones
COPY db.192.168 /etc/bind/zones

RUN touch /var/bind/test

#CMD ["named", "-c", "/etc/bind/named.conf", "-g", "-u", "named"]
CMD ["named", "-c", "/etc/bind/named.conf", "-4", "-g"]
