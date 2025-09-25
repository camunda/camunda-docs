---
id: using-existing-postgres
title: "Use external PostgreSQL"
description: "Learn how to use an Amazon OpenSearch Service instance in Camunda 8 Self-Managed deployment."
---

This guide steps through using an external PostgreSQL instance. By default, [Helm chart deployment](/self-managed/setup/overview.md) creates a new PostgreSQL instance, but it's possible to use an external, external PostgreSQL Service instead.

Three Camunda 8 Self-Managed components use PostgreSQL:

- Identity
- Keycloak
- Web Modeler

## Prerequisites

### Supported version

To confirm the supported version of PostgreSQL, check the [supported environments](/reference/supported-environments.md) page.

### Authentication

Make sure you have the following information for your external PostgreSQL instance. For the sake of this guide, sample values will be used:

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

A secret for the external PostgreSQL instance can be created like this:

```bash
kubectl create secret generic camunda-psql-db --from-literal=password=examplePassword -n camunda
```

This secret will exist outside the Helm chart and will not be affected on subsequent `helm upgrade` commands.

## Configuration

### Parameters

| values.yaml option                                             | type    | default | description                                                              |
| -------------------------------------------------------------- | ------- | ------- | ------------------------------------------------------------------------ |
| `webModeler.restapi.externalDatabase.url`                      | string  | `""`    | JDBC url of the database                                                 |
| `webModeler.restapi.externalDatabase.user`                     | string  | `""`    | Username of the database                                                 |
| `webModeler.restapi.externalDatabase.secret.existingSecret`    | string  | `""`    | Kubernetes Secret name containing a database password                    |
| `webModeler.restapi.externalDatabase.secret.existingSecretKey` | string  | `""`    | Key within the Kubernetes Secret that has the database password          |
| `webModeler.restapi.externalDatabase.secret.inlineSecret`      | string  | `""`    | string literal of the database password if not using a Kubernetes Secret |
| `identity.externalDatabase.enabled`                            | boolean | `false` | Enable the externalDatabase options                                      |
| `identity.externalDatabase.host`                               | string  | `""`    | Hostname of the database                                                 |
| `identity.externalDatabase.port`                               | integer | `5432`  | Port of the database                                                     |
| `identity.externalDatabase.username`                           | string  | `""`    | Username of the database                                                 |
| `identity.externalDatabase.secret.existingSecret`              | string  | `""`    | Kubernetes Secret name containing database password                      |
| `identity.externalDatabase.secret.existingSecretKey`           | string  | `""`    | Key within the Kubernetes Secret that contains the database password     |
| `identity.externalDatabase.database`                           | string  | `""`    | Database name                                                            |
| `identityKeycloak.externalDatabase.host`                       | string  | `""`    | Database host name                                                       |
| `identityKeycloak.externalDatabase.port`                       | integer | `5432`  | Database port number                                                     |
| `identityKeycloak.externalDatabase.user`                       | string  | `""`    | Database user name                                                       |
| `identityKeycloak.externalDatabase.existingSecret`             | string  | `""`    | Kubernetes Secret containing the database password                       |
| `identityKeycloak.externalDatabase.existingSecretKey`          | string  | `""`    | Key within the Kubernetes Secret containing the database password        |
| `identityKeycloak.externalDatabase.database`                   | string  | `""`    | Database name                                                            |

### Example usage

```yaml
webModeler:
  enabled: true
  restapi:
    mail:
      fromAddress: noreply@camunda.mycompany.com
      fromName: Camunda 8 WebModeler
    externalDatabase:
      url: "jdbc:postgresql://db.example.com:5432/web-modeler"
      user: "postgres"
      secret:
        existingSecret: "camunda-psql-db"
        existingSecretKey: "password"

identity:
  externalDatabase:
    enabled: true
    host: "db.example.com"
    port: 5432
    username: "postgres"
    secret:
      existingSecret: "camunda-psql-db"
      existingSecretKey: "password"
    database: "identity"

identityKeycloak:
  externalDatabase:
    url: "jdbc:postgresql://db.example.com:5432/modeler"
    user: "postgres"
    existingSecret: "camunda-psql-db"
    existingSecretKey: "password"
  auth:
    adminUser: postgres
    existingSecret: "camunda-psql-db"
    existingSecretPasswordKey: "password"
  # disable internal psql for keycloak
  postgresql:
    enabled: false
```

## Troubleshooting

- If the database for Keycloak is misconfigured, other applications will output a `401` error code in the logs as they are not able to correctly authenticate against Keycloak.
- If you have not created the databases in your external PostgreSQL instance, a `database missing` error will output in the logs of the respective component.

## References
