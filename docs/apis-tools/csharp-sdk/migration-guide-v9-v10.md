---
id: migration-guide-v9-v10
title: "Migration Guide: v9 → v10"
sidebar_label: "Migration Guide: v9 → v10"
sidebar_position: 15
mdx:
  format: md
---

# Migration Guide: v9 → v10

Upgrading from `Camunda.Orchestration.Sdk` v9 (Camunda 8.9) to v10 (Camunda 8.10)?

**→ See [MIGRATION.md](MIGRATION.md) for the full guide.**

In short: 55 client method parameters moved from `string` to semantic key types
(`GroupId`, `RoleId`, `MappingRuleId`, `ClientId`, `ClusterVariableName`), 26 types
were renamed, 45 bare-`string` properties became typed enums, and binary responses
now return `byte[]`. The compiler will point you at every affected call site.

```xml
<!-- The -* suffix is required while v10 is an alpha prerelease -->
<PackageReference Include="Camunda.Orchestration.Sdk" Version="10.*-*" />
```
