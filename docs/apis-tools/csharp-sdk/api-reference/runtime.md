---
title: "Runtime"
sidebar_label: "Runtime"
mdx:
  format: md
---

# Runtime

:::caution Technical Preview
The C# SDK is a **technical preview** available from Camunda 8.9. It will become fully supported in Camunda 8.10. Its API surface may change in future releases without following semver.
:::

Runtime infrastructure types: job workers, backpressure management, eventual consistency polling, error handling, and key serialization.

## ICamundaKey

_interface_

Marker interface for all Camunda domain key types.
Enables generic constraints and JSON converter discovery.

```csharp
public interface ICamundaKey
```

### Properties

| Property | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `Value`  | `String` | The underlying string value. |

## ICamundaLongKey

_interface_

Marker interface for Camunda domain types backed by a long (int64) value.

```csharp
public interface ICamundaLongKey
```

### Properties

| Property | Type    | Description                |
| -------- | ------- | -------------------------- |
| `Value`  | `Int64` | The underlying long value. |

## ITenantIdSettable

_interface_

Implemented by request body types that have an optional tenantId property.
The SDK uses this to inject the configured default tenant ID when the caller
does not supply one explicitly.

```csharp
public interface ITenantIdSettable
```

### Methods

#### SetDefaultTenantId(string)

```csharp
void SetDefaultTenantId(string tenantId)
```

Sets the tenant ID if it has not already been set by the caller.

| Parameter  | Type     | Description |
| ---------- | -------- | ----------- |
| `tenantId` | `String` |             |

## ActivatedJob

_class_

An activated job received from the Camunda broker, with typed variable access.
This is what job handler functions receive.

```csharp
public sealed class ActivatedJob
```

### Properties

| Property                   | Type                       | Description                                           |
| -------------------------- | -------------------------- | ----------------------------------------------------- |
| `Type`                     | `String`                   | The job type (matches the BPMN task definition type). |
| `ProcessDefinitionId`      | `ProcessDefinitionId`      | The BPMN process ID of the job's process definition.  |
| `ProcessDefinitionVersion` | `Int32`                    | The version of the job's process definition.          |
| `ElementId`                | `ElementId`                | The associated task element ID.                       |
| `CustomHeaders`            | `Object`                   | Raw custom headers (typically a at runtime).          |
| `Worker`                   | `String`                   | The name of the worker that activated this job.       |
| `Retries`                  | `Int32`                    | Retries remaining for this job.                       |
| `Deadline`                 | `Int64`                    | UNIX epoch timestamp (ms) when the job lock expires.  |
| `Variables`                | `Object`                   | Raw variables (typically a at runtime).               |
| `TenantId`                 | `TenantId`                 | The tenant that owns this job.                        |
| `JobKey`                   | `JobKey`                   | Unique identifier for this job.                       |
| `ProcessInstanceKey`       | `ProcessInstanceKey`       | The process instance this job belongs to.             |
| `ProcessDefinitionKey`     | `ProcessDefinitionKey`     | The process definition key.                           |
| `ElementInstanceKey`       | `ElementInstanceKey`       | The element instance key.                             |
| `Kind`                     | `JobKindEnum`              | The job kind.                                         |
| `ListenerEventType`        | `JobListenerEventTypeEnum` | The listener event type.                              |
| `UserTask`                 | `UserTaskProperties`       | User task properties (if this is a user task job).    |
| `Tags`                     | `List<Tag>`                | Tags associated with this job.                        |

### Methods

#### GetVariables<T>(JsonSerializerOptions?)

```csharp
public T? GetVariables<T>(JsonSerializerOptions? options = null)
```

Deserialize the job's variables payload into a strongly-typed DTO.

| Parameter | Type                    | Description                                                  |
| --------- | ----------------------- | ------------------------------------------------------------ |
| `options` | `JsonSerializerOptions` | Optional JSON serializer options. Uses camelCase by default. |

**Returns:** `<T>`

#### GetCustomHeaders<T>(JsonSerializerOptions?)

```csharp
public T? GetCustomHeaders<T>(JsonSerializerOptions? options = null)
```

Deserialize the job's customHeaders payload into a strongly-typed DTO.

| Parameter | Type                    | Description                                                  |
| --------- | ----------------------- | ------------------------------------------------------------ |
| `options` | `JsonSerializerOptions` | Optional JSON serializer options. Uses camelCase by default. |

**Returns:** `<T>`

## BackpressureState

_class_

```csharp
public sealed class BackpressureState
```

### Properties

