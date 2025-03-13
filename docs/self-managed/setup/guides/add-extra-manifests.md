---
id: add-extra-manifests
title: "Add Extra Manifests"
description: "The ability to add extra manifests by injecting arbitrary data in the values.yaml"
---

## Overview

This feature allows users to inject arbitrary data into their `values.yaml` file, enabling the addition of extra manifests. This feature is particularly useful for adding custom manifests by including additional Kubernetes resources such as ConfigMaps, Deployments, or Services.

## Usage

To use this feature, you can add extra manifests within your `values.yaml` file like so:

```yaml
global:
  extraManifests:
    - |
      apiVersion: v1
      kind: ConfigMap
      metadata:
        name: example-cm
      data:
        test: test
```

## Best Practices

- **Keep it Simple**: Use clear and concise YAML syntax to avoid complexity.
- **Use Comments**: Include comments in your YAML file to explain the purpose of each manifest.
- **Test Thoroughly**: Ensure that all added manifests are correctly formatted and functional before deployment.

## Troubleshooting

- **Syntax Errors**: Check for indentation issues or missing colons in key-value pairs.
- **Manifest Validation**: Verify that each manifest is valid and correctly formatted according to Kubernetes specifications.
