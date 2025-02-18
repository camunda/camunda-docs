---
---

## Step 1: Install Camunda 8 Self-Managed

If you haven't already, follow [this guide](/self-managed/setup/deploy/local/docker-compose.md) to install Camunda 8 Self-Managed locally via Docker Compose:

1. Use the `docker-compose.yaml` file in [this repository](https://github.com/camunda/camunda-platform).
2. Clone this repo and run `docker compose up -d` in your terminal to start your environment.

To confirm Camunda 8 Self-Managed is installed, click into Docker Desktop. Here, you will see the `camunda-platform` container. Alternatively, navigate to the different components and log in with the username `demo` and password `demo`. For example, Operate can be accessed at [http://localhost:8081](http://localhost:8081) (as noted under **Port(s)** in the Docker container). Find additional guidance in the repository [README](https://github.com/camunda/camunda-platform?tab=readme-ov-file#using-docker-compose).
