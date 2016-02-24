# Development environment
## Debian 8 & Docker
```sh
vagrant up dev
dm -D create -d generic --generic-ip-address $HOST_IP_DEV --generic-ssh-user vagrant --generic-ssh-key ~/.vagrant.d/insecure_private_key dev
```

Enable SSH keys in `/etc/ssh/sshd_config`:
```ini
AuthorizedKeysFile      %h/.ssh/authorized_keys
```

Copy your SSH key:
```sh
vagrant ssh
sudo bash
mkdir ~/.ssh
vi ~.ssh/authorized_keys
# Do the copy/paste of `cat ~/.ssh/id_rsa.pub`
service sshd restart
exit
exit
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

## Bind
```sh
docker pull resystit/bind9

/etc/default/bind9
OPTIONS="-4 -u bind"

/etc/bind/named.conf.options
acl "trusted" {
        10.128.10.11;    # ns1 - can be set to localhost
        10.128.20.12;    # ns2
        10.128.100.101;  # host1
        10.128.200.102;  # host2
};
options {
        directory "/var/cache/bind";

        recursion yes;                 # enables resursive queries
        allow-recursion { trusted; };  # allows recursive queries from "trusted" clients
        listen-on { 10.128.10.11; };   # ns1 private IP address - listen on private network only
        allow-transfer { none; };      # disable zone transfers by default

        forwarders {
                8.8.8.8;
                8.8.4.4;
        };
```

# Production
+ ufw
+ fail2ban
