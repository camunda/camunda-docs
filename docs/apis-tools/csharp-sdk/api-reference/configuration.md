---
title: "Configuration"
sidebar_label: "Configuration"
mdx:
  format: md
---

# Configuration

:::caution Technical Preview
The C# SDK is a **technical preview** available from Camunda 8.9. It will become fully supported in Camunda 8.10. Its API surface may change in future releases without following semver.
:::

Configuration and authentication types for the Camunda C# SDK.

## CamundaOptions

Options for constructing a .
Mirrors the JS SDK's CamundaOptions with idiomatic C# conventions.

```csharp
public sealed class CamundaOptions
```

### Properties

| Property             | Type                 | Description                                                                                                                                                                                                                                                                                                                                                 |
| -------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Config`             | `Dictionary<String>` | Strongly typed env-style overrides (CAMUNDA\_\* keys).                                                                                                                                                                                                                                                                                                      |
| `Configuration`      | `IConfiguration`     | An section (typically configuration.GetSection("Camunda")) to bind settings from appsettings.json or any other configuration provider. Keys use PascalCase property names (e.g. RestAddress, Auth:Strategy) and are mapped to the canonical CAMUNDA\_\* env-var names internally. Precedence (highest wins): &gt; &gt; environment variables &gt; defaults. |
| `HttpClient`         | `HttpClient`         | Custom HttpClient factory. If not provided, a default HttpClient is created.                                                                                                                                                                                                                                                                                |
| `HttpMessageHandler` | `HttpMessageHandler` | Custom HttpMessageHandler for the internal HttpClient (ignored if HttpClient is set). Useful for tests (e.g., MockHttpMessageHandler).                                                                                                                                                                                                                      |
| `Env`                | `Dictionary<String>` | Provide a custom env map (mainly for tests). Defaults to Environment.GetEnvironmentVariable.                                                                                                                                                                                                                                                                |
| `LoggerFactory`      | `ILoggerFactory`     | Logger factory for SDK logging.                                                                                                                                                                                                                                                                                                                             |
| `ThrowOnError`       | `Boolean`            | If true (default), non-2xx HTTP responses throw instead of returning an error object.                                                                                                                                                                                                                                                                       |

## CamundaConfig

Hydrated Camunda configuration. Immutable after construction.

```csharp
public sealed class CamundaConfig
```

### Properties

| Property          | Type                 | Description |
| ----------------- | -------------------- | ----------- |
| `RestAddress`     | `String`             |             |
| `TokenAudience`   | `String`             |             |
| `DefaultTenantId` | `String`             |             |
| `HttpRetry`       | `HttpRetryConfig`    |             |
| `Backpressure`    | `BackpressureConfig` |             |
| `OAuth`           | `OAuthConfig`        |             |
| `Auth`            | `AuthConfig`         |             |
| `Validation`      | `ValidationConfig`   |             |
| `LogLevel`        | `String`             |             |
| `Eventual`        | `EventualConfig`     |             |

## ConfigurationHydrator

Hydrates a from environment variables and overrides.
Mirrors the JS SDK's hydrateConfig function.

```csharp
public static class ConfigurationHydrator
```

## AuthConfig

```csharp
public sealed class AuthConfig
```

### Properties

| Property   | Type              | Description |
| ---------- | ----------------- | ----------- |
| `Strategy` | `AuthStrategy`    |             |
| `Basic`    | `BasicAuthConfig` |             |

## AuthStrategy

Supported authentication strategies.

```csharp
public enum AuthStrategy
```

| Value   | Description |
| ------- | ----------- |
| `None`  |             |
| `OAuth` |             |
| `Basic` |             |

## BasicAuthConfig

```csharp
public sealed class BasicAuthConfig
```

### Properties

| Property   | Type     | Description |
| ---------- | -------- | ----------- |
| `Username` | `String` |             |
| `Password` | `String` |             |

## OAuthConfig

```csharp
public sealed class OAuthConfig
```

### Properties

| Property       | Type               | Description |
| -------------- | ------------------ | ----------- |
| `ClientId`     | `String`           |             |
| `ClientSecret` | `String`           |             |
| `OAuthUrl`     | `String`           |             |
| `GrantType`    | `String`           |             |
| `Scope`        | `String`           |             |
| `TimeoutMs`    | `Int32`            |             |
| `Retry`        | `OAuthRetryConfig` |             |

## OAuthRetryConfig

```csharp
public sealed class OAuthRetryConfig
```

### Properties

| Property      | Type    | Description |
| ------------- | ------- | ----------- |
| `Max`         | `Int32` |             |
| `BaseDelayMs` | `Int32` |             |

## HttpRetryConfig

```csharp
public sealed class HttpRetryConfig
```

### Properties

| Property      | Type    | Description |
| ------------- | ------- | ----------- |
| `MaxAttempts` | `Int32` |             |
| `BaseDelayMs` | `Int32` |             |
| `MaxDelayMs`  | `Int32` |             |

## BackpressureConfig

```csharp
public sealed class BackpressureConfig
```

### Properties

| Property             | Type      | Description |
| -------------------- | --------- | ----------- |
| `Enabled`            | `Boolean` |             |
| `Profile`            | `String`  |             |
| `ObserveOnly`        | `Boolean` |             |
| `InitialMax`         | `Int32`   |             |
| `SoftFactor`         | `Double`  |             |
| `SevereFactor`       | `Double`  |             |
| `RecoveryIntervalMs` | `Int32`   |             |
| `RecoveryStep`       | `Int32`   |             |
| `DecayQuietMs`       | `Int32`   |             |
| `Floor`              | `Int32`   |             |
| `SevereThreshold`    | `Int32`   |             |

## EventualConfig

```csharp
public sealed class EventualConfig
```

### Properties

| Property        | Type    | Description |
| --------------- | ------- | ----------- |
| `PollDefaultMs` | `Int32` |             |

## ValidationConfig

```csharp
public sealed class ValidationConfig
```

### Properties

| Property   | Type             | Description |
| ---------- | ---------------- | ----------- |
| `Request`  | `ValidationMode` |             |
| `Response` | `ValidationMode` |             |
| `Raw`      | `String`         |             |

## ValidationMode

Validation modes for request/response validation.

```csharp
public enum ValidationMode
```

| Value       | Description |
| ----------- | ----------- |
| `None`      |             |
| `Warn`      |             |
| `Strict`    |             |
| `Fanatical` |             |

## JobWorkerConfig

Configuration for a .

```csharp
public sealed class JobWorkerConfig
```

### Properties

| Property            | Type              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `JobType`           | `String`          | The BPMN job type to subscribe to (e.g. "payment-service").                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `JobTimeoutMs`      | `Int64`           | How long (in ms) the job is reserved for this worker before the broker makes it available to other workers.                                                                                                                                                                                                                                                                                                                                                                                            |
| `MaxConcurrentJobs` | `Int32`           | Maximum number of jobs that may be in-flight (activated and being handled) concurrently by this worker. Controls how many jobs are requested per poll and how many handler tasks run in parallel. For I/O-bound handlers (HTTP calls, database queries), higher values (32–128) improve throughput because async handlers release threads during awaits. For CPU-bound handlers, set to or lower to avoid over-subscribing the thread pool. Set to 1 for sequential (single-job-at-a-time) processing. |
| `PollIntervalMs`    | `Int32`           | Delay (in ms) between poll cycles when no jobs are available or when at capacity. Default: 500 ms.                                                                                                                                                                                                                                                                                                                                                                                                     |
| `PollTimeoutMs`     | `Nullable<Int64>` | Long-poll timeout (in ms) sent to the broker. The broker holds the activation request open until jobs are available or this timeout elapses. null or 0 = broker default; negative = long polling disabled.                                                                                                                                                                                                                                                                                             |
| `FetchVariables`    | `List<String>`    | Variable names to fetch from the process instance scope. null = fetch all.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `WorkerName`        | `String`          | Worker name sent to the broker for logging and diagnostics. Auto-generated if not set.                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `AutoStart`         | `Boolean`         | Whether to start polling immediately on creation. Default: true.                                                                                                                                                                                                                                                                                                                                                                                                                                       |

## ConfigErrorCode

Configuration hydration errors.

```csharp
public enum ConfigErrorCode
```

| Value                     | Description |
| ------------------------- | ----------- |
| `MissingRequired`         |             |
| `InvalidEnum`             |             |
| `InvalidBoolean`          |             |
| `InvalidInteger`          |             |
| `InvalidValidationSyntax` |             |

## ConfigErrorDetail

```csharp
public sealed class ConfigErrorDetail
```

### Properties

| Property  | Type              | Description |
| --------- | ----------------- | ----------- |
| `Key`     | `String`          |             |
| `Code`    | `ConfigErrorCode` |             |
| `Message` | `String`          |             |
