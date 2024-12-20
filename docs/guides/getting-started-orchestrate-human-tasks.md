---
id: orchestrate-human-tasks
title: Get started with human task orchestration
sidebar_label: Human tasks
description: "Efficiently allocate work through user tasks."
keywords: [human tasks, orchestration, getting started, user guide]
---

<span class="badge badge--beginner">Beginner</span>
<span class="badge badge--medium">Time estimate: 15 minutes</span>

import ExpressionInputImg from './img/expression-input-example.png';
import FormValuesImg from './img/form-values-example.png';
import HumanTaskDiagramImg from './img/human-task-bpmn-diagram.png';
import FormValuesTop from './img/form-values-top.png';
import FormValuesBottom from './img/form-values-bottom.png';
import FormId from './img/form-id.png';
import ImplementModeImg from './img/implement-mode-active.png';
import FormLinkingImg from './img/form-linking.png';
import ModelerNavImg from './img/modeler-navigation.png';
import ModelerGlobalNavImg from './img/modeler-global-nav.png';
import ModelerFormMenuImg from './img/modeler-form-menu.png';
import RunProcessImg from './img/run-process.png';
import RunProcessSM from './img/run-process-sm.png';
import OperateHumanTasks from './img/operate-human-tasks.png';
import FormEditorImg from './img/form-editor.png';
import NavigationHistoryImg from './img/modeler-navigation-history.png';
import PlayButtonImg from './img/play-play-button.png';
import PlayOpenFormImg from './img/play-open-form.png';
import PlayChickenImg from './img/play-chicken-complete.png';
import HumanTasksImg from './img/human-task-bpmn-diagram-tasks.png';
import HumanTasksGatewayImg from './img/human-task-bpmn-diagram-gateway.png';
import PlayOperateImg from './img/play-operate.png';
import OperateTasklistImg from './img/operate-open-tasklist.png';

import clsx from "clsx";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SaasPrereqs from './react-components/\_saas-prerequisites.md'
import Install from './react-components/\_install-c8run.md'

You can use Camunda 8 to orchestrate processes with human tasks of any complexity. Use the [user task BPMN element](/components/modeler/bpmn/user-tasks/user-tasks.md) to create and assign tasks to users, who can then perform their work and enter the required data to drive the business process.

## About this guide

This guide introduces you to the basics of human task orchestration. You will create a simple process to decide on what to eat for dinner, and drive the process flow according to that decision.

- Select **Desktop** to see an example using Camunda 8 Run and Desktop Modeler in a local development environment.
- Select **Web** to see an example using Camunda 8 SaaS and Web Modeler.

