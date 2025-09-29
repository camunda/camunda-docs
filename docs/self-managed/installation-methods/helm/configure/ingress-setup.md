---
id: ingress-setup
sidebar_label: With Ingress
title: Configure Helm charts with Ingress
description: Set up and configure Ingress for Camunda 8 Self-Managed Helm deployments.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

:::caution
The separate Ingress configuration was removed in Camunda 8.8. Use the combined Ingress setup in this guide.
:::

Camunda 8 Self-Managed has multiple web applications and gRPC services. You can expose them externally with a combined Ingress setup.

## Prerequisites

- An Ingress controller deployed in advance. The examples below use the [ingress-nginx controller](https://github.com/kubernetes/ingress-nginx), but you can use any Ingress controller by setting `ingress.className`.
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

Incorporate these custom values into the values file you use to deploy Camunda (see [Install Camunda with Helm](/self-managed/installation-methods/helm/install.md)):

```shell
helm install camunda camunda/camunda-platform --version $HELM_CHART_VERSION -f values-combined-ingress.yaml
```

After deployment, access the Camunda 8 components at:

- **Applications:** `https://camunda.example.com/[identity|operate|optimize|tasklist|modeler|console|zeebe]`
- **Web Modeler WebSocket:** Web Modeler exposes a WebSocket endpoint on `https://camunda.example.com/modeler-ws`. This is only used internally by the application and not for direct user access.
- **Keycloak authentication:** `https://camunda.example.com/auth`
- **Zeebe Gateway:** `grpc://zeebe.camunda.example.com`

:::note
This configuration shows only the Ingress-related values for `webModeler`and `Console`. For full setup, see [Enable Web Modeler, Console, and Connectors](/self-managed/installation-methods/helm/configure/web-modeler-console-connectors.md).
:::

## Ingress controllers

Ingress resources require the cluster to have a running [Ingress Controller](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/). There are many options for configuring your Ingress Controller. If you use a cloud provider such as AWS or GCP, follow their Ingress setup guides if an Ingress Controller is not already pre-installed. For AWS EKS Ingress configuration, see [Install Camunda 8 on an EKS cluster](/self-managed/installation-methods/helm/cloud-providers/amazon/amazon-eks/eks-helm.md).

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

## Troubleshooting

If Ingress is not working as expected, see [Camunda components troubleshooting](self-managed/operational-guides/troubleshooting.md).
