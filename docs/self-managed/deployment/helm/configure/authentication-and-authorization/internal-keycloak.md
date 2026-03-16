---
id: internal-keycloak
sidebar_label: Internal Keycloak
title: Set up the Helm chart with the internal Keycloak instance
description: Learn how to configure and enable the internal Keycloak instance for Camunda 8 Self-Managed deployments using the Helm chart.
---

The Camunda Helm chart can deploy an internal Keycloak instance that acts as the identity management service for authentication and authorization. The Management Identity component configures the internal Keycloak automatically on startup with a realm and several entities to simplify setup and reduce the learning curve.

Enable internal Keycloak if you don’t have an external identity provider (IdP) and want to use additional Camunda components (Console, Web Modeler, Optimize, Management Identity) that are disabled by default in the Helm chart.

If you prefer to run Keycloak externally and disable the internal one, see [Set up the Helm chart with an external Keycloak instance](/self-managed/deployment/helm/configure/authentication-and-authorization/external-keycloak.md).

## Configuration

This guide shows you how to:

- Configure the Helm chart to deploy an internal Keycloak instance.
- Configure the Helm chart with a custom secret for accounts used across all components.
- Enable the application components you want to include in the release.
- Access all components from your local environment.

To use an internal Keycloak instance, complete the following steps:

1. [Create a secret](#create-a-secret)
1. [Enable internal Keycloak](#enable-internal-keycloak)
1. [Configure Management Identity](#configure-management-identity)
1. [Configure components using OIDC](#configure-components-using-oidc)

See the [full configuration example](#full-configuration-example) for the complete setup.

### Create a secret

Create a secret that contains all required credentials. For example, the following command creates a `camunda-credentials` secret:

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

- `identity-keycloak-postgresql-admin-password`: Password for the administrative account of the PostgreSQL instance used by Management Identity (`postgres`).
- `identity-keycloak-postgresql-user-password`: Password for the non-privileged PostgreSQL account used by Management Identity (`bn_keycloak`).
- `identity-keycloak-admin-password`: Password for the adminstrative account for the internal Keycloak instance (`admin`).
- `identity-firstuser-password`: Password for the initial user account in Keycloak (default username `demo`), used to log in to the Camunda web apps.
- `identity-connectors-client-token`: Client secret for the Keycloak OIDC client `connectors `used by Connectors.
- `identity-optimize-client-token`: Client secret for the Keycloak OIDC client `optimize` used by Optimize.
- `identity-orchestration-client-token`: Client secret for the Keycloak OIDC client `orchestration` used by the Orchestration Cluster.
- `webmodeler-postgresql-admin-password`: Password for the administrative account of the PostgreSQL instance used by Web Modeler (`postgres`).
- `webmodeler-postgresql-user-password` Password for the non-privileged PostgreSQL account used by Web Modeler (`web-modeler`).

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

Management Identity configures the internal Keycloak instance during startup. For example, it creates the Camunda realm and other required Keycloak entities. If the Camunda realm doesn’t appear in Keycloak after deployment, the setup process did not complete successfully.

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

`identity.firstUser` defines the first user created in Keycloak. By default, this user is named `demo`. You can override this by setting `identity.firstUser.username`.

### Configure components using OIDC

Once Management Identity is configured, you can set up OAuth and OIDC for the remaining components. You can skip components you don’t plan to run. By default, the Orchestration Cluster and Connectors are enabled and must be explicitly disabled if not required.

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

Add the section under `global.identity.auth` to the existing section you created when configuring Management Identity.

#### Configure Web Modeler

Web Modeler configures a second PostgreSQL instance and requires a redirect URL for OIDC authentication.

Web Modeler component configuration:

```yaml
global:
  identity:
    auth:
      webModeler:
        redirectUrl: "http://localhost:8070" # Change this when using a domain

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

:::important Redirect URL configuration
The `redirectUrl` parameter is **required** for Web Modeler authentication. The default value is `http://localhost:8070`, which works for local port-forwarding setups.

If you're using a domain or Ingress to expose Web Modeler, you **must** update this value to match your Web Modeler URL:

- With Ingress: `https://your-domain.com/modeler` (if using a context path)
- Without context path: `https://modeler.your-domain.com`

Mismatched redirect URLs will cause authentication failures that are difficult to debug.
:::

You can update `webModeler.restapi.mail.fromAddress` with an address suitable for your environment.
This address appears as the sender in emails sent by Web Modeler.
For more details on configuring email delivery, see the [Web Modeler section in Enable additional Camunda components](../enable-additional-components.md#web-modeler).

#### Configure Console

Console component configuration:

```yaml
console:
  enabled: true
```

Since Console is a public client, it does not need to be defined under `global.identity.auth`.

### Full configuration example

The following example shows a complete configuration for connecting to internal Keycloak:

```yaml
global:
  identity:
    auth:
      enabled: true
      optimize:
        secret:
          existingSecret: "camunda-credentials"
          existingSecretKey: "identity-optimize-client-token"
      webModeler:
        # Default: http://localhost:8070
        # Update this when using a domain/Ingress, e.g., https://your-domain.com/modeler
        redirectUrl: "http://localhost:8070"
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

In this setup, the Camunda Helm chart handles most of the Keycloak configuration automatically, including creating OIDC or OAuth clients and linking components. Your values file primarily enables components and defines client secrets.

To review how each component is configured and which OIDC clients are used:

- Run `kubectl get pods` and `kubectl get configmap`, then use `kubectl describe` to inspect component configurations.
- Log into Keycloak (using your administrative user) to review the OIDC client setup

## Connect to the cluster

### Local access with port forwarding

After applying this configuration, use the following `kubectl port-forward` commands to access the APIs and UIs from your localhost. If you use [Keycloak deployed via the Keycloak Operator](/self-managed/deployment/helm/configure/operator-based-infrastructure.md), also port-forward the Keycloak service:

```bash
# Keycloak Operator service (only if using Keycloak)
kubectl port-forward svc/keycloak-service 18080:18080

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

Once port forwarding is active, access each component through `http://localhost:<port>`.
For example:

- Keycloak: `http://localhost:18080`
- Web Modeler: `http://localhost:8070`
- Orchestration Cluster: `http://localhost:8080`

Log in with username `demo` and the password you defined under `identity-firstuser-password`.

:::note Default URLs and port forwarding
The configuration shown above uses default `redirectUrl` values that match the port-forwarding setup (`http://localhost:8070` for Web Modeler, `http://localhost:18080` for Keycloak). These defaults work automatically when using `kubectl port-forward`.

If you don't use port forwarding and instead expose components via Ingress or a domain, you **must** update the `redirectUrl` parameters under `global.identity.auth` to match your actual URLs. See [Ingress setup](/self-managed/deployment/helm/configure/ingress/ingress-setup.md) for domain-based configuration examples.
:::

### Domain-based access with Ingress

If you're using Ingress to expose components via a domain (instead of port forwarding), update the redirect URLs in your Helm values:

```yaml
global:
  identity:
    auth:
      webModeler:
        redirectUrl: "https://your-domain.com/modeler" # Or https://modeler.your-domain.com
      # Update other component URLs as needed
```

For complete Ingress configuration, see [Ingress setup](/self-managed/deployment/helm/configure/ingress/ingress-setup.md).

## External identity provider

Instead of using an internal Keycloak instance, you can configure Camunda to connect to an external IdP, such as an external Keycloak, Microsoft Entra ID, or Okta.

See [Set up the Helm chart with an external OIDC provider](/self-managed/deployment/helm/configure/authentication-and-authorization/external-oidc-provider.md) for details.
