#!/bin/bash

# Update Kernel and 14.04 prerequisites
sudo apt-get update
sudo apt-get upgrade -y
# Remove and clean unused packages
sudo apt-get autoremove -y
sudo apt-get autoclean -y

# Set volumes
mkdir /var/bind
