FROM alpine:3.3

# OpenRC & system update
# RUN apk --update add openrc
# Postfix
RUN apk --update add postfix
COPY postfix/mailname /etc
COPY postfix/main.cf /etc/postfix
COPY postfix/aliases /etc/postfix
RUN postmap /etc/postfix/aliases
COPY postfix/generic /etc/postfix
RUN postmap /etc/postfix/generic
COPY postfix/virtual /etc/postfix
RUN postmap /etc/postfix/virtual
COPY postfix/sasl_passwd /etc/postfix

# OpenSSL
RUN apk add openssl
RUN mkdir -p /etc/ssl
RUN openssl req -nodes -new -x509 -keyout /etc/ssl/private/server.key -out /etc/ssl/certs/server.crt -subj "/C=FR/ST=Paris/L=Paris/CN=$(cat /etc/mailname)"
RUN echo | openssl pkcs12 -nodes -password stdin -export -in /etc/ssl/certs/server.crt -inkey /etc/ssl/private/server.key -out /etc/ssl/certificate.pfx
RUN echo | openssl pkcs12 -nodes -password stdin -export -in /etc/ssl/certs/server.crt -inkey /etc/ssl/private/server.key -out /etc/ssl/certificate.pfx
RUN echo | openssl pkcs12 -nodes -password stdin -cacerts -in /etc/ssl/certificate.pfx  -out /etc/ssl/certs/ca-crt.pem
RUN echo | openssl pkcs12 -nodes -password stdin -in /etc/ssl/certificate.pfx -out /etc/ssl/certs/server.pem

# Dovecot
# RUN apk add dovecot
# RUN mkdir /var/spool/postfix/vhosts
# RUN addgroup vmail
# RUN chown vmail:vmail /var/spool/postfix/vhosts

# SMTP ports
EXPOSE  25
EXPOSE  587

# IMAP ports
# EXPOSE  143
# EXPOSE  993

# Prepare volumes
RUN mkdir -p /tmp/postfix
RUN mkdir -p /tmp/spamassassin

# Cleanup and remove build tools
# RUN apk del openssl
# RUN rm -rf /var/cache/apk/*

# Start up script
ADD start-mail.sh /usr/local/bin/start-mail.sh
RUN chmod +x /usr/local/bin/start-mail.sh

CMD /usr/local/bin/start-mail.sh
