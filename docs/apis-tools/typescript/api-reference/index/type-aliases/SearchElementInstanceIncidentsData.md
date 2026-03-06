---
title: "Type Alias: SearchElementInstanceIncidentsData"
sidebar_label: "SearchElementInstanceIncidentsData"
mdx:
  format: md
---

# Type Alias: SearchElementInstanceIncidentsData

```ts
type SearchElementInstanceIncidentsData = object;
```

Defined in: [gen/types.gen.ts:10316](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10316)

## Properties

### body

```ts
body: IncidentSearchQuery;
```

Defined in: [gen/types.gen.ts:10317](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10317)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:10318](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10318)

#### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey;
```

The unique key of the element instance to search incidents for.

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:10324](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10324)

***

### url

```ts
url: "/element-instances/{elementInstanceKey}/incidents/search";
```

Defined in: [gen/types.gen.ts:10325](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10325)
