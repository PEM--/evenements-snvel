#!/bin/bash

# Update system
apt-get update
apt-get upgrade -y
# Remove and clean unused packages
apt-get remove exim4
apt-get autoremove -y
apt-get autoclean -y
# Copy SSH keys
mkdir /root/.ssh
cp /vagrant/id_rsa.pub /root/.ssh/authorized_keys
sed -i -e "s/^#AuthorizedKeysFile/AuthorizedKeysFile/" /etc/ssh/sshd_config
# Set volumes
mkdir /var/bind
mkdir /var/spamassassin
mkdir /var/postfix
# Firewall
apt-get install ufw
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 2376/tcp
ufw allow 53
sed -i -e "s/^DEFAULT_FORWARD_POLICY=\"DROP\"/DEFAULT_FORWARD_POLICY=\"ACCEPT\"/" /etc/default/ufw
yes | ufw enable
ufw reload
