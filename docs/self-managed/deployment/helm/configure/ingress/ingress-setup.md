---
id: ingress-setup
sidebar_label: With Ingress
title: Configure the Helm chart with Ingress
description: Set up and configure Ingress for Camunda 8 Self-Managed Helm deployments.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

:::caution
Starting with Camunda 8.8, the separated Ingress configuration is no longer supported. Instead, follow the combined Ingress setup described in this guide. If you want to replicate the behavior of the previous separated Ingress approach, check separated Ingress migration.
:::

Camunda 8 Self-Managed has multiple web applications and gRPC services. You can expose them externally with a combined Ingress setup.

## Prerequisites

- An Ingress controller deployed in advance. The examples below use the [ingress-nginx controller](https://github.com/kubernetes/ingress-nginx), but you can use any Ingress controller by setting `global.ingress.className` (and `orchestration.ingress.grpc.className` for the Zeebe gRPC Ingress).
- The annotations your controller needs. Starting with Camunda 8.10 (chart 15.x), the chart's default ingress-nginx annotation set comes from a compatibility shim that you can turn off with `global.compatibility.nginx.renderAnnotations: false`; see [Ingress-nginx annotation defaults deprecated in the Helm chart](/reference/announcements-release-notes/8100/8100-announcements.md#ingress-annotation-defaults-deprecated).

:::note
[Ingress-nginx reached end of life in March 2026](https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/). The Camunda 8 reference architectures deploy [Contour](https://projectcontour.io/) instead. The examples on this page still use Ingress-nginx annotations. With another controller, translate them to its equivalents. See [configure the gRPC upstream](#configure-the-grpc-upstream) for the gRPC annotation each controller expects.
:::

- TLS configuration is not included in the examples because it varies between different workflows. Configure TLS in one of these ways:
  - Use `ingress.tls` options directly.
  - Use an external tool such as [Cert-Manager](https://github.com/cert-manager/cert-manager) with `ingress.annotations`.  
    For more information, see the available [configuration options](https://artifacthub.io/packages/helm/camunda/camunda-platform#configuration).

:::note
Camunda 8 Helm chart only deploys Ingress resources. It does not manage or deploy Ingress controllers. You must have an Ingress controller running in your cluster.
:::

## Configuration

In this configuration, two Ingress objects are created:

- **Web applications**: One Ingress object for all Camunda 8 web applications using one domain. Each application has a sub-path. For example, `camunda.example.com/operate`, `camunda.example.com/optimize`.
- **Zeebe Gateway**: Another Ingress object using the gRPC protocol for Zeebe Gateway. For example, `zeebe.camunda.example.com`.

By default, all web applications use `/` as a base, so we just need to set the context path, Ingress configuration, and authentication redirect URLs.

:::note
For Operate, Tasklist, Optimize, Modeler, Connectors, and Console, the Ingress path (`global.identity.auth.<component>.redirectUrl`) must match the `contextPath` for that component.
:::

### Example configuration

```yaml
# Chart values for the Camunda 8 Helm chart in combined Ingress setup.

# This file deliberately contains only the values that differ from the defaults.
# For changes and documentation, use your favorite diff tool to compare it with:
# https://artifacthub.io/packages/helm/camunda/camunda-platform

# IMPORTANT: Make sure to change "camunda.example.com" to your domain.

global:
  host: "camunda.example.com"
  ingress:
    enabled: true
    className: nginx
  identity:
    auth:
      publicIssuerUrl: "https://camunda.example.com/auth/realms/camunda-platform"
      optimize:
        redirectUrl: "https://camunda.example.com/optimize"
      webModeler:
        redirectUrl: "https://camunda.example.com/modeler"
      console:
        redirectUrl: "https://camunda.example.com/console"

identity:
  contextPath: "/identity"
  fullURL: "https://camunda.example.com/identity"

optimize:
  contextPath: "/optimize"

orchestration:
  contextPath: "/orchestration"
  ingress:
    grpc:
      enabled: true
      className: nginx
      host: "zeebe.camunda.example.com"

webModeler:
  # The context path is used for the web application that will be accessed by users in the browser.
  # In addition, a WebSocket endpoint will be exposed on "[contextPath]-ws", e.g. "/modeler-ws".
  contextPath: "/modeler"

console:
  contextPath: "/console"

connectors:
  contextPath: "/connectors"
```

Incorporate these custom values into the values file you use to deploy Camunda (see [Install Camunda with Helm](/self-managed/deployment/helm/install/quick-install.md)):

```shell
helm install camunda camunda/camunda-platform --version $HELM_CHART_VERSION -f values-combined-ingress.yaml
```

After deployment, access the Camunda 8 components at:

- **Management Applications:** `https://camunda.example.com/[identity|modeler|console]`
- **Core Orchestration Applications and REST API:** `https://camunda.example.com/orchestration/[identity|operate|optimize|tasklist|v2]`
- **Web Modeler WebSocket:** Web Modeler exposes a WebSocket endpoint on `https://camunda.example.com/modeler-ws`. This is only used internally by the application and not for direct user access.
- **Keycloak authentication:** `https://camunda.example.com/auth`
- **Zeebe gRPC Gateway:** `grpc://zeebe.camunda.example.com`

:::note
This configuration shows only the Ingress-related values for `webModeler`and `Console`. For full setup, see [Enable additional components](/self-managed/deployment/helm/configure/enable-additional-components.md).
:::

### Configure custom public ports

Set `global.ingress.publicPorts` when clients reach your Ingress controller on ports other than `80` and `443`. For example, a local cluster that can't bind the standard ports might map the Ingress controller to host ports `8080` and `8443`.

| Parameter                          | Type    | Default | Description                                              |
| ---------------------------------- | ------- | ------- | -------------------------------------------------------- |
| `global.ingress.publicPorts.http`  | integer | `80`    | The public port for Ingress endpoints with TLS disabled. |
| `global.ingress.publicPorts.https` | integer | `443`   | The public port for Ingress endpoints with TLS enabled.  |

Both values accept integers from 1 to 65535. The chart omits port `80` from HTTP URLs and port `443` from HTTPS URLs.

The TLS setting for each Ingress determines which public port the chart uses. For web applications, the chart uses `global.ingress.tls.enabled`. For the Zeebe gRPC Ingress, it uses `orchestration.ingress.grpc.tls.enabled`, even when `global.ingress.enabled` is `false`.

Setting a public port doesn't enable TLS.

The chart adds the public port to the URLs it derives from `global.host` and the Zeebe gRPC Ingress host:

- Links in the installation notes and release information.
- The Identity URL and its login callback, if `identity.fullURL` is empty.
- The WebSocket port browsers use to connect to Web Modeler, if Web Modeler has a context path.

The chart doesn't rewrite URLs you configure explicitly. Include the port in `identity.fullURL`, `global.identity.auth.publicIssuerUrl`, and each `global.identity.auth.<component>.redirectUrl`.

Public ports change only the generated URLs. They don't configure Ingress controller listeners, Kubernetes Services, or host port mappings. Configure your Ingress controller and cluster to expose the required ports.

The Gateway API integration doesn't use these values. To change the Gateway listener ports, see [custom listener ports](./gateway-api-setup.md#custom-listener-ports).

The following example configures the generated web application URLs to use HTTPS on public port `8443`:

```yaml
global:
  host: "camunda.example.com"
  ingress:
    enabled: true
    className: nginx
    tls:
      enabled: true
      secretName: camunda-platform
    publicPorts:
      https: 8443
  identity:
    auth:
      publicIssuerUrl: "https://camunda.example.com:8443/auth/realms/camunda-platform"
      optimize:
        redirectUrl: "https://camunda.example.com:8443/optimize"
      webModeler:
        redirectUrl: "https://camunda.example.com:8443/modeler"
      console:
        redirectUrl: "https://camunda.example.com:8443/console"

identity:
  contextPath: "/identity"
  fullURL: "https://camunda.example.com:8443/identity"
```

## Route traffic with your own resources

Set `global.ingress.external: true` when a service mesh or routing resources you manage send traffic to Camunda instead of the chart's Ingress objects.

```yaml
global:
  host: "camunda.example.com"
  ingress:
    enabled: true
    external: true

orchestration:
  ingress:
    grpc:
      enabled: true
      external: true
      host: "zeebe.camunda.example.com"
```

With `global.ingress.external: true`, the chart doesn't render any web application Ingress object. The setting has no effect if `global.ingress.enabled` is `false`.

The chart still derives external URLs from `global.host`, the component context paths, `global.ingress.protocol`, and `global.ingress.publicPorts`. The chart uses these URLs for:

- Links in the installation notes and release information.
- The Identity URL and its login callback, if `identity.fullURL` is empty.
- The WebSocket host, port, and path browsers use to connect to Web Modeler, if Web Modeler has a context path.

Configure your routing resources to serve each component on these URLs. If clients reach Camunda over HTTPS, set `global.ingress.protocol: https`.

`global.ingress.external` doesn't affect the Zeebe gRPC Ingress. To skip the gRPC Ingress, set `orchestration.ingress.grpc.external: true`. The chart still derives the gRPC URL from `orchestration.ingress.grpc.host`.

If a service mesh or your own routing resources send traffic to Camunda, use `global.ingress.external: true` instead of `global.ingress.enabled: false`:

| Values                                                             | Chart renders Ingress objects | URL source           | Use when                                                                                 |
| ------------------------------------------------------------------ | ----------------------------- | -------------------- | ---------------------------------------------------------------------------------------- |
| `global.ingress.enabled: true`                                     | Yes                           | `global.host`        | The chart's Ingress objects route traffic.                                               |
| `global.ingress.enabled: true` and `global.ingress.external: true` | No                            | `global.host`        | A service mesh or your own routing resources route traffic.                              |
| `global.ingress.enabled: false`                                    | No                            | `localhost` defaults | You access components with [port forwarding](./accessing-components-without-ingress.md). |

If you manage Gateway API resources yourself, use `global.gateway.external` instead. See [manage all resources yourself](./gateway-api-setup.md#scenario-d-manage-all-resources-yourself).

## Separated Ingress migration

As the separated Ingress was removed in Camunda 8.8, there are two options for migration:

1. **Recommended:** Use the [combined Ingress configuration](#configuration).
2. **Alternative:** You can use global.extraManifests to define and deploy your own Ingress objects, providing functionality similar to the former separated Ingress setup.

The example below demonstrates how to add an Ingress object for Optimize, replicating the separated Ingress behavior. You can apply the same approach to create additional Ingress objects for other components, as needed.

```yaml
# values-separated-ingress.yaml
global:
  extraManifests:
    - |
      ---
      apiVersion: networking.k8s.io/v1
      kind: Ingress
      metadata:
        name: camunda-platform-optimize
        namespace: camunda-dev
        annotations:
          nginx.ingress.kubernetes.io/backend-protocol: HTTP
          nginx.ingress.kubernetes.io/proxy-body-size: 10m
          nginx.ingress.kubernetes.io/proxy-buffer-size: 128k
          nginx.ingress.kubernetes.io/proxy-buffering: "on"
          nginx.ingress.kubernetes.io/rewrite-target: /
          nginx.ingress.kubernetes.io/ssl-redirect: "false"
      spec:
        ingressClassName: nginx
        rules:
        - host: optimize.example.com
          http:
            paths:
            - backend:
                service:
                  name: camunda-platform-optimize
                  port:
                    number: 80
              path: /
              pathType: Prefix
        tls:
        - hosts:
          - optimize.example.com
          secretName: camunda-platform-optimize-tls
    - |
      [Add more Ingresses as needed]
```

Please note that, you need to create all resources referenced by the objects in `global.extraManifests`, such as the TLS secret `camunda-platform-optimize-tls`.

## Ingress controllers

Ingress resources require the cluster to have a running [Ingress Controller](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/). There are many options for configuring your Ingress Controller. If you use a cloud provider such as AWS or GCP, follow their Ingress setup guides if an Ingress Controller is not already pre-installed. For AWS EKS Ingress configuration, see [Install Camunda 8 on an EKS cluster](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/eks-helm.md).

### Local setup example

An Ingress controller is also required for local Camunda 8 installation. The following example shows an Ingress controller configuration using the [ingress-nginx controller](https://kubernetes.github.io/ingress-nginx/deploy/#bare-metal-clusters/):

```yaml
# ingress_nginx_values.yml
controller:
  updateStrategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
  service:
    type: NodePort

  publishService:
    enabled: false
```

Install the [ingress-nginx controller](https://github.com/kubernetes/ingress-nginx) to your local cluster:

```shell
helm install -f ingress_nginx_values.yml \
    ingress-nginx ingress-nginx \
    --repo https://kubernetes.github.io/ingress-nginx \
    --version "4.9.0" \
    --namespace ingress-nginx \
    --create-namespace
```

If your local cluster exposes the Ingress controller on ports other than `80` and `443`, set the ports as described in [configure custom public ports](#configure-custom-public-ports).

### Configure the gRPC upstream

The Zeebe Gateway serves gRPC, so your Ingress controller must send HTTP/2 to the Orchestration Cluster. Each controller declares the gRPC upstream differently, and not on the same object:

| Ingress controller | Annotation                                           | Object                                    |
| ------------------ | ---------------------------------------------------- | ----------------------------------------- |
| Contour            | `projectcontour.io/upstream-protocol.h2c: "26500"`   | Orchestration Cluster `Service`           |
| Ingress-nginx      | `nginx.ingress.kubernetes.io/backend-protocol: GRPC` | Zeebe `Ingress` (added by the Helm chart) |

When the upstream itself uses TLS, use `projectcontour.io/upstream-protocol.h2` with Contour, and `nginx.ingress.kubernetes.io/backend-protocol: GRPCS` with Ingress-nginx. For other controllers, check their documentation for the equivalent.

With Contour, set the annotation on the Orchestration Cluster service:

```yaml
orchestration:
  service:
    annotations:
      projectcontour.io/upstream-protocol.h2c: "26500"
```

### Use an AWS Application Load Balancer

An AWS Application Load Balancer (ALB) terminates TLS at the load balancer with a certificate from AWS Certificate Manager (ACM). For its limits, see [Application Load Balancer](/self-managed/reference-architecture/kubernetes.md#application-load-balancer-alb).

1. Deploy the [AWS Load Balancer Controller](https://kubernetes-sigs.github.io/aws-load-balancer-controller/).
1. Set up a [certificate in AWS Certificate Manager](https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-request-public.html).
1. Set the `alb` class on every Ingress object the chart renders. The web application Ingress objects read `global.ingress`, and the Zeebe gRPC Ingress reads `orchestration.ingress.grpc`. Set `backend-protocol-version: GRPC` only on the Zeebe gRPC Ingress, as in the [AWS gRPC example](https://github.com/kubernetes-sigs/aws-load-balancer-controller/blob/main/docs/examples/grpc_server.md). On a web application Ingress, this annotation makes the ALB target groups use gRPC and breaks the HTTP applications.

   ```yaml
   global:
     compatibility:
       nginx:
         # Stop the chart from adding its default Ingress-nginx annotations.
         renderAnnotations: false
     ingress:
       className: alb
       annotations:
         alb.ingress.kubernetes.io/ssl-redirect: "443"
         alb.ingress.kubernetes.io/listen-ports: '[{"HTTP": 80}, {"HTTPS":443}]'
         alb.ingress.kubernetes.io/scheme: internet-facing
         alb.ingress.kubernetes.io/target-type: ip

   orchestration:
     ingress:
       grpc:
         className: alb
         annotations:
           alb.ingress.kubernetes.io/ssl-redirect: "443"
           alb.ingress.kubernetes.io/backend-protocol-version: GRPC
           alb.ingress.kubernetes.io/listen-ports: '[{"HTTP": 80}, {"HTTPS":443}]'
           alb.ingress.kubernetes.io/scheme: internet-facing
           alb.ingress.kubernetes.io/target-type: ip
   ```

The setup doesn't require [TLS on the Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/#tls). If the AWS Load Balancer Controller is correctly configured, it retrieves the certificate from ACM based on the host name.

### Use the GKE Ingress

With the [GKE Ingress](https://cloud.google.com/kubernetes-engine/docs/concepts/ingress) (Ingress-gce), you may need `cloud.google.com/app-protocols` annotations on the Zeebe Gateway service. For details, see the GKE guide [using HTTP/2 for load balancing with Ingress](https://cloud.google.com/kubernetes-engine/docs/how-to/ingress-http2).

## Troubleshooting

If Ingress is not working as expected, see [Camunda components troubleshooting](self-managed/operational-guides/troubleshooting.md).
