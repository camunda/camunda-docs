---
title: "Interface: TelemetryHooks"
sidebar_label: "TelemetryHooks"
mdx:
  format: md
---

# Interface: TelemetryHooks

## Methods

### afterResponse()?

```ts
afterResponse?(e): void;
```

#### Parameters

##### e

`TelemetryHttpEndEvent`

#### Returns

`void`

---

### authError()?

```ts
authError?(e): void;
```

#### Parameters

##### e

`TelemetryAuthErrorEvent`

#### Returns

`void`

---

### authStart()?

```ts
authStart?(e): void;
```

#### Parameters

##### e

`TelemetryAuthStartEvent`

#### Returns

`void`

---

### authSuccess()?

```ts
authSuccess?(e): void;
```

#### Parameters

##### e

`TelemetryAuthSuccessEvent`

#### Returns

`void`

---

### beforeRequest()?

```ts
beforeRequest?(e): void;
```

#### Parameters

##### e

`TelemetryHttpStartEvent`

#### Returns

`void`

---

### requestError()?

```ts
requestError?(e): void;
```

#### Parameters

##### e

`TelemetryHttpErrorEvent`

#### Returns

`void`

---

### retry()?

```ts
retry?(e): void;
```

#### Parameters

##### e

`TelemetryRetryEvent`

#### Returns

`void`
