---
id: docker
title: "Docker"
---

This page guides you through Camunda Platform 8 Docker images and how to run the platform in a developer setup using Docker Compose.

## Docker images

We provide Docker images [via Dockerhub](https://hub.docker.com/u/camunda). All those images are publicly accessible.

:::info
The provided Docker images are supported for production usage only on Linux systems. Windows or macOS are only supported for development environments.
:::

| Component         | Docker image                                                                           | Link to configuration options                                                                                           |
| ----------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Zeebe             | [camunda/zeebe:latest](https://hub.docker.com/r/camunda/zeebe)                         | [Environment variables](../../zeebe-deployment/configuration/environment-variables/)                                    |
| Operate           | [camunda/operate:latest](https://hub.docker.com/r/camunda/operate)                     | [Operate configuration](../../operate-deployment/operate-configuration)                                                 |
| Tasklist          | [camunda/tasklist:latest](https://hub.docker.com/r/camunda/tasklist)                   | [Tasklist configuration](../../tasklist-deployment/tasklist-configuration)                                              |
| Identity          | [camunda/identity:latest](https://hub.docker.com/r/camunda/identity)                   | [Configuration variables](../../identity/deployment/configuration-variables/)                                           |
| Optimize          | [camunda/optimize:latest](https://hub.docker.com/r/camunda/optimize)                   | [Environment variables]($optimize$/self-managed/optimize-deployment/install-and-start/#available-environment-variables) |
| Connectors        | [camunda/connectors:latest](https://hub.docker.com/r/camunda/connectors)               | [Connectors configuration](../../connectors-deployment/connectors-configuration)                                        |
| Connectors Bundle | [camunda/connectors-bundle:latest](https://hub.docker.com/r/camunda/connectors-bundle) | [Connectors configuration](../../connectors-deployment/connectors-configuration)                                        |

Zeebe is the only component that is often run on its own as a standalone component. In this scenario, it does not need anything else, so a simple `docker run` is sufficient:

```bash
docker run --name zeebe -p 26500-26502:26500-26502 camunda/zeebe:latest
```

This will give you a single broker node with the following ports exposed:

- `26500`: Gateway API (this is the port clients need to use)
- `26501`: Command API (internal, gateway-to-broker)
- `26502`: Internal API (internal, broker-to-broker)

## Docker Compose

A Docker Compose configuration to run Zeebe, Operate, Tasklist, Optimize, Identity, and Connectors Bundle is available in the [camunda-platform](https://github.com/camunda/camunda-platform/blob/main/docker-compose.yaml) repository.
Follow the instructions in the [README](https://github.com/camunda/camunda-platform#using-docker-compose).

:::warning
While the Docker images themselves are supported for production usage, the Docker Compose files are designed to be used by developers to run an environment locally; they are not designed to be used in production. We recommend to use [Kubernetes](./kubernetes.md) in production, see also [Installation Overview](./).
:::

This Docker Compose configuration serves two purposes:

1. It can be used to start up a development environment locally.
2. It documents how the various components need to be wired together.

:::note
We recommend to use [Helm + KIND](./kubernetes-helm.md#installing-the-camunda-helm-chart-locally-using-kind) instead of Docker Compose for local environments, as the Helm configurations are battle-tested and much closer to production systems.
:::

## Configuration hints

### Zeebe

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

- `ZEEBE_LOG_LEVEL` - Sets the log level of the Zeebe Logger (default: `info`).
- `ZEEBE_BROKER_NETWORK_HOST` - Sets the host address to bind to instead of the IP of the container.
- `ZEEBE_BROKER_CLUSTER_INITIALCONTACTPOINTS` - Sets the contact points of other brokers in a cluster setup.

### Optimize

Some configuration properties are optional and have default values. See a description of these properties and their default values in the table below:

| Name                                                    | Description                                                                                                                                                                                | Default value |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| SPRING_PROFILES_ACTIVE                                  | Starts Optimize in Self-Managed mode.                                                                                                                                                      |
| CAMUNDA_OPTIMIZE_IDENTITY_ISSUER_URL                    | The URL at which Identity can be accessed by Optimize.                                                                                                                                     |
| CAMUNDA_OPTIMIZE_IDENTITY_ISSUER_BACKEND_URL            | The URL at which the Identity auth provider can be accessed by Optimize. This should match the configured provider in Identity and is to be used for container to container communication. |
| CAMUNDA_OPTIMIZE_IDENTITY_CLIENTID                      | The Client ID used to register Optimize with Identity.                                                                                                                                     |
| CAMUNDA_OPTIMIZE_IDENTITY_CLIENTSECRET                  | The Secret used when registering Optimize with Identity.                                                                                                                                   |
| CAMUNDA_OPTIMIZE_IDENTITY_AUDIENCE                      | The audience used when registering Optimize with Identity.                                                                                                                                 |
| OPTIMIZE_ELASTICSEARCH_HOST                             | The address/hostname under which the Elasticsearch node is available.                                                                                                                      | localhost     |
| OPTIMIZE_ELASTICSEARCH_HTTP_PORT                        | The port number used by Elasticsearch to accept HTTP connections.                                                                                                                          | 9200          |
| CAMUNDA_OPTIMIZE_SECURITY_AUTH_COOKIE_SAME_SITE_ENABLED | Determines if `same-site` is enabled for Optimize cookies. This must be set to `false`.                                                                                                    | true          |
| CAMUNDA_OPTIMIZE_ENTERPRISE                             | This should only be set to `true` if an Enterprise License has been acquired.                                                                                                              | true          |
| CAMUNDA_OPTIMIZE_ZEEBE_ENABLED                          | Enables import of Zeebe data in Optimize.                                                                                                                                                  | false         |
| CAMUNDA_OPTIMIZE_ZEEBE_NAME                             | The record prefix for exported Zeebe records.                                                                                                                                              | zeebe-record  |
| CAMUNDA_OPTIMIZE_ZEEBE_PARTITION_COUNT                  | The number of partitions configured in Zeebe.                                                                                                                                              | 1             |
| CAMUNDA_OPTIMIZE_SHARING_ENABLED                        | Enable/disable the possibility to share reports and dashboards.                                                                                                                            | true          |
| CAMUNDA_OPTIMIZE_UI_LOGOUT_HIDDEN                       | Disables the logout button (logout is handled by Identity).                                                                                                                                | true          |
| SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_JWK_SET_URI   | Authentication for the Public REST API using a resource server to validate the JWT token. Complete URI to get public keys for JWT validation.                                              | null          |
| OPTIMIZE_API_ACCESS_TOKEN                               | Authentication for the Public REST API using a static shared token. Will be ignored if SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_JWK_SET_URI is also set.                                  | null          |

Like for example this `docker-compose` configuration:

```
optimize:
    container_name: optimize
    image: camunda/optimize:latest
    ports:
        - 8090:8090
    environment:
        - SPRING_PROFILES_ACTIVE=ccsm
        - CAMUNDA_OPTIMIZE_IDENTITY_ISSUER_URL=http://localhost:9090
        - CAMUNDA_OPTIMIZE_IDENTITY_ISSUER_BACKEND_URL=http://keycloak:8080/auth/realms/camunda-platform
        - CAMUNDA_OPTIMIZE_IDENTITY_CLIENTID=optimize
        - CAMUNDA_OPTIMIZE_IDENTITY_CLIENTSECRET=secret
        - CAMUNDA_OPTIMIZE_IDENTITY_AUDIENCE=optimize-api
        - OPTIMIZE_ELASTICSEARCH_HOST=localhost
        - OPTIMIZE_ELASTICSEARCH_HTTP_PORT=9200
        - CAMUNDA_OPTIMIZE_SECURITY_AUTH_COOKIE_SAME_SITE_ENABLED=false
        - CAMUNDA_OPTIMIZE_ENTERPRISE=false
        - CAMUNDA_OPTIMIZE_ZEEBE_ENABLED=true
        - CAMUNDA_OPTIMIZE_ZEEBE_NAME=zeebe-record
        - CAMUNDA_OPTIMIZE_ZEEBE_PARTITION_COUNT=1
        - CAMUNDA_OPTIMIZE_SHARING_ENABLED=true
        - CAMUNDA_OPTIMIZE_UI_LOGOUT_HIDDEN=true
        - SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_JWK_SET_URI=https://weblogin.cloud.company.com/.well-known/jwks.json
        - OPTIMIZE_API_ACCESS_TOKEN=secret
```

Self-Managed Optimize must be able to connect to Elasticsearch to write and read data. In addition, Optimize needs to connect to Identity for authentication purposes. Both of these requirements can be configured with the options described above.

Optimize must also be configured as a client in Identity, and users will only be granted access to Optimize if they have a role
that has `write:*` permission for Optimize.

For Optimize to import Zeebe data, Optimize must also be configured to be aware of the record prefix used when the records are exported to Elasticsearch. This can also be configured per the example above.

### Connectors

Use the provided [Docker Compose](#docker-compose) files to execute all [out-of-the-box Connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md) automatically.
This uses the [Connectors Bundle](https://hub.docker.com/r/camunda/connectors-bundle) Docker image.

Note that some out-of-the-box Connectors are licensed under the
[Camunda Platform Self-Managed Free Edition license](https://camunda.com/legal/terms/cloud-terms-and-conditions/camunda-cloud-self-managed-free-edition-terms/).
Find an overview in the [Connectors Bundle project](https://github.com/camunda/connectors-bundle).

Refer to the [Connector installation guide](../../connectors-deployment/install-and-start) for details on how to provide the Connector templates for modeling.

#### Custom set of Connectors

To add custom Connectors, you can build on top of our [Connectors base image](https://hub.docker.com/r/camunda/connectors/) that includes the pre-packaged runtime environment without any Connector.
To use the image, at least one Connector must be added to the `classpath`. We recommend providing JARs with all dependencies bundled.

:::caution

As all Connectors share a single `classpath`, different versions of the same dependency can be available and cause conflicts.
To prevent this, common dependencies like `jackson` can be shaded and relocated inside the Connector's JAR.

:::

You can add a Connector JAR by extending the base image with a JAR from a public URL:

```yml
FROM camunda/connectors:0.3.0

ADD https://repo1.maven.org/maven2/io/camunda/connector/connector-http-json/0.11.0/connector-http-json-0.11.0-with-dependencies.jar /opt/app/
```

You can also add a Connector JAR using volumes:

```bash
docker run --rm --name=connectors -d -v $PWD/connector.jar:/opt/app/ camunda/connectors:0.3.0
```
