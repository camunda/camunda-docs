---
title: "Type Alias: AdvancedVariableKeyFilter"
sidebar_label: "AdvancedVariableKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedVariableKeyFilter

```ts
type AdvancedVariableKeyFilter = object;
```

Defined in: [gen/types.gen.ts:4311](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4311)

Advanced filter

Advanced VariableKey filter.

## Properties

### $eq?

```ts
optional $eq: VariableKey;
```

Defined in: [gen/types.gen.ts:4315](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4315)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:4323](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4323)

Checks if the current property exists.

---

### $in?

```ts
optional $in: VariableKey[];
```

Defined in: [gen/types.gen.ts:4327](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4327)

Checks if the property matches any of the provided values.

---

### $neq?

```ts
optional $neq: VariableKey;
```

Defined in: [gen/types.gen.ts:4319](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4319)

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn: VariableKey[];
```

Defined in: [gen/types.gen.ts:4331](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4331)

Checks if the property matches none of the provided values.
