---
title: 🐳 Docker Commands Cheat Sheet – Basics
published: 2025-05-28
description: 'Docker is a powerful tool for containerization that helps developers build, ship, and run applications consistently across different environments, this post covers all the essential Docker commands. '
image: 'https://imgix.datadoghq.com/img/blog/monitor-docker-datadog/22.png?auto=compress%2Cformat&cs=origin&lossless=true&fit=max&q=75&w=1400&dpr=1'
tags: [Linux, Docker]
category: 'Docker'
draft: false 
lang: ''
---


## 📦 Docker Basics: Containers, Images, and Volumes

### 🔧 Start With These Basics:

```bash
# Check Docker version
docker --version

# Get help
docker help
```

---

## 🔧 Docker Image Commands

Images are the building blocks of containers.

```bash
# Pull an image from Docker Hub
docker pull nginx

# List all images
docker images

# Build image from Dockerfile
docker build -t my-image .

# Tag an image
docker tag my-image myrepo/my-image:1.0

# Remove image
docker rmi image_id_or_name
```

---

## 🔧 Docker Container Commands

Containers are running instances of images.

```bash
# Run a container
docker run -d -p 80:80 --name webserver nginx

# Run interactively with terminal
docker run -it ubuntu /bin/bash

# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# Stop a container
docker stop container_id_or_name

# Start a container
docker start container_id_or_name

# Restart a container
docker restart container_id_or_name

# Remove a container
docker rm container_id_or_name

# View container logs
docker logs container_id_or_name

# Execute a command inside container
docker exec -it container_id /bin/bash
```

---

## 🔧 Docker Volume Commands

Volumes store persistent data used by containers.

```bash
# Create a volume
docker volume create my-volume

# List volumes
docker volume ls

# Inspect a volume
docker volume inspect my-volume

# Remove a volume
docker volume rm my-volume
```

---

## 🔧 Docker Clean-Up Commands (Free Up Space)

Docker tends to accumulate unused data. Here’s how to clean it up.

```bash
# Remove all stopped containers
docker container prune

# Remove all unused images
docker image prune

# Remove all unused networks
docker network prune

# Remove all unused volumes
docker volume prune

# Remove everything (use with caution!)
docker system prune

# Remove everything including volumes (use with more caution!)
docker system prune -a --volumes
```

---

## 🔧 Docker Network Commands

```bash
# List networks
docker network ls

# Inspect a network
docker network inspect bridge

# Create a new network
docker network create my-network

# Remove a network
docker network rm my-network
```

---

## 🔧 Docker Compose Commands (If you're using `docker-compose.yml`)

```bash
# Start all services defined in docker-compose
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs

# Rebuild containers
docker-compose up --build

# Remove all stopped services, networks, volumes
docker-compose down --volumes --remove-orphans
```

---

## Tips

* Use `docker stats` to monitor container resource usage.
* Use `docker inspect` for deep info on containers/images.
* Use `docker top container_id` to see running processes.
* Use `watch docker ps` to see live updates of containers.

---
