---
id: using-existing-postgres
title: "Using existing PostgreSQL"
description: "Learn how to use an Amazon OpenSearch Service instance in Camunda 8 Self-Managed deployment."
---

This guide steps through using an existing PostgreSQL instance. By default, [Helm chart deployment](/self-managed/setup/overview.md) creates a new PostgreSQL instance, but it's possible to use an existing, external PostgreSQL Service instead.

Three Camunda 8 Self-Managed components use PostgreSQL:

- Identity
- Keycloak
- Web Modeler

For more details, review the [architecture](../../about-self-managed.md#architecture) documentation.

## Prerequisites

### Supported version

To confirm the supported version of PostgreSQL, check the [supported environments](/reference/supported-environments.md) page.

### Authentication

Make sure you have the following information for your existing PostgreSQL instance. For the sake of this guide, sample values will be used:

- host: `db.example.com`
- port: `5432`
- username: `postgres`
- password: `examplePassword`

### Database setup

Ensure you have created the relevant databases in your PostgreSQL instance. For this guide, we will create the following databases:

```SQL
CREATE DATABASE "web-modeler";
CREATE DATABASE "keycloak";
CREATE DATABASE "identity";
```

### Creating Kubernetes secrets

Once you have confirmed the above, create a Kubernetes secret for the database password so you do not have to refer to sensitive information in plain text within your `values.yaml`.

A secret for the existing PostgreSQL instance can be created like this:

```bash
kubectl create secret generic camunda-psql-db --from-literal=password=examplePassword -n camunda
```

This secret will exist outside the Helm chart and will not be affected on subsequent `helm upgrade` commands.

## Values file

```yaml
webModeler:
  enabled: true
  restapi:
    mail:
      fromAddress: noreply@camunda.mycompany.com
      fromName: Camunda 8 WebModeler
    externalDatabase:
      url: "jdbc:postgresql://db.example.com:5432/modeler"
      user: "postgres"
      existingSecret: "camunda-psql-db"
      existingSecretKey: "password"

identity:
  externalDatabase:
    enabled: true
    host: "db.example.com"
    port: 5432
    username: "postgres"
    existingSecret: "camunda-psql-db"
    existingSecretKey: "password"
    database: "identity"

identityKeycloak:
  externalDatabase:
    host: "db.example.com"
    port: 5432
    user: "postgres"
    existingSecret: "camunda-psql-db"
    existingSecretKey: "password"
    database: "keycloak"
  auth:
    adminUser: postgres
    existingSecret: "camunda-psql-db"
    existingSecretPasswordKey: "password"
  # disable internal psql for keycloak
  postgresql:
    enabled: false
```

## Common pitfalls

- If the database for Keycloak is misconfigured, other applications will output a `401` error code in the logs as they are not able to correctly authenticate against Keycloak.
- If you have not created the databases in your external PostgreSQL instance, a `database missing` error will output in the logs of the respective component.
