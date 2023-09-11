---
id: milestones
title: Milestones
description: Working with milestones in Web Modeler
---

<span class="badge badge--cloud">Camunda 8 only</span>

## Milestones

You can save a snapshot of your diagram as a milestone any time.

If you make any mistakes while modeling, you can always go back to previously saved snapshots. You can also identify and compare the differences between two milestones.

Find your milestones by opening the actions menu, and clicking on **History**.
![milestones](img/milestones/web-modeler-milestone-action-menu-item.png)

### Creating milestones

In the milestone history view, the latest version can be saved as a new milestone.
![milestones create via icon](img/milestones/web-modeler-milestone-create-via-icon.png)

Alternatively, you can create a new milestone via the breadcrumb menu in the diagram view.
![milestones create via icon](img/milestones/web-modeler-milestone-create-via-breadcrumb.png)

When dragging and dropping a file into the diagram view, or when using the **Replace via upload** option under the breadcrumb menu, a new milestone is created automatically.

### Restoring milestones

Hover over a milestone, click on the three vertical dots, and expand for more options.
![milestones restore](img/milestones/web-modeler-milestone-restore.png)
![milestones restore](img/milestones/web-modeler-milestone-restore-complete.png)

### Comparing milestones

Milestones can be compared visually. By enabling the diffing feature, the currently selected milestone is compared to its predecessor.

The differences that are highlighted are only those that affect the execution of the BPMN process. Pure visual changes like position changes are not highlighted.
![milestones diffing](img/milestones/web-modeler-milestone-diffing.png)

## Related diagrams

Web Modeler identifies all diagrams in a project that share the same process id and displays them in the **Related diagrams** section underneath the milestones.

Compare a related diagram to the latest version of the current diagram or any another milestone to keep track of your changes.
![milestones diffing](img/milestones/web-modeler-related-diagrams.png)
