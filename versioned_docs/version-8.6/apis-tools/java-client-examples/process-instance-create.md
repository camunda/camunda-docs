---
id: process-instance-create
title: "Create a process instance"
description: "Let's dive deeper into Zeebe and Java to create a process instance."
---

## Prerequisites

1. Run the Zeebe Broker with endpoint `localhost:26500` (default).
1. Run the [deploy a process example](process-deploy.md).

## ProcessInstanceCreator.java

[Source on GitHub](https://github.com/camunda-community-hub/camunda-8-examples/blob/main/zeebe-client-plain-java/src/main/java/io/camunda/zeebe/example/process/ProcessInstanceCreator.java)

```java
final ProcessInstanceEvent processInstanceEvent =
    client
        .newCreateInstanceCommand()
        .bpmnProcessId(bpmnProcessId)
        .latestVersion()
        .send()
        .join();
```
