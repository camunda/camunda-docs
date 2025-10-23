---
id: internal-keycloak
sidebar_label: Internal Keycloak
title: Helm chart internal Keycloak setup
description: Learn how to configure and enable the internal Keycloak instance for Camunda 8 Self-Managed deployments using Helm chart.
---

The Camunda Helm chart can deploy an internal Keycloak instance that acts as the identity management service for authentication and authorization. The Management Identity component configures the internal Keycloak automatically on startup with a realm and several entities to simplify setup and reduce the learning curve.

Enable internal Keycloak if you don’t have an external identity provider (IdP) and want to use additional Camunda components (Console, Web Modeler, Optimize, Management Identity) that are disabled by default in the Helm chart. In this case, Management Identity, Connectors, and the Orchestration Cluster itself must be configured to authenticate against the internal Keycloak.

If you prefer to run Keycloak externally and disable the internal one, see the [guide on using an external Keycloak](/self-managed/deployment/helm/configure/authentication-and-authorization/external-keycloak.md).

## Configuration

This guide shows you how to:

- Configure the Helm chart to deploy an internal Keycloak instance
- Configure the Helm chart with a custom secret for accounts used across all components
- Choose which application components you want to enable in the release
- Access all components from your local machine

To use an internal Keycloak instance, you need to perform the following steps:

