---
id: create-a-process
title: "Create a process"
description: "This document demonstrates quick resources and steps to guide you through creating a process."
---

## Overview

:::note
New to BPMN and want to learn more before moving forward? [This blog post](https://zeebe.io/blog/2018/08/bpmn-for-microservices-orchestration-a-primer-part-1/) helps explain the standard and why it's a good fit for microservices orchestration.
:::

:::note
Already familiar with BPMN and how to create a BPMN model in Camunda Modeler? Find the finished model we create during the tutorial here: [Zeebe Getting Started Tutorial Process Model](assets/order-process.bpmn).
:::

:::note
If you're using the finished model we provide rather than building your own, you can move ahead to [deploy a process](deploy-a-process.md).
:::

Camunda Modeler is an open-source desktop BPMN modeling application created specifically for Zeebe. This application gives developers powerful features to design and deploy automated processes, human workflows, decision tables, and decision requirement diagrams using the globally-recognized [BPMN](https://camunda.com/bpmn/) and [DMN](https://camunda.com/dmn/) standards.

Get started with Camunda Modeler using our [installation guide](https://docs.camunda.io/docs/components/modeler/camunda-modeler/install-the-modeler).

## Creating a process model

In this section, we'll use Camunda Modeler to create a process model and get it ready to be deployed to Zeebe.

We'll create an e-commerce order process as our example, and we'll model a process that consists of the following:

- Initiating a payment for an order
- Receiving a payment confirmation message from an external system
- Shipping the items in the order with or without insurance depending on order value

This is what your process model will look like when we're finished:

![Getting Started Process Model](assets/tutorial-3.0-complete-process.png)

The payment task and shipping tasks are carried out by worker services we'll connect to the workflow engine. The **Payment Received** message is published to Zeebe by an external system, and Zeebe correlates the message to a process instance.

### Getting started

To get started, take the following steps:

1. Open Camunda Modeler and create a new BPMN diagram.
2. Save the model as `order-process.bpmn` in the top level of the Zeebe broker directory you just downloaded. As a reminder, this directory is called `zeebe-broker-0.17.0`.

The first element in your model is a start event, which should already be on the canvas when you open Modeler.

3. It's a BPMN best practice to label all elements in our model, so double-click the start event and label it `Order Placed` to signify that our process is initiated whenever a customer places an order.

### Adding a service task

Next, we need to add a service task. Take the following steps:

1. Click on the start event and select the task icon.
2. Label the newly-created task **Initiate Payment**.
3. Click the wrench icon and change the task to a service task.

### Configuring a service task

Next, we'll configure the **Initiate Payment** service task so an external microservice can work on it. Take the following steps:

1. Click on the **Initiate Payment** task.
2. Expand the **Properties** panel on the right side of the screen if it's not already visible.
3. In the **Type** field in the **Properties** panel, enter `initiate-payment`

This is what you should see in your Modeler:

![Initiate Payment Service Task](assets/tutorial-3.1-initiate-payment-task.png)

This **Type** field represents the **job type** in Zeebe. 

See a few concepts important to understand at this point below:

- A **job** is simply a work item in a process that must be completed before a process instance can proceed to the next step. ([See: Job Workers](/components/concepts/job-workers.md))
- A **process instance** is one running instance of a process model. In our case, this is an individual order to be fulfilled. ([See: Processes](/components/concepts/processes.md))

For every process instance that arrives at the **Initiate Payment** service task, Zeebe creates a job with type `initiate-payment`. The external worker service responsible for payment processing (the so-called job worker) polls Zeebe intermittently to ask if any jobs of type `initiate-payment` are available.

If a job is available for a given process instance, the worker activates it, completes it, and notifies Zeebe. Zeebe then advances that process instance to the next step in the process.

### Adding a message event to the process

Next, we'll add a message event to the process. Take the following steps:

1. Click on the **Initiate Payment** task in Camunda Modeler.
2. Select the circular icon with a double line border.
3. Click on the wrench icon next to the newly-created event.
4. Select the **Message Intermediate Catch Event**.
5. Double-click on the message event and label it `Payment Received`.

![Message Event](assets/tutorial-3.2-modeler-message-event.png)

We use message catch events in Zeebe when the workflow engine needs to receive a message from an external system before the process instance can advance. (_[See: Message Events](/reference/bpmn-processes/message-events/message-events.md)_)

In the scenario we're modeling, we _initiate_ a payment with our service task, but we need to wait for some other external system to confirm the payment was received. This confirmation comes in the form of a message that is sent to Zeebe (asynchronously) by an external service.

### Correlating the message to process instances

Messages received by Zeebe must be correlated to specific process instances. To make this possible, we have some more configuring to do. Take the following steps:

1. Select the message event and make sure you're on the **General** tab of the properties panel on the right side of the screen.
2. In the **Properties** panel, click the **+** icon to create a new message. You'll now see two fields in Modeler that we'll use to correlate a message to a specific process instance: message name and subscription correlation key.
3. Give this message a self-explanatory name: `payment-received`.

![Add Message Name](assets/tutorial-3.3-add-message-name.png)

### Subscription correlation key

When Zeebe receives a message, this name field lets us know _which message event in the process model_ the message is referring to.

But how do we know which _specific process instance_—that is, which customer order—a message refers to? That's where subscription correlation key comes in. The subscription correlation key is a unique ID present in both the process instance payload and the message sent to Zeebe.

We'll use `orderId` for our correlation key. Take the following steps:

1. Add the expression `= orderId` to the subscription correlation key field.
2. When we create a process instance, we need to be sure to include `orderId` as a variable, and we also need to provide `orderId` as a correlation key when we send a message.

Here's what you should see in Modeler:

![Message Correlation Key](assets/tutorial-3.4-add-correlation-key.png)

### Adding an exclusive (XOR) gateway

Next, we'll add an exclusive (XOR) gateway to our process model. The exclusive gateway is used to make a data-based decision about which path a process instance should follow. In this case, we want to ship items _with_ insurance if total order value is greater than or equal to $100 and ship _without_ insurance otherwise.

That means when we create a process instance, we'll need to include order value as an instance variable. We'll come to this later.

First, let's take the necessary steps to configure our process model to make this decision. To add the gateway, take the following steps:

1. Click on the message event you just created.
2. Select the gateway (diamond-shaped) symbol. The exclusive gateway is the default when you add a new gateway to a model.
3. Double-click on the gateway and add a label `Order Value?` so it's clear what we're using as our decision criteria.

![Add Exclusive Gateway to Model](assets/tutorial-3.5-add-xor-gateway.png)

![Label Exclusive Gateway in Model](assets/tutorial-3.6-label-xor-gateway.png)

### Adding sequence flows

We'll add two outgoing sequence flows from this exclusive gateway that lead to two different service tasks. Each sequence flow will have a data-based condition that's evaluated in the context of the process instance payload.

Take the following steps:

1. Select the gateway and add a new service task to the model.
2. Label the task `Ship Without Insurance`.
3. Set the **Type** to `ship-without-insurance`.

![Add No Insurance Service Task](assets/tutorial-3.7-no-insurance-task.png)

Whenever we use an exclusive gateway, we want to be sure to set a default flow, which in this case will be shipping without insurance:

4. Select the sequence flow you just created from the gateway to the `Ship Without Insurance` service task.
5. Click on the wrench icon.
6. Choose **Default Flow**.

![Add No Insurance Service Task](assets/tutorial-3.8-default-flow.png)

Now we're ready to add a _second_ outgoing sequence flow and service task from the gateway. Take the following steps:

1. Select the gateway again.
2. Add another service task to the model.
3. Label it `Ship With Insurance`.
4. Set the **Type** to `ship-with-insurance`.

Next, we'll set a condition expression in the sequence flow leading to this `Ship With Insurance` service task:

5. Click on the sequence flow and open the **Properties** panel.
6. Input the expression `= orderValue >= 100` in the **Condition expression** field in the **Properties** panel.
7. Double-click on the sequence flow to add a label "`>= $100"`.

![Condition Expression](assets/tutorial-3.9-condition-expression.png)

We're almost finished! To wrap things up, we'll:

1. Select the `Ship Without Insurance` task.
2. Add another exclusive gateway to the model to merge the branches together again (a BPMN best practice in a model like this one).
3. Select the `Ship With Insurance` task.
4. Add an outgoing sequence flow that connects to the second exclusive gateway you just created.

### Adding a BPMN element

The only BPMN element we need to add is an end event:

1. Click on the second exclusive gateway.
2. Add an end event.
3. Double-click on it to label it `Order Fulfilled`.

![Condition Expression](assets/tutorial-3.10-end-event.png)

### Changing the process Id

Lastly, we'll change the process Id to something more descriptive than the default `Process_1` that you'll see in Modeler. Take the following steps:

1. Click onto a blank part of the canvas.
2. Open the **Properties** panel.
3. Change the **Id** to `order-process`.

Here's what you should see in Modeler after these last few updates:

![Update Process ID](assets/tutorial-3.11-process-id.png)

That's all for our modeling step. Remember to save the file one more time to prepare to deploy the process to Zeebe, create process instances, and complete them.
