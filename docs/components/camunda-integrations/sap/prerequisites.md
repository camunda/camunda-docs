---
id: prerequisites
title: Prerequisites
description: "Checklist of Camunda, SAP, authentication, and connectivity requirements before deploying the SAP integration modules."
---

Before setting up the SAP integration, ensure you have the following in place:

## Camunda setup

- **Camunda 8.5+**
  - Works with both Camunda SaaS and Self-Managed deployments.
  - For Self-Managed: Ensure outbound connectivity from your environment to SAP BTP.
  - For SaaS: Configure [hybrid connectors](/components/connectors/use-connectors-in-hybrid-mode.md) to securely connect to SAP systems.

## SAP setup

- An **SAP BTP subaccount** with the following enabled:
  - [Cloud Foundry Runtime](https://discovery-center.cloud.sap/serviceCatalog/cloud-foundry-runtime?region=all)
  - [(Free) Destination Service](https://discovery-center.cloud.sap/serviceCatalog/destination?region=all&service_plan=lite&commercialModel=btpea) for system and service connectivity
  - [(Free) Connectivity Service](https://discovery-center.cloud.sap/serviceCatalog/connectivity-service?region=all) (if using on-premises SAP S/4HANA or ECC)
  - [SAP Cloud Connector](https://help.sap.com/docs/connectivity/sap-btp-connectivity-cf/cloud-connector) configured to bridge on-premises systems with BTP

- **Optional services, depending on your scenario:**
  - [SAP Event Mesh](https://discovery-center.cloud.sap/serviceCatalog/event-mesh) for event-driven communication between Camunda and SAP.
  - [SAP Task Center](https://discovery-center.cloud.sap/serviceCatalog/task-center) to surface Camunda Tasklist items directly in SAP Fiori.
  - [PostgreSQL on SAP BTP, hyperscaler option](https://discovery-center.cloud.sap/serviceCatalog/postgresql-hyperscaler-option?region=all) for the BTP plugin.

## Authentication and connectivity

- An SAP **technical user** with sufficient authorizations for the relevant S/4HANA or ECC systems.
- [(Free) SAP Authorization and Trust Management Service](https://discovery-center.cloud.sap/serviceCatalog/authorization-and-trust-management-service?region=all) to manage identity and access across integration modules.
- Secure connectivity between Camunda and SAP, configured either:
  - Through SAP Cloud Connector (for on-premises), or
  - Directly via SAP BTP services (for cloud-hosted systems).

## Tooling

- The [CSAP CLI](./csap-cli.md) installed to prepare and deploy integration modules.
