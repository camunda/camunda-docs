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

**Example**

```csharp
static async Task GetAuthenticationExample()
{
    using var client = Camunda.CreateClient();

    var user = await client.GetAuthenticationAsync();
    Console.WriteLine($"Authenticated as: {user.Username}");
}
```

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

**Example**

```csharp
static async Task GetTopologyExample()
{
    using var client = Camunda.CreateClient();

    var topology = await client.GetTopologyAsync();

    Console.WriteLine($"Cluster size: {topology.ClusterSize}");
    Console.WriteLine($"Partitions: {topology.PartitionsCount}");
    foreach (var broker in topology.Brokers)
    {
        Console.WriteLine($"  Broker {broker.NodeId}: {broker.Host}:{broker.Port}");
    }
}
```

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

### Other

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

#### CreateAdminUserAsync(UserRequest, ConsistencyOptions<object>?, CancellationToken)

```csharp
public Task<object> CreateAdminUserAsync(UserRequest body, ConsistencyOptions<object>? consistency = null, CancellationToken ct = default)
```

Create admin user
Creates a new user and assigns the admin role to it. This endpoint is only usable when users are managed in the Orchestration Cluster and while no user is assigned to the admin role.

| Parameter     | Type                         | Description |
| ------------- | ---------------------------- | ----------- |
| `body`        | `UserRequest`                |             |
| `consistency` | `ConsistencyOptions<Object>` |             |
| `ct`          | `CancellationToken`          |             |

**Returns:** `Task<Object>`

#### CreateUserAsync(UserRequest, ConsistencyOptions<UserCreateResult>?, CancellationToken)

```csharp
public Task<UserCreateResult> CreateUserAsync(UserRequest body, ConsistencyOptions<UserCreateResult>? consistency = null, CancellationToken ct = default)
```

Create user
Create a new user.

| Parameter     | Type                                   | Description |
| ------------- | -------------------------------------- | ----------- |
| `body`        | `UserRequest`                          |             |
| `consistency` | `ConsistencyOptions<UserCreateResult>` |             |
| `ct`          | `CancellationToken`                    |             |

**Returns:** `Task<UserCreateResult>`

#### DeleteUserAsync(Username, ConsistencyOptions<object>?, CancellationToken)

```csharp
public Task DeleteUserAsync(Username username, ConsistencyOptions<object>? consistency = null, CancellationToken ct = default)
```

Delete user
Deletes a user.

| Parameter     | Type                         | Description |
| ------------- | ---------------------------- | ----------- |
| `username`    | `Username`                   |             |
| `consistency` | `ConsistencyOptions<Object>` |             |
| `ct`          | `CancellationToken`          |             |

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

#### GetUserAsync(Username, ConsistencyOptions<UserResult>?, CancellationToken)

```csharp
public Task<UserResult> GetUserAsync(Username username, ConsistencyOptions<UserResult>? consistency = null, CancellationToken ct = default)
```

Get user
Get a user by its username.

| Parameter     | Type                             | Description |
| ------------- | -------------------------------- | ----------- |
| `username`    | `Username`                       |             |
| `consistency` | `ConsistencyOptions<UserResult>` |             |
| `ct`          | `CancellationToken`              |             |

**Returns:** `Task<UserResult>`

#### SearchUsersAsync(SearchUsersRequest, ConsistencyOptions<UserSearchResult>?, CancellationToken)

```csharp
public Task<UserSearchResult> SearchUsersAsync(SearchUsersRequest body, ConsistencyOptions<UserSearchResult>? consistency = null, CancellationToken ct = default)
```

Search users
Search for users based on given criteria.

| Parameter     | Type                                   | Description |
| ------------- | -------------------------------------- | ----------- |
| `body`        | `SearchUsersRequest`                   |             |
| `consistency` | `ConsistencyOptions<UserSearchResult>` |             |
| `ct`          | `CancellationToken`                    |             |

**Returns:** `Task<UserSearchResult>`

#### UpdateUserAsync(Username, UserUpdateRequest, ConsistencyOptions<UserResult>?, CancellationToken)

```csharp
public Task<UserResult> UpdateUserAsync(Username username, UserUpdateRequest body, ConsistencyOptions<UserResult>? consistency = null, CancellationToken ct = default)
```

Update user
Updates a user.

| Parameter     | Type                             | Description |
| ------------- | -------------------------------- | ----------- |
| `username`    | `Username`                       |             |
| `body`        | `UserUpdateRequest`              |             |
| `consistency` | `ConsistencyOptions<UserResult>` |             |
| `ct`          | `CancellationToken`              |             |

**Returns:** `Task<UserResult>`

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

**Example**

```csharp
static async Task DeployResourcesFromFilesExample()
{
    using var client = Camunda.CreateClient();

    var result = await client.DeployResourcesFromFilesAsync(
        new[] { "order-process.bpmn", "email-connector.bpmn" }
    );

    Console.WriteLine($"Deployment key: {result.DeploymentKey}");
    foreach (var process in result.Processes)
    {
        Console.WriteLine($"  Process: {process.ProcessDefinitionId} v{process.ProcessDefinitionVersion}");
    }
}
```

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

**Example**

```csharp
static async Task DeleteResourceExample()
{
    using var client = Camunda.CreateClient();

    // Deploy a resource and get its key from the deployment response
    var deployment = await client.DeployResourcesFromFilesAsync(
        new[] { "order-process.bpmn" }
    );
    // ProcessDefinitionKey doubles as the resource key for deletion
    var resourceKey = ResourceKey.AssumeExists(deployment.Processes[0].ProcessDefinitionKey.Value);

    await client.DeleteResourceAsync(resourceKey, new DeleteResourceRequest());
}
```

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

**Example**

```csharp
#pragma warning disable CS1998 // Async method lacks await (handler is simple for demo purposes)
static async Task JobWorkerExample()
{
    await using var client = Camunda.CreateClient();

    client.CreateJobWorker(
        new JobWorkerConfig
        {
            JobType = "send-email",
            JobTimeoutMs = 300_000, // 5 minutes
            MaxConcurrentJobs = 5,
            PollIntervalMs = 5_000
        },
        async (job, ct) =>
        {
            var recipient = job.GetVariables<Dictionary<string, string>>()?
                .GetValueOrDefault("recipient");
            Console.WriteLine($"Sending email to {recipient}");
        });

    // Run all registered workers until cancelled
    using var cts = new CancellationTokenSource();
    await client.RunWorkersAsync(ct: cts.Token);
}
```

#### ActivateJobsAsync(JobActivationRequest, CancellationToken)

```csharp
public Task<ActivateJobsResponse> ActivateJobsAsync(JobActivationRequest body, CancellationToken ct = default)
```

Activate jobs
Iterate through all known partitions and activate jobs up to the requested maximum.

| Parameter | Type                   | Description |
| --------- | ---------------------- | ----------- |
| `body`    | `JobActivationRequest` |             |
| `ct`      | `CancellationToken`    |             |

**Returns:** `Task<ActivateJobsResponse>`

**Example**

```csharp
static async Task ActivateJobsExample()
{
    using var client = Camunda.CreateClient();

    var response = await client.ActivateJobsAsync(new JobActivationRequest
    {
        Type = "send-email",
        MaxJobsToActivate = 10,
        Timeout = 300_000, // 5 minutes
        Worker = "email-worker-1"
    });

    foreach (var job in response.Jobs)
    {
        Console.WriteLine($"Job {job.JobKey}: {job.Type}");
    }
}
```

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

**Example**

```csharp
static async Task CompleteJobExample()
{
    using var client = Camunda.CreateClient();

    // Activate jobs and get a JobKey from the response
    var activated = await client.ActivateJobsAsync(new JobActivationRequest
    {
        Type = "send-email",
        MaxJobsToActivate = 1,
        Timeout = 300_000,
        Worker = "email-worker-1"
    });
    var jobKey = activated.Jobs[0].JobKey;

    await client.CompleteJobAsync(jobKey, new JobCompletionRequest
    {
        Variables = new Dictionary<string, object>
        {
            ["emailSent"] = true
        }
    });
}
```

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

**Example**

```csharp
static async Task FailJobExample()
{
    using var client = Camunda.CreateClient();

    // Activate a job and get its JobKey from the response
    var activated = await client.ActivateJobsAsync(new JobActivationRequest
    {
        Type = "send-email",
        MaxJobsToActivate = 1,
        Timeout = 300_000,
        Worker = "email-worker-1"
    });
    var jobKey = activated.Jobs[0].JobKey;

    await client.FailJobAsync(jobKey, new JobFailRequest
    {
        Retries = 2,
        ErrorMessage = "SMTP server unreachable",
        RetryBackOff = 30_000 // 30 seconds
    });
}
```

#### GetGlobalJobStatisticsAsync(DateTimeOffset, DateTimeOffset, string?, ConsistencyOptions<GlobalJobStatisticsQueryResult>?, CancellationToken)

```csharp
public Task<GlobalJobStatisticsQueryResult> GetGlobalJobStatisticsAsync(DateTimeOffset from, DateTimeOffset to, string? jobType = null, ConsistencyOptions<GlobalJobStatisticsQueryResult>? consistency = null, CancellationToken ct = default)
```

Global job statistics
Returns global aggregated counts for jobs. Optionally filter by the creation time window and/or jobType.

