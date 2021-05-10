---
id: implement-service-task
title: Implement a service task
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Use [this process model](./bpmn/gettingstarted_quickstart_advanced.bpmn) for the tutorial.

<Tabs groupId="modeler" defaultValue="console" values={
[
{label: 'Console Modeler', value: 'console', },
{label: 'Zeebe Modeler', value: 'desktop', },
]
}>

<TabItem value='console'>

Click **Import New Diagram** in the context menu to inject the BPMN-model you just downloaded into the diagram.

![import](../../product-manuals/modeler/cloud-modeler/img/import-diagram.png)

![processId-cloud](./img/cloud-modeler-advanced-process-id.png)

This process includes a service task and an XOR gateway. Select the service task and fill in the properties. Set the **Type** to `test-worker`.

![process-cloud](./img/cloud-modeler-advanced.png)

Deploy the new process using the **Save & Deploy** option in the **Deployment** menu.

Make sure you have [created a client](./setup-client-connection-credentials.md) and [connected a cluster](connect-to-your-cluster.md).

</TabItem>

<TabItem value='desktop'>

![processId](./img/zeebe-modeler-advanced-process-id.png)

This process includes a service task and an XOR gateway. Select the service task and fill in the properties. Set the **Type** to `test-worker`.

![process](./img/zeebe-modeler-advanced.png)

Deploy the new process.

</TabItem>
</Tabs>

Now you can connect a worker for the configured service task:

```bash
zbctl create worker test-worker --handler "echo {\"return\":\"Pong\"}"
```
