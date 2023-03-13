---
id: workflow-deploy
title: "Deploy a Workflow"
description: "Step through additional resources, prerequisites, the workflow developer, and a demo process."
---

## Related Resources

* [Workflow Basics](../../basics/workflows.md)
* [BPMN Introduction](../../bpmn-workflows/bpmn-primer.md)

## Prerequisites

1. Running Zeebe broker with endpoint `localhost:26500` (default)

## WorkflowDeployer.java

[Source on github](https://github.com/zeebe-io/zeebe/tree/develop/samples/src/main/java/io/zeebe/example/workflow/WorkflowDeployer.java)

<!--
```java
{{#include ../../../../samples/src/main/java/io/zeebe/example/workflow/WorkflowDeployer.java}}
```
-->

## demoProcess.bpmn

[Source on github](https://github.com/zeebe-io/zeebe/tree/develop/samples/src/main/resources/demoProcess.bpmn)

Download the XML and save it in the Java classpath before running the example. Open the file with Zeebe Modeler for a graphical representation.

<!--
```xml
{{#include ../../../../samples/src/main/resources/demoProcess.bpmn}}
```
-->