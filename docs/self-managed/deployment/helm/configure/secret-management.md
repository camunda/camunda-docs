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

| **Secret**                              | **Chart values key**                                | **Purpose**                                             |
| --------------------------------------- | --------------------------------------------------- | ------------------------------------------------------- |
| **Enterprise License Key**              | `global.license.secret`                             | Camunda Enterprise license key                          |
| **Identity First User Password**        | `identity.firstUser.secret`                         | Default user password (`demo/demo`)                     |
| **OAuth Client Secret (Admin)**         | `global.identity.auth.admin.secret`                 | OAuth admin client secret for administrative operations |
| **OAuth Client Secret (Connectors)**    | `connectors.security.authentication.oidc.secret`    | OAuth client secret for connectors                      |
| **OAuth Client Secret (Orchestration)** | `orchestration.security.authentication.oidc.secret` | OAuth client secret for Orchestration Cluster           |
| **OAuth Client Secret (Optimize)**      | `global.identity.auth.optimize.secret`              | OAuth client secret for Optimize                        |

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
kubectl create secret generic optimize-secret \
  --from-literal=client-secret=camundapassword \
  --namespace camunda
```

Or using YAML:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: optimize-secret
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
      optimize:
        secret:
          existingSecret: "optimize-secret"
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

### Auto-generated secrets

The Helm chart can automatically generate secrets with random passwords for both development and production environments. This removes the need to create secrets manually during initial setup. You can enable this feature during installation by setting `--set global.secrets.autoGenerated=true`.

### Important limitations

The auto-generated secret uses Helm hooks (`pre-install`) with a `keep` resource policy. This means:

- The secret is created before the main Helm release installation.
- The secret is not managed by later Helm operations (upgrade, rollback, uninstall).
- If you delete the secret, generated passwords are lost permanently.
- The secret becomes orphaned from the Helm release lifecycle.

### Configuring components to use auto-generated secrets

Enabling `global.secrets.autoGenerated: true` only creates the secret with random values. You must configure each component to reference the auto-generated secret by name and key. The key can be custom, but the name must match the definition above.

```yaml
connectors:
  security:
    authentication:
      oidc:
        secret:
          existingSecret: "camunda-credentials"
          existingSecretKey: "identity-connectors-client-token"
```

For details on Identity secrets during installation, see the [installation guide](/self-managed/deployment/helm/install/quick-install.md#create-identity-secrets).

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

:::warning

The new pattern requires you to configure both `existingSecret` and `existingSecretKey`.
Unlike the legacy pattern, which provided default key values, the new pattern has no defaults. You must specify the exact secret name and key for each component.

This explicit configuration improves security and removes ambiguity but requires more setup.

:::

### Scenario 1: Migrating an external secret reference

This scenario applies when your legacy configuration references a Kubernetes secret by name.

**Legacy configuration:**

```yaml
global:
  identity:
    auth:
      optimize:
        existingSecret:
          name: optimize-secret
        existingSecretKey: client-secret
```

**New configuration:**

```yaml
global:
  identity:
    auth:
      optimize:
        secret:
          existingSecret: optimize-secret
          existingSecretKey: client-secret
```

### Scenario 2: Migrating a plaintext secret

This scenario applies when your legacy configuration provided a plaintext string directly in `existingSecret`.

**Legacy configuration:**

```yaml
global:
  identity:
    auth:
      optimize:
        existingSecret: "my-plaintext-secret"
```

**New configuration:**

```yaml
global:
  identity:
    auth:
      optimize:
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

TLS certificate secrets for Camunda components and external services.

### Secrets using the new pattern (Camunda 8.9+)

| **Secret**                          | **Chart values key**              | **Purpose**                                         |
| ----------------------------------- | --------------------------------- | --------------------------------------------------- |
| **Console TLS Certificate**         | `console.tls.secret`              | TLS certificate for Console web application         |
| **External Elasticsearch TLS Cert** | `global.elasticsearch.tls.secret` | TLS certificate for external Elasticsearch over SSL |
| **External OpenSearch TLS Cert**    | `global.opensearch.tls.secret`    | TLS certificate for external OpenSearch over SSL    |

**TLS Certificate Configuration**: Unlike password-based secrets, TLS certificates do not support `inlineSecret` (certificates are binary files unsuitable for inline configuration).

For Elasticsearch and OpenSearch, both `existingSecret` and `existingSecretKey` are required to specify which key in the secret contains the certificate file. For Console, only `existingSecret` is required as the entire secret is mounted as a directory.

Create the secrets with your certificate files using `kubectl create secret generic`:

```sh
kubectl create secret generic <secret-name> \
  --from-file=<key>=<path-to-certificate-file> \
  --namespace camunda
```

Reference them in your values:

```yaml
# Elasticsearch/OpenSearch
global:
  elasticsearch:
    tls:
      enabled: true
      secret:
        existingSecret: elasticsearch-tls-secret
        existingSecretKey: externaldb.jks

# Console
console:
  tls:
    enabled: true
    secret:
      existingSecret: console-tls-secret
    certKeyFilename: ca.crt
```

