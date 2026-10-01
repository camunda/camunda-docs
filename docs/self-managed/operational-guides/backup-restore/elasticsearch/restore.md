---
id: es-restore
title: "Restore a backup"
sidebar_label: "Restore a backup"
keywords: ["backup", "backups", "restore", "elasticsearch", "opensearch"]
description: "Learn how to restore a Camunda 8 Self-Managed backup using Elasticsearch or OpenSearch."
---

import ZeebeGrid from '../../../../components/zeebe/react-components/\_zeebe-card';
import { esRestoreApproachCards } from '../react-components/\_card-data';

Restore a previous backup of your Camunda 8 Self-Managed components and cluster when using Elasticsearch or OpenSearch as secondary storage.

## Choosing a restore approach

Restore the Zeebe partitions with one of two approaches. Both include restoring the Elasticsearch/OpenSearch snapshots as one of their steps.

<ZeebeGrid zeebe={esRestoreApproachCards} />

## About restoring a backup

A restore consists of two parts: restoring the Elasticsearch/OpenSearch snapshots, and restoring the Zeebe partitions from the Zeebe primary storage backup.

:::note
When restoring Camunda 8 from a backup, all components must be restored from their backup that corresponds to the same backup ID.
:::

## Prerequisites

The following general prerequisites are required before you can restore a backup, regardless of the restore approach:

| Prerequisite          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Component clean state | The restore process assumes a **clean state** for all components, including Elasticsearch/OpenSearch. This means **no prior persistent volumes** or **component state** should exist - all data is restored from scratch.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Camunda version       | <p>**Backups must be restored** using the **exact Camunda version** they were created with. As noted during the backup process, the version is embedded in the backup name.</p><p>This is essential because starting a component with a mismatched version may result in startup failures due to schema incompatibilities with Elasticsearch/OpenSearch and the component itself. Although schema changes are generally avoided in patch releases, they can still occur.</p><p>When using the Camunda Helm chart, this means figuring out the corresponding version. For this the [Camunda Helm chart Version Matrix](https://helm.camunda.io/camunda-platform/version-matrix/) can help. Click on the `major.minor` release and then search for the backed up patch release of your component. The other components would typically fit in there as well.</p> |

<details>
   <summary>Example: Work out your correct Camunda version</summary>

Our Backups look as follows:

```bash
camunda_optimize_1748937221_8.8.0_part_1_of_2
camunda_optimize_1748937221_8.8.0_part_2_of_2
camunda_webapps_1748937221_8.8.0_part_1_of_5
camunda_webapps_1748937221_8.8.0_part_2_of_5
camunda_webapps_1748937221_8.8.0_part_3_of_5
camunda_webapps_1748937221_8.8.0_part_4_of_5
camunda_webapps_1748937221_8.8.0_part_5_of_5
camunda_zeebe_records_backup_1748937221
```

From this, we know:

- Optimize: 8.8.0
- Web Applications (Operate / Tasklist): 8.8.0

Based on this, we can look in the [matrix versioning of 8.8](https://helm.camunda.io/camunda-platform/version-matrix/camunda-8.8) and see the corresponding Camunda Helm chart version is `13.0.0`.

</details>
