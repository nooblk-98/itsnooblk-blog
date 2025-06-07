---
title: 🌐 Production-ready PHP Docker Image with Nginx 
published: 2025-06-07
description: 'Production-ready PHP Docker setup with Nginx and Linux-based containers..'
image: 'https://craftech.io/wp-content/uploads/2021/07/Craftech_post_mayo_01-1.jpg'
tags: [Docker, Release, Linux]
category: 'Release'

draft: false 
lang: 'en'
---

# 🚀 Secure and Lightweight PHP Production Stack with Docker (PHP-FPM + Nginx)

Deploying modern PHP applications like **WordPress**, **Laravel**, or custom stacks requires a secure, fast, and production-grade infrastructure. That's where the `php-production-stack` comes in — a **Docker-based, production-ready PHP-FPM + Nginx container** built on Alpine Linux. This stack is optimized for performance, portability, and real-world deployment scenarios.

---

## ⚙️ Why Use This Stack?

Whether you're deploying on AWS, a VPS, or locally on M1/M2 Macs, this image supports both **ARM64 and AMD64 architectures**, ensuring wide compatibility. It includes all the essential PHP extensions, a secure Nginx configuration, and a lightweight Alpine base.

---

## 🧱 Stack Components Overview

* **PHP 8.2 (FPM)** with extensive extension support
* **Nginx** optimized for HTTP/1.1, Gzip compression, and static caching
* **Multi-arch** support: Apple Silicon, AWS Graviton, Intel
* **Custom entrypoint** to supervise PHP-FPM and Nginx
* **Logs** are Docker-native: routed to `stdout` and `stderr`
* **Security**: runs as a non-root user with minimal permissions

---

## 📁 Default Directory Structure

```bash
/var/www/html             # Default document root
```

For Laravel-style projects, you can switch to `/var/www/html/public` easily by adjusting the Nginx config.

---
### ✅ Extensions Installed by Default

* `pdo`, `pdo_mysql`, `mysqli`, `mbstring`, `curl`, `json`, `xml`
* `fileinfo`, `dom`, `phar`, `iconv`, `zip`, `tokenizer`
* `simplexml`, `intl`, `exif`, `soap`, `bcmath`
* `gd`, `imagick`, `opcache`, `redis`, `xdebug`

Need more? Add custom extensions in your Dockerfile:

```dockerfile
RUN install-php-extensions pcntl zip imagick
```

---

## 🚀 Getting Started

### 🔹 Pull the Prebuilt Image

```bash
docker pull ghcr.io/nooblk-98/php-docker-nginx:php82
```

### 🔹 Run the Container

```bash
docker run -d -p 80:80 ghcr.io/nooblk-98/php-docker-nginx:php82
```

Mount your local project:

```bash
docker run -d -p 80:80 -v $(pwd):/var/www/html ghcr.io/nooblk-98/php-docker-nginx:php82
```

### 🔹 Use as a Base Image

```Dockerfile
FROM ghcr.io/nooblk-98/php-docker-nginx:php82
COPY . /var/www/html
```

---

## 🔧 Configuration Details

### ✅ Nginx Config

Path: `/etc/nginx/nginx.conf`
To set Laravel's `/public` as root:

```bash
RUN sed -i 's|root /var/www/html;|root /var/www/html/public;|' /etc/nginx/nginx.conf
```

### ✅ Entrypoint Script

```sh
#!/bin/sh
echo "Starting PHP-FPM..."
php-fpm -D

echo "Starting Nginx..."
exec nginx -g "daemon off;"
```

---

## 🧪 Build from Source

```bash
docker build -t wp-production-stack .
docker run -d -p 80:80 wp-production-stack
```

---

## 🔐 Why This Stack is Production-Ready

* ✅ **Alpine Linux** for a minimal footprint
* ✅ **Non-root** execution for security
* ✅ **Opcache**, **Gzip**, and **Redis** support
* ✅ **Scalable** in Dockerized environments
* ✅ **Multi-arch** support (ARM + AMD)
---

### 🔧 For more details visit my repository source in github
---

::github{repo="nooblk-98/php-docker-nginx"}

---