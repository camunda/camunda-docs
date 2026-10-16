---
id: camunda-hub
title: Camunda Hub
description: "Manage organizational resources, analyze operations and business value, and deliver agentic processes at scale with Camunda Hub."
---

import { BriefcaseIcon, ServerIcon, BoxesIcon, BookOpenIcon, LibraryIcon, TrendingUpIcon, KeyRoundIcon, SquareChevronRightIcon, ActivityIcon, BuildingComplexIcon } from "@site/docs/components/assets/hub-icons";
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

### Organization structure

Camunda Hub's organization view shows the workspaces you belong to, organized in a clear hierarchy:

**Organization → Workspace → Project → Files and folders**

You can manage organizational resources, including clusters, deployment environments, and workspaces, and govern the use of reusable assets.

<p class="link-arrow">[Explore Camunda Hub](#explore-camunda-hub)</p>

<div style={{ textAlign: 'center', margin: '1.5rem 0 2.5rem' }}>

<img src={HubStructureImg} alt="Camunda Hub organization structure: an organization contains workspaces, and a workspace contains projects with BPMN, DMN, form, RPA, template, folder, and readme files" title="Camunda Hub high-level structure" class="img-noborder" style={{marginTop: '0', marginBottom: '0', maxWidth: '100%'}}/>

</div>

<div class="double-column-container" style={{ paddingTop: '50px' }}>
<div class="double-column-left" style={{ flex: '2', paddingRight: '40px', marginTop: '-2.2rem' }}>

### Workspaces and deployment environments

A deployment environment is a deployment target where a team runs its processes, for example a development, staging, or production environment. Each deployment environment is hosted on a cluster, which remains the infrastructure that your administrators manage.

Organization admins assign deployment environments to workspaces. Projects in a workspace can deploy to all the deployment environments assigned to it, so you can deploy and promote your work with clear access controls.

<p class="link-arrow">[Work with workspaces](/components/hub/organization/manage-workspaces/index.md)</p>

</div>
<div class="double-column-right" style={{ flex: '1.8' }}>

<img src={HubWorkspacesImg} alt="An organization sets up a workspace and assigns deployment environments to it. The dev, stage, and prod deployment environments are each hosted on their own cluster" title="Deployment environments" class="img-noborder" style={{marginTop: '0', marginBottom: '0'}}/>

</div>
</div>

## Explore Camunda Hub

The sections of this documentation follow the navigation of Camunda Hub. Center of Excellence and platform administration teams use some of them more, and delivery teams use others more. Your role and permissions decide which of them you can open in Camunda Hub.

<AoGrid ao={[
{
link: "./organization/manage-workspaces",
title: "Workspaces",
image: BriefcaseIcon,
description: "Create workspaces and manage their members. Build projects and model business processes.",
},
{
link: "./organization/manage-environments",
title: "Environments",
image: ServerIcon,
description: "See your deployment environments and assign them to workspaces.",
},
{
link: "./organization/manage-clusters/",
title: "Clusters",
image: BoxesIcon,
description: "Monitor and maintain the clusters that host your environments.",
},
{
link: "./organization/shared-resources",
title: "Shared resources",
image: BookOpenIcon,
description: "Find the element templates that are published to your organization.",
},
{
link: "./organization/manage-catalog",
title: "Catalog",
image: LibraryIcon,
description: "Manage reusable automation assets in a Git repository, and publish them to Camunda Hub.",
},
{
link: "./organization/analyze-operations/business-value-dashboard",
title: "Business value",
image: TrendingUpIcon,
description: "Track process outcomes and set targets for cycle time and automation rate.",
},
{
link: "./organization/credentials",
title: "Credentials",
image: KeyRoundIcon,
description: "Create a reusable credential for use with element template authentication or connection configuration.",
},
{
link: "./organization/console",
title: "Console",
image: SquareChevronRightIcon,
description: "View clusters, usage, alerts, and activity of your organization at a high level.",
},
{
link: "./organization/analyze-operations/",
title: "Analyze operations",
image: ActivityIcon,
description: "Monitor the jobs of your environments and clusters, and follow AI agent adoption and costs.",
},
{
link: "./organization/manage-organization-settings/organization-settings",
title: "Organization",
image: BuildingComplexIcon,
description: "Manage your organization, its users and roles, and its settings.",
},
]} columns={3}/>
