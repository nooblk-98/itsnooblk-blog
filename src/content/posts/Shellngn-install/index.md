---
title: 🐳 ShellNGN Web SSH client Docker Installation Guide
published: 2025-05-23
description: 'ShellNGN is a web-based SSH and SFTP client designed for managing servers with ease. This guide covers installation using Docker.'
image: '/images/screen4.png'
tags: [Docker, DevOps, SSH]
category: 'Selfhosted'
draft: false
lang: 'en'
---

## 🛡️ Benefits of Using ShellNGN

* ✅ **Web-Based Interface** – No need for terminal software. Access servers from any browser.
* ✅ **Multi-Protocol Support** – SSH, SFTP, RDP, VNC in one interface.
* ✅ **Tabbed Sessions** – Manage multiple servers simultaneously with ease.
* ✅ **Team Access** – Role-based access control for secure collaboration.
* ✅ **Built-in Terminal Themes** – Customize your experience visually.
* ✅ **Docker Friendly** – Easy to deploy in any environment.

> 🚀 ShellNGN is ideal for DevOps, sysadmins, and teams managing multiple environments.

---

## 📦 Requirements

- Docker installed  
- Docker Compose installed  
  👉 [Install Docker & Docker Compose](http://itsnooblk.com/posts/install-docker/)
- Linux-based system or WSL (Windows Subsystem for Linux)  

---

## ⚙️ Step-by-Step Setup

### 1. Create a Project Directory

```bash
mkdir shellngn && cd shellngn
````

### 2. Create a Docker Compose File

```bash
nano docker-compose.yml
```

Paste the following configuration:

```yaml
version: "3.3"

services:
  shellngn:
    platform: linux/amd64
    container_name: shellngn-pro
    image: shellngn/pro:latest
    ports:
      - "8070:8080"
    networks:
      - nginx
    environment:
      - HOST=0.0.0.0
    restart: always
networks:
  nginx:
    external: true
```

> 💡 You can change the `8070` host port to avoid conflicts if needed.

### 3. Start the ShellNGN Container

```bash
docker compose up -d
```

Verify the container is running:

```bash
docker ps
```

:::NOTE
Also, we added the Docker network nginx for the container. This allows you to connect this application with your Nginx Proxy Manager instance running on the same server and network.
🔧 [Nginx Proxy Manager Installation](https://itsnooblk.com/posts/install-nginx-proxymanager/)
:::
---

## 🌐 Access ShellNGN Web UI

Open your browser and go to:

```
http://<your-server-ip>:8070
```

<img src="/images/screen5.png" 
  alt="ShellNGN Web UI" 
  style="border-radius: 12px; max-width: 100%; height: auto; border: 2px solid black;" />

---

## 🔐 Security Note

Ensure only trusted users have access to the ShellNGN port. Use a reverse proxy with HTTPS for added security.

```bash
sudo ufw allow 8070/tcp
```

Or route through **Nginx Proxy Manager** for SSL & authentication.

<img src="/images/screen6.png" 
  alt="ProxyManager Web UI" 
  style="border-radius: 12px; max-width: 100%; height: auto; border: 2px solid black;" />

---

## 🧼 Stopping & Removing

To stop:

```bash
docker compose down
```

To remove all data:

```bash
docker system prune -a --volumes
```

---

