---
title: "Local development with element templates and Camunda 8 Run"
tags:
  - Element templates
  - Camunda 8 Run
description: "Learn how to use Camunda 8 Run with element templates in your local development environment."
---

When working with [element templates](/components/concepts/element-templates.md) in your local development environment using [Camunda 8 Run with Docker Compose](/self-managed/quickstart/developer-quickstart/c8run.md), ensure all dependencies are provisioned before you start.

This guide explains how to set up element templates in your local environment.

## Prerequisites

- [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md) installed on your local machine.
- Basic knowledge of [element templates with dependencies](/components/modeler/element-templates/element-template-with-dependencies.md).
- Familiarity with [custom connectors](/components/connectors/manage-connector-templates.md).

## Provisioning secrets

If your element templates use secrets, you must provide these values to the connector runtime.

Add secrets to the `connector-secrets.txt` file in the root directory of your Camunda 8 Run setup. Use the following format, with one secret per line:

```
NAME=VALUE
```

These secrets will then be available in the connector runtime using the format `secrets.NAME`.

For example:

```
MY_TOKEN=value
AWS_KEY=keyValue
...
```

In this case, the `MY_TOKEN` secret can be referenced as `secrets.MY_TOKEN`.

This applies when custom connectors are deployed as part of the Camunda 8 Run Docker Compose setup.  
If you choose to run connectors differently, as described in the [custom connector hosting guide](/components/connectors/custom-built-connectors/host-custom-connector.md#wiring-your-connector-with-a-camunda-cluster), configure secrets as environment variables instead.

## Provisioning a custom connector runtime

You can add a custom connector runtime to Camunda 8 Run by copying the `.jar` file containing all connector dependencies into the `custom_connectors` directory in the root folder of your Camunda 8 Run setup.

This guide uses a generic [connector template](https://github.com/camunda/connector-template-outbound) as a reference.

1. Clone the repository and run the following command to generate a deployable file:

   ```bash
   mvn clean verify package
   ```

This command creates a file named `target/connector-template-0.1.0-SNAPSHOT-with-dependencies.jar`.

2. Copy the `.jar` file into the `custom_connectors` directory.
3. Start Camunda 8 Run with Docker Compose. For example:

```

./start.sh --docker

```

On Windows, use:

```

.\c8run.exe start -docker

```

4. Your connector is ready to execute jobs when a process references it.

If you use a different [connector runtime environment](/components/connectors/custom-built-connectors/connector-sdk.md#runtime-environments), ensure that secrets are also exposed to that runtime.

## Provisioning other dependencies

### Using Desktop Modeler

Deploy element template dependencies using [Desktop Modeler](/components/modeler/desktop-modeler/index.md) by following the [self-managed deployment guide](/self-managed/components/modeler/desktop-modeler/deploy-to-self-managed.md).

This process applies to BPMN diagrams, forms, DMN diagrams, and RPA scripts.

### Using the Cluster API

For an automated approach, write scripts that use the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) to deploy dependencies.

To deploy additional dependencies—such as forms, DMN diagrams, or subprocesses—send a [POST request](/apis-tools/orchestration-cluster-api-rest/specifications/create-deployment.api.mdx) with the relevant files.

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

You can use element templates that reference the `user-signup.form`.

## Configure element templates in Desktop Modeler

To make your element templates available in Desktop Modeler, see the [configuration guide](/components/modeler/desktop-modeler/element-templates/configuring-templates.md).

## Additional resources and next steps

- [Using element templates in Desktop Modeler](/components/modeler/desktop-modeler/element-templates/using-templates.md)
- [Run your first local Camunda 8 project](/guides/getting-started-example.md)
- [Available connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md)
