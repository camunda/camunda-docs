---
id: secret-management
title: "Managing Secrets in Camunda 8 Self-Managed"
description: "A comprehensive guide on configuring and managing secrets in Camunda 8, including Keycloak, OAuth client secrets, and first-user authentication."
---

# Camunda Platform Helm Chart – Secrets Management

## Overview

This guide provides detailed instructions for configuring and managing secrets when using the official Helm Chart. It covers:

- A complete list of internal and external secrets
- How to create and reference Kubernetes secrets securely
- Real-world YAML examples for PostgreSQL, TLS, OAuth clients, and more
- Best practices to prevent common pitfalls during upgrades and secret regeneration

---

## Internal Secrets Reference Table

These secrets are generated and managed internally by Camunda’s Helm Chart.

### Identity / Keycloak

| **Secret**                       | **Chart Values Key**                                                                 | **Purpose**                                          | **Default Behavior**          |
| -------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------- | ----------------------------- |
| **Keycloak Admin Password**      | `identity.keycloak.auth.adminPassword`, `identity.keycloak.auth.existingSecret`      | Admin password for Keycloak (Camunda Identity)       | Randomly generated if not set |
| **Keycloak Management Password** | `identity.keycloak.auth.managementPassword`, `identity.keycloak.auth.existingSecret` | Internal password for Identity service communication | Randomly generated if not set |
| **Identity First User Password** | `identity.firstUser.password`, `identity.firstUser.existingSecret`                   | Default user password (`demo/demo`)                  | `demo` unless overridden      |

### OAuth Client Secrets

| **Secret**                           | **Chart Values Key**                                                                                    | **Purpose**                                            | **Default Behavior**          |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ----------------------------- |
| **OAuth Client Secret (Operate)**    | `global.identity.auth.operate.existingSecret.name`, `global.identity.auth.operate.existingSecret`       | OAuth client secret for Operate                        | Randomly generated if not set |
| **OAuth Client Secret (Tasklist)**   | `global.identity.auth.tasklist.existingSecret.name`, `global.identity.auth.tasklist.existingSecret`     | OAuth client secret for Tasklist                       | Randomly generated if not set |
| **OAuth Client Secret (Optimize)**   | `global.identity.auth.optimize.existingSecret.name`, `global.identity.auth.optimize.existingSecret`     | OAuth client secret for Optimize                       | Randomly generated if not set |
| **OAuth Client Secret (Connectors)** | `global.identity.auth.connectors.existingSecret.name`, `global.identity.auth.connectors.existingSecret` | OAuth client secret for Connectors                     | Randomly generated if not set |
| **OAuth Client Secret (Console)**    | `global.identity.auth.console.existingSecret.name`, `global.identity.auth.console.existingSecret`       | OAuth client secret for Camunda Platform Console       | Randomly generated if not set |
| **OAuth Client Secret (Zeebe)**      | `global.identity.auth.zeebe.existingSecret.name`, `global.identity.auth.zeebe.existingSecret`           | OAuth client secret for Zeebe’s internal system client | Randomly generated if not set |

### PostgreSQL Credentials

| **Secret**                          | **Chart Values Key**                                                                                                          | **Purpose**                                                       | **Default Behavior**          |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------- |
| **Identity PostgreSQL Password**    | `identityPostgresql.auth.existingSecret`                                                                                      | Password for embedded PostgreSQL used by Identity                 | Randomly generated if not set |
| **Keycloak PostgreSQL Password**    | `identityKeycloak.auth.existingSecret`                                                                                        | Password for embedded PostgreSQL used by Keycloak                 | Randomly generated if not set |
| **Web Modeler PostgreSQL Password** | `postgresql.auth.existingSecret`, `postgresql.auth.secretKeys.adminPasswordKey`, `postgresql.auth.secretKeys.userPasswordKey` | Passwords for Web Modeler's embedded PostgreSQL via Bitnami chart | Randomly generated if not set |

### Other

| **Secret**                 | **Chart Values Key**                                                | **Purpose**                    | **Default Behavior**    |
| -------------------------- | ------------------------------------------------------------------- | ------------------------------ | ----------------------- |
| **Enterprise License Key** | `global.license.existingSecret`, `global.license.existingSecretKey` | Camunda Enterprise License Key | Not set unless provided |

---

## Optional Secrets Based on Configuration

Some secrets are only required based on your setup. Below are common conditional cases:

- 🔸 **`webModeler.restapi.externalDatabase.existingSecret`** – Required **only if** `postgresql.enabled: false` and you're using an external database.
- 🔸 **`webModeler.restapi.mail.existingSecret`** – Required **only if** you enable SMTP for email invites or notifications.
- 🔸 **`connectors.inbound.auth.existingSecret`** – Needed when **basic authentication** is enabled for inbound connectors (instead of SSO).
- 🔸 **`global.license.existingSecret`** – Needed **only for Camunda Enterprise** users to apply a valid license.

---

## External Secrets Reference Table

These secrets are required when integrating Camunda with external services:

### External Databases and Services

