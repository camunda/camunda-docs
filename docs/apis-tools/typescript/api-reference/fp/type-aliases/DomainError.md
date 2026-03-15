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

Defined in: [fp-ts.ts:24](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/fp-ts.ts#L24)
