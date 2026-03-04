---
id: ms-teams-tabs
title: Tabs
sidebar_label: Tabs
description: "Browse tasks, start processes, and monitor incidents using embedded tabs in Microsoft Teams."
---

Browse tasks, start processes, and monitor incidents using embedded tabs in Microsoft Teams.

## About

Camunda for Microsoft Teams adds visual tabs to your Teams sidebar, providing a rich interface for interacting with your Camunda clusters. Each tab focuses on a specific area of process management.

## Tasks

With the **Tasks** tab, you can browse and manage user tasks from your Camunda clusters.

- **Filter tasks** by category: My tasks, All open tasks, Unclaimed tasks, or Completed tasks.
- **Sort and search** tasks using additional filter controls (assignee, candidate group, process, dates, priority).
- **Switch between views**: Card view or list view.
- **View task details** including the process it belongs to, priority, due date, and creation time.
- **Assign a task** to yourself and **complete it**, either by filling in a Camunda form or by providing data manually.
- **Navigate pages** in large task lists or load more items on mobile.

:::note
Tasks update automatically as you complete work in Camunda or Microsoft Teams.
:::

## Processes

With the **Processes** tab, you can view and start Camunda process definitions.

- Browse all available process definitions displayed as cards.
- Select a process and choose a specific version.
- Fill in a start form (if the process has one) or provide variables manually, then start a new process instance.
- After starting, get a direct link to view the running instance in [Operate](/components/operate/operate-introduction.md).

To start a process:

1. Select the **Processes** tab.
2. Select a process definition.
3. Complete any required fields.
4. Click **Start process**.

## Incidents

With the **Incidents** tab, you can monitor incidents that occurred during process execution.

- See a list of active incidents with error type, description, and timestamp.
- Retry a failed incident directly from Teams.
- Copy a link to the incident or open it in [Operate](/components/operate/operate-introduction.md) for deeper investigation.

## Onboarding

When you first open the app, the **Onboarding** page guides you through connecting your Teams account to your Camunda account via single sign-on. If you don't have a Camunda account yet, you can sign up from this page.

## Cluster status

The **Cluster Status** page displays the health of your currently selected cluster. If the cluster is suspended (sleeping), you can wake it up directly from this page.
