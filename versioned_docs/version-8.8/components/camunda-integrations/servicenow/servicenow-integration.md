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

<!--- ## Scope

This overview page introduces the ServiceNow integration. Detailed topics are covered in separate sections:

- [Prerequisites](./servicenow-prerequisites.md)
- [Setup & configuration](./servicenow-setup.md)
- [Integration features](./manage-snow-records.md)
- [Best practices](./servicenow-best-practices.md)
- [Examples & blueprints](./servicenow-example-blueprints.md)
- [Troubleshooting & FAQs](./servicenow-troubleshooting.md)
- [Resources](./servicenow-resources.md)
- [Glossary](./servicenow-glossary.md)

adding bullet points here in the outline that Dominic drafted
ofc they need to be properly formulated
feel free to use, change, and shuffle them around

overall: there's separate and very detailed installation and config instructions in the SN marketplace entry for the Camunda Spoke
let's not repeat from that documentation in here but rather link to it where appropriate Dom should have the final call(s) here --->

## Scope

### About the integration

- Hybrid approach using custom actions in the ServiceNow Spoke ("Camunda Spoke") and Camunda Connectors/Element Templates
- Components can be used independently but are most powerful when combined
- No proprietary Camunda setup required — only standard ServiceNow plugins and artifacts
- Camunda's ServiceNow integration is certified

### Prerequisites

- Camunda 8.8+
- SaaS supported out-of-the-box; Self-Managed requires small adaptions in the ServiceNow Spoke
- ServiceNow plugin dependencies listed in the Spoke; IntegrationHub Enterprise Pack required only for starting ServiceNow flows from Camunda
- ServiceNow technical user with appropriate permissions for the required tables; this user is then configured in the Camunda ServiceNow connector

### Setup and configuration

- **ServiceNow**: Install from the ServiceNow Marketplace
- **Camunda**: Out-of-the-box support (Element Templates published like any other Connector template)
- **Camunda API credential**: Used for ServiceNow connectivity; Orchestration Cluster Secret required
- **Outbound connector element template**: Only the instance/tenant host name (e.g., `ven1234`) is required, not the full hostname

### Integration features

- **ServiceNow**
  - Start a BPMN process
  - Cancel a BPMN process
  - Send a message or signal to a BPMN process for correlation

- **Camunda**
  - Perform CRUD operations on any ServiceNow table
  - Preconfigured support for several popular tables with complete payloads for write operations
  - Error handling and result mapping similar to the REST Connector
  - Start a ServiceNow Flow via REST call (requires IntegrationHub Enterprise Pack)

### Best practices

- Reference the four integration patterns from our technical demos
- In BPMN, map the `sys_id` from the write operation response into a top-scope variable so it can be used in later steps
- Store ServiceNow technical user credentials securely using Connector Secrets and reuse them via `{{secrets.<...>}}` in the ServiceNow element template (outbound connector and flow starter)

### Troubleshooting & FAQs

- **ServiceNow**: Enable verbose flow execution logs via `Flow Reporting Settings` in the ServiceNow Flow Designer
- **Camunda**: Map both the entire ServiceNow task response and any required individual variables
- Use Camunda error handling to respond to task or network communication failures

### Resources

- Dedicated installation and configuration documentation for the Camunda Spoke

### Glossary

- **Camunda Spoke**: Custom actions for communicating with a Camunda cluster

## Key benefits

- Streamline ITSM processes by combining Camunda’s orchestration with ServiceNow workflows
- Reduce manual effort and human error through automation
- Gain end-to-end visibility of processes across multiple systems
