---
title: "Type Alias: UnassignClientFromTenantData"
sidebar_label: "UnassignClientFromTenantData"
mdx:
  format: md
---

# Type Alias: UnassignClientFromTenantData

```ts
type UnassignClientFromTenantData = object;
```

Defined in: [gen/types.gen.ts:15803](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15803)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:15804](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15804)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:15805](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15805)

#### clientId

```ts
clientId: string;
```

The unique identifier of the application.

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

Defined in: [gen/types.gen.ts:15815](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15815)

---

### url

```ts
url: "/tenants/{tenantId}/clients/{clientId}";
```

Defined in: [gen/types.gen.ts:15816](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15816)
