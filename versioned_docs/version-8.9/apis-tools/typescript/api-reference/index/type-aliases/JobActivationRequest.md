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

## Properties

### fetchVariable?

```ts
optional fetchVariable?: string[];
```

A list of variables to fetch as the job variables; if empty, all visible variables at the time of activation for the scope of the job will be returned.

---

### maxJobsToActivate

```ts
maxJobsToActivate: number;
```

The maximum jobs to activate by this request.

---

### requestTimeout?

```ts
optional requestTimeout?: number;
```

The request will be completed when at least one job is activated or after the requestTimeout (in ms). If the requestTimeout = 0, a default timeout is used. If the requestTimeout < 0, long polling is disabled and the request is completed immediately, even when no job is activated.

---

### tenantFilter?

```ts
optional tenantFilter?: TenantFilterEnum;
```

The tenant filtering strategy - determines whether to use provided tenant IDs or assigned tenant IDs from the authenticated principal's authorized tenants.

---

### tenantIds?

```ts
optional tenantIds?: TenantId[];
```

A list of IDs of tenants for which to activate jobs.

---

### timeout

```ts
timeout: number;
```

A job returned after this call will not be activated by another call until the timeout (in ms) has been reached.

---

### type

```ts
type: string;
```

The job type, as defined in the BPMN process (e.g. <zeebe:taskDefinition type="payment-service" />)

---

### worker?

```ts
optional worker?: string;
```

The name of the worker activating the jobs, mostly used for logging purposes.
