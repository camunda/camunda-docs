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
optional afterResponse(e): void;
```

#### Parameters

##### e

`TelemetryHttpEndEvent`

#### Returns

`void`

---

### authError()?

```ts
optional authError(e): void;
```

#### Parameters

##### e

`TelemetryAuthErrorEvent`

#### Returns

`void`

---

### authStart()?

```ts
optional authStart(e): void;
```

#### Parameters

##### e

`TelemetryAuthStartEvent`

#### Returns

`void`

---

### authSuccess()?

```ts
optional authSuccess(e): void;
```

#### Parameters

##### e

`TelemetryAuthSuccessEvent`

#### Returns

`void`

---

### beforeRequest()?

```ts
optional beforeRequest(e): void;
```

#### Parameters

##### e

`TelemetryHttpStartEvent`

#### Returns

`void`

---

### requestError()?

```ts
optional requestError(e): void;
```

#### Parameters

##### e

`TelemetryHttpErrorEvent`

#### Returns

`void`

---

### retry()?

```ts
optional retry(e): void;
```

#### Parameters

##### e

`TelemetryRetryEvent`

#### Returns

`void`
