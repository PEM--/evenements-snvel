hosts = {
  "dev" => "192.168.1.50",
  "pre" => "192.168.1.51"
}

Vagrant.configure(2) do |config|
  # config.vm.box = "ubuntu/trusty64"
  config.vm.box = "debian/jessie64"
  config.ssh.insert_key = false
  hosts.each do |name, ip|
    config.vm.define name do |conf|
      conf.vm.hostname = "%s" % name
      # conf.vm.network "private_network", ip: ip
      conf.vm.network "public_network", bridge: "en0: Wi-Fi (AirPort)", ip: ip
      conf.ssh.forward_agent = true
      conf.vm.synced_folder ENV['HOME'] + '/.ssh', "/vagrant", create: true
      conf.vm.provider "virtualbox" do |v|
        v.name = name
        # Set the timesync threshold to 10 seconds, instead of the default 20 minutes.
        v.customize ["guestproperty", "set", :id, "/VirtualBox/GuestAdd/VBoxService/--timesync-set-threshold", 10000]
      end
      conf.vm.provision "shell", path: "provisioning.sh"
    end
  end
end
