---
id: docker
title: "Docker"
---

This page guides you through running Camunda Platform 8 via Docker. 


Prerequisites to use Docker:

- Operating system:
  - Linux
  - Windows/MacOS (development only, not supported for production)
- Docker


## Docker Images

We provide Docker images [via Dockerhub](https://hub.docker.com/u/camunda). All those images are publicly accessible.

## Docker Compose

A default docker compose configuration to run Zeebe, Operate, and Tasklist is available in the get started repository: [docker-compose.yaml](https://github.com/camunda-cloud/camunda-cloud-get-started/blob/master/docker-compose.yaml).

Download this file to your local computer, `cd` into that directory, and run `docker-compose up`.

The following ports are exposed:

- `26500`: Zeebe Gateway API
- [`8080`](http://localhost:8080/): Operate
- [`8081`](http://localhost:8081/): Tasklist

While the Docker images itself are supported for production usage, the provided [docker-compose.yaml](https://github.com/camunda-cloud/camunda-cloud-get-started/blob/master/docker-compose.yaml) is designed to be used by developers to run an environment locally, it is not designed to be used in production. We recommend to use [Kubernetes](../kubernetes) in production, see also [Installation Overview](./).


## Zeebe

You can run Zeebe with Docker:

```bash
docker run --name zeebe -p 26500-26502:26500-26502 camunda/zeebe:latest
```

This will give you a single broker node.

### Ports

The docker image exposes the following ports:

- `26500`: Gateway API
- `26501`: Command API (gateway-to-broker)
- `26502`: Internal API (broker-to-broker)

### Volumes

The default data volume is under `/usr/local/zeebe/data`. It contains
all data which should be persisted.

### Configuration

The Zeebe configuration is located at `/usr/local/zeebe/config/application.yaml`.
The logging configuration is located at `/usr/local/zeebe/config/log4j2.xml`.

The configuration of the Docker image can also be changed using environment
variables. The configuration template file also contains information on the environment
variables to use for each configuration setting.

Available environment variables:

- `ZEEBE_LOG_LEVEL` - sets the log level of the Zeebe Logger (default: `info`).
- `ZEEBE_BROKER_NETWORK_HOST` - sets the host address to bind to instead of the IP of the container.
- `ZEEBE_BROKER_CLUSTER_INITIALCONTACTPOINTS` - sets the contact points of other brokers in a cluster setup.




## Operate

You can use the Docker image `camunda/operate:latest` to run Operate as a container.

:::note
Ensure you set the appropriate settings described in the [Operate configuration](../../operate-deployment/configuration) section.
:::note

Like for example this `docker-compose` configuration:

```
operate:
    container_name: operate
    image: camunda/operate:latest
    ports:
        - 8080:8080
    environment:
        - camunda.operate.elasticsearch.url=http://elasticsearch:9200
        - camunda.operate.zeebeElasticsearch.url=http://elasticsearch:9200
        - camunda.operate.zeebe.gatewayAddress=zeebe:26500
```

## Tasklist

You can use the Docker image `camunda/tasklist:latest` to run Tasklist as a container.

:::note
Configure the appropriate settings described in the [Tasklist configuration](../../tasklist-deployment/configuration) section.
:::

Like for example this `docker-compose` configuration:

```
tasklist:
    container_name: tasklist
    image: camunda/tasklist:latest
    ports:
        - 8080:8080
    environment:
        - camunda.tasklist.elasticsearch.url=http://elasticsearch:9200
        - camunda.tasklist.zeebeElasticsearch.url=http://elasticsearch:9200
        - camunda.tasklist.zeebe.gatewayAddress=zeebe:26500
```

## Optimize

The `camunda/optimize:latest` Docker image can be used to run Optimize 

:::note
Configure the appropriate settings described in the [Optimize configuration](../../optimize-deployment/setup/) section.
:::

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

Some configuration properties are optional and have default values. See a description of these properties and their default values in the table below:

Name | Description | Default value
-----|-------------|--------------
SPRING_PROFILES_ACTIVE | Starts Optimize in Self-Managed mode. |
CAMUNDA_OPTIMIZE_IDENTITY_ISSUER_URL | The URL at which Identity can be accessed by Optimize. |
CAMUNDA_OPTIMIZE_IDENTITY_ISSUER_BACKEND_URL | The URL at which the Identity auth provider can be accessed by Optimize. This should match the configured provider in Identity and is to be used for container to container communication. |
CAMUNDA_OPTIMIZE_IDENTITY_CLIENTID | The Client ID used to register Optimize with Identity. |
CAMUNDA_OPTIMIZE_IDENTITY_CLIENTSECRET | The secret used when registering Optimize with Identity. |
CAMUNDA_OPTIMIZE_IDENTITY_AUDIENCE | The audience used when registering Optimize with Identity. |
OPTIMIZE_ELASTICSEARCH_HOST | The address/hostname under which the Elasticsearch node is available. | localhost
OPTIMIZE_ELASTICSEARCH_HTTP_PORT | The port number used by Elasticsearch to accept HTTP connections. | 9200
CAMUNDA_OPTIMIZE_SECURITY_AUTH_COOKIE_SAME_SITE_ENABLED| Determines whether or not `same-site` is enabled for Optimize cookies. This must be set to `false`. | true
CAMUNDA_OPTIMIZE_ENTERPRISE | This should only be set to `true` if an Enterprise License has been acquired. | true
CAMUNDA_OPTIMIZE_ZEEBE_ENABLED | Enables import of Zeebe data in Optimize. | false
CAMUNDA_OPTIMIZE_ZEEBE_NAME | The record prefix for exported Zeebe records. | zeebe-record
CAMUNDA_OPTIMIZE_ZEEBE_PARTITION_COUNT | The number of partitions configured in Zeebe. | 1
CAMUNDA_OPTIMIZE_SHARING_ENABLED | Enable/disable the possibility to share reports and dashboards. | true
CAMUNDA_OPTIMIZE_UI_LOGOUT_HIDDEN | Disables the logout button (logout is handled by Identity). | true
SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_JWK_SET_URI | Authentication for the Public REST API using a resource server to validate the JWT token. Complete URI to get public keys for JWT validation | null
OPTIMIZE_API_ACCESS_TOKEN | Authentication for the Public REST API using a static shared token. Will be ignored if SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_JWK_SET_URI is also set. | null


Self-Managed Optimize must be able to connect to Elasticsearch to write and read data. In addition, Optimize needs to connect to Identity for authentication purposes. Both of these requirements can be configured with the options described above.

Optimize must also be configured as a client in Identity, and users will only be granted access to Optimize if they have a role
that has `write:*` permission for Optimize.

For Optimize to import Zeebe data, Optimize must also be configured to be aware of the record prefix used when the records are exported to Elasticsearch. This can also be configured per the example above.

