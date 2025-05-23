---
title: 🌐 SSL with Certbot (Let's Encrypt)
published: 2025-05-22
description: 'Secure your Nginx server using Certbot and automatically configure HTTPS with Let’s Encrypt. Includes Docker reverse proxy setup and auto-renewal.'
image: 'https://letsencrypt.org/images/LetsEncrypt-SocialShare.png'
tags: [Nginx, SSL, Let's Encrypt, webservers, Apache]
category: 'Webservers'
draft: false
lang: 'en'
---



## 🌐 1. Install Web Server and Certbot

### For Nginx:

```bash
sudo apt update && sudo apt install nginx -y
sudo apt install nginx certbot python3-certbot-nginx -y
````

### For Apache:

```bash
sudo apt update && sudo apt install apache2 -y
sudo apt install apache2 certbot python3-certbot-apache -y
```


## ⚙️ 2. Configure Virtual Host

Nginx: Create Site Config

```bash
sudo nano /etc/nginx/sites-available/example.com.conf
```

Paste:

```nginx
server {
    listen 80;
    server_name example.com www.example.com;

    location / {
        proxy_pass http://127.0.0.1:8080;  # Your backend app
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Connection "";
    }
}
```

Enable and test config:

```bash
sudo ln -s /etc/nginx/sites-available/example.com.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

Apache: Create Site Config

```bash
sudo nano /etc/apache2/sites-available/example.com.conf
```

Paste:

```apache
<VirtualHost *:80>
    ServerName example.com
    ServerAlias www.example.com

    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:8080/
    ProxyPassReverse / http://127.0.0.1:8080/

    ErrorLog ${APACHE_LOG_DIR}/example_error.log
    CustomLog ${APACHE_LOG_DIR}/example_access.log combined
</VirtualHost>
```

Enable site and required modules:

```bash
sudo a2ensite example.com.conf
sudo a2enmod proxy proxy_http
sudo systemctl reload apache2
```

---

## 🔐 3. Obtain Let's Encrypt SSL Certificate

### For Nginx:

```bash
sudo certbot --nginx -d example.com -d www.example.com
```

### For Apache:

```bash
sudo certbot --apache -d example.com -d www.example.com
```

Certbot will automatically update your config to use HTTPS.

---

## 4. Enable Auto-Renewal

Certbot typically sets this up automatically. Confirm with:

```bash
sudo systemctl list-timers | grep certbot
```

### Test renewal manually:

```bash
sudo certbot renew --dry-run
```

### Set up custom cron (if needed):

```bash
sudo crontab -e
```

Add:

```cron
0 3 * * * certbot renew --quiet --deploy-hook "systemctl reload nginx"
```
for Apache
```cron
0 3 * * * certbot renew --quiet --deploy-hook "systemctl reload apache2"
```

This runs daily at 3 AM and reloads the web server if certificates are renewed.

---


