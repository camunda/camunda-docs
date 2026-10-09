---
id: manage-workspaces
title: Manage workspaces
description: "Create and manage workspaces within your organization."
---

import ConsoleIcon from "@site/docs/components/assets/icon-console.png";
import { BriefcaseIcon, ServerPlusIcon } from "@site/docs/components/assets/hub-icons";
import AoGrid from '../../../react-components/\_ao-card';

Create and manage workspaces within your organization.

## About workspaces

In Camunda Hub, a workspace is a collaboration space within an organization, representing a team or business domain. A workspace is assigned members, projects, and environments so all related work happens in one shared space.

You can create and manage workspaces at the organization level.

:::info
You can only manage workspaces at the organization level if you're an **Organization admin** or **Organization owner**.
:::

## View existing workspaces

To view existing workspaces, click **Workspaces** in the left navigation.

## Manage a workspace

<AoGrid ao={[
{
link: "./manage",
title: "Manage workspace",
image: BriefcaseIcon,
description: "Manage workspaces within your organization.",
},
{
link: "./manage-workspace-members",
title: "Manage workspace members",
image: ConsoleIcon,
description: "Manage members within your workspace.",
},
{
link: "../manage-environments/assign-environments",
title: "Assign environments to a workspace",
image: ServerPlusIcon,
description: "Choose the environments that projects in your workspace can deploy to.",
},
]} columns={2}/>
