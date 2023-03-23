---
id: asana
title: Asana Connector
sidebar_label: Asana Connector
description: Manage Asana project and tasks from your BPMN process.
---

The **Asana Connector** allows you to connect your BPMN service with [Asana](https://asana.com/).

## Prerequisites

To use the **Asana Connector**, you need to have an Asana [personal access token](https://developers.asana.com/docs/personal-access-token).

:::note
It is highly recommended not to expose your Asana personal access token as plain text. Instead, use Camunda secrets.
See an article on how to [manage secrets](../../../components/console/manage-clusters/manage-secrets.md) to learn more.
:::

## Create an Asana Connector Task

To use the **Asana Connector** in your process, either change the type of existing task by clicking on it and using
the wrench-shaped **Change type** context menu icon, or create a new Connector task by using the **Append Connector** context menu.
Follow our [guide to using Connectors](../use-connectors.md) to learn more.

## Fill in the authentication

In the section **Authentication** section, provide a **Personal access token**. [Read more how to obtain it](https://developers.asana.com/docs/personal-access-token).

## Select operation you wish to execute

### Tasks

#### Get tasks from a project

- **Asana API:** [Get tasks from a project](https://developers.asana.com/reference/gettasksforproject).
- **Project ID:** Globally unique identifier for the project.

#### Get a task by ID

- **Asana API:** [Get a task](https://developers.asana.com/reference/gettask).
- **Task ID**: The task to operate on.

#### Create a task

- **Asana API:** [Create a task](https://developers.asana.com/reference/createtask).
- **Task name:** The name of the task.
- **Project ID:** Globally unique identifier for the project.
- **Parent task ID:** Globally unique identifier for the parent task.
- **Notes:** Free-form textual information associated with the task (i.e. its description).

#### Delete a task

- **Asana API:** [Delete a task](https://developers.asana.com/reference/deletetask).
- **Task ID**: The task to operate on.

### Projects

#### Get projects

- **Asana API:** [Get multiple projects](https://developers.asana.com/reference/getprojects).
- **Workspace ID:** The workspace or organization to filter projects on.
- **Team ID:** The team to filter projects on.

#### Get a project by ID

- **Asana API:** [Get a project](https://developers.asana.com/reference/getproject)
- **Project ID:** Globally unique identifier for the project.

#### Create a project in a workspace

- **Asana API:** [Create a project in a workspace](https://developers.asana.com/reference/createprojectforworkspace)
- **Workspace ID:** Globally unique identifier for the workspace or organization.
- **Project name:** Name of the project. This is generally a short sentence fragment that fits on a line in the UI for maximum readability. However, it can be longer.
- **Project note:** Free-form textual information associated with the project (ie., its description).

#### Delete a project

- **Asana API:** [Delete a project](https://developers.asana.com/reference/deleteproject)
- **Project ID:** Globally unique identifier for the project.

## Handle Connector response

The **Asana Connector** is a protocol connector, meaning it is built on top of the **HTTP REST Connector**, therefore
handling response is still applicable [as described](./rest.md#response).
