---
id: setup-environment
title: "Set up environment"
sidebar_label: "Step 1: Set up environment"
---

In this part of the tutorial, we'll show you how you can use containerization to run the Identity application on your machine. Here, it is assumed you have a basic understanding of Docker Compose.

:::tip
Not sure what Docker Compose is? Check out Docker's [Overview of Docker Compose](https://docs.docker.com/compose/).
:::

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Configuration

To configure, take the following steps:

1. Navigate to a directory of your choice and create a `docker-compose.yml` file containing the following starting structure:

```yaml
version: "3.6"

services:
  identity:
    image: camunda/identity:latest
    ports:
      - "8080:8080"
    restart: on-failure
```

2. Identity requires a Keycloak instance to function. Add a Keycloak instance service to your `docker-compose.yml` file:

```yaml
keycloak:
  image: jboss/keycloak:16.1.1
  volumes:
    - ./keycloak/themes/identity:/opt/jboss/keycloak/themes/identity
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

4. Tell Docker Compose that the `identity` service is dependent on the `keycloak` service by adding the following lines under `services.identity`:

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
    volumes:
      - ./keycloak/themes/identity:/opt/jboss/keycloak/themes/identity
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
    image: identity:latest
    build: ../../../../..
    ports:
      - "8080:8080"
    environment:
      KEYCLOAK_URL: http://keycloak:8080/auth
      IDENTITY_AUTH_PROVIDER_BACKEND_URL: http://keycloak:8080/auth/realms/camunda-platform
```
</details>

### Conclusion

Now that we've configured the containers for the Identity application and the supporting Keycloak instance, let's move on to [starting the services](../starting-the-services).
