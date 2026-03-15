---
title: "Type Alias: ResolveIncidentData"
sidebar_label: "ResolveIncidentData"
mdx:
  format: md
---

# Type Alias: ResolveIncidentData

```ts
type ResolveIncidentData = object;
```

Defined in: [gen/types.gen.ts:11628](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L11628)

## Properties

### body?

```ts
optional body: IncidentResolutionRequest;
```

Defined in: [gen/types.gen.ts:11629](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L11629)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:11630](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L11630)

#### incidentKey

```ts
incidentKey: IncidentKey;
```

Key of the incident to resolve.

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:11636](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L11636)

***

### url

```ts
url: "/incidents/{incidentKey}/resolution";
```

Defined in: [gen/types.gen.ts:11637](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L11637)
