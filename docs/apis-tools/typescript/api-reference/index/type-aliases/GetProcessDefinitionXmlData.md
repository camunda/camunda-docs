---
title: "Type Alias: GetProcessDefinitionXmlData"
sidebar_label: "GetProcessDefinitionXmlData"
mdx:
  format: md
---

# Type Alias: GetProcessDefinitionXmlData

```ts
type GetProcessDefinitionXmlData = object;
```

Defined in: [gen/types.gen.ts:12667](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12667)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:12668](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12668)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:12669](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12669)

#### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

The assigned key of the process definition, which acts as a unique identifier for this process definition.

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:12676](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12676)

***

### url

```ts
url: "/process-definitions/{processDefinitionKey}/xml";
```

Defined in: [gen/types.gen.ts:12677](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12677)
