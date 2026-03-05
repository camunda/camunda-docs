---
title: "Class: CamundaValidationError"
sidebar_label: "CamundaValidationError"
mdx:
  format: md
---

# Class: CamundaValidationError

Defined in: [runtime/errors.ts:138](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/errors.ts#L138)

## Extends

- `Error`

## Constructors

### Constructor

```ts
new CamundaValidationError(params): CamundaValidationError;
```

Defined in: [runtime/errors.ts:143](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/errors.ts#L143)

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
Error.constructor
```

## Properties

### issues

```ts
issues: string[];
```

Defined in: [runtime/errors.ts:142](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/errors.ts#L142)

***

### operationId?

```ts
optional operationId: string;
```

Defined in: [runtime/errors.ts:140](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/errors.ts#L140)

***

### side

```ts
side: "request" | "response";
```

Defined in: [runtime/errors.ts:139](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/errors.ts#L139)

***

### summary

```ts
summary: string;
```

Defined in: [runtime/errors.ts:141](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/errors.ts#L141)
