---
id: eventual-consistency
title: "Eventual consistency"
sidebar_label: "Eventual consistency"
sidebar_position: 10
mdx:
  format: md
---

# Eventual consistency

:::caution Technical Preview
The Rust SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

Camunda's read APIs are eventually consistent. Wrap a read in `eventual` to poll through
replication lag, transparently retrying `404`s:

```rust
use camunda_orchestration_sdk::ConsistencyOptions;

// Reads are eventually consistent: poll until the instance is visible, retrying 404s.
let instance = client
    .eventual(ConsistencyOptions::default(), || {
        let client = client.clone();
        let key = process_instance_key.clone();
        async move { client.get_process_instance(&key).await }
    })
    .await?;
```
