---
id: logging
title: "Logging"
sidebar_label: "Logging"
sidebar_position: 9
mdx:
  format: md
---

# Logging

:::caution Technical Preview
The C# SDK is a **technical preview** available from Camunda 8.9. It will become fully supported in Camunda 8.10. Its API surface may change in future releases without following semver.
:::

The SDK uses `Microsoft.Extensions.Logging` — the standard .NET logging abstraction. This means it integrates with any logging framework that supports `ILoggerFactory` (Serilog, NLog, the built-in console logger, etc.).

## Default Behavior

When no logger is injected, the SDK uses a built-in console logger filtered by `CAMUNDA_SDK_LOG_LEVEL`:

| `CAMUNDA_SDK_LOG_LEVEL` | What is logged                                                   |
| ----------------------- | ---------------------------------------------------------------- |
| `error` (default)       | Errors only                                                      |
| `warn`                  | Errors + warnings                                                |
| `info`                  | + OAuth token events, worker start/stop                          |
| `debug`                 | + HTTP requests/responses, retry decisions, backpressure changes |
| `trace`                 | + tenant injection, internal diagnostics                         |
| `silent`                | Nothing (same as `NullLoggerFactory`)                            |

Output uses a tagged format matching the JS SDK:

```
[camunda-sdk][info][CamundaClient] CamundaClient constructed with auth strategy OAuth
[camunda-sdk][debug][CamundaClient] HTTP POST process-instances/search -> 200
[camunda-sdk][info][JobWorker.worker-process-order-1] JobWorker 'worker-process-order-1' started for type 'process-order'
```

## Injecting Your Own Logger

Pass an `ILoggerFactory` via `CamundaOptions` to integrate with your application's logging:

<!-- snippet-source: docs/examples/ReadmeExamples.cs | regions: UsingDirective+InjectLogger -->

```csharp
using Camunda.Orchestration.Sdk;

using var loggerFactory = LoggerFactory.Create(builder =>
{
    builder
        .AddConsole()
        .SetMinimumLevel(LogLevel.Debug);
});

using var client = CamundaClient.Create(new CamundaOptions
{
    LoggerFactory = loggerFactory,
});
```

When an `ILoggerFactory` is provided, `CAMUNDA_SDK_LOG_LEVEL` is ignored — filtering is controlled entirely by the injected factory.

## ASP.NET Core / Dependency Injection

When using `AddCamundaClient()`, the SDK automatically resolves `ILoggerFactory` from the DI container — no manual wiring needed:

<!-- snippet-source: docs/examples/ReadmeExamples.cs | regions: UsingDirective+DILogging -->

```csharp
using Camunda.Orchestration.Sdk;

var builder = WebApplication.CreateBuilder(args);

// Logging configuration
builder.Logging.SetMinimumLevel(LogLevel.Debug);

// SDK automatically uses the host's ILoggerFactory
builder.Services.AddCamundaClient(builder.Configuration.GetSection("Camunda"));
```

All SDK log entries appear alongside your application logs with proper category names (`Camunda.Orchestration.Sdk.CamundaClient`, `Camunda.Orchestration.Sdk.JobWorker.*`, etc.).

## Serilog Integration

<!-- snippet-source: docs/examples/ReadmeExamples.cs | regions: SerilogIntegration -->

```csharp
Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Debug()
    .WriteTo.Console()
    .CreateLogger();

using var loggerFactory = new SerilogLoggerFactory();
using var client = CamundaClient.Create(new CamundaOptions
{
    LoggerFactory = loggerFactory,
});
```

## What Gets Logged

| Component             | Level   | Events                                            |
| --------------------- | ------- | ------------------------------------------------- |
| `CamundaClient`       | Debug   | HTTP request method + path, response status codes |
| `CamundaClient`       | Warning | HTTP request failures (non-2xx)                   |
| `CamundaClient`       | Trace   | Default tenant ID injection                       |
| `OAuthManager`        | Debug   | Token request attempts                            |
| `OAuthManager`        | Info    | Token acquired (with effective expiry)            |
| `BackpressureManager` | Debug   | Permit reduction/recovery                         |
| `HttpRetryExecutor`   | Debug   | Retry attempts with delay and reason              |
| `JobWorker.*`         | Info    | Worker started, worker stopped                    |
| `JobWorker.*`         | Debug   | Job completed                                     |
| `JobWorker.*`         | Error   | Handler exceptions, poll failures                 |
| `EventualPoller`      | Debug   | Consistency polling progress                      |
