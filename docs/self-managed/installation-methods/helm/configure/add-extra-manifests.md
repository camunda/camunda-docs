---
id: add-extra-manifests
sidebar_label: Custom manifests
title: Add custom Kubernetes manifests in Helm charts
description: Learn how to add extra Kubernetes manifests to Helm deployments by defining them in the values.yaml file.
---

Add extra Kubernetes manifests to the Camunda 8 [Helm chart](/self-managed/installation-methods/helm/install.md) by defining them in the `values.yaml` file. Use this to include resources such as ConfigMaps, Deployments, or Services.

## Configuration

Define extra manifests in your `values.yaml` file under `global.extraManifests`. The key accepts a list of Kubernetes manifests.

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

### Manipulate manifests

If you need to adjust rendered manifests directly (for example, when the chart template does not support a feature), use [Helm Post Rendering](https://helm.sh/docs/topics/advanced/#post-rendering). Post rendering lets you manipulate, configure, or validate manifests before Helm installs them.

Use post rendering for quick workarounds, but also consider raising a feature request for your use case.

## Best practices

- **Keep it simple**: Use clear and concise YAML syntax to avoid complexity.
- **Use comments**: Include comments in your YAML file to explain the purpose of each manifest.
- **Test thoroughly**: Ensure that all added manifests are correctly formatted and functional before deployment.

## Troubleshooting

- **Syntax errors**: Check for syntax errors such as indentation issues or missing colons in key-value pairs.
- **Manifest validation**: Verify that each manifest is valid and correctly formatted according to Kubernetes specifications.
