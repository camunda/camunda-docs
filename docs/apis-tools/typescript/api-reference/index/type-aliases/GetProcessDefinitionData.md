---
title: "Type Alias: GetProcessDefinitionData"
sidebar_label: "GetProcessDefinitionData"
mdx:
  format: md
---

# Type Alias: GetProcessDefinitionData

```ts
type GetProcessDefinitionData = object;
```

Defined in: [gen/types.gen.ts:12718](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L12718)

## Properties

### body?

```ts
optional body?: never;
```

Defined in: [gen/types.gen.ts:12719](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L12719)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:12720](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L12720)

#### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

The assigned key of the process definition, which acts as a unique identifier for this process definition.

---

### query?

```ts
optional query?: never;
```

Defined in: [gen/types.gen.ts:12727](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L12727)

---

### url

```ts
url: "/process-definitions/{processDefinitionKey}";
```

Defined in: [gen/types.gen.ts:12728](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L12728)
