---
id: sap-integration
title: SAP integration
description: "Set up your Camunda 8 account to get started."
---

Camunda's SAP integration consists of several features that can be used independently of one another: SAP OData, RFC, and BTP.

- [SAP OData outbound Connector](./odata-connector.md): interact with an S/4HANA or ECC System via OData v2 + v4 APIs, directly from your BPMN model.
- [SAP RFC outbound Connector](./rfc-connector.md): Query BAPIs and remote-enabled function modules on SAP ECC systems.
- [SAP BTP integration](./btp-integration.md)
  - Use Tasklist's forms as Fiori UI
  - Operate BTP services from BPMN tasks
  - Inbound proxy endpoint to start process instances of BPMN models, including custom variables

These features run in the customer's scope on [https://www.sap.com/products/technology-platform.html](https://www.sap.com/products/technology-platform.html). They do not require a proprietary Camunda-related setup, and instead re-use an existing infrastructure with minimal prerequisites. This shared resource usage is cost-effective and aids both your and Camunda's sustainability effort.

![SAP integration overview](./img/sap-integration-overview.png)
