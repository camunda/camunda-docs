---
id: console-api-tutorial
title: Tutorial
slug: /apis-tools/console-api/tutorial
sidebar_position: 3
description: "Step through an example to implement..."
---

In this tutorial, we'll step through examples to highlight the capabilities of the Console API, such as creating a client, viewing your clients, and deleting a client.

## Getting started

- A detailed API description can be found [here](https://console.cloud.camunda.io/customer-api/openapi/docs/#/) via Swagger. With a valid access token, this offers an interactive API experience against your Camunda 8 cluster.
- You need authentication to access the API endpoints. Find more information [here](/docs/apis-tools/console-api/authentication.md).

## Prerequisites

- If you haven't done so already, [create a cluster](/guides/assets/react-components/create-cluster.md).
- Upon cluster creation, [create your first client](/docs/guides/setup-client-connection-credentials.md). Ensure you determine the scoped access for client credentials. For example, select **Zeebe client** so the newly-created client can access your Zeebe instance.

:::note
Make sure you keep the generated client credentials in a safe place. The **Client secret** will not be shown again. For your convenience, you can also download the client information to your computer.
:::

- In this tutorial, we utilize a JavaScript-written [GitHub repository](https://github.com/camunda/camunda-api-tutorials) to write and run requests. Clone this repo before getting started.

## Set up authentication

To get started, examine the `auth.js` file in the GitHub repository. This is the file that will execute an OAuth 2.0 protocol to run your requests.

1. To set up your credentials, create an `.env` file which will be protected by the `.gitignore` file.
2. Examine the existing `.env.example` file for an example of how your `.env` file should look upon completion. You will need to add your `CONSOLE_CLIENT_ID`, `CONSOLE_CLIENT_SECRET`, `CLUSTER_ID`, and the `CONSOLE_API_URL`, which is `https://api.cloud.camunda.io`.

## GET clientId
