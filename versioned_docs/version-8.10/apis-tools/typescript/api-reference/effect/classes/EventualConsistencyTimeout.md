---
title: "Class: EventualConsistencyTimeout"
sidebar_label: "EventualConsistencyTimeout"
mdx:
  format: md
---

# Class: EventualConsistencyTimeout

:::info Opt-In Subpath
The Effect API is an **opt-in subpath** (`@camunda8/orchestration-cluster-api/effect`) and requires the optional `effect` peer dependency. The main `.` entry stays Promise-based and pulls in zero Effect at runtime.
:::

An eventual-consistency poll that did not converge within its budget.

## Extends

- `YieldableError`\<`this`\> & `object` & `Readonly`\<\{
  `attempts?`: `number`;
  `cause?`: `unknown`;
  `elapsedMs?`: `number`;
  `message`: `string`;
  \}\>

## Constructors

### Constructor

```ts
new EventualConsistencyTimeout(args): EventualConsistencyTimeout;
```

#### Parameters

##### args

###### attempts?

`number`

###### cause?

`unknown`

###### elapsedMs?

`number`

###### message

`string`

#### Returns

`EventualConsistencyTimeout`

#### Inherited from

```ts
Data.TaggedError('EventualConsistencyTimeout')<{
  readonly attempts?: number;
  readonly elapsedMs?: number;
  readonly message: string;
  readonly cause?: unknown;
}>.constructor
```

## Properties

### attempts?

```ts
readonly optional attempts?: number;
```

#### Inherited from

```ts
Data.TaggedError("EventualConsistencyTimeout").attempts;
```

---

### elapsedMs?

```ts
readonly optional elapsedMs?: number;
```

#### Inherited from

```ts
Data.TaggedError("EventualConsistencyTimeout").elapsedMs;
```
