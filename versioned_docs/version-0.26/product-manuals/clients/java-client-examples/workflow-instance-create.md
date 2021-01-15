---
id: workflow-instance-create
title: "Create a workflow instance"
---

## Prerequisites

1. Running Zeebe broker with endpoint `localhost:26500` (default)
1. Run the [deploy a workflow example](workflow-deploy.md)

## WorkflowInstanceCreator.java

[Source on github](https://github.com/zeebe-io/zeebe/tree/develop/samples/src/main/java/io/zeebe/example/workflow/WorkflowInstanceCreator.java)

```java
final WorkflowInstanceEvent workflowInstanceEvent =
    client
        .newCreateInstanceCommand()
        .bpmnProcessId(bpmnProcessId)
        .latestVersion()
        .send()
        .join();
```
