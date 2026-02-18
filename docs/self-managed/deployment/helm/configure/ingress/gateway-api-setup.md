---
id: gateway-api-setup
sidebar_label: With Gateway API
title: Configure the Helm chart with Gateway API
description: Set up and configure the Kubernetes Gateway API for Camunda 8 Self-Managed Helm deployments.
---

Use this guide to configure the Camunda 8 Helm chart with the Kubernetes Gateway API instead of a traditional Ingress controller.

The Gateway API provides a modern way to manage Ingress traffic in Kubernetes clusters. It improves on the Ingress API in the following ways:

- Separates cluster operators, who manage Gateway resources, from application developers, who manage HTTPRoute resources.
- Enables configuration of NGINX without relying on labels and annotations, which also helps limit permissions.

:::note
The Ingress-NGINX controller is planned to reach end of life in March 2026 (see the Kubernetes announcement on Ingress-NGINX retirement). We recommend planning a migration to the Gateway API where it fits your use case.

If you decide not to adopt the Gateway API, you can migrate to a different Ingress controller and continue using the Ingress API. This remains a supported approach.
:::

## Prerequisites

Ensure both are installed in your cluster.

- Gateway API CRDs
- A Gateway API controller

## Gateway controllers

Just like Ingress Controllers, Gateway controllers need to be installed before a cluster can use the Gateway API. [See the list of Gateway API implementations](https://gateway-api.sigs.k8s.io/implementations/) for details.

In testing, we use the [NGINX Gateway Fabric](https://github.com/nginx/nginx-gateway-fabric).

## Configure the Helm chart

| Parameter                              | Type    | Default | Description                                                                                                               |
| -------------------------------------- | ------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| `global.gateway.enabled`               | boolean | `false` | Enable creating resources for the Kubernetes Gateway API.                                                                 |
| `global.gateway.createGatewayResource` | boolean | `true`  | Create the Gateway CustomResource. Do not enable if you already have a Gateway resource.                                  |
| `global.gateway.external`              | boolean | `true`  | Set this to true if you are using the Gateway API but want to create the resources yourself.                              |
| `global.gateway.className`             | string  | `""`    | Name of the GatewayClass resource that defines which Gateway controller operates on your Gateway and HTTPRoute resources. |
| `global.gateway.labels`                | map     | `{}`    | Labels to add to the Gateway and HTTPRoute resources.                                                                     |
| `global.gateway.annotations`           | map     | `{}`    | Annotations to add to the Gateway and HTTPRoute resources.                                                                |
| `global.gateway.hostname`              | string  | `""`    | The external-facing URL hostname where Camunda will be installed.                                                         |
| `global.gateway.tls.enabled`           | boolean | `false` | Enable TLS.                                                                                                               |
| `global.gateway.tls.secretName`        | string  | `""`    | Name of the Kubernetes Secret resource containing a TLS cert                                                              |
| `global.gateway.controllerNamespace`   | string  | `""`    | The namespace where the Gateway controller is installed.                                                                  |

## Example configuration

```yaml
global:
  gateway:
    createGatewayResource: true
    enabled: true
    className: nginx
    hostname: "camunda.example.com"
    tls:
      enabled: true
      secretName: camunda-platform
    annotations:
      external-dns.alpha.kubernetes.io/hostname: "{{ .Values.global.gateway.hostname }}"
      external-dns.alpha.kubernetes.io/ttl: "60"
```