1. [Create a secret](#create-a-secret)
1. [Enable internal Keycloak](#enable-internal-keycloak)
1. [Configure Management Identity](#configure-management-identity)
1. [Configure components using OIDC](#configure-components-using-oidc)

Jump to the [full configuration example](#full-configuration-example) to see it all at once.

### Create a secret

Create a secret that contains all required keys. For example, the following command creates a `camunda-credentials` secret:

```bash
kubectl create secret generic camunda-credentials \
  --from-literal=identity-keycloak-postgresql-admin-password=CHANGE_ME \
  --from-literal=identity-keycloak-postgresql-user-password=CHANGE_ME \
  --from-literal=identity-keycloak-admin-password=CHANGE_ME \
  --from-literal=identity-firstuser-password=CHANGE_ME \
  --from-literal=identity-connectors-client-token=CHANGE_ME \
  --from-literal=identity-optimize-client-token=CHANGE_ME \
  --from-literal=identity-orchestration-client-token=CHANGE_ME \
  --from-literal=webmodeler-postgresql-admin-password=CHANGE_ME \
  --from-literal=webmodeler-postgresql-user-password=CHANGE_ME
```

This secret includes the following keys:

- `identity-keycloak-postgresql-admin-password`: The password for the administrative account of the PostgreSQL instance used by Management Identity (username `postgres`).
- `identity-keycloak-postgresql-user-password`: The password non-privileged user account of the PostgreSQL instance used by Management Identity (username `bn_keycloak`).
- `identity-keycloak-admin-password`: The password for the adminstrative account for the internal Keycloak instance (username `admin`).
- `identity-firstuser-password`: The password for the initial user account for the internal Keycloak instance (default username `demo`). This is the account you will use to log into the Camunda web applications once everything is set up.
- `identity-connectors-client-token`: The client secret of the Keycloak OIDC client `connectors `used by Connectors.
- `identity-optimize-client-token`: The client secret of the Keycloak OIDC client `optimize` used by Optimize.
- `identity-orchestration-client-token`: The client secret of the Keycloak OIDC client `orchestration` used by the Orchestration Cluster.
- `webmodeler-postgresql-admin-password`: The password for the administrative account of the PostgreSQL instance used by Web Modeler (username `postgres`).
- `webmodeler-postgresql-user-password` The password non-privileged user account of the PostgreSQL instance used by Web Modeler (username `web-modeler`).

### Enable internal Keycloak

Enable the Keycloak subchart and configure it to use the secret:

```yaml
identityKeycloak:
  enabled: true
  auth:
    existingSecret: "camunda-credentials"
    passwordSecretKey: "identity-keycloak-admin-password"
  postgresql:
    auth:
      existingSecret: "camunda-credentials"
      secretKeys:
        adminPasswordKey: "identity-keycloak-postgresql-admin-password"
        userPasswordKey: "identity-keycloak-postgresql-user-password"
```

### Configure Management Identity and global defaults

Management Identity configures the internal Keycloak instance during startup. For example, it creates the Camunda realm and other required Keycloak entities. If you cannot see the Camunda realm in Keycloak, then this step was not successful.

Management Identity configuration:

```yaml
global:
  identity:
    auth:
      enabled: true
  security:
    authentication:
      method: oidc

identity:
  enabled: true
  firstUser:
    secret:
      existingSecret: "camunda-credentials"
      existingSecretKey: "identity-firstuser-password"
```

`identity.firstUser` defines the first user created in internal Keycloak. By default it creates this user with name `demo`. Set the value `identity.firstUser.username` if you would like to choose a different name.

### Configure components using OIDC

Once Management Identity is configured, you can move on to configuring the OAuth and OIDC connections for the other components. You can skip those components that you do not need. Keep in mind that Orchestration Cluster and Connectors are enabled by default, so you will have to disable them explicitly in that case.

#### Configure Orchestration Cluster

The Orchestration cluster treats internal Keycloak as any other external IdP and connects through OIDC.

Orchestration Cluster configuration:

```yaml
orchestration:
  security:
    authentication:
      oidc:
        secret:
          existingSecret: "camunda-credentials"
          existingSecretKey: "identity-orchestration-client-token"
```

#### Configure Connectors

Connectors must be configured in a similar fashion with OIDC client secret to access the Orchestration Cluster APIs.

Connectors component configuration:

```yaml
connectors:
  security:
    authentication:
      oidc:
        secret:
          existingSecret: "camunda-credentials"
          existingSecretKey: "identity-connectors-client-token"
```

#### Configure Optimize

Optimize component configuration:

```yaml
global:
  identity:
    auth:
      optimize:
        secret:
          existingSecret: "camunda-credentials"
          existingSecretKey: "identity-optimize-client-token"

optimize:
  enabled: true
```

Make sure to add the part under `global.identity.auth` to the existing section that you created when configuring Management Identity.

#### Configure Web Modeler

Web Modeler configures a second PostgreSQL instance.

Web Modeler component configuration:

```yaml
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
```

You can replace the value of `webModeler.restapi.mail.fromAddress` with a value that fits your scenario. This is the email address that Web Modeler declares in the emails it sends. For more details on how you can configure the Web Modeler email connection, see [the corresponding documentation](../enable-additional-components.md#web-modeler).

#### Configure Console

Console component configuration:

```yaml
global:
  identity:
    auth:
      console:
        secret:
          existingSecret: "camunda-credentials"
          existingSecretKey: "identity-console-client-token"

console:
  enabled: true
```

Make sure to add the part under `global.identity.auth` to the existing section that you created when configuring Management Identity.

### Full configuration example

Full configuration file to enable internal Keycloak:

```yaml
global:
  identity:
    auth:
      enabled: true
      console:
        secret:
          existingSecret: "camunda-credentials"
          existingSecretKey: "identity-console-client-token"
      optimize:
        secret:
          existingSecret: "camunda-credentials"
          existingSecretKey: "identity-optimize-client-token"
  security:
    authentication:
      method: oidc

identity:
  enabled: true
  firstUser:
    secret:
      existingSecret: "camunda-credentials"
      existingSecretKey: "identity-firstuser-password"

identityKeycloak:
  enabled: true
  auth:
    existingSecret: "camunda-credentials"
    passwordSecretKey: "identity-keycloak-admin-password"
  postgresql:
    auth:
      existingSecret: "camunda-credentials"
      secretKeys:
        adminPasswordKey: "identity-keycloak-postgresql-admin-password"
        userPasswordKey: "identity-keycloak-postgresql-user-password"

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

In the internal Keycloak scenario, the Camunda Helm chart does most of the heavy lifting of setting up Keycloak, creating OIDC/OAuth clients and wiring the components together. Accordingly, your values file largely only consists of enabling all components and configuring the client secrets. If you are curious how each component is configured and which OIDC clients are used, we recommend to:

- Run `kubectl get pods` and `kubectl get configmap` and the corresponding `kubectl describe` commands to review each component and its effective configuration
- Log into Keycloak (using user `admin` and the configured admin user password from the secret you created) to review the OIDC provider setup

## Connect to the cluster

Running this configuration, you can use the following port-forwarding instructions to access the APIs and UIs from localhost:

```bash
# Keycloak (required for all UIs)
kubectl port-forward svc/camunda-keycloak 18080:80

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

Once port forwarding is in place, you can then access the corresponding component via `http://localhost:<port>`, for example `http://localhost:18080` for Keycloak and `http://localhost:8080` for the Orchestration Cluster UI. Use the username `demo` and the password you have set in the secret key `identity-firstuser-password` to log in.

## External identity provider

Instead of using an internal Keycloak instance, you can configure Camunda to connect to an external IdP, such as an external Keycloak, Microsoft Entra ID, or Okta.

See the [guide on connecting to an external OIDC provider](/self-managed/deployment/helm/configure/authentication-and-authorization/external-oidc-provider.md) for details.
