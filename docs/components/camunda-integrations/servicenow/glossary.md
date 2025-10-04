---
id: glosarry
title: Glosarry
description: "Definitions of key terms and concepts used in the Camunda–ServiceNow integration."
---

Below are key terms and concepts you'll encounter when working with the Camunda ServiceNow integration.


### Glossary

| Term | Definition | Relevance to the integration |
|------|------------|----------------------------|
| **Spoke** | A scoped ServiceNow application containing Flow Designer content dedicated to a particular application or record type. Spokes provide pre-built actions and subflows for integrations. | Essential for Camunda integration. Custom spokes can be built to handle BPMN process orchestration. |
| **Application** | A self-contained ServiceNow package that delivers a complete business capability, including tables, UI, logic, data model, and security. | Provides the structure for deploying spokes and plugins used in integrations. |
| **Plugin** | An optional add-on that extends or enhances the capabilities of one or more installed applications. | Required to enable additional integration capabilities, such as Integration Hub packs. |
| **Connection Alias** | A named reference in ServiceNow that links credentials and connection details for external system integrations. | Required for secure communication between ServiceNow and the Camunda platform. |
| **REST API** | RESTful web services that enable CRUD operations on ServiceNow tables using standard HTTP methods. | The primary integration method between Camunda and ServiceNow. |
| **SysID** | A unique 32-character GUID that identifies each record in a ServiceNow instance. | Essential for tracking and correlating specific records across Camunda process instances. |
| **Tables** | Database objects in ServiceNow that store data and expose endpoints for CRUD operations via REST APIs. | Critical for data exchange between ServiceNow and Camunda workflows. |
| **Flows** | Automated processes in ServiceNow that consist of a trigger and a sequence of reusable actions to orchestrate business logic. | Can be triggered by Camunda processes via REST calls or webhooks. |
| **Subflows** | Reusable sequences of actions that encapsulate common business logic and can be called from multiple flows. | Useful for creating reusable ServiceNow operations that can be called by different Camunda processes. |
| **Actions** | Individual steps within flows that perform operations such as creating records, sending notifications, or calling external APIs. | Can be invoked from Camunda for ServiceNow operations. |
| **Triggers** | Event conditions that initiate flow execution, such as record operations, schedules, or external system calls. | Can be configured to respond to Camunda process events via REST calls. |