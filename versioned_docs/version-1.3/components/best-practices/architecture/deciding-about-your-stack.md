---
title:  Deciding about your stack
tags:
    - Architecture
    - Stack
    - Database
    - Application Server
    - Spring Boot
    - Maven
---

If you don't have special architecture requirements, we recommend using SaaS following the proposed greenfield stack.

:::caution Camunda Cloud
This best practice targets Camunda Cloud only! If you look for Camunda Platform 7, please refer to [Deciding about your Camunda 7 stack](../deciding-about-your-stack-c7/).
:::

## The greenfield stack

We like to give one greenfield stack recommendation, which is the stack you can simply use if there is no reason against it. And while we went through long and detailed discussions to come to this recommendation, it *doesn't* mean that it is necessarily superior to alternative stacks. You can still feel confident if you go down another route (see below for alternative options). 

The stack looks pretty similar in various programming language. Please use the programnming language your team is most familiar with. If in doubt, use Java or JavaScript.

### The Java greenfield stack

![greenfield stack architecture diagram](deciding-about-your-stack-assets/greenfield-architecture.png)

Use the following stack:

1. Use [Camunda Cloud SaaS](https://accounts.cloud.camunda.io/signup) and create a cluster there

1. Build your process solution project as a [Spring Boot](https://spring.io/projects/spring-boot) application, using the [Spring Zeebe](/docs/apis-tools/community-clients/spring/).

2. Use [Maven](https://maven.apache.org/) as a build tool.

3. Use your favorite IDE, for example Visual Studio Code, IntelliJ or Eclipse.

3. Use [Open JDK 17](https://jdk.java.net/17/) as Java runtime.

4. Model the processes with the [Camunda Modeler](https://camunda.org/download/modeler/).

4. Add your process models and all Java code to the project.

To run the process application *in production*:

3. Run the process application by copying the `jar` file to the server and start it with `java -jar YourProcessApplication.jar`. This is most often done via Docker.

See our [example application](https://github.com/camunda-community-hub/camunda-cloud-examples/tree/main/twitter-review-java-springboot).


We decided on this stack for the following reasons:

- All components are open-source and easily available.
- SaaS is the easiest way to consume capabilities like a workflow engine.
- Spring Boot is currently the most adopted way of building Java applications.
- Spring Boot applications are easy to customize as well as easy to roll out into test and production environments, either on-premise or in the cloud.

You might want to follow the [get started guide for microservices orchestration](/guides/getting-started-orchestrate-microservices.md) or follow the instrucstions in [Spring Zeebe](https://github.com/camunda-community-hub/spring-zeebe) to get going


## Polyglot stacks

You can develop process solutions as decribed with Java above also in any other programming language. Simply use the [existing language clients / SDKs](/docs/apis-tools/working-with-apis-tools/) for doing this.

<!--
## The JavaScript greenfield stack

## The C# greenfield stack
-->

## Customize your stack

### Running Camunda Cloud self-managed

You can also run Camunda Cloud self-managed on your own Kubernetes cluster. Details can be found in the [docs](/docs/self-managed/about-self-managed).

While there [exists a Docker Compose configuration](/self-managed/zeebe-deployment/docker/install.md) to run Camunda Cload locally, this is not meant to be used for production, but rather to quickly startup compenents on a developer machine to be able to play around.


### Modeling for executable processes

We distinguish two different roles modeling in BPM projects:

* *Process Developers* develop an executable process implementation. Process developers implementing solutions with Camunda must use Camunda Modeler to model executable processes, edit technical attributes, and manage and version (e.g. in Git or SVN) the resulting (XML) files as part of the development project.

* *Process Analysts* capture the operational know how about a process. For this part of the work, it is possible to use a different tool than Camunda Modeler.

|  | Camunda Modeler | Third-Party Modeler (BPMN Standard Compliant) | Third-Party Modeler (Non-Compliant to Standard) |
| -- | -- | -- | -- |
| Roundtrip in between process analysts and developers possible | &#10004; | &#10004; (Carefully check level of BPMN compliance - the [Model Interchange Working Group](http://bpmn-miwg.github.io/bpmn-miwg-tools/) can serve as a first starting point |  |
| Use for Process Analysts | &#10004; | &#10004; |  |
| Use for Process Developers | &#10004; |  |  |
| Use when | You do not have a BPMN standard compliant modeling tool already rolled out. | You already rolled out a BPMN tool with a standard compliancy sufficient for roundtrip. | Try to avoid  |
| | [Download](https://camunda.org/download/modeler/) | [e.g. Cawemo](http://cawemo.com/) |  |