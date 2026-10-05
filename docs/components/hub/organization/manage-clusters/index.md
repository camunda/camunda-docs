---
title: Manage clusters
description: "View the clusters that host your deployment environments, and manage the connectors that run on them."
---

import DocsIcon from "@site/docs/components/assets/icon-docs.png";
import { BoxesIcon, MonitorCloudIcon } from "@site/docs/components/assets/hub-icons";
import AoGrid from '../../../react-components/\_ao-card';

A cluster is the infrastructure your organization operates, while teams deploy to [deployment environments](../manage-environments/index.md) that run on it. How you work with clusters in Camunda Hub depends on your deployment:

<AoGrid ao={[
{ link: "./self-managed-clusters",
title: "Clusters in Self-Managed",
image: BoxesIcon,
description: "View the clusters that Camunda Hub shows, and learn how to make a cluster you provision visible.",
},
{
link: "./saas-clusters",
title: "Clusters in SaaS",
image: MonitorCloudIcon,
description: "Create and manage the SaaS clusters that host your deployment environments.",
},
{
link: "./cluster-connectors",
title: "Manage your connectors",
image: DocsIcon,
description: "Monitor and manage the connectors that run on your cluster.",
},
]} columns={3}/>
