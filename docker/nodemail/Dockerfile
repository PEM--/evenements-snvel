FROM mhart/alpine-node:0.10

RUN apk add --no-cache make gcc g++ python

WORKDIR /src
ADD . .

RUN npm -g install Haraka imapper
RUN haraka -i /etc/haraka
COPY ./host_list /etc/haraka/config/host_list
