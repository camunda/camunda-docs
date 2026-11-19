---
id: configuration
title: "Configuration"
sidebar_label: "Configuration"
sidebar_position: 6
mdx:
  format: md
---

# Configuration

:::caution Technical Preview
The PHP SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

## Zero-config from the environment

The client reads the standard `CAMUNDA_*` environment variables and auto-detects the authentication strategy (`NONE`, `BASIC`, or `OAUTH`).

```php
function readme_zero_config(): void
{
    // Reads CAMUNDA_REST_ADDRESS and auto-detects the auth strategy from the
    // ambient environment (NONE / BASIC / OAUTH).
    $client = CamundaClient::fromEnvironment();
}
```

## Programmatic configuration

```php
function readme_programmatic_config(): void
{
    $config = new CamundaConfiguration(
        restAddress: 'https://my-cluster.example.com/v2',
        authStrategy: 'OAUTH',
        clientId: 'my-client-id',
        clientSecret: 'my-client-secret',
    );

    $client = CamundaClient::fromConfiguration($config);
}
```

## Basic auth

```php
function readme_basic_auth(): void
{
    $client = CamundaClient::fromEnvironment([
        'CAMUNDA_AUTH_STRATEGY' => 'BASIC',
        'CAMUNDA_BASIC_AUTH_USERNAME' => 'demo',
        'CAMUNDA_BASIC_AUTH_PASSWORD' => 'demo',
    ]);
}
```

## Loading a `.env` file

