---
id: error-handling
title: "Error handling"
sidebar_label: "Error handling"
sidebar_position: 15
mdx:
  format: md
---

# Error handling

:::caution Technical Preview
The Go SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

A server-side 4xx/5xx surfaces as a typed `*APIError` carrying the HTTP status
and response body; anything else is a transport-level error:

```go
_, err := client.GetTopology(ctx)
var apiErr *camunda.APIError
if errors.As(err, &apiErr) {
	// The server returned a 4xx/5xx — inspect the status and response body.
	fmt.Printf("API error: HTTP %d — %s\n", apiErr.Status, apiErr.Body)
} else if err != nil {
	// Transport-level failure (DNS, TLS, connection refused, ...).
	fmt.Println("request failed:", err)
}
```

Two helpers cover the common classifications without unwrapping by hand:

```go
key := openapi.MustProcessInstanceKey("2251799813685249")

_, err := client.GetProcessInstance(ctx, key)

// IsNotFound is the idiomatic 404 check — the common case when reading an
// entity that has not yet propagated to secondary storage.
if camunda.IsNotFound(err) {
	fmt.Println("not visible yet")
	return nil
}

// StatusCode reports the HTTP status for any server-side error, and
// ok == false for transport-level failures.
if status, ok := camunda.StatusCode(err); ok {
	fmt.Printf("server rejected the request: HTTP %d\n", status)
}
```

Errors are values throughout: use `errors.Is` for sentinels and `errors.As` for
typed errors. A function that cannot honour its contract returns an error rather
than a zero value or a best-guess default.
