---
id: install
title: "Docker container"
---

This page guides you through the initial installation of the Zeebe broker and next steps for development purposes.

## Using Docker

The easiest way to develop with Zeebe is using Docker. Docker provides a consistent environment we recommend for development.

### Prerequisites

- Operating system:
  - Linux
  - Windows/MacOS (development only, not supported for production)
- Docker

### Docker configurations for docker-compose

A default Docker Compose configuration to run Zeebe, Operate, and Tasklist is available in the get started repository: [docker-compose.yaml](https://github.com/camunda-cloud/camunda-cloud-get-started/blob/master/docker-compose.yaml).

Download this file to your local computer, `cd` into that directory, and run `docker-compose up`.

#### Exposed ports

- `26500`: Zeebe Gateway API
- [`8080`](http://localhost:8080/): Operate
- [`8081`](http://localhost:8081/): Tasklist

### Using Docker without docker-compose

You can run Zeebe with Docker:

```bash
docker run --name zeebe -p 26500-26502:26500-26502 camunda/zeebe:latest
```

This will give you a single broker node.

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

The configuration of the Docker image can also be changed using environment
variables. The configuration template file also contains information on the environment
variables to use for each configuration setting.

Available environment variables:

- `ZEEBE_LOG_LEVEL` - sets the log level of the Zeebe Logger (default: `info`).
- `ZEEBE_BROKER_NETWORK_HOST` - sets the host address to bind to instead of the IP of the container.
- `ZEEBE_BROKER_CLUSTER_INITIALCONTACTPOINTS` - sets the contact points of other brokers in a cluster setup.

## Next steps

As a next step, you can install Desktop Modeler.

Desktop Modeler is an open-source desktop BPMN modeling application created specifically for Zeebe. This application gives developers powerful features to design and deploy automated processes, human workflows, decision tables, and decision requirement diagrams using the globally-recognized [BPMN](https://camunda.com/bpmn/) and [DMN](https://camunda.com/dmn/) standards.

Get started with Desktop Modeler using our [installation guide](/components/modeler/desktop-modeler/install-the-modeler.md).
