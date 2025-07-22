---
id: run-admin-update
title: "Run update"
description: "High-level administrator checklist for executing a Camunda 8.8 update."
---

import DocCardList from '@theme/DocCardList';

# Run the update

This page guides **platform administrators** through the *execution* phase of an update to **Camunda 8.8 Self-Managed**.  
It assumes you have completed all tasks in **[Prepare for update](./prepare-for-update.md)** and have:

- A tested backup and rollback plan  
- A confirmed maintenance window  
- An agreed deployment method (Helm chart or Docker images)

> For full command-level instructions, see the dedicated guides linked below.

## Step 1 — Confirm prerequisites

- ✅ Test environment updated without errors  
- ✅ Backups verified  
- ✅ Required secrets exported (Operate, Tasklist, Identity, …)  
- ✅ Team roles and run-books shared


## Step 2 — Choose your execution path

### Helm chart upgrade


For Kubernetes deployments using the Camunda Helm chart, follow the dedicated technical update guide:

<DocCardList items={[{type:"link", href:"/docs/next/self-managed/installation-methods/helm/upgrade/upgrade-hc-870-880/", label: "Helm chart Upgrade: 8.7 to 8.8", docId:"self-managed/installation-methods/helm/upgrade/upgrade-hc-870-880"}
]}/>

Consult the Helm guide for options, secret handling, and migration-job monitoring.

### Docker images

Make sure to download latest images. Use the following link for [Air-Gapped environments](../../installation-methods/helm/configure/air-gapped-installation).

For production deployments using Docker images:

:::info Docker vs Docker Compose
Docker images are supported for production usage on Linux systems. Camunda provided Docker Compose files are designed for development environments only and should not be used in production. For production, we recommend to use Kubernetes or develop your own customer deployment procedure with one of the Infrastructure as Code systems (i.e., Terraform, Ansible, Cloud Formation and etc.).
:::

## Step 3 — Run the update with Helm

```bash
# Pull latest chart metadata
helm repo update

# Execute upgrade (values.yaml contains your secrets & overrides)
helm upgrade camunda-platform camunda/camunda-platform \
  --version 13.0.1 \
  --values upgrade-880-values.yaml \
  --namespace camunda
```

## Step 4 — Validate platform health

After the upgrade succeeds:

- Check pod readiness and Helm release status.
- Verify component versions via Operate.
- Run your post‑update validation suite (link below).

See [Validate the platform](../../installation-methods/helm/upgrade/upgrade-hc-870-880/) after an update for step‑by‑step checks.

## Step 5 — Post‑update tasks

- Alert application teams that the platform is ready.
- Monitor resource usage and error rates for 24–48 hours.
- Document lessons learned and close the change ticket.

## Next steps

After successful platform update completion:

1. **Monitor platform stability** during application update phase
2. **Support development teams** with application deployment issues
3. **Update monitoring** and alerting configurations for 8.8
4. **Document lessons learned** and update procedures
5. **Plan next update cycle** following similar procedures
6. **Clean up backups** according to retention policies

## Additional resources

- **[Helm chart upgrade guide: 8.7 → 8.8](../../installation-methods/helm/upgrade/upgrade-hc-870-880/)** – Detailed technical steps
- **[Collecting diagnostics](../../installation-methods/helm/operational-tasks/diagnostics.md)** – Gathering troubleshooting data
- **[Backup and restore guide](../../operational-guides/backup-restore/backup-and-restore/)** – Comprehensive backup procedures
- **[Troubleshooting guides](../../operational-guides/troubleshooting/troubleshooting/)** – Issue‑resolution references
- **[Supported environments matrix](../../../reference/supported-environments/)** – Component and infrastructure compatibility
