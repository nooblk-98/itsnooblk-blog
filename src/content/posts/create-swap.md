---
title: 🐧 How to Create a Linux Swap File (Interactive Bash Script)
published: 2025-05-23
description: 'Running low on memory? Learn how to create, activate, and manage swap space on Linux server using a simple, interactive Bash script'
image: ''
tags: [linx]
category: 'linx'
draft: false 
lang: 'en'
---

Create, activate, and manage swap space on a Linux server using a simple, interactive Bash script.


## ✅ 1. `create-swap.sh` – Save the Script

First, create a file named `create-swap.sh` using:

```bash
nano create-swap.sh
```

Paste the following script inside:

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

## 🛠️ 2. Run Instructions
```bash

# Step 2: Make it executable
chmod +x create-swap.sh

# Step 3: Execute the script
./create-swap.sh
```

---

## ❌ To Remove the Swap File

If you want to completely remove the swap file:

```bash
sudo swapoff /swapfile
sudo rm /swapfile
sudo sed -i '/\/swapfile/d' /etc/fstab
```

---

## 📋 Notes

* Requires `sudo` privileges
* Makes the swap file persistent via `/etc/fstab`

---