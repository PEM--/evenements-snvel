FROM alpine:3.3

RUN apk add --update \
  ruby \
  ruby-dev \
  ruby-io-console \
  ruby-json \
  ruby-bigdecimal \
  bash \
  sqlite \
  sqlite-dev \
  openssl-dev \
  build-base \
  && gem install mailcatcher json --no-rdoc --no-ri \
  && apk del --update build-base openssl-dev ruby-dev \
  && apk add --update libstdc++ \
  && rm -rf /var/cache/apk/*

# SMTP
EXPOSE 25

# Webserver
EXPOSE 8080

CMD ["mailcatcher", "-f", "--ip=0.0.0.0"]
