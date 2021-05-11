---
id: process-instance-create
title: "Create a process instance"
---

## Prerequisites

1. Running Zeebe broker with endpoint `localhost:26500` (default)
1. Run the [deploy a process example](process-deploy.md)

## ProcessInstanceCreator.java

[Source on github](https://github.com/zeebe-io/zeebe/tree/develop/samples/src/main/java/io/zeebe/example/process/ProcessInstanceCreator.java)

```java
final ProcessInstanceEvent processInstanceEvent =
    client
        .newCreateInstanceCommand()
        .bpmnProcessId(bpmnProcessId)
        .latestVersion()
        .send()
        .join();
```
