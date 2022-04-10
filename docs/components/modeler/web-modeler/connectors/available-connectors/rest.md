---
id: rest
title: REST Connector
description: Working with REST Connector
---

The **Rest Connector** allows you to make a request to a REST API and use the response in the next steps of your process.

## Create a Rest Connector task

To use **Rest Connector** in your process follow the steps below:

1. Open the Web Modeler and create a new BPMN Diagram
2. Add a **Task** and an **EndEvent**
3. Click on the **Task**, click on the little spanner/wrench icon, and select which **Rest Connector** you want to use depending on your authentication method:
   * Rest Connector (No Auth)
   * Rest Connector (Basic Auth)
   * Rest Connector (Bearer Token Auth)

![create sendgrid connector wrench](../img/connectors-rest-create-task-wrench.png)

Alternatively, you can directly create a **Rest Connector** by using the append menu:

![create rest connector append](../img/connectors-create-task-append.png)

## Make your Rest Connector executable

To make the **Rest Connector** executable, you need to fill at least the mandatory fields that are highlighted in red in the Properties Panel:

![rest connector red properties](../img/connectors-rest-red-properties.png)

All the mandatory and non-mandatory fields will be covered in the upcoming sections.

Depending on the authentication selection you made, more fields might be required which we will also cover in the next section.

### Authentication

You can choose between the available Rest Connectors according to your authentication requirements.

#### Rest Connector (No Auth)

No extra authentication configuration is required, you can jump to the [next section](#request). 

#### Rest Connector (Basic Auth)

##### Create a new Connector Secret

We advise you to keep your **Password** safe and avoid exposing it in the BPMN xml file by creating a secret:

1. Follow our [guide for creating secrets](../../../../console/manage-clusters/manage-secrets.md)
2. Name your secret (i.e `REST_BASIC_AUTH_SECRET`) so you can easily reference it later in our Connector

### Configure Basic Authentication

Select the **Rest Connector** and under the **Authentication** section, fill the following properties:

1. Set **Username** (i.e. `YOUR_USERNAME`)
2. Set **Password** to the secret you created (i.e. `secrets.REST_BASIC_AUTH_SECRET`)

![rest connector basic auth](../img/connectors-rest-basic-auth.png)


### Rest Connector (Bearer Token Auth)

#### Create a new Connector Secret

We advise you to keep your **Bearer Token** safe and avoid exposing it in the BPMN xml file by creating a secret:

1. Follow our [guide for creating secrets](../../../../console/manage-clusters/manage-secrets.md)
2. Name your secret (i.e `REST_BEARER_TOKEN`) so you can easily reference it later in our Connector

#### Configure the Bearer Token

Select the **Rest Connector** and under the **Authentication** section, fill the following properties:

1. Set **Bearer** to the secret you created (i.e. `secrets.REST_BEARER_TOKEN`)

![rest connector bearer token auth](../img/connectors-rest-bearer-token-auth.png)

## Request

Under the **HTTP Endpoint** section, select the desired **Method** and fill the **URL** with your desired REST API. 

![rest connector method and url](../img/connectors-rest-http-method-url.png)

### Query Parameters

The **Query Parameters** field can be configured using the ![feel-icon](../img/feel-icon.png) [FEEL Map](https://camunda.github.io/feel-scala/docs/reference/language-guide/feel-data-types/#context) data type.

```text
= { 
    q: "Berlin",
    appid: "secrets.OPEN_WEATHER_MAP_API_KEY",
    units: "metric",
    lang:"en"
}
```

![rest connector query parameters](../img/connectors-rest-query-param.png)

### Http Headers

Similarly to the Query Parameters, the **Http Headers** can be specified using the ![feel-icon](../img/feel-icon.png) [FEEL Map](https://camunda.github.io/feel-scala/docs/reference/language-guide/feel-data-types/#context) data type.

```text
= {
    Origin: "https://modeler.cloud.camunda.io/"
}
```

![rest connector http headers](../img/connectors-rest-http-headers.png)

### Request Body

When you are making a PUT, POST or PATCH request, you might need to provide a body.
You can provide a body for your request under the **Payload** section in the **Request Body** field.

Be aware that **Rest Connector** is supporting only JSON payload.

```json
{
     "temp": 25,
     "pressure": 1013,
     "humidity": 44,
     "temp_min": 16,
     "temp_max": 30
}
```
![rest connector http request body](../img/connectors-rest-http-request-body.png)

## Response

The HTTP response will be available in your process in a the **response** variable.

In the **response** variable, you will have available the following fields:
* **status**: the response status
* **body**: the response body of your request
* **headers**: the response headers

You can choose to map the content of your **response** in a **Result Variable** using again the ![feel-icon](../img/feel-icon.png) [FEEL Map](https://camunda.github.io/feel-scala/docs/reference/language-guide/feel-data-types/#context) data type.

```text
= {
    actual_temp: response.body.main.temp,
    feel_temp: response.body.main.feels_like,
    weather: body.weather[1].main
}
```

![rest connector http response mapping](../img/connectors-rest-http-response-mapping.png)

The next steps in your process will have access to the **currentWeather** variable that will contain the mapped keys: `actual_temp`, `feel_temp` and `weather`.