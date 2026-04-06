---
title: "CamundaClient"
sidebar_label: "CamundaClient"
mdx:
  format: md
---

# CamundaClient

:::caution Technical Preview
The C# SDK is a **technical preview** available from Camunda 8.9. It will become fully supported in Camunda 8.10. Its API surface may change in future releases without following semver.
:::

## Creating a Client

Factory method for creating CamundaClient instances.

```csharp
public static CamundaClient CreateClient(CamundaOptions? options = null)
```

Create a new CamundaClient.

| Parameter | Type             | Description |
| --------- | ---------------- | ----------- |
| `options` | `CamundaOptions` |             |

## Dependency Injection

Extension methods for registering in an .

### AddCamundaClient(IServiceCollection)

```csharp
public static IServiceCollection AddCamundaClient(this IServiceCollection services)
```

Registers a singleton using zero-config (environment variables only).

| Parameter  | Type                 | Description |
| ---------- | -------------------- | ----------- |
| `services` | `IServiceCollection` |             |

### AddCamundaClient(IServiceCollection, IConfiguration)

```csharp
public static IServiceCollection AddCamundaClient(this IServiceCollection services, IConfiguration configurationSection)
```

Registers a singleton using an section.

Typically called as services.AddCamundaClient(configuration.GetSection("Camunda")).
PascalCase keys in the section are mapped to canonical CAMUNDA\_\* env-var names internally.
Environment variables still apply as a base layer; section values override them.

| Parameter              | Type                 | Description |
| ---------------------- | -------------------- | ----------- |
| `services`             | `IServiceCollection` |             |
| `configurationSection` | `IConfiguration`     |             |

### AddCamundaClient(IServiceCollection, Action<CamundaOptions>)

```csharp
public static IServiceCollection AddCamundaClient(this IServiceCollection services, Action<CamundaOptions> configure)
```

Registers a singleton with an options callback for full control.

| Parameter   | Type                     | Description |
| ----------- | ------------------------ | ----------- |
| `services`  | `IServiceCollection`     |             |
| `configure` | `Action<CamundaOptions>` |             |

## Overview

Primary Camunda client. Provides typed methods for all Camunda 8 REST API operations.

Auto-generated operation methods are added in the Generated/ partial class files.
This class provides the infrastructure: configuration, auth, retry, backpressure.

```csharp
public class CamundaClient : IDisposable, IAsyncDisposable
```

## Constructor

```csharp
public CamundaClient(CamundaOptions? options = null)
```

Create a new CamundaClient with the given options.

| Parameter | Type             | Description |
| --------- | ---------------- | ----------- |
| `options` | `CamundaOptions` |             |

## Properties

| Property | Type            | Description                                     |
| -------- | --------------- | ----------------------------------------------- |
| `Config` | `CamundaConfig` | The current hydrated configuration (read-only). |

## Methods

### Other

#### Create(CamundaOptions?)

```csharp
public static CamundaClient Create(CamundaOptions? options = null)
```

Create a new CamundaClient.

| Parameter | Type             | Description |
| --------- | ---------------- | ----------- |
| `options` | `CamundaOptions` |             |

**Returns:** `CamundaClient`

#### Dispose()

```csharp
public void Dispose()
```

Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.

#### DisposeAsync()

```csharp
public ValueTask DisposeAsync()
```

Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources asynchronously.

**Returns:** `ValueTask` — A task that represents the asynchronous dispose operation.

#### CreateAdminUserAsync(UserRequest, CancellationToken)

```csharp
public Task<UserCreateResult> CreateAdminUserAsync(UserRequest body, CancellationToken ct = default)
```

Create admin user
Creates a new user and assigns the admin role to it. This endpoint is only usable when users are managed in the Orchestration Cluster and while no user is assigned to the admin role.

| Parameter | Type                | Description |
| --------- | ------------------- | ----------- |
| `body`    | `UserRequest`       |             |
| `ct`      | `CancellationToken` |             |

**Returns:** `Task<UserCreateResult>`

#### CreateGlobalTaskListenerAsync(CreateGlobalTaskListenerRequest, CancellationToken)

```csharp
public Task<GlobalTaskListenerResult> CreateGlobalTaskListenerAsync(CreateGlobalTaskListenerRequest body, CancellationToken ct = default)
```

Create global user task listener
Create a new global user task listener.

| Parameter | Type                              | Description |
| --------- | --------------------------------- | ----------- |
| `body`    | `CreateGlobalTaskListenerRequest` |             |
| `ct`      | `CancellationToken`               |             |

**Returns:** `Task<GlobalTaskListenerResult>`

#### CreateUserAsync(UserRequest, CancellationToken)

```csharp
public Task<UserCreateResult> CreateUserAsync(UserRequest body, CancellationToken ct = default)
```

Create user
Create a new user.

| Parameter | Type                | Description |
| --------- | ------------------- | ----------- |
| `body`    | `UserRequest`       |             |
| `ct`      | `CancellationToken` |             |

**Returns:** `Task<UserCreateResult>`

#### DeleteGlobalTaskListenerAsync(GlobalListenerId, CancellationToken)

```csharp
public Task DeleteGlobalTaskListenerAsync(GlobalListenerId id, CancellationToken ct = default)
```

Delete global user task listener
Deletes a global user task listener.

| Parameter | Type                | Description |
| --------- | ------------------- | ----------- |
| `id`      | `GlobalListenerId`  |             |
| `ct`      | `CancellationToken` |             |

**Returns:** `Task`

#### DeleteUserAsync(Username, CancellationToken)

```csharp
public Task DeleteUserAsync(Username username, CancellationToken ct = default)
```

Delete user
Deletes a user.

| Parameter  | Type                | Description |
| ---------- | ------------------- | ----------- |
| `username` | `Username`          |             |
| `ct`       | `CancellationToken` |             |

**Returns:** `Task`

#### EvaluateConditionalsAsync(ConditionalEvaluationInstruction, CancellationToken)

```csharp
public Task<EvaluateConditionalResult> EvaluateConditionalsAsync(ConditionalEvaluationInstruction body, CancellationToken ct = default)
```

Evaluate root level conditional start events
Evaluates root-level conditional start events for process definitions.
If the evaluation is successful, it will return the keys of all created process instances, along with their associated process definition key.
Multiple root-level conditional start events of the same process definition can trigger if their conditions evaluate to true.

| Parameter | Type                               | Description |
| --------- | ---------------------------------- | ----------- |
| `body`    | `ConditionalEvaluationInstruction` |             |
| `ct`      | `CancellationToken`                |             |

**Returns:** `Task<EvaluateConditionalResult>`

#### EvaluateExpressionAsync(ExpressionEvaluationRequest, CancellationToken)

```csharp
public Task<ExpressionEvaluationResult> EvaluateExpressionAsync(ExpressionEvaluationRequest body, CancellationToken ct = default)
```

Evaluate an expression
Evaluates a FEEL expression and returns the result. Supports references to tenant scoped cluster variables when a tenant ID is provided.

| Parameter | Type                          | Description |
| --------- | ----------------------------- | ----------- |
| `body`    | `ExpressionEvaluationRequest` |             |
| `ct`      | `CancellationToken`           |             |

**Returns:** `Task<ExpressionEvaluationResult>`

#### GetGlobalTaskListenerAsync(GlobalListenerId, ConsistencyOptions<GlobalTaskListenerResult>?, CancellationToken)

```csharp
public Task<GlobalTaskListenerResult> GetGlobalTaskListenerAsync(GlobalListenerId id, ConsistencyOptions<GlobalTaskListenerResult>? consistency = null, CancellationToken ct = default)
```

Get global user task listener
Get a global user task listener by its id.

| Parameter     | Type                                           | Description |
| ------------- | ---------------------------------------------- | ----------- |
| `id`          | `GlobalListenerId`                             |             |
| `consistency` | `ConsistencyOptions<GlobalTaskListenerResult>` |             |
| `ct`          | `CancellationToken`                            |             |

**Returns:** `Task<GlobalTaskListenerResult>`

#### GetStatusAsync(CancellationToken)

```csharp
public Task GetStatusAsync(CancellationToken ct = default)
```

Get cluster status
Checks the health status of the cluster by verifying if there's at least one partition with a healthy leader.

| Parameter | Type                | Description |
| --------- | ------------------- | ----------- |
| `ct`      | `CancellationToken` |             |

**Returns:** `Task`

#### GetSystemConfigurationAsync(CancellationToken)

```csharp
public Task<SystemConfigurationResponse> GetSystemConfigurationAsync(CancellationToken ct = default)
```

System configuration (alpha)
Returns the current system configuration. The response is an envelope
that groups settings by feature area.

This endpoint is an alpha feature and may be subject to change
in future releases.

| Parameter | Type                | Description |
| --------- | ------------------- | ----------- |
| `ct`      | `CancellationToken` |             |

**Returns:** `Task<SystemConfigurationResponse>`

#### GetUserAsync(Username, ConsistencyOptions<GetUserResponse>?, CancellationToken)

```csharp
public Task<GetUserResponse> GetUserAsync(Username username, ConsistencyOptions<GetUserResponse>? consistency = null, CancellationToken ct = default)
```

Get user
Get a user by its username.

| Parameter     | Type                                  | Description |
| ------------- | ------------------------------------- | ----------- |
| `username`    | `Username`                            |             |
| `consistency` | `ConsistencyOptions<GetUserResponse>` |             |
| `ct`          | `CancellationToken`                   |             |

**Returns:** `Task<GetUserResponse>`

#### SearchGlobalTaskListenersAsync(GlobalTaskListenerSearchQueryRequest, ConsistencyOptions<GlobalTaskListenerSearchQueryResult>?, CancellationToken)

```csharp
public Task<GlobalTaskListenerSearchQueryResult> SearchGlobalTaskListenersAsync(GlobalTaskListenerSearchQueryRequest body, ConsistencyOptions<GlobalTaskListenerSearchQueryResult>? consistency = null, CancellationToken ct = default)
```

Search global user task listeners
Search for global user task listeners based on given criteria.

| Parameter     | Type                                                      | Description |
| ------------- | --------------------------------------------------------- | ----------- |
| `body`        | `GlobalTaskListenerSearchQueryRequest`                    |             |
| `consistency` | `ConsistencyOptions<GlobalTaskListenerSearchQueryResult>` |             |
| `ct`          | `CancellationToken`                                       |             |

**Returns:** `Task<GlobalTaskListenerSearchQueryResult>`

#### SearchUsersAsync(UserSearchQueryRequest, ConsistencyOptions<SearchUsersResponse>?, CancellationToken)

```csharp
public Task<SearchUsersResponse> SearchUsersAsync(UserSearchQueryRequest body, ConsistencyOptions<SearchUsersResponse>? consistency = null, CancellationToken ct = default)
```

Search users
Search for users based on given criteria.

| Parameter     | Type                                      | Description |
| ------------- | ----------------------------------------- | ----------- |
| `body`        | `UserSearchQueryRequest`                  |             |
| `consistency` | `ConsistencyOptions<SearchUsersResponse>` |             |
| `ct`          | `CancellationToken`                       |             |

**Returns:** `Task<SearchUsersResponse>`

#### UpdateGlobalTaskListenerAsync(GlobalListenerId, UpdateGlobalTaskListenerRequest, CancellationToken)

```csharp
public Task<GlobalTaskListenerResult> UpdateGlobalTaskListenerAsync(GlobalListenerId id, UpdateGlobalTaskListenerRequest body, CancellationToken ct = default)
```

Update global user task listener
Updates a global user task listener.

| Parameter | Type                              | Description |
| --------- | --------------------------------- | ----------- |
| `id`      | `GlobalListenerId`                |             |
| `body`    | `UpdateGlobalTaskListenerRequest` |             |
| `ct`      | `CancellationToken`               |             |

**Returns:** `Task<GlobalTaskListenerResult>`

#### UpdateUserAsync(Username, UserUpdateRequest, CancellationToken)

```csharp
public Task<UpdateUserResponse> UpdateUserAsync(Username username, UserUpdateRequest body, CancellationToken ct = default)
```

Update user
Updates a user.

| Parameter  | Type                | Description |
| ---------- | ------------------- | ----------- |
| `username` | `Username`          |             |
| `body`     | `UserUpdateRequest` |             |
| `ct`       | `CancellationToken` |             |

**Returns:** `Task<UpdateUserResponse>`

### Cluster

#### GetBackpressureState()

```csharp
public BackpressureState GetBackpressureState()
```

Current backpressure state snapshot.

**Returns:** `BackpressureState`

#### GetAuthenticationAsync(CancellationToken)

```csharp
public Task<CamundaUserResult> GetAuthenticationAsync(CancellationToken ct = default)
```

Get current user
Retrieves the current authenticated user.

| Parameter | Type                | Description |
| --------- | ------------------- | ----------- |
| `ct`      | `CancellationToken` |             |

**Returns:** `Task<CamundaUserResult>`

#### GetLicenseAsync(CancellationToken)

```csharp
public Task<LicenseResponse> GetLicenseAsync(CancellationToken ct = default)
```

Get license status
Obtains the status of the current Camunda license.

| Parameter | Type                | Description |
| --------- | ------------------- | ----------- |
| `ct`      | `CancellationToken` |             |

**Returns:** `Task<LicenseResponse>`

#### GetTopologyAsync(CancellationToken)

```csharp
public Task<TopologyResponse> GetTopologyAsync(CancellationToken ct = default)
```

Get cluster topology
Obtains the current topology of the cluster the gateway is part of.

| Parameter | Type                | Description |
| --------- | ------------------- | ----------- |
| `ct`      | `CancellationToken` |             |

**Returns:** `Task<TopologyResponse>`

#### PinClockAsync(ClockPinRequest, CancellationToken)

```csharp
public Task PinClockAsync(ClockPinRequest body, CancellationToken ct = default)
```

Pin internal clock (alpha)
Set a precise, static time for the Zeebe engine's internal clock.
When the clock is pinned, it remains at the specified time and does not advance.
To change the time, the clock must be pinned again with a new timestamp.

This endpoint is an alpha feature and may be subject to change
in future releases.

| Parameter | Type                | Description |
| --------- | ------------------- | ----------- |
| `body`    | `ClockPinRequest`   |             |
| `ct`      | `CancellationToken` |             |

**Returns:** `Task`

#### ResetClockAsync(CancellationToken)

```csharp
public Task ResetClockAsync(CancellationToken ct = default)
```

Reset internal clock (alpha)
Resets the Zeebe engine's internal clock to the current system time, enabling it to tick in real-time.
This operation is useful for returning the clock to
normal behavior after it has been pinned to a specific time.

This endpoint is an alpha feature and may be subject to change
in future releases.

| Parameter | Type                | Description |
| --------- | ------------------- | ----------- |
| `ct`      | `CancellationToken` |             |

**Returns:** `Task`

### Resources

#### DeployResourcesFromFilesAsync(string[], string?, CancellationToken)

```csharp
public Task<ExtendedDeploymentResponse> DeployResourcesFromFilesAsync(string[] resourceFilePaths, string? tenantId = null, CancellationToken ct = default)
```

Deploy resources from local filesystem paths.
Reads the specified files, infers MIME types from their extensions,
and calls with the loaded content.

| Parameter           | Type                | Description                                                            |
| ------------------- | ------------------- | ---------------------------------------------------------------------- |
| `resourceFilePaths` | `String[]`          | Absolute or relative file paths to BPMN, DMN, form, or resource files. |
| `tenantId`          | `String`            | Optional tenant ID for multi-tenant deployments.                       |
| `ct`                | `CancellationToken` | Cancellation token.                                                    |

**Returns:** `Task<ExtendedDeploymentResponse>` — An with typed access to deployed artifacts.

#### DeleteResourceAsync(ResourceKey, DeleteResourceRequest, CancellationToken)

```csharp
public Task<DeleteResourceResponse> DeleteResourceAsync(ResourceKey resourceKey, DeleteResourceRequest body, CancellationToken ct = default)
```

Delete resource
Deletes a deployed resource. This can be a process definition, decision requirements
definition, or form definition deployed using the deploy resources endpoint. Specify the
resource you want to delete in the `resourceKey` parameter.

Once a resource has been deleted it cannot be recovered. If the resource needs to be
available again, a new deployment of the resource is required.

By default, only the resource itself is deleted from the runtime state. To also delete the
historic data associated with a resource, set the `deleteHistory` flag in the request body
to `true`. The historic data is deleted asynchronously via a batch operation. The details of
the created batch operation are included in the response. Note that history deletion is only
supported for process resources; for other resource types this flag is ignored and no history
will be deleted.

| Parameter     | Type                    | Description |
| ------------- | ----------------------- | ----------- |
| `resourceKey` | `ResourceKey`           |             |
| `body`        | `DeleteResourceRequest` |             |
| `ct`          | `CancellationToken`     |             |

**Returns:** `Task<DeleteResourceResponse>`

#### GetResourceAsync(ResourceKey, CancellationToken)

```csharp
public Task<ResourceResult> GetResourceAsync(ResourceKey resourceKey, CancellationToken ct = default)
```

Get resource
Returns a deployed resource.
:::info
Currently, this endpoint only supports RPA resources.
:::

| Parameter     | Type                | Description |
| ------------- | ------------------- | ----------- |
| `resourceKey` | `ResourceKey`       |             |
| `ct`          | `CancellationToken` |             |

**Returns:** `Task<ResourceResult>`

#### GetResourceContentAsync(ResourceKey, CancellationToken)

```csharp
public Task<object> GetResourceContentAsync(ResourceKey resourceKey, CancellationToken ct = default)
```

Get resource content
Returns the content of a deployed resource.
:::info
Currently, this endpoint only supports RPA resources.
:::

