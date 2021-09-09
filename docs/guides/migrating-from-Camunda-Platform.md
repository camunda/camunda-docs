---
id: migrating-from-Camunda-Platform
title: Migrating from Camunda Platform
---

This guide describes how to migrate process solutions developed for Camunda Platform in order to run them on Camunda Cloud. You will learn about necessary steps, but also limitations of migration.

## Migration Overview

For migration you need to look at development artifacts (BPMN models and application code), but might also want to look at workflow engine data (runtime and history) in case you migrate an in-production process solution. 

In general, **development artifacts** can be migrated: 

* **BPMN models:** Camunda Cloud uses BPMN like Camunda Platform, which generally allows to use the same model files, but you might need to configure *different extension atrributes* (at least by using a different namespace). Furthermore, Camunda Cloud has a *different coverage* of BPMN concepts that are supported (see [Camunda Cloud BPMN coverage](https://docs.camunda.io/docs/reference/bpmn-processes/bpmn-coverage) vs [Camunda Platform BPMN coverage](https://docs.camunda.org/manual/latest/reference/bpmn20/)), which might require some model changes. Note that the coverage of Camunda Cloud will of-course increase over time.

* **DMN models:** TBD

* **CMMN models:** It is not possible to run CMMN on Zeebe, *CMMN models cannot be migrated*. You could remodel cases in BPMN according to ["Building Flexibility into BPMN Models"](https://camunda.com/best-practices/building-flexibility-into-bpmn-models/). 

* **Application code:** The application code needs to use *a different client library and different APIs*. This will lead to code changes you have to implement. 

* **Architecture:** The different architecture of the core workflow engine might require some *changes in your architecture* (e.g. if you used the embedded engine approach). Furthermore, certain concepts of Camunda Platform are no longer possible (like hooking in Java code at various places or control transactional behavior with asynchronous continuations) which might lead to *changes in your model and code*. 

In general, **data** *cannot* yet be migrated to Camunda Cloud.

* **Runtime data:** Running process instances of Camunda Platform are stored in the Camunda Platform database. *Runtime data cannot be migrated* to Camunda Cloud. A possible workaround is to create a process model on Camunda Cloud that is purely used for migration to bring process instances to their respective wait state as described in the whitepaper [How to migrate to Camunda](https://page.camunda.com/wp-how-to-migrate-to-camunda).

* **History data:** *Historic data cannot be migrated*.



### Conceptual Differences

Before diving into concrete steps how to migrate your models and code, let's foster your understanding of important conceptual differences between the products. And no worries, after this section we will really dive into a very concrete how-to.

Note that this section does not compare Camunda Platform with Camunda Cloud, but rather lists aspects that are important to know when planning your migration.


#### No Embedded Engine in Cloud

Camunda Platform allows to embed the workflow engine intself as a library into your application. This means, that both run in the same JVM, share thread pools, and even can use the same datasource and transaction manager.

The workflow engine in Camunda Cloud is always a remote ressource for your application, the embedded engine mode is not supported.

![](img/architecture-spring-boot.png)

This has two main implications:

1. **Transaction integration**: Camunda Platform can share transaction with the application, actually it can even share the same database, so transactions are even shared on the database level, allowing rollbacks according to ACID (Atomic, Consistent, Isolated, Durable) semantics. This is not possible in Camunda Cloud, as the workflow engine is always a remote resource. If you leveraged this transaction capabilities you need to analyze the effect of removing it, which can result in change effort (e.g. by [introducing compensation activities](https://blog.bernd-ruecker.com/saga-how-to-implement-complex-business-transactions-without-two-phase-commit-e00aa41a1b1b)).

2. **Invoking code**: Running in the same Java application allows to execute Java code of the application at nearly all places in the workflow engine. This is not only used for glue code or delegation code (described later in this guide), but also for [Task Listeners](x), [Execution Listeners](x), [Process Engine Plugins](x)  or even very invasive hacks around the core workflow engine. All of this is not possible in Camunda Cloud, which means you need to do things in your client code (e.g. transforming data on the fly) use normal service tasks (instead of former listeners that were hidden in the diagram). One additional workaround migh be to use [exporters](x) which are only available for self-managed Zeebe instances.



#### No Process Engine Plugins in Cloud


[Process Engine Plugins](x) are not available in Camunda Cloud, as such plugins can massively change the behavior or even harm the stabilty of the engine. 

Some use cases might be supported via [exporters](x). Note that exporters are only available for self-managed Zeebe clusters.


#### Different Data Types 

In Camunda Platform you could store different data types, including serialized Java objects. Camunda Platform only allows to store primary data types or JSON as process variables. This might require some additional data mapping in your code when you set or get process variables.

Camunda Platform further provided [Camunda Spin](https://docs.camunda.org/manual/latest/reference/spin/) to ease XML and JSON handling. This is not available with Camunda Cloud and you ideally migrate to your own data transformation logic you can fully control.

To migrate existing process solutions that heavily use Camunda Spin, you can still add the Camunda Spin library to your application and manually use its API to do the same data transformation that where done under the hood in Camunda Platform.


#### Expression Language

Camunda Platform used [JUEL (Java Unified Expression Language)](https://docs.camunda.org/manual/latest/user-guide/process-engine/expression-language/) as expression language. In the embedded engine scneario, expressions can even read into beans (Java object instances) in the application.

Camunda Cloud uses [FEEL (Friendly-Enough Expression Language](https://docs.camunda.io/docs/reference/feel/what-is-feel) and expressions can only access the process instance data and variables.

Most expressions can be simply converted (see [this community extension](x) as a good starting point), some might need to be completly rewritten or require, that you extract required logic to a former service task that make the results available as normal process variable.



#### Different Connector Infrastructure

Camunda Platform provided a handful of [connectors](x). These are not supported in Camunda Cloud, as Camunda Cloud aims to create a much more powerful connector infrastructure. 

If you need to migrate existing connectors you need to create a small bridging layer to invoke these connectors via some own [workers](x).






### Migration Tooling

Let's come back to doing a hands-on migration. There is the [Camunda Platform To Cloud Migration Tooling](https://github.com/berndruecker/camunda-platform-to-cloud-migration) available as community extension. This project contains two components:

1. [A Camunda Modeler plugin to convert BPMN models from Camunda Platform to Camunda Cloud](https://github.com/berndruecker/camunda-platform-to-cloud-migration/tree/main/camunda-modeler-plugin-platform-to-cloud-converter). This maps possible BPMN elements and technical attributes into Camunda Cloud format and gives you warnings, where this is not possible. This plugin might not fully migrate your model, but should give you a jump-start. It can be extended to add your own custom migration rules. Note that the model convertion definitely requires manual supervision.


2. [The Camunda Platform to Cloud Adapter](https://github.com/berndruecker/camunda-platform-to-cloud-migration/tree/main/camunda-platform-to-cloud-adapter) - a library that provides a worker to hook in Camunda-Platform-based glue code. For example, it can invoke existing JavaDelegate classes.

In essence, this tooling implements some details described in the next sections, and we hope you find it helful.




## Migrating Your Application

Let's explore the basic switch to Camunda Cloud by first looking at a concrete example before diving into different common architectures with Camunda Platform.

### First Example

You can find a complete Java Spring Boot example, showing the Camunda Platform process models and code alongside the Camunda Cloud process model and code in the formerly mentioned community extension: [Camunda Platform to Cloud Example](https://github.com/berndruecker/camunda-platform-to-cloud-migration/tree/main/example). 

TODO: Write Readme


### Java and Spring Boot

With Camunda Platform you can easily start the workflow engine within your Spring Boot application. While Camunda Cloud also provides Spring Boot support, it is reduced to the client to the workflow engine. Camunda Cloud does not support the embedded engine mode of Camunda Platform. This means, the broker cannot be started within the same Spring Boot application and JVM as the business application. Respectively, the configuration of the workflow engine itself is also not part of the Spring Boot application any more.

![](img/architecture-spring-boot.png)

In order to migrate an existing Spring Boot application you need to follow the following basic steps:

* Adjust Maven dependencies
  * Remove Camunda Platform Spring Boot Starter and all other Camunda dependencies
  * Add [Spring Zeebe Starter](https://github.com/zeebe-io/spring-zeebe)
* Adjust config
  * Make sure to set [Camunda Cloud credentials](https://github.com/camunda-community-hub/spring-zeebe#configuring-camunda-cloud-connection), for example in `src/main/resources/application.properties` and point it to an existing Zeebe cluster
  * Remove existing Camunda Platform setting
* Replace `@EnableProcessApplication` with `@EnableZeebeClient` in your main Spring Boot application class
* Add `@ZeebeDeployment(resources = "classpath*:**/*.bpmn")` to automatically deploy all BPMN models

Now you have adjust your source code as described below.

Implications on testing: TODO


### Container-Managed Engine (Tomcat, WildFly, Websphere & co)

Zeebe doesn't provide integration into Jakarta EE application servers like Camunda Platform did. Instead, Jakarta EE applications need to manually add the Zeebe client library. The implications are comparable to what was described for Spring Boot applications.

![](img/architecture-container-managed.png)



### CDI or OSGI

Due to limited adoption there is no support for CDI or OSGI in Camunda Cloud. A lightweight integration layer comparable to [Spring Zeebe](https://github.com/camunda-community-hub/spring-zeebe) might evolve in the feature and we are happy to support this as community extension to the Zeebe project.


### Polyglot Applications (C#, NodeJS, ...)

When you run your application in NodeJS or C# you basically exchange one remote engine (Camunda Platform) with another (camunda Cloud). As Zeebe comes with a different API, you need to adjust your source code. Also note, that Zeebe does not provide a REST API at this point in time, so you need to leverage a [client library](https://docs.camunda.io/docs/product-manuals/clients/overview).

![](img/architecture-polyglot.png)













## Adjusting Your Source Code

Camunda Cloud has a different API than Camunda Cloud, which means you have to adjust

* Usage of the Client API (e.g. to start process instances)
* Implementation of [service tasks](https://docs.camunda.org/manual/7.15/reference/bpmn20/tasks/service-task/), which in Camunda Platform can mean
  * Attached Java code that is called by the engine
  * External Tasks, where workers subscribe to the engine.

Let's explore these three cases next.



### Client API

The API to talk to the engine (e.g. to start process instances, subscribe to tasks or complete them) changed with Camunda Cloud. Some parts (like Query-capabilities or Human Task Management) moved into a different API. This means that you have to adjust all your code that uses the process engine API.

If this affects big parts of your code base, you could write a small abstraction layer implementing the Camunda Platform API delegating to Camunda Cloud, probably marking unavailable methods as deprecated. We are happy to welcome community extensions providing this.




### Service Tasks With Attached Java Coode (Java Delegates)

There are three ways to attach Java code to services tasks in the BPMN model, using different attributes in the BPMN XML:

* Specifying a class that implements a JavaDelegate or ActivityBehavior: ```camunda:class```
* Evaluating an expression that resolves to a delegation object: ```camunda:delegateExpression```
* Invoking a method or value expression: ```camunda:expression```

Camunda Cloud can not directly execute custom Java code. Instead, there must be a worker, subscribing to the service task, that can execute your existing code.

The [Camunda Platform to Cloud Adapter](https://github.com/berndruecker/camunda-platform-to-cloud-migration/tree/main/camunda-platform-to-cloud-adapter) implements a worker based on [Spring Zeebe](https://github.com/camunda-community-hub/spring-zeebe), which can either be used directly, be used as a starting point or simply serve for inspiration. It subscribes to the topic ```camunda-platform-to-cloud-migration```. [Task headers](https://docs.camunda.io/docs/reference/bpmn-processes/service-tasks/service-tasks#task-headers) are used to configure a delegation class or expression for this worker. 

The [Camunda Platform To Cloud Converter Modeler Plugin](https://github.com/berndruecker/camunda-platform-to-cloud-migration/tree/main/camunda-modeler-plugin-platform-to-cloud-converter) will adjust your service tasks automatically for this adapter.

The following attributes/elements are migrated:
* ```camunda:class```
* ```camunda:delegateExpression```
* ```camunda:expression``` and ```camunda:resultVariable```


Note that some attributes cannot be migrated:
* ```camunda:asyncBefore```: every task in Zeebe is always asyncBefore and asyncAfter
* ```camunda:asyncAfter```: every task in Zeebe is always asyncBefore and asyncAfter
* ```camunda:exclusive```: jobs are always exclusive in Zeebe
* ```camunda:jobPriority```: There is no way to priotize jobs in Zeebe (yet)
* ```camunda:failedJobRetryTimeCycle```: You cannot yet configure the retry time cycle






### Service Tasks As External Tasks

External Tasks in Camunda Platform also used a worker, like in Camunda Cloud, which means these tasks are generally easier to migrate. 

The ```external task topic``` is directly translated in a ```task type name``` in Camunda Cloud. This means, you have to migrate your existing external task worker to a Zeebe worker.

If you used [the Java client](https://github.com/camunda/camunda-bpm-platform/tree/master/clients/java) to implement your Camunda Platform worker, you can use [Camunda Platform to Cloud Adapter](https://github.com/berndruecker/camunda-platform-to-cloud-migration/tree/main/camunda-platform-to-cloud-adapter) to adapt your worker code. 


The following attributes/elements are migrated:
* ```camunda:topic``` gets ```zeebe:taskDefinition type```


The following attributes/elements cannot be migrated:
* ```camunda:taskPriority```





### Notes on Service Tasks

Service tasks using ```camunda:type``` cannot be migrated.

Service tasks using ```camunda:connector``` cannot be migrated.


#### Field Injection

```camunda:field``` (TODO)


TODO: Check https://docs.camunda.org/manual/7.15/user-guide/process-engine/delegation-code/#field-injection - especially value setting & Expression Language


#### IO
Todo / To Check:
* ```camunda:inputOutput``` (TODO)

#### ErrorEventDefinition

* ```camunda:errorEventDefinition``` (TODO)





## Adjusting Your BPMN models

Let's explore the various changes required in your BPMN models to migrate them from Camunda Platform to Camunda Cloud.

### Service Tasks

![Service Task](../reference/bpmn-processes/assets/bpmn-symbols/service-task.svg)

Migrating a service task was described in the section above.

### Send Tasks

![Send Task](../reference/bpmn-processes/assets/bpmn-symbols/send-task.svg)

In both engines, a send task has the same behavior as a service task - so please refer to the details above. A send task is migrated exactly like a service task.



### Gateways

Gateways rarely need migration, the relevant configuration is mostly in the expressions on outgoing sequence flows. 

### Expressions

Expressions need to be in [FEEL (frienfly-enough expression language)](x) instead of [JUEL (Java unified expression language)](x).

Migrating simple expressions is doable (as you can see in [these test cases](https://github.com/berndruecker/camunda-platform-to-cloud-migration/blob/main/camunda-modeler-plugin-platform-to-cloud-converter/client/JuelToFeelConverter.test.js)), but not all expressions can be automatically converted.

The following concepts are especially not possible:

* Calling out to functiol Java code using beans in expressions
* Registering custom function definitions




### Human Tasks


![Send Task](../reference/bpmn-processes/assets/bpmn-symbols/user-task.svg)

Human task management is still catching up in Camunda Cloud, so many configuration options are not yet available. Specifically, the following attributes/elements cannot be migrated:

* Task assignment (to users or groups):
  * ```camunda:humanPerformer```
  * ```camunda:potentialOwner```
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


Todo / To Check:
* ```camunda:inputOutput``` (TODO)


#### Forms

TODO: Forms?



### Business Rule Tasks

![Business Rule Task](../reference/bpmn-processes/assets/bpmn-symbols/business-rule-task.svg)

In Camunda Platform, the Camunda DMN engine is directly integrated into the platform. This is (not yet) the case for Camunda Cloud, but you can use the [https://github.com/camunda-community-hub/zeebe-dmn-worker](Zeebe DMN Worker) provided as community extension, which can process your existing DMN models.

The task definition type is set to ```DMN``` and the ```camunda:decisionRef``` is moved to task header attribute for this worker.

The following attributes are not yet supported. If you need these, you need to adjust the Zeebe DMN worker or wait for DMN to land in Camunda Cloud as first-class citizen:

* ```camunda:decisionRefBinding```, ```camunda:decisionRefVersion``` and ```camunda:decisionRefVersionTag```(always the latest version is used )
* ```camunda:mapDecisionResult``` (no mapping happens)
* ```camunda:resultVariable``` (result is always mapped to variable 'result' and can be copied or unwrapped using ioMapping).
* ```camunda:decisionRefTenantId```

Of course, you can also build your own DMN worker, probably inspired the above mentioned community extension.

Furthermore, the business rule task can also be used like a service task in Camunda Platform, basically to allow to also integrate third-party rule engines. So the following attributes can also be migrated as described with the service task migration above: ```camunda:class```, ```camunda:delegateExpression```, ```camunda:expression```, or ```camunda:topic```.

The following attributes/elements cannot be migrated:
* ```camunda:asyncBefore```, ```camunda:asyncBefore```, ```camunda:asyncAfter```, ```camunda:exclusive```, ```camunda:failedJobRetryTimeCycle``` and ```camunda:jobPriority```
* ```camunda:type``` and ```camunda:taskPriority```
* ```camunda:connector```



TODO: camunda:field, camunda:inputOutput



### Call Activities

![Send Task](../reference/bpmn-processes/assets/bpmn-symbols/call-activity.svg)

Call activities are generally supported in Zeebe. The following attributes/elements can be migrated:

* ```camunda:calledElement``` will be converted into zeebe:calledElement

The following attributes/elements cannot be migrated:
* ```camunda:calledElementBinding```: Currently Zeebe always assumes 'late' binding
* ```camunda:calledElementVersionTag```: Zeebe does not know a version tag
* ```camunda:variableMappingClass```: You cannot execute code to do variable mapping in Zeebe
* ```camunda:variableMappingDelegateExpression```: You cannot execute code to do variable mapping in Zeebe
* Data Mapping
  * ```camunda:in```: There is no way to priotize jobs in Zeebe (yet)
  * ```camunda:out```: You cannot yet configure the retry time cycle


TODO: inputOutput



### Script Task

![Script Task](../reference/bpmn-processes/assets/bpmn-symbols/script-task.svg)

Script tasks are not natively executed by the Zeebe engine. They behave like normal service tasks instead, which means you have to operate a worker that can execute scripts. One available option is the [Zeebe script worker](https://github.com/camunda-community-hub/zeebe-script-worker) as community extension. 

If you do this, the following attributes/elements are migrated:
* ```camunda:scriptFormat```
* ```camunda:script```
* ```camunda:resultVariable```

The following attributes/elements cannot be migrated:
* ```camunda:asyncBefore```: every task in Zeebe is always asyncBefore and asyncAfter
* ```camunda:asyncAfter```: every task in Zeebe is always asyncBefore and asyncAfter
* ```camunda:exclusive```: jobs are always exclusive in Zeebe
* ```camunda:jobPriority```: There is no way to priotize jobs in Zeebe (yet)
* ```camunda:failedJobRetryTimeCycle```: You cannot yet configure the retry time cycle

TODO: inputOutput






### Message Receive Events And Receive Tasks

Message correlation works slightly different in the two products:

* Camunda Platform simply waits for a message, and the code implementing that the message is received queries for the right process instance that message will be correlated to. If no process instance is ready-to-receive that message, an exception is raised.

* Camunda Cloud creates a message subscription for a waiting process instance. This subscription requires a value for a ```correlationKey``` to be generated at this moment. The code receiving an external message now correlates using that value of the ```correlationKey```.

This means, that you definitely have to look at all message receive events or receive tasks in your model to define a reasonable ```correlationKey```. You also need to adjust your code accordingly.




### Multiple Instance Markers

TODO




## Summary

In this guide you could get a better understanding of what migration from Camunda Platform to Camunda Cloud means. Specifically this guide

* explained differences in application architecture
* clarified that process models and code can generally be migrated, whereas runtime and history data cannot
* showed that migration can be very simple for some models, but also marked limitations, where migration might get very complicated
* noted that you need to adjust code that uses the workflow engine API
* explained how you might be able to re-use glue code
* introduced some community extensions that can help with migration

We are watching customer migration projects closely and will update this guide in the future.