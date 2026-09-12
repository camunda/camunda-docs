---
title: "Interface: CamundaOptions"
sidebar_label: "CamundaOptions"
mdx:
  format: md
---

# Interface: CamundaOptions

## Properties

### config?

```ts
optional config?: Partial<{
  CAMUNDA_AUTH_STRATEGY: "OAUTH" | "NONE" | "BASIC";
  CAMUNDA_BASIC_AUTH_PASSWORD: string;
  CAMUNDA_BASIC_AUTH_USERNAME: string;
  CAMUNDA_CLIENT_ID: string;
  CAMUNDA_CLIENT_SECRET: string;
  CAMUNDA_DEFAULT_TENANT_ID: string;
  CAMUNDA_MTLS_CA: string;
  CAMUNDA_MTLS_CA_PATH: string;
  CAMUNDA_MTLS_CERT: string;
  CAMUNDA_MTLS_CERT_PATH: string;
  CAMUNDA_MTLS_KEY: string;
  CAMUNDA_MTLS_KEY_PASSPHRASE: string;
  CAMUNDA_MTLS_KEY_PATH: string;
  CAMUNDA_OAUTH_CACHE_DIR: string;
  CAMUNDA_OAUTH_GRANT_TYPE: string;
  CAMUNDA_OAUTH_RETRY_BASE_DELAY_MS: number;
  CAMUNDA_OAUTH_RETRY_MAX: number;
  CAMUNDA_OAUTH_SCOPE: string;
  CAMUNDA_OAUTH_TIMEOUT_MS: number;
  CAMUNDA_OAUTH_URL: string;
  CAMUNDA_REST_ADDRESS: string;
  CAMUNDA_SDK_BACKPRESSURE_DECAY_QUIET_MS: number;
  CAMUNDA_SDK_BACKPRESSURE_FLOOR: number;
  CAMUNDA_SDK_BACKPRESSURE_HEALTHY_RECOVERY_MULTIPLIER: number;
  CAMUNDA_SDK_BACKPRESSURE_INITIAL_MAX: number;
  CAMUNDA_SDK_BACKPRESSURE_MAX_WAITERS: number;
  CAMUNDA_SDK_BACKPRESSURE_PROFILE: "BALANCED" | "CONSERVATIVE" | "AGGRESSIVE" | "LEGACY";
  CAMUNDA_SDK_BACKPRESSURE_RECOVERY_INTERVAL_MS: number;
  CAMUNDA_SDK_BACKPRESSURE_RECOVERY_STEP: number;
  CAMUNDA_SDK_BACKPRESSURE_SEVERE_FACTOR: number;
  CAMUNDA_SDK_BACKPRESSURE_SEVERE_THRESHOLD: number;
  CAMUNDA_SDK_BACKPRESSURE_SOFT_FACTOR: number;
  CAMUNDA_SDK_BACKPRESSURE_UNLIMITED_AFTER_HEALTHY_MS: number;
  CAMUNDA_SDK_EVENTUAL_POLL_DEFAULT_MS: number;
  CAMUNDA_SDK_HTTP_RETRY_BASE_DELAY_MS: number;
  CAMUNDA_SDK_HTTP_RETRY_MAX_ATTEMPTS: number;
  CAMUNDA_SDK_HTTP_RETRY_MAX_DELAY_MS: number;
  CAMUNDA_SDK_LOG_LEVEL: "trace" | "error" | "silent" | "warn" | "info" | "debug" | "silly";
  CAMUNDA_SDK_TELEMETRY_CORRELATION: boolean;
  CAMUNDA_SDK_TELEMETRY_LOG: boolean;
  CAMUNDA_SDK_VALIDATION: string;
  CAMUNDA_SUPPORT_LOG_ENABLED: boolean;
  CAMUNDA_SUPPORT_LOG_FILE_PATH: string;
  CAMUNDA_SUPPORT_LOGGER: boolean;
  CAMUNDA_TOKEN_AUDIENCE: string;
  CAMUNDA_WORKER_MAX_CONCURRENT_JOBS: number;
  CAMUNDA_WORKER_NAME: string;
  CAMUNDA_WORKER_REQUEST_TIMEOUT: number;
  CAMUNDA_WORKER_STARTUP_JITTER_MAX_SECONDS: number;
  CAMUNDA_WORKER_TIMEOUT: number;
}>;
```

---

### env?

```ts
optional env?: Record<string, string | undefined>;
```

---

### fetch?

```ts
optional fetch?: (input, init?) => Promise<Response>;
```

#### Parameters

##### input

`RequestInfo` \| `URL`

##### init?

`RequestInit`

#### Returns

`Promise`\<`Response`\>

---

### log?

```ts
optional log?: object;
```

#### level?

```ts
optional level?: LogLevel;
```

#### transport?

```ts
optional transport?: LogTransport;
```

---

### supportLogger?

```ts
optional supportLogger?: SupportLogger;
```

---

### telemetry?

```ts
optional telemetry?: object;
```

#### correlation?

```ts
optional correlation?: boolean;
```

#### hooks?

```ts
optional hooks?: TelemetryHooks;
```

#### mirrorToLog?

```ts
optional mirrorToLog?: boolean;
```

---

### throwOnError?

```ts
optional throwOnError?: boolean;
```
