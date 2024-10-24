---
id: process-instance-create-with-result
title: "Create a process instance with results"
description: "Let's analyze the prerequisites and code to create a process instance with real results."
---

## Prerequisites

1. Run the Zeebe Broker with endpoint `localhost:26500` (default).
1. Run the [deploy a process example](process-deploy.md). Deploy [`demoProcessSingleTask.bpmn`](https://github.com/camunda-community-hub/camunda-8-examples/blob/main/zeebe-client-plain-java/src/main/resources/demoProcessSingleTask.bpmn) instead of `demoProcess.bpmn`.

## ProcessInstanceWithResultCreator.java

[Source on GitHub](https://github.com/camunda-community-hub/camunda-8-examples/blob/main/zeebe-client-plain-java/src/main/java/io/camunda/zeebe/example/process/ProcessInstanceWithResultCreator.java)

```java
final ProcessInstanceResult processInstanceResult =
    client
        .newCreateInstanceCommand()
        .bpmnProcessId(bpmnProcessId)
        .latestVersion()
        .withResult() // to await the completion of process execution and return result
        .send()
        .join();

System.out.println(
    "Process instance created with key: "
        + processInstanceResult.getProcessInstanceKey()
        + " and completed with results: "
        + processInstanceResult.getVariables());
```
