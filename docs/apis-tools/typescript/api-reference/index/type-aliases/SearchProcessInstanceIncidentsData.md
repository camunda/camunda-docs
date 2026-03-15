---
title: "Type Alias: SearchProcessInstanceIncidentsData"
sidebar_label: "SearchProcessInstanceIncidentsData"
mdx:
  format: md
---

# Type Alias: SearchProcessInstanceIncidentsData

```ts
type SearchProcessInstanceIncidentsData = object;
```

Defined in: [gen/types.gen.ts:13414](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L13414)

## Properties

### body?

```ts
optional body: IncidentSearchQuery;
```

Defined in: [gen/types.gen.ts:13415](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L13415)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:13416](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L13416)

#### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The assigned key of the process instance, which acts as a unique identifier for this process instance.

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:13422](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L13422)

***

### url

```ts
url: "/process-instances/{processInstanceKey}/incidents/search";
```

Defined in: [gen/types.gen.ts:13423](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L13423)