| Parameter     | Type                | Description |
| ------------- | ------------------- | ----------- |
| `resourceKey` | `ResourceKey`       |             |
| `ct`          | `CancellationToken` |             |

**Returns:** `Task<Object>`

### Jobs

#### CreateJobWorker(JobWorkerConfig, JobHandler)

```csharp
public JobWorker CreateJobWorker(JobWorkerConfig config, JobHandler handler)
```

Create a job worker that polls for and processes jobs of the specified type.

The handler receives an and returns variables to
auto-complete. Throw for BPMN errors,
for explicit failures, or any other exception
to auto-fail with retries - 1.

| Parameter | Type              | Description                                                                           |
| --------- | ----------------- | ------------------------------------------------------------------------------------- |
| `config`  | `JobWorkerConfig` | Worker configuration (job type, timeout, concurrency).                                |
| `handler` | `JobHandler`      | Async handler that processes each job. Return output variables (or null) to complete. |

**Returns:** `JobWorker` — The running instance.

#### CreateJobWorker(JobWorkerConfig, Func<ActivatedJob, CancellationToken, Task>)

```csharp
public JobWorker CreateJobWorker(JobWorkerConfig config, Func<ActivatedJob, CancellationToken, Task> handler)
```

Create a job worker with a handler that doesn't return output variables.
The job is auto-completed with no variables on success.

| Parameter | Type              | Description |
| --------- | ----------------- | ----------- |
| `config`  | `JobWorkerConfig` |             |
| `handler` | `Func<Task>`      |             |

**Returns:** `JobWorker`

#### ActivateJobsAsync(JobActivationRequest, CancellationToken)

```csharp
public Task<JobActivationResult> ActivateJobsAsync(JobActivationRequest body, CancellationToken ct = default)
```

Activate jobs
Iterate through all known partitions and activate jobs up to the requested maximum.

| Parameter | Type                   | Description |
| --------- | ---------------------- | ----------- |
| `body`    | `JobActivationRequest` |             |
| `ct`      | `CancellationToken`    |             |

**Returns:** `Task<JobActivationResult>`

#### CompleteJobAsync(JobKey, JobCompletionRequest, CancellationToken)

```csharp
public Task CompleteJobAsync(JobKey jobKey, JobCompletionRequest body, CancellationToken ct = default)
```

Complete job
Complete a job with the given payload, which allows completing the associated service task.

| Parameter | Type                   | Description |
| --------- | ---------------------- | ----------- |
| `jobKey`  | `JobKey`               |             |
| `body`    | `JobCompletionRequest` |             |
| `ct`      | `CancellationToken`    |             |

**Returns:** `Task`

#### FailJobAsync(JobKey, JobFailRequest, CancellationToken)

```csharp
public Task FailJobAsync(JobKey jobKey, JobFailRequest body, CancellationToken ct = default)
```

Fail job
Mark the job as failed.

| Parameter | Type                | Description |
| --------- | ------------------- | ----------- |
| `jobKey`  | `JobKey`            |             |
| `body`    | `JobFailRequest`    |             |
| `ct`      | `CancellationToken` |             |

**Returns:** `Task`

#### GetGlobalJobStatisticsAsync(DateTimeOffset, DateTimeOffset, string?, ConsistencyOptions<GlobalJobStatisticsQueryResult>?, CancellationToken)

```csharp
public Task<GlobalJobStatisticsQueryResult> GetGlobalJobStatisticsAsync(DateTimeOffset from, DateTimeOffset to, string? jobType = null, ConsistencyOptions<GlobalJobStatisticsQueryResult>? consistency = null, CancellationToken ct = default)
```

Global job statistics
Returns global aggregated counts for jobs. Filter by the creation time window (required) and optionally by jobType.

| Parameter     | Type                                                 | Description |
| ------------- | ---------------------------------------------------- | ----------- |
| `from`        | `DateTimeOffset`                                     |             |
| `to`          | `DateTimeOffset`                                     |             |
| `jobType`     | `String`                                             |             |
| `consistency` | `ConsistencyOptions<GlobalJobStatisticsQueryResult>` |             |
| `ct`          | `CancellationToken`                                  |             |

**Returns:** `Task<GlobalJobStatisticsQueryResult>`

#### GetJobErrorStatisticsAsync(JobErrorStatisticsQuery, ConsistencyOptions<JobErrorStatisticsQueryResult>?, CancellationToken)

```csharp
public Task<JobErrorStatisticsQueryResult> GetJobErrorStatisticsAsync(JobErrorStatisticsQuery body, ConsistencyOptions<JobErrorStatisticsQueryResult>? consistency = null, CancellationToken ct = default)
```

Get error metrics for a job type
Returns aggregated metrics per error for the given jobType.

| Parameter     | Type                                                | Description |
| ------------- | --------------------------------------------------- | ----------- |
| `body`        | `JobErrorStatisticsQuery`                           |             |
| `consistency` | `ConsistencyOptions<JobErrorStatisticsQueryResult>` |             |
| `ct`          | `CancellationToken`                                 |             |

**Returns:** `Task<JobErrorStatisticsQueryResult>`

#### GetJobTimeSeriesStatisticsAsync(JobTimeSeriesStatisticsQuery, ConsistencyOptions<JobTimeSeriesStatisticsQueryResult>?, CancellationToken)

```csharp
public Task<JobTimeSeriesStatisticsQueryResult> GetJobTimeSeriesStatisticsAsync(JobTimeSeriesStatisticsQuery body, ConsistencyOptions<JobTimeSeriesStatisticsQueryResult>? consistency = null, CancellationToken ct = default)
```

Get time-series metrics for a job type
Returns a list of time-bucketed metrics ordered ascending by time.
The `from` and `to` fields select the time window of interest.
Each item in the response corresponds to one time bucket of the requested resolution.

| Parameter     | Type                                                     | Description |
| ------------- | -------------------------------------------------------- | ----------- |
| `body`        | `JobTimeSeriesStatisticsQuery`                           |             |
| `consistency` | `ConsistencyOptions<JobTimeSeriesStatisticsQueryResult>` |             |
| `ct`          | `CancellationToken`                                      |             |

**Returns:** `Task<JobTimeSeriesStatisticsQueryResult>`

#### GetJobTypeStatisticsAsync(JobTypeStatisticsQuery, ConsistencyOptions<JobTypeStatisticsQueryResult>?, CancellationToken)

```csharp
public Task<JobTypeStatisticsQueryResult> GetJobTypeStatisticsAsync(JobTypeStatisticsQuery body, ConsistencyOptions<JobTypeStatisticsQueryResult>? consistency = null, CancellationToken ct = default)
```

Get job statistics by type
Get statistics about jobs, grouped by job type.

| Parameter     | Type                                               | Description |
| ------------- | -------------------------------------------------- | ----------- |
| `body`        | `JobTypeStatisticsQuery`                           |             |
| `consistency` | `ConsistencyOptions<JobTypeStatisticsQueryResult>` |             |
| `ct`          | `CancellationToken`                                |             |

**Returns:** `Task<JobTypeStatisticsQueryResult>`

#### GetJobWorkerStatisticsAsync(JobWorkerStatisticsQuery, ConsistencyOptions<JobWorkerStatisticsQueryResult>?, CancellationToken)

```csharp
public Task<JobWorkerStatisticsQueryResult> GetJobWorkerStatisticsAsync(JobWorkerStatisticsQuery body, ConsistencyOptions<JobWorkerStatisticsQueryResult>? consistency = null, CancellationToken ct = default)
```

Get job statistics by worker
Get statistics about jobs, grouped by worker, for a given job type.

| Parameter     | Type                                                 | Description |
| ------------- | ---------------------------------------------------- | ----------- |
| `body`        | `JobWorkerStatisticsQuery`                           |             |
| `consistency` | `ConsistencyOptions<JobWorkerStatisticsQueryResult>` |             |
| `ct`          | `CancellationToken`                                  |             |

**Returns:** `Task<JobWorkerStatisticsQueryResult>`

#### SearchJobsAsync(JobSearchQuery, ConsistencyOptions<JobSearchQueryResult>?, CancellationToken)

```csharp
public Task<JobSearchQueryResult> SearchJobsAsync(JobSearchQuery body, ConsistencyOptions<JobSearchQueryResult>? consistency = null, CancellationToken ct = default)
```

Search jobs
Search for jobs based on given criteria.

| Parameter     | Type                                       | Description |
| ------------- | ------------------------------------------ | ----------- |
| `body`        | `JobSearchQuery`                           |             |
| `consistency` | `ConsistencyOptions<JobSearchQueryResult>` |             |
| `ct`          | `CancellationToken`                        |             |

**Returns:** `Task<JobSearchQueryResult>`

#### ThrowJobErrorAsync(JobKey, JobErrorRequest, CancellationToken)

```csharp
public Task ThrowJobErrorAsync(JobKey jobKey, JobErrorRequest body, CancellationToken ct = default)
```

Throw error for job
Reports a business error (i.e. non-technical) that occurs while processing a job.

| Parameter | Type                | Description |
| --------- | ------------------- | ----------- |
| `jobKey`  | `JobKey`            |             |
| `body`    | `JobErrorRequest`   |             |
| `ct`      | `CancellationToken` |             |

**Returns:** `Task`

#### UpdateJobAsync(JobKey, JobUpdateRequest, CancellationToken)

```csharp
public Task UpdateJobAsync(JobKey jobKey, JobUpdateRequest body, CancellationToken ct = default)
```

Update job
Update a job with the given key.

| Parameter | Type                | Description |
| --------- | ------------------- | ----------- |
| `jobKey`  | `JobKey`            |             |
| `body`    | `JobUpdateRequest`  |             |
| `ct`      | `CancellationToken` |             |

**Returns:** `Task`

### Job Workers

#### RunWorkersAsync(TimeSpan?, CancellationToken)

```csharp
public Task RunWorkersAsync(TimeSpan? gracePeriod = null, CancellationToken ct = default)
```

Block until cancellation is requested, keeping all registered workers alive.
This is the typical entry point for worker-only applications.

When the token is cancelled, all workers are stopped gracefully.

| Parameter     | Type                 | Description                                                                     |
| ------------- | -------------------- | ------------------------------------------------------------------------------- |
| `gracePeriod` | `Nullable<TimeSpan>` | Time to wait for in-flight jobs to finish during shutdown. Default: 10 seconds. |
| `ct`          | `CancellationToken`  | Cancellation token that signals shutdown.                                       |

**Returns:** `Task`

#### StopAllWorkersAsync(TimeSpan?)

```csharp
public Task StopAllWorkersAsync(TimeSpan? gracePeriod = null)
```

Stop all registered workers and wait for in-flight jobs to drain.

| Parameter     | Type                 | Description |
| ------------- | -------------------- | ----------- |
| `gracePeriod` | `Nullable<TimeSpan>` |             |

**Returns:** `Task`

#### GetWorkers()

```csharp
public IReadOnlyList<JobWorker> GetWorkers()
```

Returns a snapshot of all registered workers.

**Returns:** `IReadOnlyList<JobWorker>`

### Elements

#### ActivateAdHocSubProcessActivitiesAsync(ElementInstanceKey, AdHocSubProcessActivateActivitiesInstruction, CancellationToken)

```csharp
public Task ActivateAdHocSubProcessActivitiesAsync(ElementInstanceKey adHocSubProcessInstanceKey, AdHocSubProcessActivateActivitiesInstruction body, CancellationToken ct = default)
```

Activate activities within an ad-hoc sub-process
Activates selected activities within an ad-hoc sub-process identified by element ID.
The provided element IDs must exist within the ad-hoc sub-process instance identified by the
provided adHocSubProcessInstanceKey.

| Parameter                    | Type                                           | Description |
| ---------------------------- | ---------------------------------------------- | ----------- |
| `adHocSubProcessInstanceKey` | `ElementInstanceKey`                           |             |
| `body`                       | `AdHocSubProcessActivateActivitiesInstruction` |             |
| `ct`                         | `CancellationToken`                            |             |

**Returns:** `Task`

#### GetElementInstanceAsync(ElementInstanceKey, ConsistencyOptions<ElementInstanceResult>?, CancellationToken)

```csharp
public Task<ElementInstanceResult> GetElementInstanceAsync(ElementInstanceKey elementInstanceKey, ConsistencyOptions<ElementInstanceResult>? consistency = null, CancellationToken ct = default)
```

Get element instance
Returns element instance as JSON.

| Parameter            | Type                                        | Description |
| -------------------- | ------------------------------------------- | ----------- |
| `elementInstanceKey` | `ElementInstanceKey`                        |             |
| `consistency`        | `ConsistencyOptions<ElementInstanceResult>` |             |
| `ct`                 | `CancellationToken`                         |             |

**Returns:** `Task<ElementInstanceResult>`

#### SearchElementInstancesAsync(ElementInstanceSearchQuery, ConsistencyOptions<ElementInstanceSearchQueryResult>?, CancellationToken)

```csharp
public Task<ElementInstanceSearchQueryResult> SearchElementInstancesAsync(ElementInstanceSearchQuery body, ConsistencyOptions<ElementInstanceSearchQueryResult>? consistency = null, CancellationToken ct = default)
```

Search element instances
Search for element instances based on given criteria.

| Parameter     | Type                                                   | Description |
| ------------- | ------------------------------------------------------ | ----------- |
| `body`        | `ElementInstanceSearchQuery`                           |             |
| `consistency` | `ConsistencyOptions<ElementInstanceSearchQueryResult>` |             |
| `ct`          | `CancellationToken`                                    |             |

**Returns:** `Task<ElementInstanceSearchQueryResult>`

### Groups

#### AssignClientToGroupAsync(string, string, CancellationToken)

```csharp
public Task AssignClientToGroupAsync(string groupId, string clientId, CancellationToken ct = default)
```

Assign a client to a group
Assigns a client to a group, making it a member of the group.
Members of the group inherit the group authorizations, roles, and tenant assignments.

| Parameter  | Type                | Description |
| ---------- | ------------------- | ----------- |
| `groupId`  | `String`            |             |
| `clientId` | `String`            |             |
| `ct`       | `CancellationToken` |             |

**Returns:** `Task`

#### AssignMappingRuleToGroupAsync(string, string, CancellationToken)

```csharp
public Task AssignMappingRuleToGroupAsync(string groupId, string mappingRuleId, CancellationToken ct = default)
```

Assign a mapping rule to a group
Assigns a mapping rule to a group.

| Parameter       | Type                | Description |
| --------------- | ------------------- | ----------- |
| `groupId`       | `String`            |             |
| `mappingRuleId` | `String`            |             |
| `ct`            | `CancellationToken` |             |

**Returns:** `Task`

#### AssignUserToGroupAsync(string, Username, CancellationToken)

```csharp
public Task AssignUserToGroupAsync(string groupId, Username username, CancellationToken ct = default)
```

Assign a user to a group
Assigns a user to a group, making the user a member of the group.
Group members inherit the group authorizations, roles, and tenant assignments.

| Parameter  | Type                | Description |
| ---------- | ------------------- | ----------- |
| `groupId`  | `String`            |             |
| `username` | `Username`          |             |
| `ct`       | `CancellationToken` |             |

**Returns:** `Task`

#### CreateGroupAsync(GroupCreateRequest, CancellationToken)

```csharp
public Task<GroupCreateResult> CreateGroupAsync(GroupCreateRequest body, CancellationToken ct = default)
```

Create group
Create a new group.

| Parameter | Type                 | Description |
| --------- | -------------------- | ----------- |
| `body`    | `GroupCreateRequest` |             |
| `ct`      | `CancellationToken`  |             |

**Returns:** `Task<GroupCreateResult>`

#### DeleteGroupAsync(string, CancellationToken)

```csharp
public Task DeleteGroupAsync(string groupId, CancellationToken ct = default)
```

Delete group
Deletes the group with the given ID.

| Parameter | Type                | Description |
| --------- | ------------------- | ----------- |
| `groupId` | `String`            |             |
| `ct`      | `CancellationToken` |             |

**Returns:** `Task`

#### GetGroupAsync(string, ConsistencyOptions<GroupResult>?, CancellationToken)

```csharp
public Task<GroupResult> GetGroupAsync(string groupId, ConsistencyOptions<GroupResult>? consistency = null, CancellationToken ct = default)
```

Get group
Get a group by its ID.

| Parameter     | Type                              | Description |
| ------------- | --------------------------------- | ----------- |
| `groupId`     | `String`                          |             |
| `consistency` | `ConsistencyOptions<GroupResult>` |             |
| `ct`          | `CancellationToken`               |             |

**Returns:** `Task<GroupResult>`

#### SearchClientsForGroupAsync(string, SearchClientsForGroupRequest, ConsistencyOptions<SearchClientsForGroupResponse>?, CancellationToken)

```csharp
public Task<SearchClientsForGroupResponse> SearchClientsForGroupAsync(string groupId, SearchClientsForGroupRequest body, ConsistencyOptions<SearchClientsForGroupResponse>? consistency = null, CancellationToken ct = default)
```

Search group clients
Search clients assigned to a group.

| Parameter     | Type                                                | Description |
| ------------- | --------------------------------------------------- | ----------- |
| `groupId`     | `String`                                            |             |
| `body`        | `SearchClientsForGroupRequest`                      |             |
| `consistency` | `ConsistencyOptions<SearchClientsForGroupResponse>` |             |
| `ct`          | `CancellationToken`                                 |             |

**Returns:** `Task<SearchClientsForGroupResponse>`

#### SearchGroupsAsync(GroupSearchQueryRequest, ConsistencyOptions<GroupSearchQueryResult>?, CancellationToken)

```csharp
public Task<GroupSearchQueryResult> SearchGroupsAsync(GroupSearchQueryRequest body, ConsistencyOptions<GroupSearchQueryResult>? consistency = null, CancellationToken ct = default)
```