### Ingress TLS

Configure TLS for Camunda services exposed via Ingress:

```yaml
global:
  ingress:
    tls:
      enabled: true
      secretName: camunda-platform
```

## Extract plaintext values and reference them as Kubernetes Secrets

Use this guide if any sensitive values (client secrets, DB passwords, etc.) are written directly as plaintext in your values.yaml. The production best practice is to store these in Kubernetes Secrets and reference them from your values.

_Note: If your chart already references Kubernetes Secrets (and not plaintext), no change is needed—just ensure each existingSecret/existingSecretKey points to the correct secret and key._

**What you need to do**

1. Find any plaintext secrets in your `values.yaml`.
1. Create a Kubernetes secret that stores those values.
1. Reference that secret in your Helm values file (replace inline plaintext literals).

:::tip
You can use a single consolidated secret (e.g., app-credentials) or one secret per component. Consolidated keeps things tidy; per-component can be clearer for ownership/rotation. Choose what fits your operations model.
:::

### Find any plaintext secrets in your `values.yaml`

#### A - If the secrets already exist in Kubernetes (e.g. autogenerated via chart)

You can read the current (base64-encoded) data from existing secrets and reuse it in your new consolidated secret.

```bash
# Adjust to your release name / namespace
RELEASE_NAME=camunda
RELEASE_NAMESPACE=camunda

# Examples of extracting values from existing secrets (jsonpath reads base64 data)
export SOME_CLIENT_SECRET=$(
  kubectl -n "$RELEASE_NAMESPACE" get secret "${RELEASE_NAME}-some-app-secret" \
    -o jsonpath="{.data.client-secret}" | base64 --decode
)

export DB_ADMIN_PASSWORD=$(
  kubectl -n "$RELEASE_NAMESPACE" get secret "${RELEASE_NAME}-postgresql" \
    -o jsonpath="{.data.postgres-password}" | base64 --decode
)
```

Repeat for each value you want to consolidate.

#### B - If they only exist in values.yaml `values.yaml`

Copy those literal strings into environment variables (locally), then proceed to create a Kubernetes secret from them:

```bash
# Example: pulling from your own notes or from a secure password manager
export SOME_CLIENT_SECRET="paste-the-current-client-secret"
export DB_ADMIN_PASSWORD="paste-the-current-db-admin-password"
```

### Create a secret

Create one secret with your values (example: `app-credentials`):

```bash
kubectl -n "$RELEASE_NAMESPACE" create secret generic app-credentials --from-literal=some-app-client-secret="$SOME_CLIENT_SECRET" --from-literal=db-admin-password="$DB_ADMIN_PASSWORD"
```

### Reference it in your values file

Replace plaintext values with secret references.

```yaml
someApp:
  auth:
    secret:
      existingSecret: "app-credentials"
      existingSecretKey: "some-app-client-secret"

database:
  auth:
    existingSecret: "app-credentials"
    secretKeys:
      adminPasswordKey: "db-admin-password"
```

_Note: Remove any old plaintext values so the chart doesn’t override the secret._

### Hands-on example (Camunda setup)

Below is a ready-to-use example for Camunda deployments. Keep only thoese secret that matches your setup.

#### 1. Extract (only for enabled components)

```shell
# NOTE: All Helm chart values mentioned here are based on the 8.7 syntax.

# Change this according to your Helm chart release/deployment name and namespace.
RELEASE_NAME=camunda-dev
RELEASE_NAMESPACE=camunda-dev

# "global.identity.auth.enabled: true" is assumed for all "IDENTITY_*_CLIENT_SECRET" values.

# Only if "connectors.enabled: true".
export IDENTITY_CONNECTORS_CLIENT_SECRET=$(kubectl get secret "${RELEASE_NAME}-connectors-identity-secret" -o jsonpath="{.data.connectors-secret}" | base64 --decode)

# Only if "optimize.enabled: true".
export IDENTITY_OPTIMIZE_CLIENT_SECRET=$(kubectl get secret "${RELEASE_NAME}-optimize-identity-secret" -o jsonpath="{.data.optimize-secret}" | base64 --decode)

# Only if "zeebe.enabled: true".
export IDENTITY_ZEEBE_CLIENT_SECRET=$(kubectl get secret "${RELEASE_NAME}-zeebe-identity-secret" -o jsonpath="{.data.zeebe-secret}" | base64 --decode)

# Only if "postgresql.enabled: true".
export WEB_MODELER_POSTGRESQL_ADMIN_SECRET=$(kubectl get secret "${RELEASE_NAME}-postgresql-web-modeler" -o jsonpath="{.data.postgres-password}" | base64 --decode)
export WEB_MODELER_POSTGRESQL_USER_SECRET=$(kubectl get secret "${RELEASE_NAME}-postgresql-web-modeler" -o jsonpath="{.data.password}" | base64 --decode)

# Only if "identityPostgresql.enabled: true".
export IDENTITY_POSTGRESQL_ADMIN_SECRET=$(kubectl get secret "${RELEASE_NAME}-identity-postgresql" -o jsonpath="{.data.postgres-password}" | base64 --decode)
export IDENTITY_POSTGRESQL_USER_SECRET=$(kubectl get secret "${RELEASE_NAME}-identity-postgresql" -o jsonpath="{.data.password}" | base64 --decode)

# Only if "identityKeycloak.enabled: true".
export KEYCLOAK_ADMIN_SECRET=$(kubectl get secret "${RELEASE_NAME}-keycloak" -o jsonpath="{.data.admin-password}" | base64 --decode)

# Only if "identityKeycloak.postgresql.enabled: true".
export KEYCLOAK_POSTGRESQL_ADMIN_SECRET=$(kubectl get secret "${RELEASE_NAME}-postgresql" -o jsonpath="{.data.postgres-password}" | base64 --decode)
export KEYCLOAK_POSTGRESQL_USER_SECRET=$(kubectl get secret "${RELEASE_NAME}-postgresql" -o jsonpath="{.data.password}" | base64 --decode)
```

