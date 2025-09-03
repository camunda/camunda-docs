---
title: "Local development with element templates and C8Run"
tags:
  - Element templates
  - C8Run
description: "Learn how to make the most of C8Run when using element templates."
---

When using [element templates](/components/concepts/element-templates.md) as part of your processes in your local development environment with [Camunda 8 Run using Docker Compose](/self-managed/quickstart/developer-quickstart/c8run.md), you need to make sure that all dependencies are provisioned beforehand.

This guide covers how to setup element templates in your local environment.

## Prerequisites

- [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md) is installed on your local machine.
- You have an understanding of [element templates with dependencies](/components/modeler/element-templates/element-template-with-dependencies.md).
- You are familiar with [custom connectors](/components/connectors/manage-connector-templates.md).

## Provisioning secrets

Element templates using secrets need to have access to these values. Secrets can be added to the connector runtime using the included `connector-secrets.txt` file located in the root folder of the C8Run directory.

Add secrets in the format `NAME=VALUE`, one per line. The secrets will then be available in the connector runtime in the format `secrets.NAME`.

For example:

```
MY_TOKEN=value
AWS_KEY=keyValue
...
```

In this case, the `MY_TOKEN` can be referenced as `secrets.MY_TOKEN`.

This works when custom connectors are deployed as part of the C8Run Docker Compose setup. If you instead decide to run the connectors differently as documented [here](/components/connectors/custom-built-connectors/host-custom-connector.md#wiring-your-connector-with-a-camunda-cluster), it is best to configure secrets as environment variables.

## Provisioning a custom connectors runtime

A custom connector runtime can be added to C8Run by copying the `.jar` file that contains all the connector dependencies to the `custom_connectors` directory located in the root folder of the C8Run directory.

For the purpose of this guide, we will be using a generic [connector template](https://github.com/camunda/connector-template-outbound) as a reference.

1. Clone the repository, and execute `mvn clean verify package` to generate a deployable file. This will produce a file called `target/connector-template-0.1.0-SNAPSHOT-with-dependencies.jar`.

2. Copy it to the `custom_connectors` directory.

3. Start Camunda 8 Run using Docker Compose. For example, run `./start.sh --docker` (or `.\c8run.exe start -docker` on Windows) in your terminal.

4. Your connector will be ready to execute jobs when a process uses it.

:::note
If you choose to start the connector runtime using a different [connector runtime environment](/components/connectors/custom-built-connectors/connector-sdk.md#runtime-environments), make sure that the secrets are exposed to it also.
:::

## Provision other dependencies

### Using Desktop Modeler

Deploy your element template dependencies using [Desktop Modeler](/components/modeler/desktop-modeler/index.md) by following the [self-managed deployment guide](/self-managed/components/modeler/desktop-modeler/deploy-to-self-managed.md).

The described process applies not only to BPMN diagrams, but also to forms, DMN diagrams and RPA scripts.

### Using the Cluster API

If you prefer an automated approach, you can easily write scripts that use the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) to deploy.

To deploy additional dependencies -- for example, forms, DMN diagrams, or subprocesses -- send a [POST request](/apis-tools/orchestration-cluster-api-rest/specifications/create-deployment.api.mdx) with the relevant files.

For example:

```
curl -L 'http://localhost:8080/v2/deployments' \
-H 'Accept: application/json' \
-F resources=@/pathToYourForm/user-signup.form
```

You will get a response containing the details of the deployed elements:

```json
{
  "deployments": [
    {
      "form": {
        "formKey": "KEY_OF_THE_FORM",
        "formId": "user-signup",
        "version": 1,
        "resourceName": "user-signup.form",
        "tenantId": "<default>"
      }
    }
  ],
  "deploymentKey": "KEY_OF_THE_DEPLOYMENT",
  "tenantId": "<default>"
}
```

You can now use element templates that reference the `user-signup.form`.

## Configure element templates in Desktop Modeler

To make your element templates available in Desktop Modeler, follow the [configuring element templates in Desktop Modeler](/components/modeler/desktop-modeler/element-templates/configuring-templates.md) documentation.

## Additional resources and next steps

- [Using element templates in Desktop Modeler](/components/modeler/desktop-modeler/element-templates/using-templates.md)
- [Run your first local Camunda 8 project](/guides/getting-started-example.md)
- [Available connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md)
