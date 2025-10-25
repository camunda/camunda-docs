---
id: version-compatibility
title: Version compatibility checks
description: "How Camunda 8 validates version compatibility during upgrades (broker and secondary storage)."
---

This page describes how Camunda 8 validates version compatibility when you upgrade a self-managed orchestration cluster. It covers:

- What is considered a compatible vs. incompatible upgrade path
- How the **broker** enforces version rules
- How the **secondary storage management** performs the same checks

## Semantic version basics

Camunda 8 versions follow `MAJOR.MINOR.PATCH` (for example, `8.8.3`). In early access builds an alpha pre-release suffix (for example, `8.8.0-alpha1`) may appear.

- **Major**: no cross-major upgrades/downgrades supported directly.
- **Minor**: Feature releases (you may only move one minor step at a time: `8.7.x → 8.8.y`).
- **Patch**: Bug/security fixes (you can move forward within the same minor: `8.8.1 → 8.8.3`).
- **Pre-release (alpha)**: Builds tagged with `-alpha*` are not valid endpoints for a supported production upgrade path.

## Supported upgrade paths

| Scenario                            | Example               | Compatibility                                              |
| ----------------------------------- | --------------------- | ---------------------------------------------------------- |
| Patch upgrade                       | 8.8.1 → 8.8.3         | Compatible                                                 |
| Minor upgrade (single step)         | 8.7.5 → 8.8.3         | Compatible                                                 |
| Minor upgrade (skipping a minor)    | 8.6.9 → 8.8.3         | Incompatible                                               |
| Patch downgrade                     | 8.8.3 → 8.8.1         | Incompatible (broker); secondary storage skips (see below) |
| Minor downgrade                     | 8.8.3 → 8.7.5         | Incompatible (broker); secondary storage skips (see below) |
| Major change (upgrade or downgrade) | 8.x ↔ 9.x            | Incompatible                                               |
| Alpha build involved                | 8.8.0-alpha1 ↔ 8.8.0 | Incompatible                                               |

## Broker behavior

The broker validates the previous persisted version against the new binary version during startup:

- Compatible: Proceeds with state (DB) migration if required (skipped for pure restarts or no-op).
- Incompatible: The broker starts but marks itself unhealthy and does not apply any state/data migration. Check the startup logs, fix the unsupported upgrade path, then restart.

### Why incompatible paths are blocked

Skipping minors, downgrading, or involving pre-release versions can lead to state shape differences the broker cannot safely reconcile. Blocking prevents partial or irreversibly invalid state migrations.

## Secondary storage (Elasticsearch/OpenSearch) schema manager

Secondary storage holds exported data. Beginning with Camunda 8.8, schema upgrades are designed to be backward compatible—older application nodes can still write to a newer schema version.

### When are version checks available?

| Capability                                                                                  | Introduced in patches   |
| ------------------------------------------------------------------------------------------- | ----------------------- |
| Store schema version metadata (no enforcement)                                              | 8.6.30 / 8.7.17 / 8.8.3 |
| Enforce compatibility rules (same matrix as broker, but with tolerant skips for downgrades) | 8.8.3                   |

If you upgrade from an earlier patch that does **not** store the schema version metadata, the schema manager treats the situation as an indeterminate case (assumes a fresh install) and proceeds.

### Schema manager rules

The schema manager compares the stored "schema version" (representing the last successful schema upgrade) with the current application version:

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

The schema version metadata is stored in a dedicated metadata index. For current versions this appears as an index named like:

```
operate-metadata-8.8.0_
```

Within that index, the document holding the current schema baseline uses the identifier:

```
id = "schema-version"
```

The document value is the last successfully applied application version (for example `8.8.3`). This value is only updated after a successful schema upgrade. If the document or index is missing (because you upgraded from an older patch that did not yet write it), the system treats the startup as a fresh baseline and writes it after initialization.

### Failure behavior

If the schema manager detects an incompatible path it fails fast during application startup **before** modifying indices. Existing indices remain unchanged.

### Rolling updates & restarts

Because schema upgrades are backward compatible from 8.8 onward, a temporary mix of versions during a rolling update is safe. Older patch/minor nodes encountering a newer stored schema version simply skip changes.

## Pre-release (alpha) builds

Alpha builds (`-alpha*`) are for evaluation and are **not** valid sources or targets for a supported production upgrade chain. Always upgrade between stable releases.

## Recommended operational steps

1. Before moving to a new minor (e.g. `8.7.x → 8.8.y`), first update to the **latest patch** of your current minor (e.g. `8.7.latest`). This ensures the schema version metadata exists.
2. Avoid skipping minor versions; perform sequential minor upgrades.
3. Do not use pre-release builds in a production upgrade chain.
4. Investigate any broker health showing `brokerStatus: DOWN` after upgrade—likely a rejected path.

## See also

- [Schema and data migration](./schema-and-migration.md)
