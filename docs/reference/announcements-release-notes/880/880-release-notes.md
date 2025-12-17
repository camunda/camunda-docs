---
id: 880-release-notes
title: "8.8 Release notes"
sidebar_label: Release notes
description: "Release notes for 8.8, including alphas"
toc_min_heading_level: 2
toc_max_heading_level: 2
keywords: ["8.8 release notes", "release notes for 8.8", "release notes"]
page_rank: 90
---

These release notes identify the main new features included in the 8.8 minor release, including [alpha feature releases](/components/early-access/alpha/alpha-features.md).

| Minor release date | Scheduled end of maintenance | Changelog(s)                                                                | Release blog | Upgrade guides                                                                                 |
| ------------------ | ---------------------------- | --------------------------------------------------------------------------- | ------------ | ---------------------------------------------------------------------------------------------- |
| 14 October 2025    | 13 April 2027                | [Patch Releases and Changelogs](#technical-changelogs-for-all-88x-releases) | -            | [Upgrade guides](/reference/announcements-release-notes/880/whats-new-in-88.md#upgrade-guides) |

:::info 8.8 resources

- See [release announcements](/reference/announcements-release-notes/880/880-announcements.md) to learn more about supported environment changes and breaking changes or deprecations.
- See [What's new in Camunda 8.8](/reference/announcements-release-notes/880/whats-new-in-88.md) for important changes to consider when planning your upgrade from Camunda 8.7.
- Refer to the [quality board](https://github.com/orgs/camunda/projects/187/views/15) for an overview of known bugs by component and severity.

:::

## Agentic orchestration

<div class="release"><span class="badge badge--medium" title="This feature affects agentic orchestration">Agentic orchestration</span><span class="badge badge--medium" title="This feature affects ai agents">AI agents</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span></div>

Camunda agentic orchestration allows you to build and orchestrate AI agents within your BPMN-based workflows, enabling human tasks, deterministic rule sets, and AI-driven decisions to collaborate in a robust, end-to-end process.

<p><a href="../../../../components/agentic-orchestration/" class="link-arrow">Camunda Agentic orchestration</a></p>

Use the following new features to build and integrate AI agents into your processes:

<table className="table-callout">
<tr>
    <td width="30%">**Feature**</td>
    <td>**Description**</td>
</tr>
<tr>
    <td>[AI agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md)</td>
    <td>Enables AI agents to integrate with an LLM to provide interaction/reasoning capabilities. This connector is designed for use with an ad-hoc sub-process in a feedback loop, providing automated user interaction and tool selection.</td>
</tr>
<tr>
    <td>[MCP Client connector](/components/early-access/alpha/mcp-client/mcp-client.md)</td>
    <td>Connect an AI agent connector to tools exposed by [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) servers.</td>
</tr>
<tr>
    <td>[Ad-hoc tools schema resolver connector](/components/connectors/out-of-the-box-connectors/agentic-ai-ahsp-tools-schema-resolver.md)</td>
    <td>Can be used independently with other AI connectors for direct LLM interaction. Use this connector if you don’t want to use the AI agent connector but still want to resolve tools for an ad-hoc sub-process or debug tool definitions.</td>
</tr>
<tr>
    <td>[Vector database connector](/components/connectors/out-of-the-box-connectors/embeddings-vector-db.md)</td>
    <td>Allows embedding, storing, and retrieving LLM embeddings. Use this connector to build AI-based solutions such as context document search, long-term memory for LLMs, and agentic AI interaction.</td>
</tr>
<tr>
    <td>[fromAi() FEEl function](/components/modeler/feel/builtin-functions/feel-built-in-functions-miscellaneous.md)</td>
    <td>Use in combination with the AI Agent connector. See [AI Agent tool definitions](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-tool-definitions.md).</td>
</tr>
</table>

## APIs & tools

<div class="release"><span class="badge badge--medium" title="This feature affects APIs & tools">APIs & tools</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span></div>

### APIs

Use the Orchestration Cluster REST API to interact programmatically with the Orchestration Cluster.

- This replaces component APIs (Operate API, Tasklist API, Zeebe API, and much of Identity API) with a single set of endpoints.
- This unified API supports both organizational (SaaS) and Self-Managed deployments.
- This is now the default and recommended integration point for developers, operators, and automation solutions.
- You can also use a Swagger UI to interact with this API.

<p><a href="../../../../apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview/" class="link-arrow">Orchestration Cluster API</a></p>

### Camunda Java client

<!-- https://github.com/camunda/product-hub/issues/2248 -->

The new Camunda Java Client replaces the Zeebe Java Client as the official Java library for building process applications that integrate with Camunda 8. This client provides everything you need to programmatically interact with the Orchestration Cluster, whether you are orchestrating microservices, managing human tasks, or visualizing process data.

<p><a href="../../../../apis-tools/java-client/getting-started/" class="link-arrow">Get started with the Camunda Java client</a></p>

### Camunda Process Test H2 data layer support

<!-- https://github.com/camunda/product-hub/issues/2687 -->

Camunda Process Test supports using the [H2 Database Engine](https://www.h2database.com/html/main.html) as the default embedded data layer.

- H2 is now automatically provisioned when integrating the Camunda Process Test libraries, eliminating manual database configuration and reducing memory footprint.
- H2 support streamlines the developer experience for your Spring Boot and plain Java projects. Process testing is now faster to set up, simpler to maintain, and easier to integrate with your continuous integration workflows.

<p><a href="../../../../apis-tools/testing/getting-started" class="link-arrow">Camunda Process Test</a></p>

### Camunda Spring Boot Starter

<!-- https://github.com/camunda/product-hub/issues/2249 -->

The Camunda Spring Boot Starter replaces the Spring Zeebe SDK to simplify interaction between a Spring Boot application and Camunda 8, allowing you to:

- Easily integrate process entity management and queries within your workflows.
- Seamlessly configure endpoints and authentication via Spring Boot auto-configuration, minimizing boilerplate code.
- Rely on an official, standardized approach to guarantee consistency and reduce maintenance costs when upgrading.
- Based on Spring Boot 3.5 ([version compatibility matrix](/apis-tools/camunda-spring-boot-starter/getting-started.md#version-compatibility)).

<p><a href="../../../../apis-tools/camunda-spring-boot-starter/getting-started/" class="link-arrow">Get started with the Camunda Spring Boot Starter</a></p>

### Process instance tags

Introduce optional, immutable **process instance tags** set at creation for lightweight routing, correlation, and future prioritization without inspecting large variable payloads. See [process instance creation](/components/concepts/process-instance-creation.md#tags) and [job workers](/components/concepts/job-workers.md#tags).

<p><a href="../../../../components/concepts/process-instance-creation/" class="link-arrow">Process instance creation</a></p>

### Public API

Find out what’s included in Camunda 8's public API, the policies around versioning, and what to expect when upgrading.

- The public API is the official contract between Camunda and its users under SemVer.
- No breaking changes will be made to the public API in minor or patch releases.
- You can safely build on these interfaces with the expectation of stability and backward compatibility.

<p><a href="../../../../reference/public-api/" class="link-arrow">Public API</a></p>

### Run process segment

<!-- https://github.com/camunda/product-hub/issues/2453 -->

Manually execute and test individual tasks or segments (connectors, RPA bots, IDP extractions) without running full processes, improving debugging and development efficiency.

<p><a href="../../../../components/concepts/process-instance-creation/#run-process-segment" class="link-arrow">Run process segment</a></p>

## Connectors

<div class="release"><span class="badge badge--medium" title="This feature affects connectors">Connectors</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span></div>

### Ad-hoc tools schema resolver connector

This connector implements the tool resolution part of the AI Agent connector, but can also be used independently with other AI connectors for direct LLM interaction. Use this connector if you don’t want to use the AI agent connector but still want to resolve tools for an ad-hoc sub-process or debug tool definitions.

<p><a href="../../../../components/connectors/out-of-the-box-connectors/agentic-ai-ad-hoc-tools-schema-resolver/" class="link-arrow">Ad-hoc tools schema resolver connector</a></p>

### AI Agent connector

<!-- https://github.com/camunda/product-hub/issues/2779 -->

Enable AI agents to integrate with an LLM to provide interaction/reasoning capabilities. Designed for use with an [ad-hoc sub-process](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md) in a [feedback loop](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-subprocess-example.md), providing automated user interaction and tool selection.

<p><a href="../../../../components/connectors/out-of-the-box-connectors/agentic-ai-aiagent/" class="link-arrow">AI Agent connector</a></p>

### Azure Blob Storage connector

<!-- https://github.com/camunda/product-hub/issues/2713 -->

Store and retrieve documents within Camunda workflows using Azure Blob Storage. Enables seamless document management directly within processes, improves efficiency, and reduces the need for custom integrations.

<p><a href="../../../../components/connectors/out-of-the-box-connectors/azure-blob-storage/" class="link-arrow">Azure Blob Storage connector</a></p>

### CSV connector (SaaS)

<!-- https://github.com/camunda/product-hub/issues/2398 -->

Read, filter, transform, and write CSV data within processes. Reduces technical debt, accelerates development, and broadens integration capabilities with native support for this universal data format.

<p><a href="../../../../components/connectors/out-of-the-box-connectors/csv/" class="link-arrow">CSV connector</a></p>

### Google Cloud storage connector

<!-- https://github.com/camunda/product-hub/issues/2712 -->

Store and retrieve documents directly within Camunda workflows, streamlining document management without custom development.

<p><a href="../../../../components/connectors/out-of-the-box-connectors/google-cloud-storage/" class="link-arrow">Google Cloud storage connector</a></p>

### Hubspot Connector

<!-- https://github.com/camunda/product-hub/issues/2398 -->

Connect your BPMN service with [HubSpot](https://hubspot.com/) and manage your HubsSpot contacts, companies, and deals.

<p><a href="../../../../components/connectors/out-of-the-box-connectors/hubspot/" class="link-arrow">HubSpot connector</a></p>

### MCP Client connector

<!-- https://github.com/camunda/product-hub/issues/2900 -->

Enable Camunda processes and AI agents to auto-discover and invoke external tools, eliminating hardwired connectors and enabling dynamic, metadata-driven tool integration.

<p><a href="../../../../components/early-access/alpha/mcp-client/" class="link-arrow">MCP client connector</a></p>

### Vector database connector

<!-- https://github.com/camunda/product-hub/issues/2744 -->
<!-- https://github.com/camunda/product-hub/issues/2779 -->

Enable embedding, storing, and retrieving Large Language Model (LLM) embeddings. Use to build AI-based solutions for your organizations, such as context document search, long-term LLM memory, and agentic AI interaction in combination with the AI Agent connector (RAG).

<p><a href="../../../../components/connectors/out-of-the-box-connectors/embeddings-vector-db" class="link-arrow">Vector database connector</a></p>

### Email connector `Message-ID`

<!-- https://github.com/camunda/connectors/pull/4657 -->

The Email connector now exposes the `Message-ID` provided by the client in the connector response payload. This allows for improved traceability, easier correlation between sent messages and logs, and better integration with downstream systems that rely on `Message-ID`.

:::note
This change is backwards-compatible and does not require any action. You can now optionally use the `messageId` field for enhanced tracking when parsing connector responses.
:::

### Intrinsic functions

<!-- https://github.com/camunda/camunda-docs/pull/5934 -->

A new `getJson` intrinsic function accepts a document and an optional FEEL expression. It extracts and returns content from a JSON document as an object.

- The optional FEEL expression parameter specifies the part that will be extracted from the JSON document content.
- If not provided, the whole document is returned as a JSON object.

<p><a href="../../../../components/connectors/use-connectors/intrinsic-functions" class="link-arrow">Intrinsic functions</a></p>

### Job header binding

<!-- https://github.com/camunda/connectors/issues/5131 -->

Use the `@Header` annotation to bind a header value (for example, a FEEL expression) to a model class.

### SQL connector Oracle database connection

<!-- https://github.com/camunda/connectors/issues/5074 -->

The SQL connector now supports Oracle Database connections.

<p><a href="../../../../components/connectors/out-of-the-box-connectors/sql" class="link-arrow">SQL connector</a></p>

## Console

<div class="release"><span class="badge badge--medium" title="This feature affects Console">Console</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span></div>

### Connector manage and run supports multiple runtimes

<!-- https://github.com/camunda/product-hub/issues/2750 -->
<!-- https://github.com/camunda/product-hub/issues/1933 -->

Connector manage and run in Console now supports management of multiple connector runtime instances.

<p><a href="../../../../components/console/manage-clusters/cluster-connectors" class="link-arrow">Manage your connectors</a></p>

### Docker distribution

<!-- https://github.com/camunda/product-hub/issues/2242 -->

Console is now available as a Self-Managed Docker distribution. Deploy Camunda Console using a Docker image, run Console outside Kubernetes using Docker Compose or other container services, and use Console with Camunda 8 clusters deployed via Docker.

<p><a href="../../../../self-managed/quickstart/developer-quickstart/docker-compose" class="link-arrow">Docker Compose developer quickstart</a></p>

### Regions

New regions are available for SaaS clusters on Amazon Web Services:

| Type                     | Region                              |
| :----------------------- | :---------------------------------- |
| AWS region               | Singapore (ap-southeast-1)          |
| Secondary backups region | Ireland, Europe (eu-west-1)         |
| Secondary backups region | Jakarta, Indonesia (ap-southeast-3) |
| Secondary backups region | Oregon, North America (us-west-2)   |

Use these regions to:

- Improve overall processing speed and reduce latency if you operate in countries within that region.
- Keep cluster data within that country/region to support your local data residency and compliance needs.

<p><a href="../../../../components/saas/regions" class="link-arrow">Regions</a></p>

### Usage metrics for licence model and tenant

<!-- https://github.com/camunda/product-hub/issues/1979 -->

Usage metrics now support per-tenant reporting and align with Camunda’s updated licensing model based on the number of tenants.

## Desktop Modeler

<div class="release"><span class="badge badge--medium" title="This feature affects Desktop Modeler">Desktop Modeler</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span></div>

### Settings

<!-- https://github.com/camunda/product-hub/issues/2491 -->

The new **Settings** window in Desktop Modeler allows you to configure the application and customize your modeling experience. You can select your default execution platform version, as well as other options that were previously only available as flags.

<p><a href="../../../../components/modeler/desktop-modeler/settings/" class="link-arrow">Desktop Modeler settings</a></p>

## Helm chart deployment

<div class="release"><span class="badge badge--medium" title="This feature affects Helm charts">Helm charts</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span></div>

### Alternative container images

<!-- https://github.com/camunda/product-hub/issues/2826 -->

Camunda provides alternative container images to the previous Bitnami images, offering better security and faster patch delivery. From 8.8, these are the default supported images.

- These images are hosted on `registry.camunda.cloud`.
- To use them, update your Helm deployment to reference the `values-images-ee.yml` file.

<p><a href="../../../../self-managed/deployment/helm/install" class="link-arrow">Install Camunda with Helm</a></p>

### Configurable volumes

<!-- https://github.com/camunda/product-hub/issues/2597 -->

The Helm chart now supports configurable volumes. You can define `PersistentVolumeClaims` or continue using `EmptyDir` through `values.yaml`.

### ExtraVolumeClaimTemplates

You can now add custom `extraVolumeClaimTemplates` to the Zeebe/Core StatefulSet by supplying an array of templates in your Helm values file. This allows you to attach additional persistent volumes to each Zeebe/Core pod for use cases such as custom storage or log directories.

:::info important
Kubernetes does not allow you to change the `volumeClaimTemplates` of an existing StatefulSet. If you add, remove, or modify `extraVolumeClaimTemplates` after initial deployment, you must delete and recreate the StatefulSet (which will also delete the pods) for the changes to take effect. This may require additional planning and data migration steps to avoid data loss.
:::

### Common labels for Camunda resources

A new `commonLabels` value is now available and integrates with `camundaPlatform.labels`. This allows you to define mutable labels that are automatically applied to all Camunda resources. By setting `commonLabels`, you can ensure consistent labeling across deployments, making it easier to manage, organize, and identify resources within your Camunda environment.

### Configure Web Modeler replicas

The number of replicas for the Web Modeler REST API and web app deployments can be set with new configuration properties: `webModeler.restapi.replicas` and `webModeler.webapp.replicas`, respectively.

### Alternative infrastructure methods (Helm)

Production guidance now recommends running PostgreSQL, Elasticsearch / OpenSearch, and Keycloak using **managed or external services first**. If these are not available, use **vendor-supported operators** instead of Bitnami subcharts when moving beyond evaluation environments.

Why it matters:

- Managed services such as AWS RDS / Aurora, Amazon OpenSearch, and Azure Database for PostgreSQL provide automatic maintenance, scaling, and backups.
- Vendor-supported operators (CloudNativePG, Elastic / ECK, Keycloak Operator) automate upgrades, failover, backups, credentials, and certificate rotation when managed services aren’t available or suitable.
- Decouples critical data services from the Camunda Helm release cycle and values file structure, reducing blast radius and enabling independent scaling and maintenance.
- Enables faster CVE patch adoption and native observability through built-in monitoring and status conditions.
- Continue using Bitnami subcharts for local development and proofs of concept, evaluate managed services or vendor-supported operators for staging, and use managed or vendor-supported options for production.

Key updates in 8.8 documentation:

- A consolidated vendor-supported infrastructure guide with architecture topology and service hand-off points.
- Replacement examples for each subchart, including connection secrets, services, and TLS configuration.
- Clarified Keycloak Operator behavior: no embedded Service route by default; use Ingress or on-demand port-forwarding for initial administration.

### Reference architecture: Amazon EC2 (manual / VM)

New production reference architecture for running the Camunda 8 Orchestration Cluster directly on Amazon EC2 using Terraform to provision networking, IAM, and managed AWS services.

Highlights:

- Three-node Orchestration Cluster across three Availability Zones for balanced partition placement and quorum resilience.
- Managed OpenSearch (baseline 2.19) and optional Aurora PostgreSQL 17 to reduce operational overhead.
- Dual load balancer pattern (ALB for HTTP / web apps and REST, NLB for gRPC) supporting protocol-appropriate routing and future mTLS expansion.
- Optional VPN / bastion design for secure private subnet administration; security groups follow least-privilege principles.
- Modular Terraform stacks for network, security, compute, search, and database, with reusable outputs for automation or configuration management.

### Reference architecture: Azure AKS

New Kubernetes reference architecture for Microsoft Azure that combines AKS with Terraform for infrastructure and Helm for platform lifecycle management.

Highlights:

- Multi-AZ (zonal) AKS baseline with separate node pools for system and workload components when supported in the region.
- Flexible data layer options: managed or embedded PostgreSQL and Elasticsearch (Azure Database for PostgreSQL, or embedded Elasticsearch via chart deployment).
- Unified Identity and Ingress patterns for the Orchestration Cluster, including shared or split fronts, TLS termination choices, and private endpoints or internal load balancers.
- Azure-native networking and security: Private DNS, NSGs, and managed identities mapped to Camunda component requirements.
- Terraform + Helm separation enables idempotent infrastructure updates and predictable application rollouts.

See the reference architecture guides for full topology diagrams, sizing guidance, and migration considerations.

## Integrations

### Microsoft Teams

The new Camunda for Microsoft Teams app allows you to view, claim, and complete Camunda tasks directly in Microsoft Teams.

The app integration allows you to:

- Start processes from a channel, chat, or the app **Home** tab.
- Fill out start forms in Microsoft Teams and submit them to kick off workflows, with optional links to Operate for monitoring.

<p><a href="../../../../components/early-access/alpha/ms-teams/" class="link-arrow">Camunda for Microsoft Teams app</a></p>

:::note
The Microsoft Teams integration is released as an [early access](/components/early-access/overview.md) alpha feature to allow you to test and participate in development by sharing feedback before general availability, and is subject to alpha feature limitations.
:::

### SAP Advanced Event Mesh (AEM) connectivity

Connect Camunda directly to SAP Advanced Event Mesh (AEM) for event-driven process automation.

- New AEM connectors allow you to receive CloudEvents from SAP systems as BPMN messages and publish CloudEvents from Camunda to AEM.
- This enables seamless integration with SAP’s event-driven architecture, allowing your Camunda processes to react in real time to business events across SAP BTP, S/4HANA, or ECC.

<p><a href="../../../../components/camunda-integrations/sap/eventing" class="link-arrow">SAP Eventing with SAP Advanced Event Mesh</a></p>

### ServiceNow

Extend the power of your process automation by integrating Camunda with ServiceNow. This integration enables seamless communication between your BPMN workflows and ServiceNow IT Service Management (ITSM), helping you automate routine tasks and accelerate service delivery.

The ServiceNow integration allows you to:

- Manage ServiceNow data: Create, read, update, and delete records in any ServiceNow table directly from Camunda workflows.
- Trigger ServiceNow flows: Start automations built in ServiceNow's Flow Designer as part of an end-to-end process.
- Orchestrate ITSM processes: Integrate Camunda tasks with ServiceNow approvals, incidents, and service requests to create unified workflows.

<p><a href="../../../../components/camunda-integrations/servicenow/servicenow-integration/" class="link-arrow">ServiceNow integration</a></p>

## Intelligent document processing (IDP)

<div class="release"><span class="badge badge--medium" title="This feature affects IDP">IDP</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span></div>

### Bring your own model (BYOM)

When using an OpenAI Compatible provider, you can use your own model for document extraction. Any model provider that implements the `/chat/completions` API endpoint is supported.

Supported providers are:

- **AWS**: Amazon Web Services with Bedrock and Textract (supports both structured and unstructured extraction).
- **Azure**: Microsoft Azure with AI Document Intelligence and AI Foundry (unstructured extraction only).
- **GCP**: Google Cloud Platform with Vertex AI and Document AI (supports both structured and unstructured extraction).
- **OpenAI compatible**: Supports OpenAI and any provider implementing the OpenAI `/chat/completions` API (unstructured extraction only).

<p><a href="../../../../components/modeler/web-modeler/idp/idp-document-extraction/" class="link-arrow">Document extraction</a></p>

### Structured data form extraction

<!-- https://github.com/camunda/product-hub/issues/2694 -->

You can use form-based structured document extraction to capture data from structured documents.

- For example, you can use this extraction method for documents with a consistent layout, such as invoices, tax forms (for example, W-2s, VAT declarations), and loan or insurance applications.
- Projects can be shared organization-wide, enhancing accessibility to extraction capabilities.

<p><a href="../../../../components/modeler/web-modeler/idp/idp-structured-extraction" class="link-arrow">Extract structured data</a></p>

## Migration from Camunda 7 to Camunda 8

<div class="release"><span class="badge badge--medium" title="This feature affects DCamunda 7 migration">Camunda 7 migration</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span></div>

### Data migration tool

Use the Data Migrator to copy running process instances from Camunda 7 to Camunda 8.

- Copy running process instances (state-preserving).
- Copy process variables and their values.
- Handle problematic instances gracefully with retry options.
- Write custom code to intercept variable migration.

<p><a href="../../../../guides/migrating-from-camunda-7/migration-tooling/data-migrator" class="link-arrow">Data Migrator</a></p>

### Migration Analyzer & Diagram Converter

The Migration Analyzer & Diagram Converter helps you get a first understanding of migration tasks when moving from Camunda 7 to Camunda 8. It analyzes Camunda 7 model files (BPMN or DMN) and generates a list of tasks required for the migration.

It can also automatically convert these files from Camunda 7 format to Camunda 8 format (updating namespaces, XML structures/properties, and simple expression transforms), with a web UI and CLI that outputs XLSX/CSV reports, for prioritization and batch conversion.

<p><a href="../../../../guides/migrating-from-camunda-7/migration-tooling#migration-analyzer--diagram-converter" class="link-arrow">Migration Analyzer & Diagram Converter</a></p>

### Code conversion

Code conversion utilities provide code mapping tables, conversion patterns, and automatable refactoring recipes to systematically translate Camunda 7 implementation patterns to Camunda 8 equivalents.

<p><a href="../../../../guides/migrating-from-camunda-7/migration-tooling/code-conversion" class="link-arrow">Code conversion</a></p>

## Optimize

<div class="release"><span class="badge badge--medium" title="This feature affects Optimize">Optimize</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span></div>

### Amazon OpenSearch support

<!-- https://github.com/camunda/product-hub/issues/2473 -->

Camunda 8 Self-Managed now fully supports the use of Amazon OpenSearch with Optimize.

## Orchestration Cluster

<div class="release"><span class="badge badge--medium" title="This feature affects Orchestration Cluster">Orchestration Cluster</span><span class="badge badge--medium" title="This feature affects Zeebe">Zeebe</span><span class="badge badge--medium" title="This feature affects Operate">Operate</span><span class="badge badge--medium" title="This feature affects Tasklist">Tasklist</span><span class="badge badge--medium" title="This feature affects Identity">Identity</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span></div>

### Architecture

The primary architectural change in 8.8 is the consolidation of the core Zeebe, Operate, Tasklist, and Identity components into the Orchestration Cluster application as a single deployable artifact, distributed as a JAR file or Docker container.

This impacts how Camunda 8 is deployed, managed, and scaled.

- The Orchestration Cluster (previously automation cluster) is now the core component of Camunda 8.
- Use the Orchestration Cluster REST API to interact programmatically with the Orchestration Cluster.
- The new unified exporter architecture improves cluster management and data migration, bringing importer and archiving logic of web components (Tasklist and Operate) closer to the distributed platform (Zeebe). The index schema is also harmonized.
- The unified configuration for Orchestration Cluster components allows you to define cluster and component behavior.

<p><a href="../../../../reference/announcements-release-notes/880/whats-new-in-88/#orchestration-cluster" class="link-arrow">What's new in Camunda 8.8</a></p>

### Reference architecture: General updates

The 8.8 release cycle includes updates across multiple Self-Managed reference architecture guides and infrastructure baselines.

- **Managed search (EKS single-region and EC2)**: Upgraded OpenSearch from 2.15 to 2.19 to align with the latest [supported environments](/reference/supported-environments.md).
- **Database layer (EKS and EC2)**: Raised the Aurora PostgreSQL baseline from version 15 to 17. See the updated versions in [supported environments](/reference/supported-environments.md).
- **Identity and global architecture**: Standardized Keycloak on the Bitnami Premium 26 image. See [OIDC configuration](/self-managed/deployment/helm/configure/authentication-and-authorization/index.md).
- **Private access (OpenShift ROSA, EKS, EC2)**: Documented an optional VPN pattern. See [EC2 architecture](/self-managed/deployment/manual/cloud-providers/amazon/aws-ec2.md#architecture).
- **OpenShift (single and dual region)**: Updated validation and guidance for OpenShift 4.19. See [dual region guide](/self-managed/deployment/helm/cloud-providers/openshift/dual-region.md).
- **EKS networking**: Added alternative NAT gateway strategies. See [EKS Helm guide](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/eks-helm.md).
- **High availability**: Refreshed dual-region operational guides. See [EKS dual region](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/dual-region.md).
- **Core diagrams**: Updated generic reference architecture visuals for the unified Orchestration Cluster. See [reference architectures](/self-managed/reference-architecture/reference-architecture.md).
- **Terraform module upgrade**: Upgraded the AWS EKS Terraform module from v5 to v6. Review changes in [Terraform EKS setup](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/terraform-setup.md) before upgrading.

### Dynamic activation of ad-hoc sub-processes using job workers

<!-- https://github.com/camunda/product-hub/issues/2631 -->

Ad-hoc sub-process elements can be activated by job workers:

- Define a task in the process model.
- When the engine reaches the ad-hoc sub-process, a job is created. Completing this job with a job result lets you define which elements in the ad-hoc sub-process to activate.
- Once any flows in the ad-hoc sub-process complete, a new job is created, giving job workers control over what to do next.

### Dynamic partition scaling

<!-- https://github.com/camunda/product-hub/issues/2226 -->

You can now add new Zeebe partitions to a running cluster to increase capacity without downtime:

- New process instances will be started on new partitions immediately.
- Existing process instances do not migrate between partitions, so it can take time for the cluster to reach equilibrium.
- Existing messages remain on original partitions, potentially causing slight imbalances for message-heavy workloads (future updates will address this)

<p><a href="../../../../self-managed/components/orchestration-cluster/zeebe/operations/cluster-scaling" class="link-arrow">Cluster scaling</a></p>

### Identity and Management Identity

In Camunda 8.8, Orchestration Cluster Identity and Management Identity are two separate components used for Identity management, each with distinct areas of responsibility.

- **Identity**: Access and permission management for all Orchestration Cluster components: Zeebe, Operate, Tasklist, and the Orchestration Cluster REST and gRPC API.
- **Management Identity**: Continues to manage access for platform components such as Web Modeler, Console, and Optimize.

<p><a href="../../../../reference/announcements-release-notes/880/whats-new-in-88/#orchestration-cluster" class="link-arrow">What's new in Camunda 8.8</a></p>

### Migrate taken sequence flows flowing to the joining gateway

<!-- https://github.com/camunda/product-hub/issues/2913 -->

Enhanced migration now supports taken sequence flows leading to joining gateways:

- Define migration plans mapping active elements and taken sequence flows
- Configure plans via Operate UI or API

### Process instance migration

<!-- https://github.com/camunda/product-hub/issues/1314 -->

Enhanced process instance migration allows you to solve problems with process definitions and use the latest process improvements. You can now migrate compensation boundary event subscriptions, escalation boundary events, and escalation event subprocesses.

<p><a href="../../../../components/concepts/process-instance-migration/" class="link-arrow">Process instance migration</a></p>

### React to expired messages with a custom exporter

You can now use a custom exporter to react to expired messages.

- The original message is retrieved from primary storage upon expiration, and the expiry event enhanced with the original message.
- Existing functionality remains unchanged, so there is no disruption for current customers or custom exporters.

With these updates, developers can subscribe to the expired messages through a custom exporter, examine the event content, and optionally re-publish or handle the message differently.

### Run Orchestration Cluster without secondary storage

<!-- https://github.com/camunda/product-hub/issues/2897 -->

You can now run Orchestration Cluster in "Zeebe-only" mode without secondary storage:

- Ideal for setups not using Query APIs, Operate, or Tasklist
- Enable by setting `camunda.database.type=none`
- Starts only the required Zeebe components

### User task listeners

<!-- https://github.com/camunda/product-hub/issues/2126 -->

Task lifecycle management is enhanced with user task listeners, allowing users to react to specific user task lifecycle events.

- Process designers can now model task listeners for different events, such as `assigning` and `completing`.
- Developers can use the same job infrastructure to activate and complete task listener jobs.
- Operations engineers can easily check details of active and completed task listeners within instances, and efficiently resolve task listener incidents.

This enhancement streamlines operations and ensures smoother incident handling, improving time to unblock process execution.

<p><a href="../../../../components/concepts/user-task-listeners/" class="link-arrow">User task listeners</a></p>

### Zeebe-managed resilient batch operations

All batch operations, such as canceling or resolving incidents in bulk, are now handled by Zeebe instead of Operate.

- This change ensures region failovers in the multi-region setup no longer risk losing critical batch commands.
- Users will initiate and manage batch operations through the Orchestration Cluster REST API and the Operate UI, but the underlying processing occurs within Zeebe.
- By moving batch operations to the core engine, multi-region deployments gain reliability and resilience.

<!-- https://github.com/camunda/product-hub/issues/2420 -->

## Robotic Process Automation (RPA)

<div class="release"><span class="badge badge--medium" title="This feature affects RPA">RPA</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span></div>

### Multi-file script support

<!-- https://github.com/camunda/product-hub/issues/2710 -->

RPA supports multi-file script support to allow you to organize scripts modularly, reuse common automation components, and integrate existing Robot Framework scripts. The execution engine fully supports multi-file scripts and linked resources, improving scalability, maintainability, and flexibility for enterprise automation projects.

### RPA worker offline installer

<!-- https://github.com/camunda/product-hub/issues/2786 -->

An offline installer package for the [RPA](/components/rpa/overview.md) worker allows installation without internet connectivity. The offline installer removes reliance on external repositories or downloads, ensuring consistent, secure, and hassle-free deployment into air-gapped or restricted environments.

## Web Modeler

<div class="release"><span class="badge badge--medium" title="This feature affects Web Modeler">Web Modeler</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span></div>

### Bring your own model (BYOM)

BPMN Copilot and FEEL Copilot in the Web Modeler are now available for Camunda Self-Managed customers in a safe, secure way.

You can connect these features to your own AI provider and model, even fine-tuning the model yourself to improve its performance and relevance to your organization.

### CI/CD building blocks guide

<!-- https://github.com/camunda/product-hub/issues/2858 -->

Element templates documentation is improved to support scalable reuse of building blocks, focusing on CI/CD practices for managing templates across teams and environments.

Key updates include:

- Guidance on integrating element templates and dependencies into CI/CD pipelines
- Restructuring the documentation to improve discoverability and usability
- Tool-agnostic content covering Web Modeler, dependency management, and local development setups
- Moving relevant information from Connectors to the element templates section

<p><a href="../../../../components/modeler/element-templates/about-templates" class="link-arrow">Element templates in Modeler</a></p>

### Cluster basic authentication

<!-- https://github.com/camunda/web-modeler/issues/13707 -->

In addition to bearer token authentication, you can now configure Web Modeler in Self-Managed to use basic authentication for cluster access.

- Set the `CAMUNDA_MODELER_CLUSTERS_0_AUTHENTICATION` environment variable value to `BASIC`.
- Web Modeler sends a username and password with every request to the cluster.

<p><a href="../../../../self-managed/components/modeler/web-modeler/configuration/#available-authentication-methods" class="link-arrow">Available authentication methods</a></p>

### Element template editor onboarding

<!-- https://github.com/camunda/product-hub/issues/3021 -->

Web Modeler now provides a low-coder friendly UX for creating building blocks.
Whether you create an element template from scratch or from a task, you can quickly set and narrow down the properties so process developers using these templates can quickly and confidently wire building blocks together into an E2E process.

<p><a href="../../../../components/modeler/web-modeler/element-templates/element-template-generator" class="link-arrow">Generate an element template</a></p>

### Element template support for all tasks

<!-- https://github.com/camunda/product-hub/issues/2606 -->

You can now save any configured task as a reusable element template directly from the Web Modeler properties panel:

- Save configured tasks (service, user, send, receive, business rule, script tasks, or call activities) as templates.
- Edit templates to adjust input/output bindings, validation rules, categories, and more.
- Publish templates to your project or organization for reuse.

<p><a href="../../../../components/modeler/web-modeler/element-templates/save-as-element-templates" class="link-arrow">Save tasks as element templates</a></p>

### Unlock element template fields

<!-- https://github.com/camunda/product-hub/issues/2860 -->

Element template management is now more flexible for developers and DevOps teams.

- You can assign custom semantic IDs and use an intuitive versioning scheme, ensuring templates are portable and retain stable references across different environments.
- Template names and file names can be managed independently, and you can quickly import templates using copy and paste, git sync, or CI/CD pipeline.
- Safeguards now notify you of ID or version conflicts to prevent accidental overwrites when publishing templates.

<p><a href="../../../../components/modeler/web-modeler/element-templates/manage-element-templates/" class="link-arrow">Manage element templates</a></p>

### FEEL Copilot

<!-- https://github.com/camunda/web-modeler/issues/14223 -->

Chat with the AI FEEL Copilot for help generating FEEL (Friendly Enough Expression Language) expressions in Web Modeler.

<p><a href="../../../../components/early-access/alpha/feel-copilot/" class="link-arrow">FEEL Copilot</a></p>

### FEEL Playground

Use the FEEL Playground to validate and troubleshoot your FEEL expressions when modeling process diagrams in Web Modeler.

<p><a href="../../../../components/modeler/feel/feel-playground/" class="link-arrow">FEEL Playground</a></p>

<!-- https://github.com/camunda/camunda-docs/issues/5611 -->

### Git sync Azure DevOps and Bitbucket integration

<!-- https://github.com/camunda/product-hub/issues/2580 -->
<!-- https://github.com/camunda/product-hub/issues/2507 -->

In addition to GitHub and GitLab, Web Modeler now supports integration with Azure DevOps and Atlassian Bitbucket.

<p><a href="../../../../components/modeler/web-modeler/process-applications/git-sync" class="link-arrow">Git sync</a></p>

### Low-code process testing

<!-- https://github.com/camunda/product-hub/issues/2610 -->

You can now save and rerun versioned test scenarios in Web Modeler:

- Supports user tasks, connectors, and basic branching logic
- Ideal for process developers and CoEs
- Enables behavior-driven development with Camunda Process Test

<p><a href="../../../../components/modeler/web-modeler/validation/play-your-process/" class="link-arrow">Scenarios</a></p>

### RDBMS support for Oracle and MS SQL in Self-Managed

<!-- https://github.com/camunda/product-hub/issues/2558 -->

Web Modeler Self-Managed now supports Oracle Database and Microsoft SQL Server for simpler setup and maintenance.

<p><a href="../../../../self-managed/components/modeler/web-modeler/configuration/database/#using-alternative-database-vendors" class="link-arrow">Set up Oracle or MS SQL</a></p>

### Username claim configuration

<!-- https://github.com/camunda/web-modeler/issues/9292 -->

Configure the ID token claim used for usernames via the `CAMUNDA_IDENTITY_USERNAMECLAIM` environment variable to account for differences between identity providers and ensure user-friendly names.

### Version description

<!-- https://github.com/camunda/web-modeler/issues/12057 -->

Use the version **Description** field to track changes alongside the version tag (for example, as a change log or Git commit message). This helps make versioning more intuitive and collaborative, keeps teams aligned, and reduces ambiguity.

<p><a href="../../../../components/modeler/web-modeler/modeling/versions" class="link-arrow">Web Modeler versioning</a></p>

### Technical Changelogs for all 8.8.x releases

<details className="changelog-dropdown">
  <summary>Overview of all patch releases and their Changelogs in GitHub</summary>

<!-- RELEASE_LINKS_PLACEHOLDER -->
<ul><li>[Camunda 8.8.8 (11.12.2025)](https://github.com/camunda/camunda/releases/tag/8.8.8)</li><li>[Camunda 8.8.7 (09.12.2025)](https://github.com/camunda/camunda/releases/tag/8.8.7)</li><li>[Camunda 8.8.6 (02.12.2025)](https://github.com/camunda/camunda/releases/tag/8.8.6)</li><li>[Camunda 8.8.5 (27.11.2025)](https://github.com/camunda/camunda/releases/tag/8.8.5)</li><li>[Camunda 8.8.4 (17.11.2025)](https://github.com/camunda/camunda/releases/tag/8.8.4)</li><li>[Camunda 8.8.3 (05.11.2025)](https://github.com/camunda/camunda/releases/tag/8.8.3)</li><li>[Camunda 8.8.2 (27.10.2025)](https://github.com/camunda/camunda/releases/tag/8.8.2)</li><li>[Camunda 8.8.1 (22.10.2025)](https://github.com/camunda/camunda/releases/tag/8.8.1)</li><li>[Camunda 8.8.0 (09.10.2025)](https://github.com/camunda/camunda/releases/tag/8.8.0)</li><li>[Connectors 8.8.4 (01.12.2025)](https://github.com/camunda/connectors/releases/tag/8.8.4)</li><li>[Connectors 8.8.3 (19.11.2025)](https://github.com/camunda/connectors/releases/tag/8.8.3)</li><li>[Connectors 8.8.2 (06.11.2025)](https://github.com/camunda/connectors/releases/tag/8.8.2)</li><li>[Connectors 8.8.1 (16.10.2025)](https://github.com/camunda/connectors/releases/tag/8.8.1)</li><li>[Connectors 8.8.0 (10.10.2025)](https://github.com/camunda/connectors/releases/tag/8.8.0)</li></ul>
<!-- RELEASE_LINKS_PLACEHOLDER -->

</details>

## 8.8.0-alpha8

| Release date     | Changelog(s)                                                                                                                                                                               | Blog                                                                                   |
| :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------- |
| 9 September 2025 | <ul><li>[ Camunda 8 core ](https://github.com/camunda/camunda/releases/tag/8.8.0-alpha8)</li><li>[ Connectors ](https://github.com/camunda/connectors/releases/tag/8.8.0-alpha8)</li></ul> | [Release blog](https://camunda.com/blog/2025/09/camunda-alpha-release-september-2025/) |

### Ad-hoc sub-process dynamic activation using job workers <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Zeebe">Agentic orchestration</span>

<!-- https://github.com/camunda/product-hub/issues/2631 -->

Ad-hoc sub-process elements can now be activated by job workers:

- Define a task in the process model.
- When the engine reaches the ad-hoc sub-process, a job is created. Completing this job with a job result lets you define which elements in the ad-hoc sub-process to activate.
- Once any flows in the ad-hoc sub-process complete, a new job is created, giving job workers control over what to do next.

:::note
The job result also supports fulfilling the completion condition for the ad-hoc sub-process. When this condition is met, the sub-process waits for active children to complete before finishing, unless you explicitly cancel remaining instances in the job result.
:::

### CI/CD building blocks guide <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Modeler">Modeler</span>

<!-- https://github.com/camunda/product-hub/issues/2858 -->

Element templates documentation is improved to support scalable reuse of building blocks, focusing on CI/CD practices for managing templates across teams and environments.

Key updates include:

- Guidance on integrating element templates and dependencies into CI/CD pipelines
- Restructuring the documentation to improve discoverability and usability
- Tool-agnostic content covering Web Modeler, dependency management, and local development setups
- Moving relevant information from Connectors to the element templates section

See [element templates in Modeler](/components/modeler/element-templates/about-templates.md) for details.

### Connectors <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Connectors">Connectors</span>

#### Job header binding

<!-- https://github.com/camunda/connectors/issues/5131 -->

Use the `@Header` annotation to bind a header value (for example, a FEEL expression) to a model class.

#### SQL connector Oracle database connection

<!-- https://github.com/camunda/connectors/issues/5074 -->

The SQL connector now supports Oracle Database connections.

See [SQL connector](/components/connectors/out-of-the-box-connectors/sql.md) for more information.

:::note
You must manually download the Oracle JDBC driver from [Oracle](https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html) due to licensing restrictions. Run the connector in [hybrid mode](/components/connectors/use-connectors-in-hybrid-mode.md) to enable Oracle Database connections.
:::

### Console <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Console">Console</span>

#### Docker distribution

<!-- https://github.com/camunda/product-hub/issues/2242 -->

Console is now available as a Self-Managed Docker distribution:

- Deploy Camunda Console using a Docker image
- Run Console outside Kubernetes using Docker Compose or other container services
- Use Console with Camunda 8 clusters deployed via Docker

See [Docker Compose developer quickstart](/self-managed/quickstart/developer-quickstart/docker-compose.md) for setup instructions.

#### Usage metrics for licence model and tenant

<!-- https://github.com/camunda/product-hub/issues/1979 -->

Usage metrics now support per-tenant reporting and align with Camunda’s updated licensing model based on the number of tenants.

### Element template support for all tasks <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Modeler">Modeler</span>

<!-- https://github.com/camunda/product-hub/issues/2606 -->

You can now save any configured task as a reusable element template directly from the Web Modeler properties panel:

- Save configured tasks (service, user, send, receive, business rule, script tasks, or call activities) as templates
- Edit templates to adjust input/output bindings, validation rules, categories, and more
- Publish templates to your project or organization for reuse

See [save tasks as element templates](/components/modeler/web-modeler/element-templates/save-as-element-templates.md) for details.

Additional support includes:

- `zeebe:assignmentDefinition` for assigning users or groups
- `zeebe:priorityDefinition` for setting task priorities (integer or FEEL expression)
- `zeebe:taskSchedule` for templating task scheduling configurations

### Migrate taken sequence flows flowing to the joining gateway

<!-- https://github.com/camunda/product-hub/issues/2913 -->

Enhanced migration now supports taken sequence flows leading to joining gateways:

- Define migration plans mapping active elements and taken sequence flows
- Configure plans via Operate UI or API

### Operate and Tasklist API deprecation <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects APIs">API</span>

<!-- https://github.com/camunda/product-hub/issues/2838 -->

The Operate and Tasklist APIs are now deprecated in favor of the Orchestration Cluster API for task and process management.

:::note
The deprecated APIs remain functional in this release but will no longer receive feature updates and will be removed in version 8.10.
:::

### Orchestration Cluster <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Orchestration Cluster">Orchestration Cluster</span>

#### Orchestration Cluster Identity

<!-- https://github.com/camunda/product-hub/issues/2222 -->

**Self-Managed Identity Management**:

- Create and manage users, groups, roles, and memberships directly in Identity’s database
- Integrate external providers like Keycloak or Microsoft Entra via OIDC
- Assign resource-level permissions using RBAC
- Map users, groups, and roles to resources using token claims and application/client mappings
- Simplify migration with built-in tools

**SaaS enhancements**:

- Integrate organizational identity providers for centralized user management
- Assign roles, groups, and authorizations per cluster

#### Orchestration Cluster scaling

<!-- https://github.com/camunda/product-hub/issues/2226 -->

Add Zeebe partitions to a running cluster in SaaS to increase capacity without downtime:

- New partitions start processing tasks immediately
- Existing messages remain on original partitions, potentially causing slight imbalances for message-heavy workloads (future updates will address this)

#### Run Orchestration Cluster without secondary storage

<!-- https://github.com/camunda/product-hub/issues/2897 -->

You can now run Orchestration Cluster in "Zeebe-only" mode without secondary storage:

- Ideal for setups not using Query APIs, Operate, or Tasklist
- Enable by setting `camunda.database.type=none`
- Starts only the required Zeebe components

### Web Modeler <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Web Modeler">Web Modeler</span>

#### Cluster Identity compatibility

<!-- https://github.com/camunda/product-hub/issues/2987 -->

Web Modeler is fully compatible with Camunda 8.8 Orchestration Clusters for a smooth migration.

#### Low-code Process Testing

<!-- https://github.com/camunda/product-hub/issues/2610 -->

You can now save and rerun versioned test scenarios in Web Modeler:

- Supports user tasks, connectors, and basic branching logic
- Ideal for process developers and CoEs
- Enables behavior-driven development with Camunda Process Test

#### RDBMS support for Oracle and MS SQL in Self-Managed

<!-- https://github.com/camunda/product-hub/issues/2558 -->

Web Modeler Self-Managed now supports Oracle Database and Microsoft SQL Server for simpler setup and maintenance.

#### Test scenario files

<!-- https://github.com/camunda/product-hub/issues/2894 -->

You can now save, export, and share test scenarios:

- Portable, Git-syncable files enable quick creation of Camunda Process Test scenarios

#### Username claim configuration

<!-- https://github.com/camunda/web-modeler/issues/9292 -->

Configure the ID token claim used for usernames via the `CAMUNDA_IDENTITY_USERNAMECLAIM` environment variable to account for differences between identity providers and ensure user-friendly names.

## 8.8.0-alpha7

| Release date   | Changelog(s)                                                                                                                                                                               | Blog                                                                                |
| :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| 12 August 2025 | <ul><li>[ Camunda 8 core ](https://github.com/camunda/camunda/releases/tag/8.8.0-alpha7)</li><li>[ Connectors ](https://github.com/camunda/connectors/releases/tag/8.8.0-alpha7)</li></ul> | [Release blog](https://camunda.com/blog/2025/08/camunda-alpha-release-august-2025/) |

### Camunda 8 API <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects APIs">API</span>

Development continues on the single unified Camunda 8 REST API that consolidates multiple fragmented APIs into a single, coherent interface, simplifying development and improving clarity across Camunda components.

<!-- https://github.com/camunda/product-hub/issues/2243 -->

### Process instance tags <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects APIs">API</span> {#process-instance-tags-alpha7}

Introduce optional, immutable **process instance tags** set at creation for lightweight routing, correlation, and future prioritization without inspecting large variable payloads.

For a full feature overview see [process instance creation](/components/concepts/process-instance-creation.md#tags) and [job workers](/components/concepts/job-workers.md#tags).

### Camunda 8 Run supports 8.8 architecture <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Developer">Developer</span>

Camunda 8 Run now includes Identity, allowing all core applications to run locally in configurations similar to production. This simplifies local development by enabling multiple user authentications and credentials.

<!-- https://github.com/camunda/product-hub/issues/2641 -->

### Connectors <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Connectors">Connectors</span> {#connectorsalpha7}

#### AI Agent connector

- **Hybrid mode/customization**: The AI Agent connector can now be [customized](../../../components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-customization.md) in hybrid mode. This includes an API to define custom memory storage backends apart from the provided ones.
- **Added model provider support**: Added support for Azure OpenAI and Google Vertex AI models.

To learn more, see [AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md).

<!-- https://github.com/camunda/camunda-docs/pull/6173 -->
<!-- https://github.com/camunda/camunda-docs/pull/6221 -->

#### Azure Blob Storage connector

Use the new Azure Blob Storage connector to store and retrieve documents within Camunda workflows using Azure Blob Storage. This enables seamless document management directly within processes, improves efficiency, and reduces the need for custom integrations.

To learn more, see [Azure Blob Storage connector](/components/connectors/out-of-the-box-connectors/azure-blob-storage.md).

<!-- https://github.com/camunda/product-hub/issues/2713 -->

#### CSV connector

Use the new CSV connector for SaaS to read, filter, transform, and write CSV data within processes. This reduces technical debt, accelerates development, and broadens integration capabilities with native support for this universal data format.

To learn more, see [CSV connector](/components/connectors/out-of-the-box-connectors/csv.md).

<!-- https://github.com/camunda/product-hub/issues/2851 -->

#### Google Cloud storage connector

Use the new Google Cloud storage connector for easy document storage and retrieval directly within Camunda workflows, streamlining document management without custom development.

To learn more, see [Google Cloud storage connector](/components/connectors/out-of-the-box-connectors/google-cloud-storage.md).

<!-- https://github.com/camunda/product-hub/issues/2712 -->

#### MCP Client connector <span class="badge badge--medium" title="This feature is in early access">early access</span>

Use the new MCP Client connector to allow Camunda processes and AI agents to auto-discover and invoke external tools, eliminating hardwired connectors and enabling dynamic, metadata-driven tool integration.

To learn more, see [MCP client](../../../components/early-access/alpha/mcp-client/mcp-client.md).

:::note
The MCP Client connector is released as an [early access alpha feature](/components/early-access/alpha/alpha-features.md) to allow you to test and participate in development by sharing feedback before general availability, and is subject to alpha feature limitations.
:::

<!-- https://github.com/camunda/product-hub/issues/2900 -->

#### Vector database connector

Improvements are made to the Vector database connector as follows:

- Updated the OpenSearch vector store to support non-AWS managed instances.
- Added support for OpenAI embedding models.

To learn more, see [vector database connector](/components/connectors/out-of-the-box-connectors/embeddings-vector-db.md).

<!-- https://github.com/camunda/camunda-docs/pull/6047 -->

#### Fetch latest process definitions

The connectors runtime is optimized by fetching only the latest process definition versions from the Orchestration Cluster. This reduces CPU consumption and improves deployment performance, particularly in environments with frequent CI/CD-generated process versions.

<!-- https://github.com/camunda/product-hub/issues/2572 -->

#### Unlock element template fields

[Element template management](/components/connectors/manage-connector-templates.md) is now more flexible for developers and DevOps teams.

- You can assign custom semantic IDs and use an intuitive versioning scheme, ensuring templates are portable and retain stable references across different environments.
- Template names and file names can be managed independently, and you can quickly import templates using copy and paste, git sync, or CI/CD pipeline.
- Safeguards now notify you of ID or version conflicts to prevent accidental overwrites when publishing templates.

<!-- https://github.com/camunda/product-hub/issues/2860 -->

### Run process segment <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects APIs">API</span>

This feature allows developers to manually execute and test individual tasks or segments (connectors, RPA bots, IDP extractions) without running full processes, improving debugging and development efficiency.

To learn more, see [run process segment](/components/concepts/process-instance-creation.md#run-process-segment)

<!-- https://github.com/camunda/product-hub/issues/2453 -->

### Intelligent document processing (IDP) form extraction <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects IDP">IDP</span>

You can use form-based structured document extraction to capture data from structured documents.

- For example, you can use this extraction method for documents with a consistent layout, such as invoices, tax forms (for example, W-2s, VAT declarations), and loan or insurance applications.
- Projects can be shared organization-wide, enhancing accessibility to extraction capabilities.

To learn more, see [extract structured data](/components/modeler/web-modeler/idp/idp-structured-extraction.md).

<!-- https://github.com/camunda/product-hub/issues/2707 -->

### Migration to Orchestration Cluster Identity support <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Security">Security</span>

Allows smooth migration from Camunda 8.7 to 8.8 by transferring tenants, roles, and authorizations to the new Orchestration Cluster Identity, minimizing manual administration effort during upgrade.

<!-- https://github.com/camunda/product-hub/issues/2449 -->

### RPA multi-file script support <span class="badge badge--long" title="This feature affects RPA">RPA</span>

Robotic process automation (RPA) now supports multi-file script support, allowing you to organize scripts modularly, reuse common automation components, and integrate existing Robot Framework scripts. The execution engine fully supports multi-file scripts and linked resources, improving scalability, maintainability, and flexibility for enterprise automation projects.

<!-- https://github.com/camunda/product-hub/issues/2710 -->

### User task listener metadata and filtering <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Tasklist">Tasklist</span>

With this release, user task listener jobs are improved as follows:

- Task metadata is now directly embedded in the task listener jobs' properties instead of being exposed as custom headers. This includes attributes such as `assignee`, `dueDate` or `userTaskKey`.
- User tasks can now be filtered using partial user task states to understand the current lifecycle state of the user task fully.

These improvements simplify job worker development, reduce errors, and enable better observability of the user task lifecycle.

<!-- https://github.com/camunda/product-hub/issues/2993 -->

### Unified configuration for the Orchestration Cluster <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

Simplifies configuration by consolidating Operate, Tasklist, and Identity profiles into a unified Camunda 8 Orchestration Cluster application, reducing duplication and complexity for easier deployment and management.

<!-- https://github.com/camunda/product-hub/issues/2486 -->

### Zeebe-managed resilient batch operations <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Zeebe">Zeebe</span>

All batch operations, such as canceling or resolving incidents in bulk, are now handled by Zeebe instead of Operate.

- This change ensures region failovers in the multi-region setup no longer risk losing critical batch commands.
- Users will initiate and manage batch operations through the Orchestration Cluster REST API and the Operate UI, but the underlying processing occurs within Zeebe.
- By moving batch operations to the core engine, multi-region deployments gain reliability and resilience.

<!-- https://github.com/camunda/product-hub/issues/2420 -->

## 8.8.0-alpha6

| Release date | Changelog(s)                                                                                                                                                                               | Blog                                                                              |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| 8 July 2025  | <ul><li>[ Camunda 8 core ](https://github.com/camunda/camunda/releases/tag/8.8.0-alpha6)</li><li>[ Connectors ](https://github.com/camunda/connectors/releases/tag/8.8.0-alpha6)</li></ul> | [Release blog](https://camunda.com/blog/2025/07/camunda-alpha-release-july-2025/) |

### Bitbucket sync <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Web Modeler">Web Modeler</span>

<!-- https://github.com/camunda/product-hub/issues/2507 -->

Camunda 8 now supports integration with [Atlassian Bitbucket Cloud](https://bitbucket.org/product/), in addition to GitHub, GitLab, and Azure DevOps.

- This helps customers who use Jira for their development processes.
- Organization owners and administrators can connect their Web Modeler process applications to Bitbucket Cloud, allowing users to keep their Web Modeler, Desktop Modeler, and official version control projects synced.

To learn more, see [Git sync](/components/modeler/web-modeler/process-applications/git-sync.md?platform=bitbucket).

### Camunda 8 REST API renamed to Orchestration Cluster REST API <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects APIs">API</span>

<!-- https://github.com/camunda/product-hub/issues/2793 -->

The Camunda 8 REST API is now called the **Orchestration Cluster REST API**.

- This name better reflects its role as a unified REST API for interacting with entities in a [Camunda 8 Orchestration Cluster](/reference/glossary.md#orchestration-cluster), such as processes, tasks, and variables.
- The functionality and structure of the API remain unchanged. The name change improves clarity and onboarding across Camunda documentation and resources.

To learn more, see [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md).

### Connectors <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Connectors">Connectors</span> {#connectorsalpha6}

#### AI Agent connector

<!-- https://github.com/camunda/camunda-docs/pull/5942 -->
<!-- https://github.com/camunda/camunda-docs/pull/6068 -->

- **Structured outputs/JSON mode**: [Configurable response formats](../../../components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-task.md#response) allow you to choose whether the connector returns plain text or JSON for downstream processing. For some models, you can define a JSON schema for returned data.
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

To learn more, see [cluster scaling](/self-managed/components/orchestration-cluster/zeebe/operations/cluster-scaling.md).

:::caution
This feature is not yet fully compatible with backup/restore.
:::

### Helm charts <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

#### Alternative container images

<!-- https://github.com/camunda/product-hub/issues/2826 -->

Camunda now provides alternative container images to the previously used Bitnami images. These images are hosted on `registry.camunda.cloud`.

- From version **8.8**, these are the default supported images, offering better security and faster patch delivery.
- To use them, update your Helm deployment to reference the `values-images-ee.yml` file. See the [installation guide](/self-managed/deployment/helm/install/quick-install.md) for details.

#### Configurable volumes

<!-- https://github.com/camunda/product-hub/issues/2597 -->

The Helm chart now supports configurable volumes. You can define `PersistentVolumeClaims` or continue using `EmptyDir` through `values.yaml`.

### Singapore region available for SaaS on Amazon Web Services <span class="badge badge--long" title="This feature affects SaaS">SaaS</span>

A new Singapore (ap-southeast-1) region is now available for SaaS clusters on Amazon Web Services. Use this region to:

- Improve overall processing speed and reduce latency if you operate in Singapore and Southeast Asian (SEA) countries.
- Keep cluster data within Singapore to support your local data residency and compliance needs.

To learn more about supported SaaS regions, see [regions](/components/saas/regions.md).

### Tasklist uses the Orchestration Cluster REST API <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Tasklist">Tasklist</span>

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

### Documentation <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

#### Get started updates

<!-- https://github.com/camunda/product-hub/issues/2751 -->

The [getting started](/guides/getting-started-example.md) documentation now includes:

- Example BPMN files and Spring Boot/NodeJS starter projects.
- Practical code snippets, such as payment handling.
- Updated code to match recent Camunda versions.
- Annotations in BPMN files to guide usage and explain results.

#### Public API

The new [Public API](/reference/public-api.md) documentation outlines what’s included in Camunda 8's public API, the policies around versioning, and what to expect when upgrading.

- The public API is the official contract between Camunda and its users under SemVer.
- No breaking changes will be made to the public API in minor or patch releases.
- You can safely build on these interfaces with the expectation of stability and backward compatibility.

## 8.8.0-alpha5

| Release date | Changelog(s)                                                                                                                                                                               | Blog                                                                              |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| 10 June 2025 | <ul><li>[ Camunda 8 core ](https://github.com/camunda/camunda/releases/tag/8.8.0-alpha5)</li><li>[ Connectors ](https://github.com/camunda/connectors/releases/tag/8.8.0-alpha5)</li></ul> | [Release blog](https://camunda.com/blog/2025/05/camunda-alpha-release-june-2025/) |

### Agentic orchestration

The following [agentic orchestration](/components/agentic-orchestration/agentic-orchestration-overview.md) features are available in this alpha release:

#### AI Agent connector <span class="badge badge--medium" title="This feature affects Connectors">Connectors</span><span class="badge badge--medium" title="This feature affects Web Modeler">Web Modeler</span><span class="badge badge--medium" title="This feature affects Desktop Modeler">Dektop Modeler</span>

The AI Agent connector enables AI agents to integrate with an LLM to provide interaction/reasoning capabilities. This connector is designed for use with an [ad-hoc sub-process](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md) in a [feedback loop](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md#feedback-loop), providing automated user interaction and tool selection.

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

Camunda now supports [an integration with Azure DevOps](/components/modeler/web-modeler/process-applications/git-sync.md) that allows for direct syncing with Azure repositories.

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

[Orchestration Cluster Identity](/components/identity/identity-introduction.md) is now available for SaaS clusters. Starting with this alpha version, you can manage groups, roles, and authorizations at the cluster level.

The following known limitations apply for this alpha version release:

| Known limitation                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authorizations                        | <p><ul><li><p>Before enabling authorization checks in the cluster settings, users must assign themselves to the admin role in Identity for the Orchestration Cluster.</p><p>**Note:** As authorizations are disabled by default, no changes are required for initial access.</p></li><li><p>Authorizations cannot be assigned to users via the UI, only to groups.</p></li><li><p>Authorizations are not correctly loaded in the UI.</p></li></ul></p> |
| Navigation, Notifications, and Logout | <p><ul><li><p>Links to the other Camunda components in the Orchestration Cluster web applications (Operate, Tasklist, Identity) do not currently work.</p></li><li><p>SaaS notifications are not displayed in Orchestration Cluster components.</p></li><li><p>Log out from Orchestration Cluster web applications is not fully functional.</p></li></ul></p>                                                                                          |
| Documentation                         | Documentation is incomplete.                                                                                                                                                                                                                                                                                                                                                                                                                           |

#### Identity management for Helm Chart setups <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

[Orchestration Cluster Identity](/self-managed/components/orchestration-cluster/identity/overview.md) is now available for OIDC setups in [Helm chart deployments](/self-managed/deployment/helm/install/quick-install.md). Starting with this alpha version, you can configure the Orchestration Cluster components to use the identity provider (IdP) of your choice and enable single sign-on (SSO).

The following known limitations apply for this alpha version release:

| Known limitation | Description                                                                                                                                                              |
| :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authorizations   | <p><ul><li><p>Authorizations cannot be assigned to users via the UI, only to groups.</p></li><li><p>Authorizations are not correctly loaded in the UI.</p></li></ul></p> |
| Logout           | Log out from Orchestration Cluster web applications is not fully functional.                                                                                             |
| Documentation    | Documentation is incomplete.                                                                                                                                             |

<!-- https://github.com/camunda/product-hub/issues/2222 -->

### React to expired messages with a custom exporter

Camunda now introduces a mechanism to react to expired messages. The original message is retrieved from the primary storage upon message expiration and the expiry event is enhanced with the original message. Existing functionality remains unchanged, so there is no disruption for current customers or custom exporters.

With these updates, developers can subscribe to the expired messages through a custom exporter, examine the event content, and optionally re-publish or handle the message differently. By providing an enhanced event and re-publish flow, this feature strengthens reliability and transparency in business processes without requiring a major upgrade or modifying existing exporters.

<!-- https://github.com/camunda/product-hub/issues/2796 -->

### RPA worker offline installer

This feature introduces an offline installer package for the Camunda [RPA](/components/rpa/overview.md) worker, allowing installation without internet connectivity. The offline installer removes reliance on external repositories or downloads, ensuring consistent, secure, and hassle-free deployment into air-gapped or restricted environments.

<!-- https://github.com/camunda/product-hub/issues/2786 -->

### Tasklist frontend application migration to use Orchestration Cluster REST API <span class="badge badge--medium" title="This feature affects Tasklist">Tasklist</span>

The Tasklist frontend application is transitioning from the soon-to-be-deprecated Tasklist V1 API to the unified Orchestration Cluster REST API.

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

To learn more about versioning your diagrams, see [versions](components/modeler/web-modeler/modeling/versions.md).

### Web Modeler cluster basic authentication <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Web Modeler">Web Modeler</span>

<!-- https://github.com/camunda/web-modeler/issues/13707 -->

As well as bearer token and client credentials authentication, you can now configure Web Modeler in Self-Managed to use basic authentication for cluster access.

- To use basic authentication, set the `CAMUNDA_MODELER_CLUSTERS_0_AUTHENTICATION` environment variable value to `BASIC`.
- Web Modeler sends a username and password with every request to the cluster.

To learn more about basic authentication, see [available authentication methods](/self-managed/components/modeler/web-modeler/configuration/configuration.md#available-authentication-methods).

## 8.8.0-alpha3

| Release date  | Changelog(s)                                                                                                                                                                               | Blog |
| :------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--- |
| 08 April 2025 | <ul><li>[ Camunda 8 core ](https://github.com/camunda/camunda/releases/tag/8.8.0-alpha3)</li><li>[ Connectors ](https://github.com/camunda/connectors/releases/tag/8.8.0-alpha3)</li></ul> | -    |

<!-- https://github.com/camunda/product-hub/issues/2630 -->

### Ad-hoc sub-process activation API & completion configuration <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span> {#adhocsubprocess}

Agentic process orchestration enhancements include:

- An optional `completionCondition` boolean expression for ad-hoc sub-processes that is evaluated every time an inner element is completed. A `cancelRemainingInstances` boolean attribute can also be configured to influence the ad-hoc sub-process behavior when the completion condition is met.
- An [Activate activities within an ad-hoc sub-process](/apis-tools/orchestration-cluster-api-rest/specifications/activate-ad-hoc-sub-process-activities.api.mdx) API used to activate selected activities within an ad-hoc sub-process.

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

### Camunda Spring Boot Starter for the Camunda 8 REST API

A Spring Boot Starter is provided for the Orchestration Cluster REST API to unify process management, user tasks, and identity features under a single dedicated starter. This simplifies the interaction between a Spring Boot application and Camunda 8, allowing you to:

- Easily integrate process entity management and queries within your workflows.
- Seamlessly configure endpoints and authentication via Spring Boot auto-configuration, minimizing boilerplate code.
- Rely on an official, standardized approach to guarantee consistency and reduce maintenance costs when upgrading.
- Based on Spring Boot 3.5 ([version compatibility matrix](/apis-tools/camunda-spring-boot-starter/getting-started.md#version-compatibility)).

To learn more about this feature, see the [Camunda Spring Boot Starter](/apis-tools/camunda-spring-boot-starter/getting-started.md).

<!-- https://github.com/camunda/product-hub/issues/2249 -->

### Camunda 8 Run authentication updates

Camunda 8 Run no longer requires authentication when working with APIs. Authentication and authorizations can be optionally enabled to allow requests using basic authentication, and to test authorizations and permissions.

To learn more about this feature, see the [API documentation](/self-managed/quickstart/developer-quickstart/c8run.md#use-camunda-apis) for Camunda 8 Run.

<!-- https://github.com/camunda/camunda-docs/pull/5145 -->

### Identity management updates <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

The [Identity service](/self-managed/components/management-identity/overview.md) is enhanced to deliver greater flexibility, control, and security for both Self-Managed and SaaS users. These updates are part of our broader effort to streamline the platform’s architecture.

#### Cluster-level identity management

Identity settings will be configured at the Orchestration Cluster level, allowing each cluster to have unique OIDC configurations. This cluster-specific setup empowers organizations to assign different identity providers (IdPs) across clusters, offering improved control over permissions and user group mappings, resulting in a more streamlined and efficient configuration experience.

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

### Orchestration Cluster REST API Query API <span class="badge badge--medium" title="This feature affects APIs">API</span>

You can now use a single Query API in the Orchestration Cluster REST API to find process and decision data instead of using multiple component APIs.

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

To learn more about these endpoints, see the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md#query-api) documentation.

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

To learn more about this feature, see the [Camunda Exporter documentation](/self-managed/components/orchestration-cluster/zeebe/exporters/camunda-exporter.md).

### Backup and restore improvements <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

Camunda backups have been improved and made easier to use. The web application backups are now merged together under one endpoint.

<!-- https://github.com/camunda/camunda/issues/24456 -->

### Connector Runtime <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Connectors">Connectors</span>

#### Spring SDK and Orchestration Cluster REST API Migration

The Connectors experience is enhanced with the migration from the Spring Zeebe to the Orchestration Cluster REST API, and the removal of dependency on the Operate client.
