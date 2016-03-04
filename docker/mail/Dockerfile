FROM alpine:3.3
MAINTAINER Pierre-Eric Marchandet <pemarchandet@gmail.com>

# Postfix & system update
RUN apk --update add openrc postfix
COPY postfix/main.cf /etc/postfix
COPY postfix/sasl_passwd /etc/postfix
RUN postmap /etc/postfix/sasl_passwd
RUN rc-update add postfix
COPY openrc/rc.conf /etc

USER root

# can't get ttys unless you run the container in privileged mode
RUN sed -i '/tty/d' /etc/inittab &&\
# can't set hostname since docker sets it
    sed -i 's/hostname $opts/# hostname $opts/g' /etc/init.d/hostname &&\
# can't mount tmpfs since not privileged
    sed -i 's/mount -t tmpfs/# mount -t tmpfs/g' /lib/rc/sh/init.sh &&\
# no need for mounting proc file system
    sed -i 's/mountproc=true/mountproc=false/g' /lib/rc/sh/init.sh &&\
# can't do cgroups
    sed -i 's/cgroup_add_service /# cgroup_add_service /g' /lib/rc/sh/openrc-run.sh

# SMTP ports
EXPOSE  25

# Cleanup and remove build tools
RUN rm -rf /var/cache/apk/*

CMD ["/sbin/init"]
