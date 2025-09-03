---
id: add-extra-manifests
sidebar_label: Custom manifests
title: Helm chart custom Kubernetes manifests injection
description: "Learn how to add extra manifests to Helm deployments by injecting manifests in the values.yaml."
---

## Overview

When using the Camunda 8 [Helm chart](/self-managed/installation-methods/helm/install.md), data can be injected into the `values.yaml` file, enabling the addition of extra Kubernetes manifests. This feature is particularly useful for adding custom manifests by including additional Kubernetes resources such as ConfigMaps, Deployments, or Services.

## Usage

Extra manifests are defined within your `values.yaml` file using the following syntax:

```yaml
global:
  extraManifests:
    - |
      apiVersion: v1
      kind: ConfigMap
      metadata:
        name: example-cm-one
      data:
        test: test-one
    - |
      apiVersion: v1
      kind: ConfigMap
      metadata:
        name: example-cm-two
      data:
        test: test-two
```

For more information, see the Kubernetes [object documentation](https://kubernetes.io/docs/concepts/overview/working-with-objects/).

## Manipulate manifests

The Camunda Helm chart is highly customizable and can be deployed in different setups. However, in some cases, you may need to adjust the rendered Kubernetes manifests directly (for example, when a feature is not supported in the chart template).

In those cases, [Helm Post Rendering](https://helm.sh/docs/topics/advanced/#post-rendering) lets you manipulate, configure, or validate rendered manifests before Helm installs them. Post rendering is a good way to quickly add missing features to the chart. You can also raise a feature request for your use case.

## Best practices

- **Keep it simple**: Use clear and concise YAML syntax to avoid complexity.
- **Use comments**: Include comments in your YAML file to explain the purpose of each manifest.
- **Test thoroughly**: Ensure that all added manifests are correctly formatted and functional before deployment.

## Troubleshooting

- **Syntax errors**: Check for indentation issues or missing colons in key-value pairs.
- **Manifest validation**: Verify that each manifest is valid and correctly formatted according to Kubernetes specifications.
