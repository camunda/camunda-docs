---
id: openshift-helm
title: "Camunda Helm charts"
---

The `camunda-platform` Helm chart can be deployed to OpenShift with a few modifications, primarily revolving around your desired security context constraints. You can find out more about this in our general [OpenShift deployment guide](./openshift.md).

## Compatibility

We test against the following OpenShift versions and guarantee compatibility with:

| OpenShift version | Supported          |
| ----------------- | ------------------ |
| 4.10.x            | :white_check_mark: |

Any version not explicitly marked in the table above is not tested, and we cannot guarantee compatibility.

## Quick start

Find a quick start guide in the [Helm chart repository](https://github.com/camunda/camunda-platform-helm/tree/main/openshift).

## Limitations

The `Elasticsearch`, `Keycloak`, and `Postgresql` charts all specify default non-root users for security purposes. To deploy these charts through the `camunda-platform` chart, these default values must be removed. Unfortunately, due to a [longstanding bug in Helm](https://github.com/helm/helm/issues/9136) affecting all Helm versions from 3.2.0 and greater, this makes the installation of the chart (when deploying any of these sub-charts) more complex.

Note that this is only an issue if you are deploying `Elasticsearch`, `Keycloak` (via `Identity`), or `Postgresql` (via `Keycloak`). If you are not deploying these, or not via the `camunda-platform` chart, or you are using [permissive SCC](./openshift.md#permissive-scc), this issue does not affect your deployment.

:::note
This also affects installations done through the OpenShift console, as it still uses Helm under the hood.
:::

## Configuration

As discussed in the [OpenShift deployment guide](./openshift.md), you need to configure the pod and container security contexts based on your desired security context constraints (SCC).

### Permissive SCC

To use permissive SCC, install the charts as they are. Follow the [general Helm deployment guide](./kubernetes-helm.md).

### Restrictive SCC

To use more restrictive SCC, configure the following minimum set of values for the various applications. The recommendations outlined in the general [OpenShift deployment guide](./openshift.md) are relevant here as well. As the Camunda Platform 8 applications do not define a pod or security context, follow these recommendations, or simply omit defining any.

If you are deploying with SCC where `RunAsUser` is `MustRunAsRange` (e.g. the default `restricted` SCC), and are deploying at least one of `Elasticsearch`, `Keycloak`, or `Postgresql`, it's necessary to unset the default security context of these charts. If this does not apply to you, you can stop here.

This depends on which Helm version you use: 3.1.3 and lower, or 3.2.0 and greater (i.e. one affected by [this bug](https://github.com/helm/helm/issues/9136)). Find out your Helm version by running the following:

```shell
$ helm version
version.BuildInfo{Version:"v3.9.0", GitCommit:"7ceeda6c585217a19a1131663d8cd1f7d641b2a7", GitTreeState:"clean", GoVersion:"go1.17.5"}
```

#### Helm 3.1.3 or lower

If you're running on Helm 3.0.0 up to 3.1.3, you need to add these values to your `values.yaml` file, or save them to a new file locally, e.g. `openshift.yaml`:

:::note
These values are also available in the [Helm chart repository](https://github.com/camunda/camunda-platform-helm/blob/main/openshift/values.yaml).
:::

```yaml
# omit this section if elasticsearch.enabled is false
elasticsearch:
  securityContext:
    runAsUser: null
  sysctlInitContainer:
    enabled: false
  podSecurityContext:
    fsGroup: null
    runAsUser: null

# omit this section if identity.enabled is false
identity:
  # omit this section if identity.keycloak.enabled is false
  keycloak:
    containerSecurityContext:
      runAsUser: null
    podSecurityContext:
      fsGroup: null
      runAsUser: null
    postgresql:
      # omit this section if identity.keycloak.postgresql.primary.enabled is false
      primary:
        containerSecurityContext:
          runAsUser: null
        podSecurityContext:
          fsGroup: null
          runAsUser: null
      # omit this section if identity.keycloak.postgresql.readReplicas.enabled is false
      readReplicas:
        containerSecurityContext:
          runAsUser: null
        podSecurityContext:
          fsGroup: null
          runAsUser: null
      # omit this section if identity.keycloak.postgresql.metrics.enabled is false
      metrics:
        containerSecurityContext:
          runAsUser: null
        podSecurityContext:
          fsGroup: null
          runAsUser: null
```

When installing the chart, run the following:

```shell
helm install <RELEASE NAME> camunda/camunda-platform --skip-crds -f openshift.yaml -f values.yaml
```

#### Helm 3.2.0 and greater

If you must deploy using Helm 3.2.0 or greater, you have two options. One is to use a SCC which defines the `RunAsUser` strategy to be at least `RunAsAny`. If that's not possible, then you need to make use of [a post-renderer](https://helm.sh/docs/topics/advanced/#post-rendering). This workaround is also described in detail in the [Helm chart repository](https://github.com/camunda/camunda-platform-helm/tree/main/openshift#using-a-post-renderer).

:::warning
If using a post-renderer, you **must** use the post-renderer whenever you are upgrading your release, not only during the initial installation. If you do not, the default values will be used again, which will prevent some services from starting.
:::

While you can use your preferred `post-renderer`, [we provide one](https://github.com/camunda/camunda-platform-helm/blob/main/openshift/patch.sh) which requires only `bash` and `sed` to be available locally:

```bash
#!/bin/bash -eu
# Expected usage is as an Helm post renderer.
# Example usage:
#   $ helm install my-release camunda/camunda-platform --post-renderer ./patch.sh
#
# This script is a Helm chart post-renderer for users on Helm 3.2.0 and greater. It allows removing default
# values set in sub-charts/dependencies, something which should be possible but is currently not working.
# See this issue for more: https://github.com/helm/helm/issues/9136
#
# The result of patching the rendered Helm templates is printed out to STDOUT. Any other logging from the
# script is thus sent to STDERR.
#
# Note to contributors: this post-renderer is used in the integration tests, so make sure that it can be used
# from any working directory.

set -o pipefail

# Perform two passes: once for single quotes, once for double quotes, as it's not specified that string values are
# always output with single or double quotes
sed -e "s/'@@null@@'/null/g" -e 's/"@@null@@"/null/g'
```

You also need to use a custom values file, where instead of using `null` as a value to unset default values, you use a special marker value which will be removed by the post-renderer.

Copy these values to your values file or save them as a separate file, e.g. `openshift.yaml`:

:::note
These values are also available in the [Helm chart repository](https://github.com/camunda/camunda-platform-helm/blob/main/openshift/values-patch.yaml).
:::

```yaml
# omit this section if elasticsearch.enabled is false
elasticsearch:
  securityContext:
    runAsUser: "@@null@@"
  sysctlInitContainer:
    enabled: false
  podSecurityContext:
    fsGroup: "@@null@@"
    runAsUser: "@@null@@"

# omit this section if identity.enabled is false
identity:
  # omit this section if identity.keycloak.enabled is false
  keycloak:
    containerSecurityContext:
      runAsUser: "@@null@@"
    podSecurityContext:
      fsGroup: "@@null@@"
      runAsUser: "@@null@@"
    postgresql:
      # omit this section if identity.keycloak.postgresql.primary.enabled is false
      primary:
        containerSecurityContext:
          runAsUser: "@@null@@"
        podSecurityContext:
          fsGroup: "@@null@@"
          runAsUser: "@@null@@"
      # omit this section if identity.keycloak.postgresql.readReplicas.enabled is false
      readReplicas:
        containerSecurityContext:
          runAsUser: "@@null@@"
        podSecurityContext:
          fsGroup: "@@null@@"
          runAsUser: "@@null@@"
      # omit this section if identity.keycloak.postgresql.metrics.enabled is false
      metrics:
        containerSecurityContext:
          runAsUser: "@@null@@"
        podSecurityContext:
          fsGroup: "@@null@@"
          runAsUser: "@@null@@"
```

Now, when installing the charts, you can do so by running the following:

```shell
helm install <RELEASE NAME> camunda/camunda-platform --skip-crds -f openshift.yaml -f values.yaml --post-renderer ./patch.sh
```
