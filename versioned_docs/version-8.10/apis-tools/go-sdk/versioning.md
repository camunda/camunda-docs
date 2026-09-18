---
id: versioning
title: "Versioning"
sidebar_label: "Versioning"
sidebar_position: 18
mdx:
  format: md
---

# Versioning

:::caution Technical Preview
The Go SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

The SDK major version tracks the Camunda server minor version (server 8.9 → SDK
9.x). Per Go conventions, majors ≥ 2 use a `/vN` module-path suffix
(`.../orchestration-cluster-api-go/v9`). During Technical Preview the module
stays at `v0`.
