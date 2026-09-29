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

## Basic authentication

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

## Supported environment variables

| Variable                             | Default                                      | Description                                                                          |
| ------------------------------------ | -------------------------------------------- | ------------------------------------------------------------------------------------ |
| `CAMUNDA_REST_ADDRESS`               | `http://localhost:8080/v2`                   | Cluster REST endpoint. `/v2` is appended automatically when absent.                  |
| `ZEEBE_REST_ADDRESS`                 | —                                            | Legacy alias for `CAMUNDA_REST_ADDRESS` (used only when the latter is unset).        |
| `CAMUNDA_AUTH_STRATEGY`              | —                                            | `NONE`, `BASIC`, or `OAUTH`. Auto-detected from the supplied credentials when unset. |
| `CAMUNDA_CLIENT_ID`                  | —                                            | OAuth client id.                                                                     |
| `CAMUNDA_CLIENT_SECRET`              | —                                            | OAuth client secret.                                                                 |
| `CAMUNDA_CLIENT_AUTH_CLIENTID`       | —                                            | Legacy alias for `CAMUNDA_CLIENT_ID`.                                                |
| `CAMUNDA_CLIENT_AUTH_CLIENTSECRET`   | —                                            | Legacy alias for `CAMUNDA_CLIENT_SECRET`.                                            |
| `CAMUNDA_OAUTH_URL`                  | `https://login.cloud.camunda.io/oauth/token` | OAuth token endpoint.                                                                |
| `CAMUNDA_TOKEN_AUDIENCE`             | `zeebe.camunda.io`                           | OAuth token audience.                                                                |
| `CAMUNDA_BASIC_AUTH_USERNAME`        | —                                            | Basic-auth username.                                                                 |
| `CAMUNDA_BASIC_AUTH_PASSWORD`        | —                                            | Basic-auth password.                                                                 |
| `CAMUNDA_TENANT_ID`                  | —                                            | Default tenant id applied to tenant-aware operations.                                |
| `CAMUNDA_TENANT_IDS`                 | —                                            | Comma-separated default tenant ids (e.g. for job activation).                        |
| `CAMUNDA_SDK_LOG_LEVEL`              | `warn`                                       | SDK log level (`error`, `warn`, `info`, `debug`).                                    |
| `CAMUNDA_WORKER_MAX_CONCURRENT_JOBS` | `32`                                         | Default maximum number of jobs a worker activates at once.                           |
| `CAMUNDA_WORKER_TIMEOUT`             | `60000`                                      | Default job activation timeout, in milliseconds.                                     |
| `CAMUNDA_WORKER_REQUEST_TIMEOUT`     | `10000`                                      | Default long-poll request timeout, in milliseconds.                                  |
| `CAMUNDA_WORKER_NAME`                | —                                            | Default worker name reported when activating jobs.                                   |
| `CAMUNDA_MTLS_CERT_PATH`             | —                                            | Path to the client certificate for mutual TLS.                                       |
| `CAMUNDA_MTLS_KEY_PATH`              | —                                            | Path to the client private key for mutual TLS.                                       |
| `CAMUNDA_MTLS_CA_PATH`               | —                                            | Path to the CA bundle used to verify the server certificate.                         |
| `CAMUNDA_MTLS_KEY_PASSPHRASE`        | —                                            | Passphrase protecting the mTLS client key, if any.                                   |
| `CAMUNDA_LOAD_ENVFILE`               | —                                            | Load configuration from a `.env` file. Set to `true` or a file path.                 |
