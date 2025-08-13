---
id: run-admin-update
title: "Run update"
description: "High-level administrator checklist for executing a Camunda 8.8 update."
---

import DocCardList from '@theme/DocCardList';

# Run the update

This page guides **platform administrators** through the _execution phase_ of an update to **Camunda 8.8 Self-Managed**.  
It assumes you have completed all steps in [**Prepare for update**](./prepare-for-update.md) and that you have:

- A tested backup and rollback plan
- A confirmed maintenance window
- A defined deployment method (Helm chart or Docker images)

> For detailed command-line instructions, refer to the technical guides linked below.

## Step 1 – Confirm prerequisites

- ✅ Test environment updated without errors
- ✅ Backups validated
- ✅ Required secrets exported (Operate, Tasklist, Identity, etc.)
- ✅ Team responsibilities and runbooks shared

## Step 2 – Run the update with Helm

### Helm chart upgrade

If you are using Kubernetes with the Camunda Helm chart, follow the dedicated update instructions:

<DocCardList items={[{type:"link", href:"/docs/next/self-managed/installation-methods/helm/upgrade/upgrade-hc-870-880/", label: "Helm chart upgrade: 8.7 to 8.8", docId:"self-managed/installation-methods/helm/upgrade/upgrade-hc-870-880"}
]}/>

The Helm guide covers update options, handling of secrets, and monitoring of migration jobs.  
If you are creating your own deployment scripts, you can use the official Helm charts as a reference or technical specification.  
You may also want to review the [component-level upgrade procedures](../../components/components-upgrade/870-to-880.md) for details on how each individual component is getting updates.

:::info Docker Compose
Camunda-provided Docker Compose files are only intended for development and testing purposes, and they should never be used for production environments. Docker Compose lacks the capabilities required for a production-ready system, such as automated migration job handling, high availability, failover support, scalable persistent storage management, and robust secret management with rotation.

Because of these limitations, Camunda does not supply automated migration scripts for Docker Compose setups. If you still need to update a development environment, you can follow the [Component upgrade guides](../../components/components-upgrade/) to manually update each service.

For production deployments, we recommend either using Kubernetes with the official Camunda Helm chart or creating a custom deployment process with Infrastructure as Code tools such as Terraform, Ansible, or AWS CloudFormation.
:::

## Step 3 – Validate platform health

After a successful upgrade:

- Confirm pod readiness and Helm release status.
- Verify component versions via Operate.
- Run your post-update validation suite.  
  _(Add link to validation steps if available.)_

## Step 4 – Perform post-update tasks

- Notify application teams that the platform is ready.
- Monitor resource usage and error rates for 24–48 hours.
- Document lessons learned and close the change ticket.

## Next steps

After completing the platform update:

1. **Monitor platform stability** during the application rollout phase.
2. **Support development teams** with any application deployment issues.
3. **Update monitoring and alerting** to reflect Camunda 8.8 changes.
4. **Document lessons learned** and refine internal procedures.
5. **Plan your next update cycle** using a similar approach.
6. **Clean up backups** in line with your retention policy.

## Additional resources

- **[Helm chart upgrade guide: 8.7 → 8.8](../../installation-methods/helm/upgrade/helm-870-880.md)** – Full step-by-step Helm upgrade guide
- **[Collecting diagnostics](../../installation-methods/helm/operational-tasks/diagnostics.md)** – How to gather troubleshooting data
- **[Backup and restore guide](../../operational-guides/backup-restore/backup-and-restore.md)** – Recommended backup workflows
- **[Troubleshooting guides](../../operational-guides/troubleshooting.md)** – Common issues and resolution steps
- **[Supported environments matrix](../../../reference/supported-environments.md)** – Compatibility details for components and infrastructure
