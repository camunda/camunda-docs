---
id: using-existing-keycloak
title: "Using Existing Keycloak"
description: "Using existing Keycloak in Camunda Platform 8 Self-Managed deployment"
---

Camunda Platform 8 Self-Managed has two different types of applications, Camunda applications (e.g. Operate, Optimize, Tasklist, etc.) and Non-Camunda applications (e.g. Keycloak and Elasticsearch). For more details, review [architecture](../../../platform-architecture/overview.md) documentation to find the different types of the applications.

This guide covers using an existing Keycloak instance, which is part of [Camunda Identity](../../../identity/what-is-identity.md). By default, [Helm chart deployment](../deploy.md) creates a new Keycloak instance, but it's possible to use existing Keycloak either inside the same Kubernetes cluster or outside it.

:::warning
Since Identity uses a Keycloak's admin account, it could override the existing Keycloak configuration. Make sure to backup the Keycloak and test the deployment with a non-production environment first.
:::

## Preparation

The only prerequisite is creating a Kubernetes Secret with the existing Keycloak admin password. For the sake of completeness, here is an example of how to create that secret.

```sh
kubectl create secret generic stage-keycloak \
    --from-literal=admin-password='<EXISTING_KEYCLOAK_ADMIN_PASSWORD>'
```

## Values file

The only change needed to use the existing Keycloak is to configure the following values in the Camunda Platform 8 Self-Managed Helm chart:

```yaml
# File: existing-keycloak-values.yaml
global:
  identity:
    keycloak:
      url:
        # This will produce the following URL "https://keycloak.stage.svc.cluster.local:8443".
        # Also the host could be outside the Kubernetes cluster like "keycloak.stage.example.com".
        protocol: "https"
        host: "keycloak.stage.svc.cluster.local"
        port: "8443"
      auth:
        adminUser: "admin"
        existingSecret: "stage-keycloak"
        existingSecretKey: "admin-password"

identity:
  keycloak:
    enabled: false
```

Then use that custom values file to deploy [Camunda Platform 8](../deploy.md) as usual.
