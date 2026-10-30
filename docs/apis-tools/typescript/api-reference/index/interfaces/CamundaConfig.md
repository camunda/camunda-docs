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
basic?: object;
```

##### basic.password?

```ts
password?: string;
```

##### basic.username?

```ts
username?: string;
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
eventual?: object;
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
mtls?: object;
```

#### ca?

```ts
ca?: string;
```

#### caPath?

```ts
caPath?: string;
```

#### cert?

```ts
cert?: string;
```

#### certPath?

```ts
certPath?: string;
```

#### key?

```ts
key?: string;
```

#### keyPassphrase?

```ts
keyPassphrase?: string;
```

#### keyPath?

```ts
keyPath?: string;
```

---

### oauth

```ts
oauth: object;
```

#### cacheDir?

```ts
cacheDir?: string;
```

#### clientId?

```ts
clientId?: string;
```

#### clientSecret?

```ts
clientSecret?: string;
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
scope?: string;
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

### restAddressExact

```ts
restAddressExact: boolean;
```

---

### supportLog?

```ts
supportLog?: object;
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
telemetry?: object;
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
workerDefaults?: object;
```

#### jobTimeoutMs?

```ts
jobTimeoutMs?: number;
```

#### maxParallelJobs?

```ts
maxParallelJobs?: number;
```

#### pollTimeoutMs?

```ts
pollTimeoutMs?: number;
```

#### startupJitterMaxSeconds?

```ts
startupJitterMaxSeconds?: number;
```

#### workerName?

```ts
workerName?: string;
```
