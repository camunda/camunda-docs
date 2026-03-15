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

Defined in: [gen/types.gen.ts:4502](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4502)

Instruction to activate a single BPMN element within an ad‑hoc sub‑process, optionally providing variables scoped to that element.

## Properties

### elementId?

```ts
optional elementId: ElementId;
```

Defined in: [gen/types.gen.ts:4506](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4506)

The element ID to activate.

***

### variables?

```ts
optional variables: 
  | {
[key: string]: unknown;
}
  | null;
```

Defined in: [gen/types.gen.ts:4510](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4510)

Variables for the element.
