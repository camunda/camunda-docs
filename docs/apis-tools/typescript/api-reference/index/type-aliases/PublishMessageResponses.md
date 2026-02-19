---
title: "Type Alias: PublishMessageResponses"
sidebar_label: "PublishMessageResponses"
mdx:
  format: md
---

# Type Alias: PublishMessageResponses

```ts
type PublishMessageResponses = object;
```

Defined in: [gen/types.gen.ts:12624](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12624)

## Properties

### 200

```ts
200: object;
```

Defined in: [gen/types.gen.ts:12628](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12628)

The message key of the published message.

#### messageKey?

```ts
optional messageKey: MessageKey;
```

The key of the published message.

#### tenantId?

```ts
optional tenantId: TenantId;
```

The tenant ID of the message.
