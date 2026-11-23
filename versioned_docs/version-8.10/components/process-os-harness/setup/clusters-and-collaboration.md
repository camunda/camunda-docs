---
id: clusters-and-collaboration
title: Set up clusters and collaboration for a ProcessOS project
sidebar_label: Clusters and collaboration
description: "Decide where the governance process runs, where project files live, and where the generated solution is validated, and set up a project that several builders work on together."
keywords:
  [
    "ProcessOS Harness",
    "governance cluster",
    "c8ctl profile",
    "Camunda 8 Run",
    "Git",
    "collaboration",
  ]
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## Before your first project

Every ProcessOS project needs three things. Decide where each one lives before you run `/process-os-governance-start`:

| You need                                                                         | It holds                                                                         | Working alone       | Working as a team                                               |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------- | --------------------------------------------------------------- |
| A cluster for the [governance process](../build/governance-process.md)           | Where the project stands: the current phase, milestones, open jobs, SME reviews. | Local Camunda 8 Run | A Camunda 8 SaaS or Self-Managed cluster everyone can reach     |
| A Git repository                                                                 | All project files, including review questions and the feedback you collect.      | A local repository  | A shared Git remote, one clone per builder                      |
| A cluster to [deploy the solution](#where-the-generated-solution-is-deployed) to | The generated BPMN, DMN, forms, and job workers, while you test them.            | Local Camunda 8 Run | Local Camunda 8 Run, or your team's development or test cluster |

The governance cluster and the deployment cluster can be the same cluster.

## Set up a project for a team

Follow these steps when more than one builder works on a project.

1. **Create API client credentials for the governance cluster.** For SaaS, [create an API client](/components/saas/clusters/manage-api-clients.md) with the Zeebe scope and permission to deploy resources, because ProcessOS Harness deploys the governance process to this cluster.
1. **The first builder sets up the project.** [Install ProcessOS Harness](../installation.md), push the project to the shared Git remote, and run `/process-os-governance-start`. When the agent asks for the cluster type, choose **saas** or **self-managed**, then create the `c8ctl` profile it asks for:

   ```bash
   c8 add profile <profile-name> \
     --baseUrl=https://<cluster-api-url> \
     --clientId=<client-id> \
     --clientSecret=<client-secret>
   ```

1. **Every other builder joins it.** Clone the repository, add a `c8ctl` profile for the same cluster, and run `/process-os-governance-start` in the clone. The agent finds the project's active governance process and offers to attach to it.
1. **Everyone shares files through Git.** Pull before you start working, and push what you change, using your team's normal branch and review process.

ProcessOS Harness remembers the cluster for each project, so switching your active profile with `c8 use profile` does not move the project to another cluster. To connect a project to a different governance cluster, run `/process-os-governance-start --reconnect`.

:::caution
Credentials stay in `c8ctl` and are never written to the project. Keep it that way: don't commit client secrets or `.env` files to the repository.
:::

## What the governance cluster shares, and what it doesn't

The governance cluster shares where the project stands. Every builder sees the same phase, milestones, and open jobs, and SMEs answer review questions in Tasklist.

It does not share project files. Generated artifacts, review questions, and collected feedback are files in each builder's clone, and only reach the others through Git.

## Where the generated solution is deployed

Running the governance process does not deploy anything. The [implementation phase](../build/phases/3-implementation.md) deploys the generated solution to a cluster that matches the project's target Camunda version, so it can be tested end-to-end. By default, the agent starts a local Camunda 8 Run cluster for this, so you don't need to set anything up.

To deploy to your team's development or test cluster instead, add a profile for it, and name the profile on every command that changes that cluster:

```bash
c8 deploy <path> --profile=<test-cluster-profile>
```

:::warning
Deploying to production is outside the scope of ProcessOS Harness, and remains your own release process.
:::

## Next steps

- [Install ProcessOS Harness and configure a project](../installation.md).
- Learn how the [governance process](../build/governance-process.md) guides you between milestones.
- See [c8ctl profile management](/apis-tools/c8ctl/getting-started.md#profile-management) for all profile options.
