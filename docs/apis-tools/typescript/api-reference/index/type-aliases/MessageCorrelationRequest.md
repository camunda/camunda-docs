---
title: "Type Alias: MessageCorrelationRequest"
sidebar_label: "MessageCorrelationRequest"
mdx:
  format: md
---

# Type Alias: MessageCorrelationRequest

```ts
type MessageCorrelationRequest = object;
```

Defined in: [gen/types.gen.ts:4635](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4635)

## Properties

### correlationKey?

```ts
optional correlationKey: string;
```

Defined in: [gen/types.gen.ts:4644](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4644)

The correlation key of the message.

---

### name

```ts
name: string;
```

Defined in: [gen/types.gen.ts:4640](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4640)

The message name as defined in the BPMN process

---

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:4654](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4654)

the tenant for which the message is published

---

### variables?

```ts
optional variables: object;
```

Defined in: [gen/types.gen.ts:4648](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4648)

The message variables as JSON document

#### Index Signature

```ts
[key: string]: unknown
```
