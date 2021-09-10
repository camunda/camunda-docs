---
id: workflow-instance-create-nonblocking
title: "Create non-blocking workflow instances"
---

## Prerequisites

1. Running Zeebe broker with endpoint `localhost:26500` (default)
1. Run the [deploy a workflow example](workflow-deploy.md)

## NonBlockingWorkflowInstanceCreator.java

[Source on github](https://github.com/zeebe-io/zeebe/tree/develop/samples/src/main/java/io/zeebe/example/workflow/NonBlockingWorkflowInstanceCreator.java)

```java
long instancesCreating = 0;

while (instancesCreating < numberOfInstances) {
    // this is non-blocking/async => returns a future
    final ZeebeFuture<WorkflowInstanceEvent> future =
        client.newCreateInstanceCommand().bpmnProcessId(bpmnProcessId).latestVersion().send();

    // could put the future somewhere and eventually wait for its completion

    instancesCreating++;
}
```
