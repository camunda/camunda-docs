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
import { ServerIcon, KeyRoundIcon } from "@site/docs/components/assets/hub-icons";
import HubStructureImg from "./img/organization-structure.png";
import HubWorkspacesImg from "./img/workspace-environments.png";
import AoGrid from '../react-components/\_ao-card';

Manage organizational resources, analyze operations and business value, and deliver agentic processes at scale with Camunda Hub.

## About Camunda Hub

Camunda Hub is the centralized platform tailored for:

- **Center of Excellence and Platform administration teams**, who manage infrastructure, member access, and workspaces, so delivery teams have the deployment environments and tools they need to ship process solutions at scale.
- **Delivery teams and automation domains**, who collaborate in managed workspaces with dedicated deployment environments, discover and use approved catalog assets, and model and deploy business processes.

With Hub, teams within your organization can build, deploy, and operate your processes faster with a clear organizational structure and dedicated deployment environments for each workspace.

<hr style={{ margin: '2.5rem 0', backgroundColor: '#dedede' }} />

<div class="double-column-container" style={{ paddingTop: '20px' }}>
<div class="double-column-left" style={{ flex: '1.4', paddingRight: '40px' }}>

<img src={HubStructureImg} alt="Camunda Hub organization structure: an organization contains workspaces, and a workspace contains projects with BPMN, DMN, form, RPA, template, folder, and readme files" title="Camunda Hub high-level structure" class="img-noborder" style={{marginTop: '0', marginBottom: '0'}}/>

</div>
<div class="double-column-right" style={{ flex: '2', marginTop: '-2.2rem' }}>

### Organization structure

Camunda Hub's organization view shows the workspaces you belong to, organized in a clear hierarchy:

**Organization → Workspace → Project → Files and folders**

You can manage organizational resources, including clusters, deployment environments, and workspaces, and govern the use of reusable assets.

<p class="link-arrow">[Manage organizational resources](/components/hub/organization/index.md)</p>

</div>
</div>

<div class="double-column-container" style={{ paddingTop: '50px' }}>
<div class="double-column-left" style={{ flex: '2', paddingRight: '40px', marginTop: '-2.2rem' }}>

### Workspaces and deployment environments

A deployment environment is the place where a team deploys and runs its processes, for example a development, staging, or production environment. Each deployment environment is hosted on a cluster, which remains the infrastructure that your administrators manage.

Organization admins assign deployment environments to workspaces. Projects in a workspace can deploy to all the deployment environments assigned to it, so you can deploy and promote your work with clear access controls.

<p class="link-arrow">[Build within a workspace](/components/hub/workspace/index.md)</p>

</div>
<div class="double-column-right" style={{ flex: '1.8' }}>

<img src={HubWorkspacesImg} alt="An organization sets up a workspace and assigns deployment environments to it. The dev, stage, and prod deployment environments are each hosted on their own cluster" title="Deployment environments" class="img-noborder" style={{marginTop: '0', marginBottom: '0'}}/>

</div>
</div>

## Manage organizational resources

Manage organizational resources, including clusters, deployment environments, and workspaces, and govern the use of reusable assets:

<AoGrid ao={[
{
link: "./organization/manage-workspaces",
title: "Manage workspaces",
image: ModelerIcon,
description: "Create and manage workspaces within your organization.",
},
{
link: "./organization/manage-clusters/",
title: "Manage clusters",
image: BPMNIcon,
description: "Create, monitor, and maintain the clusters that host your deployment environments.",
},
{
link: "./organization/manage-environments",
title: "Manage environments",
image: ServerIcon,
description: "See your deployment environments and assign them to workspaces.",
},
{
link: "./organization/credentials",
title: "Manage credentials",
image: KeyRoundIcon,
description: "Create a reusable credential for use with element template authentication or connection configuration.",
},
{
link: "./organization/manage-catalog",
title: "Manage the catalog",
image: ConnectorsIcon,
description: "Manage reusable automation assets in a Git repository, and publish them to Camunda Hub.",
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
description: "Monitor cluster health, track job and process execution, and measure organization business value.",
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
