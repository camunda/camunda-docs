---
title: "Type Alias: ResolveProcessInstanceIncidentsData"
sidebar_label: "ResolveProcessInstanceIncidentsData"
mdx:
  format: md
---

# Type Alias: ResolveProcessInstanceIncidentsData

```ts
type ResolveProcessInstanceIncidentsData = object;
```

Defined in: [gen/types.gen.ts:14024](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14024)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:14025](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14025)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:14026](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14026)

#### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The key of the process instance to resolve incidents for.

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:14032](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14032)

---

### url

```ts
url: "/process-instances/{processInstanceKey}/incident-resolution";
```

Defined in: [gen/types.gen.ts:14033](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14033)
