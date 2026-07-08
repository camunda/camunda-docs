---
id: agentic-control-plane
title: Agentic Control Plane
description: "Monitor adoption, cost, reliability, and performance of your AI-agent-powered processes from a single Optimize page."
---

The **Agentic Control Plane** is a dedicated page in Camunda Optimize that helps you monitor how AI agents behave across your processes. It brings adoption, cost (token usage), reliability, and performance into a single view, so you can spot problems early and understand where your agents spend time and money.

:::note Who is this for?
Operators, process owners, and engineering leads who run AI-agent-powered processes and need to keep them healthy and cost-effective.
:::

Every number on the page is based only on **completed** process instances that used at least one AI agent. Non-agent processes are ignored.

## Open the Agentic Control Plane

1. Open **Optimize**.
2. In the navigation, select **Agentic Control Plane**.
3. The page loads showing all your agentic processes for the **last 30 days**.

## Fleet and process levels

The page works at two levels, controlled by the **Process** filter at the top:

- **L0 — fleet view (default):** no process is selected. You see every agentic process together — the "how is my whole agent fleet doing?" view. This view is best for spotting which process to look at next.
- **L1 — process view:** select one process (and optionally a **Version**). Every tile now describes just that process, and extra process-specific tiles appear (failure by version, and the two flow-node heatmaps) that aren't meaningful across the whole fleet.

To switch between levels, choose a process in the filter, or clear it to return to the fleet view.

### Filters

- **Date range** — **Last 7 days**, **Last 30 days** (default), **Last 3 months**, **Last 6 months**, or **Last 12 months**. Dates are based on when each execution **completed**. Chart time buckets adjust automatically (for example, daily for a week, monthly for a year).
- **Process** — switches between L0 and L1.
- **Version** — appears only in L1. Focus on a specific process version, the latest, or all versions.

### Tiles available at each level

| Tile                                 | L0 (fleet) | L1 (process) |
| ------------------------------------ | :--------: | :----------: |
| Total executions                     |     ✅     |      ✅      |
| Average execution duration           |     ✅     |      ✅      |
| Incident rate                        |     ✅     |      ✅      |
| Average tokens per execution         |     ✅     |      ✅      |
| Median tokens per execution          |     ✅     |      ✅      |
| Token trend                          |     ✅     |      ✅      |
| Token outlier bands (P5 / P50 / P95) |     ✅     |      ✅      |
| Top token consumers by process       |     ✅     |      —       |
| Total tool calls                     |     ✅     |      ✅      |
| Failure rate by process version      |     —      |      ✅      |
| Tool calls per flow node (heatmap)   |     —      |      ✅      |
| P50 execution duration               |     ✅     |      ✅      |
| P95 execution duration               |     ✅     |      ✅      |
| Execution duration stability         |     ✅     |      ✅      |
| Duration per flow node (heatmap)     |     —      |      ✅      |

## Understand the tiles

The tiles are grouped into four themes: key numbers, token usage, reliability and tool calls, and duration. Each one is described below, along with what it tells you and how to act on it. Unless noted otherwise, a tile reflects the whole fleet in L0 and the selected process in L1.

### Key numbers

The top row gives you an at-a-glance health check, and each number carries a change badge comparing the current period to the previous one.

**Total executions** counts the completed agentic executions in the period. It's your adoption and volume signal: a steady climb means agents are being used more, while an unexpected drop can mean a process has stalled. It also sets the scale for reading every other tile.

**Average execution duration** shows the average end-to-end time of an agentic execution. If it trends upward, the experience is getting slower, and it's worth digging into the duration tiles or a specific process to find out why.

**Incident rate** is the share of completed executions that hit and resolved an incident — a quick reliability pulse. When it starts climbing, that's your cue to investigate. In L1, **Failure rate by process version** helps you narrow down the cause.

### Token usage

Tokens are the units of AI model usage, so this group is effectively about cost.

**Average tokens per execution** captures the typical cost of a single run as the combined input and output tokens. When it grows while your execution volume stays flat, prompts or responses are expanding, which is a good moment to review your prompt design.

