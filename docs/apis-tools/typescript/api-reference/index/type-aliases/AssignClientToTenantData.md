---
title: "Type Alias: AssignClientToTenantData"
sidebar_label: "AssignClientToTenantData"
mdx:
  format: md
---

# Type Alias: AssignClientToTenantData

```ts
type AssignClientToTenantData = object;
```

Defined in: [gen/types.gen.ts:15854](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15854)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:15855](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15855)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:15856](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15856)

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

Defined in: [gen/types.gen.ts:15866](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15866)

---

### url

```ts
url: "/tenants/{tenantId}/clients/{clientId}";
```

Defined in: [gen/types.gen.ts:15867](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15867)
