---
title: "Type Alias: JobActivationRequest"
sidebar_label: "JobActivationRequest"
mdx:
  format: md
---

# Type Alias: JobActivationRequest

```ts
type JobActivationRequest = object;
```

Defined in: [gen/types.gen.ts:3889](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3889)

## Properties

### fetchVariable?

```ts
optional fetchVariable: string[];
```

Defined in: [gen/types.gen.ts:3910](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3910)

A list of variables to fetch as the job variables; if empty, all visible variables at the time of activation for the scope of the job will be returned.

***

### maxJobsToActivate

```ts
maxJobsToActivate: number;
```

Defined in: [gen/types.gen.ts:3906](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3906)

The maximum jobs to activate by this request.

***

### requestTimeout?

```ts
optional requestTimeout: number;
```

Defined in: [gen/types.gen.ts:3915](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3915)

The request will be completed when at least one job is activated or after the requestTimeout (in ms). If the requestTimeout = 0, a default timeout is used. If the requestTimeout < 0, long polling is disabled and the request is completed immediately, even when no job is activated.

***

### tenantFilter?

```ts
optional tenantFilter: TenantFilterEnum;
```

Defined in: [gen/types.gen.ts:3924](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3924)

The tenant filtering strategy - determines whether to use provided tenant IDs or assigned tenant IDs from the authenticated principal's authorized tenants.

***

### tenantIds?

```ts
optional tenantIds: TenantId[];
```

Defined in: [gen/types.gen.ts:3919](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3919)

A list of IDs of tenants for which to activate jobs.

***

### timeout

```ts
timeout: number;
```

Defined in: [gen/types.gen.ts:3902](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3902)

A job returned after this call will not be activated by another call until the timeout (in ms) has been reached.

***

### type

```ts
type: string;
```

Defined in: [gen/types.gen.ts:3893](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3893)

The job type, as defined in the BPMN process (e.g. <zeebe:taskDefinition type="payment-service" />)

***

### worker?

```ts
optional worker: string;
```

Defined in: [gen/types.gen.ts:3897](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3897)

The name of the worker activating the jobs, mostly used for logging purposes.
