---
title: "Type Alias: SignalBroadcastRequest"
sidebar_label: "SignalBroadcastRequest"
mdx:
  format: md
---

# Type Alias: SignalBroadcastRequest

```ts
type SignalBroadcastRequest = object;
```

Defined in: [gen/types.gen.ts:6491](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6491)

## Properties

### signalName

```ts
signalName: string;
```

Defined in: [gen/types.gen.ts:6495](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6495)

The name of the signal to broadcast.

---

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:6505](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6505)

The ID of the tenant that owns the signal.

---

### variables?

```ts
optional variables: object;
```

Defined in: [gen/types.gen.ts:6499](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6499)

The signal variables as a JSON object.

#### Index Signature

```ts
[key: string]: unknown
```
