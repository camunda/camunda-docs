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

## 8.8.0-alpha6

| Release date | Changelog(s)                                                                                                                                                                               | Blog                                                                              |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| 8 July 2025  | <ul><li>[ Camunda 8 core ](https://github.com/camunda/camunda/releases/tag/8.8.0-alpha6)</li><li>[ Connectors ](https://github.com/camunda/connectors/releases/tag/8.8.0-alpha6)</li></ul> | [Release blog](https://camunda.com/blog/2025/06/camunda-alpha-release-july-2025/) |

### Bitbucket sync <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Web Modeler">Web Modeler</span>

<!-- https://github.com/camunda/product-hub/issues/2507 -->

Camunda 8 now supports integration with [Atlassian Bitbucket](https://bitbucket.org/product/), in addition to GitHub, GitLab, and Azure DevOps.

- This helps customers who use Jira for their development processes.
- Organization owners and administrators can connect their Web Modeler process applications to Bitbucket, allowing users to keep their Web Modeler, Desktop Modeler, and official version control projects synced.

To learn more, see [Git sync](/components/modeler/web-modeler/git-sync.md?platform=bitbucket).

### Camunda 8 REST API renamed to Orchestration Cluster API <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects APIs">API</span>

<!-- https://github.com/camunda/product-hub/issues/2793 -->

The Camunda 8 REST API is now called the **Orchestration Cluster API**.

- This name better reflects its role as a unified REST API for interacting with entities in a [Camunda 8 orchestration cluster](/reference/glossary.md#orchestration-cluster), such as processes, tasks, and variables.
- The functionality and structure of the API remain unchanged. The name change improves clarity and onboarding across Camunda documentation and resources.

To learn more, see [Orchestration Cluster API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md).

### Connectors <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Connectors">Connectors</span> {#connectorsalpha6}

#### AI Agent connector

<!-- https://github.com/camunda/camunda-docs/pull/5942 -->
<!-- https://github.com/camunda/camunda-docs/pull/6068 -->

- **Structured outputs/JSON mode**: [Configurable response formats](../../../components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md#response) allow you to choose whether the connector returns plain text or JSON for downstream processing. For some models, you can define a JSON schema for returned data.
- **Conversation history storage**: History can now be stored in [Camunda's document storage](../../../components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md#memory) rather than in process variables—allowing longer histories without process variable size limits.

To learn more, see [AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md).

#### Intrinsic functions

<!-- https://github.com/camunda/camunda-docs/pull/5934 -->

A new `getJson` intrinsic function accepts a document and an optional FEEL expression. It extracts and returns content from a JSON document as an object.

- The optional FEEL expression parameter specifies the part that will be extracted from the JSON document content.
- If not provided, the whole document is returned as a JSON object.

To learn more, see [intrinsic functions](/components/connectors/use-connectors/intrinsic-functions.md).

### Dynamic partition scaling <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Zeebe">Zeebe</span>

<!-- https://github.com/camunda/product-hub/issues/2226 -->

You can now add new Zeebe partitions to a running cluster.

- Scaling can be performed concurrently when the cluster is running, with zero downtime.
- New process instances also start on new partitions, distributing cluster load evenly across partitions.
- Process instances do not migrate between partitions, so it can take time for the cluster to reach equilibrium.
- New partitions do not take part in correlating messages/signals, except for message/signal start events.

:::note
This feature is not yet fully compatible with backup/restore.
:::

### Helm charts <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

#### Alternative container images

<!-- https://github.com/camunda/product-hub/issues/2826 -->

Camunda now provides alternative container images to the previously used Bitnami images. These images are hosted on `registry.camunda.cloud`.

- From version **8.8**, these are the default supported images, offering better security and faster patch delivery.
- To use them, update your Helm deployment to reference the `values-images-ee.yml` file. See the [installation guide](/self-managed/setup/install.md) for details.

#### Configurable volumes

<!-- https://github.com/camunda/product-hub/issues/2597 -->

The Helm chart now supports configurable volumes. You can define `PersistentVolumeClaims` or continue using `EmptyDir` through `values.yaml`.

### Tasklist uses the Orchestration Cluster API <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Tasklist">Tasklist</span>

<!-- https://github.com/camunda/product-hub/issues/2516 -->

Tasklist now uses the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md), replacing the soon-to-be-deprecated Tasklist V1 API.

- This change improves compatibility with Camunda 8 RDBMS support and continues to work with Elasticsearch/OpenSearch.
- It ensures consistent functionality, better performance, and access to new features—without breaking existing workflows.

### User task listener types <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Tasklist">Tasklist</span>

New user task listener types are available:

#### `creating` event

<!-- https://github.com/camunda/product-hub/issues/2625 -->

This event triggers before a user task is created.

| Functionality                  | Description                                                                                                      |
| :----------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| Configurable creation listener | Executes logic before a task appears to users. Task is visible only after all listener jobs finish.              |
| Controlled task initialization | The creation continues only after listeners succeed. Incidents are raised if logic fails, enabling safe retries. |
| Operate UI insights            | A “Creating” event appears in the listener tab in Operate. Incidents are flagged for troubleshooting.            |
| Assign user task               | Assign a task programmatically during creation, useful when assignment depends on an external system.            |

#### `canceling` event

<!-- https://github.com/camunda/product-hub/issues/2657 -->

This event triggers when a user task is canceled (e.g., by a boundary event or process termination).

| Functionality                     | Description                                                                                               |
| :-------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| Configurable cancelation listener | Executes logic when a task is canceled. Allows inspection or modification of task data before completion. |
| Consistent lifecycle control      | Cancelation waits for listener logic to complete. Failures can raise incidents for safe retry.            |
| Operate UI insights               | A “Canceling” event is shown in the listener tab. Incidents are highlighted for visibility.               |

To learn more, see [user task listeners](/components/concepts/user-task-listeners.md).

### Documentation

#### Get started updates <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

<!-- https://github.com/camunda/product-hub/issues/2751 -->

The getting started documentation now includes:

- Example BPMN files and Spring Boot/NodeJS starter projects
- Practical code snippets, such as payment handling
- Updated code to match recent Camunda versions
- Annotations in BPMN files to guide usage and explain results

## 8.8.0-alpha5

| Release date | Changelog(s)                                                                                                                                                                               | Blog                                                                              |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| 10 June 2025 | <ul><li>[ Camunda 8 core ](https://github.com/camunda/camunda/releases/tag/8.8.0-alpha5)</li><li>[ Connectors ](https://github.com/camunda/connectors/releases/tag/8.8.0-alpha5)</li></ul> | [Release blog](https://camunda.com/blog/2025/05/camunda-alpha-release-june-2025/) |

### Agentic orchestration

The following [agentic orchestration](/components/agentic-orchestration/agentic-orchestration.md) features are available in this alpha release:

#### AI Agent connector <span class="badge badge--medium" title="This feature affects Connectors">Connectors</span><span class="badge badge--medium" title="This feature affects Web Modeler">Web Modeler</span><span class="badge badge--medium" title="This feature affects Desktop Modeler">Dektop Modeler</span>

The AI Agent connector enables AI agents to integrate with an LLM to provide interaction/reasoning capabilities. This connector is designed for use with an [ad-hoc sub-process](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md) in a [feedback loop](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-example.md), providing automated user interaction and tool selection.

This connector provides:

- Support for different LLM providers, such as OpenAI or Anthropic.
- Conversational/short-term memory handling to enable feedback loops and follow-up tasks.
- Tool resolution and orchestration through tools defined in an ad-hoc sub-process.

To learn more about this connector, see [AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md).

<!-- https://github.com/camunda/product-hub/issues/2779 -->

#### Vector database connector <span class="badge badge--medium" title="This feature affects Connectors">Connectors</span>

The vector database connector allows embedding, storing, and retrieving Large Language Model (LLM) embeddings. This enables building AI-based solutions for your organizations, such as context document search, long-term LLM memory, and agentic AI interaction in combination with the AI Agent connector (RAG).

To learn more about this connector, see [vector database connector](/components/connectors/out-of-the-box-connectors/embeddings-vector-db.md).

<!-- https://github.com/camunda/product-hub/issues/2744 -->

### Azure DevOps integration for Git sync <span class="badge badge--medium" title="This feature affects Web Modeler">Web Modeler</span>

Camunda now supports [an integration with Azure DevOps](/components/modeler/web-modeler/git-sync.md) that allows for direct syncing with Azure repositories.

<!-- https://github.com/camunda/product-hub/issues/2580 -->

### FEEL Copilot <span class="badge badge--medium" title="This feature affects Web Modeler">Web Modeler</span>

Chat with the AI FEEL Copilot for help generating FEEL (Friendly Enough Expression Language) expressions in Web Modeler.

To learn more about this feature, see [FEEL Copilot](/components/early-access/alpha/feel-copilot/feel-copilot.md).

:::note
The FEEL Copilot is released as an [early access alpha feature](/components/early-access/alpha/alpha-features.md) to allow you to test and participate in development by sharing feedback before general availability, and is subject to alpha feature limitations.
:::

<!-- https://github.com/camunda/web-modeler/issues/14223 -->

### FEEL Playground <span class="badge badge--medium" title="This feature affects Web Modeler">Web Modeler</span>

Use the FEEL Playground to validate and troubleshoot your FEEL expressions when modeling process diagrams in Web Modeler.

To learn more about this feature, see [FEEL Playground](/components/modeler/feel/feel-playground.md).

<!-- https://github.com/camunda/camunda-docs/issues/5611 -->

### Identity <span class="badge badge--medium" title="This feature affects Identity">Identity</span> <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span>

Camunda’s new Identity service enhances authentication and authorization for Self-Managed and SaaS environments:

| Feature/enhancement               | Description                                                                                                                                                                                                                                                             |
| :-------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Self-Managed Identity management  | Admins can create and manage users, groups, roles, and memberships directly in the Identity database.                                                                                                                                                                   |
| OIDC integration                  | Integrate external identity providers (IdP) such as Keycloak and Microsoft Entra.                                                                                                                                                                                       |
| Role-based access control (RBAC)  | Assign roles and group permissions on a per-resource basis for fine-grained access control. Supported resources include Authorization, Claim Mapping Rules, Messages, Batches, Applications, Tenants, Deployments, Process Definitions, Decision Definitions, and more. |
| Flexible mapping                  | Map users, groups, and roles to resource authorizations and tenants. Leverage OIDC token claims and application/client mappings to streamline permission assignments.                                                                                                   |
| Migration support                 | Simplified migration tools make it easy for existing customers to transition to the new service.                                                                                                                                                                        |
| Organizational Identity           | In SaaS environments, integrate your own IdP to manage organizational users and assign resources cluster-by-cluster.                                                                                                                                                    |
| Cluster-specific Roles and Groups | In SaaS environments, manage distinct roles, groups, and authorizations for each cluster independently.                                                                                                                                                                 |

#### Identity management for SaaS clusters <span class="badge badge--long" title="This feature affects SaaS">SaaS</span>

[Orchestration cluster Identity](/components/identity/identity-introduction.md) is now available for SaaS clusters. Starting with this alpha version, you can manage groups, roles, and authorizations at the cluster level.

The following known limitations apply for this alpha version release:

| Known limitation                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authorizations                        | <p><ul><li><p>Before enabling authorization checks in the cluster settings, users must assign themselves to the admin role in Identity for the Orchestration cluster.</p><p>**Note:** As authorizations are disabled by default, no changes are required for initial access.</p></li><li><p>Authorizations cannot be assigned to users via the UI, only to groups.</p></li><li><p>Authorizations are not correctly loaded in the UI.</p></li></ul></p> |
| Navigation, Notifications, and Logout | <p><ul><li><p>Links to the other Camunda components in the Orchestration cluster web applications (Operate, Tasklist, Identity) do not currently work.</p></li><li><p>SaaS notifications are not displayed in Orchestration cluster components.</p></li><li><p>Log out from Orchestration cluster web applications is not fully functional.</p></li></ul></p>                                                                                          |
| Documentation                         | Documentation is incomplete.                                                                                                                                                                                                                                                                                                                                                                                                                           |

#### Identity management for Helm Chart setups <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

[Orchestration cluster Identity](/self-managed/orchestration-identity/orchestration-identity.md) is now available for OIDC setups in [Helm chart deployments](/self-managed/setup/install.md). Starting with this alpha version, you can configure the Orchestration cluster components to use the identity provider (IdP) of your choice and enable single sign-on (SSO).

The following known limitations apply for this alpha version release:

| Known limitation | Description                                                                                                                                                              |
| :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authorizations   | <p><ul><li><p>Authorizations cannot be assigned to users via the UI, only to groups.</p></li><li><p>Authorizations are not correctly loaded in the UI.</p></li></ul></p> |
| Logout           | Log out from Orchestration cluster web applications is not fully functional.                                                                                             |
| Documentation    | Documentation is incomplete.                                                                                                                                             |

<!-- https://github.com/camunda/product-hub/issues/2222 -->

### React to expired messages with a custom exporter

Camunda now introduces a mechanism to react to expired messages. The original message is retrieved from the primary storage upon message expiration and the expiry event is enhanced with the original message. Existing functionality remains unchanged, so there is no disruption for current customers or custom exporters.

With these updates, developers can subscribe to the expired messages through a custom exporter, examine the event content, and optionally re-publish or handle the message differently. By providing an enhanced event and re-publish flow, this feature strengthens reliability and transparency in business processes without requiring a major upgrade or modifying existing exporters.

<!-- https://github.com/camunda/product-hub/issues/2796 -->

### RPA worker offline installer

This feature introduces an offline installer package for the Camunda [RPA](/components/rpa/overview.md) worker, allowing installation without internet connectivity. The offline installer removes reliance on external repositories or downloads, ensuring consistent, secure, and hassle-free deployment into air-gapped or restricted environments.

<!-- https://github.com/camunda/product-hub/issues/2786 -->

### Tasklist frontend application migration to use Orchestration cluster REST API <span class="badge badge--medium" title="This feature affects Tasklist">Tasklist</span>

The Tasklist frontend application is transitioning from the soon-to-be-deprecated Tasklist V1 API to the unified Orchestration cluster REST API.

- This ensures Tasklist remains fully compatible with Camunda 8’s new RDBMS support while continuing to work seamlessly with Elasticsearch and OpenSearch.
- You can expect consistent functionality across different data layers, improved performance, and access to new platform features - all without losing existing capabilities or disrupting task management workflows.

<!-- https://github.com/camunda/product-hub/issues/2516 -->

## 8.8.0-alpha4

| Release date | Changelog(s)                                                                                                                                                                               | Blog                                                                             |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------- |
| 13 May 2025  | <ul><li>[ Camunda 8 core ](https://github.com/camunda/camunda/releases/tag/8.8.0-alpha4)</li><li>[ Connectors ](https://github.com/camunda/connectors/releases/tag/8.8.0-alpha4)</li></ul> | [Release blog](https://camunda.com/blog/2025/05/camunda-alpha-release-may-2025/) |

### Camunda Process Test H2 data layer support <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Web Modeler">Zeebe</span> {#h2support}

<!-- https://github.com/camunda/product-hub/issues/2687 -->

Camunda Process Test now supports using the [H2 Database Engine](https://www.h2database.com/html/main.html) as the default embedded data layer.

- H2 is now automatically provisioned when integrating the Camunda Process Test libraries, eliminating manual database configuration and reducing memory footprint.
- H2 support streamlines the developer experience for your Spring Boot and plain Java projects. Process testing is now faster to set up, simpler to maintain, and easier to integrate with your continuous integration workflows.

To learn more about Camunda Process Test, see [Camunda Process Test](/apis-tools/testing/getting-started.md).

### Connector manage and run supports multiple runtimes <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Console">Console</span> {#connector-management}

<!-- https://github.com/camunda/product-hub/issues/2750 -->

Connector manage and run in Console now supports management of multiple connector runtime instances.

To learn more about this feature, see [manage your connectors](/components/console/manage-clusters/manage-connectors.md).

### Connectors <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Connectors">Connectors</span> {#connectorsalpha4}

#### Email connector {#emailalpha4}

<!-- https://github.com/camunda/connectors/pull/4657 -->

The Email connector now exposes the `Message-ID` provided by the client in the connector response payload. This allows for improved traceability, easier correlation between sent messages and logs, and better integration with downstream systems that rely on `Message-ID`.

For example:

```json
{
  "sent": true,
  "subject": "Email subject"
  "messageId": "<abc123@clientdomain.com>"
}
```

:::note
This change is backwards-compatible and does not require any action. You can now optionally use the `messageId` field for enhanced tracking when parsing connector responses.
:::

#### Hubspot connector {#hubspotalpha4}

<!-- https://github.com/camunda/product-hub/issues/2398 -->

Hubspot connector enhancements include:

- The [Get contact by ID](/components/connectors/out-of-the-box-connectors/hubspot.md#get-contact-by-id) operation now supports the retrieval of properties and default contact properties.
- The new [Enroll contact to workflow](/components/connectors/out-of-the-box-connectors/hubspot.md#enroll-contact-to-workflow) operation allows you to enroll contacts into a specified workflow.

To learn more about this connector, see [HubSpot connector](/components/connectors/out-of-the-box-connectors/hubspot.md).

### Desktop Modeler settings <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Desktop Modeler">Desktop Modeler</span>

<!-- https://github.com/camunda/product-hub/issues/2491 -->

The new **Settings** window in Desktop Modeler allows you to configure the application and customize your modeling experience. You can select your default execution platform version, along with other options that were previously only available as flags.

To learn more about these settings, see [Desktop Modeler settings](/components/modeler/desktop-modeler/settings/settings.md).

### Version description<span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Web Modeler">Web Modeler</span>

<!-- https://github.com/camunda/web-modeler/issues/12057 -->

Use the version **Description** field to track changes alongside the version tag (for example, as a change log or Git commit message). This helps make versioning more intuitive and collaborative, keeps teams aligned, and reduces ambiguity.

To learn more about versioning your diagrams, see [versions](components/modeler/web-modeler/versions.md).

### Web Modeler cluster basic authentication <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Web Modeler">Web Modeler</span>

<!-- https://github.com/camunda/web-modeler/issues/13707 -->

As well as bearer token and client credentials authentication, you can now configure Web Modeler in Self-Managed to use basic authentication for cluster access.

- To use basic authentication, set the `CAMUNDA_MODELER_CLUSTERS_0_AUTHENTICATION` environment variable value to `BASIC`.
- Web Modeler sends a username and password with every request to one of the cluster components (Zeebe, Operate, Tasklist).

To learn more about basic authentication, see [available authentication methods](/self-managed/modeler/web-modeler/configuration/configuration.md#available-authentication-methods).

## 8.8.0-alpha3

| Release date  | Changelog(s)                                                                                                                                                                               | Blog |
| :------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--- |
| 08 April 2025 | <ul><li>[ Camunda 8 core ](https://github.com/camunda/camunda/releases/tag/8.8.0-alpha3)</li><li>[ Connectors ](https://github.com/camunda/connectors/releases/tag/8.8.0-alpha3)</li></ul> | -    |

<!-- https://github.com/camunda/product-hub/issues/2630 -->

### Ad-hoc sub-process activation API & completion configuration <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span> {#adhocsubprocess}

Agentic process orchestration enhancements include:

- An optional `completionCondition` boolean expression for ad-hoc sub-processes that is evaluated every time an inner element is completed. A `cancelRemainingInstances` boolean attribute can also be configured to influence the ad-hoc sub-process behavior when the completion condition is met.
- An [Activate activities within an ad-hoc sub-process](/apis-tools/orchestration-cluster-api-rest/specifications/activate-ad-hoc-sub-process-activities.api.mdx) API used to activate selected activities within an ad-hoc sub-process.
- A [Search activatable activities (alpha)](/apis-tools/orchestration-cluster-api-rest/specifications/search-ad-hoc-sub-process-activities.api.mdx) API used to search for activatable activities within ad-hoc sub-processes.

To learn more about these features, see [ad-hoc sub-processes](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md).

<!-- https://github.com/camunda/product-hub/issues/2585 -->

### Advanced User Task Listeners for Updating Events <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Tasklist">Tasklist</span> {#listeners}

Advanced User Task Listeners for Updating Events allow you to define listeners that trigger whenever certain task properties or variables change.

- These listeners generate jobs similar to other event-based task listeners, granting direct access to task data as well as the ability to accept or roll back updates (in certain scenarios).
- Operators can also view, manage, and resolve incidents caused by these listeners in Operate, ensuring a unified and transparent approach to handling task changes.

To learn more about this feature, see [advanced user task listeners for updating events](/components/concepts/user-task-listeners.md).

<!-- https://github.com/camunda/product-hub/issues/2398 -->

### HubSpot connector <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Connectors">Connectors</span> {#hubspot}

Use the new outbound HubSpot connector to connect your BPMN service with [HubSpot](https://hubspot.com/) and manage your HubsSpot contacts, companies, and deals.

This connector supports the following operations:

- Contacts: Get all contacts, Get contact by id, Get multiple contacts by id, Search contact, Create contact, Update contact, Delete contact.
- Companies: Get all companies, Get company by id, Search company, Get all contacts of a company, Add contact to company, Remove contact from company, Create company, Delete company.
- Deals: Get all deals, Get deal by id, Search deal, Delete deal.

To learn more about this connector, see [HubSpot connector](/components/connectors/out-of-the-box-connectors/hubspot.md).

## 8.8.0-alpha2

| Release date  | Changelog(s)                                                                                                                                                                               | Blog                                                                               |
| :------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| 11 March 2025 | <ul><li>[ Camunda 8 core ](https://github.com/camunda/camunda/releases/tag/8.8.0-alpha2)</li><li>[ Connectors ](https://github.com/camunda/connectors/releases/tag/8.8.0-alpha2)</li></ul> | [Release blog](https://camunda.com/blog/2025/03/camunda-alpha-release-march-2025/) |

### Camunda Spring Boot SDK for the C8 REST API

A Spring Boot SDK is provided for the Orchestration cluster REST API to unify process management, user tasks, and identity features under a single dedicated starter. This simplifies the interaction between a Spring Boot application and Camunda 8, allowing you to:

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

### Orchestration cluster REST API Query API <span class="badge badge--medium" title="This feature affects APIs">API</span>

You can now use a single Query API in the Orchestration cluster REST API to find process and decision data instead of using multiple component APIs.

For example, send a request to the [Search decision definitions](/apis-tools/orchestration-cluster-api-rest/specifications/search-decision-definitions.api.mdx) endpoint to search for decision definitions.

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

To learn more about these endpoints, see the [Orchestration cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md#query-api) documentation.

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

#### Spring SDK and Orchestration cluster REST API Migration

The Connectors experience is enhanced with the migration from the Spring Zeebe to the Orchestration cluster REST API, and the removal of dependency on the Operate client.
