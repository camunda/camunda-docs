---
title: "Type Alias: DeleteAuthorizationData"
sidebar_label: "DeleteAuthorizationData"
mdx:
  format: md
---

# Type Alias: DeleteAuthorizationData

```ts
type DeleteAuthorizationData = object;
```

Defined in: [gen/types.gen.ts:8062](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8062)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:8063](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8063)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:8064](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8064)

#### authorizationKey

```ts
authorizationKey: AuthorizationKey;
```

The key of the authorization to delete.

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:8070](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8070)

---

### url

```ts
url: "/authorizations/{authorizationKey}";
```

Defined in: [gen/types.gen.ts:8071](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8071)
