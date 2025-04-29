---
id: using-existing-postgres
title: "Using existing PostgreSQL"
description: "Learn how to use an Amazon OpenSearch Service instance in Camunda 8 Self-Managed deployment."
---

Camunda 8 Self-Managed has three components that use PostgreSQL:

- Identity
- Keycloak
- WebModeler

For more details, review the [architecture](../../about-self-managed.md#architecture) documentation.

This guide steps through using an existing PostgreSQL instance. By default, [Helm chart deployment](/self-managed/setup/overview.md) creates a new PostgreSQL instance, but it's possible to use an existing, external PostgreSQL Service instead.

## Preparation

### Authentication

Make sure you have the following information for your existing PostgreSQL instance. For the sake of this guide, sample values will be used:

- host: `db.example.com`
- port: `5432`
- username: `postgres`
- password: `examplePassword`

### Database setup

Make sure to have created the relevant databases in your PostgreSQL instance. Here are the databases that we will create for this guide:

```SQL
CREATE DATABASE "web-modeler";
CREATE DATABASE "keycloak";
CREATE DATABASE "identity";
```

### Creating Secrets

Once you have the above infromation, it is best to create a Kubernetes secret for the database password, so you do not have to refer to sensitive information in plain text within your values.yaml.

A secret for the existing PostgreSQL instance can be created like this:

```bash
kubectl create secret generic camunda-psql-db --from-literal=password=examplePassword -n camunda
```

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
  # disable internal psql
  postgresql:
    enabled: false
  auth:
    adminUser: postgres
    existingSecret: "camunda-psql-db"
    existingSecretPasswordKey: "password"
  externalDatabase:
    host: "db.example.com"
    port: 5432
    user: "postgres"
    existingSecret: "camunda-psql-db"
    existingSecretKey: "password"
    database: "keycloak"
```
