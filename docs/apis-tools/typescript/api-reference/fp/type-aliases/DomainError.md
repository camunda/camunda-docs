---
title: "Type Alias: DomainError"
sidebar_label: "DomainError"
mdx:
  format: md
---

# Type Alias: DomainError

:::caution Technical Preview
The Functional Programming API is a **technical preview**. Its surface may change in future releases without following semver.
:::

```ts
type DomainError =
  | CamundaValidationError
  | EventualConsistencyTimeoutError
  | HttpError
  | Error;
```

Defined in: [fp-ts.ts:24](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/fp-ts.ts#L24)
