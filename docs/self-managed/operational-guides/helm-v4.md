---
id: helm-v4
title: "Helm v4"
sidebar_label: "Helm v4"
---

Understand Helm v4 behavior that can affect Camunda Helm chart installs and upgrades, and apply workarounds where needed.

Learn more about Helm v4 changes in the [Helm documentation](https://helm.sh/docs/overview/#whats-new).

## Camunda Helm chart compatibility

Helm CLI compatibility depends on the Camunda Helm chart version.

| Chart version             | Helm CLI v3 | Helm CLI v4 |
| ------------------------- | ----------- | ----------- |
| Camunda 8.6 – Chart 11.x  | ✅          | ❌          |
| Camunda 8.7 – Chart 12.x  | ✅          | ❌          |
| Camunda 8.8 – Chart 13.x  | ✅          | ❌          |
| Camunda 8.9 – Chart 14.x  | ✅          | ✅\*        |
| Camunda 8.10 – Chart 15.x | ❌          | ✅\*        |

\* Helm CLI v4 may require workarounds when overriding environment variables.

## Helm v4 breaking changes

### Server-side apply is enabled by default

Server-side apply is a Kubernetes feature that improves how changes to Kubernetes resources are merged. When multiple clients update the same resource, server-side apply reduces the risk of unintentional overwrites.

In Helm v4, server-side apply is enabled by default. This changes the behavior of `helm install` and `helm upgrade` compared to Helm v3.

#### Problem

Server-side apply has a known limitation: duplicate environment variables on the same Kubernetes resource are treated as an error, rather than later entries overwriting earlier ones.

In the Camunda Helm chart, environment variables are sometimes used as an override mechanism for values defined by the chart. For example, if the following is set in `values.yaml`:

```yaml
identity:
  env:
    - name: CAMUNDA_LICENSE_KEY
      value: "--- YOUR LICENSE KEY HERE ---"
```

The rendered Identity deployment may contain duplicate entries:

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

In Helm v4, this causes the install or upgrade to fail with an error similar to the following:

> Error: INSTALLATION FAILED: failed to create typed patch object (default/RELEASE-identity; apps/v1, Kind=Deployment):  
> .spec.template.spec.containers[name="identity"].env: duplicate entries for key [name="CAMUNDA_LICENSE_KEY"]

This behavior can affect any Camunda Helm chart component where environment variables are overridden using the `env` list.

#### Workarounds

If you encounter a duplicate environment variable error, apply one of the following workarounds:

1. Prefer dedicated `values.yaml` options over environment variable overrides whenever available.  
   For example, use `global.license` instead of setting `CAMUNDA_LICENSE_KEY` via the `env` section.

2. Override application configuration using the `configuration` or `extraConfiguration` options in `values.yaml` instead of environment variables.  
   See [Configure Helm chart components](../deployment/helm/configure/application-configs.md) for details.

3. Disable server-side apply when running Helm commands:

   ```bash
   helm install ... --server-side=false
   helm upgrade ... --server-side=false
   ```

4. Use Helm CLI v3 as a temporary workaround.

:::note Helm CLI v3 support timeline
Helm CLI v3 receives bug fixes until July 8, 2026, and security fixes until November 11, 2026.  
See the [Helm support policy](https://helm.sh/blog/helm-4-released#helm-v3-support).
:::

If your package manager no longer provides Helm CLI v3, you can run it using Docker:

```bash
docker run \
  -v ~/.kube:/root/.kube \
  alpine/helm:3.19.4 \
  install RELEASE camunda/camunda-platform \
  <other-helm-cli-options>
```

### The `--force` option is renamed to `--force-replace`

In Helm v4, the `--force` flag has been renamed to `--force-replace`.

If your workflows rely on `--force` during `helm upgrade`, update them to use `--force-replace`.  
The `--force` flag may still work with warnings, but it is deprecated.

### Post-renderers are now plugins

In Helm v4, post-renderers must be implemented as Helm plugins.

If you previously passed an executable path (for example, a shell script) using the `--post-renderer` option, you must migrate that logic into a Helm plugin.

See the Helm documentation for a [tutorial on building a post-renderer plugin](https://helm.sh/docs/plugins/developer/tutorial-postrenderer-plugin/).
