---
id: workflow-instance-create-with-result
title: "Create a workflow instance with results"
---

## Prerequisites

1. Running Zeebe broker with endpoint `localhost:26500` (default)
1. Run the [deploy a workflow example](workflow-deploy.md). Deploy [`demoProcessSingleTask.bpmn`](https://github.com/zeebe-io/zeebe/tree/develop/samples/src/main/resources/demoProcessSingleTask.bpmn) instead of `demoProcess.bpmn`

## WorkflowInstanceWithResultCreator.java

[Source on github](https://github.com/zeebe-io/zeebe/tree/develop/samples/src/main/java/io/zeebe/example/workflow/WorkflowInstanceWithResultCreator.java)

```java
final WorkflowInstanceResult workflowInstanceResult =
    client
        .newCreateInstanceCommand()
        .bpmnProcessId(bpmnProcessId)
        .latestVersion()
        .withResult() // to await the completion of workflow execution and return result
        .send()
        .join();

System.out.println(
    "Workflow instance created with key: "
        + workflowInstanceResult.getWorkflowInstanceKey()
        + " and completed with results: "
        + workflowInstanceResult.getVariables());
```
