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
