---
title: "Class: CamundaValidationError"
sidebar_label: "CamundaValidationError"
mdx:
  format: md
---

# Class: CamundaValidationError

## Extends

- `Error`

## Constructors

### Constructor

```ts
new CamundaValidationError(params): CamundaValidationError;
```

#### Parameters

##### params

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

#### Overrides

```ts
Error.constructor;
```

## Properties

### issues

```ts
issues: string[];
```

---

### operationId?

```ts
optional operationId?: string;
```

---

### side

```ts
side: "request" | "response";
```

---

### summary

```ts
summary: string;
```
