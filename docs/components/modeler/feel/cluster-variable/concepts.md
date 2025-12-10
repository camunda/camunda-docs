---
id: cluster-variable-core-concepts
title: Core concepts of cluster variables
sidebar_label: "Core concepts"
description: "Learn how cluster variables work, including scope levels, FEEL namespaces, supported types, and resolution priority."
---

Learn how cluster variables work, including scope levels, FEEL namespaces, supported types, and resolution priority.

## Variable types

Cluster variables support multiple data types to accommodate different configuration needs.

### Simple values

- **String**: Text values for URLs, names, identifiers.
- **Number**: Numeric values for thresholds, timeouts, counts.
- **Boolean**: True/false values for feature flags and toggles.

### Complex values

- **Objects**: Nested structures for grouped configuration.
- **Arrays**: Lists of values

:::note
Access patterns may vary depending on how the array is used.
:::
