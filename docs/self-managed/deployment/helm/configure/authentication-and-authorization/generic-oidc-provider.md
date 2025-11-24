---
id: generic-oidc-provider
sidebar_label: Generic OIDC provider
title: Connect Camunda to any OIDC provider
description: "Learn how to configure Camunda 8 Self-Managed to use any OIDC-compliant identity provider for authentication."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This guide shows you how to configure Camunda 8 Self-Managed to authenticate with any OIDC-compliant identity provider.

## When to use this guide

Use this guide if you have an existing OIDC provider (such as Keycloak, Microsoft Entra, Okta, Auth0, or another OIDC-compliant service) and want to configure Camunda to use it for authentication.

**For provider-specific guides with streamlined setup:**

- [External Keycloak](./external-keycloak.md) - Includes automatic configuration of the Keycloak realm, OIDC clients, etc via Management Identity
- [Microsoft Entra](./microsoft-entra.md) - Step-by-step guide for Microsoft Entra ID

Choose a provider-specific guide if available, as they include detailed setup instructions tailored to that provider's interface.

## Prerequisites

Before you begin, ensure you have:

- An OIDC-compliant provider already deployed and accessible
- Administrative access to create and configure OIDC clients in your provider
- Access to your provider's discovery document to obtain endpoint URLs
- A Kubernetes cluster with Helm 3.x installed
- kubectl configured to access your cluster

:::info
This guide assumes your OIDC provider is already operational. It does not cover provider installation or basic OIDC configuration.
:::

## Create OIDC clients

Create the following OIDC clients in your provider. The exact process varies by provider; consult your provider's documentation for client creation procedures.

| Client Name           | Type         | Purpose                                          |
| --------------------- | ------------ | ------------------------------------------------ |
| Management Identity   | Confidential | User login and API authentication                |
| Orchestration Cluster | Confidential | User login and machine-to-machine authentication |
| Optimize              | Confidential | User login                                       |
| Web Modeler API       | Confidential | Programmatic API access                          |
| Web Modeler UI        | Public       | User login                                       |
| Console               | Public       | User login                                       |

**For each client, record:**

- Client ID
- Client secret (for confidential clients only)

## Configure redirect URIs

For each OIDC client, configure the redirect URIs that match where Camunda components will be accessible from users' browsers.

### Redirect URI table

| Component             | Redirect URI Pattern                         | Example (localhost)                                 | Example (Ingress)                                                  |
| --------------------- | -------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------ |
| Management Identity   | `<IDENTITY_URL>/auth/login-callback`         | `http://localhost:8084/auth/login-callback`         | `https://camunda.example.com/identity/auth/login-callback`         |
| Orchestration Cluster | `<OC_URL>/sso-callback`                      | `http://localhost:8080/sso-callback`                | `https://camunda.example.com/orchestration/sso-callback`           |
| Optimize              | `<OPTIMIZE_URL>/api/authentication/callback` | `http://localhost:8083/api/authentication/callback` | `https://camunda.example.com/optimize/api/authentication/callback` |
| Web Modeler UI        | `<WEB_MODELER_URL>/login-callback`           | `http://localhost:8070/login-callback`              | `https://camunda.example.com/modeler/login-callback`               |
| Console               | `<CONSOLE_URL>/`                             | `http://localhost:8087/`                            | `https://camunda.example.com/`                                     |

Replace `<*_URL>` with the actual base URL where each component will be accessible. Use the localhost examples if testing locally with port-forwarding, or the Ingress examples if exposing components via Ingress.

:::important Security note
Redirect URIs are security-critical. Only the URIs you configure in your OIDC provider are permitted as redirection targets after authentication. Ensure these values match the `redirectUrl` parameters you'll set in the Helm configuration.
:::

:::tip Wildcard support
Some OIDC providers support wildcard redirect URIs (e.g., `https://camunda.example.com/*`). Check your provider's documentation to see if this simplifies your configuration.
:::

## Discover provider configuration

Since OIDC providers vary in their implementation details, you need to discover specific values from your provider.

### Find OIDC endpoints

Most OIDC providers expose a discovery document at:

```
https://your-provider.example.com/.well-known/openid-configuration
```

