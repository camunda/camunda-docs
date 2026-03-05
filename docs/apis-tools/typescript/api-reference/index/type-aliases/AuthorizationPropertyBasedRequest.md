---
title: "Type Alias: AuthorizationPropertyBasedRequest"
sidebar_label: "AuthorizationPropertyBasedRequest"
mdx:
  format: md
---

# Type Alias: AuthorizationPropertyBasedRequest

```ts
type AuthorizationPropertyBasedRequest = object;
```

Defined in: [gen/types.gen.ts:553](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L553)

## Properties

### ownerId

```ts
ownerId: string;
```

Defined in: [gen/types.gen.ts:557](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L557)

The ID of the owner of the permissions.

---

### ownerType

```ts
ownerType: OwnerTypeEnum;
```

Defined in: [gen/types.gen.ts:558](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L558)

---

### permissionTypes

```ts
permissionTypes: PermissionTypeEnum[];
```

Defined in: [gen/types.gen.ts:570](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L570)

The permission types to add.

---

### resourcePropertyName

```ts
resourcePropertyName: string;
```

Defined in: [gen/types.gen.ts:562](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L562)

The name of the resource property on which this authorization is based.

---

### resourceType

```ts
resourceType: ResourceTypeEnum;
```

Defined in: [gen/types.gen.ts:566](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L566)

The type of resource to add permissions to.