Search groups
Search for groups based on given criteria.

| Parameter     | Type                                         | Description |
| ------------- | -------------------------------------------- | ----------- |
| `body`        | `GroupSearchQueryRequest`                    |             |
| `consistency` | `ConsistencyOptions<GroupSearchQueryResult>` |             |
| `ct`          | `CancellationToken`                          |             |

**Returns:** `Task<GroupSearchQueryResult>`

#### SearchMappingRulesForGroupAsync(string, MappingRuleSearchQueryRequest, ConsistencyOptions<SearchMappingRulesForGroupResponse>?, CancellationToken)

```csharp
public Task<SearchMappingRulesForGroupResponse> SearchMappingRulesForGroupAsync(string groupId, MappingRuleSearchQueryRequest body, ConsistencyOptions<SearchMappingRulesForGroupResponse>? consistency = null, CancellationToken ct = default)
```

Search group mapping rules
Search mapping rules assigned to a group.

| Parameter     | Type                                                     | Description |
| ------------- | -------------------------------------------------------- | ----------- |
| `groupId`     | `String`                                                 |             |
| `body`        | `MappingRuleSearchQueryRequest`                          |             |
| `consistency` | `ConsistencyOptions<SearchMappingRulesForGroupResponse>` |             |
| `ct`          | `CancellationToken`                                      |             |

**Returns:** `Task<SearchMappingRulesForGroupResponse>`

#### SearchUsersForGroupAsync(string, SearchUsersForGroupRequest, ConsistencyOptions<SearchUsersForGroupResponse>?, CancellationToken)

```csharp
public Task<SearchUsersForGroupResponse> SearchUsersForGroupAsync(string groupId, SearchUsersForGroupRequest body, ConsistencyOptions<SearchUsersForGroupResponse>? consistency = null, CancellationToken ct = default)
```

Search group users
Search users assigned to a group.

| Parameter     | Type                                              | Description |
| ------------- | ------------------------------------------------- | ----------- |
| `groupId`     | `String`                                          |             |
| `body`        | `SearchUsersForGroupRequest`                      |             |
| `consistency` | `ConsistencyOptions<SearchUsersForGroupResponse>` |             |
| `ct`          | `CancellationToken`                               |             |

**Returns:** `Task<SearchUsersForGroupResponse>`

#### UnassignClientFromGroupAsync(string, string, CancellationToken)

```csharp
public Task UnassignClientFromGroupAsync(string groupId, string clientId, CancellationToken ct = default)
```

Unassign a client from a group
Unassigns a client from a group.
The client is removed as a group member, with associated authorizations, roles, and tenant assignments no longer applied.

| Parameter  | Type                | Description |
| ---------- | ------------------- | ----------- |
| `groupId`  | `String`            |             |
| `clientId` | `String`            |             |
| `ct`       | `CancellationToken` |             |

**Returns:** `Task`

#### UnassignMappingRuleFromGroupAsync(string, string, CancellationToken)

```csharp
public Task UnassignMappingRuleFromGroupAsync(string groupId, string mappingRuleId, CancellationToken ct = default)
```

Unassign a mapping rule from a group
Unassigns a mapping rule from a group.

| Parameter       | Type                | Description |
| --------------- | ------------------- | ----------- |
| `groupId`       | `String`            |             |
| `mappingRuleId` | `String`            |             |
| `ct`            | `CancellationToken` |             |

**Returns:** `Task`

#### UnassignUserFromGroupAsync(string, Username, CancellationToken)

```csharp
public Task UnassignUserFromGroupAsync(string groupId, Username username, CancellationToken ct = default)
```

Unassign a user from a group
Unassigns a user from a group.
The user is removed as a group member, with associated authorizations, roles, and tenant assignments no longer applied.

| Parameter  | Type                | Description |
| ---------- | ------------------- | ----------- |
| `groupId`  | `String`            |             |
| `username` | `Username`          |             |
| `ct`       | `CancellationToken` |             |

**Returns:** `Task`

#### UpdateGroupAsync(string, GroupUpdateRequest, CancellationToken)

```csharp
public Task<GroupUpdateResult> UpdateGroupAsync(string groupId, GroupUpdateRequest body, CancellationToken ct = default)
```

Update group
Update a group with the given ID.

| Parameter | Type                 | Description |
| --------- | -------------------- | ----------- |
| `groupId` | `String`             |             |
| `body`    | `GroupUpdateRequest` |             |
| `ct`      | `CancellationToken`  |             |

**Returns:** `Task<GroupUpdateResult>`

### Tenants

#### AssignClientToTenantAsync(TenantId, string, CancellationToken)

```csharp
public Task AssignClientToTenantAsync(TenantId tenantId, string clientId, CancellationToken ct = default)
```

Assign a client to a tenant
Assign the client to the specified tenant.
The client can then access tenant data and perform authorized actions.

| Parameter  | Type                | Description |
| ---------- | ------------------- | ----------- |
| `tenantId` | `TenantId`          |             |
| `clientId` | `String`            |             |
| `ct`       | `CancellationToken` |             |

**Returns:** `Task`

#### AssignGroupToTenantAsync(TenantId, string, CancellationToken)

```csharp
public Task AssignGroupToTenantAsync(TenantId tenantId, string groupId, CancellationToken ct = default)
```

Assign a group to a tenant
Assigns a group to a specified tenant.
Group members (users, clients) can then access tenant data and perform authorized actions.

| Parameter  | Type                | Description |
| ---------- | ------------------- | ----------- |
| `tenantId` | `TenantId`          |             |
| `groupId`  | `String`            |             |
| `ct`       | `CancellationToken` |             |

**Returns:** `Task`

#### AssignMappingRuleToTenantAsync(TenantId, string, CancellationToken)

```csharp
public Task AssignMappingRuleToTenantAsync(TenantId tenantId, string mappingRuleId, CancellationToken ct = default)
```

Assign a mapping rule to a tenant
Assign a single mapping rule to a specified tenant.

| Parameter       | Type                | Description |
| --------------- | ------------------- | ----------- |
| `tenantId`      | `TenantId`          |             |
| `mappingRuleId` | `String`            |             |
| `ct`            | `CancellationToken` |             |

**Returns:** `Task`

#### AssignRoleToTenantAsync(TenantId, string, CancellationToken)

```csharp
public Task AssignRoleToTenantAsync(TenantId tenantId, string roleId, CancellationToken ct = default)
```

Assign a role to a tenant
Assigns a role to a specified tenant.
Users, Clients or Groups, that have the role assigned, will get access to the tenant's data and can perform actions according to their authorizations.

| Parameter  | Type                | Description |
| ---------- | ------------------- | ----------- |
| `tenantId` | `TenantId`          |             |
| `roleId`   | `String`            |             |
| `ct`       | `CancellationToken` |             |

**Returns:** `Task`

#### AssignUserToTenantAsync(TenantId, Username, CancellationToken)

```csharp
public Task AssignUserToTenantAsync(TenantId tenantId, Username username, CancellationToken ct = default)
```

Assign a user to a tenant
Assign a single user to a specified tenant. The user can then access tenant data and perform authorized actions.

| Parameter  | Type                | Description |
| ---------- | ------------------- | ----------- |
| `tenantId` | `TenantId`          |             |
| `username` | `Username`          |             |
| `ct`       | `CancellationToken` |             |

**Returns:** `Task`

#### CreateTenantAsync(TenantCreateRequest, CancellationToken)

```csharp
public Task<TenantCreateResult> CreateTenantAsync(TenantCreateRequest body, CancellationToken ct = default)
```

Create tenant
Creates a new tenant.

| Parameter | Type                  | Description |
| --------- | --------------------- | ----------- |
| `body`    | `TenantCreateRequest` |             |
| `ct`      | `CancellationToken`   |             |

**Returns:** `Task<TenantCreateResult>`

#### DeleteTenantAsync(TenantId, CancellationToken)

```csharp
public Task DeleteTenantAsync(TenantId tenantId, CancellationToken ct = default)
```

Delete tenant
Deletes an existing tenant.

| Parameter  | Type                | Description |
| ---------- | ------------------- | ----------- |
| `tenantId` | `TenantId`          |             |
| `ct`       | `CancellationToken` |             |

**Returns:** `Task`

#### GetTenantAsync(TenantId, ConsistencyOptions<TenantResult>?, CancellationToken)

```csharp
public Task<TenantResult> GetTenantAsync(TenantId tenantId, ConsistencyOptions<TenantResult>? consistency = null, CancellationToken ct = default)
```

Get tenant
Retrieves a single tenant by tenant ID.

| Parameter     | Type                               | Description |
| ------------- | ---------------------------------- | ----------- |
| `tenantId`    | `TenantId`                         |             |
| `consistency` | `ConsistencyOptions<TenantResult>` |             |
| `ct`          | `CancellationToken`                |             |

**Returns:** `Task<TenantResult>`

#### GetUsageMetricsAsync(DateTimeOffset, DateTimeOffset, TenantId?, bool?, ConsistencyOptions<UsageMetricsResponse>?, CancellationToken)

```csharp
public Task<UsageMetricsResponse> GetUsageMetricsAsync(DateTimeOffset startTime, DateTimeOffset endTime, TenantId? tenantId = null, bool? withTenants = null, ConsistencyOptions<UsageMetricsResponse>? consistency = null, CancellationToken ct = default)
```

Get usage metrics
Retrieve the usage metrics based on given criteria.

| Parameter     | Type                                       | Description |
| ------------- | ------------------------------------------ | ----------- |
| `startTime`   | `DateTimeOffset`                           |             |
| `endTime`     | `DateTimeOffset`                           |             |
| `tenantId`    | `Nullable<TenantId>`                       |             |
| `withTenants` | `Nullable<Boolean>`                        |             |
| `consistency` | `ConsistencyOptions<UsageMetricsResponse>` |             |
| `ct`          | `CancellationToken`                        |             |

**Returns:** `Task<UsageMetricsResponse>`

#### SearchClientsForTenantAsync(TenantId, SearchClientsForTenantRequest, ConsistencyOptions<SearchClientsForTenantResponse>?, CancellationToken)

```csharp
public Task<SearchClientsForTenantResponse> SearchClientsForTenantAsync(TenantId tenantId, SearchClientsForTenantRequest body, ConsistencyOptions<SearchClientsForTenantResponse>? consistency = null, CancellationToken ct = default)
```

Search clients for tenant
Retrieves a filtered and sorted list of clients for a specified tenant.

| Parameter     | Type                                                 | Description |
| ------------- | ---------------------------------------------------- | ----------- |
| `tenantId`    | `TenantId`                                           |             |
| `body`        | `SearchClientsForTenantRequest`                      |             |
| `consistency` | `ConsistencyOptions<SearchClientsForTenantResponse>` |             |
| `ct`          | `CancellationToken`                                  |             |

**Returns:** `Task<SearchClientsForTenantResponse>`

#### SearchGroupIdsForTenantAsync(TenantId, TenantGroupSearchQueryRequest, ConsistencyOptions<TenantGroupSearchResult>?, CancellationToken)

```csharp
public Task<TenantGroupSearchResult> SearchGroupIdsForTenantAsync(TenantId tenantId, TenantGroupSearchQueryRequest body, ConsistencyOptions<TenantGroupSearchResult>? consistency = null, CancellationToken ct = default)
```

Search groups for tenant
Retrieves a filtered and sorted list of groups for a specified tenant.

| Parameter     | Type                                          | Description |
| ------------- | --------------------------------------------- | ----------- |
| `tenantId`    | `TenantId`                                    |             |
| `body`        | `TenantGroupSearchQueryRequest`               |             |
| `consistency` | `ConsistencyOptions<TenantGroupSearchResult>` |             |
| `ct`          | `CancellationToken`                           |             |

**Returns:** `Task<TenantGroupSearchResult>`

#### SearchMappingRulesForTenantAsync(TenantId, MappingRuleSearchQueryRequest, ConsistencyOptions<SearchMappingRulesForTenantResponse>?, CancellationToken)

```csharp
public Task<SearchMappingRulesForTenantResponse> SearchMappingRulesForTenantAsync(TenantId tenantId, MappingRuleSearchQueryRequest body, ConsistencyOptions<SearchMappingRulesForTenantResponse>? consistency = null, CancellationToken ct = default)
```

Search mapping rules for tenant
Retrieves a filtered and sorted list of MappingRules for a specified tenant.

| Parameter     | Type                                                      | Description |
| ------------- | --------------------------------------------------------- | ----------- |
| `tenantId`    | `TenantId`                                                |             |
| `body`        | `MappingRuleSearchQueryRequest`                           |             |
| `consistency` | `ConsistencyOptions<SearchMappingRulesForTenantResponse>` |             |
| `ct`          | `CancellationToken`                                       |             |

**Returns:** `Task<SearchMappingRulesForTenantResponse>`

#### SearchRolesForTenantAsync(TenantId, RoleSearchQueryRequest, ConsistencyOptions<SearchRolesForTenantResponse>?, CancellationToken)

```csharp
public Task<SearchRolesForTenantResponse> SearchRolesForTenantAsync(TenantId tenantId, RoleSearchQueryRequest body, ConsistencyOptions<SearchRolesForTenantResponse>? consistency = null, CancellationToken ct = default)
```

Search roles for tenant
Retrieves a filtered and sorted list of roles for a specified tenant.

| Parameter     | Type                                               | Description |
| ------------- | -------------------------------------------------- | ----------- |
| `tenantId`    | `TenantId`                                         |             |
| `body`        | `RoleSearchQueryRequest`                           |             |
| `consistency` | `ConsistencyOptions<SearchRolesForTenantResponse>` |             |
| `ct`          | `CancellationToken`                                |             |

**Returns:** `Task<SearchRolesForTenantResponse>`

#### SearchTenantsAsync(TenantSearchQueryRequest, ConsistencyOptions<TenantSearchQueryResult>?, CancellationToken)

```csharp
public Task<TenantSearchQueryResult> SearchTenantsAsync(TenantSearchQueryRequest body, ConsistencyOptions<TenantSearchQueryResult>? consistency = null, CancellationToken ct = default)
```

Search tenants
Retrieves a filtered and sorted list of tenants.

| Parameter     | Type                                          | Description |
| ------------- | --------------------------------------------- | ----------- |
| `body`        | `TenantSearchQueryRequest`                    |             |
| `consistency` | `ConsistencyOptions<TenantSearchQueryResult>` |             |
| `ct`          | `CancellationToken`                           |             |

**Returns:** `Task<TenantSearchQueryResult>`

#### SearchUsersForTenantAsync(TenantId, SearchUsersForTenantRequest, ConsistencyOptions<SearchUsersForTenantResponse>?, CancellationToken)

```csharp
public Task<SearchUsersForTenantResponse> SearchUsersForTenantAsync(TenantId tenantId, SearchUsersForTenantRequest body, ConsistencyOptions<SearchUsersForTenantResponse>? consistency = null, CancellationToken ct = default)
```

Search users for tenant
Retrieves a filtered and sorted list of users for a specified tenant.

| Parameter     | Type                                               | Description |
| ------------- | -------------------------------------------------- | ----------- |
| `tenantId`    | `TenantId`                                         |             |
| `body`        | `SearchUsersForTenantRequest`                      |             |
| `consistency` | `ConsistencyOptions<SearchUsersForTenantResponse>` |             |
| `ct`          | `CancellationToken`                                |             |

**Returns:** `Task<SearchUsersForTenantResponse>`

#### UnassignClientFromTenantAsync(TenantId, string, CancellationToken)

```csharp
public Task UnassignClientFromTenantAsync(TenantId tenantId, string clientId, CancellationToken ct = default)
```

Unassign a client from a tenant
Unassigns the client from the specified tenant.
The client can no longer access tenant data.

| Parameter  | Type                | Description |
| ---------- | ------------------- | ----------- |
| `tenantId` | `TenantId`          |             |
| `clientId` | `String`            |             |
| `ct`       | `CancellationToken` |             |

**Returns:** `Task`

#### UnassignGroupFromTenantAsync(TenantId, string, CancellationToken)

```csharp
public Task UnassignGroupFromTenantAsync(TenantId tenantId, string groupId, CancellationToken ct = default)
```

Unassign a group from a tenant
Unassigns a group from a specified tenant.
Members of the group (users, clients) will no longer have access to the tenant's data - except they are assigned directly to the tenant.

| Parameter  | Type                | Description |
| ---------- | ------------------- | ----------- |
| `tenantId` | `TenantId`          |             |
| `groupId`  | `String`            |             |
| `ct`       | `CancellationToken` |             |

**Returns:** `Task`

#### UnassignMappingRuleFromTenantAsync(TenantId, string, CancellationToken)

```csharp
public Task UnassignMappingRuleFromTenantAsync(TenantId tenantId, string mappingRuleId, CancellationToken ct = default)
```

Unassign a mapping rule from a tenant
Unassigns a single mapping rule from a specified tenant without deleting the rule.

| Parameter       | Type                | Description |
| --------------- | ------------------- | ----------- |
| `tenantId`      | `TenantId`          |             |
| `mappingRuleId` | `String`            |             |
| `ct`            | `CancellationToken` |             |

**Returns:** `Task`

#### UnassignRoleFromTenantAsync(TenantId, string, CancellationToken)

```csharp
public Task UnassignRoleFromTenantAsync(TenantId tenantId, string roleId, CancellationToken ct = default)
```

Unassign a role from a tenant
Unassigns a role from a specified tenant.
Users, Clients or Groups, that have the role assigned, will no longer have access to the
tenant's data - unless they are assigned directly to the tenant.

| Parameter  | Type                | Description |
| ---------- | ------------------- | ----------- |
| `tenantId` | `TenantId`          |             |
| `roleId`   | `String`            |             |
| `ct`       | `CancellationToken` |             |

