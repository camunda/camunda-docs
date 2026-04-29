---
id: web-modeler-settings
title: Web Modeler settings
description: Configure email notifications and project deployment policies in the Web Modeler settings.
---

import WebModelerSettings from './img/web-modeler-settings/web-modeler-settings.png'
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Navigate to the Web Modeler settings by clicking on your user icon in the top right corner of the Web Modeler and selecting **Settings**. Here, you can configure email notifications and the project deployment policy.

<img src={WebModelerSettings} alt="Web Modeler settings" />

## Email notifications

Configure the projects for which you will receive email notifications when a collaborator mentions you in a comment.

To do this, select the top right **Open Settings** user icon in Web Modeler and click **Settings**. Here under **Email notifications**, toggle on or off the options to receive email notifications when you are mentioned in a comment for all projects and new projects.

## Project deployment

Organization admins can configure the deployment policy for projects in the Web Modeler settings.

<Tabs groupId="deployment-permissions" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value='saas'>

By default, only [organization administrators](/components/console/manage-organization/manage-users.md) can deploy projects to clusters marked as
[production stages](/components/modeler/web-modeler/process-applications/process-application-pipeline.md#deployment-pipeline-stages) from Web Modeler.

You can change this in the **Project deployment** settings. To get there, select the top right **Open Settings** user icon in Web Modeler and click **Settings**. Then, select **Project deployment**.

Here, you can permit non-admin users with deployment permissions to deploy project versions to production stage clusters
after a collaborator has reviewed and approved the project version using the
[project review](/components/modeler/web-modeler/process-applications/process-application-pipeline.md#review) feature.
This setting can only be configured by organization admins and applies to all projects in the organization.

</TabItem>

<TabItem value='self-managed'>

By default, only users with the **Web Modeler Admin** role can deploy projects to
clusters marked as [production stages](/components/modeler/web-modeler/process-applications/process-application-pipeline.md#deployment-pipeline-stages) from Web Modeler.

You can change this in the **Project deployment** settings. To get there, select the top right **Open Settings** user icon in Web Modeler and click **Settings**. Then, select **Project deployment**.

Here, you can permit non-admin users with deployment permissions to deploy project versions to production stage clusters
after a collaborator has reviewed and approved the project version using the
[project review](/components/modeler/web-modeler/process-applications/process-application-pipeline.md#review) feature.
This setting can only be configured by users with the **Web Modeler Admin** role and applies to all projects.

If the **Web Modeler Admin** role is not pre-existing, it can be created with the following permissions:

- Web Modeler Internal API - `write:*`
- Web Modeler Internal API - `admin:*`
- Web Modeler Internal API - `admin:*`
- Camunda Identity Resource Server - `read:users`

Refer to the documentation pages about [assigning roles](../../../self-managed/components/management-identity/application-user-group-role-management/manage-roles.md) and [adding permissions](/self-managed/components/management-identity/access-management/access-management-overview.md) for detailed instructions.

</TabItem>

</Tabs>

:::info
The deployment policy applies only to deployments of **projects** made from Web Modeler.
Deployments made from Desktop Modeler and deployments of single BPMN files, for example, are not affected by this setting.
:::
