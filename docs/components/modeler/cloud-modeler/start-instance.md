---
id: start-instance
title: Start a new process instance
description: "If a BPMN diagram is deployed via Cloud Modeler, you can start a new instance of this diagram."
---

If a BPMN diagram is deployed via Cloud Modeler, you can start a new instance of this diagram.

To do so, click **Start Instance** in the context menu.

![start instance](img/start-process-instance-variables.png)

You can also specify variables written to the process context at startup. The variables must be formatted in valid JSON. As an example, you can use the following JSON:

```json
{
  "hello": "world"
}
```
