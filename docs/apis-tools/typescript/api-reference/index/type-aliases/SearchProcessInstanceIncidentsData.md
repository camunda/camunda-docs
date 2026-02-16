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

Defined in: [gen/types.gen.ts:14071](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14071)

## Properties

### body?

```ts
optional body: IncidentSearchQuery;
```

Defined in: [gen/types.gen.ts:14072](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14072)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:14073](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14073)

#### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The assigned key of the process instance, which acts as a unique identifier for this process instance.

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:14079](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14079)

---

### url

```ts
url: "/process-instances/{processInstanceKey}/incidents/search";
```

Defined in: [gen/types.gen.ts:14080](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14080)
