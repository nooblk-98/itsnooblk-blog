---
title: 🌐 How Host React Project In cloudfalre pages
published: 2025-05-23
description: 'Nginx Proxy Manager is a powerful and easy-to-use tool to manage your Nginx reverse proxy with a simple web-based UI. This guide will walk you through installing it using Docker Compose..'
image: 'https://www.linuxuntu.com/wp-content/uploads/2023/05/NGINX-Logo.jpg'
tags: [Docker, Nginx]
category: 'Selfhosted'

draft: false 
lang: 'en'
---

We can host our react nodejs based front end through cloudflare pages freely today im showing how shost sample project with github ci/cd auto update 

im using template repo  https://github.com/saicaca/fuwari to this project show case 

we need to clone the repo frist 

we need to get build commmnds in my case build steps commnds are 


pnpm install

pnpm build

by build folder name is dist we need to know output folder name 

create repo in github using this code and instaructuons or fork it from source 


we need create project in cloudflare aslo with cloudfalre pages 

you can access that page with cloudflare dashboard below image shown as 

<img src="/images/screen7.png" 
     alt="Nginx Proxy Manager UI" 
     style="border-radius: 12px; max-width: 100%; height: auto; border: 2px solid black;" />

create project in pages as same name with your github repo name 

use pages and direct upload since we are gomning to automate process with ci/cd 

<img src="/images/screen8.png" 
     alt="Nginx Proxy Manager UI" 
     style="border-radius: 12px; max-width: 100%; height: auto; border: 2px solid black;" />

you can download cloudflare pages demo and upload here then name your project as same as github repo name 

<img src="/images/screen8.png" 
     alt="Nginx Proxy Manager UI" 
     style="border-radius: 12px; max-width: 100%; height: auto; border: 2px solid black;" />


then deploy 



after that you need to go to the github repo you previously created 

now we are going to create github action file 

create file called   .github\workflows\main.yml


add content 


name: Main Deployment

on:
  push:
    branches: [main]
  workflow_dispatch:

env:
  PROJECT_NAME: itsnooblk-blog

jobs:
  Deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '20'

      - name: Install pnpm
        run: npm install -g pnpm

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build project
        run: pnpm build

      - name: Deploy to Cloudflare Pages
        run: pnpm dlx wrangler pages deploy dist --project-name=${{ env.PROJECT_NAME }}
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.PAGES_DEPLOY_API }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.PAGES_DEPLOY_ACCOUNT }}


this workflow i already created with required steups for other projects this workflow need to chnage as required (some install commnds )


and also we need cloudflare pages account id and key for deploy 


go to url https://dash.cloudflare.com/profile/api-tokens to get api key 

also you can use custome api key or Global API key 


<img src="/images/screen10.png" 
     alt="Nginx Proxy Manager UI" 
     style="border-radius: 12px; max-width: 100%; height: auto; border: 2px solid black;" />


also you need to find account id for that wiviste cloudfalre dashboard and domain 

<img src="/images/screen11.png" 
     alt="Nginx Proxy Manager UI" 
     style="border-radius: 12px; max-width: 100%; height: auto; border: 2px solid black;" />

     in url https://dash.cloudflare.com/2593411e3cce1845dxxxx2b231a9af4/itsnooblk.com show in my url bar in this url account id is 2593411e3cce1845dxxxx2b231a9af4


now we have both account api key and id now we need to add them in our github repo github action searts 


