# Development environment
## Debian 8 & Docker
```sh
vagrant up dev
. local_env.sh
dm -D create -d generic --generic-ip-address $HOST_IP_DEV --generic-ssh-user root --generic-ssh-key ~/.ssh/id_rsa  dev
# Using fish
eval (dm env dev)
cd docker
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

### Test
```sh
host dev.pem.paris 192.168.1.50
```

### Synchronize date
```sh
service ntp stop; ntpdate 0.fr.pool.ntp.org; service ntp start
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
## Mongo
### Build
```sh
dc build mongo; dc up -d mongo
```

### Set the ReplicaSet
```sh
d exec -ti docker_mongo_1 mongo admin --quiet --eval "rs.initiate(); rs.conf();"
```

### Attaching a session to a running container
```sh
d exec -ti docker_mongo_1 mongo
```

## Meteor
### Import settings
```sh
scp ../app/settings.pre.json root@dev.pem.paris:/etc/meteor/settings.json
```

### Build
```sh
./build_meteor.sh
dc build meteor; dc up -d meteor
```

## NGinx
### Create self signed certs
```sh
ssh root@dev.pem.paris "mkdir -p /etc/certs; openssl req -nodes -new -x509 -keyout /etc/certs/server.key -out /etc/certs/server.crt -subj '/C=FR/ST=Paris/L=Paris/CN=pem.paris'"
```

### Build
```sh
dc build nginx; dc up -d nginx
```

# Production
+ ufw
+ fail2ban
* dkim
* spf
* dmarc