**Returns:** `Task`

#### UnassignUserFromTenantAsync(TenantId, Username, CancellationToken)

```csharp
public Task UnassignUserFromTenantAsync(TenantId tenantId, Username username, CancellationToken ct = default)
```

Unassign a user from a tenant
Unassigns the user from the specified tenant.
The user can no longer access tenant data.

| Parameter  | Type                | Description |
| ---------- | ------------------- | ----------- |
| `tenantId` | `TenantId`          |             |
| `username` | `Username`          |             |
| `ct`       | `CancellationToken` |             |

**Returns:** `Task`

#### UpdateTenantAsync(TenantId, TenantUpdateRequest, CancellationToken)

```csharp
public Task<TenantUpdateResult> UpdateTenantAsync(TenantId tenantId, TenantUpdateRequest body, CancellationToken ct = default)
```

Update tenant
Updates an existing tenant.

| Parameter  | Type                  | Description |
| ---------- | --------------------- | ----------- |
| `tenantId` | `TenantId`            |             |
| `body`     | `TenantUpdateRequest` |             |
| `ct`       | `CancellationToken`   |             |

**Returns:** `Task<TenantUpdateResult>`

### Roles

#### AssignRoleToClientAsync(string, string, CancellationToken)

```csharp
public Task AssignRoleToClientAsync(string roleId, string clientId, CancellationToken ct = default)
```

Assign a role to a client
Assigns the specified role to the client. The client will inherit the authorizations associated with this role.

| Parameter  | Type                | Description |
| ---------- | ------------------- | ----------- |
| `roleId`   | `String`            |             |
| `clientId` | `String`            |             |
| `ct`       | `CancellationToken` |             |

**Returns:** `Task`

#### AssignRoleToGroupAsync(string, string, CancellationToken)

```csharp
public Task AssignRoleToGroupAsync(string roleId, string groupId, CancellationToken ct = default)
```

Assign a role to a group
Assigns the specified role to the group. Every member of the group (user or client) will inherit the authorizations associated with this role.

| Parameter | Type                | Description |
| --------- | ------------------- | ----------- |
| `roleId`  | `String`            |             |
| `groupId` | `String`            |             |
| `ct`      | `CancellationToken` |             |

**Returns:** `Task`

#### AssignRoleToMappingRuleAsync(string, string, CancellationToken)

```csharp
public Task AssignRoleToMappingRuleAsync(string roleId, string mappingRuleId, CancellationToken ct = default)
```

Assign a role to a mapping rule
Assigns a role to a mapping rule.

| Parameter       | Type                | Description |
| --------------- | ------------------- | ----------- |
| `roleId`        | `String`            |             |
| `mappingRuleId` | `String`            |             |
| `ct`            | `CancellationToken` |             |

**Returns:** `Task`

#### AssignRoleToUserAsync(string, Username, CancellationToken)

```csharp
public Task AssignRoleToUserAsync(string roleId, Username username, CancellationToken ct = default)
```

Assign a role to a user
Assigns the specified role to the user. The user will inherit the authorizations associated with this role.

| Parameter  | Type                | Description |
| ---------- | ------------------- | ----------- |
| `roleId`   | `String`            |             |
| `username` | `Username`          |             |
| `ct`       | `CancellationToken` |             |

**Returns:** `Task`

#### CreateRoleAsync(RoleCreateRequest, CancellationToken)

```csharp
public Task<RoleCreateResult> CreateRoleAsync(RoleCreateRequest body, CancellationToken ct = default)
```

Create role
Create a new role.

| Parameter | Type                | Description |
| --------- | ------------------- | ----------- |
| `body`    | `RoleCreateRequest` |             |
| `ct`      | `CancellationToken` |             |

**Returns:** `Task<RoleCreateResult>`

#### DeleteRoleAsync(string, CancellationToken)

```csharp
public Task DeleteRoleAsync(string roleId, CancellationToken ct = default)
```

Delete role
Deletes the role with the given ID.

| Parameter | Type                | Description |
| --------- | ------------------- | ----------- |
| `roleId`  | `String`            |             |
| `ct`      | `CancellationToken` |             |

**Returns:** `Task`

#### GetRoleAsync(string, ConsistencyOptions<RoleResult>?, CancellationToken)

```csharp
public Task<RoleResult> GetRoleAsync(string roleId, ConsistencyOptions<RoleResult>? consistency = null, CancellationToken ct = default)
```

Get role
Get a role by its ID.

| Parameter     | Type                             | Description |
| ------------- | -------------------------------- | ----------- |
| `roleId`      | `String`                         |             |
| `consistency` | `ConsistencyOptions<RoleResult>` |             |
| `ct`          | `CancellationToken`              |             |

**Returns:** `Task<RoleResult>`

#### SearchClientsForRoleAsync(string, SearchClientsForRoleRequest, ConsistencyOptions<SearchClientsForRoleResponse>?, CancellationToken)

```csharp
public Task<SearchClientsForRoleResponse> SearchClientsForRoleAsync(string roleId, SearchClientsForRoleRequest body, ConsistencyOptions<SearchClientsForRoleResponse>? consistency = null, CancellationToken ct = default)
```

Search role clients
Search clients with assigned role.

| Parameter     | Type                                               | Description |
| ------------- | -------------------------------------------------- | ----------- |
| `roleId`      | `String`                                           |             |
| `body`        | `SearchClientsForRoleRequest`                      |             |
| `consistency` | `ConsistencyOptions<SearchClientsForRoleResponse>` |             |
| `ct`          | `CancellationToken`                                |             |

**Returns:** `Task<SearchClientsForRoleResponse>`

#### SearchGroupsForRoleAsync(string, RoleGroupSearchQueryRequest, ConsistencyOptions<RoleGroupSearchResult>?, CancellationToken)

```csharp
public Task<RoleGroupSearchResult> SearchGroupsForRoleAsync(string roleId, RoleGroupSearchQueryRequest body, ConsistencyOptions<RoleGroupSearchResult>? consistency = null, CancellationToken ct = default)
```

Search role groups
Search groups with assigned role.

| Parameter     | Type                                        | Description |
| ------------- | ------------------------------------------- | ----------- |
| `roleId`      | `String`                                    |             |
| `body`        | `RoleGroupSearchQueryRequest`               |             |
| `consistency` | `ConsistencyOptions<RoleGroupSearchResult>` |             |
| `ct`          | `CancellationToken`                         |             |

**Returns:** `Task<RoleGroupSearchResult>`

#### SearchMappingRulesForRoleAsync(string, MappingRuleSearchQueryRequest, ConsistencyOptions<SearchMappingRulesForRoleResponse>?, CancellationToken)

```csharp
public Task<SearchMappingRulesForRoleResponse> SearchMappingRulesForRoleAsync(string roleId, MappingRuleSearchQueryRequest body, ConsistencyOptions<SearchMappingRulesForRoleResponse>? consistency = null, CancellationToken ct = default)
```

Search role mapping rules
Search mapping rules with assigned role.

| Parameter     | Type                                                    | Description |
| ------------- | ------------------------------------------------------- | ----------- |
| `roleId`      | `String`                                                |             |
| `body`        | `MappingRuleSearchQueryRequest`                         |             |
| `consistency` | `ConsistencyOptions<SearchMappingRulesForRoleResponse>` |             |
| `ct`          | `CancellationToken`                                     |             |

**Returns:** `Task<SearchMappingRulesForRoleResponse>`

#### SearchRolesAsync(RoleSearchQueryRequest, ConsistencyOptions<RoleSearchQueryResult>?, CancellationToken)

```csharp
public Task<RoleSearchQueryResult> SearchRolesAsync(RoleSearchQueryRequest body, ConsistencyOptions<RoleSearchQueryResult>? consistency = null, CancellationToken ct = default)
```

Search roles
Search for roles based on given criteria.

| Parameter     | Type                                        | Description |
| ------------- | ------------------------------------------- | ----------- |
| `body`        | `RoleSearchQueryRequest`                    |             |
| `consistency` | `ConsistencyOptions<RoleSearchQueryResult>` |             |
| `ct`          | `CancellationToken`                         |             |

**Returns:** `Task<RoleSearchQueryResult>`

#### SearchRolesForGroupAsync(string, RoleSearchQueryRequest, ConsistencyOptions<SearchRolesForGroupResponse>?, CancellationToken)

```csharp
public Task<SearchRolesForGroupResponse> SearchRolesForGroupAsync(string groupId, RoleSearchQueryRequest body, ConsistencyOptions<SearchRolesForGroupResponse>? consistency = null, CancellationToken ct = default)
```

Search group roles
Search roles assigned to a group.

| Parameter     | Type                                              | Description |
| ------------- | ------------------------------------------------- | ----------- |
| `groupId`     | `String`                                          |             |
| `body`        | `RoleSearchQueryRequest`                          |             |
| `consistency` | `ConsistencyOptions<SearchRolesForGroupResponse>` |             |
| `ct`          | `CancellationToken`                               |             |

**Returns:** `Task<SearchRolesForGroupResponse>`

#### SearchUsersForRoleAsync(string, SearchUsersForRoleRequest, ConsistencyOptions<SearchUsersForRoleResponse>?, CancellationToken)

```csharp
public Task<SearchUsersForRoleResponse> SearchUsersForRoleAsync(string roleId, SearchUsersForRoleRequest body, ConsistencyOptions<SearchUsersForRoleResponse>? consistency = null, CancellationToken ct = default)
```

Search role users
Search users with assigned role.

| Parameter     | Type                                             | Description |
| ------------- | ------------------------------------------------ | ----------- |
| `roleId`      | `String`                                         |             |
| `body`        | `SearchUsersForRoleRequest`                      |             |
| `consistency` | `ConsistencyOptions<SearchUsersForRoleResponse>` |             |
| `ct`          | `CancellationToken`                              |             |

**Returns:** `Task<SearchUsersForRoleResponse>`

#### UnassignRoleFromClientAsync(string, string, CancellationToken)

```csharp
public Task UnassignRoleFromClientAsync(string roleId, string clientId, CancellationToken ct = default)
```

Unassign a role from a client
Unassigns the specified role from the client. The client will no longer inherit the authorizations associated with this role.

| Parameter  | Type                | Description |
| ---------- | ------------------- | ----------- |
| `roleId`   | `String`            |             |
| `clientId` | `String`            |             |
| `ct`       | `CancellationToken` |             |

**Returns:** `Task`

#### UnassignRoleFromGroupAsync(string, string, CancellationToken)

```csharp
public Task UnassignRoleFromGroupAsync(string roleId, string groupId, CancellationToken ct = default)
```

Unassign a role from a group
Unassigns the specified role from the group. All group members (user or client) no longer inherit the authorizations associated with this role.

| Parameter | Type                | Description |
| --------- | ------------------- | ----------- |
| `roleId`  | `String`            |             |
| `groupId` | `String`            |             |
| `ct`      | `CancellationToken` |             |

**Returns:** `Task`

#### UnassignRoleFromMappingRuleAsync(string, string, CancellationToken)

```csharp
public Task UnassignRoleFromMappingRuleAsync(string roleId, string mappingRuleId, CancellationToken ct = default)
```

Unassign a role from a mapping rule
Unassigns a role from a mapping rule.

| Parameter       | Type                | Description |
| --------------- | ------------------- | ----------- |
| `roleId`        | `String`            |             |
| `mappingRuleId` | `String`            |             |
| `ct`            | `CancellationToken` |             |

**Returns:** `Task`

#### UnassignRoleFromUserAsync(string, Username, CancellationToken)

```csharp
public Task UnassignRoleFromUserAsync(string roleId, Username username, CancellationToken ct = default)
```

Unassign a role from a user
Unassigns a role from a user. The user will no longer inherit the authorizations associated with this role.

| Parameter  | Type                | Description |
| ---------- | ------------------- | ----------- |
| `roleId`   | `String`            |             |
| `username` | `Username`          |             |
| `ct`       | `CancellationToken` |             |

**Returns:** `Task`

#### UpdateRoleAsync(string, RoleUpdateRequest, CancellationToken)

```csharp
public Task<RoleUpdateResult> UpdateRoleAsync(string roleId, RoleUpdateRequest body, CancellationToken ct = default)
```

Update role
Update a role with the given ID.

| Parameter | Type                | Description |
| --------- | ------------------- | ----------- |
| `roleId`  | `String`            |             |
| `body`    | `RoleUpdateRequest` |             |
| `ct`      | `CancellationToken` |             |

**Returns:** `Task<RoleUpdateResult>`

### User Tasks

#### AssignUserTaskAsync(UserTaskKey, UserTaskAssignmentRequest, CancellationToken)

```csharp
public Task AssignUserTaskAsync(UserTaskKey userTaskKey, UserTaskAssignmentRequest body, CancellationToken ct = default)
```

Assign user task
Assigns a user task with the given key to the given assignee. Assignment waits for blocking task listeners on this lifecycle transition. If listener processing is delayed beyond the request timeout, this endpoint can return 504. Other gateway timeout causes are also possible. Retry with backoff and inspect listener worker availability and logs when this repeats.

| Parameter     | Type                        | Description |
| ------------- | --------------------------- | ----------- |
| `userTaskKey` | `UserTaskKey`               |             |
| `body`        | `UserTaskAssignmentRequest` |             |
| `ct`          | `CancellationToken`         |             |

**Returns:** `Task`

#### CompleteUserTaskAsync(UserTaskKey, UserTaskCompletionRequest, CancellationToken)

```csharp
public Task CompleteUserTaskAsync(UserTaskKey userTaskKey, UserTaskCompletionRequest body, CancellationToken ct = default)
```

Complete user task
Completes a user task with the given key. Completion waits for blocking task listeners on this lifecycle transition. If listener processing is delayed beyond the request timeout, this endpoint can return 504. Other gateway timeout causes are also possible. Retry with backoff and inspect listener worker availability and logs when this repeats.

| Parameter     | Type                        | Description |
| ------------- | --------------------------- | ----------- |
| `userTaskKey` | `UserTaskKey`               |             |
| `body`        | `UserTaskCompletionRequest` |             |
| `ct`          | `CancellationToken`         |             |

**Returns:** `Task`

#### GetUserTaskAsync(UserTaskKey, ConsistencyOptions<UserTaskResult>?, CancellationToken)

```csharp
public Task<UserTaskResult> GetUserTaskAsync(UserTaskKey userTaskKey, ConsistencyOptions<UserTaskResult>? consistency = null, CancellationToken ct = default)
```

Get user task
Get the user task by the user task key.

| Parameter     | Type                                 | Description |
| ------------- | ------------------------------------ | ----------- |
| `userTaskKey` | `UserTaskKey`                        |             |
| `consistency` | `ConsistencyOptions<UserTaskResult>` |             |
| `ct`          | `CancellationToken`                  |             |

**Returns:** `Task<UserTaskResult>`

#### GetUserTaskFormAsync(UserTaskKey, ConsistencyOptions<FormResult>?, CancellationToken)

```csharp
public Task<FormResult> GetUserTaskFormAsync(UserTaskKey userTaskKey, ConsistencyOptions<FormResult>? consistency = null, CancellationToken ct = default)
```

Get user task form
Get the form of a user task.
Note that this endpoint will only return linked forms. This endpoint does not support embedded forms.

| Parameter     | Type                             | Description |
| ------------- | -------------------------------- | ----------- |
| `userTaskKey` | `UserTaskKey`                    |             |
| `consistency` | `ConsistencyOptions<FormResult>` |             |
| `ct`          | `CancellationToken`              |             |

**Returns:** `Task<FormResult>`

#### SearchUserTaskAuditLogsAsync(UserTaskKey, UserTaskAuditLogSearchQueryRequest, ConsistencyOptions<AuditLogSearchQueryResult>?, CancellationToken)

```csharp
public Task<AuditLogSearchQueryResult> SearchUserTaskAuditLogsAsync(UserTaskKey userTaskKey, UserTaskAuditLogSearchQueryRequest body, ConsistencyOptions<AuditLogSearchQueryResult>? consistency = null, CancellationToken ct = default)
```

Search user task audit logs
Search for user task audit logs based on given criteria.

| Parameter     | Type                                            | Description |
| ------------- | ----------------------------------------------- | ----------- |
| `userTaskKey` | `UserTaskKey`                                   |             |
| `body`        | `UserTaskAuditLogSearchQueryRequest`            |             |
| `consistency` | `ConsistencyOptions<AuditLogSearchQueryResult>` |             |
| `ct`          | `CancellationToken`                             |             |

**Returns:** `Task<AuditLogSearchQueryResult>`

#### SearchUserTaskEffectiveVariablesAsync(UserTaskKey, SearchUserTaskEffectiveVariablesRequest, bool?, ConsistencyOptions<VariableSearchQueryResult>?, CancellationToken)

```csharp
public Task<VariableSearchQueryResult> SearchUserTaskEffectiveVariablesAsync(UserTaskKey userTaskKey, SearchUserTaskEffectiveVariablesRequest body, bool? truncateValues = null, ConsistencyOptions<VariableSearchQueryResult>? consistency = null, CancellationToken ct = default)
```

Search user task effective variables
Search for the effective variables of a user task. This endpoint returns deduplicated
variables where each variable name appears at most once. When the same variable name exists
at multiple scope levels in the scope hierarchy, the value from the innermost scope (closest
to the user task) takes precedence. This is useful for retrieving the actual runtime state
of variables as seen by the user task. By default, long variable values in the response are
truncated.

| Parameter        | Type                                            | Description |
| ---------------- | ----------------------------------------------- | ----------- |
| `userTaskKey`    | `UserTaskKey`                                   |             |
| `body`           | `SearchUserTaskEffectiveVariablesRequest`       |             |
| `truncateValues` | `Nullable<Boolean>`                             |             |
| `consistency`    | `ConsistencyOptions<VariableSearchQueryResult>` |             |
| `ct`             | `CancellationToken`                             |             |

