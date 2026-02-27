---
id: ms-teams
title: Camunda for Microsoft Teams
sidebar_label: Microsoft Teams
description: "Bring Camunda's process management capabilities directly into Microsoft Teams for Self-Managed environments."
---

import AoGrid from '../../../components/react-components/\_ao-card';
import { msTeamsCards } from '../../../self-managed/react-components/\_ms-teams-card-data';

Bring Camunda's business process management capabilities directly into Microsoft Teams in your Self-Managed environment.

## About

With **Camunda for Microsoft Teams**, you can manage processes, complete tasks, monitor incidents, and receive notifications without leaving your collaboration environment.

The app offers two ways to interact with Camunda:

| Interaction mode                  | Description                                                                      | Capabilities                                                             |
| :-------------------------------- | :------------------------------------------------------------------------------- | :----------------------------------------------------------------------- |
| [Chat bot](./ms-teams-chatbot.md) | Conversational assistant available in personal chats, group chats, and channels. | Respond to text commands and interactive card buttons for quick actions. |
| [Tabs](./ms-teams-tabs.md)        | Visual pages embedded inside Microsoft Teams.                                    | Browse tasks, start processes, view incidents in a rich interface.       |

You sign in using your organization's Microsoft account, and then link it to your Camunda account during a one-time onboarding step.

:::info Self-Managed only
This section covers the Self-Managed installation and configuration of Camunda for Microsoft Teams. The Self-Managed setup requires installation and configuration by your organization's administrator. For SaaS usage, refer to the [SaaS Microsoft Teams documentation](/components/early-access/alpha/ms-teams/ms-teams.md).
:::

### Key features

| Feature             | Description                                                         |
| :------------------ | :------------------------------------------------------------------ |
| Task management     | View, claim, assign, and complete user tasks directly in Teams.     |
| Start processes     | Browse process definitions and start new instances from Teams.      |
| Incident monitoring | View incidents, retry failed jobs, and open them in Operate.        |
| Notifications       | Receive personal and channel alerts for new or assigned user tasks. |
| Cluster management  | View cluster health and wake up suspended clusters.                 |

## Get started

Get started with Camunda for Microsoft Teams by installing and configuring the app in a Self-Managed environment:

<p><a href="./ms-teams-installation/" class="link-arrow">Install Camunda for Microsoft Teams</a></p>

## Explore further resources

<AoGrid ao={msTeamsCards} columns={2}/>
