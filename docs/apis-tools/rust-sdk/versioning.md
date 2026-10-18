---
id: versioning
title: "Versioning"
sidebar_label: "Versioning"
sidebar_position: 4
mdx:
  format: md
---

# Versioning

:::caution Technical Preview
The Rust SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

The SDK major version tracks the Camunda server minor version: use the SDK line
that matches your server.

| Camunda server        | SDK version | Branch      |
| --------------------- | ----------- | ----------- |
| 8.10                  | `10.x`      | `stable/10` |
| 8.11 (in development) | `11.x`      | `main`      |

Releases before 10.0.0 (`0.x`) predate this scheme.