**Returns:** `Task<VariableSearchQueryResult>`

#### SearchUserTaskVariablesAsync(UserTaskKey, SearchUserTaskVariablesRequest, bool?, ConsistencyOptions<VariableSearchQueryResult>?, CancellationToken)

```csharp
public Task<VariableSearchQueryResult> SearchUserTaskVariablesAsync(UserTaskKey userTaskKey, SearchUserTaskVariablesRequest body, bool? truncateValues = null, ConsistencyOptions<VariableSearchQueryResult>? consistency = null, CancellationToken ct = default)
```

Search user task variables
Search for user task variables based on given criteria. This endpoint returns all variable
documents visible from the user task's scope, including variables from parent scopes in the
scope hierarchy. If the same variable name exists at multiple scope levels, each scope's
variable is returned as a separate result. Use the
`/user-tasks/{userTaskKey}/effective-variables/search` endpoint to get deduplicated variables
where the innermost scope takes precedence. By default, long variable values in the response
are truncated.

| Parameter        | Type                                            | Description |
| ---------------- | ----------------------------------------------- | ----------- |
| `userTaskKey`    | `UserTaskKey`                                   |             |
| `body`           | `SearchUserTaskVariablesRequest`                |             |
| `truncateValues` | `Nullable<Boolean>`                             |             |
| `consistency`    | `ConsistencyOptions<VariableSearchQueryResult>` |             |
| `ct`             | `CancellationToken`                             |             |

**Returns:** `Task<VariableSearchQueryResult>`

#### SearchUserTasksAsync(UserTaskSearchQuery, ConsistencyOptions<UserTaskSearchQueryResult>?, CancellationToken)

```csharp
public Task<UserTaskSearchQueryResult> SearchUserTasksAsync(UserTaskSearchQuery body, ConsistencyOptions<UserTaskSearchQueryResult>? consistency = null, CancellationToken ct = default)
```

Search user tasks
Search for user tasks based on given criteria.

| Parameter     | Type                                            | Description |
| ------------- | ----------------------------------------------- | ----------- |
| `body`        | `UserTaskSearchQuery`                           |             |
| `consistency` | `ConsistencyOptions<UserTaskSearchQueryResult>` |             |
| `ct`          | `CancellationToken`                             |             |

**Returns:** `Task<UserTaskSearchQueryResult>`

#### UnassignUserTaskAsync(UserTaskKey, CancellationToken)

```csharp
public Task UnassignUserTaskAsync(UserTaskKey userTaskKey, CancellationToken ct = default)
```

Unassign user task
Removes the assignee of a task with the given key. Unassignment waits for blocking task listeners on this lifecycle transition. If listener processing is delayed beyond the request timeout, this endpoint can return 504. Other gateway timeout causes are also possible. Retry with backoff and inspect listener worker availability and logs when this repeats.

| Parameter     | Type                | Description |
| ------------- | ------------------- | ----------- |
| `userTaskKey` | `UserTaskKey`       |             |
| `ct`          | `CancellationToken` |             |

**Returns:** `Task`

#### UpdateUserTaskAsync(UserTaskKey, UserTaskUpdateRequest, CancellationToken)

```csharp
public Task UpdateUserTaskAsync(UserTaskKey userTaskKey, UserTaskUpdateRequest body, CancellationToken ct = default)
```

Update user task
Update a user task with the given key. Updates wait for blocking task listeners on this lifecycle transition. If listener processing is delayed beyond the request timeout, this endpoint can return 504. Other gateway timeout causes are also possible. Retry with backoff and inspect listener worker availability and logs when this repeats.

| Parameter     | Type                    | Description |
| ------------- | ----------------------- | ----------- |
| `userTaskKey` | `UserTaskKey`           |             |
| `body`        | `UserTaskUpdateRequest` |             |
| `ct`          | `CancellationToken`     |             |

**Returns:** `Task`

### Signals

#### BroadcastSignalAsync(SignalBroadcastRequest, CancellationToken)

```csharp
public Task<SignalBroadcastResult> BroadcastSignalAsync(SignalBroadcastRequest body, CancellationToken ct = default)
```

Broadcast signal
Broadcasts a signal.

| Parameter | Type                     | Description |
| --------- | ------------------------ | ----------- |
| `body`    | `SignalBroadcastRequest` |             |
| `ct`      | `CancellationToken`      |             |

**Returns:** `Task<SignalBroadcastResult>`

### Batch Operations

#### CancelBatchOperationAsync(BatchOperationKey, CancellationToken)

```csharp
public Task CancelBatchOperationAsync(BatchOperationKey batchOperationKey, CancellationToken ct = default)
```

Cancel Batch operation
Cancels a running batch operation.
This is done asynchronously, the progress can be tracked using the batch operation status endpoint (/batch-operations/{batchOperationKey}).

| Parameter           | Type                | Description |
| ------------------- | ------------------- | ----------- |
| `batchOperationKey` | `BatchOperationKey` |             |
| `ct`                | `CancellationToken` |             |

**Returns:** `Task`

#### GetBatchOperationAsync(BatchOperationKey, ConsistencyOptions<BatchOperationResponse>?, CancellationToken)

```csharp
public Task<BatchOperationResponse> GetBatchOperationAsync(BatchOperationKey batchOperationKey, ConsistencyOptions<BatchOperationResponse>? consistency = null, CancellationToken ct = default)
```

Get batch operation
Get batch operation by key.

| Parameter           | Type                                         | Description |
| ------------------- | -------------------------------------------- | ----------- |
| `batchOperationKey` | `BatchOperationKey`                          |             |
| `consistency`       | `ConsistencyOptions<BatchOperationResponse>` |             |
| `ct`                | `CancellationToken`                          |             |

**Returns:** `Task<BatchOperationResponse>`

#### ResumeBatchOperationAsync(BatchOperationKey, CancellationToken)

```csharp
public Task ResumeBatchOperationAsync(BatchOperationKey batchOperationKey, CancellationToken ct = default)
```

Resume Batch operation
Resumes a suspended batch operation.
This is done asynchronously, the progress can be tracked using the batch operation status endpoint (/batch-operations/{batchOperationKey}).

| Parameter           | Type                | Description |
| ------------------- | ------------------- | ----------- |
| `batchOperationKey` | `BatchOperationKey` |             |
| `ct`                | `CancellationToken` |             |

**Returns:** `Task`

#### SearchBatchOperationItemsAsync(BatchOperationItemSearchQuery, ConsistencyOptions<BatchOperationItemSearchQueryResult>?, CancellationToken)

```csharp
public Task<BatchOperationItemSearchQueryResult> SearchBatchOperationItemsAsync(BatchOperationItemSearchQuery body, ConsistencyOptions<BatchOperationItemSearchQueryResult>? consistency = null, CancellationToken ct = default)
```

Search batch operation items
Search for batch operation items based on given criteria.

| Parameter     | Type                                                      | Description |
| ------------- | --------------------------------------------------------- | ----------- |
| `body`        | `BatchOperationItemSearchQuery`                           |             |
| `consistency` | `ConsistencyOptions<BatchOperationItemSearchQueryResult>` |             |
| `ct`          | `CancellationToken`                                       |             |

**Returns:** `Task<BatchOperationItemSearchQueryResult>`

#### SearchBatchOperationsAsync(BatchOperationSearchQuery, ConsistencyOptions<BatchOperationSearchQueryResult>?, CancellationToken)

```csharp
public Task<BatchOperationSearchQueryResult> SearchBatchOperationsAsync(BatchOperationSearchQuery body, ConsistencyOptions<BatchOperationSearchQueryResult>? consistency = null, CancellationToken ct = default)
```

Search batch operations
Search for batch operations based on given criteria.

| Parameter     | Type                                                  | Description |
| ------------- | ----------------------------------------------------- | ----------- |
| `body`        | `BatchOperationSearchQuery`                           |             |
| `consistency` | `ConsistencyOptions<BatchOperationSearchQueryResult>` |             |
| `ct`          | `CancellationToken`                                   |             |

**Returns:** `Task<BatchOperationSearchQueryResult>`

#### SuspendBatchOperationAsync(BatchOperationKey, CancellationToken)

```csharp
public Task SuspendBatchOperationAsync(BatchOperationKey batchOperationKey, CancellationToken ct = default)
```

Suspend Batch operation
Suspends a running batch operation.
This is done asynchronously, the progress can be tracked using the batch operation status endpoint (/batch-operations/{batchOperationKey}).

| Parameter           | Type                | Description |
| ------------------- | ------------------- | ----------- |
| `batchOperationKey` | `BatchOperationKey` |             |
| `ct`                | `CancellationToken` |             |

**Returns:** `Task`

### Process Instances

#### CancelProcessInstanceAsync(ProcessInstanceKey, CancelProcessInstanceRequest, CancellationToken)

```csharp
public Task CancelProcessInstanceAsync(ProcessInstanceKey processInstanceKey, CancelProcessInstanceRequest body, CancellationToken ct = default)
```

Cancel process instance
Cancels a running process instance. As a cancellation includes more than just the removal of the process instance resource, the cancellation resource must be posted. Cancellation can wait on listener-related processing; when that processing does not complete in time, this endpoint can return 504. Other gateway timeout causes are also possible. Retry with backoff and inspect listener worker availability and logs when this repeats.

| Parameter            | Type                           | Description |
| -------------------- | ------------------------------ | ----------- |
| `processInstanceKey` | `ProcessInstanceKey`           |             |
| `body`               | `CancelProcessInstanceRequest` |             |
| `ct`                 | `CancellationToken`            |             |

**Returns:** `Task`

#### CancelProcessInstancesBatchOperationAsync(ProcessInstanceCancellationBatchOperationRequest, CancellationToken)

```csharp
public Task<BatchOperationCreatedResult> CancelProcessInstancesBatchOperationAsync(ProcessInstanceCancellationBatchOperationRequest body, CancellationToken ct = default)
```

Cancel process instances (batch)
Cancels multiple running process instances.
Since only ACTIVE root instances can be cancelled, any given filters for state and
parentProcessInstanceKey are ignored and overridden during this batch operation.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

| Parameter | Type                                               | Description |
| --------- | -------------------------------------------------- | ----------- |
| `body`    | `ProcessInstanceCancellationBatchOperationRequest` |             |
| `ct`      | `CancellationToken`                                |             |

**Returns:** `Task<BatchOperationCreatedResult>`

#### CreateProcessInstanceAsync(ProcessInstanceCreationInstruction, CancellationToken)

```csharp
public Task<CreateProcessInstanceResult> CreateProcessInstanceAsync(ProcessInstanceCreationInstruction body, CancellationToken ct = default)
```

Create process instance
Creates and starts an instance of the specified process.
The process definition to use to create the instance can be specified either using its unique key
(as returned by Deploy resources), or using the BPMN process id and a version.

Waits for the completion of the process instance before returning a result
when awaitCompletion is enabled.

| Parameter | Type                                 | Description |
| --------- | ------------------------------------ | ----------- |
| `body`    | `ProcessInstanceCreationInstruction` |             |
| `ct`      | `CancellationToken`                  |             |

**Returns:** `Task<CreateProcessInstanceResult>`

#### DeleteProcessInstanceAsync(ProcessInstanceKey, DeleteProcessInstanceRequest, CancellationToken)

```csharp
public Task DeleteProcessInstanceAsync(ProcessInstanceKey processInstanceKey, DeleteProcessInstanceRequest body, CancellationToken ct = default)
```

Delete process instance
Deletes a process instance. Only instances that are completed or terminated can be deleted.

| Parameter            | Type                           | Description |
| -------------------- | ------------------------------ | ----------- |
| `processInstanceKey` | `ProcessInstanceKey`           |             |
| `body`               | `DeleteProcessInstanceRequest` |             |
| `ct`                 | `CancellationToken`            |             |

**Returns:** `Task`

#### DeleteProcessInstancesBatchOperationAsync(ProcessInstanceDeletionBatchOperationRequest, CancellationToken)

```csharp
public Task<BatchOperationCreatedResult> DeleteProcessInstancesBatchOperationAsync(ProcessInstanceDeletionBatchOperationRequest body, CancellationToken ct = default)
```

Delete process instances (batch)
Delete multiple process instances. This will delete the historic data from secondary storage.
Only process instances in a final state (COMPLETED or TERMINATED) can be deleted.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

| Parameter | Type                                           | Description |
| --------- | ---------------------------------------------- | ----------- |
| `body`    | `ProcessInstanceDeletionBatchOperationRequest` |             |
| `ct`      | `CancellationToken`                            |             |

**Returns:** `Task<BatchOperationCreatedResult>`

#### GetProcessInstanceAsync(ProcessInstanceKey, ConsistencyOptions<ProcessInstanceResult>?, CancellationToken)

```csharp
public Task<ProcessInstanceResult> GetProcessInstanceAsync(ProcessInstanceKey processInstanceKey, ConsistencyOptions<ProcessInstanceResult>? consistency = null, CancellationToken ct = default)
```

Get process instance
Get the process instance by the process instance key.

| Parameter            | Type                                        | Description |
| -------------------- | ------------------------------------------- | ----------- |
| `processInstanceKey` | `ProcessInstanceKey`                        |             |
| `consistency`        | `ConsistencyOptions<ProcessInstanceResult>` |             |
| `ct`                 | `CancellationToken`                         |             |

**Returns:** `Task<ProcessInstanceResult>`

#### GetProcessInstanceCallHierarchyAsync(ProcessInstanceKey, ConsistencyOptions<object>?, CancellationToken)

```csharp
public Task<object> GetProcessInstanceCallHierarchyAsync(ProcessInstanceKey processInstanceKey, ConsistencyOptions<object>? consistency = null, CancellationToken ct = default)
```

Get call hierarchy
Returns the call hierarchy for a given process instance, showing its ancestry up to the root instance.

| Parameter            | Type                         | Description |
| -------------------- | ---------------------------- | ----------- |
| `processInstanceKey` | `ProcessInstanceKey`         |             |
| `consistency`        | `ConsistencyOptions<Object>` |             |
| `ct`                 | `CancellationToken`          |             |

**Returns:** `Task<Object>`

#### GetProcessInstanceSequenceFlowsAsync(ProcessInstanceKey, ConsistencyOptions<ProcessInstanceSequenceFlowsQueryResult>?, CancellationToken)

```csharp
public Task<ProcessInstanceSequenceFlowsQueryResult> GetProcessInstanceSequenceFlowsAsync(ProcessInstanceKey processInstanceKey, ConsistencyOptions<ProcessInstanceSequenceFlowsQueryResult>? consistency = null, CancellationToken ct = default)
```

Get sequence flows
Get sequence flows taken by the process instance.

| Parameter            | Type                                                          | Description |
| -------------------- | ------------------------------------------------------------- | ----------- |
| `processInstanceKey` | `ProcessInstanceKey`                                          |             |
| `consistency`        | `ConsistencyOptions<ProcessInstanceSequenceFlowsQueryResult>` |             |
| `ct`                 | `CancellationToken`                                           |             |

**Returns:** `Task<ProcessInstanceSequenceFlowsQueryResult>`

#### GetProcessInstanceStatisticsAsync(ProcessInstanceKey, ConsistencyOptions<ProcessInstanceElementStatisticsQueryResult>?, CancellationToken)

```csharp
public Task<ProcessInstanceElementStatisticsQueryResult> GetProcessInstanceStatisticsAsync(ProcessInstanceKey processInstanceKey, ConsistencyOptions<ProcessInstanceElementStatisticsQueryResult>? consistency = null, CancellationToken ct = default)
```

Get element instance statistics
Get statistics about elements by the process instance key.

| Parameter            | Type                                                              | Description |
| -------------------- | ----------------------------------------------------------------- | ----------- |
| `processInstanceKey` | `ProcessInstanceKey`                                              |             |
| `consistency`        | `ConsistencyOptions<ProcessInstanceElementStatisticsQueryResult>` |             |
| `ct`                 | `CancellationToken`                                               |             |

**Returns:** `Task<ProcessInstanceElementStatisticsQueryResult>`

#### GetProcessInstanceStatisticsByDefinitionAsync(IncidentProcessInstanceStatisticsByDefinitionQuery, ConsistencyOptions<IncidentProcessInstanceStatisticsByDefinitionQueryResult>?, CancellationToken)

```csharp
public Task<IncidentProcessInstanceStatisticsByDefinitionQueryResult> GetProcessInstanceStatisticsByDefinitionAsync(IncidentProcessInstanceStatisticsByDefinitionQuery body, ConsistencyOptions<IncidentProcessInstanceStatisticsByDefinitionQueryResult>? consistency = null, CancellationToken ct = default)
```

Get process instance statistics by definition
Returns statistics for active process instances with incidents, grouped by process
definition. The result set is scoped to a specific incident error hash code, which must be
provided as a filter in the request body.

| Parameter     | Type                                                                           | Description |
| ------------- | ------------------------------------------------------------------------------ | ----------- |
| `body`        | `IncidentProcessInstanceStatisticsByDefinitionQuery`                           |             |
| `consistency` | `ConsistencyOptions<IncidentProcessInstanceStatisticsByDefinitionQueryResult>` |             |
| `ct`          | `CancellationToken`                                                            |             |

**Returns:** `Task<IncidentProcessInstanceStatisticsByDefinitionQueryResult>`

#### GetProcessInstanceStatisticsByErrorAsync(IncidentProcessInstanceStatisticsByErrorQuery, ConsistencyOptions<IncidentProcessInstanceStatisticsByErrorQueryResult>?, CancellationToken)

