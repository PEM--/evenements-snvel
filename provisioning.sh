#!/bin/bash

# Update system
apt-get update
apt-get upgrade -y
apt-get install mailutils -y
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
ufw allow ssh       # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw allow 2376/tcp  # Docker
ufw allow 53        # DNS
ufw allow 25        # SMTP
ufw allow 587       # SMTP over TLS
ufw allow 143       # IMAP2/4
ufw allow 993       # IMAP2/4 over TLS
sed -i -e "s/^DEFAULT_FORWARD_POLICY=\"DROP\"/DEFAULT_FORWARD_POLICY=\"ACCEPT\"/" /etc/default/ufw
yes | ufw enable
ufw reload
