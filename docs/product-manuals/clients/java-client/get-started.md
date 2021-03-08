---
id: get-started
title: "Java client - Getting started guide"
sidebar_label: "Getting started guide"
---

In this tutorial, you will learn to use the Java client in a Java application to interact with Camunda Cloud.

You can find the complete source code, including the BPMN diagrams, on [GitHub](https://github.com/zeebe-io/zeebe-get-started-java-client).

## Prerequisites

- [Camunda Cloud account](/guides/getting-started/create-camunda-cloud-account.md)
- [Cluster](/guides/getting-started/create-cluster.md) and [client credentials](/guides/getting-started/setup-client-connection-credentials.md)
- [Modeler](/guides/getting-started/model-your-first-process.md)
- Java 8 or higher
- [Apache Maven](https://maven.apache.org/)

## Set up a project

First, we need a Maven project.
Create a new project using your IDE, or run the Maven command:

```
mvn archetype:generate \
    -DgroupId=io.zeebe \
    -DartifactId=zeebe-get-started-java-client \
    -DarchetypeArtifactId=maven-archetype-quickstart \
    -DinteractiveMode=false
```

Add the Zeebe client library as dependency to the project's `pom.xml`:

```xml
<dependency>
  <groupId>io.zeebe</groupId>
  <artifactId>zeebe-client-java</artifactId>
  <version>${zeebe.version}</version>
</dependency>
```

Set the connection settings and client credentials as environment variables:

```bash
export ZEEBE_ADDRESS='[Zeebe API]'
export ZEEBE_CLIENT_ID='[Client ID]'
export ZEEBE_CLIENT_SECRET='[Client Secret]'
export ZEEBE_AUTHORIZATION_SERVER_URL='[OAuth API]'
```

**Hint:** When you create client credentials in Camunda Cloud you have the option to download a file with the lines above filled out for you.

Create a main class and add the following lines to bootstrap the Zeebe client:

```java
package io.zeebe;

import io.zeebe.client.ZeebeClient;

public class App
{
    public static void main(final String[] args)
    {
        final String gatewayAddress = System.getenv("ZEEBE_ADDRESS");

        final ZeebeClient client =
            ZeebeClient.newClientBuilder()
                .gatewayAddress(gatewayAddress)
                .build();

        System.out.println("Connected");

        ...

        client.close();
        System.out.println("Closed.");
    }
}
```

Run the program:

- If you use an IDE, you can just execute the main class, using your IDE.
- Otherwise, you must build an executable JAR file with Maven and execute it.

### Build an executable JAR file

Add the Maven Shade plugin to your pom.xml:

```xml
<!-- Maven Shade Plugin -->
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-shade-plugin</artifactId>
  <version>2.3</version>
  <executions>
    <!-- Run shade goal on package phase -->
    <execution>
      <phase>package</phase>
      <goals>
        <goal>shade</goal>
      </goals>
      <configuration>
        <transformers>
          <!-- add Main-Class to manifest file -->
          <transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
            <mainClass>io.zeebe.App</mainClass>
          </transformer>
        </transformers>
      </configuration>
    </execution>
  </executions>
</plugin>
```

Now run `mvn package`, and it will generate a JAR file in the `target` subdirectory. You can run this with `java -jar target/${JAR file}`.

### Output of executing program

You should see the output:

```
Connected.

Closed.
```

## Model a process

Now, we need a simple process we can deploy. Later, we will extend the process with more functionality.

Open the [modeler](/guides/getting-started/model-your-first-process.md) of your choice and create a new BPMN diagram.

Add a start event named `Order Placed` and an end event named `Order Delivered` to the diagram and connect the events.

![model-process-step-1](assets/order-process-simple.png)

Set the **id** (the BPMN process id), and mark the diagram as **executable**.

Save the diagram as `src/main/resources/order-process.bpmn` under the project's folder.

## Deploy a process

Next, we want to deploy the modeled process to the broker.

The broker stores the process under its BPMN process id and assigns a version.

Add the following deploy command to the main class:

```java
package io.zeebe;

import io.zeebe.client.api.response.DeploymentEvent;

public class Application
{
    public static void main(final String[] args)
    {
        // after the client is connected

        final DeploymentEvent deployment = client.newDeployCommand()
            .addResourceFromClasspath("order-process.bpmn")
            .send()
            .join();

        final int version = deployment.getProcesses().get(0).getVersion();
        System.out.println("Process deployed. Version: " + version);

        // ...
    }
}
```

Run the program and verify that the process is deployed successfully.
You should see the output:

```
Process deployed. Version: 1
```

## Create a process instance

We are ready to create our first instance of the deployed process. 

A process instance is created from a specific version of the process, which can be set on creation.

Add the following create command to the main class:

```java
package io.zeebe;

import io.zeebe.client.api.response.ProcessInstanceEvent;

public class Application
{
    public static void main(final String[] args)
    {
        // after the process is deployed

        final ProcessInstanceEvent wfInstance = client.newCreateInstanceCommand()
            .bpmnProcessId("order-process")
            .latestVersion()
            .send()
            .join();

        final long processInstanceKey = wfInstance.getProcessInstanceKey();

        System.out.println("Process instance created. Key: " + processInstanceKey);

        // ...
    }
}
```

Run the program and verify that the process instance is created. You should see the output:

```
Process instance created. Key: 2113425532
```

You did it!

## See the process in action

You want to see how the process instance is executed?

1. Go to the cluster in Camunda Cloud and select it
1. Click on the link to [Operate](/product-manuals/operate/userguide/basic-operate-navigation.md)
1. Select the process _order process_

As you can see, a process instance has been started and finished.

## Work on a job

Now we want to do some work within our process.

First, add a few service jobs to the BPMN diagram and set the required attributes. Then extend your main class and create a job worker to process jobs which are created when the process instance reaches a service task.

Open the BPMN diagram in the modeler. Insert three service tasks between the start and the end event.

- Name the first task `Collect Money`.
- Name the second task `Fetch Items`.
- Name the third task `Ship Parcel`.

![model-process-step-2](assets/order-process.png)

You need to set the type of each task, which identifies the nature of the work to be performed.

- Set the **type** of the first task to `payment-service`.
- Set the **type** of the second task to `fetcher-service`.
- Set the **type** of the third task to `shipping-service`.

Save the BPMN diagram to the same file. When you run the program again, the changed process will be deployed and a new version of the process will be created.

Switching back to the main class, add the following lines to create a job worker for the first jobs type:

```java
package io.zeebe;

import io.zeebe.client.api.worker.JobWorker;

public class App
{
    public static void main(final String[] args)
    {
        // after the process instance is created

        try(final JobWorker jobWorker = client.newWorker()) {
            jobWorker.jobType("payment-service")
            .handler((jobClient, job) ->
            {
                System.out.println("Collect money");

                // ...

                jobClient.newCompleteCommand(job.getKey())
                    .send()
                    .join();
            })
            .open();

            // waiting for the jobs
            // Don't close, we need to keep polling to get work
            // It will be close after last statement in try-with resources block

            // ...
        }

    }
}
```

Run the program and verify that the job is processed. You should see the output:

```
Collect money
```

Looking at Operate, you can see that the process instance moved from the first service task to the next one.

## Work with data

Usually, a process is more than just tasks, there is also a data flow. The worker gets the data from the process instance to do its work and send the result back to the process instance.

In Zeebe, the data is stored as key-value-pairs in the form of variables. Variables can be set when the process instance is created. Within the process, variables can be read and modified by workers.

In our example, we want to create a process instance with the following variables:

```json
"orderId": 31243
"orderItems": [435, 182, 376]
```

The first task should read `orderId` as input and return `totalPrice` as result.

Modify the process instance create command and pass the data as variables. Also, modify the job worker to read the job variables and complete the job with a result.

```java
package io.zeebe;

public class App
{
    public static void main(final String[] args)
    {
        // after the process is deployed

        final Map<String, Object> data = new HashMap<>();
        data.put("orderId", 31243);
        data.put("orderItems", Arrays.asList(435, 182, 376));

        final ProcessInstanceEvent wfInstance = client.newCreateInstanceCommand()
            .bpmnProcessId("order-process")
            .latestVersion()
            .variables(data)
            .send()
            .join();

        // ...

        final JobWorker jobWorker = client.newWorker()
            .jobType("payment-service")
            .handler((jobClient, job) ->
            {
                final Map<String, Object> variables = job.getVariablesAsMap();

                System.out.println("Process order: " + variables.get("orderId"));
                double price = 46.50;
                System.out.println("Collect money: $" + price);

                // ...

                final Map<String, Object> result = new HashMap<>();
                result.put("totalPrice", price);

                jobClient.newCompleteCommand(job.getKey())
                    .variables(result)
                    .send()
                    .join();
            })
            .fetchVariables("orderId")
            .open();

        // ...
    }
}
```

Run the program and verify that the variable is read. You should see the output:

```
Process order: 31243
Collect money: $46.50
```

When we have a look at the Operate, then we can see that the variable `totalPrice` is set.

## Next steps

From here there are several steps to take, depending on your preference:

- Implement workers for the other two jobs to get the hang of it
- Check out examples for use cases not covered here:
  - [Create non-blocking process instances](../java-client-examples/process-instance-create-nonblocking.md)
  - [Create a process instance with results](../java-client-examples/process-instance-create-with-result.md)
  - [Handle variables as POJO](../java-client-examples/data-pojo.md)
- Learn how to [write tests](testing.md)
- Learn more about [BPMN processes](/reference/bpmn-processes/bpmn-primer.md) in general
- Learn more about the Java client's [job worker](job-worker.md)
