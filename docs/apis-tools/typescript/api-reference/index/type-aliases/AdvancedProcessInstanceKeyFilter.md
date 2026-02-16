---
title: "Type Alias: AdvancedProcessInstanceKeyFilter"
sidebar_label: "AdvancedProcessInstanceKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedProcessInstanceKeyFilter

```ts
type AdvancedProcessInstanceKeyFilter = object;
```

Defined in: [gen/types.gen.ts:4146](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4146)

Advanced filter

Advanced ProcessInstanceKey filter.

## Properties

### $eq?

```ts
optional $eq: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:4150](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4150)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:4158](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4158)

Checks if the current property exists.

---

### $in?

```ts
optional $in: ProcessInstanceKey[];
```

Defined in: [gen/types.gen.ts:4162](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4162)

Checks if the property matches any of the provided values.

---

### $neq?

```ts
optional $neq: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:4154](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4154)

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn: ProcessInstanceKey[];
```

Defined in: [gen/types.gen.ts:4166](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4166)

Checks if the property matches none of the provided values.
