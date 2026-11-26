---
title: "Type Alias: ActivatedProbeResult"
sidebar_label: "ActivatedProbeResult"
mdx:
  format: md
---

# Type Alias: ActivatedProbeResult

```ts
type ActivatedProbeResult = object;
```

## Properties

### deadline

```ts
deadline: number;
```

The deadline of the probe, as a UNIX epoch timestamp in milliseconds. An answer after
it gets 404.

---

### input

```ts
input: object;
```

The evaluated input, with the values of its secrets injected.

#### Index Signature

```ts
[key: string]: unknown
```

---

### physicalTenantId

```ts
physicalTenantId: string;
```

The ID of the physical tenant that the activation request was routed to;
the default physical tenant when the request did not specify one.

---

### probeId

```ts
probeId: ProbeId;
```

The probe ID, to pick the handler when the worker polls several probe IDs.

---

### probeKey

```ts
probeKey: ProbeKey;
```

The key to answer the probe with.

---

### secretPointers

```ts
secretPointers: string[];
```

The JSON pointers (RFC 6901) of the `input` values into which the engine injected a
secret value; empty when none. Remove these values from logs and error messages.

---

### tenantId

```ts
tenantId: TenantId;
```

The ID of the tenant of the probe.

---

### worker

```ts
worker: string;
```

The name of the worker that collected the probe.
