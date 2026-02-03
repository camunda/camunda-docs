---
id: overview
title: User operation audit log
sidebar_label: User operation audit log
description: A high-level overview of the User operation audit log in Camunda 8.
---

import BPMNIcon from "@site/docs/components/assets/icon-bpmn.png";
import DocsIcon from "@site/docs/components/assets/icon-docs.png";
import PlayIcon from "@site/docs/components/assets/icon-play.png";
import AoGrid from '../react-components/\_ao-card';

Audit a comprehensive record of operations across process, identity, and user task domains.

## About

With the **user operation audit log**, you'll access a record of operations, including who performed them, when, and on which entities.

Use the audit log to:

- Prove compliance
- Meet governance and regulatory requirements
- Maintain operational integrity and transparency
- Troubleshoot issues

## Impact on secondary storage

When the audit log is active, a record is written to [secondary storage](../../self-managed/concepts/secondary-storage/index.md) for every applicable operation instance. Because of this, you can expect an increase in disk usage by a factor of 1.5 to 2.0.

:::warning
The user operation audit log is enabled by default. Because of the increase in resource usage on secondary storage, you may see increased costs associated with this feature.
:::

You can configure the user operations audit log to fine-tune log thoroughness, resource usage, and financial costs according to your needs. Additionally, if using Camunda 8 Self-Managed, you control the [secondary storage retention policy](../../self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#index--retention-settings), which applies to user operation audit log records.

## Get started

<AoGrid ao={[
{
link: "../../operate/userguide/audit-operations",
title: "Audit operations in Operate",
image: PlayIcon,
description: "Learn how to audit operations in Camunda 8 Operate.",
},
{
link: "../../tasklist/userguide/audit-task-history",
title: "Audit task history in Tasklist",
image: PlayIcon,
description: "Learn how to audit task history in Camunda 8 Tasklist.",
},
{
link: "../../identity/audit-operations",
title: "Audit operations in Identity",
image: PlayIcon,
description: "Learn how to audit operations in Camunda 8 Identity.",
},
]} columns={3}/>

## Learn the fundamentals

<AoGrid ao={[
{
link: "recorded-operations",
title: "Recorded operations",
image: DocsIcon,
description: "Learn what operations are recorded in the audit log.",
},
{
link: "access-control",
title: "Access control",
image: DocsIcon,
description: "Reference the permissions required to access audit log entries.",
},
{
link: "operation-structure",
title: "Operation data structure",
image: DocsIcon,
description: "Learn how operation data from the audit log is presented in different contexts.",
},
]} columns={3}/>

## Explore further resources

- [Use the Camunda REST API to access the audit log](../../apis-tools/orchestration-cluster-api-rest/specifications/search-audit-logs.api.mdx)
