---
title: 🌐 Getting Started with GitHub Workflows, A Beginner’s Guide
published: 2025-05-28
description: GitHub Workflows are part of GitHub Actions, a powerful CI/CD (Continuous Integration and Continuous Deployment) tool built into GitHub. If you've ever wanted to automate your development process
image: 'https://www.automatetheplanet.com/wp-content/uploads/2021/05/github_actions.jpg'
tags: [Github]
category: 'Github'
---

## 🧠 What is a GitHub Workflow?

A **workflow** is an automated process defined in a **YAML** file inside your repository that runs one or more **jobs** (e.g., test, build, deploy). It is triggered by events like pushing code, opening pull requests, or on a schedule.

**Example Use Cases**:

* Automatically run tests when you push code.
* Deploy your website when code is merged to `main`.
* Lint and format code on pull request.

---

## 📁 Project Structure & Setup

1. **Create a GitHub repository** or use an existing one.
2. In the root of your repo, create a directory:

   ```bash
   mkdir -p .github/workflows
   ```
3. Inside `.github/workflows/`, create a YAML file:

   ```bash
   touch main.yml
   ```
---
:::note
A single GitHub repository can contain multiple workflow files. In the example below, each workflow file can be assigned different tasks and configured to run only on specific branches, as defined within the file.
:::
<img src="/images/GitHub-Workflows-Beginner/1.png" 
     alt="Nginx Proxy Manager UI" 
     style="border-radius: 12px; max-width: 100%; height: auto; border: 2px solid black;" />


---

## 🔧 Writing Your First Workflow

Here’s a simple workflow file that runs on every push to the repository:

```yaml
name: CI Test Workflow

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test
```

### 🔍 Breakdown:

* `name`: Descriptive name of the workflow.
```yml
name: CI Test Workflow
```
You can give any name here to help identify the purpose of the workflow file. This is especially useful when managing multiple workflows in a project.

---
* `on`: Defines the event that triggers the workflow.
  For example, the following configuration runs the workflow when there is a `push` to the `main` branch:

```yml
on:
  push:
    branches:
      - main
```

You can customize this to trigger on other events like `pull_request`, `schedule`, or even on specific paths or tags.

---

* `jobs`: Defines a set of tasks (jobs) that will be executed as part of the workflow.
  Each job runs independently (unless dependencies are defined), and can be assigned a name, operating system, and a set of steps.

Example:

```yml
jobs:
  build:
    runs-on: ubuntu-latest
```

In this example, a job named `build` will run on the latest version of an Ubuntu runner provided by GitHub. You can name the job anything and choose other environments like `windows-latest` or `macos-latest` depending on your requirements.

<img src="/images/GitHub-Workflows-Beginner/2.png" 
     alt="Nginx Proxy Manager UI" 
     style="border-radius: 12px; max-width: 100%; height: auto; border: 2px solid black;" />
:::note
In this example, the workflow includes two separate jobs:

* `build-and-push`: Handles building the application and pushing the Docker image (or artifacts) to a repository.
* `deploy-to-live`: Responsible for deploying the built code or image to the live environment.

Each job runs independently or sequentially, depending on how you define dependencies between them.
:::
---


* This is the example how that defined in workflow file
```yaml
name: Build and Push Docker Image

on:
  push:
    branches:
      - main  # Trigger on push to main branch
  workflow_dispatch: # Allow manual trigger


jobs:
  build-and-push:
    runs-on: ubuntu-latest

    steps:
    # Checkout the code
    - name: Checkout repository
      uses: actions/checkout@v4

  deploy-to-live:
        runs-on: ubuntu-latest
        needs: build-and-push

        steps:
          # Checkout the code
          - name: Checkout code
            uses: actions/checkout@v4
```

---
In this example, the `deploy-to-live` job will only run after the `build-and-push` job has completed successfully. If you don't use `needs`, both jobs will run in parallel by default.
Using needs helps you control the execution order of jobs and ensure that deployment only happens if the build process is successful.

