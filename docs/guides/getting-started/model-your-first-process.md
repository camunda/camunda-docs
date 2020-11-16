---
id: model-your-first-process
title: Model your first Process
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

In Camunda Cloud you have two options how to design and deploy a workflow: the [Zeebe Modeler](https://github.com/zeebe-io/zeebe-modeler/releases) and the Console Modeler.
 

<Tabs groupId="modeler" defaultValue="console" values={
    [
        {label: 'Console Modeler', value: 'console', },
        {label: 'Zeebe Modeler', value: 'desktop', },
    ]
}>


<TabItem value='console'>
Using the Console Modeler, workflows can be designed and deploy and new instances can be created directly from the console. You can find all your already created models in the "BPMN Diagrams"-tab

![console-modeler](./img/cloud-modeler.png)

Just create a new diagram

![console-modeler-new-diagram](./img/cloud-modeler-new-diagram.png)

and give it a name


![console-modeler-new-diagram](./img/cloud-modeler-new-diagram-with-name.png)

The Save-Button should appear now.

</TabItem>


<TabItem value='desktop'>

Using the Zeebe Modeler, workflows can be designed and deployed and new instances can be created.

Design a simple workflow with one start event and one end event or download this [BPMN model](./bpmn/gettingstarted_quickstart.bpmn).

![zeebe-modeler](./img/zeebe-modeler.png)
</TabItem>
</Tabs>

