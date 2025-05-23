---
title: 🔐 How to Generate Your Own SSH Key Pair 
published: 2025-05-23
description: 'Securely connect to servers or Git platforms using SSH by generating your own key pair on your local machine.'
image: 'https://miro.medium.com/v2/resize:fit:1400/1*eV6MmAeMV9DgkQv3PdOBMA.png'
tags: [linx]
category: 'Linux'
draft: false 
lang: ''
---

## 📦 Generate SSH Key Pair

Open your terminal and run:

### For modern ED25519 key (recommended):

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

### Or for RSA (older systems):

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

Then follow these steps:

1. **Location prompt** – Press `Enter` to save to default: `~/.ssh/id_ed25519` or `id_rsa`
2. **Passphrase (optional)** – Add a secure passphrase or press `Enter` to skip

## 📂 Your Key Files

* **Private Key**: `~/.ssh/id_ed25519` (keep this secure)
* **Public Key**: `~/.ssh/id_ed25519.pub` (you share this with servers)

## 🚀 Add SSH Key to Your Agent

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

## 🛠️ Add Public Key to GitHub/GitLab

1. Copy the key:

   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
2. Go to your platform’s **SSH Keys** settings and paste it there

## 🔍 Test Your Connection

```bash
ssh -T git@github.com
```
> [!NOTE]
> Replace `github.com` with your service provider (e.g., `gitlab.com`, your server IP, etc.)
---

