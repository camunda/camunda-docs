---
id: restore-scenarios
title: Restore scenarios
description: "Use practical restore playbooks for common SaaS recovery situations."
---

<span class="badge badge--enterprise-only">Camunda Enterprise</span>

Use these scenarios to standardize how your team runs restore operations in SaaS.

:::note Related pages

- [Backup and restore overview](./backup-restore-overview.md)
- [Restore a cluster from backup](./how-to-restore.md)
- [Restore troubleshooting](./restore-troubleshooting.md)

:::

## Recover from data corruption

Use this when cluster data is inconsistent after an operational incident.

### Steps

1. Identify the last known-good backup.
2. Confirm the backup is in `Completed` state.
3. Start restore from Console.
4. Wait for cluster to return to healthy state.
5. Validate process execution and key business variables in Operate.

### Verification checklist

- New process instances can start.
- Existing process data is readable.
- No restore error notification remains.

## Roll back after a failed change

Use this when a recent change caused severe impact and you need to return to a known-good state quickly.

### Steps

1. Select the backup created before the failed change.
2. Start restore and monitor status until completion.
3. Validate core process paths and integration health.
4. Re-plan the failed change after root-cause analysis.

### Verification checklist

- Incident volume returns to baseline.
- Critical process KPIs recover.
- Cluster status remains healthy after restore.

## Run a quarterly DR test

Use this to validate operational readiness and runbook quality.

### Steps

1. Define test scope, acceptance criteria, and observer roles.
2. Pick a representative backup for restore rehearsal.
3. Execute restore using the same production runbook.
4. Record timings, blockers, and remediation actions.
5. Update internal runbooks based on lessons learned.

### Verification checklist

- Team can execute end-to-end without escalation.
- Recovery timing is captured and reviewed.
- Follow-up actions are documented and assigned.

## Recover from a regional outage with intact backups

Use this when platform services recover but your cluster data requires restoration from a known backup.

### Steps

1. Confirm the outage state is resolved for your target cluster region.
2. Select the most recent valid backup.
3. Execute same-cluster restore.
4. Validate connectivity and application recovery.
5. Communicate recovery completion to stakeholders.

### Verification checklist

- Cluster endpoints are reachable.
- Applications reconnect without endpoint reconfiguration.
- Business-critical process flows are operational.
