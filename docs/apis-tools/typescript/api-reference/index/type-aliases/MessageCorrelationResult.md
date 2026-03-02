---
title: "Type Alias: MessageCorrelationResult"
sidebar_label: "MessageCorrelationResult"
mdx:
  format: md
---

# Type Alias: MessageCorrelationResult

```ts
type MessageCorrelationResult = object;
```

Defined in: [gen/types.gen.ts:4662](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4662)

The message key of the correlated message, as well as the first process instance key it
correlated with.

## Properties

### messageKey?

```ts
optional messageKey: MessageKey;
```

Defined in: [gen/types.gen.ts:4670](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4670)

The key of the correlated message.

---

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:4674](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4674)

The key of the first process instance the message correlated with

---

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:4666](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4666)

The tenant ID of the correlated message
