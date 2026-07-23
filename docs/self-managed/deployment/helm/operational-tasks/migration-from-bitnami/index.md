---
id: index
sidebar_label: Migration
title: Migrate from Bitnami subcharts
description: "Migrate your Camunda 8 Self-Managed infrastructure from Bitnami subcharts to production-grade alternatives such as Kubernetes operators or managed services."
---

:::warning
Camunda 8.9 is the last version that ships Bitnami subcharts. Starting with Camunda 8.10 (Helm chart `15.x`), the bundled Bitnami subcharts (PostgreSQL, Elasticsearch, and Keycloak) are removed from the Camunda Helm chart.
:::

If you run Camunda 8.9 (or earlier) with Bitnami subcharts and want to migrate to Kubernetes operators or managed services, follow the [migration guide in the 8.9 documentation](https://docs.camunda.io/docs/8.9/self-managed/deployment/helm/operational-tasks/migration-from-bitnami/).

New Camunda 8.10 installations should provision [operator-based infrastructure](/self-managed/deploy-to-production/plan/kubernetes-operators.md) or managed services directly, without Bitnami subcharts.

## Why is this guide only available for 8.9?

The migration tooling deploys a Bitnami-based "source" installation and migrates its data to operator- or managed-service-backed targets. Because chart `15.x` (Camunda 8.10) no longer bundles Bitnami subcharts, the source side of the migration can only exist on Camunda 8.9 and earlier.

The recommended path is therefore:

1. **While on Camunda 8.9**, migrate your Bitnami-managed infrastructure to [Kubernetes operators or managed services](https://docs.camunda.io/docs/8.9/self-managed/deployment/helm/operational-tasks/migration-from-bitnami/).
2. **Then upgrade** from 8.9 to 8.10 with a standard Helm upgrade, since your infrastructure is already operator- or managed-service-backed.
