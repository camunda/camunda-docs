---
id: quick-start
title: "Quick start"
sidebar_label: "Quick start"
sidebar_position: 3
mdx:
  format: md
---

# Quick start

:::caution Technical Preview
The Go SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

Construct a client (configuration comes from `CAMUNDA_*` environment variables)
and call an ergonomic facade method:

```go
// Configuration is resolved from CAMUNDA_* environment variables (with ZEEBE_*
// fallbacks) and validated fail-fast at construction.
client, err := camunda.New()
if err != nil {
	return err
}

ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
defer cancel()

topology, err := client.GetTopology(ctx)
if err != nil {
	return err
}
fmt.Printf("Camunda 8 %s — %d broker(s), %d partition(s)\n",
	topology.GetGatewayVersion(), len(topology.GetBrokers()), topology.GetPartitionsCount())
```

For production-shaped, runnable workflows, see the
[advanced examples](https://github.com/camunda/orchestration-cluster-api-go/blob/main/examples/advanced/README.md): bounded load with adaptive
backpressure, resilient job handling, and idempotent message correlation.
