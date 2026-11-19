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

| Field                       | Type                  | Description                                                                                                                                                                                                                                                                                                                      |
| --------------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `RestAddress`               | `string`              |                                                                                                                                                                                                                                                                                                                                  |
| `GrpcAddress`               | `string`              |                                                                                                                                                                                                                                                                                                                                  |
| `ExactRestAddress`          | `bool`                | ExactRestAddress opts out of the automatic /v2 suffix normally appended to RestAddress (CAMUNDA_REST_ADDRESS_EXACT). When true, the SDK targets RestAddress exactly as provided — useful behind an API gateway / reverse proxy that mounts the REST API under a prefix that does not follow the .../v2 convention.               |
| `AuthStrategy`              | `AuthStrategy`        |                                                                                                                                                                                                                                                                                                                                  |
| `ClientID`                  | `string`              |                                                                                                                                                                                                                                                                                                                                  |
| `ClientSecret`              | `string`              |                                                                                                                                                                                                                                                                                                                                  |
| `OAuthURL`                  | `string`              |                                                                                                                                                                                                                                                                                                                                  |
| `TokenAudience`             | `string`              |                                                                                                                                                                                                                                                                                                                                  |
| `OAuthScope`                | `string`              |                                                                                                                                                                                                                                                                                                                                  |
| `OAuthCacheDir`             | `string`              |                                                                                                                                                                                                                                                                                                                                  |
| `BasicAuthUsername`         | `string`              |                                                                                                                                                                                                                                                                                                                                  |
| `BasicAuthPassword`         | `string`              |                                                                                                                                                                                                                                                                                                                                  |
| `DefaultTenantID`           | `string`              |                                                                                                                                                                                                                                                                                                                                  |
| `UserAgent`                 | `string`              | UserAgent is an application identifier (e.g. "my-app/1.2", CAMUNDA_USER_AGENT) appended after the SDK's own camunda-orchestration-sdk-go/<version> token on every REST, OAuth and gRPC request. It never replaces the SDK token.                                                                                                 |
| `Falcon`                    | `bool`                | Falcon enables the FALCON (nanobpmn command-stream) transport upgrade when the gateway advertises it (CAMUNDA_FALCON, default true). ForceREST forces the pure-REST path even when FALCON is advertised (CAMUNDA_FORCE_REST), e.g. where WebSockets are blocked. Use FalconEnabled for the resolved state.                       |
| `ForceREST`                 | `bool`                |                                                                                                                                                                                                                                                                                                                                  |
| `BackpressureProfile`       | `BackpressureProfile` |                                                                                                                                                                                                                                                                                                                                  |
| `LogLevel`                  | `LogLevel`            |                                                                                                                                                                                                                                                                                                                                  |
| `EventualPollDefault`       | `time.Duration`       |                                                                                                                                                                                                                                                                                                                                  |
| `Retry`                     | `RetryConfig`         |                                                                                                                                                                                                                                                                                                                                  |
| `TLS`                       | `TLSConfig`           |                                                                                                                                                                                                                                                                                                                                  |
| `WorkerDefaults`            | `WorkerDefaults`      |                                                                                                                                                                                                                                                                                                                                  |
| `MaxIdleConns`              | `int`                 | MaxIdleConns and MaxIdleConnsPerHost size the SDK's own HTTP connection pool (CAMUNDA_SDK_HTTP_MAX_IDLE_CONNS / CAMUNDA_SDK_HTTP_MAX_IDLE_CONNS_PER_HOST, or WithMaxIdleConns / WithMaxIdleConnsPerHost). They apply only when the SDK builds the base transport itself — a user-supplied HTTPClient or Transport is used as-is. |
| `MaxIdleConnsPerHost`       | `int`                 |                                                                                                                                                                                                                                                                                                                                  |
| `MaxIdleConnsPinned`        | `bool`                | MaxIdleConnsPinned / MaxIdleConnsPerHostPinned pin the corresponding pool dimension, disabling automatic growth from worker capacity. They are set when the value comes from WithMaxIdleConns(PerHost) or CAMUNDA_SDK_HTTP_MAX_IDLE_CONNS(_PER_HOST).                                                                            |
| `MaxIdleConnsPerHostPinned` | `bool`                |                                                                                                                                                                                                                                                                                                                                  |
| `HTTPClient`                | `*http.Client`        | HTTPClient, when set (WithHTTPClient), is used for all REST calls as-is: the SDK's retry, backpressure, auth, and TLS layers are bypassed, and the MaxIdleConns(PerHost) settings do not apply. Mutually exclusive with Transport.                                                                                               |
| `Transport`                 | `http.RoundTripper`   | Transport, when set (WithTransport), replaces the base RoundTripper at the bottom of the SDK's chain (backpressure -> retry -> auth -> Transport). TLS material is not applied to it, and the MaxIdleConns(PerHost) settings do not apply. Mutually exclusive with HTTPClient.                                                   |
| `Clock`                     | `Clock`               | Clock resolves runtime cadence. Nil selects `LiveClock`.                                                                                                                                                                                                                                                                         |
| `Random`                    | `Random`              | Random is the source jitter is drawn from. Nil selects `LiveRandom`.                                                                                                                                                                                                                                                             |

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

