---
id: glossary
title: Glossary
description: "Use this glossary to understand key terms and concepts when working with the Camunda–ServiceNow integration. | Term | Definition | Relevance |"
---

Use this glossary to understand key terms and concepts when working with the Camunda–ServiceNow integration.

## Key terms

| Term             | Definition                                                                                                                                           | Relevance                                                                                |
| :--------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------- |
| Spoke            | A scoped ServiceNow application containing Flow Designer content for a specific application or record type. Provides pre-built actions and subflows. | Enables Camunda integration. Custom spokes can handle BPMN process orchestration.        |
| Application      | A self-contained ServiceNow package delivering business capabilities, including tables, UI, logic, data model, and security.                         | Provides the structure for deploying spokes and plugins used in integrations.            |
| Plugin           | An optional add-on that extends or enhances capabilities of installed applications.                                                                  | Enables additional integration capabilities, such as Integration Hub packs.              |
| Connection alias | A named reference in ServiceNow linking credentials and connection details for external system integrations.                                         | Required for secure communication between ServiceNow and Camunda.                        |
| REST API         | RESTful web services enabling CRUD operations on ServiceNow tables using standard HTTP methods.                                                      | Primary integration method between Camunda and ServiceNow.                               |
| SysID            | A unique 32-character GUID identifying each record in a ServiceNow instance.                                                                         | Essential for tracking and correlating records across Camunda process instances.         |
| Tables           | Database objects in ServiceNow that store data and expose endpoints for CRUD operations via REST APIs.                                               | Critical for data exchange between ServiceNow and Camunda workflows.                     |
| Flows            | Automated ServiceNow processes consisting of a trigger and a sequence of reusable actions to orchestrate business logic.                             | Can be triggered by Camunda processes via REST calls or webhooks.                        |
| Subflows         | Reusable sequences of actions that encapsulate common business logic and can be called from multiple flows.                                          | Enable reusable ServiceNow operations that can be called by different Camunda processes. |
| Actions          | Individual steps within flows that perform operations such as creating records, sending notifications, or calling external APIs.                     | Can be invoked from Camunda to perform ServiceNow operations.                            |
| Triggers         | Event conditions that initiate flow execution, such as record operations, schedules, or external system calls.                                       | Can respond to Camunda process events via REST calls.                                    |
