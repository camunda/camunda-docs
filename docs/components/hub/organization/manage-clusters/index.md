---
title: Manage clusters
description: "View the clusters that host your deployment environments, and manage the connectors that run on them."
---

import DocsIcon from "@site/docs/components/assets/icon-docs.png";
import AoGrid from '../../../react-components/\_ao-card';

A cluster is the infrastructure your organization operates, while teams deploy to [deployment environments](../manage-environments/index.md) that run on it. How you work with clusters in Camunda Hub depends on your deployment:

<AoGrid ao={[
{ link: "./self-managed-clusters",
title: "Clusters in Self-Managed",
image: DocsIcon,
description: "View the clusters that Camunda Hub shows, and learn how to make a cluster you provision visible.",
},
{
link: "../../../saas/clusters/create-cluster",
title: "Clusters in SaaS",
image: DocsIcon,
description: "Create, rename, resume, update, resize, and delete your clusters, and configure their settings.",
},
{
link: "./manage-connectors",
title: "Manage your connectors",
image: DocsIcon,
description: "Monitor and manage the connectors that run on your cluster.",
},
]} columns={3}/>
