---
title: Manage clusters
description: "View the clusters that host your deployment environments, and manage the connectors that run on them."
---

import DocsIcon from "@site/docs/components/assets/icon-docs.png";
import { BoxesIcon } from "@site/docs/components/assets/hub-icons";
import AoGrid from '../../../react-components/\_ao-card';

A cluster is the infrastructure your organization operates, while teams deploy to [deployment environments](../manage-environments/index.md) that run on it. Find out how to work with clusters and their connectors in Camunda Hub:

<AoGrid ao={[
{ link: "./clusters",
title: "Clusters in the Hub",
image: BoxesIcon,
description: "View the clusters that host your deployment environments, and learn how to create and manage them in SaaS and Self-Managed.",
},
{
link: "./cluster-connectors",
title: "Manage your connectors",
image: DocsIcon,
description: "Monitor and manage the connectors that run on your cluster.",
},
]} columns={2}/>
