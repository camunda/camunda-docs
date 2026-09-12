---
title: "Class: EventualConsistencyTimeoutError"
sidebar_label: "EventualConsistencyTimeoutError"
mdx:
  format: md
---

# Class: EventualConsistencyTimeoutError

## Extends

- `Error`

## Constructors

### Constructor

```ts
new EventualConsistencyTimeoutError(params): EventualConsistencyTimeoutError;
```

#### Parameters

##### params

###### attempts

`number`

###### elapsedMs

`number`

###### lastResponse?

`any`

###### lastStatus?

`number`

###### message?

`string`

###### operationId?

`string`

#### Returns

`EventualConsistencyTimeoutError`

#### Overrides

```ts
Error.constructor;
```

## Properties

### attempts

```ts
attempts: number;
```

---

### code

```ts
code: string = "CAMUNDA_SDK_EVENTUAL_TIMEOUT";
```

---

### elapsedMs

```ts
elapsedMs: number;
```

---

### lastResponseSnippet?

```ts
optional lastResponseSnippet?: string;
```

---

### lastStatus?

```ts
optional lastStatus?: number;
```

---

### operationId?

```ts
optional operationId?: string;
```
