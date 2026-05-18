---
title: Install and start with Docker Compose
sidebar_label: Install and start
description: Download the Docker Compose distribution, start Camunda 8 locally, and stop the environment when you are done.
---

Use this page to install the Docker Compose distribution locally, start Camunda 8, and stop the environment cleanly.

## Prerequisites

The following prerequisites are required to run Camunda 8 Self-Managed with Docker Compose:

| Prerequisite   | Description                                                                                                                |
| :------------- | :------------------------------------------------------------------------------------------------------------------------- |
| Docker Compose | Version 1.27.0 or later, which supports the [latest Compose specification](https://docs.docker.com/compose/compose-file/). |
| Docker         | Version 20.10.16 or later.                                                                                                 |

:::tip
If Docker Compose reports errors such as unsupported attributes when loading the Camunda Compose files, confirm that you are using the Docker Compose v2 plugin:

```shell
docker compose version
```

Run the commands in this guide with `docker compose`, not `docker-compose`. If needed, upgrade Docker Desktop or the Docker Engine Compose plugin, then retry.
:::

## Install and start Camunda 8 with Docker Compose

To start a complete Camunda 8 Self-Managed environment locally:

1. Download the latest Camunda 8 Docker Compose distribution, then extract it.
1. In the extracted directory, run:

   ```shell
   docker compose up -d
   ```

1. Wait for the environment to initialize. This can take several minutes. If you use the full configuration, monitor the logs, especially the Keycloak container log, to ensure all components start.

For available Compose files, component URLs, and authentication defaults, see [configure Docker Compose environments](./configuration.md).

## Stop Camunda 8 with Docker Compose

To stop all containers and remove associated data, run:

```shell
docker compose down -v

# or for the full configuration:
docker compose -f docker-compose-full.yaml down -v
```

:::caution
The `-v` flag deletes all volumes, including process data, users, and other persisted state. Omit `-v` if you want to keep your data.
:::

## Next steps

- Review [configure Docker Compose environments](./configuration.md).
- Review [configure secondary storage with Docker Compose](./secondary-storage.md).
- Review [use connectors and deploy processes with Docker Compose](./connectors-and-modeling.md).
