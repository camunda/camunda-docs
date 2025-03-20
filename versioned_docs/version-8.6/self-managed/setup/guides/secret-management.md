---
id: secret-management
title: "Managing Secrets in Camunda 8 Self-Managed"
description: "A comprehensive guide on configuring and managing secrets in Camunda 8, including Keycloak, OAuth client secrets, and first-user authentication."
---

# Camunda Platform Helm Chart – Secrets Management

This document provides an overview of the secrets used in the Camunda Platform Helm Chart, including their purpose, default behavior, and instructions on how to configure them.

For best practices on managing secrets in a production environment, see the [Best Practices](#best-practices-for-managing-secrets-with-helm) section below.

---

## Secrets Reference Table

| **Secret / Setting**                                        | **Chart Values Key**                                                                                                           | **Purpose**                                                                                      | **Default**                                                                            | **How to Configure**                                                                                                                                                                                                                                                          |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Elasticsearch Auth**                                      | `global.elasticsearch.auth.existingSecret`<br/>_(auth.password can also be set in values, but not recommended)_                | Password for external Elasticsearch authentication (basic auth).                                 | Not set (no auth by default).                                                          | Create a Kubernetes Secret containing the password (e.g., key `password`) and set `existingSecret` to that secret’s name. Leave empty if no auth is needed.                                                                                                                   |
| **Elasticsearch TLS**                                       | `global.elasticsearch.tls.existingSecret`                                                                                      | TLS certificates (CA/client cert) for connecting to external Elasticsearch over SSL.             | Not set (no custom TLS secret by default).                                             | Create or attach a secret containing the certificate (`ca.crt`, etc.) and set `existingSecret` to that secret’s name. The chart mounts/uses that cert for connections.                                                                                                        |
| **OpenSearch Auth**                                         | `global.opensearch.auth.existingSecret`<br/>_(auth.password can also be set)_                                                  | Password for external OpenSearch authentication (basic auth).                                    | Not set.                                                                               | Similar to Elasticsearch: create a K8s Secret (with `password`) and set `existingSecret` to its name.                                                                                                                                                                         |
| **OpenSearch TLS**                                          | `global.opensearch.tls.existingSecret`                                                                                         | TLS certificates (CA/client cert) for external OpenSearch SSL.                                   | Not set.                                                                               | Provide a secret containing your TLS cert and set `existingSecret` to reference it.                                                                                                                                                                                           |
| **Keycloak Admin Password**                                 | `identity.keycloak.auth.adminPassword` or <br/> `identity.keycloak.auth.existingSecret` (key: `admin-password`)                | Sets the admin user password for the embedded Keycloak (Camunda Identity).                       | Randomly generated on first install if not specified.                                  | Preferred: create a secret with `admin-password` key and set `identity.keycloak.auth.existingSecret`. If using chart generation, retrieve the generated password before upgrades.                                                                                             |
| **Keycloak Management Password**                            | `identity.keycloak.auth.managementPassword` or <br/> `identity.keycloak.auth.existingSecret` (key: `management-password`)      | Internal management user/client secret used by Identity.                                         | Randomly generated on first install if not specified.                                  | Store in the same existing secret or a separate one with key `management-password`. Needed when upgrading or migrating to external Keycloak.                                                                                                                                  |
| **Identity OAuth Client Secrets** (e.g., Operate, Tasklist) | `global.identity.auth.<component>.existingSecret`<br/>_(e.g., `global.identity.auth.operate.existingSecret`)_                  | OAuth client secrets for each Camunda component (Operate, Tasklist, Optimize, Connectors, etc.). | Randomly generated if not explicitly set (on first install).                           | Each component has its own secret. Best practice: create a dedicated K8s Secret for each (or a shared secret with multiple keys) and reference it via `existingSecret`. Do **not** rely on random generation in production; you must preserve client secrets across upgrades. |
| **Identity First User** (Demo credentials)                  | `identity.firstUser.password` or <br/> `identity.firstUser.existingSecret` (key: `identity-firstuser-password`)                | The initial user’s password for the Camunda realm in Keycloak, typically `demo/demo`.            | `demo` if you leave the default.                                                       | In production, always override `demo/demo`. For security, create a secret with a strong password and set `identity.firstUser.existingSecret` to that secret name. You can also disable the first user creation entirely (`identity.firstUser.enabled=false`).                 |
| **Connectors Inbound Auth**                                 | `connectors.inbound.auth.existingSecret`                                                                                       | Password for Operate if Connectors use basic auth to Operate (instead of Keycloak SSO).          | Not set.                                                                               | Only necessary if you enable basic authentication for Inbound Connectors. Create a secret containing the Operate password (key typically `operate-password`), then reference it here.                                                                                         |
| **Web Modeler Database Password**                           | `webModeler.restapi.externalDatabase.password` or <br/> `webModeler.restapi.externalDatabase.existingSecret` (key: `password`) | Password for external PostgreSQL if using an external DB for Web Modeler.                        | Not set if external DB is disabled (chart uses its own Postgres with random password). | If you disable the embedded Postgres (`webModeler.postgresql.enabled=false`), provide DB credentials. For security, create a secret with the DB password and reference it in `existingSecret`.                                                                                |
| **Web Modeler SMTP Password**                               | `webModeler.restapi.mail.smtpPassword` or <br/> `webModeler.restapi.mail.existingSecret` (key: `smtp-password`)                | SMTP credentials for email notifications (Web Modeler invites, etc.).                            | Not set by default.                                                                    | Specify SMTP user/host in `webModeler.restapi.mail.*`. For the password, create a secret with key `smtp-password` and set `existingSecret` to that secret’s name.                                                                                                             |
| **Enterprise License Key**                                  | `global.license.key` or <br/> `global.license.existingSecret` (key: `key`)                                                     | The license string required for Camunda Enterprise features.                                     | Not set by default (OSS or trial usage if no license).                                 | Either paste the license text into `global.license.key` or create a secret with the entire license string under key `key` and set `global.license.existingSecret`. The second approach is more secure.                                                                        |

---

## Detailed Secrets Documentation

Below is a more in-depth explanation for each secret, including best practices for management in Helm. It complements the table above.

### Elasticsearch / OpenSearch Secrets

- **`global.elasticsearch.auth.existingSecret` / `global.opensearch.auth.existingSecret`**  
  When using **external Elasticsearch** or **OpenSearch** instead of the in-cluster deployment, you often need a password for basic auth. Instead of placing this in plain text via `auth.password`, you can create a Kubernetes Secret containing the password (key might be `password`), then reference it via `existingSecret`. If the chart is set up to mount secrets as environment variables, the components will automatically pick them up.

- **`global.elasticsearch.tls.existingSecret` / `global.opensearch.tls.existingSecret`**  
  If your external Elasticsearch/OpenSearch cluster requires TLS with custom certificates, you can store the CA certificate or client certificate in a secret. The chart will mount it and configure the relevant pods to trust/use those certificates.

### Keycloak / Identity Secrets

Camunda Platform Helm includes an embedded Keycloak (also called “Identity”). Several secrets are generated or can be overridden:

- **Keycloak Admin Password (`admin-password`)**  
  Randomly generated if not set. Best practice is to provide your own known password via an existing K8s secret so you can reliably administer the Keycloak instance.

- **Keycloak Management Password (`management-password`)**  
  Used for behind-the-scenes communication within Identity. Also randomly generated if not provided. Required if you’re migrating to or from an external Keycloak setup.

Camunda Platform uses **Keycloak (Identity)** to manage authentication and issue OAuth tokens for its components, such as **Operate, Tasklist, Optimize, Connectors, Console, and Zeebe**. By default, the Helm chart **auto-generates random OAuth client secrets** for each component.

However, in **production**, you should **explicitly set and manage these secrets** to prevent them from regenerating unexpectedly during upgrades.

This section details **OAuth Client Secrets** for each Camunda component and the **Identity First User**, with best practices and example configurations.

---

## OAuth Client Secrets (Operate, Tasklist, Optimize, etc.)

Each Camunda component has its **own OAuth client** in Identity (Keycloak). The chart allows configuring these secrets in two ways:

- **Plaintext (not recommended)**: Set `global.identity.auth.<component>.clientSecret` in `values.yaml`
- **Secure approach (recommended)**: Store secrets in **existing Kubernetes Secrets** and reference them using:

  ```yaml
  global:
    identity:
      auth:
        <component>:
          existingSecret: "your-secret-name"
          existingSecretKey: "your-secret-key"
  ```

Below is a breakdown of **which chart values control each OAuth client secret**, the **default key name** for each secret, and **how to configure them properly**.

### OAuth Client Secrets Breakdown

| **Component**  | **Chart Values**                                                                                      | **Default Key in K8s Secret** | **Purpose**                                               |
| -------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------- | --------------------------------------------------------- |
| **Operate**    | `global.identity.auth.operate.existingSecret`, `global.identity.auth.operate.existingSecretKey`       | `operate-secret`              | OAuth client secret for Operate to request tokens.        |
| **Tasklist**   | `global.identity.auth.tasklist.existingSecret`, `global.identity.auth.tasklist.existingSecretKey`     | `tasklist-secret`             | OAuth client secret for Tasklist.                         |
| **Optimize**   | `global.identity.auth.optimize.existingSecret`, `global.identity.auth.optimize.existingSecretKey`     | `optimize-secret`             | OAuth client secret for Optimize.                         |
| **Connectors** | `global.identity.auth.connectors.existingSecret`, `global.identity.auth.connectors.existingSecretKey` | `connectors-secret`           | OAuth client secret for Connectors (when using Keycloak). |
| **Console**    | `global.identity.auth.console.existingSecret`, `global.identity.auth.console.existingSecretKey`       | `console-secret`              | OAuth client secret for Camunda Platform Console.         |
| **Zeebe**      | `global.identity.auth.zeebe.existingSecret`, `global.identity.auth.zeebe.existingSecretKey`           | `zeebe-secret`                | OAuth client secret for Zeebe’s internal system client.   |

> **Best Practice:** Set these secrets explicitly to **avoid regeneration on upgrade**. If left unset, the Helm chart **randomly generates them**, which can break authentication if clients expect consistent secrets.

---

## Example: Creating a **Single Secret** for All OAuth Client Secrets

You can store **all OAuth client secrets** in **one Kubernetes Secret**, keeping them **centralized and easy to manage**.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: identity-oauth-clients
type: Opaque
stringData:
  operate-secret: "S3cure0p3rat3"
  tasklist-secret: "S3cureT4sk"
  optimize-secret: "S3cure0pt1mz"
  connectors-secret: "S3cureC0nn3ct"
  console-secret: "S3cureC0nsole"
  zeebe-secret: "S3cureZ33be"
```

Then reference this secret in your `values.yaml`:

```yaml
global:
  identity:
    auth:
      operate:
        existingSecret: identity-oauth-clients
        existingSecretKey: operate-secret
      tasklist:
        existingSecret: identity-oauth-clients
        existingSecretKey: tasklist-secret
      optimize:
        existingSecret: identity-oauth-clients
        existingSecretKey: optimize-secret
      connectors:
        existingSecret: identity-oauth-clients
        existingSecretKey: connectors-secret
      console:
        existingSecret: identity-oauth-clients
        existingSecretKey: console-secret
      zeebe:
        existingSecret: identity-oauth-clients
        existingSecretKey: zeebe-secret
```

---

## Identity First User

The **first user** in Keycloak is created by default as `demo/demo`. **This should always be overridden or disabled in production.**

### Chart Configuration Options

| **Setting**                         | **Description**                            | **Default** |
| ----------------------------------- | ------------------------------------------ | ----------- |
| `identity.firstUser.username`       | Initial username for Keycloak.             | `demo`      |
| `identity.firstUser.password`       | Initial password.                          | `demo`      |
| `identity.firstUser.existingSecret` | Reference an existing Secret for password. | Not set     |

### Example: Setting the First User Securely

Instead of using `identity.firstUser.password`, create a **Kubernetes Secret**:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: identity-firstuser-secret
type: Opaque
stringData:
  identity-firstuser-password: "S3cur3P@ssw0rd!"
```

Then reference it in `values.yaml`:

```yaml
identity:
  firstUser:
    existingSecret: identity-firstuser-secret
    existingSecretKey: identity-firstuser-password
```

---

## Best Practices for Managing Identity Secrets

1. **Use `existingSecret` whenever possible**

   - Keeps OAuth secrets **out of Helm values files and Git repositories**.

2. **Override defaults**

   - Do **not** use the default `demo/demo` user in production.
   - Explicitly set **OAuth client secrets** to prevent accidental regeneration.

3. **Persist secrets across upgrades**

   - If secrets are randomly generated on first install, **extract them** and set them explicitly before upgrading.
   - Use:
     ```sh
     kubectl get secret <secret-name> -o yaml
     ```
     to retrieve existing secrets and avoid mismatch issues.

4. **Encrypt or externalize secrets**

   - Use [Sealed Secrets](https://github.com/bitnami-labs/sealed-secrets), [Vault](https://www.vaultproject.io/), or a similar **secret management tool**.

5. **Ensure secret keys match exactly**
   - The **Kubernetes Secret key names must match** what the chart expects (`operate-secret`, `tasklist-secret`, etc.).
   - If using a different key name, set:
     ```yaml
     global:
       identity:
         auth:
           operate:
             existingSecretKey: my-custom-key
     ```

### Connectors Inbound Auth

If you configure inbound connectors to **use basic authentication** to connect to Operate (instead of SSO with Keycloak), you must provide the Operate user’s password. The chart can reference an existing secret containing that password in `connectors.inbound.auth.existingSecret`.

### Web Modeler Secrets (Database & SMTP)

- **Database Password**  
  By default, Web Modeler uses its own deployed Postgres sub-chart with a random password. If you disable that (`webModeler.postgresql.enabled=false`) and switch to an external database, you must supply the credentials. Use `webModeler.restapi.externalDatabase.existingSecret` to keep the password out of plain text.

- **SMTP Password**  
  For email notifications (invites, password resets, etc.), configure your SMTP server’s username and password. Use `webModeler.restapi.mail.existingSecret` to reference a secret containing the `smtp-password` key.

### Enterprise License Key

Camunda Enterprise requires a valid license. You can either:

- Embed the license string directly in `global.license.key`.
- (Recommended) Create a secret with the license text in a `key` field and set `global.license.existingSecret` to that secret name.

### Best Practices for Managing Secrets with Helm

1. **Use `existingSecret` whenever possible**  
   This keeps passwords/keys out of your Helm values file and Git history.

2. **Override defaults**  
   Do not rely on automatically generated credentials or `demo/demo` in production.

3. **Persist across upgrades**  
   If you do use auto-generated secrets on install, extract them (e.g., via `kubectl get secret ... -o yaml`) and reapply them via `existingSecret` before an upgrade. Otherwise, a mismatch can break authentication.

4. **Encrypt or externalize secrets**  
   Consider using [Helm Secrets](https://github.com/jkroepke/helm-secrets) or other solutions like [Sealed Secrets](https://github.com/bitnami-labs/sealed-secrets), or external secrets managers (e.g., Vault).

5. **Ensure secret key names match**  
   Typos or mismatches will cause failures. Double-check them.
