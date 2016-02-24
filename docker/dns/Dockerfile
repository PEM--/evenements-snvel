FROM alpine:latest

# Bind
RUN apk --update add bind
EXPOSE 53
RUN mkdir -p /etc/bind/zones
COPY named.conf /etc/bind
COPY db.nyc3.example.com /etc/bind/zones
COPY db.192.168 /etc/bind/zones

RUN touch /var/bind/test

# Webmin
# RUN apk add perl
# RUN mkdir -p /tmp
# RUN wget "http://prdownloads.sourceforge.net/webadmin/webmin-1.560.tar.gz" -P /tmp/
# tar xzvf /tmp/webmin-1.560.tar
# mv webmin-1.560 webmin
# cd webmin
# ./setup.sh
# EXPOSE 10000

#CMD ["named", "-c", "/etc/bind/named.conf", "-g", "-u", "named"]
CMD ["named", "-c", "/etc/bind/named.conf", "-4", "-g"]
