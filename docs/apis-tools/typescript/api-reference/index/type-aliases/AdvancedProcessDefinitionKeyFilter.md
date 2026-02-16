---
title: "Type Alias: AdvancedProcessDefinitionKeyFilter"
sidebar_label: "AdvancedProcessDefinitionKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedProcessDefinitionKeyFilter

```ts
type AdvancedProcessDefinitionKeyFilter = object;
```

Defined in: [gen/types.gen.ts:4113](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4113)

Advanced filter

Advanced ProcessDefinitionKey filter.

## Properties

### $eq?

```ts
optional $eq: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:4117](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4117)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:4125](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4125)

Checks if the current property exists.

---

### $in?

```ts
optional $in: ProcessDefinitionKey[];
```

Defined in: [gen/types.gen.ts:4129](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4129)

Checks if the property matches any of the provided values.

---

### $neq?

```ts
optional $neq: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:4121](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4121)

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn: ProcessDefinitionKey[];
```

Defined in: [gen/types.gen.ts:4133](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4133)

Checks if the property matches none of the provided values.
