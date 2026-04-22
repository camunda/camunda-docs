---
id: analyze-ai-agents
title: Analyze your AI agents with Optimize
sidebar_label: Analyze your AI agents
description: "Analyze and improve the performance of your AI agent executions using Optimize."
keywords: ["agentic ai", "AI agents", "Optimize"]
toc_max_heading_level: 2
---

import ScriptTask from './img/script-task.png';
import Heatmap from './img/heatmap.png';
import PieChart from './img/pie-chart.png';
import Dashboard from './img/dashboard-optimize.png';

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
This guide is a follow-up to [Build your first AI agent](../../guides/getting-started-agentic-orchestration.md), in which you use the same example AI agent process. We recommend completing that guide first. However, you can also apply this guide to other AI agent process implementations.
:::

## Step 1: Make your data available

To make data available to Optimize, make sure it's scoped at the process level. If it's scoped to a lower level, for example, within a connector or tool-execution scope, extract it into process variables.

:::important
Optimize can only use variable data at the **process level**.
:::

### Example: Collect token usage

In the AI Agent Chat Quick Start example, token usage data is not available at the process level, but in a nested scope.
How you extract it depends on your AI agent implementation. The important aspect is that the target variables exist at the **process level** when the instance finishes.

:::note
Getting the token usage from the agent context only works with the AI Agent Sub-process when the **Include agent context** option in the **Response** section is enabled.
:::

To surface this data, you can add a script task after the AI agent execution that copies the values into process variables as follows:

1. Add a [script task](/components/modeler/bpmn/script-tasks/script-tasks.md).
1. Configure its **Properties**:
   - Set **Name** to `Gather metrics` under the **General** section.
   - Select **FEEL expression** as **Implementation**.
   - Under **Script**:
     - Set **Result variable** to `tokenUsage`.
     - Set **FEEL expression** to `agent.context.metrics.tokenUsage`.
   - Under **Output mapping**, add two process variables:
     - `inputTokenUsage` with **Variable assignment value**: `agent.context.metrics.tokenUsage.inputTokenCount`.
     - `outputTokenUsage` with **Variable assignment value**: `agent.context.metrics.tokenUsage.outputTokenCount`.

You should see something similar to the following:

<img src={ScriptTask} alt="Script task configuration for collecting token usage"/>

## Step 2: Examine data in Optimize

You can use Optimize reports and dashboards to examine data collected during process execution and identify areas for improvement in your AI agent processes.

1. Open Optimize.
1. Go to the **Dashboards** tab.
1. Select your AI agent process, **AI Agent Chat With Tools**, in the **Process dashboards and KPIs** section.
1. Verify that Optimize shows data for your executed process instances in the **Business Operations** section, including your AI agent process model diagram and other statistics below.
1. Explore the other metrics shown below in the **Business Reporting** and **Process Improvement** sections.

See [getting started](/components/optimize/improve-processes-with-optimize.md) with Optimize for more details on using Optimize for business intelligence.

## Step 3: Create reports for token usage

You can create reports for token usage across process instances and over time.

1. Go to the **Collections** tab.
1. Select **Report** from the **Create new** dropdown.
1. Select **AI Agent Chat With Tools** from the **Select one or more processes** dropdown. You can fetch data for all process model versions or customize it.
1. Choose a blank template.
1. Enable **Update preview automatically** to make it easier to see the report results as you configure it.
1. In the **Report setup** section, select **Variable** in the **View** option, and then select **tokenUsage**.
1. Click the pencil icon and select an aggregation that matches your goal. For example:
   - **Sum** to track total tokens across instances.
   - **Average** to track typical usage per process instance.
1. Save the report with a descriptive name. For example, **Token usage**.

:::note
You can create similar reports, targeting other goals and process variables, such as `inputTokenUsage` or `outputTokenUsage`.
:::

### Example: Set a target threshold

If you have a token budget, you can set a target in the report.

1. Complete steps 1–6 in [Step 3: Create reports for token usage](#step-3-create-reports-for-token-usage).
1. In the **Visualization** settings, click the gear icon and enable **Set target** to configure a target value. For example, a maximum token usage threshold.
1. Set the target threshold to match your budget. For example, select the **below** option and set it to 10,000 tokens.
1. Save the report with a descriptive name. For example, **Token usage with threshold**.

## Step 4: Create reports for tool usage

You can create reports for tool usage across process instances and over time.

### Example: Create a heatmap

Use a heatmap to understand how long your AI agent spends in each task.

1. Go to the **Collections** tab.
1. Select **Report** from the **Create new** dropdown.
1. Select **Flow node** as the **View**.
1. Select **Duration** as the **Measure**.
1. (Optional) Filter the report by selecting **Flow node selection** in the **Filter flow nodes** dropdown. For example, select only tool tasks within the AI Agent connector.
1. In the **Visualization** settings, select **Heatmap**. Click the gear icon and enable the tooltip to show absolute values.
1. Save the report with a descriptive name. For example, **Tool usage heatmap**.

<img src={Heatmap} alt="Tool usage heatmap" width="80%"/>

You can see from the heatmap that the **Search recipe**, **Jokes API**, and **Get list of Tech Stuff** tools are the only ones that were called across all process executions, and that your AI agent spent the most time in **Get list of Tech Stuff**.

### Example: Create a report for tool call counts

Create a bar chart to see how many times each tool is called.

1. Go to the **Collections** tab.
1. Select **Report** from the **Create new** dropdown.
1. Select **Flow node** as **View**.
1. Select **Count** as the **Measure**.
1. (Optional) Filter the report by selecting **Flow node selection** in the **Filter flow nodes** dropdown. For example, select only tool tasks within the AI Agent connector.
1. In the **Visualization** settings, select **Bar chart** or **Pie chart**. Then click the gear icon and enable both tooltips to show absolute and relative values.
1. Save the report with a descriptive name. For example, **Tool usage**.

<img src={PieChart} alt="Tool usage pie chart" width="50%"/>

You can see from the pie chart that the AI agent called the Jokes API tool most often across all process executions.

### Example: Track trends over time

Use a timeline report to analyze trends over time. For example, you can see how many times a tool is called per day over a one-week period.

1. Go to the **Collections** tab.
1. Select **Report** from the **Create new** dropdown.
1. Select **Flow node** as **View**.
1. Select **Count** as the **Measure**.
1. In **Group by**, select **Start date**. Then choose your preferred interval, for example, **Week**.
1. (Optional) Filter the report by selecting **Flow node selection** in the **Filter flow nodes** dropdown. For example, select only tool tasks within the AI Agent connector.
1. In the **Visualization** settings, select **Bar chart** or **Line chart**. Then click the gear icon and enable both tooltips to show absolute and relative values.
1. Save the report with a descriptive name. For example, **Tool usage over time**.

## Step 5: Build a dashboard

You can create a dashboard, which is a collection of reports that you can view together, for your AI agent process.

1. Go to the **Collections** tab.
1. Select **Dashboard** from the **Create new** dropdown.
1. Click the plus icon to add tiles for the reports you created.
1. In the **Optimize report** section, add reports as needed.
1. Arrange the tiles to customize your dashboard layout.
1. Save the dashboard with a descriptive name. For example, **AI Agent Chat Quick Start dashboard**.

<img src={Dashboard} alt="Dashboard overview" width="80%"/>

## Next steps

Now that you know how to analyze your AI agents, you can:

- [Monitor your AI agents](/components/agentic-orchestration/monitor-ai-agents.md) with Operate.
- Learn more about [Camunda agentic orchestration](/components/agentic-orchestration/agentic-orchestration-overview.md) and the [AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md).
