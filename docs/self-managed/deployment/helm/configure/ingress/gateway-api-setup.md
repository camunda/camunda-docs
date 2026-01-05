---
id: gateway-api-setup
sidebar_label: With Gateway API
title: Configure the Helm chart with K8S Gateway API
description: Set up and configure K8S Gateway API for Camunda 8 Self-Managed Helm deployments.
---

The Kubernetes Gateway API is a newer way to manage Ingress traffic in Kubernetes clusters. The Gateway API improves upon the Ingress API in the following ways:

- Allows for a separation between Cluster Operators who might have permissions to Gateway resources and Application Developers who might have permissions to HTTPRoute resources.
- Allows for configuration of Nginx outside of using labels and annotations to tweak behavior (which is also beneficial for limiting permissions).

:::note
The Ingress-nginx controller is planned to reach end-of-life in March 2026 ([details](https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/)). As a result, we recommend planning a migration—preferably to Gateway API where it fits your use case.
If you decide not to adopt Gateway API, you can also migrate to a different Ingress controller and continue using the Ingress API; this remains a supported approach.
:::

## Prerequisites

- Gateway API CRD's installed in your cluster
- Gateway API Controller

## Gateway Controllers

Just like Ingress Controllers, Gateway Controllers need to be installed before a cluster can use the Gateway API. [List of Gateway API implementations](https://gateway-api.sigs.k8s.io/implementations/)

In testing, we make use of the [NGINX Gateway Fabric](https://github.com/nginx/nginx-gateway-fabric).

## Configuration

| Parameter                              | Type    | Default | Description                                                                                                                  |
| -------------------------------------- | ------- | ------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `global.gateway.enabled`               | boolean | `false` | Enable creating resources for the K8S Gateway API                                                                            |
| `global.gateway.createGatewayResource` | bool    | `true`  | Create the Gateway CustomResource. Do not enable if you already have a Gateway resource.                                     |
| `global.gateway.external`              | boolean | `true`  | Set this to true if you are using the Gateway API but want to create the resources yourself.                                 |
| `global.gateway.className`             | string  | `""`    | The name of the GatewayClass resource that defines which Gateway Controller will be operating on your Gateway and HTTPRoutes |
| `global.gateway.labels`                | map     | `{}`    | Labels to add to the Gateway and HTTPRoute resources                                                                         |
| `global.gateway.annotations`           | map     | `{}`    | Annotations to add to the Gateway and HTTPRoute resources                                                                    |
| `global.gateway.hostname`              | string  | `""`    | The external facing url hostname camunda will be installed on.                                                               |
| `global.gateway.tls.enabled`           | boolean | `false` | Enable TLS                                                                                                                   |
| `global.gateway.tls.secretName`        | string  | `""`    | Name of the K8S Secret resource containing a TLS certificate                                                                 |
| `global.gateway.controllerNamespace`   | string  | `""`    | Namespace the Gateway Controller is installed on.                                                                            |

## Example configuration:

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
