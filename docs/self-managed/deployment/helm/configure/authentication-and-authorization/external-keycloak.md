---
id: external-keycloak
sidebar_label: External Keycloak
title: Set up the Helm chart with an external Keycloak instance
description: Learn how to connect the Camunda Helm chart to an external Keycloak instance.
---

:::caution Admin access required
The external Keycloak setup requires administrative access to the Keycloak server.
:::

The Camunda Helm chart can connect to an external Keycloak instance that acts as the identity management service for authentication and authorization.  
With minimal configuration for administrative access, the Management Identity component can automatically configure the Keycloak realm and required entities on startup—simplifying setup and reducing the learning curve.

Use this guide if you already have an existing Keycloak instance and want Camunda to automatically configure the required Keycloak entities.

If you prefer Camunda to also create and manage a Keycloak pod, see the [internal Keycloak guide](/self-managed/deployment/helm/configure/authentication-and-authorization/internal-keycloak.md).

:::info
Before you begin, ensure you’re running a Keycloak version that’s supported by your Camunda release.  
See [Supported environments](/reference/supported-environments.md#component-requirements).
:::

## Configure Keycloak

Before setting up the Camunda Helm chart, prepare your Keycloak instance.  
For the Keycloak realm, you have two options:

- [Use an existing realm](#option-1-prepare-an-existing-realm)
- [Let Management Identity create a realm](#option-2-let-management-identity-create-a-realm)

### Option 1: Prepare an existing realm

If you choose this option, configure your Keycloak realm following the [Management Identity configuration guide](/self-managed/components/management-identity/configuration/connect-to-an-existing-keycloak.md).

Take note of the following values:

- Realm name (`<realm>`)
- Client ID for Management Identity (`<identity_client_id>`)
- Administrative Keycloak username and password (`<keycloak_admin_username>`, `<keycloak_admin_password>`)

### Option 2: Let Management Identity create a realm

If you choose this option, Management Identity will create a realm named `camunda-platform` on startup.  
Ensure this realm doesn’t already exist before starting for the first time.

Take note of the following values:

- Realm name: `camunda-platform` (`<realm>`)
- Client ID generated for setup: `camunda-identity` (`<identity_client_id>`)
- Administrative Keycloak username and password (`<keycloak_admin_username>`, `<keycloak_admin_password>`)

## Configure the Helm chart

Next, prepare your Kubernetes cluster and install the Camunda Helm chart.

Perform the following steps:

1. [Create a secret](#create-a-secret)
2. [Prepare global configuration](#prepare-global-configuration)
3. [Configure Management Identity](#configure-management-identity)
4. [Configure components using OIDC](#configure-components-using-oidc)

You can also [view the full configuration example](#full-configuration-example).

### Create a secret

Create a secret containing all required credentials.  
For example, the following command creates a `camunda-credentials` secret:

```bash
kubectl create secret generic camunda-credentials \
  --from-literal=identity-keycloak-admin-password=<set to admin password> \
  --from-literal=identity-firstuser-password=CHANGE_ME \
  --from-literal=identity-connectors-client-token=CHANGE_ME \
  --from-literal=identity-optimize-client-token=CHANGE_ME \
  --from-literal=identity-orchestration-client-token=CHANGE_ME \
  --from-literal=webmodeler-postgresql-admin-password=CHANGE_ME \
  --from-literal=webmodeler-postgresql-user-password=CHANGE_ME
```

This secret includes the following keys:

- `identity-keycloak-admin-password`: Password for an administrative Keycloak account (`<keycloak_admin>`).
- `identity-firstuser-password`: Password for the initial Camunda user (default username: `demo`).
- `identity-connectors-client-token`: Client secret of the Keycloak OIDC client `connectors `used by Connectors.
- `identity-optimize-client-token`: Client secret of the Keycloak OIDC client `optimize` used by Optimize.
- `identity-orchestration-client-token`: Client secret of the Keycloak OIDC client `orchestration` used by the Orchestration Cluster.
- `literal=webmodeler-postgresql-admin-password`: Password for the administrative account of the PostgreSQL instance used by Web Modeler (username `postgres`).
- `webmodeler-postgresql-user-password` Password non-privileged user account of the PostgreSQL instance used by Web Modeler (username `web-modeler`).

For additional options on how to create and reference Kubernetes secrets (for example using YAML manifests or consolidated secrets), see [External Kubernetes secrets](/self-managed/deployment/helm/configure/secret-management.md#method-2-external-kubernetes-secrets-recommended-for-all-versions).

### Prepare global configuration

Start with the following global configuration, which provides defaults for all components:

```yaml
global:
  identity:
    auth:
      enabled: true
      publicIssuerUrl: <KEYCLOAK_URL>/realms/<realm>
      issuerBackendUrl: <KEYCLOAK_URL>/realms/<realm>
      authUrl: <KEYCLOAK_URL>/realms/<realm>/protocol/openid-connect/auth
      tokenUrl: <KEYCLOAK_URL>/realms/<realm>/protocol/openid-connect/token
      jwksUrl: <KEYCLOAK_URL>/realms/<realm>/protocol/openid-connect/certs
  security:
    authentication:
      method: oidc
```

Replace `KEYCLOAK_URL` with your Keycloak base URL (in the format `<protocol>://<host/ip>:<port>/<context-path>`).

:::info
In some setups, Keycloak is accessible through different URLs from within the cluster and from the user’s browser. This can happen, for example, if you deployed Keycloak inside your Kubernetes cluster but didn’t expose it under a domain name that’s accessible both internally and externally.

In this case:

- Set `global.identity.auth.publicIssuerUrl` and `global.identity.auth.authUrl` to the URL reachable from users' browsers.
- Set the remaining values to the URL reachable from within the cluster.
  :::

### Configure Management Identity

Configure Management Identity to access the realm and use the initial OIDC client.
On startup, Management Identity creates the realm (if needed), sets up the OIDC clients, and creates the initial user account.

If no clients appear in the Keycloak realm after startup, the configuration was not successful.

Management Identity configuration:

```yaml
global:
  identity:
    keycloak:
      url: # this URL must be reachable from within the cluster
        protocol: <keycloak_protocol>
        host: <keycloak_hostname>
        port: <keycloak_port>
      contextPath: <keycloak_context_path> # set to "/" for the root context path
      realm: /realms/<realm>
      auth:
        adminUser: <keycloak_admin>
        existingSecret: "camunda-credentials"
        existingSecretKey: "identity-keycloak-admin-password"
    auth:
      identity:
        clientId: <identity_client_id>

identity:
  enabled: true
  firstUser:
    secret:
      existingSecret: "camunda-credentials"
      existingSecretKey: "identity-firstuser-password"
  env:
    - name: KEYCLOAK_REALM
      value: <realm>
    - name: IDENTITY_CLIENTID
      value: <identity_client_id>
```

Add the section under `global.identity` to the `global` configuration you created in the previous step.

The `identity.firstUser` field defines the initial user that Management Identity creates in Keycloak with full access to all Camunda components.
By default, this user is named `demo`. To use a different name, set `identity.firstUser.username`.

For additional Keycloak-specific variables you can define under `identity.env`, see [Management Identity environment variables](/self-managed/components/management-identity/miscellaneous/configuration-variables.md).

### Configure components using OIDC

To configure individual components in your Camunda cluster, follow the steps in the [Configure components using OIDC section of the internal Keycloak setup guide](/self-managed/deployment/helm/configure/authentication-and-authorization/internal-keycloak.md#configure-components-using-oidc).

### Full configuration example

The following example shows a complete configuration for connecting to an external Keycloak instance:

```yaml
global:
  identity:
    auth:
      enabled: true
      publicIssuerUrl: <KEYCLOAK_URL>/realms/<realm>
      issuerBackendUrl: <KEYCLOAK_URL>/realms/<realm>
      authUrl: <KEYCLOAK_URL>/realms/<realm>/protocol/openid-connect/auth
      tokenUrl: <KEYCLOAK_URL>/realms/<realm>/protocol/openid-connect/token
      jwksUrl: <KEYCLOAK_URL>/realms/<realm>/protocol/openid-connect/certs
      identity:
        clientId: <identity_client_id>
      optimize:
        secret:
          existingSecret: "camunda-credentials"
          existingSecretKey: "identity-optimize-client-token"
    keycloak:
      url: # this URL must be reachable from within the cluster
        protocol: <keycloak_protocol>
        host: <keycloak_hostname>
        port: <keycloak_port>
      contextPath: <keycloak_context_path> # set to "/" for the root context path
      realm: /realms/<realm>
      auth:
        adminUser: <keycloak_admin>
        existingSecret: "camunda-credentials"
        existingSecretKey: "identity-keycloak-admin-password"
  security:
    authentication:
      method: oidc

identity:
  enabled: true
  firstUser:
    secret:
      existingSecret: "camunda-credentials"
      existingSecretKey: "identity-firstuser-password"
  env:
    - name: KEYCLOAK_REALM
      value: <realm>
    - name: IDENTITY_CLIENTID
      value: <identity_client_id>

optimize:
  enabled: true

connectors:
  security:
    authentication:
      oidc:
        secret:
          existingSecret: "camunda-credentials"
          existingSecretKey: "identity-connectors-client-token"

webModeler:
  enabled: true
  restapi:
    mail:
      fromAddress: noreply@example.com

webModelerPostgresql:
  enabled: true
  auth:
    existingSecret: "camunda-credentials"
    secretKeys:
      adminPasswordKey: "webmodeler-postgresql-admin-password"
      userPasswordKey: "webmodeler-postgresql-user-password"

orchestration:
  security:
    authentication:
      oidc:
        secret:
          existingSecret: "camunda-credentials"
          existingSecretKey: "identity-orchestration-client-token"

console:
  enabled: true
```

To review how each component is configured and which OIDC clients are used:

- Run `kubectl get pods` and `kubectl get configmap`, then use `kubectl describe` to inspect component configurations.
- Log into Keycloak (using your administrative user) to review the OIDC client setup

## Connect to the cluster

After applying this configuration, use the following `kubectl port-forward` commands to access the APIs and UIs from your localhost:

```bash
# Management Identity
kubectl port-forward svc/camunda-identity 8084:80

# Orchestration Cluster
kubectl port-forward svc/camunda-zeebe-gateway 8080:8080
kubectl port-forward svc/camunda-zeebe-gateway 26500:26500

# Connectors
kubectl port-forward svc/camunda-connectors 8086:8080

# Optimize
kubectl port-forward svc/camunda-optimize 8083:80

# Web Modeler
kubectl port-forward svc/camunda-web-modeler-webapp 8070:80
kubectl port-forward svc/camunda-web-modeler-websockets 8085:80

# Console
kubectl port-forward svc/camunda-console 8087:80
```

After port forwarding, access the UIs through `http://localhost:<port>`.

For example:

- Orchestration Cluster UI: `http://localhost:8080`
- Management Identity: `http://localhost:8084`

Log in with the username `demo` and the password stored in the secret key `identity-firstuser-password`.

## Troubleshooting

For common issues and solutions when configuring OIDC authentication, see the [OIDC Troubleshooting guide](./troubleshooting-oidc.md).
