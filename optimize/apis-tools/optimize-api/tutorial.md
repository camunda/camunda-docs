---
id: optimize-api-tutorial
title: Tutorial
description: "New to the Optimize API? Step through our tutorial to list your existing dashboard IDs and delete a dashboard."
---

In this tutorial, we'll step through examples to highlight the capabilities of the Optimize API, such as listing your existing dashboard IDs, or deleting a dashboard.

## Prerequisites

- If you haven't done so already, [create a cluster]($docs$/guides/create-cluster/).
- Upon cluster creation, [create your first client]($docs$/guides/setup-client-connection-credentials/). Ensure you check the `Optimize` client scope box.

:::note
Make sure you keep the generated client credentials in a safe place. The **Client secret** will not be shown again. For your convenience, you can also download the client information to your computer.
:::

- In this tutorial, we utilize a JavaScript-written [GitHub repository](https://github.com/camunda/camunda-api-tutorials) to write and run requests. Clone this repo before getting started.
- Ensure you have [Node.js](https://nodejs.org/en/download) installed as this will be used for methods that can be called by the CLI (outlined later in this guide). Run `npm install` to ensure you have updated dependencies.

## Getting started

- You need authentication to access the API endpoints. Find more information [here](./optimize-api-authentication.md).
- To properly execute the commands to list existing dashboard IDs and delete a dashboard, ensure you have [created a collection](../../components/userguide/collections-dashboards-reports.md) containing a [dashboard](../../components/userguide/creating-dashboards.md).

## Set up authentication

If you're interested in how we use a library to handle auth for our code, or to get started, examine the `auth.js` file in the GitHub repository. This file contains a function named `getAccessToken` which executes an OAuth 2.0 protocol to retrieve authentication credentials based on your client ID and client secret. Then, we return the actual token that can be passed as an authorization header in each request.

To set up your credentials, create an `.env` file which will be protected by the `.gitignore` file. You will need to add your `OPTIMIZE_CLIENT_ID`, `OPTIMIZE_CLIENT_SECRET`, `OPTIMIZE_BASE_URL`, and `OPTIMIZE_AUDIENCE`, which is `optimize.camunda.io` in a Camunda 8 SaaS environment. For example, your audience may be defined as `OPTIMIZE_AUDIENCE=optimize.camunda.io`.

These keys will be consumed by the `auth.js` file to execute the OAuth protocol, and should be saved when you generate your client credentials in [prerequisites](#prerequisites).

:::tip Can't find your environment variables?
When you create new client credentials as a [prerequisite](#prerequisites), your environment variables appear in a pop-up window. Your environment variables may appear as `CAMUNDA_CLIENT_ID`, `CAMUNDA_CLIENT_SECRET`, and `CAMUNDA_OPTIMIZE_BASE_URL`.
:::

Examine the existing `.env.example` file for an example of how your `.env` file should look upon completion. Do not place your credentials in the `.env.example` file, as this example file is not protected by the `.gitignore`.

:::note

In this tutorial, we will execute arguments to list existing dashboard IDs and delete a dashboard. You can examine the framework for processing these arguments in the `cli.js` file before getting started.

:::

## GET a list of existing dashboard IDs

First, let's script an API call to list our existing dashboard IDs.

To do this, take the following steps:

1. In the file named `optimize.js`, outline the authentication and authorization configuration in the first few lines. This will pull in your `.env` variables to obtain an access token before making any API calls:

```javascript
const authorizationConfiguration = {
  clientId: process.env.OPTIMIZE_CLIENT_ID,
  clientSecret: process.env.OPTIMIZE_CLIENT_SECRET,
  audience: process.env.OPTIMIZE_AUDIENCE,
};
```

2. Examine the function `async function listDashboards([collectionId])` below this configuration. This is where you will script out your API call.
3. Within the function, you must first apply an access token for this request, so your function should now look like the following:

```javascript
async function listDashboards([collectionId]) {
  const accessToken = await getAccessToken(authorizationConfiguration);
}
```

4. Using your generated client credentials from [prerequisites](#prerequisites), capture your Optimize API URL beneath your call for an access token by defining `optimizeApiUrl`:

`const optimizeApiUrl = process.env.OPTIMIZE_BASE_URL;`

5. On the next line, script the API endpoint to list your existing dashboard IDs for a particular collection:

```javascript
const url = `${optimizeApiUrl}/api/public/dashboard?collectionId=${collectionId}`;
```

6. Configure your GET request to the appropriate endpoint, including an authorization header based on the previously acquired `accessToken`:

```javascript
const options = {
  method: "GET",
  url,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
};
```

7. Call the collection's endpoint, process the results from the API call, emit the dashboard IDs to output, and emit an error message from the server if necessary:

```javascript
try {
  const response = await axios(options);
  const results = response.data;

  results.forEach((x) => console.log(`ID: ${x.id}`));
} catch (error) {
  // Emit an error from the server.
  console.error(error.message);
}
```

8. In your terminal, run `node cli.js optimize list <collection ID>`, where `<collection ID>` is where you can paste the ID of your collection for a list of your existing dashboard IDs within this particular collection. If you have any existing dashboards within a collection, you will see an output similar to the following:

`ID: 12345`

:::note
This `list` command is connected to the `listDashboards` function at the bottom of the `optimize.js` file, and executed by the `cli.js` file. While we will view dashboard IDs and delete a dashboard in this tutorial, you may add additional arguments depending on the API calls you would like to make.
:::

If you have any existing dashboards, the `ID: ${x.id}` will now output. If you have an invalid API name or action name, or no arguments provided, or improper/insufficient credentials configured, an error message will output as outlined in the `cli.js` file.

## DELETE a dashboard

To delete a dashboard, capture its ID from the previous exercise and take the following steps:

1. Outline your function, similar to the steps above. Note that the URL endpoint will look different, as you are accessing a different endpoint in this request (using a dashboard ID) than in the prior request (using a collection ID):

```javascript
async function deleteDashboard([dashboardId]) {
  console.log(`deleting dashboard ${dashboardId}`);

  const accessToken = await getAccessToken(authorizationConfiguration);

  const optimizeApiUrl = process.env.OPTIMIZE_BASE_URL;
  const url = `${optimizeApiUrl}/api/public/dashboard/${dashboardId}`;
}
```

2. Configure the API call using the DELETE method:

```javascript
const options = {
  method: "DELETE",
  url,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
};
```

3. Process the results from the API call. For example:

```javascript
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
```

4. In your terminal, run `node cli.js optimize delete <dashboard ID>`, where `<dashboard ID>` is where you can paste the ID of the dashboard you would like to delete. You will see a response similar to the following:

`Dashboard 12345 was deleted!`

## If you get stuck

Having trouble configuring your API calls or want to examine an example of the completed tutorial? Navigate to the `completed` folder in the [GitHub repository](https://github.com/camunda/camunda-api-tutorials/tree/main/completed), where you can view an example `optimize.js` file.

## Next steps

You can script several additional API calls as outlined in the [Optimize API reference material](./overview.md).
