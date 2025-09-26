---
id: using-external-keycloak
sidebar_label: External Keycloak
title: Helm chart external Keycloak usage
description: "Learn how to use an external Keycloak instance in Camunda 8 Self-Managed deployment."
---

Camunda 8 Self-Managed has two different types of applications: Camunda applications (Orchestration cluster, Connectors, Optimize etc.) and non-Camunda applications (such as Keycloak and Elasticsearch). For more details, review the [architecture](../../../about-self-managed.md#architecture) documentation for more information on the different types of applications.

This guide steps through using an external Keycloak instance, which is part of [Management Identity](/self-managed/components/management-identity/overview.md). By default, [Helm chart deployment](../install.md) creates a new Keycloak instance, but it's possible to use an external Keycloak instance either inside the same Kubernetes cluster or outside of it.

## Prerequisites

Before starting, you will need:

- Keycloak deployed and a realm configured from the following guide: [Connect to an external Keycloak instance](/self-managed/components/management-identity/configuration/connect-to-an-existing-keycloak.md).
- An admin username and password for Keycloak

## Configuration

### Parameters

| values.yaml option                                | type    | default                      | description                                                                          |
| ------------------------------------------------- | ------- | ---------------------------- | ------------------------------------------------------------------------------------ |
| `global.security.authentication.method`           | string  | `"basic"`                    | Type of authentication (basic or oidc)                                               |
| `global.identity.keycloak.contextPath`            | string  | `"/auth"`                    | Keycloak url path prefix. "/auth" means all urls start with http://hostname/auth/... |
| `global.identity.keycloak.realm`                  | string  | `"/realms/camunda-platform"` | Keycloak realm (must start with "/realms/" followed by the name of the realm)        |
| `global.identity.keycloak.url.protocol`           | string  | `""`                         | Keycloak url scheme (http or https)                                                  |
| `global.identity.keycloak.url.host`               | string  | `""`                         | Hostname of Keycloak instance                                                        |
| `global.identity.keycloak.url.port`               | string  | `""`                         | Port number of Keycloak                                                              |
| `global.identity.keycloak.auth.adminUser`         | string  | `""`                         | Name of the admin user for Keycloak                                                  |
| `global.identity.keycloak.auth.existingSecret`    | string  | `""`                         | Name of Kubernetes Secret contianing                                                 |
| `global.identity.keycloak.auth.existingSecretKey` | string  | `""`                         | Hostname of the database                                                             |
| `identityKeycloak.enabled`                        | boolean | `false`                      | Enables or disables keycloak installed as a subchart                                 |

### Example usage

The only change required to use the external Keycloak is configuring the following values in the Camunda 8 Self-Managed Helm chart:

```yaml
# File: external-keycloak-values.yaml
global:
  security:
    authentication:
      method: "oidc"
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

Then, use the custom values file to [deploy Camunda 8](../install.md) as usual.

```sh
helm install camunda camunda/camunda-platform --version $HELM_CHART_VERSION -f external-keycloak-values.yaml
```

## Troubleshooting

## References

- [Connect to an external Keycloak instance](/self-managed/components/management-identity/configuration/connect-to-an-existing-keycloak.md)
