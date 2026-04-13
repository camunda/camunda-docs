---
id: quick-start-zero-config-recommended
title: "Quick Start (Zero-Config — Recommended)"
sidebar_label: "Quick Start (Zero-Config — Recommended)"
sidebar_position: 4
mdx:
  format: md
---

# Quick Start (Zero-Config — Recommended)

:::caution Technical Preview
The C# SDK is a **technical preview** available from Camunda 8.9. It will become fully supported in Camunda 8.10. Its API surface may change in future releases without following semver.
:::

Keep configuration out of application code. Let the factory read `CAMUNDA_*` variables from the environment (12-factor style). This makes rotation, secret management, and environment promotion safer and simpler.

<!-- snippet-source: docs/examples/ReadmeExamples.cs | regions: UsingDirective+QuickStart -->

```csharp
using Camunda.Orchestration.Sdk;

// Zero-config construction: reads CAMUNDA_* from environment variables.
// If no configuration is present, defaults to Camunda 8 Run on localhost.
using var client = CamundaClient.Create();

var topology = await client.GetTopologyAsync();
Console.WriteLine($"Brokers: {topology.Brokers?.Count ?? 0}");
```

Typical environment (example):

```bash
CAMUNDA_REST_ADDRESS=https://cluster.example   # SDK appends /v2 automatically
CAMUNDA_AUTH_STRATEGY=OAUTH
CAMUNDA_CLIENT_ID=***
CAMUNDA_CLIENT_SECRET=***
CAMUNDA_OAUTH_URL=https://login.cloud.camunda.io/oauth/token
CAMUNDA_DEFAULT_TENANT_ID=<default>            # optional: override default tenant
```

> **Why zero-config?**
>
> - **Separation of concerns**: business code depends on an interface, not on secrets/constants wiring.
> - **12-Factor alignment**: config lives in the environment → simpler promotion (dev → staging → prod).
> - **Secret rotation**: rotate credentials without a code change or redeploy.
> - **Immutable start**: single hydration pass prevents drift / mid-request mutations.
> - **Test ergonomics**: swap env vars per test without touching source; create multiple clients for multi-tenant tests.
> - **Security review**: fewer code paths handling secrets; scanners & vault tooling work at the boundary.
> - **Deploy portability**: same artifact runs everywhere; only the environment differs.
> - **Cross-SDK consistency**: identical variable names across JavaScript, C#, and Python SDKs.

## Programmatic Overrides (Advanced)

Use only when you must supply or mutate configuration dynamically (e.g. multi-tenant routing, tests, ephemeral preview environments). Keys mirror their `CAMUNDA_*` env names:

<!-- snippet-source: docs/examples/ReadmeExamples.cs | regions: UsingDirective+ProgrammaticOverrides -->

```csharp
using Camunda.Orchestration.Sdk;

using var client = CamundaClient.Create(new CamundaOptions
{
    Config = new Dictionary<string, string>
    {
        ["CAMUNDA_REST_ADDRESS"] = "https://my-cluster.camunda.io",
        ["CAMUNDA_AUTH_STRATEGY"] = "OAUTH",
        ["CAMUNDA_CLIENT_ID"] = "my-client-id",
        ["CAMUNDA_CLIENT_SECRET"] = "my-secret",
        ["CAMUNDA_OAUTH_URL"] = "https://login.cloud.camunda.io/oauth/token",
        ["CAMUNDA_TOKEN_AUDIENCE"] = "zeebe.camunda.io",
    },
});
```

## Configuration via `appsettings.json`

The SDK can read configuration from any `IConfiguration` source (appsettings.json, user secrets, Azure Key Vault, etc.) using idiomatic .NET PascalCase section keys:

```json
{
  "Camunda": {
    "RestAddress": "https://cluster.example.com",
    "Auth": {
      "Strategy": "OAUTH",
      "ClientId": "my-client-id",
      "ClientSecret": "my-secret"
    },
    "OAuth": {
      "Url": "https://login.cloud.camunda.io/oauth/token"
    },
    "Backpressure": {
      "Profile": "CONSERVATIVE"
    }
  }
}
```

Pass the section to the client:

<!-- snippet-source: docs/examples/ReadmeExamples.cs | regions: UsingDirective+AppSettingsConfig -->

```csharp
using Camunda.Orchestration.Sdk;

var builder = WebApplication.CreateBuilder(args);

using var client = CamundaClient.Create(new CamundaOptions
{
    Configuration = builder.Configuration.GetSection("Camunda"),
});
```

Precedence (highest wins): `Config` dictionary > `IConfiguration` section > environment variables > defaults.

This means you can set secrets via environment variables (or a vault) and non-sensitive settings via `appsettings.json` — they layer naturally:

```json
// appsettings.json — non-sensitive, checked into source control
{
  "Camunda": {
    "RestAddress": "https://cluster.example.com",
    "Backpressure": { "Profile": "CONSERVATIVE" }
  }
}
```

```bash
# Secrets injected via environment (vault, CI, container orchestrator)
CAMUNDA_CLIENT_ID=***
CAMUNDA_CLIENT_SECRET=***
CAMUNDA_OAUTH_URL=https://login.cloud.camunda.io/oauth/token
```

<details>
<summary>appsettings.json key reference</summary>

