---
id: organization
title: Organization
description: "Manage infrastructure, member access, and workspaces, so delivery teams have the environments and tools they need to ship process solutions at scale."
---

import DocsIcon from "@site/docs/components/assets/icon-docs.png";
import AoGrid from '../../react-components/\_ao-card';

Manage organizational resources, including clusters and workspaces, and govern the use of reusable assets.

## About organization-level management

With Camunda Hub, you'll manage your infrastructure, member access, and workspaces, so your delivery teams have the environments and tools they need to ship process solutions at scale. This governance happens at the organization level.

## Manage workspaces

Create and manage workspaces within your organization:

<span class="link-arrow">[Get started](./manage-workspaces/index.md)</span>

## Manage clusters

Create, monitor, and assign clusters for seamless execution across all rollout stages:

<AoGrid ao={[
{
link: "../../hub/organization/manage-clusters/create-cluster",
title: "Create a cluster",
image: DocsIcon,
description: "To deploy and run your process, you must create a cluster in Camunda 8.",
},
{
link: "../../hub/organization/manage-clusters/manage-cluster",
title: "Manage your cluster",
image: DocsIcon,
description: "Learn how to rename, resume, update, resize, or delete your cluster.",
},
]} columns={2}/>

## Manage the catalog

Establish a git repository with catalog assets, upload the assets in a CI/CD pipeline, and approve them for use within your organization:

<span class="link-arrow">[Get started](./manage-catalog/index.md)</span>

## Manage members

Manage the users, user groups, and roles in your organization:

<AoGrid ao={[
{
link: "../../console/manage-organization/manage-users",
title: "Manage users",
image: DocsIcon,
description: "Manage users of your organization.",
},
{
link: "../../console/manage-organization/manage-user-groups",
title: "Manage user groups",
image: DocsIcon,
description: "User groups are a way to organize users within your organization.",
},
]} columns={2}/>

## Manage organization settings

Manage organizational settings, and view usage alerts and history:

<AoGrid ao={[
{
link: "../../console/manage-organization/usage-history",
title: "View usage history",
image: DocsIcon,
description: "Monitor the number of started process instances, decision instances, and the number of task users.",
},
{
link: "../../console/manage-organization/view-organization-activity",
title: "View organization activity",
image: DocsIcon,
description: "View details of all activity within an organization, such as cluster creation, deletion, updates, and user invitations.",
},
]} columns={2}/>
