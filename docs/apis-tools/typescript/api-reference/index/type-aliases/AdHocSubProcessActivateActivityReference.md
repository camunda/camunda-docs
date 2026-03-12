---
title: "Type Alias: AdHocSubProcessActivateActivityReference"
sidebar_label: "AdHocSubProcessActivateActivityReference"
mdx:
  format: md
---

# Type Alias: AdHocSubProcessActivateActivityReference

```ts
type AdHocSubProcessActivateActivityReference = object;
```

Defined in: [gen/types.gen.ts:2719](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2719)

## Properties

### elementId

```ts
elementId: ElementId;
```

Defined in: [gen/types.gen.ts:2723](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2723)

The ID of the element that should be activated.

***

### variables?

```ts
optional variables: object;
```

Defined in: [gen/types.gen.ts:2727](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2727)

Variables to be set when activating the element.

#### Index Signature

```ts
[key: string]: unknown
```
