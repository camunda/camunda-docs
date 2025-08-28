---
id: sap-integration
title: SAP integration
description: "Camunda's SAP integration connects processes with SAP S/4HANA, ECC, and SAP Business Technology Platform (BTP) services through modular components: the SAP OData connector, RFC outbound connector, and BTP plugin."
---

Use Camunda's [SAP](/reference/glossary.md#sap) integration to bring SAP functionality into your orchestrated processes and connect with SAP BTP services.

This integration provides modular components that can be used independently or together to automate business-critical scenarios across SAP and non-SAP systems.

## Purpose

The SAP integration enables you to:

- Extend end-to-end process orchestration into SAP S/4HANA and ECC systems.
- Simplify connectivity to SAP BTP services without requiring proprietary infrastructure.
- Execute SAP-specific functions (such as BAPIs, RFCs, and OData calls) directly within BPMN workflows.
- Provide IT and business teams with a certified, enterprise-grade solution for SAP automation.

:::info
The Camunda SAP integration is **SAP Certified**, ensuring compliance with SAP's standards for compatibility, security, and performance. This certification provides added assurance for enterprise deployments.
:::

## Audience

This documentation is intended for:

- **Developers** who implement process models that call SAP functions, services, or APIs.
- **Solution architects** who design system landscapes and need to understand integration options.
- **Administrators** who deploy and configure SAP integration modules in SAP BTP or hybrid environments.

## Scope of documentation

This section of the documentation covers:

- [Prerequisites](./sap-prerequisites.md) for running the integration.
- **Integration modules**: What each SAP module does and how they fit into Camunda workflows.
- **Setup guidance**: How to configure and deploy integration modules using the [CSAP CLI](./csap-cli.md).
- **Module-specific documentation**:
  - [SAP OData outbound connector](./odata-connector.md)
  - [SAP RFC outbound connector](./rfc-connector.md)
  - [SAP BTP plugin](./btp-plugin.md)

## About the integration

Camunda's SAP integration consists of several modules that can be used independently:

| Module                                               | What it does                                                                                                                                                                                                                                                   |
| :--------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [SAP OData outbound connector](./odata-connector.md) | Interact with an SAP S/4HANA or ECC system via OData v2 + v4 APIs directly from your BPMN model.                                                                                                                                                               |
| [SAP RFC outbound connector](./rfc-connector.md)     | Query Business Application Programming Interfaces (BAPIs) and remote-enabled function modules (RFCs) on SAP ECC systems.                                                                                                                                       |
| [SAP BTP plugin](./btp-plugin.md)                    | - Use [Tasklist's](/components/tasklist/introduction-to-tasklist.md) forms in the Fiori UI. <br/> - Trigger and manage SAP BTP services from [BPMN tasks](/components/modeler/bpmn/bpmn.md). <br/> - Start BPMN process instances via inbound proxy endpoints. |

These features run within your [SAP BTP instance](https://www.sap.com/products/technology-platform.html), requiring no proprietary Camunda setup and leveraging existing infrastructure with minimal prerequisites.

![SAP integration overview](./img/sap-integration-overview.svg)
