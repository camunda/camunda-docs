---
---

To deploy and run your process, you must create a cluster in Camunda 8.

1. To create a cluster, navigate to **Console** by clicking the square-shaped icon labeled **Camunda components** in the top left corner, and click **Console**.
2. Click the **Clusters** tab, and click **Create new cluster**.
3. Name your cluster. For the purpose of this guide, we recommend using the **Stable** channel and the latest generation. Additionally, select your region. Click **Create cluster**.
4. Your cluster will take a few moments to create. Check the status on the **Clusters** page or by clicking into the cluster itself and looking at the **Applications** section.

Even while the cluster shows a status **Creating**, you can still proceed to begin modeling.

:::note
Zeebe must show a status of **Healthy** to properly deploy your model.
:::

## Development clusters

Starter plan users have one **development cluster**, with free execution for development, included in their plan.
Deployment and execution of models (process instances, decision instances, and task users) is provided at no cost.
Additional clusters can be purchased through your [billing reservations](/components/console/manage-plan/update-billing-reservations.md).

Visit the [clusters page](/components/concepts/clusters.md) to learn more about the differences between **development clusters** and **production clusters**.
