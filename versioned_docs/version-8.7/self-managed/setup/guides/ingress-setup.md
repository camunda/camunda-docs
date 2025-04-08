---
id: ingress-setup
title: "Combined and separated Ingress setup"
description: "Camunda 8 Self-Managed combined and separated Ingress setup"
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

:::caution
The separated Ingress configuration has been deprecated in version 8.6. To ensure a smooth upgrade experience for new installations, we recommend using the **combined Ingress setup**.
:::

Camunda 8 Self-Managed has multiple web applications and gRPC services. Both can be accessed externally using Ingress. There are two ways to do this:

1. **Combined setup:** In this setup, there are two Ingress objects: one Ingress object for all Camunda 8 web applications using a single domain. Each application has a sub-path e.g. `camunda.example.com/operate`, and `camunda.example.com/optimize` and another Ingress which uses gRPC protocol for the Zeebe Gateway e.g. `zeebe.camunda.example.com`.
2. **Separated setup:** In this setup, each component has its own Ingress/host e.g. `operate.camunda.example.com`, `optimize.camunda.example.com`, `zeebe.camunda.example.com`, etc.

There are no significant differences between the two setups. Rather, they both offer flexibility for different workflows.

:::note
Camunda 8 Helm chart doesn't manage or deploy Ingress controllers, it only deploys Ingress resources. Hence, this Ingress setup will not work without an Ingress controller running in your cluster.
:::

## Preparation

