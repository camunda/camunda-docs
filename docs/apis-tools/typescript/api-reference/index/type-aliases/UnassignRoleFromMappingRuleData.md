---
title: "Type Alias: UnassignRoleFromMappingRuleData"
sidebar_label: "UnassignRoleFromMappingRuleData"
mdx:
  format: md
---

# Type Alias: UnassignRoleFromMappingRuleData

```ts
type UnassignRoleFromMappingRuleData = object;
```

Defined in: [gen/types.gen.ts:15104](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15104)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:15105](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15105)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:15106](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15106)

#### mappingRuleId

```ts
mappingRuleId: string;
```

The mapping rule ID.

#### roleId

```ts
roleId: string;
```

The role ID.

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:15116](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15116)

---

### url

```ts
url: "/roles/{roleId}/mapping-rules/{mappingRuleId}";
```

Defined in: [gen/types.gen.ts:15117](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15117)
