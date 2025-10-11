---
sidebar_label: Authentication and authorization
title: Helm charts authentication and authorization configuration
description: Learn how to configure authentication and authorization for Camunda Helm charts.
---

This page explains how to configure authentication and authorization in Camunda Helm charts. It covers the default basic authentication, how to add users and roles, and how to enable internal Keycloak or connect to an external identity provider.

## Basic authentication

Camunda Helm charts use basic authentication by default. No additional configuration is required.

:::note
Because basic authentication is enabled by default, components that depend on Management Identity are disabled by default, which are:

- Management Identity
- Console
- Web Modeler
- Keycloak
- Optimize
  :::

### Default users

Two users are created by default:

- demo
- connectors

### Add users

To add a user, for example user `foo`, update your configuration:

```yaml
orchestration:
  security:
    initialization:
      users:
        - username: demo
          password: demo
          name: Demo User
          email: demo@demo.com
        - username: connector
          password: connector
          name: Connector User
          email: connector@demo.com
        - username: foo
          password: foo
          name: Foo User
          email: foo@foo.com
```

### Assign roles

To assign default roles to a user, add them to `defaultRoles`. For example, to assign the `admin` role to `foo`:

```yaml
orchestration:
  security:
    initialization:
      defaultRoles:
        admin:
          users:
            - demo
            - foo
```

:::note Helm arrays
In Helm, arrays must be overwritten in full. The default array must be configured in your custom `values.yaml`. For example, when adding the user `foo` or assigning roles to `foo`, include the default array values.
:::

## Internal Keycloak

The Camunda Helm chart can deploy an internal Keycloak instance that acts as the identity management service for authentication and authorization. This instance is bundled into your cluster and behaves like an external OIDC provider from the Orchestration Cluster’s perspective. The internal Keycloak is automatically configured by the Management Identity component with a realm and several entities to simplify setup and reduce the learning curve.

Enable internal Keycloak if you don’t have an external identity provider (IdP) and want to use additional Camunda components (Console, Web Modeler, Optimize, Management Identity) that are disabled by default in the Helm chart. In this case, Management Identity, Connectors, and the Orchestration Cluster itself must be configured to authenticate against internal Keycloak.

If you prefer to run Keycloak as an external IdP and disable the internal one, see [Using external Keycloak](/self-managed/deployment/helm/configure/authentication-and-authorization/using-external-keycloak.md).

### Create a secret

Create a secret that contains all required keys. For example, the following command creates a `camunda-credentials` secret:

```bash
kubectl create secret generic camunda-credentials \
  --from-literal=identity-keycloak-postgresql-admin-password=CHANGE_ME \
  --from-literal=identity-keycloak-postgresql-user-password=CHANGE_ME \
  --from-literal=identity-keycloak-admin-password=CHANGE_ME \
  --from-literal=identity-firstuser-password=CHANGE_ME \
  --from-literal=identity-connectors-client-token=CHANGE_ME \
  --from-literal=identity-console-client-token=CHANGE_ME \
  --from-literal=identity-optimize-client-token=CHANGE_ME \
  --from-literal=identity-orchestration-client-token=CHANGE_ME
```

This secret includes the following keys:

- `identity-keycloak-postgresql-admin-password`
- `identity-keycloak-postgresql-user-password`
- `identity-keycloak-admin-password`
- `identity-firstuser-password`
- `identity-connectors-client-token`
- `identity-console-client-token`
- `identity-optimize-client-token`
- `identity-orchestration-client-token`

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

### Configure Management Identity

Management Identity configures internal Keycloak before startup. For example, it creates the Camunda realm and other required entities. Without this step, you won’t see the Camunda realm in Keycloak. Also, within Management Identity global authentication section there is a part for Console and Optimize (this is needed only if they are enabled).

Management Identity configuration:

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

identity:
  enabled: true
  firstUser:
    secret:
      existingSecret: "camunda-credentials"
      existingSecretKey: "identity-firstuser-password"
```

The value of `identity.firstUser` defines the first user created in internal Keycloak. Use this user to log in to Camunda.

### Configure Orchestration Cluster

Once Management Identity has configured Keycloak, the Orchestration Cluster can connect to internal Keycloak. The Orchestration cluster treats internal Keycloak as an external IdP and connects through OIDC.

Orchestration Cluster configuration:

```yaml
orchestration:
  security:
    authentication:
      method: oidc
      oidc:
        secret:
          existingSecret: "camunda-credentials"
          existingSecretKey: "identity-orchestration-client-token"
```

### Configure Connectors

Connectors must be configured with OIDC to connect to the Orchestration Cluster. This ensures they use the default Connectors client using OIDC instead of basic authentication.

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

orchestration:
  security:
    authentication:
      method: oidc
      oidc:
        secret:
          existingSecret: "camunda-credentials"
          existingSecretKey: "identity-orchestration-client-token"

connectors:
  security:
    authentication:
      oidc:
        secret:
          existingSecret: "camunda-credentials"
          existingSecretKey: "identity-connectors-client-token"
```

### Connect to the cluster

Use port forwarding to connect to the cluster:

```bash
kubectl port-forward svc/camunda-zeebe-gateway 8080:8080
kubectl port-forward svc/camunda-keycloak 18080:80
kubectl port-forward svc/camunda-identity 8084:80
```

## External identity provider

Instead of using internal Keycloak, you can configure Camunda to connect to an external IdP, such as an external Keycloak, Microsoft Entra ID, or Okta.

See [Helm chart OpenID Connect provider setup](/self-managed/deployment/helm/configure/authentication-and-authorization/connect-to-an-oidc-provider.md) for details.

## References

- [Helm chart OpenID Connect provider setup](/self-managed/deployment/helm/configure/authentication-and-authorization/connect-to-an-oidc-provider.md)
- [Connect Identity to an identity provider](/self-managed/components/orchestration-cluster/identity/connect-external-identity-provider.md)
- [Using external Keycloak](/self-managed/deployment/helm/configure/authentication-and-authorization/using-external-keycloak.md)
- Management Identity:
  - [Connect Management Identity to an identity provider](/self-managed/components/management-identity/configuration/connect-to-an-oidc-provider.md)
  - [Connect to an existing Keycloak instance](/self-managed/components/management-identity/configuration/connect-to-an-existing-keycloak.md)
  - [Configure an external IdP provider](/self-managed/components/management-identity/configuration/configure-external-identity-provider.md)