:::note
For a video-based learning experience and a more complex example, see [Getting Started with Human Workflow](https://bit.ly/3PJJocB).
:::

<Tabs groupId="install" defaultValue="saas" queryString values={
[
{label: 'Desktop', value: 'sm' },
{label: 'Web', value: 'saas' },
]}>
<TabItem value="sm">

<details>
<summary>Have you installed Camunda yet?</summary>
<Install/>
</details>
</TabItem>
<TabItem value="saas">
<details>
<summary>Have you signed up for Camunda yet?</summary>
<SaasPrereqs/>
</details>
</TabItem>
</Tabs>

<Tabs groupId="install" className="tabs-hidden">
<TabItem value="saas">

In this example, you will learn how to:

- Create and run your first process with a human in the loop.
- Build a BPMN diagram using [Web Modeler](/components/modeler/web-modeler/launch-web-modeler.md).
- Create and link a form to a [user task](/components/modeler/bpmn/user-tasks/user-tasks.md).
- Validate your process using [Play mode](/components/modeler/web-modeler/play-your-process.md).

<p><img src={HumanTaskDiagramImg} alt="The completed BPMN diagram." /></p>

</TabItem>
<TabItem value="sm">

You will learn how to:

- Create and run your first process with a human in the loop.
- Build a BPMN diagram using Modeler.
- Create and link a form to a user task.
- Deploy and run your process.
- Complete the task in Tasklist, and check the process in Operate.

</TabItem>
</Tabs>

Perform the following steps to create and run your first process with a human in the loop.

## Step 1: Create and design a process

Start by creating and designing a process to demonstrate how to route the process flow based on a user decision. In this example, you will create a process to decide what to eat for dinner.

### Create a new process

<Tabs groupId="install" className="tabs-hidden">
<TabItem value="saas">

First, create the BPMN diagram file and project.

1. Open Web Modeler, and click **New project**.
1. Select **Create process application** to [create a new process application](/components/modeler/web-modeler/process-applications.md).
1. Name the process application. For example, `Decide for Dinner`.
1. Select a development cluster to use during development. If you have not already defined your [development stage and cluster](/components/modeler/web-modeler/process-application-pipeline.md#deployment-pipeline-stages), you are prompted to do so. Click **Define stages** to begin this process.
1. Select **Create** to create the process application and the main process BPMN diagram.

1. Once created, click the process name to open the main process BPMN diagram.

:::note
A [process application](/components/modeler/web-modeler/process-applications.md) is a type of folder that contains a set of related files you can work on and deploy as a single bundle. This reduces the risk of a broken deployment at runtime, and makes it easier to deploy related files.
:::

</TabItem>
<TabItem value="sm">

Within Desktop Modeler, select **BPMN diagram** under **Create a new file**.

</TabItem>
</Tabs>

### Design the process

<Tabs groupId="install" className="tabs-hidden">
<TabItem value="saas">

Next, you must design the process itself.

:::note

Check you are in **Implement** mode so you can configure the process technical details.
<img src={ImplementModeImg} style={{width: 250}} alt="Active implement mode tab." />

:::

</TabItem>
<TabItem value="sm">

</TabItem>
</Tabs>

1. A **start event** is automatically added to the canvas and selected.
2. Append a task. For example, hover over the blue plus icon and select the **Append Task** icon from the [context pad](/components/modeler/web-modeler/context-pad.md).
3. Enter a descriptive name for the task, for example `Decide what's for dinner`.
4. Change the task type by clicking the **Change element** icon. Select **User task**.
5. Select the new user task and append an exclusive gateway. For example, hover over the blue plus icon and select the diamond-shaped **Exclusive Gateway** icon. A gateway allows you to conditionally route the process flow.
6. Select the gateway and append a task. Repeat this to create a second process flow. Name the tasks based on what the user decides to eat, for example, `Prepare chicken` and `Prepare salad`.
   <img src={HumanTasksImg} style={{width: 350}} alt="Linking to the first gateway." />

7. To route the user to the right task, add [expressions](/components/concepts/expressions.md) to the **sequence flows**. Sequence flows are represented by arrows connecting the gateway to the tasks. To add an expression, click on a sequence flow to view the **properties panel**, and open the **Condition** section.
8. Verify the sequence flows have the following expressions: `meal = "Salad"` on one side, and `meal = "Chicken"` on the other. You will define the variable `meal` later when designing a form for the user task.

   <p><img src={ExpressionInputImg} style={{width: 400}} alt="Example of a conditional expression." /></p>

9. Connect the split process flows again. Append another exclusive gateway to one of the tasks. Select the other task and drag the arrow-shaped sequence flow tool to connect it to the gateway.
   <img src={HumanTasksGatewayImg} style={{width: 350}} alt="Linking to the end event." />
10. Select the gateway and add an **end event** to your process (the circle with the thick outline).

:::note
New to BPMN or want to learn more? Visit our [BPMN cheat sheet](https://page.camunda.com/wp-bpmn-2-0-business-process-model-and-notation-en) for an overview of all BPMN symbols.
Variables are part of a process instance and represent the data of the instance. To learn more about these values, variable scope, and input/output mappings, visit our documentation on [variables](/components/concepts/variables.md).
:::

<!-- TODO note that processes can be of any complexity, and link to advanced guides -->

## Step 2: Design and link a form

You have now designed the process. To allow the user to make the decision, you must next design a [form](../components/modeler/forms/camunda-forms-reference.md). Forms are added to user tasks and start events to capture user input that is used to route the process flow, make API requests, or orchestrate your services.

<Tabs groupId="install" className="tabs-hidden">
<TabItem value="saas">

:::note

- You do not need to save your process diagram as Web Modeler automatically saves every change you make.
- You can also create [milestones](/components/modeler/web-modeler/milestones.md) to save a version snapshot of your BPMN or DMN diagram at any time.

:::

1. Select the user task you created in **[Step 1](#step-1-create-and-design-a-process)**.
1. Click the blue **Link Form** icon in the [context pad](/components/modeler/web-modeler/context-pad.md), and click **Create new form**.
1. A form is created and opened in the form editor. The form is automatically named and linked to the user task.
1. Click and drag a **Text view** component (found under Presentation) into the empty form.

   <img src={FormEditorImg} alt="Dragging a component to a form." />

1. Open the **General** section in the properties panel and enter a description, such as `What's for dinner?`.
1. Click and drag a **Radio** component into the form to create a radio group. Enter a descriptive name in the properties panel.
1. Set a **key** which maps to a process variable. The value of the component is stored in this variable, and can be read by the process that uses this form. As already defined by the conditions in the process earlier, use the variable `meal`.
   <img src={FormValuesTop} style={{width: 250}} alt="Defining a radio group's name and key." />
1. Scroll down to the **Static options** section of the properties panel to add radio options. Since there are two options for dinner, add an extra value by clicking on the plus sign. Enter the value `Chicken` with a label of `Chicken`, and in the other value enter the value `Salad` with a label of `Salad`.
   <img src={FormValuesBottom} style={{width: 250}} alt="Defining a radio group's static option values." />
1. Now that the form is complete, you can click **Go to diagram** to close the form editor and return to your process diagram.

Your process is now complete and ready for validation.

<p><img src={HumanTaskDiagramImg} alt="The completed BPMN diagram." /></p>

</TabItem>
<TabItem value="sm">

1. Create a new Form in Desktop Modeler by navigating to **File -> New File -> Form (Camunda 8)**.
1. Click and drag a **Text view** component (found under Presentation) into the empty form.
   <img src={FormEditorImg} alt="Dragging a component to a form." />
1. Open the **General** section in the properties panel and enter a description, such as `What's for dinner?`.
1. Click and drag a **Radio** component into the form to create a radio group. Enter a descriptive name in the properties panel.
1. Set a **key** which maps to a process variable. The value of the component is stored in this variable, and can be read by the process that uses this form. As already defined by the conditions in the process earlier, use the variable `meal`.
   <img src={FormValuesTop} style={{width: 250}} alt="Defining a radio group's name and key." />
1. Scroll down to the **Static options** section of the properties panel to add radio options. Since there are two options for dinner, add an extra value by clicking on the plus sign. Enter the value `Chicken` with a label of `Chicken`, and in the other value enter the value `Salad` with a label of `Salad`.
   <img src={FormValuesBottom} style={{width: 250}} alt="Defining a radio group's static option values." />

1. In your form's properties panel, copy the Form ID for use in your process.

   <img src={FormId} style={{width: 250}} alt="The form properties panel, showing the form ID." />

Now you have created and designed the form, you must link it to your process.

1. Open the process you created in **[Step 1](#step-1-create-and-design-a-process)** by clicking on the process file's name in the top bar.
2. Select the user task, and open the **Form** menu in the properties panel.
3. In the Form menu, enter the **Form ID** for the form you created in **[Step 2](#step-2-design-and-link-a-form)**.

</TabItem>
</Tabs>

:::note
Forms linked in the user task are deployed together with the process. If you make changes to a form, you have to deploy the referencing process again to make the changes appear.
:::

## Step 3: Run and validate your process

<Tabs groupId="install" className="tabs-hidden">
<TabItem value="saas">

You can use [Play mode](/components/modeler/web-modeler/play-your-process.md) to quickly validate the process behavior and play different scenarios.

1. Click the **Play** tab to enter Play mode.
1. Once the Play environment is ready, click **Start a process instance** to start testing your process.
1. Start by activating a process instance. Click **Play** on the canvas above the process start event.
   <img src={PlayButtonImg} style={{width: 300}} alt="Start playing the process instance." />
1. The token moves to the user task, stops and waits until the user task is completed. Click **Open Task Form** to open the form.
   <img src={PlayOpenFormImg} style={{width: 300}} alt="Complete the form and continue." />

   <p>In the form, choose the <code>Chicken</code> option, and click <strong>Complete</strong>.</p>

1. The token moves through the exclusive gateway (also called the XOR gateway), and is used to model the decision in the process.
   <img src={PlayChickenImg} style={{width: 800}} alt="Completing the Play process." />

   <p>When the execution arrives at this gateway, all outgoing sequence flows are evaluated in the order in which they have been defined. The sequence flow which condition evaluates to <code>true</code> is selected for continuing the process.</p>
   <p>In this example, the token moved through the gateway and (according to the conditional expressions outlined earlier) to the selected dinner based on the <code>Decide what's for dinner</code> user task you completed.</p><p>As you chose <code>Chicken</code>, the token moved through to <code>Prepare chicken</code> and successfully completed. If you had selected <code>Salad</code>, the token would have moved through to <code>Prepare salad</code> instead.</p>

1. Click **Rewind** on the canvas and select the `Salad` option to test this flow also works correctly.
1. (Optional) You can also open the process instance in [Operate](/components/operate/operate-introduction.md) to validate the process flow. Click the **Process Instance Key** link to view the process instance in Operate.
   <img src={PlayOperateImg} style={{width: 300}} alt="View the process instance in Operate." />

   From within Operate, you can also then run and complete the open user task in [Tasklist](/components/tasklist/introduction-to-tasklist.md). Select the user task and click **Open Tasklist**.
   <img src={OperateTasklistImg} style={{width: 300}} alt="View the process instance in Operate." />

:::note
Applications such as Tasklist can be used by humans to complete tasks. As well as using Play mode and Tasklist to run a process, you can call the process via the API or an inbound trigger. Read more about [run options](/components/modeler/web-modeler/run-or-publish-your-process.md).
:::

</TabItem>
<TabItem value="sm">

Your process is now ready to run. Given its human-centric nature, it is well suited to be run in Tasklist. In order to make it accessible from Tasklist, the process must be deployed first.

:::tip
Human-centric processes involving user tasks seamlessly unfold within Tasklist, offering a cost-effective orchestration solution for human work with forms. However, the versatility of these processes extends beyond Tasklist, encompassing various alternative methods and applications. For instance, users can be redirected to external applications to fulfill tasks, bespoke task applications can be developed for any domain, or interactions with the physical world can be captured through event signals from sensors and IoT devices.
:::

First, you must deploy and test run the process.

:::note
Ensure your installation of [Camunda 8 Run](/self-managed/setup/deploy/local/c8run.md) is running prior to deploying your process.
:::

1. Click the rocket-shaped **Deploy** icon to begin deploying your process, and provide the following configuration:
   - **Target:** Self-Managed
   - **Cluster endpoint:** `http://localhost:26500`, the location of your Zeebe Gateway
   - **Authentication:** None
2. Click **Deploy** to deploy your process.
3. To run your new process, click the arrow-shaped **Run** icon, and provide your form input as JSON (for example, `{"meal": "chicken"}`).

   <img src={RunProcessSM} style={{width: 300}} alt="Enter optional variables to use and run your process." />

4. Click **Run** to run your process with the provided variables.

Next, check for a successful start in Operate.

1. Open Operate at `http://localhost:8080/operate`, and select **Processes** from the top bar.
2. In the **Process** panel, use the **Name** drop-down to select your process.
3. A visualization of your running process instance now displays in Operate, and your user task is marked with a green **token** icon. This means that a task is waiting to be worked on in Tasklist.

   <img src={OperateHumanTasks} alt="Process instance monitoring in Operate." />

Finally, check that you can complete a user task in Tasklist.

When the process instance arrives at the user task, a new user task instance is created at Zeebe. The process instance stops at this point and waits until the user task is completed. Applications like Tasklist can be used by humans to complete these tasks. In this last step, you will open Tasklist to run the user task you created.

:::tip
While it may originally seem like the goal of automating a process is to remove humans entirely, efficiently allocating work through user tasks can be even more beneficial. Within this example, we've included a form to demonstrate the completion of a user task.

Using the Zeebe or Tasklist API, many other ways to complete a user task are possible, such as redirecting to another application to complete the task, or even listening to IoT devices to capture human interaction with the real world via job workers.
:::

1. Open Tasklist at `http://localhost:8080/tasklist`.

2. On the left, you will notice a list of **tasks**. There should be one open task `Decide what's for dinner`. Click this task to open it in the detail view.
3. In the detail view, the form you created in **[Step 2](#step-2-design-and-link-a-form)** appears. It is read only since this task is currently unassigned. You have to claim the task to work on it. Next to **Assignee**, click **Assign to me** to claim the task.
4. Select one of the radio options.
5. Click **Complete Task** to submit the form.

   ![complete a human task in Tasklist](./img/user-task-tasklist.png)

6. To verify your task completion, you can filter by **Completed** tasks in the left task list panel.

You can now navigate back to Operate and notice the process instance has continued as the token has moved forward to the selected option.

The token moves through the exclusive gateway (also called the XOR gateway), and is used to model the decision in the process. When the execution arrives at this gateway, all outgoing sequence flows are evaluated in the order in which they have been defined. The sequence flow which condition evaluates to ‘true’ is selected for continuing the process.

In this case, the token will move through the gateway and (according to the conditional expressions we outlined earlier) to the selected dinner based on the Decide what's for dinner user task we completed. If we select Chicken, the token moves forward to Prepare chicken. If we select Salad, the token moves forward to Prepare salad.

</TabItem>
</Tabs>

## Next steps

In this guide, you successfully built a human-centered process that routes the process flow based on the decision made by a user, and learned how to:

<Tabs groupId="install" className="tabs-hidden">
<TabItem value="saas">

- Create and run your first process with a human in the loop.
- Build a BPMN diagram using Web Modeler.
- Create and link a form to a user task.
- Validate your process using Play mode.

<p><img src={HumanTaskDiagramImg} alt="The completed BPMN diagram." /></p>

</TabItem>
<TabItem value="sm">

- Create and run your first process with a human in the loop.
- Build a BPMN diagram using Modeler.
- Create and link a form to a user task.
- Deploy and run your process.
- Complete the task in Tasklist, and check the process in Operate.

</TabItem>
</Tabs>

**A core value of Camunda 8 lies in the combination of automation and human interaction.**

Continue with the following resources to learn about intelligent task assignments, flexible forms to capture data and decisions, operational insights to refine task efficiency, and pathways to publish your processes to users via Tasklist or even publicly.

- Watch the [video-based Human Task Orchestration Course](https://bit.ly/3PJJocB).
- Learn how to use [BPMN user tasks](/components/modeler/bpmn/user-tasks/user-tasks.md) to route tasks to the right users.
- Learn how to [build more complex forms](./utilizing-forms.md) using the form editor.
- Learn how to write powerful [expressions](/components/concepts/expressions.md) and utilize [variables](/components/concepts/variables.md) to route complex process flows.
- Get an [introduction to Operate](/components/operate/operate-introduction.md).
- Learn how to [set up Tasklist](/components/tasklist/introduction-to-tasklist.md) for efficient task management.
- Explore [start forms](/components/modeler/web-modeler/advanced-modeling/publish-public-processes.md) and attach the form directly to the start event.

Don't want to build the process yourself? Click **Open model in Camunda 8** to create from a template in Camunda 8 SaaS, or sign up.

<div style={{display: "flex", gap: 8}}>
   <a
      className={clsx(
         "button button--outline button--secondary button--lg button--hero"
      )}
      href="https://marketplace.camunda.com/en-US/apps/437142/human-task-orchestration-quick-start">
      Open model in Camunda 8
   </a>
   <a
      className={clsx(
         "button button--outline button--secondary button--lg"
      )}
      href="https://signup.camunda.com/accounts?utm_source=docs.camunda.io&utm_medium=referral">
      Sign up
   </a>
</div><br />
