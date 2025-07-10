---
id: process-instance-cancel-batch
title: "Cancel process instance in a batch"
description: "Let's dive deeper into Zeebe and Java to cancel multiple process instances via a batch operation."
---

## Prerequisites

1. Run the Zeebe Broker with endpoint `localhost:26500` (default).
2. Run the [deploy a process example](process-deploy.md).
3. Run the [create a process instance example](process-instance-create.md) multiple times.

## CancelProcessInstanceBatchCreator.java

** TODO: Actually create the example in example repo (after first review)**
[Source on GitHub](https://github.com/camunda-community-hub/camunda-8-examples/blob/main/zeebe-client-plain-java/src/main/java/io/camunda/zeebe/example/process/ProcessInstanceCreator.java)

```java
final CreateBatchOperationResponse result =
    camundaClient
            .newCreateBatchOperationCommand()
            .processInstanceCancel()
            .filter(b -> b.processDefinitionId(bpmnProcessId))
            .send()
            .join();
```
