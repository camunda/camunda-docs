---
id: ingress-setup
title: "Combined and separated Ingress setup"
description: "Camunda Platform 8 Self-Managed combined and separated Ingress setup"
---

Camunda Platform 8 Self-Managed has multiple web applications and gRPC services. Both can be accessed externally using Ingress. There are two ways to do this:

1. **Combined setup:** In this setup, there are two Ingress objects: one Ingress object for all Camunda Platform 8 web applications using a single domain. Each application has a sub-path e.g. `camunda.example.com/operate`, and `camunda.example.com/optimize` and another Ingress which uses gRPC protocol for Zeebe Gateway e.g. `zeebe.camunda.example.com`.
2. **Separated setup:** In this setup, each component has its own Ingress/host e.g. `operate.camunda.example.com`, `optimize.camunda.example.com`, `zeebe.camunda.example.com`, etc.

There are no significant differences between the two setups. Rather, they both offer flexibility for different workflows.

:::note
Camunda Platform 8 Helm chart doesn't manage or deploy Ingress controllers, it only deploys Ingress resources. Hence, this Ingress setup will not work without an Ingress controller running in your cluster.
:::

## Preparation

- An Ingress controller should be deployed in advance. The examples below use `Nginx` Ingress controller, but any Ingress controller could be used by setting `ingress.className`.
- TLS configuration is not handled in the examples because it varies between different workflows. It could be configured directly using `ingress.tls` options or via an external tool like [Cert-Manager](https://github.com/cert-manager/cert-manager) using `ingress.annotations`. For more details, check available [configuration options](https://github.com/camunda/camunda-platform-helm/tree/main/charts/camunda-platform#configuration).

## Combined Ingress setup

In this setup, a single Ingress/domain is used to access Camunda Platform 8 web applications, and another for Zeebe Gateway. By default, all web applications use `/` as a base, so we just need to set the context path, Ingress configuration, and authentication redirect URLs.

![Camunda Platform 8 Self-Managed Architecture Diagram - Combined Ingress](../../../platform-architecture/assets/camunda-platform-8-self-managed-architecture-diagram-combined-ingress.png)

```yaml
# Chart values for the Camunda Platform 8 Helm chart in combined Ingress setup.

# This file deliberately contains only the values that differ from the defaults.
# For changes and documentation, use your favorite diff tool to compare it with:
# https://github.com/camunda/camunda-platform-helm/blob/main/charts/camunda-platform

# IMPORTANT: Make sure to change "camunda.example.com" to your domain.

global:
  ingress:
    enabled: true
    className: nginx
    host: "camunda.example.com"
  identity:
    auth:
      publicIssuerUrl: "https://camunda.example.com/auth/realms/camunda-platform"
      operate:
        redirectUrl: "https://camunda.example.com/operate"
      tasklist:
        redirectUrl: "https://camunda.example.com/tasklist"
      optimize:
        redirectUrl: "https://camunda.example.com/optimize"
      webModeler:
        redirectUrl: "https://camunda.example.com/modeler"

identity:
  contextPath: "/identity"
  fullURL: "https://camunda.example.com/identity"

operate:
  contextPath: "/operate"

optimize:
  contextPath: "/optimize"

tasklist:
  contextPath: "/tasklist"

webModeler:
  # The context path is used for the web application that will be accessed by users in the browser.
  # In addition, a WebSocket endpoint will be exposed on "[contextPath]-ws", e.g. "/modeler-ws".
  contextPath: "/modeler"

zeebe-gateway:
  ingress:
    enabled: true
    className: nginx
    host: "zeebe.camunda.example.com"
```

:::note Web Modeler
The configuration above only contains the Ingress-related values under `webModeler`. Note the additional [installation instructions and configuration hints](../../helm-kubernetes/deploy.md#installing-web-modeler).
:::

Using the custom values file, [deploy Camunda Platform 8 as usual](../../helm-kubernetes/deploy.md):

```shell
helm install demo camunda/camunda-platform -f values-combined-ingress.yaml
```

Once deployed, you can access the Camunda Platform 8 components on:

- **Web applications:** `https://camunda.example.com/[identity|operate|optimize|tasklist|modeler]`
  - _Note_: Web Modeler also exposes a WebSocket endpoint on `https://camunda.example.com/modeler-ws`. This is only used by the application itself and not supposed to be accessed by users directly.
- **Keycloak authentication:** `https://camunda.example.com/auth`
- **Zeebe Gateway:** `grpc://zeebe.camunda.example.com`

## Separated Ingress setup

In this setup, each Camunda Platform 8 component has its own Ingress/domain. There is no need to set the context since `/` is used as a default base. Here, we just need to set the Ingress configuration and authentication redirect URLs.

![Camunda Platform 8 Self-Managed Architecture Diagram - Separated Ingress](../../../platform-architecture/assets/camunda-platform-8-self-managed-architecture-diagram-separated-ingress.png)

```yaml
# Chart values for the Camunda Platform 8 Helm chart in combined Ingress setup.

# This file deliberately contains only the values that differ from the defaults.
# For changes and documentation, use your favorite diff tool to compare it with:
# https://github.com/camunda/camunda-platform-helm/blob/main/charts/camunda-platform

# IMPORTANT: Make sure to change "camunda.example.com" to your domain.

global:
  identity:
    auth:
      publicIssuerUrl: "https://keycloak.camunda.example.com/auth/realms/camunda-platform"
      operate:
        redirectUrl: "https://operate.camunda.example.com"
      tasklist:
        redirectUrl: "https://tasklist.camunda.example.com"
      optimize:
        redirectUrl: "https://optimize.camunda.example.com"
      webModeler:
        redirectUrl: "https://modeler.camunda.example.com"

identity:
  ingress:
    enabled: true
    className: nginx
    host: "identity.camunda.example.com"
  fullURL: "https://identity.camunda.example.com"

  keycloak:
    ingress:
      enabled: true
      ingressClassName: nginx
      hostname: "keycloak.camunda.example.com"

operate:
  ingress:
    enabled: true
    className: nginx
    host: "operate.camunda.example.com"

optimize:
  ingress:
    enabled: true
    className: nginx
    host: "optimize.camunda.example.com"

tasklist:
  ingress:
    enabled: true
    className: nginx
    host: "tasklist.camunda.example.com"

zeebe-gateway:
  ingress:
    enabled: true
    className: nginx
    host: "zeebe.camunda.example.com"

webModeler:
  ingress:
    enabled: true
    className: nginx
    webapp:
      host: "modeler.camunda.example.com"
    websockets:
      host: "modeler-ws.camunda.example.com"
```

:::note Web Modeler
The configuration above only contains the Ingress-related values under `webModeler`. Note the additional [installation instructions and configuration hints](../../helm-kubernetes/deploy.md#installing-web-modeler).
:::

Using the custom values file, [deploy Camunda Platform 8 as usual](../../helm-kubernetes/deploy.md):

```shell
helm install demo camunda/camunda-platform -f values-separated-ingress.yaml
```

Once deployed, you can access the Camunda Platform 8 components on:

- **Web applications:** `https://[identity|operate|optimize|tasklist|modeler].camunda.example.com`
- **Keycloak authentication:** `https://keycloak.camunda.example.com`
- **Zeebe Gateway:** `grpc://zeebe.camunda.example.com`

## Ingress Controllers

Ingress resources require the cluster to have an [ingress controlling](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/) running. There are many options for configuring your ingress controller. If you are using a cloud provider such as AWS or GCP, we recommend you use follow their ingress setup guides if an ingress controller is not already pre-installed.

### Example local configuration

An ingress controller is required when working a local Camunda Platform 8 installation also. Here is a simple ingress controller configuration using the [nginx ingress controller](https://docs.nginx.com/nginx-ingress-controller/installation/installation-with-helm/):

```yaml
# nginx_ingress_values.yml
controller:
  replicaCount: 1
  hostNetwork: true
  service:
    type: NodePort
```

To install this ingress controller to your local cluster:

```shell
helm install -f nginx_ingress_values.yaml nginx-ingress oci://ghcr.io/nginxinc/charts/nginx-ingress --version 0.18.0
```

## Troubleshooting

If something is not working as expected, check the guide for [general deployment troubleshooting](../../troubleshooting.md).
