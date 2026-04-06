---
title: "Interface: CamundaConfig"
sidebar_label: "CamundaConfig"
mdx:
  format: md
---

# Interface: CamundaConfig

Defined in: [runtime/unifiedConfiguration.ts:64](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/unifiedConfiguration.ts#L64)

## Properties

### \_\_raw

```ts
__raw: Record<string, string | undefined>;
```

Defined in: [runtime/unifiedConfiguration.ts:126](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/unifiedConfiguration.ts#L126)

---

### auth

```ts
auth: object;
```

Defined in: [runtime/unifiedConfiguration.ts:95](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/unifiedConfiguration.ts#L95)

#### basic?

```ts
optional basic?: object;
```

##### basic.password?

```ts
optional password?: string;
```

##### basic.username?

```ts
optional username?: string;
```

#### strategy

```ts
strategy: AuthStrategy;
```

---

### backpressure

```ts
backpressure: object;
```

Defined in: [runtime/unifiedConfiguration.ts:69](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/unifiedConfiguration.ts#L69)

#### decayQuietMs

```ts
decayQuietMs: number;
```

#### enabled

```ts
enabled: boolean;
```

#### floor

```ts
floor: number;
```

#### healthyRecoveryMultiplier

```ts
healthyRecoveryMultiplier: number;
```

#### initialMax

```ts
initialMax: number;
```

#### maxWaiters

```ts
maxWaiters: number;
```

#### observeOnly

```ts
observeOnly: boolean;
```

#### profile

```ts
profile: string;
```

#### recoveryIntervalMs

```ts
recoveryIntervalMs: number;
```

#### recoveryStep

```ts
recoveryStep: number;
```

#### severeFactor

```ts
severeFactor: number;
```

#### severeThreshold

```ts
severeThreshold: number;
```

#### softFactor

```ts
softFactor: number;
```

#### unlimitedAfterHealthyMs

```ts
unlimitedAfterHealthyMs: number;
```

---

### defaultTenantId

```ts
defaultTenantId: string;
```

Defined in: [runtime/unifiedConfiguration.ts:67](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/unifiedConfiguration.ts#L67)

---

### eventual?

```ts
optional eventual?: object;
```

Defined in: [runtime/unifiedConfiguration.ts:105](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/unifiedConfiguration.ts#L105)

#### pollDefaultMs

```ts
pollDefaultMs: number;
```

---

### httpRetry

```ts
httpRetry: object;
```

Defined in: [runtime/unifiedConfiguration.ts:68](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/unifiedConfiguration.ts#L68)

#### baseDelayMs

```ts
baseDelayMs: number;
```

#### maxAttempts

```ts
maxAttempts: number;
```

#### maxDelayMs

```ts
maxDelayMs: number;
```

---

### logLevel

```ts
logLevel: "trace" | "error" | "silent" | "warn" | "info" | "debug";
```

Defined in: [runtime/unifiedConfiguration.ts:104](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/unifiedConfiguration.ts#L104)

---

### mtls?

```ts
optional mtls?: object;
```

Defined in: [runtime/unifiedConfiguration.ts:107](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/unifiedConfiguration.ts#L107)

#### ca?

```ts
optional ca?: string;
```

#### caPath?

```ts
optional caPath?: string;
```

#### cert?

```ts
optional cert?: string;
```

#### certPath?

```ts
optional certPath?: string;
```

#### key?

```ts
optional key?: string;
```

#### keyPassphrase?

```ts
optional keyPassphrase?: string;
```

#### keyPath?

```ts
optional keyPath?: string;
```

---

### oauth

```ts
oauth: object;
```

Defined in: [runtime/unifiedConfiguration.ts:85](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/unifiedConfiguration.ts#L85)

#### cacheDir?

```ts
optional cacheDir?: string;
```

#### clientId?

```ts
optional clientId?: string;
```

#### clientSecret?

```ts
optional clientSecret?: string;
```

#### grantType

```ts
grantType: string;
```

#### oauthUrl

```ts
oauthUrl: string;
```

#### retry

```ts
retry: object;
```

##### retry.baseDelayMs

```ts
baseDelayMs: number;
```

##### retry.max

```ts
max: number;
```

#### scope?

```ts
optional scope?: string;
```

#### timeoutMs

```ts
timeoutMs: number;
```

---

### restAddress

```ts
restAddress: string;
```

Defined in: [runtime/unifiedConfiguration.ts:65](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/unifiedConfiguration.ts#L65)

---

### supportLog?

```ts
optional supportLog?: object;
```

Defined in: [runtime/unifiedConfiguration.ts:117](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/unifiedConfiguration.ts#L117)

#### enabled

```ts
enabled: boolean;
```

#### filePath

```ts
filePath: string;
```

---

### telemetry?

```ts
optional telemetry?: object;
```

Defined in: [runtime/unifiedConfiguration.ts:116](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/unifiedConfiguration.ts#L116)

#### correlation

```ts
correlation: boolean;
```

#### log

```ts
log: boolean;
```

---

### tokenAudience

```ts
tokenAudience: string;
```

Defined in: [runtime/unifiedConfiguration.ts:66](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/unifiedConfiguration.ts#L66)

---

### validation

```ts
validation: object;
```

Defined in: [runtime/unifiedConfiguration.ts:99](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/unifiedConfiguration.ts#L99)

#### raw

```ts
raw: string;
```

#### req

```ts
req: ValidationMode;
```

#### res

```ts
res: ValidationMode;
```

---

### workerDefaults?

```ts
optional workerDefaults?: object;
```

Defined in: [runtime/unifiedConfiguration.ts:118](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/unifiedConfiguration.ts#L118)

#### jobTimeoutMs?

```ts
optional jobTimeoutMs?: number;
```

#### maxParallelJobs?

```ts
optional maxParallelJobs?: number;
```

#### pollTimeoutMs?

```ts
optional pollTimeoutMs?: number;
```

#### startupJitterMaxSeconds?

```ts
optional startupJitterMaxSeconds?: number;
```

#### workerName?

```ts
optional workerName?: string;
```
