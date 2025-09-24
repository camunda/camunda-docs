---
id: authentication-and-authorization
sidebar_label: Authentication and authorization
title: Configure authentication and authorization in Helm charts
description: Learn how to configure authentication and authorization for Camunda Helm charts.
---

## Basic authentication

Camunda Helm charts use basic authentication by default. No additional configuration is required.

:::note
Because basic authentication is enabled by default, components that depend on Management Identity are disabled by default:

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

You should enable the internal Keycloak if you don’t have an external IdP but want to use additional Camunda components that are disabled by default in the Camunda Helm chart, such as:

- Management Identity
- Console
- Web Modeler
- Optimize

In the perspective of the Orchestration Cluster, the internal Keycloak component will be treated as an external identity provider. Therefore, some extra configuration is required in the Orchestration Cluster.

Also, management identity, Connectors, and the Orchestration Cluster will also need to be configured to properly connect to internal Keycloak.

Make sure to create a secret that will have all of the relevant secret keys listed, so it can be used for the below configurations. For this example, a `camunda-credentials` Kubernetes secret is created with the following keys:

- identity-keycloak-postgresql-admin-password
- identity-keycloak-postgresql-user-password
- identity-keycloak-admin-password
- identity-connectors-client-token

Here is a `kubectl` command to create the secret:

```yaml
kubectl create secret generic camunda-credentials \
--from-literal=identity-keycloak-postgresql-admin-password=w8QYyElF3f \
--from-literal=identity-keycloak-postgresql-user-password=w8QYyElF3f \
--from-literal=identity-keycloak-admin-password=w8QYyElF3f \
--from-literal=identity-firstuser-password=w8QYyElF3f \
--from-literal=identity-connectors-client-token=w8QYyElF3f
```

### Enable Internal Keycloak

Here is a configuration on how to enable internal Keycloak:

```yaml
identityKeycloak:
  enabled: true
  postgresql:
    auth:
      existingSecret: "camunda-credentials"
      secretKeys:
        adminPasswordKey: "identity-keycloak-postgresql-admin-password"
        userPasswordKey: "identity-keycloak-postgresql-user-password"
  auth:
    existingSecret: "camunda-credentials"
    passwordSecretKey: "identity-keycloak-admin-password"
```

### Enable and Configure Management Identity

The next step is to configure the Management Identity component so Management Identity can configure internal Keycloak before startup. This is a required step for internal Keycloak to be configured correctly. For example, without this step you would not see the "Camunda Realm" on Keycloak. It is the job of Management Identity to create this realm among other entites within Internal Keycloak.

Here is the configuration for Management Identity:

```yaml
global:
  identity:
    auth:
      enabled: true

identity:
  enabled: true
  firstUser:
    existingSecret: "camunda-credentials"
    existingSecretKey: "identity-firstuser-password"
```

The `identity.firstUser` means the first user that will be created within internal Keycloak. This user can be used to login to the Camunda Platform.

### Configure The Orchestration Cluster

Once Management Identity has correctly configured Keycloak, it will be possible for the Orchestration Cluster to connect to internal Keycloak. The Orchestration cluster will treat internal Keycloak as an external identity provider and connect through OIDC.

Here is the configuration for the Orchestration Cluster:

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

### Configure The Connectors Component

The connectors component needs to know how to connect to the orchestration cluster. This is why it is neccessary to enter in the OIDC configurations for the connectors component. So the Connectors component can connect using the default configured Connectors client using OIDC and not using basic auth, for example.

Here is the configuration for the Connectors component:

```yaml
connectors:
  security:
    authentication:
      oidc:
        secret:
          existingSecret: "camunda-credentials"
          existingSecretKey: "identity-connectors-client-token"
```

### Bringing it All Together

Here is the full configuration file for enabling Internal Keycloak:

```yaml
global:
  identity:
    auth:
      enabled: true

identity:
  enabled: true
  firstUser:
    existingSecret: "camunda-credentials"
    existingSecretKey: "identity-firstuser-password"

identityKeycloak:
  enabled: true
  postgresql:
    auth:
      existingSecret: "camunda-credentials"
      secretKeys:
        adminPasswordKey: "identity-keycloak-postgresql-admin-password"
        userPasswordKey: "identity-keycloak-postgresql-user-password"
  auth:
    existingSecret: "camunda-credentials"
    passwordSecretKey: "identity-keycloak-admin-password"

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

### Connecting to The Cluster

To connect to the cluster, you can run the following port forward commands:

```bash
kubectl port-forward svc/camunda-zeebe-gateway 8082:8080
kubectl port-forward svc/camunda-keycloak 18080:80
kubectl port-forward svc/camunda-identity 8084:80
```

## External Identity Provider
