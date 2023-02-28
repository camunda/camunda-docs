---
id: use-connectors
title: Use Connectors
description: Learn how to use Connectors in Web Modeler by creating a Connector task, configuring a Connector, and reviewing potential errors.
---

Any task can be transformed into a Connector task. This guide details the basic functionality all Connectors share.
Find the available Connectors in Camunda Platform 8 SaaS and how to use them in detail in the [out-of-the-box Connectors](./out-of-the-box-connectors/available-connectors-overview.md) documentation.

## Outbound Connector

### Creating the BPMN task

Use the change type context menu item (spanner/wrench icon) to integrate Connectors in a business model. Users can search for keywords like `REST` or `email` to find specific Connectors. To discover all available Connectors in Camunda, input the term `Connector` into the search bar.

![connectors context menu](img/use-connectors-context-menu.png)

Alternatively, you can directly create a Connector task by using the **Append Connector** context menu item. This creates a new Connector task directly following the currently selected element.

![append Connector](img/use-connectors-append.png)

### Configuring the Outbound Connector

Once a Connector task is selected, the available configuration is visible in the properties panel on the right side. The required fields are highlighted with an error message.

![Connectors properties panel](img/use-connectors-properties.png)

Fields in the properties panel marked with an equals sign inside a circle indicate that [FEEL](/components/modeler/feel/what-is-feel.md) can be used to configure the property. If the icon includes an equals sign marked with a star, FEEL is required. Using FEEL allows the user to reference process data from variables in the expression to configure the properties.

![feel Connectors](img/use-connectors-feel.png)

Each Connector defines its own set of properties you can fill in. Find the details for Connectors provided by Camunda in the [out-of-the-box Connectors](./out-of-the-box-connectors/available-connectors-overview.md) documentation.

### Retries

By default, Connector execution is repeated `3` times if execution fails. To change the default retries value, edit the BPMN XML file and set the `retries` attribute at the `zeebe:taskDefinition`. For example:

```xml
...
<zeebe:taskDefinition type="io.camunda:http-json:1" retries="12" />
...
```

## Inbound Connector

### Creating the BPMN start event

