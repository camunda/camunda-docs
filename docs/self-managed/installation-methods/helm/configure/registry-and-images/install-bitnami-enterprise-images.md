---
id: install-bitnami-enterprise-images
sidebar_label: Bitnami enterprise images
title: Install Bitnami enterprise images
description: Configure the Camunda Helm chart to use vendor-supported enterprise images, understand CVE reporting, and set expectations on vulnerabilities.
---

By default, the Camunda Helm chart uses Bitnami open-source images.

:::info
**Important change since Camunda 8.8:**  
In earlier versions, users sometimes relied on Bitnami subcharts in production. Starting with 8.8, these subcharts are intended primarily for development and testing, unless your operational teams have expertise with Bitnami charts production deployments.

If you have previously used Bitnami subcharts in production with earlier Camunda versions, please review the implications for your existing setup. Refer to [Changes to Camunda Helm Sub-Charts](https://camunda.com/blog/2025/08/changes-to-camunda-helm-sub-charts-what-you-need-to-know/) for more details.

For production environments, we advise deploying infrastructure services separately from the Camunda Helm charts. This approach allows you to use your preferred deployment method, leverage managed services such as AWS OpenSearch, and manage their lifecycle independently of Camunda — giving you greater operational control and flexibility.
:::

If you decide to run Bitnami-based subcharts in production, we strongly recommend using the **vendor-supported enterprise images**. This guide explains how to create registry secrets and install Camunda with enterprise images.

## Why Use enterprise images?

Enterprise images:

- Are built on the Bitnami open-source stack
- Include critical CVE patches and security hardening
- Come with extended vendor support
- Are hosted in a private registry: `registry.camunda.cloud`
- Are available only to Camunda customers with an enterprise subscription

## Create a Kubernetes registry secret

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

## Understanding CVEs in Bitnami images

Customers may notice a high number of CVEs when scanning Bitnami images. This is expected and does not necessarily indicate a higher security risk. The reason is that Bitnami images bundle the application (e.g., PostgreSQL, Elasticsearch, Keycloak), a full OS layer, and supporting libraries. Vulnerability scanners therefore report CVEs across all of these components, including many that are low-severity, informational, or not exploitable in practice.

[Bitnami’s Open CVE Policy](https://docs.bitnami.com/kubernetes/open-cve-policy/) ensures that fixable CVEs are addressed when upstream patches become available, but open/unfixable CVEs remain until resolved by the operating system or application maintainers. As a result, even enterprise Bitnami images will continue to show high CVE counts, despite being patched against critical vulnerabilities.

For Camunda users, the most important considerations are:

- Bitnami subcharts are best used in development and testing environments, unless your operational teams have expertise with Bitnami charts production deployments.
- For production, Camunda recommends deploying PostgreSQL, Elasticsearch, and Keycloak independently or as managed services.
- If you are already running Bitnami subcharts in production (e.g., from 8.7), Camunda strongly recommends switching to Enterprise Bitnami images, as they include critical CVE patches and vendor support.
- For critical environments that require CVE patching with an SLA, please consider alternative options such as managed services, other secure images, or engage with each vendor directly for enterprise support and official deployment options.

### Limitations

- Enterprise Bitnami images may still show CVEs due to OS-level vulnerabilities.
- If your compliance requirements mandate near-zero CVEs, these images may not be sufficient.
