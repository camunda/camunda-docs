---
title: "Type Alias: UnassignUserFromTenantData"
sidebar_label: "UnassignUserFromTenantData"
mdx:
  format: md
---

# Type Alias: UnassignUserFromTenantData

```ts
type UnassignUserFromTenantData = object;
```

Defined in: [gen/types.gen.ts:16317](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16317)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:16318](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16318)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:16319](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16319)

#### tenantId

```ts
tenantId: TenantId;
```

The unique identifier of the tenant.

#### username

```ts
username: Username;
```

The unique identifier of the user.

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:16329](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16329)

---

### url

```ts
url: "/tenants/{tenantId}/users/{username}";
```

Defined in: [gen/types.gen.ts:16330](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16330)
