---
title: "Type Alias: GetDecisionRequirementsXmlData"
sidebar_label: "GetDecisionRequirementsXmlData"
mdx:
  format: md
---

# Type Alias: GetDecisionRequirementsXmlData

```ts
type GetDecisionRequirementsXmlData = object;
```

Defined in: [gen/types.gen.ts:10022](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L10022)

## Properties

### body?

```ts
optional body?: never;
```

Defined in: [gen/types.gen.ts:10023](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L10023)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:10024](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L10024)

#### decisionRequirementsKey

```ts
decisionRequirementsKey: DecisionRequirementsKey;
```

The assigned key of the decision requirements, which acts as a unique identifier for this decision.

---

### query?

```ts
optional query?: never;
```

Defined in: [gen/types.gen.ts:10030](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L10030)

---

### url

```ts
url: "/decision-requirements/{decisionRequirementsKey}/xml";
```

Defined in: [gen/types.gen.ts:10031](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L10031)
