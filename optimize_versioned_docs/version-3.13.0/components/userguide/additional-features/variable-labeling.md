---
id: variable-labeling
title: Variable labeling
description: Add a label for a variable in a process definition.
---

The variable labeling functionality allows users to add, update, and delete batches of variable labels so your data is more understandable by business users. This allows Optimize to display a variable's label instead of its original name anywhere the given process definition is being used. Some examples of that would be
when viewing and configuring reports, dashboards, or event-based processes.

To use this feature, navigate to the definition edit window from inside a report. Click the pencil icon while hovering over the data source and click **Rename Variables** to access the label edit panel. You will then see the following panel:

![Label Edit panel](./img/variable-labeling-panel.png)

Delete a label by inputting an empty field for its value.

## Limitations

:::note
This feature is currently not supported in task analysis and csv export. This means that during task analysis, the original name of a variable is displayed.
:::

Keep in mind that when applying variable filters in multi-definition reports and multi-definition dashboards, the filters are applied to all variables across definitions which have the same name and type. This happens even in the case that the variables are labeled differently across definitions.
