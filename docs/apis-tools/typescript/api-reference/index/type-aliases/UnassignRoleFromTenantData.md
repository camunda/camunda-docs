---
title: "Type Alias: UnassignRoleFromTenantData"
sidebar_label: "UnassignRoleFromTenantData"
mdx:
  format: md
---

# Type Alias: UnassignRoleFromTenantData

```ts
type UnassignRoleFromTenantData = object;
```

Defined in: [gen/types.gen.ts:16183](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16183)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:16184](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16184)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:16185](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16185)

#### roleId

```ts
roleId: string;
```

The unique identifier of the role.

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

Defined in: [gen/types.gen.ts:16195](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16195)

---

### url

```ts
url: "/tenants/{tenantId}/roles/{roleId}";
```

Defined in: [gen/types.gen.ts:16196](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16196)
