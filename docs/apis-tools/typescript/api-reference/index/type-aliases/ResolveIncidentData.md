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

Defined in: [gen/types.gen.ts:11542](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11542)

## Properties

### body?

```ts
optional body: IncidentResolutionRequest;
```

Defined in: [gen/types.gen.ts:11543](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11543)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:11544](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11544)

#### incidentKey

```ts
incidentKey: IncidentKey;
```

Key of the incident to resolve.

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:11550](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11550)

---

### url

```ts
url: "/incidents/{incidentKey}/resolution";
```

Defined in: [gen/types.gen.ts:11551](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11551)
