---
id: process-deploy
title: "Deploy a process"
---

## Related resources

- [Process Basics](/product-manuals/concepts/processes.md)
- [BPMN Introduction](/reference/bpmn-processes/bpmn-primer.md)

## Prerequisites

1. Running Zeebe broker with endpoint `localhost:26500` (default)

## ProcessDeployer.java

[Source on GitHub](https://github.com/camunda-cloud/zeebe/tree/develop/samples/src/main/java/io/camunda/zeebe/example/process/ProcessDeployer.java)

```java
final DeploymentEvent deploymentEvent =
        client.newDeployCommand()
            .addResourceFromClasspath("demoProcess.bpmn")
            .send()
            .join();
```

## demoProcess.bpmn

[Source on GitHub](https://github.com/camunda-cloud/zeebe/tree/develop/samples/src/main/resources/demoProcess.bpmn)

Download the XML and save it in the Java classpath before running the example. Open the file with Camunda Modeler for a graphical representation.

<!--
```xml
{{#include ../../../../samples/src/main/resources/demoProcess.bpmn}}
```
-->
