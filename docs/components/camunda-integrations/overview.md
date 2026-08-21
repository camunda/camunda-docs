---
id: overview
title: "Camunda integrations"
description: "Learn more about Camunda integrations, such as Camunda's SAP and ServiceNow integrations."
---

import "../react-components/\_using-table.css";
import UsingGrid from '../react-components/\_using-card';
import { msTeamsCard, sapCard, serviceNowCard } from '../react-components/\_camunda-integrations-card-data';

Extend the power of your process orchestration by connecting Camunda with your core enterprise systems. Our pre-built integrations simplify communication across platforms and enable true end-to-end automation in your technology landscape.

## Microsoft Teams integration

Camunda for Microsoft Teams brings process management into your collaboration environment, so you can manage processes without leaving Microsoft Teams.

With this integration, you can:

- **Manage tasks and processes**  
  View, claim, assign, and complete user tasks, and start new process instances, directly from Microsoft Teams.

- **Get notified**  
  Receive personal and channel notifications for user tasks based on configurable notification rules.

:::note
This integration is released as an [early access](/components/early-access/overview.md) alpha feature.
:::

<UsingGrid using={[msTeamsCard]} />

## SAP integration

Camunda’s SAP integration allows you to include SAP S/4HANA, ECC, Advanced Event Mesh (AEM) and Business Technology Platform (BTP) functionality in your orchestrated processes.

With this integration, you can:

- **Execute core SAP functions**  
  Call BAPIs and Remote Function Modules (RFCs) in SAP S/4HANA or ECC directly from Camunda.

- **Extend event driven architecture**  
  Receive CloudEvents from SAP Advanced Event Mesh (AEM) and publish CloudEvents to AEM.

- **Connect to SAP BTP**  
  Integrate with services and applications on the SAP Business Technology Platform to build comprehensive, cross-platform workflows.

:::note
This integration is ideal for organizations standardizing on SAP systems while extending automation to non-SAP applications and services.
:::

<UsingGrid using={[sapCard]} />

## ServiceNow integration

Camunda’s ServiceNow integration bridges your business processes with IT service management (ITSM) to streamline and automate service delivery.

With this integration, you can:

- **Manage ServiceNow data**  
  Create, read, update, and delete records in any ServiceNow table directly from a Camunda process.

- **Trigger ServiceNow flows**  
  Initiate automations built in ServiceNow's Flow Designer as part of an end-to-end process.

:::note
Use this integration when you need to orchestrate processes that involve ITSM tasks or require seamless collaboration between ServiceNow and other business systems.
:::

<UsingGrid using={[serviceNowCard]} />
