---
id: chart-parameters
sidebar_label: Parameters
title: Helm chart parameters
description: Overview of Helm chart parameters for Camunda Self-Managed.
---

Helm chart parameters let you configure the components and behavior of your Camunda Self-Managed installation. The main way to customize these parameters is by using a `values.yaml` file.

In Helm charts, the `values.yaml` file defines configuration for your deployment. To tailor your installation to your needs, you can override parameters in this file or provide your own values file. It’s best practice to keep the original `values.yaml` unchanged and maintain a separate file with your custom settings.

The following tables show the **top-level configuration sections** in `values.yaml`. Each section controls a specific area of the chart.

### Global and orchestration cluster configuration

| Section         | Purpose                                                 |
| --------------- | ------------------------------------------------------- |
| `global`        | Configures shared settings that apply across components |
| `orchestration` | Configures orchestration cluster settings               |

### Other Camunda applications

| Section      | Purpose                                             |
| ------------ | --------------------------------------------------- |
| `console`    | Configures the Camunda Self-Managed Console service |
| `connectors` | Configures the Connector runtime                    |
| `identity`   | Configures the Management Identity service          |
| `optimize`   | Configures the Optimize web application             |
| `webModeler` | Configures the Web Modeler service                  |

### Bitnami subcharts

| Section                | Purpose                                                                                                                                                                                        |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `elasticsearch`        | Provides an embedded Elasticsearch backend (Bitnami subchart). This is typically used as secondary storage — see [Elasticsearch/OpenSearch](/reference/glossary.md#elasticsearch--opensearch). |
| `identityKeycloak`     | Provides an embedded Keycloak service for Management Identity (Bitnami subchart)                                                                                                               |
| `identityPostgresql`   | Provides an embedded PostgreSQL database for Management Identity (Bitnami subchart)                                                                                                            |
| `webModelerPostgresql` | Provides an embedded PostgreSQL database for Web Modeler (Bitnami subchart)                                                                                                                    |

:::info
Bitnami subcharts are best suited for development and testing environments unless your operations team has experience managing Bitnami chart deployments in production.

For production environments, Camunda recommends deploying infrastructure services separately from the Camunda Helm charts. This approach lets you use your preferred deployment methods, leverage managed services such as AWS OpenSearch, and manage their lifecycle independently of Camunda—providing greater operational control and flexibility.

**Alternative deployment approach:**  
See [Deploy infrastructure with vendor-supported methods](/self-managed/deployment/helm/configure/vendor-supported-infrastructure.md) for instructions on deploying PostgreSQL, Elasticsearch, and Keycloak using official operators instead of Bitnami subcharts.
:::

#### Bitnami subcharts guidance

**Development and testing environments**: Bitnami subcharts provide ready-to-use infrastructure components that you can deploy with Camunda applications using minimal configuration.

**Production environments**: Camunda recommends deploying infrastructure services separately from the Camunda Helm charts. This approach lets you:

- Use your preferred deployment method and operational tooling
- Leverage managed services such as AWS RDS, Azure Database, or Google Cloud SQL
- Manage infrastructure lifecycle independently of Camunda applications
- Implement your organization's security, backup, and monitoring standards

If you use Bitnami subcharts in production, consider [Bitnami Premium images](/self-managed/deployment/helm/configure/registry-and-images/install-bitnami-enterprise-images.md) for enhanced security patches and vendor support. Operational expertise with Bitnami chart production deployments is recommended.

### Observability

| Section                    | Purpose                                                    |
| -------------------------- | ---------------------------------------------------------- |
| `prometheusServiceMonitor` | Creates a Prometheus `ServiceMonitor` resource for metrics |

## Where to find all chart parameters

For a full list of supported Helm chart parameters, including default values and descriptions, see [Helm chart parameters on Artifact Hub](https://artifacthub.io/packages/helm/camunda/camunda-platform/#parameters).

Check this page when installing or upgrading to ensure you use the latest options for your chart version.

### Provided values files

In addition to the default `values.yaml`, the Helm chart repository includes several additional values files for special use cases.  
You can use these files individually or combine them with your own overrides.

| File                         | Purpose                                                                                                                                                                                                                                 |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `values.yaml`                | The default configuration. Includes all chart parameters with baseline values.                                                                                                                                                          |
| `values-local.yaml`          | Optimized for local development (for example, kind or Minikube). Adjusts resource requests and limits for smaller environments.                                                                                                         |
| `values-enterprise.yaml`     | Switches Bitnami subcharts to Camunda Enterprise images. For Camunda Enterprise customers only.                                                                                                                                         |
| `values-bitnami-legacy.yaml` | Uses the archived Bitnami open-source images for subcharts instead of the default ones. Deprecated; see [bitnami/containers#83267](https://github.com/bitnami/containers/issues/83267). Provided only as a temporary transition option. |
| `values-latest.yaml`         | Tracks the latest versions of applications and subcharts. This may include breaking changes and is intended for early testing.                                                                                                          |
| `values-digest.yaml`         | Uses the latest snapshot images referenced by digest (for internal development only).                                                                                                                                                   |

### Creating your own values files

To customize parameters, create an override file (for example, `my-overrides.yaml`) with custom settings.  
This approach is recommended over editing `values.yaml` directly.

### Combining multiple values files

Helm lets you specify multiple values files. You can layer them to build the configuration you need:

```bash
helm install camunda camunda/camunda-platform \
  -f values.yaml \
  -f values-enterprise.yaml \
  -f my-overrides.yaml
```

If the same parameter is defined in more than one file, the value in the last file listed takes precedence. In the example above, settings from `my-overrides.yaml` override values from both `values-enterprise.yaml` and `values.yaml`.
