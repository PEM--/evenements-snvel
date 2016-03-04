FROM mhart/alpine-node:0.10
MAINTAINER Pierre-Eric Marchandet <pemarchandet@gmail.com>

RUN apk add --update make gcc g++ python


# Add PM2 for process management
RUN npm install -g pm2

# Import sources
COPY bundle /app

# Install Meteor's dependencies
WORKDIR /app
RUN (cd programs/server && npm install)

# Launch application
COPY startMeteor.sh /app/startMeteor.sh
CMD ["./startMeteor.sh"]
