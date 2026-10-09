---
title: "Class: RetryableJobError"
sidebar_label: "RetryableJobError"
mdx:
  format: md
---

# Class: RetryableJobError

:::info Opt-In Subpath
The Effect API is an **opt-in subpath** (`@camunda8/orchestration-cluster-api/effect`) and requires the optional `effect` peer dependency. The main `.` entry stays Promise-based and pulls in zero Effect at runtime.
:::

A retryable job failure: the handler could not complete the job now, but a later
activation might succeed. Mapped to `failJob` with `retries - 1` and an optional
server-side re-activation backoff.

## Extends

- `YieldableError`\<`this`\> & `object` & `Readonly`\<\{
  `cause?`: `unknown`;
  `message`: `string`;
  `retryBackoff?`: `Input`;
  `variables?`: \{
  \[`key`: `string`\]: `unknown`;
  \};
  \}\>

## Constructors

### Constructor

```ts
new RetryableJobError(args): RetryableJobError;
```

#### Parameters

##### args

###### cause?

`unknown`

###### message

`string`

###### retryBackoff?

`Input`

Server-side delay before the job becomes re-activatable (`failJob` `retryBackOff`).

###### variables?

\{
\[`key`: `string`\]: `unknown`;
\}

Optional variables to attach to the job on failure.

#### Returns

`RetryableJobError`

#### Inherited from

```ts
Data.TaggedError('RetryableJobError')<{
  readonly message: string;
  / Server-side delay before the job becomes re-activatable (failJob retryBackOff). /
  readonly retryBackoff?: Duration.Input;
  / Optional variables to attach to the job on failure. /
  readonly variables?: { readonly [key: string]: unknown };
  readonly cause?: unknown;
}>.constructor
```

## Properties

### retryBackoff?

```ts
readonly optional retryBackoff?: Input;
```

Server-side delay before the job becomes re-activatable (`failJob` `retryBackOff`).

#### Inherited from

```ts
Data.TaggedError("RetryableJobError").retryBackoff;
```

---

### variables?

```ts
readonly optional variables?: object;
```

Optional variables to attach to the job on failure.

#### Index Signature

```ts
[key: string]: unknown
```

#### Inherited from

```ts
Data.TaggedError("RetryableJobError").variables;
```
