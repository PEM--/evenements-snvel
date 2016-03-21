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

## VPS pre-installation
```sh
ssh root@evenements-snvel.fr "bash -s" < ../provisioning.sh
docker-machine -D create -d generic --generic-ip-address evenements-snvel.fr --generic-ssh-user root evenements-snvel.fr
ssh root@evenements-snvel.fr "rm -rf /var/db; mkdir /var/db; chmod go+w /var/db"
ssh root@evenements-snvel.fr "mkdir -p /etc/certs"
ssh root@evenements-snvel.fr "mkdir /etc/meteor"
scp ../app/settings.prod.json root@evenements-snvel.fr:/etc/meteor/settings.json
eval (dm env evenements-snvel.fr)
```

## New release
```sh
# Building
eval (dm env dev)
dc build mongo meteor nginx

# Pushing to hub
d tag docker_mongo pemarchandet/evenements-snvel-mongo:v1.0.0
d push pemarchandet/evenements-snvel-mongo:v1.0.0
d tag docker_mongo pemarchandet/evenements-snvel-mongo:latest
d push pemarchandet/evenements-snvel-mongo:latest

d tag docker_meteor pemarchandet/evenements-snvel-meteor:v1.1.0
d push pemarchandet/evenements-snvel-meteor:v1.1.0
d tag docker_meteor pemarchandet/evenements-snvel-meteor:latest
d push pemarchandet/evenements-snvel-meteor:latest

d tag docker_nginx pemarchandet/evenements-snvel-nginx:v1.1.0
d push pemarchandet/evenements-snvel-nginx:v1.1.0
d tag docker_nginx pemarchandet/evenements-snvel-nginx:latest
d push pemarchandet/evenements-snvel-nginx:latest

# Installing in production
eval (dm env evenements-snvel.fr)
dc -f dc-prod.yml pull
dc -f dc-prod.yml stop mongo meteor nginx
dc -f dc-prod.yml up -d mongo
# Only the first time
d exec -ti docker_mongo_1 mongo admin --quiet --eval "rs.initiate(); rs.conf();"
dc -f dc-prod.yml up -d meteor
dc -f dc-prod.yml up -d nginx
```

# Production
[X] ufw
[X] fail2ban
[ ] dkim
[ ] spf
[ ] dmarc

## IP du VPS
IPv4 : `51.255.194.65`

## Config DNS
```txt
$TTL 3600
@	IN SOA a.dns.gandi.net. hostmaster.gandi.net. (1455609547 10800 3600 604800 10800)
                                        IN NS     ns14.ovh.net.
                                        IN NS     dns14.ovh.net.
                                        IN A      51.255.194.65
                                        IN TXT    "1|www.evenements-snvel.fr"
                                        IN MX 1   mail.evenements-snvel.fr.
smtp                                    IN A      51.255.194.65
mail                                    IN A      51.255.194.65
smtp.evenements-snvel.fr                IN A      51.255.194.65
mail.evenements-snvel.fr                IN A      51.255.194.65
www                                     IN A      51.255.194.65
www                                     IN TXT    "3|welcome"
www                                     IN TXT    "l|fr"
```
