---
title: "Interface: Logger"
sidebar_label: "Logger"
mdx:
  format: md
---

# Interface: Logger

Defined in: [runtime/logger.ts:24](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/logger.ts#L24)

## Methods

### code()

```ts
code(
   level,
   code,
   msg,
   data?): void;
```

Defined in: [runtime/logger.ts:35](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/logger.ts#L35)

#### Parameters

##### level

[`LogLevel`](../type-aliases/LogLevel.md)

##### code

`string`

##### msg

`string`

##### data?

`any`

#### Returns

`void`

---

### debug()

```ts
debug(...a): void;
```

Defined in: [runtime/logger.ts:31](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/logger.ts#L31)

#### Parameters

##### a

...`any`[]

#### Returns

`void`

---

### error()

```ts
error(...a): void;
```

Defined in: [runtime/logger.ts:28](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/logger.ts#L28)

#### Parameters

##### a

...`any`[]

#### Returns

`void`

---

### info()

```ts
info(...a): void;
```

Defined in: [runtime/logger.ts:30](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/logger.ts#L30)

#### Parameters

##### a

...`any`[]

#### Returns

`void`

---

### level()

```ts
level(): LogLevel;
```

Defined in: [runtime/logger.ts:25](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/logger.ts#L25)

#### Returns

[`LogLevel`](../type-aliases/LogLevel.md)

---

### scope()

```ts
scope(child): Logger;
```

Defined in: [runtime/logger.ts:34](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/logger.ts#L34)

#### Parameters

##### child

`string`

#### Returns

`Logger`

---

### setLevel()

```ts
setLevel(level): void;
```

Defined in: [runtime/logger.ts:26](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/logger.ts#L26)

#### Parameters

##### level

[`LogLevel`](../type-aliases/LogLevel.md)

#### Returns

`void`

---

### setTransport()

```ts
setTransport(t?): void;
```

Defined in: [runtime/logger.ts:27](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/logger.ts#L27)

#### Parameters

##### t?

[`LogTransport`](../type-aliases/LogTransport.md)

#### Returns

`void`

---

### silly()

```ts
silly(...a): void;
```

Defined in: [runtime/logger.ts:33](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/logger.ts#L33)

#### Parameters

##### a

...`any`[]

#### Returns

`void`

---

### trace()

```ts
trace(...a): void;
```

Defined in: [runtime/logger.ts:32](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/logger.ts#L32)

#### Parameters

##### a

...`any`[]

#### Returns

`void`

---

### warn()

```ts
warn(...a): void;
```

Defined in: [runtime/logger.ts:29](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/logger.ts#L29)

#### Parameters

##### a

...`any`[]

#### Returns

`void`
