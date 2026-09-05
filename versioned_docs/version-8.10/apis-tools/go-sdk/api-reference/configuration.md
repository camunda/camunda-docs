---
title: "Configuration"
sidebar_label: "Configuration"
mdx:
  format: md
---

# Configuration

:::caution Technical Preview
The Go SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

Configuration is resolved from explicit options first, then environment variables, then built-in defaults, and validated fail-fast at construction.

## AuthStrategy

```go
type AuthStrategy int
```

AuthStrategy selects the authentication mechanism.

### Constants

```go
const (
	AuthNone AuthStrategy = iota
	AuthBasic
	AuthOAuth
)
```

Authentication strategies.

### Functions

#### ParseAuthStrategy

```go
func ParseAuthStrategy(s string) (AuthStrategy, error)
```

ParseAuthStrategy parses a CAMUNDA_AUTH_STRATEGY value.

### Methods

#### String

```go
func (s AuthStrategy) String() string
```

## BackpressureProfile

```go
type BackpressureProfile int
```

BackpressureProfile selects the backpressure controller behavior.

### Constants

```go
const (
	ProfileBalanced BackpressureProfile = iota
	ProfileLegacy
)
```

Backpressure profiles.

### Functions

#### ParseBackpressureProfile

```go
func ParseBackpressureProfile(s string) (BackpressureProfile, error)
```

ParseBackpressureProfile parses a CAMUNDA_SDK_BACKPRESSURE_PROFILE value.

### Methods

#### String

```go
func (p BackpressureProfile) String() string
```

## Config

Config is the resolved SDK configuration.

### Fields

| Field                 | Type                  | Description                                                                                                                                                                                                                                                                                                |
| --------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `RestAddress`         | `string`              |                                                                                                                                                                                                                                                                                                            |
| `GrpcAddress`         | `string`              |                                                                                                                                                                                                                                                                                                            |
| `AuthStrategy`        | `AuthStrategy`        |                                                                                                                                                                                                                                                                                                            |
| `ClientID`            | `string`              |                                                                                                                                                                                                                                                                                                            |
| `ClientSecret`        | `string`              |                                                                                                                                                                                                                                                                                                            |
| `OAuthURL`            | `string`              |                                                                                                                                                                                                                                                                                                            |
| `TokenAudience`       | `string`              |                                                                                                                                                                                                                                                                                                            |
| `OAuthScope`          | `string`              |                                                                                                                                                                                                                                                                                                            |
| `OAuthCacheDir`       | `string`              |                                                                                                                                                                                                                                                                                                            |
| `BasicAuthUsername`   | `string`              |                                                                                                                                                                                                                                                                                                            |
| `BasicAuthPassword`   | `string`              |                                                                                                                                                                                                                                                                                                            |
| `DefaultTenantID`     | `string`              |                                                                                                                                                                                                                                                                                                            |
| `Falcon`              | `bool`                | Falcon enables the FALCON (nanobpmn command-stream) transport upgrade when the gateway advertises it (CAMUNDA_FALCON, default true). ForceREST forces the pure-REST path even when FALCON is advertised (CAMUNDA_FORCE_REST), e.g. where WebSockets are blocked. Use FalconEnabled for the resolved state. |
| `ForceREST`           | `bool`                |                                                                                                                                                                                                                                                                                                            |
| `BackpressureProfile` | `BackpressureProfile` |                                                                                                                                                                                                                                                                                                            |
| `LogLevel`            | `LogLevel`            |                                                                                                                                                                                                                                                                                                            |
| `EventualPollDefault` | `time.Duration`       |                                                                                                                                                                                                                                                                                                            |
| `Retry`               | `RetryConfig`         |                                                                                                                                                                                                                                                                                                            |
| `TLS`                 | `TLSConfig`           |                                                                                                                                                                                                                                                                                                            |
| `WorkerDefaults`      | `WorkerDefaults`      |                                                                                                                                                                                                                                                                                                            |

### Functions

#### LoadConfig

```go
func LoadConfig(opts ...Option) (*Config, error)
```

LoadConfig resolves configuration from environment variables, applies opts
(which take precedence over the environment), and validates the result.

### Methods

#### FalconEnabled

```go
func (c *Config) FalconEnabled() bool
```

FalconEnabled reports whether the FALCON command-stream transport may be used:
it must be enabled (CAMUNDA_FALCON) and not force-disabled (CAMUNDA_FORCE_REST).
It only engages when the gateway actually advertises FALCON support; against
stock Camunda the SDK stays on REST regardless.

#### Validate

```go
func (c *Config) Validate() error
```

Validate performs fail-fast validation, returning an actionable error (wrapping
ErrConfig) when the configuration cannot support the selected strategy.

## ConfigField

ConfigField documents a single environment variable the SDK reads while
resolving configuration. It carries the variable's alias precedence, default,
and whether it holds credential material.

### Fields