| Property      | Type              | Description |
| ------------- | ----------------- | ----------- |
| `Severity`    | `String`          |             |
| `PermitsMax`  | `Nullable<Int32>` |             |
| `Consecutive` | `Int32`           |             |

## CamundaKeyJsonConverterFactory

_class_

JSON converter factory that handles any struct.
Serializes as a plain JSON string; deserializes by calling the static AssumeExists factory.

```csharp
public sealed class CamundaKeyJsonConverterFactory : JsonConverterFactory
```

### Methods

#### CanConvert(Type)

```csharp
public override bool CanConvert(Type typeToConvert)
```

When overridden in a derived class, determines whether the converter instance can convert the specified object type.

| Parameter       | Type   | Description                                                                             |
| --------------- | ------ | --------------------------------------------------------------------------------------- |
| `typeToConvert` | `Type` | The type of the object to check whether it can be converted by this converter instance. |

**Returns:** `Boolean` — true if the instance can convert the specified object type; otherwise, false.

#### CreateConverter(Type, JsonSerializerOptions)

```csharp
public override JsonConverter CreateConverter(Type typeToConvert, JsonSerializerOptions options)
```

Creates a converter for a specified type.

| Parameter       | Type                    | Description                        |
| --------------- | ----------------------- | ---------------------------------- |
| `typeToConvert` | `Type`                  | The type handled by the converter. |
| `options`       | `JsonSerializerOptions` | The serialization options to use.  |

**Returns:** `JsonConverter` — A converter for which T is compatible with typeToConvert.

## CamundaKeyValidation

_class_

Validation helpers for domain key constraints.

```csharp
public static class CamundaKeyValidation
```

### Methods

#### AssertConstraints(string, string, string?, int?, int?)

```csharp
public static void AssertConstraints(string value, string typeName, string? pattern = null, int? minLength = null, int? maxLength = null)
```

Validates a value against optional constraints (pattern, minLength, maxLength).
Throws if validation fails.

| Parameter   | Type              | Description |
| ----------- | ----------------- | ----------- |
| `value`     | `String`          |             |
| `typeName`  | `String`          |             |
| `pattern`   | `String`          |             |
| `minLength` | `Nullable<Int32>` |             |
| `maxLength` | `Nullable<Int32>` |             |

#### CheckConstraints(string, string?, int?, int?)

```csharp
public static bool CheckConstraints(string value, string? pattern = null, int? minLength = null, int? maxLength = null)
```

Validates a value against optional constraints, returning true if valid.

| Parameter   | Type              | Description |
| ----------- | ----------------- | ----------- |
| `value`     | `String`          |             |
| `pattern`   | `String`          |             |
| `minLength` | `Nullable<Int32>` |             |
| `maxLength` | `Nullable<Int32>` |             |

**Returns:** `Boolean`

## CamundaLongKeyJsonConverterFactory

_class_

JSON converter factory that handles any struct.
Serializes as a JSON number; deserializes by calling the static AssumeExists factory.

```csharp
public sealed class CamundaLongKeyJsonConverterFactory : JsonConverterFactory
```

### Methods

#### CanConvert(Type)

```csharp
public override bool CanConvert(Type typeToConvert)
```

When overridden in a derived class, determines whether the converter instance can convert the specified object type.

| Parameter       | Type   | Description                                                                             |
| --------------- | ------ | --------------------------------------------------------------------------------------- |
| `typeToConvert` | `Type` | The type of the object to check whether it can be converted by this converter instance. |

**Returns:** `Boolean` — true if the instance can convert the specified object type; otherwise, false.

#### CreateConverter(Type, JsonSerializerOptions)

```csharp
public override JsonConverter CreateConverter(Type typeToConvert, JsonSerializerOptions options)
```

Creates a converter for a specified type.

| Parameter       | Type                    | Description                        |
| --------------- | ----------------------- | ---------------------------------- |
| `typeToConvert` | `Type`                  | The type handled by the converter. |
| `options`       | `JsonSerializerOptions` | The serialization options to use.  |

**Returns:** `JsonConverter` — A converter for which T is compatible with typeToConvert.

## ConsistencyOptions<T>

_class_

Options for eventual consistency polling behavior.

```csharp
public sealed class ConsistencyOptions<T>
```

### Properties

| Property         | Type       | Description                                                                                                                                        |
| ---------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `WaitUpToMs`     | `Int32`    | Maximum time to wait for the data to become consistent, in milliseconds. Set to 0 to skip eventual consistency handling.                           |
| `PollIntervalMs` | `Int32`    | Poll interval in milliseconds (default: 500).                                                                                                      |
| `IsConsistent`   | `Boolean}` | Optional predicate: when true, the response is considered consistent. If not set, any non-null response with items (where applicable) is accepted. |

