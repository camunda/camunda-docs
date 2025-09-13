---

id: install-bitnami-enterprise-images
sidebar_label: Bitnami enterprise images
title: Install Bitnami enterprise images
description: Configure the Camunda Helm chart to use vendor-supported enterprise images, understand CVE reporting, and set expectations on vulnerabilities.

By default, the Camunda Helm chart uses Bitnami open-source images.

:::info
The Bitnami subcharts listed above are provided for development and testing convenience only. For production environments, we recommend deploying infrastructure services separately from the Camunda Helm charts. This approach allows you to use your preferred deployment method, leverage managed services such as AWS OpenSearch, and manage their lifecycle independently of Camunda—giving you greater operational control and flexibility.
Refer to [Changes to Camunda Helm Sub-Charts](https://camunda.com/blog/2025/08/changes-to-camunda-helm-sub-charts-what-you-need-to-know/) for more details.
:::

## Why Use Enterprise Images?

Enterprise images:

- Are built on the Bitnami open-source stack
- Include critical CVE patches and security hardening
- Come with extended vendor support
- Are hosted in a private registry: `registry.camunda.cloud`
- Are available only to Camunda customers with an enterprise subscription

## Create a Kubernetes Registry Secret

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

## Understanding CVEs in Bitnami Images

Customers may notice a high number of CVEs when scanning Bitnami images. This is expected and does not necessarily indicate a higher security risk. The reason is that Bitnami images bundle the application (e.g., PostgreSQL, Elasticsearch, Keycloak), a full OS layer, and supporting libraries. Vulnerability scanners therefore report CVEs across all of these components, including many that are low-severity, informational, or not exploitable in practice.

[Bitnami’s Open CVE Policy](https://docs.bitnami.com/kubernetes/open-cve-policy/) ensures that fixable CVEs are addressed when upstream patches become available, but open/unfixable CVEs remain until resolved by the operating system or application maintainers. As a result, even enterprise Bitnami images will continue to show high CVE counts, despite being patched against critical vulnerabilities.

For Camunda users, the most important considerations are:

- **Bitnami subcharts are intended for development and testing convenience only.**
- For **production**, Camunda recommends deploying PostgreSQL, Elasticsearch, and Keycloak independently or as managed services.
- **Enterprise Bitnami images** are the recommended choice when Bitnami is used in production, as they include critical CVE patches and vendor support.
- For **compliance-critical environments** that require near-zero CVEs, managed services or hardened custom images are the preferred alternatives.

### Limitations and Alternatives

- Enterprise Bitnami images may still show **hundreds of open CVEs** due to OS-level vulnerabilities.
- If your compliance requirements mandate **near-zero CVEs**, these images may not be sufficient.