| **Secret**                           | **Chart Values Key**                                                                                            | **Purpose**                                              | **Default Behavior**    |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | ----------------------- |
| **External Database Password**       | `webModeler.restapi.externalDatabase.existingSecret`, `webModeler.restapi.externalDatabase.existingSecret.name` | Password for external PostgreSQL if using an external DB | Not set unless provided |
| **SMTP Password**                    | `webModeler.restapi.mail.existingSecret`                                                                        | SMTP credentials for sending email notifications         | Not set unless provided |
| **Connectors Inbound Auth Password** | `connectors.inbound.auth.existingSecret`, `connectors.inbound.auth.existingSecretKey`                           | Basic auth password for Connectors polling Operate       | Not set unless provided |

### External Search (Elasticsearch / OpenSearch)

| **Secret**                          | **Chart Values Key**                       | **Purpose**                                                     | **Default Behavior**    |
| ----------------------------------- | ------------------------------------------ | --------------------------------------------------------------- | ----------------------- |
| **External Elasticsearch Auth**     | `global.elasticsearch.auth.existingSecret` | Password for external Elasticsearch authentication (basic auth) | Not set unless provided |
| **External Elasticsearch TLS Cert** | `global.elasticsearch.tls.existingSecret`  | TLS certificate for external Elasticsearch over SSL             | Not set unless provided |
| **External OpenSearch Auth**        | `global.opensearch.auth.existingSecret`    | Password for external OpenSearch authentication (basic auth)    | Not set unless provided |
| **External OpenSearch TLS Cert**    | `global.opensearch.tls.existingSecret`     | TLS certificate for external OpenSearch over SSL                | Not set unless provided |

---

## Referencing Secrets in `values.yaml`

> ✅ **Best Practice:** Use the structured form (`existingSecret.name` and `existingSecretKey`) when working with internal secrets. It allows more precise control over which keys are used and promotes reuse of secrets across components.

There are two primary patterns for referencing secrets, depending on the chart and component:

- Use `existingSecret` (flat string) for **simple secrets** such as external database passwords or SMTP credentials.
- Use `existingSecret.name` and `existingSecretKey` (structured form) for **internal secrets** like OAuth client passwords, where the chart expects to access a specific key inside the secret.

> ℹ️ If a field supports the structured format, it's generally safer and clearer to use it.
> The structured format also enables more consistent secret reuse across multiple components.

### Simple (Flat String)

```yaml
webModeler:
  restapi:
    externalDatabase:
      existingSecret: my-db-secret
```

### Structured (Recommended for internal secrets)

```yaml
global:
  identity:
    auth:
      operate:
        existingSecret:
          name: camunda-platform-secrets
        existingSecretKey: operate-secret
```

---

## Creating Kubernetes Secrets

