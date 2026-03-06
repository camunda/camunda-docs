---
title: "Type Alias: FailJobData"
sidebar_label: "FailJobData"
mdx:
  format: md
---

# Type Alias: FailJobData

```ts
type FailJobData = object;
```

Defined in: [gen/types.gen.ts:11855](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11855)

## Properties

### body?

```ts
optional body: JobFailRequest;
```

Defined in: [gen/types.gen.ts:11856](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11856)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:11857](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11857)

#### jobKey

```ts
jobKey: JobKey;
```

The key of the job to fail.

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:11863](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11863)

***

### url

```ts
url: "/jobs/{jobKey}/failure";
```

Defined in: [gen/types.gen.ts:11864](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11864)