| Parameter     | Type                                                 | Description |
| ------------- | ---------------------------------------------------- | ----------- |
| `from`        | `DateTimeOffset`                                     |             |
| `to`          | `DateTimeOffset`                                     |             |
| `jobType`     | `String`                                             |             |
| `consistency` | `ConsistencyOptions<GlobalJobStatisticsQueryResult>` |             |
| `ct`          | `CancellationToken`                                  |             |

**Returns:** `Task<GlobalJobStatisticsQueryResult>`

#### SearchJobsAsync(JobSearchQuery, ConsistencyOptions<SearchJobsResponse>?, CancellationToken)

```csharp
public Task<SearchJobsResponse> SearchJobsAsync(JobSearchQuery body, ConsistencyOptions<SearchJobsResponse>? consistency = null, CancellationToken ct = default)
```

Search jobs
Search for jobs based on given criteria.

| Parameter     | Type                                     | Description |
| ------------- | ---------------------------------------- | ----------- |
| `body`        | `JobSearchQuery`                         |             |
| `consistency` | `ConsistencyOptions<SearchJobsResponse>` |             |
| `ct`          | `CancellationToken`                      |             |

**Returns:** `Task<SearchJobsResponse>`

**Example**

```csharp
static async Task SearchJobsExample()
{
    using var client = Camunda.CreateClient();

    var result = await client.SearchJobsAsync(new JobSearchQuery());

    foreach (var job in result.Items!)
    {
        Console.WriteLine($"Job {job.JobKey}: type={job.Type}, state={job.State}");
    }
}
```

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

**Example**

```csharp
static async Task ThrowJobErrorExample()
{
    using var client = Camunda.CreateClient();

    // Activate a job and get its JobKey from the response
    var activated = await client.ActivateJobsAsync(new JobActivationRequest
    {
        Type = "send-email",
        MaxJobsToActivate = 1,
        Timeout = 300_000,
        Worker = "email-worker-1"
    });
    var jobKey = activated.Jobs[0].JobKey;

    await client.ThrowJobErrorAsync(jobKey, new JobErrorRequest
    {
        ErrorCode = "INVALID_ADDRESS",
        ErrorMessage = "Recipient email address is invalid"
    });
}
```

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

#### GetElementInstanceAsync(ElementInstanceKey, ConsistencyOptions<GetElementInstanceResponse>?, CancellationToken)

```csharp
public Task<GetElementInstanceResponse> GetElementInstanceAsync(ElementInstanceKey elementInstanceKey, ConsistencyOptions<GetElementInstanceResponse>? consistency = null, CancellationToken ct = default)
```

Get element instance
Returns element instance as JSON.

| Parameter            | Type                                             | Description |
| -------------------- | ------------------------------------------------ | ----------- |
| `elementInstanceKey` | `ElementInstanceKey`                             |             |
| `consistency`        | `ConsistencyOptions<GetElementInstanceResponse>` |             |
| `ct`                 | `CancellationToken`                              |             |

**Returns:** `Task<GetElementInstanceResponse>`

#### SearchElementInstancesAsync(ElementInstanceSearchQuery, ConsistencyOptions<SearchElementInstancesResponse>?, CancellationToken)

```csharp
public Task<SearchElementInstancesResponse> SearchElementInstancesAsync(ElementInstanceSearchQuery body, ConsistencyOptions<SearchElementInstancesResponse>? consistency = null, CancellationToken ct = default)
```

Search element instances
Search for element instances based on given criteria.

| Parameter     | Type                                                 | Description |
| ------------- | ---------------------------------------------------- | ----------- |
| `body`        | `ElementInstanceSearchQuery`                         |             |
| `consistency` | `ConsistencyOptions<SearchElementInstancesResponse>` |             |
| `ct`          | `CancellationToken`                                  |             |

**Returns:** `Task<SearchElementInstancesResponse>`

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

#### SearchMappingRulesForGroupAsync(string, MappingRuleSearchQueryRequest, ConsistencyOptions<SearchQueryResponse>?, CancellationToken)

```csharp
public Task<SearchQueryResponse> SearchMappingRulesForGroupAsync(string groupId, MappingRuleSearchQueryRequest body, ConsistencyOptions<SearchQueryResponse>? consistency = null, CancellationToken ct = default)
```

Search group mapping rules
Search mapping rules assigned to a group.

| Parameter     | Type                                      | Description |
| ------------- | ----------------------------------------- | ----------- |
| `groupId`     | `String`                                  |             |
| `body`        | `MappingRuleSearchQueryRequest`           |             |
| `consistency` | `ConsistencyOptions<SearchQueryResponse>` |             |
| `ct`          | `CancellationToken`                       |             |

**Returns:** `Task<SearchQueryResponse>`

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

#### SearchClientsForGroupAsync(string, SearchClientsForGroupRequest, ConsistencyOptions<TenantClientSearchResult>?, CancellationToken)

```csharp
public Task<TenantClientSearchResult> SearchClientsForGroupAsync(string groupId, SearchClientsForGroupRequest body, ConsistencyOptions<TenantClientSearchResult>? consistency = null, CancellationToken ct = default)
```

Search group clients
Search clients assigned to a group.

| Parameter     | Type                                           | Description |
| ------------- | ---------------------------------------------- | ----------- |
| `groupId`     | `String`                                       |             |
| `body`        | `SearchClientsForGroupRequest`                 |             |
| `consistency` | `ConsistencyOptions<TenantClientSearchResult>` |             |
| `ct`          | `CancellationToken`                            |             |

**Returns:** `Task<TenantClientSearchResult>`

#### SearchClientsForRoleAsync(string, SearchClientsForRoleRequest, ConsistencyOptions<TenantClientSearchResult>?, CancellationToken)

```csharp
public Task<TenantClientSearchResult> SearchClientsForRoleAsync(string roleId, SearchClientsForRoleRequest body, ConsistencyOptions<TenantClientSearchResult>? consistency = null, CancellationToken ct = default)
```

Search role clients
Search clients with assigned role.

| Parameter     | Type                                           | Description |
| ------------- | ---------------------------------------------- | ----------- |
| `roleId`      | `String`                                       |             |
| `body`        | `SearchClientsForRoleRequest`                  |             |
| `consistency` | `ConsistencyOptions<TenantClientSearchResult>` |             |
| `ct`          | `CancellationToken`                            |             |

**Returns:** `Task<TenantClientSearchResult>`

#### SearchClientsForTenantAsync(TenantId, SearchClientsForTenantRequest, ConsistencyOptions<TenantClientSearchResult>?, CancellationToken)

```csharp
public Task<TenantClientSearchResult> SearchClientsForTenantAsync(TenantId tenantId, SearchClientsForTenantRequest body, ConsistencyOptions<TenantClientSearchResult>? consistency = null, CancellationToken ct = default)
```

Search clients for tenant
Retrieves a filtered and sorted list of clients for a specified tenant.

| Parameter     | Type                                           | Description |
| ------------- | ---------------------------------------------- | ----------- |
| `tenantId`    | `TenantId`                                     |             |
| `body`        | `SearchClientsForTenantRequest`                |             |
| `consistency` | `ConsistencyOptions<TenantClientSearchResult>` |             |
| `ct`          | `CancellationToken`                            |             |

**Returns:** `Task<TenantClientSearchResult>`

#### SearchGroupIdsForTenantAsync(TenantId, SearchGroupIdsForTenantRequest, ConsistencyOptions<TenantGroupSearchResult>?, CancellationToken)

```csharp
public Task<TenantGroupSearchResult> SearchGroupIdsForTenantAsync(TenantId tenantId, SearchGroupIdsForTenantRequest body, ConsistencyOptions<TenantGroupSearchResult>? consistency = null, CancellationToken ct = default)
```

Search groups for tenant
Retrieves a filtered and sorted list of groups for a specified tenant.

| Parameter     | Type                                          | Description |
| ------------- | --------------------------------------------- | ----------- |
| `tenantId`    | `TenantId`                                    |             |
| `body`        | `SearchGroupIdsForTenantRequest`              |             |
| `consistency` | `ConsistencyOptions<TenantGroupSearchResult>` |             |
| `ct`          | `CancellationToken`                           |             |

**Returns:** `Task<TenantGroupSearchResult>`

#### SearchMappingRulesForTenantAsync(TenantId, MappingRuleSearchQueryRequest, ConsistencyOptions<SearchQueryResponse>?, CancellationToken)

```csharp
public Task<SearchQueryResponse> SearchMappingRulesForTenantAsync(TenantId tenantId, MappingRuleSearchQueryRequest body, ConsistencyOptions<SearchQueryResponse>? consistency = null, CancellationToken ct = default)
```

Search mapping rules for tenant
Retrieves a filtered and sorted list of MappingRules for a specified tenant.

| Parameter     | Type                                      | Description |
| ------------- | ----------------------------------------- | ----------- |
| `tenantId`    | `TenantId`                                |             |
| `body`        | `MappingRuleSearchQueryRequest`           |             |
| `consistency` | `ConsistencyOptions<SearchQueryResponse>` |             |
| `ct`          | `CancellationToken`                       |             |

**Returns:** `Task<SearchQueryResponse>`

#### SearchRolesForTenantAsync(TenantId, RoleSearchQueryRequest, ConsistencyOptions<SearchQueryResponse>?, CancellationToken)

```csharp
public Task<SearchQueryResponse> SearchRolesForTenantAsync(TenantId tenantId, RoleSearchQueryRequest body, ConsistencyOptions<SearchQueryResponse>? consistency = null, CancellationToken ct = default)
```

Search roles for tenant
Retrieves a filtered and sorted list of roles for a specified tenant.

