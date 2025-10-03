---
id: install-bitnami-enterprise-images
sidebar_label: Bitnami enterprise images
title: Install Bitnami enterprise images
description: Configure the Camunda Helm chart to use vendor-supported enterprise images, understand CVE reporting, and set expectations on vulnerabilities.
---

This page explains how to configure the Camunda Helm chart to use Bitnami enterprise images for production environments, including guidance on security, CVE reporting, and installation steps.

## Overview

By default, the Camunda Helm chart uses Bitnami open-source images. However, for production environments that require enhanced security and vendor support, enterprise images are available.

:::info Important change since Camunda 8.8
In earlier versions, some users relied on Bitnami subcharts in production. Starting with 8.8, Bitnami subcharts are intended primarily for development and testing, unless your operational teams have expertise with Bitnami charts production deployments.

**For existing users:** If you used Bitnami subcharts in production before 8.8, review the implications for your current setup. See [Changes to Camunda Helm Sub-Charts](https://camunda.com/blog/2025/08/changes-to-camunda-helm-sub-charts-what-you-need-to-know/) for more details.

**Recommended approach:** For production environments, Camunda recommends deploying infrastructure services separately from the Camunda Helm charts. This approach lets you:

- Use your preferred deployment method
- Leverage managed services (for example, AWS OpenSearch or Azure Database)
- Manage infrastructure lifecycle independently of Camunda
- Gain greater operational control and flexibility
  :::

If you use Bitnami-based subcharts in production, Camunda strongly recommend using vendor-supported enterprise images. This guide explains how to configure and install Camunda with these enterprise images.

## Understanding Bitnami image offerings

Due to [Bitnami chart security policy changes](https://github.com/bitnami/charts/issues/30850), Camunda transitioned from open-source Bitnami images to enterprise-grade alternatives. These enterprise images require an additional values file, described below.

### Available image types

| Image Type      | Registry Path                                                 | Base OS         | Support Level                            | Target Use                 |
| --------------- | ------------------------------------------------------------- | --------------- | ---------------------------------------- | -------------------------- |
| **Open-source** | `bitnamilegacy/*`                                             | Debian          | Community-maintained                     | Development and testing    |
| **Premium**     | `bitnamipremium/*` <br/>(Camunda proxied through `vendor-ee`) | Debian          | Enterprise support with security patches | Production                 |
| **Secure**      | `bitnamisecure/*`                                             | VMware PhotonOS | Minimal attack surface                   | High-security environments |

### Why Camunda uses Premium images

Camunda currently provides **Premium images** only.

- **Available:** Debian-based Premium images in the `vendor-ee` [registry](https://registry.camunda.cloud/) (Camunda provides only these for consistency)
- **Not available:** PhotonOS-based Secure images are not provided by Camunda

## Benefits of enterprise images

Enterprise images provide key advantages over open-source alternatives:

| Benefit Category | Key Features                                                                                                                                       |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Security**     | <ul><li>Critical CVE (Common Vulnerabilities and Exposures) patches</li><li>Security hardening</li><li>Regular vulnerability assessments</li></ul> |
| **Support**      | <ul><li>SLA guarantees</li><li>Professional maintenance</li></ul>                                                                                  |
| **Enterprise**   | <ul><li>Private registry (`registry.camunda.cloud`)</li><li>Customer-exclusive access</li><li>Integrated support</li></ul>                         |

## Environment-specific recommendations

Choose your approach based on security requirements and operational constraints:

| Environment Type                   | Infrastructure Approach                                                                                                          | CVE Management Strategy                                                                                            |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Development/Testing**            | Bitnami subcharts with open-source images                                                                                        | Focus on functionality over security hardening                                                                     |
| **Production (Moderate Security)** | Bitnami Premium images with vendor support                                                                                       | Accept CVE scanner findings from OS layers. Prioritize critical/high-severity vulnerabilities with available fixes |
| **Production (Strict Compliance)** | Managed services (AWS RDS, Azure Database, Google Cloud SQL) or separately deployed infrastructure with security-hardened images | Engage vendors for enterprise support and SLA-backed security patching                                             |
| **High-Security/Near-Zero CVEs**   | Minimal base images (Alpine, Distroless) with custom infrastructure deployment. Alternative: PhotonOS-based Secure images        | Alternative secure image distributions or custom-built containers                                                  |

## Installation process

### Step 1: Create a Kubernetes registry secret

To access the private registry, create a Kubernetes `docker-registry` secret using your Camunda Enterprise credentials:

```shell
kubectl create secret docker-registry registry-camunda-cloud \
  --docker-server=registry.camunda.cloud \
  --docker-username=<your-username> \
  --docker-password=<your-password> \
  --docker-email=unused@example.com
```

**Configuration notes:**

- Replace `<your-username>` and `<your-password>` with your LDAP credentials
- The email field is unused but required by Kubernetes
- For more details, see [Specifying `imagePullSecrets` on a Pod](https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod)

### Step 2: Install the Helm chart with enterprise images

Camunda provides a `values-enterprise.yaml` file that configures the chart to use enterprise images.

:::note About vendor pull secrets
The `values-enterprise.yaml` file references the `commonVendorPullSecrets` parameter, which defines the secret required to access the private registry.

This is required because `global.image.pullSecrets` does not apply to vendor charts.
:::

**Default configuration:** The secret name defaults to `registry-camunda-cloud`. You can override this using:

- The `--set` flag
- A custom `values-enterprise.yaml` file
- Another [Helm value override mechanism](https://helm.sh/docs/chart_template_guide/values_files/#using-helm-install--f)

**Installation command:**

```shell
helm install camunda camunda/camunda-platform --version $HELM_CHART_VERSION \
  --values https://raw.githubusercontent.com/camunda/camunda-platform-helm/main/charts/camunda-platform-8.8/values.yaml \
  --values https://raw.githubusercontent.com/camunda/camunda-platform-helm/main/charts/camunda-platform-8.8/values-enterprise.yaml
```

This command deploys Camunda with vendor-supported enterprise images, recommended for secure and stable production environments.

## Understanding CVEs in Bitnami images

Working with Bitnami images requires understanding CVE (Common Vulnerabilities and Exposures) reporting and expectations.

### CVE responsibility matrix

Security responsibility differs across components:

| Component Type         | Examples                                                 | Security Responsibility            | CVE Handling                                                                                   |
| ---------------------- | -------------------------------------------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Camunda components** | Zeebe, Operate, Tasklist, Optimize, Connectors, Identity | Camunda directly                   | Regular updates and patches in Camunda releases. See [Security notices](/reference/notices.md) |
| **Vendor components**  | Bitnami PostgreSQL, Elasticsearch, Keycloak              | Respective vendor (Bitnami/VMware) | Camunda mitigates by upgrading to latest vendor versions                                       |

If vendors assess that a vulnerability has no practical impact, Camunda may accept this assessment or migrate to alternative solutions.

### Expected behavior: high CVE counts

Bitnami images typically show high CVE counts in security scans. This is expected because they include multiple layers:

- **Application layer:** PostgreSQL, Elasticsearch, Keycloak
- **Complete operating system:** Debian with system libraries
- **Runtime dependencies:** JVM, Python, system utilities
- **Supporting libraries:** SSL, compression, networking components

Vulnerability scanners report CVEs across all layers, which inflates counts even when images are secure and up-to-date.

:::tip
To reduce CVE exposure, Camunda recommends using managed services (AWS RDS, Azure Database, Google Cloud SQL) instead of Bitnami subcharts in production.
:::

### Bitnami's CVE management approach

[Bitnami's Open CVE Policy](https://docs.bitnami.com/kubernetes/open-cve-policy/) defines their security approach:

- Fixable CVEs are addressed when upstream patches become available
- Open or unfixable CVEs remain until resolved by OS or application maintainers
- Critical vulnerabilities receive priority with expedited security updates

Even enterprise Bitnami Premium images will continue to show CVE counts, despite being patched against critical vulnerabilities.

### Important limitations

When working with Bitnami images, be aware of these constraints:

- **CVE persistence:** Enterprise Bitnami images may still show CVEs due to OS-level vulnerabilities
- **Compliance gaps:** If your requirements mandate near-zero CVEs, these images may not be sufficient
- **Alternative needed:** Consider managed services or custom-built minimal images for high-security environments
