#!/bin/bash

# Update APT sources
sudo apt-get update
sudo apt-get install apt-transport-https ca-certificates -y
sudo sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
echo "deb https://apt.dockerproject.org/repo ubuntu-trusty main" | sudo tee /etc/apt/sources.list.d/docker.list
sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt-get purge -y lxc-docker
sudo apt-cache policy docker-engine

# Update Kernel and 14.04 prerequisites
sudo apt-get update
sudo apt-get install -y linux-image-extra-$(uname -r)
sudo apt-get install -y apparmor

# Install Docker
sudo apt-get install -y docker-engine
sudo service docker start

# Overriding bad Systemd default in Docker startup script
# sudo mkdir -p /etc/systemd/system/docker.service.d
# echo -e '[Service]\n# workaround to include default options\nEnvironmentFile=-/etc/default/docker\nExecStart=\nExecStart=/usr/bin/docker -d -H fd:// $DOCKER_OPTS' | sudo tee /etc/systemd/system/docker.service.d/ubuntu.conf
# Set Docker daemon with the following properties:
# * Daemon listen to external request and is exposed on port 2376, the default Docker port.
# * Docker uses the AUFS driver for file storage.
# * Daemon uses Docker's provided certification chain.
# * Dameon has a generic label.
# * Daemon is able to resolve DNS query using Google's DNS.
sudo mkdir -p /etc/default
echo 'DOCKER_OPTS="-H tcp://0.0.0.0:2376 -H unix:///var/run/docker.sock --storage-driver aufs --tlsverify --tlscacert /etc/docker/ca.pem --tlscert /etc/docker/server.pem --tlskey /etc/docker/server-key.pem --label provider=generic --dns 8.8.8.8 --dns 8.8.4.4"'  | sudo tee /etc/default/docker
# sudo systemctl daemon-reload
# sudo systemctl restart docker
sudo service docker restart
# Enable Docker on server reboot
# sudo systemctl enable docker
# Remove and clean unused packages
sudo apt-get autoremove -y
sudo apt-get autoclean -y
