---
title: "Type Alias: IncidentProcessInstanceStatisticsByErrorResult"
sidebar_label: "IncidentProcessInstanceStatisticsByErrorResult"
mdx:
  format: md
---

# Type Alias: IncidentProcessInstanceStatisticsByErrorResult

```ts
type IncidentProcessInstanceStatisticsByErrorResult = object;
```

Defined in: [gen/types.gen.ts:3224](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3224)

## Properties

### activeInstancesWithErrorCount?

```ts
optional activeInstancesWithErrorCount: number;
```

Defined in: [gen/types.gen.ts:3237](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3237)

The number of active process instances that currently have an active incident with this error.

---

### errorHashCode?

```ts
optional errorHashCode: number;
```

Defined in: [gen/types.gen.ts:3228](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3228)

The hash code identifying a specific incident error..

---

### errorMessage?

```ts
optional errorMessage: string;
```

Defined in: [gen/types.gen.ts:3232](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3232)

The error message associated with the incident error hash code.