```yaml
needs: build-and-push
```
---
* `steps`: Individual tasks within the job.


In GitHub Actions, the `steps` section defines **what happens inside a job**. Each step can run a shell command, use a prebuilt action, or set up part of the workflow. Steps share the same environment and file system within the job.

Here's a breakdown of the `steps` in your sample workflow:

```yaml
jobs:
  build-and-push:
    runs-on: ubuntu-latest

    steps:
```

#### 1. ✅ Checkout the code

```yaml
    - name: Checkout repository
      uses: actions/checkout@v4
```

This step uses GitHub’s official `checkout` action to clone the repository code into the runner so other steps can work with it.

---

#### 2. ✅ Log in to GitHub Container Registry

```yaml
    - name: Log in to GitHub Container Registry
      uses: docker/login-action@v3
      with:
        registry: ghcr.io
        username: ${{ github.actor }}
        password: ${{ secrets.GITHUB_TOKEN }}
```

This step logs in to GitHub Container Registry (GHCR) using your GitHub credentials so you can push Docker images.

---

#### 3. ✅ Build the Docker image

```yaml
    - name: Build Docker image
      run: |
        PROJECT_NAME=$(basename ${{ github.repository }})
        docker build -t ghcr.io/${{ github.repository_owner }}/${PROJECT_NAME}:latest .
```

This step builds a Docker image using the Dockerfile in the repository. The image is tagged with a `latest` tag using the repository and owner name dynamically.

---

#### 4. ✅ Push the Docker image

```yaml
    - name: Push Docker image
      run: |
        PROJECT_NAME=$(basename ${{ github.repository }})
        docker push ghcr.io/${{ github.repository_owner }}/${PROJECT_NAME}:latest
```

After building the image, this step pushes it to GHCR so it can be used for deployment or sharing.

---

## 🔒 Secrets and Environment Variables

**GitHub Secrets** are encrypted environment variables used to store **sensitive data** like:

* API keys
* Access tokens
* Passwords
* Private keys

They help keep your credentials **safe and out of your codebase**.

---

### 🔧 How to Add a Secret in GitHub

1. Go to your **GitHub repository**.
2. Click on **Settings**.
3. Go to **Secrets and variables → Actions**.
4. Click **New repository secret**.
5. Set a name like `DOCKER_PASSWORD` and paste the secret value.

---

### ✅ How to Use a Secret in a Workflow

You access secrets using the `secrets` context inside `${{ ... }}`:

#### Example 1: Docker login using a secret

```yaml
- name: Log in to Docker
  uses: docker/login-action@v3
  with:
    username: ${{ secrets.DOCKER_USERNAME }}
    password: ${{ secrets.DOCKER_PASSWORD }}
```

#### Example 2: Using a secret in a `run` command

```yaml
- name: Use secret in shell script
  run: echo "The secret is $MY_SECRET"
  env:
    MY_SECRET: ${{ secrets.MY_SECRET_VALUE }}
```

> ⚠️ **Never echo secrets directly in real workflows** — this is just an example.

---

## 🧪 Testing Your Workflow

You can trigger a workflow by:

* Pushing code.
* Manually (if you define `workflow_dispatch`).
* Opening a pull request.

To test manually:

```yaml
on:
  workflow_dispatch:
```

Go to **Actions > Your Workflow > Run workflow**.

<img src="/images/GitHub-Workflows-Beginner/3.png" 
     alt="Nginx Proxy Manager UI" 
     style="border-radius: 12px; max-width: 100%; height: auto; border: 2px solid black;" />

---

## 📚 Useful Resources

* [GitHub Actions Documentation](https://docs.github.com/en/actions)
* [Actions Marketplace](https://github.com/marketplace?type=actions)
* [YAML Syntax Reference](https://yaml.org/spec/1.2/spec.html)

---
