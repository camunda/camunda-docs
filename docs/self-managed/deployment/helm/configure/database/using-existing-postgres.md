---
id: using-existing-postgres
title: "Use external PostgreSQL"
sidebar_label: External PostgreSQL
description: "Learn how to use an external PostgresQL instance in Camunda 8 Self-Managed deployment."
---

The Camunda Helm chart requires externally managed PostgreSQL for Camunda Hub and Management Identity. This guide steps through connecting these components to an external PostgreSQL instance.

This page applies to Management Identity and Camunda Hub. Configure the database for an external Keycloak deployment separately. It does not apply to the Orchestration Cluster or Optimize.

## Prerequisites

- **Running external PostgreSQL service**
- **Connection details:** following sample values are used in this guide (replace them with your own):

```yaml
host: `db.example.com`
port: `5432`
username: `postgres`
password: `examplePassword`
```

- **Supported versions:**: Check the [supported environments](/reference/supported-environments.md) and [RDBMS support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md) pages to confirm which PostgreSQL versions are supported.
- **Database setup:** Ensure the required databases exist in your PostgreSQL instance. For this guide, create the following databases:

```SQL
CREATE DATABASE "web-modeler";
CREATE DATABASE "keycloak";
CREATE DATABASE "management-identity";
```

- **Kubernetes secrests:** Store the database password in a Kubernetes secret so it is not referenced in plain text within your values.yaml (This secret exists outside the Helm chart and will not be overwritten by subsequent helm upgrade commands). For example:

```bash
kubectl create secret generic camunda-psql-db --from-literal=password=examplePassword -n camunda
```

## Configuration

Management Identity and Camunda Hub require PostgreSQL. Configure each component to connect to the external PostgreSQL instance.

### Parameters

| values.yaml option                                             | type    | default | description                                                              |
| -------------------------------------------------------------- | ------- | ------- | ------------------------------------------------------------------------ |
| `camundaHub.restapi.externalDatabase.url`                      | string  | `""`    | JDBC URL of the database                                                 |
| `camundaHub.restapi.externalDatabase.username`                 | string  | `""`    | Username of the database                                                 |
| `camundaHub.restapi.externalDatabase.secret.existingSecret`    | string  | `""`    | Kubernetes Secret name containing a database password                    |
| `camundaHub.restapi.externalDatabase.secret.existingSecretKey` | string  | `""`    | Key within the Kubernetes Secret that has the database password          |
| `camundaHub.restapi.externalDatabase.secret.inlineSecret`      | string  | `""`    | String literal of the database password if not using a Kubernetes Secret |
| `identity.externalDatabase.enabled`                            | boolean | `false` | Enable the externalDatabase options                                      |
| `identity.externalDatabase.host`                               | string  | `""`    | Hostname of the database                                                 |
| `identity.externalDatabase.port`                               | integer | `5432`  | Port of the database                                                     |
| `identity.externalDatabase.username`                           | string  | `""`    | Username of the database                                                 |
| `identity.externalDatabase.secret.existingSecret`              | string  | `""`    | Kubernetes Secret name containing database password                      |
| `identity.externalDatabase.secret.existingSecretKey`           | string  | `""`    | Key within the Kubernetes Secret that contains the database password     |
| `identity.externalDatabase.database`                           | string  | `""`    | Database name                                                            |

### Example usage

```yaml
camundaHub:
  enabled: true
  restapi:
    externalDatabase:
      url: "jdbc:postgresql://db.example.com:5432/web-modeler"
      username: "postgres"
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
    database: "management-identity"
```

## Troubleshooting

### Other components log `401` errors

**Observed behavior:** Applications other than Keycloak log `401` errors.

**Why this happens:** The Keycloak database is misconfigured, so other components can't authenticate against Keycloak.

**How to fix:** Verify the Keycloak database connection settings, and confirm Keycloak itself starts up without errors before checking other components.

### A component logs a `database missing` error

**Observed behavior:** A component logs a `database missing` error at startup.

**Why this happens:** The database it expects hasn't been created yet in your external PostgreSQL instance.

**How to fix:** Create the missing database in your external PostgreSQL instance, matching the name that component expects.

## References
