---
id: btp-plugin
title: SAP BTP plugin
description: "Learn about the Camunda SAP Business Technology Platform (BTP) plugin, an artifact run on BTP."
---

The Camunda SAP Business Technology Platform (BTP) plugin is an artifact run on BTP. It consists of a [UI5 app](https://ui5.sap.com/), a [CAP service layer and backend](https://cap.cloud.sap/) (using PostgreSQL), and an [approuter](https://www.npmjs.com/package/@sap/approuter) for traffic dispatching.

The BTP plugin connects to Camunda 8 SaaS to provide:

- A generic Fiori app for starting BPMN processes and displaying [Camunda Forms](/components/modeler/forms/camunda-forms-reference.md) in the Fiori design language.
- A generic endpoint to start BPMN processes with.

## Prerequisites

- **Camunda API Client** <br/>
  [Create an API client](/components/console/manage-clusters/manage-api-clients.md) for your Camunda SaaS cluster with the full scope: `Zeebe,Tasklist,Operate,Optimize,Secrets`

- Locally, for configuring via `csap` only (see below): [Node.js >= 20 LTS](https://nodejs.org/en/about/previous-releases)

On SAP BTP:

- [Cloud Foundry CLI](https://github.com/cloudfoundry/cli) with the [multiapps plugin](https://github.com/cloudfoundry/multiapps-cli-plugin) installed on the machine executing the deployment.

- SAP BTP subaccount with a [Cloud Foundry environment](https://discovery-center.cloud.sap/serviceCatalog/cloud-foundry-runtime?region=all) enabled and a [created space](https://help.sap.com/docs/btp/sap-business-technology-platform/create-spaces).
- A minimum of [4 GB storage quota and 4 GB runtime memory](https://help.sap.com/docs/btp/sap-business-technology-platform/managing-space-quota-plans).

- [Entitlements](https://help.sap.com/docs/btp/sap-business-technology-platform/managing-entitlements-and-quotas-using-cockpit) for:

  - BTP PostgreSQL, hyperscaler option
    - Ensure the [available BTP PostgreSQL, hyperscaler option, and configuration options](https://help.sap.com/docs/postgresql-on-sap-btp/postgresql-on-sap-btp-hyperscaler-option/parameters) match your sizing plan. For example, for multi-region databases or high availability, the BTP plugin defaults to a minimum, only specifying PostgreSQL version 16 (see `/core/pg-options.json`) and a single database instance, with no high availability.
  - [Destination Service](https://discovery-center.cloud.sap/serviceCatalog/destination?service_plan=lite&region=all&commercialModel=btpea), `lite` plan
  - [Connectivity Service](https://discovery-center.cloud.sap/serviceCatalog/connectivity-service?region=all), `lite` plan
  - [Authorization and Trust Management Service](https://discovery-center.cloud.sap/serviceCatalog/authorization-and-trust-management-service?region=all), `application` plan

## Features

- Model user tasks in your BPMN process—they will be automatically detected and rendered by the BTP plugin at runtime.

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

Custom properties are not supported:<br/>
![image-20250219112156011](./img/forms-no-custom-properties.png)

### Supported Form Features and Properties

|                  | Camunda Forms Feature / Property | Supported in Camunda BTP Plugin? | Comments                                                                                                                                                                                                                  |
| ---------------- | -------------------------------- | :------------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Input**        |                                  |                                  |                                                                                                                                                                                                                           |
|                  | Text field                       |        :white_check_mark:        |                                                                                                                                                                                                                           |
|                  | Text area                        |        :white_check_mark:        |                                                                                                                                                                                                                           |
|                  | Number                           |        :white_check_mark:        |                                                                                                                                                                                                                           |
|                  | Date time                        |        :white_check_mark:        | Only UTC values will be stored<br />- Date format `yyyy-MM-dd`, for example `2025-02-29"12`<br />- Hours format will be stored as the string `10:12:34 pm`<br />- 24 hours format will be stored as the string `22:12:34` |
|                  | Expression                       |               :x:                |                                                                                                                                                                                                                           |
|                  | File picker                      |               :x:                |                                                                                                                                                                                                                           |
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

[Use `csap`](./csap-cli.md) for setting up the BTP plugin, as a manual configuration is cumbersome and error-prone.

With Camunda, no setup/config work is necessary to use the BTP plugin.

### Configuring the BTP plugin using `csap`

Either walk yourself through the prompts or provide all information to the CLI:

- `csap setup` will guide you interactively.

- Assuming your [Camunda cluster's API credentials](/guides/setup-client-connection-credentials.md) are sourced in your shell environment, this will do the configuration for you:

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

The advantage over Camunda REST API: use the authentication realm between BTP and S/4 / ECC, there is no need for adminstrating additional credentials.
