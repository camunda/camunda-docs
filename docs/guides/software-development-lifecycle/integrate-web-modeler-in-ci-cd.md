---
id: integrate-web-modeler-in-ci-cd
title: Integrate Web Modeler into your CI/CD pipeline
description: A guide on how to integrate Web Modeler into CI/CD pipelines to streamline deployments of process applications.
keywords: [ci-cd, devops, modeler, processops, integration guide]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<span class="badge badge--intermediate">Intermediate</span>
<span class="badge badge--medium">Time estimate: 1 hour</span>

Web Modeler is a powerful tool for developing and deploying processes and process applications. Web Modeler allows for easy one-click deployment to a cluster. While this is helpful in development environments, teams often have integration and deployment pipelines in place to automate deployment to production. Thanks to the [Web Modeler API](/apis-tool/web-modeler-api), it is easy to integrate Web Modeler into such pipelines and align it with your team's practices and your organization's process governance.

## Prerequisites

No two pipelines look the same. The Web Modeler API is designed for flexibility, so you can tailor integrations to your pipelines. There are a few prerequisites to get started, depending on your setup:
* A version control system (VCS), such as GitHub or GitLab.
* A ready-made pipeline or a plan to set one up with tools like [CircleCI](https://circleci.com/) or [Jenkins](https://www.jenkins.io/), Cloud platforms such as [Azure DevOps Pipelines](https://azure.microsoft.com/de-de/products/devops), or VCS built-in such as [GitHub Actions](https://github.com/features/actions) or [GitLab's DevSecOps Lifecycle](https://about.gitlab.com/stages-devops-lifecycle/).
* Make yourself familiar with the [Web Modeler API](/apis-tool/web-modeler-api) by checking the OpenAPI documentation.
* Ensure you’ve [created a Camunda Platform 8 account](/guides/create-account.md), or installed [Camunda Platform 8 Self-Managed](/self-managed).

## Setup

A pipeline for process application integration and deploment has a lot of similarities with general software CI/CD pipelines, but there are also major differences. Some are:

* Web Modeler uses [milestones](/components/modeler/web-modeler/milestones.md) to reflect a certain state of a process, such as ready to handover to developers, ready for review, ready to deploy, or even just a backup.
* A process application is a set of one or more main processes, together with a diverse set of resources, such as called processes, forms, DMN models, connectors, job workers, and orchestrated services. For many applications, those resources must be packed together, for other, there's only a single process to ship.
* A process review is different from a code review as it should happen on the visual diagram, not just the XML.

![Potential CI/CD setup with Web Modeler](img/modeler-ci-cd.png)

### Obtain API clients and tokens

Before getting started, obtain API clients and tokens so you can integrate Web Modeler, but also call the process engine via API.
* [Obtain an API token for Web Modeler](http://localhost:3000/docs/next/apis-tools/web-modeler-api/#authentication)
* [Obtain an API client for Zeebe](http://localhost:3000/docs/next/guides/setup-client-connection-credentials/)

### Disable manual deployments from Web Modeler

Probably, you want to prevent manual deployments to production, or to any cluster since you want to enforce your pipelines.

<Tabs groupId="disableDeployments" defaultValue="sm" values={[{label: 'Self-Managed', value: 'sm', }, {label: 'SaaS', value: 'saas', },]} >
<TabItem value="sm">

You can disable manual deployments completely by setting environment variables `ZEEBE_BPMN_DEPLOYMENT_ENABLED` and `ZEEBE_DMN_DEPLOYMENT_ENABLED` as documented [here](/self-managed/modeler/web-modeler/configuration/configuration.md/#general).

</TabItem>
<TabItem value="saas">

Manual deployments on SaaS currently can't be restricted. We are working hard to deliver permissions to restrict deployments.

</TabItem>
</Tabs>

### Triggering CI/CD

You need a trigger to start the pipeline on a file or a project. You can decide if you want to start the pipelines manually, or listen to an event to start pipelines automatically in the background. Common setups are:

* Start the pipeline from your CI/CD tool/platform by uploading the to-be-deployed file.
* Start the CI pipeline by creating a pull/merge request in the version control system.
* Start the pipelines by listening to milestones created with certain characteristics.

#### Sync files to your version control system

You can sync files from Web Modeler to version control, and vice-versa. The Web Modeler API offers a complete set of CRUD (create, read, update, delete) operations to manage both files and projects. By syncing files from Web Modeler to your VCS, you benefit from full file ownership and avoid duplicated data housekeeping.

To automatically sync files to version control, it is beneficial to keep a second system of record that keeps track of the mapping of a Web Modeler project to a VCS repository, as well as of the last sync and update dates. 

<!-- To be added once GA released:

To listen to changes in Web Modeler, you currently need to implement a polling approach that compares the update dates with the last sync dates recorded. Use the `POST /api/beta/files/search` [endpoint](https://modeler.cloud.camunda.io/swagger-ui/index.html#/Files/searchFiles) with the following payload to find files that have been recently updated:

```json title="POST /api/beta/files/search"
{
  "filter": {
    "projectId": "<THE PROJECT YOU WANT TO SYNC>",
    "updated": "<YOUR LAST SYNC DATE>",
  ],
  "page": 0,
  "size": 50
}
```
-->

To listen to changes in Web Modeler, you currently need to implement a polling approach that compares the update dates with the last sync dates recorded. Use the `POST /api/beta/files/search` [endpoint](https://modeler.cloud.camunda.io/swagger-ui/index.html#/Files/searchFiles) with the following payload to find files that have been recently updated, and compare the `updated` date with your last sync date:

```json title="POST /api/beta/files/search"
{
  "filter": {
    "projectId": "<THE PROJECT YOU WANT TO SYNC>"
  ],
  "page": 0,
  "size": 50
}
```

:::info
For all `search` endpoints listed here, pagination is enforced by default. Make sure to obtain all pages relevant.
:::

We work to replace this with a webhook or subscription approach. Alternatively, you can trigger the sync manually, or let something else trigger the sync, such as the pipeline itself, or at the creation of a new branch or a pull/merge request.

A realtime sync is not always what you need. Consider Web Modeler working like a local repository, you want to update your remote repository only after files have been committed + pushed. What's closest to a commit + push in Web Modeler is the [milestones](/components/modeler/web-modeler/milestones.md) feature.

#### Listening to milestone creation

A milestone reflects a state of a file in Web Modeler with a certain level of qualification, such as being ready for deployment. You can use this property to trigger deployments when a certain milestone is created.

<!-- To be added once GA released:

Currently, you have to poll for milestones in order to listen to new ones created. Use the `POST /api/beta/milestones/search` [endpoint](https://modeler.cloud.camunda.io/swagger-ui/index.html#/Milestones/searchMilestones) with the following payload to find recently created milestones:

```json title="POST /api/beta/milestones/search"
{
  "filter": {
    "created": "<YOUR LAST SYNC DATE>",
  ],
  "page": 0,
  "size": 50
}
```

You will receive a response similar to this, where the `fileId` indicates the file with the milestone created:

```json
[
    {
    "metadata": {
        "id": "string",
        "name": "string",
        "fileId": "string",
        ...
    }
    },
    ...
]
```
-->

Currently, you have to poll for milestones in order to listen to new ones created. Use the `POST /api/beta/milestones/search` [endpoint](https://modeler.cloud.camunda.io/swagger-ui/index.html#/Milestones/searchMilestones) to find recently created milestones, and compare the `created` date with your last sync date:

```json title="POST /api/beta/milestones/search"
{
  "filter": {
    "fileId": "<FILE YOU ARE INTERESTED IN>",
  ],
  "page": 0,
  "size": 50
}
```

To retrieve the content of this particular milestone, use the `GET api/beta/milestones/:id` endpoint. To obtain the latest edit state of the file, use the `GET api/beta/files/:id` endpoint, which also provides the `projectId` to be used in `SEARCH api/beta/projects/search`, in case you want to push the full project through the pipeline.

We are working on another approach, such as webhook registration on milestone creation, or event subscription.

You can combine these two approaches and listen to milestones to sync files to your version control, create a pull/merge request, and trigger pipelines this way.

## Pipeline stages

Following, we present examples how to setup **build**, **test**, **review**, and **publish** stages of a pipeline.

### Build stage

There is no dedicated concept for a build package. How you structure your release artifacts depends on your overall software architecture. The build stage should focus on retrieving dependencies and deploying them into a preview environment.

#### Setting up a preview environment

To provide a preview of your process that can be automatically tested and that reviewers can interact with, you need to provide a preview cluster. There are multiple ways to do so, dependending on your software development lifecycle design, general preferences, but also if you are running on Camunda Platform 8 SaaS, self-managed, or a hybrid setup. In this guide, we propose a setup with small, local self-managed preview clusters (or embedded engines) and larger staging and production clusters, either self-managed or on SaaS.

To set up local preview environments, you can spawn a full [Zeebe](https://github.com/camunda/zeebe) cluster with all applications (including Operate and Tasklist), e.g. with docker-compose or via helm for Kubernetes. These can be found, including comprehensive documentation, in [this repository](https://github.com/camunda/camunda-platform). This provides you with all endpoints and UIs to thoroughly test the process or process application. Make sure to spawn the right cluster version that matches the version of your production cluster to ensure compatibility with the process you are deploying.

If you don't need to spawn all apps such as Operate or Tasklist, you can use the lightweight [embedded Zeebe engine](https://github.com/camunda-community-hub/eze), which is a community-maintained project, to setup a cost-effective solution with an in-memory database. Together with the [Zeebe Hazelcast exporter](https://github.com/camunda-community-hub/zeebe-hazelcast-exporter) (community-maintained as well), you can consume data generated from your process easily for reporting or testing.

In the build step, spawn a cluster or embedded engine, and deploy the process or project to it. After your pipeline is completed (e.g. the process is deployed to staging or production), you can destroy the preview environment.

:::tip
If you use GitLab, we recommend using [GitLab Review Apps](https://docs.gitlab.com/ee/ci/review_apps/) to provide these preview environments. 
:::

:::info Feature branches and Web Modeler installations

While it might be convenient to set up multiple Web Modeler instances and handle them as feature branches, we do not recommend this procedure in order to maintain a single source of truth in your organization. Please keep a single Web Modeler installation for all your environments, and use milestones to reflect versioning and pipeline stages. If you need feature branches, you can clone files or projects and merge them later back to the origin file or project using your VCS.
:::

#### Auto-deploying linked resources / dependencies

You can drive a single file through your pipelines, or a full project. You can event maintain a manifest file outside of Web Modeler yourself, such as in version control, for finer-grained dependency management.

To retrieve a full project for a file, use the `GET api/beta/files/:id` endpoint to retrieve the `projectId` of that file, and then the `POST api/beta/files/search` endpoint to retrieve all files for that project using the following payload:

```json title="POST /api/beta/files/search"
{
  "filter": {
    "projectId": "<ID OF THE PROJECT>",
  ],
  "page": 0,
  "size": 50
}
```

:::info
For all `search` endpoints listed here, pagination is enforced by default. Make sure to obtain all pages relevant.
:::

To retrieve the actual file `content`, iterate over the response and fetch it via `GET api/beta/files/:id`. You can parse the XML of the diagram for the `zeebe:taskDefinition` tag to retrieve all job worker types. Having a registry of job worker classes mapped to the types, you are then able to deploy these workers together with the process if you like.

If you are running Connectors in your process or application, you need to deploy the runtimes as well. By parsing the process XML for the binding of `zeebe:taskDefinition`, you can identify all the runtimes (next to job workers) you need to deploy along your process. To learn how to deploy Connector runtimes, read more [here](https://docs.camunda.io/docs/next/self-managed/connectors-deployment/install-and-start/) for self-managed, or [here](https://docs.camunda.io/docs/next/components/connectors/custom-built-connectors/connector-sdk/#runtime-environments) for SaaS.

#### Adding environment variables via secrets

If you are running Connectors, you need to provide environment variables, such as service endpoints and API keys, for your preview environment. You can manage these via secrets. Read the [Connectors configuration documentation](https://docs.camunda.io/docs/next/self-managed/connectors-deployment/connectors-configuration/) to learn how to set these up in SaaS or self-managed.

### Test stage

You can keep strict quality standards for your processes with automatic testing and reporting.

#### Lint your diagrams

You can add a step to your pipeline for automatic process verification using the [bpmnlint](https://github.com/bpmn-io/bpmnlint) and [dmnlint](https://github.com/bpmn-io/dmnlint) libraries. Both are open-source libraries maintained by the bpmn-io team at Camunda, allowing you to benefit from a bundle of default verification rules, as well as to add your own. It provides reporting capabilities to report back when the verification fails. You could even report the wrong diagram patterns together with examples to resolve it using [this extension](https://github.com/bpmn-io/bpmnlint-generate-docs-images). It is the same library Web Modeler uses to verify diagrams during modeling.

#### Unit and integration tests

You can run unit tests with any test framework of your choice. Running on Java, you can use the [zeebe-process-test](/apis-tools/java-client/zeebe-process-test.md) library. Or use the [Java Client](/apis-tools/java-client/) and JUnit to execute your BPMN and [DMN diagrams](/apis-tools/java-client-examples/decision-evaluate.md) with assertions in your dev or preview environments automatically step-by-step. Prefer NodeJS, Python, or Go? You can also use any of our [community-built clients](/apis-tools/community-clients) and your favorite test library to do the job.


### Review stage

#### Create a link to a visual diff for reviews

TODO

A successful review stage could be reflected by a new milestone in Web Modeler. Using the `milestones` TODO endpoint, you can create a new milestone easily, and provide a description to reflect the state of this milestone.

TODO image of published milestone

<iframe src="https://modeler.cloud.ultrawombat.com/embed/35868bd2-a690-48de-a069-aa8ae6b3a846" style={{width: "100%", height: "500px", border: "1px solid #ccc"}} allowfullscreen></iframe>

### Publish stage

Push approved changes to staging or production by deploying them to the respective clusters. You can use the `zbctl` CLI to deploy via your pipeline, which works both for a SaaS or self-managed cluster. Deployments work slightly different on SaaS and Self-Managed, since there are dfferences in the cluster connection. Read more about deployments [here](/apis-tools/working-with-apis-tools.md#deploy-processes-start-process-instances-and-more-using-zeebe-client-libraries).

TODO

#### Define resource permissions

In case you have [resource permissions](TODO) enabled on your cluster, you have to assign these permissions via the pipeline in order to make the process accessible to the right people in your organization, or to update these permissions.

Use the Identity API to create and update these permissions. TODO TODO

##### Monitoring and error handling
As with any CI/CD integration, it's crucial to set up monitoring and error handling mechanisms. These can include:

- Monitoring the CI/CD pipeline execution for errors and failures.
- Use Operate 
- Sending notifications or alerts in case of deployment issues.
- Implementing rollback mechanisms in case a faulty BPMN diagram gets deployed.

## FAQ

### Can I do blue-green deployments on Camunda Platform 8?

This is possible with limitations: while it's possible to switch clusters without notable delay for new process instances, the audit logs and already running process instances are tied to the previous cluster. You could read the audit log from ElasticSearch or OpenSearch to your own streams. If you don't have to migrate running process instances, you can keep them running on the previous cluster, and new instances will be started on the new production cluster.

## Additional resources and next steps

- [Camunda Platform 8 Overview](https://bit.ly/3TjNEm7)
- [Web Modeler API](/apis-tools/web-modeler-api/index.md)