| Parameter     | Type                                      | Description |
| ------------- | ----------------------------------------- | ----------- |
| `tenantId`    | `TenantId`                                |             |
| `body`        | `RoleSearchQueryRequest`                  |             |
| `consistency` | `ConsistencyOptions<SearchQueryResponse>` |             |
| `ct`          | `CancellationToken`                       |             |

**Returns:** `Task<SearchQueryResponse>`

#### SearchTenantsAsync(SearchTenantsRequest, ConsistencyOptions<TenantSearchQueryResult>?, CancellationToken)

```csharp
public Task<TenantSearchQueryResult> SearchTenantsAsync(SearchTenantsRequest body, ConsistencyOptions<TenantSearchQueryResult>? consistency = null, CancellationToken ct = default)
```

Search tenants
Retrieves a filtered and sorted list of tenants.

| Parameter     | Type                                          | Description |
| ------------- | --------------------------------------------- | ----------- |
| `body`        | `SearchTenantsRequest`                        |             |
| `consistency` | `ConsistencyOptions<TenantSearchQueryResult>` |             |
| `ct`          | `CancellationToken`                           |             |

**Returns:** `Task<TenantSearchQueryResult>`

#### SearchUsersForGroupAsync(string, SearchUsersForGroupRequest, ConsistencyOptions<TenantUserSearchResult>?, CancellationToken)

```csharp
public Task<TenantUserSearchResult> SearchUsersForGroupAsync(string groupId, SearchUsersForGroupRequest body, ConsistencyOptions<TenantUserSearchResult>? consistency = null, CancellationToken ct = default)
```

Search group users
Search users assigned to a group.

| Parameter     | Type                                         | Description |
| ------------- | -------------------------------------------- | ----------- |
| `groupId`     | `String`                                     |             |
| `body`        | `SearchUsersForGroupRequest`                 |             |
| `consistency` | `ConsistencyOptions<TenantUserSearchResult>` |             |
| `ct`          | `CancellationToken`                          |             |

**Returns:** `Task<TenantUserSearchResult>`

#### SearchUsersForRoleAsync(string, SearchUsersForRoleRequest, ConsistencyOptions<TenantUserSearchResult>?, CancellationToken)

```csharp
public Task<TenantUserSearchResult> SearchUsersForRoleAsync(string roleId, SearchUsersForRoleRequest body, ConsistencyOptions<TenantUserSearchResult>? consistency = null, CancellationToken ct = default)
```

Search role users
Search users with assigned role.

| Parameter     | Type                                         | Description |
| ------------- | -------------------------------------------- | ----------- |
| `roleId`      | `String`                                     |             |
| `body`        | `SearchUsersForRoleRequest`                  |             |
| `consistency` | `ConsistencyOptions<TenantUserSearchResult>` |             |
| `ct`          | `CancellationToken`                          |             |

**Returns:** `Task<TenantUserSearchResult>`

#### SearchUsersForTenantAsync(TenantId, SearchUsersForTenantRequest, ConsistencyOptions<TenantUserSearchResult>?, CancellationToken)

```csharp
public Task<TenantUserSearchResult> SearchUsersForTenantAsync(TenantId tenantId, SearchUsersForTenantRequest body, ConsistencyOptions<TenantUserSearchResult>? consistency = null, CancellationToken ct = default)
```

Search users for tenant
Retrieves a filtered and sorted list of users for a specified tenant.

| Parameter     | Type                                         | Description |
| ------------- | -------------------------------------------- | ----------- |
| `tenantId`    | `TenantId`                                   |             |
| `body`        | `SearchUsersForTenantRequest`                |             |
| `consistency` | `ConsistencyOptions<TenantUserSearchResult>` |             |
| `ct`          | `CancellationToken`                          |             |

**Returns:** `Task<TenantUserSearchResult>`

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

#### SearchGroupsForRoleAsync(string, SearchGroupsForRoleRequest, ConsistencyOptions<RoleGroupSearchResult>?, CancellationToken)

```csharp
public Task<RoleGroupSearchResult> SearchGroupsForRoleAsync(string roleId, SearchGroupsForRoleRequest body, ConsistencyOptions<RoleGroupSearchResult>? consistency = null, CancellationToken ct = default)
```

Search role groups
Search groups with assigned role.

| Parameter     | Type                                        | Description |
| ------------- | ------------------------------------------- | ----------- |
| `roleId`      | `String`                                    |             |
| `body`        | `SearchGroupsForRoleRequest`                |             |
| `consistency` | `ConsistencyOptions<RoleGroupSearchResult>` |             |
| `ct`          | `CancellationToken`                         |             |

**Returns:** `Task<RoleGroupSearchResult>`

#### SearchMappingRulesForRoleAsync(string, MappingRuleSearchQueryRequest, ConsistencyOptions<SearchQueryResponse>?, CancellationToken)

```csharp
public Task<SearchQueryResponse> SearchMappingRulesForRoleAsync(string roleId, MappingRuleSearchQueryRequest body, ConsistencyOptions<SearchQueryResponse>? consistency = null, CancellationToken ct = default)
```

Search role mapping rules
Search mapping rules with assigned role.

| Parameter     | Type                                      | Description |
| ------------- | ----------------------------------------- | ----------- |
| `roleId`      | `String`                                  |             |
| `body`        | `MappingRuleSearchQueryRequest`           |             |
| `consistency` | `ConsistencyOptions<SearchQueryResponse>` |             |
| `ct`          | `CancellationToken`                       |             |

**Returns:** `Task<SearchQueryResponse>`

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

#### SearchRolesForGroupAsync(string, RoleSearchQueryRequest, ConsistencyOptions<SearchQueryResponse>?, CancellationToken)

```csharp
public Task<SearchQueryResponse> SearchRolesForGroupAsync(string groupId, RoleSearchQueryRequest body, ConsistencyOptions<SearchQueryResponse>? consistency = null, CancellationToken ct = default)
```

Search group roles
Search roles assigned to a group.

| Parameter     | Type                                      | Description |
| ------------- | ----------------------------------------- | ----------- |
| `groupId`     | `String`                                  |             |
| `body`        | `RoleSearchQueryRequest`                  |             |
| `consistency` | `ConsistencyOptions<SearchQueryResponse>` |             |
| `ct`          | `CancellationToken`                       |             |

**Returns:** `Task<SearchQueryResponse>`

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
Assigns a user task with the given key to the given assignee.

| Parameter     | Type                        | Description |
| ------------- | --------------------------- | ----------- |
| `userTaskKey` | `UserTaskKey`               |             |
| `body`        | `UserTaskAssignmentRequest` |             |
| `ct`          | `CancellationToken`         |             |

**Returns:** `Task`

**Example**

```csharp
static async Task AssignUserTaskExample()
{
    using var client = Camunda.CreateClient();

    // Find a user task via search
    var tasks = await client.SearchUserTasksAsync(new SearchUserTasksRequest());
    var userTaskKey = tasks.Items![0].UserTaskKey.Value;

    await client.AssignUserTaskAsync(userTaskKey, new UserTaskAssignmentRequest
    {
        Assignee = "jane.doe"
    });
}
```

#### CompleteUserTaskAsync(UserTaskKey, UserTaskCompletionRequest, CancellationToken)

```csharp
public Task CompleteUserTaskAsync(UserTaskKey userTaskKey, UserTaskCompletionRequest body, CancellationToken ct = default)
```

Complete user task
Completes a user task with the given key.

| Parameter     | Type                        | Description |
| ------------- | --------------------------- | ----------- |
| `userTaskKey` | `UserTaskKey`               |             |
| `body`        | `UserTaskCompletionRequest` |             |
| `ct`          | `CancellationToken`         |             |

**Returns:** `Task`

**Example**

```csharp
static async Task CompleteUserTaskExample()
{
    using var client = Camunda.CreateClient();

    // Find a user task via search
    var tasks = await client.SearchUserTasksAsync(new SearchUserTasksRequest());
    var userTaskKey = tasks.Items![0].UserTaskKey.Value;

    await client.CompleteUserTaskAsync(userTaskKey, new UserTaskCompletionRequest
    {
        Variables = new Dictionary<string, object>
        {
            ["approved"] = true,
            ["comment"] = "Looks good"
        }
    });
}
```

#### GetUserTaskAsync(UserTaskKey, ConsistencyOptions<GetUserTaskResponse>?, CancellationToken)

```csharp
public Task<GetUserTaskResponse> GetUserTaskAsync(UserTaskKey userTaskKey, ConsistencyOptions<GetUserTaskResponse>? consistency = null, CancellationToken ct = default)
```

Get user task
Get the user task by the user task key.

| Parameter     | Type                                      | Description |
| ------------- | ----------------------------------------- | ----------- |
| `userTaskKey` | `UserTaskKey`                             |             |
| `consistency` | `ConsistencyOptions<GetUserTaskResponse>` |             |
| `ct`          | `CancellationToken`                       |             |

**Returns:** `Task<GetUserTaskResponse>`

#### GetUserTaskFormAsync(UserTaskKey, ConsistencyOptions<GetUserTaskFormResponse>?, CancellationToken)

```csharp
public Task<GetUserTaskFormResponse> GetUserTaskFormAsync(UserTaskKey userTaskKey, ConsistencyOptions<GetUserTaskFormResponse>? consistency = null, CancellationToken ct = default)
```

Get user task form
Get the form of a user task.
Note that this endpoint will only return linked forms. This endpoint does not support embedded forms.

