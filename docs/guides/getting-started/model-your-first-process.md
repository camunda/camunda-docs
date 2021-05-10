---
id: model-your-first-process
title: Model your first process
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

In Camunda Cloud you have two options to design and deploy a process: the Console Modeler and the [Camunda Modeler](https://camunda.com/download/modeler/).

<Tabs groupId="modeler" defaultValue="console" values={
[
{label: 'Console Modeler', value: 'console', },
{label: 'Camunda Modeler', value: 'desktop', },
]
}>

<TabItem value='console'>

Using the Console Modeler, processes can be designed and deployed, and new instances can be created directly from the console.

You can find all your saved models under the **BPMN Diagrams** tab

Click **Create New Diagram**.

![console-modeler](../../product-manuals/modeler/cloud-modeler/img/bpmn-diagrams-overview.png)

Give your diagram a name like `Getting Started`.

![console-modeler-new-diagram](../../product-manuals/modeler/cloud-modeler/img/cloud-modeler-new-diagram.png)

The **Save** button should now appear for you to save your diagram.

![console-modeler-new-diagram](../../product-manuals/modeler/cloud-modeler/img/cloud-modeler-new-diagram-with-name.png)

</TabItem>

<TabItem value='desktop'>

Using the Camunda Modeler, processes can be designed and deployed, and new instances can be created.

Design a simple process with one start event and one end event or download this [BPMN model](./bpmn/gettingstarted_quickstart.bpmn).

![zeebe-modeler](./img/zeebe-modeler.png)
</TabItem>
</Tabs>
