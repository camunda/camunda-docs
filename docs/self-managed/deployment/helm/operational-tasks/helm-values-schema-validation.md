---
id: helm-values-schema-validation
title: "Helm values schema validation"
sidebar_label: "Helm values schema validation"
description: "Learn how Helm checks values against the Camunda 8 chart schema, how to bypass the check, and which deployment tools support the bypass."
---

The Camunda 8 Helm chart includes a `values.schema.json` file. Helm compares your values to this schema before it renders the chart templates. A value that does not match the schema stops the command.

This page explains how the validation works, how to bypass it, and which deployment tools support the bypass.

## How the validation works

- Helm checks the merged values against `values.schema.json` before it renders templates.
- A schema error stops `helm install`, `helm upgrade`, `helm template`, and `helm lint`.
- Helm has no warn-only mode. Each schema error is a hard failure.
- The chart documentation links and descriptions do not appear in Helm errors.
- The chart schema closes some objects. A closed object rejects any key that the schema does not list.

For example, an unknown key at the top level of your values causes this error:

| Helm version            | Error text                                         |
| ----------------------- | -------------------------------------------------- |
| 3.10 to 3.19            | `- (root): Additional property unk is not allowed` |
| 3.20 and later, and 4.x | `- at '': additional properties 'unk' not allowed` |

## Fix the values first

Fix the values that the error names. This is the recommended action. The bypass removes a safety check.

To find problems before you run Helm, use the `validate` command of the [Camunda Helm Toolkit](/self-managed/deployment/helm/operational-tasks/camunda-helm-toolkit.md#validate-override-files). The toolkit page lists its exit codes.

:::warning
Do not remove `orchestration.fullnameOverride` to fix a schema error. This change renames the StatefulSet. The brokers then start on new, empty volumes.
:::

## Bypass the validation {#bypass-the-validation}

Add the `--skip-schema-validation` flag to `helm install`, `helm upgrade`, `helm template`, or `helm lint`:

```bash
helm upgrade --install camunda camunda/camunda-platform \
  --values values.yaml \
  --skip-schema-validation
```

Keep these limits in mind:

- You need Helm 3.16.0 or later. Helm 3.15 returns `Error: unknown flag: --skip-schema-validation`.
- The flag turns off all schema checks, including type checks. It does not only allow unknown keys.
- Camunda has not decided to turn on strict validation by default. This page describes the current behavior.

## Check support in your deployment tool

Camunda tested these tools on a kind cluster with a test chart that has a strict schema.

| Tool                       | Bypass possible      | Setting                                                                                            | Tested version | Added in                          |
| -------------------------- | -------------------- | -------------------------------------------------------------------------------------------------- | -------------- | --------------------------------- |
| Helm                       | Yes                  | `--skip-schema-validation`                                                                         | 3.16.0         | 3.16.0                            |
| helm-diff                  | Yes                  | `--skip-schema-validation`                                                                         | 3.15.15        | 3.9.12                            |
| Helmfile                   | Yes                  | `skipSchemaValidation: true` for a release, or in `helmDefaults`                                   | 1.8.1          | 0.169.2 (host Helm 3.16 or later) |
| Argo CD                    | Yes                  | `spec.source.helm.skipSchemaValidation: true`                                                      | 3.5.4          | 2.14.0                            |
| Flux helm-controller       | Yes                  | `spec.install.disableSchemaValidation` and `spec.upgrade.disableSchemaValidation`                  | 1.6.5          | 1.1.0 (Flux 2.4.0)                |
| Terraform `hashicorp/helm` | No                   | No option. Terraform returns `Unsupported argument`.                                               | 3.3.0          | Not applicable                    |
| Kustomize `helmCharts`     | No                   | No option.                                                                                         | 5.8.1          | Not applicable                    |
| Pulumi Kubernetes          | No documented option | Not tested. See [pulumi-kubernetes#4635](https://github.com/pulumi/pulumi-kubernetes/issues/4635). | Not tested     | Not applicable                    |

For Terraform, a workaround is to use a local copy of the chart without `values.schema.json`. This workaround removes all schema checks.

For more information, see these upstream references:

- [helm/helm#12743](https://github.com/helm/helm/pull/12743)
- [terraform-provider-helm#1609](https://github.com/hashicorp/terraform-provider-helm/issues/1609)
- [Argo CD Helm documentation](https://argo-cd.readthedocs.io/en/stable/user-guide/helm/)
- [Flux HelmRelease documentation](https://fluxcd.io/flux/components/helm/helmreleases/)

## Known issues

### Parent charts and `global` values

Helm passes the `global` values of a parent chart to each subchart. If a subchart schema closes its `global` object, Helm rejects the keys that the subchart does not list. The Camunda chart keeps its `global` object open, so this issue does not apply to the Camunda chart schema.

## Choose a Helm version

Helm 3 bug fixes ended on September 9, 2026. Helm 3 security fixes end on February 10, 2027. For more information, see the [Helm 3 end of life announcement](https://helm.sh/blog/helm-v3-end-of-life).

- If you need the bypass, use Helm 3.16.0 or later.
- Camunda recommends Helm 4. See [Helm 4](/self-managed/deployment/helm/operational-tasks/helm-v4.md).