| Parameter     | Type                                          | Description |
| ------------- | --------------------------------------------- | ----------- |
| `userTaskKey` | `UserTaskKey`                                 |             |
| `consistency` | `ConsistencyOptions<GetUserTaskFormResponse>` |             |
| `ct`          | `CancellationToken`                           |             |

**Returns:** `Task<GetUserTaskFormResponse>`

#### SearchUserTaskAuditLogsAsync(UserTaskKey, SearchUserTaskAuditLogsRequest, ConsistencyOptions<SearchUserTaskAuditLogsResponse>?, CancellationToken)

```csharp
public Task<SearchUserTaskAuditLogsResponse> SearchUserTaskAuditLogsAsync(UserTaskKey userTaskKey, SearchUserTaskAuditLogsRequest body, ConsistencyOptions<SearchUserTaskAuditLogsResponse>? consistency = null, CancellationToken ct = default)
```

Search user task audit logs
Search for user task audit logs based on given criteria.

| Parameter     | Type                                                  | Description |
| ------------- | ----------------------------------------------------- | ----------- |
| `userTaskKey` | `UserTaskKey`                                         |             |
| `body`        | `SearchUserTaskAuditLogsRequest`                      |             |
| `consistency` | `ConsistencyOptions<SearchUserTaskAuditLogsResponse>` |             |
| `ct`          | `CancellationToken`                                   |             |

**Returns:** `Task<SearchUserTaskAuditLogsResponse>`

#### SearchUserTaskVariablesAsync(UserTaskKey, SearchUserTaskVariablesRequest, bool?, ConsistencyOptions<SearchUserTaskVariablesResponse>?, CancellationToken)

```csharp
public Task<SearchUserTaskVariablesResponse> SearchUserTaskVariablesAsync(UserTaskKey userTaskKey, SearchUserTaskVariablesRequest body, bool? truncateValues = null, ConsistencyOptions<SearchUserTaskVariablesResponse>? consistency = null, CancellationToken ct = default)
```

Search user task variables
Search for user task variables based on given criteria. By default, long variable values in the response are truncated.

| Parameter        | Type                                                  | Description |
| ---------------- | ----------------------------------------------------- | ----------- |
| `userTaskKey`    | `UserTaskKey`                                         |             |
| `body`           | `SearchUserTaskVariablesRequest`                      |             |
| `truncateValues` | `Nullable<Boolean>`                                   |             |
| `consistency`    | `ConsistencyOptions<SearchUserTaskVariablesResponse>` |             |
| `ct`             | `CancellationToken`                                   |             |

**Returns:** `Task<SearchUserTaskVariablesResponse>`

#### SearchUserTasksAsync(SearchUserTasksRequest, ConsistencyOptions<SearchUserTasksResponse>?, CancellationToken)

```csharp
public Task<SearchUserTasksResponse> SearchUserTasksAsync(SearchUserTasksRequest body, ConsistencyOptions<SearchUserTasksResponse>? consistency = null, CancellationToken ct = default)
```

Search user tasks
Search for user tasks based on given criteria.

| Parameter     | Type                                          | Description |
| ------------- | --------------------------------------------- | ----------- |
| `body`        | `SearchUserTasksRequest`                      |             |
| `consistency` | `ConsistencyOptions<SearchUserTasksResponse>` |             |
| `ct`          | `CancellationToken`                           |             |

**Returns:** `Task<SearchUserTasksResponse>`

**Example**

```csharp
static async Task SearchUserTasksExample()
{
    using var client = Camunda.CreateClient();

    var result = await client.SearchUserTasksAsync(new SearchUserTasksRequest());

    foreach (var task in result.Items!)
    {
        Console.WriteLine($"Task {task.UserTaskKey}: {task.State}, assignee={task.Assignee}");
    }
}
```

#### UnassignUserTaskAsync(UserTaskKey, CancellationToken)

```csharp
public Task UnassignUserTaskAsync(UserTaskKey userTaskKey, CancellationToken ct = default)
```

Unassign user task
Removes the assignee of a task with the given key.

| Parameter     | Type                | Description |
| ------------- | ------------------- | ----------- |
| `userTaskKey` | `UserTaskKey`       |             |
| `ct`          | `CancellationToken` |             |

**Returns:** `Task`

**Example**

```csharp
static async Task UnassignUserTaskExample()
{
    using var client = Camunda.CreateClient();

    // Find a user task via search
    var tasks = await client.SearchUserTasksAsync(new SearchUserTasksRequest());
    var userTaskKey = tasks.Items![0].UserTaskKey.Value;

    await client.UnassignUserTaskAsync(userTaskKey);
}
```

#### UpdateUserTaskAsync(UserTaskKey, UserTaskUpdateRequest, CancellationToken)

```csharp
public Task UpdateUserTaskAsync(UserTaskKey userTaskKey, UserTaskUpdateRequest body, CancellationToken ct = default)
```

Update user task
Update a user task with the given key.

| Parameter     | Type                    | Description |
| ------------- | ----------------------- | ----------- |
| `userTaskKey` | `UserTaskKey`           |             |
| `body`        | `UserTaskUpdateRequest` |             |
| `ct`          | `CancellationToken`     |             |

**Returns:** `Task`

**Example**

```csharp
static async Task UpdateUserTaskExample()
{
    using var client = Camunda.CreateClient();

    // Find a user task via search
    var tasks = await client.SearchUserTasksAsync(new SearchUserTasksRequest());
    var userTaskKey = tasks.Items![0].UserTaskKey.Value;

    await client.UpdateUserTaskAsync(userTaskKey, new UserTaskUpdateRequest
    {
        Changeset = new Changeset
        {
            DueDate = DateTimeOffset.UtcNow.AddDays(3),
            Priority = 80
        }
    });
}
```

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

**Example**

```csharp
static async Task BroadcastSignalExample()
{
    using var client = Camunda.CreateClient();

    var result = await client.BroadcastSignalAsync(new SignalBroadcastRequest
    {
        SignalName = "system-shutdown",
        Variables = new Dictionary<string, object>
        {
            ["reason"] = "maintenance"
        }
    });

    Console.WriteLine($"Signal key: {result.SignalKey}");
}
```

### Batch Operations

#### CancelBatchOperationAsync(BatchOperationKey, ConsistencyOptions<object>?, CancellationToken)

```csharp
public Task CancelBatchOperationAsync(BatchOperationKey batchOperationKey, ConsistencyOptions<object>? consistency = null, CancellationToken ct = default)
```

Cancel Batch operation
Cancels a running batch operation.
This is done asynchronously, the progress can be tracked using the batch operation status endpoint (/batch-operations/{batchOperationKey}).

| Parameter           | Type                         | Description |
| ------------------- | ---------------------------- | ----------- |
| `batchOperationKey` | `BatchOperationKey`          |             |
| `consistency`       | `ConsistencyOptions<Object>` |             |
| `ct`                | `CancellationToken`          |             |

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

#### ResumeBatchOperationAsync(BatchOperationKey, ConsistencyOptions<object>?, CancellationToken)

```csharp
public Task ResumeBatchOperationAsync(BatchOperationKey batchOperationKey, ConsistencyOptions<object>? consistency = null, CancellationToken ct = default)
```

Resume Batch operation
Resumes a suspended batch operation.
This is done asynchronously, the progress can be tracked using the batch operation status endpoint (/batch-operations/{batchOperationKey}).

| Parameter           | Type                         | Description |
| ------------------- | ---------------------------- | ----------- |
| `batchOperationKey` | `BatchOperationKey`          |             |
| `consistency`       | `ConsistencyOptions<Object>` |             |
| `ct`                | `CancellationToken`          |             |

**Returns:** `Task`

#### SearchBatchOperationItemsAsync(SearchBatchOperationItemsRequest, ConsistencyOptions<SearchBatchOperationItemsResponse>?, CancellationToken)

```csharp
public Task<SearchBatchOperationItemsResponse> SearchBatchOperationItemsAsync(SearchBatchOperationItemsRequest body, ConsistencyOptions<SearchBatchOperationItemsResponse>? consistency = null, CancellationToken ct = default)
```

Search batch operation items
Search for batch operation items based on given criteria.

| Parameter     | Type                                                    | Description |
| ------------- | ------------------------------------------------------- | ----------- |
| `body`        | `SearchBatchOperationItemsRequest`                      |             |
| `consistency` | `ConsistencyOptions<SearchBatchOperationItemsResponse>` |             |
| `ct`          | `CancellationToken`                                     |             |

**Returns:** `Task<SearchBatchOperationItemsResponse>`

#### SearchBatchOperationsAsync(SearchBatchOperationsRequest, ConsistencyOptions<BatchOperationSearchQueryResult>?, CancellationToken)

```csharp
public Task<BatchOperationSearchQueryResult> SearchBatchOperationsAsync(SearchBatchOperationsRequest body, ConsistencyOptions<BatchOperationSearchQueryResult>? consistency = null, CancellationToken ct = default)
```

Search batch operations
Search for batch operations based on given criteria.

| Parameter     | Type                                                  | Description |
| ------------- | ----------------------------------------------------- | ----------- |
| `body`        | `SearchBatchOperationsRequest`                        |             |
| `consistency` | `ConsistencyOptions<BatchOperationSearchQueryResult>` |             |
| `ct`          | `CancellationToken`                                   |             |

**Returns:** `Task<BatchOperationSearchQueryResult>`

#### SuspendBatchOperationAsync(BatchOperationKey, ConsistencyOptions<object>?, CancellationToken)

