---
id: monitor-operation-status
title: Monitor operation status
description: "Monitor and investigate the status of any operation"
---

Operate offers a powerful way to monitor and investigate the status of any operation you started. This includes canceling and retrying process instances, process instance migration and modification.

First go to the processes view and expand the operations panel:

![operate-view-process-filters](./img/monitor-operation-state/operations-panel.png)

Select an operation from the list by clicking on the operation id. Notice that the operation if is set as a filter:

![operate-view-process-filters](./img/monitor-operation-state/expanded-operations-panel.png)

Now you can see that a new column named "Operation State" is added to the processes instances list which indicates the current state of the operation:

![operate-view-process-filters](./img/monitor-operation-state/operation-state-row.png)

In case an operation has failed, the related process instance row is marked red and you are able to expand the row:

![operate-view-process-filters](./img/monitor-operation-state/expand-row-button.png)

Each expanded row shows the error message related to the operation which you selected earlier:

![operate-view-process-filters](./img/monitor-operation-state/expanded-instances-row.png)
