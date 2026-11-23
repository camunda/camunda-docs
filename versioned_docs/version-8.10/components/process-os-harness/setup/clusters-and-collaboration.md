---
id: clusters-and-collaboration
title: Set up clusters and collaboration for a ProcessOS project
sidebar_label: Clusters and collaboration
description: "Understand the three parts of a ProcessOS engagement, the governance cluster, the project repository, and the deployment target, and set them up for a team."
keywords:
  [
    "ProcessOS Harness",
    "governance cluster",
    "c8ctl profile",
    "Camunda 8 Run",
    "Git",
    "partner",
  ]
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## The three parts of an engagement

A ProcessOS project touches three separate things. Keeping them apart avoids the most common setup mistakes, especially when several people work on one project.

| Part                                      | What it holds                                                                                                                  | Where it lives                                                                                     |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| [Governance cluster](#governance-cluster) | The execution state of the [governance process](../build/governance-process.md): phase, milestones, open jobs and SME reviews. | A Camunda 8 cluster: local, SaaS, or Self-Managed.                                                 |
| [Project repository](#project-repository) | All project files: scope, generated artifacts, review questions, and the feedback collected in each iteration.                 | A local working copy on the builder's computer, shared through a Git remote.                       |
| [Deployment target](#deployment-target)   | The generated BPMN, DMN, forms, and job workers, deployed to be exercised and tested.                                          | A Camunda 8 cluster matching the project's target Camunda version, by default local Camunda 8 Run. |

The governance cluster and the deployment target can be the same cluster or two different ones. None of the three synchronizes with the others on its own:

- A shared governance cluster does not share project files. Tasklist can show SME review questions as forms, but the files stay in the repository.
- Starting or advancing the governance process does not deploy the generated solution. Deployment is a separate step, run in the [implementation phase](../build/phases/3-implementation.md).
- A `c8ctl` profile only selects the cluster endpoint and credentials for a command. It does not configure a Git remote, copy files, or move process data between clusters.

## Recommended setup for a team

For an engagement with more than one person, such as a partner team working with a customer:

- **Governance cluster:** a Camunda 8 SaaS or Self-Managed cluster that everyone on the project can reach.
- **Project repository:** a shared Git remote, hosted internally or by an approved provider. Each builder works in their own clone.
- **Deployment target:** local Camunda 8 Run on each builder's computer for validation, or the team's agreed development or test cluster.

A single builder working alone can run all three locally: a local governance cluster, a local repository, and local Camunda 8 Run.

## Governance cluster

`/process-os-governance-start` configures the governance cluster connection the first time it runs in a project. It asks for the cluster type:

- **local:** Camunda 8 Run started with `c8ctl`. No credentials are needed, and the `local` profile is used.
- **saas** or **self-managed:** a remote cluster, reached through a named `c8ctl` profile.

For a remote cluster, create the profile when the agent asks for it, with API client credentials authorized for that cluster:

```bash
c8 add profile <governance-profile> \
  --baseUrl=https://<governance-cluster-api-url> \
  --clientId=<client-id> \
  --clientSecret=<client-secret>
```

The agent validates the profile against the cluster and records the cluster type and profile name in the project's governance state (`.camunda/governance.json`). Credentials stay inside `c8ctl` and are never written to the project. Governance commands then pass this profile explicitly, so your active `c8ctl` profile (`c8 use profile`) does not change which cluster holds the governance process.

To point an existing project at a different governance cluster, run `/process-os-governance-start --reconnect`.

:::caution
Never commit credentials, or `.env` files that contain them, to the project repository. If you import a profile with `c8 add profile <name> --from-file <file>`, keep that file out of Git.
:::

## Project repository

The project folder on a builder's computer is a local working copy. The governance cluster does not share it with anyone. To collaborate:

1. Connect the project to a shared remote, and check it:

   ```bash
   git remote -v
   ```

1. Push the project, and have collaborators clone it. Use your team's normal branch and review process.
1. On a collaborator's computer, run `/process-os-governance-start` in the clone. It connects to the governance cluster and offers to attach to the project's active governance process instance, instead of starting a new one.

Collaborators need a `c8ctl` profile for the governance cluster on their own computer, with their own credentials.

## Deployment target

In the [implementation phase](../build/phases/3-implementation.md), ProcessOS Harness deploys the generated solution to a cluster that matches the project's target Camunda version, so it can be exercised end-to-end. By default, this is a local Camunda 8 Run cluster that the agent starts with `c8ctl` and addresses through a profile named after the version.

To validate against a local cluster yourself, start one that matches the target version. For an 8.10 target:

```bash
c8 cluster start 8.10
c8 cluster status
```

To deploy to a remote development or test cluster, add a separate profile for it and name that profile explicitly for each deployment:

```bash
c8 add profile <target-profile> \
  --baseUrl=https://<target-cluster-api-url> \
  --clientId=<client-id> \
  --clientSecret=<client-secret>

c8 deploy ./path/to/process.bpmn --profile=<target-profile>
```

When more than one profile is configured, pass `--profile` on every command that changes a cluster, and check which cluster you are about to change before you run it.

:::warning
Validating locally is not the same as deploying to a customer's agreed test, UAT, or production environment. Deploying to production is outside the scope of ProcessOS Harness, and remains your own release process.
:::

## Next steps

- [Install ProcessOS Harness and configure a project](../installation.md).
- Learn how the [governance process](../build/governance-process.md) guides you between milestones.
- See [c8ctl profile management](/apis-tools/c8ctl/getting-started.md#profile-management) for all profile options.
