# Development environment
## Debian 8 & Docker
```sh
vagrant up dev
dm -D create -d generic --generic-ip-address $HOST_IP_DEV --generic-ssh-user root --generic-ssh-key ~/.ssh/id_rsa  dev
```

Set the appropriate docker machine:
```sh
# Using fish
eval (dm env dev)
```

> **Aliases**
  + dm => docker-machine
  + d => docker
  + di => docker-image

## DNS (Bind9)
```sh
dc stop dns; dc build dns; dc up -d dns
ssh root@host.pem.paris 'sed -i -e "s/10.0.2.3/192.168.1.50/" /etc/resolv.conf'
```

# Production
+ ufw
+ fail2ban
* dkim
* spf
* dmarc
