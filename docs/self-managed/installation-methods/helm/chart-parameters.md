---
id: chart-parameters
sidebar_label: Parameters
title: Helm chart parameters
description: "Overview of configuration options for the Camunda Helm chart"
---

Helm chart parameters allow you to configure the different components and behavior of your Camunda Self-Managed installation.  
The main mechanism for customizing these parameters is the `values.yaml` file.

In Helm charts, the `values.yaml` file defines configuration for your deployment.  
By overriding parameters in this file (or by providing your own values file), you can tailor the installation to your needs.  
It is recommended to keep the original `values.yaml` unchanged and provide a separate file with your customizations.

The following tables provide an overview of the major **top-level configuration sections** in `values.yaml`.  
Each section controls a specific area of the chart.

### Global and Orchestration cluster configuration

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

| Section                | Purpose                                                                             |
| ---------------------- | ----------------------------------------------------------------------------------- |
| `elasticsearch`        | Provides an embedded Elasticsearch backend (Bitnami subchart)                       |
| `identityKeycloak`     | Provides an embedded Keycloak service for Management Identity (Bitnami subchart)    |
| `identityPostgresql`   | Provides an embedded PostgreSQL database for Management Identity (Bitnami subchart) |
| `webModelerPostgresql` | Provides an embedded PostgreSQL database for Web Modeler (Bitnami subchart)         |

:::info
The Bitnami subcharts listed above are provided for development and testing convenience only. For production environments, we recommend deploying infrastructure services separately from the Camunda Helm charts. This approach allows you to use your preferred deployment method, leverage managed services such as AWS OpenSearch, and manage their lifecycle independently of Camunda—giving you greater operational control and flexibility.
:::

### Observability

| Section                    | Purpose                                                                       |
| -------------------------- | ----------------------------------------------------------------------------- |
| `prometheusServiceMonitor` | Enables creation of a Prometheus ServiceMonitor resource for metrics scraping |

## Where to find all chart parameters

The full list of supported Helm chart parameters—including their default values and descriptions—is maintained on Artifact Hub:

[View Helm chart parameters on Artifact Hub](https://artifacthub.io/packages/helm/camunda/camunda-platform/#parameters)

We recommend consulting this page whenever you're installing or upgrading the platform, as it reflects the latest configuration options for all chart versions.

---

### Provided values files

Alongside the main `values.yaml`, the Helm chart repository includes several additional values files for special use cases.  
These files can be used individually or combined with your own overrides.

| File                         | Purpose                                                                                                                                                                              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `values.yaml`                | The default configuration. Contains all chart parameters with baseline values.                                                                                                       |
| `values-local.yaml`          | Optimized for local development, for example on `kind` or Minikube. Adjusts resource requests and limits for smaller environments.                                                   |
| `values-enterprise.yaml`     | Switches Bitnami subcharts to Camunda Enterprise images. This file is intended for Camunda enterprise customers only.                                                                |
| `values-bitnami-legacy.yaml` | Uses the archived Bitnami open-source images for subcharts instead of the default ones. (Deprecated — see bitnami/containers#83267. Provided only as a temporary transition option.) |
| `values-latest.yaml`         | Tracks the latest available versions of applications and subcharts. This may include breaking changes and is intended for early testing.                                             |
| `values-digest.yaml`         | Uses the latest snapshot images referenced by digest (for internal development only).                                                                                                |

### Creating your own values files

You can create your own override file (for example `my-overrides.yaml`) with custom settings.  
This is the recommended way to adapt the configuration instead of editing the default `values.yaml` directly.

### Combining multiple values files

Helm supports specifying multiple values files. You can layer them to build the configuration you need:

```bash
helm install camunda camunda/camunda-platform \
  -f values.yaml \
  -f values-enterprise.yaml \
  -f my-overrides.yaml
```

If the same parameter is defined in more than one file, the value from the last file listed takes precedence.
In the example above, settings from `my-overrides.yaml` overwrite values from both `values-enterprise.yaml` and `values.yaml`.
