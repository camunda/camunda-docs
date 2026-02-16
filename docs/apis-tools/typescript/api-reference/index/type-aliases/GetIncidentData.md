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

Defined in: [gen/types.gen.ts:11455](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11455)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:11456](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11456)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:11457](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11457)

#### incidentKey

```ts
incidentKey: IncidentKey;
```

The assigned key of the incident, which acts as a unique identifier for this incident.

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:11463](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11463)

---

### url

```ts
url: "/incidents/{incidentKey}";
```

Defined in: [gen/types.gen.ts:11464](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11464)