## ExtendedDeploymentResponse

_class_

Extended deployment result with typed convenience properties for direct access
to deployed artifacts by category (processes, decisions, forms, etc.).

```csharp
public sealed class ExtendedDeploymentResponse
```

### Properties

| Property               | Type                                         | Description                                   |
| ---------------------- | -------------------------------------------- | --------------------------------------------- |
| `Raw`                  | `CreateDeploymentResponse`                   | The underlying raw deployment response.       |
| `DeploymentKey`        | `DeploymentKey`                              | The unique key identifying the deployment.    |
| `TenantId`             | `TenantId`                                   | The tenant ID associated with the deployment. |
| `Deployments`          | `List<DeploymentMetadataResult>`             | All items deployed by the request.            |
| `Processes`            | `List<DeploymentProcessResult>`              | Deployed process definitions.                 |
| `Decisions`            | `List<DeploymentDecisionResult>`             | Deployed decision definitions.                |
| `DecisionRequirements` | `List<DeploymentDecisionRequirementsResult>` | Deployed decision requirements.               |
| `Forms`                | `List<DeploymentFormResult>`                 | Deployed forms.                               |
| `Resources`            | `List<DeploymentResourceResult>`             | Deployed resources.                           |

## JobWorker

_class_

A long-running worker that polls the Camunda broker for jobs of a specific type,
dispatches them to a handler, and auto-completes or auto-fails based on the outcome.

Concurrency model: jobs are dispatched as concurrent s
on the .NET thread pool. controls how
many jobs may be in-flight simultaneously. For async handlers (the typical case), the
thread pool thread is released during await points, so many jobs can be handled
by a small number of OS threads. For CPU-bound handlers, set MaxConcurrentJobs
to to match available cores.

```csharp
public sealed class JobWorker : IAsyncDisposable, IDisposable
```

### Properties

| Property     | Type      | Description                                        |
| ------------ | --------- | -------------------------------------------------- |
| `ActiveJobs` | `Int32`   | Number of jobs currently being processed.          |
| `IsRunning`  | `Boolean` | Whether the poll loop is currently running.        |
| `Name`       | `String`  | The worker's name (auto-generated or from config). |

### Methods

#### Start()

```csharp
public void Start()
```

Start the polling loop. No-op if already running.

#### StopAsync(TimeSpan?)

```csharp
public Task<StopResult> StopAsync(TimeSpan? gracePeriod = null)
```

Stop the polling loop and optionally wait for in-flight jobs to drain.

| Parameter     | Type                 | Description                                                        |
| ------------- | -------------------- | ------------------------------------------------------------------ |
| `gracePeriod` | `Nullable<TimeSpan>` | Maximum time to wait for active jobs to finish. null = don't wait. |

**Returns:** `Task<StopResult>` — A snapshot of remaining active jobs and whether the grace period was exceeded.

#### DisposeAsync()

```csharp
public ValueTask DisposeAsync()
```

Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources asynchronously.

**Returns:** `ValueTask` — A task that represents the asynchronous dispose operation.

#### Dispose()

```csharp
public void Dispose()
```

Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.

## TypedVariables

_class_

Extension methods for deserializing Camunda variable and custom header payloads
from untyped object properties into strongly-typed DTOs.

Camunda API responses return variables and customHeaders as
object properties which, at runtime, are values.
These extensions let you opt in to typed deserialization:

// Define your domain DTO
public record OrderVars(string OrderId, decimal Amount);

// Deserialize variables from a process instance result
var result = await client.CreateProcessInstanceAsync(
new ProcessInstanceCreationInstructionById
{
ProcessDefinitionId = ProcessDefinitionId.AssumeExists("order-process"),
Variables = new OrderVars("ord-123", 99.99m), // input: just assign your DTO
});

var vars = result.Variables.DeserializeAs&lt;OrderVars&gt;(); // output: typed extraction

For input (sending variables), simply assign your DTO to the Variables
property — System.Text.Json serializes the runtime type automatically.

For output (receiving variables), call on the
Variables or CustomHeaders property to deserialize the underlying
into your DTO type.

```csharp
public static class TypedVariables
```

### Methods

#### DeserializeAs<T>(object?, JsonSerializerOptions?)

```csharp
public static T? DeserializeAs<T>(this object? payload, JsonSerializerOptions? options = null)
```

Deserializes a Camunda variable or custom header payload to the specified type.
Works on object properties that are at runtime
(the standard shape returned by the Camunda REST API).

