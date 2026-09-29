---
id: using-existing-postgres
title: "Use external PostgreSQL"
sidebar_label: External PostgreSQL
description: "Learn how to use an external PostgresQL instance in Camunda 8 Self-Managed deployment."
---

The [Helm chart deployment](/self-managed/deployment/helm/install/quick-install.md) can optionally install an internal PostgreSQL using [Bitnami subcharts](../../configure/registry-and-images/install-bitnami-enterprise-images.md). For production environments, we advise deploying PostgreSQL separately from the Camunda Helm charts. This guide steps through using an external PostgreSQL instance.

This page applies to Management Identity and Web Modeler. It does not apply to the Orchestration Cluster or Optimize.

In the Camunda Helm chart, Keycloak (`identityKeycloak`) is deprecated and disabled by default. If you use the bundled Keycloak, its database is provisioned by an internal PostgreSQL sub-chart. The chart only lets you supply a password secret for that internal database; it does not support connecting Keycloak to a separately hosted external PostgreSQL instance. See [internal Keycloak](../authentication-and-authorization/internal-keycloak.md) for the supported credential options, or connect to an external identity provider such as [Microsoft Entra ID](../authentication-and-authorization/microsoft-entra.md) or a [generic OIDC provider](../authentication-and-authorization/generic-oidc-provider.md) to avoid deploying Keycloak's database entirely.

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
CREATE DATABASE "management-identity";
```

- **Kubernetes secrests:** Store the database password in a Kubernetes secret so it is not referenced in plain text within your values.yaml (This secret exists outside the Helm chart and will not be overwritten by subsequent helm upgrade commands). For example:

```bash
kubectl create secret generic camunda-psql-db --from-literal=password=examplePassword -n camunda
```

## Configuration

Two Camunda 8 Self-Managed components can connect to an external PostgreSQL instance through this guide: Management Identity and Web Modeler.
Configure each component to connect to the external PostgreSQL instance.

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

:::note
Earlier versions of this page also listed `identityKeycloak.externalDatabase.*` parameters. As of chart version [camunda-platform-8.9-14.0.0](https://github.com/camunda/camunda-platform-helm/blob/camunda-platform-8.9-14.0.0/charts/camunda-platform-8.9/values.yaml), those parameters don't exist. The bundled Keycloak sub-chart only supports `identityKeycloak.postgresql.auth.existingSecret` and `identityKeycloak.postgresql.auth.secretKeys.adminPasswordKey` / `userPasswordKey` to override the password of its own internal PostgreSQL database, described in [internal Keycloak](../authentication-and-authorization/internal-keycloak.md). It doesn't support connecting to a separately hosted external PostgreSQL instance.
:::

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
    database: "management-identity"
```

## Troubleshooting

- If Management Identity's database is misconfigured, other applications will output a `401` error code in the logs as they are not able to correctly authenticate.
- If you have not created the databases in your external PostgreSQL instance, a `database missing` error will output in the logs of the respective component.

## References
