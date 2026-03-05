---
title: "Type Alias: UnassignRoleFromUserData"
sidebar_label: "UnassignRoleFromUserData"
mdx:
  format: md
---

# Type Alias: UnassignRoleFromUserData

```ts
type UnassignRoleFromUserData = object;
```

Defined in: [gen/types.gen.ts:15267](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15267)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:15268](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15268)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:15269](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15269)

#### roleId

```ts
roleId: string;
```

The role ID.

#### username

```ts
username: Username;
```

The user username.

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:15279](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15279)

---

### url

```ts
url: "/roles/{roleId}/users/{username}";
```

Defined in: [gen/types.gen.ts:15280](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15280)
