---
title: "Type Alias: UnassignGroupFromTenantData"
sidebar_label: "UnassignGroupFromTenantData"
mdx:
  format: md
---

# Type Alias: UnassignGroupFromTenantData

```ts
type UnassignGroupFromTenantData = object;
```

Defined in: [gen/types.gen.ts:15937](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15937)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:15938](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15938)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:15939](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15939)

#### groupId

```ts
groupId: string;
```

The unique identifier of the group.

#### tenantId

```ts
tenantId: TenantId;
```

The unique identifier of the tenant.

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:15949](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15949)

---

### url

```ts
url: "/tenants/{tenantId}/groups/{groupId}";
```

Defined in: [gen/types.gen.ts:15950](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15950)