```csharp
public Task<IncidentProcessInstanceStatisticsByErrorQueryResult> GetProcessInstanceStatisticsByErrorAsync(IncidentProcessInstanceStatisticsByErrorQuery body, ConsistencyOptions<IncidentProcessInstanceStatisticsByErrorQueryResult>? consistency = null, CancellationToken ct = default)
```

Get process instance statistics by error
Returns statistics for active process instances that currently have active incidents,
grouped by incident error hash code.

| Parameter     | Type                                                                      | Description |
| ------------- | ------------------------------------------------------------------------- | ----------- |
| `body`        | `IncidentProcessInstanceStatisticsByErrorQuery`                           |             |
| `consistency` | `ConsistencyOptions<IncidentProcessInstanceStatisticsByErrorQueryResult>` |             |
| `ct`          | `CancellationToken`                                                       |             |

**Returns:** `Task<IncidentProcessInstanceStatisticsByErrorQueryResult>`

#### MigrateProcessInstanceAsync(ProcessInstanceKey, ProcessInstanceMigrationInstruction, CancellationToken)

```csharp
public Task MigrateProcessInstanceAsync(ProcessInstanceKey processInstanceKey, ProcessInstanceMigrationInstruction body, CancellationToken ct = default)
```

Migrate process instance
Migrates a process instance to a new process definition.
This request can contain multiple mapping instructions to define mapping between the active
process instance's elements and target process definition elements.

Use this to upgrade a process instance to a new version of a process or to
a different process definition, e.g. to keep your running instances up-to-date with the
latest process improvements.

| Parameter            | Type                                  | Description |
| -------------------- | ------------------------------------- | ----------- |
| `processInstanceKey` | `ProcessInstanceKey`                  |             |
| `body`               | `ProcessInstanceMigrationInstruction` |             |
| `ct`                 | `CancellationToken`                   |             |

**Returns:** `Task`

#### MigrateProcessInstancesBatchOperationAsync(ProcessInstanceMigrationBatchOperationRequest, CancellationToken)

```csharp
public Task<BatchOperationCreatedResult> MigrateProcessInstancesBatchOperationAsync(ProcessInstanceMigrationBatchOperationRequest body, CancellationToken ct = default)
```

Migrate process instances (batch)
Migrate multiple process instances.
Since only process instances with ACTIVE state can be migrated, any given
filters for state are ignored and overridden during this batch operation.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

| Parameter | Type                                            | Description |
| --------- | ----------------------------------------------- | ----------- |
| `body`    | `ProcessInstanceMigrationBatchOperationRequest` |             |
| `ct`      | `CancellationToken`                             |             |

**Returns:** `Task<BatchOperationCreatedResult>`

#### ModifyProcessInstanceAsync(ProcessInstanceKey, ProcessInstanceModificationInstruction, CancellationToken)

```csharp
public Task ModifyProcessInstanceAsync(ProcessInstanceKey processInstanceKey, ProcessInstanceModificationInstruction body, CancellationToken ct = default)
```

Modify process instance
Modifies a running process instance.
This request can contain multiple instructions to activate an element of the process or
to terminate an active instance of an element.

Use this to repair a process instance that is stuck on an element or took an unintended path.
For example, because an external system is not available or doesn't respond as expected.

| Parameter            | Type                                     | Description |
| -------------------- | ---------------------------------------- | ----------- |
| `processInstanceKey` | `ProcessInstanceKey`                     |             |
| `body`               | `ProcessInstanceModificationInstruction` |             |
| `ct`                 | `CancellationToken`                      |             |

**Returns:** `Task`

#### ModifyProcessInstancesBatchOperationAsync(ProcessInstanceModificationBatchOperationRequest, CancellationToken)

```csharp
public Task<BatchOperationCreatedResult> ModifyProcessInstancesBatchOperationAsync(ProcessInstanceModificationBatchOperationRequest body, CancellationToken ct = default)
```

Modify process instances (batch)
Modify multiple process instances.
Since only process instances with ACTIVE state can be modified, any given
filters for state are ignored and overridden during this batch operation.
In contrast to single modification operation, it is not possible to add variable instructions or modify by element key.
It is only possible to use the element id of the source and target.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

| Parameter | Type                                               | Description |
| --------- | -------------------------------------------------- | ----------- |
| `body`    | `ProcessInstanceModificationBatchOperationRequest` |             |
| `ct`      | `CancellationToken`                                |             |

**Returns:** `Task<BatchOperationCreatedResult>`

#### ResolveIncidentsBatchOperationAsync(ProcessInstanceIncidentResolutionBatchOperationRequest, CancellationToken)

```csharp
public Task<BatchOperationCreatedResult> ResolveIncidentsBatchOperationAsync(ProcessInstanceIncidentResolutionBatchOperationRequest body, CancellationToken ct = default)
```

Resolve related incidents (batch)
Resolves multiple instances of process instances.
Since only process instances with ACTIVE state can have unresolved incidents, any given
filters for state are ignored and overridden during this batch operation.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

| Parameter | Type                                                     | Description |
| --------- | -------------------------------------------------------- | ----------- |
| `body`    | `ProcessInstanceIncidentResolutionBatchOperationRequest` |             |
| `ct`      | `CancellationToken`                                      |             |

**Returns:** `Task<BatchOperationCreatedResult>`

#### ResolveProcessInstanceIncidentsAsync(ProcessInstanceKey, CancellationToken)

```csharp
public Task<BatchOperationCreatedResult> ResolveProcessInstanceIncidentsAsync(ProcessInstanceKey processInstanceKey, CancellationToken ct = default)
```

Resolve related incidents
Creates a batch operation to resolve multiple incidents of a process instance.

| Parameter            | Type                 | Description |
| -------------------- | -------------------- | ----------- |
| `processInstanceKey` | `ProcessInstanceKey` |             |
| `ct`                 | `CancellationToken`  |             |

**Returns:** `Task<BatchOperationCreatedResult>`

#### SearchProcessInstanceIncidentsAsync(ProcessInstanceKey, IncidentSearchQuery, ConsistencyOptions<IncidentSearchQueryResult>?, CancellationToken)

```csharp
public Task<IncidentSearchQueryResult> SearchProcessInstanceIncidentsAsync(ProcessInstanceKey processInstanceKey, IncidentSearchQuery body, ConsistencyOptions<IncidentSearchQueryResult>? consistency = null, CancellationToken ct = default)
```

Search related incidents
Search for incidents caused by the process instance or any of its called process or decision instances.

Although the `processInstanceKey` is provided as a path parameter to indicate the root process instance,
you may also include a `processInstanceKey` within the filter object to narrow results to specific
child process instances. This is useful, for example, if you want to isolate incidents associated with
subprocesses or called processes under the root instance while excluding incidents directly tied to the root.

| Parameter            | Type                                            | Description |
| -------------------- | ----------------------------------------------- | ----------- |
| `processInstanceKey` | `ProcessInstanceKey`                            |             |
| `body`               | `IncidentSearchQuery`                           |             |
| `consistency`        | `ConsistencyOptions<IncidentSearchQueryResult>` |             |
| `ct`                 | `CancellationToken`                             |             |

**Returns:** `Task<IncidentSearchQueryResult>`

#### SearchProcessInstancesAsync(ProcessInstanceSearchQuery, ConsistencyOptions<ProcessInstanceSearchQueryResult>?, CancellationToken)

```csharp
public Task<ProcessInstanceSearchQueryResult> SearchProcessInstancesAsync(ProcessInstanceSearchQuery body, ConsistencyOptions<ProcessInstanceSearchQueryResult>? consistency = null, CancellationToken ct = default)
```

Search process instances
Search for process instances based on given criteria.

| Parameter     | Type                                                   | Description |
| ------------- | ------------------------------------------------------ | ----------- |
| `body`        | `ProcessInstanceSearchQuery`                           |             |
| `consistency` | `ConsistencyOptions<ProcessInstanceSearchQueryResult>` |             |
| `ct`          | `CancellationToken`                                    |             |

**Returns:** `Task<ProcessInstanceSearchQueryResult>`

### Messages

#### CorrelateMessageAsync(MessageCorrelationRequest, CancellationToken)

```csharp
public Task<MessageCorrelationResult> CorrelateMessageAsync(MessageCorrelationRequest body, CancellationToken ct = default)
```

Correlate message
Publishes a message and correlates it to a subscription.
If correlation is successful it will return the first process instance key the message correlated with.
The message is not buffered.
Use the publish message endpoint to send messages that can be buffered.

| Parameter | Type                        | Description |
| --------- | --------------------------- | ----------- |
| `body`    | `MessageCorrelationRequest` |             |
| `ct`      | `CancellationToken`         |             |

**Returns:** `Task<MessageCorrelationResult>`

#### PublishMessageAsync(MessagePublicationRequest, CancellationToken)

```csharp
public Task<MessagePublicationResult> PublishMessageAsync(MessagePublicationRequest body, CancellationToken ct = default)
```

Publish message
Publishes a single message.
Messages are published to specific partitions computed from their correlation keys.
Messages can be buffered.
The endpoint does not wait for a correlation result.
Use the message correlation endpoint for such use cases.

| Parameter | Type                        | Description |
| --------- | --------------------------- | ----------- |
| `body`    | `MessagePublicationRequest` |             |
| `ct`      | `CancellationToken`         |             |

**Returns:** `Task<MessagePublicationResult>`

#### SearchCorrelatedMessageSubscriptionsAsync(CorrelatedMessageSubscriptionSearchQuery, ConsistencyOptions<CorrelatedMessageSubscriptionSearchQueryResult>?, CancellationToken)

```csharp
public Task<CorrelatedMessageSubscriptionSearchQueryResult> SearchCorrelatedMessageSubscriptionsAsync(CorrelatedMessageSubscriptionSearchQuery body, ConsistencyOptions<CorrelatedMessageSubscriptionSearchQueryResult>? consistency = null, CancellationToken ct = default)
```

Search correlated message subscriptions
Search correlated message subscriptions based on given criteria.

| Parameter     | Type                                                                 | Description |
| ------------- | -------------------------------------------------------------------- | ----------- |
| `body`        | `CorrelatedMessageSubscriptionSearchQuery`                           |             |
| `consistency` | `ConsistencyOptions<CorrelatedMessageSubscriptionSearchQueryResult>` |             |
| `ct`          | `CancellationToken`                                                  |             |

**Returns:** `Task<CorrelatedMessageSubscriptionSearchQueryResult>`

#### SearchMessageSubscriptionsAsync(MessageSubscriptionSearchQuery, ConsistencyOptions<MessageSubscriptionSearchQueryResult>?, CancellationToken)

```csharp
public Task<MessageSubscriptionSearchQueryResult> SearchMessageSubscriptionsAsync(MessageSubscriptionSearchQuery body, ConsistencyOptions<MessageSubscriptionSearchQueryResult>? consistency = null, CancellationToken ct = default)
```

Search message subscriptions
Search for message subscriptions based on given criteria.

| Parameter     | Type                                                       | Description |
| ------------- | ---------------------------------------------------------- | ----------- |
| `body`        | `MessageSubscriptionSearchQuery`                           |             |
| `consistency` | `ConsistencyOptions<MessageSubscriptionSearchQueryResult>` |             |
| `ct`          | `CancellationToken`                                        |             |

**Returns:** `Task<MessageSubscriptionSearchQueryResult>`

### Authorizations

#### CreateAuthorizationAsync(AuthorizationRequest, CancellationToken)

```csharp
public Task<AuthorizationCreateResult> CreateAuthorizationAsync(AuthorizationRequest body, CancellationToken ct = default)
```

Create authorization
Create the authorization.

| Parameter | Type                   | Description |
| --------- | ---------------------- | ----------- |
| `body`    | `AuthorizationRequest` |             |
| `ct`      | `CancellationToken`    |             |

**Returns:** `Task<AuthorizationCreateResult>`

#### DeleteAuthorizationAsync(AuthorizationKey, CancellationToken)

```csharp
public Task DeleteAuthorizationAsync(AuthorizationKey authorizationKey, CancellationToken ct = default)
```

Delete authorization
Deletes the authorization with the given key.

| Parameter          | Type                | Description |
| ------------------ | ------------------- | ----------- |
| `authorizationKey` | `AuthorizationKey`  |             |
| `ct`               | `CancellationToken` |             |

**Returns:** `Task`

#### GetAuthorizationAsync(AuthorizationKey, ConsistencyOptions<AuthorizationResult>?, CancellationToken)

```csharp
public Task<AuthorizationResult> GetAuthorizationAsync(AuthorizationKey authorizationKey, ConsistencyOptions<AuthorizationResult>? consistency = null, CancellationToken ct = default)
```

Get authorization
Get authorization by the given key.

| Parameter          | Type                                      | Description |
| ------------------ | ----------------------------------------- | ----------- |
| `authorizationKey` | `AuthorizationKey`                        |             |
| `consistency`      | `ConsistencyOptions<AuthorizationResult>` |             |
| `ct`               | `CancellationToken`                       |             |

**Returns:** `Task<AuthorizationResult>`

#### SearchAuthorizationsAsync(AuthorizationSearchQuery, ConsistencyOptions<AuthorizationSearchResult>?, CancellationToken)

```csharp
public Task<AuthorizationSearchResult> SearchAuthorizationsAsync(AuthorizationSearchQuery body, ConsistencyOptions<AuthorizationSearchResult>? consistency = null, CancellationToken ct = default)
```

Search authorizations
Search for authorizations based on given criteria.

| Parameter     | Type                                            | Description |
| ------------- | ----------------------------------------------- | ----------- |
| `body`        | `AuthorizationSearchQuery`                      |             |
| `consistency` | `ConsistencyOptions<AuthorizationSearchResult>` |             |
| `ct`          | `CancellationToken`                             |             |

**Returns:** `Task<AuthorizationSearchResult>`

#### UpdateAuthorizationAsync(AuthorizationKey, AuthorizationRequest, CancellationToken)

```csharp
public Task UpdateAuthorizationAsync(AuthorizationKey authorizationKey, AuthorizationRequest body, CancellationToken ct = default)
```

Update authorization
Update the authorization with the given key.

| Parameter          | Type                   | Description |
| ------------------ | ---------------------- | ----------- |
| `authorizationKey` | `AuthorizationKey`     |             |
| `body`             | `AuthorizationRequest` |             |
| `ct`               | `CancellationToken`    |             |

**Returns:** `Task`

### Deployments

#### CreateDeploymentAsync(MultipartFormDataContent, CancellationToken)

```csharp
public Task<DeploymentResult> CreateDeploymentAsync(MultipartFormDataContent content, CancellationToken ct = default)
```

Deploy resources
Deploys one or more resources (e.g. processes, decision models, or forms).
This is an atomic call, i.e. either all resources are deployed or none of them are.

| Parameter | Type                       | Description |
| --------- | -------------------------- | ----------- |
| `content` | `MultipartFormDataContent` |             |
| `ct`      | `CancellationToken`        |             |

**Returns:** `Task<DeploymentResult>`

### Documents

#### CreateDocumentAsync(MultipartFormDataContent, string?, DocumentId?, CancellationToken)

```csharp
public Task<DocumentReference> CreateDocumentAsync(MultipartFormDataContent content, string? storeId = null, DocumentId? documentId = null, CancellationToken ct = default)
```

Upload document
Upload a document to the Camunda 8 cluster.

Note that this is currently supported for document stores of type: AWS, GCP, in-memory (non-production), local (non-production)

| Parameter    | Type                       | Description |
| ------------ | -------------------------- | ----------- |
| `content`    | `MultipartFormDataContent` |             |
| `storeId`    | `String`                   |             |
| `documentId` | `Nullable<DocumentId>`     |             |
| `ct`         | `CancellationToken`        |             |

**Returns:** `Task<DocumentReference>`

#### CreateDocumentLinkAsync(DocumentId, DocumentLinkRequest, string?, string?, CancellationToken)

```csharp
public Task<DocumentLink> CreateDocumentLinkAsync(DocumentId documentId, DocumentLinkRequest body, string? storeId = null, string? contentHash = null, CancellationToken ct = default)
```

Create document link
Create a link to a document in the Camunda 8 cluster.

Note that this is currently supported for document stores of type: AWS, GCP

| Parameter     | Type                  | Description |
| ------------- | --------------------- | ----------- |
| `documentId`  | `DocumentId`          |             |
| `body`        | `DocumentLinkRequest` |             |
| `storeId`     | `String`              |             |
| `contentHash` | `String`              |             |
| `ct`          | `CancellationToken`   |             |

**Returns:** `Task<DocumentLink>`

#### CreateDocumentsAsync(MultipartFormDataContent, string?, CancellationToken)

```csharp
public Task<DocumentCreationBatchResponse> CreateDocumentsAsync(MultipartFormDataContent content, string? storeId = null, CancellationToken ct = default)
```

Upload multiple documents
Upload multiple documents to the Camunda 8 cluster.

The caller must provide a file name for each document, which will be used in case of a multi-status response
to identify which documents failed to upload. The file name can be provided in the `Content-Disposition` header
of the file part or in the `fileName` field of the metadata. You can add a parallel array of metadata objects. These
are matched with the files based on index, and must have the same length as the files array.
To pass homogenous metadata for all files, spread the metadata over the metadata array.
A filename value provided explicitly via the metadata array in the request overrides the `Content-Disposition` header
of the file part.

In case of a multi-status response, the response body will contain a list of `DocumentBatchProblemDetail` objects,
each of which contains the file name of the document that failed to upload and the reason for the failure.
The client can choose to retry the whole batch or individual documents based on the response.

Note that this is currently supported for document stores of type: AWS, GCP, in-memory (non-production), local (non-production)

