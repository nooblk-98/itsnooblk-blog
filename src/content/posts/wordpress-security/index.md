---
title: 🔐 Ultimate Guide to Securing Your WordPress Site
published: 2025-05-26
description: 'This will guide you to secure your WordPress sites from malware injections, which I used in my industry to protect sites.'
image: 'https://www.devopsschool.com/blog/wp-content/uploads/2022/03/wordpress-1024x538.png'
tags: [Wordpress, Linux]
category: 'Security'
draft: false
lang: 'en'
---

In this post, I’ll walk through **essential best practices** to secure your WordPress installation, protect sensitive files, and monitor for changes or breaches. We'll also include advanced server-level hardening tips that **I** used in **the** industry.

---

## ✅ 1. Disable File Editing from wp-admin

By default, WordPress allows admin users to edit theme and plugin files directly from the dashboard—**a major risk** if an attacker gains access.

**Add this to `wp-config.php`:**

```php
define('DISALLOW_FILE_EDIT', true);
```

📌 *Removes "Theme Editor" and "Plugin Editor" from admin.*

---

## ✅ 2. Disable Plugin and Theme Installation & Updates

To prevent installation or updating of themes and plugins from the dashboard:

```php
define('DISALLOW_FILE_MODS', true);
```

⚠️ *Use this only if your site is stable and you handle updates manually via FTP or SSH.*
---
## ✅ 3. Harden File and Directory Permissions (Linux)

SSH into your server and run:

```bash
cd /var/www/html  # Replace with your path

# Set proper file permissions
find . -type f -exec chmod 644 {} \;

# Set proper directory permissions
find . -type d -exec chmod 755 {} \;

# Lock sensitive files
chmod 600 wp-config.php
chmod 644 .htaccess
```

---

## ✅ 4. Lock Critical Files with `chattr` (Immutable Attribute)

`chattr` prevents even root users or malware from modifying files:

```bash
sudo chattr +i wp-config.php
sudo chattr +i .htaccess
```

To unlock:

```bash
sudo chattr -i wp-config.php
```

🛡️ This defends against common malware that rewrites `.htaccess` or config files.

---

## ✅ 5. Lock Core Directories (Advanced)

If you're not making frequent changes:

```bash
sudo chattr -R +i wp-includes
sudo chattr -R +i wp-admin
```

❌ *Do not apply this to `wp-content/uploads`, or media uploads will break.*

---

## ✅ 6. Block PHP Execution in Uploads

Prevent attackers from uploading backdoor scripts:

📍For Apache (`/wp-content/uploads/.htaccess`):

```apache
<FilesMatch "\.php$">
    Order Deny,Allow
    Deny from all
</FilesMatch>
```

📍For Nginx:

```nginx
location ~* /wp-content/uploads/.*\.php$ {
    deny all;
}
```

---

## ✅ 7. Secure `.htaccess` Rules

Append this to your `.htaccess` file:

:::NOTE
Replace `yourdomain.com` with your actual domain
:::

```apache

# WordPress Rules
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.php$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.php [L]
</IfModule>

# Enable Gzip Compression (Improves Speed)
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain text/html text/xml text/css application/javascript application/json
</IfModule>

# Enable Browser Caching (Improves Performance)
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType text/x-javascript "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType application/pdf "access plus 1 month"
    ExpiresByType application/x-shockwave-flash "access plus 1 month"
    ExpiresByType image/x-icon "access plus 1 year"
    ExpiresDefault "access plus 2 days"
</IfModule>

# Block Hotlinking (Prevents Image Theft)
<IfModule mod_rewrite.c>
    RewriteEngine on
    RewriteCond %{HTTP_REFERER} !^$
    RewriteCond %{HTTP_REFERER} !^http(s)?://(www\.)?yourdomain.com [NC]
    RewriteRule \.(jpg|jpeg|png|gif)$ - [NC,F,L]
</IfModule>

# Enable Keep-Alive (Reduces Server Overhead)
<IfModule mod_headers.c>
    Header set Connection keep-alive
</IfModule>

# Disable Directory Browsing (Security)
Options -Indexes

# Protect wp-config.php (WordPress Security)
<Files wp-config.php>
    order allow,deny
    deny from all
</Files>
```
---

## ✅ 8. Disable XML-RPC (If not used)

`xmlrpc.php` is often abused by bots for brute-force and DDoS attacks.

📍Add to `.htaccess`:

```apache
<Files xmlrpc.php>
    order deny,allow
    deny from all
</Files>
```

---

## ✅ 9. Use Strong Login Protections

* Limit login attempts (use plugin or Nginx/Fail2Ban)
* Use 2FA (Google Authenticator or Authy)
* Change `/wp-login.php` URL using plugins like *WPS Hide Login*
* Rename the default admin username
* Use long, random passwords for all accounts

---

## ✅ 10. Regular Backups

Use tools like:

* **UpdraftPlus**
* **All-in-One WP Migration**

☁️ *Ensure your backups are stored off-site (Google Drive, S3, etc.).*

---
## ✅ 11. Secure Database Access

In `wp-config.php`, add:

```php
define('DB_USER', 'yourdbuser');
define('DB_PASSWORD', 'strongpassword');
define('DB_HOST', 'localhost');
```

Also, rename your table prefix from `wp_` to something custom like `x9y_` to protect from SQL injection bots.

---

## ✅ 12. Enable SSL (HTTPS)

* Use **Let’s Encrypt** or a commercial SSL
* Force HTTPS redirection in `.htaccess` or Nginx config

```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
```

---

## ✅ 13. Keep Everything Updated

Outdated plugins and themes are a major attack vector.

* Enable auto-updates for security releases
* Remove unused plugins/themes

---
:::NOTE
Use a WAF or CDN with Security Services like:  **Cloudflare**
:::

---
