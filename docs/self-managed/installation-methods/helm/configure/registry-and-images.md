---
id: registry-and-images
sidebar_label: Registry and images
title: Configure registry and images
description: Configure image sources for the Camunda Helm chart, including enterprise images and pull secrets.
---

Use this page to configure image sources for the Camunda Helm chart. By default, the chart uses Bitnami open-source images, but for production you can switch to vendor-supported enterprise images. This page explains how to create registry secrets and install Camunda with enterprise images.

### Install with vendor enterprise images

By default, the Camunda Helm chart uses [open-source images provided by Bitnami](https://github.com/bitnami/containers). For production environments, Camunda recommends using vendor enterprise images. These images are hardened, patched, and supported versions of the open-source images.

Enterprise images:

- Are built on the Bitnami open-source stack
- Include critical CVE patches and security hardening
- Come with extended vendor support
- Are hosted in a private registry: `registry.camunda.cloud`
- Are available only to Camunda customers

#### Create a Kubernetes registry secret

To access the private registry, create a Kubernetes `docker-registry` secret using your Camunda Enterprise credentials:

```shell
kubectl create secret docker-registry registry-camunda-cloud \
  --docker-server=registry.camunda.cloud \
  --docker-username=<your-username> \
  --docker-password=<your-password> \
  --docker-email=unused@example.com
```

Replace `<your-username>` and `<your-password>` with your LDAP credentials.

For details, see [Specifying `imagePullSecrets` on a Pod](https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod).

#### Install the Helm chart with enterprise images

Camunda provides a `values-enterprise.yaml` file that overrides the default Bitnami image registry and tags to use enterprise images.

:::note Vendor pull secret

This file includes a reference to the `commonVendorPullSecrets` parameter, which defines the pull secret required to access the private registry.

`commonVendorPullSecrets` is required because `global.image.pullSecrets` does not apply to vendor charts.

:::

By default, the secret name is `registry-camunda-cloud`. You can override this using the `--set` flag, a custom `values-enterprise.yaml` file, or another [Helm value override mechanism](https://helm.sh/docs/chart_template_guide/values_files/#using-helm-install--f).

Run the following command to install Camunda with enterprise images and your registry secret:

```shell
helm install camunda camunda/camunda-platform --version $HELM_CHART_VERSION \
  --values https://raw.githubusercontent.com/camunda/camunda-platform-helm/main/charts/camunda-platform-8.8/values.yaml \
  --values https://raw.githubusercontent.com/camunda/camunda-platform-helm/main/charts/camunda-platform-8.8/values-enterprise.yaml
```

This deploys Camunda with vendor-supported enterprise images, recommended for secure and stable production environments.
