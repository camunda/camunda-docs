---
id: environments
title: Environments
description: "Learn how environments give teams a named place to deploy and run processes in Camunda Hub, and how they relate to clusters and tenants."
---

An environment is the named place where a team deploys and runs its processes in Camunda Hub. For example, a `payments-prod` environment gives the payments team its own isolated place to run production processes.

Clusters are the infrastructure underneath. Organization admins manage [clusters](./clusters.md), and teams work with the environments assigned to their [workspace](./workspaces.md).

## Environments and clusters

Camunda Hub separates the infrastructure you operate from the place your teams work:

|               | Cluster                                                      | Environment                                                                      |
| :------------ | :----------------------------------------------------------- | :------------------------------------------------------------------------------- |
| Purpose       | Administrative unit. The infrastructure that runs Camunda 8. | Operational unit. The place where a team deploys, tests, and operates processes. |
| Managed by    | Organization admins and DevOps                               | Assigned to workspaces by organization admins                                    |
| Typical tasks | Create, size, update, back up, and secure the cluster.       | Deploy a project, test a process, and open Operate, Tasklist, or Admin.          |

Teams deploy to an environment, not to a cluster. A cluster can host more than one environment, and every environment belongs to exactly one cluster. Learn more about [clusters](./clusters.md).

## How an Environment maps to infrastructure

An environment is backed by an isolated unit of a cluster. The cluster version determines which unit backs it, and you don't choose it:

| Cluster                             | Backed by                                                                   | Environments on the cluster                                                |
| :---------------------------------- | :-------------------------------------------------------------------------- | :------------------------------------------------------------------------- |
| Self-Managed, version 8.10 or later | [Physical Tenant](/self-managed/concepts/multi-tenancy/physical-tenants.md) | One for each Physical Tenant. The `default` Physical Tenant always exists. |
| SaaS                                | [Cluster](./clusters.md)                                                    | One environment                                                            |
| Any cluster before version 8.10     | [Cluster](./clusters.md)                                                    | One environment                                                            |

Camunda Hub derives the name of an environment, and you can't rename it. An environment backed by a Physical Tenant other than `default` uses the Physical Tenant ID. Any other environment uses the cluster name.

On SaaS and on earlier versions, the cluster and its environment collapse into a single choice. When you pick a target to deploy to, you pick the environment that's named after the cluster.

Camunda Hub also supports [Logical Tenants](/self-managed/concepts/multi-tenancy/logical-tenants.md) inside an environment. If the target of a deployment has more than one Logical Tenant, the deploy dialog asks you to choose one.

## Tags

An environment carries the tags of the cluster that backs it, for example `dev`, `test`, `stage`, or `prod`. Use tags to filter environments and to see which stage of your development lifecycle an environment serves.

The `prod` tag also marks an environment as a production environment. Your organization can require an approved project snapshot before anyone deploys to it. See [project deployment settings](/components/hub/workspace/modeler/modeler-settings.md#project-deployment).

## Who can see and use Environments

Organization admins assign environments to workspaces. An environment can be assigned to more than one workspace, and a workspace can have any number of environments, including none.

Every [project](./projects.md) in a [workspace](./workspaces.md) can use all the environments assigned to the workspace. A project can't reach an environment that its workspace doesn't have.

| Role                          | What the role sees                            |
| :---------------------------- | :-------------------------------------------- |
| Organization owner or admin   | Every environment in the organization         |
| Workspace admin or editor     | The environments assigned to their workspaces |
| Workspace viewer or commenter | No environments                               |

Seeing an environment doesn't grant access to what runs in it. The Orchestration Cluster decides who can deploy to an environment and use its applications. See [access control](/components/concepts/access-control/access-control-overview.md).

## What an Environment contains

Each environment has its own applications and its own health status:

- Operate, Tasklist, and Admin for the processes that run in the environment.
- Optimize, where it's configured.
- Job workers and their job statistics.

Cluster-level settings, such as the cluster size, version, backups, and IP allowlists, stay with the [cluster](/components/concepts/clusters.md).

## Next steps

- Learn how to [deploy a project](/components/hub/workspace/manage-projects/deploy-project.md).
- Read about [clusters](./clusters.md), [workspaces](./workspaces.md), and [projects](./projects.md).
- Read about [Physical Tenants](/self-managed/concepts/multi-tenancy/physical-tenants.md) and [Logical Tenants](/self-managed/concepts/multi-tenancy/logical-tenants.md).
- Look up the term in the [glossary](/reference/glossary.md#environment).
