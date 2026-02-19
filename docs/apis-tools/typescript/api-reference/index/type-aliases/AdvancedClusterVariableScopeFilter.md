---
title: "Type Alias: AdvancedClusterVariableScopeFilter"
sidebar_label: "AdvancedClusterVariableScopeFilter"
mdx:
  format: md
---

# Type Alias: AdvancedClusterVariableScopeFilter

```ts
type AdvancedClusterVariableScopeFilter = object;
```

Defined in: [gen/types.gen.ts:1230](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1230)

Advanced filter

Advanced ClusterVariableScopeEnum filter.

## Properties

### $eq?

```ts
optional $eq: ClusterVariableScopeEnum;
```

Defined in: [gen/types.gen.ts:1234](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1234)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:1242](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1242)

Checks if the current property exists.

---

### $in?

```ts
optional $in: ClusterVariableScopeEnum[];
```

Defined in: [gen/types.gen.ts:1246](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1246)

Checks if the property matches any of the provided values.

---

### $like?

```ts
optional $like: LikeFilter;
```

Defined in: [gen/types.gen.ts:1247](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1247)

---

### $neq?

```ts
optional $neq: ClusterVariableScopeEnum;
```

Defined in: [gen/types.gen.ts:1238](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1238)

Checks for inequality with the provided value.
