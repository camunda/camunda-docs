---
title: "Type Alias: JobResultActivateElement"
sidebar_label: "JobResultActivateElement"
mdx:
  format: md
---

# Type Alias: JobResultActivateElement

```ts
type JobResultActivateElement = object;
```

Defined in: [gen/types.gen.ts:3860](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3860)

Instruction to activate a single BPMN element within an ad‑hoc sub‑process, optionally providing variables scoped to that element.

## Properties

### elementId?

```ts
optional elementId: ElementId;
```

Defined in: [gen/types.gen.ts:3864](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3864)

The element ID to activate.

---

### variables?

```ts
optional variables: object;
```

Defined in: [gen/types.gen.ts:3868](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3868)

Variables for the element.

#### Index Signature

```ts
[key: string]: unknown
```
