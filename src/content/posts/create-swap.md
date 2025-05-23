---
title: 🐧 How to Create a Linux Swap File (Interactive Bash Script)
published: 2025-05-23
description: 'Running low on memory? Learn how to create, activate, and manage swap space on Linux server using a simple, interactive Bash script'
image: ''
tags: [Linux]
category: 'Linux'
draft: false 
lang: 'en'
---

Create, activate, and manage swap space on a Linux server using a simple, interactive Bash script.


## ✅ Option 1: Quick Setup with `create-swap.sh`

### 📝 Save the Script

Create the script file:

```bash
nano create-swap.sh
```

Paste this script inside:

```bash
#!/bin/bash

# Prompt the user for swap size
read -p "Enter swap size in MB (e.g., 1024 for 1GB): " SWAP_SIZE_MB

# Validate input
if ! [[ "$SWAP_SIZE_MB" =~ ^[0-9]+$ ]]; then
    echo "❌ Error: Please enter a valid numeric value."
    exit 1
fi

SWAP_FILE="/swapfile"

echo "🛠️ Creating a ${SWAP_SIZE_MB}MB swap file at ${SWAP_FILE}..."

# Create the swap file
if ! sudo fallocate -l ${SWAP_SIZE_MB}M ${SWAP_FILE}; then
    echo "⚠️ fallocate failed, falling back to dd..."
    sudo dd if=/dev/zero of=${SWAP_FILE} bs=1M count=${SWAP_SIZE_MB} status=progress
fi

# Set correct permissions
sudo chmod 600 ${SWAP_FILE}

# Format the file as swap
sudo mkswap ${SWAP_FILE}

# Enable the swap file
sudo swapon ${SWAP_FILE}

# Make the swap persistent
if ! grep -q "${SWAP_FILE}" /etc/fstab; then
    echo "${SWAP_FILE} none swap sw 0 0" | sudo tee -a /etc/fstab > /dev/null
fi

echo "✅ Swap setup completed!"
swapon --show
free -h
```

---

### 🧪 Run the Script

```bash
chmod +x create-swap.sh && ./create-swap.sh
```

---

## 🛠️ Option 2: Manual Swap File Creation

Step 1: Create a 1GB swap file (change size as needed)
```bash
sudo fallocate -l 1G /swapfile
```
OR use dd as a fallback (only if the first command is not working)
```bash
sudo dd if=/dev/zero of=/swapfile bs=1M count=1024 status=progress
```
Step 2: Secure the file
```bash
sudo chmod 600 /swapfile
```
Step 3: Set it up as swap
```bash
sudo mkswap /swapfile
```
Step 4: Enable the swap
```bash
sudo swapon /swapfile
```
Step 5: Make it permanent
```bash
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

Step 6: Confirm it's active
```bash
swapon --show
free -h
```

---

## ❌ To Remove the Swap File

```bash
sudo swapoff /swapfile && rm /swapfile && sed -i '/\/swapfile/d' /etc/fstab
```

---

## 📋 Notes

* `sudo` access is required
* Works on most modern Linux distributions
* Automatically tries `fallocate` and falls back to `dd` if unavailable

---
