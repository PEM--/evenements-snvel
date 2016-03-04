FROM alpine:3.3

# Postfix & system update
#RUN apk --update add openrc postfix rsyslog
RUN apk --update add openrc postfix
#COPY postfix/mailname /etc
COPY postfix/main.cf /etc/postfix
#COPY postfix/master.cf /etc/postfix
# COPY postfix/aliases /etc/postfix
# RUN postmap /etc/postfix/aliases
#COPY postfix/generic /etc/postfix
#RUN postmap /etc/postfix/generic
#COPY postfix/virtual /etc/postfix
#RUN postmap /etc/postfix/virtual
#COPY postfix/header_checks /etc/postfix
COPY postfix/sasl_passwd /etc/postfix
RUN postmap /etc/postfix/sasl_passwd
RUN rc-update add postfix
#RUN rc-update add rsyslog
#RUN rc-update del hwclock
#RUN rc-update del hwdrivers
COPY rsyslog/rsyslog.conf /etc
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
#EXPOSE  587

# Cleanup and remove build tools
# RUN apk del openssl
# RUN rm -rf /var/cache/apk/*

# Start up script
#ADD start-mail.sh /usr/local/bin/start-mail.sh
#RUN chmod +x /usr/local/bin/start-mail.sh

#CMD ["/usr/local/bin/start-mail.sh"]

CMD ["/sbin/init"]
