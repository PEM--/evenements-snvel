FROM alpine:3.3

# Build tools & ruby
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
  build-base

# Mailcatcher
RUN gem install mailcatcher json --no-rdoc --no-ri
RUN apk add --update libstdc++

# Cleanup and remove build tools
RUN apk del --update build-base openssl-dev ruby-dev bash
RUN rm -rf /var/cache/apk/*

# SMTP
EXPOSE 1025
# Webserver
EXPOSE 1080

CMD ["mailcatcher", "-f", "--ip=0.0.0.0"]
