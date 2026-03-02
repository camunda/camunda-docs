---
title: "Type Alias: AuthorizationIdBasedRequest"
sidebar_label: "AuthorizationIdBasedRequest"
mdx:
  format: md
---

# Type Alias: AuthorizationIdBasedRequest

```ts
type AuthorizationIdBasedRequest = object;
```

Defined in: [gen/types.gen.ts:533](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L533)

## Properties

### ownerId

```ts
ownerId: string;
```

Defined in: [gen/types.gen.ts:537](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L537)

The ID of the owner of the permissions.

---

### ownerType

```ts
ownerType: OwnerTypeEnum;
```

Defined in: [gen/types.gen.ts:538](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L538)

---

### permissionTypes

```ts
permissionTypes: PermissionTypeEnum[];
```

Defined in: [gen/types.gen.ts:550](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L550)

The permission types to add.

---

### resourceId

```ts
resourceId: string;
```

Defined in: [gen/types.gen.ts:542](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L542)

The ID of the resource to add permissions to.

---

### resourceType

```ts
resourceType: ResourceTypeEnum;
```

Defined in: [gen/types.gen.ts:546](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L546)

The type of resource to add permissions to.
