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

Defined in: [gen/types.gen.ts:4434](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4434)

Instruction to activate a single BPMN element within an ad‑hoc sub‑process, optionally providing variables scoped to that element.

## Properties

### elementId?

```ts
optional elementId: ElementId;
```

Defined in: [gen/types.gen.ts:4438](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4438)

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

Defined in: [gen/types.gen.ts:4442](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4442)

Variables for the element.
