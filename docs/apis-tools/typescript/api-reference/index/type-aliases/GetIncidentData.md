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

Defined in: [gen/types.gen.ts:11468](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11468)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:11469](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11469)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:11470](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11470)

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

Defined in: [gen/types.gen.ts:11476](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11476)

***

### url

```ts
url: "/incidents/{incidentKey}";
```

Defined in: [gen/types.gen.ts:11477](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11477)
