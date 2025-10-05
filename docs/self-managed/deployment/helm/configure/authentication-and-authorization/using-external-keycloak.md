---
id: using-external-keycloak
sidebar_label: External Keycloak
title: Helm chart external Keycloak setup
description: "Learn how to use an external Keycloak instance in a Camunda 8 Self-Managed deployment."
---

The Helm chart deployment can install an internal Keycloak instance using [Bitnami subcharts](/self-managed/deployment/helm/configure/registry-and-images/install-bitnami-enterprise-images.md).

For production environments, Camunda recommends deploying an external Keycloak instance (or another OIDC provider) separately from the Camunda Helm chart. This guide explains how to connect Camunda 8 Self-Managed to an external Keycloak.

## Prerequisites

Before you begin, ensure you have:

- A Keycloak instance deployed with a realm configured. See [Connect to an external Keycloak instance](/self-managed/components/management-identity/configuration/connect-to-an-existing-keycloak.md).
- An admin username and password for Keycloak.

## Configuration

### Parameters

| values.yaml option                                | type    | default                      | description                                                                                       |
| ------------------------------------------------- | ------- | ---------------------------- | ------------------------------------------------------------------------------------------------- |
| `global.security.authentication.method`           | string  | `"basic"`                    | Authentication type (basic or oidc).                                                              |
| `global.identity.keycloak.contextPath`            | string  | `"/auth"`                    | Keycloak URL path prefix. For example, `/auth` means all URLs start with `http://hostname/auth/`. |
| `global.identity.keycloak.realm`                  | string  | `"/realms/camunda-platform"` | Keycloak realm. Must start with `/realms/` followed by the realm name.                            |
| `global.identity.keycloak.url.protocol`           | string  | `""`                         | Keycloak URL scheme (`http` or `https`).                                                          |
| `global.identity.keycloak.url.host`               | string  | `""`                         | Hostname of the Keycloak instance.                                                                |
| `global.identity.keycloak.url.port`               | string  | `""`                         | Port number of the Keycloak instance.                                                             |
| `global.identity.keycloak.auth.adminUser`         | string  | `""`                         | Admin username for Keycloak.                                                                      |
| `global.identity.keycloak.auth.existingSecret`    | string  | `""`                         | Name of the Kubernetes Secret containing the admin password.                                      |
| `global.identity.keycloak.auth.existingSecretKey` | string  | `""`                         | Key within the Secret that stores the admin password.                                             |
| `identityKeycloak.enabled`                        | boolean | `false`                      | Enable or disable the Keycloak subchart deployment.                                               |

### Example usage

To use an external Keycloak, update your `values.yaml` file with the following:

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

[Deploy Camunda 8](/self-managed/deployment/helm/install/quick-install.md) using the custom values file:

```sh
helm install camunda camunda/camunda-platform --version $HELM_CHART_VERSION -f external-keycloak-values.yaml
```

## References

- [Connect to an external Keycloak instance](/self-managed/components/management-identity/configuration/connect-to-an-existing-keycloak.md)
