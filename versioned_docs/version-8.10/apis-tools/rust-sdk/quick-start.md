---
id: quick-start
title: "Quick start"
sidebar_label: "Quick start"
sidebar_position: 4
mdx:
  format: md
---

# Quick start

:::caution Technical Preview
The Rust SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

```rust
use camunda_orchestration_sdk::CamundaClient;

// Reads CAMUNDA_REST_ADDRESS, CAMUNDA_AUTH_STRATEGY, CAMUNDA_CLIENT_ID, ... from the env.
let client = CamundaClient::from_env()?;

let topology = client.topology().await?;
println!("Gateway version: {}", topology.gateway_version);
```

Programmatic configuration overrides take precedence over the environment:

```rust
use camunda_orchestration_sdk::{CamundaClient, CamundaOptions};

let client = CamundaClient::new(
    CamundaOptions::new()
        .with("CAMUNDA_REST_ADDRESS", "https://my-cluster.camunda.io")
        .with("CAMUNDA_AUTH_STRATEGY", "OAUTH")
        .with("CAMUNDA_CLIENT_ID", "my-client-id")
        .with("CAMUNDA_CLIENT_SECRET", "my-secret")
        .with(
            "CAMUNDA_OAUTH_URL",
            "https://login.cloud.camunda.io/oauth/token",
        )
        .with("CAMUNDA_TOKEN_AUDIENCE", "zeebe.camunda.io"),
)?;
```

> For a complete, runnable program see
> [`examples/topology.rs`](https://github.com/camunda/orchestration-cluster-api-rust/blob/main/examples/topology.rs).
