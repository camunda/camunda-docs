---
id: camunda-8-api-intermediate-tutorial
title: Intermediate tutorial
sidebar_label: Intermediate
description: "Step through our intermediate Camunda 8 API tutorial to deploy resources, create and start a process instance, and view a process instance by its key."
---

In this tutorial, we'll step through examples to highlight the capabilities of the Camunda 8 API, such as deploying resources, creating and starting a process instance, and viewing a process instance by its key.

## Prerequisites

- If you haven't done so already, [create a cluster](/guides/create-cluster.md).
- Upon cluster creation, [create your first client](/guides/setup-client-connection-credentials.md). Ensure you check the `Zeebe` client scope box.

:::note
Make sure you keep the generated client credentials in a safe place. The **Client secret** will not be shown again. For your convenience, you can also download the client information to your computer.
:::

- In this tutorial, we utilize a JavaScript-written [GitHub repository](https://github.com/camunda/camunda-api-tutorials) to write and run requests. Clone this repo before getting started.
- The first request we will run is a request to deploy one or more resources (such as processes, decision models, or forms). For the purposes of this tutorial, we have preconfigured a BPMN diagram and converted this into XML. This diagram, `calculate-sales-tax.bpmn`, can be found in the GitHub repository above within the `resources` folder. The BPMN diagram itself represents a process to calculate the total sales tax for a given purchase. You can take a closer look at this diagram by opening it in [Modeler](/components/modeler/about-modeler.md).
- Ensure you have [Node.js](https://nodejs.org/en/download) installed as this will be used for methods that can be called by the CLI (outlined later in this guide). Run `npm install` to ensure you have updated dependencies.

## Getting started

- You need authentication to access the API endpoints. Find more information [here](./camunda-api-rest-authentication.md).

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

In this tutorial, we will execute arguments to deploy a resource, create and start a process instance, and view a process instance by its key. You can examine the framework for processing these arguments in the `cli.js` file before getting started.

:::

## Deploy resources (POST)

First, let's script an API call to deploy a resource.

To do this, take the following steps:

1. In the file named `camunda-process-instances.js`, outline the authentication and authorization configuration in the first few lines. This will pull in your `.env` variables to obtain an access token before making any API calls:

```javascript
const authorizationConfiguration = {
  clientId: process.env.CAMUNDA_CLIENT_ID,
  clientSecret: process.env.CAMUNDA_CLIENT_SECRET,
  // These settings come from your .env file. Note that CAMUNDA_TOKEN_AUDIENCE is represented by ZEEBE_TOKEN_AUDIENCE in the Console UI.
  audience: process.env.CAMUNDA_TOKEN_AUDIENCE,
};
```

2. Examine the function `async function deployResources()` below this configuration. This is where you will script out your API call.
3. Within the function, you must first generate an access token for this request, so your function should now look like the following:

```javascript
async function deployResources() {
  const accessToken = await getAccessToken(authorizationConfiguration);
}
```

4. Using your generated client credentials from [prerequisites](#prerequisites), capture your Camunda 8 REST API URL beneath your call for an access token by defining `camundaApiUrl`:

```javascript
const camundaApiUrl = process.env.CAMUNDA_REST_ADDRESS;
```

5. On the next line, script the API endpoint to list the existing roles:

```javascript
const url = `${camundaApiUrl}/deployments`;
```

6. We will now configure the variables representing the BPMN file and its form data. This may look different depending on which resources you choose to deploy, but reflects the block-scoped local variables and append method to insert a set of objects for the BPMN resource of this tutorial:

```javascript
const formData = new FormData();
// Read the BPMN file and add it to the form data
const bpmnFilePath = path.resolve("resources/calculate-sales-tax.bpmn");
const fileContent = fs.readFileSync(bpmnFilePath);
formData.append("resources", fileContent, {
  filename: "calculate-sales-tax.bpmn",
  contentType: "application/xml",
});
```

:::note
The `resources` name must be exact according to the API requirements, the path to the file (`const bpmnFilePath = path.resolve("resources/calculate-sales-tax.bpmn");`) must be correct, and `contentType` must be `application/xml` to ensure the upload will not fail.
:::

7. Configure your POST request to the appropriate endpoint, including an authorization header based on the previously acquired `accessToken`:

```javascript
const options = {
  method: "POST",
  url,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
    ...formData.getHeaders(),
  },
  data: formData,
};
```

8. Call the endpoint, process the results from the API call, and emit an error message from the server if necessary:

```javascript
try {
  const response = await axios(options);
  const deployedResources = response.data.deployments;

  // Emit deployed resources
  deployedResources.forEach((x) =>
    console.log(
      `Process Definition Key: ${x.processDefinition.processDefinitionKey}; Process Definition Id: ${x.processDefinition.processDefinitionId}`
    )
  );
} catch (error) {
  // Emit an error from the server.
  console.error(error.message);
}
```

9. In your terminal, run `node cli.js processInstances deploy`.

:::note
This `deploy` command is connected to the `deployResources` function at the bottom of the `camunda-process-instances.js` file, and executed by the `cli.js` file. While we will work with roles in this tutorial, you may add additional arguments depending on the API calls you would like to make.
:::

The existing process definition key and ID will now output. If you have an invalid API name or action name, or no arguments provided, or improper/insufficient credentials configured, an error message will output as outlined in the `cli.js` file.

## Create and start a process instance (POST)

To create and start a process instance based on the process instance key obtained in the request above, take the following steps:

1. Outline your function, similar to the steps above:

```javascript
async function createInstance([processDefinitionKey]) {
  const accessToken = await getAccessToken(authorizationConfiguration);
  const camundaApiUrl = process.env.CAMUNDA_REST_ADDRESS;
  const url = `${camundaApiUrl}/process-instances`;
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
    processDefinitionKey: processDefinitionKey,
    variables: {
      total: 90.0,
    },
  },
};
```

:::note
The request will succeed if the variable names are different, but the process instance itself will not function as expected.
:::

3. Process the results from the API call. For example:

```javascript
try {
  const response = await axios(options);
  const processInstance = response.data;

  console.log(`Process Instance Key: ${processInstance.processInstanceKey}`);
} catch (error) {
  console.error(error.message);
}
```

4. In your terminal, run `node cli.js processInstances create <key>`, where `<key>` is the process definition key. The `processInstanceKey` will now display in the output. Capture this key for a future method.

## Retrieve a process instance (GET)

To retrieve a process instance by the process instance key, take the following steps:

1. Outline your function, similar to the steps above:

```javascript
async function viewInstance([processInstanceKey]) {
  const accessToken = await getAccessToken(authorizationConfiguration);
  const camundaApiUrl = process.env.CAMUNDA_REST_ADDRESS;
  const url = `${camundaApiUrl}/process-instances/${processInstanceKey}`;
}
```

2. Configure the API call:

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
  const results = response.data;

  console.log(
    `Process instance name: ${results.processDefinitionName}; State: ${results.state};`
  );
} catch (error) {
  console.error(error.message);
}
```

4. In your terminal, run `node cli.js processInstances view <key>`, where `<key>` is the process instance key. The `processDefinitionName` and `state` will then display in the output.

## If you get stuck

Having trouble configuring your API calls or want to examine an example of the completed tutorial? Navigate to the `completed` folder in the [GitHub repository](https://github.com/camunda/camunda-api-tutorials/tree/main/completed), where you can view an example `camunda-process-instances.js` file.

## Next steps

You can script several additional API calls as outlined in the [Camunda 8 API reference material](./camunda-api-rest-overview.md).
