---
title: "Class: HttpError"
sidebar_label: "HttpError"
mdx:
  format: md
---

# Class: HttpError

:::info Opt-In Subpath
The Effect API is an **opt-in subpath** (`@camunda8/orchestration-cluster-api/effect`) and requires the optional `effect` peer dependency. The main `.` entry stays Promise-based and pulls in zero Effect at runtime.
:::

An HTTP-level failure (non-2xx / transport carrying a status).

## Extends

- `YieldableError`\<`this`\> & `object` & `Readonly`\<\{
  `body?`: `unknown`;
  `cause?`: `unknown`;
  `message`: `string`;
  `status?`: `number`;
  \}\>

## Constructors

### Constructor

```ts
new HttpError(args): HttpError;
```

#### Parameters

##### args

###### body?

`unknown`

###### cause?

`unknown`

###### message

`string`

###### status?

`number`

#### Returns

`HttpError`

#### Inherited from

```ts
Data.TaggedError('HttpError')<{
  readonly status?: number;
  readonly body?: unknown;
  readonly message: string;
  readonly cause?: unknown;
}>.constructor
```

## Properties

### body?

```ts
readonly optional body?: unknown;
```

#### Inherited from

```ts
Data.TaggedError("HttpError").body;
```

---

### status?

```ts
readonly optional status?: number;
```

#### Inherited from

```ts
Data.TaggedError("HttpError").status;
```
