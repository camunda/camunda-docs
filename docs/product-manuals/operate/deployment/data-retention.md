---
id: data-retention
title: Data retention
description: "Let's take a closer look at how Operate stores and archives data."
---

## How the data is stored and archived

[//]:# (Do you mean "indexes" in place of "indices" below?)

Operate imports data from Zeebe and stores it in Elasticsearch indices with a defined prefix (default: `operate`). Specifically, this includes the following:

 * Deployed processes, including the diagrams
 * The state of process instances, including variables and flow nodes, activated within instance execution, incidents, etc.
 
It additionally stores some Operate-specific data:

 * Operations performed by the user
 * List of users
 * Technical data, like the state of Zeebe import, etc.
 
The data representing process instance state becomes immutable after the process instance is finished. Currently, the data may be archived, meaning it will be moved to a dated index, e.g. `operate_variables_2020-01-01`, where date represents the date on which the given process instance was finished. The same is valid for user operations; after they are finished, the related data is moved to dated indices.

:::note
All Operate data present in Elasticsearch (from both **main** and **dated** indices) will be visible from the UI.
:::

## Data cleanup

In case of intensive Zeebe usage, the amount of data can grow significantly overtime. Therefore, you should think about the data cleanup strategy. Dated indices may be safely removed from Elasticsearch.

"Safely" means only finished process instances will be deleted together with all related data, and the rest of the data will stay consistent. You can use Elasticsearch Curator or other tools/scripts to delete old data.

:::note
Only indices containing dates in their suffix may be deleted.
:::
