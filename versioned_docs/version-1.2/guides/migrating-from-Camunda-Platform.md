---
id: migrating-from-Camunda-Platform
title: Migrating from Camunda Platform
description: "Migrate process solutions developed for Camunda Platform to run them on Camunda Cloud."
---
<span class="badge badge--advanced">Advanced</span>
<span class="badge badge--long">Time estimate: 1 hour</span>

This guide describes how to migrate process solutions developed for Camunda Platform to run them on Camunda Cloud. You will learn about necessary steps, and also limitations of migration.

Please note the following important considerations:

1. **Migrating from Camunda Platform to Camunda Cloud is not a paved path**. As you will read below, there are several differences between the products and not all solutions are easy to migrate. This guide describes our experiences with customer projects so far, but is not a "turn-key"-migration procedure.

2. **It is not necessarily recommended to migrate from Camunda Platform to Camunda Cloud**. Camunda Platform is a great product with existing support; there is no need to migrate existing solutions unless you have a good reason to (e.g. run it on SaaS, certain requirements on scalability or fault-tolerance, etc.) Therefore, we view migration more as an exception than a rule. Still, knowing the basic steps of migration can be helpful in building solutions with Camunda Platform, that will make migration easier in the future if necessary.

Planning to migrate your project? [Talk to us](/contact/) so we can help where needed.

## Migration overview

For migration, you need to look at development artifacts (BPMN models and application code), but might also want to look at workflow engine data (runtime and history) in case you migrate a process solution running in production.

In general, **development artifacts** *can* be migrated:

