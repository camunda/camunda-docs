---
id: administration-api-tutorial
title: Tutorial
slug: /apis-tools/administration-api/tutorial
sidebar_position: 3
description: "Step through an example to view your existing clients, create a client, view a particular client's details, and delete a client."
---

In this tutorial, we'll step through examples to highlight the capabilities of the Console API, such as viewing your existing clients, creating a client, viewing a particular client's details, and deleting a client.

## Getting started

- A detailed API description can be found [here](https://console.cloud.camunda.io/customer-api/openapi/docs/#/) via Swagger. With a valid access token, this offers an interactive API experience against your Camunda 8 cluster.
- You need authentication to access the API endpoints. Find more information [here](/docs/apis-tools/administration-api/authentication.md).

## Prerequisites

- If you haven't done so already, [create a cluster](/guides/assets/react-components/create-cluster.md).
- Upon cluster creation, create your first client by navigating to **Console > Organization > Console API > Create new credentials**. Ensure you determine the scoped access for client credentials. For example, in this tutorial we will get, create, and delete a client. Ensure you check all the boxes for Zeebe client scopes.

:::note
Make sure you keep the generated client credentials in a safe place. The **Client secret** will not be shown again. For your convenience, you can also download the client information to your computer.
:::

- In this tutorial, we utilize a JavaScript-written [GitHub repository](https://github.com/camunda/camunda-api-tutorials) to write and run requests. Clone this repo before getting started.
- Run `npm install` to ensure you have updated dependencies.

## Set up authentication

To get started, examine the `auth.js` file in the GitHub repository. This file contains a function named `getAccessToken` which executes an OAuth 2.0 protocol to retrieve authentication credentials based on your client id and client secret. We will call this function whenever we need an authentication token for an API request.

1. To set up your credentials, create an `.env` file which will be protected by the `.gitignore` file. These keys will be consumed by the `auth.js` file to execute the OAuth protocol, and should be saved when you generate your client credentials in [prerequisites](#prerequisites).
2. Examine the existing `.env.example` file for an example of how your `.env` file should look upon completion. You will need to add your `ADMINISTRATION_CLIENT_ID`, `ADMINISTRATION_CLIENT_SECRET`, `CLUSTER_ID`, and the `ADMINISTRATION_API_URL`, which is `https://api.cloud.camunda.io` in a Camunda 8 SaaS environment.

:::note

In this tutorial, we will execute arguments to view, create, and delete clients. You can examine the framework for processing these arguments in the `cli.js` file before getting started.

:::

## GET a list of existing clients

First, let's script an API call to list our existing clients.

To do this, take the following steps:

1. Examine the function `async function listClients` at the top of the `administration.js` file. This is where you will script out your API call.
2. Within the function, you must first apply an access token for this request:

```
const accessToken = await getAccessToken();
```

3. As noted in the detailed API description in [Swagger](https://console.cloud.camunda.io/customer-api/openapi/docs/#/), you must call your Administration API URL and cluster ID. Ensure these credentials are added to your `.env` file, and script the references to the values. For example:

```
const administrationApiUrl = process.env.ADMINISTRATION_API_URL;
  const clusterId = process.env.CLUSTER_ID;
```

4. Script the API endpoint to list the clients within your cluster:

```
const url = `${administrationApiUrl}/clusters/${clusterId}/clients`;
```

5. Configure your GET request to the appropriate endpoint, including an authorization header based on the previously acquired `accessToken`:

```
const options = {
    method: "GET",
    url,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  };
```

6. Call the clients endpoint, process the results from the API call, emit the clients to output, and emit an error message from the server if necessary:

```
try {
    // Call the clients endpoint.
    const response = await axios(options);

    // Process the results from the API call.
    const results = response.data;

    // Emit clients to output.
    results.forEach(x => console.log(`Name: ${x.name}; ID: ${x.clientId}`));
  } catch (error) {
    // Emit an error from the server.
    console.error(error.message);
  }
```

7. In your terminal, run `npm run cli admin list` for a list of your existing clients.

:::note
This `list` command is connected to the `listClients` function at the bottom of the `administration.js` file, and executed by the `cli.js` file. While we will view, create, and delete clients in this tutorial, you may add additional arguments depending on the API calls you would like to make.
:::

If you have any existing clients, the `Name: {name}; ID: {Id}` will now output. If you have an invalid API name or action name, or no arguments provided, or improper/insufficient credentials configured, an error message will output as outlined in the `cli.js` file.

## POST a client

To create a new client, you will follow similar steps as outlined in your [GET request] (#get-clientid) above:

1. Edit the `addClient` function, incorporate the access token, and add your settings in the `.env` file. Note that this function destructures the `clientName` as the first item in an array passed in.

```
async function addClient([clientName])
const accessToken = await getAccessToken();

  const administrationApiUrl = process.env.ADMINISTRATION_API_URL;
  const clusterId = process.env.CLUSTER_ID;
```

2. Adjust your API endpoint to add a new client to a cluster:

```
const url = `${administrationApiUrl}/clusters/${clusterId}/clients`;
```

3. When configuring your API call, issue a POST request, and add a body containing information for the new client:

```
  var options = {
    method: "POST",
    url,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    data: {
      clientName: clientName
    }
  };
```

4. Call the `add` endpoint and process the results from the API call:

```
const response = await axios(options);
const newClient = response.data;
```

5. Emit the new client to output. While different from this example, you will likely want to capture the `clientSecret` property from the response, as this cannot be displayed again:

```
console.log(
      `Client added! Name: ${newClient.name}. ID: ${newClient.clientId}.`
    );
  } catch (error) {
    // Emit an error from the server.
    console.error(error.message);
  }
```

6. In your terminal, run `npm run cli admin add` to create your new client.

## GET a client ID

To get a client ID, take the following steps:

1. Outline your function, similar to the steps above:

```
async function viewClient([clientId])
  const accessToken = await getAccessToken();

  const administrationApiUrl = process.env.ADMINISTRATION_API_URL;
  const clusterId = process.env.CLUSTER_ID;
```

2. Write the API endpoint to view a single client within a cluster:

```
const url = `${administrationApiUrl}/clusters/${clusterId}/clients/${clientId}`;
```

3. Call the client endpoint using a GET method:

```
var options = {
    method: "GET",
    url,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  };
```

4. Process your results from the API call and emit the client details:

```
try {
    const response = await axios(options);

    const clientResponse = response.data;

    console.log("Client:", clientResponse);
  } catch (error) {
    console.error(error.message);
  }
```

5. In your terminal, run `npm run cli admin view` to view your client.

## DELETE a client

To delete a client, take the following steps:

1. Outline your function, similar to the steps above:

```
async function deleteClient([clientId]) {
  const accessToken = await getAccessToken();

  const administrationApiUrl = process.env.ADMINISTRATION_API_URL;
  const clusterId = process.env.CLUSTER_ID;

  const url = `${administrationApiUrl}/clusters/${clusterId}/clients/${clientId}`;
```

2. Configure the API call using the DELETE method:

```
  var options = {
    method: "DELETE",
    url,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  };
```

3. Process the results from the API call. For example:

```
try {
    const response = await axios(options);

    if (response.status === 204) {
      console.log(`Client ${clientId} was deleted!`);
    } else {
      console.error("Unable to delete client!");
    }
  } catch (error) {
    console.error(error.message);
  }
```

4. In your terminal, run `npm run cli admin delete` to delete your client.

## If you get stuck

Having trouble configuring your API calls or want to examine an example of the completed tutorial? Navigate to the `completed` folder in the [GitHub repository](https://github.com/camunda/camunda-api-tutorials/tree/main/completed), where you can view an example `administration.js` file.

## Next steps

You can script several additional API calls as outlined in the [Administration API reference material](/apis-tools/administration-api/administration-api-reference.md).
