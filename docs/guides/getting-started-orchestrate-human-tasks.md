---
id: orchestrate-human-tasks
title: Get started with human task orchestration
sidebar_label: Get started with human task orchestration
description: "Efficiently allocate work through user tasks."
keywords: [human tasks, orchestration, getting started, user guide]
---

<span class="badge badge--beginner">Beginner</span>
<span class="badge badge--medium">Time estimate: 15 minutes</span><br /><br />

import ExpressionInputImg from './img/expression-input-example.png';
import FormValuesImg from './img/form-values-example.png';
import HumanTaskDiagramImg from './img/human-task-bpmn-diagram.png';
import ImplementModeImg from './img/implement-mode-active.png';
import FormLinkingImg from './img/form-linking.png';
import ModelerNavImg from './img/modeler-navigation.png';
import ModelerGlobalNavImg from './img/modeler-global-nav.png';
import ModelerFormMenuImg from './img/modeler-form-menu.png';
import RunProcessImg from './img/run-process.png';
import OperateHumanTasks from './img/operate-human-tasks.png';
import FormEditorImg from './img/form-editor.png';
import NavigationHistoryImg from './img/modeler-navigation-history.png';
import PlayButtonImg from './img/play-play-button.png';
import PlayOpenFormImg from './img/play-open-form.png';
import PlayChickenImg from './img/play-chicken-complete.png';

import clsx from "clsx";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SmPrereqs from './react-components/sm-prerequisites.md'
import SaasPrereqs from './react-components/saas-prerequisites.md'
import Install from './react-components/install-plain-java.md'

You can use Camunda 8 to orchestrate processes with human tasks of any complexity. User tasks allow you to create and assign tasks to users, who can then perform their work and enter the required data to drive the business process.

## About this guide

This guide introduces you to the basics of human task orchestration.

- You will create a simple process to decide on what to eat for dinner, and drive the process flow according to that decision.
- This process is entirely executable in the browser.

<p><img src={HumanTaskDiagramImg} alt="The completed BPMN diagram" /></p>

You will learn how to:

- Create and run your first process with a human in the loop.
- Build a BPMN diagram using Modeler.
- Create and link a form to a user task.
- Validate your process using Play mode.

