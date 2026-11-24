---
id: project-setup
title: Set up your organization for ProcessOS Harness
sidebar_label: Organizational setup
description: "Prepare your organization for a ProcessOS project by running the first engagement with a partner or a Camunda Field Delivery Engineer, and by completing the Camunda Academy overview course."
keywords: ["ProcessOS Harness", "onboarding", "Camunda Academy"]
---

Before you install anything, set your organization up to succeed with ProcessOS Harness. This page covers the organizational preparation. For the technical setup, see [install ProcessOS Harness and configure a project](../installation.md).

ProcessOS Harness is a new way of running projects, not a new feature in a familiar tool. The interaction model is unfamiliar, and the early access release assumes a trained builder. The two steps below are the intended path for early access, not optional extras.

## Run your first project with a partner or a Camunda FDE

Run your first ProcessOS project together with an enabled partner or a Camunda Forward Deployed Engineer (FDE), rather than on your own.

The first journey is where an unfamiliar interaction model costs the most. Someone who has already completed an engagement can tell a recoverable result from a dead end, which saves you iterations. Once your team has one project behind it, later projects are far less dependent on outside support.

Contact your Camunda account team to arrange this.

## Complete the Camunda Academy overview course

Complete the ProcessOS Harness overview course in [Camunda Academy](https://academy.camunda.com/camunda-8-processos-harness-overview) before you start a project.

Academy is where you build the capability to work with ProcessOS Harness, including the mindset shift that working with non-deterministic AI output requires. This documentation is written for a builder who has already done that, and it's here to keep you unblocked rather than to teach the approach from scratch.

Treat the overview course as a prerequisite for your first project.

## Plan the effort

ProcessOS Harness runs many agent iterations. Plan for six to eight hours for one journey from discovery through implementation.

### Token cost

A journey has a real token cost that depends on the scenario:

| Scenario                                   | Token cost (USD) |
| ------------------------------------------ | ---------------- |
| Explorative run, small use case            | 300 to 600       |
| Lift-and-shift, medium-sized process       | 800 to 1,500+    |
| AI transformation, medium-to-large process | 1,000 to 2,000+  |

Treat these ranges as planning inputs rather than fixed prices. The following factors influence the cost:

- Model: For good results with ProcessOS, we recommend using a capable model, such as Opus or a comparable model. Pricing varies by model.
- Process complexity and size.
- Discovery input: Its size, format, scope, and quality. For example, extracting a process from images in a PDF costs more than reading text-based files, such as BPMN files.
- Review iterations: The number of iterations required to reach an agreed-upon result.
- Transformation tier: A lift-and-shift transformation costs less than a radical transformation.

### SME involvement

Involve your SMEs early. ProcessOS Harness changes their role from main contributor to reviewer, which reduces their total effort, but they still need to be available at the review gates in each phase. A project stalls when a review cycle has no reviewer.

## Use ProcessOS as a team

Several builders can work on one ProcessOS project when they share one governance cluster and one Git remote.

ProcessOS Harness has no separate team feature. Use the setup in this section as the recommended practice. For the components of a project, see [the main components of ProcessOS Harness](../overview.md#what-are-the-main-components-of-processos-harness).

| Component          | Working alone                                          | Working as a team                                                                                                                                                  |
| ------------------ | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| AI coding agent    | One agent on your computer.                            | One agent for each builder, on the builder's own computer.                                                                                                         |
| Governance cluster | Local Camunda 8 Run, or a cluster your SMEs can reach. | One Camunda 8 SaaS or Self-Managed cluster that all builders and SMEs can reach.                                                                                   |
| Git project        | A local repository.                                    | One shared Git remote. Each builder works in their own clone.                                                                                                      |
| Target cluster     | Local Camunda 8 Run.                                   | Local Camunda 8 Run on each builder's computer. For a SaaS or Self-Managed target cluster, the agent uses an existing profile, for example the governance profile. |

### Set up a project for a team

1. Create API client credentials for the governance cluster. The credentials must let ProcessOS Harness deploy the governance process and start process instances. For SaaS, see [manage API clients](/components/saas/clusters/manage-api-clients.md).
1. The first builder [installs ProcessOS Harness](../installation.md#install), pushes the project to the shared Git remote, and runs `/process-os-governance-start`. When the agent asks for the cluster type, choose **saas** or **self-managed**, then [create the `c8ctl` profile](../installation.md#connect-the-governance-cluster). The agent starts a new governance process instance and shows its key.
1. The first builder shares the process instance key with the team. On a shared cluster, `/process-os-governance-start` lists the active governance process instances of all projects on that cluster, by key and start date only.
1. Every other builder prepares their computer: the [builder client requirements](system-requirements.md#builder-client), and `c8ctl` with the ProcessOS Harness plugin, as in [install ProcessOS Harness](../installation.md#install).
1. Every other builder clones the repository and adds a `c8ctl` profile for the same governance cluster. The profile name can be different for each builder.
1. Every other builder runs `/process-os-governance-start` in their clone, chooses the same cluster type, enters their profile name, and selects the process instance with the shared key. If the agent reports `Could not reach the cluster using profile`, run `/process-os-governance-start --reconnect`.
1. All builders share files through Git. Pull before you start working, and push what you change, with your team's normal branch and review process.

Don't commit client secrets or `.env` files to the repository. Credentials stay in `c8ctl`.

### Know what the governance cluster shares

The governance cluster shares the project state with every builder: the current phase, milestones, and open jobs. SMEs answer review questions in Camunda Tasklist.

The governance cluster doesn't share project files. Generated artifacts and collected feedback are files in each builder's clone. They reach the other builders only through Git.

## Next steps

1. [Understand the builder workspace](builder-workspace.md).
2. Check the [system requirements](system-requirements.md).
3. [Install ProcessOS Harness and configure a project](../installation.md).
