---
title: 🐳 Running x86_64 Docker Containers on ARM64 Architecture
published: 2025-05-23
description: 'Running x86_64 (amd64) Docker images on an ARM64-based VPS using QEMU emulation.'
image: 'https://imgix.datadoghq.com/img/blog/monitor-docker-datadog/22.png?auto=compress%2Cformat&cs=origin&lossless=true&fit=max&q=75&w=1400&dpr=1'
tags: [linx, Docker]
category: 'Docker'
draft: false 
lang: ''
---

## 🛠️ Why This is Needed

ARM-based servers (like AWS Graviton) use the ARM64 architecture and can't run amd64/x86 containers natively without emulation. **`qemu`** with `binfmt_misc` allows running x86\_64 (amd64) binaries via emulation.

---
### 1. **Enable binfmt Emulation Support**

Pull and run the Docker image to register QEMU binaries for various architectures:

```bash
docker run --rm --privileged --platform=linux/arm64 tonistiigi/binfmt --install all
```

✅ This sets up emulation for:

* `qemu-aarch64`
* `qemu-arm`
* `qemu-x86_64`
* and more...

---

### 2. **Verify QEMU Emulators Are Registered**

Run the following:

```bash
ls /proc/sys/fs/binfmt_misc/
```

You should see entries like:

```
qemu-aarch64
qemu-arm
qemu-x86_64
...
```

---

### 3. **Run an amd64 Docker Image (ShellNGN Example)**

####  Option A: Run with `docker run`

```bash
docker run --rm -p 8070:8080 --platform linux/amd64 shellngn/pro:latest
```

Access it at: `http://your-server-ip:8070`

---

####  Option B: Use `docker-compose.yml`

Use This Flag in Compose:
```yaml
platform: linux/amd64
```

```yaml
version: "3.3"

services:
  shellngn:
    platform: linux/amd64
    container_name: shellngn-pro
    image: shellngn/pro:latest
    ports:
      - 8070:8080
    environment:
      - HOST=0.0.0.0
    user: "0:0"
    volumes:
      - ./data:/home/node/server/data
    networks:
      - nginx

networks:
  nginx:
    external: true
```

Then run:

```bash
docker-compose up -d
```

---

:::NOTE

* Make sure your `docker-compose` version supports the `platform` key (v3.3+).
* Always restart your container if you reinstall or update binfmt/qemu.
:::

