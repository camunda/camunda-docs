---
---

## Step 1: Install Camunda 8 Self-Managed

If you haven't already, follow [this guide](/self-managed/quickstart/developer-quickstart/docker-compose.md) to install Camunda 8 Self-Managed locally via Docker Compose:

1. Download and extract the complete Docker Compose distribution by following the [Docker Compose quickstart](/self-managed/quickstart/developer-quickstart/docker-compose.md#run-camunda-8-with-docker-compose).
1. From the extracted directory, run `docker compose up -d`.
1. Run `docker compose ps` and wait for the `orchestration`, `connectors`, and `elasticsearch` services to become healthy.

To confirm Camunda 8 Self-Managed is running, open [Operate](http://localhost:8088/operate) and log in with username `demo` and password `demo`.
