---
id: deploy-your-process-and-start-process-instance
title: Deploy and start your process instance
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<Tabs groupId="modeler" defaultValue="console" values={
[
{label: 'Cloud Modeler', value: 'console', },
{label: 'Zeebe Modeler', value: 'desktop', },
]
}>

<TabItem value='console'>

You can now use the **Save & Deploy** option in the **Deployment** menu to deploy the newly created process to your cluster.

![console-modeler-deploy](../../product-manuals/modeler/cloud-modeler/img/save-and-deploy.png)

Deployment can take a few seconds, but you should get a confirmation for successful deployment.

![console-modeler-deploy-successfull](../../product-manuals/modeler/cloud-modeler/img/save-and-deploy-successful.png)

You can now start a new process instance. For this example you can just start an instance with an empty payload.

![console-modeler-start-instance](../../product-manuals/modeler/cloud-modeler/img/start-process-instance-variables.png)

Once the instance is started, you'll get a confirmation with a link to open Operate.

![console-modeler-start-instance-done](../../product-manuals/modeler/cloud-modeler/img/start-process-instance-done.png)

</TabItem>

<TabItem value='desktop'>

On the right side of the navigation menu there are buttons for deploying and starting processes.

![zeebe-modeler-deploy](./img/zeebe-modeler-deploy.png)

In the deployment dialog, the connection information must now be specified: `Cluster Id`, `Client Id` and `Client Secret`.

`Client Id` and `Cluster Id` can be retrieved by clicking on **View** on the client in the **API** tab.

![cluster-details-created-client-view](./img/cluster-details-created-client-view.png)

The `Client Secret` can be retrieved from the downloaded connection file:

```bash
grep SECRET  ~/Downloads/CamundaCloudMgmtAPI-Client-test-client.txt
export ZEEBE_CLIENT_SECRET='zbzsZI_6UnCsH_CIo0lNUN8qGyvLJr9VrH77ewNm8Oq3elvhPvV7g.QmJGydzOLo'
```

Click **Deploy** to deploy the process. Use **Play** from the navigation to start a new instance.

</TabItem>
</Tabs>
