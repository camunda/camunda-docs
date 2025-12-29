---
id: helm-v4
title: "Helm v4"
sidebar_label: "Helm v4"
---

# Helm v4

## Overview

Helm v4 is the latest major release of Helm which comes with a few minor breaking changes. This page outlines those changes and offers mitigations to help.

Learn more about other Helm v4 changes [here](https://helm.sh/docs/overview/#whats-new)

## Breaking Changes

### Server-side apply is now enabled by default

Server-side apply is a kubernetes feature that improves the way resources are merged. In general, this means that whenever multiple users do a `kubectl edit` or `kubectl apply` on a particular resource, the diffs are more likely to be merged instead of one user's changes overwriting another's or a conflict error being thrown. Enabling this by default in Helm v4 means that multiple users may be capable of running `helm upgrade` to make minor changes to the same Helm release.

#### Problem

Server-side apply has a known limitation where multiple environment variables on the same resource gets treated as an error rather than latter entries overwriting earlier ones. In the Camunda Helm chart, it's pretty common to want to set environment variables as an override mechanism for environment variables that the Helm chart sets by default. For example if the following is set in `values.yaml`: 

```yaml
identity:
  env:
    - name: CAMUNDA_LICENSE_KEY
      value: "--- YOUR LICENSE KEY HERE ---"
```

then the rendered identity deployment will have:

```
spec:
  containers:
    - name: identity
      env:
        - name: CAMUNDA_LICENSE_KEY
          value: "--- CAMUNDA_DEFAULT_VALUE ---"
        - name: CAMUNDA_LICENSE_KEY
          value: "--- YOUR LICENSE KEY HERE ---"
```

and a `helm install` will result in the following error:


> Error: INSTALLATION FAILED: failed to create typed patch object (default/RELEASE-identity; apps/v1, Kind=Deployment): .spec.template.spec.containers[name="identity"].env: duplicate entries for key [name="CAMUNDA_LICENSE_KEY"]


#### Mitigations

To mitigate this issue, you can either:

1. Leverage values.yaml overrides outside of the env section wherever possible. For example, in the above example, we have the `global.license` options in `values.yaml` that can be used instead.
2. Override `application.yaml` configuration via the `configuration` and `extraConfiguration` options in `values.yaml` instead of using environment variables.
3. Disable server-side apply by setting `--server-side=false` in the `helm install` or `helm upgrade` command.
4. Use Helm v3. However, note that Helm v3 will stop receiving bugfix updates on July 8th 2026, and will no longer receive security updates after November 11th 2026. [Helm support policy](https://helm.sh/blog/helm-4-released#helm-v3-support).

If you cannot install a binary for Helm v3 due to a package manager only supporting Helm v4, you can use the following Docker command:

```bash
docker run \
  -v ~/.kube:/root/.kube \
  alpine/helm:3.19 \
  install RELEASE camunda/camunda-platform \
  <other-helm-options> \
  ...
```