| Parameter | Type                    | Description                                                                                                             |
| --------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `payload` | `Object`                | The Variables or CustomHeaders property value from a Camunda API response.                                              |
| `options` | `JsonSerializerOptions` | Optional JSON serializer options. When null, uses default options with camelCase naming to match Camunda's JSON format. |

**Returns:** `<T>` — The deserialized DTO, or default if the payload is null.

## BpmnErrorException

_exception_

Throw from a job handler to trigger a BPMN error boundary event on the job's task.
The error code is matched against error catch events in the process model.

```csharp
public sealed class BpmnErrorException : Exception, ISerializable
```

### Properties

| Property       | Type     | Description                                               |
| -------------- | -------- | --------------------------------------------------------- |
| `ErrorCode`    | `String` | The error code matched against BPMN error catch events.   |
| `ErrorMessage` | `String` | Optional additional context message.                      |
| `Variables`    | `Object` | Optional variables to set at the error catch event scope. |

## CamundaAuthException

_exception_

Authentication-specific exception.

```csharp
public sealed class CamundaAuthException : Exception, ISerializable
```

### Properties

| Property | Type                   | Description |
| -------- | ---------------------- | ----------- |
| `Code`   | `CamundaAuthErrorCode` |             |

## CamundaConfigurationException

_exception_

Thrown when configuration hydration encounters validation errors.

```csharp
public sealed class CamundaConfigurationException : Exception, ISerializable
```

### Properties

| Property | Type                               | Description |
| -------- | ---------------------------------- | ----------- |
| `Errors` | `IReadOnlyList<ConfigErrorDetail>` |             |

## CamundaSdkException

_exception_

SDK error types mirroring the JS SDK's error structure.

```csharp
public class CamundaSdkException : Exception, ISerializable
```

### Properties

| Property      | Type              | Description |
| ------------- | ----------------- | ----------- |
| `OperationId` | `String`          |             |
| `Status`      | `Nullable<Int32>` |             |

## CancelSdkException

_exception_

Thrown when a cancellable operation is cancelled.

```csharp
public sealed class CancelSdkException : CamundaSdkException, ISerializable
```

## EventualConsistencyTimeoutException

_exception_

Thrown when an eventually consistent endpoint times out waiting for data.

```csharp
public sealed class EventualConsistencyTimeoutException : CamundaSdkException, ISerializable
```

### Properties

| Property   | Type    | Description |
| ---------- | ------- | ----------- |
| `WaitedMs` | `Int32` |             |

## HttpSdkException

_exception_

HTTP-specific SDK error with RFC 7807 Problem Details.

```csharp
public sealed class HttpSdkException : CamundaSdkException, ISerializable
```

### Properties

| Property         | Type      | Description |
| ---------------- | --------- | ----------- |
| `Type`           | `String`  |             |
| `Title`          | `String`  |             |
| `Detail`         | `String`  |             |
| `Instance`       | `String`  |             |
| `IsBackpressure` | `Boolean` |             |

## JobFailureException

_exception_

Throw from a job handler to explicitly fail a job with custom retry settings.

```csharp
public sealed class JobFailureException : Exception, ISerializable
```

### Properties

| Property         | Type              | Description                                                            |
| ---------------- | ----------------- | ---------------------------------------------------------------------- |
| `Retries`        | `Nullable<Int32>` | How many retries the job should have remaining. null = server decides. |
| `RetryBackOffMs` | `Nullable<Int64>` | Retry back-off in milliseconds. null = immediate retry.                |

## RetryDecision

_struct_

```csharp
public readonly record struct RetryDecision : IEquatable<RetryDecision>
```

### Properties

| Property    | Type      | Description |
| ----------- | --------- | ----------- |
| `Retryable` | `Boolean` |             |
| `Reason`    | `String`  |             |

## StopResult

_struct_

Result of a call.

```csharp
public readonly record struct StopResult : IEquatable<StopResult>
```

### Properties

| Property        | Type      | Description                                                   |
| --------------- | --------- | ------------------------------------------------------------- |
| `RemainingJobs` | `Int32`   | Number of jobs still in-flight when stop completed.           |
| `TimedOut`      | `Boolean` | Whether the grace period was exceeded with jobs still active. |

## JobHandler

_delegate_

Delegate for job handler functions. Return the output variables to complete the
job with, or null to complete with no output variables.

To signal a BPMN error, throw .
To explicitly fail a job with custom retries, throw .
Any other unhandled exception auto-fails the job with retries - 1.

```csharp
public delegate Task<object?> JobHandler(ActivatedJob job, CancellationToken ct)
```
