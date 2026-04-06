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

Defined in: [gen/types.gen.ts:4752](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4752)

Advanced filter

Advanced ProcessDefinitionKey filter.

## Properties

### $eq?

```ts
optional $eq?: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:4756](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4756)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists?: boolean;
```

Defined in: [gen/types.gen.ts:4764](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4764)

Checks if the current property exists.

---

### $in?

```ts
optional $in?: ProcessDefinitionKey[];
```

Defined in: [gen/types.gen.ts:4768](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4768)

Checks if the property matches any of the provided values.

---

### $neq?

```ts
optional $neq?: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:4760](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4760)

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn?: ProcessDefinitionKey[];
```

Defined in: [gen/types.gen.ts:4772](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4772)

Checks if the property matches none of the provided values.
