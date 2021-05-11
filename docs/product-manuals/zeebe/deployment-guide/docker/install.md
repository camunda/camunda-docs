---
id: install
title: "Docker container"
---

This page guides you through the initial installation of the Zeebe broker and Camunda Modeler for development purposes.

## Using Docker

The easiest way to develop with Zeebe is using Docker. Using Docker provides you with a consistent environment, and we recommend it for development.

### Prerequisites

- Operating System:
  - Linux
  - Windows/MacOS (development only, not supported for production)
- Docker

### Docker configurations for docker-compose

Docker configurations for starting Zeebe using `docker-compose` are available in the [zeebe-docker-compose](https://github.com/zeebe-io/zeebe-docker-compose/blob/master/README.md) repository.

This repository contains several pre-defined configuration options:

- Single node
- Small cluster with and without gateway
- Single node with Operate
- Single node with simple monitor

This allows you to start using complex configurations with a single command. Later you can tailor these configurations to your needs, when you are ready to delve to that level.

Further instructions for using these configurations are in the [README](https://github.com/zeebe-io/zeebe-docker-compose/blob/master/README.md).

### Using Docker without docker-compose

You can run Zeebe with Docker:

```bash
docker run --name zeebe -p 26500-26502:26500-26502 camunda/zeebe:latest
```

This will give you a a single broker node.

#### Exposed ports

- `26500`: Gateway API
- `26501`: Command API (gateway-to-broker)
- `26502`: Internal API (broker-to-broker)

#### Volumes

The default data volume is under `/usr/local/zeebe/data`. It contains
all data which should be persisted.

#### Configuration

The Zeebe configuration is located at `/usr/local/zeebe/config/application.yaml`.
The logging configuration is located at `/usr/local/zeebe/config/log4j2.xml`.

The configuration of the docker image can also be changed by using environment
variables. The configuration template files also contains information on the environment
variables to use for each configuration setting.

Available environment variables:

- `ZEEBE_LOG_LEVEL` - sets the log level of the Zeebe Logger (default: `info`).
- `ZEEBE_BROKER_NETWORK_HOST` - sets the host address to bind to instead of the IP of the container.
- `ZEEBE_BROKER_CLUSTER_INITIALCONTACTPOINTS` - sets the contact points of other brokers in a cluster setup.

## Install the Camunda Modeler

The Camunda Modeler is an open-source desktop BPMN modeling application created specifically for Zeebe.

[You can download the most recent Camunda Modeler release here.](https://camunda.com/download/modeler/)
