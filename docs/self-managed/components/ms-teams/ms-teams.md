---
id: ms-teams
title: Camunda for Microsoft Teams
sidebar_label: Microsoft Teams app
description: "Bring Camunda's process management capabilities directly into Microsoft Teams for Self-Managed environments."
---

import AoGrid from '../../../components/react-components/\_ao-card';
import { msTeamsCards } from '../../react-components/\_ms-teams-card-data';

Bring Camunda's business process management capabilities directly into Microsoft Teams in your Self-Managed environment.

## About

**Camunda for Microsoft Teams** lets you manage processes, complete tasks, monitor incidents, and receive notifications — all without leaving your collaboration environment.

The app offers two ways to interact with Camunda:

| Interaction mode                  | Description                                                                      | Capabilities                                                             |
| :-------------------------------- | :------------------------------------------------------------------------------- | :----------------------------------------------------------------------- |
| [Tabs](./ms-teams-tabs.md)        | Visual pages embedded inside Microsoft Teams.                                    | Browse tasks, start processes, view incidents in a rich interface.       |
| [Chat Bot](./ms-teams-chatbot.md) | Conversational assistant available in personal chats, group chats, and channels. | Respond to text commands and interactive card buttons for quick actions. |

You sign in using your organization's Microsoft account, and then link it to your Camunda account during a one-time onboarding step.

:::info Self-Managed only
This section covers the Self-Managed installation and configuration of the Camunda for Microsoft Teams app. The Self-Managed setup requires installation and configuration by your organization's administrator. For SaaS usage, refer to the [SaaS Microsoft Teams app documentation](/components/early-access/alpha/ms-teams/ms-teams.md).
:::

### Key features

| Feature             | Description                                                         |
| :------------------ | :------------------------------------------------------------------ |
| Task management     | View, claim, assign, and complete user tasks directly in Teams.     |
| Start processes     | Browse process definitions and start new instances from Teams.      |
| Incident monitoring | View incidents, retry failed jobs, and open them in Operate.        |
| Notifications       | Receive personal and channel alerts for new or assigned user tasks. |
| Cluster management  | View cluster health and wake up suspended clusters.                 |

## Prerequisites

| Prerequisite         | Description                                                                                     |
| :------------------- | :---------------------------------------------------------------------------------------------- |
| Camunda Self-Managed | A running Camunda Self-Managed distribution with Identity (Keycloak).                           |
| Docker               | Docker installed on the system hosting the App Integrations backend.                            |
| PostgreSQL           | A PostgreSQL database accessible from the Docker container.                                     |
| Node.js              | Node.js 20 or later for the Teams app integration CLI.                                          |
| Microsoft Teams      | Microsoft Teams with admin permissions to add apps.                                             |
| DNS                  | A DNS name for the App Integrations backend (e.g., `app-integrations.camunda.your-domain.com`). |

## Get started

<AoGrid ao={msTeamsCards} columns={3}/>
