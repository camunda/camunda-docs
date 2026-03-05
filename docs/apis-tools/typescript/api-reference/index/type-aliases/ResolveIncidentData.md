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

Defined in: [gen/types.gen.ts:11514](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11514)

## Properties

### body?

```ts
optional body: IncidentResolutionRequest;
```

Defined in: [gen/types.gen.ts:11515](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11515)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:11516](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11516)

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

Defined in: [gen/types.gen.ts:11522](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11522)

***

### url

```ts
url: "/incidents/{incidentKey}/resolution";
```

Defined in: [gen/types.gen.ts:11523](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11523)
