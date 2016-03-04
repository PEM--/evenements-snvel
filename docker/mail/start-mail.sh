#!/bin/sh
touch /var/log/mail.log
chown root:root -R /var/spool/postfix
#echo 'Launching Postfix'
#postfix -c /etc/postfix start
tail -f /var/log/mail.log

/sbin/init