- An Ingress controller should be deployed in advance. The examples below use the [ingress-nginx controller](https://github.com/kubernetes/ingress-nginx), but any Ingress controller could be used by setting `ingress.className`.
- TLS configuration is not handled in the examples because it varies between different workflows. It could be configured directly using `ingress.tls` options or via an external tool like [Cert-Manager](https://github.com/cert-manager/cert-manager) using `ingress.annotations`. For more details, check available [configuration options](https://artifacthub.io/packages/helm/camunda/camunda-platform#configuration).

## Configuration

<Tabs groupId="ingress" defaultValue="combined" queryString values={
[
{label: 'Combined Ingress', value: 'combined', },
{label: 'Separated Ingress', value: 'separated', },
]
}>

<TabItem value='combined'>

In this setup, a single Ingress/domain is used to access Camunda 8 web applications, and another for Zeebe Gateway. By default, all web applications use `/` as a base, so we just need to set the context path, Ingress configuration, and authentication redirect URLs.

![Camunda 8 Self-Managed Architecture Diagram - Combined Ingress](../../assets/camunda-platform-8-self-managed-architecture-diagram-combined-ingress.png)

:::note
**Operate, Tasklist, Optimize, Modeler, Connectors, Console:** The Ingress path value for each component (`global.identity.auth.<component>.redirectUrl`) should match the `contextPath` for that component.
:::

```yaml
# Chart values for the Camunda 8 Helm chart in combined Ingress setup.

# This file deliberately contains only the values that differ from the defaults.
# For changes and documentation, use your favorite diff tool to compare it with:
# https://artifacthub.io/packages/helm/camunda/camunda-platform

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
      console:
        redirectUrl: "https://camunda.example.com/console"

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

console:
  contextPath: "/console"

connectors:
  contextPath: "/connectors"

zeebeGateway:
  contextPath: "/zeebe"
  ingress:
    grpc:
      enabled: true
      className: nginx
      host: "zeebe.camunda.example.com"
```

:::note Web Modeler
The configuration above only contains the Ingress-related values under `webModeler`. Note the additional [installation instructions and configuration hints](/self-managed/setup/install.md#installing-web-modeler).
:::

:::note Console
The configuration above only contains the Ingress-related values under `Console`. Review the additional [installation instructions and configuration hints](/self-managed/setup/install.md#install-console).
:::

Incorporate the custom values mentioned in the example above into the value file you're using to deploy Camunda as outlined in [deploying Camunda 8](/self-managed/setup/install.md):

```shell
helm install demo camunda/camunda-platform -f values-combined-ingress.yaml
```

Once deployed, you can access the Camunda 8 components on:

- **Applications:** `https://camunda.example.com/[identity|operate|optimize|tasklist|modeler|console|zeebe]`
  - _Note_: Web Modeler also exposes a WebSocket endpoint on `https://camunda.example.com/modeler-ws`. This is only used by the application itself and not supposed to be accessed by users directly.
- **Keycloak authentication:** `https://camunda.example.com/auth`
- **Zeebe Gateway:** `grpc://zeebe.camunda.example.com`

</TabItem>

<TabItem value='separated'>

In this configuration, every Camunda 8 component is assigned its own Ingress and Domain. The use of a context path is unnecessary because the default base path `/` is used for each Ingress/Domain. In this setup, you only need to provide the Ingress settings and specify the Identity authentication redirect URLs.

![Camunda 8 Self-Managed Architecture Diagram - Separated Ingress](../../assets/camunda-platform-8-self-managed-architecture-diagram-separated-ingress.png)

```yaml
# Chart values for the Camunda 8 Helm chart in combined Ingress setup.

# This file deliberately contains only the values that differ from the defaults.
# For changes and documentation, use your favorite diff tool to compare it with:
# https://artifacthub.io/packages/helm/camunda/camunda-platform

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
      console:
        redirectUrl: "https://console.camunda.example.com"
      connectors:
        redirectUrl: "https://connectors.camunda.example.com"

identity:
  ingress:
    enabled: true
    className: nginx
    host: "identity.camunda.example.com"
  fullURL: "https://identity.camunda.example.com"

identityKeycloak:
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

zeebeGateway:
  ingress:
    rest:
      enabled: true
      className: nginx
      host: "zeebe.camunda.example.com"
    grpc:
      enabled: true
      className: nginx
      host: "zeebe-grpc.camunda.example.com"

webModeler:
  ingress:
    enabled: true
    className: nginx
    webapp:
      host: "modeler.camunda.example.com"
    websockets:
      host: "modeler-ws.camunda.example.com"

console:
  ingress:
    enabled: true
    className: nginx
    host: "console.camunda.example.com"

connectors:
  ingress:
    enabled: true
    className: nginx
    host: "connectors.camunda.example.com"
```

:::note Web Modeler
The configuration above only contains the Ingress-related values under `webModeler`. Review the additional [installation instructions and configuration hints](/self-managed/setup/install.md#installing-web-modeler).
:::

Incorporate the custom values mentioned in the example above into the value file you're using to deploy Camunda as outlined in [deploying Camunda 8](/self-managed/setup/install.md):

```shell
helm install demo camunda/camunda-platform -f values-separated-ingress.yaml
```

Once deployed, you can access the Camunda 8 components on:

- **Applications:** `https://[identity|operate|optimize|tasklist|modeler|console|zeebe].camunda.example.com`
- **Keycloak authentication:** `https://keycloak.camunda.example.com`
- **Zeebe Gateway:** `grpc://zeebe-grpc.camunda.example.com`

</TabItem>

</Tabs>

## Ingress controllers

Ingress resources require the cluster to have an [Ingress Controller](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/) running. There are many options for configuring your Ingress Controller. If you are using a cloud provider such as AWS or GCP, follow their Ingress setup guides if an Ingress Controller is not already pre-installed. Ingress configuration for AWS EKS can be found in [install Camunda 8 on an EKS cluster](/self-managed/setup/deploy/amazon/amazon-eks/eks-helm.md).

### Example local configuration

An Ingress controller is also required when working on a local Camunda 8 installation. Take a look at an Ingress controller configuration using the [ingress-nginx controller](https://kubernetes.github.io/ingress-nginx/deploy/#bare-metal-clusters/):

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

To install this [ingress-nginx controller](https://github.com/kubernetes/ingress-nginx) to your local cluster, execute the following command:

```shell
helm install -f ingress_nginx_values.yml \
    ingress-nginx ingress-nginx \
    --repo https://kubernetes.github.io/ingress-nginx \
    --version "4.9.0" \
    --namespace ingress-nginx \
    --create-namespace
```

## Troubleshooting

If something is not working as expected, check the guide for [general deployment troubleshooting](/self-managed/operational-guides/troubleshooting/troubleshooting.md).