Access this URL (replacing `your-provider.example.com` with your provider's domain) to retrieve a JSON document containing endpoint URLs.

**Example discovery document:**

```json
{
  "issuer": "https://your-provider.example.com",
  "authorization_endpoint": "https://your-provider.example.com/oauth/authorize",
  "token_endpoint": "https://your-provider.example.com/oauth/token",
  "jwks_uri": "https://your-provider.example.com/.well-known/jwks.json",
  ...
}
```

**Record these values for Helm configuration:**

- `issuer` → Used for: `issuer`, `publicIssuerUrl`
- `token_endpoint` → Used for: `tokenUrl`
- `jwks_uri` → Used for: `jwksUrl`

### Identify token claims

Camunda needs to know which claims in access tokens identify users and clients. Claim names vary by provider.

**Step 1: Obtain a test token**

Use your OIDC client credentials to request an access token:

```bash
curl -X POST 'https://your-provider.example.com/oauth/token' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'client_id=<your-client-id>' \
  -d 'client_secret=<your-client-secret>' \
  -d 'grant_type=client_credentials'
```

This returns a JSON response containing an `access_token`.

**Step 2: Decode the token**

Decode the JWT to inspect its claims (Linux/macOS):

```bash
echo "<access-token>" | cut -d'.' -f2 | base64 -d | jq
```

Or use an online tool like [jwt.io](https://jwt.io) (paste the token to decode it).

**Step 3: Identify required claims**

Look for these claims in the decoded token:

1. **User identification claim** (for web login)
   - Identifies users uniquely
   - Common names: `email`, `preferred_username`, `sub`, `upn`, `unique_name`
   - You'll configure this as: `usernameClaim`

2. **Client identification claim** (for machine-to-machine authentication)
   - Identifies the calling client application
   - Common names: `client_id`, `azp`, `appid`, `clientId`
   - You'll configure this as: `clientIdClaim`

3. **Audience claim** (`aud`)
   - Specifies the intended audience for the token
   - Often contains the client ID or a custom value
   - You'll configure this as: `audience`

**Common claim patterns by provider:**

| Provider        | User Claim                      | Client Claim         | Audience Default       |
| --------------- | ------------------------------- | -------------------- | ---------------------- |
| Microsoft Entra | `preferred_username`            | `azp`                | Client ID              |
| Keycloak        | `email` or `preferred_username` | `azp` or `client_id` | May need configuration |
| Auth0           | `email`                         | `client_id`          | Client ID              |
| Okta            | `email`                         | `client_id`          | Client ID              |

:::caution Audience configuration
The audience claim is critical for token validation. Camunda will reject tokens that don't include the expected audience value.

**If your tokens don't include an appropriate audience:**

- Check your OIDC provider's documentation on configuring token audiences
- Some providers require explicit audience configuration in client settings
- Keycloak specifically may default to `aud: "account"` and require additional configuration

**To verify your audience configuration:**

1. Decode a test token as shown above
2. Check the `aud` claim value
3. Use that value for the `audience` parameter in Camunda configuration
   :::

### Scopes requested by Camunda

Camunda components request OIDC scopes when authenticating users. The default scopes vary by component:

**Management Identity, Optimize, Web Modeler, Console:**

- `openid` - Required for OIDC authentication
- `profile` - Access to user profile information
- `email` - Access to user email address
- `offline_access` - Enables refresh token issuance

**Orchestration Cluster (Operate, Tasklist):**

- `openid` - Required for OIDC authentication
- `profile` - Access to user profile information

:::tip Refresh tokens and offline_access
If your provider supports the `offline_access` scope, components will receive refresh tokens. This allows sessions to remain active longer without requiring users to re-authenticate.

If `offline_access` is not available or not granted, users will be redirected to your OIDC provider for re-authentication when their access token expires.

For more information, see the <!--DOCLINK-->[OpenID Connect Core specification](https://openid.net/specs/openid-connect-core-1_0.html#OfflineAccess)<!--/DOCLINK-->.
:::

## Create secrets

Create two secrets in your Kubernetes namespace.

First, create a secret that contains all OIDC client secrets:

```bash
kubectl create secret generic oidc-credentials \
  --from-literal=identity-client-secret="<identity-client-secret>" \
  --from-literal=orchestration-client-secret="<orchestration-client-secret>" \
  --from-literal=optimize-client-secret="<optimize-client-secret>" \
  --from-literal=webmodeler-api-client-secret="<web-modeler-api-client-secret>"
```

:::info
The secret key `webmodeler-api-client-secret` is not used elsewhere in this guide. This client is intended for your own use if you want to access the <!--DOCLINK-->[Web Modeler API](/apis-tools/web-modeler-api/authentication.md)<!--/DOCLINK--> programmatically.
:::

Next, create a secret with the remaining credentials for the Camunda Helm chart:

```bash
kubectl create secret generic camunda-credentials \
  --from-literal=identity-postgresql-admin-password=CHANGE_ME \
  --from-literal=identity-postgresql-user-password=CHANGE_ME \
  --from-literal=webmodeler-postgresql-admin-password=CHANGE_ME \
  --from-literal=webmodeler-postgresql-user-password=CHANGE_ME
```

Unlike the OIDC client secrets, these passwords initialize the component databases.
You can choose any values.

:::tip Alternative secret management
For production deployments, consider using external secret management solutions. See <!--DOCLINK-->[External Kubernetes secrets](/self-managed/deployment/helm/configure/secret-management.md#method-2-external-kubernetes-secrets-recommended-for-all-versions)<!--/DOCLINK--> for more options.
:::

## Configure Camunda components

Configure Camunda components to use your OIDC provider through Helm values.

### Global OIDC configuration

Start with the global configuration that applies to all components:

```yaml
global:
  security:
    authentication:
      method: oidc

  identity:
    auth:
      enabled: true
      type: "GENERIC"

      # OIDC Provider Endpoints (from discovery document)
      issuer: <issuer-url>
      publicIssuerUrl: <issuer-url>
      issuerBackendUrl: <issuer-url-or-internal-dns>
      tokenUrl: <token-endpoint-url>
      jwksUrl: <jwks-endpoint-url>
```

**Parameter descriptions:**

| Parameter          | Description                                             | Example                                           |
| ------------------ | ------------------------------------------------------- | ------------------------------------------------- |
| `issuer`           | Canonical issuer URL (must match `iss` claim in tokens) | `https://login.example.com`                       |
| `publicIssuerUrl`  | Issuer URL accessible from users' browsers              | `https://login.example.com`                       |
| `issuerBackendUrl` | Issuer URL accessible from Kubernetes pods              | `http://oidc-internal.svc.cluster.local`          |
| `tokenUrl`         | Token endpoint from discovery document                  | `https://login.example.com/oauth/token`           |
| `jwksUrl`          | JWKS endpoint for token signature verification          | `https://login.example.com/.well-known/jwks.json` |

:::tip When to use different issuer URLs
For most deployments, all three issuer parameters have the same value (your OIDC provider's issuer URL).

Use different values only when:

- Your OIDC provider has separate internal and external endpoints
- You're using Ingress with different internal/external DNS names
- You want pods to use cluster-internal DNS for better performance

**Example scenario:** External users access your provider at `https://login.example.com`, but Kubernetes pods can reach it faster via `http://oidc-provider.namespace.svc.cluster.local:8080`. In this case:

- `issuer` and `publicIssuerUrl`: `https://login.example.com`
- `issuerBackendUrl`: `http://oidc-provider.namespace.svc.cluster.local:8080`
  :::

### Configure Management Identity

Add configuration for Management Identity:

```yaml
global:
  identity:
    auth:
      identity:
        clientId: <identity-client-id>
        audience: <identity-audience>
        redirectUrl: <identity-base-url>
        secret:
          existingSecret: oidc-credentials
          existingSecretKey: identity-client-secret
        initialClaimName: <user-claim-name>
        initialClaimValue: <admin-user-claim-value>

identity:
  enabled: true
  contextPath: "/identity" # Optional: adjust if using custom context path

identityPostgresql:
  enabled: true
  auth:
    existingSecret: camunda-credentials
    secretKeys:
      adminPasswordKey: identity-postgresql-admin-password
      userPasswordKey: identity-postgresql-user-password
```

**Identity-specific parameters:**

| Parameter           | Description                                  | How to Determine                                                                                |
| ------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `clientId`          | Client ID from your OIDC provider            | From your Identity client configuration                                                         |
| `audience`          | Expected audience in access tokens           | From token inspection (see [Discover provider configuration](#discover-provider-configuration)) |
| `redirectUrl`       | Full URL where Identity is accessible        | `http://localhost:8084` (local) or `https://your-domain.com/identity` (Ingress)                 |
| `initialClaimName`  | Claim that identifies the initial admin user | `email`, `sub`, or another user claim from token inspection                                     |
| `initialClaimValue` | Value granting initial admin access          | Your admin user's value for the specified claim (e.g., `admin@example.com`)                     |

:::danger Initial claim cannot be changed
The `initialClaimName` and `initialClaimValue` parameters are used only during the first startup to grant initial admin access. Once Management Identity has started, these values are stored in the database and cannot be changed via Helm values.
:::

### Configure Orchestration Cluster

Add configuration for the Orchestration Cluster (Zeebe, Operate, Tasklist):

```yaml
global:
  identity:
    auth:
      orchestration:
        clientId: <orchestration-client-id>
        audience: <orchestration-audience>
        secret:
          existingSecret: oidc-credentials
          existingSecretKey: orchestration-client-secret

orchestration:
  enabled: true
  contextPath: "/orchestration" # Optional: adjust if using custom context path

  security:
    authentication:
      method: oidc
      oidc:
        clientId: <orchestration-client-id>
        audience: <orchestration-audience>
        redirectUrl: <orchestration-base-url>
        secret:
          existingSecret: oidc-credentials
          existingSecretKey: orchestration-client-secret
        # Claim mapping - uncomment and adjust if your provider doesn't use defaults
        # usernameClaim: <user-claim-name>  # Default: preferred_username
        # clientIdClaim: <client-claim-name>  # Default: client_id

    authorizations:
      enabled: true

    initialization:
      defaultRoles:
        admin:
          users:
            - <admin-user-claim-value>
        connectors:
          clients:
            - <orchestration-client-id>
```

**Orchestration-specific parameters:**

| Parameter       | Description                        | Value                                                                                          |
| --------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------- |
| `clientId`      | Orchestration client ID            | From your provider                                                                             |
| `audience`      | Expected audience in tokens        | From token inspection                                                                          |
| `redirectUrl`   | Full URL for Orchestration Cluster | `http://localhost:8080` (local) or `https://your-domain.com/orchestration` (Ingress)           |
| `usernameClaim` | Claim identifying users            | Default: `preferred_username`. Override if your provider uses `email`, `sub`, or another claim |
| `clientIdClaim` | Claim identifying clients          | Default: `client_id`. Override if your provider uses `azp` or another claim                    |

**Default roles:**

- `admin.users`: List of user claim values that should have admin access
- `connectors.clients`: List of client IDs that should have Connectors role (typically the orchestration client ID itself)

:::note
The admin user specified in `defaultRoles.admin.users` must match the value used for `initialClaimValue` in Management Identity configuration.
:::

### Configure Connectors

Add configuration for Connectors:

```yaml
global:
  identity:
    auth:
      connectors:
        clientId: <orchestration-client-id>
        audience: <orchestration-audience>
        secret:
          existingSecret: oidc-credentials
          existingSecretKey: orchestration-client-secret

connectors:
  enabled: true
  security:
    authentication:
      method: oidc
      oidc:
        clientId: <orchestration-client-id>
        audience: <orchestration-audience>
        secret:
          existingSecret: oidc-credentials
          existingSecretKey: orchestration-client-secret
```

:::info Connectors shares credentials
Connectors typically uses the same OIDC client as the Orchestration Cluster, as it needs to authenticate to Zeebe Gateway. This is why both reference the same `orchestration-client-secret`.
:::

### Configure Optimize

Add configuration for Optimize:

```yaml
global:
  identity:
    auth:
      optimize:
        clientId: <optimize-client-id>
        audience: <optimize-audience>
        redirectUrl: <optimize-base-url>
        secret:
          existingSecret: oidc-credentials
          existingSecretKey: optimize-client-secret

optimize:
  enabled: true
  contextPath: "/optimize" # Optional: adjust if using custom context path
```

**Optimize parameters:**

| Parameter     | Value                                                                           |
| ------------- | ------------------------------------------------------------------------------- |
| `clientId`    | Optimize client ID from your provider                                           |
| `audience`    | Expected audience (from token inspection)                                       |
| `redirectUrl` | `http://localhost:8083` (local) or `https://your-domain.com/optimize` (Ingress) |

:::info Optimize OIDC limitations
When using OIDC authentication, the following Optimize features are not currently available:

- User permissions tab in collections
- Alerts tab in collections
- Digests
- Display of user names for resource owners (the `sub` claim value is shown instead)
  :::

### Configure Web Modeler

Web Modeler requires two OIDC clients: one for the UI (public) and one for the API (confidential).

```yaml
global:
  identity:
    auth:
      webModeler:
        clientId: <web-modeler-ui-client-id>
        redirectUrl: <web-modeler-base-url>
        clientApiAudience: <web-modeler-ui-audience>
        publicApiAudience: <web-modeler-api-audience>

webModeler:
  enabled: true
  contextPath: "/modeler" # Optional: adjust if using custom context path

  restapi:
    mail:
      fromAddress: noreply@example.com # Update with your email address
      # Additional SMTP configuration may be required - see Web Modeler docs

webModelerPostgresql:
  enabled: true
  auth:
    existingSecret: camunda-credentials
    secretKeys:
      adminPasswordKey: webmodeler-postgresql-admin-password
      userPasswordKey: webmodeler-postgresql-user-password
```

**Web Modeler parameters:**

| Parameter           | Description                              | Value                                                                          |
| ------------------- | ---------------------------------------- | ------------------------------------------------------------------------------ |
| `clientId`          | Web Modeler UI client ID (public client) | From your provider                                                             |
| `redirectUrl`       | Full URL for Web Modeler                 | `http://localhost:8070` (local) or `https://your-domain.com/modeler` (Ingress) |
| `clientApiAudience` | Audience for UI-to-API communication     | Usually the UI client ID                                                       |
| `publicApiAudience` | Audience for external API access         | The API client ID or custom audience                                           |

**Email configuration:**
Web Modeler requires email configuration for notifications. Update `restapi.mail.fromAddress` with an appropriate sender address. For full SMTP configuration, see <!--DOCLINK-->[Web Modeler configuration](/self-managed/components/modeler/web-modeler/configuration/configuration.md)<!--/DOCLINK-->.

### Configure Console

Add configuration for Console:

```yaml
global:
  identity:
    auth:
      console:
        clientId: <console-client-id>
        audience: <console-audience>
        redirectUrl: <console-base-url>

console:
  enabled: true
```

Replace `<console-base-url>` with the base URL where Console will be accessible. For local deployment, use `http://localhost:8087`.

## Complete configuration example

Below is a complete Helm values file with all components configured:

```yaml
global:
  security:
    authentication:
      method: oidc

  identity:
    auth:
      enabled: true
      type: "GENERIC"

      # OIDC Provider Endpoints
      issuer: https://your-provider.example.com
      publicIssuerUrl: https://your-provider.example.com
      issuerBackendUrl: https://your-provider.example.com
      tokenUrl: https://your-provider.example.com/oauth/token
      jwksUrl: https://your-provider.example.com/.well-known/jwks.json

      # Management Identity
      identity:
        clientId: identity
        audience: identity
        redirectUrl: http://localhost:8084
        secret:
          existingSecret: oidc-credentials
          existingSecretKey: identity-client-secret
        initialClaimName: email
        initialClaimValue: admin@example.com

      # Orchestration Cluster
      orchestration:
        clientId: orchestration
        audience: orchestration
        secret:
          existingSecret: oidc-credentials
          existingSecretKey: orchestration-client-secret

      # Connectors (shares orchestration client)
      connectors:
        clientId: orchestration
        audience: orchestration
        secret:
          existingSecret: oidc-credentials
          existingSecretKey: orchestration-client-secret

      # Optimize
      optimize:
        clientId: optimize
        audience: optimize
        redirectUrl: http://localhost:8083
        secret:
          existingSecret: oidc-credentials
          existingSecretKey: optimize-client-secret

      # Web Modeler
      webModeler:
        clientId: web-modeler-ui
        redirectUrl: http://localhost:8070
        clientApiAudience: web-modeler-ui
        publicApiAudience: web-modeler-api

      # Console
      console:
        clientId: console
        audience: console
        redirectUrl: http://localhost:8087

# Orchestration Cluster
orchestration:
  enabled: true
  security:
    authentication:
      method: oidc
      oidc:
        clientId: orchestration
        audience: orchestration
        redirectUrl: http://localhost:8080
        secret:
          existingSecret: oidc-credentials
          existingSecretKey: orchestration-client-secret
        # The following claim mappings use Camunda defaults and usually don't need to be changed.
        # Only uncomment if your decoded access token uses different claim names:
        # usernameClaim: email  # Use if tokens identify users with 'email' instead of 'preferred_username'
        # clientIdClaim: azp  # Use if tokens identify clients with 'azp' instead of 'client_id'
    authorizations:
      enabled: true
    initialization:
      defaultRoles:
        admin:
          users:
            - admin@example.com
        connectors:
          clients:
            - orchestration

# Connectors
connectors:
  enabled: true
  security:
    authentication:
      method: oidc
      oidc:
        clientId: orchestration
        audience: orchestration
        secret:
          existingSecret: oidc-credentials
          existingSecretKey: orchestration-client-secret

# Management Identity
identity:
  enabled: true

identityPostgresql:
  enabled: true
  auth:
    existingSecret: camunda-credentials
    secretKeys:
      adminPasswordKey: identity-postgresql-admin-password
      userPasswordKey: identity-postgresql-user-password

# Disable internal Keycloak
identityKeycloak:
  enabled: false

# Optimize
optimize:
  enabled: true

# Web Modeler
webModeler:
  enabled: true
  restapi:
    mail:
      fromAddress: noreply@example.com

webModelerPostgresql:
  enabled: true
  auth:
    existingSecret: camunda-credentials
    secretKeys:
      adminPasswordKey: webmodeler-postgresql-admin-password
      userPasswordKey: webmodeler-postgresql-user-password

# Console
console:
  enabled: true
```

**Placeholders to replace:**

| Placeholder                                               | Replace With                                 |
| --------------------------------------------------------- | -------------------------------------------- |
| `https://your-provider.example.com`                       | Your OIDC provider's issuer URL              |
| `identity`, `orchestration`, `optimize`, etc.             | Your actual client IDs                       |
| `identity`, `orchestration`, `optimize` (audience values) | Actual audience values from token inspection |
| `admin@example.com`                                       | Your admin user's claim value                |

**Before deploying, verify:**

- [ ] All `<placeholders>` replaced with actual values
- [ ] All client secrets stored in the `oidc-credentials` secret
- [ ] Database passwords stored in the `camunda-credentials` secret
- [ ] Redirect URIs in OIDC provider match `redirectUrl` values
- [ ] Token inspection confirms audience values
- [ ] Verify tokens contain `preferred_username` and `client_id` claims, or uncomment and configure alternative claim names

## Connect to the cluster

After deploying Camunda with this configuration, use the following `kubectl port-forward` commands to access the APIs and UIs:

```bash
# Management Identity
kubectl port-forward svc/camunda-identity 8084:80 -n camunda

# Orchestration Cluster (Operate/Tasklist)
kubectl port-forward svc/camunda-zeebe-gateway 8080:8080 -n camunda

# Zeebe Gateway (gRPC for clients)
kubectl port-forward svc/camunda-zeebe-gateway 26500:26500 -n camunda

# Optimize
kubectl port-forward svc/camunda-optimize 8083:80 -n camunda

# Web Modeler
kubectl port-forward svc/camunda-web-modeler-webapp 8070:80 -n camunda

# Console
kubectl port-forward svc/camunda-console 8087:80 -n camunda
```

Once port forwarding is active, access each component through `http://localhost:<port>`.
For example, Management Identity at `http://localhost:8084` or the Orchestration Cluster at `http://localhost:8080` (which redirects to your OIDC provider for login).

:::important Redirect URI configuration
Ensure your redirect URIs in your OIDC provider match how you're accessing Camunda. If you configured redirect URIs for localhost testing (e.g., `http://localhost:8080/sso-callback`), the port-forward commands above will work. If you configured redirect URIs for Ingress (e.g., `https://camunda.example.com/orchestration/sso-callback`), you'll need to access via Ingress instead.

For production deployments, configure Ingress to expose components. See <!--DOCLINK-->[Ingress configuration](/self-managed/deployment/helm/configure/ingress/index.md)<!--/DOCLINK-->.
:::

## Grant access to components

After deployment, you must configure access for the following components.

To grant a user access to the Web Modeler UI:

- [Create a mapping rule in Management Identity](/self-managed/components/management-identity/mapping-rules.md#add-a-mapping-rule) for the `Web Modeler` role that matches the user's access token.

To grant a client access to the Web Modeler API:

- [Create a role in Management Identity](/self-managed/components/management-identity/application-user-group-role-management/manage-roles.md#add-a-role) for the Web Modeler API.
- [Assign Web Modeler API permissions](/self-managed/components/management-identity/access-management/manage-permissions.md#manage-role-permissions) to that role in Management Identity.
- [Create a mapping rule in Management Identity](/self-managed/components/management-identity/mapping-rules.md#add-a-mapping-rule) for that role that matches the client's access token.

To grant a user access to Optimize:

- [Create a mapping rule in Management Identity](/self-managed/components/management-identity/mapping-rules.md#add-a-mapping-rule) for the `Optimize` role that matches the user's access token.

:::info
When using an OIDC provider, the following Optimize features are not currently available:

- The **User permissions** tab in collections
- The **Alerts** tab in collections
- Digests
- Accessible user names for resource owners (the value of the `sub` claim is displayed instead).
  :::

## Troubleshooting

For common issues and solutions when configuring OIDC authentication, see the [OIDC Troubleshooting guide](./troubleshooting-oidc.md).
