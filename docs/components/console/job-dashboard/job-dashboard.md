---
id: job-dashboard
title: Job dashboard
description: "Use the job dashboard to track job types and statistics."
---

Job dashboard in Console gives you a job-level view across your cluster. Use it to see which job types are active, how many jobs are created, completed, and failed, and which workers are involved.

## Availability and permissions

Job dashboard is available in Console for clusters running Camunda 8.9 or later.

For SaaS:

- Available for Camunda 8.9+ clusters.
- Camunda manages the underlying job metrics configuration for you.

For Self-Managed:

- Requires Camunda 8.9+ (Zeebe and Console).
- Job metrics must be enabled in the engine job metrics configuration (`camunda.monitoring.metrics.job-metrics.*`). These options and their defaults are surfaced via the auto-generated defaults.yaml and Helm values.

Access control:

- The global `READ_JOB_METRICS` permission is the only Console permission required to see and use Job dashboard. (Operate permissions are still required to view underlying instances when you click **View errors**.)

If the feature is disabled or the user lacks permission, the Jobs card on the cluster overview shows **Access restricted**.

## When to use job dashboard

Use the dashboard to:

- Check whether jobs are flowing through the system (created, completed, failed) for each job type.
- See which workers process a given job type and how many jobs they handle.
- Investigate error patterns for a job type before drilling into individual process instances in Operate.
- Avoid building and maintaining custom job-monitoring dashboards.

## Open job dashboard

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

Job metrics are stored in an internal JobMetrics store in the engine and exported in batches (every five minutes). Configuration limits such as maximum string lengths for job type, worker, and tenant ID, and the maximum number of unique keys (jobType × tenantId × worker combinations), protect the system. If any of these limits is exceeded for a batch, that batch is marked as incomplete and the UI shows the **Data loading limit reached** warning. In that case, treat the counts as partial for the affected time range.

To drill down into a specific job type, click its **Job type** link (for example, `send-email`).

## Job type details

The **Job type details** page shows metrics and errors for a single job type.

![Job type details view](../img/job-activity-log.png)

### Job workload

The **Job workload** chart shows how many jobs were **created**, **completed**, and **failed** over time for the selected job type and time range. Use it to spot spikes or trends, for example when failures increase after a deployment. Failed counts include retries, timeouts, cancellations, and other error states, and each failed attempt is counted separately.

### Jobs completion rate

The **Jobs completion rate** donut chart breaks jobs into three groups for the selected time range:

- **Created**: All jobs that have been created, regardless of whether they are still running, completed, or failed.
- **Completed**: Jobs that have finished executing successfully.
- **Failed**: Jobs that did not complete successfully, including retries, timeouts, cancellations, and errors.

If a job is retried, each failed attempt is counted separately. For example, one job retried three times appears as three failed jobs.

Use this chart to see at a glance whether most jobs finish successfully or many end in a failed state.

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

Click **View errors** to open related instances in **Operate**, with the **Error Message** filter prefilled so you see only instances that failed with that error.

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

- **SaaS:** job dashboard is available for Camunda 8.9+ clusters. Camunda manages the underlying job metrics configuration.
- **Self-Managed:** You enable and configure job metrics in the engine and Helm charts. For details on available options and defaults, see the job metrics [configuration reference](self-managed/components/orchestration-cluster/core-settings/configuration/properties/).
