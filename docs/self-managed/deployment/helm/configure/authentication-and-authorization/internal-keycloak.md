---
id: internal-keycloak
sidebar_label: Internal Keycloak
title: Set up the Helm chart with an in-cluster Keycloak instance
description: Learn how to deploy an in-cluster Keycloak instance with the Keycloak operator and connect Camunda 8 Self-Managed to it using the Helm chart.
---

For an in-cluster Keycloak that acts as the identity management service for authentication and authorization, deploy Keycloak with the [Keycloak operator](/self-managed/deployment/helm/configure/operator-based-infrastructure.md#keycloak-deployment) and connect the Camunda Helm chart to it. The Management Identity component configures Keycloak automatically on startup with a realm and several entities to simplify setup and reduce the learning curve.

Use this setup if you don’t have an external identity provider (IdP) and want to run Keycloak inside your cluster, together with additional Camunda components (Console, Web Modeler, Optimize, Management Identity) that are disabled by default in the Helm chart.

If you prefer to connect to a Keycloak instance you manage elsewhere, see [Set up the Helm chart with an external Keycloak instance](/self-managed/deployment/helm/configure/authentication-and-authorization/external-keycloak.md).

:::info Keycloak deployment changed in Camunda 8.10
Earlier releases bundled an internal Keycloak through the `identityKeycloak` Bitnami subchart (`identityKeycloak.enabled: true`). As of Camunda 8.10 (Helm chart `15.x`), the bundled Bitnami subcharts are removed. Deploy Keycloak in-cluster with the [Keycloak operator](/self-managed/deployment/helm/configure/operator-based-infrastructure.md#keycloak-deployment) and its database with the [CloudNativePG operator](/self-managed/deployment/helm/configure/operator-based-infrastructure.md#postgresql-deployment) (or use a managed database), then wire Camunda to it as shown below. For releases up to 8.9, see the [8.9 internal Keycloak guide](https://docs.camunda.io/docs/8.9/self-managed/deployment/helm/configure/authentication-and-authorization/internal-keycloak/).
:::

## Configuration

This guide shows you how to:

- Deploy an in-cluster Keycloak with the Keycloak operator and connect the Helm chart to it.
- Configure the Helm chart with a custom secret for accounts used across all components.
- Enable the application components you want to include in the release.
- Access all components from your local environment.

To use an in-cluster Keycloak instance, complete the following steps:

1. [Create a secret](#create-a-secret)
1. [Deploy Keycloak and connect Camunda](#deploy-keycloak-and-connect-camunda)
1. [Configure Management Identity](#configure-management-identity-and-global-defaults)
1. [Configure components using OIDC](#configure-components-using-oidc)

See the [full configuration example](#full-configuration-example) for the complete setup.

### Create a secret

Create a secret that contains the Camunda application credentials. For example, the following command creates a `camunda-credentials` secret:

```bash
kubectl create secret generic camunda-credentials \
  --from-literal=identity-firstuser-password=CHANGE_ME \
  --from-literal=identity-connectors-client-token=CHANGE_ME \
  --from-literal=identity-optimize-client-token=CHANGE_ME \
  --from-literal=identity-orchestration-client-token=CHANGE_ME
```

This secret includes the following keys:

- `identity-firstuser-password`: Password for the initial user account in Keycloak (default username `demo`), used to log in to the Camunda web apps.
- `identity-connectors-client-token`: Client secret for the Keycloak OIDC client `connectors` used by Connectors.
- `identity-optimize-client-token`: Client secret for the Keycloak OIDC client `optimize` used by Optimize.
- `identity-orchestration-client-token`: Client secret for the Keycloak OIDC client `orchestration` used by the Orchestration Cluster.

The Keycloak administrator credentials and the PostgreSQL credentials for Keycloak, Identity, and Web Modeler are no longer part of this secret. They are provided by the operators that deploy those services — for example, the operator-generated `keycloak-initial-admin` secret and the `pg-*-secret` database secrets. See [Operator-based infrastructure](/self-managed/deployment/helm/configure/operator-based-infrastructure.md) for how these are created.

### Deploy Keycloak and connect Camunda

Deploy an in-cluster Keycloak with the [Keycloak operator](/self-managed/deployment/helm/configure/operator-based-infrastructure.md#keycloak-deployment) and a PostgreSQL database with the [CloudNativePG operator](/self-managed/deployment/helm/configure/operator-based-infrastructure.md#postgresql-deployment). The operator-based guide creates the Keycloak service (`keycloak-service`), the operator-generated `keycloak-initial-admin` secret, and the `pg-keycloak` database cluster.

Then connect the Camunda Helm chart to that Keycloak instance through `global.identity.keycloak`:

```yaml
global:
  identity:
    auth:
      type: KEYCLOAK
      issuerBackendUrl: http://keycloak-service:18080/auth/realms/camunda-platform
    keycloak:
      internal: false # Connect to the operator-managed Keycloak instead of a bundled one
      url:
        protocol: http
        host: keycloak-service
        port: "18080"
      contextPath: /auth
      realm: /realms/camunda-platform
      auth:
        adminUser: temp-admin
        secret:
          existingSecret: keycloak-initial-admin
          existingSecretKey: password
```

The `host`, `port`, admin user, and secret name above match the defaults created by the [operator-based Keycloak deployment](/self-managed/deployment/helm/configure/operator-based-infrastructure.md#keycloak-deployment). Adjust them if you customized that deployment.

### Configure Management Identity and global defaults

Management Identity configures the Keycloak instance during startup. For example, it creates the Camunda realm and other required Keycloak entities. If the Camunda realm doesn’t appear in Keycloak after deployment, the setup process did not complete successfully.

Management Identity stores its data in a dedicated PostgreSQL database. Connect it to the `pg-identity` cluster created by the [CloudNativePG operator](/self-managed/deployment/helm/configure/operator-based-infrastructure.md#postgresql-deployment) (or a managed database):

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
  externalDatabase:
    enabled: true
    host: pg-identity-rw
    port: 5432
    database: identity
    secret:
      existingSecret: pg-identity-secret
      existingSecretKey: password
```

`identity.firstUser` defines the first user created in Keycloak. By default, this user is named `demo`. You can override this by setting `identity.firstUser.username`.

### Configure components using OIDC

Once Management Identity is configured, you can set up OAuth and OIDC for the remaining components. You can skip components you don’t plan to run. By default, the Orchestration Cluster and Connectors are enabled and must be explicitly disabled if not required.

#### Configure Orchestration Cluster

The Orchestration cluster treats the in-cluster Keycloak as any other external IdP and connects through OIDC.

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

#### Configure Web Modeler and Console (Camunda Hub)

In Camunda 8.10, Console and Web Modeler are deployed together as sub-components of **Camunda Hub**. Enable both by setting `camundaHub.enabled: true`. This replaces the former `console.enabled` and `webModeler.enabled` flags and takes precedence over them.

Web Modeler connects to its own PostgreSQL database and requires a redirect URL for OIDC authentication. Console is a public client and needs no additional OIDC configuration.

Web Modeler component configuration:

```yaml
global:
  identity:
    auth:
      webModeler:
        redirectUrl: "http://localhost:8070" # Change this when using a domain

camundaHub:
  enabled: true # Deploys both Console and Web Modeler

webModeler:
  # Web Modeler settings still use the top-level webModeler.* path; the chart
  # passes them through to the Camunda Hub sub-component.
  restapi:
    mail:
      fromAddress: noreply@example.com
    # Connect Web Modeler to the operator-managed PostgreSQL cluster (pg-webmodeler)
    externalDatabase:
      enabled: true
      host: pg-webmodeler-rw
      port: 5432
      database: webmodeler
      username: webmodeler
      secret:
        existingSecret: pg-webmodeler-secret
        existingSecretKey: password
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

Console is deployed as part of Camunda Hub, which you enabled with `camundaHub.enabled: true` in the [previous step](#configure-web-modeler-and-console-camunda-hub). Since Console is a public client, it does not need to be defined under `global.identity.auth` and requires no additional configuration.

### Full configuration example

The following example shows a complete configuration for deploying Camunda with an in-cluster, operator-managed Keycloak and operator-managed PostgreSQL databases:

```yaml
global:
  identity:
    auth:
      enabled: true
      type: KEYCLOAK
      issuerBackendUrl: http://keycloak-service:18080/auth/realms/camunda-platform
      optimize:
        secret:
          existingSecret: "camunda-credentials"
          existingSecretKey: "identity-optimize-client-token"
      webModeler:
        # Default: http://localhost:8070
        # Update this when using a domain/Ingress, e.g., https://your-domain.com/modeler
        redirectUrl: "http://localhost:8070"
    keycloak:
      internal: false # Connect to the operator-managed Keycloak instead of a bundled one
      url:
        protocol: http
        host: keycloak-service
        port: "18080"
      contextPath: /auth
      realm: /realms/camunda-platform
      auth:
        adminUser: temp-admin
        secret:
          existingSecret: keycloak-initial-admin
          existingSecretKey: password
  security:
    authentication:
      method: oidc

identity:
  enabled: true
  firstUser:
    secret:
      existingSecret: "camunda-credentials"
      existingSecretKey: "identity-firstuser-password"
  externalDatabase:
    enabled: true
    host: pg-identity-rw
    port: 5432
    database: identity
    secret:
      existingSecret: pg-identity-secret
      existingSecretKey: password

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
  restapi:
    mail:
      fromAddress: noreply@example.com
    externalDatabase:
      enabled: true
      host: pg-webmodeler-rw
      port: 5432
      database: webmodeler
      username: webmodeler
      secret:
        existingSecret: pg-webmodeler-secret
        existingSecretKey: password

orchestration:
  security:
    authentication:
      oidc:
        secret:
          existingSecret: "camunda-credentials"
          existingSecretKey: "identity-orchestration-client-token"

camundaHub:
  enabled: true # Deploys both Console and Web Modeler
```

In this setup, Keycloak and PostgreSQL are deployed and managed by their operators, while the Camunda Helm chart handles the application-side Keycloak configuration automatically, including creating OIDC or OAuth clients and linking components. Your values file primarily connects to the operator-managed services, enables components, and defines client secrets.

To review how each component is configured and which OIDC clients are used:

- Run `kubectl get pods` and `kubectl get configmap`, then use `kubectl describe` to inspect component configurations.
- Log into Keycloak (using your administrative user) to review the OIDC client setup

## Connect to the cluster

### Local access with port forwarding

After applying this configuration, use the following `kubectl port-forward` commands to access the APIs and UIs from your localhost. Because Keycloak runs as a separate operator-managed service, also port-forward the Keycloak service:

```bash
# Keycloak Operator service
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
kubectl port-forward svc/camunda-web-modeler-restapi 8070:80
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

Instead of using an in-cluster Keycloak instance, you can configure Camunda to connect to an external IdP, such as an external Keycloak, Microsoft Entra ID, or Okta.

See [Set up the Helm chart with an external OIDC provider](/self-managed/deployment/helm/configure/authentication-and-authorization/external-oidc-provider.md) for details.
