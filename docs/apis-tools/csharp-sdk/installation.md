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

This SDK does **not** follow traditional semver. The **major.minor** version tracks the Camunda server version, so you can easily match the SDK to your deployment target (e.g. SDK `8.9.x` targets Camunda `8.9`).

**Patch releases** contain fixes, features, and occasionally **breaking type changes**. A breaking type change typically means an upstream API definition fix that corrects the shape of a request or response model — your code may stop compiling even though it worked before.

When this happens, we signal it in the [CHANGELOG](https://github.com/camunda/orchestration-cluster-api-csharp/releases).

**Recommended approach:**

- **Ride the latest** — accept that types may shift and update your code when it happens. This keeps you on the most accurate API surface.
- **Pin and review** — pin to a specific patch version and review the [CHANGELOG](https://github.com/camunda/orchestration-cluster-api-csharp/releases) before upgrading:

  ```xml
  <PackageReference Include="Camunda.Orchestration.Sdk" Version="[8.9.3]" />
  ```
