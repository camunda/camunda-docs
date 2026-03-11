---
title: "Type Alias: AssignGroupToTenantData"
sidebar_label: "AssignGroupToTenantData"
mdx:
  format: md
---

# Type Alias: AssignGroupToTenantData

```ts
type AssignGroupToTenantData = object;
```

Defined in: [gen/types.gen.ts:15988](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15988)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:15989](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15989)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:15990](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15990)

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

Defined in: [gen/types.gen.ts:16000](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16000)

---

### url

```ts
url: "/tenants/{tenantId}/groups/{groupId}";
```

Defined in: [gen/types.gen.ts:16001](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16001)
