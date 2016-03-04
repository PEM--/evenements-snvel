# Adapted from: https://github.com/mvertes/docker-alpine-mongo
FROM alpine:edge
MAINTAINER Pierre-Eric Marchandet <pemarchandet@gmail.com>

RUN echo http://dl-4.alpinelinux.org/alpine/edge/testing >> /etc/apk/repositories
RUN apk add --no-cache mongodb
COPY mongod.conf /etc
COPY startMongo.sh /

# Cleanup and remove build tools
# RUN rm -rf /var/cache/apk/*

VOLUME /db
EXPOSE 27017

ENTRYPOINT [ "/startMongo.sh" ]
CMD ["mongod"]
