---
id: camunda-hub
title: Camunda Hub
description: "Manage organizational resources, analyze operations and business value, and deliver agentic processes at scale with Camunda Hub."
---

import DocsIcon from "@site/docs/components/assets/icon-docs.png";
import ConfigIcon from "@site/docs/components/assets/icon-config.png";
import ConsoleIcon from "@site/docs/components/assets/icon-console.png";
import ModelerIcon from "@site/docs/components/assets/icon-modeler.png";
import IntegrationIcon from "@site/docs/components/assets/icon-integration.png";
import OptimizeIcon from "@site/docs/components/assets/icon-optimize.png";
import BPMNIcon from "@site/docs/components/assets/icon-bpmn.png";
import ConnectorsIcon from "@site/docs/components/assets/icon-connectors.png";
import AoGrid from '../react-components/\_ao-card';

Manage organizational resources, analyze operations and business value, and deliver agentic processes at scale with Camunda Hub.

## About Camunda Hub

Camunda Hub is the unified platform where:

- **Center of excellence teams** manage infrastructure, member access, and workspaces, so delivery teams have the environments and tools they need to ship process solutions at scale.
- **Delivery teams** collaborate in managed workspaces, discover and use approved catalog assets, and model and deploy business processes.

## Manage organizational resources

Manage organizational resources, including clusters and workspaces, and govern the use of reusable assets:

<AoGrid ao={[
{
link: "./organization/manage-workspaces",
title: "Manage workspaces",
image: ModelerIcon,
description: "Create and manage workspaces within your organization.",
},
{
link: "./organization/manage-clusters/manage-cluster",
title: "Manage clusters",
image: BPMNIcon,
description: "Create, monitor, and assign clusters for seamless execution across all rollout stages.",
},
{
link: "./organization/credentials",
title: "Manage credentials",
image: IntegrationIcon,
description: "Create a reusable credential, then select it wherever an element template needs authentication or connection configuration, instead of repeating the settings in every diagram.",
},
{
link: "./organization/manage-catalog",
title: "Manage the catalog",
image: ConnectorsIcon,
description: "Manage reusable automation assets in a Git repository, and publish them to Camunda Hub so your delivery teams can discover and apply them when modeling.",
},
{
link: "./organization/manage-users",
title: "Manage users",
image: ConsoleIcon,
description: "Manage the users, user groups, and roles in your organization.",
},
{
link: "./organization/manage-organization-settings/organization-settings",
title: "Manage organization settings",
image: ConfigIcon,
description: "Manage organizational settings, and view usage alerts and history.",
},
{
link: "./organization/analyze-operations/",
title: "Analyze operations",
image: OptimizeIcon,
description: "Monitor cluster health, track job and process execution, and measure business value across your Camunda organization.",
},
]} columns={3}/>

## Build within a workspace

Discover and use approved reusable assets, manage projects, and deliver business processes:

<AoGrid ao={[
{
link: "./workspace/manage-projects",
title: "Manage projects",
image: DocsIcon,
description: "Develop project releases through the stages of a typical development lifecycle.",
},
{
link: "./workspace/manage-workspace",
title: "Manage workspace settings",
image: ConfigIcon,
description: "Manage workspace members, update general information, or delete a workspace.",
},
{
link: "./workspace/modeler",
title: "Model business processes",
image: ModelerIcon,
description: "Collaboratively design executable processes as the foundation for scalable IT and business automation.",
},
]} columns={3}/>
