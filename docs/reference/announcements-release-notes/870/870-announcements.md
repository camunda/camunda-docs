---
id: 870-announcements
title: "Announcements"
description: "Important changes and updates for the Camunda 8.7 release including deprecation & removal notices."
---

import DeployDiagramImg from '../../img/deploy-diagram-modal.png';

Important changes and updates for the Camunda 8.7 release are summarized below.

| Scheduled release date | Scheduled end of maintenance | Release notes                                                                        | Blog                                                                                            |
| :--------------------- | :--------------------------- | :----------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------- |
| 8 April 2025           | 13 October 2026              | [8.7 release notes](/reference/announcements-release-notes/870/870-release-notes.md) | [Announcing Camunda 8.7](https://camunda.com/blog/2024/11/camunda-8-7-releasing-february-2025/) |

<!--- [Ad-hoc subprocesses](#)
- [Document handling](#)
- [RPA](#)
  - [Fetch RPA resource API](#)
  - [deployResourceAPI for RPA](#) -->

<<<<<<< HEAD:docs/reference/announcements-release-notes/870/870-announcements.md

## Versioning changes

## Deprecations

## Known limitations

## Major product/feature releases

### Modeler

lorem ipsum

### Operate

lorem ipsum

## API updates <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

=======

- [Web Modeler](#web-modeler)
  - [Deploy diagram change Self-Managed {#web-modeler-deploy-diagram-change}](#deploy-diagram-change-self-managed-web-modeler-deploy-diagram-change)
  - [Milestones renamed to versions {#web-modeler-milestones-renamed-to-versions}](#milestones-renamed-to-versions-web-modeler-milestones-renamed-to-versions)
- [Southeast Asia region for SaaS customers SaaS](#southeast-asia-region-for-saas-customers-saas)
  > > > > > > > main:docs/reference/announcements/870.md

## Web Modeler

### Deploy diagram change <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span> {#web-modeler-deploy-diagram-change}

With this version, we ship a breaking change to how Web Modeler **Deploy diagram** modals work. Clusters must now be proactively [configured](/docs/self-managed/modeler/web-modeler/configuration/configuration.md#clusters) to be able to deploy from Web Modeler.

<img src={DeployDiagramImg} alt="New 8.7 deploy diagram modal" width="600px" style={{border: '0', paddingTop: '0', marginTop: '0'}} />

- In 8.6, you could still configure cluster details on the **Deploy diagram** modal when deploying.
- In 8.7, you can no longer configure cluster details on the **Deploy diagram** modal. You must [configure the cluster](/docs/self-managed/modeler/web-modeler/configuration/configuration.md#clusters) to be able to deploy from this modal.
- Note that you must also be assigned the `Zeebe` [Identity role](/docs/self-managed/identity/user-guide/roles/add-assign-role.md) to be able to deploy.

### Milestones renamed to versions {#web-modeler-milestones-renamed-to-versions}

The term "milestones" has been renamed to ["versions"](/components/modeler/web-modeler/versions.md) in Web Modeler for clarity and consistency with other Camunda 8 components. The renaming is implemented across the Web Modeler user interface and the API.

<<<<<<< HEAD:docs/reference/announcements-release-notes/870/870-announcements.md
If you are using the recommended Camunda 8 deployment option (Helm charts), the upgrade path from version 8.6 to 8.7 will be straightforward by chaninging the values file to the new syntax. Updated Helm charts will be provided to support the upgrade to the new streamlined architecture.

New migration guides will also be provided to support you when migrating from a previous Camunda version.

:::caution
Additional upgrade considerations are necessary for deployments that use custom scripts, such as Docker containers, manual installations, or custom-developed Kubernetes deployments. For these deployments, customers can either continue to deploy with their original 8.6 topology and upgrade each component independently, or adopt our Helm Chart approach for the upgrade, which allows for unifying the deployment into a single JAR or container executable.
:::

#### Separated Ingress removed

With Camunda 8.7, the Helm chart only supports combined Ingress setup, where all Camunda components run on the same Ingress object and hostname. Customers running on a separate Ingress must migrate to the combined Ingress setup, see [Ingress setup](/self-managed/setup/guides/ingress-setup.md).

The following Helm chart values have been removed:

```yaml
connectors.ingress
console.ingress
identity.ingress
operate.ingress
optimize.ingress
tasklist.ingress
webModeler.ingress
zeebeGateway.ingress
```

### Manual installation

For organizations that do not use cloud-native platforms such as Kubernetes or container services, we will publish a reference architecture that provides guidance on implementing Camunda production clusters on VM-based systems, using Amazon Web Services (AWS) EC2 as an example.

The architecture will include details on optimal instance sizing, network configurations, and security best practices, to ensure robust performance and reliability.

### Camunda Exporter

A new Camunda Exporter brings the importer and archiving logic of web components (Tasklist and Operate) closer to the distributed platform (Zeebe). The index schema is also being harmonized.

#### Harmonized index schema

Camunda is harmonizing our index structure and usage.

- This removes unnecessary duplications over multiple indices due to the previous architecture.
- With this change, several Operate indices can and will be used by Tasklist.
- New indices have been created to integrate Identity into the system.

![Harmonized indices schema](../../img/harmonized-indices-schema.png)

#### Camunda Exporter

The exporter can consume Zeebe records (mostly events created by the engine), aggregate data, and store the related data into shared and harmonized indices.

- Data is archived in the background, coupled to the exporter but without blocking the exporter's progress.
- Indices can be located in either ElasticSearch (ES) or Opensearch (OS). Our web components (Tasklist and Operate) then use the new harmonized indices to show data to the user.

The following diagram shows a simplified version of this work.

![Camunda Exporter diagram](../../img/target-camunda-exporter.png)

- For example, Tasklist and Operate Importers are still required for old data to be imported, but the Camunda exporter writes all new data into ES/OS. After old indices are drained, importers can be turned off.
- The archiver, which takes care of the archiving of completed process instances, will be moved into the Zeebe system as well, to reduce the installation complexity and provide a better scaling and replication factor (based on partitions).
- This helps achieve a streamlined architecture, and improves platform performance and stability (especially regarding ES/OS).
- A new separate component covers the migration, which will be part of the single application but can also deployed separately. It will adjust the previous Operate indices to make them more harmonized and usable by Tasklist.

<!-- :::info
Learn more about these updates in Streamlined Deployment with 8.7.
::: -->

## Camunda Java client and Camunda Spring SDK <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

With the Camunda 8.7 release, Camunda Java client and Camunda Spring SDK replace the Zeebe Java client and Zeebe Spring SDK. This allows you to use a single consolidated client to interact with Camunda clusters.

# The `CamundaClient` replaces the `ZeebeClient`, offering the same functionality and adding new capabilities.

In [the API](/apis-tools/web-modeler-api/index.md), new endpoints starting with `/api/v1/versions` have been introduced, while the previous `/api/v1/milestones` endpoints are now deprecated.
Further details can be found in [Web Modeler's OpenAPI documentation](https://modeler.camunda.io/swagger-ui/index.html).

> > > > > > > main:docs/reference/announcements/870.md

:::note
This is a nominal update and the functionality of versions and milestones is equivalent.
:::

## Southeast Asia region for SaaS customers <span class="badge badge--long" title="This feature affects SaaS">SaaS</span>

SaaS customers can now create orchestration clusters in the [Singapore (asia-southeast1) region](/reference/regions.md), ensuring lower latency and improved processing speed for organizations operating in southeast Asian countries.
