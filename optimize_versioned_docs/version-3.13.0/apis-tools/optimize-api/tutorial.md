---
id: optimize-api-tutorial
title: Tutorial
description: "Step through an example to view your existing clients, create a client, view a particular client's details, and delete a client."
---

In this tutorial, we'll step through examples to highlight the capabilities of the Optimize API, such as listing your existing dashboard IDs, or deleting a dashboard.

## Getting started

- You need authentication to access the API endpoints. Find more information [here](./optimize-api-authentication.md).
- To properly execute the commands to list existing dashboard IDs, and delete a dashboard, ensure you have [created a collection](../../components/userguide/collections-dashboards-reports.md) containing a [dashboard](../../components/userguide/creating-dashboards.md).

## Prerequisites

- Ensure you have [Node.js](https://nodejs.org/en/download) downloaded.
- If you haven't done so already, [create a cluster]($docs$/guides/assets/react-components/create-cluster).
- Upon cluster creation, [create your first client]($docs$/guides/setup-client-connection-credentials). Ensure you determine the scoped access for client credentials, and check all the boxes for Zeebe client scopes.

<!--- I can't recall, does it matter how this is set up, or solely the scope? --->

:::note
Make sure you keep the generated client credentials in a safe place. The **Client secret** will not be shown again. For your convenience, you can also download the client information to your computer.
:::

- In this tutorial, we utilize a JavaScript-written [GitHub repository](https://github.com/camunda/camunda-api-tutorials) to write and run requests. Clone this repo before getting started.
- Run `npm install` to ensure you have updated dependencies.

## Set up authentication

To get started, examine the `auth.js` file in the GitHub repository. This file contains a function named `getAccessToken` which executes an OAuth 2.0 protocol to retrieve authentication credentials based on your client id and client secret. We will call this function whenever we need an authentication token for an API request.

1. To set up your credentials, create an `.env` file which will be protected by the `.gitignore` file. These keys will be consumed by the `auth.js` file to execute the OAuth protocol, and should be saved when you generate your client credentials in [prerequisites](#prerequisites).
2. Examine the existing `.env.example` file for an example of how your `.env` file should look upon completion. You will need to add your `COMPONENTS_CLIENT_ID`, `COMPONENTS_CLIENT_SECRET`, `OPTIMIZE_BASE_URL`, and `OPTIMIZE_AUDIENCE`, which is `https://optimize.camunda.io` in a Camunda 8 SaaS environment.

:::note

In this tutorial, we will execute arguments to list existing dashboard IDs and delete a dashboard. You can examine the framework for processing these arguments in the `cli.js` file before getting started.

:::

## GET a list of existing dashboard IDs

First, let's script an API call to list our existing dashboard IDs.

To do this, take the following steps:

1. Examine the function `async function listDashboards([collectionId])` at the top of the `optimize.js` file. This is where you will script out your API call.
2. Within the function, you must first apply an access token for this request:

```
const accessToken = await getAccessToken("components", optimizeAudience);
```

3. Using your generated client credentials from [prerequisites](#prerequisites), call your Optimize audience and base URL. Ensure these credentials are added to your `.env` file, and script the references to the values. For example:

```
const optimizeAudience = process.env.OPTIMIZE_AUDIENCE;
const optimizeApiUrl = process.env.OPTIMIZE_BASE_URL;
```

4. Script the API endpoint to list the dashboard IDs of a particular collection:

```
const url = `${optimizeApiUrl}/api/public/dashboard?collectionId=${collectionId}`;
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

6. Call the collection's endpoint, process the results from the API call, emit the dashboard IDs to output, and emit an error message from the server if necessary:

```
  try {
    const response = await axios(options);
    const results = response.data;

    results.forEach(x => console.log(`ID: ${x.id}`));
  } catch (error) {
    // Emit an error from the server.
    console.error(error.message);
  }
```

7. In your terminal, run `node cli.js optimize list` for a list of your existing dashboard IDs.

:::note
This `list` command is connected to the `listDashboards` function at the bottom of the `optimize.js` file, and executed by the `cli.js` file. While we will view dashboard IDs and delete a dashboard in this tutorial, you may add additional arguments depending on the API calls you would like to make.
:::

If you have any existing dashboards, the `ID: ${x.id}` will now output. If you have an invalid API name or action name, or no arguments provided, or improper/insufficient credentials configured, an error message will output as outlined in the `cli.js` file.

## DELETE a dashboard

To delete a dashboard, take the following steps:

1. Outline your function, similar to the steps above:

```
async function deleteDashboard([dashboardId]) {
console.log(`deleting dashboard ${dashboardId}`);

const optimizeAudience = process.env.OPTIMIZE_AUDIENCE;
const accessToken = await getAccessToken("components", optimizeAudience);
const optimizeApiUrl = process.env.OPTIMIZE_API_URL;

const url = `${optimizeApiUrl}/public/dashboard/${dashboardId}`;
```

2. Configure the API call using the DELETE method:

```
  const options = {
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
    // Call the delete endpoint.
    const response = await axios(options);

    // Process the results from the API call.
    if (response.status === 204) {
      console.log(`Dashboard ${clientId} was deleted!`);
    } else {
      // Emit an unexpected error message.
      console.error("Unable to delete dashboard!");
    }
  } catch (error) {
    // Emit an error from the server.
    console.error(error.message);
  }
}
```

4. In your terminal, run `node cli.js optimize delete` to delete your dashboard.

## If you get stuck

Having trouble configuring your API calls or want to examine an example of the completed tutorial? Navigate to the `completed` folder in the [GitHub repository](https://github.com/camunda/camunda-api-tutorials/tree/main/completed), where you can view an example `optimize.js` file.

## Next steps

You can script several additional API calls as outlined in the [Optimize API reference material](./overview.md).
