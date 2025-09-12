---
id: servicenow-integration
title: ServiceNow
description: "Camunda's ServiceNow integration enables end-to-end automation by connecting business processes with ServiceNow ITSM workflows."
---

Extend the power of your process automation by integrating Camunda with ServiceNow. This integration enables seamless communication between your BPMN workflows and ServiceNow IT Service Management (ITSM), helping you automate routine tasks and accelerate service delivery.

## Purpose

The ServiceNow integration allows you to:

- **Manage ServiceNow data**  
  Create, read, update, and delete records in any ServiceNow table directly from Camunda workflows.

- **Trigger ServiceNow flows**  
  Start automations built in ServiceNow's Flow Designer as part of an end-to-end process.

- **Orchestrate ITSM processes**  
  Integrate Camunda tasks with ServiceNow approvals, incidents, and service requests to create unified workflows.

## Audience

This documentation is intended for:

- **Developers** implementing workflows that interact with ServiceNow.
- **Solution architects** designing process automation across Camunda and ServiceNow.
- **Administrators** managing integration configuration and security.

<!-- ## Scope

This overview page introduces the ServiceNow integration. Detailed topics are covered in separate sections:

- [Prerequisites](./servicenow-prerequisites.md)
- [Setup & configuration](./servicenow-setup.md)
- [Integration features](./manage-snow-records.md)
- [Best practices](./servicenow-best-practices.md)
- [Examples & blueprints](./servicenow-example-blueprints.md)
- [Troubleshooting & FAQs](./servicenow-troubleshooting.md)
- [Resources](./servicenow-resources.md)
- [Glossary](./servicenow-glossary.md)   -->

<!--
adding bullet points here in the outline that Dominic drafted
ofc they need to be properly formulated
-> feel free to use, change, and shuffle them around


overall: there's separate and very detailed installation and config instructions in the SN marketplace entry for the Camunda Spoke
let's not repeat from that documentation in here but rather link to it where appropriate -> Dom should have the final call(s) here
-->

## Scope

### About the integration

- hybrid approach: custom actions in SN spoke ("Camunda Spoke") & Camunda Connector and Element Templates
- can be used independent of each other, yet most powerful when used together
- no proprietary Camunda setup needed -> all standard SN plugins and artifacts
- Camunda's SN integration is certified

### Prerequisites

- Camunda 8.8+
- SaaS is targeted ootb, SM needs small adaptions in the SN spoke
- SN plugin dependencies listed in Spoke; IntegrationHub Enterprise Pack optional, only required when SN flows are to be started from Camunda
- SN: technical user with appropriate permissions on desired table; this user is then used in the SN connector in Camunda

### Setup and Configuration

- SN: from SN Marketplace
- Camunda: ootb available (Element Templates will be published just as any other ootb Connector template)
- Camunda: API credential (for use in SN connectivity); Orchestration Cluster Secret required
- Camunda SN outbound connector element template: only instance/tenant host name (e.g. `ven1234`) is required, not the full host name

### Integration Features

- SN

  - start BPMN process
  - cancel BPMN process
  - send a message to a BPMN process (correlation)
  - send a signal to a BPMN process

- Camunda

  - CRUD on any SN table
  - several popular tables pre-configured, including "maximal" payload for write operations
  - error handling ~ REST connector
  - result/output mapping ~ REST connector
  - start a SN flow via REST call; requires installation of ServiceNow IntegrationHub Enterprise Pack (b/c only then can Flows in SN be started via a REST call)

### Best Practices

- reference 4 Integration Patterns from our Tec Dem
- in BPMN: map `sys_id` from write operation response into top scope variable to have the unique identifier for a SN record in subsequent steps in the BPMN process
- use Connector Secrets to safely store the SN technical user credentials and re-use them via {{secrets.<...>}} in the SN element template (outbound connector and flow starter)

### Troubleshooting & Faqs

- SN: turn on verbose flow execution logs (via `Flow Reporting Settings` in the actual flow in SN Flow Designer)
- Camunda: map both entire SN task response operation and individual variables from the response (accounts for any external system call, not SN integration specific)
- Camunda: use error handling of SN tasks to act on hiccups or network communication errors to SN instance

### Resources

- SN: dedicated installation + configuration doc for the Camunda Spoke

### Glossary

- "Camunda Spoke": custom actions for communicating with a Camunda Cluster

## Key benefits

- Streamline ITSM processes by combining Camunda’s orchestration with ServiceNow workflows.
- Reduce manual effort and human error through automated task execution.
- Enable end-to-end visibility of processes that span multiple systems.
