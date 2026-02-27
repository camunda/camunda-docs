---
title: "Type Alias: TenantCreateRequest"
sidebar_label: "TenantCreateRequest"
mdx:
  format: md
---

# Type Alias: TenantCreateRequest

```ts
type TenantCreateRequest = object;
```

Defined in: [gen/types.gen.ts:6552](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6552)

## Properties

### description?

```ts
optional description: string;
```

Defined in: [gen/types.gen.ts:6564](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6564)

The description of the tenant.

---

### name

```ts
name: string;
```

Defined in: [gen/types.gen.ts:6560](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6560)

The name of the tenant.

---

### tenantId

```ts
tenantId: string;
```

Defined in: [gen/types.gen.ts:6556](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6556)

The unique ID for the tenant. Must be 255 characters or less. Can contain letters, numbers, [`_`, `-`, `+`, `.`, `@`].
