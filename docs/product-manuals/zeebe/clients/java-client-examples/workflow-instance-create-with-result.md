---
id: workflow-instance-create-with-result
title: "Create a Workflow Instance and Await Result"
---


## Prerequisites

1. Running Zeebe broker with endpoint `localhost:26500` (default)
1. Run the [Deploy a Workflow example](workflow-deploy.md). Deploy [`demoProcessSingleTask.bpmn`](https://github.com/zeebe-io/zeebe/tree/develop/samples/src/main/resources/demoProcessSingleTask.bpmn) instead of `demoProcess.bpmn`

## WorkflowInstanceWithResultCreator.java

[Source on github](https://github.com/zeebe-io/zeebe/tree/develop/samples/src/main/java/io/zeebe/example/workflow/WorkflowInstanceWithResultCreator.java)

<!--
```java
{{#include ../../../../samples/src/main/java/io/zeebe/example/workflow/WorkflowInstanceWithResultCreator.java}}
```
-->
