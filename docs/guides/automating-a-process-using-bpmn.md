---
id: automating-a-process-using-bpmn
title: Automating a process using BPMN
description: A quickstart to how BPMN can automate your most complex business processes using an easy-to-adopt visual modeling language.
---

<span class="badge badge--beginner">Beginner</span>
<span class="badge badge--medium">Time estimate: 20 minutes</span>

# What is BPMN?

Business Process Model and Notation (BPMN) is the global standard for process modeling. With BPMN, you can automate your most complex business processes using an easy-to-adopt visual modeling language.

Processes are the algorithms that determine how an organization runs, all based on independent tasks. Successful businesses grow from proven, effective processes. Therefore, Camunda’s workflow engine executes processes that are defined in BPMN.

![empty bpmn diagram sample](./img/automate-any-process-anywhere.png)

Take the following example where we have outlined a diagram to send an email. Don't worry too much about the symbols, we'll get to that shortly. For now, recognize the start and end of the process, comprised of entering a message, and sending the email.

![sending email bmmn diagram](./img/simple-bpmn-process.png)

# Set up

At Camunda, we utilize [Modeler](./components/modeler/overview.md) to build out BPMN diagrams.

You can begin building out your processes within Camunda Cloud using Cloud Modeler. Therefore, ensure you’ve [created a Camunda Cloud account](./getting-started/create-camunda-cloud-account.md) to get started.

# Getting started with BPMN

Once logged in to your Camunda Cloud account, take the following steps:

1. Click the **Diagrams** tab in the top navigation bar.
2. Click **Create New Diagram**.
3. Select the three vertical dots next to **New Diagram** on the top left corner of the page to rename your diagram. In this case, we'll name ours "Bake a Cake."

## The components of BPMN

Before we can start building out the diagram to bake our cake, we need to understand what the components on the left side of the screen mean.

We can build out our process using several elements, including the following:

- Events: For example, start and end events which begin and terminate our process.
- Tasks: For example, user tasks for a particular user to complete, or service tasks to invoke various webservices.
- Gateways: For example, parallel gateways that move the process along between two tasks at the same time.
- Subprocesses: For example, a transaction subprocess which can be used to group multiple activities to a transaction.

For a complete list of BPMN elements, visit our [BPMN reference material](https://docs.camunda.org/manual/7.16/reference/bpmn20/).

If you're new to BPMN elements and their capabilities, also visit our [BPMN symbol documentation](https://camunda.com/bpmn/reference/).

## BPMN in action

Using these elements, we can build out our process in baking a cake.

Let's take the following steps:

1. On our diagram, we've already been given an element as a start event in the shape of a circle. We can click on the circle, and then the wrench icon to adjust this element. For now, we'll keep it as a start event. Double click on the circle to add text.
2. We can now drag and drop an arrow to our first task (the rectangle shape), or we can simply click start event, and then click the task element to automatically attach it.
3. We'll click on the task, then click on the wrench icon to declare it a user task, which will be named "Purchase Ingredients."
4. Click on the user task to connect a gateway to it. By clicking the wrench icon on the gateway and declaring it a parallel gateway, we can connect it to two tasks that can happen at the same time: mixing the ingredients, and preheating the oven.

![baking a cake bpmn sample](./img/bake-cake-bpmn.png)

5. Attach the next gateway once these two tasks have completed to move forward.
6. Add a user task to bake the cake, and finally a user task to ice the cake.
7. Add an end event, represented by a bold circle, and enjoy your cake!

![completed bpmn diagram](./img/complete-baking-cake-bpmn.png)

# Execute your process diagram

To execute your completed process diagram, click **Save**. Then, click **Execute > Save and Deploy**.

You can now start a new process instance to initiate your process. Click the **Execute** dropdown, and then **Start Instance**.

You can now monitor your instances in [Operate](./components/operate/index.md). From your diagram, click the **Execute** dropdown, and **View Process Instances**. This will automatically take you to Camunda Operate to monitor your running instances.

You can also visit an ongoing list of user tasks required in your BPMN diagram. Click the **Execute** dropdown, and **View User Tasks** to automatically be taken to [Tasklist](./components/tasklist/introduction.md).

# Additional resources
