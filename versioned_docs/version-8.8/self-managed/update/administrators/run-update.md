---
id: run-admin-upgrade
title: "Perform an upgrade"
description: "Administrator checklist for executing a Camunda 8.8 Self-Managed upgrade."
---

import DocCardList from '@theme/DocCardList';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide describes how to perform a Camunda 8.8 Self-Managed upgrade. Ensure you have completed all steps in [Prepare for upgrade](./prepare-for-update.md) before continuing.

## Step 1: Confirm prerequisites

Confirm you have completed the following prerequisites:

| Prerequisite     | Description                                                                                                                                                                         |
| :--------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Backups          | Create and verify backups. Test restoring backups to ensure data integrity. See [backup and restore](../../../self-managed/operational-guides/backup-restore/backup-and-restore.md) |
| Test 8.8 cluster | Deploy a new Camunda 8.8 cluster with your configuration, to test and validate your target configuration.                                                                           |
| Test upgrade     | Confirm that the upgrade runs successfully in a non‑production environment that mirrors your production cluster.                                                                    |

## Step 2: Perform upgrade

Perform an upgrade as follows.

<Tabs groupId="installation" defaultValue="helm" queryString values={
[
{label: 'Helm chart', value: 'helm', },
{label: 'Docker Compose', value: 'docker', },
]
}>

<TabItem value='helm'>

### Helm chart

To upgrade with Helm, see the [Helm chart upgrade guide for 8.7 to 8.8](/self-managed/deployment/helm/upgrade/helm-870-880.md) for detailed instructions.
The guide covers update options, secret handling, migration job monitoring, and other upgrade tasks.

:::info
**Important:** Upgrade to the latest 8.7 patch before moving to 8.8. Confirm your Helm chart and Helm CLI versions are compatible with 8.8, and review your values file for deprecated keys.
:::

:::note
If you maintain custom deployment scripts, use the official Helm charts as a technical reference.
:::

</TabItem>
<TabItem value='docker'>

### Docker Compose

Camunda-provided Docker Compose files are only intended for development and testing purposes, and **are not recommended for production environments**. Docker Compose lacks the capabilities required for a production-ready system, such as automated migration job handling, high availability, failover support, scalable persistent storage management, and robust secret management with rotation.

With Camunda 8.8, the default `docker-compose.yaml` file now deploys Orchestration cluster and connectors inline with the chart default configuration. To deploy Web Modeler, you should use other Docker Compose configuration examples.

Because of these limitations, Camunda does not supply automated migration scripts for Docker Compose setups. If you still need to update a development environment, you can follow the [Component upgrade guides](../../components/components-upgrade/870-to-880.md) to manually update each service.

For production deployments, we recommend either using Kubernetes with the official Camunda Helm chart or creating a custom deployment process with Infrastructure as Code tools such as Terraform, Ansible, or AWS CloudFormation.

Manual upgrades involve multiple steps. In addition to updating container images, running migration jobs, you must also follow the component‑specific tasks listed in the component upgrade guide. Because of this complexity, it’s generally easier to migrate development environments to Kubernetes using the Helm charts, especially if you expect to upgrade frequently.

</TabItem>
</Tabs>

## Next steps

After completing the upgrade to 8.8, you should:

1. **Monitor cluster health and application stability** during the application rollout phase.
2. **Update monitoring dashboards and alerts for Camunda 8.8** to reflect Camunda 8.8 changes.
3. **Document lessons learned** and refine internal procedures.
4. **Plan your next update cycle** using a similar approach.
5. **Clean up backups** in line with your retention policy.

## Useful resources

- [Helm chart upgrade guide: 8.7 to 8.8](../../deployment/helm/upgrade/helm-870-880.md): Full step-by-step Helm upgrade guide.
- [Collecting diagnostics](../../deployment/helm/operational-tasks/diagnostics.md): How to gather troubleshooting data.
- [Backup and restore guide](../../operational-guides/backup-restore/backup-and-restore.md): Recommended backup workflows.
- [Troubleshooting guides](../../operational-guides/troubleshooting.md): Common issues and resolution steps.
- [Supported environments matrix](../../../reference/supported-environments.md): Compatibility details for components and infrastructure.
