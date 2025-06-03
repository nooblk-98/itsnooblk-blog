---
title: 🌐 Cloudflare SSL with Nginx (Flexible)
published: 2025-05-21
description: 'Configure your server to work with Cloudflare in Flexible SSL mode using Nginx as a reverse proxy.'
image: 'https://weeblytutorials.com/wp-content/uploads/2018/01/Using-Weebly-with-CloudFlare.jpg'
tags: [Cloudflare, SSL, Webservers]
category: 'Webservers'
draft: false
lang: 'en'
---

## 📘 What is Flexible SSL?

**Flexible SSL** encrypts the connection between the visitor and Cloudflare, but not between Cloudflare and your origin server. Useful when your server lacks an SSL certificate.

⚠️ **Not recommended** for production environments handling sensitive data.

---

## ⚙️ 1. Configure Nginx for Flexible SSL

Edit your Nginx site configuration:

```bash
sudo nano /etc/nginx/sites-enabled/web.conf
````

Replace with the following configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:YOUR_APP_PORT;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
    }
}
```

🔁 Replace:

* `yourdomain.com` → your actual domain name
* `localhost:YOUR_APP_PORT` → the local port your app is running on (e.g. `localhost:3000`)

---

## ⚙️ 2. Ensure Cloudflare is Set to Flexible Mode

1. Go to **Cloudflare Dashboard** → `SSL/TLS` tab
2. Under **Overview**, set **SSL Mode** to `Flexible`

---

## 🚀 3. Restart & Verify

### 🔎 Test Nginx config:

```bash
sudo nginx -t
```

### 🔁 Restart Nginx:

```bash
sudo systemctl restart nginx
```

---
