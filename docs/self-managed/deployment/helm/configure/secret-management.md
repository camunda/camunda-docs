---
id: secret-management
sidebar_label: Secret management
title: Helm charts secret management
description: "Provides an overview for configuring and managing secrets when using the official Helm chart."
---

This guide provides an overview for configuring and managing secrets when using the official Helm chart.

## Secret configuration patterns

The Helm chart supports different patterns for secret management depending on your Camunda version:

### New pattern (Camunda 8.8+, recommended)

Starting with Camunda 8.8, the new pattern uses a structured `secret:` configuration under components with three options:

- `inlineSecret`: Plain-text value for non-production usage
- `existingSecret`: Reference to an existing Kubernetes Secret name
- `existingSecretKey`: Key within the existing secret object

Example:

```yaml
component:
  auth:
    secret:
      inlineSecret: "my-plain-text-secret" # Non-production only
      existingSecret: "my-secret-name" # Recommended
      existingSecretKey: "secret-key"
```

### Legacy pattern (Camunda 8.7 and below)

For Camunda 8.7 and earlier versions, the legacy pattern uses direct `existingSecret` and `existingSecretKey` fields. These are deprecated in 8.8+ but still supported for backward compatibility.

### Bitnami subchart pattern

Some components use Bitnami subcharts for database services (PostgreSQL), which follow their own authentication patterns that differ from the main Camunda secret structure. These use the standard Bitnami PostgreSQL Helm chart pattern with `existingSecret` and `secretKeys` containing `adminPasswordKey` and `userPasswordKey`.

The following Bitnami subchart configurations are available:

- **`identityPostgresql.auth`** - PostgreSQL database for Identity service
- **`identityKeycloak.auth`** - Keycloak admin credentials
- **`identityKeycloak.postgresql.auth`** - PostgreSQL database for Keycloak (when using Identity with Keycloak)
- **`webModelerPostgresql.auth`** - PostgreSQL database for Web Modeler

## Internal secrets

These secrets are used by Camunda applications and must be configured manually when using external secrets.

### Secrets using the new pattern (Camunda 8.8+)

| **Secret**                              | **Chart values key**                        | **Purpose**                                             |
| --------------------------------------- | ------------------------------------------- | ------------------------------------------------------- |
| **Enterprise License Key**              | `global.license.secret`                     | Camunda Enterprise License Key                          |
| **Identity First User Password**        | `identity.firstUser.secret`                 | Default user password (`demo/demo`)                     |
| **OAuth Client Secret (Admin)**         | `global.identity.auth.admin.secret`         | OAuth admin client secret for administrative operations |
| **OAuth Client Secret (Console)**       | `global.identity.auth.console.secret`       | OAuth client secret for Console                         |
| **OAuth Client Secret (Connectors)**    | `global.identity.auth.connectors.secret`    | OAuth client secret for connectors                      |
| **OAuth Client Secret (Orchestration)** | `global.identity.auth.orchestration.secret` | OAuth client secret for Orchestration Cluster           |
| **OAuth Client Secret (Optimize)**      | `global.identity.auth.optimize.secret`      | OAuth client secret for Optimize                        |

### Secrets using Bitnami subchart patterns (all versions)

| **Secret**                          | **Chart values key**                              | **Purpose**                                       |
| ----------------------------------- | ------------------------------------------------- | ------------------------------------------------- |
| **Identity PostgreSQL Password**    | `identityPostgresql.auth.existingSecret`          | Password for embedded PostgreSQL used by Identity |
| **Keycloak Admin Password**         | `identityKeycloak.auth.existingSecret`            | Admin password for Keycloak (Camunda Identity)    |
| **Keycloak PostgreSQL Password**    | `identityKeycloak.postgresql.auth.existingSecret` | Password for embedded PostgreSQL used by Keycloak |
| **Web Modeler PostgreSQL Password** | `webModelerPostgresql.auth.existingSecret`        | Passwords for Web Modeler's embedded PostgreSQL   |

**PostgreSQL Secret Keys**: For PostgreSQL subcharts, both `adminPasswordKey` and `userPasswordKey` are required:

- `adminPasswordKey`: Password for the PostgreSQL administrator (typically used for administrative operations)
- `userPasswordKey`: Password for the application-specific database user (used by the Camunda component)

## External secrets

These secrets are necessary when integrating Camunda with third-party services.

