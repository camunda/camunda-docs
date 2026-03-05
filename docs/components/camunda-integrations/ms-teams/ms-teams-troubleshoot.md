---
id: ms-teams-troubleshoot
title: Troubleshoot Camunda for Microsoft Teams
sidebar_label: Troubleshoot
description: "Troubleshoot Camunda for Microsoft Teams to fix common setup and connectivity issues."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import AoGrid from '../../../components/react-components/\_ao-card';
import { msTeamsCards } from '../../../self-managed/react-components/\_ms-teams-card-data';

Troubleshoot Camunda for Microsoft Teams to fix common setup and connectivity issues.

### The app does not appear in the Microsoft Teams store

<Tabs groupId="environment" defaultValue="saas" values={[
{ label: 'SaaS', value: 'saas' },
{ label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value="saas">

- Verify your organization allows third-party app installations.
- Search for "Camunda" in the Microsoft Teams app store.
- Check with your Teams administrator for app approval policies.

</TabItem>

<TabItem value="self-managed">

- The app is provisioned during [installation](./ms-teams-installation.md) and appears in the **Built for your org** section of Microsoft Teams Apps.
- If the app is not visible, check with your IT administrator.

</TabItem>

</Tabs>

### Unable to connect to Camunda organization

<Tabs groupId="environment" defaultValue="saas" values={[
{ label: 'SaaS', value: 'saas' },
{ label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value="saas">

- Ensure you have the required permissions in your Camunda organization.
- Verify your Camunda SaaS account is active and accessible.
- If no tasks or incidents are visible, double-check your Camunda organization, cluster, and tenant settings.

</TabItem>

<TabItem value="self-managed">

- Verify your Camunda Self-Managed distribution is running and accessible.
- Check your Identity configuration and ensure the user has the required roles.
- If no tasks or incidents are visible, double-check your cluster configuration in the `config.yaml` file.

</TabItem>

</Tabs>

### Tasks not displayed

- Check you are connected to the correct Camunda cluster.
- If notifications are not shown, check Microsoft Teams notifications are enabled, or re-run `@Camunda Set up notifications` in the channel.
- This could be due to an expired Camunda session or missing permissions. Sign out and sign in again.

## Get help

- Contact [Camunda support](/reference/contact.md) for assistance.
- Provide feedback through the [Camunda roadmap portal](https://roadmap.camunda.com).
