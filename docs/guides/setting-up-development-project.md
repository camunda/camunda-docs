---
id: setting-up-development-project
title: Setting up your first development project
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<Tabs groupId="language" defaultValue="nodejs" values={
[
{ label: 'NodeJS', value: 'nodejs', },
{ label: 'Java', value: 'java' },
] }>

<TabItem value="nodejs">

The [Zeebe Node Client](https://github.com/creditsenseau/zeebe-client-node-js) allows you to build Node.js applications that connect to Camunda Cloud.

</TabItem>

<TabItem value="java">
</TabItem>

</Tabs>

## Prerequisites

<Tabs groupId="language" defaultValue="nodejs" values={
[
{ label: 'NodeJS', value: 'nodejs', },
{ label: 'Java', value: 'java' },
] }>

<TabItem value="nodejs">

- [Node.js](https://nodejs.org)
- [Zeebe Modeler](https://github.com/zeebe-io/zeebe-modeler/releases)

</TabItem>

<TabItem value="java">
</TabItem>
</Tabs>

## Scaffolding the project

<Tabs groupId="language" defaultValue="nodejs" values={
[
{ label: 'NodeJS', value: 'nodejs', },
{ label: 'Java', value: 'java' },
] }>

<TabItem value="nodejs">

- Install tools:

```bash
npm i -g typescript ts-node
```

- Create project:

```bash
mkdir camunda-cloud-get-started-node
cd camunda-cloud-get-started-node
npm init -y
tsc --init
```

- Edit `tsconfig.json` with the following config:

```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "noImplicitAny": false,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

- Install `zeebe-node` and `dotenv`:

```
npm i zeebe-node dotenv
```

</TabItem>

<TabItem value="java">
</TabItem>
</Tabs>

## Create Camunda Cloud cluster

<Tabs groupId="language" defaultValue="nodejs" values={
[
{ label: 'NodeJS', value: 'nodejs', },
{ label: 'Java', value: 'java' },
] }>
<TabItem value="nodejs">

</TabItem>

<TabItem value="java">
</TabItem>
</Tabs>

- Log in to [https://camunda.io](https://camunda.io).
- Create a new Zeebe Cluster.
- When the new cluster appears in the console, create a new set of client credentials.
- Copy the client Connection Info environment variables block.

## Configure connection

<Tabs groupId="language" defaultValue="nodejs" values={
[
{ label: 'NodeJS', value: 'nodejs', },
{ label: 'Java', value: 'java' },
] }>

<TabItem value="nodejs">

- Create a file `.env` in the root of the project
- Paste the client connection environment variable block
- Delete the `export` from in front of each line in the file

You will end up something that looks like this:

```bash
ZEEBE_ADDRESS='231bb36a-1588-4f1e-b4f6-e09944d7efd7.zeebe.camunda.io:443'
ZEEBE_CLIENT_ID='Ny-WTmQniq4XluEG0_L9KAl-G8~i_dH1'
ZEEBE_CLIENT_SECRET='9QZWpArT_2C1jU7Kru3Kll~7Hev9jyMsuo5tCk2ko0ZpzNRDb7nbiVqmcUBL'
ZEEBE_AUTHORIZATION_SERVER_URL='https://login.cloud.camunda.io/oauth/token'
```

- Save the file.

</TabItem>

<TabItem value="java">
</TabItem>
</Tabs>

## Test Connection with Camunda Cloud

<Tabs groupId="language" defaultValue="nodejs" values={
[
{ label: 'NodeJS', value: 'nodejs', },
{ label: 'Java', value: 'java' },
] }>

<TabItem value="nodejs">

We will connect to the Zeebe cluster in Camunda Cloud, and request its topology.

- In the `src` folder, create a file called `app.ts`.
- Edit the file, and put in the following code:

```typescript
import { ZBClient } from "zeebe-node";
require("dotenv").config();

async function main() {
  const zbc = new ZBClient();
  const res = await zbc.topology();
  console.log(res);
}

main();
```

- Run the program with the command: `ts-node src/app.ts`

You will see output like this:

```json
03:19:46.658 | zeebe |  INFO: Authenticating client with Camunda Cloud...
03:19:49.998 | zeebe |  INFO: Established encrypted connection to Camunda Cloud.
{
  brokers: [
    {
      partitions: [Array],
      nodeId: 0,
      host: 'zeebe-0.zeebe-broker-service.231bb36a-1588-4f1e-b4f6-e09944d7efd7-zeebe.svc.cluster.local',
      port: 26501
    }
  ],
  clusterSize: 1,
  partitionsCount: 1,
  replicationFactor: 1
}
```

</TabItem>
<TabItem value="java">
</TabItem>
</Tabs>

## Create a BPMN model

<Tabs groupId="language" defaultValue="nodejs" values={
[
{ label: 'NodeJS', value: 'nodejs', },
{ label: 'Java', value: 'java' },
] }>

<TabItem value="nodejs">

</TabItem>
<TabItem value="java">
</TabItem>
</Tabs>

- Download and install the [Zeebe Modeler](https://github.com/zeebe-io/zeebe-modeler/releases).
- Open Zeebe Modeler and create a new BPMN Diagram.
- Create a new BPMN diagram.
- Add a StartEvent, an EndEvent, and a Task.
- Click on the Task, click on the little spanner/wrench icon, and select "Service Task".
- Set the _Name_ of the Service Task to `Get Time`, and the _Type_ to `get-time`.

It should look like this:

![](./img/gettingstarted_first-model.png)

- Click on the blank canvas of the diagram, and set the _Id_ to `test-process`, and the _Name_ to "Test Process".

<Tabs groupId="language" defaultValue="nodejs" values={
[
{ label: 'NodeJS', value: 'nodejs', },
{ label: 'Java', value: 'java' },
] }>

<TabItem value="nodejs">

- Save the diagram to `bpmn/test-process.bpmn` in your project.

</TabItem>
<TabItem value="java">
</TabItem>
</Tabs>

## Deploy the BPMN model to Camunda Cloud

<Tabs groupId="language" defaultValue="nodejs" values={
[
{ label: 'NodeJS', value: 'nodejs', },
{ label: 'Java', value: 'java' },
] }>

<TabItem value="nodejs">

- Edit the `src/app.ts` file, to be this:

```typescript
import { ZBClient } from "zeebe-node";
import * as path from "path";
require("dotenv").config();

async function main() {
  const zbc = new ZBClient();
  const filename = path.join(__dirname, "..", "bpmn", "test-process");
  const res = await zbc.deployProcess(filename);
  console.log(res);
}

main();
```

- Run the program with the command: `ts-node src/app.ts`

You will see output similar to this:

```json
01:37:30.710 | zeebe |  INFO: Authenticating client with Camunda Cloud...
01:37:36.466 | zeebe |  INFO: Established encrypted connection to Camunda Cloud.
{
  processes: [
    {
      bpmnProcessId: 'test-process',
      version: 1,
      processKey: '2251799813687791',
      resourceName: 'test-process.bpmn'
    }
  ],
  key: '2251799813688440'
}
```

The process is now deployed to the cluster.

</TabItem>
<TabItem value="java">
</TabItem>
</Tabs>

## Start a Process Instance

<Tabs groupId="language" defaultValue="nodejs" values={
[
{ label: 'NodeJS', value: 'nodejs', },
{ label: 'Java', value: 'java' },
] }>

<TabItem value="nodejs">

- Edit the `src/app.ts` file, and make it look like this:

```typescript
import { ZBClient } from "zeebe-node";
import * as path from "path";
require("dotenv").config();

async function main() {
  const zbc = new ZBClient();
  const file = path.join(__dirname, "..", "bpmn", "test-process.bpmn");
  await zbc.deployProcess(file);
  const res = await zbc.createProcessInstance("test-process", {});
  console.log(res);
}

main();
```

- Run the program with the command: `ts-node src/app.ts`

You will see output similar to:

```json
02:00:20.689 | zeebe |  INFO: Authenticating client with Camunda Cloud...
02:00:23.769 | zeebe |  INFO: Established encrypted connection to Camunda Cloud.
{
  processKey: '2251799813687791',
  bpmnProcessId: 'test-process',
  version: 1,
  processInstanceKey: '2251799813688442'
}
```

A process instance has been started. Let's view it in Operate.

</TabItem>
<TabItem value="java">
</TabItem>
</Tabs>

## View a Process Instance in Operate

<Tabs groupId="language" defaultValue="nodejs" values={
[
{ label: 'NodeJS', value: 'nodejs', },
{ label: 'Java', value: 'java' },
] }>

<TabItem value="nodejs">

</TabItem>
<TabItem value="java">
</TabItem>
</Tabs>

- Go to your cluster in the [Camunda Cloud Console](https://camunda.io).
- In the cluster detail view, click on "_View Process Instances in Camunda Operate_".
- In the "_Instances by Process_" column, click on "_Test Process - 1 Instance in 1 Version_".
- Click the Instance Id to open the instance.
- You will see the token is stopped at the "_Get Time_" task.

Let's create a task worker to serve the job represented by this task.

## Create a Job Worker

<Tabs groupId="language" defaultValue="nodejs" values={
[
{ label: 'NodeJS', value: 'nodejs', },
{ label: 'Java', value: 'java' },
] }>

<TabItem value="nodejs">

We will create a worker program that logs out the job metadata, and completes the job with success.

- Create a new file `src/worker.ts`.
- Edit the file to look like this:

```typescript
import { ZBClient } from "zeebe-node";
require("dotenv").config();

const zbc = new ZBClient();
const worker = zbc.createWorker("get-time", (job, complete) => {
  console.log(job);
  complete.success();
});
```

- Run the worker program with the command: `ts-node src/worker.ts`.

You will see output similar to:

```json
{
  "key": "2251799813688447",
  "type": "get-time",
  "processInstanceKey": "2251799813688442",
  "bpmnProcessId": "test-process",
  "processDefinitionVersion": 1,
  "processKey": "2251799813687791",
  "elementId": "Activity_18gdgop",
  "elementInstanceKey": "2251799813688446",
  "customHeaders": {},
  "worker": "get-time",
  "retries": 3,
  "deadline": "1592750237366",
  "variables": {}
}
```

- Go back to Operate. You will see that the process instance is gone.
- Click on "Running Instances".
- In the filter on the left, select "_Finished Instances_".

You will see the completed process instance.

</TabItem>
<TabItem value="java">
</TabItem>
</Tabs>

## Create and Await the Outcome of a Process Instance

<Tabs groupId="language" defaultValue="nodejs" values={
[
{ label: 'NodeJS', value: 'nodejs', },
{ label: 'Java', value: 'java' },
] }>

<TabItem value="nodejs">

We will now create the process instance, and get the final outcome in the calling code.

- Keep the worker program running in one terminal.
- Edit the `src/app.ts` file, and make it look like this:

```typescript
import { ZBClient } from "zeebe-node";
import * as path from "path";
require("dotenv").config();

async function main() {
  const zbc = new ZBClient();
  const file = path.join(__dirname, "..", "bpmn", "test-process.bpmn");
  await zbc.deployProcess(file);
  const res = await zbc.createProcessInstanceWithResult("test-process", {});
  console.log(res);
}

main();
```

- Run the program with the command: `ts-node src/app.ts`.

You will see your worker log out the job as it serves it, and your program will produce output similar to the following:

```json
{
  "processKey": "2251799813688541",
  "bpmnProcessId": "test-process",
  "version": 1,
  "processInstanceKey": "2251799813688543",
  "variables": {}
}
```

</TabItem>
<TabItem value="java">
</TabItem>
</Tabs>

## Call a REST Service from the Worker

<Tabs groupId="language" defaultValue="nodejs" values={
[
{ label: 'NodeJS', value: 'nodejs', },
{ label: 'Java', value: 'java' },
] }>

<TabItem value="nodejs">

- Stop the worker program.
- Install the `got` package to your project:

```bash
npm i got
```

- Edit the file `src/worker.ts`, and make it look like this:

```typescript
import { ZBClient } from "zeebe-node";
import got from "got";
require("dotenv").config();

const zbc = new ZBClient();

const url = "https://json-api.joshwulf.com/time";

const worker = zbc.createWorker("get-time", async (job, complete) => {
  const time = await got(url).json();
  console.log(time);
  complete.success({ time });
});
```

- Run the worker program with the command: `ts-node src/worker.ts`
- In another terminal, run the program with the command: `ts-node src/app.ts`

You will see output similar to the following:

```json
{
  "processKey": "2251799813688541",
  "bpmnProcessId": "test-process",
  "version": 1,
  "processInstanceKey": "2251799813688598",
  "variables": {
    "time": {
      "time": "Sun, 21 Jun 2020 15:08:22 GMT",
      "hour": 15,
      "minute": 8,
      "second": 22,
      "day": 0,
      "month": 5,
      "year": 2020
    }
  }
}
```

</TabItem>
<TabItem value="java">
</TabItem>
</Tabs>

## Make a Decision

<Tabs groupId="language" defaultValue="nodejs" values={
[
{ label: 'NodeJS', value: 'nodejs', },
{ label: 'Java', value: 'java' },
] }>

<TabItem value="nodejs">

</TabItem>
<TabItem value="java">
</TabItem>
</Tabs>

We will edit the model to add a Conditional Gateway.

- Open the BPMN model file `bpmn/test-process.bpmn` in the Zeebe Modeler.
- Drop a Gateway between the Service Task and the End event.
- Add two Service Tasks after the Gateway.
- In one, set the _Name_ to `Before noon` and the _Type_ to `make-greeting`.
- Switch to the _Headers_ tab on that Task, and create a new Key `greeting` with the Value `Good morning`.
- In the second, set the _Name_ to `After noon` and the _Type_ to `make-greeting`.
- Switch to the _Headers_ tab on that Task, and create a new Key `greeting` with the Value `Good afternoon`.
- Click on the arrow connecting the Gateway to the _Before noon_ task.
- Under _Details_ enter the following in _Condition expression_:

```
=time.hour >=0 and time.hour <=11
```

- Click on the arrow connecting the Gateway to the _After noon_ task.
- Click the spanner/wrench icon and select "Default Flow".
- Connect both Service Tasks to the End Event.

It should look like this:

![](./img/gettingstarted_second-model.png)

## Create a Worker that acts based on Custom Headers

<Tabs groupId="language" defaultValue="nodejs" values={
[
{ label: 'NodeJS', value: 'nodejs', },
{ label: 'Java', value: 'java' },
] }>

<TabItem value="nodejs">

We will create a second worker that takes the custom header and applies it to the variables in the process.

- Stop the worker running.
- Edit the file `src/worker.ts`, and make it look like this:

```typescript
import { ZBClient } from "zeebe-node";
import got from "got";
require("dotenv").config();

const zbc = new ZBClient();

const url = "https://json-api.joshwulf.com/time";

const worker = zbc.createWorker("get-time", async (job, complete) => {
  const time = await got(url).json();
  console.log(time);
  complete.success({ time });
});

const greetingWorker = zbc.createWorker("make-greeting", (job, complete) => {
  const { name } = job.variables;
  const { greeting } = job.customHeaders;
  complete.success({
    say: `${greeting} ${name}`,
  });
});
```

- Edit the file `src/app.ts`, and make it look like this:

```typescript
import { ZBClient } from "zeebe-node";
import * as path from "path";
require("dotenv").config();

async function main() {
  const zbc = new ZBClient();
  const file = path.join(__dirname, "..", "bpmn", "test-process.bpmn");
  await zbc.deployProcess(file);
  const res = await zbc.createProcessInstanceWithResult("test-process", {
    name: "Josh Wulf",
  });
  console.log("Process Instance (Complete)", res.variables.say);
}

main();
```

- Start the workers with the command: `ts-node src/worker.ts`
- Start the app with the command: `ts-node src/app.ts`

You will see output similar to the following:

```
06:17:42.273 | zeebe |  INFO: Authenticating client with Camunda Cloud...
06:17:45.039 | zeebe |  INFO: Established encrypted connection to Camunda Cloud.
Process Instance (Complete) Good Afternoon Josh Wulf
```

</TabItem>
<TabItem value="java">
</TabItem>
</Tabs>

## Profit!

Congratulations. You've completed the Getting Started Guide for Camunda Cloud.
