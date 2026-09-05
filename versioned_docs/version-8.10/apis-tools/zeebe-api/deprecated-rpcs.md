---
id: deprecated-rpcs
title: "Deprecated RPCs"
slug: /apis-tools/zeebe-api/deprecated-rpcs
sidebar_position: 4
description: "The following RPCs are exposed by the gateway service, but have been deprecated."
---

The following RPCs are exposed by the gateway service, but have been deprecated.

## `DeployProcess` RPC

:::note
Deprecated since 8, replaced by [DeployResource RPC](#deployresource-rpc).
:::

:::note
When multi-tenancy is enabled, processes are always deployed to the `<default>` tenant.
:::

Deploys one or more processes to Zeebe. Note that this is an atomic call,
i.e. either all processes are deployed, or none of them are.

### Input: `DeployProcessRequest`

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

### Output: `DeployProcessResponse`

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

### Errors

#### GRPC_STATUS_INVALID_ARGUMENT

Returned if:

- No resources given.
- At least one resource is invalid. A resource is considered invalid if:
  - It is not a BPMN or YAML file (currently detected through the file extension).
  - The resource data is not deserializable (e.g. detected as BPMN, but it's broken XML).
  - The process is invalid (e.g. an event-based gateway has an outgoing sequence flow to a task.)
