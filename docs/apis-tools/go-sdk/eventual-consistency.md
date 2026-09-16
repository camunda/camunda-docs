---
id: eventual-consistency
title: "Eventual consistency"
sidebar_label: "Eventual consistency"
sidebar_position: 13
mdx:
  format: md
---

# Eventual consistency

:::caution Technical Preview
The Go SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

Reads are served from the cluster's secondary storage and are eventually
consistent. `Poll` retries a read (by default while it returns 404) until the
entity is visible or a timeout elapses:

```go
// Reads are eventually consistent: a just-created entity may briefly 404.
// Poll retries 404s until the entity is visible or the timeout elapses.
key := openapi.MustProcessInstanceKey("2251799813685249")

instance, err := camunda.Poll(ctx, func(ctx context.Context) (*openapi.ProcessInstanceResult, error) {
	return client.GetProcessInstance(ctx, key)
}, camunda.WithPollTimeout(10*time.Second))
if err != nil {
	return err
}
fmt.Printf("instance state: %v\n", instance.GetState())
```
