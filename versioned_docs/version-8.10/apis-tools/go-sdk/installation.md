---
id: installation
title: "Installation"
sidebar_label: "Installation"
sidebar_position: 2
mdx:
  format: md
---

# Installation

:::caution Technical Preview
The Go SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

```sh
go get github.com/camunda/orchestration-cluster-api-go/v10
```

Requires Go 1.25+. The `/v10` suffix is the Camunda server line this SDK targets
(8.10); see [versioning](versioning.md#versioning).
