---
title: "Type Alias: ProbeCreationRequest"
sidebar_label: "ProbeCreationRequest"
mdx:
  format: md
---

# Type Alias: ProbeCreationRequest

```ts
type ProbeCreationRequest = object;
```

## Properties

### input

```ts
input: string;
```

A FEEL expression that evaluates to a context: the question for the worker, whose shape
the worker of the probe ID defines. References to `camunda.vars` and
`camunda.secrets` follow the rules of input mappings.

---

### probeId

```ts
probeId: ProbeId;
```

The probe ID, as the worker registered it: 1 to 256 characters, without whitespace, and
not `*`. The engine matches it to the probe IDs of polling workers by exact equality.

---

### requestTimeout?

```ts
requestTimeout?: number;
```

How long to wait for an answer, in milliseconds, from 0 to 30000. With `0` or absent,
the cluster's request timeout is used, capped at 30000.

---

### tenantId?

```ts
tenantId?: TenantId;
```

The tenant of the probe. Required with multi-tenancy.
