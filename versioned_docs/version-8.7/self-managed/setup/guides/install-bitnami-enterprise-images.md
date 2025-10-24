---
id: install-bitnami-enterprise-images
sidebar_label: Bitnami enterprise images
title: Install Bitnami enterprise images
description: Configure the Camunda Helm chart to use vendor-supported Bitnami Premium, enterprise images, understand CVE reporting, and set expectations on vulnerabilities.
---

This guide explains how to configure the Camunda Helm chart to use Bitnami Premium images designed for production environments. These images are referred to as Enterprise images, indicating that they are intended for Camunda Enterprise customers. The guide also covers configuration steps, security considerations, CVE reporting, and best practices.

## Overview

By default, the Camunda Helm chart deploys Bitnami open-source images. For production environments that require enhanced security and vendor support, Camunda enables access to Bitnami Premium images through a vendor-proxied registry for licensed enterprise customers.

:::info Important update since Camunda 8.8
Starting Camunda 8.8, Bitnami subcharts are primarily intended for development and testing purposes unless your teams have specific expertise with Bitnami charts in production.

**For existing users:** You may continue using Bitnami subcharts in your environments. If you have production deployments using these subcharts prior to 8.8, review the implications for your setup. See [Changes to Camunda Helm Sub-Charts](https://camunda.com/blog/2025/08/changes-to-camunda-helm-sub-charts-what-you-need-to-know/) for details.

**Recommended approach:** For production, Camunda advises deploying infrastructure services independently of the Camunda Helm charts. This approach allows you to:

- Use your preferred deployment method
- Utilize managed services (e.g., AWS OpenSearch, Azure Database)
- Manage infrastructure lifecycle separately from Camunda charts
- Achieve greater operational control and flexibility

If you use Bitnami-based subcharts in production, Camunda strongly recommends using Bitnami Premium images licensed by Camunda and maintained by Bitnami (Broadcom). This guide explains how to configure and install Camunda with these images.

:::

## Understanding Bitnami image offerings

Following [Bitnami chart security policy changes](https://github.com/bitnami/charts/issues/30850), Camunda transitioned from open-source Bitnami images to Bitnami Premium images licensed by Broadcom. These images require an additional values file for configuration, detailed below.While Bitnami also provides a repository of Secure images, Camunda continues to mirror the Premium versions in its subcharts.

**You do not need to use any charts other than those specified in the `Chart.yaml` dependencies.** The Camunda Helm chart handles all chart dependencies automatically.

:::info Camunda provides Premium images only
Camunda exclusively provides access to Bitnami Premium **images** for licensed enterprise customers. However, the Helm **charts** themselves remain the open-source Bitnami charts.

Each Camunda Helm chart version specifies its chart dependencies in the `Chart.yaml` file. For example, see the [Camunda 8.7 Chart.yaml](https://github.com/camunda/camunda-platform-helm/blob/main/charts/camunda-platform-8.7/Chart.yaml) file which lists all dependent charts.

**Keycloak Helm chart fork:** Camunda uses a forked Keycloak Helm chart based on Bitnami's chart. The Keycloak image has been upgraded to the latest public release, and environment variable names have been adjusted for compatibility with both enterprise and open-source deployments. The fork ensures ease of distribution and backward compatibility. See the implementation in the Camunda Helm repository: [Keycloak Helm chart](https://github.com/camunda/camunda-platform-helm/tree/main/charts/keycloak-24).

:::

### Available image types

| Image Type      | Registry Path                                                            | Base OS | Support Level       | Intended Use            |
| --------------- | ------------------------------------------------------------------------ | ------- | ------------------- | ----------------------- |
| **Open-source** | `bitnamilegacy/*`                                                        | Debian  | Community-supported | Development and testing |
| **Premium**     | `bitnamipremium/*` <br/>(Camunda proxied through `vendor-ee` repository) | Debian  | Vendor-supported    | Production              |

### Why Camunda uses Bitnami Premium images

- **Availability:** Debian-based Premium images accessible via a vendor-proxied registry (Camunda facilitates access for licensed customers)
- **Support:** Vendor-maintained with SLAs and security patches
- **Exclusions:** PhotonOS-based Premium images are not distributed or supported by Camunda

For more information, see [Bitnami](https://bitnami.com/) and [Bitnami Documentation](https://docs.bitnami.com/).

## Benefits of Bitnami Premium images

Bitnami Premium images offer key advantages over open-source variants:

| Benefit Category | Key Features                                                                                                                                       |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Security**     | <ul><li>Timely CVE patches</li><li>Security hardening</li><li>Regular vulnerability assessments</li></ul>                                          |
| **Support**      | <ul><li>SLA-backed maintenance</li><li>Professional vendor support</li></ul>                                                                       |
| **Enterprise**   | <ul><li>Access via private registry (`registry.camunda.cloud`)</li><li>Customer-exclusive availability</li><li>Integrated vendor support</li></ul> |

## Environment-specific recommendations

Select your deployment approach based on security requirements and operational needs:

| Environment Type                   | Infrastructure Approach                                                                                       | CVE Management Strategy                                                                               |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Development/Testing**            | Bitnami subcharts with open-source images                                                                     | Prioritize functionality; security hardening less critical                                            |
| **Production (Moderate Security)** | Bitnami Premium images with vendor support                                                                    | Accept OS-layer CVE reports; prioritize critical/high severity vulnerabilities with available fixes   |
| **Production (Strict Compliance)** | Managed services (AWS RDS, Azure Database, Google Cloud SQL) or separately deployed hardened images           | Engage vendors for enterprise support and SLA-backed security patching                                |
| **High-Security/Near-Zero CVEs**   | Minimal base images (Alpine, Distroless) with custom infrastructure or alternative secure image distributions | Use alternative secure image distributions or custom-built containers to meet strict CVE requirements |

## Installation process

### Step 1: Create a Kubernetes registry secret

To access the private registry, create a Kubernetes `docker-registry` secret with your Camunda Enterprise credentials:

```shell
kubectl create secret docker-registry registry-camunda-cloud \
  --docker-server=registry.camunda.cloud \
  --docker-username=<your-username> \
  --docker-password=<your-password> \
  --docker-email=unused@example.com
```

**Notes:**

- Replace `<your-username>` and `<your-password>` with your LDAP credentials
- The email field is required by Kubernetes but not used
- See [Specifying `imagePullSecrets` on a Pod](https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod) for details

### Step 2: Install the Helm chart with enterprise images

Camunda provides a `values-enterprise.yaml` file to configure the chart to use Premium images.

:::note About vendor pull secrets
The `values-enterprise.yaml` references `commonVendorPullSecrets` to specify the secret for accessing the private registry.

This is necessary because `global.image.pullSecrets` does not apply to vendor charts.
:::

**Default secret name:** `registry-camunda-cloud`. You can override this via:

- The `--set` flag
- A custom `values-enterprise.yaml`
- Other Helm value override methods ([Helm values files](https://helm.sh/docs/chart_template_guide/values_files/#using-helm-install--f))

**Installation command:**

```shell
helm install camunda camunda/camunda-platform --version $HELM_CHART_VERSION \
  --values https://raw.githubusercontent.com/camunda/camunda-platform-helm/main/charts/camunda-platform-8.7/values-enterprise.yaml
```

This deploys Camunda with vendor-supported Premium images, recommended for secure, stable production environments.

## Understanding CVEs in Bitnami images

Working with Bitnami images requires understanding CVE (Common Vulnerabilities and Exposures) reporting and how to interpret scan results.

### CVE responsibility matrix

Security responsibilities differ by component:

| Component Type         | Examples                                                 | Security Responsibility | CVE Handling                                                                                   |
| ---------------------- | -------------------------------------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------- |
| **Camunda components** | Zeebe, Operate, Tasklist, Optimize, Connectors, Identity | Camunda                 | Regular updates and patches in Camunda releases. See [Security notices](/reference/notices.md) |
| **Vendor components**  | Bitnami PostgreSQL, Elasticsearch, Keycloak              | Bitnami (Broadcom)      | Camunda facilitates upgrades to latest vendor versions                                         |

If a vendor determines a vulnerability has no practical impact, Camunda may accept that assessment or migrate to alternatives.

### Expected behavior: high CVE counts

Bitnami images often report many CVEs in vulnerability scans. This occurs because these images include multiple layers:

- **Application layer:** PostgreSQL, Elasticsearch, Keycloak
- **Operating system:** Debian with system libraries
- **Runtime dependencies:** JVM, Python, system utilities
- **Supporting libraries:** SSL, compression, networking components

Scanners report CVEs across all layers, inflating counts even when images are secure and up-to-date.

:::tip
To reduce CVE exposure, Camunda recommends using managed services (AWS RDS, Azure Database, Google Cloud SQL) rather than Bitnami subcharts in production.
:::

### Bitnami’s CVE management approach

[Bitnami’s Open CVE Policy](https://docs.bitnami.com/kubernetes/open-cve-policy/) outlines their security process:

- Fixable CVEs are patched promptly when upstream fixes are available
- Open or unfixable CVEs remain until resolved by OS or application maintainers
- Critical vulnerabilities receive priority with expedited security updates

Even enterprise Bitnami Premium images will show CVE counts due to OS-level vulnerabilities despite patches for critical issues.

### Important limitations

When using Bitnami images, consider these constraints:

- **CVE persistence:** OS-level CVEs may remain visible in scans
- **Compliance requirements:** Near-zero CVE policies may not be achievable with these images
- **Alternatives:** For strict security, consider managed services or custom minimal images

## Compatibility note

This configuration follows Bitnami’s official image and chart usage guidelines. For licensing, support levels, and CVE management, refer to [Bitnami Documentation](https://docs.bitnami.com/) and [Bitnami Enterprise](https://bitnami.com/enterprise).
