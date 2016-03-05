FROM debian:jessie
MAINTAINER Pierre-Eric Marchandet <pemarchandet@gmail.com>

# Update system
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update && \
    apt-get upgrade -qq -y --no-install-recommends && \
    apt-get install -qq -y --no-install-recommends \
      # CURL
      ca-certificates curl wget \
      # SCM
      bzr git mercurial openssh-client subversion \
      # Build
      build-essential

ENV NODE_VERSION 0.10.43
RUN curl -sSLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz" && \
    tar -xzf "node-v$NODE_VERSION-linux-x64.tar.gz" -C /usr/local --strip-components=1 && \
    rm "node-v$NODE_VERSION-linux-x64.tar.gz"
RUN npm -g install npm@latest-2

# Add PM2 for process management
RUN npm i -g pm2

# Import sources
COPY bundle /app

# Install Meteor's dependencies
WORKDIR /app
RUN (cd programs/server && npm i)

# Cleanup and remove build tools
RUN apt-get remove -qq -y curl wget bzr git mercurial openssh-client subversion build-essential
RUN apt-get autoremove -qq -y && \
    apt-get autoclean -qq -y
RUN rm -rf /var/lib/apt/lists/*
RUN npm -g cache clear
RUN npm cache clear

# Launch application
COPY startMeteor.sh /app/startMeteor.sh
CMD ["./startMeteor.sh"]
