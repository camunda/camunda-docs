---
title: "Camunda 8.8 Self-Managed Update Guide"
description: "Comprehensive guide for updating your Camunda 8 Self-Managed installation, including architectural changes, migration planning, and execution strategies."
---

Update your Camunda 8 Self-Managed installation to the latest version with confidence. This section provides detailed technical guidance, migration strategies, and coordination procedures for both platform administrators and application developers.

## Camunda 8.8 is a latest released version

Camunda 8.8 represents a significant architectural evolution that affects both infrastructure deployment and application integration. This update introduces the new **orchestration cluster architecture**, unified APIs, and new authentication models while deprecating several legacy components.

:::info Web Modeller and Console
Biggest changes to Camunda 8.8 release relate to Orchestrion cluster. For Web Modeller and Console please follow standard upgrade procedures described in [8.8 Update guide](../operational-guides/update-guide/870-to-880.md)
:::

**Update complexity**: **Moderate to High**

We provide two guides specifically designed to help Administrators and Developer with Camunda 8.8 upgrade.
We recommend to avoid any other deployment changes outside of this guide in order to reduce risk and complexity of the upgrade. 

[Camunda 8.8 Upgrade guide for Administrator](./administrators/prepare-for-update.md)
[Camunda 8.8 Upgrade guide for Developers](./developers/prepare-for-update.md)

You can navigate to one of these guides to start your upgrade. In the remainder of this page we will provide a high level overview of changes to help you with high level understanding of what has changed.

- Architectural changes in 8.8
- Update pre-requisites and compatibility
- New Camunda Orchestration cluster Identity
- New unified deployment architecture

## Architectural changes in 8.8

### New streamlined architecture
With Camunda 8.8 we have completed our streamlined architecture project, announced in 2024 in the [blog post](https://camunda.com/blog/2024/04/simplified-deployment-options-accelerated-getting-started-experience/)

TODO Explain what is all about 


## Update pre-requisites and compatibility

You can find detailed list of operating systems, clients, deployment options, and component requirements in our [Supported environments page](../../reference/supported-environments.md). Below are several highlights.

:::warning Breaking Changes
Camunda 8.8 includes breaking changes that **require** application code updates and infrastructure modifications. Plan accordingly.
For a full list of changes, please refer to [8.8 Update guide](../operational-guides/update-guide/870-to-880.md)
:::

**API and SDK changes:**

While API and SDK change are backward compatible in Camunda 8.8 release, we highly recommend migrating your applications as soon as possible to get access to new features and future proof your applications.
- V1 component APIs is now deprecated → Migrate to Orchestration Cluster API before Camunda 8.10
- Community Spring Zeebe is now deprecated → Migrate to Camunda Spring SDK before Camunda 8.10
- Zeebe Process Test (ZPT) is now deprecated → Migrate to Camunda Process Test (CPT) before Camunda 8.10
- Job-based User Tasks is now deprecated → Migrate to Camunda User Tasks before Camunda 8.10

For More information see [Upcoming API Changes in Camunda 8: A Unified and Streamlined Experience](https://camunda.com/blog/2024/12/api-changes-in-camunda-8-a-unified-and-streamlined-experience/)

**Authentication and authorization:** TODO review and rephrase

- LDAP authentication removed for Operate/Tasklist → Migrate to Identity/OIDC
- New cluster-level permission model → Update role assignments
- Separate orchestration vs management permissions → Reconfigure access controls
- New Orchestration cluster identity does require Keycloak, however it requires an OIDC provider. This could be an you company OIDC provider or standalone deployment of Keycloak.

**Infrastructure**

- **Elasticsearch 8.16+** is a minimum supported versions with Camunda 8.8.

**Deployment changes:**

- New orchestration cluster deployment architecture → Please, refer to [Camunda Upgrade guide for Administrators](./administrators/prepare-for-update.md) for more details.
- Unified configuration schema → Migrate Camunda configuration to the new unified schema TODO add link

## Update execution paths

Choose your role and follow the appropriate update path:

### **Platform Administrators, DevOps** - Infrastructure and platform management

**You are responsible for:**

- Kubernetes clusters and Helm chart deployments
- Elasticsearch/OpenSearch databases and infrastructure
- Authentication systems (Identity, Keycloak, OIDC providers)
- Backup systems and disaster recovery procedures
- Platform monitoring and alerting systems

**Your update path:**

1. **[Prepare for update](./administrators/prepare-for-update.md)** - Backup creation and configuration updates
2. **[Run update](./administrators/run-update.md)** - Platform update execution and validation

### **Application Developers** - Applications and integrations

**You are responsible for:**

- Process applications and job workers using Camunda SDKs
- Custom connectors and integration applications
- Client applications consuming Camunda APIs
- Testing frameworks and development tooling
- User task implementations and UI applications

**Your update path:**


1. **[Prepare for update](./developers/prepare-for-update.md)** - SDK migration and development environment setup
2. **[Run update](./developers/run-update.md)** - Application deployment and functionality validation

## Next steps

1. **Review the comprehensive planning guides** for your role
2. **Start with a test environment** to validate your specific configuration
3. **Coordinate with your counterpart team** (administrators ↔ developers)
4. **Plan your maintenance window** allowing sufficient time for validation

Both update paths include detailed step-by-step guidance, validation procedures, and troubleshooting recommendations tailored to your specific responsibilities.
