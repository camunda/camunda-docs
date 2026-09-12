---
id: installation
title: "Installation"
sidebar_label: "Installation"
sidebar_position: 3
mdx:
  format: md
---

# Installation

:::caution Technical Preview
The Rust SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

Add the SDK from crates.io:

```bash
cargo add camunda-orchestration-sdk
cargo add tokio --features full
```

Or add it to `Cargo.toml` directly:

```toml
[dependencies]
camunda-orchestration-sdk = "0.1"
tokio = { version = "1", features = ["full"] }
```

The async API requires a Tokio runtime. The low-level generated client is also
published as [`camunda-orchestration-api-client`](https://crates.io/crates/camunda-orchestration-api-client),
but most users only need the `camunda-orchestration-sdk` facade.
