---
id: process-instance-cancel-batch
title: "Cancel process instance in a batch"
description: "Let's dive deeper into Zeebe and Java to cancel multiple process instances via a batch operation."
---

## Prerequisites

1. Run the Zeebe broker with endpoint `localhost:26500` (default).
2. Run the [deploy a process](process-deploy.md) example.
3. Run the [create a process instance](process-instance-create.md) example multiple times.

## CancelProcessInstanceBatchCreator.java

<!-- :::note
**TODO:** Create the example in the example repo when the example repo is using camunda-client instead of zeebe-client.

[Source on GitHub](https://github.com/camunda-community-hub/camunda-8-examples/blob/main/zeebe-client-plain-java/src/main/java/io/camunda/zeebe/example/process/ProcessInstanceCreator.java)
::: -->

This example demonstrates how to cancel multiple process instances using a batch operation in Zeebe. The batch operation is applied to all active root process instances matching the given filter object:

```java
final CreateBatchOperationResponse result =
    camundaClient
            .newCreateBatchOperationCommand()
            .processInstanceCancel()
            .filter(b -> b.processDefinitionId(bpmnProcessId))
            .send()
            .join();
```
