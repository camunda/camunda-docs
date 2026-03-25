---
id: analyze-ai-agents
title: Analyze your AI agents with Optimize
sidebar_label: Analyze your AI agents
description: "Analyze AI agent executions using Optimize reports and dashboards, including token usage and tool usage."
keywords: ["agentic ai", "AI agents", "Optimize", "token usage"]
---

Analyze AI agent executions using Optimize reports and dashboards, including token usage and tool usage.

## About

In this guide, you will:

- Understand what data Optimize can analyze for AI agents.
- Prepare process variables so Optimize can report on token usage.
- Create reports for input and output token usage.
- Create reports for tool usage, including heatmaps and tool call counts.
- Build a dashboard to track agent behavior over time.

After completing this guide, you will be able to analyze AI agent executions in Optimize and build dashboards that track usage and performance trends.

## Prerequisites

- You have completed [Build your first AI agent](../../guides/getting-started-agentic-orchestration.md).
- You have access to [Optimize](/components/optimize/what-is-optimize.md).
- You have an AI agent process you can execute (for example, the **AI Agent Chat With Tools** blueprint used in [Monitor your AI agents](/components/agentic-orchestration/monitor-ai-agents.md)).

:::note
Optimize reports can use only variables that are available at the process level. If agent data is scoped to a lower level (for example, inside a connector or tool execution scope), extract it to process variables before you build reports.
:::

## Step 1: Run your AI agent process

Run a process instance so Optimize has execution data to analyze.

1. Start a new process instance for your AI agent process (for example, **AI Agent Chat With Tools**).
2. Provide a prompt that triggers the AI agent to call one or more tools.
3. Wait for the process instance to complete (or reach a waiting state, depending on your model).

## Step 2: Make token usage available at the process level

To report on token usage in Optimize, store token usage values in process variables.

In the transcript, this is the key constraint: Optimize considers only variables “on the process level” when building reports. To report on token usage (input and output tokens), extract those values into process variables (for example, using a script task that “pushes that variable up into the process”).

### Example: Store input and output token usage in process variables

Choose process variables that match what you want to report on. For example:

- `inputTokenUsage`
- `outputTokenUsage`

How you extract these values depends on how your AI agent implementation exposes token usage (for example, from connector output, agent context metadata, or another variable). The important part is that the final variables exist at the **process level** when the instance finishes.

:::tip
If you already store token usage in a nested scope, add a script task after the AI agent execution that copies those values into process variables.
:::

## Step 3: Create a report for input token usage

Create a report that sums input tokens across process instances.

1. Open Optimize.
2. Create a new report for your AI agent process.
3. In the report configuration, select the process variable that represents input tokens (for example, `inputTokenUsage`).
4. Select an aggregation that matches your goal. For example:
   - **Sum** to track total input tokens across instances.
   - **Average per process instance** to track typical usage.
5. Save the report with a descriptive name (for example, **Input token usage - March**).

### (Optional) Set a target threshold

If you have a token budget, set a target.

1. In the report settings, configure a target value (for example, a maximum token usage threshold).
2. Choose a visualization that clearly shows performance against the target (for example, a bar).

## Step 4: Create a report for output token usage

Repeat the same pattern for output tokens.

1. Create another report.
2. Select the process variable for output tokens (for example, `outputTokenUsage`).
3. Select the aggregation (for example, **Sum**).
4. (Optional) Set a target threshold.
5. Save the report (for example, **Output token usage - March**).

## Step 5: Create reports for tool usage

In addition to token usage, you can report on tool usage using flow node reporting.

### Create a heatmap of where the agent spends time

A heatmap can show how long the process spends in each task.

1. Create a new report.
2. Select **Flow node** as the dimension.
3. Select **Duration** as the measure.
4. Filter the report to the relevant flow nodes (for example, select only tool tasks).
5. Select a **heatmap** visualization.
6. Save the report (for example, **Tool heatmap - March**).

### Create a report for tool call counts

You can also report on how many times each tool is called.

1. Create a new report.
2. Select **Flow node** as the dimension.
3. Select a measure that reflects occurrences (for example, flow node instance count).
4. Filter the report to tool tasks.
5. Select a **bar chart** visualization.
6. Save the report (for example, **Tool call counts - March**).

## Step 6: Build a dashboard for your AI agent

A dashboard is a collection of reports (widgets) that you can view together.

1. In Optimize, create a new dashboard (for example, **Loan Support Agent**).
2. Add tiles for the reports you created, for example:
   - Input token usage
   - Output token usage
   - Tool heatmap (duration)
   - Tool call counts
3. Arrange the tiles so the dashboard answers your main questions quickly.

## Step 7: Track trends over time

To analyze trends (for example, “last seven days”), use a time-based view.

For example, if your goal is to track “how many times a tool was called per day”:

1. Create a report based on tool flow nodes (or a tool count metric).
2. Select a time grouping (for example, daily).
3. Choose a chart that highlights trends over time.
4. Save the report and add it to your dashboard.

:::note
In the transcript, creating a “timeline” view was described as possible but not always easy to discover, depending on the chosen report configuration. If you don’t see the expected timeline, try changing the visualization type or switching between automatic and manual grouping options.
:::

## Troubleshooting

### I can’t select token usage in Optimize

Optimize reports can use only variables available at the process level. If token usage exists only in a connector or tool scope, extract it into a process variable (for example, with a script task) before you build the report.

### The dashboard experience feels hard to set up

Start with a small set of reports (token usage totals, average per instance, and tool call counts). Add duration and time-based reports after you confirm the base reports show the correct data.

## Next steps

- Combine Optimize analysis with runtime inspection from [Monitor your AI agents](/components/agentic-orchestration/monitor-ai-agents.md).
- Learn more about [Optimize](/components/optimize/what-is-optimize.md) and [Getting started with Optimize](/components/optimize/improve-processes-with-optimize.md).
