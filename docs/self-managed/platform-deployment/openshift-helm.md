---
id: openshift-helm
title: "Camunda Helm charts"
---

The `camunda-platform` Helm chart can be deployed to Openshift with a few modifications, primarily revolving around your desired security context constraints. You can find out more about this in our general [OpenShift deployment guide](./openshift.md).

## Compatibility

We test against the following Openshift versions, and guarantee compatibility with:

| Openshift Version | Supported          |
| ----------------- | ------------------ |
| 4.10.x            | :white_check_mark: |

Any version not explicitly marked in the table above is not tested, and we cannot guarantee compatibility.

## Quick start

You can find a quick start guide in the [Helm chart repository itself](https://github.com/camunda/camunda-platform-helm/tree/main/openshift).

## Limitations

The `Elasticsearch`, `Keycloak`, and `Postgresql` charts all specify default non-root users for security purposes. In order to deploy these charts through the `camunda-platform` chart, these default values must be removed. Unfortunately, due to a [longstanding bug in Helm](https://github.com/helm/helm/issues/9136) that affects all Helm versions from 3.2.0 and greater, this makes the installation of the chart (when deploying any of these sub-charts) more complex. Note that this is only an issue if you are deploying `Elasticsearch`, `Keycloak` (via `Identity`), or `Postgresql` (via `Keycloak`). If you are not deploying these, or not via the `camunda-platform` chart, or you are using a [permissive SCC](./openshift.md#permissive-scc).

:::note
This also affects installations done through the OpenShift console, as it still uses Helm under the hood.
:::

## Configuration

As discussed in the [OpenShift deployment guide](./openshift.md), you will need to configure the pod and container security contexts based on your desired security context constraint (aka SCC).

### Permissive SCC

If you wish to use a permissive SCC, then you can install the charts as they are. Simply follow the [general Helm deployment guide](./kubernetes-helm.md).

### Restrictive SCC

If you wish to use more a restrictive SCC, then you will need to configure the following minimum set of values for the various applications. The recommendations outlined in the general [OpenShift deployment guide](./openshift.md) hold here as well. As the Camunda 8 applications do not define a pod or security context, follow these recommendations, or simply omit defining any.

If you are deploying with a SCC where `RunAsUser` is `MustRunAsRange` (e.g. the default `restricted` SCC), and are deploying at least one of `Elasticsearch`, `Keycloak`, or `Postgresql`, then we will need to unset the default security context of these charts. If this does not apply to you, then you can stop here.

How we will do this depends on which Helm version you use: 3.1.3 and lower, or 3.2.0 and greater (i.e. one affected by [this bug](https://github.com/helm/helm/issues/9136)). You can find out your Helm version by running the following:

```shell
$ helm version
version.BuildInfo{Version:"v3.9.0", GitCommit:"7ceeda6c585217a19a1131663d8cd1f7d641b2a7", GitTreeState:"clean", GoVersion:"go1.17.5"}
```

#### Helm 3.1.3 or lower

If you're running on Helm 3.0.0 up to 3.1.3, then you will need to add these values to your `values.yaml` file, or save them to a new file locally, e.g. `openshift.yaml`:

:::note
[These values are also available from the Helm chart repository](https://github.com/camunda/camunda-platform-helm/blob/main/openshift/values.yaml):
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

Then when installing the chart, simply run:

```shell
helm install <RELEASE NAME> camunda/camunda-platform --skip-crds -f openshift.yaml -f values.yaml
```

#### Helm 3.2.0 and greater

If you must deploy using Helm 3.2.0 or greater, then you have two options. One is to use a SCC which defines the `RunAsUser` strategy to be at least `RunAsAny`. If that's not possible, then you will need to make use of [a post-renderer](https://helm.sh/docs/topics/advanced/#post-rendering). This workaround is also described in detail in the [Helm chart repository itself](https://github.com/camunda/camunda-platform-helm/tree/main/openshift#using-a-post-renderer).

:::warning
If using a post-renderer, you **must** use the post-renderer whenever you are upgrading your release, not only during the initial installation. If you do not, then the default values will be used again, which will prevent some services from starting.
:::

While you can use your preferred `post-renderer`, we provide [a simple one](https://github.com/camunda/camunda-platform-helm/blob/main/openshift/patch.sh) which requires only `bash` and `sed` to be available locally:

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

We will also need to use a custom values file where instead of using `null` as a value to unset default values, we will use a special marker value which will be removed by the post-renderer.

Copy these values to your values file, or better, save them as a separate file, e.g. `openshift.yaml`:

:::note
[These values are also available from the Helm chart repository](https://github.com/camunda/camunda-platform-helm/blob/main/openshift/values-patch.yaml)
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

Now, when installing the charts, you can do so running:

```shell
helm install <RELEASE NAME> camunda/camunda-platform --skip-crds -f openshift.yaml -f values.yaml --post-renderer ./patch.sh
```
