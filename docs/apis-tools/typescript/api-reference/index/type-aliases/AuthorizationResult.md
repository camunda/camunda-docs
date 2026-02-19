---
title: "Type Alias: AuthorizationResult"
sidebar_label: "AuthorizationResult"
mdx:
  format: md
---

# Type Alias: AuthorizationResult

```ts
type AuthorizationResult = object;
```

Defined in: [gen/types.gen.ts:622](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L622)

## Properties

### authorizationKey?

```ts
optional authorizationKey: AuthorizationKey;
```

Defined in: [gen/types.gen.ts:647](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L647)

The key of the authorization.

---

### ownerId?

```ts
optional ownerId: string;
```

Defined in: [gen/types.gen.ts:626](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L626)

The ID of the owner of permissions.

---

### ownerType?

```ts
optional ownerType: OwnerTypeEnum;
```

Defined in: [gen/types.gen.ts:627](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L627)

---

### permissionTypes?

```ts
optional permissionTypes: PermissionTypeEnum[];
```

Defined in: [gen/types.gen.ts:643](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L643)

Specifies the types of the permissions.

---

### resourceId?

```ts
optional resourceId: string;
```

Defined in: [gen/types.gen.ts:635](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L635)

ID of the resource the permission relates to (mutually exclusive with `resourcePropertyName`).

---

### resourcePropertyName?

```ts
optional resourcePropertyName: string;
```

Defined in: [gen/types.gen.ts:639](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L639)

The name of the resource property the permission relates to (mutually exclusive with `resourceId`).

---

### resourceType?

```ts
optional resourceType: ResourceTypeEnum;
```

Defined in: [gen/types.gen.ts:631](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L631)

The type of resource that the permissions relate to.
