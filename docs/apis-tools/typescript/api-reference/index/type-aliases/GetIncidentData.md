---
title: "Type Alias: GetIncidentData"
sidebar_label: "GetIncidentData"
mdx:
  format: md
---

# Type Alias: GetIncidentData

```ts
type GetIncidentData = object;
```

Defined in: [gen/types.gen.ts:11582](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L11582)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:11583](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L11583)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:11584](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L11584)

#### incidentKey

```ts
incidentKey: IncidentKey;
```

The assigned key of the incident, which acts as a unique identifier for this incident.

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:11590](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L11590)

***

### url

```ts
url: "/incidents/{incidentKey}";
```

Defined in: [gen/types.gen.ts:11591](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L11591)
