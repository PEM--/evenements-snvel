#!/bin/bash

# Update Kernel and 14.04 prerequisites
sudo apt-get update
sudo apt-get upgrade -y
# Remove and clean unused packages
sudo apt-get autoremove -y
sudo apt-get autoclean -y

# Copy SSH keys
mkdir /root/.ssh
cp /vagrant/id_rsa.pub /root/.ssh/authorized_keys
service restart sshd
sed -i -e "s/^#AuthorizedKeysFile/AuthorizedKeysFile/" /etc/ssh/sshd_config

# Set volumes
mkdir /var/bind
mkdir /var/spamassassin
mkdir /var/postfix