Set `CAMUNDA_LOAD_ENVFILE=true` to read `.env` in the working directory, or set
it to an explicit path. This optional capability requires
[`vlucas/phpdotenv`](https://packagist.org/packages/vlucas/phpdotenv).

```php
function env_file_client(): CamundaClient
{
    // Set CAMUNDA_LOAD_ENVFILE=true (or a path) before starting PHP. Real
    // environment variables and explicit overrides still take precedence.
    return CamundaClient::fromEnvironment();
}
```

## Mutual TLS

```php
function mtls_client(): CamundaClient
{
    return CamundaClient::fromConfiguration(new CamundaConfiguration(
        restAddress: 'https://my-cluster.example.com/v2',
        authStrategy: 'OAUTH',
        clientId: 'my-client-id',
        clientSecret: 'my-client-secret',
        mtlsCertPath: '/run/secrets/client.crt',
        mtlsKeyPath: '/run/secrets/client.key',
        mtlsCaPath: '/run/secrets/cluster-ca.pem',
    ));
}
```

## Custom Guzzle middleware

```php
function custom_http_client(CamundaConfiguration $configuration): CamundaClient
{
    // Supplying a Guzzle client replaces the SDK-built stack. Add the SDK auth
    // middleware and any proxy, tracing, or mTLS options your application needs.
    $stack = HandlerStack::create();
    $stack->push(new AuthMiddleware(AuthProviderFactory::fromConfiguration($configuration)), 'camunda_auth');

    return CamundaClient::fromConfiguration(
        $configuration,
        new GuzzleClient(['handler' => $stack, 'http_errors' => false]),
    );
}
```

## Retry and backoff

The SDK-built HTTP client retries transient failures with exponential backoff and full jitter. Option names, environment variables and defaults match the JS SDK:

```php
function retry_config_client(): CamundaClient
{
    // Same options and defaults as the JS SDK: 3 attempts, 100 ms base delay, 2 s cap.
    // Equivalent environment variables: CAMUNDA_SDK_HTTP_RETRY_MAX_ATTEMPTS,
    // CAMUNDA_SDK_HTTP_RETRY_BASE_DELAY_MS and CAMUNDA_SDK_HTTP_RETRY_MAX_DELAY_MS.
    return CamundaClient::fromConfiguration(new CamundaConfiguration(
        restAddress: 'https://my-cluster.example.com/v2',
        authStrategy: 'NONE',
        httpRetryMaxAttempts: 5,
        httpRetryBaseDelayMs: 200,
        httpRetryMaxDelayMs: 5_000,
    ));
}
```

What is retried:

- **HTTP 429**, always.
- **HTTP 503 and 500 that signal broker backpressure** (problem `title` or, for 500, `detail` containing `RESOURCE_EXHAUSTED`). Any other 500 or 503 is returned after a single request, as before.
- **Connection failures** (no response received), for idempotent methods only (`GET`, `HEAD`, `PUT`, `DELETE`, `OPTIONS`). A transport failure on a `POST` may have happened after the cluster accepted the command, so it is never replayed.

The wait before retry `n + 1` is a random value between 0 and `min(CAMUNDA_SDK_HTTP_RETRY_BASE_DELAY_MS * 2^(n-1), CAMUNDA_SDK_HTTP_RETRY_MAX_DELAY_MS)`. When the response carries a usable `Retry-After` header the wait is raised to at least that value (bounded at 60 seconds). Set `CAMUNDA_SDK_HTTP_RETRY_MAX_ATTEMPTS=1` to disable retry.

When every attempt fails, the SDK throws `RetryExhaustedException`, a subclass of `ApiException`. `getCode()` is the HTTP status of the final attempt (`0` if the final attempt received no response), the response headers and body are those of the final response, and `getAttempts()` reports how many requests were sent:

```php
function retry_exhausted(CamundaClient $client): void
{
    try {
        $client->completeJob('2251799813686200');
    } catch (RetryExhaustedException $e) {
        // The final status (429 here) and the number of requests actually sent.
        error_log(sprintf('gave up with HTTP %d after %d attempts', $e->getCode(), $e->getAttempts()));
    }
}
```

Notes:

- **Job activation is not retried inside the long poll.** `JobWorker` activation requests (`POST /jobs/activation`) are sent exactly once; a failed activation surfaces to the worker loop as it always has. Retrying inside a long poll would hold it open for several times its request timeout.
- **A Guzzle client you supply is not modified.** Retry is part of the SDK-built client only. Push `RetryMiddleware` onto your own handler stack to get the same behaviour:

```php
function custom_http_client_with_retry(CamundaConfiguration $configuration): CamundaClient
{
    // A client you supply is not wrapped by the SDK: push the retry middleware yourself
    // if you want the same behaviour.
    $stack = HandlerStack::create();
    // Push retry before auth so that every attempt picks up a fresh auth header.
    $stack->push(new RetryMiddleware(maxAttempts: 3, baseDelayMs: 100, maxDelayMs: 2_000), 'camunda_retry');
    $stack->push(new AuthMiddleware(AuthProviderFactory::fromConfiguration($configuration)), 'camunda_auth');

    return CamundaClient::fromConfiguration(
        $configuration,
        new GuzzleClient(['handler' => $stack, 'http_errors' => false]),
    );
}
```

## Credentials in debug output

`CamundaConfiguration` redacts `clientSecret`, `basicAuthPassword` and `mtlsKeyPassphrase` on the debug surfaces PHP lets an object intercept: `var_dump()` and `print_r()`, which both honour `__debugInfo()`, and `json_encode()`, which uses the configuration's `JsonSerializable` implementation. A credential that is set shows as `***`; one that is not set stays `null`. `CamundaClient` and `CamundaAsyncClient` do the same on `var_dump()` and `print_r()` and additionally summarise their Guzzle client by class name, because its options carry the mTLS key passphrase. The clients have no public properties, so `json_encode()` of a client contains no credentials either. Reading `$config->clientSecret` in your own code still returns the real value.

Two surfaces are exceptions, and **both still print credentials**:

- `var_export()` builds a `__set_state()` literal from the object's properties with no hook to intercept, and it exports private and protected properties just the same, so no change of property visibility would alter that.
- Symfony's VarDumper does not use `__debugInfo()` as the source of the values it shows: it dumps the object's real properties (checked with `symfony/var-dumper` 7.4, where `$config->clientSecret` appears in clear text next to the redacted debug view). That covers Symfony's `dump()` and `dd()` and Laravel's `dump()` and `dd()`, which are built on it, so debug pages and error screens that use them can show a credential.

Do not pass a configuration or client object to either, and keep their output out of log context.

## Supported environment variables

| Variable                               | Default                                      | Description                                                                                                                                                                                                                                                                                          |
| -------------------------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CAMUNDA_REST_ADDRESS`                 | `http://localhost:8080/v2`                   | Cluster REST endpoint. `/v2` is appended automatically when absent.                                                                                                                                                                                                                                  |
| `ZEEBE_REST_ADDRESS`                   | —                                            | Legacy alias for `CAMUNDA_REST_ADDRESS` (used only when the latter is unset).                                                                                                                                                                                                                        |
| `CAMUNDA_AUTH_STRATEGY`                | —                                            | `NONE`, `BASIC`, or `OAUTH`. Auto-detected from the supplied credentials when unset.                                                                                                                                                                                                                 |
| `CAMUNDA_CLIENT_ID`                    | —                                            | OAuth client id.                                                                                                                                                                                                                                                                                     |
| `CAMUNDA_CLIENT_SECRET`                | —                                            | OAuth client secret.                                                                                                                                                                                                                                                                                 |
| `CAMUNDA_CLIENT_AUTH_CLIENTID`         | —                                            | Legacy alias for `CAMUNDA_CLIENT_ID`.                                                                                                                                                                                                                                                                |
| `CAMUNDA_CLIENT_AUTH_CLIENTSECRET`     | —                                            | Legacy alias for `CAMUNDA_CLIENT_SECRET`.                                                                                                                                                                                                                                                            |
| `CAMUNDA_OAUTH_URL`                    | `https://login.cloud.camunda.io/oauth/token` | OAuth token endpoint.                                                                                                                                                                                                                                                                                |
| `CAMUNDA_TOKEN_AUDIENCE`               | `zeebe.camunda.io`                           | OAuth token audience.                                                                                                                                                                                                                                                                                |
| `CAMUNDA_BASIC_AUTH_USERNAME`          | —                                            | Basic-auth username.                                                                                                                                                                                                                                                                                 |
| `CAMUNDA_BASIC_AUTH_PASSWORD`          | —                                            | Basic-auth password.                                                                                                                                                                                                                                                                                 |
| `CAMUNDA_TENANT_ID`                    | —                                            | Default tenant id applied to tenant-scoped commands when the caller passes none (`<default>` when unset).                                                                                                                                                                                            |
| `CAMUNDA_TENANT_IDS`                   | —                                            | Comma-separated default tenant ids (e.g. for job activation).                                                                                                                                                                                                                                        |
| `CAMUNDA_SDK_LOG_LEVEL`                | `warn`                                       | SDK log level (`error`, `warn`, `info`, `debug`).                                                                                                                                                                                                                                                    |
| `CAMUNDA_WORKER_MAX_CONCURRENT_JOBS`   | `32`                                         | Default maximum number of jobs a worker activates at once.                                                                                                                                                                                                                                           |
| `CAMUNDA_WORKER_TIMEOUT`               | `60000`                                      | Default job activation timeout, in milliseconds.                                                                                                                                                                                                                                                     |
| `CAMUNDA_WORKER_REQUEST_TIMEOUT`       | `10000`                                      | Default long-poll request timeout, in milliseconds.                                                                                                                                                                                                                                                  |
| `CAMUNDA_WORKER_NAME`                  | —                                            | Default worker name reported when activating jobs.                                                                                                                                                                                                                                                   |
| `CAMUNDA_SDK_HTTP_RETRY_MAX_ATTEMPTS`  | `3`                                          | Maximum total HTTP attempts (including the first) for transient failures: 429, broker backpressure (`RESOURCE_EXHAUSTED` on 500/503) and, for idempotent methods, connection failures. `1` disables retry. Applies to the SDK-built HTTP client only; the job-activation long poll is never retried. |
| `CAMUNDA_SDK_HTTP_RETRY_BASE_DELAY_MS` | `100`                                        | Base delay in milliseconds for exponential backoff with full jitter between HTTP retries. A `Retry-After` header raises the wait to at least the server value (capped at 60 seconds).                                                                                                                |
| `CAMUNDA_SDK_HTTP_RETRY_MAX_DELAY_MS`  | `2000`                                       | Maximum delay cap in milliseconds for HTTP retry backoff.                                                                                                                                                                                                                                            |
| `CAMUNDA_MTLS_CERT_PATH`               | —                                            | Path to the client certificate for mutual TLS.                                                                                                                                                                                                                                                       |
| `CAMUNDA_MTLS_KEY_PATH`                | —                                            | Path to the client private key for mutual TLS.                                                                                                                                                                                                                                                       |
| `CAMUNDA_MTLS_CA_PATH`                 | —                                            | Path to the CA bundle used to verify the server certificate.                                                                                                                                                                                                                                         |
| `CAMUNDA_MTLS_KEY_PASSPHRASE`          | —                                            | Passphrase protecting the mTLS client key, if any.                                                                                                                                                                                                                                                   |
| `CAMUNDA_LOAD_ENVFILE`                 | —                                            | Load configuration from a `.env` file. Set to `true` or a file path.                                                                                                                                                                                                                                 |
