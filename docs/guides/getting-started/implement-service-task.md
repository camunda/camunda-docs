---
id: implement-service-task
title: Implement a service task
description: "Let's implement a service task to connect workers."
---
<span class="badge badge--beginner">Beginner</span>
<span class="badge badge--short">Time estimate: 8 minutes</span>

## Prerequisites

- Web Modeler or [Desktop Modeler](https://camunda.com/download/modeler/)

## Implement a service task

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Use [this process model](./bpmn/gettingstarted_quickstart_advanced.bpmn) for the tutorial.

<Tabs groupId="modeler" defaultValue="web" values={
[
{label: 'Web Modeler', value: 'web', },
{label: 'Desktop Modeler', value: 'desktop', },
]
}>

<TabItem value='web'>

Take the following steps:

1. In a Diagram, open the breadcrumb menu and choose **Replace via Upload** and then select a file from your machine
![import diagram via replace](../../components/modeler/web-modeler/img/import-diagram/web-modeler-replace-via-upload-menu-item.png)

2. Alternatively, you can drag and drop the file onto the canvas
![import diagram via drag and drop](../../components/modeler/web-modeler/img/import-diagram/web-modeler-diagram-replace-via-drag-and-drop.png)
![processId-cloud](./img/web-modeler-advanced-process-id.png)

This process includes a service task and an XOR gateway. 

2. Select the service task and fill in the properties. 
3. Set the **Type** to `test-worker`.

![process-cloud](./img/web-modeler-advanced.png)

4. Deploy the new process using the **Deploy Diagram** button.

5. Make sure you have [created a client](./setup-client-connection-credentials.md) and [connected a cluster](connect-to-your-cluster.md).

</TabItem>

<TabItem value='desktop'>

![processId](./img/zeebe-modeler-advanced-process-id.png)

6. This process includes a service task and an XOR gateway. Select the service task and fill in the properties.
7. Set the **Type** to `test-worker`.

![process](./img/zeebe-modeler-advanced.png)

8. Deploy the new process.

</TabItem>
</Tabs>

Now, you can connect a worker for the configured service task:

```bash
zbctl create worker test-worker --handler "echo {\"return\":\"Pong\"}"
```

## Next steps

- [Implement a decision gateway](implement-decision-gateway.md)