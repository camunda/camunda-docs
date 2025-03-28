---
id: engine-data-deletion
title: "Engine data deletion"
description: "Explains how Optimize copes with the deletion of engine data."
---

The engine slows down if the historic data grows significantly over time, particularly in cases where the amount of data streaming in each day is large. One solution to this is to remove old data from the engine on a regular basis, yet still importing the data to Optimize so it can be used for deeper analytics.

To support the described use-case, Optimize does not care if you delete any data on the engine side. Specifically, Optimize does not sync with the engine on data deletion. If you want to remove any data from Optimize, you can either erase the data from Elasticsearch or use the [Optimize History Cleanup Feature](./../../configuration/history-cleanup/).

The subsections below describe the ways in which Optimize handles data deletion from the engine.

## Deletion of historic data

There are two possible ways of doing this:

- **Historic Cleanup**: If you have enabled the [history cleanup](https://docs.camunda.org/manual/latest/user-guide/process-engine/history/#history-cleanup), historic data will be removed in the engine based on configurable time-to-live.
- **Manual Deletion**: You trigger a [manual deletion](https://docs.camunda.org/manual/latest/reference/rest/history/process-instance/post-delete/), e.g. via REST-API.

Optimize can handle this case as it imports the old data first, and once it has imported everything, it will only add to its database new data streaming in.

## Manual deletion of deployments/definitions

In most cases, the deletion of deployments and definitions will not cause any problems. If you have several versions of a definition deployed, e.g. 1-4, and you delete the definition/deployment with definition version 1, then this wouldn't cause any issues. The assumption here is that Optimize has imported the definitions and related historical data beforehand. Otherwise, the deleted definition is lost.

However, there are two scenarios where Optimize will behave differently. The first is depicted as follows:

1. You deploy a (process/decision) definition A for the first time.
2. Optimize imports definition A with version 1.
3. You delete the definition/deployment of the definition without having added another version of it. Definition A with version 1 is removed from the engine.
4. You deploy the definition A with the same ID again.
5. Optimize imports another definition A with version 1.

Optimize identifies the unique definitions by the combination of `definition key`, `version`, and `tenant`, so in this case will have imported the same definition twice. Optimize handles this by marking the definition with the oldest deployment time as deleted. When selecting definitions in Optimize, definitions that are considered to be deleted will not be selectable for reporting. Any data that Optimize has imported related to the deleted definition will appear in reports that use the non-deleted definition.

To prevent this from happening, avoid deleting and redeploying the same definition (same definition key, tenant, and version) to the engine.

Secondly, when a definition is deleted in the engine before it has been imported by Optimize and the corresponding instance data is still present in the history tables of the engine, Optimize will attempt to import this instance data for both decision reports and for creating event-based processes. In this scenario, Optimize will simply skip the import of the instance data for definitions that it has not already imported and that have since been deleted in the engine. This data will not be available in Optimize.
