---
id: orchestration-cluster-api-tutorial
title: Beginner tutorial
sidebar_label: Beginner
description: "New to the Orchestration Cluster REST API? Step through our tutorial to list all roles, create a role, retrieve a role, and delete a role."
---

<span class="badge badge--beginner">Beginner</span>

In this tutorial, we'll step through examples to highlight the capabilities of the Orchestration Cluster REST API, such as listing all roles, creating a role, retrieving a role, and deleting a role.

## Prerequisites

- If you haven't done so already, [create a cluster](/components/console/manage-clusters/create-cluster.md).
- Upon cluster creation, [create your first client](/components/console/manage-clusters/manage-api-clients.md#create-a-client). Ensure you check the `Orchestration Cluster API` client scope box.

:::note
Make sure you keep the generated client credentials in a safe place. The **Client secret** will not be shown again. For your convenience, you can download the client information to your computer.
:::

- In this tutorial, we utilize a JavaScript-written [GitHub repository](https://github.com/camunda/camunda-api-tutorials) to write and run requests. Clone this repo before getting started.
- Ensure you have [Node.js](https://nodejs.org/en/download) installed as this will be used for methods that can be called by the CLI (outlined later in this guide). Run `npm install` to ensure you have updated dependencies.

## Getting started

- You need authentication to access the API endpoints. Find more information [here](./orchestration-cluster-api-rest-authentication.md).

## Set up authentication

If you're interested in how we use a library to handle auth for our code, or to get started, examine the `auth.js` file in the GitHub repository. This file contains a function named `getAccessToken` which executes an OAuth 2.0 protocol to retrieve authentication credentials based on your client ID and client secret. Then, we return the actual token that can be passed as an authorization header in each request.

To set up your credentials, create an `.env` file which will be protected by the `.gitignore` file. You will need to add the following:

- `CAMUNDA_CLIENT_ID`
- `CAMUNDA_CLIENT_SECRET`
- `CAMUNDA_REST_ADDRESS` (after creating a client and downloading the .env variables, this is reflected in the Console UI as `ZEEBE_REST_ADDRESS`)
- `CAMUNDA_TOKEN_AUDIENCE` (represented as `ZEEBE_TOKEN_AUDIENCE` in the Console UI), which is `zeebe.camunda.io` in a Camunda 8 SaaS environment. For example, your audience may be defined as `CAMUNDA_TOKEN_AUDIENCE=zeebe.camunda.io`.

These keys will be consumed by the `auth.js` file to execute the OAuth protocol, and should be saved when you generate your client credentials in [prerequisites](#prerequisites).

Examine the existing `.env.example` file for an example of how your `.env` file should look upon completion. Do not place your credentials in the `.env.example` file, as this example file is not protected by the `.gitignore`.

:::note
In this tutorial, we will execute arguments to list all roles, create a role, retrieve a role, and delete a role. You can examine the framework for processing these arguments in the `cli.js` file before getting started.
:::

## List all roles (POST)

First, let's script an API call to list all existing roles.

To do this, take the following steps:

1. In the file named `camunda-8.js`, outline the authentication configuration in the first few lines. This will pull in your `.env` variables to obtain an access token before making any API calls:

```javascript
const authorizationConfiguration = {
  clientId: process.env.CAMUNDA_CLIENT_ID,
  clientSecret: process.env.CAMUNDA_CLIENT_SECRET,
  audience: process.env.CAMUNDA_TOKEN_AUDIENCE,
};
```

2. Examine the function `async function listRoles()` below this configuration. This is where you will script out your API call.

3. Within the function, you must first generate an access token for this request, so your function should now look like the following:

```javascript
async function listRoles() {
  const accessToken = await getAccessToken(authorizationConfiguration);
}
```

4. Using your generated client credentials from [prerequisites](#prerequisites), capture your Orchestration Cluster REST API URL beneath your call for an access token by defining `camundaApiUrl`:

```javascript
const camundaApiUrl = process.env.CAMUNDA_REST_ADDRESS;
```

On the next line, script the API endpoint to list the existing roles:

```javascript
const url = `${camundaApiUrl}/roles/search`;
```

5. Configure your POST request to the appropriate endpoint, including an authorization header based on the previously acquired `accessToken`:

```javascript
const options = {
  method: "POST",
  url,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
  data: {},
};
```

6. Call the endpoint, process the results from the API call, and emit an error message from the server if necessary:

```javascript
try {
  const response = await axios(options);
  const results = response.data;
  results.items.forEach((x) =>
    console.log(`Role Name: ${x.name}; key: ${x.key}`)
  );
} catch (error) {
  console.error(error.message);
}
```

7. In your terminal, run `node cli.js camunda8 list`.

:::note
This `list` command is connected to the `listRoles` function at the bottom of the `camunda-8.js` file, and executed by the `cli.js` file. While we will work with roles in this tutorial, you may add additional arguments depending on the API calls you would like to make.
:::

The existing roles (if any) will now output. If you have an invalid API name or action name, or no arguments provided, or improper/insufficient credentials configured, an error message will output as outlined in the `cli.js` file. If no action is provided, it will default to "assign" everywhere, except when unassigning a user.

## Create a role (POST)

1. Outline your function:

```javascript
async function createRole([roleName]) {
  const accessToken = await getAccessToken(authorizationConfiguration);
  const camundaApiUrl = process.env.CAMUNDA_REST_ADDRESS;
  const url = `${camundaApiUrl}/roles`;
}
```

2. Configure the API call:

```javascript
const options = {
  method: "POST",
  url,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
  data: {
    name: roleName,
  },
};
```

3. Process the results:

```javascript
try {
  const response = await axios(options);
  const newRole = response.data;
  console.log(`Role added! Name: ${roleName}. Key: ${newRole.roleKey}.`);
} catch (error) {
  console.error(error.message);
}
```

4. Run in your terminal `node cli.js camunda8 create <name>`.

## Retrieve a role (GET)

1. Outline your function:

```javascript
async function getRole([roleKey]) {
  const accessToken = await getAccessToken(authorizationConfiguration);
  const camundaApiUrl = process.env.CAMUNDA_REST_ADDRESS;
  const url = `${camundaApiUrl}/roles/${roleKey}`;
}
```

2. Configure the API call.

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

3. Process the results:

```javascript
try {
  const response = await axios(options);
  const results = response.data;
  console.log(`Role Name: ${results.name}; Key: ${results.key};`);
} catch (error) {
  console.error(error.message);
}
```

4. Run in your terminal `node cli.js camunda8 view <role>`.

## Delete a role (DELETE)

1. Outline your function:

```javascript
async function deleteRole([roleKey]) {
  const accessToken = await getAccessToken(authorizationConfiguration);
  const camundaApiUrl = process.env.CAMUNDA_REST_ADDRESS;
  const url = `${camundaApiUrl}/roles/${roleKey}`;
}
```

2. Configure the API call:

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

3. Process the results:

```javascript
try {
  const response = await axios(options);
  if (response.status === 204) {
    console.log("Role deleted!");
  } else {
    console.error("Unable to delete this role!");
  }
} catch (error) {
  console.error(error.message);
}
```

4. Run in your terminal `node cli.js camunda8 delete <role>`.

## If you get stuck

Having trouble configuring your API calls or want to examine an example of the completed tutorial? Navigate to the `completed` folder in the [GitHub repository](https://github.com/camunda/camunda-api-tutorials/tree/main/completed), where you can view an example `camunda-8.js` file.

## Next steps

You can script several additional API calls as outlined in the [Orchestration Cluster REST API reference material](./orchestration-cluster-api-rest-overview.md).
