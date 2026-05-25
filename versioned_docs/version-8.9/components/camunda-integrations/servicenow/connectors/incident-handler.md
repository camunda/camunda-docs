---
id: incident-handler
title: ServiceNow Incident Handler
description: "Create, update, or manage incidents in ServiceNow directly from Camunda processes using the incident handler connector."
---

Use the ServiceNow Incident Handler connector to create, read, update, or delete incidents in ServiceNow directly from Camunda processes.

This connector works with the ServiceNow `incident` table, enabling automated IT service management and process-driven incident handling.

## Supported operations

| Operation | Description                                                  | Example use case                                            |
| :-------- | :----------------------------------------------------------- | :---------------------------------------------------------- |
| Create    | Create a new incident in ServiceNow.                         | Automatically log an incident when a process task fails.    |
| Read      | Retrieve details of an existing incident using its `sys_id`. | Check the current status of an incident.                    |
| Update    | Modify fields on an existing incident.                       | Change incident priority or assignment group mid-process.   |
| Delete    | Remove an incident by its `sys_id`.                          | Clean up test or temporary incidents after automation runs. |

## Configure the connector

Select **ServiceNow Incident Handler** from Camunda Modeler connector templates or download it from the [Camunda Marketplace](https://marketplace.camunda.com/).

### Required fields

| Field          | Description                                                                |
| :------------- | :------------------------------------------------------------------------- |
| Instance name  | Name of your ServiceNow instance (e.g., `your-instance-name`).             |
| Operation      | One of `Create`, `Read`, `Update`, or `Delete`.                            |
| Payload        | JSON data representing incident fields (for Create and Update operations). |
| Sys ID         | Unique identifier for `Read`, `Update`, or `Delete` operations.            |
| Authentication | ServiceNow credentials (username and password).                            |

:::tip
Store ServiceNow credentials securely as [Camunda secrets](/components/console/manage-clusters/manage-secrets.md) and reference them in the connector configuration (e.g., `{{secrets.snUser}}` and `{{secrets.snPwd}}`).
:::

![ServiceNow Incident Handler example](../img/incident-handler.png)  
_Configuration of the Incident Handler connector in Camunda Modeler._

## Example configurations

### Create a new incident

| Field         | Example value                                                        |
| :------------ | :------------------------------------------------------------------- |
| Instance name | `your-instance-name`                                                 |
| Operation     | `Create`                                                             |
| Payload       | `{"short_description": "Create ServiceNow Incident (from Camunda)"}` |
| Username      | `{{secrets.snUser}}`                                                 |
| Password      | `{{secrets.snPwd}}`                                                  |

### Update an existing incident's priority

| Field         | Example value        |
| :------------ | :------------------- |
| Instance name | `your-instance-name` |
| Operation     | `Update`             |
| Sys ID        | `{{incidentSysId}}`  |
| Payload       | `{"priority": "2"}`  |
| Username      | `{{secrets.snUser}}` |
| Password      | `{{secrets.snPwd}}`  |
