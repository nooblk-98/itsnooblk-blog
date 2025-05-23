---
title: 🐳 Docker + Docker Compose Install Guide
published: 2025-05-23
description: 'Securely connect to servers or Git platforms using SSH by generating your own key pair on your local machine.'
image: 'https://imgix.datadoghq.com/img/blog/monitor-docker-datadog/22.png?auto=compress%2Cformat&cs=origin&lossless=true&fit=max&q=75&w=1400&dpr=1'
tags: [Linux, Docker]
category: 'Docker'
draft: false 
lang: ''
---

## ⚡ Option 1: Direct Install via Script

### ▶️ One-liner Installation

Run the following command to download and execute the installation script:

```bash
curl -O https://kingtam.win/usr/uploads/script/install-docker.sh && chmod +x install-docker.sh && sudo ./install-docker.sh
```

---

## 🛠️ Option 2: Quick Setup with `install-docker.sh`

### 📝 Save and Run the Script Locally

1. Create the script file:

   ```bash
   nano install-docker.sh
   ```

2. Paste the script content:

   ```bash
   #!/bin/bash
   set -e

   if [ -f /etc/os-release ]; then
       . /etc/os-release
   else
       echo "Unsupported distribution!"
       exit 1
   fi

   install_docker() {
       if [ "$ID" == "ubuntu" ] || [ "$ID" == "debian" ]; then
           apt-get update
           apt-get install -y apt-transport-https ca-certificates curl software-properties-common gnupg
           curl -fsSL https://download.docker.com/linux/$ID/gpg | apt-key add -
           add-apt-repository "deb [arch=$(dpkg --print-architecture)] https://download.docker.com/linux/$ID $(lsb_release -cs) stable"
           apt-get update
           apt-get install -y docker-ce
       elif [ "$ID" == "centos" ]; then
           yum install -y yum-utils device-mapper-persistent-data lvm2
           yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
           yum install -y docker-ce
           systemctl start docker
           systemctl enable docker
       elif [ "$ID" == "fedora" ]; then
           dnf -y install dnf-plugins-core
           dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
           dnf install -y docker-ce
           systemctl start docker
           systemctl enable docker
       else
           echo "Unsupported distribution!"
           exit 1
       fi
   }

   install_docker_compose() {
       COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/')
       curl -L "https://github.com/docker/compose/releases/download/${COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
       chmod +x /usr/local/bin/docker-compose
   }

   echo "Installing Docker on $PRETTY_NAME..."
   install_docker
   echo "✅ Docker installed successfully."

   echo "Installing Docker Compose..."
   install_docker_compose
   echo "✅ Docker Compose installed successfully."
   ```

3. Make the script executable and run:

   ```bash
   chmod +x install-docker.sh
   sudo ./install-docker.sh
   ```

---

## ⚙️ Option 3: Manual Installation Method

### 🐋 Install Docker

#### For Ubuntu / Debian:

```bash
sudo apt update
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common gnupg
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=$(dpkg --print-architecture)] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt update
sudo apt install -y docker-ce
```

#### For CentOS:

```bash
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install -y docker-ce
sudo systemctl start docker
sudo systemctl enable docker
```

#### For Fedora:

```bash
sudo dnf -y install dnf-plugins-core
sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
sudo dnf install -y docker-ce
sudo systemctl start docker
sudo systemctl enable docker
```

---

### 🧱 Install Docker Compose

```bash
COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/')
sudo curl -L "https://github.com/docker/compose/releases/download/${COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

---

### ✅ Verify Installation

```bash
docker --version
docker-compose --version
```

---

### 🔄 Uninstall Docker & Docker Compose (Optional)

```bash
# Remove Docker
sudo apt-get purge -y docker-ce || sudo yum remove -y docker-ce
sudo rm -rf /var/lib/docker

# Remove Docker Compose
sudo rm -f /usr/local/bin/docker-compose
```
