---
title: "Class: CamundaGenericError"
sidebar_label: "CamundaGenericError"
mdx:
  format: md
---

# Class: CamundaGenericError

:::info Opt-In Subpath
The Effect API is an **opt-in subpath** (`@camunda8/orchestration-cluster-api/effect`) and requires the optional `effect` peer dependency. The main `.` entry stays Promise-based and pulls in zero Effect at runtime.
:::

Any other thrown value that does not map to a more specific tag.

## Extends

- `YieldableError`\<`this`\> & `object` & `Readonly`\<\{
  `cause?`: `unknown`;
  `message`: `string`;
  \}\>

## Constructors

### Constructor

```ts
new CamundaGenericError(args): CamundaGenericError;
```

#### Parameters

##### args

###### cause?

`unknown`

###### message

`string`

#### Returns

`CamundaGenericError`

#### Inherited from

```ts
Data.TaggedError('CamundaGenericError')<{
  readonly message: string;
  readonly cause?: unknown;
}>.constructor
```
