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

Defined in: [gen/types.gen.ts:10505](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L10505)

## Properties

### body

```ts
body: SetVariableRequest;
```

Defined in: [gen/types.gen.ts:10506](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L10506)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:10507](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L10507)

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
optional query?: never;
```

Defined in: [gen/types.gen.ts:10516](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L10516)

---

### url

```ts
url: "/element-instances/{elementInstanceKey}/variables";
```

Defined in: [gen/types.gen.ts:10517](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L10517)
