---
id: variable-import
title: "Enable or disable variable ingestion"
description: "Learn how enable or disable Optimize variables ingestion"
---

Learn how to configure Camunda Optimize to control variables ingestion and optimize performance.

## About

Camunda Optimize imports process variables by default to provide comprehensive insights into both process performance
and business context. However, in high-throughput environments or data-sensitive deployments, variable import can
impact system performance and resource consumption.

Variable data import affects several aspects of Optimize operation:

- **Import Performance**: Large or numerous process variables can slow down data ingestion
- **Memory Usage**: Variable data increases memory consumption during processing
- **Storage Requirements**: Variable data contributes to overall storage footprint
- **Indexing Duration**: Additional variable data extends indexing operations

For organizations that focus primarily on process performance metrics rather than detailed business context,
disabling variable import can improve system scalability and responsiveness.

## Optimize Configuration

Variable import behavior is controlled through the `CAMUNDA_OPTIMIZE_ZEEBE_VARIABLE_IMPORT_ENABLED=true|false`
environment variable.

### Configuration Options

| Value   | Behavior                                     | Use Case                                                        |
| ------- | -------------------------------------------- | --------------------------------------------------------------- |
| `true`  | Variables are imported and indexed (default) | Standard deployments requiring full context                     |
| `false` | Variable import is disabled                  | High-throughput environments or performance-focused deployments |

Note that disabling variable import means variable-based reports and filters will not be available in
the Optimize interface. Ensure this aligns with your monitoring and reporting requirements before
applying this configuration.
