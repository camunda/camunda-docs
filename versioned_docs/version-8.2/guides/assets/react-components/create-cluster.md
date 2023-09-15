---
---

To deploy and run your process, you must create a cluster in Camunda 8.

1. To create a cluster, navigate to **Console**, click the **Clusters** tab, and click **Create new Cluster**.
2. Name your cluster. For the purpose of this guide, we recommend using the **Stable** channel and the latest generation. Additionally, select your region. Click **Create cluster**.
3. Your cluster will take a few moments to create. Check the status on the **Clusters** page or by clicking into the cluster itself and looking at the **Applications** section.

Even while the cluster shows a status **Creating**, you can still proceed to begin modeling.

:::note
Zeebe must show a status of **Healthy** to properly deploy your model.
:::

## Development clusters

Professional Plan users have the option to create **development clusters** offering free execution for development. This must be enabled through your [billing reservations](/components/console/manage-plan/update-billing-reservations.md).

Visit the [clusters page](/components/concepts/clusters.md) to learn more about the differences between **development clusters** and **production clusters**.
