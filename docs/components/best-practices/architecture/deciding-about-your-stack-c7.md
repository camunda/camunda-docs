---
title:  Deciding About Your Camunda Platform 7 Stack
stakeholders: Architecture
tags:
    - Architecture
    - Stack
    - Database
    - Application Server
    - Spring Boot
    - Maven
weight: 60

booksection: "A. Getting Started"
bookchapter: 4
---

Camunda Platform 7 is very flexible and can be hooked into the architecture of your choice, giving you a number of important decisions to make. If you don't have special architecture requirements, we recommend to follow the proposed greenfield stack. You can also check the decision criteria presented below to make more customized choices. Choosing the stack will have big influence on your overall architecture. 

:::caution Camunda Platform 7 only
This best practice targets Camunda Platform 7.x only! The Camunda Cloud stacks differs in many ways, but also reduced the number of decisions you have to take.
:::

## The greenfield stack

The greenfield stack is currently a recommendation for Java developers. If you use different programming languages (like .NET or JavaScript), we recommend to look for Camunda Cloud, that supports polyglott environments better.

Use the following stack:

1. Leverage the [Camunda Run](https://docs.camunda.org/manual/latest/installation/camunda-bpm-run/) distribution to run Camunda Platform 7 using the [Enterprise Edition](http://camunda.com/bpm/)

1. Build your process solution project as a [Spring Boot](https://spring.io/projects/spring-boot) application, using the [Camunda External Task Client as Spring Boot starter](https://github.com/camunda/camunda-bpm-platform/tree/master/spring-boot-starter/starter-client) and [TODO Tutorial to use OpenAPI Client in Java](https://github.com/berndruecker/camunda-platform-openapi-demo)

2.  [Maven](https://maven.apache.org/).

3. Use your favorite IDE, for example [Visual Studio Code](xxx), [IntelliJ](xxx) or [Eclipse](https://eclipse.org/downloads/)

3. Use [Oracle JDK 15](https://www.oracle.com/technetwork/java/javase/downloads/index.html) as Java runtime.

4. Model the processes with the [Camunda Modeler](https://camunda.org/download/modeler/)

4. Add your process models and the java code to the project

5. Use the H2 file based java database for development. We *strongly discourage* that multiple developers share the same database during development as this can lead to a multitude of problems.

Running the process application in production:

1. Use [PostgreSQL](http://www.postgresql.org/) - or the database you already operate.

2. [Secure your installation](https://docs.camunda.org/manual/latest/user-guide/security/)

3. Run the process application by copying the jar-file to the server and start it with `java -jar YourProcessApplication.jar`. This can of course also be done via Docker.



### Understanding the stack's architecture

The basic architecture with this stack is shown in the following diagram:

<img src="deciding-about-your-stack-c7-assets/greenfield-architecture.png" />



### Understanding our motivation for the stack

While we went through long and detailed discussions in order to come to this recommendation - it *doesn't* mean that it is necessarily superior to alternative stacks. So you can still feel good if you go down another route (see below for alternative options). But for the best practices we wanted to give *exactly
one* greenfield recommendation for all our customers who have no special requirements on the stack.

We decided for this stack because:

- All components are open source and easily available
- Camunda Run is the favorite distribution, as it focuses on External Tasks, the more modern paradigm also present in Camunda Cloud
- Spring Boot is currently the most adopted way of building Java applications
- Spring Boot applications are easy to customize as well as easy to roll out into test- and production environments, either on premise or in the cloud
- PostgreSQL has a great track-record for performance


There are *advantages using the greenfield stack*:

- *Fewer Decisions:* Depending on your experience with the Java cosmos, the decisions to chose a stack might not be easy to take. So if you don't have special requirements take that burden from you and follow a well-known path.
- *Less Ramp-Up-Effort:* We provide pre-packaged distributions, examples, documentation and installation guides for the proposed stack.
- *Proven:* Many of our customers use this stack with great success.
- *More Documentation & Best Practices:* So you don't have to write your own extensive documentation - just point to the Camunda docs.
- *Easier Support:* Asking for help gets much easier as you do not have to explain your setup in detail.
- *Project Templates and Examples:* We provide project templates (as Maven Archetypes), which might directly fit for you.




### Getting Started with the Greenfield Stack

1. Check the Prerequisites:

* Install [Oracle JDK 15](https://www.oracle.com/technetwork/java/javase/downloads/index.html)
* Install [Camunda Modeler](https://camunda.org/download/modeler/).
* Install an IDE like [Eclipse](https://eclipse.org/downloads/). We recommend the latest "Eclipse IDE for Java Developers".
** Activate workspace file sync [refresh using native hooks or polling](http://stackoverflow.com/questions/4343735/avoiding-resource-is-out-of-sync-with-the-filesystem) to improve interaction of Eclipse and Camunda Modeler.
** [Add Camunda Assert to your Eclipse content assist favorites](https://github.com/camunda/camunda-bpm-assert/blob/master/docs/README.md#add-camunda-bpm-assert-to-eclipse).

* Check your network access to [Camunda Nexus](https://app.camunda.com/nexus/) for downloading Maven Artifacts.
* As an Enterprise Customer check that you have your company credentials at hand to login to get enterprise versions.

2. Create your project

TODO

* Use the XXXX 'camunda-archetype-spring-boot' to create a new project.
* Model a process with the Camunda Modeler and save it under `src/main/resources`.
* Run the project from your IDE: start `CamundaApplication` as Java Application.
* Play around with your process using the Camunda Webapp (Tasklist and Cockpit).
* Package your application with `mvn clean install`.
* Bring the jar file to your test or production server and start it there.
* You can setup or integrate it into an existing Continous Delivery Pipeline.
* Learn more about [testing process definitions](../development/testing-process-definitions) and add unit tests to your process!

Check out XXX for more details how-to get going!

## Customize your stack

### Selecting the process engine mode


|               | Camunda Run (Remote engine)       | Embedded Engine      | Container-Managed Engine            |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| | Run the engine as an isolated BPM server only communicating with it via Web Services.       | Use the process engine as a simple library right within your own application, typically started via Spring Boot.   | Run the engine as a service preconfigured in your Java EE container.    |
| Engine Bootstrap / Lifecycle Management         | Out-of-the-box        | Out-of-the-box for Spring Boot, otherwise do-it-yourself (see options below)  | Out-of-the-box             |
| Camunda Webapps work in all use-cases           | &#10004;          | See limitations below      | &#10004;            |
| Camunda REST API work in all use-cases          | &#10004;          | See options below          | &#10004;            |
| [Multiple Process Applications can share a central engine](https://docs.camunda.org/manual/latest/user-guide/process-applications/)     | &#10004;          | Doable with a shared database, but requires custom development and has limitations  | &#10004;            |
| [Multiple Engines can share resources (e.g. share the Job Executor)](https://docs.camunda.org/manual/latest/user-guide/process-engine/the-job-executor/#the-job-executor-and-multiple-process-engines) |        |       | &#10004;            |
| One application WAR/EAR can include the process engine           |        | &#10004;         |             |
| Supports untouched ("vanilla") containers            | &#10004;          | &#10004;         |             |
| Runs in every Java environment           | &#10004;          | &#10004;         | [On Supported Containers](https://docs.camunda.org/manual/latest/introduction/supported-environments/#container-application-server-for-runtime-components-excluding-camunda-cycle) |
| Responsibility for Engine Installation and Configuration         | Operations or Application Developer        | Application Developer      | Operations or Application Developer          |
| Application point of view on process engine          | Remote Server         | Library        | Library           |
| Possible communication types with services           | Remote       | Java InVM, Remote       | Java InVM, Remote          |
| Use when            | Default, if there is no reason against it. Especially if your architecture or applications are not Java based.       | You want a single deployment including the engine.    | You use a supported application server and prefer to seperate engine installation from application development       |
|               | [Learn More](https://docs.camunda.org/manual/latest/introduction/architecture/#standalone-remote-process-engine-server) | [Learn More](https://docs.camunda.org/manual/latest/introduction/architecture/#embedded-process-engine) | [Learn More](https://docs.camunda.org/manual/latest/introduction/architecture/#shared-container-managed-process-engine)      |



In essence, the general recommendation is:

* Use Camunda Run

* Do not use a container-managed engine. The container managed engine allows to separate installation and configuration of the engine from the application development. This is an advantage if you really separate these roles within your organization. However, we experienced that this causes trouble more often than it does help. Developers most often are still responsible to install the engine, but might not be able to access the application server itself. That also explains the rise of Spring Boot (often alongside with Docker) and many projects successfully moved to that approach instead. Unless you have good reasons, we would not recommend starting new projects using a container-managed engine.

* Use an embedded engine if you need to provide one combined artifact

### Understanding embedded engine specifics

#### Using Spring Boot

The Camunda Spring Boot Starter is a clean way of controlling the embedded engine easily, so you don't have to think about the specifics mentioned below in this section. This makes Spring Boot a good choice for Camunda projects.

#### Bootstrapping the engine and managing its lifecycle

When running the engine in embedded mode you have to control the *lifecycle* of the engine yourself, basically *starting up* and *shutting down* the engine - and providing access to the API whenever a client needs it. You have several options to do that.

|   | Spring Boot     | Spring Application Context     | processes.xml        | Programmatic     |
| ------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
|   | Configure, start and stop the engine via Spring Boot Starter | Configure, start and stop the engine via Spring Beans defined in your Application Context. | Configure, start and stop the engine via Camunda’s processes.xml descriptor and a ProcessApplication class. | Configure, start and stop the engine yourself programmatically by using Java code. |
| Use when   | You target Spring Boot as runtime environment.   | You already use Spring.     | You do not want to introduce a Spring dependency just for Camunda.   | You need full control over the engine or want to do advanced customizations. |
| Unlimited Configuration Options | &#10004;    | &#10004;       |       | &#10004;     |
| Development Effort  | Low    | Medium       | Low         | High       |                                                                             |


#### Providing a REST API

When running an embedded engine it might be harder to deploy the pre-built REST API.


|   | Use Spring Boot Starter for REST API     | Embed Camunda’s REST API    | Use Camunda’s Standalone Web App REST API    |
| ---------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
|   | The Spring Boot Starter allows to run the REST API as well as the Camunda web applications. | Provide Camunda’s REST API by embedding its JAX-RS code into your application. | Deploy Camunda’s "Standalone" Web Application (which runs its own engine) and use its REST API. |
| No Classloading Restrictions | &#10004;        | &#10004;       |       |
| Development Effort  | Low        | High      | Low      |                                                            |



#### Providing Camunda web applications (Tasklist, Cockpit)

When running an embedded engine you still may want to use Camunda Web Application like e.g. Tasklist and Cockpit, but have to decide how exactly to run these web applications in your environment.

|      | Use Spring Boot Starter for Camunda Web Applications        | Camunda "Standalone" Web Application                | Embedded Camunda Web Applications      |
| ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| The Spring Boot Starter allows to run the REST API as well as the Camunda web applications. | Deploy Camunda’s "Standalone" Web Application, which is a WAR running its own engine - and point it to your applications engine database. | Embed the Camunda Web Applications into your own application - which is not a particularly easy task to do.              |
| Classloading Restrictions       | None           | You can e.g. not submit a task in tasklist when a following synchronously called service uses a class contained in your own application. However, you can solve this by adding additional [safe points](https://docs.camunda.org/manual/latest/user-guide/process-engine/transactions-in-processes/). | None        |
| Development Effort     | Low         | Low                   | High (undocumented)        |
|      | [Spring Boot Starter](https://github.com/camunda/camunda-bpm-spring-boot-starter/)     | [Download Standalone Web Application](http://camunda.org/download/)               | [Implement e.g. via Maven WAR Overlays](https://maven.apache.org/plugins/maven-war-plugin/overlays.html) |



### Choosing a database

Camunda Platform 7 requires a *relational database* for persistence. Even if the persistence provider is in theory pluggable and can be exchanged by e.g. some *NoSQL* persistence this is neither recommended nor supported. Therefore, if you have use cases for this, discuss them with Camunda beforehand!

|  | PostgreSQL      | Oracle    | H2       | Other Database      |
| ------------------------------ | --------------------------------------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
|  | PostgreSQL is an open source object-relational database system. | Oracle Database is a commercial object-relational database system. | H2 is a Java SQL database with in-memory mode and a small footprint. |         |
| Best Performance Observations  | &#10004;    | &#10004;    |       |         |
| In-Memory Mode  |     |     | &#10004;      |         |
| No installation required |     |     | &#10004;      |         |
| Recommended for Production Use | &#10004;    | &#10004;    |       | &#10004; ([if supported](https://docs.camunda.org/manual/latest/introduction/supported-environments/#databases))  |
| Use when  | Use the database you already operate or are experienced with!   |
|  | [Learn More](http://www.postgresql.org/)   | [Learn More](https://www.oracle.com/database)    | [Learn More](http://www.h2database.com/)  | [Supported Databases](https://docs.camunda.org/manual/latest/introduction/supported-environments/#databases) |



### Modeling for executable processes

We distinguish two different roles modeling in BPM projects:

* *Process Developers* develop an executable process implementation. Process developers implementing solutions with Camunda must use Camunda Modeler to model executable processes, edit technical attributes and manage and version (e.g. in Git or SVN) the resulting (XML) files as part of the development project.

* *Process Analysts* capture the operational know how about a process. For this part of the work, it is possible to use a different tool than Camunda Modeler.


|      | Camunda Modeler    | Third-Party Modeler (BPMN Standard Compliant)         | Third-Party Modeler (Non-Compliant to Standard) |
| ------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| Roundtrip in between process analysts and developers possible | &#10004;       | &#10004; (Carefully check level of BPMN compliance - the [Model Interchange Working Group](http://bpmn-miwg.github.io/bpmn-miwg-tools/) can serve as a first starting point |    |
| Use for Process Analysts     | &#10004;       | &#10004;            |    |
| Use for Process Developers   | &#10004;       |             |    |
| Use when      | You do not have a BPMN standard compliant modeling tool already rolled out. | You already rolled out a BPMN tool with a standard compliancy sufficient for roundtrip.      | Try to avoid   |
|      | [Download](https://camunda.org/download/modeler/)   | [e.g. Cawemo](http://cawemo.com/)         |    |