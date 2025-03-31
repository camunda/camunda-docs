---
id: zeebe-api-tutorial
title: Tutorial
description: "New to the Zeebe API? Step through our tutorial to assign and unassign a user to and from a Zeebe user task."
---

In this tutorial, we'll step through examples to highlight the capabilities of the Zeebe API, such as assigning and unassigning a user to and from a Zeebe user task.

## Prerequisites

- If you haven't done so already, [create a cluster](/guides/create-cluster.md).
- Upon cluster creation, [create your first client](/guides/setup-client-connection-credentials.md). Ensure you check the `Zeebe` client scope box.

:::note
Make sure you keep the generated client credentials in a safe place. The **Client secret** will not be shown again. For your convenience, you can also download the client information to your computer.
:::

- In this tutorial, we utilize a JavaScript-written [GitHub repository](https://github.com/camunda/camunda-api-tutorials) to write and run requests. Clone this repo before getting started.
- Ensure you have [Node.js](https://nodejs.org/en/download) installed as this will be used for methods that can be called by the CLI (outlined later in this guide). Run `npm install` to ensure you have updated dependencies.

## Getting started

- You need authentication to access the API endpoints. Find more information [here](./zeebe-api-rest-authentication.md).

## Set up authentication

If you're interested in how we use a library to handle auth for our code, or to get started, examine the `auth.js` file in the GitHub repository. This file contains a function named `getAccessToken` which executes an OAuth 2.0 protocol to retrieve authentication credentials based on your client id and client secret. Then, we return the actual token that can be passed as an authorization header in each request.

To set up your credentials, create an `.env` file which will be protected by the `.gitignore` file. You will need to add your `ZEEBE_CLIENT_ID`, `ZEEBE_CLIENT_SECRET`, `ZEEBE_BASE_URL`, and `ZEEBE_AUDIENCE`, which is `zeebe.camunda.io` in a Camunda 8 SaaS environment. For example, your audience may be defined as `ZEEBE_AUDIENCE=zeebe.camunda.io`.

These keys will be consumed by the `auth.js` file to execute the OAuth protocol, and should be saved when you generate your client credentials in [prerequisites](#prerequisites).

Examine the existing `.env.example` file for an example of how your `.env` file should look upon completion. Do not place your credentials in the `.env.example` file, as this example file is not protected by the `.gitignore`.

:::note

In this tutorial, we will execute arguments to assign and unassign a user to and from a Zeebe user task. You can examine the framework for processing these arguments in the `cli.js` file before getting started.

:::

## Assign a Zeebe user task (POST)

:::note
In this tutorial, you will capture a **Zeebe user task** ID to assign and unassign users in this API. Camunda 8.5 introduced this new [user task](/components/modeler/bpmn/user-tasks/user-tasks.md) implementation type, and these Zeebe user tasks are different from job worker-based user tasks (which while still supported, are now deprecated with 8.6). See more details on task type differences in the [migrating to Zeebe user tasks documentation](/apis-tools/migration-manuals/migrate-to-camunda-user-tasks.md#task-type-differences).
:::

First, let's script an API call to assign a Zeebe user task.

To do this, take the following steps:

1. In the file named `zeebe.js`, outline the authentication and authorization configuration in the first few lines. This will pull in your `.env` variables to obtain an access token before making any API calls:

```javascript
const authorizationConfiguration = {
  clientId: process.env.ZEEBE_CLIENT_ID,
  clientSecret: process.env.ZEEBE_CLIENT_SECRET,
  audience: process.env.ZEEBE_AUDIENCE,
};
```

2. Examine the function `async function assignUser([userTaskKey, assignee])` below this configuration. This is where you will script out your API call.
3. Within the function, you must first generate an access token for this request, so your function should now look like the following:

```javascript
async function assignUser([userTaskKey, assignee]) {
  const accessToken = await getAccessToken(authorizationConfiguration);
}
```

4. Using your generated client credentials from [prerequisites](#prerequisites), capture your Zeebe API URL beneath your call for an access token by defining `zeebeApiUrl`:

`const zeebeApiUrl = process.env.ZEEBE_BASE_URL`

5. On the next line, script the API endpoint to assign a Zeebe user task.:

```javascript
const url = `${ZeebeApiUrl}/user-tasks/${userTaskKey}/assignment`;
```

6. Configure your POST request to the appropriate endpoint, including an authorization header based on the previously acquired `accessToken`:

```javascript
const options = {
  method: "POST",
  url,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
  data: {
    // The body contains information about the new assignment.
    assignee: assignee,
  },
};
```

7. Call the assign endpoint, process the results from the API call, and emit an error message from the server if necessary:

```javascript
try {
  // Call the assign endpoint.
  const response = await axios(options);

  // Process the results from the API call.
  if (response.status === 204) {
    console.log(`User task assigned to ${assignee}.`);
  } else {
    // Emit an unexpected error message.
    console.error("Unable to assign this user!");
  }
} catch (error) {
  // Emit an error from the server.
  console.error(error.message);
}
```

8. In your terminal, run `node cli.js zeebe assign <task id> <assignee@assignee.com>`, where `<task id>` is the Zeebe user task ID you've captured from Tasklist, and `<assignee@assignee.com>` is the assignee's email address. Include your own email address if you would like to see these results in your user interface.

:::note
This `assign` command is connected to the `assignUser` function at the bottom of the `zeebe.js` file, and executed by the `cli.js` file. While we will assign and unassign users in this tutorial, you may add additional arguments depending on the API calls you would like to make.
:::

If you have a valid user and task ID, the assignment will now output. If you have an invalid API name or action name, or no arguments provided, or improper/insufficient credentials configured, an error message will output as outlined in the `cli.js` file. If no action is provided, it will default to "assign" everywhere, except when unassigning a user.

## Unassign a Zeebe user task (DELETE)

To unassign a user from a Zeebe user task, you can use the same Zeebe user task ID from the previous exercise and take the following steps:

1. Outline your function, similar to the steps above:

```javascript
async function unassignUser([userTaskKey]) {
  const accessToken = await getAccessToken(authorizationConfiguration);

  const ZeebeApiUrl = process.env.ZEEBE_BASE_URL;

  const url = `${ZeebeApiUrl}/user-tasks/${userTaskKey}/assignee`;
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
    console.log("User task has been unassigned!");
  } else {
    // Emit an unexpected error message.
    console.error("Unable to unassign this user task!");
  }
} catch (error) {
  // Emit an error from the server.
  console.error(error.message);
}
```

4. In your terminal, run `node cli.js zeebe unassign <task id>`, where `<task id>` is the Zeebe user task ID.

## If you get stuck

Having trouble configuring your API calls or want to examine an example of the completed tutorial? Navigate to the `completed` folder in the [GitHub repository](https://github.com/camunda/camunda-api-tutorials/tree/main/completed), where you can view an example `zeebe.js` file.

## Next steps

You can script several additional API calls as outlined in the [Zeebe API reference material](./zeebe-api-rest-overview.md).
