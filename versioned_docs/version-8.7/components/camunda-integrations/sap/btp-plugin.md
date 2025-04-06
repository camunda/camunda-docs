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

## Deploying

- `cd` to folder `csap` logs, e.g. `/var/folders/y9/8d_50ddd4qd5tkpxqb6hm9tc0000gn/T/camunda/8.6/sap-btp-plugin`
- issue `cf deploy mta_archives/*.mtar`
- add the `-f` switch to force update, e.g. by deploying the same version again
- consider adding `--delete-services` to recreate eventually failed service creation of previous deployment

For advanced deployment configuration, consider working with your SAP practice, starting from the created `mta.yaml` deployment descriptor (in the `$TMP` folder as output by `csap`)
