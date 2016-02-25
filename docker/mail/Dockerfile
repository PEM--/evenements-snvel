FROM alpine:3.3

# Bind
RUN apk --update add postfix

# SMTP ports
EXPOSE  25
EXPOSE  587

# IMAP ports
EXPOSE  143
EXPOSE  993

# POP3 ports
EXPOSE  110
EXPOSE  995


# Start-mailserver script
ADD start-mailserver.sh /usr/local/bin/start-mailserver.sh
RUN chmod +x /usr/local/bin/start-mailserver.sh
CMD /usr/local/bin/start-mailserver.sh

# EXPOSE 53
# RUN mkdir -p /etc/bind/zones
# COPY named.conf /etc/bind
# COPY db.pem.paris /etc/bind/zones
# COPY db.192.168 /etc/bind/zones

#CMD ["named", "-c", "/etc/bind/named.conf", "-g", "-u", "named"]
# CMD ["named", "-c", "/etc/bind/named.conf", "-g"]
