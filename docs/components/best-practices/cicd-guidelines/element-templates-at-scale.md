---
id: element-templates-at-scale
title: "Element templates at scale"
description: "To effectively use your element templates in your Web Modeler organization, learn how to use a pipeline to provision them at runtime and make them available at design time."
---

To effectively manage large libraries of reusable building blocks ([element templates](/components/concepts/element-templates.md)), you can create a pipeline that will be reponsible for provisioning the [dependencies of element templates](/components/modeler/element-templates/element-template-with-dependencies.md) to the required clusters, and make them available at design time to different projects within an organization.

![pipeline goal](./img/pipeline-goal.png)

In this guide we will cover conceptually, what your pipeline needs to do.

We will start assuming there is a [VCS](https://en.wikipedia.org/wiki/Version_control) repository that contains all the element templates.

We will also assume that you are using separate system of record, maintained outside Web Modeler, to keep track of which template needs to be available in each cluster, and also which Web Modeler projects need the element templates.

The pipeline will use:

- The [Orchestration Cluster API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) to provision the dependencies to the required clusters.
- The [Web Modeler API](/apis-tools/web-modeler-api/index.md) to keep a [shared project](/components/modeler/web-modeler/use-shared-project-for-organization-wide-collaboration.md) in sync in order to make the element templates available.

For simplicitly, lets assume you are going to be syncing the repository with a single cluster and a single project in WebModeler. Also we will assume you are working with a single organization.

## Obtain API clients and tokens

Before getting started, obtain API clients and tokens for integrating Web Modeler and accessing the process engine via API:

- [Obtain an API token for Web Modeler](/apis-tools/web-modeler-api/authentication.md)
- [Obtain an API client for the Orchestration Cluster API](apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md)

## Runtime provisioning

### Secrets

Depending on your setup, there are multiple ways in which the secrets can be provided.

In SaaS, you can use the [Administration API](docs/apis-tools/administration-api/administration-api-reference.md) to programatically configure the secrets in your clusters, or even [Console UI](/components/console/manage-clusters/manage-secrets.md).

For self-managed and local development, there are other alternatives but this have to be done outside the pipeline. Read more about it in our [connector secrets](/self-managed/components/connectors/connectors-configuration.md#secrets) documentation.

### Job Workers

As part of the pipeline, you could spin up a service and connect it to the cluster. But this can also happen in a different pipeline.

There are a couple of alternatives on how to achieve this. We recommend reading our documentation about [outbound connectors vs. job workers](/components/concepts/outbound-connectors-job-workers.md) and [host custom connectors](/components/connectors/custom-built-connectors/host-custom-connector.md).

### Other dependencies

The following dependency types are provisioned at runtime using the [Orchestration Cluster API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md):

- [Camunda forms](/components/modeler/forms/camunda-forms-reference.md): used in user tasks.
- [RPA scripts](/components/rpa/overview.md): Used in service tasks.
- [BPMN tasks](/components/modeler/bpmn/bpmn.md): used in call activities.
- [DMN decisions](/components/modeler/dmn/dmn.md): used in business rule tasks.

To deploy these dependencies in your cluster you need to send a [POST request](/apis-tools/orchestration-cluster-api-rest/specifications/create-deployment.api.mdx) with the files that need to be deployed. This works for SaaS, self-managed and local development.

## Make templates available in Web Modeler

Using the [Web Modeler API](/apis-tools/web-modeler-api/index.md) the pipeline:

1. [Gets the project metadata](https://modeler.camunda.io/swagger-ui/index.html#/Projects): We want to know the project ID so we can retrieve the content available in Web Modeler. This allows the pipeline to translate changes into the repository into CRUD operations.

```json title="POST /api/v1/projects/search"
{
  "filter": {
    "name": "(PROJECT NAME)"
  },
  "page": 0,
  "size": 50
}
```

:::info
Pagination is enforced for all listed `search` endpoints. Ensure you obtain all relevant pages.
:::

Alternatively, you can use a separate system of record to keep the project IDs.

2. [Gets the files metadata](https://modeler.camunda.io/swagger-ui/index.html#/Files): With the project ID, we can get the list of files and their metadata, and check which files in the repository need to be created or updated.

```json title="POST /api/v1/files/search"
{
  "filter": {
    "projectId": "(PROJECT ID)"
  },
  "page": 0,
  "size": 50
}
```

3. For each file in the repository executes the corresponding request based on if it is a [create](https://modeler.camunda.io/swagger-ui/index.html#/Files/createFile) or [update](https://modeler.camunda.io/swagger-ui/index.html#/Files/patchFile).

4. For each file, determines if a new version is needed and publishes it to the project using the [Versions resource](https://modeler.camunda.io/swagger-ui/index.html#/Versions). By creating this versions, we make the templates avaiable to BPMN diagrams inside the project.

## Make templates available in Desktop Modeler

To setup your local environment, you just need to get access to the VCS repository containing the templates, and choose how to [configure them](/components/modeler/desktop-modeler/element-templates/configuring-templates.md) depending on your needs.

### Next steps

Refer to our [Integrate Web Modeler in CI/CD](components/modeler/web-modeler/integrate-web-modeler-in-ci-cd.md) guide for additional CI/CD-related information.
