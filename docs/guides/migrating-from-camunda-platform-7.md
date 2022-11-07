---
id: migrating-from-camunda-platform-7
title: Migrating from Camunda Platform 7
description: "Migrate process solutions developed for Camunda Platform 7 to run them on Camunda Platform 8."
keywords: [Camunda 8, Camunda 7, migration guide, transition, transition guide]
---

<span class="badge badge--advanced">Advanced</span>
<span class="badge badge--long">Time estimate: 1 hour</span>

This guide describes how to migrate process solutions developed for Camunda Platform 7 to run them on Camunda Platform 8.

You will see the basic differences of the products, learn about necessary steps, and also limitations of migration.

It's important to note that migration of existing projects to Camunda Platform 8 is optional. Camunda Platform 7 still has ongoing support.

## Camunda Platform 7 vs. Camunda Platform 8

Before diving into concrete steps on migrating your models and code, let's cover some important conceptual differences between between Camunda version 7 and version 8 and how this affects your projects and solutions. After this section, we'll dive into a concrete how-to.

### Conceptual differences

This section does not compare Camunda Platform 7 with Camunda Platform 8 in detail, but rather lists differing aspects important to know when thinking about migration.

#### No embedded engine in Camunda Platform 8

Camunda Platform 7 allows embedding the workflow engine as a library in your application. This means both run in the same JVM, share thread pools, and can even use the same datasource and transaction manager.

In contrast, the workflow engine in Camunda Platform 8 is always a remote resource for your application, while the embedded engine mode is not supported.