```csharp
public Task SuspendBatchOperationAsync(BatchOperationKey batchOperationKey, ConsistencyOptions<object>? consistency = null, CancellationToken ct = default)
```

Suspend Batch operation
Suspends a running batch operation.
This is done asynchronously, the progress can be tracked using the batch operation status endpoint (/batch-operations/{batchOperationKey}).

| Parameter           | Type                         | Description |
| ------------------- | ---------------------------- | ----------- |
| `batchOperationKey` | `BatchOperationKey`          |             |
| `consistency`       | `ConsistencyOptions<Object>` |             |
| `ct`                | `CancellationToken`          |             |

**Returns:** `Task`

### Process Instances

#### CancelProcessInstanceAsync(ProcessInstanceKey, CancelProcessInstanceRequest, CancellationToken)

```csharp
public Task CancelProcessInstanceAsync(ProcessInstanceKey processInstanceKey, CancelProcessInstanceRequest body, CancellationToken ct = default)
```

Cancel process instance
Cancels a running process instance. As a cancellation includes more than just the removal of the process instance resource, the cancellation resource must be posted.

| Parameter            | Type                           | Description |
| -------------------- | ------------------------------ | ----------- |
| `processInstanceKey` | `ProcessInstanceKey`           |             |
| `body`               | `CancelProcessInstanceRequest` |             |
| `ct`                 | `CancellationToken`            |             |

**Returns:** `Task`

**Example**

```csharp
static async Task CancelProcessInstanceExample()
{
    using var client = Camunda.CreateClient();

    // Create a process instance and get its key from the response
    var created = await client.CreateProcessInstanceAsync(new ProcessInstanceCreationInstructionById
    {
        ProcessDefinitionId = ProcessDefinitionId.AssumeExists("order-process"),
    });

    // Cancel the process instance using the key from the creation response
    await client.CancelProcessInstanceAsync(created.ProcessInstanceKey, new CancelProcessInstanceRequest());
}
```

#### CancelProcessInstancesBatchOperationAsync(CancelProcessInstancesBatchOperationRequest, ConsistencyOptions<BatchOperationCreatedResult>?, CancellationToken)

```csharp
public Task<BatchOperationCreatedResult> CancelProcessInstancesBatchOperationAsync(CancelProcessInstancesBatchOperationRequest body, ConsistencyOptions<BatchOperationCreatedResult>? consistency = null, CancellationToken ct = default)
```

Cancel process instances (batch)
Cancels multiple running process instances.
Since only ACTIVE root instances can be cancelled, any given filters for state and
parentProcessInstanceKey are ignored and overridden during this batch operation.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

| Parameter     | Type                                              | Description |
| ------------- | ------------------------------------------------- | ----------- |
| `body`        | `CancelProcessInstancesBatchOperationRequest`     |             |
| `consistency` | `ConsistencyOptions<BatchOperationCreatedResult>` |             |
| `ct`          | `CancellationToken`                               |             |

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

**Example**

```csharp
static async Task CreateProcessInstanceExample()
{
    using var client = Camunda.CreateClient();

    // Deploy a process and retrieve its ProcessDefinitionId
    var deployment = await client.DeployResourcesFromFilesAsync(
        new[] { "order-process.bpmn" }
    );
    var processDefinitionId = deployment.Processes[0].ProcessDefinitionId;

    // Start a new instance using the deployed process definition
    var result = await client.CreateProcessInstanceAsync(new ProcessInstanceCreationInstructionById
    {
        ProcessDefinitionId = processDefinitionId,
    });

    Console.WriteLine($"Started process instance: {result.ProcessInstanceKey}");
}
```

#### DeleteDecisionInstanceAsync(DecisionInstanceKey, DeleteProcessInstanceRequest, ConsistencyOptions<object>?, CancellationToken)

```csharp
public Task DeleteDecisionInstanceAsync(DecisionInstanceKey decisionInstanceKey, DeleteProcessInstanceRequest body, ConsistencyOptions<object>? consistency = null, CancellationToken ct = default)
```

Delete decision instance
Delete all associated decision evaluations based on provided key.

| Parameter             | Type                           | Description |
| --------------------- | ------------------------------ | ----------- |
| `decisionInstanceKey` | `DecisionInstanceKey`          |             |
| `body`                | `DeleteProcessInstanceRequest` |             |
| `consistency`         | `ConsistencyOptions<Object>`   |             |
| `ct`                  | `CancellationToken`            |             |

**Returns:** `Task`

#### DeleteProcessInstanceAsync(ProcessInstanceKey, DeleteProcessInstanceRequest, ConsistencyOptions<object>?, CancellationToken)

```csharp
public Task DeleteProcessInstanceAsync(ProcessInstanceKey processInstanceKey, DeleteProcessInstanceRequest body, ConsistencyOptions<object>? consistency = null, CancellationToken ct = default)
```

Delete process instance
Deletes a process instance. Only instances that are completed or terminated can be deleted.

| Parameter            | Type                           | Description |
| -------------------- | ------------------------------ | ----------- |
| `processInstanceKey` | `ProcessInstanceKey`           |             |
| `body`               | `DeleteProcessInstanceRequest` |             |
| `consistency`        | `ConsistencyOptions<Object>`   |             |
| `ct`                 | `CancellationToken`            |             |

**Returns:** `Task`

#### DeleteProcessInstancesBatchOperationAsync(DeleteProcessInstancesBatchOperationRequest, ConsistencyOptions<BatchOperationCreatedResult>?, CancellationToken)

```csharp
public Task<BatchOperationCreatedResult> DeleteProcessInstancesBatchOperationAsync(DeleteProcessInstancesBatchOperationRequest body, ConsistencyOptions<BatchOperationCreatedResult>? consistency = null, CancellationToken ct = default)
```

Delete process instances (batch)
Delete multiple process instances. This will delete the historic data from secondary storage.
Only process instances in a final state (COMPLETED or TERMINATED) can be deleted.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

| Parameter     | Type                                              | Description |
| ------------- | ------------------------------------------------- | ----------- |
| `body`        | `DeleteProcessInstancesBatchOperationRequest`     |             |
| `consistency` | `ConsistencyOptions<BatchOperationCreatedResult>` |             |
| `ct`          | `CancellationToken`                               |             |

**Returns:** `Task<BatchOperationCreatedResult>`

#### GetProcessInstanceAsync(ProcessInstanceKey, ConsistencyOptions<GetProcessInstanceResponse>?, CancellationToken)

```csharp
public Task<GetProcessInstanceResponse> GetProcessInstanceAsync(ProcessInstanceKey processInstanceKey, ConsistencyOptions<GetProcessInstanceResponse>? consistency = null, CancellationToken ct = default)
```

Get process instance
Get the process instance by the process instance key.

| Parameter            | Type                                             | Description |
| -------------------- | ------------------------------------------------ | ----------- |
| `processInstanceKey` | `ProcessInstanceKey`                             |             |
| `consistency`        | `ConsistencyOptions<GetProcessInstanceResponse>` |             |
| `ct`                 | `CancellationToken`                              |             |

**Returns:** `Task<GetProcessInstanceResponse>`

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

#### GetProcessInstanceSequenceFlowsAsync(ProcessInstanceKey, ConsistencyOptions<GetProcessInstanceSequenceFlowsResponse>?, CancellationToken)

```csharp
public Task<GetProcessInstanceSequenceFlowsResponse> GetProcessInstanceSequenceFlowsAsync(ProcessInstanceKey processInstanceKey, ConsistencyOptions<GetProcessInstanceSequenceFlowsResponse>? consistency = null, CancellationToken ct = default)
```

Get sequence flows
Get sequence flows taken by the process instance.

| Parameter            | Type                                                          | Description |
| -------------------- | ------------------------------------------------------------- | ----------- |
| `processInstanceKey` | `ProcessInstanceKey`                                          |             |
| `consistency`        | `ConsistencyOptions<GetProcessInstanceSequenceFlowsResponse>` |             |
| `ct`                 | `CancellationToken`                                           |             |

**Returns:** `Task<GetProcessInstanceSequenceFlowsResponse>`

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

#### MigrateProcessInstanceAsync(ProcessInstanceKey, MigrateProcessInstanceRequest, CancellationToken)

```csharp
public Task MigrateProcessInstanceAsync(ProcessInstanceKey processInstanceKey, MigrateProcessInstanceRequest body, CancellationToken ct = default)
```

Migrate process instance
Migrates a process instance to a new process definition.
This request can contain multiple mapping instructions to define mapping between the active
process instance's elements and target process definition elements.

Use this to upgrade a process instance to a new version of a process or to
a different process definition, e.g. to keep your running instances up-to-date with the
latest process improvements.

| Parameter            | Type                            | Description |
| -------------------- | ------------------------------- | ----------- |
| `processInstanceKey` | `ProcessInstanceKey`            |             |
| `body`               | `MigrateProcessInstanceRequest` |             |
| `ct`                 | `CancellationToken`             |             |

**Returns:** `Task`

**Example**

```csharp
static async Task MigrateProcessInstanceExample()
{
    using var client = Camunda.CreateClient();

    // Create an instance to migrate
    var created = await client.CreateProcessInstanceAsync(new ProcessInstanceCreationInstructionById
    {
        ProcessDefinitionId = ProcessDefinitionId.AssumeExists("order-process"),
    });

    // Deploy the updated process version and get its ProcessDefinitionKey
    var v2 = await client.DeployResourcesFromFilesAsync(
        new[] { "order-process-v2.bpmn" }
    );
    var targetProcessDefinitionKey = v2.Processes[0].ProcessDefinitionKey;

    await client.MigrateProcessInstanceAsync(created.ProcessInstanceKey, new MigrateProcessInstanceRequest
    {
        TargetProcessDefinitionKey = targetProcessDefinitionKey,
        MappingInstructions = new List<MigrateProcessInstanceMappingInstruction>
        {
            new()
            {
                SourceElementId = ElementId.AssumeExists("taskA"),
                TargetElementId = ElementId.AssumeExists("taskB"),
            }
        }
    });
}
```

