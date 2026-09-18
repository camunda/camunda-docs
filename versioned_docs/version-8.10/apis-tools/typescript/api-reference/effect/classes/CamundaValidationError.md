---
title: "Class: CamundaValidationError"
sidebar_label: "CamundaValidationError"
mdx:
  format: md
---

# Class: CamundaValidationError

:::info Opt-In Subpath
The Effect API is an **opt-in subpath** (`@camunda8/orchestration-cluster-api/effect`) and requires the optional `effect` peer dependency. The main `.` entry stays Promise-based and pulls in zero Effect at runtime.
:::

A request/response validation failure surfaced by the SDK.

## Extends

- `YieldableError`\<`this`\> & `object` & `Readonly`\<\{
  `cause?`: `unknown`;
  `issues`: `string`[];
  `message`: `string`;
  `operationId?`: `string`;
  `side`: `"request"` \| `"response"`;
  `summary`: `string`;
  \}\>

## Constructors

### Constructor

```ts
new CamundaValidationError(args): CamundaValidationError;
```

#### Parameters

##### args

###### cause?

`unknown`

###### issues

`string`[]

###### message

`string`

###### operationId?

`string`

###### side

`"request"` \| `"response"`

###### summary

`string`

#### Returns

`CamundaValidationError`

#### Inherited from

```ts
Data.TaggedError('CamundaValidationError')<{
  readonly side: 'request' | 'response';
  readonly operationId?: string;
  readonly summary: string;
  readonly issues: string[];
  readonly message: string;
  readonly cause?: unknown;
}>.constructor
```

## Properties

### issues

```ts
readonly issues: string[];
```

#### Inherited from

```ts
Data.TaggedError("CamundaValidationError").issues;
```

---

### operationId?

```ts
readonly optional operationId?: string;
```

#### Inherited from

```ts
Data.TaggedError("CamundaValidationError").operationId;
```

---

### side

```ts
readonly side: "request" | "response";
```

#### Inherited from

```ts
Data.TaggedError("CamundaValidationError").side;
```

---

### summary

```ts
readonly summary: string;
```

#### Inherited from

```ts
Data.TaggedError("CamundaValidationError").summary;
```
