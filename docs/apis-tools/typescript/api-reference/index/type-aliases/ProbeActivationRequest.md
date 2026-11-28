---
title: "Type Alias: ProbeActivationRequest"
sidebar_label: "ProbeActivationRequest"
mdx:
  format: md
---

# Type Alias: ProbeActivationRequest

```ts
type ProbeActivationRequest = object;
```

## Properties

### maxProbesToActivate

```ts
maxProbesToActivate: number;
```

The maximum number of probes to collect with this request, at least 1.

---

### probeIds

```ts
probeIds: ProbeId[];
```

The probe IDs to collect probes for: 1 to 100 distinct values, each 1 to 256
characters, without whitespace, and not `*`. Probe IDs on which the caller lacks the
`ANSWER` permission are skipped.

---

### requestTimeout?

```ts
requestTimeout?: number;
```

How long to hold the request until a probe is collected, in milliseconds. With `0` or
absent, the cluster's long polling timeout is used. With a value below `0`, long
polling is off and the request returns at once, also when it collected no probe.

---

### tenantFilter?

```ts
tenantFilter?: TenantFilterEnum;
```

The tenant filtering strategy - determines whether to use provided tenant IDs or assigned tenant IDs from the authenticated principal's authorized tenants.

---

### tenantIds?

```ts
tenantIds?: TenantId[];
```

A list of IDs of tenants for which to collect probes.

---

### worker?

```ts
worker?: string;
```

The name of the worker, returned to the client in the answer.
