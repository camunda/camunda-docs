---
id: deploy-your-process-and-start-process-instance
title: Deploy your process and start a process instance
---


import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<Tabs groupId="modeler" defaultValue="console" values={
    [
        {label: 'Console Modeler', value: 'console', },
        {label: 'Zeebe Modeler', value: 'desktop', },
    ]
}>


<TabItem value='console'>

You can now use the "Save & Deploy" button to deploy the newly created process to your cluster

![console-modeler-deploy](./img/cloud-modeler-deploy.png)

Deployment can take some seconds but you should get a confirmation for the successfull deployment.

![console-modeler-deploy-successfull](./img/cloud-modeler-deploy-successfull.png)

You can now start a new process instance. For this example you can just start an instance with an empty payload.

![console-modeler-start-instance](./img/cloud-modeler-start-instance.png)

Once the instance is started you get a confirmation with a link to jump into operate directly.

![console-modeler-start-instance-done](./img/cloud-modeler-start-instance-done.png)


</TabItem>


<TabItem value='desktop'>

On the right side of the navigation menu there are buttons for deploying and starting workflows.

![zeebe-modeler-deploy](./img/zeebe-modeler-deploy.png)

In the deployment dialog, the connection information must now be specified: ClusterId, ClientId and ClientSecret. Click Deploy to **deploy** the workflow now. Use the Play button from the navigation to **start a new instance**.

</TabItem>
</Tabs>