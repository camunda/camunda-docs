---
id: overview
title: Audit log
sidebar_label: Audit log
description: A high-level overview of the audit log in Camunda 8.
---

import BPMNIcon from "@site/docs/components/assets/icon-bpmn.png";
import DocsIcon from "@site/docs/components/assets/icon-docs.png";
import PlayIcon from "@site/docs/components/assets/icon-play.png";
import AoGrid from '../react-components/\_ao-card';

Audit a comprehensive record of operations across process, identity, and user task domains.

## About

The audit log is a record of operations, including who performed the operation, when it was performed, and on which entities the operation was performed.

Use the audit log to:

- Prove compliance
- Meet governance and regulatory requirements
- Maintain operational integrity and transparency
- Troubleshoot issues

## Impact on secondary storage

When the audit log is active, a record is written to [secondary storage](../../self-managed/concepts/secondary-storage/index.md) for every applicable operation instance. Because of this, you can expect an increase in disk usage by a factor of 1.5 to 2.0.

:::warning
The audit log is enabled by default. Because of the increase in resource usage on secondary storage, you may see increased costs associated with this feature.
:::

By default, only user operations are tracked, not [client](../zeebe/technical-concepts/architecture.md#clients) operations. You can configure the audit log to fine tune log thoroughness and resource usage according to your needs:

- [SaaS](../console/manage-clusters/configure-audit-log.md)
- [Self-Managed](../../self-managed/concepts/audit-log/configure.md)

## Get started

Start auditing operations in Operate, Tasklist, and Identity.

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

Learn fundamental concepts about how the audit log works and how to access its data.

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

Once you have a foundational understanding of the audit log, explore these additional resources:

- [Use the Camunda REST API to access the audit log](../../apis-tools/orchestration-cluster-api-rest/specifications/search-audit-logs.api.mdx)
