---
id: task-analysis
title: Task analysis
description: Task analysis allows you to easily identify process instances that took significantly longer than others to complete a flow node.
---

Task analysis allows you to identify process instances that took significantly longer than others to complete a flow node, and subsequently slow down your process.

## Task analysis in action

Select a process definition you would like to analyze. Once a definition is selected, a **heatmap** is displayed, highlighting the flow nodes where Optimize identified many duration outliers.

In our example, the **Approve Invoice** task has duration outliers. Additionally, in the **Outliers** table, you can see how many instances were identified, how much longer they took than the average duration, and a list of related variables.

![task analysis example 1](./img/outlierExample_1_heatMap.png)

Click the node on the **heatmap** or use the **View Details** button in the table to directly see a duration distribution chart for the specific flow node. The duration distribution chart contains information about how long the identified outliers took, and also in comparison to the other flow node instance durations.

![task analysis example 2](./img/outlierExample_2_detailsModal.png)

## Significant variable values

When looking at the duration outlier instances, you can analyze the data further to find the root cause of why these instances took so long. Look at the significant variables table that lists significant variable values in the outlier instances.

This also allows you to see how many times this variable value occurred in the outlier instances compared to the rest of the process instances. This can give you a good idea of if there is a correlation between a variable value and a flow node taking longer than expected. In our example, we can see that for most of our duration outliers the delay variable was set to `true`.
