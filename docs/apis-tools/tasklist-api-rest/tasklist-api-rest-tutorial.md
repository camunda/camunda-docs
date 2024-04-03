---
id: tasklist-api-rest-tutorial
title: Tutorial
slug: /apis-tools/tasklist-api-rest/tasklist-api-rest-tutorial
sidebar_position: 2
description: "Implement an application using the Tasklist and Zeebe REST APIs."
---

In this tutorial, we'll create a Spring Boot application that utilizes Zeebe and Tasklist REST APIs for managing user tasks within Camunda.

## Getting started

For this tutorial we'll need:

- JDK 17: Ensure you have Java Development Kit 17 installed on your machine.
- [A cluster on Camunda 8](../../components/console/manage-clusters/create-cluster.md)
- [A set of API credentials](../../components/console/manage-clusters/manage-api-clients.md). Check the Tasklist option when creating these.

Don't forget to save these as you'll need them later.

## Creating a new Spring Boot application

Go to the [Spring Initializr website](https://start.spring.io/) to create a new Spring Boot project. Specify your project's details:

- **Project**: Maven
- **Spring Boot**: 3.2.4
- **Java**: 17
- **Group**: com.example
- **Package name**: com.example.demo

This will generate a Maven project.

## Integrating spring-zeebe

[`spring-zeebe`](../community-clients/spring.md) is a community Spring integration library and integrates the Zeebe API withing the Spring environment.

To use it, add the following Maven dependency in the `pom.xml` file:

```xml
<dependencies>
  <!-- other dependencies -->
  <dependency>
    <groupId>io.camunda.spring</groupId>
    <artifactId>spring-boot-starter-camunda</artifactId>
    <version>8.5.0</version>
  </dependency>
</dependencies>
```

## Handling connection and authentication

Connection and authentication configuration depends on the client mode, whether it is simple (local dev), OIDC, or SaaS. For full details, review [spring-zeebe](https://github.com/camunda-community-hub/spring-zeebe) under the **Configuring Camunda 8 connection** section.

For SaaS, add the following configuration in `src/main/resources/application.yaml`, replacing the API client details:

```yaml
camunda:
  client:
    mode: saas
    auth:
      client-id: <your client id>
      client-secret: <your client secret>
    cluster-id: <your cluster id>
    region: <your cluster region>
```

## Generating the Tasklist API client

The Tasklist API is not part of the built-in client in the `spring-zeebe` library. Let's generate one using `openapi-generator-maven-plugin`:

1. Download the open API spec `yaml` file `${tasklistBaseUrl}/v3/api-docs.yaml` (for example, `http://localhost:8082/v3/api-docs.yaml` if you run Tasklist in your local environment or `https://${region}.tasklist.camunda.io/${clusterId}/v3/api-docs.yaml` if you are using Camunda 8 SaaS.)
2. Copy the downloaded spec file to `src/main/resources/tasklist-api.yaml`.
3. Add the following plugin in `pom.xml`:

```xml
<build>
  <plugins>
    <!-- other plugins -->
    <plugin>
      <groupId>org.openapitools</groupId>
      <artifactId>openapi-generator-maven-plugin</artifactId>
      <version>7.2.0</version>
      <executions>
        <execution>
          <id>generate-client</id>
          <goals>
            <goal>generate</goal>
          </goals>
          <configuration>
            <inputSpec>${project.basedir}/src/main/resources/tasklist-api.yaml</inputSpec>
            <generatorName>java</generatorName>
            <apiPackage>com.example.tasklist.api</apiPackage>
            <modelPackage>com.example.tasklist.model</modelPackage>
            <generateApiTests>false</generateApiTests>
            <generateModelTests>false</generateModelTests>
            <library>apache-httpclient</library>
            <configOptions>
              <useJakartaEe>true</useJakartaEe>
            </configOptions>
          </configuration>
        </execution>
      </executions>
    </plugin>
  </plugins>
</build>
```

4. The generated code requires some extra Maven dependencies, add them in `pom.xml`:

```xml
<dependencies>
  <!-- other dependencies -->
  <dependency>
    <groupId>com.fasterxml.jackson.jaxrs</groupId>
    <artifactId>jackson-jaxrs-json-provider</artifactId>
  </dependency>
  <dependency>
    <groupId>org.openapitools</groupId>
    <artifactId>jackson-databind-nullable</artifactId>
    <version>0.2.6</version>
  </dependency>
</dependencies>
```

5. Execute `mvn clean install`. This will generate the data model classes alongside the API client classes, allowing you to invoke the Tasklist endpoints. The generated code is located under the `target` folder.
6. Create a `TasklistClientConfiguration` configuration class under the `com.example.demo.config` package, and define the `taskApi` bean:

```java
package com.example.demo.config;

import com.example.tasklist.ApiClient;
import com.example.tasklist.api.TaskApi;
import io.camunda.zeebe.spring.client.properties.CamundaClientProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TasklistClientConfiguration {

  @Bean
  public TaskApi taskApi(ApiClient apiClient) {
    return new TaskApi(apiClient);
  }

  @Bean
  public ApiClient apiClient(CamundaClientProperties camundaClientProperties) {
    return new ApiClient()
        .setBasePath(camundaClientProperties.getTasklist().getBaseUrl().toString());
  }
}
```

## Using the APIs

Now we're ready to make requests to the APIs.

We will use a simple process with a user task. The user task has `Zeebe user task` implementation type. Review [migrate to Zeebe user tasks](./migrate-to-zeebe-user-tasks.md) for more details.

This means we must use the Zeebe REST API for user task operations (assign, complete, etc.) and the Tasklist REST API for task querying (search, get by id, etc.)

![Process with a user task](./assets/img/simple-user-task-process.png)

:::note
You can automate the deployment of the process in Zeebe upon application startup. Save your BPMN file under the `src/main/resources/models` folder. Then, include the following annotation in your `DemoApplication.java` class: `@Deployment(resources = "classpath*:/models/*.*")`.
:::

Let's create a service that:

1. Starts a process instance
2. Searches for the newly created Zeebe user tasks
3. Picks one user task
4. Assigns the task to a user
5. Gets the user task by id
6. Completes the user task
7. Gets the completed task and checks the state

First, let's create a class annotated with Spring's @Service and autowire the required beans:

- `ZeebeClient`, which will be used for making calls to the Zeebe API.
- `TaskApi`, the bean you configured in `TasklistClientConfiguration`, which will be used to call the Tasklist Tasks API.
- `Authentication`, which will be utilized for retrieving the authentication token header to be included in Tasklist API requests.

```java
import io.camunda.common.auth.Authentication;
import io.camunda.tasklist.api.TaskApi;
import io.camunda.zeebe.client.ZeebeClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class UserTasksManagementService {

  private static final Logger LOG = LoggerFactory.getLogger(UserTasksManagementService.class);

  @Autowired private ZeebeClient zeebe;

  @Autowired private TaskApi taskApi;

  @Autowired private Authentication authentication;

  @EventListener(ApplicationReadyEvent.class)
  public void manageUserTasks() {
      // your implementation here
  }
}
```

`Authentication` is an interface that provides abstraction over the authentication mechanism, adapting to different client modes. For instance, for local dev mode, it employs cookie-based authentication, whereas in OIDC or SaaS environments, it utilizes JWT token-based authentication. Let's create a method that fetches the token header for Tasklist.

```java
private Map<String, String> getTasklistAuthTokenHeader() {
  return Map.ofEntries(authentication.getTokenHeader(Product.TASKLIST));
}
```

We've applied the `@EventListener(ApplicationReadyEvent.class)` annotation to the `manageUserTasks()` method, ensuring its execution upon application startup and ready. Alternatively, you could trigger this method within a REST controller, invoked by a corresponding REST API endpoint.

Here is how the scenario implementation looks:

```java
@EventListener(ApplicationReadyEvent.class)
public void manageUserTasks() throws Exception {
    // 1. Start a process instance
  long processInstanceKey =
      zeebe
          .newCreateInstanceCommand()
          .bpmnProcessId("camunda-process")
          .latestVersion()
          .send()
          .get()
          .getProcessInstanceKey();
  LOG.info("Started a 'camunda-process' process instance with key={}", processInstanceKey);

  // 2. Search for user tasks (filter by processInstanceKey, implementation=ZEEBE_USER_TASK,
  // state=CREATED and sort DESC by creationTime)
  List<TaskSearchResponse> tasks =
      waitFor(
          () ->
              taskApi.searchTasks(
                  new TaskSearchRequest()
                      .state(TaskSearchRequest.StateEnum.CREATED)
                      .implementation(TaskSearchRequest.ImplementationEnum.ZEEBE_USER_TASK)
                      .processInstanceKey(String.valueOf(processInstanceKey))
                      .sort(
                          List.of(
                              new TaskOrderBy()
                                  .field(TaskOrderBy.FieldEnum.CREATIONTIME)
                                  .order(TaskOrderBy.OrderEnum.DESC))),
                  getTasklistAuthTokenHeader()),
          taskSearchResponses -> taskSearchResponses.size() > 0);
  LOG.info("Found {} task(s) in Tasklist", tasks.size());

  // 3. Pick the last created task
  String taskId = tasks.get(0).getId();
  LOG.info("The chosen task id={}", taskId);

  // 4. Assign task to "demo" user
  zeebe.newUserTaskAssignCommand(Long.valueOf(taskId)).assignee("demo").send().get();

  // 5. Get the task by id
  TaskResponse taskResponse =
      waitFor(
          () -> taskApi.getTaskById(taskId, getTasklistAuthTokenHeader()),
          response -> "demo".equals(response.getAssignee()));
  LOG.info("Task {} is assigned to {}", taskId, taskResponse.getAssignee());

  // 6. Complete the task
  zeebe.newUserTaskCompleteCommand(Long.valueOf(taskId)).send().get();

  // 7. Get the task and check the state
  taskResponse =
      waitFor(
          () -> taskApi.getTaskById(taskId, getTasklistAuthTokenHeader()),
          response -> response.getTaskState() == TaskResponse.TaskStateEnum.COMPLETED);
  LOG.info("Task {} has {} state", taskId, taskResponse.getTaskState());
}
```

Data is asynchronously exported from Zeebe to Tasklist. To ensure the data is available in Tasklist after submitting Zeebe commands, we've incorporated an active polling helper method `waitFor`:

```java
private <T> T waitFor(Callable<T> responseSupplier, Predicate<T> responseTester)
    throws Exception {
  int maxRounds = 10;
  int waitRound = 0;
  int waitTime = 1000;
  while (waitRound < maxRounds) {
    T response = responseSupplier.call();
    if (responseTester.test(response)) {
      return response;
    }
    Thread.sleep(waitTime);
    waitRound++;
  }
  throw new RuntimeException(
      String.format("Test is not successful after %s attempts", waitRound));
}
```

To execute this, run the application:

```sh
./mvnw spring-boot:run
```

The application outputs the following logs:

```
INFO com.example.demo.UserTasksManagementService       : Started camunda-process instance with key=4503599627491527
INFO com.example.demo.UserTasksManagementService       : Found 1 task(s) in Tasklist
INFO com.example.demo.UserTasksManagementService       : The chosen task id=2251799813813402
INFO com.example.demo.UserTasksManagementService       : Task 2251799813813402 is assigned to demo
INFO com.example.demo.UserTasksManagementService       : Task 2251799813813402 has COMPLETED state
```
