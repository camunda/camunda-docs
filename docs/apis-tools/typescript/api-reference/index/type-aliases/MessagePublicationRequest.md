---
title: "Type Alias: MessagePublicationRequest"
sidebar_label: "MessagePublicationRequest"
mdx:
  format: md
---

# Type Alias: MessagePublicationRequest

```ts
type MessagePublicationRequest = object;
```

Defined in: [gen/types.gen.ts:4677](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4677)

## Properties

### correlationKey?

```ts
optional correlationKey: string;
```

Defined in: [gen/types.gen.ts:4685](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4685)

The correlation key of the message.

---

### messageId?

```ts
optional messageId: string;
```

Defined in: [gen/types.gen.ts:4695](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4695)

The unique ID of the message. This is used to ensure only one message with the given ID
will be published during the lifetime of the message (if `timeToLive` is set).

---

### name

```ts
name: string;
```

Defined in: [gen/types.gen.ts:4681](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4681)

The name of the message.

---

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:4705](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4705)

The tenant of the message sender.

---

### timeToLive?

```ts
optional timeToLive: number;
```

Defined in: [gen/types.gen.ts:4689](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4689)

Timespan (in ms) to buffer the message on the broker.

---

### variables?

```ts
optional variables: object;
```

Defined in: [gen/types.gen.ts:4699](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4699)

The message variables as JSON document.

#### Index Signature

```ts
[key: string]: unknown
```
