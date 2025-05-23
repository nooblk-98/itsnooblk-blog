---
title: 🌐 Nginx SSL with Certbot (Let's Encrypt)
published: 2025-05-22
description: 'Secure your Nginx server using Certbot and automatically configure HTTPS with Let’s Encrypt. Includes Docker reverse proxy setup and auto-renewal.'
image: 'https://letsencrypt.org/images/LetsEncrypt-SocialShare.png'
tags: [Nginx, SSL, Let's Encrypt, webservers]
category: 'Webservers'
draft: false
lang: 'en'
---


Install Nginx

```bash
sudo apt update && apt install nginx

````
Install certbot
```bash
sudo apt install nginx certbot python3-certbot-nginx -y
````
---

## ⚙️ 1. Create Nginx Configuration File

If you want to manually control the configuration, use the following:

```bash
sudo nano /etc/nginx/sites-available/example.com.conf
```

Paste this config:

```nginx
server {
   listen 80;
   server_name example.com www.example.com;
   location / {
       proxy_pass http://127.0.0.1:8080;  # Ensure the upstream matches your app setup
       proxy_http_version 1.1;
       proxy_set_header Host $host;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header X-Forwarded-Proto $scheme;
       proxy_set_header Connection "";
   }

}
```


## 🔐 2. Obtain Let's Encrypt SSL Certificate

Use Certbot with Nginx plugin to obtain a certificate for your domain:

```bash
sudo certbot --nginx -d example.com -d www.example.com
```
Enable the Nginx Site

```bash
sudo ln -s /etc/nginx/sites-available/example.com.conf /etc/nginx/sites-enabled/
```
Test and Reload Nginx

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🔐 3. Enable Auto-Renewal for SSL

Certbot automatically installs a cron job or systemd timer for renewal. Verify it:

```bash
sudo systemctl list-timers | grep certbot
```
Manual dry-run test:

```bash
sudo certbot renew --dry-run
```

If needed, you can manually add a cron job:

```bash
sudo crontab -e
```

Add the line:

```cron
0 3 * * * certbot renew --quiet --deploy-hook "systemctl reload nginx"
```

This will:

* Run `certbot renew` every day at 3:00 AM
* Reload Nginx if a certificate is renewed

---