| appsettings.json key              | Maps to env var                                 |
| --------------------------------- | ----------------------------------------------- |
| `RestAddress`                     | `CAMUNDA_REST_ADDRESS`                          |
| `TokenAudience`                   | `CAMUNDA_TOKEN_AUDIENCE`                        |
| `DefaultTenantId`                 | `CAMUNDA_DEFAULT_TENANT_ID`                     |
| `LogLevel`                        | `CAMUNDA_SDK_LOG_LEVEL`                         |
| `Validation`                      | `CAMUNDA_SDK_VALIDATION`                        |
| `Auth:Strategy`                   | `CAMUNDA_AUTH_STRATEGY`                         |
| `Auth:ClientId`                   | `CAMUNDA_CLIENT_ID`                             |
| `Auth:ClientSecret`               | `CAMUNDA_CLIENT_SECRET`                         |
| `Auth:BasicUsername`              | `CAMUNDA_BASIC_AUTH_USERNAME`                   |
| `Auth:BasicPassword`              | `CAMUNDA_BASIC_AUTH_PASSWORD`                   |
| `OAuth:Url`                       | `CAMUNDA_OAUTH_URL`                             |
| `OAuth:ClientId`                  | `CAMUNDA_CLIENT_ID`                             |
| `OAuth:ClientSecret`              | `CAMUNDA_CLIENT_SECRET`                         |
| `OAuth:GrantType`                 | `CAMUNDA_OAUTH_GRANT_TYPE`                      |
| `OAuth:Scope`                     | `CAMUNDA_OAUTH_SCOPE`                           |
| `OAuth:TimeoutMs`                 | `CAMUNDA_OAUTH_TIMEOUT_MS`                      |
| `OAuth:RetryMax`                  | `CAMUNDA_OAUTH_RETRY_MAX`                       |
| `OAuth:RetryBaseDelayMs`          | `CAMUNDA_OAUTH_RETRY_BASE_DELAY_MS`             |
| `HttpRetry:MaxAttempts`           | `CAMUNDA_SDK_HTTP_RETRY_MAX_ATTEMPTS`           |
| `HttpRetry:BaseDelayMs`           | `CAMUNDA_SDK_HTTP_RETRY_BASE_DELAY_MS`          |
| `HttpRetry:MaxDelayMs`            | `CAMUNDA_SDK_HTTP_RETRY_MAX_DELAY_MS`           |
| `Backpressure:Profile`            | `CAMUNDA_SDK_BACKPRESSURE_PROFILE`              |
| `Backpressure:InitialMax`         | `CAMUNDA_SDK_BACKPRESSURE_INITIAL_MAX`          |
| `Backpressure:SoftFactor`         | `CAMUNDA_SDK_BACKPRESSURE_SOFT_FACTOR`          |
| `Backpressure:SevereFactor`       | `CAMUNDA_SDK_BACKPRESSURE_SEVERE_FACTOR`        |
| `Backpressure:RecoveryIntervalMs` | `CAMUNDA_SDK_BACKPRESSURE_RECOVERY_INTERVAL_MS` |
| `Backpressure:RecoveryStep`       | `CAMUNDA_SDK_BACKPRESSURE_RECOVERY_STEP`        |
| `Backpressure:DecayQuietMs`       | `CAMUNDA_SDK_BACKPRESSURE_DECAY_QUIET_MS`       |
| `Backpressure:Floor`              | `CAMUNDA_SDK_BACKPRESSURE_FLOOR`                |
| `Backpressure:SevereThreshold`    | `CAMUNDA_SDK_BACKPRESSURE_SEVERE_THRESHOLD`     |
| `Eventual:PollDefaultMs`          | `CAMUNDA_SDK_EVENTUAL_POLL_DEFAULT_MS`          |

</details>

## Dependency Injection (`AddCamundaClient`)

For ASP.NET Core and other DI-based applications, use the `AddCamundaClient()` extension method on `IServiceCollection`. The client is registered as a singleton and automatically picks up `ILoggerFactory` from the container.

**Zero-config** (environment variables only):

<!-- snippet-source: docs/examples/ReadmeExamples.cs | regions: UsingDirective+DIZeroConfig -->

```csharp
using Camunda.Orchestration.Sdk;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCamundaClient();
```

**With `appsettings.json`**:

<!-- snippet-source: docs/examples/ReadmeExamples.cs | regions: UsingDirective+DIAppSettings -->

```csharp
using Camunda.Orchestration.Sdk;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCamundaClient(builder.Configuration.GetSection("Camunda"));
```

**With options callback** (full control):

<!-- snippet-source: docs/examples/ReadmeExamples.cs | regions: UsingDirective+DIOptionsCallback -->

```csharp
using Camunda.Orchestration.Sdk;

builder.Services.AddCamundaClient(options =>
{
    options.Configuration = builder.Configuration.GetSection("Camunda");
    // or: options.Config = new Dictionary<string, string> { ... };
});
```

Inject the client anywhere via constructor injection:

<!-- snippet-source: docs/examples/ReadmeExamples.cs | regions: DIControllerInjection -->

```csharp
public class OrderController(CamundaClient camunda) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> StartProcess()
    {
        var result = await camunda.CreateProcessInstanceAsync(
            new ProcessInstanceCreationInstructionById
            {
                ProcessDefinitionId = ProcessDefinitionId.AssumeExists("order-process"),
            });
        return Ok(result);
    }
}
```

## Custom HttpClient

<!-- snippet-source: docs/examples/ReadmeExamples.cs | regions: UsingDirective+CustomHttpClient -->

```csharp
using Camunda.Orchestration.Sdk;

var httpClient = new HttpClient { BaseAddress = new Uri("https://my-cluster/v2/") };
using var client = CamundaClient.Create(new CamundaOptions
{
    HttpClient = httpClient,
});
```