| Parameter | Type                       | Description |
| --------- | -------------------------- | ----------- |
| `content` | `MultipartFormDataContent` |             |
| `storeId` | `String`                   |             |
| `ct`      | `CancellationToken`        |             |

**Returns:** `Task<DocumentCreationBatchResponse>`

#### DeleteDocumentAsync(DocumentId, string?, CancellationToken)

```csharp
public Task DeleteDocumentAsync(DocumentId documentId, string? storeId = null, CancellationToken ct = default)
```

Delete document
Delete a document from the Camunda 8 cluster.

Note that this is currently supported for document stores of type: AWS, GCP, in-memory (non-production), local (non-production)

| Parameter    | Type                | Description |
| ------------ | ------------------- | ----------- |
| `documentId` | `DocumentId`        |             |
| `storeId`    | `String`            |             |
| `ct`         | `CancellationToken` |             |

**Returns:** `Task`

#### GetDocumentAsync(DocumentId, string?, string?, CancellationToken)

```csharp
public Task<object> GetDocumentAsync(DocumentId documentId, string? storeId = null, string? contentHash = null, CancellationToken ct = default)
```

Download document
Download a document from the Camunda 8 cluster.

Note that this is currently supported for document stores of type: AWS, GCP, in-memory (non-production), local (non-production)

| Parameter     | Type                | Description |
| ------------- | ------------------- | ----------- |
| `documentId`  | `DocumentId`        |             |
| `storeId`     | `String`            |             |
| `contentHash` | `String`            |             |
| `ct`          | `CancellationToken` |             |

**Returns:** `Task<Object>`

### Variables

#### CreateElementInstanceVariablesAsync(ElementInstanceKey, SetVariableRequest, CancellationToken)

```csharp
public Task CreateElementInstanceVariablesAsync(ElementInstanceKey elementInstanceKey, SetVariableRequest body, CancellationToken ct = default)
```

Update element instance variables
Updates all the variables of a particular scope (for example, process instance, element instance) with the given variable data.
Specify the element instance in the `elementInstanceKey` parameter.
Variable updates can be delayed by listener-related processing; if processing exceeds the
request timeout, this endpoint can return 504. Other gateway timeout causes are also
possible. Retry with backoff and inspect listener worker availability and logs when this
repeats.

| Parameter            | Type                 | Description |
| -------------------- | -------------------- | ----------- |
| `elementInstanceKey` | `ElementInstanceKey` |             |
| `body`               | `SetVariableRequest` |             |
| `ct`                 | `CancellationToken`  |             |

**Returns:** `Task`

#### CreateGlobalClusterVariableAsync(CreateClusterVariableRequest, CancellationToken)

```csharp
public Task<ClusterVariableResult> CreateGlobalClusterVariableAsync(CreateClusterVariableRequest body, CancellationToken ct = default)
```

Create a global-scoped cluster variable
Create a global-scoped cluster variable.

| Parameter | Type                           | Description |
| --------- | ------------------------------ | ----------- |
| `body`    | `CreateClusterVariableRequest` |             |
| `ct`      | `CancellationToken`            |             |

**Returns:** `Task<ClusterVariableResult>`

#### CreateTenantClusterVariableAsync(TenantId, CreateClusterVariableRequest, CancellationToken)

```csharp
public Task<ClusterVariableResult> CreateTenantClusterVariableAsync(TenantId tenantId, CreateClusterVariableRequest body, CancellationToken ct = default)
```

Create a tenant-scoped cluster variable
Create a new cluster variable for the given tenant.

| Parameter  | Type                           | Description |
| ---------- | ------------------------------ | ----------- |
| `tenantId` | `TenantId`                     |             |
| `body`     | `CreateClusterVariableRequest` |             |
| `ct`       | `CancellationToken`            |             |

**Returns:** `Task<ClusterVariableResult>`

#### DeleteGlobalClusterVariableAsync(string, CancellationToken)

```csharp
public Task DeleteGlobalClusterVariableAsync(string name, CancellationToken ct = default)
```

Delete a global-scoped cluster variable
Delete a global-scoped cluster variable.

| Parameter | Type                | Description |
| --------- | ------------------- | ----------- |
| `name`    | `String`            |             |
| `ct`      | `CancellationToken` |             |

**Returns:** `Task`

#### DeleteTenantClusterVariableAsync(TenantId, string, CancellationToken)

```csharp
public Task DeleteTenantClusterVariableAsync(TenantId tenantId, string name, CancellationToken ct = default)
```

Delete a tenant-scoped cluster variable
Delete a tenant-scoped cluster variable.

| Parameter  | Type                | Description |
| ---------- | ------------------- | ----------- |
| `tenantId` | `TenantId`          |             |
| `name`     | `String`            |             |
| `ct`       | `CancellationToken` |             |

**Returns:** `Task`

#### GetGlobalClusterVariableAsync(string, ConsistencyOptions<ClusterVariableResult>?, CancellationToken)

```csharp
public Task<ClusterVariableResult> GetGlobalClusterVariableAsync(string name, ConsistencyOptions<ClusterVariableResult>? consistency = null, CancellationToken ct = default)
```

Get a global-scoped cluster variable
Get a global-scoped cluster variable.

| Parameter     | Type                                        | Description |
| ------------- | ------------------------------------------- | ----------- |
| `name`        | `String`                                    |             |
| `consistency` | `ConsistencyOptions<ClusterVariableResult>` |             |
| `ct`          | `CancellationToken`                         |             |

**Returns:** `Task<ClusterVariableResult>`

#### GetTenantClusterVariableAsync(TenantId, string, ConsistencyOptions<ClusterVariableResult>?, CancellationToken)

```csharp
public Task<ClusterVariableResult> GetTenantClusterVariableAsync(TenantId tenantId, string name, ConsistencyOptions<ClusterVariableResult>? consistency = null, CancellationToken ct = default)
```

Get a tenant-scoped cluster variable
Get a tenant-scoped cluster variable.

| Parameter     | Type                                        | Description |
| ------------- | ------------------------------------------- | ----------- |
| `tenantId`    | `TenantId`                                  |             |
| `name`        | `String`                                    |             |
| `consistency` | `ConsistencyOptions<ClusterVariableResult>` |             |
| `ct`          | `CancellationToken`                         |             |

**Returns:** `Task<ClusterVariableResult>`

#### GetVariableAsync(VariableKey, ConsistencyOptions<VariableResult>?, CancellationToken)

```csharp
public Task<VariableResult> GetVariableAsync(VariableKey variableKey, ConsistencyOptions<VariableResult>? consistency = null, CancellationToken ct = default)
```

Get variable
Get a variable by its key.

This endpoint returns both process-level and local (element-scoped) variables.
The variable's scopeKey indicates whether it's a process-level variable or scoped to a
specific element instance.

| Parameter     | Type                                 | Description |
| ------------- | ------------------------------------ | ----------- |
| `variableKey` | `VariableKey`                        |             |
| `consistency` | `ConsistencyOptions<VariableResult>` |             |
| `ct`          | `CancellationToken`                  |             |

**Returns:** `Task<VariableResult>`

#### SearchClusterVariablesAsync(ClusterVariableSearchQueryRequest, bool?, ConsistencyOptions<ClusterVariableSearchQueryResult>?, CancellationToken)

```csharp
public Task<ClusterVariableSearchQueryResult> SearchClusterVariablesAsync(ClusterVariableSearchQueryRequest body, bool? truncateValues = null, ConsistencyOptions<ClusterVariableSearchQueryResult>? consistency = null, CancellationToken ct = default)
```

Search for cluster variables based on given criteria. By default, long variable values in the response are truncated.

| Parameter        | Type                                                   | Description |
| ---------------- | ------------------------------------------------------ | ----------- |
| `body`           | `ClusterVariableSearchQueryRequest`                    |             |
| `truncateValues` | `Nullable<Boolean>`                                    |             |
| `consistency`    | `ConsistencyOptions<ClusterVariableSearchQueryResult>` |             |
| `ct`             | `CancellationToken`                                    |             |

**Returns:** `Task<ClusterVariableSearchQueryResult>`

#### SearchVariablesAsync(SearchVariablesRequest, bool?, ConsistencyOptions<VariableSearchQueryResult>?, CancellationToken)

```csharp
public Task<VariableSearchQueryResult> SearchVariablesAsync(SearchVariablesRequest body, bool? truncateValues = null, ConsistencyOptions<VariableSearchQueryResult>? consistency = null, CancellationToken ct = default)
```

Search variables
Search for variables based on given criteria.

This endpoint returns variables that exist directly at the specified scopes - it does not
include variables from parent scopes that would be visible through the scope hierarchy.

Variables can be process-level (scoped to the process instance) or local (scoped to specific
BPMN elements like tasks, subprocesses, etc.).

By default, long variable values in the response are truncated.

| Parameter        | Type                                            | Description |
| ---------------- | ----------------------------------------------- | ----------- |
| `body`           | `SearchVariablesRequest`                        |             |
| `truncateValues` | `Nullable<Boolean>`                             |             |
| `consistency`    | `ConsistencyOptions<VariableSearchQueryResult>` |             |
| `ct`             | `CancellationToken`                             |             |

**Returns:** `Task<VariableSearchQueryResult>`

#### UpdateGlobalClusterVariableAsync(string, UpdateClusterVariableRequest, CancellationToken)

```csharp
public Task<ClusterVariableResult> UpdateGlobalClusterVariableAsync(string name, UpdateClusterVariableRequest body, CancellationToken ct = default)
```

Update a global-scoped cluster variable
Updates the value of an existing global cluster variable.
The variable must exist, otherwise a 404 error is returned.

| Parameter | Type                           | Description |
| --------- | ------------------------------ | ----------- |
| `name`    | `String`                       |             |
| `body`    | `UpdateClusterVariableRequest` |             |
| `ct`      | `CancellationToken`            |             |

**Returns:** `Task<ClusterVariableResult>`

#### UpdateTenantClusterVariableAsync(TenantId, string, UpdateClusterVariableRequest, CancellationToken)

```csharp
public Task<ClusterVariableResult> UpdateTenantClusterVariableAsync(TenantId tenantId, string name, UpdateClusterVariableRequest body, CancellationToken ct = default)
```

Update a tenant-scoped cluster variable
Updates the value of an existing tenant-scoped cluster variable.
The variable must exist, otherwise a 404 error is returned.

| Parameter  | Type                           | Description |
| ---------- | ------------------------------ | ----------- |
| `tenantId` | `TenantId`                     |             |
| `name`     | `String`                       |             |
| `body`     | `UpdateClusterVariableRequest` |             |
| `ct`       | `CancellationToken`            |             |

**Returns:** `Task<ClusterVariableResult>`

### Mappings

#### CreateMappingRuleAsync(MappingRuleCreateRequest, CancellationToken)

```csharp
public Task<CreateMappingRuleResponse> CreateMappingRuleAsync(MappingRuleCreateRequest body, CancellationToken ct = default)
```

Create mapping rule
Create a new mapping rule

| Parameter | Type                       | Description |
| --------- | -------------------------- | ----------- |
| `body`    | `MappingRuleCreateRequest` |             |
| `ct`      | `CancellationToken`        |             |

**Returns:** `Task<CreateMappingRuleResponse>`

#### DeleteMappingRuleAsync(string, CancellationToken)

```csharp
public Task DeleteMappingRuleAsync(string mappingRuleId, CancellationToken ct = default)
```

Delete a mapping rule
Deletes the mapping rule with the given ID.

| Parameter       | Type                | Description |
| --------------- | ------------------- | ----------- |
| `mappingRuleId` | `String`            |             |
| `ct`            | `CancellationToken` |             |

**Returns:** `Task`

#### GetMappingRuleAsync(string, ConsistencyOptions<MappingRuleResult>?, CancellationToken)

```csharp
public Task<MappingRuleResult> GetMappingRuleAsync(string mappingRuleId, ConsistencyOptions<MappingRuleResult>? consistency = null, CancellationToken ct = default)
```

Get a mapping rule
Gets the mapping rule with the given ID.

| Parameter       | Type                                    | Description |
| --------------- | --------------------------------------- | ----------- |
| `mappingRuleId` | `String`                                |             |
| `consistency`   | `ConsistencyOptions<MappingRuleResult>` |             |
| `ct`            | `CancellationToken`                     |             |

**Returns:** `Task<MappingRuleResult>`

#### SearchMappingRuleAsync(MappingRuleSearchQueryRequest, ConsistencyOptions<SearchMappingRuleResponse>?, CancellationToken)

```csharp
public Task<SearchMappingRuleResponse> SearchMappingRuleAsync(MappingRuleSearchQueryRequest body, ConsistencyOptions<SearchMappingRuleResponse>? consistency = null, CancellationToken ct = default)
```

Search mapping rules
Search for mapping rules based on given criteria.

| Parameter     | Type                                            | Description |
| ------------- | ----------------------------------------------- | ----------- |
| `body`        | `MappingRuleSearchQueryRequest`                 |             |
| `consistency` | `ConsistencyOptions<SearchMappingRuleResponse>` |             |
| `ct`          | `CancellationToken`                             |             |

**Returns:** `Task<SearchMappingRuleResponse>`

#### UpdateMappingRuleAsync(string, MappingRuleUpdateRequest, CancellationToken)

```csharp
public Task<UpdateMappingRuleResponse> UpdateMappingRuleAsync(string mappingRuleId, MappingRuleUpdateRequest body, CancellationToken ct = default)
```

Update mapping rule
Update a mapping rule.

| Parameter       | Type                       | Description |
| --------------- | -------------------------- | ----------- |
| `mappingRuleId` | `String`                   |             |
| `body`          | `MappingRuleUpdateRequest` |             |
| `ct`            | `CancellationToken`        |             |

**Returns:** `Task<UpdateMappingRuleResponse>`

### Decision Instances

#### DeleteDecisionInstanceAsync(DecisionEvaluationKey, DeleteDecisionInstanceRequest, CancellationToken)

```csharp
public Task DeleteDecisionInstanceAsync(DecisionEvaluationKey decisionEvaluationKey, DeleteDecisionInstanceRequest body, CancellationToken ct = default)
```

Delete decision instance
Delete all associated decision evaluations based on provided key.

| Parameter               | Type                            | Description |
| ----------------------- | ------------------------------- | ----------- |
| `decisionEvaluationKey` | `DecisionEvaluationKey`         |             |
| `body`                  | `DeleteDecisionInstanceRequest` |             |
| `ct`                    | `CancellationToken`             |             |

**Returns:** `Task`

#### DeleteDecisionInstancesBatchOperationAsync(DecisionInstanceDeletionBatchOperationRequest, CancellationToken)

```csharp
public Task<BatchOperationCreatedResult> DeleteDecisionInstancesBatchOperationAsync(DecisionInstanceDeletionBatchOperationRequest body, CancellationToken ct = default)
```

Delete decision instances (batch)
Delete multiple decision instances. This will delete the historic data from secondary storage.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

| Parameter | Type                                            | Description |
| --------- | ----------------------------------------------- | ----------- |
| `body`    | `DecisionInstanceDeletionBatchOperationRequest` |             |
| `ct`      | `CancellationToken`                             |             |

**Returns:** `Task<BatchOperationCreatedResult>`

#### GetDecisionInstanceAsync(DecisionEvaluationInstanceKey, ConsistencyOptions<DecisionInstanceGetQueryResult>?, CancellationToken)

```csharp
public Task<DecisionInstanceGetQueryResult> GetDecisionInstanceAsync(DecisionEvaluationInstanceKey decisionEvaluationInstanceKey, ConsistencyOptions<DecisionInstanceGetQueryResult>? consistency = null, CancellationToken ct = default)
```

Get decision instance
Returns a decision instance.

| Parameter                       | Type                                                 | Description |
| ------------------------------- | ---------------------------------------------------- | ----------- |
| `decisionEvaluationInstanceKey` | `DecisionEvaluationInstanceKey`                      |             |
| `consistency`                   | `ConsistencyOptions<DecisionInstanceGetQueryResult>` |             |
| `ct`                            | `CancellationToken`                                  |             |

**Returns:** `Task<DecisionInstanceGetQueryResult>`

#### SearchDecisionInstancesAsync(DecisionInstanceSearchQuery, ConsistencyOptions<DecisionInstanceSearchQueryResult>?, CancellationToken)

```csharp
public Task<DecisionInstanceSearchQueryResult> SearchDecisionInstancesAsync(DecisionInstanceSearchQuery body, ConsistencyOptions<DecisionInstanceSearchQueryResult>? consistency = null, CancellationToken ct = default)
```

Search decision instances
Search for decision instances based on given criteria.

| Parameter     | Type                                                    | Description |
| ------------- | ------------------------------------------------------- | ----------- |
| `body`        | `DecisionInstanceSearchQuery`                           |             |
| `consistency` | `ConsistencyOptions<DecisionInstanceSearchQueryResult>` |             |
| `ct`          | `CancellationToken`                                     |             |

**Returns:** `Task<DecisionInstanceSearchQueryResult>`

### Decisions

#### EvaluateDecisionAsync(DecisionEvaluationInstruction, CancellationToken)

```csharp
public Task<EvaluateDecisionResult> EvaluateDecisionAsync(DecisionEvaluationInstruction body, CancellationToken ct = default)
```

Evaluate decision
Evaluates a decision.
You specify the decision to evaluate either by using its unique key (as returned by
DeployResource), or using the decision ID. When using the decision ID, the latest deployed
version of the decision is used.

| Parameter | Type                            | Description |
| --------- | ------------------------------- | ----------- |
| `body`    | `DecisionEvaluationInstruction` |             |
| `ct`      | `CancellationToken`             |             |

**Returns:** `Task<EvaluateDecisionResult>`

### Audit Logs

#### GetAuditLogAsync(AuditLogKey, ConsistencyOptions<AuditLogResult>?, CancellationToken)

