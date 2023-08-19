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

## Set up

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

### Listening to milestone creation

### Pipeline setup

#### Build stage

##### Setting up a preview cluster

:::tip
If you use GitLab, we recommend using [GitLab Review Apps](https://docs.gitlab.com/ee/ci/review_apps/) to provide those preview environments. 
:::

##### Adding environment variables via secrets

##### Auto-deploying linked resources / dependencies

#### Test stage

You can keep strict quality standards for your processes with automatic testing and reporting.

##### Lint your diagrams

You can add a step to your pipeline for automatic process verification using the [bpmnlint](https://github.com/bpmn-io/bpmnlint) and [dmnlint](https://github.com/bpmn-io/dmnlint) libraries. Both are open-source libraries maintained by the bpmn-io team at Camunda, allowing you to benefit from a bundle of default verification rules, as well as to add your own. It provides reporting capabilities to report back when the verification fails. You could even report the wrong diagram patterns together with examples to resolve it using [this extension](https://github.com/bpmn-io/bpmnlint-generate-docs-images). It is the same library Web Modeler uses to verify diagrams during modeling.

##### Unit tests

You can run unit tests with any test framework of your choice. Running on Java, you can use the [zeebe-process-test](/apis-tools/java-client/zeebe-process-test.md) library. Or use the [Java Client](/apis-tools/java-client/) and JUnit to execute your BPMN and [DMN diagrams](/apis-tools/java-client-examples/decision-evaluate.md) with assertions in your dev or preview environments automatically step-by-step. Prefer NodeJS, Python, or Go? You can also use any of our [community-built clients](/apis-tools/community-clients) and your favorite test library to do the job.

##### Integration tests

#### Review stage

##### Create a link to a visual diff for reviews

#### Push to Staging/Production stage

#### Define resource permissions

#### Monitoring and error handling
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
