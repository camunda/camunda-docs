---
id: prerequisites
title: Prerequisites
description: "Checklist of Camunda, SAP, authentication, and connectivity requirements before deploying the SAP integration modules."
---

Before setting up the SAP integration, ensure that the following requirements are met.

## Camunda setup

- **OData and RFC Connectors:** 8.6+
- **BTP Plugin:** 8.6+
- **Advanced Event Mesh Integration:** 8.6+

Works with both **SaaS** and **Self-Managed** deployments:

- **SaaS:** Configure [hybrid connectors](/components/connectors/use-connectors-in-hybrid-mode.md) to securely connect to SAP systems.
- **Self-Managed:** Ensure outbound connectivity from your environment to SAP BTP.

## SAP setup

You’ll need an **SAP BTP subaccount** with the following services enabled:

- [**Cloud Foundry Runtime**](https://discovery-center.cloud.sap/serviceCatalog/cloud-foundry-runtime?region=all)
- [**Destination Service (Free)**](https://discovery-center.cloud.sap/serviceCatalog/destination?region=all&service_plan=lite&commercialModel=btpea) - for system and service connectivity
- [**Connectivity Service (Free)**](https://discovery-center.cloud.sap/serviceCatalog/connectivity-service?region=all) - required for on-premises SAP S/4HANA or ECC
- [**SAP Cloud Connector**](https://help.sap.com/docs/connectivity/sap-btp-connectivity-cf/cloud-connector) - configured to bridge on-premises systems with BTP

- **Additional services (depending on your use case):**

  - [**SAP Advanced Event Mesh (AEM)**](https://discovery-center.cloud.sap/serviceCatalog/advanced-event-mesh?region=all) - enables event-driven integration between Camunda and SAP

- **Required for the BTP Plugin:**
  - [**PostgreSQL on SAP BTP (Hyperscaler Option)**](https://discovery-center.cloud.sap/serviceCatalog/postgresql-hyperscaler-option?region=all)

---

## Authentication and connectivity

- An SAP **technical user** with sufficient authorizations for the relevant S/4HANA or ECC systems
- [**Authorization and Trust Management Service (Free)**](https://discovery-center.cloud.sap/serviceCatalog/authorization-and-trust-management-service?region=all) — to manage identity and access across integration modules
- Secure connectivity between Camunda and SAP, configured either:
  - Through **SAP Cloud Connector** for on-premises, or
  - Directly via **SAP BTP services** for cloud-hosted systems.

--

## Tooling

- The [CSAP CLI](./csap-cli.md), a self-contained binary that runs on any platform without installation. Simply copy the binary to the target machine and run it directly.
