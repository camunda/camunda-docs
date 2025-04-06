---
id: btp-plugin
title: SAP BTP plugin
description: "Learn about the Camunda SAP Business Technology Platform (BTP) plugin, an artifact run on BTP."
---

The Camunda SAP Business Technology Platform (BTP) plugin is an artifact run on BTP. This connects to Camunda 8 SaaS to provide:

- A generic Fiori app for starting BPMN processes and displaying [Camunda Forms](/components/modeler/forms/camunda-forms-reference.md) in the Fiori design language.
- A generic endpoint to start BPMN processes with.

## Prerequisites

- check entitlements on SAP BTP subaccount to correspond with desired configuration options for the db instance
- available BTP PostgreSQL, hyperscaler option, configuration options: https://help.sap.com/docs/postgresql-on-sap-btp/postgresql-on-sap-btp-hyperscaler-option/parameters
- we default to a minimum, only specifying PostgreSQL version 16 (see `/core/pg-options.json`)
- recommendation: create an API client for your Camunda SaaS cluster with the full scope: `Zeebe,Tasklist,Operate,Optimize,Secrets`

## Features

- just model User Tasks, they are picked up automatically and run/rendered by the BTP plugin

- equip the very last User Task with a custom header `final-user-task` and the value

  - `success` to display the last user task on the "happy path"
  - `fail` to use that user task to communicate a failed process to the user

  ![screenshot of header variable in Modeler](./img/sap-btp-plugin-final-user-task-header.png)

- Auto-start a process via URL parameter using `run=<processID>`. For example, `https://<btp plugin url>/index.html?channelId=<id>&run=application-process`.

- For debugging purposes, add `debug=true` as the URL parameter. For example, `https://<btp plugin url>/index.html?channelId=<id>&run=application-process&debug=true`.

- `/inbound` endpoint for starting a BPMN process in Camunda

  - defined payload:

    ```json
    {
    	"bpmnProcessId": "processId",
      "user": "beck",
      "wait": true, # wait for the BPMN run to finish and get the result back
    	"variables": { # optional
    		"some_key": "some_value",
    		"some_other_key": 10
    	}
    }
    ```

  - advantage over Camunda REST API: use authentication realm between BTP and S/4 / ECC, no need for adminstrating additional credentials

## Camunda Forms in SAP Fiori

- Layout: single row layout only, ![image-20250219112232376](./img/froms-no-columns.png)

- No custom properties. ![image-20250219112156011](./img/forms-no-custom-properties.png)

- Explain "one-user multi-page flow"

### Supported form features and properties

|                  | Camunda Forms feature/property | Supported in Camunda BTP plugin? | Comments                                                                                                                                                                                                                 |
| ---------------- | ------------------------------ | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Input**        |                                |                                  |                                                                                                                                                                                                                          |
|                  | Text field                     | :white_check_mark:               |                                                                                                                                                                                                                          |
|                  | Text area                      | :white_check_mark:               |                                                                                                                                                                                                                          |
|                  | Number                         | :white_check_mark:               |                                                                                                                                                                                                                          |
|                  | Date time                      | :white_check_mark:               | Only UTC values will be stored<br />- Date format "yyyy-MM-dd", for example "2025-02-29"12<br />- Hours format will be stored as the string "10:12:34 pm"<br />- 24 hours format will be stored as the string "22:12:34" |
|                  | Expression                     | :x:                              |                                                                                                                                                                                                                          |
|                  | File picker                    | :x:                              |                                                                                                                                                                                                                          |
| **Selection**    |                                |                                  |                                                                                                                                                                                                                          |
|                  | Checkbox                       | :white_check_mark:               |                                                                                                                                                                                                                          |
|                  | Checkbox group                 | :x:                              |                                                                                                                                                                                                                          |
|                  | Radio group                    | :white_check_mark:               | Only `static` options source is supported.                                                                                                                                                                               |
|                  | Select                         | :white_check_mark:               | Only `static` options source is supported.                                                                                                                                                                               |
|                  | Tag list                       | :x:                              |                                                                                                                                                                                                                          |
| **Presentation** |                                |                                  |                                                                                                                                                                                                                          |
|                  | Text view                      | :white_check_mark:               |                                                                                                                                                                                                                          |
|                  | Image view                     | :white_check_mark:               |                                                                                                                                                                                                                          |
|                  | Table                          | :x:                              |                                                                                                                                                                                                                          |
|                  | HTML view                      | :white_check_mark:               |                                                                                                                                                                                                                          |
|                  | Document preview               | :x:                              |                                                                                                                                                                                                                          |
|                  | Spacer                         | :x:                              |                                                                                                                                                                                                                          |
|                  | Separator                      | :x:                              |                                                                                                                                                                                                                          |
| **Containers**   |                                |                                  |                                                                                                                                                                                                                          |
|                  | Group                          | :x:                              |                                                                                                                                                                                                                          |
|                  | Dynamic list                   | :x:                              |                                                                                                                                                                                                                          |
|                  | iFrame                         | :x:                              |                                                                                                                                                                                                                          |
| **Action**       |                                |                                  |                                                                                                                                                                                                                          |
|                  | Button                         | :x:                              |                                                                                                                                                                                                                          |

## Deploying

How to exactly deploy the BTP Plugin is the responsibility of the SAP practice.

A possible way with the [Clound Foundry `cf` cli](https://github.com/cloudfoundry/cli) could be:

- `cd` to folder `csap` logs, e.g. `/tmp/camunda/8.6/sap-btp-plugin`
- issue `cf deploy mta_archives/*.mtar`
- add the `-f` switch to force update, e.g. by deploying the same version again
- consider adding `--delete-services` to recreate eventually failed service creation of previous deployment

For advanced deployment configuration, consider working with your SAP practice, starting from the created `mta.yaml` deployment descriptor (in the `$TMP` folder as output by `csap`)
