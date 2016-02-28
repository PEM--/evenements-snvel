FROM mhart/alpine-node:0.10

RUN apk add --no-cache make gcc g++ python

WORKDIR /src
ADD . .

RUN npm -g install
