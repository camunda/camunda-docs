---
id: analyze-ai-agents
title: Analyze your AI agents with Optimize
sidebar_label: Analyze your AI agents
description: "Analyze and improve the performance of your AI agent executions using Optimize."
keywords: ["agentic ai", "AI agents", "Optimize"]
---

import ScriptTask from './img/script-task.png';

Analyze and improve the performance of your AI agent executions using Optimize.

## About

In this guide, you will:

- Understand what data Optimize can analyze for AI agents.
- Create reports and heatmaps, including token and tool usage.
- Build a dashboard to track AI agent behavior over time.

After completing this guide, you will be able to analyze AI agent executions in Optimize and build dashboards that track usage and performance trends.

## Prerequisites

- You have access to [Optimize](/components/optimize/what-is-optimize.md).
- You have deployed and run the [AI Agent Chat Quick Start](https://marketplace.camunda.com/en-US/apps/587865) model blueprint. This is needed for Optimize to fetch execution data to analyze. Consider running it using different prompts to trigger various AI agent tools.

:::important
This guide is a follow-up to [Build your first AI agent](../../guides/getting-started-agentic-orchestration.md), where you will use the same example AI agent process. It is recommended going through that guide first. However, it can be applied to other AI agent process implementations.
:::

:::note
Optimize reports can use only variables that are available at the process level. If agent data is scoped to a lower level (for example, inside a connector or tool execution scope), extract it to process variables before you build reports.
:::

## Step 1: Make your data available

:::important
Optimize can only use variable data at the **process level**.
:::

To make data available to Optimize, make sure it's scoped at the process level. If it's scoped to a lower level, for example, within a connector or tool-execution scope, extract it into process variables.

### Example: Collect token usage

In the AI Agent Chat Quick Start example, token usage data is not available at the process level, but in a nested scope. To surface those metrics, you can add a script task after the AI agent execution that copies those values into process variables.

How you extract these values depends on how your AI agent implementation exposes token usage. The important aspect is that the target variables exist at the **process level** when the instance finishes.

To do so:

1. Add a [script task](/components/modeler/bpmn/script-tasks/script-tasks.md).
1. Configure its **Properties** as follows:
   - In **General**, **Name**: Gather metrics.
   - In **Implementation**, select **FEEL expression**.
   - In **Script**,
     - **Result variable**: `tokenUsage`.
     - **FEEL expression**: `agent.context.metrics.tokenUsage.inputTokenCount`.
   - In **Output mapping**, add two process variables:
     - `inputTokenUsage` with **Variable assignment value**: `agent.context.metrics.tokenUsage.inputTokenCount`.
     - `outputTokenUsage` with **Variable assignment value**: `agent.context.metrics.tokenUsage.outputTokenCount`.

You should see something like the following:

<img src={ScriptTask} alt="Process instance overview"/>

## Step 2: Examine data in Optimize

By leveraging data collected during process execution, you can use Optimize to examine it through reports and dashboards and identify areas for improvement in your AI agent processes.

1. Open Optimize.
1. Go to the **Dashboards** tab.
1. Select your AI agent process, **AI Agent Chat With Tools**, in the **Process dashboards and KPIs** section.
1. Verify that Optimize shows data for your executed process instances in the **Business Operations** section, including your AI agent process model diagram and other statistics below.
1. Explore the other metrics shown below in the **Business Reporting** and **Process Improvement** sections.

See the Optimize [getting started](/components/optimize/improve-processes-with-optimize.md) guide for more details on what you can do with Optimize for business intelligence.

## Step 3: Create reports for token usage

You can create reports for token usage across process instances and over time.
To do so:

1. Go to the **Collections** tab.
1. Select **Report** in the **Create new** dropdown.
1. Select **AI Agent Chat With Tools** in the **Select one or more processes** dropdown. You can fetch data for all process model versions or customize it.
1. Choose a blank template.
1. Enable **Update preview automatically** to ease live showing the report results.
1. In the **Report setup** section, select **Variable** in the **View** section, and then **tokenUsage**.
1. Click the pencil icon and select an aggregation that matches your goal. For example:
   - **Sum** to track total tokens across instances.
   - **Average** to track typical usage per process instance.
1. Save the report with a descriptive name. For example, **Token usage**.

:::note
You can create similar reports, targeting other goals and process variables such as `inputTokenUsage` or `outputTokenUsage`.
:::

### Set a target threshold

If you have a token budget, you can set a target in the report.

1. [Follow previous steps](/#step-3-create-reports-for-token-usage), from step 1 to 6 (included).
1. In the **Visualization** settings, click the gear icon, and then enable the **Set target** option to configure a target value, for example, a maximum token usage threshold.
1. Set the target to below 10000 tokens.
1. Save the report with a descriptive name. For example, **Token usage with threshold**.

## Step 4: Create reports for tool usage

You can report on tool usage using flow node reporting.

### Example: Create a heatmap

Use a heatmap to understand how long your AI agent spends in each task.

1. Create a new report.
1. Select **Flow node** as the **View**.
1. Select **Duration** as the **Measure**.
1. You can filter the report by selecting **Flow node selection** in the **Filter flow nodes** dropdown. For example, select only tool tasks within the AI Agent connector.
1. In the **Visualization** settings, select **Heatmap**. Then, click the gear icon and enable both tooltips to show absolute and relative values.
1. Save the report with a descriptive name. For example, **Tool heatmap**.

### Example: Create a report for tool call counts

Create a bar chart to know how many times each tool is called.

1. Create a new report.
1. Select **Flow node** as **View**.
1. Select **Count** as the **Measure**.
1. You can filter the report by selecting **Flow node selection** in the **Filter flow nodes** dropdown. For example, select only tool tasks within the AI Agent connector.
1. Select a **bar chart** visualization.
   In the **Visualization** settings, select **Bar chart** or **Pie chart**. Then, click the gear icon and enable both tooltips to show absolute and relative values.
1. Save the report with a descriptive name. For example, **Tool usage**.

## Step 5: Build a dashboard for your AI agent

A dashboard is a collection of reports (widgets) that you can view together.

1. In Optimize, create a new dashboard (for example, **Loan Support Agent**).
2. Add tiles for the reports you created, for example:
   - Input token usage
   - Output token usage
   - Tool heatmap (duration)
   - Tool call counts
3. Arrange the tiles so the dashboard answers your main questions quickly.

## Step 6: Track trends over time

To analyze trends (for example, “last seven days”), use a time-based view.

For example, if your goal is to track “how many times a tool was called per day”:

1. Create a report based on tool flow nodes (or a tool count metric).
2. Select a time grouping (for example, daily).
3. Choose a chart that highlights trends over time.
4. Save the report and add it to your dashboard.

:::note
In the transcript, creating a “timeline” view was described as possible but not always easy to discover, depending on the chosen report configuration. If you don’t see the expected timeline, try changing the visualization type or switching between automatic and manual grouping options.
:::

## Next steps

Now that you know how to analyze your AI agents, you can:

- [Monitor your AI agents](/components/agentic-orchestration/monitor-ai-agents.md) with Operate.
- Learn more about [Camunda agentic orchestration](/components/agentic-orchestration/agentic-orchestration-overview.md) and the [AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md).
