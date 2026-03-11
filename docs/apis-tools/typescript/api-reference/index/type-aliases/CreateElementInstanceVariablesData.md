---
title: "Type Alias: CreateElementInstanceVariablesData"
sidebar_label: "CreateElementInstanceVariablesData"
mdx:
  format: md
---

# Type Alias: CreateElementInstanceVariablesData

```ts
type CreateElementInstanceVariablesData = object;
```

Defined in: [gen/types.gen.ts:10570](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10570)

## Properties

### body

```ts
body: SetVariableRequest;
```

Defined in: [gen/types.gen.ts:10571](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10571)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:10572](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10572)

#### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey;
```

The key of the element instance to update the variables for.
This can be the process instance key (as obtained during instance creation), or a given
element, such as a service task (see the `elementInstanceKey` on the job message).

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:10581](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10581)

---

### url

```ts
url: "/element-instances/{elementInstanceKey}/variables";
```

Defined in: [gen/types.gen.ts:10582](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10582)