```csharp
public Task<AuditLogResult> GetAuditLogAsync(AuditLogKey auditLogKey, ConsistencyOptions<AuditLogResult>? consistency = null, CancellationToken ct = default)
```

Get audit log
Get an audit log entry by auditLogKey.

| Parameter     | Type                                 | Description |
| ------------- | ------------------------------------ | ----------- |
| `auditLogKey` | `AuditLogKey`                        |             |
| `consistency` | `ConsistencyOptions<AuditLogResult>` |             |
| `ct`          | `CancellationToken`                  |             |

**Returns:** `Task<AuditLogResult>`

#### SearchAuditLogsAsync(AuditLogSearchQueryRequest, ConsistencyOptions<AuditLogSearchQueryResult>?, CancellationToken)

```csharp
public Task<AuditLogSearchQueryResult> SearchAuditLogsAsync(AuditLogSearchQueryRequest body, ConsistencyOptions<AuditLogSearchQueryResult>? consistency = null, CancellationToken ct = default)
```

Search audit logs
Search for audit logs based on given criteria.

| Parameter     | Type                                            | Description |
| ------------- | ----------------------------------------------- | ----------- |
| `body`        | `AuditLogSearchQueryRequest`                    |             |
| `consistency` | `ConsistencyOptions<AuditLogSearchQueryResult>` |             |
| `ct`          | `CancellationToken`                             |             |

**Returns:** `Task<AuditLogSearchQueryResult>`

### Decision Definitions

#### GetDecisionDefinitionAsync(DecisionDefinitionKey, ConsistencyOptions<DecisionDefinitionResult>?, CancellationToken)

```csharp
public Task<DecisionDefinitionResult> GetDecisionDefinitionAsync(DecisionDefinitionKey decisionDefinitionKey, ConsistencyOptions<DecisionDefinitionResult>? consistency = null, CancellationToken ct = default)
```

Get decision definition
Returns a decision definition by key.

| Parameter               | Type                                           | Description |
| ----------------------- | ---------------------------------------------- | ----------- |
| `decisionDefinitionKey` | `DecisionDefinitionKey`                        |             |
| `consistency`           | `ConsistencyOptions<DecisionDefinitionResult>` |             |
| `ct`                    | `CancellationToken`                            |             |

**Returns:** `Task<DecisionDefinitionResult>`

#### GetDecisionDefinitionXmlAsync(DecisionDefinitionKey, ConsistencyOptions<object>?, CancellationToken)

```csharp
public Task<object> GetDecisionDefinitionXmlAsync(DecisionDefinitionKey decisionDefinitionKey, ConsistencyOptions<object>? consistency = null, CancellationToken ct = default)
```

Get decision definition XML
Returns decision definition as XML.

| Parameter               | Type                         | Description |
| ----------------------- | ---------------------------- | ----------- |
| `decisionDefinitionKey` | `DecisionDefinitionKey`      |             |
| `consistency`           | `ConsistencyOptions<Object>` |             |
| `ct`                    | `CancellationToken`          |             |

**Returns:** `Task<Object>`

#### SearchDecisionDefinitionsAsync(DecisionDefinitionSearchQuery, ConsistencyOptions<DecisionDefinitionSearchQueryResult>?, CancellationToken)

```csharp
public Task<DecisionDefinitionSearchQueryResult> SearchDecisionDefinitionsAsync(DecisionDefinitionSearchQuery body, ConsistencyOptions<DecisionDefinitionSearchQueryResult>? consistency = null, CancellationToken ct = default)
```

Search decision definitions
Search for decision definitions based on given criteria.

| Parameter     | Type                                                      | Description |
| ------------- | --------------------------------------------------------- | ----------- |
| `body`        | `DecisionDefinitionSearchQuery`                           |             |
| `consistency` | `ConsistencyOptions<DecisionDefinitionSearchQueryResult>` |             |
| `ct`          | `CancellationToken`                                       |             |

**Returns:** `Task<DecisionDefinitionSearchQueryResult>`

### Decision Requirements

#### GetDecisionRequirementsAsync(DecisionRequirementsKey, ConsistencyOptions<DecisionRequirementsResult>?, CancellationToken)

```csharp
public Task<DecisionRequirementsResult> GetDecisionRequirementsAsync(DecisionRequirementsKey decisionRequirementsKey, ConsistencyOptions<DecisionRequirementsResult>? consistency = null, CancellationToken ct = default)
```

Get decision requirements
Returns Decision Requirements as JSON.

| Parameter                 | Type                                             | Description |
| ------------------------- | ------------------------------------------------ | ----------- |
| `decisionRequirementsKey` | `DecisionRequirementsKey`                        |             |
| `consistency`             | `ConsistencyOptions<DecisionRequirementsResult>` |             |
| `ct`                      | `CancellationToken`                              |             |

**Returns:** `Task<DecisionRequirementsResult>`

#### GetDecisionRequirementsXmlAsync(DecisionRequirementsKey, ConsistencyOptions<object>?, CancellationToken)

```csharp
public Task<object> GetDecisionRequirementsXmlAsync(DecisionRequirementsKey decisionRequirementsKey, ConsistencyOptions<object>? consistency = null, CancellationToken ct = default)
```

Get decision requirements XML
Returns decision requirements as XML.

| Parameter                 | Type                         | Description |
| ------------------------- | ---------------------------- | ----------- |
| `decisionRequirementsKey` | `DecisionRequirementsKey`    |             |
| `consistency`             | `ConsistencyOptions<Object>` |             |
| `ct`                      | `CancellationToken`          |             |

**Returns:** `Task<Object>`

#### SearchDecisionRequirementsAsync(DecisionRequirementsSearchQuery, ConsistencyOptions<DecisionRequirementsSearchQueryResult>?, CancellationToken)

```csharp
public Task<DecisionRequirementsSearchQueryResult> SearchDecisionRequirementsAsync(DecisionRequirementsSearchQuery body, ConsistencyOptions<DecisionRequirementsSearchQueryResult>? consistency = null, CancellationToken ct = default)
```

Search decision requirements
Search for decision requirements based on given criteria.

| Parameter     | Type                                                        | Description |
| ------------- | ----------------------------------------------------------- | ----------- |
| `body`        | `DecisionRequirementsSearchQuery`                           |             |
| `consistency` | `ConsistencyOptions<DecisionRequirementsSearchQueryResult>` |             |
| `ct`          | `CancellationToken`                                         |             |

**Returns:** `Task<DecisionRequirementsSearchQueryResult>`

### Incidents

#### GetIncidentAsync(IncidentKey, ConsistencyOptions<IncidentResult>?, CancellationToken)

```csharp
public Task<IncidentResult> GetIncidentAsync(IncidentKey incidentKey, ConsistencyOptions<IncidentResult>? consistency = null, CancellationToken ct = default)
```

Get incident
Returns incident as JSON.

| Parameter     | Type                                 | Description |
| ------------- | ------------------------------------ | ----------- |
| `incidentKey` | `IncidentKey`                        |             |
| `consistency` | `ConsistencyOptions<IncidentResult>` |             |
| `ct`          | `CancellationToken`                  |             |

**Returns:** `Task<IncidentResult>`

#### ResolveIncidentAsync(IncidentKey, IncidentResolutionRequest, CancellationToken)

```csharp
public Task ResolveIncidentAsync(IncidentKey incidentKey, IncidentResolutionRequest body, CancellationToken ct = default)
```

Resolve incident
Marks the incident as resolved; most likely a call to Update job will be necessary
to reset the job's retries, followed by this call.

| Parameter     | Type                        | Description |
| ------------- | --------------------------- | ----------- |
| `incidentKey` | `IncidentKey`               |             |
| `body`        | `IncidentResolutionRequest` |             |
| `ct`          | `CancellationToken`         |             |

**Returns:** `Task`

#### SearchElementInstanceIncidentsAsync(ElementInstanceKey, IncidentSearchQuery, ConsistencyOptions<IncidentSearchQueryResult>?, CancellationToken)

```csharp
public Task<IncidentSearchQueryResult> SearchElementInstanceIncidentsAsync(ElementInstanceKey elementInstanceKey, IncidentSearchQuery body, ConsistencyOptions<IncidentSearchQueryResult>? consistency = null, CancellationToken ct = default)
```

Search for incidents of a specific element instance
Search for incidents caused by the specified element instance, including incidents of any child instances created from this element instance.

Although the `elementInstanceKey` is provided as a path parameter to indicate the root element instance,
you may also include an `elementInstanceKey` within the filter object to narrow results to specific
child element instances. This is useful, for example, if you want to isolate incidents associated with
nested or subordinate elements within the given element instance while excluding incidents directly tied
to the root element itself.

| Parameter            | Type                                            | Description |
| -------------------- | ----------------------------------------------- | ----------- |
| `elementInstanceKey` | `ElementInstanceKey`                            |             |
| `body`               | `IncidentSearchQuery`                           |             |
| `consistency`        | `ConsistencyOptions<IncidentSearchQueryResult>` |             |
| `ct`                 | `CancellationToken`                             |             |

**Returns:** `Task<IncidentSearchQueryResult>`

#### SearchIncidentsAsync(IncidentSearchQuery, ConsistencyOptions<IncidentSearchQueryResult>?, CancellationToken)

```csharp
public Task<IncidentSearchQueryResult> SearchIncidentsAsync(IncidentSearchQuery body, ConsistencyOptions<IncidentSearchQueryResult>? consistency = null, CancellationToken ct = default)
```

Search incidents
Search for incidents based on given criteria.

| Parameter     | Type                                            | Description |
| ------------- | ----------------------------------------------- | ----------- |
| `body`        | `IncidentSearchQuery`                           |             |
| `consistency` | `ConsistencyOptions<IncidentSearchQueryResult>` |             |
| `ct`          | `CancellationToken`                             |             |

**Returns:** `Task<IncidentSearchQueryResult>`

### Process Definitions

#### GetProcessDefinitionAsync(ProcessDefinitionKey, ConsistencyOptions<ProcessDefinitionResult>?, CancellationToken)

```csharp
public Task<ProcessDefinitionResult> GetProcessDefinitionAsync(ProcessDefinitionKey processDefinitionKey, ConsistencyOptions<ProcessDefinitionResult>? consistency = null, CancellationToken ct = default)
```

Get process definition
Returns process definition as JSON.

| Parameter              | Type                                          | Description |
| ---------------------- | --------------------------------------------- | ----------- |
| `processDefinitionKey` | `ProcessDefinitionKey`                        |             |
| `consistency`          | `ConsistencyOptions<ProcessDefinitionResult>` |             |
| `ct`                   | `CancellationToken`                           |             |

**Returns:** `Task<ProcessDefinitionResult>`

#### GetProcessDefinitionInstanceStatisticsAsync(ProcessDefinitionInstanceStatisticsQuery, ConsistencyOptions<ProcessDefinitionInstanceStatisticsQueryResult>?, CancellationToken)

```csharp
public Task<ProcessDefinitionInstanceStatisticsQueryResult> GetProcessDefinitionInstanceStatisticsAsync(ProcessDefinitionInstanceStatisticsQuery body, ConsistencyOptions<ProcessDefinitionInstanceStatisticsQueryResult>? consistency = null, CancellationToken ct = default)
```

Get process instance statistics
Get statistics about process instances, grouped by process definition and tenant.

| Parameter     | Type                                                                 | Description |
| ------------- | -------------------------------------------------------------------- | ----------- |
| `body`        | `ProcessDefinitionInstanceStatisticsQuery`                           |             |
| `consistency` | `ConsistencyOptions<ProcessDefinitionInstanceStatisticsQueryResult>` |             |
| `ct`          | `CancellationToken`                                                  |             |

**Returns:** `Task<ProcessDefinitionInstanceStatisticsQueryResult>`

#### GetProcessDefinitionInstanceVersionStatisticsAsync(ProcessDefinitionInstanceVersionStatisticsQuery, ConsistencyOptions<ProcessDefinitionInstanceVersionStatisticsQueryResult>?, CancellationToken)

```csharp
public Task<ProcessDefinitionInstanceVersionStatisticsQueryResult> GetProcessDefinitionInstanceVersionStatisticsAsync(ProcessDefinitionInstanceVersionStatisticsQuery body, ConsistencyOptions<ProcessDefinitionInstanceVersionStatisticsQueryResult>? consistency = null, CancellationToken ct = default)
```

Get process instance statistics by version
Get statistics about process instances, grouped by version for a given process definition.
The process definition ID must be provided as a required field in the request body filter.

| Parameter     | Type                                                                        | Description |
| ------------- | --------------------------------------------------------------------------- | ----------- |
| `body`        | `ProcessDefinitionInstanceVersionStatisticsQuery`                           |             |
| `consistency` | `ConsistencyOptions<ProcessDefinitionInstanceVersionStatisticsQueryResult>` |             |
| `ct`          | `CancellationToken`                                                         |             |

**Returns:** `Task<ProcessDefinitionInstanceVersionStatisticsQueryResult>`

#### GetProcessDefinitionMessageSubscriptionStatisticsAsync(ProcessDefinitionMessageSubscriptionStatisticsQuery, ConsistencyOptions<ProcessDefinitionMessageSubscriptionStatisticsQueryResult>?, CancellationToken)

```csharp
public Task<ProcessDefinitionMessageSubscriptionStatisticsQueryResult> GetProcessDefinitionMessageSubscriptionStatisticsAsync(ProcessDefinitionMessageSubscriptionStatisticsQuery body, ConsistencyOptions<ProcessDefinitionMessageSubscriptionStatisticsQueryResult>? consistency = null, CancellationToken ct = default)
```

Get message subscription statistics
Get message subscription statistics, grouped by process definition.

| Parameter     | Type                                                                            | Description |
| ------------- | ------------------------------------------------------------------------------- | ----------- |
| `body`        | `ProcessDefinitionMessageSubscriptionStatisticsQuery`                           |             |
| `consistency` | `ConsistencyOptions<ProcessDefinitionMessageSubscriptionStatisticsQueryResult>` |             |
| `ct`          | `CancellationToken`                                                             |             |

**Returns:** `Task<ProcessDefinitionMessageSubscriptionStatisticsQueryResult>`

#### GetProcessDefinitionStatisticsAsync(ProcessDefinitionKey, ProcessDefinitionElementStatisticsQuery, ConsistencyOptions<ProcessDefinitionElementStatisticsQueryResult>?, CancellationToken)

```csharp
public Task<ProcessDefinitionElementStatisticsQueryResult> GetProcessDefinitionStatisticsAsync(ProcessDefinitionKey processDefinitionKey, ProcessDefinitionElementStatisticsQuery body, ConsistencyOptions<ProcessDefinitionElementStatisticsQueryResult>? consistency = null, CancellationToken ct = default)
```

Get process definition statistics
Get statistics about elements in currently running process instances by process definition key and search filter.

| Parameter              | Type                                                                | Description |
| ---------------------- | ------------------------------------------------------------------- | ----------- |
| `processDefinitionKey` | `ProcessDefinitionKey`                                              |             |
| `body`                 | `ProcessDefinitionElementStatisticsQuery`                           |             |
| `consistency`          | `ConsistencyOptions<ProcessDefinitionElementStatisticsQueryResult>` |             |
| `ct`                   | `CancellationToken`                                                 |             |

**Returns:** `Task<ProcessDefinitionElementStatisticsQueryResult>`

#### GetProcessDefinitionXmlAsync(ProcessDefinitionKey, ConsistencyOptions<object>?, CancellationToken)

```csharp
public Task<object> GetProcessDefinitionXmlAsync(ProcessDefinitionKey processDefinitionKey, ConsistencyOptions<object>? consistency = null, CancellationToken ct = default)
```

Get process definition XML
Returns process definition as XML.

| Parameter              | Type                         | Description |
| ---------------------- | ---------------------------- | ----------- |
| `processDefinitionKey` | `ProcessDefinitionKey`       |             |
| `consistency`          | `ConsistencyOptions<Object>` |             |
| `ct`                   | `CancellationToken`          |             |

**Returns:** `Task<Object>`

#### GetStartProcessFormAsync(ProcessDefinitionKey, ConsistencyOptions<FormResult>?, CancellationToken)

```csharp
public Task<FormResult> GetStartProcessFormAsync(ProcessDefinitionKey processDefinitionKey, ConsistencyOptions<FormResult>? consistency = null, CancellationToken ct = default)
```

Get process start form
Get the start form of a process.
Note that this endpoint will only return linked forms. This endpoint does not support embedded forms.

| Parameter              | Type                             | Description |
| ---------------------- | -------------------------------- | ----------- |
| `processDefinitionKey` | `ProcessDefinitionKey`           |             |
| `consistency`          | `ConsistencyOptions<FormResult>` |             |
| `ct`                   | `CancellationToken`              |             |

**Returns:** `Task<FormResult>`

#### SearchProcessDefinitionsAsync(ProcessDefinitionSearchQuery, ConsistencyOptions<ProcessDefinitionSearchQueryResult>?, CancellationToken)

```csharp
public Task<ProcessDefinitionSearchQueryResult> SearchProcessDefinitionsAsync(ProcessDefinitionSearchQuery body, ConsistencyOptions<ProcessDefinitionSearchQueryResult>? consistency = null, CancellationToken ct = default)
```

Search process definitions
Search for process definitions based on given criteria.

| Parameter     | Type                                                     | Description |
| ------------- | -------------------------------------------------------- | ----------- |
| `body`        | `ProcessDefinitionSearchQuery`                           |             |
| `consistency` | `ConsistencyOptions<ProcessDefinitionSearchQueryResult>` |             |
| `ct`          | `CancellationToken`                                      |             |

**Returns:** `Task<ProcessDefinitionSearchQueryResult>`
