---
id: semantic-keys
title: "Semantic keys"
sidebar_label: "Semantic keys"
sidebar_position: 14
mdx:
  format: md
---

# Semantic keys

:::caution Technical Preview
The Go SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

Identifier types (`JobKey`, `ProcessInstanceKey`, …) are validated named string
types rather than bare strings:

```go
// Semantic key types validate their format at construction.
key, err := openapi.NewJobKey("2251799813685424") // validates pattern & length
if err != nil {
	return err
}
fmt.Println(key.String())

// Side-load a key you already trust, without validation:
loose := openapi.MustJobKey("2251799813685424")
_ = loose
```
