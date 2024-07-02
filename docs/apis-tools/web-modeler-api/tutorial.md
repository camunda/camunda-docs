---
id: modeler-api-tutorial
title: Tutorial
sidebar_position: 3
slug: /apis-tools/web-modeler-api/tutorial
description: "Step through an example to view your existing clients, create a client, view a particular client's details, and delete a client."
---

In this tutorial, we'll step through examples to highlight the capabilities of the Web Modeler API, such as creating and deleting a file.

## Prerequisites

- If you haven't done so already, [create a cluster](/components/react-components/create-cluster.md).
- Upon cluster creation, create your first client by navigating to **Console > Organization > Administration API > Create new credentials**. Ensure you determine the scoped access for client credentials. For example, in this tutorial we will retrieve and delete a file. Ensure you check all the boxes for Web Modeler and Zeebe client scopes.

:::note
Make sure you keep the generated client credentials in a safe place. The **Client secret** will not be shown again. For your convenience, you can also download the client information to your computer.
:::

- In this tutorial, we utilize a JavaScript-written [GitHub repository](https://github.com/camunda/camunda-api-tutorials) to write and run requests. Clone this repo before getting started.
- Ensure you have [Node.js](https://nodejs.org/en/download) installed as this will be used for methods that can be called by the CLI (outlined later in this guide). Run `npm install` to ensure you have updated dependencies.

## Getting started

- A detailed API description can be found [here](https://modeler.cloud.camunda.io/swagger-ui/index.html) via Swagger. With a valid access token, this offers an interactive API experience against your Camunda 8 cluster.
- You need authentication to access the API endpoints. Find more information [here](/apis-tools/web-modeler-api/authentication.md).

## Set up authentication

If you're interested in how we use a library to handle auth for our code, or to get started, examine the `auth.js` file in the GitHub repository. This file contains a function named `getAccessToken` which executes an OAuth 2.0 protocol to retrieve authentication credentials based on your client id and client secret. Then, we return the actual token that can be passed as an authorization header in each request.

To set up your credentials, create an `.env` file which will be protected by the `.gitignore` file. You will need to add your `MODELER_CLIENT_ID`, `MODELER_CLIENT_SECRET`, `MODELER_AUDIENCE`, which is `modeler.cloud.camunda.io` in a Camunda 8 SaaS environment, and `MODELER_BASE_URL`, which is `https://modeler.cloud.camunda.io/api/v1`.

These keys will be consumed by the `auth.js` file to execute the OAuth protocol, and should be saved when you generate your client credentials in [prerequisites](#prerequisites).

Examine the existing `.env.example` file for an example of how your `.env` file should look upon completion. Do not place your credentials in the `.env.example` file, as this example file is not protected by the `.gitignore`.

:::note

In this tutorial, we will execute arguments to create and delete a file. You can examine the framework for processing these arguments in the `cli.js` file before getting started.

:::

## POST a file

First, let's script an API call to create a file.

To do this, take the following steps:

1. In the file named `modeler.js`, outline the authentication and authorization configuration in the first few lines. This will pull in your `.env` variables to obtain an access token before making any API calls:

```javascript
const authorizationConfiguration = {
  clientId: process.env.MODELER_CLIENT_ID,
  clientSecret: process.env.MODELER_CLIENT_SECRET,
  audience: process.env.MODELER_AUDIENCE,
};
```

2. Examine the function `async function createFile([fileName])` below this configuration. This is where you will script out your API call.
3. Within the function, you must first apply an access token for this request, so your function should now look like the following:

```javascript
async function createFile([fileName]) {
  const accessToken = await getAccessToken(authorizationConfiguration);
}
```

4. Using your generated client credentials from [prerequisites](#prerequisites), capture your Web Modeler base URL beneath your call for an access token by defining `ModelerBaseUrl`:

```javascript
const ModelerBaseUrl = process.env.MODELER_BASE_URL;
```

5. On the next line, script the API endpoint to create your file:

```javascript
const url = `${ModelerBaseUrl}/files`;
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
    fileName: fileName,
  },
};
```

7. Call the clients' endpoint, process the results from the API call, emit the clients to output, and emit an error message from the server if necessary:

```javascript
try {
  const response = await axios(options);
  const newFile = response.data;

  console.log(`Client added! Name: ${newFile.name}. ID: ${newFile.projectId}.`);
} catch (error) {
  console.error(error.message);
}
```

8. In your terminal, run `npm run cli modeler create` to create your file.

:::note
This `create` command is connected to the `createFile` function at the bottom of the `modeler.js` file, and executed by the `cli.js` file. While we create and delete a file in this tutorial, you may add additional arguments depending on the API calls you would like to make.
:::

If you have a file matching your file ID, the `Name: {name}; ID: {id} ` will now output. If you have an invalid API name or action name, or no arguments provided, or improper/insufficient credentials configured, an error message will output as outlined in the `cli.js` file.

## DELETE a client

To delete a client, take the following steps:

1. Outline your function, similar to the steps above:

```javascript
async function deleteFile([fileId]) {
  console.log(`deleting file ${fileId}`);

  const accessToken = await getAccessToken(authorizationConfiguration);

  const ModelerBaseUrl = process.env.MODELER_BASE_URL;
  const url = `${ModelerBaseUrl}/files/${fileId}`;
}
```

2. Configure the API call using the DELETE method:

```javascript
var options = {
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
  const response = await axios(options);

  if (response.status === 204) {
    console.log(`File ${fileId} was deleted!`);
  } else {
    console.error("Unable to delete file!");
  }
} catch (error) {
  console.error(error.message);
}
```

4. In your terminal, run `npm run cli modeler delete <file ID>`, where `<file ID>` is where you can paste the ID of the file you would like to delete.

## If you get stuck

Having trouble configuring your API calls or want to examine an example of the completed tutorial? Navigate to the `completed` folder in the [GitHub repository](https://github.com/camunda/camunda-api-tutorials/tree/main/completed), where you can view an example `modeler.js` file.

## Next steps

You can script several additional API calls as outlined in the [Web Modeler API reference material](/apis-tools/web-modeler-api/index.md).
