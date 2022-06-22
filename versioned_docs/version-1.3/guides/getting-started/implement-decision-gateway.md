---
id: implement-decision-gateway
title: Implement a decision gateway
description: "Using the JSON object, let's route your process."
---
<span class="badge badge--beginner">Beginner</span>
<span class="badge badge--short">Time estimate: 5 minutes</span>

## Prerequisites

- Web Modeler or [Desktop Modeler](https://camunda.com/download/modeler/)

## Implement a decision gateway

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

In [the last section](./implement-service-task.md), we connected a worker that will return a JSON object, which is used to decide which path to take in the process. Now, we can use the JSON object to route your process by filling in the condition expression on the two sequence flows after the XOR gateway.

Use the following conditional expression for the "Pong" sequence flow:

```bash
= return = "Pong"
```

And for the else sequence flow:

```bash
= return != "Pong"
```

<Tabs groupId="modeler" defaultValue="web" values={
    [
        {label: 'Web Modeler', value: 'web', },
        {label: 'Desktop Modeler', value: 'desktop', },
    ]
}>

<TabItem value='web'>

![sequenceflows-cloud](./img/web-modeler-advanced-sequence-flows.png)

</TabItem>

<TabItem value='desktop'>

![sequenceflows](./img/zeebe-modeler-advanced-sequence-flows.png)

</TabItem>
</Tabs>

Deploy the updated process again so the specified decisions in the gateway are used.

## Next steps

- [Monitor your process in Operate](monitor-your-process-in-operate.md)
- [Camunda Operate](/self-managed/operate-deployment/install-and-start.md)