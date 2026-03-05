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

Defined in: [fp-ts.ts:24](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/fp-ts.ts#L24)
