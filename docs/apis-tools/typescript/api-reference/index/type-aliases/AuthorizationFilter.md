---
title: "Type Alias: AuthorizationFilter"
sidebar_label: "AuthorizationFilter"
mdx:
  format: md
---

# Type Alias: AuthorizationFilter

```ts
type AuthorizationFilter = object;
```

Defined in: [gen/types.gen.ts:602](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L602)

Authorization search filter.

## Properties

### ownerId?

```ts
optional ownerId: string;
```

Defined in: [gen/types.gen.ts:606](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L606)

The ID of the owner of permissions.

---

### ownerType?

```ts
optional ownerType: OwnerTypeEnum;
```

Defined in: [gen/types.gen.ts:607](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L607)

---

### resourceIds?

```ts
optional resourceIds: string[];
```

Defined in: [gen/types.gen.ts:611](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L611)

The IDs of the resource to search permissions for.

---

### resourcePropertyNames?

```ts
optional resourcePropertyNames: string[];
```

Defined in: [gen/types.gen.ts:615](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L615)

The names of the resource properties to search permissions for.

---

### resourceType?

```ts
optional resourceType: ResourceTypeEnum;
```

Defined in: [gen/types.gen.ts:619](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L619)

The type of resource to search permissions for.
