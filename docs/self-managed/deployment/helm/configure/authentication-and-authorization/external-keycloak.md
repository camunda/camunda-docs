---
id: external-keycloak
sidebar_label: External Keycloak
title: Helm chart setup with an external Keycloak instance
description: "Learn how to set up the Helm Chart so that it connects to an external Keycloak instance"
---

The Camunda Helm chart can connect to an external Keycloak instance that acts as the identity management service for authentication and authorization. With initial configuration for administrative access, the Management Identity component configures the Keycloak realm and several entities automatically on startup to simplify setup and reduce the learning curve.

Use this guide if you have an existing instance of Keycloak and would like the Camunda components to set up the Keycloak entities for you.

If you prefer to let Camunda also create a Keycloak pod, see the [guide on using an internal Keycloak instance](/self-managed/deployment/helm/configure/authentication-and-authorization/internal-keycloak.md).

:::info
Make sure you are running a version of Keycloak that is supported by your Camunda version by reviewing [our supported environments](/reference/supported-environments.md#component-requirements).
:::

## Configuring Keycloak

Before you start setting up the Camunda Helm Chart, prepare your Keycloak instance. For the Keycloak realm, you have two options:

- [You use an existing realm](#option-1-prepare-an-existing-realm)
- [You let Camunda's Management Identity create a realm for you](#option-2-let-management-identity-create-a-realm)

### Option 1: Prepare an existing realm

If you choose this option, configure your realm following the instructions in our [Management Identity configuration guide](/self-managed/components/management-identity/configuration/connect-to-an-existing-keycloak.md).

As a result, take note of the following properties:

- The realm's name (called `<realm>` in the following)
- The ID of the client you have created for Management Identity (called `<identity_client_id>` in the following)
- The name and password of an administrative Keycloak user (called `<keycloak_admin_username>` and `<keycloak_admin_password>` in the following)

### Option 2: Let Management Identity create a realm

If you choose this option, Management Identity will create a realm with name and ID `camunda-platform` when it starts up. Make sure this realm does not exist yet when you start for the first time.

As a result, take note of the following properties:

- The realm's name: `camunda-platform` (called `<realm>` in the following)
- The ID of the client that Management Identity generates for Keycloak setup: `camunda-identity` (called `<identity_client_id>` in the following)
- The name and password of an administrative Keycloak user (called `<keycloak_admin_username>` and `<keycloak_admin_password>` in the following)

## Configuring the Helm Chart

Next, you can continue with preparing your Kubernetes cluster and installing the Camunda Helm Chart.

You need to perform the following steps:

1. [Create a secret](#create-a-secret)
1. [Prepare global configuration](#prepare-global-configuration)
1. [Configure Management Identity](#configure-management-identity)
1. [Configure components using OIDC](#configure-components-using-oidc)

Jump to the [full configuration example](#full-configuration-example) to see it all at once.

### Create a secret

Create a secret that contains all required keys. For example, the following command creates a `camunda-credentials` secret:

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

- `identity-keycloak-admin-password`: The password for an adminstrative account for your Keycloak instance. We will call the name of this user `<keycloak_admin>` in the following.
- `identity-firstuser-password`: The password for the initial user account to access the Camunda applications (default username `demo`).
- `identity-connectors-client-token`: The client secret of the Keycloak OIDC client `connectors `used by Connectors.
- `identity-optimize-client-token`: The client secret of the Keycloak OIDC client `optimize` used by Optimize.
- `identity-orchestration-client-token`: The client secret of the Keycloak OIDC client `orchestration` used by the Orchestration Cluster.
- `literal=webmodeler-postgresql-admin-password`: The password for the administrative account of the PostgreSQL instance used by Web Modeler (username `postgres`).
- `webmodeler-postgresql-user-password` The password non-privileged user account of the PostgreSQL instance used by Web Modeler (username `web-modeler`).

### Prepare global configuration

Start with the following global configuration that provides defaults for all components:

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

Replace `KEYCLOAK_URL` with your Keycloak's base URL (in the form `<protocol>://<host/ip>:<port>/<context-path>`).

:::info
In some setups, Keycloak is accessible through different URLs from within the cluster and from the user's browser. That is for example the case if you have deployed Keycloak within your Kubernetes cluster and you do not expose it at a domain name that is accessible from both, inside and outside of the cluster.

In this situation, set `global.identity.auth.publicIssuerUrl` and `global.identity.auth.authUrl` to the URL that is reachable from your users' browser. Set the remaining values to the URL that is reachable from within the cluster.
:::

### Configure Management Identity

Next, configure Management Identity to access the realm and use the initial OIDC client. On startup, Management Identity will then set up the realm (if you did not already create it) and set up the remaining OIDC clients and an initial user accounts. If you notice that no additional clients are created in your realm, then this step was not successful.

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

Make sure to add the part under `global.identity` to the existing section of the global configuration that you created in the previous step.

`identity.firstUser` defines the first user that Management Identity creates in Keycloak with full access to all Camunda components. By default it creates this user with name `demo`. Set the value `identity.firstUser.username` if you would like to choose a different name.

:::tip
See the [Management Identity environment variables](/self-managed/components/management-identity/miscellaneous/configuration-variables.md) page for details of additional Keycloak-specific variables you can add to `identity.env` to adapt the setup to your Keycloak installation.
:::

### Configure components using OIDC

Follow [the corresponding section in the guide for setting up an internal Keycloak](/self-managed/deployment/helm/configure/authentication-and-authorization/internal-keycloak.md#configure-components-using-oidc) to configure the individual components in the Camunda cluster.

### Full configuration example

Full configuration file to connect an external Keycloak instance:

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
      console:
        secret:
          existingSecret: "camunda-credentials"
          existingSecretKey: "identity-console-client-token"
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

If you are curious how each component is configured and which OIDC clients are used, we recommend to:

- Run `kubectl get pods` and `kubectl get configmap` and the corresponding `kubectl describe` commands to review each component and its effective configuration
- Log into Keycloak (using your administrative user) to review the OIDC provider setup

## Connect to the cluster

Running this configuration, you can use the following port-forwarding instructions to access the APIs and UIs from localhost:

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

Once port forwarding is in place, you can then access the corresponding component via `http://localhost:<port>`, for example `http://localhost:8080` for the Orchestration Cluster UI or `http://localhost:8084` for Mangement Identity. Use the username `demo` and the password you have set in the secret key `identity-firstuser-password` to log in.
