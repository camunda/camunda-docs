---
id: suspend-resume-process-instance
title: Suspend and resume a process instance
description: "Temporarily pause and resume a running process instance in Operate."
---

In Operate, you can suspend a running process instance to temporarily pause execution, then resume it to continue from where it left off.

While a process instance is suspended, no jobs are handed out to workers, and external triggers such as messages and signals aren't processed.

For a full explanation of what happens during suspension, see [process instance suspension](../../concepts/process-instance-suspension.md).

## Suspend a process instance

### Suspend a single instance from the instance detail page

1. On the **Processes** page, find the process instance to suspend in the **Process Instances** table.
2. Click the process instance key to open the instance detail page.
3. In the page header, click **Suspend**.

The instance state changes to **Suspended**.

### Suspend multiple instances from the Processes page

1. On the **Processes** page, select the process instances to suspend by checking the checkbox next to each one, or use the select-all checkbox to select all visible instances.
2. In the toolbar, click **Suspend**.
3. In the **Apply operation** dialog, click **Apply**.

Only active instances in the selection are suspended. Suspended or finished instances are ignored.

## Resume a process instance

### Resume a single instance from the instance detail page

1. On the **Processes** page, in the **Filter** panel, select the **Suspended** checkbox to show suspended instances.
2. Click the process instance key to open the instance detail page.
3. In the page header, click **Resume**.

The instance state changes to **Active** and execution resumes.

### Resume multiple instances from the Processes page

1. On the **Processes** page, in the **Filter** panel, select the **Suspended** checkbox to show suspended instances.
2. Select the instances to resume by checking the checkbox next to each one, or use the select-all checkbox.
3. In the toolbar, click **Resume**.
4. In the **Apply operation** dialog, click **Apply**.

Only suspended instances in the selection are resumed. Active or finished instances are ignored.
