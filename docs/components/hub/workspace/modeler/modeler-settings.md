---
id: modeler-settings
title: Camunda Hub modeler settings
description: Configure email notifications and project deployment policies in the Camunda Hub modeler settings.
---

Navigate to the modeler settings in Camunda Hub by clicking on your user icon in the top right corner of the Camunda Hub and selecting **Settings**. Here, you can configure email notifications and the project deployment policy.

## Email notifications

Configure the workspaces for which you will receive email notifications when a member mentions you in a comment:

1. In Camunda Hub, in the top right corner, click the user icon
2. Select **Settings**.
3. Under **Email notifications**, toggle the options to receive email notifications when you are mentioned in a comment.

## Project deployment

Organization admins can require an approved project snapshot before anyone deploys a project to a production Environment.

Camunda Hub treats an [Environment](/components/concepts/environments.md) as a production Environment if its tags include `prod`. The tags of an Environment come from its cluster. In SaaS, [tag the cluster](/components/hub/organization/manage-clusters/create-cluster.md#tag-your-cluster) as `prod`. In Self-Managed, add `prod` to the `tags` of the cluster in the [cluster configuration](/self-managed/components/hub/configuration/properties.md#clusters).

To change the policy:

1. In Camunda Hub, in the top right corner, click the user icon.
2. Select **Settings**.
3. Click **Projects deployment**.
4. Turn the **Require approval of project snapshots to deploy to production environments** toggle on or off.

| Setting           | Effect                                                                                                                                                                                          |
| :---------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Off (the default) | Any collaborator with deployment privileges can deploy to an Environment tagged `prod`, approved or not.                                                                                        |
| On                | Any collaborator with deployment privileges can deploy an **approved** project snapshot to an Environment tagged `prod`. An unapproved snapshot is blocked, and drafts can't be deployed there. |

When the toggle is off, access to production Environments is controlled by which Environments are [assigned to the workspace](/components/hub/organization/manage-environments/assign-environments.md) and by the deployment permissions in the cluster.

When the toggle is on and you try to deploy to a production Environment, the deploy dialog explains what's missing. See [production environments](/components/hub/workspace/manage-projects/deploy-project.md#production-environments). To get a snapshot approved, use the [project review](/components/hub/workspace/manage-projects/project-versioning.md#request-a-review) feature.

Only organization admins can change this setting. It applies to all projects in the organization.

### Self-Managed

In Self-Managed, only users with the **Hub Admin** role can change this setting.

If the **Hub Admin** role doesn't exist, you can create it with the following permissions:

- Hub Internal API - `write:*`
- Hub Internal API - `admin:*`
- Camunda Identity Resource Server - `read:users`

Refer to the documentation pages about [assigning roles](../../../../self-managed/components/management-identity/application-user-group-role-management/manage-roles.md) and [adding permissions](/self-managed/components/management-identity/access-management/access-management-overview.md) for detailed instructions.

:::info
The deployment policy applies only to deployments of **projects** made from Camunda Hub.
Deployments made from Desktop Modeler and deployments of single BPMN files, for example, are not affected by this setting.
:::
