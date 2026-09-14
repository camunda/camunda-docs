---
id: business-value-dashboard
title: Business value dashboard
description: "Track process outcomes in Camunda Hub using cycle time, automation rate, volume, and agentic adoption metrics, and set targets for cycle time and automation rate."
---

Use the business value dashboard to track process outcomes using cycle time, automation rate, volume, and agentic adoption metrics. Set targets for cycle time and automation rate, and find the processes that miss them.

To open it:

1. In Camunda Hub, go to **Business Value** (`/business-value`).
2. Use the environment picker to select an Orchestration Cluster.
3. Review the portfolio view, then select a process to open its process view.

The dashboard is scoped to one cluster at a time. Values are never aggregated across clusters, so a number you read always belongs to the environment currently selected in the picker.

## Availability and permissions

The business value dashboard is available in Camunda 8.10 and later, for clusters connected to Optimize.

Access follows your organization-level role. Organization Owner, Organization Admin, and Analyst can use the dashboard; Member and DevOps can't. See [roles and permissions](/components/hub/organization/manage-users/index.md#roles-and-permissions) for the full permission matrix.

Viewing the dashboard and setting or updating targets require the same access. There is no separate read-only or target-editing permission.

:::note
The standalone `Optimize` role does not grant access to the business value dashboard. It can grant access to Optimize itself, but that alone is not enough to open the dashboard in Camunda Hub.
:::

## How the dashboard calculates metrics

Every metric on the dashboard follows the same rules.

| Rule                       | What it means                                                                                                                                |
| :------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| Completed instances only   | Only completed process instances are counted. Running and unfinished instances are excluded from every metric, chart, and target comparison. |
| Targets are values you set | Camunda doesn't supply a default or benchmark target. Every target on the dashboard is one you entered.                                      |

### Automation rate definition

Automation rate is the share of work in a process that ran without a human, calculated as `automated tasks / (automated tasks + human tasks)`.

| Included                                                                                  | Excluded                                      |
| :---------------------------------------------------------------------------------------- | :-------------------------------------------- |
| Automated tasks, such as service tasks, script tasks, business rule tasks, and send tasks | Events and gateways                           |
| User tasks and manual tasks, which count toward the denominator                           | Sub-process containers themselves             |
| Tasks inside embedded sub-processes, counted the same as tasks at the top level           | Tasks in a process started by a call activity |

Structural elements are excluded because they don't represent work anyone had to do. A process built mostly from gateways and events is not automatically 100% automated under this definition.

Automation rate is calculated on the root process only. Tasks in a process started by a call activity count toward the automation rate of that called process, not the calling one.

### Cycle time definition

Cycle time is the elapsed duration of a completed process instance, from start to end.

## Review the portfolio view

The portfolio view summarizes all processes in the selected cluster. Use it to see where targets are met and which processes need attention.

| Metric             | What it shows                                                                                             | How to interpret it                                                                          |
| :----------------- | :-------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| Target coverage    | How many active processes have at least one target set.                                                   | Low coverage means the summary reflects only part of your processes.                         |
| Target attainment  | How many configured KPI targets are currently met.                                                        | The headline result for the cluster.                                                         |
| Volume             | Completed work handled, process activity, and how both change over time.                                  | Read it as context. Volume is not compared against a target.                                 |
| Automation rate    | The aggregated automation rate for the cluster, plus a per-process comparison.                            | Use it to find processes that still rely heavily on manual work.                             |
| Cycle time         | A process-by-process comparison and the longest-running processes.                                        | Use it to find where processes take longest to complete.                                     |
| Agentic adoption   | Which processes use [agentic](/components/agentic-orchestration/agentic-orchestration-overview.md) steps. | Use it to see where AI agents already handle part of the work.                               |
| Off-target details | Missed targets ranked by the size of the gap.                                                             | Start with the largest gap. See [investigate a missed target](#investigate-a-missed-target). |

## Review the process view

The process view shows the metrics and targets for a single process. Open it by selecting a process from the portfolio view.

| Element                  | What it shows                                                                                                    |
| :----------------------- | :--------------------------------------------------------------------------------------------------------------- |
| Per-KPI value and status | The current value for each KPI, whether its target is met, and where available, by how much it is met or missed. |
| Volume                   | Completed work handled for this process in the selected scope.                                                   |
| Trends                   | How volume and cycle time change over time, rather than a single snapshot.                                       |
| Cycle time distribution  | P50, average, and P95 where available, so typical and worst-case durations are both visible.                     |
| Version context          | Version selection or release-over-release comparison where available, so you can see how a release performed.    |
| Target actions           | **Set target** or **Update target** for the KPIs this process supports.                                          |

## Set and update targets

Each target is optional and set independently, so you can set a cycle time target without setting an automation rate target.

| KPI             | Direction        |
| :-------------- | :--------------- |
| Cycle time      | Lower is better  |
| Automation rate | Higher is better |

To set a target:

1. Open the process view for the process you want to set a target for.
2. Click **Set target** for the KPI, or **Update target** if a target already exists.
3. Review the current baseline shown beside the target input, where supported.
4. Enter the target value and save.

Use the baseline to set a realistic target. A target set far from current performance is either always missed or always met, and tells you little either way.

## Filter the results

Filters change which completed instances are counted, so a target that is met over one date range can be missed over another.

| Filter      | What it does                                                                                                   |
| :---------- | :------------------------------------------------------------------------------------------------------------- |
| Environment | Selects the Orchestration Cluster to report on. Required.                                                      |
| Process     | Limits results to one process.                                                                                 |
| Date range  | Limits results to instances completed within the range.                                                        |
| Version     | Limits results to one process version, where available, so you can evaluate a release on its own.              |
| Activity    | Limits the portfolio view to processes with recent activity, where available, so retired processes are hidden. |

When you share a number from the dashboard, include the filters it was measured with. An automation rate of 94% over the last 30 days on one cluster is not the same as 94% overall.

## Investigate a missed target

The dashboard shows which target was missed and by how much, but not which instance failed or why. Use Operate and Optimize to find the cause.

1. In the portfolio view, open **Off-target details** and pick the largest gap.
2. Follow the link to the process view to confirm the miss, check the trend, and see whether it's concentrated in a specific version.
3. Where an operational investigation link is available, follow it to inspect the affected instances in [Operate](/components/operate/operate-introduction.md).
4. For process analysis such as bottleneck and outlier detection, continue in [Optimize](/components/optimize/what-is-optimize.md).

## Multi-tenancy

The business value dashboard follows the [Optimize multi-tenancy](/components/concepts/multi-tenancy.md#optimize-and-multi-tenancy) model, which is Self-Managed only. On SaaS, the dashboard shows data from the default tenant only.

In a multi-tenant environment:

- Targets are created, read, updated, and evaluated per tenant. A target set for one tenant isn't visible to, or inherited by, another tenant using the same process.
- In the process view, select a tenant to scope both the process metrics and the target you're editing.
- The portfolio view reports across all tenants you're authorized to see.
