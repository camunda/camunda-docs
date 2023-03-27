---
id: power-automate
title: Power Automate Connector
description: Orchestrate your Power Automate Desktop Flows with Camunda to trigger, get the status, or get the outputs of the flow.
---

The **Power Automate Connector** allows you to orchestrate a Power Automate Desktop Flow from your BPMN process with [Power Automate](https://powerautomate.microsoft.com).

:::note
This Connector is designed to orchestrate desktop flows only.
:::

## Prerequisites

To use the Power Automate Connector, ensure you have configured the following:

1. [Azure AD application](https://portal.azure.com) with proper permissions. Visit the [official documentation](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/walkthrough-register-app-azure-active-directory#create-an-application-registration) to see how you can create one.
2. [Create an application user](https://learn.microsoft.com/en-us/power-platform/admin/manage-application-users#create-an-application-user) and add security roles.
3. [Power Automate desktop application](https://learn.microsoft.com/en-us/power-automate/desktop-flows/install), and sign in to create your Power Automate Flow.
4. [Power Automate machine runtime desktop application](https://learn.microsoft.com/en-us/power-automate/desktop-flows/manage-machines#register-a-new-machine) to manage and troubleshoot machine settings, and enable the on-premise data gateway to access your machine data.
5. Power Automate [on-premises data gateway desktop application](https://learn.microsoft.com/en-us/power-automate/desktop-flows/install#install-an-on-premises-data-gateway) to create a connection between the cloud environment and your desktop app.

## Create a Power Automate Connector task

To use a **Power Automate Connector** in your process, either change the type of existing task using the wrench-shaped **Change type** context menu, or create a new Connector task using the **Append Connector** context menu. Follow [our guide on using Connectors](../use-connectors.md) to learn more.

## Operation types

The Power Automate Connector currently supports three operation types in the **Operation type** dropdown list: _Get the status of a flow run_, _Get flow outputs_, and _Trigger a flow run_.

![Power Automate Connector operations](../img/connectors-power-automate-operations.png)

### Authentication

You can choose among the available Power Automate Connector authentication types according to your authentication requirements.

### Power Automate Connector (bearer token)

#### Create a new Connector secret

We advise you to keep your **Bearer Token** safe and avoid exposing it in the BPMN `xml` file by creating a secret:

1. Follow our [guide for creating secrets](../../console/manage-clusters/manage-secrets.md).
2. Name your secret (i.e `POWER_AUTOMATE_BEARER_TOKEN`) so you can reference it later in the Connector.

#### Configure the bearer token

[Click here](#get-bearer-token-with-postman) to see how to get the Bearer token with Postman.

Select the **Power Automate Connector** and fill out the following properties under the **Authentication** section:

1. Click **Bearer Token** in the **Authentication** section.
2. Set **Bearer** to the secret you created (i.e. `secrets.POWER_AUTOMATE_BEARER_TOKEN`).

![Power Automate Connector bearer token](../img/connectors-power-automate-bearer-token.png)

### OAuth 2.0

#### Create a new Connector secret

We advise you to keep your **Client ID** safe and avoid exposing it in the BPMN `xml` file by creating a secret:

1. Follow our [guide for creating secrets](../../console/manage-clusters/manage-secrets.md).
2. Name your secret (i.e `POWER_AUTOMATE_CLIENT_ID`) so you can reference it later in the Connector.

#### Configure the OAuth Token

Select the **Power Automate Connector** and fill out the following properties under the **Authentication** section:

1. Click **OAuth 2.0** in the **Authentication** section.
2. Set **Client Id** to the secret you created (i.e. `secrets.POWER_AUTOMATE_CLIENT_ID`).
3. Set **Client secret** to the secret you created (i.e. `secrets.POWER_AUTOMATE_CLIENT_SECRET`).
4. Set **OAuth Token Endpoint** to the secret you created (i.e. `secrets.POWER_AUTOMATE_TOKEN_ENDPOINT`).

![Power Automate Connector oauth token](../img/connectors-power-automate-oauth-token.png)

##### OAuth Token Endpoint

You should provide the **OAuth Token Endpoint** in the following format: https://login.microsoftonline.com/{tanantID}/oauth2/v2.0/token

Read more on how you can [find your tenantID](https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-how-to-find-tenant#find-tenant-id-through-the-azure-portal).

### Trigger a flow run

This operation allows you to trigger a Power Automate desktop flow. To execute it, take the following steps:

1. Select the operation **Trigger a flow run** from the **Operation type** dropdown list.
2. Configure authentication as described in the [authentication](#authentication) section.
3. Fill out the input fields as described in the [configuration](#configuration) section.
4. Fill out the input fields as described in the [input](#input) section.
5. Fill out the response mapping as described in the [trigger a flow run response](#trigger-a-flow-run-response) section.

![Power Automate Connector - Trigger a flow run](../img/connectors-power-automate-trigger-a-flow-run.png)

#### Trigger a flow run response

The operation **Trigger a flow run** returns information about the triggered flow.

You can use an output mapping to map the response:

1. Use **Result Variable** to store the response in a process variable. For example, `myResultVariable`.
2. Use **Result Expression** to map fields from the response into process variables. It comes with a pre-filled value of `= {flowSessionId: response.body.flowsessionId}`. To use operation _Get the status of a flow run_, you need a `flowSessionId`. This expression will add it in the context for you. Learn more in [get the status of a flow run](#get-the-status-of-a-flow-run).

Response example:

```
= {
    "@odata.context": "https://org11aaa11a.crm4.dynamics.com/api/data/v9.2/$metadata#Microsoft.Dynamics.CRM.RunDesktopFlowResponse",
    "flowsessionId": "bb2a1f33-e5b9-ed11-83fe-000d3ab4f483",
    "licenseCheck": {
        "@odata.context": "#Microsoft.Dynamics.CRM.expando",
        "code": "ValidLicenseCoverage",
        "message": "Valid License Coverage"
    }
}
```

#### Configuration

For this section, you must fill out the **Organization URI**. This is your dynamics 365 URL. [Visit the docs](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/discovery-service) or [learn about environments](https://learn.microsoft.com/en-us/power-platform/admin/environments-overview#environment-details) to see how to find it.

#### Input

For this section, you must fill out the following fields:

1. **Workflow ID (Flow ID)**: The ID of the Power Automate desktop flow.
2. **Connection name**: Connection to be used with the desktop flow script. You can specify it as connection name or as Connection Reference Logical Name. In the latter case, you have to set the **connectionType** accordingly. [See how to get the connection name](#how-to-get-the-connection-name).
3. **Connection type**: Identifies which type of connection is used in the connection name parameter. Connection type (default), or a connection reference type.
4. **Run mode**: Choose between attended or unattended.
5. **Run priority**: Choose an option (normal, high) or add your own.
6. _(Optional)_ **Inputs**: The desktop flow script input parameters (JSON serialized string).
7. _(Optional)_ **Callback URL**: URL that will be called once the desktop flow script is complete. [See how to use the Webhook Connector](#using-webhook-connector-as-callback-endpoint) as a callback endpoint.

### Get the status of a flow run

The operation **Get the status of a flow run** returns information about the newly triggered flow session.

#### Configuration

For this section, you must fill out **Organization URI**. This is your dynamics 365 URL. [Visit the docs](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/discovery-service) or [learn about environments](https://learn.microsoft.com/en-us/power-platform/admin/environments-overview#environment-details) to see how to find it.

#### Input

For this section, you must fill out **Flow session ID**. This is the unique identifier for entity instances. You can find this in the response of the 'Trigger a flow run' method.

#### Output

You can use an output mapping to map the response:

1. Use **Result Variable** to store the response in a process variable. For example, `myResultVariable`.
2. Use **Result Expression** to map fields from the response into process variables. It comes with a pre-filled value of `= {statusCode: response.body.statuscode}`.

Response example:

```
= {
    "@odata.context": "https://[Organization URI]/api/data/v9.2/$metadata#flowsessions(statuscode,statecode,startedon,completedon)/$entity",
    "@odata.etag": "W1276122",
    "statuscode": 4,
    "statecode": 0,
    "startedon": "2022-06-16T12:54:40Z",
    "completedon": "2022-06-16T12:57:46Z",
}
```

Meaning of the different status codes based on the [official documentation](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/reference/entities/flowsession#statuscode-choicesoptions):

| Status | Statuscode   |
| ------ | ------------ |
| 0      | NotSpecified |
| 1      | Paused       |
| 2      | Running      |
| 3      | Waiting      |
| 4      | Succeeded    |
| 5      | Skipped      |
| 6      | Suspended    |
| 7      | Cancelled    |
| 8      | Failed       |
| 9      | Faulted      |
| 10     | TimedOut     |
| 11     | Aborted      |
| 12     | Ignored      |
| 13     | Deleted      |
| 14     | Terminated   |

### Get flow outputs

The operation **Get flow outputs** returns the output of the triggered Power Automate flow.

#### Configuration

For this section, you must fill out **Organization URI**. This is your dynamics 365 URL. [Visit the docs](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/discovery-service) or [learn about environments](https://learn.microsoft.com/en-us/power-platform/admin/environments-overview#environment-details) to see how to find it.

#### Input

For this section, you must fill out **Flow session ID**. This is the unique identifier for entity instances. You can find this in the response of the 'Trigger a flow run' method.

#### Output

You can use an output mapping to map the response:

1. Use **Result Variable** to store the response in a process variable. For example, `myResultVariable`.
2. Use **Result Expression** to map fields from the response into process variables. It comes with a pre-filled value of `= {flowOutputs: response.body}`.

Response example:

```
= {
    "Output1": "My output value"
}
```

## Appendix

### Using Power Automate Connector best practice

#### Using Webhook Connector as callback endpoint

Oftentimes, it is desired to continue the process after a Power Automate flow run finished. You can use the **Callback URL** field if you select the **Trigger a flow run** to specify a URL which will be called after the flow is finished.

:::info
Starting from Camunda Platform 8.1, it is possible to continue the Camunda process or start a new one using the HTTP webhook Connector.
Please refer to the [documentation for an up-to-date version](../../../../../docs/components/connectors/out-of-the-box-connectors/power-automate.md#using-webhook-connector-as-callback-endpoint) to learn more about this feature.
:::

#### Get Bearer token with Postman

1. Allow implicit flow in your [Azure AD app](https://portal.azure.com).
   ![Power Automate Connector - Azure AD app allow implicit flow](../img/connectors-power-automate-allow-implicit-flow.png)
2. [Visit the official site](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/setup-postman-environment) to see how to set up the Postman environment.
3. [Generate an access token](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/setup-postman-environment#generate-an-access-token-to-use-with-your-environment) and use it in the **Bearer token** field.

#### How to get the connection name

1. Go to you [Power Platform admin center](https://admin.powerplatform.microsoft.com), and select [Power Automate app](https://make.powerautomate.com) from the top left menu.
2. In the left menu bar under **Data**, select **Connections > New connection**.
3. Select **Desktop flows** and provide the domain and username of the user on the machine where the desktop flows are running, and also provide the password belongs to this user.
4. Click **Create**.

   ![Power Automate Connector - Create connection](../img/connectors-power-automate-create-new-connection.png)

5. Click on the newly created connection, and you can find your connection name in the URL as shown in the picture below. This is a default connection type.

   ![Power Automate Connector - Connection name](../img/connectors-power-automate-connection-name.png)