#### GoString

```go
func (c Config) GoString() string
```

GoString renders the configuration in Go syntax for the %#v verb, with the
same credential redaction String applies.

#### String

```go
func (c Config) String() string
```

String renders the resolved configuration with every credential replaced by a
redaction marker, so logging a Config (`log.Printf("%+v", cfg)`) cannot spill
the client secret, the basic-auth password, the inline mTLS certificate or key
PEM, or the key passphrase. Non-secret settings are rendered in full.

Implementing String also covers the %v, %+v and %s verbs; GoString covers %#v.

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

| Field         | Type       | Description                                                                                                                                                                                                           |
| ------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Keys`        | `[]string` | Keys are the environment variable names checked in precedence order; the first non-empty value wins. The first entry is the canonical CAMUNDA_* name; later entries are accepted aliases (e.g. legacy ZEEBE_* names). |
| `Default`     | `string`   | Default is the value applied when none of Keys is set. Empty means the field has no built-in default (it stays unset / zero).                                                                                         |
| `Secret`      | `bool`     | Secret marks credential material that must be redacted in diagnostics.                                                                                                                                                |
| `Description` | `string`   | Description is a one-line human-readable summary.                                                                                                                                                                     |

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

#### WithClock

```go
func WithClock(c Clock) Option
```

WithClock sets the clock the client will resolve cadence through. Defaults to
`LiveClock`.

Runtime call sites are being migrated onto the injected clock (see
camunda/orchestration-cluster-api-go#40); until that lands the clock is stored and
reachable via CamundaClient.Clock, but retry backoff, the backpressure gate, token
refresh, worker polling and consistency polling still use real time.

A nil Clock selects the default. A _typed_ nil -- a nil pointer boxed in a non-nil
interface, such as (*myClock)(nil) -- is rejected by `New` with a configuration
error instead: unlike an untyped nil it claims to be a usable clock, and would
panic on first use deep inside the runtime.

#### WithDefaultTenantID

```go
func WithDefaultTenantID(id string) Option
```

WithDefaultTenantID sets the default tenant id applied to operations that
accept one.

#### WithExactRestAddress

```go
func WithExactRestAddress(exact bool) Option
```

WithExactRestAddress controls whether the SDK uses RestAddress exactly as
provided. When exact is true, the automatic /v2 suffix is not appended — the
address is used verbatim. This is intended for deployments behind an API
gateway / reverse proxy whose base path does not follow the .../v2 convention.
It maps to the CAMUNDA_REST_ADDRESS_EXACT environment variable.

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

#### WithHTTPClient

```go
func WithHTTPClient(client *http.Client) Option
```

WithHTTPClient supplies the *http.Client used for all REST calls. The client
is used as-is: the SDK's retry, backpressure, auth, and TLS layers are
bypassed, so the supplied client must carry everything the deployment needs.
Mutually exclusive with `WithTransport`; setting both fails `New` with a
configuration error.

#### WithLogLevel

```go
func WithLogLevel(l LogLevel) Option
```

WithLogLevel sets the SDK log level.

#### WithMaxIdleConns

```go
func WithMaxIdleConns(n int) Option
```

WithMaxIdleConns sets the maximum number of idle (keep-alive) connections the
SDK's HTTP transport keeps open across all hosts. It maps to the
CAMUNDA_SDK_HTTP_MAX_IDLE_CONNS environment variable and applies only when the
SDK builds the base transport itself (not with `WithHTTPClient` or
`WithTransport`).

The SDK default (256) deliberately replaces Go's http.DefaultTransport pool,
whose 2 idle connections per host force a job worker with many jobs in flight
to open and close a TCP connection per call — churning sockets into TIME_WAIT
and exhausting ephemeral ports (camunda/orchestration-cluster-api-go#162).
Without this option the pool also grows to cover the job workers created on
the client; setting it pins the value.

#### WithMaxIdleConnsPerHost

```go
func WithMaxIdleConnsPerHost(n int) Option
```

WithMaxIdleConnsPerHost sets the maximum number of idle (keep-alive)
connections the SDK's HTTP transport keeps open per host. It maps to the
CAMUNDA_SDK_HTTP_MAX_IDLE_CONNS_PER_HOST environment variable and applies only
when the SDK builds the base transport itself (not with `WithHTTPClient` or
`WithTransport`). Without this option the SDK grows the pool automatically to
the sum of the client's workers' MaxConcurrentJobs plus one poller each;
setting it pins the value. When pinning, the global `WithMaxIdleConns` limit
still caps the whole idle pool, so raise it as well (to at least this value,
or 0 for no global limit).

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

The cache holds a bearer token. dir is created mode 0700, entries are written
mode 0600 via an atomic rename, an expired entry is removed, and the cache is
disabled entirely when dir is writable by group or other. On Windows none of
that is enforced by the operating system — permission bits are largely ignored
there and a file inherits its directory's ACL — so do not enable the cache on
a shared Windows host. See the internal/auth package documentation for detail.

#### WithOAuthScope

```go
func WithOAuthScope(scope string) Option
```

WithOAuthScope sets the OAuth token scope.

#### WithRandom

```go
func WithRandom(r Random) Option
```

WithRandom sets the source of randomness the client draws jitter from: retry
backoff, worker startup delay and FALCON endpoint selection. Defaults to
`LiveRandom`. Pass a `SeededRandom` to make those draws reproducible.

A nil Random selects the default; a typed nil is rejected by `New`, as for
`WithClock`.

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

#### WithTransport

```go
func WithTransport(rt http.RoundTripper) Option
```

WithTransport replaces the base http.RoundTripper at the bottom of the SDK's
transport chain (backpressure -> retry -> auth -> Transport), so the SDK's
resilience layers still apply on top of it. TLS material is not applied to a
user-supplied transport — configure it on the transport itself. Mutually
exclusive with `WithHTTPClient`; setting both fails `New` with a
configuration error.

#### WithUserAgent

```go
func WithUserAgent(ua string) Option
```

WithUserAgent names the calling application (e.g. "my-app/1.2"). The value is
appended after the SDK's camunda-orchestration-sdk-go/<version> token in the
User-Agent of every REST, OAuth and gRPC request; it never replaces it.

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
over the *Path file locations.

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

#### GoString

```go
func (t TLSConfig) GoString() string
```

GoString renders the TLS material in Go syntax for the %#v verb, with the same
credential redaction String applies.

#### IsConfigured

```go
func (t TLSConfig) IsConfigured() bool
```

IsConfigured reports whether any TLS material has been supplied.

#### String

```go
func (t TLSConfig) String() string
```

String renders the TLS material with the inline certificate PEM, private key
PEM and key passphrase replaced by a redaction marker. The CA PEM and the
*Path file locations are not credentials and are rendered in full.

Implementing String also covers the %v, %+v and %s verbs; GoString covers %#v.

## WorkerDefaults

WorkerDefaults holds default job-worker settings sourced from CAMUNDA_WORKER_*.

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
