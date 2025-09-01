---
title: "Local development with element templates and C8 Run"
tags:
  - Element templates
  - C8 Run
description: "Learn how to make the most of C8 run when using element templates."
---

When using [element templates](/components/concepts/element-templates.md) as part of your processes in your local development with [Camunda 8 Run using docker compose](/self-managed/quickstart/developer-quickstart/c8run.md), you need to make sure that all dependencies are provisioned before hand.

This guide covers how to setup your element templates in your local environment.

## Prerequisites

- [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md) is installed in your local machine
- You have an understanding of [element templates with dependencies](/components/modeler/element-templates/element-template-with-dependencies.md).
- You are familiar with [custom connectors](/components/connectors/manage-connector-templates.md).

## Provisioning secrets

Element templates using secrets, need to have access to this values. Secrets can be added into the connector runtime using the included `connector-secrets.txt` file located at the root of the c8 run directory.

Add secrets in the format `NAME=VALUE` per line. The secrets will then be available in the connector runtime in the format secrets.NAME

For example:

```
MY_TOKEN=value
AWS_KEY=keyValue
...
```

This works when custom connector are deployed as part of the c8 run docker compose setup. If you instead decide to run the connectors differently as documented [here](/components/connectors/custom-built-connectors/host-custom-connector.md#wiring-your-connector-with-a-camunda-cluster), it is best to configure secrets as env variable.

## Provisioning custom connectors runtime

Custom connectors runtime can be added to c8 run by copying the `.jar` that contains all its dependencies to the `custom_connectors` directory located at the root of the c8 run directory.

For the purpose of this guide, we will be using a generic [Connector template](https://github.com/camunda/connector-template-outbound) as a reference.

1. Clone the repository, and execute `mvn clean verify package` to generate a deployable file. This will produce a file called `target/connector-template-0.1.0-SNAPSHOT-with-dependencies.jar`.

2. Copy it to the `custom_connectors` directory.

3. Start Camunda 8 Run using docker compose. For example, run `./start.sh --docker` (or `.\c8run.exe start -docker` on Windows) in your terminal.

4. Your connector will be ready to execute jobs when a processes uses it.

:::note
If you choose to start the connectors runtime using a different [connector runtime environment](/components/connectors/custom-built-connectors/connector-sdk.md#runtime-environments), make sure that the secrets are exposed to it also.
:::

## Provision other dependencies

To deploy additional dependencies -— for example forms, DMNs, or processes —- send a [POST request](/apis-tools/orchestration-cluster-api-rest/specifications/create-deployment.api.mdx) with the relevant files

For example:

```
curl -L 'http://localhost:8080/v2/deployments' \
-H 'Accept: application/json'
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

You can now use element template that reference the `user-signup.form`.

## Configure element template in Desktop Modeler

To make your element template available in Desktop modeler, follow the [configuring element templates in Desktop Modeler](/components/modeler/desktop-modeler/element-templates/configuring-templates.md) documentation.

### Additional resources and next steps

- [Using element templates in Desktop Modeler](/components/modeler/desktop-modeler/element-templates/using-templates.md)
- [Run your first local Camunda 8 project](/guides/getting-started-example.md)
- [Available connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md)
