#!/bin/sh
# Docker entrypoint (pid 1), run as root
[ "$1" = "mongod" ] || exec "$@" || exit $?

# Make sure that database is owned by user mongodb
[ "$(stat -c %U /db)" = mongodb ] || chown -R mongodb /db

# Drop root privilege (no way back), exec provided command as user mongodb
cmd=exec
for i; do cmd="$cmd '$i'"; done
exec su -s /bin/sh -c "$cmd -f /etc/mongod.conf" mongodb
