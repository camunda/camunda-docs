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
The Ingress-NGINX controller is planned to reach end of life in March 2026 (see [the Kubernetes announcement on Ingress-NGINX retirement](https://www.kubernetes.dev/blog/2025/11/12/ingress-nginx-retirement/)). Plan a migration to the Gateway API where it fits your use case.

If you decide not to adopt the Gateway API, you can migrate to a different Ingress controller and continue using the Ingress API. This remains a supported approach.
:::

## Prerequisites

Ensure both are installed in your cluster.

- Gateway API CRDs
- A Gateway API controller

### Gateway controllers

Just like Ingress Controllers, Gateway controllers need to be installed before a cluster can use the Gateway API. [See the list of Gateway API implementations](https://gateway-api.sigs.k8s.io/implementations/) for details.

In testing, we use the [NGINX Gateway Fabric](https://github.com/nginx/nginx-gateway-fabric).

## Configure the Helm chart

| Parameter                              | Type    | Default | Description                                                                                                                                                                                                                                                                      |
| -------------------------------------- | ------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `global.host`                          | string  | `""`    | The external-facing URL hostname where Camunda will be installed.                                                                                                                                                                                                                |
| `global.gateway.enabled`               | boolean | `false` | Enable creating resources for the Kubernetes Gateway API.                                                                                                                                                                                                                        |
| `global.gateway.createGatewayResource` | boolean | `true`  | Create the Gateway CustomResource. Do not enable if you already have a Gateway resource.                                                                                                                                                                                         |
| `global.gateway.external`              | boolean | `true`  | Set this to true if you are using the Gateway API but want to create the resources yourself.                                                                                                                                                                                     |
| `global.gateway.className`             | string  | `""`    | Name of the GatewayClass resource that defines which Gateway controller operates on your Gateway and HTTPRoute resources.                                                                                                                                                        |
| `global.gateway.labels`                | map     | `{}`    | Labels to add to the Gateway and HTTPRoute resources.                                                                                                                                                                                                                            |
| `global.gateway.annotations`           | map     | `{}`    | Annotations to add to the Gateway and HTTPRoute resources.                                                                                                                                                                                                                       |
| `global.gateway.tls.enabled`           | boolean | `false` | Enable TLS.                                                                                                                                                                                                                                                                      |
| `global.gateway.tls.secretName`        | string  | `""`    | Name of the Kubernetes Secret resource containing a TLS cert                                                                                                                                                                                                                     |
| `global.gateway.port`                  | integer | `80`    | The port of the plaintext (HTTP) Gateway listener. Change this when your Gateway controller exposes HTTP on a non-standard port.                                                                                                                                                 |
| `global.gateway.tls.port`              | integer | `443`   | The port of the HTTPS Gateway listener. Change this when your Gateway controller exposes HTTPS on a non-standard port (for example, Traefik's `8443` `websecure` entrypoint).                                                                                                    |
| `global.gateway.httpSectionName`       | string  | `""`    | Override the `parentRefs.sectionName` on the HTTPRoutes. Must match a listener name on the target Gateway. Only set this for an externally-managed Gateway. See [externally-managed gateway with custom listener names](#externally-managed-gateway-with-custom-listener-names). |
| `global.gateway.grpcSectionName`       | string  | `""`    | Override the `parentRefs.sectionName` on the GRPCRoute. Must match a listener name on the target Gateway. Only set this for an externally-managed Gateway. See [externally-managed gateway with custom listener names](#externally-managed-gateway-with-custom-listener-names).  |
| `global.gateway.name`                  | string  | `""`    | The name of the Gateway resource that Routes attach to. Defaults to the Helm release fullname when unset. Set this when the target Gateway has a different name than your release.                                                                                               |
| `global.gateway.namespace`             | string  | `""`    | The namespace where the Gateway resource lives. Set this only when using a shared Gateway in a different namespace than your Camunda components. When unset, Kubernetes defaults to the Route's own namespace.                                                                   |
| `global.gateway.controllerNamespace`   | string  | `""`    | The namespace where the Gateway controller is installed.                                                                                                                                                                                                                         |

## Example configuration

```yaml
global:
  host: "camunda.example.com"
  gateway:
    createGatewayResource: true
    enabled: true
    className: nginx
    tls:
      enabled: true
      secretName: camunda-platform
    annotations:
      external-dns.alpha.kubernetes.io/hostname: "{{ .Values.global.gateway.hostname }}"
      external-dns.alpha.kubernetes.io/ttl: "60"
```

### Custom listener ports

By default the Gateway listens on port `80` for HTTP and port `443` for HTTPS. Set `global.gateway.port` and `global.gateway.tls.port` when your Gateway controller exposes these on non-standard ports, for example, Traefik's `websecure` entrypoint on `8443`:

```yaml
global:
  host: "camunda.example.com"
  gateway:
    createGatewayResource: true
    enabled: true
    className: nginx
    port: 8080
    tls:
      enabled: true
      secretName: camunda-platform
      port: 8443
```

### Externally-managed Gateway with custom listener names

When attaching Routes to a Gateway you do not manage, its listener names may not match the chart defaults (`http`, `https`, `grpc`, `grpcs`). Use `global.gateway.httpSectionName` and `global.gateway.grpcSectionName` to point the Routes' `parentRefs.sectionName` at the listener names the target Gateway actually defines:

```yaml
global:
  host: "camunda.example.com"
  gateway:
    enabled: true
    createGatewayResource: false
    name: shared-gateway
    namespace: shared-infra
    httpSectionName: web
    grpcSectionName: grpc-web
```

:::warning
Only set the `sectionName` overrides for an externally-managed Gateway, and make sure each value matches a listener name on that Gateway. When the chart manages the Gateway (`createGatewayResource: true`), the listener names are always `http`, `https`, `grpc`, and `grpcs`. Setting an override in that case detaches the Routes from the Gateway with no error.
:::

### NGINX Gateway Fabric: ProxySettingsPolicy

If you are using the Gateway API with the NGINX Gateway Fabric, the default proxy buffer size is likely too small.

[ProxySettingsPolicy documentation](https://docs.nginx.com/nginx-gateway-fabric/traffic-management/proxy-settings/).

You may need to install a CRD to be able to create ProxySettingsPolicy resources. This can be found here: [CRD location](https://github.com/nginx/nginx-gateway-fabric/tree/main/config/crd/bases)

An error that might indicate you need to change something is:

> 502: upstream sent too big header while reading response header from upstream

```yaml
apiVersion: gateway.nginx.org/v1alpha1
kind: ProxySettingsPolicy
metadata:
  name: camunda-platform
  namespace: camunda
spec:
  buffering:
    bufferSize: 128k
    buffers:
      number: 8
      size: 128k
    busyBuffersSize: 256k
  targetRefs:
    - group: gateway.networking.k8s.io
      kind: Gateway
      name: camunda-platform
```
