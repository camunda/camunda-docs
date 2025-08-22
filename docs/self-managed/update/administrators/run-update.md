---
id: run-admin-upgrade
title: "Perform an upgrade"
description: "Administrator checklist for executing a Camunda 8.8 Self-Managed upgrade."
---

import DocCardList from '@theme/DocCardList';
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Learn how to perform a successful upgrade to Camunda 8.8 for Camunda 8.8 Self-Managed.

## About performing an upgrade

This guide assumes you have completed all steps in [prepare for upgrade](./prepare-for-update.md) and that you have:

- A tested backup and rollback plan.
- A confirmed maintenance window.
- A defined deployment method (Helm chart or Docker images).

:::note
For detailed command-line instructions, refer to the technical guides linked below.
:::

## Step 1: Confirm prerequisites

First, confirm you have completed the following prerequisites:

| Prerequisite       | Description                                                                           |
| :----------------- | :------------------------------------------------------------------------------------ |
| Test environment   | Test environment updated without errors.                                              |
| Backups            | Backups created and validated.                                                        |
| Secrets            | Required secrets are exported (for example, Operate, Tasklist, Identity, and so on.). |
| Team co-ordination | Team responsibilities and runbooks are shared.                                        |

## Step 2: Perform upgrade

Perform an upgrade as follows.

<Tabs groupId="helm" defaultValue="helm" queryString values={
[
{label: 'Helm chart', value: 'helm', },
{label: 'Docker', value: 'docker', },
]
}>

<TabItem value='helm'>

### Helm chart

If you are using Kubernetes with the Camunda Helm chart, follow the [Helm chart upgrade guide for 8.7 to 8.8](/docs/self-managed/installation-methods/helm/upgrade/helm-870-880.md).

- The Helm chart upgrade guide covers update options, handling of secrets, and monitoring of migration jobs.
- If you are creating your own deployment scripts, you can use the official Helm charts as a reference or technical specification.
- You might also want to review the [component-level upgrade procedures](../../components/components-upgrade/870-to-880.md) for details on how each individual component is getting updates.

</TabItem>

<TabItem value='docker'>

### Docker

:::info Docker Compose
Camunda-provided Docker Compose files are only intended for development and testing purposes, and they should never be used for production environments. Docker Compose lacks the capabilities required for a production-ready system, such as automated migration job handling, high availability, failover support, scalable persistent storage management, and robust secret management with rotation.

Because of these limitations, Camunda does not supply automated migration scripts for Docker Compose setups. If you still need to update a development environment, you can follow the [Component upgrade guides](../../components/components-upgrade/870-to-880.md) to manually update each service.
:::

For production deployments, we recommend either using Kubernetes with the official Camunda Helm chart or creating a custom deployment process with Infrastructure as Code tools such as Terraform, Ansible, or AWS CloudFormation.

</TabItem>
</Tabs>

## Step 3: Validate platform health

After a successful upgrade has been performed:

- Confirm pod readiness and Helm release status.
- Verify component versions via Operate.
- Run your post-update validation suite.

## Step 4: Perform post-update tasks

Once validation is complete, perform the following additional tasks:

- Notify application teams that the platform is ready.
- Monitor resource usage and error rates for 24–48 hours.
- Document lessons learned and close the change ticket.

## Next steps

After completing the upgrade to 8.8, you should:

1. **Monitor platform stability** during the application rollout phase.
2. **Support development teams** with any application deployment issues.
3. **Update monitoring and alerting** to reflect Camunda 8.8 changes.
4. **Document lessons learned** and refine internal procedures.
5. **Plan your next update cycle** using a similar approach.
6. **Clean up backups** in line with your retention policy.

## Useful resources

- [Helm chart upgrade guide: 8.7 → 8.8](../../installation-methods/helm/upgrade/helm-870-880.md): Full step-by-step Helm upgrade guide.
- [Collecting diagnostics](../../installation-methods/helm/operational-tasks/diagnostics.md): How to gather troubleshooting data.
- [Backup and restore guide](../../operational-guides/backup-restore/backup-and-restore.md): Recommended backup workflows.
- [Troubleshooting guides](../../operational-guides/troubleshooting.md): Common issues and resolution steps.
- [Supported environments matrix](../../../reference/supported-environments.md): Compatibility details for components and infrastructure.
