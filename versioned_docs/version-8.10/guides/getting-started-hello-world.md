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
import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## About

In this guide, you’ll deploy and run a **Rocket Launch** BPMN process where you play mission control: you provide a `fuelLevel` variable, and the Camunda 8 engine runs the launch sequence end-to-end:

1. Start the launch sequence.
2. Run a pre-flight check.
3. Decide whether systems are **GO** or **NO-GO**.
4. If **GO**: plot the destination via a DMN decision.
5. Generate a mission report and complete the mission.
6. If **NO-GO**: cancel the mission and end the process.

After completing this guide, you will have a BPMN process running locally in Camunda 8 and understand how basic concepts, such as variables, DMN, and FEEL expressions, work together in an automated BPMN workflow.

## Step 1: Set up Camunda 8 locally

In this step, you'll set up a local Camunda 8 environment with the following components:

- [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md): A simplified, single-application Camunda configuration for a local development environment.
- [Desktop Modeler](/components/modeler/desktop-modeler/index.md): An application for modeling BPMN, DMN, and Forms.
- [Getting started project](https://github.com/camunda/camunda-8-get-started): Example projects, including the Rocket Launch process used in this guide.

<Tabs groupId="local-setup" defaultValue="cli" values={
[
{ label: 'Camunda CLI (recommended)', value: 'cli', },
{ label: 'Manual setup', value: 'manual', },
]}>

<TabItem value="cli">

1. Install the [Camunda CLI](/apis-tools/c8ctl/getting-started.md). It requires [Node.js](https://nodejs.org/en/download) 22.18 or later.

   ```bash
   npm install -g @camunda8/cli
   ```

2. Run the guided setup, and keep **Local cluster**, **Desktop Modeler**, and **Example project** selected:

   ```bash
   c8ctl setup
   ```

The setup downloads and starts Camunda 8 Run, installs Desktop Modeler, and creates the Rocket Launch project in a `rocket-launch` folder in your current directory. It then deploys the project and starts a process instance, so you can skip to [Step 3: Explore your process in Operate](#step-3-explore-your-process-in-operate).

</TabItem>

<TabItem value="manual">

1. Download Camunda 8 Run and Desktop Modeler for your operating system from [Camunda Downloads](/downloads).
2. Extract Camunda 8 Run and [start it](/self-managed/quickstart/developer-quickstart/c8run/install-start.md#install-and-start-camunda-8-run).
3. [Install Desktop Modeler](/components/modeler/desktop-modeler/install-the-modeler.md).
4. [Download the example projects](https://github.com/camunda/camunda-8-get-started/archive/refs/heads/main.zip) and extract the archive.

</TabItem>
</Tabs>

## Step 2: Deploy and run your model

If you used `c8ctl setup`, your model is already deployed and running. You can still follow these steps to start more instances from Desktop Modeler.

1. Open Desktop Modeler.
2. Click **File**, then **Open File** to open the process model `rocket-launch.bpmn`. With `c8ctl setup`, it's in the `rocket-launch` folder. With the manual setup, it's in the `1-rocket-launch` folder of the extracted example projects.
3. Deploy your model by clicking the rocket icon in the bottom toolbar. You can use the pre-configured **c8run (local)** connection and click **Deploy Camunda Project**. This automatically deploys all resources in the [project](../components/concepts/projects.md), including the DMN decision table.
4. Click the play icon in the bottom toolbar to start a new [process instance](/reference/glossary.md#process-instance).
5. Run the model instance by setting the input mission variables. For example:

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

Your process instance pauses at the **Countdown T-10** task for 10 seconds. Open the instance in Operate and watch the [token](/reference/glossary.md#token-process-instance) — the marker showing the current point of execution — move through the countdown in real time.

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

Fixed rules work when you know the decision in advance, as in this launch sequence. When a step needs judgment you can't express as a deterministic rule, you can hand that step to an [AI agent](/reference/glossary.md#ai-agent) instead. The engine runs, retries, and records the agent step in the same way as the script tasks and DMN decision in this process.

## Step 6: Clean up

Navigate back to Operate and verify that your process instances have completed successfully (or were canceled, depending on the fuel level).

You can now stop your Camunda 8 Run local environment:

<Tabs groupId="local-setup" defaultValue="cli" values={
[
{ label: 'Camunda CLI (recommended)', value: 'cli', },
{ label: 'Manual setup', value: 'manual', },
]}>
<TabItem value="cli">

```bash
c8ctl cluster stop
```

To remove everything the setup installed, run `c8ctl setup --remove`. It lists what it will remove and asks you to confirm.

</TabItem>
<TabItem value="manual">

[Shut down Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run/install-start.md#shut-down-camunda-8-run) from its directory.

</TabItem>
</Tabs>

## Next steps

Now that you've run your first BPMN process in Camunda 8, explore more of the platform:

- [Build your first AI agent](./getting-started-agentic-orchestration.md) and add AI-driven steps to your process.
- [Run your first Spring Boot or Node.js project with service workers](./getting-started-example.md).
- [Learn more about the BPMN, DMN, and FEEL elements supported in Camunda](/components/concepts/bpmn-dmn-feel.md).
