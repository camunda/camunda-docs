---
---

To deploy and run your process, you must create a cluster in Camunda 8.

1. To create a cluster, navigate to **Camunda Hub** by clicking the square-shaped icon labeled **Camunda components** in the top left corner, and click **Camunda Hub**.
2. Click the **Clusters** tab, and click **Create new cluster**.
3. Name your cluster. For the purpose of this guide, we recommend using the **Stable** channel and the latest generation. Additionally, select your region. Click **Create cluster**.
4. Your cluster will take a few moments to create. Check the status on the **Clusters** page or by clicking into the cluster itself and looking at the **Applications** section.

Even while the cluster shows a status **Creating**, you can still proceed to begin modeling.

:::note
Zeebe must show a status of **Healthy** to properly deploy your model.
:::

## Troubleshooting

If **Create new cluster** is disabled, consider these explanations:

- Your organization is on a trial plan and you have already created a cluster. In this case, you cannot create another cluster, because only one cluster is included in the trial plan.
- Your billing reservations do not allow any more clusters. You must increase the [reservations](/components/hub/organization/manage-organization-settings/manage-plan/update-billing-reservations.md) to create more clusters. If you do not have the necessary rights, contact an admin or the owner of the organization.
