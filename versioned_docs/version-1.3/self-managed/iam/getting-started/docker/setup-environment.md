---
id: setup-environment
title: "Setup environment"
sidebar_label: "Step 1: Setup environment"
---

In this part of the tutorial, we'll show you how you can use containerization to run the IAM application on your machine. Here, it is assumed you have a basic understanding of Docker Compose.

:::tip
Not sure what Docker Compose is? Review Docker's [Overview of Docker Compose](https://docs.docker.com/compose/) guide.
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
  iam:
    image: camunda/iam:latest
    ports:
      - 8080:8080
    environment:
      DEFAULT_CLIENT_CREATE: "false"
      IAM_CLIENT_SECRET: [a random 32 char alphanumeric string]
      ENFORCE_HTTPS: "false"
```

:::note
Here, we set `ENFORCE_HTTPS` to **false** so we can use localhost. We recommend removing this option prior to production use.
:::

2. IAM requires a database to function. Add a database service to your `docker-compose.yml` file:

```yaml
database:
    image: postgres:13.3-alpine
    environment:
    POSTGRES_DB: iam
    POSTGRES_USER: camunda
    POSTGRES_PASSWORD: [a random alphanumeric string]
    healthcheck:
        test: pg_isready -d iam -U camunda
        interval: 30s
        timeout: 15s
        retries: 5
```

:::caution
The IAM application currently only supports PostgreSQL 12+. Additionally, The IAM application generates an encryption key per start. This means the database must be recreated each time.
:::

3. We'll also need to add new entries to the `services.iam.environment` section to tell IAM where the database is located, and the password for access:

```yaml
  DB_PASSWORD: [the password you entered for `database.POSTGRES_PASSWORD`]
  DB_URL: jdbc:postgresql://database:5432/iam
```

4. Let's tell Docker Compose that the `iam` service is dependent on the `database` service by adding the following lines under `services.iam`:

```yaml
    depends_on:
      - database
```

5. Add an override to enable the user management functionality. To do this, add the following line to the `services.iam.environment` section:

```yaml
  FEATURE_USER_MANAGEMENT: "true"
```

Your `docker-compose.yml` file should now look like this:

<details><summary>Show complete Docker Compose file</summary>

```yaml
version: "3.6"

services:
  application:
    image: camunda/iam:latest
    depends_on:
      - database
    ports:
      - 8080:8080
    environment:
      DEFAULT_CLIENT_CREATE: "false"
      IAM_CLIENT_SECRET: [a random 32 char alphanumeric string]
      ENFORCE_HTTPS: "false"
      FEATURE_USER_MANAGEMENT: "true"
      DB_URL: jdbc:postgresql://database:5432/iam
      DB_PASSWORD: [the password you entered for `database.POSTGRES_PASSWORD`]

  database:
    image: postgres:13.3-alpine
    environment:
      POSTGRES_DB: iam
      POSTGRES_USER: camunda
      POSTGRES_PASSWORD: [a random alphanumeric string]
    healthcheck:
      test: pg_isready -d iam -U camunda
      interval: 30s
      timeout: 15s
      retries: 5

```
</details>

### Conclusion

Now that we've configured the containers for the IAM application and the supporting database, let's start the services.
