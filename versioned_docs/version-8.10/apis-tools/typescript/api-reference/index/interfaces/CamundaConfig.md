---
title: "Interface: CamundaConfig"
sidebar_label: "CamundaConfig"
mdx:
  format: md
---

# Interface: CamundaConfig

## Properties

### \_\_raw

```ts
__raw: Record<string, string | undefined>;
```

---

### auth

```ts
auth: object;
```

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

---

### eventual?

```ts
optional eventual?: object;
```

#### pollDefaultMs

```ts
pollDefaultMs: number;
```

---

### httpRetry

```ts
httpRetry: object;
```

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

---

### mtls?

```ts
optional mtls?: object;
```

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

---

### supportLog?

```ts
optional supportLog?: object;
```

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

---

### validation

```ts
validation: object;
```

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
