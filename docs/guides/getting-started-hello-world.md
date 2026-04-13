---
id: getting-started-hello-world
title: "Deploy and run your first BPMN process with Camunda 8"
sidebar_label: Deploy and run your first BPMN process
description: "Deploy a fully automated BPMN process using script tasks, gateways, timers, and DMN — no code required."
keywords:
  [bpmn, getting started, tutorial, dmn, feel, script task, gateway, timer]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<span class="badge badge--beginner">Beginner</span>
<span class="badge badge--short">30 minutes</span>

This guide walks you through deploying and running a fully automated BPMN process — no code, no workers, no forms. You supply variables, and the Camunda engine does all the work using script tasks, gateways, a timer, and a DMN decision table.

## What you'll build

A **Rocket Launch** process where you play mission control. You provide fuel level, and the engine handles the rest:

1. Start the launch sequence.
2. Run a pre-flight check.
3. Decide whether systems are **GO** or **NO-GO**.
4. If **GO**: wait for a countdown, plot the destination via a DMN decision, then run two tasks in parallel (burn stage 1 and run experiments).
5. Generate a mission report and complete the mission.
6. If **NO-GO**: abort the mission and end the process.

Different inputs produce different outcomes:

| `fuelLevel` | What happens                                                   |
| ----------- | -------------------------------------------------------------- |
| `>= 90`     | Launch proceeds — destination set to **Venus** (5 experiments) |
| `76 – 89`   | Launch proceeds — destination set to **Mars** (5 experiments)  |
| `75`        | Launch proceeds — destination set to **Mars** (3 experiments)  |
| `50 – 74`   | Launch proceeds — destination set to **Moon** (3 experiments)  |
| `< 50`      | **Mission aborted** — process ends on the abort path           |

## What you'll learn

| Concept                            | Where you'll see it                                                   |
| ---------------------------------- | --------------------------------------------------------------------- |
| **Script tasks with FEEL**         | Five tasks that compute values inline — no external worker needed     |
| **Business rule task + DMN**       | Destination is resolved via a decision table (`plot-destination.dmn`) |
| **Exclusive gateway (XOR)**        | Routes GO vs NO-GO based on `systemStatus`                            |
| **Timer intermediate catch event** | A 10-second countdown — watch the token wait in Operate               |
| **Parallel gateway**               | Engine and experiment tasks run simultaneously                        |
| **Default sequence flow**          | The NO-GO path fires when no condition matches                        |
| **Process variables**              | `fuelLevel`, `destination`, `missionResult`, and more                 |
| **Multiple end events**            | Success or abort — different outcomes in the same process             |

## Prerequisites

