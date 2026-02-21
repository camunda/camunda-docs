---
title: "Class: EventualConsistencyTimeoutError"
sidebar_label: "EventualConsistencyTimeoutError"
mdx:
  format: md
---

# Class: EventualConsistencyTimeoutError

Defined in: [runtime/errors.ts:159](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/errors.ts#L159)

## Extends

- `Error`

## Constructors

### Constructor

```ts
new EventualConsistencyTimeoutError(params): EventualConsistencyTimeoutError;
```

Defined in: [runtime/errors.ts:166](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/errors.ts#L166)

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

Defined in: [runtime/errors.ts:161](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/errors.ts#L161)

---

### code

```ts
code: string = "CAMUNDA_SDK_EVENTUAL_TIMEOUT";
```

Defined in: [runtime/errors.ts:160](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/errors.ts#L160)

---

### elapsedMs

```ts
elapsedMs: number;
```

Defined in: [runtime/errors.ts:162](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/errors.ts#L162)

---

### lastResponseSnippet?

```ts
optional lastResponseSnippet: string;
```

Defined in: [runtime/errors.ts:164](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/errors.ts#L164)

---

### lastStatus?

```ts
optional lastStatus: number;
```

Defined in: [runtime/errors.ts:163](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/errors.ts#L163)

---

### operationId?

```ts
optional operationId: string;
```

Defined in: [runtime/errors.ts:165](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/errors.ts#L165)
