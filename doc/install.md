# Development environment
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
