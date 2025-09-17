---
---

To interact with your Camunda 8 cluster, you'll use the Camunda client. First, you'll need to create credentials.

1. The main page for Console should be open on another tab. Use Console to navigate to your clusters either through the navigation **Clusters** or by using the section under **View all** on the **Clusters** section of the main dashboard. Click on your existing cluster. This will open the **Overview** for your cluster, where you can find your **region Id** and **cluster Id** (in your client credentials under the **API** tab within your cluster). You will need this information later when creating a worker in the next section.
   :::note
   If your account is new, you should have a cluster already available. If no cluster is available, or you’d like to create a new one, click **Create New Cluster**.
   :::
2. Navigate to the **API** tab. Click **Create**.
3. Provide a descriptive name for your client like `microservice-worker`. For this tutorial, the scope must be the Orchestration Cluster scope. Click **Create**.
4. Your client credentials can be copied or downloaded at this point. You will need your client ID and your client secret when creating a worker in the next section, so keep this window open. Once you close or navigate away from this screen, you will not be able to see them again.
