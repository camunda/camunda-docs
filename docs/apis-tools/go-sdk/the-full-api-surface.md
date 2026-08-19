---
id: the-full-api-surface
title: "The full API surface"
sidebar_label: "The full API surface"
sidebar_position: 17
mdx:
  format: md
---

# The full API surface

:::caution Technical Preview
The Go SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

`CamundaClient` exposes one ergonomic method per operation in the OpenAPI
specification, generated from the same spec as the low-level client so the two
can never diverge. Each facade method flattens the generated builder into
first-class parameters and returns the deserialized result.

When you need something the facade deliberately does not model — multipart
uploads, unusual query-parameter combinations, or the raw `*http.Response` —
`Raw()` hands you the generated client directly:

```go
// Raw() exposes the generated client: every operation, with the full builder
// surface. Use it for anything the facade does not cover, and for access to
// the raw *http.Response.
result, resp, err := client.Raw().ProcessDefinitionAPI.
	SearchProcessDefinitions(ctx).
	Execute()
if err != nil {
	return err
}
fmt.Printf("HTTP %d — %d process definition(s)\n", resp.StatusCode, len(result.GetItems()))
```

Requests made through `Raw()` still traverse the full runtime — backpressure,
retry, and authentication all apply, because those are `http.RoundTripper` layers
on the transport rather than facade-level wrappers.

Full API documentation is published on
[pkg.go.dev](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go).
