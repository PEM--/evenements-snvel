FROM mhart/alpine-node:0.10

RUN apk add --no-cache make gcc g++ python

WORKDIR /src
ADD . .

RUN npm -g install Haraka
RUN haraka -i /etc/haraka
COPY ./host_list /etc/haraka/config/host_list
COPY ./loglevel /etc/haraka/config/loglevel
COPY ./smtp.ini /etc/haraka/config/smtp.ini

# SMTP ports
EXPOSE  25
EXPOSE  587

# IMAP ports
# EXPOSE  143
# EXPOSE  993

# Cleanup and remove build tools
# RUN apk del openssl make gcc g++ python
# RUN rm -rf /var/cache/apk/*

CMD ["/usr/bin/haraka", "-c", "/etc/haraka"]
