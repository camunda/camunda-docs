---
title: "Interface: TelemetryHooks"
sidebar_label: "TelemetryHooks"
mdx:
  format: md
---

# Interface: TelemetryHooks

Defined in: [runtime/telemetry.ts:5](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/telemetry.ts#L5)

## Methods

### afterResponse()?

```ts
optional afterResponse(e): void;
```

Defined in: [runtime/telemetry.ts:7](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/telemetry.ts#L7)

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

Defined in: [runtime/telemetry.ts:11](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/telemetry.ts#L11)

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

Defined in: [runtime/telemetry.ts:9](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/telemetry.ts#L9)

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

Defined in: [runtime/telemetry.ts:10](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/telemetry.ts#L10)

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

Defined in: [runtime/telemetry.ts:6](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/telemetry.ts#L6)

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

Defined in: [runtime/telemetry.ts:8](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/telemetry.ts#L8)

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

Defined in: [runtime/telemetry.ts:12](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/telemetry.ts#L12)

#### Parameters

##### e

`TelemetryRetryEvent`

#### Returns

`void`
