---
id: using-existing-keycloak
title: "Using existing Keycloak"
description: "Learn how to use an existing Keycloak instance in Camunda 8 Self-Managed deployment."
---

Camunda 8 Self-Managed has two different types of applications: Camunda applications (Operate, Optimize, Tasklist, etc.) and non-Camunda applications (such as Keycloak and Elasticsearch). For more details, review the [architecture](../../about-self-managed.md#architecture) documentation for more information on the different types of applications.

This guide steps through using an existing Keycloak instance, which is part of [Camunda Identity](/self-managed/identity/what-is-identity.md). By default, [Helm chart deployment](/self-managed/setup/install.md) creates a new Keycloak instance, but it's possible to use an existing Keycloak instance either inside the same Kubernetes cluster or outside of it.

## Preparation

Configure your existing Keycloak realm according to the following guide: [Connect to an existing Keycloak instance](/self-managed/identity/user-guide/configuration/connect-to-an-existing-keycloak.md).

## Values file

The only change required to use the existing Keycloak is configuring the following values in the Camunda 8 Self-Managed Helm chart:

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

identityKeycloak:
  enabled: false
```

Then, use the custom values file to [deploy Camunda 8](/self-managed/setup/install.md) as usual.

```sh
helm install camunda camunda/camunda-platform -f existing-keycloak-values.yaml
```
