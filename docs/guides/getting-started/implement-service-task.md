---
id: implement-service-task
title: Implement a Service Task
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Use [This workflow model](./bpmn/gettingstarted_quickstart_advanced.bpmn) for the tutorial.

![processId](./img/zeebe-modeler-advanced-process-id.png)

This workflow includes a Service Task and an XOR Gateway. Select the Service Task and fill in the properties. Set the task-type to 'test-worker'.

![workflow](./img/zeebe-modeler-advanced.png)

Deploy the new workflow. Now you can connect a worker for the configured service task:

<Tabs
defaultValue="cli"
values={[
{ label: 'CLI', value: 'cli', },
]
}>

<TabItem value="cli">

```bash
zbctl create worker test-worker --handler "echo {\"return\":\"Pong\"}"
```

</TabItem>

</Tabs>
