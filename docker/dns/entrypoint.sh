#!/bin/sh
rm -rf /var/bind/*
named -c /etc/bind/named.conf -g