:::note
For a video-based learning experience and a more complex example, see [Getting Started with Human Workflow](https://bit.ly/3PJJocB).
:::

## Before you begin

To complete this guide you must either sign up for camunda 8 SaaS or install Camunda 8 Self-Managed:

<Tabs>
   <TabItem value="sm" label="Self-Managed">
      <details>
         <summary>Have you installed Camunda yet?</summary>
         <SmPrereqs/>
         <Install/>
      </details>
   </TabItem>
   <TabItem value="saas" label="SaaS" default>
      <details>
         <summary>Have you signed up for Camunda yet?</summary>
         <SaasPrereqs/>
      </details>
   </TabItem>
</Tabs>

Perform the following steps to create and run your first process with a human in the loop.

## Step 1: Create a new process

Start by designing a process to demonstrate how to route the process flow based on a user decision. In this example, you will create a process to decide what to eat for dinner.

### Create a new project and file

First, you must create the BPMN diagram file and project.

1. Open Modeler, and click **New project**. Every file in Web Modeler requires a project.
2. Select **Create new > BPMN diagram**.
3. Give your file a descriptive name. For example, `Decide for Dinner`.
4. Make sure to name the process itself as well. Click the empty canvas, and specify the process name and technical ID in the properties panel. This specifies how the process appears in other Camunda 8 components.

### Design the process

Next, you must design the process in Modeler.

:::note

Check you are in **Implement** mode as this allows you to configure the process technical details.
<img src={ImplementModeImg} style={{width: 250}} alt="Active implement mode tab" />

:::

1. A **start event** is automatically added to the canvas. Click it to display configuration and append options.
2. Click the rectangular **Append Task** icon to append a task.
3. Enter a descriptive name for the task, for example `Decide what's for dinner`.
4. Change the task type by clicking the **Change element** icon. Select **User task**.
5. Select the user task and click on the diamond-shaped icon to append an exclusive gateway. The gateway allows you to route the process flow differently, depending on conditions.
6. Select the gateway and append a task by clicking the task icon. Repeat this to create a second process flow. Name the tasks based on what the user decides to eat, for example, we've named ours `Prepare chicken` and `Prepare salad`.
7. To route the user to the right task, add [expressions](/components/concepts/expressions.md) to the **sequence flows**. Sequence flows are represented by arrows connecting the gateway to the tasks. To add an expression, click on a sequence flow to view the **properties panel**, and open the **Condition** section.
8. Verify the sequence flows have the following expressions: `meal = "Salad"` on one side, and `meal = "Chicken"` on the other. You will define the variable `meal` later when designing a form for the user task.
   <p><img src={ExpressionInputImg} style={{width: 400}} alt="Example of a conditional expression" /></p>
9. Connect the split process flows again. Append another exclusive gateway to one of the tasks. Select the other task and drag the arrow-shaped sequence flow tool to connect it to the gateway.
10. Select the gateway and add an **end event** to your process, denoted by the circle with the thick outline.

:::note
New to BPMN or want to learn more? Visit our [BPMN cheat sheet](https://page.camunda.com/wp-bpmn-2-0-business-process-model-and-notation-en) for an overview of all BPMN symbols.
Variables are part of a process instance and represent the data of the instance. To learn more about these values, variable scope, and input/output mappings, visit our documentation on [variables](/components/concepts/variables.md).
:::

<!-- TODO note that processes can be of any complexity, and link to advanced guides -->

## Step 2: Design a form

You have now designed the process. To allow the user to make the decision, you will now design a [form](../components/modeler/forms/camunda-forms-reference.md). Forms can be added to user tasks and start events to capture user input, with the user input used to route the process flow, make API requests, or orchestrate your services.

1. Select the user task you created in **[Step 1](#step-1-create-a-new-process)**.
2. Click the blue **link icon** in the lower right corner. A menu expands that allows you to create a new form.
   <p><img src={ModelerFormMenuImg} style={{width: 400}} alt="Annotation to open the form menu" /></p>
3. Click **Create new form**. A form will be created and opened in the form editor. The form is automatically named.

   :::note
   Don't worry about saving your process diagram. Modeler automatically saves every change you make.
   :::

4. Click and drag the **Text** component to the empty form.
   <img src={FormEditorImg} alt="Dragging a component to a form" />

5. Open the **General** section in the properties panel and enter a text, such as `What's for dinner?`.
6. Click and drag the **Radio** component to the form to create a radio group. Give it a descriptive name within the properties panel.
7. Additionally, set a **key** which maps to a process variable. The value of the component will be stored in this variable, and it can be read by the process that uses this form. As already defined by the conditions in the process earlier, use the variable `meal`.
8. Scroll down to the **Static options** section of the properties panel to add radio options. Since there are two options for the dinner, add an extra value by clicking on the plus sign. Enter the value `Chicken` with the same label as `Chicken` and enter the value `Salad` with the label as `Salad` in the other value.
   <img src={FormValuesImg} style={{width: 250}} alt="Defining a radio group and its values" />

## Step 3: Link the form to your process

Now you have created and designed the form, you must link it to your process.

1. Click on the project name in the navigation history in the top bar to navigate back, and open the process you created in **[Step 1](#step-1-create-a-new-process)**.
   <img src={NavigationHistoryImg} style={{width: 500}} alt="Navigation history in Web Modeler" />
2. Select the user task. Click the blue **form link icon** to open the form menu.
3. Select the form you just created, and click **link** to confirm.
   <img src={FormLinkingImg} style={{width: 400}} alt="Selecting a form from the project" />

4. You can check if you linked the right form by clicking the form linking icon again. A preview of the form will appear.

Your process is now complete and ready for validation.

<p><img src={HumanTaskDiagramImg} alt="The completed BPMN diagram" /></p>

:::note
Forms linked in the user task are deployed together with the process. If you make changes to a form, you must deploy the referencing process again for the changes to appear.
:::

## Step 4: Validate your process using Play

You can use [Play mode](/components/modeler/web-modeler/play-your-process.md) to quickly validate the process behavior and play different scenarios.

1. Click the **Play** tab to enter Play mode.
1. Once the Play environment is ready, click **Start a process instance** to start testing your process.
1. Start by activating a process instance. Click **Play** on the canvas above the process start event.
   <img src={PlayButtonImg} style={{width: 300}} alt="Start playing the process instance" />
1. The token moves to the user task, stops and waits until the user task is completed. Click **Open Task Form** to open the form, choose the `Chicken` option, and click **Complete**.
   <img src={PlayOpenFormImg} style={{width: 300}} alt="Complete the form and continue" />
1. The token moves through the exclusive gateway (also called the XOR gateway), and is used to model the decision in the process.
   <img src={PlayChickenImg} style={{width: 800}} alt="Completing the Play process" />

   <p>When the execution arrives at this gateway, all outgoing sequence flows are evaluated in the order in which they have been defined. The sequence flow which condition evaluates to ‘true’ is selected for continuing the process.</p>
   <p>In this example, the token moved through the gateway and (according to the conditional expressions outlined earlier) to the selected dinner based on the <code>Decide what's for dinner</code> user task you completed.</p><p>As you chose <code>Chicken</code>, the token moved through to <code>Prepare chicken</code> and successfully completed. If you had selected <code>Salad</code>, the token would have moved through to <code>Prepare salad</code>.</p>

1. Click **Rewind** on the canvas and select the `Salad` option to test this flow also works correctly.

:::note

As well as using Play mode to quickly validate and run your process in development, you can also:

- Deploy the process to a [cluster](/components/concepts/clusters.md) in other environments such as testing, staging, and production. After you deploy your process, it can be run on the cluster.
- Run and complete the user task in [Tasklist](/components/tasklist/introduction-to-tasklist.md). Applications such as Tasklist can be used by humans to complete tasks. As well as using Play mode and Tasklist to run a process, you can call the process via the API or an inbound trigger. Read more about [run options](/components/modeler/web-modeler/run-or-publish-your-process.md).
- Check the process in production using [Operate](/components/operate/operate-introduction.md). Operate is used to monitor both long-running and straight-through, high-throughput processes. In development, as well as using [Play mode](/components/modeler/web-modeler/play-your-process.md) for faster in-place validation, you can use Operate to confirm if the process flow works as expected.
- Create [milestones](/components/modeler/web-modeler/milestones.md) to save a snapshot of your BPMN or DMN diagram at any time.

:::

## Next steps

In this guide, you successfully built a human-centered process that routes the process flow based on the decision made by a user, and learned how to:

- Create and run your first process with a human in the loop.
- Build a BPMN diagram using Modeler.
- Create and link a form to a user task.
- Validate your process using Play mode.

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
