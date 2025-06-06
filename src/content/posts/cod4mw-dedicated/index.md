---
title: 🎮 Host a Call of Duty 4 MW Dedicated Server with Docker
published: 2025-06-03
description: 'how to set up a fully functional Call of Duty 4: Modern Warfare dedicated server using Docker. This guide covers everything from server preparation and mod installation to Linux server with Docker Compose configuration '
image: 'https://gaming-cdn.com/images/products/6936/616x353/call-of-duty-modern-warfare-remastered-remastered-playstation-4-game-playstation-store-europe-cover.jpg'
tags: [Linux, Games, Docker]
category: 'Linux'
draft: false
lang: 'en'
---

## 🧰 Prerequisites

Before you begin, ensure you have:

* A **Linux VPS or dedicated server** (Ubuntu recommended)
* Docker & Docker Compose installed
* COD4 server files (`main`, `zone`, `mods`, `usermaps`) — *you can copy these from your game installation directory*
* Required ports open on your firewall:

  * `28960` (UDP & TCP) – Game port
  * `8000` (TCP) – Web server/monitoring (if used)

---

## 🐳 Step 1: Install Docker & Docker Compose

If you haven’t installed Docker and Docker Compose yet, follow my step-by-step guide here: 🔧 [install-docker](https://itsnooblk.com/posts/install-docker/)
---

## 📁 Step 2: Prepare Server Directory Structure

Organize your server file structure using:

```bash
mkdir -p /root/cod4x/{main,zone,Mods,usermaps,logs}
```

Copy your COD4 assets into the corresponding directories:

* `/root/cod4x/main` – Game data files
* `/root/cod4x/zone` – Zone files
* `/root/cod4x/Mods` – Mod folders (e.g., `nw4mp_dpg_v1`)
* `/root/cod4x/usermaps` – Custom maps (read-only)
* `/root/cod4x/logs` – Server logs and configs

<img src="/images/cod4mw-dedicated/1.png" 
     alt="cod4mw" 
     style="border-radius: 12px; max-width: 100%; height: auto; border: 2px solid black;" />

:::NOTE
You can copy files from game directory to server
:::

Fix file ownership to avoid permission issues:

```bash
chown -R ubuntu:ubuntu /root/cod4x/*
```
---

## 🔧 Step 3: Create the Docker Compose File

Create a file named `docker-compose.yml` in your working directory and add the following:

```yaml
version: "3.7"
services:
  cod4:
    image: qmcgaw/cod4
    container_name: cod4
    volumes:
      - /root/cod4x/main:/home/user/cod4/main
      - /root/cod4x/zone:/home/user/cod4/zone
      - /root/cod4x/Mods:/home/user/cod4/mods
      - /root/cod4x/usermaps:/home/user/cod4/usermaps:ro
      - /root/cod4x/logs:/home/user/.callofduty4
    network_mode: bridge
    environment:
      - HTTP_SERVER=on
      - ROOT_URL=/
    ports:
      - 28960:28960/udp
      - 28960:28960/tcp
      - 8000:8000/tcp
    command: >
      +set fs_game mods/nw4mp_dpg_v1
      +exec mods/nw4mp_dpg_v1/dpgtdm.cfg
      +set r_xassetnum "xmodel=1200"
      +set dedicated 2
      +set sv_cheats 1
      +set sv_maxclients 64
      +set ui_maxclients 64
      +exec server.cfg
      +map_rotate
```

> 🔁 **Customize** the mod path (`mods/nw4mp_dpg_v1`) and config file if you are using a different mod or settings.

---

## 🔧 Step 4: Launch the Server

Run the following commands from the directory where your `docker-compose.yml` is located:

```bash
docker-compose up -d
```

View live logs:

```bash
docker logs -f cod4
```

To stop the server:

```bash
docker-compose down
```

---

## 🔧 Step 5: Verify Server is Online

To test your server:

1. Open COD4 and check the in-game server browser (if the server is public).
2. Or connect directly via console:

```
/connect your-server-ip:28960
```

---

## 🔧 Optional: Enable RCON and Additional Customizations

* Add remote console access by appending this to the `command:` section:

```bash
+set rcon_password "yourStrongPassword"
```

* Modify server rules and gameplay settings by editing config files under `/root/cod4x/Mods/<mod_name>/`.

---

## 🧩 How to Add and Run a Custom Mod in COD4

To run a custom mod like `nw4mp_dpg_v1` on your COD4 server, follow these steps:

### 🛠️ Step 1: Get the Mod Files

Obtain the mod folder (`nw4mp_dpg_v1` in this example) from:

* A downloaded `.zip` or `.rar` from mod websites (e.g., ModDB)
* Another COD4 server installation
* Your own mod build if you created it using the COD4 Mod Tools

Make sure the mod folder includes:

* `.gsc` and `.cfg` files
* `mod.csv`, `mod.ff`, and `localized_*.iwd` (if compiled)

---

### 📂 Step 2: Place the Mod

Copy the full mod folder into the `Mods` directory:

```bash
cp -r nw4mp_dpg_v1 /root/cod4x/Mods/
```

Now it should exist at:

```
/root/cod4x/Mods/nw4mp_dpg_v1/
```

---

### ⚙️ Step 3: Add/Customize the Config File

Inside the mod folder (`nw4mp_dpg_v1`), you should have a config file to run, such as `dpgtdm.cfg`.

If it’s missing, create one and add basic settings like:

```cfg
// mods/nw4mp_dpg_v1/dpgtdm.cfg

set sv_hostname "My Docker COD4 Server"
set g_gametype "tdm"
map mp_crossfire

set sv_maxclients 32
set scr_teambalance 1
set sv_punkbuster 0
```

---

### 🛠 Step 4: Modify Docker Compose Command

In your `docker-compose.yml`, reference the mod and its config like this:

```yaml
command: >
  +set fs_game mods/nw4mp_dpg_v1
  +exec mods/nw4mp_dpg_v1/dpgtdm.cfg
  +set r_xassetnum "xmodel=1200"
  +set dedicated 2
  +set sv_cheats 1
  +set sv_maxclients 64
  +set ui_maxclients 64
  +map_rotate
```

This tells the server to:

* Load the mod from `mods/nw4mp_dpg_v1`
* Execute the `dpgtdm.cfg` config file from the same mod directory
* Enable cheats and set client limits
* Automatically start map rotation

---

<!-- <div align="center"><h1><i>Join My Server and Enjoy!</i></h1>
    <a href="https://www.gametracker.com/server_info/18.138.25.45:28960/" target="_blank">
        <img src="https://cache.gametracker.com/server_info/18.138.25.45:28960/b_560_95_1.png" border="0" width="560" height="95" alt=""/>
    </a>
</div> -->

