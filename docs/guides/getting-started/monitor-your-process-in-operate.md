---
id: monitor-your-process-in-operate
title: Monitor your Process in Operate
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Camunda Cloud offers Operate to monitor your process instances. An entry point can be found in the Cluster details.

![operate-dashboard](./img/operate-dashboard.png)

By selecting the deployed workflow you will see a list of instances that can be filtered:

![operate-instances](./img/operate-advanced-instances-pong.png)

Because [the started worker](./implement-service-task.md) returns

```json
{
  "return": "Pong"
}
```

the workflow ends in the upper end event.

Changing the worker to

<Tabs
defaultValue="cli"
values={[
{ label: 'CLI', value: 'cli', },
]
}>

<TabItem value="cli">

```bash
zbctl create worker test-worker --handler "echo {\"return\":\"...\"}"
```

</TabItem>

</Tabs>

and creating a new instance leads to a second instance in Operate, which you'll see ending in the second end event:

![operate-instance](./img/operate-advanced-instances-other.png)

As a next step you can now connect both workers in parallel and create more workflow instances:

<Tabs
defaultValue="cli"
values={[
{ label: 'CLI', value: 'cli', },
]
}>

<TabItem value="cli">

```bash
while true; do zbctl create instance camunda-cloud-quick-start-advanced; sleep 1; done
```

</TabItem>

</Tabs>

In Operate you will see instances ending in both end events depending on which worker picked up the job.

![operate-instances](./img/operate-advanced-instances.png)
