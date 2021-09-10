---
id: implement-service-task
title: Implement a service task
description: "Let's implement a service task to connect workers."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Use [this process model](./bpmn/gettingstarted_quickstart_advanced.bpmn) for the tutorial.

<Tabs groupId="modeler" defaultValue="console" values={
[
{label: 'Console Modeler', value: 'console', },
{label: 'Camunda Modeler', value: 'desktop', },
]
}>

<TabItem value='console'>

Take the following steps:

1. Click **Import New Diagram** in the context menu to inject the BPMN-model you downloaded into the diagram.

![import](../../product-manuals/modeler/cloud-modeler/img/import-diagram.png)

![processId-cloud](./img/cloud-modeler-advanced-process-id.png)

This process includes a service task and an XOR gateway. 

2. Select the service task and fill in the properties. 
3. Set the **Type** to `test-worker`.

![process-cloud](./img/cloud-modeler-advanced.png)

4. Deploy the new process using the **Save & Deploy** option in the **Execute** menu.

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