#### MigrateProcessInstancesBatchOperationAsync(MigrateProcessInstancesBatchOperationRequest, ConsistencyOptions<BatchOperationCreatedResult>?, CancellationToken)

```csharp
public Task<BatchOperationCreatedResult> MigrateProcessInstancesBatchOperationAsync(MigrateProcessInstancesBatchOperationRequest body, ConsistencyOptions<BatchOperationCreatedResult>? consistency = null, CancellationToken ct = default)
```

Migrate process instances (batch)
Migrate multiple process instances.
Since only process instances with ACTIVE state can be migrated, any given
filters for state are ignored and overridden during this batch operation.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

| Parameter     | Type                                              | Description |
| ------------- | ------------------------------------------------- | ----------- |
| `body`        | `MigrateProcessInstancesBatchOperationRequest`    |             |
| `consistency` | `ConsistencyOptions<BatchOperationCreatedResult>` |             |
| `ct`          | `CancellationToken`                               |             |

**Returns:** `Task<BatchOperationCreatedResult>`

#### ModifyProcessInstanceAsync(ProcessInstanceKey, ModifyProcessInstanceRequest, CancellationToken)

```csharp
public Task ModifyProcessInstanceAsync(ProcessInstanceKey processInstanceKey, ModifyProcessInstanceRequest body, CancellationToken ct = default)
```

Modify process instance
Modifies a running process instance.
This request can contain multiple instructions to activate an element of the process or
to terminate an active instance of an element.

Use this to repair a process instance that is stuck on an element or took an unintended path.
For example, because an external system is not available or doesn't respond as expected.

| Parameter            | Type                           | Description |
| -------------------- | ------------------------------ | ----------- |
| `processInstanceKey` | `ProcessInstanceKey`           |             |
| `body`               | `ModifyProcessInstanceRequest` |             |
| `ct`                 | `CancellationToken`            |             |

**Returns:** `Task`

**Example**

```csharp
static async Task ModifyProcessInstanceExample()
{
    using var client = Camunda.CreateClient();

    // Get a ProcessInstanceKey from the creation response
    var created = await client.CreateProcessInstanceAsync(new ProcessInstanceCreationInstructionById
    {
        ProcessDefinitionId = ProcessDefinitionId.AssumeExists("order-process"),
    });

    await client.ModifyProcessInstanceAsync(created.ProcessInstanceKey, new ModifyProcessInstanceRequest
    {
        ActivateInstructions = new List<ProcessInstanceModificationActivateInstruction>
        {
            new() { ElementId = ElementId.AssumeExists("taskB") }
        }
    });
}
```

#### ModifyProcessInstancesBatchOperationAsync(ModifyProcessInstancesBatchOperationRequest, ConsistencyOptions<BatchOperationCreatedResult>?, CancellationToken)

```csharp
public Task<BatchOperationCreatedResult> ModifyProcessInstancesBatchOperationAsync(ModifyProcessInstancesBatchOperationRequest body, ConsistencyOptions<BatchOperationCreatedResult>? consistency = null, CancellationToken ct = default)
```

Modify process instances (batch)
Modify multiple process instances.
Since only process instances with ACTIVE state can be modified, any given
filters for state are ignored and overridden during this batch operation.
In contrast to single modification operation, it is not possible to add variable instructions or modify by element key.
It is only possible to use the element id of the source and target.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

| Parameter     | Type                                              | Description |
| ------------- | ------------------------------------------------- | ----------- |
| `body`        | `ModifyProcessInstancesBatchOperationRequest`     |             |
| `consistency` | `ConsistencyOptions<BatchOperationCreatedResult>` |             |
| `ct`          | `CancellationToken`                               |             |

**Returns:** `Task<BatchOperationCreatedResult>`

#### ResolveProcessInstanceIncidentsAsync(ProcessInstanceKey, ConsistencyOptions<BatchOperationCreatedResult>?, CancellationToken)

```csharp
public Task<BatchOperationCreatedResult> ResolveProcessInstanceIncidentsAsync(ProcessInstanceKey processInstanceKey, ConsistencyOptions<BatchOperationCreatedResult>? consistency = null, CancellationToken ct = default)
```

Resolve related incidents
Creates a batch operation to resolve multiple incidents of a process instance.

| Parameter            | Type                                              | Description |
| -------------------- | ------------------------------------------------- | ----------- |
| `processInstanceKey` | `ProcessInstanceKey`                              |             |
| `consistency`        | `ConsistencyOptions<BatchOperationCreatedResult>` |             |
| `ct`                 | `CancellationToken`                               |             |

**Returns:** `Task<BatchOperationCreatedResult>`

#### SearchProcessInstanceIncidentsAsync(ProcessInstanceKey, IncidentSearchQuery, ConsistencyOptions<SearchProcessInstanceIncidentsResponse>?, CancellationToken)

```csharp
public Task<SearchProcessInstanceIncidentsResponse> SearchProcessInstanceIncidentsAsync(ProcessInstanceKey processInstanceKey, IncidentSearchQuery body, ConsistencyOptions<SearchProcessInstanceIncidentsResponse>? consistency = null, CancellationToken ct = default)
```

Search related incidents
Search for incidents caused by the process instance or any of its called process or decision instances.

Although the `processInstanceKey` is provided as a path parameter to indicate the root process instance,
you may also include a `processInstanceKey` within the filter object to narrow results to specific
child process instances. This is useful, for example, if you want to isolate incidents associated with
subprocesses or called processes under the root instance while excluding incidents directly tied to the root.

| Parameter            | Type                                                         | Description |
| -------------------- | ------------------------------------------------------------ | ----------- |
| `processInstanceKey` | `ProcessInstanceKey`                                         |             |
| `body`               | `IncidentSearchQuery`                                        |             |
| `consistency`        | `ConsistencyOptions<SearchProcessInstanceIncidentsResponse>` |             |
| `ct`                 | `CancellationToken`                                          |             |

**Returns:** `Task<SearchProcessInstanceIncidentsResponse>`

#### SearchProcessInstancesAsync(SearchProcessInstancesRequest, ConsistencyOptions<SearchProcessInstancesResponse>?, CancellationToken)

```csharp
public Task<SearchProcessInstancesResponse> SearchProcessInstancesAsync(SearchProcessInstancesRequest body, ConsistencyOptions<SearchProcessInstancesResponse>? consistency = null, CancellationToken ct = default)
```

Search process instances
Search for process instances based on given criteria.

| Parameter     | Type                                                 | Description |
| ------------- | ---------------------------------------------------- | ----------- |
| `body`        | `SearchProcessInstancesRequest`                      |             |
| `consistency` | `ConsistencyOptions<SearchProcessInstancesResponse>` |             |
| `ct`          | `CancellationToken`                                  |             |

**Returns:** `Task<SearchProcessInstancesResponse>`

**Example**

```csharp
static async Task SearchProcessInstancesExample()
{
    using var client = Camunda.CreateClient();

    var result = await client.SearchProcessInstancesAsync(new SearchProcessInstancesRequest());

    foreach (var instance in result.Items)
    {
        Console.WriteLine($"{instance.ProcessInstanceKey} — {instance.State}");
    }
}
```

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

**Example**

```csharp
static async Task CorrelateMessageExample()
{
    using var client = Camunda.CreateClient();

    var result = await client.CorrelateMessageAsync(new MessageCorrelationRequest
    {
        Name = "payment-received",
        CorrelationKey = "ORD-12345",
        Variables = new Dictionary<string, object>
        {
            ["paymentId"] = "PAY-98765",
            ["amount"] = 99.95
        }
    });

    Console.WriteLine($"Message key: {result.MessageKey}");
}
```

#### PublishMessageAsync(MessagePublicationRequest, CancellationToken)