#### 2. Create the consolidated secret

```shell
cat << EOF >> existing-secrets-manifest.yaml
---
apiVersion: v1
kind: Secret
metadata:
  name: camunda-credentials
  namespace: "${RELEASE_NAMESPACE}"
type: Opaque
stringData:
  # Only if "connectors.enabled: true".
  identity-connectors-client-token: "${IDENTITY_CONNECTORS_CLIENT_SECRET}"

  # Only if "optimize.enabled: true".
  identity-optimize-client-token: "${IDENTITY_OPTIMIZE_CLIENT_SECRET}"

  # Only if "orchestration.enabled: true".
  identity-orchestration-client-token: "${IDENTITY_ZEEBE_CLIENT_SECRET}"

  # Only if "identityPostgresql.enabled: true".
  identity-postgresql-admin-password: "${IDENTITY_POSTGRESQL_ADMIN_SECRET}"
  identity-postgresql-user-password: "${IDENTITY_POSTGRESQL_USER_SECRET}"

  # Only if "keycloak.enabled: true".
  identity-keycloak-admin-password: "${KEYCLOAK_ADMIN_SECRET}"

  # Only if "keycloak.postgresql.enabled: true".
  identity-keycloak-postgresql-admin-password: "${KEYCLOAK_POSTGRESQL_ADMIN_SECRET}"
  identity-keycloak-postgresql-user-password: "${KEYCLOAK_POSTGRESQL_USER_SECRET}"

  # Only if "postgresql.enabled: true".
  webmodeler-postgresql-admin-password: "${WEB_MODELER_POSTGRESQL_ADMIN_SECRET}"
  webmodeler-postgresql-user-password: "${WEB_MODELER_POSTGRESQL_USER_SECRET}"
EOF
```

Review `existing-secrets-manifest.yaml` and ensure it contains exactly the secrets for the components enabled in your deployment.

```shell
kubectl apply -n "${RELEASE_NAMESPACE}" -f existing-secrets-manifest.yaml
```

#### 3. Reference the secret in your values file

If a component already uses its own existing secret, make sure to remove that section from the configuration to avoid overriding it:

```yaml
# existing-secrets-values.yaml

global:
  identity:
    auth:
      optimize:
        secret:
          existingSecret: "camunda-credentials"
          existingSecretKey: "identity-optimize-client-token"

identityPostgresql:
  auth:
    existingSecret: "camunda-credentials"
    secretKeys:
      adminPasswordKey: "identity-postgresql-admin-password"
      userPasswordKey: "identity-postgresql-user-password"

identityKeycloak:
  auth:
    existingSecret: "camunda-credentials"
    passwordSecretKey: "identity-keycloak-admin-password"
  postgresql:
    auth:
      existingSecret: "camunda-credentials"
      secretKeys:
        adminPasswordKey: "identity-keycloak-postgresql-admin-password"
        userPasswordKey: "identity-keycloak-postgresql-user-password"

webModelerPostgresql:
  auth:
    existingSecret: "camunda-credentials"
    secretKeys:
      adminPasswordKey: "webmodeler-postgresql-admin-password"
      userPasswordKey: "webmodeler-postgresql-user-password"

connectors:
  security:
    authentication:
      oidc:
        secret:
          existingSecret: "camunda-credentials"
          existingSecretKey: "identity-connectors-client-token"

orchestration:
  security:
    authentication:
      oidc:
        secret:
          existingSecret: "camunda-credentials"
          existingSecretKey: "identity-orchestration-client-token"
```

Then upgrade your deployment via:

```bash
helm upgrade --install "$RELEASE_NAME" camunda/camunda-platform \
  -n "$RELEASE_NAMESPACE" \
  -f existing-secrets-values.yaml
```
