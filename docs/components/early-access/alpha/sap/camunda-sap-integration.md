---
id: sap-integration
title: SAP integration
description: "Camunda's SAP integration consists of several features that can be used independently of one another: SAP OData, RFC, and BTP."
---

Camunda's SAP integration consists of several features that can be used independently of one another: SAP OData, RFC, and BTP.

- [SAP OData Connector](./odata-connector.md): Interact with a S/4HANA or ECC System via OData v2 + v4 APIs, directly from your BPMN model.
- [SAP RFC outbound Connector](./rfc-connector.md): Query BAPIs and remote-enabled function modules on SAP ECC systems.
- [SAP BTP integration](./btp-integration.md)
  - Use [Tasklist's](/components/tasklist/introduction-to-tasklist.md) forms in the Fiori UI
  - Operate SAP BTP services from [BPMN tasks](/components/modeler/bpmn/bpmn.md)
  - Inbound proxy endpoint to start process instances of BPMN models, including custom variables

These features run in the customer's [SAP BTP instance](https://www.sap.com/products/technology-platform.html). They do not require a proprietary Camunda setup, and instead re-use an existing infrastructure with minimal prerequisites.

![SAP integration overview](./img/sap-integration-overview.png)

## Technical requirements - SAP

Generally speaking, Camunda's SAP integration has ony few technical requirements. 

Yet all SAP integration artifacts have these technical requirements in common:

- they run on SAP BTP, Cloud Foundry environment, and thus [need the respective service](https://discovery-center.cloud.sap/serviceCatalog/cloud-foundry-runtime?region=all)
- [(free) Destination Service](https://discovery-center.cloud.sap/serviceCatalog/destination?region=all&service_plan=lite&commercialModel=btpea) for system- and service connectivity
- if the S/4 or ECC system is located on-premises:
  - [(free) Connectivity Service](https://discovery-center.cloud.sap/serviceCatalog/connectivity-service?region=all)
  - [SAP Cloud Connector](https://help.sap.com/docs/connectivity/sap-btp-connectivity-cf/cloud-connector) configured and connected to both S/4 / ECC and the BTP subaccount where the Camunda SAP Integration artifacts will run
- technical user with respective access right to the S/4 and/or ECC system

For the **SAP OData connector**, no additional services are needed.

For the **SAP RFC connector**, there's additionally the [(free) SAP Authorization and Trust Management Service](https://discovery-center.cloud.sap/serviceCatalog/authorization-and-trust-management-service?region=all) mandatory.

For the **SAP BTP Integration** moreover required:

- [(free) SAP Authorization and Trust Management Service](https://discovery-center.cloud.sap/serviceCatalog/authorization-and-trust-management-service?region=all) 
- [PostgreSQL on SAP BTP, hyperscaler option](https://discovery-center.cloud.sap/serviceCatalog/postgresql-hyperscaler-option?region=all)

For scaling out and up, it is usually sufficient to either add multiple instances of an integration module (e.g. the SAP OData connector) or equipping an integration module with more runtime memory (e.g. the SAP BTP integration). 

For more sophisticated tuning, all mechanism of BTP can be applied (such as the [(free) Application Autoscaler](https://discovery-center.cloud.sap/serviceCatalog/application-autoscaler?service_plan=standard&region=all&commercialModel=btpea)), as all SAP integration artifacts fully adhere to the BTP cloud based development standards and can moreover be fully configured just as any custom developed apps on BTP.

We strive not only to keep the integration as simple and lean as possible, but also not to foster any lock-in. "We cook, you plate".
