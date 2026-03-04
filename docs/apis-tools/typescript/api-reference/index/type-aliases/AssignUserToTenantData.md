---
title: "Type Alias: AssignUserToTenantData"
sidebar_label: "AssignUserToTenantData"
mdx:
  format: md
---

# Type Alias: AssignUserToTenantData

```ts
type AssignUserToTenantData = object;
```

Defined in: [gen/types.gen.ts:16368](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16368)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:16369](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16369)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:16370](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16370)

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

Defined in: [gen/types.gen.ts:16380](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16380)

---

### url

```ts
url: "/tenants/{tenantId}/users/{username}";
```

Defined in: [gen/types.gen.ts:16381](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16381)
