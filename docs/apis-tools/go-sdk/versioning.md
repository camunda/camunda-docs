---
id: versioning
title: "Versioning"
sidebar_label: "Versioning"
sidebar_position: 20
mdx:
  format: md
---

# Versioning

:::caution Technical Preview
The Go SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

The SDK major version tracks the Camunda server minor version: use the SDK line
that matches your server. Go requires majors ≥ 2 to carry a `/vN` module-path
suffix, so the import path names the server line:

| Camunda server        | Module path suffix | Branch      |
| --------------------- | ------------------ | ----------- |
| 8.10                  | `/v10`             | `stable/10` |
| 8.11 (in development) | `/v11`             | `main`      |

Moving to a new server minor means changing the import path. Releases before
v10 (`v0.x`) used the module path without a suffix.
