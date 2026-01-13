---
id: version-compatibility
title: Version compatibility checks
description: "How Camunda 8 validates version compatibility during upgrades (broker and secondary storage)."
---

This page describes how Camunda 8 validates version compatibility when you upgrade a self-managed orchestration cluster. It covers:

- What defines a compatible or incompatible upgrade path
- How the **broker** enforces version rules
- How **secondary storage management** performs similar checks

## Semantic version basics

Camunda 8 versions follow the `MAJOR.MINOR.PATCH` format (for example, `8.8.3`). Early access builds include a pre-release suffix (for example, `8.8.0-alpha1`).

- **Major**: No cross-major upgrades or downgrades are supported directly.
- **Minor**: Feature releases. You may only move one minor step at a time (for example, `8.7.x → 8.8.y`).
- **Patch**: Bug or security fixes. You can move forward within the same minor (for example, `8.8.1 → 8.8.3`).
- **Pre-release (alpha)**: Builds tagged with `-alpha*` are not valid endpoints in a supported upgrade path.

## Supported upgrade paths

| Scenario                            | Example              | Compatibility                                              |
| ----------------------------------- | -------------------- | ---------------------------------------------------------- |
| Patch upgrade                       | 8.8.1 → 8.8.3        | Compatible                                                 |
| Minor upgrade (single step)         | 8.7.5 → 8.8.3        | Compatible                                                 |
| Minor upgrade (skipping a minor)    | 8.6.9 → 8.8.3        | Incompatible                                               |
| Patch downgrade                     | 8.8.3 → 8.8.1        | Incompatible (broker); secondary storage skips (see below) |
| Minor downgrade                     | 8.8.3 → 8.7.5        | Incompatible (broker); secondary storage skips (see below) |
| Major change (upgrade or downgrade) | 8.x ↔ 9.x            | Incompatible                                               |
| Alpha build involved                | 8.8.0-alpha1 ↔ 8.8.0 | Incompatible                                               |

## Broker behavior

The broker validates the previous persisted version against the new binary version during startup:

- **Compatible:** Proceeds with state (DB) migration if required (skipped for restarts or no-op cases).
- **Incompatible:** Starts but marks itself unhealthy and does not apply any state or data migration. Check startup logs, fix the unsupported upgrade path, and restart.

### Why incompatible paths are blocked

Skipping minors, downgrading, or involving pre-release versions can result in an incompatible state that the broker cannot safely reconcile. Blocking these paths prevents partial or irreversibly invalid migrations.

## Secondary storage (Elasticsearch or OpenSearch) schema manager

Secondary storage holds exported data. Starting with Camunda 8.8, schema upgrades are designed to be backward compatible, allowing older application nodes to continue writing to newer schemas.

### When version checks are available

| Capability                                                                              | Introduced in patches   |
| --------------------------------------------------------------------------------------- | ----------------------- |
| Store schema version metadata (no enforcement)                                          | 8.6.31 / 8.7.18 / 8.8.3 |
| Enforce compatibility rules (same matrix as broker, with tolerant skips for downgrades) | 8.8.3                   |

If you upgrade from an earlier patch that does **not** store schema version metadata, the schema manager treats it as an indeterminate case (assumed fresh install) and proceeds.

### Schema manager rules

The schema manager compares the stored schema version (the last successful schema upgrade) with the current application version:

| Case                        | Action        | Metadata updated?    | Notes                                         |
| --------------------------- | ------------- | -------------------- | --------------------------------------------- |
| Patch upgrade               | Update schema | Yes (to new version) |                                               |
| Minor upgrade (single step) | Update schema | Yes                  |                                               |
| Minor downgrade             | Skip          | No                   | Tolerated for rolling update restarts         |
| Patch downgrade             | Skip          | No                   | Avoids churn; schema stays forward compatible |
| Skipped minor (multi-step)  | Fail startup  | No                   | Prevents unsupported jump                     |
| Alpha build involved        | Fail startup  | No                   | Must use stable releases for upgrade path     |
| Major change                | Fail startup  | No                   | Not supported                                 |

### Where the schema version is stored

The schema version metadata is stored in a dedicated metadata index. For current versions, this appears as an index named:

```
operate-metadata-8.8.0_
```

Within that index, the document holding the current schema baseline uses the identifier:

```
id = "schema-version"
```

The document value reflects the last successfully applied version (for example, `8.8.3`).
This value is updated only after a successful schema upgrade.  
If the document or index is missing (for example, if you upgraded from an older patch that didn’t write it), the system treats the startup as a fresh baseline and writes it after initialization.

### Failure behavior

If the schema manager detects an incompatible path, it fails fast during application startup before modifying indices. Existing indices remain unchanged.

### Rolling updates and restarts

Because schema upgrades are backward compatible from 8.8 onward, a temporary mix of versions during a rolling update is safe. Older patch or minor nodes encountering a newer stored schema version skip schema changes automatically.

## Pre-release (alpha) builds

Alpha builds (`-alpha*`) are for evaluation and are **not** valid sources or targets for a supported production upgrade path.  
Always upgrade between stable releases.

## Recommended operational steps

1. Before upgrading to a new minor (for example, `8.7.x → 8.8.y`), update to the **latest patch** of your current minor (for example, `8.7.latest`) to ensure schema version metadata exists.
1. Avoid skipping minor versions; perform sequential minor upgrades.
1. Do not include pre-release builds in production upgrade chains.
1. Investigate any broker health status showing `brokerStatus: DOWN` after an upgrade. This typically indicates a rejected upgrade path.

## See also

- [Schema and data migration](./schema-and-migration.md)
