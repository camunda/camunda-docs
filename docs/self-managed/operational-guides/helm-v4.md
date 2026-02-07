---
id: helm-v4
title: "Helm v4"
sidebar_label: "Helm v4"
---

Understand Helm v4 behavior that can affect Camunda Helm chart installs and upgrades, and apply workarounds where needed.

Learn more about Helm v4 changes in the [Helm docs](https://helm.sh/docs/overview/#whats-new)

## Camunda Helm chart compatibility

The Camunda Helm chart is compatible with Helm CLI v3 and Helm CLI v4. In Helm v4, you may hit installation or upgrade errors if your `values.yaml` adds environment variables that duplicate environment variables already defined by the chart.

If you hit this issue, upgrade to a newer chart patch version (where available) and apply the workarounds outlined below.

| Chart version            | Helm CLI v3 | Helm CLI v4                 |
| ------------------------ | ----------- | --------------------------- |
| Camunda 8.6 - Chart 11.x | ✅          | ✅ (with workarounds below) |
| Camunda 8.7 - Chart 12.x | ✅          | ✅ (with workarounds below) |
| Camunda 8.8 - Chart 13.x | ✅          | ✅ (with workarounds below) |
| Camunda 8.9 - Chart 14.x | ✅          | ✅ (with workarounds below) |

## Helm CLI breaking changes

### Server-side apply is enabled by default

Server-side apply is a Kubernetes feature that improves how changes to Kubernetes resources are merged. In general, this means when multiple users run `kubectl edit` or `kubectl apply` on the same resource, changes are more likely to merge instead of overwriting or causing conflicts.

In Helm v4, server-side apply is enabled by default. This can impact `helm install` and `helm upgrade` behavior.

#### Problem

Server-side apply has a known limitation where duplicate environment variables on the same resource are treated as an error, rather than later entries overwriting earlier ones.

In the Camunda Helm chart, it’s common to set environment variables as an override mechanism for environment variables that the chart sets by default. For example, if the following is set in `values.yaml`:

```yaml
identity:
  env:
    - name: CAMUNDA_LICENSE_KEY
      value: "--- YOUR LICENSE KEY HERE ---"
```

Then the rendered Identity Deployment can have duplicate entries:

```yaml
spec:
  containers:
    - name: identity
      env:
        - name: CAMUNDA_LICENSE_KEY
          value: "--- CAMUNDA_DEFAULT_VALUE ---"
        - name: CAMUNDA_LICENSE_KEY
          value: "--- YOUR LICENSE KEY HERE ---"
```

A `helm install` can then fail with an error similar to the following:

> Error: INSTALLATION FAILED: failed to create typed patch object (default/RELEASE-identity; apps/v1, Kind=Deployment): .spec.template.spec.containers[name="identity"].env: duplicate entries for key [name="CAMUNDA_LICENSE_KEY"]

#### Workarounds

If you hit a duplicate environment variable error, use one of the following workarounds:

1. Leverage `values.yaml` overrides outside of the `env` section wherever possible. For example, in the preceding example, use the `global.license` options in `values.yaml` instead.
2. Override `application.yaml` configuration using the `configuration` and `extraConfiguration` options in `values.yaml` instead of using environment variables. See [Configure Helm chart components](../deployment/helm/configure/application-configs.md) for more details.
3. Disable server-side apply by setting `--server-side=false` in the `helm install` or `helm upgrade` commands.
4. Use Helm v3. Helm v3 will stop receiving bugfix updates on July 8, 2026, and will no longer receive security updates after November 11, 2026. See the [Helm support policy](https://helm.sh/blog/helm-4-released#helm-v3-support).

If you can’t install a binary for Helm v3 due to a package manager only supporting Helm v4, you can use the following Docker command:

```bash
docker run \
  -v ~/.kube:/root/.kube \
  alpine/helm:3.19 \
  install RELEASE camunda/camunda-platform \
  <other-helm-cli-options> \
  ...
```

### The `--force` option is renamed to `--force-replace`

If you rely on `--force` during `helm upgrade`, use `--force-replace` instead.

### Post-renderers are now plugins

If you were using a bash script as a post-renderer, you must convert it into a Helm plugin. See the Helm documentation for a [tutorial on building a postrenderer plugin](https://helm.sh/docs/plugins/developer/tutorial-postrenderer-plugin/).
