---
id: getting-started-example
title: Getting started using the example project
sidebar_label: Get started
description: "Use an example project with Spring Boot or Node.js to interact with a local Camunda 8 installation."
keywords: [java, spring, spring camunda, getting started, user guide, tutorial]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Follow this guide to download and run an example project with a local instance of Camunda 8.

You will run Camunda 8 in a local development environment, using Camunda 8 Run, use the Camunda Modeler to deploy and start an instance of a business process, and run workers written using either the Spring (Java) SDK or the Node.js (JavaScript) SDK to service the worker tasks in the process.

## Prerequisites

<Tabs groupId="language" defaultValue="javaspring" values={
[
{ label: 'Java + Spring', value: 'javaspring', },
{ label: 'Node.js', value: 'nodejs', },
] }>
<TabItem value="javaspring">

<ul>
    <li>[OpenJDK 21-23](https://openjdk.org/install/)</li>
    <li>[Maven 3](https://maven.apache.org/index.html)</li>
    </ul>
  </TabItem>
  <TabItem value="nodejs">
<ul>
    <li>[OpenJDK 21-23](https://openjdk.org/install/)</li>
    <li>[Node.js](https://nodejs.org/en)</li>
</ul>
  </TabItem>
  </Tabs>

## Download

Download the Camunda 8 developer bundle from the following website: [jhttps://camunda.com/developers/install-camunda-8](https://camunda.com/developers/install-camunda-8).

The developer bundle includes the following components:

- [Camunda 8 Run](/self-managed/setup/deploy/local/c8run.md) - a simplified, single-application Camunda configuration in a local development environment
- [Camunda Modeler](/components/modeler/about-modeler.md) - a desktop application for modeling BPMN, DMN, and Forms
- [Getting Started project](https://github.com/camunda/camunda-8-get-started) - an example project with a simple BPMN process and workers in Java or JavaScript

Links are provided to enable you to find more information. All of these components are included in the developer bundle, and you do not need to download them separately.

## Example Project

The example project, in the `camunda-8-get-started` directory, contains a BPMN process model. This process models a simple ecommerce flow, with three service tasks.

![Example business process](./img/getting-started-guide-example-process.png)

The service tasks in the process are executed by job workers. The `java` and `nodejs` directories contain code for job workers for this process model.

## Instructions

<ol>
  <li>
    Unzip the developer bundle.
  </li>

  <li>
    Start Camunda 8 Run by changing into the directory and running the command:
    ```bash
cd c8run
./start.sh
```
  </li>

  <li>
    Open the Camunda Modeler.
  </li>

  <li>
    In the Camunda Modeler, use:
    <pre><code>File &gt; Open File...</code></pre>
    to open the file:
    <pre><code>camunda-8-get-started/bpmn/diagram_1.bpmn</code></pre>
  </li>

  <li>
    Click on the “Play” icon on the bottom toolbar of the Modeler to deploy and start an instance of the process model.

    <p>You do not need to set any variables for the process.</p>

    <p>Optionally, you can set a value for the <code>item</code> variable by pasting in:</p>
    <pre><code>{`{"item": "special widget"}`}</code></pre>

  </li>
</ol>

![Start a new process instance in Camunda Modeler](./img/get-started-example-start-process.png)

A process instance is now started in the engine.

You can view the process instance in Operate, the visual operating tool, by going to [http://localhost:8080/operate](http://localhost:8080/operate). The login details are `demo`/`demo`.

Next, start the job workers to allow them to perform the work for the service tasks. The workers are configured to connect to the locally-running engine and retrieve available work for the process instance.

<Tabs groupId="language" defaultValue="javaspring" values={
[
{ label: 'Java + Spring', value: 'javaspring', },
{ label: 'Node.js', value: 'nodejs', },
] }>
<TabItem value="javaspring">
<ol>
<li>
Change into the Spring SDK directory:

```bash
cd java
```

      </li>
      <li>
        Start the workers with the command:

```bash
mvn spring-boot:run
```

      </li>
    </ol>

  </TabItem>

  <TabItem value="nodejs">
    <ol>
      <li>
        Change into the Node.js SDK directory:
```bash
cd nodejs
```
      </li>
      <li>
        Install dependencies with the command:
```bash
npm i
```
      </li>
      <li>
        Start the workers with the command:
```bash
npm start
```
      </li>
    </ol>
  </TabItem>
   </Tabs>

The workers start, connect to the engine, and request work. You will see the workers processing the jobs for the process instance.

<Tabs groupId="language" defaultValue="javaspring" values={
[
{ label: 'Java + Spring', value: 'javaspring', },
{ label: 'Node.js', value: 'nodejs', },
] }>
<TabItem value="javaspring">

    ![Worker output](./img/get-started-example-output-java.png)

   </TabItem>
   <TabItem value="nodejs">

    ![Worker output](./img/getting-started-example-output.png)

   </TabItem>
</Tabs>

## Further steps

For instructions to create a new Spring project, refer to [this guide](/guides/getting-started-java-spring.md).
