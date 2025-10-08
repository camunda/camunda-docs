---
id: blueprints
title: Blueprints
description: "Ready-to-use example processes demonstrating common Camunda–ServiceNow integration patterns."
---

![Camunda ServiceNow integration blueprint](./img/sn-blueprint-template.png)
This blueprint is a **pre-configured Camunda process** to help you quickly implement common integration scenarios with ServiceNow. It demonstrates best practices, reusable patterns, and realistic business use cases, allowing you to get started without building processes from scratch.

The blueprint is available for download from the [Camunda Marketplace](https://marketplace.camunda.com/) and can be imported directly into Camunda Modeler.

### Supported integration patterns

The blueprint supports the following integration patterns:

| Type              | Name                                   | Description                                                                                                                                                  | Example                                                                                  | Camunda Connectors            | ServiceNow Spoke                  |
| :---------------- | :------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------- | :---------------------------- | :-------------------------------- |
| **Manage**        | Manage ServiceNow data entries         | Execute CRUD (Create, Read, Update, Delete) operations on any ServiceNow table.                                                                              | Create or modify a change request in ServiceNow.                                         | ServiceNow Outbound Connector | Not needed                        |
|                   | Create ServiceNow Incident             | Define business errors within the BPMN model that create a ServiceNow incident.                                                                              | Create or modify a change request in ServiceNow.                                         | ServiceNow Incident Handler   | Not needed                        |
| **Orchestration** | Start Camunda Process                  | Start a Camunda orchestration process from a ServiceNow Flow.                                                                                                | Trigger an end-to-end orchestration for employee onboarding.                             | Not needed                    | Camunda Spoke → Start Process     |
|                   | Orchestrate ServiceNow Flows           | Start a ServiceNow Flow as part of a Camunda orchestration and interact with the running Camunda process using the ServiceNow `sys_id` as a correlation key. | Interrupt a Camunda orchestration for an approval process executed in ServiceNow.        | ServiceNow Flow Starter       | Camunda Spoke → Correlate Message |
|                   | Orchestrate ServiceNow Data Management | Trigger a ServiceNow Flow as part of a Camunda orchestration when changes occur in a dataset.                                                                | Updating a dataset that triggers a flow for further processing.                          | ServiceNow Outbound Connector | Camunda Spoke → Correlate Message |
|                   | Orchestrate ServiceNow User Task       | A Camunda orchestration process creates a ServiceNow User Task. Users interact with the Camunda orchestration process through the task.                      | Create a ServiceNow Catalog item for a user who needs to provide additional information. | ServiceNow Outbound Connector | Camunda Spoke → Correlate Message |
