---
id: variable-import
title: "Enable or disable variable import"
description: "Learn how to enable or disable variable import in Camunda Optimize."
---

Learn how to configure Camunda Optimize to control variable import and enhance performance.

## Overview

By default, Camunda Optimize imports process variables to provide deep insights into both process performance and business context. However, in high-throughput environments or data-sensitive scenarios, importing variables may impact system performance and resource usage.

Variable import affects several areas of Optimize’s operation:

- **Import performance**: Importing large or numerous variables can slow down data import.
- **Memory usage**: Variable data increases memory consumption during processing.
- **Storage requirements**: Imported variables contribute to overall storage demands.
- **Indexing duration**: Additional variable data extends indexing time.

If your organization primarily focuses on process performance metrics rather than detailed business context, disabling variable import can help improve scalability and responsiveness.

## Optimize configuration

Variable import is controlled using the `CAMUNDA_OPTIMIZE_ZEEBE_VARIABLE_IMPORT_ENABLED=true|false` environment variable.

### Configuration options

| Value   | Behavior                                     | Recommended use case                                     |
| ------- | -------------------------------------------- | -------------------------------------------------------- |
| `true`  | Variables are imported and indexed (default) | Standard deployments requiring complete business context |
| `false` | Variable import is disabled                  | High-throughput or performance-optimized environments    |

:::note
Disabling variable import means variable-based reports and filters will no longer be available in the Optimize interface. Ensure this setting aligns with your reporting and monitoring needs before applying the configuration.
:::

:::note
When re-enabled, partial or full variable import may happen depending on your cluster [retention](/self-managed/zeebe-deployment/exporters/elasticsearch-exporter.md#retention) configuration.
:::