You can create secrets manually or using manifests. For more examples, see [Create Identity Secrets in the Camunda Docs](https://docs.camunda.io/docs/self-managed/setup/install/#create-identity-secrets).

Here's how to create one via `kubectl`:

```sh
kubectl create secret generic camunda-platform-secrets \
  --from-literal=operate-secret=S3cure0p3rat3 \
  --from-literal=tasklist-secret=S3cureT4sk \
  --from-literal=optimize-secret=S3cure0pt1mz \
  --from-literal=connectors-secret=S3cureC0nn3ct \
  --from-literal=console-secret=S3cureC0nsole \
  --from-literal=zebee-secret=S3cureZ33be \
  --namespace camunda
```

Or using YAML:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: camunda-platform-secrets
  namespace: camunda
type: Opaque
stringData:
  operate-secret: "S3cure0p3rat3"
  tasklist-secret: "S3cureT4sk"
  optimize-secret: "S3cure0pt1mz"
  connectors-secret: "S3cureC0nn3ct"
  console-secret: "S3cureC0nsole"
  zeebe-secret: "S3cureZ33be"
```

Apply it with:

```sh
kubectl apply -f my-secret.yaml
```

---

## Example: Centralized Secret for Multiple Credentials

In CI/testing environments, it's common to use a single Kubernetes Secret for all credentials. Below is a snippet using `camunda-platform-secrets`:

> ℹ️ **Note:** This example includes the most common internal secrets. If you're using SMTP, external databases, or connectors with basic auth, you’ll need to add additional secrets for those components, such as:
>
> - `webModeler.restapi.externalDatabase.existingSecret`
> - `webModeler.restapi.mail.existingSecret`
> - `connectors.inbound.auth.existingSecret`
> - `global.license.existingSecret`

```yaml
global:
  secrets:
    autoGenerated: false
    name: "camunda-platform-secrets"
  identity:
    auth:
      admin:
        existingSecret:
          name: "camunda-platform-secrets"
        existingSecretKey: "identity-admin-client-password"
      connectors:
        existingSecret:
          name: "camunda-platform-secrets"
        existingSecretKey: "identity-connectors-client-password"
      console:
        existingSecret:
          name: "camunda-platform-secrets"
        existingSecretKey: "identity-console-client-password"
      operate:
        existingSecret:
          name: "camunda-platform-secrets"
        existingSecretKey: "identity-operate-client-password"
      tasklist:
        existingSecret:
          name: "camunda-platform-secrets"
        existingSecretKey: "identity-tasklist-client-password"
      optimize:
        existingSecret:
          name: "camunda-platform-secrets"
        existingSecretKey: "identity-optimize-client-password"
      zeebe:
        existingSecret:
          name: "camunda-platform-secrets"
        existingSecretKey: "identity-zeebe-client-password"
identity:
  firstUser:
    existingSecret: "camunda-platform-secrets"
    existingSecretKey: "identity-user-password"
identityPostgresql:
  auth:
    existingSecret: "camunda-platform-secrets"
identityKeycloak:
  auth:
    existingSecret: "camunda-platform-secrets"
    passwordSecretKey: "identity-keycloak-admin-password"
  postgresql:
    auth:
      existingSecret: "camunda-platform-secrets"
      secretKeys:
        adminPasswordKey: "identity-keycloak-postgresql-admin-password"
        userPasswordKey: "identity-keycloak-postgresql-user-password"
# WebModeler Database.
postgresql:
  enabled: true
  auth:
    existingSecret: "camunda-platform-secrets"
    secretKeys:
      adminPasswordKey: "webmodeler-postgresql-admin-password"
      userPasswordKey: "webmodeler-postgresql-user-password"
```

---

## Disabling Auto-Generated Secrets

> 🛠️ **Troubleshooting:** If a component fails to start after disabling auto-generated secrets, double-check:
>
> - The secret exists in the correct namespace
> - The `existingSecretKey` is accurate and matches the Kubernetes secret
> - `autoGenerated: false` is set and all required secrets are provided

By default, the Camunda Helm Chart auto-generates secrets like OAuth client passwords on first install. This ensures the platform can start without manual configuration but can lead to issues on upgrades if the secrets are regenerated.

To disable auto-generation and use your own pre-created secrets, set:

```yaml
global:
  secrets:
    autoGenerated: false
```

This tells the chart to stop generating secrets and instead expect you to provide all necessary secrets via `existingSecret` references.

---

## PostgreSQL Secrets and Examples

This section covers how to configure PostgreSQL secrets used by the Camunda subcharts: Identity, Keycloak, and Web Modeler.

### Web Modeler PostgreSQL (Bitnami Subchart)

> Web Modeler uses the Bitnami PostgreSQL subchart, which requires both an admin and user password. These must be referenced with `secretKeys` if you are managing secrets manually.

```yaml
postgresql:
  enabled: true
  auth:
    existingSecret: "camunda-platform-secrets"
    secretKeys:
      adminPasswordKey: "webmodeler-postgresql-admin-password"
      userPasswordKey: "webmodeler-postgresql-user-password"
```

### Identity PostgreSQL

> The Identity service includes its own embedded PostgreSQL instance by default. Set `identityPostgresql.auth.existingSecret` to provide your own password and ensure consistent database access across upgrades.

```yaml
identityPostgresql:
  enabled: true
  auth:
    existingSecret: "camunda-platform-secrets"
```

### Keycloak PostgreSQL

> Keycloak uses a PostgreSQL instance for persistence, configured under `identityKeycloak.postgresql`. The chart also allows setting the Keycloak admin UI password under `identityKeycloak.auth`.

```yaml
identityKeycloak:
  postgresql:
    auth:
      existingSecret: "camunda-platform-secrets"
      secretKeys:
        adminPasswordKey: "identity-keycloak-postgresql-admin-password"
        userPasswordKey: "identity-keycloak-postgresql-user-password"
  auth:
    existingSecret: "camunda-platform-secrets"
    passwordSecretKey: "identity-keycloak-admin-password"
```

---

## TLS Secrets

When exposing Camunda services via Ingress with TLS, you typically need a Kubernetes Secret containing your TLS certificate and private key. This is especially important when using tools like cert-manager or when securing public-facing services.

### Chart Values

Set your TLS secret like this:

```yaml
global:
  ingress:
    tls:
      enabled: true
      secretName: camunda-tls-secret
```

### TLS Secret Example

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: camunda-tls-secret
  namespace: camunda
annotations:
  cert-manager.io/issuer: "letsencrypt-prod"
type: kubernetes.io/tls
data:
  tls.crt: <base64 encoded cert>
  tls.key: <base64 encoded key>
```

Make sure to configure the secret name in your `values.yaml` under `global.ingress.tls.secretName`.

---

## 🔗 Additional References

- 📘 [Camunda Docs – Create Identity Secrets](https://docs.camunda.io/docs/self-managed/setup/install/#create-identity-secrets)
- 📘 [Camunda Docs – Configure License Key](https://docs.camunda.io/docs/self-managed/setup/install/#configure-license-key)
- 📘 [Camunda Helm Chart – identity.auth.existingSecrets (8.6)](https://github.com/camunda/camunda-platform-helm/tree/main/charts/camunda-platform-8.6#identity-auth-existing-secrets)
