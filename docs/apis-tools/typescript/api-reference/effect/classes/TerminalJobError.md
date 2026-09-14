---
title: "Class: TerminalJobError"
sidebar_label: "TerminalJobError"
mdx:
  format: md
---

# Class: TerminalJobError

:::info Opt-In Subpath
The Effect API is an **opt-in subpath** (`@camunda8/orchestration-cluster-api/effect`) and requires the optional `effect` peer dependency. The main `.` entry stays Promise-based and pulls in zero Effect at runtime.
:::

A terminal job failure: retrying will not help. Mapped to `throwJobError`, which
is caught by a matching BPMN error boundary event or — if uncaught — raises an
incident.

## Extends

- `YieldableError`\<`this`\> & `object` & `Readonly`\<\{
  `cause?`: `unknown`;
  `code`: `string`;
  `message`: `string`;
  `variables?`: \{
  \[`key`: `string`\]: `unknown`;
  \};
  \}\>

## Constructors

### Constructor

```ts
new TerminalJobError(args): TerminalJobError;
```

#### Parameters

##### args

###### cause?

`unknown`

###### code

`string`

The BPMN error code matched against an error catch event.

###### message

`string`

###### variables?

\{
\[`key`: `string`\]: `unknown`;
\}

Optional variables to instantiate at the error catch event's scope.

#### Returns

`TerminalJobError`

#### Inherited from

```ts
Data.TaggedError('TerminalJobError')<{
  / The BPMN error code matched against an error catch event. /
  readonly code: string;
  readonly message: string;
  / Optional variables to instantiate at the error catch event's scope. /
  readonly variables?: { readonly [key: string]: unknown };
  readonly cause?: unknown;
}>.constructor
```

## Properties

### code

```ts
readonly code: string;
```

The BPMN error code matched against an error catch event.

#### Inherited from

```ts
Data.TaggedError("TerminalJobError").code;
```

---

### variables?

```ts
readonly optional variables?: object;
```

Optional variables to instantiate at the error catch event's scope.

#### Index Signature

```ts
[key: string]: unknown
```

#### Inherited from

```ts
Data.TaggedError("TerminalJobError").variables;
```
