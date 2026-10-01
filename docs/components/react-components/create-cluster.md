---
---

To deploy and run your process, create a cluster in Camunda 8.

1. In **Camunda Hub**, under **Console > Clusters**, click **Create cluster**.
2. Name your cluster.
3. Select a region and backup location.
4. Select a cluster type and tag.
5. Select a channel and generation. For the purpose of this guide, Camunda recommends using the **Stable** channel and the latest generation.
6. Click **Create cluster**.

It will take a few moments to create your cluster. Check the status on the **Clusters** page or by clicking into the cluster itself and looking at the **Components** section.

:::tip
If **Create cluster** is disabled, consider these explanations:

- Your organization is on a trial plan, and you have already created a cluster. In this case, you cannot create another cluster, because only one cluster is included in the trial plan.
- Your billing reservations do not allow any more clusters. You must increase the [reservations](/components/hub/organization/manage-organization-settings/manage-plan/update-billing-reservations.md) to create more clusters. If you do not have the necessary rights, contact an admin or the owner of the organization.
  :::

If the cluster shows a status of at least **Creating**, you can start modeling. However, Zeebe must show a status of **Healthy** to properly deploy your model.
