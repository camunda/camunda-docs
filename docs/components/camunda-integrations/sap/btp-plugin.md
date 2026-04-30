---
id: btp-plugin
title: SAP BTP plugin
description: "Learn about the Camunda SAP Business Technology Platform (BTP) plugin, an artifact run on BTP."
---

The [Camunda SAP Business Technology Platform (BTP) plugin](/reference/glossary.md#btp) is an artifact run on BTP. It consists of a [UI5 app](https://ui5.sap.com/), a [CAP service layer and backend](https://cap.cloud.sap/) (using PostgreSQL), and an [approuter](https://www.npmjs.com/package/@sap/approuter) for traffic dispatching.

The BTP plugin connects to Camunda 8 SaaS to provide:

- A generic Fiori app for starting BPMN processes and displaying [Camunda Forms](/components/modeler/forms/camunda-forms-reference.md) in the Fiori design language.
- A generic endpoint to start BPMN processes with.

## Prerequisites

- **Camunda API Client**: [Create an API client](/components/console/manage-clusters/manage-api-clients.md) for your Camunda SaaS cluster with the full scope: `Zeebe,Tasklist,Operate,Optimize,Secrets`
- Locally, for configuring via `csap` only (see below): [Node.js >= 20 LTS](https://nodejs.org/en/about/previous-releases)
- **On SAP BTP**:
  - [Cloud Foundry CLI](https://github.com/cloudfoundry/cli) with the [multiapps plugin](https://github.com/cloudfoundry/multiapps-cli-plugin) installed on the machine executing the deployment.
  - SAP BTP subaccount with a [Cloud Foundry environment](https://discovery-center.cloud.sap/serviceCatalog/cloud-foundry-runtime?region=all) enabled and a [created space](https://help.sap.com/docs/btp/sap-business-technology-platform/create-spaces).
  - A minimum of [4 GB storage quota and 4 GB runtime memory](https://help.sap.com/docs/btp/sap-business-technology-platform/managing-space-quota-plans).
- **[Entitlements](https://help.sap.com/docs/btp/sap-business-technology-platform/managing-entitlements-and-quotas-using-cockpit)** for:
  - BTP PostgreSQL, hyperscaler option. Ensure the [available BTP PostgreSQL, hyperscaler option, and configuration options](https://help.sap.com/docs/postgresql-on-sap-btp/postgresql-on-sap-btp-hyperscaler-option/parameters) match your sizing plan. For example, for multi-region databases or high availability, the BTP plugin defaults to a minimum, only specifying PostgreSQL version 16 (see `/core/pg-options.json`) and a single database instance, with no high availability.
  - [Destination Service](https://discovery-center.cloud.sap/serviceCatalog/destination?service_plan=lite&region=all&commercialModel=btpea), `lite` plan
  - [Connectivity Service](https://discovery-center.cloud.sap/serviceCatalog/connectivity-service?region=all), `lite` plan
  - [Authorization and Trust Management Service](https://discovery-center.cloud.sap/serviceCatalog/authorization-and-trust-management-service?region=all), `application` plan

## Features

- Model user tasks in your BPMN process—they will be automatically detected and rendered by the BTP plugin at runtime.
- Design your form in the Form Builder as part of the BPMN process. When you model a user task and link it to the form, the BTP plugin will automatically detect and render the task and its associated form at runtime.

![Camunda Forms in Fiori](./img/forms-fiori.png)

- Equip the last user task with a custom header `final-user-task` and the value:

  - `success` to display the last user task on the "happy path".
  - `fail` to use that user task to communicate a failed process to the user.

  ![screenshot of header variable in Modeler](./img/sap-btp-plugin-final-user-task-header.png)

- Auto-start a process via URL parameter using `run=<processID>`. <br/>For example, `https://<btp plugin url>/index.html?channelId=<id>&run=application-process`.

- For debugging purposes, add `debug=true` as the URL parameter. <br/>For example, `https://<btp plugin url>/index.html?channelId=<id>&run=application-process&debug=true`.

- `/inbound` endpoint for starting a BPMN process in Camunda

## Camunda Forms in SAP Fiori

Layout: Only a single-row layout is supported:<br/>
![image-20250219112232376](./img/froms-no-columns.png)<br/>

:::note

Custom properties are not supported:

![image-20250219112156011](./img/forms-no-custom-properties.png)

:::

### Supported Form Features and Properties

|                  | Camunda Forms Feature / Property | Supported in Camunda BTP Plugin? | Comments                                                                                                                                                                                                                  |
| ---------------- | -------------------------------- | :------------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Input**        |                                  |                                  |                                                                                                                                                                                                                           |
|                  | Text field                       |        :white_check_mark:        |                                                                                                                                                                                                                           |
|                  | Text area                        |        :white_check_mark:        |                                                                                                                                                                                                                           |
|                  | Number                           |        :white_check_mark:        |                                                                                                                                                                                                                           |
|                  | Date time                        |        :white_check_mark:        | Only UTC values will be stored<br />- Date format `yyyy-MM-dd`, for example `2025-02-29"12`<br />- Hours format will be stored as the string `10:12:34 pm`<br />- 24 hours format will be stored as the string `22:12:34` |
|                  | Expression                       |               :x:                |                                                                                                                                                                                                                           |
|                  | Filepicker                       |               :x:                |                                                                                                                                                                                                                           |
| **Selection**    |                                  |                                  |                                                                                                                                                                                                                           |
|                  | Checkbox                         |        :white_check_mark:        |                                                                                                                                                                                                                           |
|                  | Checkbox group                   |               :x:                |                                                                                                                                                                                                                           |
|                  | Radio group                      |        :white_check_mark:        | Only `static` options source is supported.                                                                                                                                                                                |
|                  | Select                           |        :white_check_mark:        | Only `static` options source is supported.                                                                                                                                                                                |
|                  | Tag list                         |               :x:                |                                                                                                                                                                                                                           |
| **Presentation** |                                  |                                  |                                                                                                                                                                                                                           |
|                  | Text view                        |        :white_check_mark:        |                                                                                                                                                                                                                           |
|                  | Image view                       |        :white_check_mark:        |                                                                                                                                                                                                                           |
|                  | Table                            |               :x:                |                                                                                                                                                                                                                           |
|                  | HTML view                        |        :white_check_mark:        |                                                                                                                                                                                                                           |
|                  | Document preview                 |               :x:                |                                                                                                                                                                                                                           |
|                  | Spacer                           |               :x:                |                                                                                                                                                                                                                           |
|                  | Separator                        |               :x:                |                                                                                                                                                                                                                           |
| **Containers**   |                                  |                                  |                                                                                                                                                                                                                           |
|                  | Group                            |               :x:                |                                                                                                                                                                                                                           |
|                  | Dynamic list                     |               :x:                |                                                                                                                                                                                                                           |
|                  | iframe                           |               :x:                |                                                                                                                                                                                                                           |
| **Action**       |                                  |                                  |                                                                                                                                                                                                                           |
|                  | Button                           |               :x:                |                                                                                                                                                                                                                           |

## Configuration and deployment

Use [`csap`](./csap-cli.md) for setting up the BTP plugin, as a manual configuration is cumbersome and error-prone.

Within Camunda, no setup/config work is necessary to use the BTP plugin.

### Configuring the BTP plugin using `csap`

Either walk yourself through the prompts or provide all information to the CLI:

- `csap setup` will guide you interactively.

- Assuming your [Camunda cluster's API credentials](/components/console/manage-clusters/manage-api-clients.md#create-a-client) are sourced in your shell environment, this will do the configuration for you:

```shell
csap setup --for btp-plugin \
	--camunda 8.7 \
	--deployment SaaS \
	--btpRoute camunda-btp-plugin.cfapps.eu10-004.hana.ondemand.com
```

The host name provided as `btpRoute` will be the URL to the BTP plugin's app; following the example above: `https://camunda-btp-plugin.cfapps.eu10-004.hana.ondemand.com`.

### Deploying to BTP

1. Log into the desired SAP BTP subaccount via the [Cloud Foundry `cli`](https://github.com/cloudfoundry/cli) (cf-cli):

```shell
$> cf login
API endpoint: https://api.cf. ...
...
```

2. `cd` to the folder `csap` logs after a successful build, for example, `/tmp/camunda/8.6/sap-btp-plugin`
3. Issue `cf deploy mta_archives/*.mtar`
   - Add the `-f` switch to force an update, for example, by deploying the same version again (`cf deploy mta_archives/*.mtar -f`).
   - Consider adding `--delete-services` to recreate eventually failed service creation of previous deployment. For example, `cf deploy mta_archives/*.mtar -f --delete-services`.

For advanced deployment configuration, consider working with your SAP practice, starting from the created `mta.yaml` deployment descriptor (in the `$TMP` folder as output by `csap`).

## Working with the BTP plugin

The BTP plugin provides a guided, one-user multi-page flow where a single user progresses through a sequence of steps to complete a task or workflow. It renders subsets of Camunda Forms, with each page representing a distinct part of the process.

After deployment, the BTP plugin is available at the `btpRoute` provided: `https://<btpRoute>`. If called manually (for example, in the browser) it will redirect automatically to `/app/index.html?channelId=<unique id>` . The `<unique id>` or "channel ID" links the output device to the BTP plugin, representing a dedicated "output channel".

### Starting a BPMN process in the browser

Start any Camunda BPMN process manually via the menu bar.

![BTP Plugin UI to start process](./img/sap-btp-plugin-start-process.png)

In the popup, enter the ID of the BPMN to run.

![start process in Fiori app](./img/sap-btp-plugin-process-id.png)

Alternatively, the process can be auto-started by directly calling the URL:

`https://<btp plugin url>/index.html?channelId=<random id>&run=fiori-bupa-search`

### Starting a BPMN process via API

Make a `POST` http call to `https://<btpRoute>/backend/inbound` with this defined payload:

```json
{
  "bpmnProcessId": "processId", # ex above: fiori-bupa-search
  "user": "beck@renegade.org", # unique id of the user
  "wait": false, # or true to wait for the BPMN run to finish and get the result back
    "variables": { # optional
    "some_key": "some_value",
    "some_other_key": 10
  }
}
```

## Process design in Camunda

When modeling a process for the BTP plugin, choose one of the following variants.

### Variant 1: Camunda User Task (recommended)

:::note
User task listeners are available from **Camunda 8.8** onwards. They were briefly included in 8.7.0-alpha2 but were not available in the 8.7.0 GA release. Use Camunda 8.8 or higher for this variant.
:::

Model the user interaction steps as Camunda User Tasks and link each task to a Camunda Form. The BTP plugin detects these tasks and renders them in the Fiori UI.

In Camunda Modeler, configure every form step in the process as a separate Camunda User Task. This ensures the BTP plugin can recognize the task as a user interaction step and render the linked form in the Fiori UI.

For each form step:

1. Create a user task for the step.
2. Set **Implementation type** to `Camunda user task`.
3. Link the task to the corresponding Camunda Form.
4. Add a task listener with:
   - **Event type**: `Creating`
   - **Listener type**: `sap-tl-creating`

Use this configuration for every user task the BTP plugin should display. If you model a form step without the `Camunda user task` implementation type, or if the `sap-tl-creating` listener is missing, the BTP plugin can't prepare and manage the task as expected.

The `Creating` task listener is triggered when the user task is created. With the `sap-tl-creating` listener type, the BTP plugin can initialize the task so the corresponding form step is available in the guided Fiori flow.

![Task listener configuration for sap-tl-creating](./img/task-listener-sap-tl-creating.png)

If your process contains multiple form steps, repeat the same setup for each task. This keeps the process model explicit and allows the BTP plugin to render each step in sequence.

### Variant 2: Job worker (deprecated)

:::note

This setup is deprecated and kept for backward compatibility only. Use the Camunda User Task variant for new processes.

:::

Model the process to be advanced by a job worker that polls for work and drives the flow. This means the BTP plugin is not responsible for task progression in the process model.

In Camunda Modeler, configure each form step as a job worker task.

For each form step:

1. Create the task for the step.
2. Set **Implementation type** to `Job worker`.
3. Configure the form in one of the following ways:
   - Use **Form type** `Camunda Form (linked)` and provide the form ID.
   - Use **Form type** `Camunda Form (embedded)` and paste the form JSON directly into the task configuration.

To end the form flow, add a final Camunda User Task that represents the outcome of the flow.

For the final task:

1. Create a Camunda User Task.
2. Set **Implementation type** to `Camunda user task`.
3. Add a header with the key `final-user-task`.
4. Set the header value to `success` for the successful end of the form flow, or to `fail` for the failed end of the form flow.

This final task marks the end of the form flow for the BTP plugin and determines whether the flow completed successfully or failed.

#### Completing the form flow

Each form flow in your process must end with a completion task. This task signals to the BTP plugin that the form sequence is finished, and the process should proceed to the next phase.

Create a Camunda User Task for the completion step and configure it as follows:

1. Create a user task to represent the completion step.
2. Set **Implementation type** to `Camunda user task`.
3. Add a task listener with:
   - **Event type**: `Creating`
   - **Listener type**: `sap-tl-completing-success`

The `sap-tl-completing-success` listener tells the BTP plugin that the form flow has completed successfully and allows the process to move forward.

If your process distinguishes between successful and failed form flows, you can optionally add another completion task with the listener type `sap-tl-completing-fail`. This task represents a failure scenario where the user did not complete the form flow successfully. Configure this task identically, but use `sap-tl-completing-fail` as the **Listener type**. Make sure to design and link an appropriate Camunda Form to this task as well, so the BTP plugin can display a meaningful message or summary to the user when the form flow ends in a failure state.

Including both completion variants (success and failure) keeps your process model explicit and allows the BTP plugin to handle different outcomes appropriately.

The advantage over Orchestration Cluster REST API: use the authentication realm between BTP and S/4 / ECC, there is no need for administrating additional credentials.