```csharp
public Task<PublishMessageResponse> PublishMessageAsync(MessagePublicationRequest body, CancellationToken ct = default)
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

**Returns:** `Task<PublishMessageResponse>`

**Example**

```csharp
static async Task PublishMessageExample()
{
    using var client = Camunda.CreateClient();

    await client.PublishMessageAsync(new MessagePublicationRequest
    {
        Name = "order-placed",
        CorrelationKey = "ORD-12345",
        TimeToLive = 60_000, // 1 minute
        Variables = new Dictionary<string, object>
        {
            ["orderId"] = "ORD-12345"
        }
    });
}
```

#### SearchCorrelatedMessageSubscriptionsAsync(CorrelatedMessageSubscriptionSearchQuery, ConsistencyOptions<SearchCorrelatedMessageSubscriptionsResponse>?, CancellationToken)

```csharp
public Task<SearchCorrelatedMessageSubscriptionsResponse> SearchCorrelatedMessageSubscriptionsAsync(CorrelatedMessageSubscriptionSearchQuery body, ConsistencyOptions<SearchCorrelatedMessageSubscriptionsResponse>? consistency = null, CancellationToken ct = default)
```

Search correlated message subscriptions
Search correlated message subscriptions based on given criteria.

| Parameter     | Type                                                               | Description |
| ------------- | ------------------------------------------------------------------ | ----------- |
| `body`        | `CorrelatedMessageSubscriptionSearchQuery`                         |             |
| `consistency` | `ConsistencyOptions<SearchCorrelatedMessageSubscriptionsResponse>` |             |
| `ct`          | `CancellationToken`                                                |             |

**Returns:** `Task<SearchCorrelatedMessageSubscriptionsResponse>`

#### SearchMessageSubscriptionsAsync(SearchMessageSubscriptionsRequest, ConsistencyOptions<SearchMessageSubscriptionsResponse>?, CancellationToken)

```csharp
public Task<SearchMessageSubscriptionsResponse> SearchMessageSubscriptionsAsync(SearchMessageSubscriptionsRequest body, ConsistencyOptions<SearchMessageSubscriptionsResponse>? consistency = null, CancellationToken ct = default)
```

Search message subscriptions
Search for message subscriptions based on given criteria.

| Parameter     | Type                                                     | Description |
| ------------- | -------------------------------------------------------- | ----------- |
| `body`        | `SearchMessageSubscriptionsRequest`                      |             |
| `consistency` | `ConsistencyOptions<SearchMessageSubscriptionsResponse>` |             |
| `ct`          | `CancellationToken`                                      |             |

**Returns:** `Task<SearchMessageSubscriptionsResponse>`

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
public Task<CreateDeploymentResponse> CreateDeploymentAsync(MultipartFormDataContent content, CancellationToken ct = default)
```

Deploy resources
Deploys one or more resources (e.g. processes, decision models, or forms).
This is an atomic call, i.e. either all resources are deployed or none of them are.

| Parameter | Type                       | Description |
| --------- | -------------------------- | ----------- |
| `content` | `MultipartFormDataContent` |             |
| `ct`      | `CancellationToken`        |             |

**Returns:** `Task<CreateDeploymentResponse>`

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

| Parameter     | Type                                        | Description |
| ------------- | ------------------------------------------- | ----------- |
| `tenantId`    | `TenantId`                                  |             |
| `name`        | `String`                                    |             |
| `consistency` | `ConsistencyOptions<ClusterVariableResult>` |             |
| `ct`          | `CancellationToken`                         |             |

**Returns:** `Task<ClusterVariableResult>`

#### GetVariableAsync(VariableKey, ConsistencyOptions<GetVariableResponse>?, CancellationToken)

```csharp
public Task<GetVariableResponse> GetVariableAsync(VariableKey variableKey, ConsistencyOptions<GetVariableResponse>? consistency = null, CancellationToken ct = default)
```

Get variable
Get the variable by the variable key.

| Parameter     | Type                                      | Description |
| ------------- | ----------------------------------------- | ----------- |
| `variableKey` | `VariableKey`                             |             |
| `consistency` | `ConsistencyOptions<GetVariableResponse>` |             |
| `ct`          | `CancellationToken`                       |             |

**Returns:** `Task<GetVariableResponse>`

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

#### SearchVariablesAsync(SearchVariablesRequest, bool?, ConsistencyOptions<SearchVariablesResponse>?, CancellationToken)

```csharp
public Task<SearchVariablesResponse> SearchVariablesAsync(SearchVariablesRequest body, bool? truncateValues = null, ConsistencyOptions<SearchVariablesResponse>? consistency = null, CancellationToken ct = default)
```

Search variables
Search for process and local variables based on given criteria. By default, long variable values in the response are truncated.

| Parameter        | Type                                          | Description |
| ---------------- | --------------------------------------------- | ----------- |
| `body`           | `SearchVariablesRequest`                      |             |
| `truncateValues` | `Nullable<Boolean>`                           |             |
| `consistency`    | `ConsistencyOptions<SearchVariablesResponse>` |             |
| `ct`             | `CancellationToken`                           |             |

