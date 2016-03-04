# Development environment
## Debian 8 & Docker
```sh
vagrant up dev
. local_env.sh
dm -D create -d generic --generic-ip-address $HOST_IP_DEV --generic-ssh-user root --generic-ssh-key ~/.ssh/id_rsa  dev
# Using fish
eval (dm env dev)
```

> **Aliases**
  + dm => docker-machine
  + d => docker
  + di => docker-image

## DNS (Bind9)
### Build
```sh
dc build dns; dc up -d dns; ssh root@$HOST_IP_DEV 'sed -i -e "s/10.0.2.3/192.168.1.50/" /etc/resolv.conf'
```

### test
```sh
host dev.pem.paris 192.168.1.50
```

## Mail
### Build
```sh
dc build mail; dc up -d mail
```

### Run a temporary container
```sh
d run --name mail -P -ti --rm docker_mail /bin/sh
```

### Attaching a session to a running container
```sh
d exec -ti docker_mail_1 sh
```

### Test mails
```sh
swaks -s 192.168.1.50 -p 25 -t test1@gmail.com -f test2@gmail.com
```

# Production
+ ufw
+ fail2ban
* dkim
* spf
* dmarc
