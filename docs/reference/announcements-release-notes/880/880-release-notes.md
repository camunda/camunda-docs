---
id: 880-release-notes
title: "Release notes"
description: "Release notes for 8.8, including alphas"
keywords:
  [
    "product development lifecycle",
    "software development lifecycle",
    "CI/CD",
    "AI",
  ]
---

These release notes identify the new features included in 8.8, including [alpha feature releases](/components/early-access/alpha/alpha-features.md).

## 8.8 minor

| Scheduled release date | Scheduled end of maintenance | Changelog(s) | Release blog | Update guide |
| ---------------------- | ---------------------------- | ------------ | ------------ | ------------ |
| 14 October 2025        | 13 April 2027                | -            | -            | -            |

## 8.8.0-alpha3

| Release date  | Changelog(s)                                                                                                                                                                               | Blog |
| :------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--- |
| 08 April 2025 | <ul><li>[ Camunda 8 core ](https://github.com/camunda/camunda/releases/tag/8.8.0-alpha3)</li><li>[ Connectors ](https://github.com/camunda/connectors/releases/tag/8.8.0-alpha3)</li></ul> | -    |

<!-- https://github.com/camunda/product-hub/issues/2630 -->

### Ad-hoc sub-process activation API & completion configuration <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span> {#adhocsubprocess}

Agentic process orchestration enhancements include:

- An optional `completionCondition` boolean expression for ad-hoc sub-processes that is evaluated every time an inner element is completed. A `cancelRemainingInstances` boolean attribute can also be configured to influence the ad-hoc sub-process behavior when the completion condition is met.
- An [Activate activities within an ad-hoc sub-process](/apis-tools/camunda-api-rest/specifications/activate-ad-hoc-sub-process-activities.api.mdx) API used to activate selected activities within an ad-hoc sub-process.
- A [Search activatable activities (alpha)](/apis-tools/camunda-api-rest/specifications/search-ad-hoc-sub-process-activities.api.mdx) API used to search for activatable activities within ad-hoc sub-processes.

To learn more about these features, see [ad-hoc sub-processes](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md).

<!-- https://github.com/camunda/product-hub/issues/2585 -->

### Advanced User Task Listeners for Updating Events <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Tasklist">Tasklist</span> {#listeners}

Advanced User Task Listeners for Updating Events allow you to define listeners that trigger whenever certain task properties or variables change.

- These listeners generate jobs similar to other event-based task listeners, granting direct access to task data as well as the ability to accept or roll back updates (in certain scenarios).
- Operators can also view, manage, and resolve incidents caused by these listeners in Operate, ensuring a unified and transparent approach to handling task changes.

To learn more about this feature, see [advanced user task listeners for updating events](/components/concepts/user-task-listeners.md).

<!-- https://github.com/camunda/product-hub/issues/2750 -->

### Connector manage and run supports multiple Connector Runtimes<span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Console">Console</span> {#connector-management}

Connector manage and run in Console now supports managing multiple Connector Runtime instances.

To learn more about this feature, see [manage your connectors](/components/console/manage-clusters/manage-connectors.md).

<!-- https://github.com/camunda/product-hub/issues/2398 -->

### HubSpot Connector <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Connectors">Connectors</span> {#hubspot}

Use the new outbound HubSpot Connector to connect your BPMN service with [HubSpot](https://hubspot.com/) and manage your HubsSpot contacts, companies, and deals.

This Connector supports the following operations:

- Contacts: Get all contacts, Get contact by id, Get multiple contacts by id, Search contact, Create contact, Update contact, Delete contact.
- Companies: Get all companies, Get company by id, Search company, Get all contacts of a company, Add contact to company, Remove contact from company, Create company, Delete company.
- Deals: Get all deals, Get deal by id, Search deal, Delete deal.

To learn more about this Connector, see [HubSpot Connector](/components/connectors/out-of-the-box-connectors/hubspot.md).

## 8.8.0-alpha2

| Release date  | Changelog(s)                                                                                                                                                                               | Blog                                                                               |
| :------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| 11 March 2025 | <ul><li>[ Camunda 8 core ](https://github.com/camunda/camunda/releases/tag/8.8.0-alpha2)</li><li>[ Connectors ](https://github.com/camunda/connectors/releases/tag/8.8.0-alpha2)</li></ul> | [Release blog](https://camunda.com/blog/2025/03/camunda-alpha-release-march-2025/) |

### Camunda Spring Boot SDK for the C8 REST API

A Spring Boot SDK is provided for the Camunda 8 REST API to unify process management, user tasks, and identity features under a single dedicated starter. This simplifies the interaction between a Spring Boot application and Camunda 8, allowing you to:

- Easily integrate process entity management and queries within your workflows.
- Seamlessly configure endpoints and authentication via Spring Boot auto-configuration, minimizing boilerplate code.
- Rely on an official, standardized approach to guarantee consistency and reduce maintenance costs when upgrading.

To learn more about this feature, see the [Camunda Spring Boot SDK](/apis-tools/spring-zeebe-sdk/getting-started.md).

<!-- https://github.com/camunda/product-hub/issues/2249 -->

### Camunda 8 Run authentication updates

Camunda 8 Run no longer requires authentication when working with APIs. Authentication and authorizations can be optionally enabled to allow requests using basic authentication, and to test authorizations and permissions.

To learn more about this feature, see the [API documentation](/self-managed/setup/deploy/local/c8run.md#use-camunda-apis) for Camunda 8 Run.

<!-- https://github.com/camunda/camunda-docs/pull/5145 -->

### Identity management updates <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

The [Identity service](/self-managed/identity/what-is-identity.md) is enhanced to deliver greater flexibility, control, and security for both Self-Managed and SaaS users. These updates are part of our broader effort to streamline the platform’s architecture.

#### Cluster-level identity management

Identity settings will be configured at the orchestration cluster level, allowing each cluster to have unique OIDC configurations. This cluster-specific setup empowers organizations to assign different identity providers (IdPs) across clusters, offering improved control over permissions and user group mappings, resulting in a more streamlined and efficient configuration experience.

For SaaS customers, identity management in Camunda 8.8 remains consistent with Camunda 8.7, allowing the attachment of a single IdP per organization. However, cluster-level identity capabilities are provided for SaaS as well as Self-Managed. This means that user groups, roles, and access permissions can now be managed at the cluster level, giving SaaS customers the same granular access control as in Self-Managed environments.

#### Decoupling from Keycloak <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

Built-in Keycloak integration in Self-Managed is removed, allowing customers to use any compatible IdP.

- Keycloak remains fully supported as an external option. For cluster-level identity management it must be connected as an external OIDC provider moving forward.
- OpenID Connect (OIDC) remains the standard for seamless integration with chosen IdPs.

#### Resource-based permissions

Resource-level permissions are introduced to control read and write permissions per specific resource.

- Admin users retain full access, but regular users must be granted specific permissions to perform operations or view resources.
- For organizations that build custom front-ends and access Camunda via API, users or Clients with API permissions can still access data through the V2 API, respecting their resource permissions.

<!-- :::info
Learn more about these updates in Introducing Enhanced Identity Management in Camunda 8.8.
::: -->

## 8.8.0-alpha1

| Release date     | Changelog(s)                                                                                                                                                                               | Blog                                                                                  |
| :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------ |
| 11 February 2025 | <ul><li>[ Camunda 8 core ](https://github.com/camunda/camunda/releases/tag/8.8.0-alpha1)</li><li>[ Connectors ](https://github.com/camunda/connectors/releases/tag/8.8.0-alpha1)</li></ul> | [Release blog](https://camunda.com/blog/2025/02/camunda-alpha-release-february-2025/) |

:::note
Some features available in 8.8.0-alpha1 were originally released in [8.7.0 alphas](/reference/announcements-release-notes/870/870-release-notes.md). These features are longer planned for release in 8.7.0. For more information, see the Camunda 8.7 and 8.8 [release update blog](https://camunda.com/blog/2025/01/camunda-87-88-release-update/).
:::

### User task listeners <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Modeler">Modeler</span><span class="badge badge--medium" title="This feature affects Operate">Operate</span>

Task lifecycle management is enhanced with user task listeners, allowing users to react to specific user task lifecycle events.

- Process designers can now model task listeners for different events, such as `assigning` and `completing`.
- Developers can use the same job infrastructure to activate and complete task listener jobs.
- Operations engineers can easily check details of active and completed task listeners within instances, and efficiently resolve task listener incidents.

This enhancement streamlines operations and ensures smoother incident handling, improving time to unblock process execution.

To learn more about this feature, see [user task listeners](/components/concepts/user-task-listeners.md).

<!-- https://github.com/camunda/product-hub/issues/2126 -->

### Camunda 8 REST API Query API <span class="badge badge--medium" title="This feature affects APIs">API</span>

You can now use a single Query API in the Camunda 8 REST API to find process and decision data instead of using multiple component APIs.

For example, send a request to the [Search decision definitions](/apis-tools/camunda-api-rest/specifications/search-decision-definitions.api.mdx) endpoint to search for decision definitions.

New Query API endpoints are added as follows:

- Decision definitions
- Decision instances
- Decision requirements
- Flownode instances
- Incidents
- Process definitions
- Process instances
- User tasks
- Variables

To learn more about these endpoints, see the [Camunda 8 REST API](/apis-tools/camunda-api-rest/camunda-api-rest-overview.md#query-api) documentation.

### Amazon OpenSearch Optimize support <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Optimize">Optimize</span>

Camunda 8 Self-Managed now fully supports the use of Amazon OpenSearch with Optimize.

<!-- https://github.com/camunda/product-hub/issues/2473 -->

### Process instance migration <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Zeebe">Zeebe</span>

Enhanced process instance migration allows you to solve problems with process definitions and use the latest process improvements.

You can now migrate the following:

- Compensation boundary event subscriptions
- Escalation boundary events
- Escalation event subprocesses

To learn more about migration, see [process instance migration](/components/concepts/process-instance-migration.md).

<!-- https://github.com/camunda/product-hub/issues/1314 -->

### Camunda Exporter <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

A new Camunda Exporter brings the importer and archiving logic of web components (Tasklist and Operate) closer to the distributed platform (Zeebe). The index schema is also being harmonized.

To learn more about this feature, see the [Camunda Exporter documentation](/self-managed/zeebe-deployment/exporters/camunda-exporter.md).

### Backup and restore improvements <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

Camunda backups have been improved and made easier to use. The web application backups are now merged together under one endpoint.

<!-- https://github.com/camunda/camunda/issues/24456 -->

### Connector Runtime <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Connectors">Connectors</span>

#### Spring SDK and Camunda 8 REST API Migration

The Connectors experience is enhanced with the migration from the Spring Zeebe to the Camunda 8 REST API, and the removal of dependency on the Operate client.