### Secrets using the new pattern (Camunda 8.8+)

| **Secret**                                | **Chart values key**                         | **Purpose**                                                              |
| ----------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------ |
| **Identity External Database Password**   | `identity.externalDatabase.secret`           | Password for external PostgreSQL if using an external DB for Identity    |
| **WebModeler External Database Password** | `webModeler.restapi.externalDatabase.secret` | Password for external PostgreSQL if using an external DB for Web Modeler |
| **SMTP Password**                         | `webModeler.restapi.mail.secret`             | SMTP credentials for sending email notifications                         |
| **External Elasticsearch Auth**           | `global.elasticsearch.auth.secret`           | Password for external Elasticsearch authentication (basic auth)          |
| **External OpenSearch Auth**              | `global.opensearch.auth.secret`              | Password for external OpenSearch authentication (basic auth)             |

## How to configure secrets

Secrets can be configured in different ways depending on your Camunda version:

- **Camunda 8.8+**: Use the new structured `secret:` pattern with `inlineSecret` for non-production or external Kubernetes Secrets for production
- **Camunda 8.7 and below**: Use the legacy pattern with direct `existingSecret` fields

### Method 1: Inline secrets (Camunda 8.8+, non-production only)

For development or testing environments, provide secrets directly in your `values.yaml` using the `inlineSecret` field:

```yaml
global:
  license:
    secret:
      inlineSecret: "my-license-key-here"

identity:
  firstUser:
    secret:
      inlineSecret: "demo-password"
```

### Method 2: External Kubernetes secrets (recommended for all versions)

For production environments, create a Kubernetes Secret and reference it from your `values.yaml`. This method works for both Camunda 8.8+ (with new pattern) and 8.7 and below (with legacy pattern).

#### Step 1: Create the secret

Create a secret using `kubectl` or a YAML manifest:

```sh
kubectl create secret generic console-secret \
  --from-literal=client-secret=camundapassword \
  --namespace camunda
```

Or using YAML:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: console-secret
  namespace: camunda
type: Opaque
stringData:
  client-secret: "camundapassword"
```

#### Step 2: Reference in `values.yaml`

**For components using the new pattern:**

```yaml
global:
  identity:
    auth:
      console:
        secret:
          existingSecret: "console-secret"
          existingSecretKey: "client-secret"
```

**For Bitnami subchart components:**

```yaml
# PostgreSQL database for Identity service
identityPostgresql:
  auth:
    existingSecret: camunda-credentials
    secretKeys:
      adminPasswordKey: identity-postgresql-admin-password
      userPasswordKey: identity-postgresql-user-password

# Keycloak admin credentials
identityKeycloak:
  auth:
    existingSecret: camunda-credentials
    passwordSecretKey: identity-keycloak-admin-password

# PostgreSQL database for Keycloak (when using Identity with Keycloak)
identityKeycloak:
  postgresql:
    auth:
      existingSecret: camunda-credentials
      secretKeys:
        adminPasswordKey: identity-keycloak-postgresql-admin-password
        userPasswordKey: identity-keycloak-postgresql-user-password

# PostgreSQL database for Web Modeler
webModelerPostgresql:
  auth:
    existingSecret: camunda-credentials
    secretKeys:
      adminPasswordKey: web-modeler-postgresql-admin-password
      userPasswordKey: web-modeler-postgresql-user-password
