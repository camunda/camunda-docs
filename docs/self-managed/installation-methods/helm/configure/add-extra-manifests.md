---
id: add-extra-manifests
sidebar_label: Custom manifests
title: Helm chart custom Kubernetes manifests injection
description: "Learn how to add extra manifests to Helm deployments by injecting arbitrary data in the values.yaml."
---

## Overview

When using the Camunda 8 [Helm chart](/self-managed/installation-methods/helm/install.md), arbitrary data can be injected into the `values.yaml` file, enabling the addition of extra Kubernetes manifests. This feature is particularly useful for adding custom manifests by including additional Kubernetes resources such as ConfigMaps, Deployments, or Services.

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

## Best practices

- **Keep it simple**: Use clear and concise YAML syntax to avoid complexity.
- **Use comments**: Include comments in your YAML file to explain the purpose of each manifest.
- **Test thoroughly**: Ensure that all added manifests are correctly formatted and functional before deployment.

## Troubleshooting

- **Syntax errors**: Check for indentation issues or missing colons in key-value pairs.
- **Manifest validation**: Verify that each manifest is valid and correctly formatted according to Kubernetes specifications.
