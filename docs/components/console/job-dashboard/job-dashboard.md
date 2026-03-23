---
id: job-dashboard
title: Job dashboard
description: "Use the job dashboard to track job types and statistics."
---

Job dashboard in Console gives you a job-level view across your cluster. Use it to see which job types are active, how many jobs are created, completed, and failed, and which workers are involved.

## Availability and permissions

Job Worker Dashboard is available in Console for clusters running Camunda 8.9 or later.

For SaaS:

- Enabled for Camunda 8.9+ clusters.
- Uses the cluster’s job metrics configuration exposed via `GET /v2/statistics/configuration` (`jobWorkerDashboard.enabled`, `jobWorkerDashboard.resolutionMinutes`).

For Self-Managed:

- Requires Camunda 8.9+ (Zeebe and Console).
- Job metrics must be enabled in the engine JobMetricsCfg (for example, `enabled`, `exportInterval`, `maxWorkerNameLength`, `maxJobTypeLength`, `maxTenantIdLength`, `maxUniqueKeys`). These options are surfaced via the auto-generated `default.yaml` and Helm values.
- Console reads the job metrics config from `GET /v2/statistics/configuration`.

Access control:

- A global permission `READ_JOB_METRICS` (similar to `READ_USAGE_METRICS`) controls access to job metrics in general and is required to use Job Worker Dashboard.

If the feature is disabled or the user lacks permission, the Jobs card on the cluster overview shows **Access restricted**.

## When to use Job Worker Dashboard

Use the dashboard to:

- Check whether jobs are flowing through the system (created, completed, failed) for each job type.
- See which workers process a given job type and how many jobs they handle.
- Investigate error patterns for a job type before drilling into individual process instances in Operate.
- Avoid building and maintaining custom job-monitoring dashboards.

## Open Job Worker Dashboard

### 1. Open the Jobs overview

1. In Console, go to **Clusters**.
2. Select a cluster.
3. On the **Overview** tab, locate the **Jobs** card.
4. Click **View jobs** to open the **Job types** page.

![Cluster overview with Jobs card](../img/сluster-overview-jobs.jpg)

### 2. Jobs types overview

The **Job types** page shows all job types running against the selected cluster.

![Jobs overview with Job types table](../img/jobs-overview.png)

Key elements:

- **Last updated** timestamp (based on statistics responses).
- **Search** box to filter job types.
- **Time range** selector (for example, **Last 24 hours**) that controls all metrics on the page.
- Table columns:
  - **Job type**
  - **Assigned workers**
  - **Created jobs**
  - **Completed jobs**
  - **Failed jobs**
  - **Last completed**

If internal limits are reached for the selected date range, a warning will appear.

Job metrics are stored in an internal JobMetrics store in the engine and periodically exported as batch records. Configuration limits such as maximum number of unique keys (jobType × tenantId × worker combinations) and maximum string lengths (job type, worker, tenant ID) protect the system. When these limits are hit, responses may be marked as incomplete and the UI shows the data-limit warning.

To drill down into a specific job type, click its **Job type** link (for example, `send-email`).

## Job type details

The **Job type details** page shows metrics and errors for a single job type.

![Job type details view](../img/job-activity-log.png)

### Job workload

The **Job workload** chart shows how many jobs were **created**, **completed**, and **failed** over time for the selected job type and time range. Use it to spot spikes or trends, for example when failures increase after a deployment.

<!-- TODO(dev): Confirm whether retries or canceled jobs influence these counts so we can describe edge cases correctly (e.g. “failed” vs “retries”). -->

### Jobs completion rate

The **Jobs completion rate** donut chart summarizes, for the selected time range, how many jobs were created, completed, and failed. This gives you a quick, high-level view of whether most jobs finish successfully.

<!-- TODO(dev): Confirm the exact formula for the completion rate (numerator/denominator and how retries/cancellations are handled). -->

### Job workers table

The **Job workers** table shows which workers have processed this job type and how many jobs they handled:

- **Worker name**
- **Created jobs**
- **Completed jobs**
- **Failed jobs**
- **Last completed**

Use this table to see which workers are active and whether failures are concentrated on specific workers.

### Failed jobs by error type

The **Failed jobs by error type** table groups failed jobs by error so you can quickly see the most common problems:

- Search by error type or message.
- Columns:
  - **Error type**
  - **Error message**
  - **Jobs with error**

Click **View errors** to open related instances in **Operate** for deeper troubleshooting.

<!-- TODO(dev/Operate): Confirm the exact Operate view and filters opened by “View errors” so we can describe expectations (for example, filtered by job type + error type). -->

## Empty states and restrictions

### No jobs in the queue

If there are no jobs for the cluster or selected time range, the Jobs page shows:

- Heading: **No jobs in the Queue**
- Message: **No jobs found.**
- Link: **Learn more about Jobs and Job Workers**

This simply means there is no job activity to display.

### Jobs card access restricted

If the feature is disabled for the cluster or you don’t have permission, the **Jobs** card on the cluster overview shows:

- Status: **Access restricted**
- Message explaining that the feature is restricted or disabled and you must contact an administrator.
- Link: **Learn more about roles and restrictions**

### Missing permissions when viewing errors

If you click **View errors** but lack permissions in Operate, you may see messages such as:

- **Missing permissions to view the Definition**
- **Missing permissions to access Instance History**
- **Missing permissions to access Variables**

In this case, contact your organization owner or admin to request the necessary Operate permissions.

## SaaS vs Self-Managed

The Console UI and flows are the same in SaaS and Self-Managed.

- **SaaS:** Job Worker Dashboard is available for Camunda 8.9+ clusters. Camunda manages the underlying job metrics configuration.
- **Self-Managed:** You enable and configure job metrics in the engine and Helm charts. For details on available options and defaults, see the job metrics [configuration reference](self-managed/components/orchestration-cluster/core-settings/configuration/properties/).
