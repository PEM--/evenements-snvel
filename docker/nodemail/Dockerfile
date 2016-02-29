FROM mhart/alpine-node:0.10

RUN apk add --update make gcc g++ python

# Haraka
RUN npm i -g Haraka
RUN haraka -i /etc/haraka

# OpenSSL
RUN apk add openssl
ENV FQDN pem.paris
RUN openssl req -nodes -new -x509 -days 2190 -newkey rsa:2048 -keyout /etc/ssl/private/server.pem -out /etc/ssl/certs/server.pem -subj "/C=FR/ST=Paris/L=Paris/CN=$FQDN"

# Haraka configuration
RUN cp /etc/ssl/private/server.pem /etc/haraka/config/tls_key.pem
RUN cp /etc/ssl/certs/server.pem /etc/haraka/config/tls_cert.pem
COPY ./smtp.ini /etc/haraka/config/smtp.ini
COPY ./host_list /etc/haraka/config/host_list
COPY ./loglevel /etc/haraka/config/loglevel
COPY ./plugins /etc/haraka/config/plugins
COPY ./auth_flat_file.ini /etc/haraka/config/auth_flat_file.ini
COPY ./relay.ini /etc/haraka/config/relay.ini
COPY ./relay_acl_allow /etc/haraka/config/relay_acl_allow
COPY ./smtp_proxy.ini /etc/haraka/config/smtp_proxy.ini

# SMTP
# EXPOSE  25
# ESMTP (SMTP over SSL)
EXPOSE  587

# IMAP ports
# EXPOSE  143
# EXPOSE  993

# Cleanup and remove build tools
# RUN apk del openssl make gcc g++ python
# RUN rm -rf /var/cache/apk/*
# RUN rm -rf /tmp/fqdn

CMD ["/usr/bin/haraka", "-c", "/etc/haraka"]
