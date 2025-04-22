---
id: model-your-first-process
title: Model your first process
description: "Use Modeler to design and deploy your first process, share your process, and collaborate on a process."
---

import SaasPrereqs from './react-components/\_saas-prerequisites.md'

<span class="badge badge--beginner">Beginner</span>
<span class="badge badge--medium">Time estimate: 15 minutes</span>

<details>
   <summary>Have you signed up for Camunda yet?</summary>
   <SaasPrereqs/>
</details>

## Design a process

With Camunda 8, you can design a process using both [Desktop Modeler and Web Modeler](/components/modeler/about-modeler.md). For this guide, we will use [Web Modeler](../components/modeler/about-modeler.md).

1. From Web Modeler, select **Create new project**.
2. Name your project and select **Create new > BPMN diagram**.
   ![blank project create bpmn diagram](./img/blank-project.png)
3. Give your model a descriptive name and ID within the **General** tab inside the properties panel on the right side of the screen. For example, you may name the diagram `Process invoice` with an ID of `process_invoice`. A task's ID in BPMN is a unique identifier used for internal reference for that specific task within the process diagram.
4. Create a task by dragging the rectangular task icon from the palette, or by clicking the existing start event, hovering over the `+` icon, and selecting the task icon. Ensure an arrow connects the start event to the task.

:::note
So far, we have included two BPMN elements in our diagram: a start event and a task. [Events](/components/modeler/bpmn/events.md) in BPMN represent things that happen. A process can react to events and emit events, for example. The basic elements of BPMN processes are [tasks](/components/modeler/bpmn/tasks.md), or atomic units of work composed to create a meaningful result. For example, you might [orchestrate human tasks](/guides/getting-started-orchestrate-human-tasks.md). Whenever a token reaches a task, the token stops and Zeebe creates a job and notifies a registered worker to perform work. Review the [complete list of supported BPMN elements](/components/modeler/bpmn/bpmn-coverage.md)
:::

5. Name the task by double-clicking the task or using the properties panel.
6. Create an end event by dragging the end event icon from the palette, or by clicking the existing start event and clicking the end event icon.

Web Modeler auto-saves every change you make, so there is no need to save while modeling your process.

![simple process](./img/simple-task-creation.png)

## Deploy and run your process

Deploying a process and running a process are two distinct steps in BPMN:

- **Deploying a process**: This involves uploading the BPMN diagram to a process engine or workflow management system. It makes the process definition available for execution, but doesn't start any process instances.
- **Running a process**: This refers to creating and executing an instance of the deployed process. It involves starting the process, which then follows the defined flow of activities and gateways.

In short, deployment makes the process available, while running actually executes it.

1. Click **Deploy** to deploy the process to your cluster. If you have not yet created a cluster, clicking **Deploy** will take you to Console to [create a cluster](create-cluster.md) first.
2. After you deploy your process, it can be executed on the cluster. Click **Run** in Modeler. Read more about [run options](/components/modeler/web-modeler/run-or-publish-your-process.md).

## Share your process

You can share read-only models with teammates and other stakeholders via a link. To do this, follow the steps below:

1. From your diagram, click the three vertical dots to the right of the **Run** button. Select **Share**.
2. The **Create share link** modal will appear. Click **Create link** to generate a sharable link.
3. Your **Link URL** will appear along with a blue **Copy** button. Note other options and features available when sharing a diagram, such as sharing via email.
4. Send your link to your stakeholder to allow them to view the process. They do not need a Camunda account to view the process.

![share link sample](./img/share-link.png)

## Collaborate on a process

To invite collaborators to your process, ensure they have the proper permissions and roles:

1. Select the **Open Organizations** icon in the top right of the navigation bar and select **Manage** next to your organization name.
2. Navigate to **Users > Add new user**. Add your colleague's email and assign them an appropriate role - **Developer** is likely a good default option here as the user will have full access to Console, Operate, and Tasklist without deletion privileges. See [all roles and permissions](/components/console/manage-organization/manage-users.md#roles-and-permissions) for additional details.
3. Select **Add**. An email will be sent to the email you provided. Your colleague must select **Join** to finish adding them to the organization.
4. Now that they're added to the organization, you can add them to a project. Open **Modeler**, navigate to your project, and open the **Collaborators** panel on the right side.
5. Select **Add user** and find your colleague you added to your organization. Assign their role with the dropdown and select **Send invites**.
   ![add new user](./img/invite-collaborators.png)
6. After your colleague selects **Accept invitation**, they will have access to the project based on the role you assigned. To understand what permissions each role has, review [access rights and permissions](/components/modeler/web-modeler/collaboration.md#access-rights-and-permissions).

As a next step, learn more about ensuring clarity, reusability, and governance within your organization in [using a shared project for organization-wide collaboration](/guides/use-shared-project-for-organization-wide-collaboration.md).

For a slightly more advanced example of modeling a process using BPMN, visit our guide on [automating a process using BPMN](/guides/automating-a-process-using-bpmn.md).
