---
id: start-instance
title: Start a new process instance
---

If a BPMN diagram was deployed via the Cloud Modeler you can start a new instance of this diagram. To do so, click **Start Instance** in the **Deployment** menue.

![start instance](img/start-process-instance-variables.png)

You can also specify variables that are written to the process context at startup. The variables must be formatted in valid JSON. As an example you can use the following JSON:

```json
{
  "hello": "world"
}
```
