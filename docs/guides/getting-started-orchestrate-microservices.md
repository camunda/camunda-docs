---
id: getting-started-orchestrate-microservices
title: Getting started with Microservice Orchestration
sidebar_label: Getting started with Microservice Orchestration
description: Orchestrate Microservices along a business process for visibility and resilience.
---

Using Camunda Cloud, you can orchestrate the microservices necessary to achieve your end-to-end automated business process. Whether you have existing microservices or are looking to build out your microservices, this guide will help you understand how you can start your microservice orchestration journey with Camunda Cloud.

While this guide uses code snippets in Java, you do not need to be a Java developer to be successful. Additionally, you can orchestrate microservices with Camunda Cloud in other programming languages.

[ADD OUTLINE OF STEPS]

## Prerequisites

* Valid Camunda Cloud account
* Java >=8
* Maven
* IDE (IntelliJ, VSCode, or similar)
* Clone or download the [repo](https://github.com/berndruecker/camunda-cloud-tutorials/tree/main/orchestrate-microservices/part1-spring-boot-worker) 

## Guide Steps

First, login to your Camunda Cloud account. 

### Design your process with BPMN
Start by designing your automated process using BPMN. This guide will introduce you to the palette and a few BPMN symbols in the Cloud Modeler.

1. Navigate to your diagrams either through the navigation Diagrams or by using the section under Camunda Cloud Service on the main dashboard. Click Create New Diagram. This opens Cloud Modeler.
2. Give your model a descriptive name and id. For this guide, we will use Microservice Orchestration Tutorial for the name and microservice-orchestration-tutorial for the id.
3. Use Cloud Modeler to design a BPMN process with service tasks. These service tasks will be used to call your microservices via workers. Create a service task by dragging the task icon from the palette or clicking the existing start event and clicking the task icon. Change the task type by clicking the wrench icon and selecting Service Task. 
4. Add a descriptive name using the properties panel. 
5. Use the Type field to enter a string used in connecting this service task to the corresponding microservice code. For this guide, we will use “orchestrate-something” as the type. You will use this in “Create a worker for the service task”.
6. Add an end task by dragging one from the palette or clicking the end task when the last service task in your diagram has focus.
7. In the Execute drop down click Save and Deploy. Your diagram is now deployed to your cluster.
8. Start a new process instance in the Execute drop down by clicking Start Instance. 
9. Navigate to Operate to see your process instance with a token waiting at the service task. In the Execute drop down click View Process Instances.

### Create credentials for your Zeebe client
To interact with your Camunda Cloud cluster, you will use the Zeebe client,  but first you'll need to create credentials.

1. Navigate to your clusters either through the navigation Clusters or by using the section under Camunda Cloud Service on the main dashboard. Click on your existing cluster. This will open the Overview for your cluster where you can find your cluster id and region. You will need this information later when creating a worker in the next section.

:::note 

If your account is new, you should have a cluster already available. If no cluster is available, or you’d like to create a new one, click Create New Cluster.

:::

2. Navigate to the API tab. Click Create.
3. Provide a descriptive name for your client. For this tutorial, the scope can be the default Zeebe. Click Create.
4. Your client credentials can be copied or downloaded at this point. Once you close or navigate away from this screen you will not be able to see them again. You will need your client id and your client secret when creating a worker in the next section.

### Create a worker for the service task
Next we’ll create a worker for the service task by associating it with the type we specified on the service task in the BPMN diagram.

1. Open the downloaded or cloned project in your IDE.
2. Add your credentials to Worker.java. Your client id and client secret are available from the previous section in the credential text file you downloaded or copied. Your cluster id and region can be found by going to the cluster overview page.
3. In the Worker.java file, change the type to match what you specified in the BPMN diagram. If you followed the previous steps for this guide and entered “orchestrate-something”, no action is required.
4. After making these changes perform a Maven install, then run main in Worker.java.
