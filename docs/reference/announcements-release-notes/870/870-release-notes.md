---
id: 870-release-notes
title: "Release notes"
description: "Release notes for 8.7, including alphas"
keywords:
  [
    "product development lifecycle",
    "software development lifecycle",
    "CI/CD",
    "AI",
  ]
---

These release notes identify the new features included in 8.7, including [alpha feature releases](/components/early-access/alpha/alpha-features.md).

## 8.7 minor

| Scheduled release date | Scheduled end of maintenance | All Patch releases                                                                | Release blog                                                          | Update guide                                                              |
| ---------------------- | ---------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| 8 April 2025           | 13 October 2026              | [Patch Releases and Changelogs](#technical-changelogs-for-all-87x-patch-releases) | [Release blog](https://camunda.com/blog/2025/04/camunda-8-7-release/) | [Update guide](/self-managed/components/components-upgrade/860-to-870.md) |

### AWS EKS and AWS OpenShift (ROSA) reference architecture <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

Camunda is pleased to announce the release of the Reference Architecture packages for AWS EKS (single-region) and Red Hat OpenShift on AWS (ROSA) in both single and dual-region configurations.

- These packages offer a standardized Reference Architecture that includes implementation requirements, Terraform templates, Helm configurations, deployment pipelines, and operational procedures.
- Additionally, we have enhanced the user experience by improving test coverage for the documented procedures.

:::note
As part of this effort, the previously used repositories [camunda-tf-eks-module](https://github.com/camunda/camunda-tf-eks-module) and [camunda-tf-rosa](https://github.com/camunda/camunda-tf-rosa) were deprecated and merged into a new consolidated repository: [camunda-deployment-references](https://github.com/camunda/camunda-deployment-references).
:::

<!--- https://github.com/camunda/product-hub/issues/2522 --->

### Bulk publish to shared resources <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Web Modeler">Web Modeler</span>

Develop reusable assets in a pro-code environment, push them to your version control system, then publish them to your Web Modeler environment so anyone in your organization can reuse them with newly modified endpoints.

<!--- https://github.com/camunda/product-hub/issues/2635 --->

### Camunda SAP integration <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

Camunda now offers a robust SAP integration featuring:

- An OData connector for seamless API interactions.
- An RFC connector for BAPI/function module access.
- A dedicated plugin enabling SAP BTP services within BPMN workflows.

This solution ensures compliance with IT governance standards using SAP BTP (Business Technology Platform) and the SAP Cloud connector for enterprise-grade reliability.

### Connector manage and run <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects connectors">Connectors</span> {#manage-connectors}

Connector manage and run provides a consolidated view of your running inbound connector [webhooks, message queue subscriptions, and polling subscriptions](/reference/glossary.md#inbound-connector) for efficient monitoring and management.

- Real-time alerts will notify operators when connectors are not running, preventing unnoticed downtimes.
- Use this feature to check your inbound connectors are healthy and running, and troubleshoot unhealthy connectors.

To learn more about this feature, see [manage your connectors](/components/console/manage-clusters/manage-connectors.md).

<!-- https://github.com/camunda/product-hub/issues/2647 https://github.com/camunda/product-hub/issues/1063 -->

### Custom JWKS and JWT Algorithms Support <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

Self-Managed customers now have [full control over JWT configurations](/self-managed/components/modeler/web-modeler/configuration/configuration.md) for enhanced security and compatibility.

<!--- https://github.com/camunda/web-modeler/issues/11571 --->

### Document handling <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

We have extended Camunda's [document handling](/components/document-handling/getting-started.md) capabilities by introducing robust integrations and support for AWS S3, local file systems, and document operations within Zeebe. This version enhances document management by providing additional support for secure storage, retrieval, and integration with connectors, improving the efficiency and scalability of document-dependent workflows.

<!-- https://github.com/camunda/product-hub/issues/2555 -->

### Dual-region reference architecture for OpenShift <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

We are excited to announce the addition of the [dual-region reference architecture for Red Hat OpenShift](/self-managed/installation-methods/helm/cloud-providers/openshift/dual-region.md). This new architecture leverages Submariner, a cloud-native technology based on IPSec, to enable inter-cluster communication and service discovery across regions. Learn more about [dual-region operational procedures](/self-managed/installation-methods/helm/operational-tasks/dual-region-ops.md).

<!--- https://github.com/camunda/product-hub/issues/2501  --->

### Dual-region ROSA HCP cluster with Terraform <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

Step through [a detailed tutorial for deploying two Red Hat OpenShift on AWS (ROSA) cluster with Hosted Control Plane (HCP) in two different regions](/self-managed/installation-methods/helm/cloud-providers/amazon/openshift/terraform-setup-dual-region.md). It is specifically tailored for deploying Camunda 8 using Terraform, a widely-used Infrastructure as Code (IaC) tool.

<!--- https://github.com/camunda/product-hub/issues/2585 --->

### End-to-end organization process landscape <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Web Modeler">Web Modeler</span><span class="badge badge--medium" title="This feature affects Desktop Modeler"> Desktop Modeler</span>

Automation leaders can visualize all automation projects through a single, hierarchical source of truth of approved processes. Specifically, there are new features for copying reviewed process application versions to a central project where every org member can be invited with a single click. Now, users can more easily communicate their automation efforts and maximize asset reuse.

<!-- https://github.com/camunda/product-hub/issues/2611 -->

### Integrate additional Kubernetes definitions <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

The Camunda 8 Helm chart now allows custom Kubernetes manifests to be injected into your `values.yaml`. This enables you to add additional Kubernetes resources such as ConfigMaps, Deployments, or Services into your deployment without modifying the Helm chart itself.

For more information, visit the [documentation on injecting Kubernetes manifests](/self-managed/installation-methods/helm/configure/add-extra-manifests.md).

<!--- https://github.com/camunda/product-hub/issues/2464 --->

### Intelligent Document Processing (IDP) <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Web Modeler">Web Modeler</span> {#idp}

Use intelligent document processing (IDP) to integrate automated document processing into your end-to-end processes.

- IDP uses artificial intelligence (AI) and machine learning (ML) to identify, extract, and organize data from your structured and unstructured documents into a structured format you can use in your processes.
- For example, you can use IDP to extract data from invoices and other document types in your document processing workflow.

To learn more about this feature, see [intelligent document processing](/components/modeler/web-modeler/intelligent-document-processing.md).

### Process applications in Desktop Modeler <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Desktop Modeler">Desktop Modeler</span>

We have enabled developers to manage and work with multi-file BPMN projects directly within Desktop Modeler. This feature brings familiar IDE-like project management capabilities to Modeler, aligning with Web Modeler concepts, projects, and process applications.

<!--- https://github.com/camunda/product-hub/issues/2458 --->

### Process application versioning, README, and review <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Web Modeler">Web Modeler</span>

You can now track changes and deploy the right version of the process application to the right environment, keep your process documentation updated, [versioned](/components/modeler/web-modeler/process-application-versioning.md), and [readable for everyone](/components/modeler/web-modeler/advanced-modeling/process-documentation-with-readme-files.md), and enjoy a smooth, out-of-the-box experience ensuring all changes to processes are formally [reviewed](/components/modeler/web-modeler/process-application-pipeline.md#review) and approved.

<!--- https://github.com/camunda/product-hub/issues/2016 https://github.com/camunda/product-hub/issues/2565 https://github.com/camunda/product-hub/issues/2054 --->

### Task appending framework <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Modeler">Modeler</span>

Create and append tasks with resources available in the current project and process application. Find the available processes, decisions, and forms in the append menu to directly create a task linked to the resource.

<!-- https://github.com/camunda/product-hub/issues/2608 -->

### Unified deployment experience from Web Modeler <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Web Modeler">Web Modeler</span>

[Authenticate deployments](/components/modeler/web-modeler/process-application-versioning.md) with your existing user tokens, rather than entering shared secrets. This further simplifies the deployment process beyond our 8.6 release.

<!--- https://github.com/camunda/product-hub/issues/2073 --->

### Known bugs in the 8.7.0 release

| Bug / issue                                                                                                                                              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [XML keeps inbound.type after changing element (#932)](https://github.com/camunda/issues/issues/932)                                                     | <p>When changing the element type of an inbound start event connector to a blank start event type, the inbound connector properties are not removed.</p><p><ul><li>**Affects:** Web Modeler</li><li>**Workaround**: Delete and re-create the BPMN element.</li></ul></p>                                                                                                                                                                                                                                                                                                                          |
| [Fields in Tasklist are not editable for AI-Generated forms (#26079)](https://github.com/camunda/camunda/issues/26079)                                   | <p>Fields in AI-generated user forms may not be editable for certain Chrome browser versions.</p><p><ul><li>**Affects:** Web Modeler and Tasklist</li><li>**Workaround**: Manually recreate the form.</li></ul></p>                                                                                                                                                                                                                                                                                                                                                                               |
| [PDFs cannot be previewed or downloaded in Firefox, Chrome, or Edge (#28498)](https://github.com/camunda/camunda/issues/28498)                           | <p>In rare situations, PDFs cannot be previewed due to the used browser.</p><p><ul><li>**Affects:** Tasklist</li><li>**Workaround**: Use a different browser; clear browser cache.</li></ul></p>                                                                                                                                                                                                                                                                                                                                                                                                  |
| [Connectors config using EntraId (OIDC) for 8.7.0-alpha5 incorrect (#3135)](https://github.com/camunda/camunda-platform-helm/issues/3135)                | <p>Incomplete connectors configuration for Entra ID usage.</p><p><ul><li>**Affects:** Connectors</li><li>**Workaround**: Set an environment variable with the token scope for Operate (see [issue](https://github.com/camunda/camunda-platform-helm/issues/3135)).</li></ul></p>                                                                                                                                                                                                                                                                                                                  |
| [Uploaded files are not uploaded to the document storage when starting a process from Modeler (#29526)](https://github.com/camunda/camunda/issues/29526) | <p>Files are not uploaded to the document storage when starting a process with a start form from Web Modeler or Play.</p><p><ul><li>**Affects:** Document handling and Web Modeler</li><li>**Workaround**: Start the process from Tasklist or the Tasklist REST API.</li></ul></p>                                                                                                                                                                                                                                                                                                                |
| [File picker does not display the name of the uploaded file for completed tasks (#25443)](https://github.com/camunda/camunda/issues/25443)               | <p>File picker does not display the name of the uploaded file for completed tasks.</p><p><ul><li>**Affects:** Tasklist</li><li>**Workaround**: File name can be viewed in Operate.</li></ul></p>                                                                                                                                                                                                                                                                                                                                                                                                  |
| [File upload fails to AWS storage due to non-standard space in filename (#28375)](https://github.com/camunda/camunda/issues/28375)                       | <p>File upload fails to AWS storage due to non UTF-8 whitespace character in filename.</p><p><ul><li>**Affects:** Tasklist</li><li>**Workaround**: When using AWS S3 storage, use UTF-8 compatible characters.</li></ul></p>                                                                                                                                                                                                                                                                                                                                                                      |
| [Failed to replay batch at 'LoggedEvent (#30810)'](https://github.com/camunda/camunda/issues/30810)                                                      | <p>When updating from `8.6.13` to `8.7.0`, Zeebe processing can stop after the update in some situations, where multi-instance elements are used.</p><p><ul><li>**Affects:** Zeebe</li><li>**Workaround**: This issue is fixed in `8.7.1`. When affected, going to `8.7.1` fully mitigates the issue. There is no risk of data loss.</li></ul></p>                                                                                                                                                                                                                                                |
| [Zeebe backups fail when using Self-Managed environment in Azure with Managed Identity](https://github.com/camunda/camunda/issues/30860)                 | <p>When performing Zeebe backups with Azure and Managed Identity in a self-managed environment, Zeebe fails to load the application default credentials that are provided at runtime, preventing backups from taking place.</p><p><ul><li>**Affects:** Zeebe</li><li>**Workaround**: When using Azure backups with in a SM environment, the configuration for the Azure store should be set as environment variables as detailed [here](/self-managed/components/orchestration-cluster/zeebe/configuration/broker.md#zeebebrokerdatabackupazure) instead of using Managed Identity.</li></ul></p> |

### Technical Changelogs for all 8.7.x patch releases

<details className="changelog-dropdown">
  <summary>Overview of all patch releases and their Changelogs in GitHub</summary>

<!-- RELEASE_LINKS_PLACEHOLDER -->
<ul><li>[Camunda 8.7.13 (15.09.2025)](https://github.com/camunda/camunda/releases/tag/8.7.13)</li><li>[Camunda 8.7.12 (02.09.2025)](https://github.com/camunda/camunda/releases/tag/8.7.12)</li><li>[Camunda 8.7.11 (25.08.2025)](https://github.com/camunda/camunda/releases/tag/8.7.11)</li><li>[Camunda 8.7.10 (04.08.2025)](https://github.com/camunda/camunda/releases/tag/8.7.10)</li><li>[Camunda 8.7.9 (28.07.2025)](https://github.com/camunda/camunda/releases/tag/8.7.9)</li><li>[Camunda 8.7.8 (16.07.2025)](https://github.com/camunda/camunda/releases/tag/8.7.8)</li><li>[Camunda 8.7.7 (01.07.2025)](https://github.com/camunda/camunda/releases/tag/8.7.7)</li><li>[Camunda 8.7.6 (20.06.2025)](https://github.com/camunda/camunda/releases/tag/8.7.6)</li><li>[Camunda 8.7.5 (05.06.2025)](https://github.com/camunda/camunda/releases/tag/8.7.5)</li><li>[Camunda 8.7.4 (06.06.2025)](https://github.com/camunda/camunda/releases/tag/8.7.4)</li><li>[Camunda 8.7.3 (02.06.2025)](https://github.com/camunda/camunda/releases/tag/8.7.3)</li><li>[Camunda 8.7.2 (13.05.2025)](https://github.com/camunda/camunda/releases/tag/8.7.2)</li><li>[Camunda 8.7.1 (09.04.2025)](https://github.com/camunda/camunda/releases/tag/8.7.1)</li><li>[Camunda 8.7.0 (08.04.2025)](https://github.com/camunda/camunda/releases/tag/8.7.0)</li><li>[Connectors 8.7.8 (01.09.2025)](https://github.com/camunda/connectors/releases/tag/8.7.8)</li><li>[Connectors 8.7.7 (04.08.2025)](https://github.com/camunda/connectors/releases/tag/8.7.7)</li><li>[Connectors 8.7.6 (15.07.2025)](https://github.com/camunda/connectors/releases/tag/8.7.6)</li><li>[Connectors 8.7.5 (02.07.2025)](https://github.com/camunda/connectors/releases/tag/8.7.5)</li><li>[Connectors 8.7.4 (20.06.2025)](https://github.com/camunda/connectors/releases/tag/8.7.4)</li><li>[Connectors 8.7.3 (06.06.2025)](https://github.com/camunda/connectors/releases/tag/8.7.3)</li><li>[Connectors 8.7.2 (09.05.2025)](https://github.com/camunda/connectors/releases/tag/8.7.2)</li><li>[Connectors 8.7.1 (06.05.2025)](https://github.com/camunda/connectors/releases/tag/8.7.1)</li><li>[Connectors 8.7.0 (02.04.2025)](https://github.com/camunda/connectors/releases/tag/8.7.0)</li></ul>
<!-- RELEASE_LINKS_PLACEHOLDER -->

</details>

## 8.7.0-alpha5

| Release date  | Changelog(s)                                                                                                                                                                               | Blog                                                                               |
| :------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| 11 March 2025 | <ul><li>[ Camunda 8 core ](https://github.com/camunda/camunda/releases/tag/8.7.0-alpha5)</li><li>[ Connectors ](https://github.com/camunda/connectors/releases/tag/8.7.0-alpha5)</li></ul> | [Release blog](https://camunda.com/blog/2025/03/camunda-alpha-release-march-2025/) |

### Amazon Web Services (AWS) region support <span class="badge badge--long" title="This feature affects SaaS">SaaS</span>

Camunda 8 SaaS now supports Amazon Web Services (AWS) deployments. When creating a new cluster, you can select from the following new [AWS regions](/components/saas/regions.md):

- Frankfurt, Europe (eu-central-1)
- North America, Virginia (us-east-1)

### BPMN Copilot BPMN-to-text

Camunda's BPMN Copilot now also supports generating text from a BPMN diagram.

BPMN-to-text allows you to:

- Rapidly draft process documentation.
- Learn how the process works.
- Explain the behavior of the process to stakeholders.

To learn more about this feature, see [BPMN Copilot](/components/early-access/alpha/bpmn-copilot/bpmn-copilot.md).

<!-- https://github.com/camunda/product-hub/issues/2576 -->

### Camunda 8 Run advanced configuration options

The Camunda 8 Run startup script now supports additional configuration parameters: a web application port, the location of keystore TLS certificates, and log level.

This release also introduces a new `--docker` option, which starts C8Run with the `docker-compose up` command, and deploys Camunda 8 in containers instead of starting with a Java engine.

For more information, see the [Camunda 8 Run documentation](/self-managed/quickstart/developer-quickstart/c8run.md).

<!-- https://github.com/camunda/product-hub/issues/2459 -->

### Console cluster health and capacity monitoring

Cluster capacity provides a high-level overview of how well a cluster is coping with its current workload.

- Use this information to check and monitor if a cluster is appropriately sized for its workload.
- Cluster capacity can also be used as an indicator of cluster health. For example, a cluster running at maximum capacity can be an indicator of poor cluster responsiveness.

To learn more about this feature, see [cluster capacity](/components/console/manage-clusters/cluster-capacity.md).

<!-- https://github.com/camunda/product-hub/issues/2346 -->

### Intelligent document processing

Use intelligent document processing (IDP) to integrate automated document processing into your end-to-end processes.

- IDP uses artificial intelligence (AI) and machine learning (ML) to identify, extract, and organize data from your structured and unstructured documents into a structured format you can use in your processes.
- For example, you can use IDP to extract data from invoices and other document types in your document processing workflow.

:::note
IDP only offers support for Camunda 8 Self-Managed development deployment via Docker with the 8.7.0-alpha5 release (see [example deployment](/components/modeler/web-modeler/idp/idp-configuration.md#idp-docker-example)). Full production support for Camunda 8 SaaS and Camunda 8 Self-Managed is planned for delivery with the 8.7 release. Camunda 8 Run is not supported as IDP requires Web Modeler.
:::

To learn more about this feature, see [intelligent document processing](/components/modeler/web-modeler/intelligent-document-processing.md).

<!-- https://github.com/camunda/camunda-docs/issues/4575, https://github.com/camunda/product-hub/issues/2521 -->

### Play multi-tenancy <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

Use your existing development cluster with tenancy so multiple teams can develop on the same cluster without impacting each other. This feature is available for Web Modeler in Self-Managed environments.

<!-- https://github.com/camunda/product-hub/issues/2653 -->

### Process landscape visualization

Process landscape visualization provides a comprehensive, hierarchical view of all related processes. This release enables automation leads to:

- Visualize the entire process landscape of a project in a single, interactive interface.
- Drill down from high-level processes to detailed sub-processes and activities.

To learn more about this feature, see [process landscape visualization](/components/modeler/web-modeler/process-landscape-visualization.md).

<!-- https://github.com/camunda/product-hub/issues/2432 -->

### Robotic Process Automation (RPA) production-ready

The [RPA solution](/components/rpa/overview.md) is graduating to [production-ready](/components/rpa/production.md), empowering customers to deploy robust, scalable, and maintainable automation workflows seamlessly.

As RPA tasks are now available within BPMN diagrams for automation, users can now implement, troubleshoot, and maintain automation RPA scripts in Desktop Modeler, and deploy and manage RPA files in Zeebe. This major update introduces a suite of powerful features designed to enhance the development, deployment, and management of [RPA scripts](/components/rpa/getting-started.md).

We recommend reviewing the [current known issues for RPA](https://github.com/camunda/rpa-worker/discussions/categories/known-issues) to ensure environment compatibility.

<!-- https://github.com/camunda/product-hub/issues/2533 -->

### Web Modeler governance and change control

Web Modeler now supports stronger governance and change control. This ensures safe production deployment for processes with low to medium complexity and criticality. The following capabilities are now available:

- Reviews cannot be performed by the user who created the process application version, and the reviewer is logged in the version history of a process application.
- Admins can enable production deployments for reviewed process applications as an alternative to using their own deployment pipeline.

To learn more about this feature, see [process governance](/components/modeler/web-modeler/process-application-pipeline.md).

<!-- https://github.com/camunda/product-hub/issues/2583 -->

## 8.7.0-alpha4

| Release date     | Changelog(s)                                                                                                                                                                               | Blog                                                                                  |
| :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------ |
| 11 February 2025 | <ul><li>[ Camunda 8 core ](https://github.com/camunda/camunda/releases/tag/8.7.0-alpha4)</li><li>[ Connectors ](https://github.com/camunda/connectors/releases/tag/8.7.0-alpha4)</li></ul> | [Release blog](https://camunda.com/blog/2025/02/camunda-alpha-release-february-2025/) |

### BPMN Copilot <span class="badge badge--long" title="This feature affects SaaS">SaaS</span>

With the new BPMN Copilot for SaaS, go from 0 to 80% of a process diagram in minutes. Generate process diagrams from natural language descriptions, then collaborate on them with colleagues.

For more information, see the [BPMN Copilot documentation](/components/early-access/alpha/bpmn-copilot/bpmn-copilot.md).

<!-- https://github.com/camunda/product-hub/issues/2511 -->

### Ad-hoc sub-processes

A new [ad-hoc sub-process](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md) BPMN element is now supported. This new kind of subprocess allows more flexible process flows with a compact visual representation. It is the first step towards dynamic processes and execution of ad-hoc activities.

<!-- https://github.com/camunda/product-hub/issues/2546 -->

## 8.7.0-alpha3

| Release date    | Changelog(s)                                                                                                                                                                                 | Blog                                                                                |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| 14 January 2025 | <ul><li>[ Camunda 8 core ](https://github.com/camunda/camunda/releases/tag/8.7.0-alpha3)</li><li>[ Connectors ](https://github.com/camunda/connectors/releases/tag/8.7.0-alpha3.2)</li></ul> | [Release blog](https://camunda.com/blog/2025/01/camunda-alpha-release-january-2025) |

<!-- https://github.com/camunda/product-hub/issues/2473 -->

### Amazon OpenSearch Optimize support <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Optimize">Optimize</span>

:::note
This feature was originally released with 8.7.0-alpha3, and is no longer available in 8.7.0. Amazon OpenSearch Optimize support is now available in [8.8.0-alpha1](/reference/announcements-release-notes/880/880-announcements.md#amazon-opensearch-optimize-support-self-managedoptimize). For more information, see the Camunda 8.7 and 8.8 [release update blog](https://camunda.com/blog/2025/01/camunda-87-88-release-update/).
:::

Camunda 8 Self-Managed now fully supports the use of Amazon OpenSearch with Optimize.

<!-- https://github.com/camunda/product-hub/issues/2374 -->

### Camunda cluster update API <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects APIs">API</span>

You can now use the Camunda 8 SaaS [Administration API](/apis-tools/administration-api/administration-api-reference.md) to update a cluster to a new generation.

- This allows you to trigger automated simultaneous updates for multiple clusters via the API.
- Send a PUT request to the Administration API `Update cluster` endpoint.

### Connectors <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects connectors">Connectors</span>

New connectors and enhancements are included in this release.

<!-- https://github.com/camunda/product-hub/issues/2552 -->

#### AWS S3 connector

Use the new outbound Amazon S3 connector to interact with [Amazon Simple Storage Service (Amazon S3)](https://aws.amazon.com/S3/) from your BPMN process.

This connector supports the following operations:

- **Upload Document**: Upload a document to an AWS S3 bucket.
- **Download Document**: Download a document from an AWS S3 bucket.
- **Delete Document**: Delete a document from an AWS S3 bucket.

To learn more about this connector, see [Amazon S3 connector](/components/connectors/out-of-the-box-connectors/amazon-s3.md).

<!-- https://github.com/camunda/product-hub/issues/2399 -->

#### Box connector

Use the new outbound Box connector to interact with [Box.com](https://www.box.com/) account content from your BPMN process.

This connector supports the following operations:

- **Download File**: Download files into the Camunda document store.
- **Upload File**: Upload files from Camunda to Box.
- **Delete File**: Delete file items in Box.
- **Move File**: Move files between folders in Box.
- **Create Folder**: Create new folders in your Box account.
- **Delete Folder**: Delete folders from your Box account.
- **Search**: Search file items using the Box search API.

To learn more about this connector, see [Box connector](/components/connectors/out-of-the-box-connectors/box.md).

<!-- https://github.com/camunda/product-hub/issues/2555 -->
<!-- https://github.com/camunda/product-hub/issues/2592 -->
<!-- https://github.com/camunda/connectors/pull/3751 -->
<!-- https://github.com/camunda/connectors/pull/3746 -->

### Document handling <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects APIs">API</span><span class="badge badge--medium" title="This feature affects Modeler">Modeler</span>

New features are available as part of the enhanced document handling being delivered with the 8.7 release.

- The document store API supports uploading files in batches.
- The document reference is extended with a document hash as an additional security mechanism.
- The AWS S3 document store is implemented.
- User task attachments and a [document preview component](/components/modeler/forms/form-element-library/forms-element-library-document-preview.md) in forms are supported. This enhances document-centric human workflows with file preview and download support in forms, simplifying the handling of large data and documents.
- Document handling support is added to the [REST](/components/connectors/protocol/rest.md) and [Amazon Bedrock](/components/connectors/out-of-the-box-connectors/amazon-bedrock.md) connectors.

<!-- https://github.com/camunda/product-hub/issues/2469 -->

### GitLab sync <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Modeler">Modeler</span>

Web Modeler now supports native integration between a process application and a branch of a GitLab repository.

Non-technical users in orgs running GitLab can now easily access the files in their source of truth, collaborate cross-platform with Desktop Modeler users, and contribute changes to a feature branch that can be easily merged and deployed.

To learn more about this feature, see [Git sync](/components/modeler/web-modeler/git-sync.md).

<!-- https://github.com/camunda/product-hub/issues/2502 -->

### Process Instance Migration <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Zeebe">Zeebe</span>

:::note
This feature was originally released with 8.7.0-alpha3, and is no longer available in 8.7.0. Process instance migration is now available in [8.8.0-alpha1](/reference/announcements-release-notes/880/880-announcements.md#process-instance-migration-saasself-managedzeebe). For more information, see the Camunda 8.7 and 8.8 [release update blog](https://camunda.com/blog/2025/01/camunda-87-88-release-update/).
:::

Enhanced process instance migration now supports additional BPMN elements, enabling smoother transitions for your workflows and empowering operations teams to seamlessly migrate running process instances to updated process definitions without workarounds or manual intervention.

You can migrate running process instances containing the following elements:

- **Parallel Gateways**: Ensure smooth transitions for concurrent workflows.
- **Inclusive Gateways**: Migrate workflows that rely on inclusive logic.
- **Compensation and Escalation Events**: Maintain error-handling and recovery mechanisms.

To learn more about migration, see [process instance migration](/components/concepts/process-instance-migration.md).

<!-- https://github.com/camunda/product-hub/issues/1314 -->

### Replay scenarios <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Modeler">Modeler</span>

In Camunda 8 SaaS, you can now use Play to quickly repeat manual test suites by recording and playing back process instances as scenarios.

For example, you can validate your process by creating and rerunning scenarios for different paths to check the process works as expected after any diagram changes are made.

- As you save completed instances as scenarios, Play calculates the percent of elements covered by the scenario suite.
- This is the first step towards bringing automated testing into Web Modeler, and enabling business and IT to collaborate on automated tests.

To learn more about this feature, see [Play scenarios](/components/modeler/web-modeler/play-your-process.md#scenarios).

<!-- https://github.com/camunda/product-hub/issues/2073 -->

### Unified deployment experience from Web Modeler <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Modeler">Modeler</span>

The deployment experience is further simplified for Enterprise customers running Web Modeler Self-Managed.

The predefined development stage cluster for the process application is also used when launching Play. This feature is already available in SaaS, and is now also available for Self-Managed as part of unifying the deployment experience.

<!-- https://github.com/camunda/product-hub/issues/1822 -->

### User task listeners <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Modeler">Modeler</span><span class="badge badge--medium" title="This feature affects Operate">Operate</span>

:::note
This feature was originally released with 8.7.0-alpha2, and is no longer available in 8.7.0. User task listeners are now available in [8.8.0-alpha1](/reference/announcements-release-notes/880/880-announcements.md#user-task-listeners-saasself-managedmodeleroperate). For more information, see the Camunda 8.7 and 8.8 [release update blog](https://camunda.com/blog/2025/01/camunda-87-88-release-update/).
:::

Task lifecycle management is enhanced with user task listeners, allowing users to react to specific user task lifecycle events.

- Process designers can now model task listeners for different events, such as `assigning` and `completing`.
- Developers can use the same job infrastructure to activate and complete task listener jobs.
- Operations engineers can easily check details of active and completed task listeners within instances, and efficiently resolve task listener incidents.

This enhancement streamlines operations and ensures smoother incident handling, improving time to unblock process execution.

<!-- https://github.com/camunda/product-hub/issues/2126 -->

### Zeebe user tasks modeling migration support <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Modeler">Modeler</span>

User task implementation type "Zeebe user task" is renamed to "Camunda user task", and set as the default implementation type.

:::note
As Job-worker user tasks managed by Camunda will be deprecated in Camunda 8.9, Camunda recommends you start using Camunda User Tasks (formerly known as Zeebe User Task) in your process definitions. To learn more, see [Announcements](/reference/announcements-release-notes/870/870-announcements.md#deprecated-job-based-user-tasks-querying).
:::

## 8.7.0-alpha2

| Release date     | Changelog(s)                                                                                                                                                                                 | Blog                                                                                  |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------ |
| 10 December 2024 | <ul><li>[ Camunda 8 core ](https://github.com/camunda/camunda/releases/tag/8.7.0-alpha2)</li><li>[ Connectors ](https://github.com/camunda/connectors/releases/tag/8.7.0-alpha2.1)</li></ul> | [Release blog](https://camunda.com/blog/2024/12/camunda-alpha-release-december-2024/) |

<!-- https://github.com/camunda/camunda-platform-helm/issues/2662 -->

:::caution

This [alpha release](/reference/announcements-release-notes/release-policy.md) contains a known issue where Self-Managed customers using the 8.7.0-alpha2 Helm chart cannot login to Operate. This issue is due to key architecture refactoring and improvements, and will be resolved in the next release.

:::

<!-- https://github.com/camunda/product-hub/issues/2244 https://github.com/camunda/product-hub/issues/2245 -->

### Camunda 8 REST API Query API <span class="badge badge--medium" title="This feature affects APIs">API</span>

:::note
The Query API was promoted from an alpha feature to stable in 8.7.0-alpha2, but is now moved back to an alpha feature for the 8.7 release. The stable Query API is now available in [8.8.0-alpha1](/reference/announcements-release-notes/880/880-announcements.md#camunda-8-rest-api-query-api-api). For more information, see the Camunda 8.7 and 8.8 [release update blog](https://camunda.com/blog/2025/01/camunda-87-88-release-update/).
:::

You can now use a single Query API in the Camunda 8 REST API to find process and decision data instead of using multiple component APIs.

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

### Connectors <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects connectors">Connectors</span>

New connectors and enhancements are included in this release.

#### AWS Amazon Comprehend connector

The new Amazon Comprehend connector allows you to integrate your BPMN service with Amazon Comprehend, a service which extracts insights about the content of documents, such as personal identifiable information (PII) and key phrases.

To learn more about this connector, see [Amazon Comprehend connector](/components/connectors/out-of-the-box-connectors/amazon-comprehend.md).

#### Email connector attachments

The Email connector is enhanced as follows:

- Supports attachments stored in the document store.
- Supports custom headers.
- Messages can now be sent as plaintext, HTML, or in both formats.

To learn more about this connector, see [Email connector](/components/connectors/out-of-the-box-connectors/email.md).

#### Google Gemini connector

The new Google Gemini connector allows you to access Gemini multimodal models from Google, capable of understanding virtually any input, and combining different types of information in your BPMN process.

To learn more about this connector, see [Google Gemini connector](/components/connectors/out-of-the-box-connectors/google-gemini.md).

#### Webhook connector document upload

Document upload is now supported by the Webhook connector. Uploads can now be stored in the document store and are available for further processing for start and intermediate events.

- Use the `documents` object to access created documents in both the response expression and the result expression.
- The `documents` object contains the references for created documents.

To learn more about this feature, see [HTTP Webhook connector](/components/connectors/protocol/http-webhook.md).

### Connector Runtime <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects connectors">Connectors</span>

#### Spring Zeebe SDK and Camunda 8 REST API Migration

:::note
This feature was originally released with 8.7.0-alpha3, and is no longer available in 8.7.0. The Camunda 8 REST API migration is now available in [8.8.0-alpha1](/reference/announcements-release-notes/880/880-announcements.md#spring-sdk-and-camunda-rest-api-migration). For more information, see the Camunda 8.7 and 8.8 [release update blog](https://camunda.com/blog/2025/01/camunda-87-88-release-update/).
:::

The connectors experience is enhanced with the migration from the Spring Zeebe to the Camunda 8 REST API, and the removal of dependency on the Operate client.

#### Testing Support migration

Connectors are supported in the Camunda Process Test (CPT) Java library you can use to test your BPMN processes and process application.

To learn more about this feature, see [Camunda Process Test getting started](/apis-tools/testing/getting-started.md).

<!-- https://github.com/camunda/product-hub/issues/2548 -->

### Cluster disk space cleared for paused trial clusters <span class="badge badge--long" title="This feature affects SaaS">SaaS</span>

Cluster disk space is cleared when a trial cluster is paused.

- You will need to redeploy processes to the cluster once it is resumed from a paused state.
- Cluster configuration settings (for example, API Clients, connector secrets, and IP allowlists) are saved so you can easily resume a cluster.

<!-- https://github.com/camunda/product-hub/issues/2409 -->

### Document handling <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

New features are available as part of the enhanced document handling being delivered with the 8.7 release.

- A new Document API is available as part of the [Camunda 8 REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md).
- The [Java client](/apis-tools/java-client/getting-started.md) is enhanced to support these new Document API methods.
- A document store concept is introduced and implemented as an in-memory and a GCP-based document store.
- A new Tasklist [Filepicker component](/components/modeler/forms/form-element-library/forms-element-library-filepicker.md) is added for uploading documents to the document store in a form.
- The [Connector SDK](/components/connectors/custom-built-connectors/connector-sdk.md) is enhanced to provide document support in property/variable bindings.
- The [Webhook connector](/components/connectors/protocol/http-webhook.md) supports Documents via the `documents` object.

<!-- https://github.com/camunda/product-hub/issues/2530 -->

### Export activity logs in Console <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Console">Console</span>

You can export activity logs as JSON or CSV files from the Console UI or API.

- **UI:** On the Organization management **Activity** tab, click **Export activity**.
- **API:** Send a GET request to the Management API `GetJson` or `GetCsv` endpoint.

To learn more about this feature, see [view organization activity](/components/console/manage-organization/view-organization-activity.md).

<!-- https://github.com/camunda/camunda/issues/24374, https://github.com/camunda/camunda/issues/24385, https://github.com/camunda/camunda/issues/24377 -->

### Process instance migration <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Zeebe">Zeebe</span>

:::note
This feature was originally released with 8.7.0-alpha2, and is no longer available in 8.7.0. Process instance migration is now available in [8.8.0-alpha1](/reference/announcements-release-notes/880/880-announcements.md#process-instance-migration-saasself-managedzeebe). For more information, see the Camunda 8.7 and 8.8 [release update blog](https://camunda.com/blog/2025/01/camunda-87-88-release-update/).
:::

Enhanced process instance migration allows you to solve problems with process definitions and use the latest process improvements.

You can now migrate the following:

- Compensation boundary event subscriptions
- Escalation boundary events
- Escalation event subprocesses

<!-- https://github.com/camunda/product-hub/issues/2556 -->

### Singapore region available for SaaS <span class="badge badge--long" title="This feature affects SaaS">SaaS</span>

A new Singapore (asia-southeast1) region is available for SaaS clusters. Use this region to:

- Improve overall processing speed and reduce latency if you operate in Singapore and Southeast Asian (SEA) countries.
- Keep cluster data within Singapore to support your local data residency and compliance needs.

To learn more about supported SaaS regions, see [regions](/components/saas/regions.md).

<!-- https://github.com/camunda/product-hub/issues/2122 -->

### Tags and properties in Self-Managed Console <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Console">Console</span>

Use custom tags and properties in Self-Managed Console to improve your orchestration cluster management.

- Administrators can now assign tags such as `prod`, `dev`, or `test` to clusters for clear identification across environments.
- Tags are shown in the Console UI, and accessible via the Administration API to streamline usage reporting and cost allocation.
- Custom properties provide contextual information about each cluster. Administrators can add detailed descriptions, team names, and include links to resources such as Grafana dashboards or internal portals, shown in the Console **Cluster Details**.

This feature allows you to differentiate clusters, ensure configurations align with production standards (for example, check TLS is enabled, correct partition counts), and improve operational efficiency by making key information more visible.

<!-- https://github.com/camunda/product-hub/issues/2073 -->

### Unified deployment experience from Web Modeler <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Modeler">Modeler</span>

The deployment experience is further simplified for Enterprise customers running Web Modeler Self-Managed.

- User tokens are used for deployments instead of machine-to-machine (M2M) tokens generated from a client ID and secret.
- You no longer need to enter a client ID and secret in the deploy modal. Instead, simply choose a cluster (or stage for process applications) and deploy.

:::note
The simplified deployment experience is not supported when [Microsoft Entra ID is used as OIDC provider](/self-managed/installation-methods/helm/configure/connect-to-an-oidc-provider.md?authPlatform=microsoftEntraId#configuration).
You still need to enter a client ID and secret in this case.
Support is targeted for [Camunda 8.8](../870-announcements/#deprecated-web-modeler-cluster-authentication-oauth-and-client_credentials-self-managed).
:::

## 8.7.0-alpha1

| Release date     | Changelog(s)                                                                                                                                                                               | Blog                                                                                  |
| :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------ |
| 12 November 2024 | <ul><li>[ Camunda 8 core ](https://github.com/camunda/camunda/releases/tag/8.7.0-alpha1)</li><li>[ Connectors ](https://github.com/camunda/connectors/releases/tag/8.7.0-alpha1)</li></ul> | [Release blog](https://camunda.com/blog/2024/11/camunda-alpha-release-november-2024/) |

### Activity log information in Console <span class="badge badge--medium" title="This feature affects Console">Console</span>

<!-- https://github.com/camunda/product-hub/issues/2528 -->

Console activity logs now contain information about changes made to secrets (add, update, remove), and Console user removals (unregistered organization users).

### Email connector <span class="badge badge--medium" title="This feature affects connectors">Connectors</span>

<!-- https://github.com/camunda/product-hub/issues/2430 -->

The new Email connector allows you to:

- Integrate your BPMN service with any email server using POP3, IMAP, or SMTP.
- Automate the retrieval, deletion, search, and organization of emails directly within your processes.

To learn more about this connector, see [Email connector](/components/connectors/out-of-the-box-connectors/email.md).

### Generate connector templates (OpenAPI + Postman) <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects connectors">Connectors</span>

<!-- https://github.com/camunda/product-hub/issues/2049 -->

You can now configure and automatically generate a custom connector template in Web Modeler. This feature simplifies creating consistent, deployable templates, making connector setup quicker and more flexible.

- You can start from a blank template or import an existing API definition such as an OpenAPI specification, Swagger specification, or a Postman collection.
- For example, download a Postman collection as a YAML file, import this into the generator, and choose which methods to include in the generated template.

To learn more about generating connector templates, see [generate a connector template](/components/modeler/web-modeler/element-templates/element-template-generator.md).

### Monorepo Git sync <span class="badge badge--medium" title="This feature affects Modeler">Modeler</span>

<!-- https://github.com/camunda/product-hub/issues/2503 -->

When configuring Git sync in Web Modeler, define the optional `/path` option to unlock new use cases.

- This option allows you to specify the path to the folder containing your process application files.
- Sync with your main branch to perform visual diffing, collaboration, and manual testing in Web Modeler. Remember not to make any changes in this branch.
- Edit the `/path` for multiple process applications to integrate Web Modeler with your existing monorepo and code assets.

To learn more about configuring Git sync, see [Git sync](/components/modeler/web-modeler/git-sync.md).

### Resize clusters on SaaS <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Console">Console</span>

<!-- https://github.com/camunda/product-hub/issues/2515 -->

Enterprise customers can flexibly resize their clusters to adjust capacity and performance.

- Increase or decrease the cluster size at any time by adding or removing hosting packages.
- For example, increase the cluster size to improve performance and add capacity, or decrease the cluster size to free up reservations for another cluster.

To learn more about this feature, see [resize a cluster](/components/console/manage-clusters/manage-cluster.md#resize-a-cluster).

### Unified deployment experience for Web Modeler <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Modeler">Modeler</span>

<!-- https://github.com/camunda/product-hub/issues/2073 -->

#### Deployment stages

Predefined deployment stages for process applications are now also available in Web Modeler Self-Managed.

- Select your dev, test, stage, and prod clusters to ensure process applications flow easily and predictably through your deployment pipeline.
- For added control, do not assign a stage or prod environment to enable rapid iteration in Web Modeler while still ensuring deployments run through your approved pipeline.

#### Simplified deployment

The deployment experience for Enterprise customers running Web Modeler Self-Managed is simplified.

- During Camunda installation, you can configure your Helm chart to decide which clusters are available from Web Modeler by default, and save their connection information.
- With this setup, you only need to select a cluster, and add secrets and a tenant ID as required.
