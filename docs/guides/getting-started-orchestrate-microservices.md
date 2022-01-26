---
id: getting-started-orchestrate-microservices
title: Getting started with Microservice Orchestration
sidebar_label: Getting started with Microservice Orchestration
description: Orchestrate Microservices along a business process for visibility and resilience.
---

Using Camunda Cloud, you can orchestrate the microservices necessary to achieve your end-to-end automated business process. Whether you have existing microservices or are looking to build out your microservices, this guide will help you understand how you can start your microservice orchestration journey with Camunda Cloud.

While this guide uses code snippets in Java, you do not need to be a Java developer to be successful. Additionally, you can orchestrate microservices with Camunda Cloud in other programming languages.

## Prerequisites

* Valid Camunda Cloud account or [sign up](https://camunda.io/signup) if you still need one
* Java >= 8
* Maven
* IDE (IntelliJ, VSCode, or similar)
* Download and unzip or clone the [repo](https://github.com/camunda-cloud/camunda-cloud-tutorials), then `cd` into `camunda-cloud-tutorials/orchestrate-microservices/worker-java`

## Guide steps

First, [log in](https://camunda.io) to your Camunda Cloud account or [sign up](https://camunda.io/signup) if you still need one.

- [Prerequisites](#prerequisites)
- [Guide steps](#guide-steps)
  - [Design your process with BPMN](#design-your-process-with-bpmn)
  - [Create credentials for your Zeebe client](#create-credentials-for-your-zeebe-client)
  - [Create a worker for the service task](#create-a-worker-for-the-service-task)
- [Next steps](#next-steps)

### Design your process with BPMN

Start by designing your automated process using BPMN. This guide introduces you to the palette and a few BPMN symbols in Web Modeler.

1. Navigate to your diagrams, either through the **Diagrams** navigation, or by using the section under **Camunda Cloud Service** on the main dashboard. Click **Create New Diagram**. This opens Web Modeler.
2. Give your model a descriptive name and id. On the right side of the console, expand the **General** section of the properties panel to find the name and id fields. For this guide, we'll use **Microservice Orchestration Tutorial** for the name and **microservice-orchestration-tutorial** for the id.
3. Use Web Modeler to design a BPMN process with service tasks. These service tasks are used to call your microservices via workers. Create a service task by dragging the task icon from the palette, or by clicking the existing start event and clicking the task icon. Click the wrench icon and select **Service Task** to change the task type.

![Task with dropdown showing config, including service task](./img/microservice-orchestration-config-service-task.png)

1. Add a descriptive name using the properties panel. For this guide, we'll use **Microservice Example**. Since you previously opened the **General** section of the properties panel, it is likely still open when working with your service task configuration.
2. In the properties panel, expand the **Task definition** section and use the **Type** field to enter a string used in connecting this service task to the corresponding microservice code. For this guide, we'll use **orchestrate-something** as the type. You will use this while [creating a worker for the service task](#create-a-worker-for-the-service-task). If you do not have an option to add the **Type**, use the wrench icon and select **Service Task**.

![Service task with properties panel open](./img/microservice-orchestration-service-task.png)

6. Add an end event by dragging one from the palette, or by clicking the end event when the last service task in your diagram has focus. The linter should turn green with a checkmark and show zero errors and zero warnings.
7. In the **Execute** drop down, click **Save and Deploy**. Your diagram is now deployed to your cluster.
8. Start a new process instance in the **Execute** drop down by clicking **Start Instance**. 
9. In the **Execute** drop down, click **View Process Instances**. Navigate to Operate to see your process instance with a token waiting at the service task.

### Create credentials for your Zeebe client

To interact with your Camunda Cloud cluster, you'll use the Zeebe client. First, you'll need to create credentials.

1. Navigate to your clusters either through the navigation **Clusters** or by using the section under **Camunda Cloud Service** on the main dashboard. Click on your existing cluster. This will open the **Overview** for your cluster, where you can find your cluster id and region. You will need this information later when creating a worker in the next section.

:::note 

If your account is new, you should have a cluster already available. If no cluster is available, or you’d like to create a new one, click **Create New Cluster**.

:::

2. Navigate to the **API** tab. Click **Create**.
3. Provide a descriptive name for your client like `microservice-worker`. For this tutorial, the scope can be the default Zeebe scope. Click **Create**.
4. Your client credentials can be copied or downloaded at this point. You will need your client id and your client secret when creating a worker in the next section, so keep this window open. Once you close or navigate away from this screen, you will not be able to see them again. 

### Create a worker for the service task

Next, we’ll create a worker for the service task by associating it with the type we specified on the service task in the BPMN diagram.

1. Open the downloaded or cloned project ([repo](https://github.com/camunda-cloud/camunda-cloud-tutorials), then `cd` into `camunda-cloud-tutorials/orchestrate-microservices/worker-java`) in your IDE .
2. Add your credentials to `application.properties`. Your client id and client secret are available from the previous section in the credential text file you downloaded or copied. Go to the cluster overview page to find your cluster id and region.
3. In the `Worker.java` file, change the type to match what you specified in the BPMN diagram. If you followed the previous steps for this guide and entered “orchestrate-something”, no action is required.
4. After making these changes, perform a Maven install, then run the Worker.java `main` method via your favorite IDE. If you prefer using a terminal, run `mvn package exec:java`.
5. Navigate to Operate and you will see your token has moved to the end event, completing this process instance.

Congratulations! You successfully built your first microservice orchestration solution with Camunda Cloud.

## Next steps

* Learn more about Camunda Cloud and what it can do by reading [What is Camunda Cloud?](../../components/concepts/what-is-camunda-cloud/).
* Get your local environment ready for development with Camunda Cloud by [setting up your first development project](../setting-up-development-project).
