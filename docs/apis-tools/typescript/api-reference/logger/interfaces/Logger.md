---
title: "Interface: Logger"
sidebar_label: "Logger"
mdx:
  format: md
---

# Interface: Logger

## Methods

### code()

```ts
code(
   level,
   code,
   msg,
   data?): void;
```

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

#### Returns

[`LogLevel`](../type-aliases/LogLevel.md)

---

### scope()

```ts
scope(child): Logger;
```

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

#### Parameters

##### a

...`any`[]

#### Returns

`void`
