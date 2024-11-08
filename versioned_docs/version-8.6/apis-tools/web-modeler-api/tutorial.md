---
id: modeler-api-tutorial
title: Tutorial
sidebar_position: 3
slug: /apis-tools/web-modeler-api/tutorial
description: "Step through an example to create a new project, add a collaborator, view project details, and delete a project using the Web Modeler API."
---

In this tutorial, we'll step through examples to highlight the capabilities of the Web Modeler API, such as creating a new project, adding a collaborator to a project, viewing the details of a project, and deleting a project.

## Prerequisites

- Create your first client by navigating to **Console > Organization > Administration API > Create new credentials**. Ensure you determine the scoped access for client credentials. For example, in this tutorial we will create a project, add a collaborator, and delete a project. Ensure you check the box for the Web Modeler scope.

:::note
Make sure you keep the generated client credentials in a safe place. The **Client secret** will not be shown again. For your convenience, you can also download the client information to your computer.
:::

- In this tutorial, we utilize a JavaScript-written [GitHub repository](https://github.com/camunda/camunda-api-tutorials) to write and run requests. Clone this repo before getting started.
- Ensure you have [Node.js](https://nodejs.org/en/download) installed as this will be used for methods that can be called by the CLI (outlined later in this guide). Run `npm install` to ensure you have updated dependencies.

## Getting started

- A detailed API description can be found [here](https://modeler.cloud.camunda.io/swagger-ui/index.html) via Swagger. With a valid access token, this offers an interactive API experience against your Camunda 8 cluster.
- You need authentication to access the API endpoints. Find more information [here](/apis-tools/web-modeler-api/authentication.md).

## Set up authentication

If you're interested in how we use a library to handle auth for our code, or to get started, examine the `auth.js` file in the GitHub repository. This file contains a function named `getAccessToken` which executes an OAuth 2.0 protocol to retrieve authentication credentials based on your client ID and client secret. Then, we return the actual token that can be passed as an authorization header in each request.

To set up your credentials, create an `.env` file which will be protected by the `.gitignore` file. You will need to add your `MODELER_CLIENT_ID`, `MODELER_CLIENT_SECRET`, `MODELER_AUDIENCE`, which is `modeler.cloud.camunda.io` in a Camunda 8 SaaS environment, and `MODELER_BASE_URL`, which is `https://modeler.camunda.io/api/v1`.

These keys will be consumed by the `auth.js` file to execute the OAuth protocol, and should be saved when you generate your client credentials in [prerequisites](#prerequisites).

:::tip Can't find your environment variables?
When you create new client credentials as a [prerequisite](#prerequisites), your environment variables appear in a pop-up window. Your environment variables may appear as `CAMUNDA_CONSOLE_CLIENT_ID`, `CAMUNDA_CONSOLE_CLIENT_SECRET`, and `CAMUNDA_CONSOLE_OAUTH_AUDIENCE`.
:::

Examine the existing `.env.example` file for an example of how your `.env` file should look upon completion. Do not place your credentials in the `.env.example` file, as this example file is not protected by the `.gitignore`.

:::note

In this tutorial, we will execute arguments to create a project, add a collaborator, and delete a project. You can examine the framework for processing these arguments in the `cli.js` file before getting started.

:::

## Create a new project (POST) and add a collaborator (PUT)

First, let's script an API call to create a new project.

To do this, take the following steps:

1. In the file named `modeler.js`, outline the authentication and authorization configuration in the first few lines. This will pull in your `.env` variables to obtain an access token before making any API calls:

```javascript
const authorizationConfiguration = {
  clientId: process.env.MODELER_CLIENT_ID,
  clientSecret: process.env.MODELER_CLIENT_SECRET,
  audience: process.env.MODELER_AUDIENCE,
};
```

2. Examine the function `async function createProject([projectName, adminEmail])` below this configuration. This is where you will script out your API call, defining a project name and the project administrator's email.
3. Within the function, you must first generate an access token for this request, so your function should now look like the following:

```javascript
async function createProject([projectName, adminEmail]) {
  const accessToken = await getAccessToken(authorizationConfiguration);
}
```

4. Using your generated client credentials from [prerequisites](#prerequisites), capture your Web Modeler base URL beneath your call for an access token by defining `modelerApiUrl`:

```javascript
const modelerApiUrl = process.env.MODELER_BASE_URL;
```

5. On the next line, script the API endpoint to create your project:

```javascript
const projectUrl = `${modelerApiUrl}/projects`;
```

6. Configure your POST request to the appropriate endpoint, including an authorization header based on the previously acquired `accessToken`. You will also add a body to outline information about the new project:

```javascript
const projectOptions = {
  method: "POST",
  url: projectUrl,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
  data: {
    name: projectName,
  },
};
```

7. Call the add project endpoint and capture the data for the new project:

```javascript
  try {
    const response = await axios(projectOptions);

    const newProject = response.data;

    console.log(
      `Project added! Name: ${newProject.name}. ID: ${newProject.id}.`
    );
```

8. Next, we'll add a collaborator to the project you just created. After calling the add project endpoint, add an endpoint to add a collaborator to the project:

```javascript
const collaboratorUrl = `${modelerApiUrl}/collaborators`;
```

9. Configure the API call, including a body with information about the project and the new collaborator:

```javascript
    const collaboratorOptions = {
      method: "PUT",
      url: collaboratorUrl,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      data: {
        email: adminEmail,
        projectId: newProject.id,
        role: "project_admin"
      }
```

10. Call the add collaborator endpoint and process the results:

```javascript
 const collaboratorResponse = await axios(collaboratorOptions);

    if (collaboratorResponse.status === 204) {
      console.log(`Collaborator added! Email: ${adminEmail}.`);
    } else {
      console.error("Unable to add collaborator!");
    }
  } catch (error) {
    // Emit an error from the server.
    console.error(error.message);
  }
```

11. In your terminal, run `npm run cli modeler create` to create your project.

:::note
This `create` command is connected to the `createProject` function at the bottom of the `modeler.js` file, and executed by the `cli.js` file. While we create a project in this tutorial, you may add additional arguments depending on the API calls you would like to make.
:::

## View project details (GET)

To view project details, take the following steps:

1. Outline your function, similar to the steps above:

```javascript
async function viewProject([projectId]) {
  const accessToken = await getAccessToken(authorizationConfiguration);
  const modelerApiUrl = process.env.MODELER_BASE_URL;
  const url = `${modelerApiUrl}/projects/${projectId}`;
}
```

2. Configure the API call using the GET method:

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

3. Process the results from the API call. For example:

```javascript
try {
  const response = await axios(options);
  const project = response.data;

  console.log("Project:", project);
} catch (error) {
  console.error(error.message);
}
```

4. In your terminal, run `npm run cli modeler view <project ID>`, where `<project ID>` is the ID output by the command to create a project.

## Delete a project

To delete a project, take the following steps:

1. Outline your function, similar to the steps above:

```javascript
async function deleteProject([projectId]) {
  const accessToken = await getAccessToken(authorizationConfiguration);
  const modelerApiUrl = process.env.MODELER_BASE_URL;
  const url = `${modelerApiUrl}/projects/${projectId}`;
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
  const response = await axios(options);

  if (response.status === 204) {
    console.log(`Project ${projectId} was deleted!`);
  } else {
    console.error("Unable to delete project!");
  }
} catch (error) {
  console.error(error.message);
}
```

4. In your terminal, run `npm run cli modeler delete <project ID>`, where `<project ID>` is the ID output by the command to create a project.

## If you get stuck

Having trouble configuring your API calls or want to examine an example of the completed tutorial? Navigate to the `completed` folder in the [GitHub repository](https://github.com/camunda/camunda-api-tutorials/tree/main/completed), where you can view an example `modeler.js` file.

## Next steps

You can script several additional API calls as outlined in the [Web Modeler API reference material](/apis-tools/web-modeler-api/index.md).
