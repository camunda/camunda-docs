---
id: getting-started-hello-world
title: "Run your first BPMN process with Camunda 8"
sidebar_label: Run your first BPMN process
description: "Run your first fully-automated BPMN process locally with Camunda 8."
keywords:
  [bpmn, getting started, tutorial, dmn, feel, script task, gateway, timer]
toc_max_heading_level: 2
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<span class="badge badge--beginner">Beginner</span>

Run your first fully-automated BPMN process locally with Camunda 8.

## About

In this guide, you’ll deploy and run a **Rocket Launch** BPMN process where you play mission control: you provide a `fuelLevel` variable, and the Camunda 8 engine runs the launch sequence end-to-end:

1. Start the launch sequence.
2. Run a pre-flight check.
3. Decide whether systems are **GO** or **NO-GO**.
4. If **GO**: plot the destination via a DMN decision.
5. Generate a mission report and complete the mission.
6. If **NO-GO**: cancel the mission and end the process.

After completing this guide, you will have a BPMN process running locally in Camunda 8 and understand how basic concepts, such as variables, DMN, and FEEL expressions, work together in an automated BPMN workflow.

## Prerequisites

- [JDK 21-25](https://www.oracle.com/de/java/technologies/downloads/): Required by Camunda 8 Run to start the engine locally.

## Step 1: Download the Camunda 8 starter package

Download the Camunda 8 starter package from the following website:
[https://developers.camunda.com/install-camunda-8/](https://developers.camunda.com/install-camunda-8/)

The starter package includes the following components:

- [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md): A simplified, single-application Camunda configuration for a local development environment.
- [Camunda Modeler](/components/modeler/about-modeler.md): An application for modeling BPMN, DMN, and Forms.
- [Getting started project](https://github.com/camunda/camunda-8-get-started): Example projects including the Rocket Launch process used in this guide.

## Step 2: Deploy and run your model

1. Unzip the Camunda 8 starter package.
2. Start Camunda 8 Run by changing to its directory and running the following command based on your OS:

<Tabs groupId="os" defaultValue="maclinux" values={
[
{ label: 'Mac OS + Linux', value: 'maclinux', },
{ label: 'Windows', value: 'windows', },
]}>

<TabItem value="maclinux">

```bash
./camunda-start.sh
```

</TabItem>

<TabItem value="windows">

```bash
.\camunda-start.bat
```

</TabItem>
</Tabs>

3. Open Camunda Modeler from the starter package.
4. Click **File**, then **Open File** to open the process model `camunda-8-get-started/1-rocket-launch/rocket-launch.bpmn`.
5. Deploy your model by clicking the rocket icon in the bottom toolbar. You can use the pre-configured **c8run (local)** connection and click **Deploy**. This automatically deploys all resources in the project, including the DMN decision table.
6. Click **Play** in the bottom toolbar to start a new process instance.
7. Run your first model instance by setting the input mission variables. For example:

```json
{ "missionName": "Odyssey", "fuelLevel": 95 }
```

## Step 3: Explore your process in Operate

1. Navigate to Operate at [http://localhost:8080/operate](http://localhost:8080/operate) and log in using the `demo` / `demo` credentials.
1. Find the **Rocket Launch** process and click your running instance.

:::note
Data needs to sync to Operate, so your process instance may not be visible immediately.
:::

### Watch the timer

Your process instance pauses at the **Countdown T-10** task for 10 seconds. Open the instance in Operate and watch the token move through the countdown in real time.

### Inspect variables

Click a completed instance in Operate and open the **Variables** panel. You can see the variables the process created, such as `destination`, `fuelAfterBurn`, and `missionResult`.

Compare the variables between a successful launch and a canceled mission to see how the process logic sets different values.

## Step 4: Try different scenarios

Start additional process instances in Modeler with different `fuelLevel` values.
Here’s what happens based on your `fuelLevel` input:

| `fuelLevel` | What happens                                                     |
| ----------- | ---------------------------------------------------------------- |
| `>= 90`     | Launch proceeds — destination set to **Venus** (5 experiments)   |
| `76 – 89`   | Launch proceeds — destination set to **Mars** (5 experiments)    |
| `75`        | Launch proceeds — destination set to **Mars** (3 experiments)    |
| `50 – 74`   | Launch proceeds — destination set to **Moon** (3 experiments)    |
| `< 50`      | **Mission canceled** — the process ends on the cancellation path |

:::tip
Go to Operate to compare how each process instance takes a different path.
:::

## Step 5: Understand how it works

The process uses no external code. All logic is expressed using [FEEL expressions](/components/modeler/feel/what-is-feel.md) in script tasks and a [DMN decision table](/components/modeler/dmn/decision-table.md).

| Task             | FEEL expression                                                                                                                        | Output variable  |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| Pre-flight check | `if fuelLevel >= 50 then "ALL SYSTEMS GO" else ...` (sets status to cancel)                                                            | `systemStatus`   |
| Cancel mission   | `"Mission " + missionName + " scrubbed — not enough fuel (" + string(fuelLevel) + "%)"`                                                | `missionResult`  |
| Plot destination | DMN table: `>= 90` → Venus, `>= 75` → Mars, `>= 50` → Moon                                                                             | `destination`    |
| Burn stage 1     | `fuelLevel - 25`                                                                                                                       | `fuelAfterBurn`  |
| Run experiments  | `if fuelLevel > 75 then 5 else 3`                                                                                                      | `experimentsRun` |
| Mission report   | `"Crew " + missionName + " reached " + destination + "! Fuel: " + string(fuelAfterBurn) + "%. Experiments: " + string(experimentsRun)` | `missionResult`  |

## Step 6: Clean up

Navigate back to Operate and verify that your process instances have completed successfully (or were canceled, depending on the fuel level).

You can now stop your Camunda 8 Run local environment by executing the following command based on your OS:

<Tabs groupId="os" defaultValue="maclinux" values={
[
{ label: 'Mac OS + Linux', value: 'maclinux', },
{ label: 'Windows', value: 'windows', },
] }>
<TabItem value="maclinux">

```bash
./camunda-stop.sh
```

</TabItem>
<TabItem value="windows">

```bash
.\camunda-stop.bat
```

</TabItem>
</Tabs>

## Next steps

Now that you've run your first BPMN process in Camunda 8, explore more of the platform:

- [Build your first AI agent](./getting-started-agentic-orchestration.md).
- [Run your first Spring Boot or Node.js project with service workers](./getting-started-example.md).
- [Learn more about the BPMN, DMN, and FEEL elements supported in Camunda](/components/concepts/bpmn-dmn-feel.md).