```

For additional details on Identity secrets during installation, visit the [installation guide](/self-managed/deployment/helm/install/quick-install.md#create-identity-secrets).

## Document Store secrets

Document Store secrets now follow the structured `secret:` pattern introduced in Camunda 8.8+, with separate secret configurations for each credential component.

### Secrets using the new pattern (Camunda 8.8+)

| **Secret**                               | **Chart values key**                                   | **Purpose**                                                      |
| ---------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------- |
| **AWS Document Store Access Key ID**     | `global.documentStore.type.aws.accessKeyId.secret`     | AWS access key ID for S3 document storage authentication         |
| **AWS Document Store Secret Access Key** | `global.documentStore.type.aws.secretAccessKey.secret` | AWS secret access key for S3 document storage authentication     |
| **GCP Document Store Service Account**   | `global.documentStore.type.gcp.secret`                 | GCP service account JSON for GCS document storage authentication |

### Secrets using the legacy pattern (deprecated)

The following legacy fields are deprecated in Camunda 8.8+ but remain functional during the transition period:

| **Secret**                         | **Chart values key (deprecated)**                                                                                                                                                   | **Purpose**                                                                                                                                    |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **AWS Document Store Credentials** | `global.documentStore.type.aws.existingSecret`, `global.documentStore.type.aws.accessKeyIdKey`, `global.documentStore.type.aws.secretAccessKeyKey`                                  | AWS credentials for S3 document storage (requires multiple keys: access key ID and secret access key)                                          |
| **GCP Document Store Credentials** | `global.documentStore.type.gcp.existingSecret`, `global.documentStore.type.gcp.credentialsKey`, `global.documentStore.type.gcp.mountPath`, `global.documentStore.type.gcp.fileName` | GCP service account JSON for GCS document storage (single key containing JSON file, with additional mount configuration for file-based access) |

## Migration from legacy pattern (8.7 → 8.8+)

If you are upgrading from Camunda 8.7 or earlier and using the legacy secret management pattern, migrate to the new structured `secret:` pattern available in Camunda 8.8+ for better consistency and future compatibility. The legacy fields are deprecated in 8.8+ but will remain functional during the transition period.

### Scenario 1: Migrating an external secret reference

This scenario applies when your legacy configuration references a Kubernetes secret by name.

**Legacy configuration:**

```yaml
global:
  identity:
    auth:
      console:
        existingSecret:
          name: console-secret
        existingSecretKey: client-secret
```

**New configuration:**

```yaml
global:
  identity:
    auth:
      console:
        secret:
          existingSecret: console-secret
          existingSecretKey: client-secret
```

### Scenario 2: Migrating a plaintext secret

This scenario applies when your legacy configuration provided a plaintext string directly in `existingSecret`.

**Legacy configuration:**

```yaml
global:
  identity:
    auth:
      console:
        existingSecret: "my-plaintext-secret"
```

**New configuration:**

```yaml
global:
  identity:
    auth:
      console:
        secret:
          inlineSecret: "my-plaintext-secret"
```

### Scenario 3: Migrating AWS Document Store secrets

This scenario applies when migrating from the legacy single-secret AWS document store configuration to the new separate secrets pattern.

**Legacy configuration:**

```yaml
global:
  documentStore:
    type:
      aws:
        existingSecret: "aws-credentials"
        accessKeyIdKey: "awsAccessKeyId"
        secretAccessKeyKey: "awsSecretAccessKey"
```

**New configuration (using separate secrets):**

```yaml
global:
  documentStore:
    type:
      aws:
        accessKeyId:
          secret:
            existingSecret: "aws-access-key-secret"
            existingSecretKey: "access-key-id"
        secretAccessKey:
          secret:
            existingSecret: "aws-secret-key-secret"
            existingSecretKey: "secret-access-key"
```

## TLS certificates

For TLS-enabled services, you'll need to configure certificate secrets.

### Secrets using the legacy pattern (all versions)

| **Secret**                          | **Chart values key**                      | **Purpose**                                         |
| ----------------------------------- | ----------------------------------------- | --------------------------------------------------- |
| **Console TLS Certificate**         | `console.tls.existingSecret`              | TLS certificate for Console web application         |
| **External Elasticsearch TLS Cert** | `global.elasticsearch.tls.existingSecret` | TLS certificate for external Elasticsearch over SSL |
| **External OpenSearch TLS Cert**    | `global.opensearch.tls.existingSecret`    | TLS certificate for external OpenSearch over SSL    |

### Ingress TLS

Configure TLS for Camunda services exposed via Ingress:

```yaml
global:
  ingress:
    tls:
      enabled: true
      secretName: camunda-platform
```

### External service TLS

For external Elasticsearch or OpenSearch with TLS, configure the TLS certificate using the legacy pattern:

```yaml
global:
  elasticsearch:
    tls:
      enabled: true
      existingSecret: elasticsearch-tls-secret
```

### Console TLS (legacy pattern)

```yaml
console:
  tls:
    enabled: true
    existingSecret: console-tls-secret
    certKeyFilename: tls.key
```

Create TLS secrets using the standard Kubernetes TLS secret type:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: camunda-platform
  namespace: camunda
type: kubernetes.io/tls
data:
  tls.crt: <base64 encoded cert>
  tls.key: <base64 encoded key>
```
