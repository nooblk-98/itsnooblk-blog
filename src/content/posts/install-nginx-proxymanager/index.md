---
title: 🐳 Nginx Proxy Manager Installation Guide
published: 2025-05-23
description: 'Nginx Proxy Manager is a powerful and easy-to-use tool to manage your Nginx reverse proxy with a simple web-based UI. This guide will walk you through installing it using Docker Compose..'
image: 'https://imgix.datadoghq.com/img/blog/monitor-docker-datadog/22.png?auto=compress%2Cformat&cs=origin&lossless=true&fit=max&q=75&w=1400&dpr=1'
tags: [Linux, Docker]
category: 'Selfhosted'
draft: false 
lang: 'en'
---

Here’s a clean and professional `README.md` guide to install **Nginx Proxy Manager** using Docker Compose:

---
## 📦 Requirements

- Docker installed  
- Docker Compose installed  
  👉 [Install Docker & Docker Compose](http://itsnooblk.com/posts/install-docker/)
- Linux-based system or WSL (Windows Subsystem for Linux)  



## ⚙️ Step-by-Step Setup

### 1. Create a Project Directory

```bash
mkdir nginx-proxy-manager && cd nginx-proxy-manager
```

### 2. Create `docker network` for external connectivity for other containers

```bash
docker network create nginx
```

### 3. Create `docker-compose.yml`

```bash
nano docker-compose.yml
```

Paste the following configuration:

```yaml
version: '3'
services:
  app:
    image: 'jc21/nginx-proxy-manager:latest'
    restart: always
    ports:
      - '80:80'      # Public HTTP Port
      - '81:81'      # Admin Web UI
      - '443:443'    # Public HTTPS Port
    environment:
      DB_SQLITE_FILE: "/data/database.sqlite"
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
networks:
  nginx:
    external: true
```

> 💡 You can change ports `80`, `81`, and `443` to avoid conflicts with other services.

### 3. Start the Services

```bash
docker compose up -d
```

Check if the containers are running:

```bash
docker ps
```

### 4. Access the Web Interface

Open your browser and go to:

```
http://<your-server-ip>:81
```

### 5. Default Credentials

* **Email:** `admin@example.com`
* **Password:** `changeme`

> 🔒 Be sure to update your login credentials after first login.


<img src="/images/screen1.png" 
     alt="Nginx Proxy Manager UI" 
     style="border-radius: 12px; max-width: 100%; height: auto;" />


---