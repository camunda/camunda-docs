---
id: live-example-showcase
title: "Live example showcase"
sidebar_label: "Live example showcase"
sidebar_position: 11
mdx:
  format: md
---

# Live example showcase

:::caution Technical Preview
The PHP SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

With a disposable Camunda cluster already running, execute the six scenario
showcase and create its HTML proof report:

```sh
CAMUNDA_REST_ADDRESS=http://localhost:8080 \
CAMUNDA_AUTH_STRATEGY=NONE \
  make example-showcase
```

The showcase runs focused workflow scenarios for deployment, process lifecycle,
job workers, user tasks, incidents, message correlation, and management
operations. The report indexes every source-backed snippet alongside the live
scenario that demonstrates its API area. It intentionally performs mutations
and cluster-management requests; never run it against a shared, staging, or
production cluster.

Run one scenario with `make example-showcase SCENARIO=<name>`. Open
[`docs/example-validation.html`](https://github.com/camunda/orchestration-cluster-api-php/blob/main/docs/example-validation.html) after a run for
the six outcomes and a searchable gallery of all source-backed snippets.