- [JDK 21-25](https://www.oracle.com/de/java/technologies/downloads/)

## Download the Camunda 8 starter package

Download the Camunda 8 starter package from the following website:
[https://developers.camunda.com/install-camunda-8/](https://developers.camunda.com/install-camunda-8/)

The starter package includes the following components:

- [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md) – A simplified, single-application Camunda configuration for a local development environment.
- [Camunda Modeler](/components/modeler/about-modeler.md) – An application for modeling BPMN, DMN, and Forms.
- [Getting started project](https://github.com/camunda/camunda-8-get-started) – Example projects including the Rocket Launch process used in this guide.

All of these components are included in the starter package. You do not need to download them separately. The links above are provided for additional information.

## Instructions

<ol>
  <li>
    Unzip the Camunda 8 starter package.
  </li>

  <li>
    Start Camunda 8 Run by changing into the directory and running the command:
    <Tabs groupId="os" defaultValue="maclinux" values={
[
{ label: 'Mac OS + Linux', value: 'maclinux', },
{ label: 'Windows', value: 'windows', },
] }>
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
  </li>

  <li>
    Open the Camunda Modeler application from the starter package.
  </li>

  <li>
    In Camunda Modeler, use:
    <pre><code>File &gt; Open File...</code></pre>
    to open the process model:
    <pre><code>camunda-8-get-started/1-rocket-launch/rocket-launch.bpmn</code></pre>
  </li>

  <li>
    Click the "Rocket" icon to connect to your Camunda 8 Run instance and deploy the model.
    Select <code>Camunda 8 Self-Managed</code> and use <code>http://localhost:8080/v2</code> as the cluster endpoint.
  </li>

  <li>
    Go back to Camunda Modeler and open the DMN decision table:
    <pre><code>camunda-8-get-started/1-rocket-launch/plot-destination.dmn</code></pre>
    Deploy this file using the same "Rocket" icon and cluster endpoint.
  </li>

  <li>
    Go back to the <code>rocket-launch.bpmn</code> tab in Modeler and click the "Play" icon on the bottom toolbar to deploy and start an instance of the process.

Set the following variables to start a mission:

```json
{ "missionName": "Odyssey", "fuelLevel": 95 }
```

  </li>
</ol>

## Watch the process in Operate

Navigate to Operate at [http://localhost:8080/operate](http://localhost:8080/operate) and log in with `demo` / `demo`.

Find the **Rocket Launch** process and click into your running instance.

:::note
Data needs to sync to Operate, so the process instance may not be visible immediately.
:::

**Things to look for:**

- **Timer waiting** — the token pauses at "Countdown T-10" for 10 seconds. You can see it live.
- **Different paths** — compare a successful vs. aborted instance.
- **DMN decision** — destination is set by `plot-destination` based on `fuelLevel`.
- **Parallel execution** — both "Burn stage 1" and "Run experiments" complete independently.
- **Variables** — click an instance and inspect `destination`, `fuelAfterBurn`, `missionResult`.

## Try different scenarios

Go back to Modeler and start additional process instances with different fuel levels to explore the various paths:

| Mission | Variables           | Expected outcome                  |
| ------- | ------------------- | --------------------------------- |
| Venus   | `{"fuelLevel": 95}` | Destination: Venus, 5 experiments |
| Mars    | `{"fuelLevel": 80}` | Destination: Mars, 5 experiments  |
| Moon    | `{"fuelLevel": 60}` | Destination: Moon, 3 experiments  |
| Abort   | `{"fuelLevel": 30}` | Mission aborted                   |

Compare the paths of successful and aborted instances in Operate.

## How it works

The process uses no external code. All logic is expressed using **FEEL expressions** in script tasks and a **DMN decision table**:

| Task             | FEEL expression                                                                                                    | Output variable  |
| ---------------- | ------------------------------------------------------------------------------------------------------------------ | ---------------- |
| Pre-flight check | `if fuelLevel >= 50 then "ALL SYSTEMS GO" else "ABORT"`                                                            | `systemStatus`   |
| Abort mission    | `"Mission " + missionName + " scrubbed — not enough fuel (" + string(fuelLevel) + "%)"`                            | `missionResult`  |
| Plot destination | DMN table: `>= 90` → Venus, `>= 75` → Mars, `>= 50` → Moon                                                         | `destination`    |
| Burn stage 1     | `fuelLevel - 25`                                                                                                   | `fuelAfterBurn`  |
| Run experiments  | `if fuelLevel > 75 then 5 else 3`                                                                                  | `experimentsRun` |
| Mission report   | `"Crew reached " + destination + "! Fuel: " + string(fuelAfterBurn) + "%. Experiments: " + string(experimentsRun)` | `missionResult`  |

## Complete!

Navigate back to Operate and verify that your process instances have completed successfully (or aborted, depending on the fuel level).

## Summary

You deployed and ran a fully automated BPMN process by:

1. Running Camunda 8 Run locally.
2. Deploying a BPMN process model and a DMN decision table.
3. Starting process instances with different variables.
4. Observing how the engine evaluated FEEL expressions, routed through gateways, waited on a timer, and executed parallel paths — all without writing any code.

## Next steps

- **Edit FEEL and DMN logic** — tune fuel thresholds in script tasks and decision table rules.
- **Change the timer** — edit `PT10S` to `PT30S` and watch the countdown in real time.
- **Add a new parallel branch** — try adding a third task inside the parallel block.
- **Add a user task** — insert a manual approval step before launch.
- **Run the order process example** — see [Run your first Spring Boot or Node.js project](getting-started-example.md) for a guide using service workers.

## Teardown

You can stop Camunda 8 Run by executing:

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