**Median tokens per execution** is the midpoint: half of executions use less, half use more. Because it ignores extreme outliers, it represents the typical run. Compare it against the average — a large gap means a handful of very expensive runs are inflating your costs, so it's worth hunting down those outliers.

**Token trend** plots input tokens against output tokens over time. It reveals where cost growth comes from: bigger prompts push up the input line, longer responses push up the output line. If tokens rise without more executions, your prompts may be growing or the model is producing longer answers — something to raise with engineering.

**Token outlier bands (P5 / P50 / P95)** show the spread of per-execution token usage over time, from low to typical to high. A widening gap between the P5 and P95 bands means executions are behaving inconsistently, often a sign of prompt variability or non-determinism.

**Top token consumers by process** ranks your processes by total token spend, showing the top 10 as a bar chart. This is where you see where the money goes across the fleet: cutting the top consumer has the biggest impact on overall spend, and you can select that process to drill into it in L1. A **Top X of Y** note appears when more processes exist beyond those shown. This tile is only available in L0, since ranking processes against each other stops being meaningful once you're inside a single process.

### Reliability and tool calls

**Total tool calls** is the total number of tool or action calls your agents made, a gauge of how much work they delegate to tools. Sudden changes can point to a behavior shift or a looping agent, so it's useful to read alongside token usage and duration.

**Failure rate by process version** breaks the failure percentage down by process definition version. It answers whether a specific version is more or less reliable, so you can confirm whether a new release improved or regressed things and decide whether to roll it back or promote it. This tile is only available in L1, since comparing versions only makes sense within one process.

**Tool calls per flow node** overlays a heatmap on the process diagram, coloring each step by how many tool calls it triggers. It pinpoints where in the process your agents do the most work, so you can target the hottest steps for review — for example, an agent calling a tool far more often than expected. Because it draws on one specific diagram, this tile is only available in L1.

### Duration

**P50 execution duration** is the median execution time — half of runs finish faster, half slower. It gives you the typical performance experience and a stable baseline to compare against P95 and over time.

**P95 execution duration** exposes the slow tail: 95% of executions finish within this time. It surfaces worst-case slowness that averages tend to hide. When P95 sits far above P50, a meaningful minority of runs are slow, and those are the cases worth investigating.

**Execution duration stability (P50 / P95)** plots both the median and 95th-percentile duration over time on a single chart. It shows whether performance is steady or drifting, helping you catch gradual degradation, or a widening gap between typical and worst-case runs, before users start to complain.

**Duration per flow node** overlays a heatmap on the process diagram, coloring each step by its average duration. It shows which steps consume the most time so you can focus performance work on the true bottlenecks. Like the other heatmap, it's only available in L1.

## Read the extras

A few smaller cues round out the page. **Change badges** on the top-row numbers compare the current period to the previous one, with green indicating a good move and the arrow reflecting whether higher or lower is better for that metric. A **Top X of Y** note appears on ranked charts when there are more items than shown, so you know you're seeing the leaders rather than the full list. **Footnotes** under some charts offer a plain-language hint on what an unusual pattern might mean and what to do about it.

## Typical workflows

With these tiles in mind, a few common tasks map neatly onto the page:

- **Watch adoption:** keep the fleet view (L0) on **Last 30 days** and track **Total executions**.
- **Control cost:** check **Average tokens per execution**, **Median tokens per execution**, and **Token trend**. If they're rising, open **Top token consumers by process**, select the top process, and investigate it in L1.
- **Investigate reliability:** when **Incident rate** climbs, switch to the affected process and use **Failure rate by process version** to see whether a release caused it.
- **Find slow or busy steps:** in L1, use **Duration per flow node** to pinpoint bottlenecks and **Tool calls per flow node** to see where agents do the most work.

## Good to know

Keep a few things in mind as you read the page. It counts only **completed** executions, so very recent in-progress runs won't appear until they finish. If a tile looks empty, there's usually no agentic data yet for the selected process or period. And the L1-only tiles — the heatmaps and failure by version — appear only after you select a single process.
