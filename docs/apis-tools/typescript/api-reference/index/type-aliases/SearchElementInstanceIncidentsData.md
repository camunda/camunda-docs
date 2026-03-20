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

Defined in: [gen/types.gen.ts:10478](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10478)

## Properties

### body

```ts
body: IncidentSearchQuery;
```

Defined in: [gen/types.gen.ts:10479](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10479)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:10480](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10480)

#### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey;
```

The unique key of the element instance to search incidents for.

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:10486](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10486)

---

### url

```ts
url: "/element-instances/{elementInstanceKey}/incidents/search";
```

Defined in: [gen/types.gen.ts:10487](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10487)