If you are interested in the reasons why we switched our recommendation from embedded to remote workflow engines, please refer to [this blog post](https://blog.bernd-ruecker.com/moving-from-embedded-to-remote-workflow-engines-8472992cc371).

The implications for your process solution and the programming model are describeed below. Conceptually, the only really big difference is that with a remote engine, you cannot share technical [ACID transactions](https://en.wikipedia.org/wiki/ACID) between your code and the workflow engine. You can read more about it in the blog post ["Achieving consistency without transaction managers"](https://blog.bernd-ruecker.com/achieving-consistency-without-transaction-managers-7cb480bd08c).

#### Different data types

In Camunda Platform 7, you can store different data types, including serialized Java objects.

Camunda Platform 8 only allows storage of primary data types or JSON as process variables. This might require some additional data mapping in your code when you set or get process variables.

Camunda Platform 7 provides [Camunda Spin](https://docs.camunda.org/manual/latest/reference/spin/) to ease XML and JSON handling. This is not available with Camunda Platform 8, and ideally you migrate to an own data transformation logic you can fully control (e.g. using Jackson).

To migrate existing process solutions that use Camunda Spin heavily, you can still add the Camunda Spin library to your application itself and use its API to do the same data transformations as before in your application code.

#### Expression language

Camunda Platform 7 uses [JUEL (Java Unified Expression Language)](https://docs.camunda.org/manual/latest/user-guide/process-engine/expression-language/) as the expression language. In the embedded engine scenario, expressions can even read into beans (Java object instances) in the application.

Camunda Platform 8 uses [FEEL (Friendly-Enough Expression Language](/components/modeler/feel/what-is-feel.md) and expressions can only access the process instance data and variables.

Most expressions can be converted (see [this community extension](https://github.com/camunda-community-hub/camunda-7-to-8-migration/blob/main/modeler-plugin-7-to-8-converter/client/JuelToFeelConverter.js as a starting point), some might need to be completely rewritten, and some might require an additional service task to prepare necessary data (which may have been calculated on the fly when using Camunda Platform 7).

#### Different Connector infrastructure

Camunda Platform 7 provides several [Connectors](https://docs.camunda.org/manual/latest/reference/connect/). Camunda Platform 8 now also offers multiple [Connectors](../components/connectors/out-of-the-box-connectors/available-connectors-overview.md) as well.

To migrate existing Connectors, create a small bridging layer to invoke these Connectors via a custom [job workers](/components/concepts/job-workers.md).

### Process solutions using Spring Boot

With Camunda Platform 7, a frequently used architecture to build a process solution (also known as process applications) is composed out of:

- Java
- Spring Boot
- Camunda Spring Boot Starter with embedded engine
- Glue code implemented in Java Delegates (being Spring beans)

This is visualized on the left-hand side of the picture below. With Camunda Platform 8, a comparable process solution would look like the right-hand side of the picture and leverage:

- Java
- Spring Boot
- Spring Zeebe Starter (embeding the Zeebe client)
- Glue code implemented as workers (being Spring beans)

![spring boot](img/architecture-spring-boot.png)

The difference is that the engine is no longer embedded, which is also our latest [greenfield stack recommendation in Camunda Platform 7](/docs/components/best-practices/architecture/deciding-about-your-stack-c7/#the-java-greenfield-stack). If you are interested in the reasons why we switched our recommendation from embedded to remote workflow engines, please refer to [this blog post](https://blog.bernd-ruecker.com/moving-from-embedded-to-remote-workflow-engines-8472992cc371).

The packaging of a process solution is the same with Camunda Platform 7 and Camunda Platform 8. Your process solution is one Java application that consists of your BPMN and DMN models, as well as all glue code needed for connectivity or data transformation. The big difference is that the configuration of the workflow engine itself is not part of the Spring Boot application anymore.

![Process Solution Packaging](img/process-solution-packaging.png)

Process solution definition taken from ["Practical Process Automation"](https://processautomationbook.com/).

You can find a complete Java Spring Boot example, showing the Camunda Platform 7 process solution alongside the comparable Camunda Platform 8 process solution in the [Camunda Platform 7 to Camunda Platform 8 migration example](https://github.com/camunda-community-hub/camunda-7-to-8-migration/tree/main/example).

### Programming model

The programming model of Camunda Platform 7 and Camunda Platform 8 are very similar if you program in Java and use Spring.

For example, a worker in Camunda Platform 8 can be implemented like this (using [spring-zeebe](https://github.com/camunda-community-hub/spring-zeebe)):

```java
@ZeebeWorker(type = "payment", autoComplete = true)
public void retrievePayment(ActivatedJob job) {
  // Do whatever you need to, e.g. invoke a remote service:
  String orderId = job.getVariablesMap().get("orderId");
  paymentRestClient.invoke(...);
}
```

You can find more information on the programming model in Camunda Platform 8 in [this blog post](https://blog.bernd-ruecker.com/how-to-write-glue-code-without-java-delegates-in-camunda-cloud-9ec0495d2ba5).

:::note
JUnit testing with an embedded in-memory engine is also possible with Camunda Platform 8, see [spring-zeebe documentation](https://github.com/camunda-community-hub/spring-zeebe#writing-test-cases).
:::

### Platform deployment

A typical deployment of the workflow engine itself looks different because the workflow engine is no longer embedded into your own deployment artifacts.

With Camunda Platform 7 a typical deployment includes:

- Your Spring Boot application with all custom code and the workflow engine, cockpit, and tasklist embedded. This application is typically scaled to at least two instances (for resilience)
- A relational database
- An elastic database (for Optimize)
- Optimize (a Java application)

With Camunda Platform 8 you deploy:

- Your Spring Boot application with all custom code and the Zeebe client embedded. This application is typically scaled to at least two instances (for resilience)
- The Zeebe broker, typically scaled to at least three instances (for resilience)
- An elastic database (for Operate, Taskliste, and Optimize)
- Optimize, Operate, and Tasklist (each one is a Java application). You can scale those applications to increase availability if you want.

![Camunda Platform 7 vs Camunda Platform 8 Deployment View](img/camunda7-vs-camunda8-deployment-view.png)

Camunda Platform 8 deployments happen within Kubernetes. There are [Helm charts available](https://docs.camunda.io/docs/self-managed/zeebe-deployment/kubernetes/helm/) if you want to run Camunda Platform 8 self-managed.

Camunda Platform 8 is also available as a SaaS offering from Camunda, in this case, you only need to deploy your own process solution and Camunda operates the rest.

:::note
For local development purposes, you can [spin up Camunda Platform 8 on a developer machine using Docker or Docker Compose](https://docs.camunda.io/docs/self-managed/zeebe-deployment/docker/install/). Of course, developers could also create a cluster for development purposes in the SaaS offering of Camunda.
:::

### Other process solution architectures

Besides Spring Boot there are also other environments being used to build process solutions.

#### Container-managed engine (Tomcat, WildFly, Websphere & co)

Camunda Platform 8 doesn't provide integration into Jakarta EE application servers like Camunda Platform 7 does. Instead, Jakarta EE applications need to manually add the Zeebe client library. The implications are comparable to what is described for Spring Boot applications in this guide.

![container-managed](img/architecture-container-managed.png)

#### CDI or OSGI

Due to limited adoption, there is no support for CDI or OSGI in Camunda Platform 8. A lightweight integration layer comparable to [Spring Zeebe](https://github.com/camunda-community-hub/spring-zeebe) might evolve in the feature and we are happy to support this as a community extension to the Zeebe project.

#### Polyglot applications (C#, NodeJS, ...)

When you run your application in for example NodeJS or C#, you exchange one remote engine (Camunda Platform 7) with another (Camunda Platform 8). As Zeebe comes with a different API, you need to adjust your source code. Camunda Platform 8 does not use REST as API technology, but gRPC, and you will need to leverage a [client library](/apis-clients/working-with-apis-clients.md) instead.

![polygot architecture](img/architecture-polyglot.png)

### Plugins

[**Process engine plugins**](https://docs.camunda.org/manual/latest/user-guide/process-engine/process-engine-plugins/) are not available in Camunda Platform 8, as such plugins can massively change the behavior or even harm the stabilty of the engine. Some use cases might be implemented using [exporters](/self-managed/concepts/exporters.md). Note that exporters are only available for self-managed Zeebe clusters and not in Camunda Platform 8 SaaS.

Migrating **Modeler Plugins** is generally possible, as the same modeler infrastructure is used.

**Cockpit or tasklist plugins** _cannot_ be migrated.

## Migration overview

Let's discuss if you need to migrate first, before diving into the necessary steps and what tools can help you achieve the migration.

### When to migrate?

New projects should typically be started using Camunda Platform 8.

Existing solutions using Camunda Platform 7 might simply keep running on Camunda Platform 7. The platform has ongoing support, so there is no need to rush on a migration project.

You should consider migrating existing Camunda Platform 7 solutions if:

- You are looking to leverage a SaaS offering (e.g. to reduce the effort for hardware or infrastructure setup and maintenance).
- You are in need of performance at scale and/or improved resilience.
- You are in need of certain features that can only be found in Camunda Platform 8 (e.g. [BPMN message buffering](/docs/components/concepts/messages/#message-buffering), big [multi-instance constructs](/docs/components/modeler/bpmn/multi-instance/), the new Connectors framework, or the improved collaboration features in web modeler).

### Migration steps

For migration, you need to look at development artifacts (BPMN models and application code), but also at workflow engine data (runtime and history) in case you migrate a process solution running in production.

The typical steps are:

1. Migrate development artifacts
   1. Adjust your BPMN models (only in rare cases you have to touch your DMN models)
   2. Adjust your development project (remove embedded engine, add Zeebe client)
   3. Refactor your code to use the Zeebe client API
   4. Refactor your glue code or use [the Java Delegate adapter project](https://github.com/camunda-community-hub/camunda-7-to-8-migration/tree/main/camunda-7-adapter).
2. Migrate workflow engine data

In general, **development artifacts** _can_ be migrated:

- **BPMN models:** Camunda Platform 8 uses BPMN like Camunda Platform 7 does, which generally allows use of the same model files, but you might need to configure _different extension atrributes_ (at least by using a different namespace). Furthermore, Camunda Platform 8 has a _different coverage_ of BPMN concepts that are supported (see [Camunda Platform 8 BPMN coverage](/components/modeler/bpmn/bpmn-coverage.md) vs [Camunda Platform 7 BPMN coverage](https://docs.camunda.org/manual/latest/reference/bpmn20/)), which might require some model changes. Note that the coverage of Camunda Platform 8 will increase over time.

- **DMN models:** Camunda Platform 8 uses DMN like Camunda Platform 7 does. There are no changes in the models necessary. Some rarely used features of Camunda Platform 7 are not supported in Camunda Platform 8. Those are listed below.

- **CMMN models:** It is not possible to run CMMN on Zeebe, _CMMN models cannot be migrated_. You can remodel cases in BPMN according to [Building Flexibility into BPMN Models](https://camunda.com/best-practices/building-flexibility-into-bpmn-models/), keeping in mind the [Camunda Platform 8 BPMN coverage](/components/modeler/bpmn/bpmn-coverage.md).

- **Application code:** The application code needs to use _a different client library and different APIs_. This will lead to code changes you must implement.

- **Architecture:** The different architecture of the core workflow engine might require _changes in your architecture_ (e.g. if you used the embedded engine approach). Furthermore, certain concepts of Camunda Platform 7 are no longer possible (like hooking in Java code at various places, or control transactional behavior with asynchronous continuations) which might lead to _changes in your model and code_.

In general, **workflow engine data** is harder to migrate to Camunda Platform 8:

- **Runtime data:** Running process instances of Camunda Platform 7 are stored in the Camunda Platform 7 relational database. Like with a migration from third party workflow engines, you can read this data from Camunda Platform 7 and use it to create the right process instances in Camunda Platform 8 in the right state. This way, you can migrate running process instances from Camunda Platform 7 to Camunda Platform 8, but some manual effort is required.

- **History data:** Historic data from the workflow engine itself cannot be migrated. However, data in Optimize can be kept.

### Migration tooling

The [Camunda Platform 7 to Camunda Platform 8 migration tooling](https://github.com/camunda-community-hub/camunda-7-to-8-migration), available as a community extension, contains two components that will help you with migration:

1. [A Desktop Modeler plugin to convert BPMN models from Camunda Platform 7 to Camunda Platform 8](https://github.com/camunda-community-hub/camunda-7-to-8-migration/tree/main/modeler-plugin-7-to-8-converter). This maps possible BPMN elements and technical attributes into the Camunda Platform 8 format and gives you warnings where this is not possible. This plugin might not fully migrate your model, but should give you a jump-start. It can be extended to add your own custom migration rules. Note that the model conversion requires manual supervision.

2. [The Camunda Platform 7 Adapter](https://github.com/camunda-community-hub/camunda-7-to-8-migration/tree/main/camunda-7-adapter). This is a library providing a worker to hook in Camunda Platform 7-based glue code. For example, it can invoke existing JavaDelegate classes.

In essence, this tooling implements details described in the next sections.

## Adjusting your source code

Camunda Platform 8 has a different API than Camunda Platform 7. As a result, you have to migrate some of your code, especially code that does the following:

- Uses the Client API (e.g. to start process instances)
- Implements [service tasks](../components/modeler/bpmn/service-tasks/service-tasks.md), which can be:
  - [Java code attached to a service task](https://docs.camunda.org/manual/latest/user-guide/process-engine/delegation-code/) and called by the engine directly (in-VM).
  - [External tasks](../components/best-practices/development/invoking-services-from-the-process-c7.md#external-tasks), where workers subscribe to the engine.

<!--
We'll explore these three cases in the sections below.

![spring boot](img/architecture-spring-boot.png)
-->

For example, to migrate an existing Spring Boot application, take the following steps:

1. Adjust Maven dependencies

- Remove Camunda Platform 7 Spring Boot Starter and all other Camunda dependencies.
- Add [Spring Zeebe Starter](https://github.com/camunda-community-hub/spring-zeebe).

2. Adjust config

- Make sure to set [Camunda Platform 8 credentials](https://github.com/camunda-community-hub/spring-zeebe#configuring-camunda-cloud-connection) (for example, in `src/main/resources/application.properties`) and point it to an existing Zeebe cluster.
- Remove existing Camunda Platform 7 settings.

3. Replace `@EnableProcessApplication` with `@EnableZeebeClient` in your main Spring Boot application class.
4. Add `@ZeebeDeployment(resources = "classpath*:**/*.bpmn")` to automatically deploy all BPMN models.

Finally, adjust your source code and process model as described in the sections below.

### Client API

All Camunda Platform 8 APIs (e.g. to start process instances, subscribe to tasks, or complete them) have been completely redesigned are not compatible with Camunda Platform 7. While conceptually similar, the APIs use different method names, data structures, and protocols.

If this affects large parts of your code base, you could write a small abstraction layer implementing the Camunda Platform 7 API delegating to Camunda Platform 8, probably marking unavailable methods as deprecated. We welcome community extensions that facilitate this but have not yet started own efforts.

### Service tasks with attached Java code (Java Delegates, Expressions)

In Camunda Platform 7, there are three ways to attach Java code to service tasks in the BPMN model using different attributes in the BPMN XML:

- Specify a class that implements a JavaDelegate or ActivityBehavior: `camunda:class`.
- Evaluate an expression that resolves to a delegation object: `camunda:delegateExpression`.
- Invoke a method or value expression: `camunda:expression`.

Camunda Platform 8 cannot directly execute custom Java code. Instead, there must be a [job worker](/components/concepts/job-workers.md) executing code.

The [Camunda Platform 7 Adapter](https://github.com/camunda-community-hub/camunda-7-to-8-migration/tree/main/camunda-7-adapter) implements such a job worker using [Spring Zeebe](https://github.com/camunda-community-hub/spring-zeebe). It subscribes to the task type `camunda-7-adapter`. [Task headers](/components/modeler/bpmn/service-tasks/service-tasks.md#task-headers) are used to configure a delegation class or expression for this worker.

![Service task in Camunda Platform 7 and Camunda Platform 8](img/migration-service-task.png)

You can use this worker directly, but more often it might serve as a starting point or simply be used for inspiration.

The [Camunda Platform 7 to Camunda Platform 8 Converter Modeler plugin](https://github.com/camunda-community-hub/camunda-7-to-8-migration/tree/main/modeler-plugin-7-to-8-converter) will adjust the service tasks in your BPMN model automatically for this adapter.

The topic `camunda-7-adapter` is set and the following attributes/elements are migrated and put into a task header:

- `camunda:class`
- `camunda:delegateExpression`
- `camunda:expression` and `camunda:resultVariable`

### Service tasks as external tasks

[External task workers](https://docs.camunda.org/manual/latest/user-guide/process-engine/external-tasks/) in Camunda Platform 7 are conceptually comparable to [job workers](/components/concepts/job-workers.md) in Camunda Platform 8. This means they are generally easier to migrate.

The "external task topic" from Camunda Platform 7 is directly translated in a "task type name" in Camunda Platform 8, therefore `camunda:topic` gets `zeebe:taskDefinition type` in your BPMN model.

The [Camunda Platform 7 Adapter](https://github.com/camunda-community-hub/camunda-7-to-8-migration/tree/main/camunda-7-adapter) will pick up your `@ExternalTaskHandler` beans, wrap them into a JobWorker, and subscribe to the `camunda:topic` you defined as `zeebe:taskDefinition type`.

## Adjusting Your BPMN models

To migrate BPMN process models from Camunda Platform 7 to Camunda Platform 8, you must adjust them:

- The namespace of extensions has changed (from `http://camunda.org/schema/1.0/bpmn` to `http://camunda.org/schema/zeebe/1.0`)
- Different configuration attributes are used
- Camunda Platform 8 has a _different coverage_ of BPMN elements (see [Camunda Platform 8 BPMN coverage](/components/modeler/bpmn/bpmn-coverage.md) vs [Camunda Platform 7 BPMN coverage](https://docs.camunda.org/manual/latest/reference/bpmn20/)), which might require some model changes. Note that the coverage of Camunda Platform 8 will increase over time.

The following sections describe what the existing [Camunda Platform 7 to Camunda Platform 8 migration tooling](https://github.com/camunda-community-hub/camunda-7-to-8-migration/) does by BPMN symbol and explain unsupported attributes.

### Service tasks

![Service Task](../components/modeler/bpmn/assets/bpmn-symbols/service-task.svg)

Migrating a service task is described in detail in the section about adjusting your source code above.

A service task might have **attached Java code**. In this case, the following attributes/elements are migrated and put into a task header:

- `camunda:class`
- `camunda:delegateExpression`
- `camunda:expression` and `camunda:resultVariable`

The topic `camunda-7-adapter` is set.

The following attributes/elements cannot be migrated:

- `camunda:asyncBefore`: Every task in Zeebe is always asyncBefore and asyncAfter.
- `camunda:asyncAfter`: Every task in Zeebe is always asyncBefore and asyncAfter.
- `camunda:exclusive`: Jobs are always exclusive in Zeebe.
- `camunda:jobPriority`: There is no way to prioritize jobs in Zeebe (yet).
- `camunda:failedJobRetryTimeCycle`: You cannot yet configure the retry time cycle.

A service task might leverage **external tasks** instead. In this case, the following attributes/elements are migrated:

- `camunda:topic` gets `zeebe:taskDefinition type`.

The following attributes/elements cannot be migrated:

- `camunda:taskPriority`

Service tasks using `camunda:type` cannot be migrated.

Service tasks using `camunda:connector` cannot be migrated.

### Send tasks

![Send Task](../components/modeler/bpmn/assets/bpmn-symbols/send-task.svg)

In both engines, a send task has the same behavior as a service task. A send task is migrated exactly like a service task.

### Gateways

Gateways rarely need migration. The relevant configuration is mostly in the [expressions](../components/concepts/expressions.md) on outgoing sequence flows.

### Expressions

Expressions need to be in [FEEL (friendly-enough expression language)](/components/concepts/expressions.md#the-expression-language) instead of [JUEL (Java unified expression language)](https://docs.camunda.org/manual/latest/user-guide/process-engine/expression-language/).

Migrating simple expressions is doable (as you can see in [these test cases](https://github.com/camunda-community-hub/camunda-7-to-8-migration/blob/main/modeler-plugin-7-to-8-converter/client/JuelToFeelConverter.test.js)), but not all expressions can be automatically converted.

The following is not possible:

- Calling out to functional Java code using beans in expressions
- Registering custom function definitions within the expression engine

### Human tasks

![User Task](../components/modeler/bpmn/assets/bpmn-symbols/user-task.svg)

Human task management is also available in Camunda Platform 8, but uses a different tasklist user interface and API.

In Camunda Platform 7, you have [different ways to provide forms for user tasks](https://docs.camunda.org/manual/latest/user-guide/task-forms/):

- Embedded Task Forms (embedded custom HTML and JavaScript)
- External Task Forms (link to custom applications)
- [Camunda Forms](./utilizing-forms.md)

Only Camunda Forms are currently supported in Camunda Platform 8 and can be migrated.

The following attributes/elements can be migrated:

- Task assignment (to users or groups):
  - `bpmn:humanPerformer`
  - `bpmn:potentialOwner`
  - `camunda:assignee`
  - `camunda:candidateGroups`
  - `camunda:formKey`, but Camunda Platform 8 requires you to embed the form definition itself into the root element of your BPMN XML models, see [this guide](/docs/guides/utilizing-forms/#connect-your-form-to-a-bpmn-diagram).

The following attributes/elements cannot (yet) be migrated:

- `camunda:candidateUsers` (only candidate groups are supported)
- Form handling:
  - `camunda:formHandlerClass`
  - `camunda:formData`
  - `camunda:formProperty`
- `camunda:taskListener`
- `camunda:dueDate`
- `camunda:followUpDate`
- `camunda:priority`

### Business rule tasks

![Business Rule Task](../components/modeler/bpmn/assets/bpmn-symbols/business-rule-task.svg)

Camunda Platform 8 support the DMN standard just as Camunda Platform 7 does, so the business rule task can basically be migrated.

The following attributes/elements can be migrated:

- `camunda:decisionRef`

The following attributes are not yet supported:

- `camunda:decisionRefBinding`, `camunda:decisionRefVersion`, and `camunda:decisionRefVersionTag`(always use the latest version)
- `camunda:mapDecisionResult` (no mapping happens)
- `camunda:resultVariable` (result is always mapped to variable 'result' and can be copied or unwrapped using ioMapping).
- `camunda:decisionRefTenantId`

A business rule task can also _behave like a service task_ to allow integration of third-party rule engines. In this case, the following attributes can also be migrated as described above for the service task migration: `camunda:class`, `camunda:delegateExpression`, `camunda:expression`, or `camunda:topic`.

The following attributes/elements cannot be migrated:

- `camunda:asyncBefore`, `camunda:asyncBefore`, `camunda:asyncAfter`, `camunda:exclusive`, `camunda:failedJobRetryTimeCycle`, and `camunda:jobPriority`
- `camunda:type` and `camunda:taskPriority`
- `camunda:connector`

### Call activities

![Call Activity](../components/modeler/bpmn/assets/bpmn-symbols/call-activity.svg)

Call activities are generally supported in Zeebe. The following attributes/elements can be migrated:

- `camunda:calledElement` will be converted into `zeebe:calledElement`
- Data Mapping
  - `camunda:in`
  - `camunda:out`

The following attributes/elements cannot be migrated:

- `camunda:calledElementBinding`: Currently Zeebe always assumes 'late' binding.
- `camunda:calledElementVersionTag`: Zeebe does not know a version tag.
- `camunda:variableMappingClass`: You cannot execute code to do variable mapping in Zeebe.
- `camunda:variableMappingDelegateExpression`: You cannot execute code to do variable mapping in Zeebe.

### Script task

![Script Task](../components/modeler/bpmn/assets/bpmn-symbols/script-task.svg)

Script tasks cannot natively be executed by the Zeebe engine. They behave like normal service tasks instead, which means you must run a job worker that can execute scripts. One available option is to use the [Zeebe Script Worker](https://github.com/camunda-community-hub/zeebe-script-worker), provided as a community extension.

If you do this, the following attributes/elements are migrated:

- `camunda:scriptFormat`
- `camunda:script`
- `camunda:resultVariable`

The task type is set to `script`.

The following attributes/elements cannot be migrated:

- `camunda:asyncBefore`: Every task in Zeebe is always asyncBefore and asyncAfter.
- `camunda:asyncAfter`: Every task in Zeebe is always asyncBefore and asyncAfter.
- `camunda:exclusive`: Jobs are always exclusive in Zeebe.
- `camunda:jobPriority`: There is no way to priotize jobs in Zeebe (yet).
- `camunda:failedJobRetryTimeCycle`: You cannot yet configure the retry time cycle.

### Message receive events and receive tasks

Message correlation works slightly different between the two products:

- Camunda Platform 7 simply waits for a message, and the code implementing that the message is received queries for a process instance the message will be correlated to. If no process instance is ready to receive that message, an exception is raised.

- Camunda Platform 8 creates a message subscription for every waiting process instance. This subscription requires a value for a `correlationKey` to be generated when entering the receive task. The code receiving the external message correlates using the value of the `correlationKey`.

This means you must inspect and adjust all message receive events or receive tasks in your model to define a reasonable `correlationKey`. You also must adjust your client code accordingly.

The `bpmn message name` is used in both products and doesn't need migration.

## Adjusting your DMN models

For Camunda Platform 8, [a former community extension](https://github.com/camunda-community-hub/dmn-scala), built by core Camunda developers, is productized. This engine has a higher coverage of DMN elements. This engine can execute DMN models designed for Camunda Platform 7, however, there are some small differences listed below.

You can use the above mentioned tooling to convert your DMN models from Camunda Platform 7 to Camunda Platform 8.

The following elements/attributes are not supported :

- `Version Tag` is not supported in Camunda Platform 8
- `History Time to Live` is not supported in Camunda Platform 8
- You cannot select the `Expression Language` in Camunda Platform 8, only FEEL is supported
- The property `Input Variable` is removed, in FEEL, the input value can be accessed by using `?` if needed

Furthermore, there are changes that might interesting, but legacy behavior can still be executed:

- Removed data types `integer` + `long` + `double` in favor of `number` for inputs and outputs (in FEEL, there is only a number type represented as `BigDecimal`)

## Prepare for smooth migrations

Sometimes you might not be able to use Camunda 8 right away as described in [What to do When You Can’t Quickly Migrate to Camunda 8](https://camunda.com/blog/2022/05/what-to-do-when-you-cant-quickly-migrate-to-camunda-8/). In this case, you will keep developing Camunda Platform 7 process solutions, but you should establish some practices as quickly as possible to ease migration projects later on.

To implement Camunda Platform 7 process solutions that can be easily migrated, stick to the following rules and development practices:

1. Implement what we call **Clean Delegates** - concentrate on reading and writing process variables, plus business logic delegation. Data transformations will be mostly done as part of your delegate (and especially not as listeners, as mentioned below). Separate your actual business logic from the delegates and all Camunda APIs. Avoid accessing the BPMN model and invoking Camunda APIs within your delegates.
2. Don’t use listeners or Spring beans in expressions to do data transformations via Java code.
3. Don’t rely on an ACID transaction manager spanning multiple steps or resources.
4. Don’t expose Camunda API (REST or Java) to other services or front-end applications.
5. Use primitive variable types or JSON payloads only (no XML or serialized Java objects).
6. Use simple expressions or plug-in FEEL. FEEL is the only supported expression language in Camunda 8. JSONPath is also relatively easy to translate to FEEL. Avoid using special variables in expressions, e.g. `execution` or `task`.
7. Use your own user interface or Camunda Forms; the other form mechanisms are not supported out-of-the-box in Camunda 8.
8. Avoid using any implementation classes from Camunda; generally, those with \*.impl.\* in their package name.
9. Avoid using engine plugins.

We also recommend reviewing [BPMN elements supported in Camunda 8](/docs/components/modeler/bpmn/bpmn-coverage/), though any feature gap will likely be closed soon.

[Execution Listeners](https://docs.camunda.org/manual/latest/user-guide/process-engine/delegation-code/#execution-listener) and [Task Listeners](https://docs.camunda.org/manual/latest/user-guide/process-engine/delegation-code/#task-listener) are areas in Camunda Platform 8 that are still under discussion. Currently, those use cases need to be solved slightly differently. Depending on your use case, the following Camunda Platform 8 features can be used:

- Input and output mappings using FEEL
- Tasklist API
- History API
- Exporters
- Client interceptors
- Gateway interceptors
- Job workers on user tasks

Expect to soon have a solution in Camunda Platform 8 for most of the problems that listeners solve. Still, it might be good practice to use as few listeners as possible, and especially don’t use them for data mapping as described below.

### Clean Delegates

Given Java Delegates and the workflow engine are embedded as a library, projects can do dirty hacks in their code. Casting to implementation classes? No problem. Using a ThreadLocal or trusting a specific transaction manager implementation? Yeah, possible. Calling complex Spring beans hidden behind a simple JUEL (Java Unified Expression Language) expression? Well, you guessed it — doable!

Those hacks are the real showstoppers for migration, as they simply cannot be migrated to Camunda Platform 8. In fact, [Camunda 8 increased isolation intentionally](https://blog.bernd-ruecker.com/moving-from-embedded-to-remote-workflow-engines-8472992cc371).

Concentrate on what a Java Delegate is intended to do:

1. Read variables from the process and potentially manipulate or transform that data to be used by your business logic.
2. Delegate to business logic — this is where Java Delegates got their name from. In a perfect world, you would simply issue a call to your business code in another Spring bean or remote service.
3. Transform the results of that business logic into variables you write into the process.

Here's an example of a good Java Delegate:

```java
@Component
public class CreateCustomerInCrmJavaDelegate implements JavaDelegate {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private CrmFacade crmFacade;

    public void execute(DelegateExecution execution) throws Exception {
        // Data Input Mapping
        String customerDataJson = (String) execution.getVariable("customerData");
        CustomerData customerData = objectMapper.readValue(customerDataJson, CustomerData.class);

        // Delegate to business logic
        String customerId = crmFacade.createCustomer(customerData);

        // Data Output Mapping
        execution.setVariable("customerId", customerId);
    }
}
```

Never cast to Camunda implementation classes, use any ThreadLocal object, or influence the transaction manager in any way. Java Delegates should further always be stateless and not store any data in their fields.

The resulting delegate can be easily migrated to a Camunda Platform 8 API, or simply be reused by the [adapter provided in this migration community extension](https://github.com/camunda-community-hub/camunda-7-to-8-migration/).

### No transaction managers

You should not trust ACID [transaction managers](https://blog.bernd-ruecker.com/achieving-consistency-without-transaction-managers-7cb480bd08c) to glue together the workflow engine with your business code. Instead, you need to embrace eventual consistency and make every service task its own transactional step. If you are familiar with Camunda Platform 7 lingo, this means that all BPMN elements will be `async=true`. A process solution that relies on five service tasks to be executed within one ACID transaction, probably rolling back in case of an error, will make migration challenging.

### Don’t expose Camunda API

You should apply the [information hiding principle](https://en.wikipedia.org/wiki/Information_hiding) and not expose too much of the Camunda API to other parts of your application.

In the above example, you should not hand over an execution context to your CrmFacade:

```java
// DO NOT DO THIS!
crmFacade.createCustomer(execution);
```

The same holds true when a new order is placed, and your order fulfillment process should be started. Instead of the frontend calling the Camunda API to start a process instance, you are better off providing your own endpoint to translate between the inbound REST call and Camunda, for example:

```java
@RestController
public class OrderFulfillmentRestController {

  @Autowired
  private ProcessEngine camunda;

  @RequestMapping(path = "/order", method = PUT)
  public String placeOrder(String orderPayload, HttpServletResponse response) throws Exception {
    // TODO: Somehow extract data from orderPayload
    String orderData = "todo";

    ProcessInstance pi = camunda.getRuntimeService() //
        .startProcessInstanceByKey("orderFulfillment", //
            Variables.putValue("order", orderData));

    response.setStatus(HttpServletResponse.SC_ACCEPTED);
    return "{\"status\":\"pending\"}";
  }
}
```

### Use primitive variable types or JSON

Camunda Platform 7 provides flexible ways to add data to your process. For example, you could add Java objects that would be serialized as byte code. Java byte code is brittle and also tied to the Java runtime environment.

Another possibility is transforming those objects on the fly to XML using Camunda Spin. It turned out this was black magic and led to regular problems, which is why Camunda Platform 8 does not offer this anymore. Instead, you should do any transformation within your code before talking to Camunda API. Camunda Platform 8 only takes JSON as a payload, which automatically includes primitive values.

In the above Java Delegate example, you can see that Jackson was used in the delegate for JSON to Java mapping:

```java
@Component
public class CreateCustomerInCrmJavaDelegate implements JavaDelegate {

    @Autowired
    private ObjectMapper objectMapper;

    //...

    public void execute(DelegateExecution execution) throws Exception {
        // Data Input Mapping
        String customerDataJson = (String) execution.getVariable("customerData");
        CustomerData customerData = objectMapper.readValue(customerDataJson, CustomerData.class);
        // ...
    }
}
```

This way, you have full control over what is happening, and such code is also easily migratable. The overall complexity is even lower, as Jackson is quite known to Java people — a kind of de-facto standard with a lot of best practices and recipes available.

### Simple expressions and FEEL

[Camunda 8 uses FEEL as its expression language](https://docs.camunda.io/docs/components/modeler/feel/what-is-feel/). There are big advantages to this decision. Not only are the expression languages between BPMN and DMN harmonized, but also the language is really powerful for typical expressions. One of my favorite examples is the following onboarding demo we regularly show. A decision table will hand back a list of possible risks, whereas every risk has a severity indicator (yellow, red) and a description.

![onboarding demo](https://camunda.com/wp-content/uploads/2022/05/Migrating-to-Camunda-Platform-8-image-1-1024x367.png)

The result of this decision shall be used in the process to make a routing decision:

![routing decision](https://camunda.com/wp-content/uploads/2022/05/Migrate-to-Camunda-Platform-8-25052022-image-2-1024x481.png)

To unwrap the DMN result in Camunda Platform 7, you could write some Java code and attach that to a listener when leaving the DMN task (this is already an anti-pattern for migration as you will read next). The code is not super readable:

```java
@Component
public class MapDmnResult implements ExecutionListener {

  @Override
  public void notify(DelegateExecution execution) throws Exception {
    List<String> risks = new ArrayList<String>();
    Set<String> riskLevels = new HashSet<String>();

    Object oDMNresult = execution.getVariable("riskDMNresult");
    for (Object oResult : (List<?>) oDMNresult) {
      Map<?, ?> result = (Map<?, ?>) oResult;
      risks.add(result.containsKey("risk") ? (String) result.get("risk") : "");
      if (result.get("riskLevel") != null) {
        riskLevels.add(((String) result.get("riskLevel")).toLowerCase());
      }
    }

    String accumulatedRiskLevel = "green";
    if (riskLevels.contains("rot") || riskLevels.contains("red")) {
      accumulatedRiskLevel = "red";
    } else if (riskLevels.contains("gelb") || riskLevels.contains("yellow")) {
      accumulatedRiskLevel = "yellow";
    }

    execution.setVariable("risks", Variables.objectValue(risks).serializationDataFormat(SerializationDataFormats.JSON).create());
    execution.setVariable("riskLevel", accumulatedRiskLevel);
  }
}
```

With FEEL, you can evaluate that data structure directly and have an expression on the "red" path:

```
= some risk in riskLevels satisfies risk = "red"
```

Additionally, you can even hook in FEEL as the scripting language in Camunda Platform 7 today (as explained by [Scripting with DMN inside BPMN](https://camunda.com/blog/2018/07/dmn-scripting/) or [User Task Assignment based on a DMN Decision Table](https://camunda.com/blog/2020/05/camunda-bpm-user-task-assignment-based-on-a-dmn-decision-table/)).

However, more commonly you will keep using JUEL in Camunda Platform 7. If you write simple expressions, they can be easily migrated automatically, as you can see in [the test case](https://github.com/camunda-community-hub/camunda-7-to-8-migration/blob/main/modeler-plugin-7-to-8-converter/client/JuelToFeelConverter.test.js) of the [migration community extension](https://github.com/camunda-community-hub/camunda-7-to-8-migration). You should avoid more complex expressions if possible.

Very often, a good workaround to achieve this is to adjust the output mapping of your Java Delegate to prepare data in a form that allows for easy expressions.

Avoid hooking in Java code during an expression evaluation. The above listener to process the DMN result was one example of this, but a more diabolic example could be the following expression in Camunda Platform 7:

```java
// DON'T DO THIS:
#{ dmnResultChecker.check( riskDMNresult ) }
```

Now, the dmnResultChecker is a Spring bean that can contain arbitrary Java logic, possibly even querying some remote service to query whether we currently accept yellow risks or not. Such code can not be executed within Camunda 8 FEEL expressions, and the logic needs to be moved elsewhere.

### Camunda Forms

Finally, while Camunda Platform 7 supports [different types of task forms](https://docs.camunda.org/manual/latest/user-guide/task-forms/), Camunda 8 only supports [Camunda Forms](/docs/guides/utilizing-forms/) (and will actually be extended over time). If you rely on other form types, you either need to make Camunda Forms out of them or use a bespoke tasklist where you still support those forms.

## Open issues

As described earlier in this guide, migration is an ongoing topic and this guide is far from complete. Open issues include the following:

- Describe implications on testing.
- Discuss adapters for Java or REST client.
- Discuss external task adapter for Java code and probably add it to the [Camunda Platform 7 Adapter](https://github.com/camunda-community-hub/camunda-7-to-8-migration/tree/main/camunda-7-adapter).
- Discuss more concepts around BPMN
  ** [Field injection](https://docs.camunda.org/manual/latest/user-guide/process-engine/delegation-code/#field-injection) that is using `camunda:field` available on many BPMN elements.
  ** Multiple instance markers available on most BPMN elements.
  ** `camunda:inputOutput` available on most BPMN elements.
  ** `camunda:errorEventDefinition` available on several BPMN elements.

Please [reach out to us](/contact/) to discuss your specific migration use case.

## Summary

In this guide, you hopefully gained a better understanding of what migration from Camunda Platform 7 to Camunda Platform 8 means. Specifically, this guide outlined the following:

- Differences in application architecture
- How process models and code can generally be migrated, whereas runtime and history data cannot
- How migration can be very simple for some models, but also marked limitations, where migration might get very complicated
- You need to adjust code that uses the workflow engine API
- How you might be able to reuse glue code
- Community extensions that can help with migration
- The Clean Delegate approach, which helps you write Camunda Platform 7 solutions that are easier to migrate

We are watching all customer migration projects closely and will update this guide in the future.