| Field         | Type       | Description                                                                                                                                                                                                             |
| ------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Keys`        | `[]string` | Keys are the environment variable names checked in precedence order; the first non-empty value wins. The first entry is the canonical CAMUNDA*\* name; later entries are accepted aliases (e.g. legacy ZEEBE*\* names). |
| `Default`     | `string`   | Default is the value applied when none of Keys is set. Empty means the field has no built-in default (it stays unset / zero).                                                                                           |
| `Secret`      | `bool`     | Secret marks credential material that must be redacted in diagnostics.                                                                                                                                                  |
| `Description` | `string`   | Description is a one-line human-readable summary.                                                                                                                                                                       |

## LogLevel

```go
type LogLevel int
```

LogLevel controls SDK log verbosity.

### Constants

```go
const (
	LogOff LogLevel = iota
	LogError
	LogWarn
	LogInfo
	LogDebug
	LogTrace
)
```

Log levels.

### Functions

#### ParseLogLevel

```go
func ParseLogLevel(s string) (LogLevel, error)
```

ParseLogLevel parses a CAMUNDA_SDK_LOG_LEVEL value.

### Methods

#### String

```go
func (l LogLevel) String() string
```

## Option

```go
type Option func(*Config)
```

Option configures a Config. Options are applied after environment resolution
and therefore take precedence over environment variables.

### Functions

#### WithBackpressureProfile

```go
func WithBackpressureProfile(p BackpressureProfile) Option
```

WithBackpressureProfile sets the adaptive backpressure profile.

#### WithBasicAuth

```go
func WithBasicAuth(username, password string) Option
```

WithBasicAuth selects HTTP Basic authentication with the given credentials.

#### WithDefaultTenantID

```go
func WithDefaultTenantID(id string) Option
```

WithDefaultTenantID sets the default tenant id applied to operations that
accept one.

#### WithFalcon

```go
func WithFalcon(enabled bool) Option
```

WithFalcon enables or disables the FALCON (nanobpmn command-stream) transport
upgrade. It is enabled by default and only engages when the gateway advertises
FALCON support; against stock Camunda the SDK stays on REST regardless.

#### WithForceREST

```go
func WithForceREST(force bool) Option
```

WithForceREST forces the pure-REST path even when the gateway advertises FALCON
support (useful where WebSockets are blocked by a proxy).

#### WithGrpcAddress

```go
func WithGrpcAddress(addr string) Option
```

WithGrpcAddress sets the Zeebe gRPC gateway address (host:port) used by the
gRPC streaming job worker.

#### WithLogLevel

```go
func WithLogLevel(l LogLevel) Option
```

WithLogLevel sets the SDK log level.

#### WithNoAuth

```go
func WithNoAuth() Option
```

WithNoAuth selects the no-authentication strategy (e.g. local development).

#### WithOAuth

```go
func WithOAuth(clientID, clientSecret, tokenURL string) Option
```

WithOAuth selects the OAuth 2.0 client-credentials strategy with the given
client id, secret, and token endpoint URL.

#### WithOAuthAudience

```go
func WithOAuthAudience(audience string) Option
```

WithOAuthAudience sets the OAuth token audience.

#### WithOAuthCacheDir

```go
func WithOAuthCacheDir(dir string) Option
```

WithOAuthCacheDir enables the on-disk OAuth token cache at dir.

#### WithOAuthScope

```go
func WithOAuthScope(scope string) Option
```

WithOAuthScope sets the OAuth token scope.

#### WithRestAddress

```go
func WithRestAddress(addr string) Option
```

WithRestAddress sets the Orchestration Cluster REST base address.

#### WithRetry

```go
func WithRetry(rc RetryConfig) Option
```

WithRetry sets the transient-error retry policy.

## RetryConfig

RetryConfig is the transient-error HTTP retry policy.

### Fields

| Field         | Type            | Description |
| ------------- | --------------- | ----------- |
| `MaxAttempts` | `int`           |             |
| `BaseDelay`   | `time.Duration` |             |
| `MaxDelay`    | `time.Duration` |             |

## TLSConfig

TLSConfig holds TLS / mutual-TLS material. Inline PEM values take precedence
over the \*Path file locations.

### Fields

| Field           | Type     | Description |
| --------------- | -------- | ----------- |
| `Cert`          | `string` |             |
| `Key`           | `string` |             |
| `CA`            | `string` |             |
| `CertPath`      | `string` |             |
| `KeyPath`       | `string` |             |
| `CAPath`        | `string` |             |
| `KeyPassphrase` | `string` |             |

### Methods

#### IsConfigured

```go
func (t TLSConfig) IsConfigured() bool
```

IsConfigured reports whether any TLS material has been supplied.

## WorkerDefaults

WorkerDefaults holds default job-worker settings sourced from CAMUNDA*WORKER*\*.

### Fields

| Field                     | Type     | Description |
| ------------------------- | -------- | ----------- |
| `TimeoutMs`               | `int64`  |             |
| `MaxConcurrentJobs`       | `int`    |             |
| `RequestTimeoutMs`        | `int64`  |             |
| `Name`                    | `string` |             |
| `StartupJitterMaxSeconds` | `int`    |             |

## ConfigSchema

ConfigSchema is the canonical registry of every environment variable the SDK
consumes during configuration resolution (see loadConfig in config.go). It is
the single source of truth for the SDK's configuration surface: it documents
the accepted variables, their aliases, and their defaults, and it is kept in
lock-step with the actual resolution code by TestConfigSchemaMatchesReads
(configschema_test.go), which fails if a variable is read but unregistered or
registered but never read.

It intentionally mirrors the JS SDK's configSchema so the SDKs expose the same
configuration contract.
