---
id: grpc
title: "Zeebe API (gRPC)"
---

[Zeebe](../components/zeebe/zeebe-overview.md) clients use [gRPC](https://grpc.io/) to communicate with the cluster.

:::note
This specification still contains references to YAML workflows. This is a [deprecated feature](/reference/announcements.md) and will eventually be removed.
:::

## Gateway service

The Zeebe Client gRPC API is exposed through a single gateway service.

### `ActivateJobs` RPC

Iterates through all known partitions round-robin, activates up to the requested
maximum, and streams them back to the client as they are activated.

#### Input: `ActivateJobsRequest`

```protobuf
message ActivateJobsRequest {
  // the job type, as defined in the BPMN process (e.g. <zeebe:taskDefinition
  // type="payment-service" />)
  string type = 1;
  // the name of the worker activating the jobs, mostly used for logging purposes
  string worker = 2;
  // a job returned after this call will not be activated by another call until the
  // timeout (in ms) has been reached
  int64 timeout = 3;
  // the maximum jobs to activate by this request
  int32 maxJobsToActivate = 4;
  // a list of variables to fetch as the job variables; if empty, all visible variables at
  // the time of activation for the scope of the job will be returned
  repeated string fetchVariable = 5;
  // The request will be completed when at least one job is activated or after the requestTimeout (in ms).
  // if the requestTimeout = 0, a default timeout is used.
  // if the requestTimeout < 0, long polling is disabled and the request is completed immediately, even when no job is activated.
  int64 requestTimeout = 6;
}
```

#### Output: `ActivateJobsResponse`

```protobuf
message ActivateJobsResponse {
  // list of activated jobs
  repeated ActivatedJob jobs = 1;
}

message ActivatedJob {
  // the key, a unique identifier for the job
  int64 key = 1;
  // the type of the job (should match what was requested)
  string type = 2;
  // the job's process instance key
  int64 processInstanceKey = 3;
  // the bpmn process ID of the job process definition
  string bpmnProcessId = 4;
  // the version of the job process definition
  int32 processDefinitionVersion = 5;
  // the key of the job process definition
  int64 processKey = 6;
  // the associated task element ID
  string elementId = 7;
  // the unique key identifying the associated task, unique within the scope of the
  // process instance
  int64 elementInstanceKey = 8;
  // a set of custom headers defined during modelling; returned as a serialized
  // JSON document
  string customHeaders = 9;
  // the name of the worker which activated this job
  string worker = 10;
  // the amount of retries left to this job (should always be positive)
  int32 retries = 11;
  // when the job can be activated again, sent as a UNIX epoch timestamp
  int64 deadline = 12;
  // JSON document, computed at activation time, consisting of all visible variables to
  // the task scope
  string variables = 13;
}
```

#### Errors

##### GRPC_STATUS_INVALID_ARGUMENT

Returned if:

- type is blank (empty string, null)
- worker is blank (empty string, null)
- timeout less than 1 (ms)
- maxJobsToActivate is less than 1

### `CancelProcessInstance` RPC

Cancels a running process instance.

#### Input: `CancelProcessInstanceRequest`

```protobuf
message CancelProcessInstanceRequest {
  // the process instance key (as, for example, obtained from
  // CreateProcessInstanceResponse)
  int64 processInstanceKey = 1;
}
```

#### Output: `CancelProcessInstanceResponse`

```protobuf
message CancelProcessInstanceResponse {
}
```

#### Errors

##### GRPC_STATUS_NOT_FOUND

Returned if:

- No process instance exists with the given key. Note that since process instances are removed once they are finished, it could mean the instance did exist at some point.

### `CompleteJob` RPC

Completes a job with the given payload, which allows completing the associated service task.

#### Input: `CompleteJobRequest`

```protobuf
message CompleteJobRequest {
  // the unique job identifier, as obtained from ActivateJobsResponse
  int64 jobKey = 1;
  // a JSON document representing the variables in the current task scope
  string variables = 2;
}
```

#### Output: `CompleteJobResponse`

```protobuf
message CompleteJobResponse {
}
```

#### Errors

##### GRPC_STATUS_NOT_FOUND

Returned if:

- No job exists with the given job key. Note that since jobs are removed once completed, it could be that this job did exist at some point.

##### GRPC_STATUS_FAILED_PRECONDITION

Returned if:

- The job was marked as failed. In that case, the related incident must be resolved before the job can be activated again and completed.

### `CreateProcessInstance` RPC

Creates and starts an instance of the specified process. The process definition to use
to create the instance can be specified either using its unique key (as returned by
DeployProcess), or using the BPMN process ID and a version. Pass -1 as the version to
use the latest deployed version.

:::note
Only processes with none start events can be started through this command.
:::

#### Input: `CreateProcessInstanceRequest`

```protobuf
message CreateProcessInstanceRequest {
  // the unique key identifying the process definition (e.g. returned from a process
  // in the DeployProcessResponse message)
  int64 processKey = 1;
  // the BPMN process ID of the process definition
  string bpmnProcessId = 2;
  // the version of the process; set to -1 to use the latest version
  int32 version = 3;
  // JSON document that will instantiate the variables for the root variable scope of the
  // process instance; it must be a JSON object, as variables will be mapped in a
  // key-value fashion. e.g. { "a": 1, "b": 2 } will create two variables, named "a" and
  // "b" respectively, with their associated values. [{ "a": 1, "b": 2 }] would not be a
  // valid argument, as the root of the JSON document is an array and not an object.
  string variables = 4;
}
```

#### Output: `CreateProcessInstanceResponse`

```protobuf
message CreateProcessInstanceResponse {
  // the key of the process definition which was used to create the process instance
  int64 processKey = 1;
  // the BPMN process ID of the process definition which was used to create the process
  // instance
  string bpmnProcessId = 2;
  // the version of the process definition which was used to create the process instance
  int32 version = 3;
  // the unique identifier of the created process instance; to be used wherever a request
  // needs a process instance key (e.g. CancelProcessInstanceRequest)
  int64 processInstanceKey = 4;
}
```

### `CreateProcessInstanceWithResult` RPC

Similar to `CreateProcessInstance` RPC, creates and starts an instance of the specified process.
Unlike `CreateProcessInstance` RPC, the response is returned when the process is completed.

:::note
Only processes with none start events can be started through this command.
:::

#### Input: `CreateProcessInstanceWithResultRequest`

```protobuf
message CreateProcessInstanceRequest {
   CreateProcessInstanceRequest request = 1;
   // timeout (in ms). the request will be closed if the process is not completed before
   // the requestTimeout.
   // if requestTimeout = 0, uses the generic requestTimeout configured in the gateway.
   int64 requestTimeout = 2;
}
```

#### Output: `CreateProcessInstanceWithResultResponse`

```protobuf
message CreateProcessInstanceResponse {
  // the key of the process definition which was used to create the process instance
  int64 processKey = 1;
  // the BPMN process ID of the process definition which was used to create the process
  // instance
  string bpmnProcessId = 2;
  // the version of the process definition which was used to create the process instance
  int32 version = 3;
  // the unique identifier of the created process instance; to be used wherever a request
  // needs a process instance key (e.g. CancelProcessInstanceRequest)
  int64 processInstanceKey = 4;
  // consisting of all visible variables to the root scope
  string variables = 5;
}
```

#### Errors

##### GRPC_STATUS_NOT_FOUND

Returned if:

- No process with the given key exists (if processKey was given).
- No process with the given process ID exists (if bpmnProcessId was given but version was -1).
- No process with the given process ID and version exists (if both bpmnProcessId and version were given).

##### GRPC_STATUS_FAILED_PRECONDITION

Returned if:

- The process definition does not contain a none start event; only processes with none
  start event can be started manually.

##### GRPC_STATUS_INVALID_ARGUMENT

Returned if:

- The given variables argument is not a valid JSON document; it is expected to be a valid
  JSON document where the root node is an object.

### `DeployProcess` RPC

Deploys one or more processes to Zeebe. Note that this is an atomic call,
i.e. either all processes are deployed, or none of them are.

#### Input: `DeployProcessRequest`

```protobuf
message DeployProcessRequest {
  // List of process resources to deploy
  repeated ProcessRequestObject processes = 1;
}

message ProcessRequestObject {
  enum ResourceType {
    // FILE type means the gateway will try to detect the resource type
    // using the file extension of the name field
    FILE = 0;
    BPMN = 1; // extension 'bpmn'
    YAML = 2 [deprecated = true]; // extension 'yaml'; removed as of release 1.0
  }

  // the resource basename, e.g. myProcess.bpmn
  string name = 1;
  // the resource type; if set to BPMN or YAML then the file extension
  // is ignored
  // As of release 1.0, YAML support was removed and BPMN is the only supported resource type.
  // The field was kept to not break clients.
  ResourceType type = 2 [deprecated = true];
  // the process definition as a UTF8-encoded string
  bytes definition = 3;
}
```

#### Output: `DeployProcessResponse`

```protobuf
message DeployProcessResponse {
  // the unique key identifying the deployment
  int64 key = 1;
  // a list of deployed processes
  repeated ProcessMetadata processes = 2;
}

message ProcessMetadata {
  // the bpmn process ID, as parsed during deployment; together with the version forms a
  // unique identifier for a specific process definition
  string bpmnProcessId = 1;
  // the assigned process version
  int32 version = 2;
  // the assigned key, which acts as a unique identifier for this process
  int64 processKey = 3;
  // the resource name (see: ProcessRequestObject.name) from which this process was
  // parsed
  string resourceName = 4;
}
```

#### Errors

##### GRPC_STATUS_INVALID_ARGUMENT

Returned if:

- No resources given.
- At least one resource is invalid. A resource is considered invalid if:
  - It is not a BPMN or YAML file (currently detected through the file extension).
  - The resource data is not deserializable (e.g. detected as BPMN, but it's broken XML).
  - The process is invalid (e.g. an event-based gateway has an outgoing sequence flow to a task.)

### `FailJob` RPC

Marks the job as failed; if the retries argument is positive, the job is immediately
activatable again, and a worker could try again to process it. If it is zero or negative,
an incident is raised, tagged with the given errorMessage, and the job is not activatable until the incident is resolved.

#### Input: `FailJobRequest`

```protobuf
message FailJobRequest {
  // the unique job identifier, as obtained when activating the job
  int64 jobKey = 1;
  // the amount of retries the job should have left
  int32 retries = 2;
  // an optional message describing why the job failed
  // this is particularly useful if a job runs out of retries and an incident is raised,
  // as it this message can help explain why an incident was raised
  string errorMessage = 3;
}
```

#### Output: `FailJobResponse`

```protobuf
message FailJobResponse {
}
```

#### Errors

##### GRPC_STATUS_NOT_FOUND

Returned if:

- No job was found with the given key.

##### GRPC_STATUS_FAILED_PRECONDITION

Returned if:

- The job was not activated.
- The job is already in a failed state, i.e. ran out of retries.

### `PublishMessage` RPC

Publishes a single message. Messages are published to specific partitions computed from their
correlation keys.

#### Input: `PublishMessageRequest`

```protobuf
message PublishMessageRequest {
  // the name of the message
  string name = 1;
  // the correlation key of the message
  string correlationKey = 2;
  // how long the message should be buffered on the broker, in milliseconds
  int64 timeToLive = 3;
  // the unique ID of the message; can be omitted. only useful to ensure only one message
  // with the given ID will ever be published (during its lifetime)
  string messageId = 4;
  // the message variables as a JSON document; to be valid, the root of the document must be an
  // object, e.g. { "a": "foo" }. [ "foo" ] would not be valid.
  string variables = 5;
}
```

#### Output: `PublishMessageResponse`

```protobuf
message PublishMessageResponse {
  // the unique ID of the message that was published
  int64 key = 1;
}
```

#### Errors

##### GRPC_STATUS_ALREADY_EXISTS

Returned if:

- A message with the same ID was previously published (and is still alive).

### `ResolveIncident` RPC

Resolves a given incident. This simply marks the incident as resolved; most likely a call to
UpdateJobRetries or SetVariables will be necessary to actually resolve the
problem, followed by this call.

#### Input: `ResolveIncidentRequest`

```protobuf
message ResolveIncidentRequest {
  // the unique ID of the incident to resolve
  int64 incidentKey = 1;
}
```

#### Output: `ResolveIncidentResponse`

```protobuf
message ResolveIncidentResponse {
}
```

#### Errors

##### GRPC_STATUS_NOT_FOUND

Returned if:

- No incident with the given key exists.

### `SetVariables` RPC

Updates all the variables of a particular scope (e.g. process instance, flow element instance) from the given JSON document.

#### Input: `SetVariablesRequest`

```protobuf
message SetVariablesRequest {
  // the unique identifier of a particular element; can be the process instance key (as
  // obtained during instance creation), or a given element, such as a service task (see
  // elementInstanceKey on the job message)
  int64 elementInstanceKey = 1;
  // a JSON serialized document describing variables as key value pairs; the root of the document
  // must be an object
  string variables = 2;
  // if true, the variables will be merged strictly into the local scope (as indicated by
  // elementInstanceKey); this means the variables is not propagated to upper scopes.
  // for example, let's say we have two scopes, '1' and '2', with each having effective variables as:
  // 1 => `{ "foo" : 2 }`, and 2 => `{ "bar" : 1 }`. if we send an update request with
  // elementInstanceKey = 2, variables `{ "foo" : 5 }`, and local is true, then scope 1 will
  // be unchanged, and scope 2 will now be `{ "bar" : 1, "foo" 5 }`. if local was false, however,
  // then scope 1 would be `{ "foo": 5 }`, and scope 2 would be `{ "bar" : 1 }`.
  bool local = 3;
}
```

#### Output: `SetVariablesResponse`

```protobuf
message SetVariablesResponse {
  // the unique key of the set variables command
  int64 key = 1;
}
```

#### Errors

##### GRPC_STATUS_NOT_FOUND

Returned if:

- No element with the given `elementInstanceKey` exists.

##### GRPC_STATUS_INVALID_ARGUMENT

Returned if:

- The given payload is not a valid JSON document; all payloads are expected to be
  valid JSON documents where the root node is an object.

### `ThrowError` RPC

Throw an error to indicate that a business error has occurred while processing the job. The error is identified by an error code and is caught by an error catch event with the same error code.

#### Input: `ThrowErrorRequest`

```protobuf
message ThrowErrorRequest {
  // the unique job identifier, as obtained when activating the job
  int64 jobKey = 1;
  // the error code that will be matched with an error catch event
  string errorCode = 2;
  // an optional error message that provides additional context
  string errorMessage = 3;
}
```

#### Output: `ThrowErrorResponse`

```protobuf
message ThrowErrorResponse {
}
```

#### Errors

##### GRPC_STATUS_NOT_FOUND

Returned if:

- No job was found with the given key.

##### GRPC_STATUS_FAILED_PRECONDITION

Returned if:

- The job is already in a failed state, i.e. ran out of retries.

### `Topology` RPC

Obtains the current topology of the cluster the gateway is part of.

#### Input: `TopologyRequest`

```protobuf
message TopologyRequest {
}
```

#### Output: `TopologyResponse`

```protobuf
message TopologyResponse {
  // list of brokers part of this cluster
  repeated BrokerInfo brokers = 1;
  // how many nodes are in the cluster
  int32 clusterSize = 2;
  // how many partitions are spread across the cluster
  int32 partitionsCount = 3;
  // configured replication factor for this cluster
  int32 replicationFactor = 4;
  // gateway version
  string gatewayVersion = 5;
}

message BrokerInfo {
  // unique (within a cluster) node ID for the broker
  int32 nodeId = 1;
  // hostname of the broker
  string host = 2;
  // port for the broker
  int32 port = 3;
  // list of partitions managed or replicated on this broker
  repeated Partition partitions = 4;
  // broker version
  string version = 5;
}

message Partition {
  // Describes the Raft role of the broker for a given partition
  enum PartitionBrokerRole {
    LEADER = 0;
    FOLLOWER = 1;
  }

  // Describes the current health of the partition
  enum PartitionBrokerHealth {
    HEALTHY = 0;
    UNHEALTHY = 1;
  }

  // the unique ID of this partition
  int32 partitionId = 1;
  // the role of the broker for this partition
  PartitionBrokerRole role = 2;
  // the health of this partition
  PartitionBrokerHealth health = 3;
}
```

#### Errors

No specific errors.

### `UpdateJobRetries` RPC

Updates the number of retries a job has left. This is mostly useful for jobs that have run out of
retries, should the underlying problem be solved.

#### Input: `UpdateJobRetriesRequest`

```protobuf
message UpdateJobRetriesRequest {
  // the unique job identifier, as obtained through ActivateJobs
  int64 jobKey = 1;
  // the new amount of retries for the job; must be positive
  int32 retries = 2;
}
```

#### Output: `UpdateJobRetriesResponse`

```protobuf
message UpdateJobRetriesResponse {
}
```

#### Errors

##### GRPC_STATUS_NOT_FOUND

Returned if:

- No job exists with the given key.

##### GRPC_STATUS_INVALID_ARGUMENT

Returned if:

- Retries is not greater than 0.

## Technical error handling

In the documentation above, the documented errors are business logic errors.
These errors are a result of request processing logic, and not serialization, network, or
other more general errors. These error are described in this sections.

The gRPC API for Zeebe is exposed through an API gateway, which acts as a proxy
for the cluster. Generally, this means the clients execute a remote call on the gateway,
which is then translated to special binary protocol the gateway uses to
communicate with nodes in the cluster. The nodes in the cluster are called brokers.

Technical errors which occur between gateway and brokers (e.g. the gateway cannot deserialize the broker response,
the broker is unavailable, etc.) are reported to the client using the following error codes:

- `GRPC_STATUS_RESOURCE_EXHAUSTED`: When a broker receives more requests than it can handle, it signals back-pressure and rejects requests with this error code.
  - In this case, it is possible to retry the requests with an appropriate retry strategy.
  - If you receive many such errors within a small time period, it indicates the broker is constantly under high load.
  - It is recommended to reduce the rate of requests.
    When back-pressure is active, the broker may reject any request except _CompleteJob_ RPC and _FailJob_ RPC.
  - These requests are white-listed for back-pressure and are always accepted by the broker even if it is receiving requests above its limits.
- `GRPC_STATUS_UNAVAILABLE`: If the gateway itself is in an invalid state (e.g. out of memory).
- `GRPC_STATUS_INTERNAL`: For any other internal errors that occurred between the gateway and the broker.

This behavior applies to every request. In these cases, the client should retry
with an appropriate retry policy (e.g. a combination of exponential backoff or jitter wrapped
in a circuit breaker).

As the gRPC server/client is based on generated code, keep in mind that
any call made to the server can also return errors as described by the spec
[here](https://grpc.io/docs/guides/error.html#error-status-codes).
