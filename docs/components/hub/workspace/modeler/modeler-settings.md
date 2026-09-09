---
id: modeler-settings
title: Camunda Hub modeler settings
description: Configure email notifications and project deployment policies in the Camunda Hub modeler settings.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Navigate to the modeler settings in Camunda Hub by clicking on your user icon in the top right corner of the Camunda Hub and selecting **Settings**. Here, you can configure email notifications and the project deployment policy.

## Email notifications

Configure the workspaces for which you will receive email notifications when a member mentions you in a comment:

1. In Camunda Hub, in the top right corner, click the user icon
2. Select **Settings**.
3. Under **Email notifications**, toggle the options to receive email notifications when you are mentioned in a comment.

## Project deployment

Organization admins can configure the deployment policy for projects in the Camunda Hub modeler settings.

<Tabs groupId="deployment-permissions" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value='saas'>

By default, only [organization administrators](/components/hub/organization/manage-users/manage-users.md) can deploy projects to clusters marked as
[production stages](/components/hub/workspace/manage-projects/deploy-project.md#deployment-stages) from Camunda Hub.

You can change this in the **Project deployment** settings:

1. In Camunda Hub, in the top right corner, click the user icon
2. Select **Settings**.
3. Under **Project deployment settings**, you can permit non-admin users with deployment permissions to deploy project snapshots to production stage clusters after a workspace member has reviewed and approved the project snapshot using the [project review](/components/hub/workspace/manage-projects/project-versioning.md#request-a-review) feature.

This setting can only be configured by organization admins and applies to all projects in the organization.

</TabItem>

<TabItem value='self-managed'>

By default, only users with the **Hub Admin** role can deploy projects to clusters marked as [production stages](/components/hub/workspace/manage-projects/deploy-project.md#deployment-stages) from Camunda Hub.

You can change this in the **Project deployment** settings:

1. In Camunda Hub, in the top right corner, click the user icon
2. Select **Settings**.
3. Under **Project deployment settings**, you can permit non-admin users with deployment permissions to deploy project snapshots to production stage clusters after a workspace member has reviewed and approved the project snapshot using the [project review](/components/hub/workspace/manage-projects/project-versioning.md#request-a-review) feature.

This setting can only be configured by users with the **Hub Admin** role and applies to all projects in the organization.

If the **Hub Admin** role doesn't exist, you can create it with the following permissions:

- Hub Internal API - `write:*`
- Hub Internal API - `admin:*`
- Camunda Identity Resource Server - `read:users`

Refer to the documentation pages about [assigning roles](../../../../self-managed/components/management-identity/application-user-group-role-management/manage-roles.md) and [adding permissions](/self-managed/components/management-identity/access-management/access-management-overview.md) for detailed instructions.

</TabItem>

</Tabs>

:::info
The deployment policy applies only to deployments of **projects** made from Camunda Hub.
Deployments made from Desktop Modeler and deployments of single BPMN files, for example, are not affected by this setting.
:::
