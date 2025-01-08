---
id: remote-debugging
title: "Remote debugging"
description: "Learn about how to remotely debug Camunda 8 components"
---

One of the advantages of working in a local environment is to gain the ability to use an IDE and set breakpoints to debug your code. However, sometimes you deployed your code onto a server, inside a docker image, or in a kubernetes cluster. In these scenarios, you can still use remote debugging to debug your code.

## Remote debugging

Follow the steps on this page to create a run configuration for remote debugging:
https://www.jetbrains.com/help/idea/tutorial-remote-debug.html#create-run-configurations

According to:
https://www.jetbrains.com/help/idea/tutorial-remote-debug.html#create-run-configurations

to enable remote debugging, the java application must add the following startup arguments:

```bash
-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005
```

### C8Run

In C8Run, you can enable remote debugging by setting the `JAVA_OPTS` environment variable,

```bash
export JAVA_OPTS="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005"
```

and then start c8run normally.

### Kubernetes

### Docker
