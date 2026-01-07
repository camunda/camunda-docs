---
id: prerequisites
title: Prerequisites
description: "Checklist of Camunda, ServiceNow, authentication, and connectivity requirements before integrating Camunda with ServiceNow."
---

Ensure you have the following prerequisites before setting up the Camunda–ServiceNow integration.

## Camunda

- Camunda 8.6+
  - SaaS: Supported out of the box.
  - Self-managed: May require minor adjustments to the Camunda Spoke in ServiceNow.
  - User roles: Administrative access to create an API client.

## ServiceNow

- ServiceNow version: Yokohama or newer.

- Required plugins:
  - Integration Hub Starter Pack
  - Integration Hub Action Step – REST

- Camunda Spoke: Available on the [ServiceNow Store](https://store.servicenow.com/store/app/aac1b64fc3803290ef46d0af050131d0).

- User account: A technical or administrator account with permissions to access target tables and Flow Designer. This account will be used in built-in connectors to authenticate and interact with ServiceNow.

- Optional plugins (required only for starting ServiceNow flows from Camunda using the Flow Starter connector):
  - Integration Hub Enterprise Pack
  - Integration Hub Flow Trigger – REST
