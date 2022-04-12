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

A default docker compose configuration to run Zeebe, Operate, Tasklist, Optimize and Identity is available in [camunda-platform](https://github.com/camunda/camunda-platform/blob/main/docker-compose.yaml) repository.
Follow the instructions in the [README](https://github.com/camunda/camunda-platform/blob/main/docker-compose.yaml) to start the local environment.

While the Docker images itself are supported for production usage, the provided [docker-compose.yaml](https://github.com/camunda/camunda-platform/blob/main/docker-compose.yaml) is designed to be used by developers to run an environment locally, it is not designed to be used in production. We recommend to use [Kubernetes](../kubernetes) in production, see also [Installation Overview](./).

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
## Identity

You can use the Docker image `camunda/identity:latest` to run Identity as a container.

The following steps walk you through the requirements and configuration.

1. Navigate to a directory of your choice and create a `docker-compose.yml` file containing the following starting structure:

```yaml
version: "3.6"

services:
  identity:
    image: camunda/identity:latest
    ports:
      - "8080:8080"
    healthcheck:
      test: [ "CMD", "curl", "-f", "http://localhost:8082/actuator/health" ]
      interval: 30s
      timeout: 15s
      retries: 5
      start_period: 30s
```

2. Identity requires a Keycloak instance to function. Add a Keycloak instance service to your `docker-compose.yml` file:

```yaml
keycloak:
  image: jboss/keycloak:16.1.1
  ports:
    - "18080:8080"
  environment:
    KEYCLOAK_USER: admin
    KEYCLOAK_PASSWORD: admin
  healthcheck:
    test: ["CMD", "curl", "-f", "http://localhost:9990/health"]
    interval: 30s
    timeout: 15s
    retries: 5
    start_period: 30s
```

:::note
To learn more about Keycloak, see the [Keycloak website](https://www.keycloak.org/).
:::

3. We'll also need to add new entries to the `services.identity.environment` section to tell Identity where Keycloak is located:

```yaml
  KEYCLOAK_URL: http://keycloak:8080/auth
  IDENTITY_AUTH_PROVIDER_BACKEND_URL: http://keycloak:8080/auth/realms/camunda-platform
```

4. Let's provide details for a user to be created on startup by adding the following entries to the `services.identity.environment` section:

```yaml
  KEYCLOAK_USERS_0_FIRST_NAME: "Bark"
  KEYCLOAK_USERS_0_LAST_NAME: "Barkins"
  KEYCLOAK_USERS_0_USERNAME: "demo"
  KEYCLOAK_USERS_0_PASSWORD: "demo"
  KEYCLOAK_USERS_0_ROLES_0: "Identity"
```

5. Tell Docker Compose that the `identity` service is dependent on the `keycloak` service by adding the following lines under `services.identity`:

```yaml
    depends_on:
      - keycloak
```

Your `docker-compose.yml` file should now look like this:

<details><summary>Show complete Docker Compose file</summary>

```yaml
version: "3.6"

services:
  keycloak:
    container_name: keycloak
    image: jboss/keycloak:16.1.1
    ports:
      - "18080:8080"
    environment:
      KEYCLOAK_USER: admin
      KEYCLOAK_PASSWORD: admin
    healthcheck:
      test: [ "CMD", "curl", "-f", "http://localhost:9990/health" ]
      interval: 30s
      timeout: 15s
      retries: 5
      start_period: 30s

  identity:
    depends_on:
      - keycloak
    restart: on-failure
    container_name: identity
    image: camunda/identity:8.0.0
    ports:
      - "8080:8080"
    environment:
      KEYCLOAK_URL: http://keycloak:8080/auth
      IDENTITY_AUTH_PROVIDER_BACKEND_URL: http://keycloak:8080/auth/realms/camunda-platform
      KEYCLOAK_USERS_0_FIRST_NAME: "Bark"
      KEYCLOAK_USERS_0_LAST_NAME: "Barkins"
      KEYCLOAK_USERS_0_USERNAME: "demo"
      KEYCLOAK_USERS_0_PASSWORD: "demo"
      KEYCLOAK_USERS_0_ROLES_0: "Identity"
```
</details>

Now you can start up Identity:

```shell
docker compose -f /path/to/your/docker-compose.yml up -d
```

This exposes a web interface on [localhost:8080](http://localhost:8080/).

:::note
If you are using Docker Compose V1, you can use the command `docker-compose`.
:::

This command starts the `identity` and `keycloak` services. The health of the services can be checked with the following command:

```shell
docker ps
```

Your output should look similar to the following:

```text
CONTAINER ID   IMAGE                   COMMAND                  CREATED       STATUS                 PORTS                               NAMES
e15d9e80f18d   camunda/identity:8.0.0  "java -jar identity.…"   5 hours ago   Up 5 hours             0.0.0.0:8080->8080/tcp              identity
9e209e46b4df   jboss/keycloak:16.1.1   "/opt/jboss/tools/do…"   5 hours ago   Up 5 hours (healthy)   8443/tcp, 0.0.0.0:18080->8080/tcp   keycloak
```

:::tip
If the container for the Identity application does not remain healthy, you can use the `CONTAINER ID` to check the logs by running `docker logs <COMTAINER_ID>`.
:::

After starting the Identity application, you can move on and [log in](../../identity/getting-started/).

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