**Returns:** `Task<SearchVariablesResponse>`

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
public Task<MappingRuleUpdateResult> CreateMappingRuleAsync(MappingRuleCreateRequest body, CancellationToken ct = default)
```

Create mapping rule
Create a new mapping rule

| Parameter | Type                       | Description |
| --------- | -------------------------- | ----------- |
| `body`    | `MappingRuleCreateRequest` |             |
| `ct`      | `CancellationToken`        |             |

**Returns:** `Task<MappingRuleUpdateResult>`

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

#### SearchMappingRuleAsync(MappingRuleSearchQueryRequest, ConsistencyOptions<MappingRuleSearchQueryResult>?, CancellationToken)

```csharp
public Task<MappingRuleSearchQueryResult> SearchMappingRuleAsync(MappingRuleSearchQueryRequest body, ConsistencyOptions<MappingRuleSearchQueryResult>? consistency = null, CancellationToken ct = default)
```

Search mapping rules
Search for mapping rules based on given criteria.

| Parameter     | Type                                               | Description |
| ------------- | -------------------------------------------------- | ----------- |
| `body`        | `MappingRuleSearchQueryRequest`                    |             |
| `consistency` | `ConsistencyOptions<MappingRuleSearchQueryResult>` |             |
| `ct`          | `CancellationToken`                                |             |

**Returns:** `Task<MappingRuleSearchQueryResult>`

#### UpdateMappingRuleAsync(string, MappingRuleUpdateRequest, CancellationToken)

```csharp
public Task<MappingRuleUpdateResult> UpdateMappingRuleAsync(string mappingRuleId, MappingRuleUpdateRequest body, CancellationToken ct = default)
```

Update mapping rule
Update a mapping rule.

| Parameter       | Type                       | Description |
| --------------- | -------------------------- | ----------- |
| `mappingRuleId` | `String`                   |             |
| `body`          | `MappingRuleUpdateRequest` |             |
| `ct`            | `CancellationToken`        |             |

**Returns:** `Task<MappingRuleUpdateResult>`

### Decision Instances

#### DeleteDecisionInstancesBatchOperationAsync(DecisionInstanceDeletionBatchOperationRequest, ConsistencyOptions<BatchOperationCreatedResult>?, CancellationToken)

```csharp
public Task<BatchOperationCreatedResult> DeleteDecisionInstancesBatchOperationAsync(DecisionInstanceDeletionBatchOperationRequest body, ConsistencyOptions<BatchOperationCreatedResult>? consistency = null, CancellationToken ct = default)
```

Delete decision instances (batch)
Delete multiple decision instances. This will delete the historic data from secondary storage.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

| Parameter     | Type                                              | Description |
| ------------- | ------------------------------------------------- | ----------- |
| `body`        | `DecisionInstanceDeletionBatchOperationRequest`   |             |
| `consistency` | `ConsistencyOptions<BatchOperationCreatedResult>` |             |
| `ct`          | `CancellationToken`                               |             |

**Returns:** `Task<BatchOperationCreatedResult>`

#### GetDecisionInstanceAsync(DecisionInstanceKey, ConsistencyOptions<object>?, CancellationToken)

```csharp
public Task<object> GetDecisionInstanceAsync(DecisionInstanceKey decisionEvaluationInstanceKey, ConsistencyOptions<object>? consistency = null, CancellationToken ct = default)
```

Get decision instance
Returns a decision instance.

| Parameter                       | Type                         | Description |
| ------------------------------- | ---------------------------- | ----------- |
| `decisionEvaluationInstanceKey` | `DecisionInstanceKey`        |             |
| `consistency`                   | `ConsistencyOptions<Object>` |             |
| `ct`                            | `CancellationToken`          |             |

**Returns:** `Task<Object>`

#### SearchDecisionInstancesAsync(DecisionInstanceSearchQuery, ConsistencyOptions<SearchDecisionInstancesResponse>?, CancellationToken)

```csharp
public Task<SearchDecisionInstancesResponse> SearchDecisionInstancesAsync(DecisionInstanceSearchQuery body, ConsistencyOptions<SearchDecisionInstancesResponse>? consistency = null, CancellationToken ct = default)
```

Search decision instances
Search for decision instances based on given criteria.

| Parameter     | Type                                                  | Description |
| ------------- | ----------------------------------------------------- | ----------- |
| `body`        | `DecisionInstanceSearchQuery`                         |             |
| `consistency` | `ConsistencyOptions<SearchDecisionInstancesResponse>` |             |
| `ct`          | `CancellationToken`                                   |             |

**Returns:** `Task<SearchDecisionInstancesResponse>`

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

**Example**

```csharp
static async Task EvaluateDecisionExample()
{
    using var client = Camunda.CreateClient();

    // Find the decision definition via search
    var definitions = await client.SearchDecisionDefinitionsAsync(new DecisionDefinitionSearchQuery());
    var decisionDefinitionId = definitions.Items![0].DecisionDefinitionId.Value;

    var result = await client.EvaluateDecisionAsync(new DecisionEvaluationById
    {
        DecisionDefinitionId = decisionDefinitionId,
        Variables = new Dictionary<string, object>
        {
            ["weight"] = 5.2,
            ["destination"] = "DE"
        }
    });

    Console.WriteLine($"Decision: {result.DecisionDefinitionId}");
}
```

### Audit Logs

#### GetAuditLogAsync(AuditLogKey, ConsistencyOptions<GetAuditLogResponse>?, CancellationToken)

```csharp
public Task<GetAuditLogResponse> GetAuditLogAsync(AuditLogKey auditLogKey, ConsistencyOptions<GetAuditLogResponse>? consistency = null, CancellationToken ct = default)
```

Get audit log
Get an audit log entry by auditLogKey.

| Parameter     | Type                                      | Description |
| ------------- | ----------------------------------------- | ----------- |
| `auditLogKey` | `AuditLogKey`                             |             |
| `consistency` | `ConsistencyOptions<GetAuditLogResponse>` |             |
| `ct`          | `CancellationToken`                       |             |

**Returns:** `Task<GetAuditLogResponse>`

#### SearchAuditLogsAsync(AuditLogSearchQueryRequest, ConsistencyOptions<SearchAuditLogsResponse>?, CancellationToken)

```csharp
public Task<SearchAuditLogsResponse> SearchAuditLogsAsync(AuditLogSearchQueryRequest body, ConsistencyOptions<SearchAuditLogsResponse>? consistency = null, CancellationToken ct = default)
```

Search audit logs
Search for audit logs based on given criteria.

| Parameter     | Type                                          | Description |
| ------------- | --------------------------------------------- | ----------- |
| `body`        | `AuditLogSearchQueryRequest`                  |             |
| `consistency` | `ConsistencyOptions<SearchAuditLogsResponse>` |             |
| `ct`          | `CancellationToken`                           |             |

**Returns:** `Task<SearchAuditLogsResponse>`

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

**Example**

```csharp
static async Task SearchDecisionDefinitionsExample()
{
    using var client = Camunda.CreateClient();

    var result = await client.SearchDecisionDefinitionsAsync(new DecisionDefinitionSearchQuery());

    foreach (var def in result.Items!)
    {
        Console.WriteLine($"{def.DecisionDefinitionId} v{def.Version}");
    }
}
```

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

#### GetIncidentAsync(IncidentKey, ConsistencyOptions<GetIncidentResponse>?, CancellationToken)

```csharp
public Task<GetIncidentResponse> GetIncidentAsync(IncidentKey incidentKey, ConsistencyOptions<GetIncidentResponse>? consistency = null, CancellationToken ct = default)
```

Get incident
Returns incident as JSON.

| Parameter     | Type                                      | Description |
| ------------- | ----------------------------------------- | ----------- |
| `incidentKey` | `IncidentKey`                             |             |
| `consistency` | `ConsistencyOptions<GetIncidentResponse>` |             |
| `ct`          | `CancellationToken`                       |             |

**Returns:** `Task<GetIncidentResponse>`

**Example**

```csharp
static async Task GetIncidentExample()
{
    using var client = Camunda.CreateClient();

    // Find an incident via search
    var incidents = await client.SearchIncidentsAsync(new IncidentSearchQuery());
    var incidentKey = incidents.Items![0].IncidentKey.Value;

    var incident = await client.GetIncidentAsync(incidentKey);

    Console.WriteLine($"Incident {incident.IncidentKey}: {incident.ErrorType}");
    Console.WriteLine($"Message: {incident.ErrorMessage}");
}
```

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

**Example**

```csharp
static async Task ResolveIncidentExample()
{
    using var client = Camunda.CreateClient();

    // Find an incident via search
    var incidents = await client.SearchIncidentsAsync(new IncidentSearchQuery());
    var incidentKey = incidents.Items![0].IncidentKey.Value;

    await client.ResolveIncidentAsync(incidentKey, new IncidentResolutionRequest());
}
```

#### ResolveIncidentsBatchOperationAsync(ResolveIncidentsBatchOperationRequest, ConsistencyOptions<BatchOperationCreatedResult>?, CancellationToken)

```csharp
public Task<BatchOperationCreatedResult> ResolveIncidentsBatchOperationAsync(ResolveIncidentsBatchOperationRequest body, ConsistencyOptions<BatchOperationCreatedResult>? consistency = null, CancellationToken ct = default)
```

Resolve related incidents (batch)
Resolves multiple instances of process instances.
Since only process instances with ACTIVE state can have unresolved incidents, any given
filters for state are ignored and overridden during this batch operation.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

| Parameter     | Type                                              | Description |
| ------------- | ------------------------------------------------- | ----------- |
| `body`        | `ResolveIncidentsBatchOperationRequest`           |             |
| `consistency` | `ConsistencyOptions<BatchOperationCreatedResult>` |             |
| `ct`          | `CancellationToken`                               |             |

**Returns:** `Task<BatchOperationCreatedResult>`

#### SearchElementInstanceIncidentsAsync(ElementInstanceKey, IncidentSearchQuery, ConsistencyOptions<SearchElementInstanceIncidentsResponse>?, CancellationToken)

```csharp
public Task<SearchElementInstanceIncidentsResponse> SearchElementInstanceIncidentsAsync(ElementInstanceKey elementInstanceKey, IncidentSearchQuery body, ConsistencyOptions<SearchElementInstanceIncidentsResponse>? consistency = null, CancellationToken ct = default)
```

Search for incidents of a specific element instance
Search for incidents caused by the specified element instance, including incidents of any child instances created from this element instance.

Although the `elementInstanceKey` is provided as a path parameter to indicate the root element instance,
you may also include an `elementInstanceKey` within the filter object to narrow results to specific
child element instances. This is useful, for example, if you want to isolate incidents associated with
nested or subordinate elements within the given element instance while excluding incidents directly tied
to the root element itself.

| Parameter            | Type                                                         | Description |
| -------------------- | ------------------------------------------------------------ | ----------- |
| `elementInstanceKey` | `ElementInstanceKey`                                         |             |
| `body`               | `IncidentSearchQuery`                                        |             |
| `consistency`        | `ConsistencyOptions<SearchElementInstanceIncidentsResponse>` |             |
| `ct`                 | `CancellationToken`                                          |             |

**Returns:** `Task<SearchElementInstanceIncidentsResponse>`

#### SearchIncidentsAsync(IncidentSearchQuery, ConsistencyOptions<SearchIncidentsResponse>?, CancellationToken)

```csharp
public Task<SearchIncidentsResponse> SearchIncidentsAsync(IncidentSearchQuery body, ConsistencyOptions<SearchIncidentsResponse>? consistency = null, CancellationToken ct = default)
```

Search incidents
Search for incidents based on given criteria.

| Parameter     | Type                                          | Description |
| ------------- | --------------------------------------------- | ----------- |
| `body`        | `IncidentSearchQuery`                         |             |
| `consistency` | `ConsistencyOptions<SearchIncidentsResponse>` |             |
| `ct`          | `CancellationToken`                           |             |

**Returns:** `Task<SearchIncidentsResponse>`

**Example**

```csharp
static async Task SearchIncidentsExample()
{
    using var client = Camunda.CreateClient();

    var result = await client.SearchIncidentsAsync(new IncidentSearchQuery());

    foreach (var incident in result.Items!)
    {
        Console.WriteLine($"Incident {incident.IncidentKey}: {incident.ErrorType} — {incident.ErrorMessage}");
    }
}
```

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

#### GetProcessDefinitionStatisticsAsync(ProcessDefinitionKey, GetProcessDefinitionStatisticsRequest, ConsistencyOptions<ProcessDefinitionElementStatisticsQueryResult>?, CancellationToken)

```csharp
public Task<ProcessDefinitionElementStatisticsQueryResult> GetProcessDefinitionStatisticsAsync(ProcessDefinitionKey processDefinitionKey, GetProcessDefinitionStatisticsRequest body, ConsistencyOptions<ProcessDefinitionElementStatisticsQueryResult>? consistency = null, CancellationToken ct = default)
```

Get process definition statistics
Get statistics about elements in currently running process instances by process definition key and search filter.

| Parameter              | Type                                                                | Description |
| ---------------------- | ------------------------------------------------------------------- | ----------- |
| `processDefinitionKey` | `ProcessDefinitionKey`                                              |             |
| `body`                 | `GetProcessDefinitionStatisticsRequest`                             |             |
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

#### GetStartProcessFormAsync(ProcessDefinitionKey, ConsistencyOptions<GetStartProcessFormResponse>?, CancellationToken)

```csharp
public Task<GetStartProcessFormResponse> GetStartProcessFormAsync(ProcessDefinitionKey processDefinitionKey, ConsistencyOptions<GetStartProcessFormResponse>? consistency = null, CancellationToken ct = default)
```

Get process start form
Get the start form of a process.
Note that this endpoint will only return linked forms. This endpoint does not support embedded forms.

| Parameter              | Type                                              | Description |
| ---------------------- | ------------------------------------------------- | ----------- |
| `processDefinitionKey` | `ProcessDefinitionKey`                            |             |
| `consistency`          | `ConsistencyOptions<GetStartProcessFormResponse>` |             |
| `ct`                   | `CancellationToken`                               |             |

**Returns:** `Task<GetStartProcessFormResponse>`

#### SearchProcessDefinitionsAsync(SearchProcessDefinitionsRequest, ConsistencyOptions<ProcessDefinitionSearchQueryResult>?, CancellationToken)

```csharp
public Task<ProcessDefinitionSearchQueryResult> SearchProcessDefinitionsAsync(SearchProcessDefinitionsRequest body, ConsistencyOptions<ProcessDefinitionSearchQueryResult>? consistency = null, CancellationToken ct = default)
```

Search process definitions
Search for process definitions based on given criteria.

| Parameter     | Type                                                     | Description |
| ------------- | -------------------------------------------------------- | ----------- |
| `body`        | `SearchProcessDefinitionsRequest`                        |             |
| `consistency` | `ConsistencyOptions<ProcessDefinitionSearchQueryResult>` |             |
| `ct`          | `CancellationToken`                                      |             |

**Returns:** `Task<ProcessDefinitionSearchQueryResult>`
