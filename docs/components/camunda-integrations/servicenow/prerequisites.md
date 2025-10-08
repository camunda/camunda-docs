---
id: prerequisites
title: Prerequisites
description: "Checklist of Camunda, ServiceNow, authentication, and connectivity requirements before integrating Camunda with ServiceNow."
---

Before setting up the ServiceNow integration, ensure you have the following prerequisites in place.

## Camunda

- **Camunda 8.6+**
  - **SaaS**: Supported out of the box.
  - **Self-managed**: May require minor adjustments to the Camunda Spoke in ServiceNow.
  - **User roles**: Administrative access to create an API client.

## ServiceNow

- **ServiceNow version**
  - Yokohama or newer.

- **Required plugins**
  - ServiceNow Integration Hub Starter Pack.
  - ServiceNow Integration Hub Action Step – REST.

- **Camunda Spoke**
  - Available on the [ServiceNow Store](https://store.servicenow.com/store/app/aac1b64fc3803290ef46d0af050131d0).

- **User account**
  - A technical user or administrator account with permissions to access target tables and Flow Designer.
  - This account will be used in the ServiceNow connectors in Camunda to authenticate and interact with the ServiceNow instance.

- **Optional plugins** (required only for starting ServiceNow flows from Camunda using the ServiceNow Flow Starter connector)
  - ServiceNow Integration Hub Enterprise Pack.
  - ServiceNow Integration Hub Flow Trigger – REST.
