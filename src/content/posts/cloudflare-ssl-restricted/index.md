---
title: 🌐 Cloudflare SSL with Nginx (Full Strict)
published: 2025-05-22
description: 'Secure your server using Cloudflare Origin CA Certificate and configure Nginx for Full (Strict) SSL mode with reverse proxy.'
image: 'https://weeblytutorials.com/wp-content/uploads/2018/01/Using-Weebly-with-CloudFlare.jpg'
tags: [Cloudflare, SSL, Webservers]
category: 'Webservers'
draft: false
lang: 'en'
---

## 🛡️ 1. Generate Cloudflare Origin Certificate

1. Go to **Cloudflare Dashboard** → `SSL/TLS` → `Origin Server`
2. Click **Create Certificate**
3. Choose:
   - ✔️ Let Cloudflare generate a private key and CSR
   - ✔️ Key Type: **RSA 2048**
   - ✔️ Validity: **15 years**
4. Copy the **certificate** and **private key**

Save the files to your server:

```bash
sudo mkdir -p /etc/ssl/cloudflare
````
```bash
sudo nano /etc/ssl/cloudflare/cloudflare.crt  # Paste the certificate here
sudo nano /etc/ssl/cloudflare/cloudflare.key  # Paste the private key here
````
Secure the key and certificate (change permissions)
```bash
sudo chmod 600 /etc/ssl/cloudflare/cloudflare.key && chmod 600 /etc/ssl/cloudflare/cloudflare.crt
````

---

## ⚙️ 2. Configure Nginx for SSL

Edit your Nginx site configuration:

```bash
sudo nano /etc/nginx/sites-enabled/web.conf
```

Replace with the following configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/ssl/cloudflare/cloudflare.crt;
    ssl_certificate_key /etc/ssl/cloudflare/cloudflare.key;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

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

## 🚀 3. Restart & Verify

### 🔎 Test Nginx config:

```bash
sudo nginx -t
```

### 🔁 Restart Nginx:

```bash
sudo systemctl restart nginx
```

:::NOTE
Your origin server now uses a Cloudflare-generated certificate with `Full (Strict)` SSL enabled and reverse proxy via Nginx securely configured.
:::