* **BPMN models:** Camunda Cloud uses BPMN like Camunda Platform does, which generally allows use of the same model files, but you might need to configure *different extension atrributes* (at least by using a different namespace). Furthermore, Camunda Cloud has a *different coverage* of BPMN concepts that are supported (see [Camunda Cloud BPMN coverage](/reference/bpmn-processes/bpmn-coverage.md) vs [Camunda Platform BPMN coverage](https://docs.camunda.org/manual/latest/reference/bpmn20/)), which might require some model changes. Note that the coverage of Camunda Cloud will increase over time.

* **DMN models:** In Camunda Platform, the Camunda DMN engine is directly integrated into the platform. This is not yet the case for Camunda Cloud, but you can use the [Zeebe DMN Worker](https://github.com/camunda-community-hub/zeebe-dmn-worker) provided as a community extension, which can process your existing DMN models.

* **CMMN models:** It is not possible to run CMMN on Zeebe, *CMMN models cannot be migrated*. You can remodel cases in BPMN according to [Building Flexibility into BPMN Models](https://camunda.com/best-practices/building-flexibility-into-bpmn-models/), keeping in mind the [Camunda Cloud BPMN coverage](/reference/bpmn-processes/bpmn-coverage.md).

* **Application code:** The application code needs to use *a different client library and different APIs*. This will lead to code changes you must implement.

* **Architecture:** The different architecture of the core workflow engine might require *changes in your architecture* (e.g. if you used the embedded engine approach). Furthermore, certain concepts of Camunda Platform are no longer possible (like hooking in Java code at various places, or control transactional behavior with asynchronous continuations) which might lead to *changes in your model and code*.

In general, **workflow engine data** *cannot* yet be migrated to Camunda Cloud.

* **Runtime data:** Running process instances of Camunda Platform are stored in the Camunda Platform database. *Runtime data cannot be migrated* to Camunda Cloud. A possible workaround is to create a process model on Camunda Cloud solely used for migration to bring process instances to their respective wait state as described in [How to migrate to Camunda](https://page.camunda.com/wp-how-to-migrate-to-camunda).

* **History data:** *Historic data cannot be migrated*.

### Conceptual differences

Before diving into concrete steps on migrating your models and code, let's cover some important conceptual differences between the products. After this section, we'll dive into a concrete how-to.

Note that this section does not compare Camunda Platform with Camunda Cloud, but rather lists differing aspects important to know when planning your migration.

#### No embedded engine in Cloud

Camunda Platform allows embedding the workflow engine as a library in your application. This means both run in the same JVM, share thread pools, and can even use the same datasource and transaction manager.

In contrast, the workflow engine in Camunda Cloud is always a remote resource for your application, while the embedded engine mode is not supported.

![Embedded engine architecture](img/architecture-spring-boot.png)

This has two main implications:

1. **Transaction integration**: Camunda Platform can share a transaction with the application, and can even share the same database. This means joined transactions on the database level are possible, allowing rollbacks according to ACID (Atomic, Consistent, Isolated, Durable) semantics. This is not possible in Camunda Cloud, as the workflow engine is always a remote resource. If you leveraged these transaction capabilities, analyze the effect of removing it, which can result in change effort (e.g. by [introducing compensation activities](https://blog.bernd-ruecker.com/saga-how-to-implement-complex-business-transactions-without-two-phase-commit-e00aa41a1b1b)).

2. **Invoking code**: Running in the same Java application allows execution of Java code of the application at nearly all places in the workflow engine. This is not only used for glue code or delegation code (described later in this guide), but also for [task listeners](https://docs.camunda.org/manual/latest/user-guide/process-engine/delegation-code/#task-listener), [execution listeners](https://docs.camunda.org/manual/latest/user-guide/process-engine/delegation-code/#execution-listener), [process engine plugins](https://docs.camunda.org/manual/latest/user-guide/process-engine/process-engine-plugins/), or even very invasive hacks around the core workflow engine. None of this is possible in Camunda Cloud, which means you must do things in your client code (e.g. transforming data on the fly) and use normal service tasks (instead of listeners hidden in the diagram).

#### No process engine plugins in Cloud

[Process engine plugins](https://docs.camunda.org/manual/latest/user-guide/process-engine/process-engine-plugins/) are not available in Camunda Cloud, and as such plugins can massively change the behavior or even harm the stabilty of the engine.

Some use cases might be implemented using [exporters](../../components/zeebe/technical-concepts/exporters). Note that exporters are only available for self-managed Zeebe clusters and not in Camunda Cloud SaaS.

#### Different data types

In Camunda Platform, you can store different data types, including serialized Java objects.

Camunda Cloud only allows storage of primary data types or JSON as process variables. This might require some additional data mapping in your code when you set or get process variables.

Camunda Platform provides [Camunda Spin](https://docs.camunda.org/manual/latest/reference/spin/) to ease XML and JSON handling. This is not available with Camunda Cloud, and ideally you migrate to an own data transformation logic you can fully control.

To migrate existing process solutions using Camunda Spin heavily, you can still add the Camunda Spin library to your application itself and use its API to do the same data transformation done under the hood in Camunda Platform in your application code.

#### Expression language

Camunda Platform uses [JUEL (Java Unified Expression Language)](https://docs.camunda.org/manual/latest/user-guide/process-engine/expression-language/) as the expression language. In the embedded engine scneario, expressions can even read into beans (Java object instances) in the application.

Camunda Cloud uses [FEEL (Friendly-Enough Expression Language](/reference/feel/what-is-feel.md) and expressions can only access the process instance data and variables.

Most expressions can be converted (see [this community extension](https://github.com/berndruecker/camunda-platform-to-cloud-migration/blob/main/camunda-modeler-plugin-platform-to-cloud-converter/client/JuelToFeelConverter.js) as a starting point,) some might need to be completly rewritten, and some might require an additional service task to prepare necessary data (which may have been calculated on the fly when using Camunda Platform).

#### Different connector infrastructure

Camunda Platform provides several [connectors](https://docs.camunda.org/manual/latest/reference/connect/). These connectors are not supported in Camunda Cloud, as Camunda Cloud aims to create a much more powerful connector infrastructure.

To migrate existing connectors, create a small bridging layer to invoke these connectors via a custom [job worker](/components/concepts/job-workers.md).

### Migration tooling

Let's come back to a hands-on migration. The [Camunda Platform to Cloud migration tooling](https://github.com/berndruecker/camunda-platform-to-cloud-migration) is available as a community extension. This project contains two components:

1. [A Camunda Modeler plugin to convert BPMN models from Camunda Platform to Camunda Cloud](https://github.com/berndruecker/camunda-platform-to-cloud-migration/tree/main/camunda-modeler-plugin-platform-to-cloud-converter). This maps possible BPMN elements and technical attributes into the Camunda Cloud format and gives you warnings where this is not possible. This plugin might not fully migrate your model, but should give you a jump-start. It can be extended to add your own custom migration rules. Note that the model conversion requires manual supervision.

2. [The Camunda Platform to Cloud Adapter](https://github.com/berndruecker/camunda-platform-to-cloud-migration/tree/main/camunda-platform-to-cloud-adapter). This is a library providing a worker to hook in Camunda Platform-based glue code. For example, it can invoke existing JavaDelegate classes.

In essence, this tooling implements details described in the next sections.

## Migrating your application

Let's explore architectural changes necessary when migrating to Camunda Cloud by first looking at a concrete example before diving into different common architectures with Camunda Platform.

### First example

You can find a complete Java Spring Boot example, showing the Camunda Platform process models and code alongside the Camunda Cloud process model and code in the [Camunda Platform to Cloud example](https://github.com/berndruecker/camunda-platform-to-cloud-migration/tree/main/example).

### Java and Spring Boot

With Camunda Platform, you can easily start the workflow engine within your Spring Boot application. While Camunda Cloud also provides Spring Boot support, it is reduced to the client to the workflow engine. Camunda Cloud does not support the embedded engine mode of Camunda Platform. This means the broker cannot be started within the same Spring Boot application and JVM as the business application. Respectively, the configuration of the workflow engine itself is also not part of the Spring Boot application anymore.

![spring boot](img/architecture-spring-boot.png)

To migrate an existing Spring Boot application, take the following steps:

1. Adjust Maven dependencies
  * Remove Camunda Platform Spring Boot Starter and all other Camunda dependencies.
  * Add [Spring Zeebe Starter](https://github.com/zeebe-io/spring-zeebe).
2. Adjust config
  * Make sure to set [Camunda Cloud credentials](https://github.com/camunda-community-hub/spring-zeebe#configuring-camunda-cloud-connection) (for example, in `src/main/resources/application.properties`) and point it to an existing Zeebe cluster.
  * Remove existing Camunda Platform settings.
3. Replace `@EnableProcessApplication` with `@EnableZeebeClient` in your main Spring Boot application class.
4. Add `@ZeebeDeployment(resources = "classpath*:**/*.bpmn")` to automatically deploy all BPMN models.

Finally, adjust your source code and process model as described in the sections below.

### Container-managed engine (Tomcat, WildFly, Websphere & co)

Zeebe doesn't provide integration into Jakarta EE application servers like Camunda Platform does. Instead, Jakarta EE applications need to manually add the Zeebe client library. The implications are comparable to what was described for Spring Boot applications.

![container-managed](img/architecture-container-managed.png)

### CDI or OSGI

Due to limited adoption, there is no support for CDI or OSGI in Camunda Cloud. A lightweight integration layer comparable to [Spring Zeebe](https://github.com/camunda-community-hub/spring-zeebe) might evolve in the feature and we are happy to support this as a community extension to the Zeebe project.

### Polyglot applications (C#, NodeJS, ...)

When you run your application in for example NodeJS or C#, you exchange one remote engine (Camunda Platform) with another (Camunda Cloud). As Zeebe comes with a different API, you need to adjust your source code. Also note that Zeebe does not currently provide a REST API, so you need to leverage a [client library](/apis-tools/overview.md).

![polygot architecture](img/architecture-polyglot.png)

## Adjusting your source code

Camunda Cloud has a different API than Camunda Platform. As a result, you have to migrate code that does the following:

* Uses the Client API (e.g. to start process instances)
* Implements [service tasks](https://docs.camunda.org/manual/7.15/reference/bpmn20/tasks/service-task/), which can be:
  * [Java code attached to a service task](https://docs.camunda.org/manual/latest/user-guide/process-engine/delegation-code/) and called by the engine directly (in-VM).
  * [External tasks](https://docs.camunda.org/manual/latest/user-guide/process-engine/external-tasks/), where workers subscribe to the engine.

We'll explore these three cases in the sections below.

### Client API

The API to talk to the engine (e.g. to start process instances, subscribe to tasks, or complete them) has changed in Camunda Cloud. Some parts (like Query-capabilities or Human Task Management) moved into a different API. This means you must *adjust all your code that uses the process engine API*.

If this affects large parts of your code base, you could write a small abstraction layer implementing the Camunda Platform API delegating to Camunda Cloud, probably marking unavailable methods as deprecated. We welcome community extensions that facilitate this.

### Service tasks with attached Java code (Java Delegates, Expressions)

In Camunda Platform there are three ways to attach Java code to service tasks in the BPMN model using different attributes in the BPMN XML:

* Specify a class that implements a JavaDelegate or ActivityBehavior: ```camunda:class```.
* Evaluate an expression that resolves to a delegation object: ```camunda:delegateExpression```.
* Invoke a method or value expression: ```camunda:expression```.

Camunda Cloud cannot directly execute custom Java code. Instead, there must be a [job worker](/components/concepts/job-workers.md) executing code.

The [Camunda Platform to Cloud Adapter](https://github.com/berndruecker/camunda-platform-to-cloud-migration/tree/main/camunda-platform-to-cloud-adapter) implements such a job worker using [Spring Zeebe](https://github.com/camunda-community-hub/spring-zeebe). It subscribes to the task type ```camunda-platform-to-cloud-migration```. [Task headers](/reference/bpmn-processes/service-tasks/service-tasks.md#task-headers) are used to configure a delegation class or expression for this worker.

You can use this worker directly, but more often it might serve as a starting point or simply be used for inspiration.

The [Camunda Platform to Cloud Converter Modeler plugin](https://github.com/berndruecker/camunda-platform-to-cloud-migration/tree/main/camunda-modeler-plugin-platform-to-cloud-converter) will adjust your service tasks automatically for this adapter.

The following attributes/elements are migrated:
* ```camunda:class``` is put into a task header.
* ```camunda:delegateExpression``` is put into a task header.
* ```camunda:expression``` and ```camunda:resultVariable``` are put into a task header.

The topic ```camunda-platform-to-cloud-migration``` is set.

The following attributes/elements cannot be migrated:
* ```camunda:asyncBefore```: Every task in Zeebe is always asyncBefore and asyncAfter.
* ```camunda:asyncAfter```: Every task in Zeebe is always asyncBefore and asyncAfter.
* ```camunda:exclusive```: Jobs are always exclusive in Zeebe.
* ```camunda:jobPriority```: There is no way to prioritize jobs in Zeebe (yet).
* ```camunda:failedJobRetryTimeCycle```: You cannot yet configure the retry time cycle.

### Service tasks as external tasks

[External task workers](https://docs.camunda.org/manual/latest/user-guide/process-engine/external-tasks/) in Camunda Platform are conceptually comparable to [job workers](/components/concepts/job-workers.md) in Camunda Cloud. This means they are generally easier to migrate.

The ```external task topic``` from Camunda Platform is directly translated in a ```task type name``` in Camunda Cloud.

Now, you must adjust your external task worker to become a job worker.

The following attributes/elements are migrated:
* ```camunda:topic``` gets ```zeebe:taskDefinition type```.

The following attributes/elements cannot be migrated:
* ```camunda:taskPriority```

### Unsupported service tasks

Service tasks using ```camunda:type``` cannot be migrated.

Service tasks using ```camunda:connector``` cannot be migrated.

## Adjusting Your BPMN models

To migrate BPMN process models from Camunda Platform to Camunda Cloud, you must adjust them:

* The namespace of extensions has changed
* Different configuration attributes are used
* Camunda Cloud has a *different coverage* of BPMN elements (see [Camunda Cloud BPMN coverage](/reference/bpmn-processes/bpmn-coverage.md) vs [Camunda Platform BPMN coverage](https://docs.camunda.org/manual/latest/reference/bpmn20/)), which might require some model changes. Note that the coverage of Camunda Cloud will increase over time.

The following sections list migration steps and unsupported attributes by BPMN symbol.

### Service tasks

![Service Task](../reference/bpmn-processes/assets/bpmn-symbols/service-task.svg)

Migrating a service task is described in the section about migrating your programming code above.

### Send tasks

![Send Task](../reference/bpmn-processes/assets/bpmn-symbols/send-task.svg)

In both engines, a send task has the same behavior as a service task. A send task is migrated exactly like a service task.

### Gateways

Gateways rarely need migration. The relevant configuration is mostly in the expressions on outgoing sequence flows.

### Expressions

Expressions need to be in [FEEL (frienfly-enough expression language)](/components/concepts/expressions.md#the-expression-language) instead of [JUEL (Java unified expression language)](https://docs.camunda.org/manual/latest/user-guide/process-engine/expression-language/).

Migrating simple expressions is doable (as you can see in [these test cases](https://github.com/berndruecker/camunda-platform-to-cloud-migration/blob/main/camunda-modeler-plugin-platform-to-cloud-converter/client/JuelToFeelConverter.test.js)), but not all expressions can be automatically converted.

The following is not possible:

* Using expressions that call out to functional Java code using beans in expressions
* Registering custom function definitions within the expression engine

### Human tasks

![User Task](../reference/bpmn-processes/assets/bpmn-symbols/user-task.svg)

Human task management is still under development in Camunda Cloud, so most configuration options are not yet available.

The following attributes/elements cannot be migrated:

* Task assignment (to users or groups):
  * ```bpmn:humanPerformer```
  * ```bpmn:potentialOwner```
  * ```camunda:assignee```
  * ```camunda:candidateUsers```
  * ```camunda:candidateGroups```
* Form handling:
  * ```camunda:formKey```
  * ```camunda:formHandlerClass```
  * ```camunda:formData```
  * ```camunda:formProperty```
* ```camunda:taskListener```
* ```camunda:dueDate```
* ```camunda:followUpDate```
* ```camunda:priority```

#### Forms

In Camunda Platform, you have [different ways to provide forms for user tasks](https://docs.camunda.org/manual/latest/user-guide/task-forms/):

* Embedded Task Forms (embedded custom HTML and JavaScript)
* Camunda Forms (simple forms defined via Camunda Modeler properties)
* External Task Forms (link to custom applications)
* [Camunda Forms](../../components/tasklist/userguide/user-interface/camunda-forms/)

Only Camunda Forms are currently supported in Camunda Cloud and can be migrated.

### Business rule tasks

![Business Rule Task](../reference/bpmn-processes/assets/bpmn-symbols/business-rule-task.svg)

In Camunda Platform, the Camunda DMN engine is directly integrated into the platform. This is not yet the case for Camunda Cloud, but you can use the [Zeebe DMN Worker](https://github.com/camunda-community-hub/zeebe-dmn-worker), provided as as a community extension, which can execute your existing DMN models. You can also build your own DMN worker, probably inspired by this community extension.

The task definition type is set to ```DMN``` and the ```camunda:decisionRef``` is moved to a task header attribute for this worker.

The following attributes/elements can be migrated:
* ```camunda:decisionRef```

The following attributes are not yet supported (in case you need these, you can adjust the Zeebe DMN worker):

* ```camunda:decisionRefBinding```, ```camunda:decisionRefVersion```, and ```camunda:decisionRefVersionTag```(always use the latest version)
* ```camunda:mapDecisionResult``` (no mapping happens)
* ```camunda:resultVariable``` (result is always mapped to variable 'result' and can be copied or unwrapped using ioMapping).
* ```camunda:decisionRefTenantId```

A business rule task can also *behave like a service task* in Camunda Platform to allow integration of third-party rule engines.

In this case, the following attributes can also be migrated as described above for the service task migration: ```camunda:class```, ```camunda:delegateExpression```, ```camunda:expression```, or ```camunda:topic```.

The following attributes/elements cannot be migrated:
* ```camunda:asyncBefore```, ```camunda:asyncBefore```, ```camunda:asyncAfter```, ```camunda:exclusive```, ```camunda:failedJobRetryTimeCycle```, and ```camunda:jobPriority```
* ```camunda:type``` and ```camunda:taskPriority```
* ```camunda:connector```

### Call activities

![Call Activity](../reference/bpmn-processes/assets/bpmn-symbols/call-activity.svg)

Call activities are generally supported in Zeebe. The following attributes/elements can be migrated:

* ```camunda:calledElement``` will be converted into ```zeebe:calledElement```

The following attributes/elements cannot be migrated:
* ```camunda:calledElementBinding```: Currently Zeebe always assumes 'late' binding.
* ```camunda:calledElementVersionTag```: Zeebe does not know a version tag.
* ```camunda:variableMappingClass```: You cannot execute code to do variable mapping in Zeebe.
* ```camunda:variableMappingDelegateExpression```: You cannot execute code to do variable mapping in Zeebe.
* Data Mapping
  * ```camunda:in```
  * ```camunda:out```


### Script task

![Script Task](../reference/bpmn-processes/assets/bpmn-symbols/script-task.svg)

Script tasks cannot natively be executed by the Zeebe engine. They behave like normal service tasks instead, which means you must run a job worker that can execute scripts. One available option is to use the [Zeebe Script Worker](https://github.com/camunda-community-hub/zeebe-script-worker), provided as a community extension.

If you do this, the following attributes/elements are migrated:
* ```camunda:scriptFormat```
* ```camunda:script```
* ```camunda:resultVariable```

The task type is set to ```script```.

The following attributes/elements cannot be migrated:
* ```camunda:asyncBefore```: Every task in Zeebe is always asyncBefore and asyncAfter.
* ```camunda:asyncAfter```: Every task in Zeebe is always asyncBefore and asyncAfter.
* ```camunda:exclusive```: Jobs are always exclusive in Zeebe.
* ```camunda:jobPriority```: There is no way to priotize jobs in Zeebe (yet).
* ```camunda:failedJobRetryTimeCycle```: You cannot yet configure the retry time cycle.

### Message receive events and receive tasks

Message correlation works slightly different between the two products:

* Camunda Platform simply waits for a message, and the code implementing that the message is received queries for a process instance the message will be correlated to. If no process instance is ready to receive that message, an exception is raised.

* Camunda Cloud creates a message subscription for every waiting process instance. This subscription requires a value for a ```correlationKey``` to be generated when entering the receive task. The code receiving the external message correlates using the value of the ```correlationKey```.

This means you must inspect and adjust all message receive events or receive tasks in your model to define a reasonable ```correlationKey```. You also must adjust your client code accordingly.

The ```bpmn message name``` is used in both products and doesn't need migration.

## Prepare for smooth migrations

Whenever you build a process solution using Camunda Platform, you can follow these recommendations to create a process solution that will be easier to migrate later on:

* Use Java, Maven, and Spring Boot.
* Separate your business logic from Camunda API.
* Use external tasks.
* Stick to basic usage of public API (no engine plugins or extensions).
* Don't expose Camunda APIs (REST or Java) to front-end applications.
* Use primitive variable types or JSON payloads only (no XML or serialized Java objects).
* Use JSONPath on JSON payloads (translates easier to FEEL).
* Stick to [BPMN elements supported in Camunda Cloud](/reference/bpmn-processes/bpmn-coverage.md).
* Use [FEEL as script language in BPMN](https://camunda.github.io/feel-scala/docs/reference/developer-guide/bootstrapping#use-as-script-engine), e.g. on Gateways.
* Use Camunda Forms.

## Open issues

As described earlier in this guide, migration is an ongoing topic and this guide is far from complete. Open issues include the following:

* Describe implications on testing.
* Discuss adapters for Java or REST client.
* Discuss external task adapter for Java code and probably add it to the [Camunda Platform to Cloud Adapter](https://github.com/berndruecker/camunda-platform-to-cloud-migration/tree/main/camunda-platform-to-cloud-adapter).
* Discuss more concepts around BPMN
** [Field injection](https://docs.camunda.org/manual/latest/user-guide/process-engine/delegation-code/#field-injection) that is using ```camunda:field``` available on many BPMN elements.
** Multiple instance markers available on most BPMN elements.
** ```camunda:inputOutput``` available on most BPMN elements.
** ```camunda:errorEventDefinition``` available on several BPMN elements.

And even more.

Please [reach out to us](/contact/) to discuss your specific migration use case.

## Summary

In this guide, you hopefully gained a better understanding of what migration from Camunda Platform to Camunda Cloud means. Specifically, this guide outlined the following:

* Differences in application architecture
* How process models and code can generally be migrated, whereas runtime and history data cannot
* How migration can be very simple for some models, but also marked limitations, where migration might get very complicated
* You need to adjust code that uses the workflow engine API
* How you might be able to reuse glue code
* Community extensions that can help with migration

We are watching all customer migration projects closely and will update this guide in the future.