:::note
Inbound Connectors are currently supported only in [Camunda Platform 8 Self-Managed](../../self-managed/about-self-managed.md).
To use an Inbound Connector, [install](https://docs.camunda.io/docs/next/components/modeler/desktop-modeler/element-templates/configuring-templates/) a related element template (for example, [generic webhook](https://github.com/camunda/connectors-bundle/tree/main/connectors/webhook-connector/element-templates) or [GitHub webhook](https://github.com/camunda/connectors-bundle/tree/main/connectors/github/element-templates)) first.
:::

1. Start building your BPMN diagram with a **Start Event** building block.
2. Change its template to an Inbound Webhook of your choice (e.g., generic webhook or GitHub).
3. Fill in all required properties.
4. Complete your BPMN diagram.
5. Deploy it to your Camunda Platform 8 instance.

![inbound connector](img/use-inbound-connector-template.png)

When you **deploy** such a BPMN diagram with a webhook, it becomes ready to receive calls on the webhook endpoint (see [Webhook docs](out-of-the-box-connectors/http-webhook.md) for details).

:::note
You can still start instances of that process manually via the modeler, which is sometimes useful during testing.
:::

### Configuring the Inbound Connector

To deploy and use an inbound webhook, you would need to fill in several fields.

1. **Webhook ID** - a context path for your inbound webhook. This is used to build a URL endpoint of your webhook. For example, given the `Webhook ID` value is `myWebhookPath`, the complete webhook URL endpoint will be `http(s)://<base URL>/inbound/myWebhookPath`.
2. **HMAC Authentication Enabled** - if an external caller uses HMAC as a means of request validation and authentication, you can `enable` this property. In that case, you'll need to specify additional field values. Read more about the [generic HTTP webhook configuration](out-of-the-box-connectors/http-webhook.md).
3. **Activation Condition** - a FEEL expression that assesses trigger conditions. For example, given external caller triggers a webhook endpoint with body `{"id": 1, "status": "OK"}`, the **Activation Condition** value might look like `=(request.body.status = "OK")`. Leave this field empty to trigger your webhook every time.
4. **Variable Mapping** - is a FEEL expression that transforms incoming body into BPMN process variables. For example, given external caller triggers a webhook endpoint with body `{"id": 1, "status": "OK"}` and you would like to extract `id` as a process variable `myDocumentId`. In that case, the **Variable Mapping** might look as `={myDocumentId: request.body.id}`.

See a list of [available Inbound Connectors](out-of-the-box-connectors/available-connectors-overview.md) and their respective specific configuration instructions.

## Using secrets

You can use sensitive information in your Connectors without exposing it in your BPMN processes by referencing secrets.
Use the Console component to [create and manage secrets](../console/manage-clusters/manage-secrets.md).

You can reference a secret like `MY_API_KEY` with `secrets.MY_API_KEY` in any Connector field in the properties panel that supports this.
Each of the [out-of-the-box Connectors](./out-of-the-box-connectors/available-connectors-overview.md) details which fields support secrets.

Secrets are **not variables** and must be wrapped in double quotes as follows when used in a FEEL expression:

```
= { myHeader: "secrets.MY_API_KEY"}
```

Using the secrets placeholder syntax, you can use secrets in any part of a text, like in the following FEEL expression:

```
= "https://" + baseUrl + "/{{secrets.TENANT_ID}}/accounting"
```

This example assumes there is a process variable `baseUrl` and a configured secret `TENANT_ID`.

The engine will resolve the `baseUrl` variable and pass on the secrets placeholder to the Connector. Assuming the `baseUrl` variable resolves to `my.company.domain`,
the Connector receives the input `"https://my.company.domain/{{secrets.TENANT_ID}}/accounting"`. The Connector then replaces the secrets placeholder upon execution.

For further details on how secrets are implemented in Connectors, consult our [Connector SDK documentation](./custom-built-connectors/connector-sdk.md#secrets).

:::note Warning
`secrets.*` is a reserved syntax. Don't use this for other purposes than referencing your secrets in Connector fields.
Using this in other areas can lead to unexpected results and incidents.
:::

## Response mapping

Some Connectors have a `Response Mapping` section that typically consists of two fields: `Result Variable` and `Result Expression`. These fields are used to export responses from an external Connector call into process variables.

### Result Variable

This field declares a single process variable to export responses from a Connector call. You are able to use this process variable further in the process.

### Result Expression

This field allows you to map a Connector response into multiple process variables which you are able to use further in the process. You can also transform the extracted values using [FEEL expressions](../concepts/expressions.md).

:::note
While using this field, a process variable with the name `response` is reserved.
:::

### Example

Imagine your Connector makes an external call to an arbitrary weather service. The weather service returns the following response:

```json
{
  "status": 200,
  "headers": {
    "date": "Thu, 19 Jan 2023 14:02:29 GMT",
    "transfer-encoding": "chunked",
    "content-type": "application/json; charset=utf-8",
    "connection": "keep-alive"
  },
  "body": {
    "latitude": 52.52,
    "longitude": 13.4,
    "generationtime_ms": 0.22804737091064453,
    "utc_offset_seconds": 0,
    "timezone": "GMT",
    "timezone_abbreviation": "GMT",
    "elevation": 45.0,
    "current_weather": {
      "temperature": 1.0,
      "windspeed": 10.1,
      "winddirection": 186.0,
      "weathercode": 2,
      "time": "2023-01-19T14:00"
    }
  }
}
```

If you declare a variable `myWeatherResponse` in the `Result Variable` field, the entire response is mapped to the declared variable.

Now, let's imagine that you wish to extract only temperature into a process variable `berlinWeather` and wind speed into `berlinWindSpeed`. Let's also imagine you need weather in Fahrenheit declared in `berlinWeatherInFahrenheit`.

In that case, you could declare `Result Expression` as follows:

```
= {
  berlinWeather: response.current_weather.temperature,
  berlinWindSpeed: response.current_weather.windspeed,
  berlinWeatherInFahrenheit: response.current_weather.temperature * 1.8 + 32
}
```

![Response mapping](img/connectors-response-mapping.png)

![Response mapping result](img/connectors-response-mapping-result.png)

## BPMN errors

Being able to deal with exceptional cases is a common requirement for business process models. Read more about our general best practices around this topic in [dealing with exceptions](/components/best-practices/development/dealing-with-problems-and-exceptions.md).

Connectors share this requirement for exception handling like any other task in a model. However, Connectors define reusable runtime behavior that is not aware of your specific business use case. Thus, they can not determine if an exceptional case is a technical or business error.
Therefore, a Connector's runtime behavior cannot throw BPMN errors, but only technical errors. However, those technical errors can optionally contain an error code as structured data that can be reused when configuring a Connector task.

### Error expression

To support flexible exception handling, the [out-of-the-box Connectors](./out-of-the-box-connectors/available-connectors-overview.md) allow users to define an **Error Expression** in the **Error Handling** section at the bottom of the properties panel.

The example below uses this property to automatically inform the right group of people depending on the result of an HTTP request against an internal website. If the website returns a valid result, this data is passed on to the regular team.
In case of a [404](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404) website response, the administrator is informed, so they can check why the website cannot be reached. HTTP responses with status [500](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500)
indicate internal website errors, which is why the website team is informed.

![feel Connectors](img/use-connectors-error-general.png)

The **Error Expression** property requires a [FEEL](/components/modeler/feel/what-is-feel.md) expression that yields a BPMN error object in the end. The BPMN error object can be an empty [context](/components/modeler/feel/language-guide/feel-data-types.md#context),
[null](/components/modeler/feel/language-guide/feel-data-types.md#null), or a context containing at least a non-empty `code`. You can use all available functionality provided by FEEL to produce this result.
Use the provided FEEL function [`bpmnError`](#function-bpmnerror) to conveniently create a BPMN error object.

Within the FEEL expression, you access the following temporary variables:

- The result of the Connector in `response`.
- Any result variables created by the **Result Variable** and **Result Expression** properties (see the [REST Connector](./out-of-the-box-connectors/rest.md#response), for example).
- The technical exception that potentially occurred in `error`, containing a `message` and optionally a `code`. The code is only available if the Connector's runtime behavior provided a code in the exception it threw.

Building on that, you can cover those use cases with BPMN errors that you consider as exceptional. This can build on technical exceptions thrown by a Connector as well as regular results returned by the external system you integrated.
The [example expressions](#bpmn-error-examples) below can serve as templates for such scenarios.

### Function bpmnError()

Returns a context entry with a `code` and `message`.

- parameters:
  - `code`: string
  - `message`: string
- result: context

```feel
bpmnError("123", "error received")
// { code: "123", message: "error received" }
```

### BPMN error examples

#### HTTP errors to BPMN errors

Using the [REST Connector](./out-of-the-box-connectors/rest.md), you can handle HTTP errors directly in your business process model:

```feel
if error.code = "404" then
  bpmnError("404", "Got a 404")
else if error.code = "500" then
  bpmnError("500", "Got a 500")
else
  null
```

This will create BPMN errors for HTTP requests that return with a status [404](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404) or [500](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500).
You can extend that list to all HTTP errors you can handle as business use cases, e.g. by informing a website administrator directly via Slack using the [Slack Connector](./out-of-the-box-connectors/slack.md).

#### Response value to BPMN error

Using the [REST Connector](./out-of-the-box-connectors/rest.md) or any other Connector that returns a result, you can handle a response as BPMN error based on its value:

```feel
if response.body.main.humidity < 0 then
  bpmnError("HUMIDITY-FAIL", "Received invalid humidity")
else null
```

This is assuming you requested data from a local weather station and received a value that is technically valid for the REST Connector.
However, you could define that for your business case a humidity value below `0` must be an error that should be checked manually.
You could automatically send a message to a technician to check the weather station.
