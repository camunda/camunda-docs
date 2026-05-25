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
The C# SDK is a **technical preview** available from Camunda 8.9. It will become fully supported in Camunda 8.10. Its API surface may change in future releases without following semver.
:::

```bash
dotnet add package Camunda.Orchestration.Sdk
```

## Versioning

This SDK has a different release cadence from the Camunda server. Features and fixes land in the SDK during a server release.

The major version of the SDK signals a 1:1 type coherence with the server API for a Camunda minor release.

SDK version `n.y.z` -> server version `8.n`, so the type surface of SDK version 9.y.z matches the API surface of Camunda 8.9.

Using a later SDK version, for example: SDK version 10.y.z with Camunda 8.9, means that the SDK contains additive surfaces that are not guaranteed at runtime, and the compiler cannot warn of unsupported operations.

Using an earlier SDK version, for example: SDK version 9.y.z with Camunda 8.10, results in slightly degraded compiler reasoning: exhaustiveness checks cannot be guaranteed by the compiler for any extended surfaces (principally, enums with added members).

In the vast majority of use-cases, this will not be an issue; but you should be aware that using the matching SDK major version for the server minor version provides the strongest compiler guarantees about runtime reliability.

**Recommended approach**:

- Check the [CHANGELOG](https://github.com/camunda/orchestration-cluster-api-csharp/releases).
- As a sanity check during server version upgrade, rebuild applications with the matching SDK major version to identify any affected runtime surfaces.
