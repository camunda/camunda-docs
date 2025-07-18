---
id: index
title: How to use connectors
description: Learn how to use connectors in Web Modeler by creating a connector task, configuring a connector, and reviewing potential errors.
---

Any task can be transformed into a connector task. This guide details the basic functionality all connectors share.

Find the available connectors in Camunda 8 SaaS and how to use them in detail in
the [out-of-the-box connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md)
documentation. Additionally, learn how you can visit
the [Camunda Marketplace](/components/modeler/web-modeler/camunda-marketplace.md) to add connectors from your BPMN
diagram.

:::info
Learn how to [install connectors in Self-Managed](/self-managed/connectors-deployment/install-and-start.md).
:::

:::note
New to modeling with Camunda? The steps below assume some experience with Camunda modeling
tools. [Model your first diagram](/components/modeler/web-modeler/model-your-first-diagram.md) to learn how to work with
Web Modeler.
:::

## Using secrets

:::danger
`secrets.*` is a deprecated syntax. Instead, use `{{secrets.*}}`
:::

You can use sensitive information in your connectors without exposing it in your BPMN processes by referencing secrets.
Use the Console component to [create and manage secrets](/components/console/manage-clusters/manage-secrets.md).

You can reference a secret like `MY_API_KEY` with `{{secrets.MY_API_KEY}}` in any connector field in the properties
panel that supports this.
Each of
the [out-of-the-box connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md)
details which fields support secrets.

Secrets are **not variables** and must be wrapped in double quotes as follows when used in a FEEL expression:

```
= { myHeader: "{{secrets.MY_API_KEY}}"}
```

Using the secrets placeholder syntax, you can use secrets in any part of a text, like in the following FEEL expression:

```
= "https://" + baseUrl + "/{{secrets.TENANT_ID}}/accounting"
```

This example assumes there is a process variable `baseUrl` and a configured secret `TENANT_ID`.

The engine will resolve the `baseUrl` variable and pass on the secrets placeholder to the connector. Assuming the
`baseUrl` variable resolves to `my.company.domain`,
the connector receives the input `"https://my.company.domain/{{secrets.TENANT_ID}}/accounting"`. The connector then
replaces the secrets placeholder upon execution.

For further details on how secrets are implemented in connectors, consult
our [Connector SDK documentation](/components/connectors/custom-built-connectors/connector-sdk.md#secrets).

:::note Warning
`secrets.*` is a reserved syntax. Don't use this for other purposes than referencing your secrets in connector fields.
Using this in other areas can lead to unexpected results and incidents.
:::

## Variable/response mapping

When a **Connector** is expected to return a result, **Connectors** feature a dedicated section known as
`Response Mapping`,
comprising two essential fields: `Result Variable` and `Result Expression`.
These fields export responses from external **Connector** calls into process variables.

### Result variable

This field declares a singular process variable designated for the export of responses from a **Connector** call.
The resulting process variable can be subsequently utilized within the ongoing process.

#### Example

If you set `result` inside the `Result variable` field of the REST outbound connector, this variable is available:

```json
{
  "result": {
    "status": 200,
    "headers": {
      "date": "Thu, 03 Apr 2025 07:05:19 GMT",
      "server": "nginx",
      "content-type": "text/html; charset=UTF-8"
    },
    "body": {
      "orderNumber": "1234",
      "date": "2025-04-01",
      "customerId": "567",
      "address": {
        "streetAddress": "1234 Elm Street",
        "city": "Paris",
        "state": "CA",
        "postalCode": "90210",
        "country": "USA"
      }
    },
    "reason": "OK",
    "document": null
  }
}
```

### Result expression

This field facilitates the mapping of a **Connector** response into multiple process variables,
providing further flexibility of the variable utilization within the ongoing process.
Additionally, the extracted values can be transformed with [FEEL expressions](/components/concepts/expressions.md).

To ensure process isolation, note that connectors do not have access to process instance variables.

:::note
While using this field, a process variable with the name `response` is reserved.
It should only be used when a connector returns atomic values like a string or a number.
:::

#### Example

If you set `{ "bodyReceived": body }` inside the `Result Expression` field of the REST outbound connector, this variable
is available:

```json
{
  "bodyReceived": {
    "orderNumber": "1234",
    "date": "2025-04-01",
    "customerId": "567",
    "address": {
      "streetAddress": "1234 Elm Street",
      "city": "Paris",
      "state": "CA",
      "postalCode": "90210",
      "country": "USA"
    }
  }
}
```

### Example

Imagine your connector makes an external call to an arbitrary weather service. The weather service returns the following
response:

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

If you declare a variable `myWeatherResponse` in the `Result Variable` field, the entire response is mapped to the
declared variable.

Now, let's imagine that you wish to extract only temperature into a process variable `berlinWeather` and wind speed into
`berlinWindSpeed`. Let's also imagine you need weather in Fahrenheit declared in `berlinWeatherInFahrenheit`.

In that case, you could declare `Result Expression` as follows:

```
= {
  berlinWeather: response.body.current_weather.temperature,
  berlinWindSpeed: response.body.current_weather.windspeed,
  berlinWeatherInFahrenheit: response.body.current_weather.temperature * 1.8 + 32
}
```

## Activation

The **Activation** section pertains specifically to [inbound connectors](/components/connectors/connector-types.md).

### Activation condition

The **Activation condition** field evaluates conditions against the incoming message payload. It enables filtering of payloads that can initiate a process. If left empty, all valid incoming messages will trigger a new process—except those that fail pre-validation checks, such as **HMAC signature verification** for specific connectors.

## Correlation

### Correlation key (process)

The **Correlation key (process)** field specifies which variable from the connector output should serve as the process correlation key.  
Learn more about [message correlation](/components/concepts/messages.md#message-correlation-overview).

### Correlation key (payload)

The **Correlation key (payload)** field tells the connector how to extract the correlation value from the incoming message payload.

### Message ID expression

The **Message ID expression** field defines how to extract a unique identifier from the incoming message payload.  
Messages that share the same identifier within the defined **time-to-live (TTL)** will be correlated only once.  
Leaving this field empty may cause identical messages to be submitted and processed multiple times.

## BPMN errors and failing jobs {#bpmn-errors}

Being able to deal with exceptional cases is a common requirement for business process models. Read more about our
general best practices around this topic
in [dealing with problems and exceptions](/components/best-practices/development/dealing-with-problems-and-exceptions.md).

Connectors share this requirement for exception handling like any other task in a model. However, connectors define
reusable runtime behavior that is not aware of your specific business use case. Thus, they cannot determine if an
exceptional case is a technical or business error.
Therefore, a connector's runtime behavior cannot throw BPMN errors, but only technical errors. However, those technical
errors can optionally contain an error code as structured data that can be reused when configuring a connector task.

:::note
There may be situations where technical errors cannot be detected by the runtime and they must be thrown explicitly.
:::

### Error expression

To support flexible exception handling,
the [out-of-the-box connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md) allow
users to define an **Error Expression** in the **Error Handling** section at the bottom of the properties panel.

The example below uses this property to automatically inform the right group of people depending on the result of an
HTTP request against an internal website. If the website returns a valid result, this data is passed on to the regular
team.
In case of a [404](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404) website response, the administrator is
informed, so they can check why the website cannot be reached. HTTP responses with
status [500](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500)
indicate internal website errors, which is why the website team is informed.

![feel connectors](../img/use-connectors-error-general.png)

The **Error Expression** property requires a [FEEL](/components/modeler/feel/what-is-feel.md) expression that yields a
BPMN error object in the end. The BPMN error object can be an
empty [context](/components/modeler/feel/language-guide/feel-data-types.md#context),
[null](/components/modeler/feel/language-guide/feel-data-types.md#null), or a context containing at least a non-empty
`errorType` and a non-empty `code` if the error type is `bpmnError`. You can use all available functionality provided by
FEEL to produce this result.

Use the provided FEEL functions:

- [`bpmnError`](#function-bpmnerror) to create a BPMN error object. This triggers
  a [ThrowError call](/components/best-practices/development/dealing-with-problems-and-exceptions.md) to the workflow
  engine.
- [`jobError`](#function-jobError) to create a fail job object. This triggers
  a [FailJob call](/components/best-practices/development/dealing-with-problems-and-exceptions.md) to the workflow
  engine.

The `bpmnError` FEEL function optionally allows you to pass variables as the third parameter. You can combine this with
a boundary event to use the variables in condition expressions when handling the error event. Example FEEL expression:

```
if response.body.status = "failed" then bpmnError("FAILED", "The action failed", response.body) else null
```

Within the FEEL expression, you access the following temporary variables:

- The result of the connector in `response`.
- The job of the invocation in `job` with the fields: `retries`
- Any result variables created by the **Result Variable** and **Result Expression** properties (see
  the [REST connector](/components/connectors/protocol/rest.md#response), for example).
- The technical exception that potentially occurred in `error`, containing a `message` and optionally a `code`. The code
  is only available if the connector's runtime behavior provided a code in the exception it threw.

Building on that, you can cover those use cases with BPMN errors that you consider as exceptional. This can build on
technical exceptions thrown by a connector as well as regular results returned by the external system you integrated.
The [example expressions](#bpmn-error-examples) below can serve as templates for such scenarios.

### Function bpmnError()

Returns a context entry with an `errorType`, `code` and `message`.

- parameters:
  - `code`: string
  - `message`: string
- result: context

```feel
bpmnError("123", "error received")
// { errorType: "bpmnError", code: "123", message: "error received" }
```

### Function bpmnError() with variables

Returns a context entry with an `errorType`, `code`, `message`, and `variables`.

- Parameters:
  - `code`: string
  - `message`: string
  - `variables`: context
- Result: context

```feel
bpmnError("123", "error received", {myVar: myValue})
// { errorType: "bpmnError", code: "123", message: "error received", variables: {myVar: myValue}}
```

### Function jobError()

Returns a context entry with an `errorType`, `message`, `variables`, `retries`, and `timeout`.

- Parameters:
  - `message`: string
  - `variables`: context _(optional), default_ `{}`
  - `retries`: number _(optional), default_ `0`
  - `timeout`: days-time-duration _(optional), default_ `PT0S`
- Result: context

Optional parameters can be omitted if no parameter needs to be set after.

```feel
jobError("job failed", {myVar: myValue}, 2, @"PT30S")
// { errorType: "jobError", message: "job failed", variables: {myVar: myValue}, retries: 2, timeout: @"PT30S" }
```

```feel
jobError("job failed", {myVar: myValue}, 2)
// { errorType: "jobError", message: "job failed", variables: {myVar: myValue}, retries: 2, timeout: @"PT0S" }
```

```feel
jobError("job failed", {myVar: myValue})
// { errorType: "jobError", message: "job failed", variables: {myVar: myValue}, retries: 0, timeout: @"PT0S" }
```

```feel
jobError("job failed")
// { errorType: "jobError", message: "job failed", variables: {}, retries: 0, timeout: @"PT0S" }
```

### BPMN error examples

#### HTTP errors to BPMN errors

Using the [REST connector](/components/connectors/protocol/rest.md), you can handle HTTP errors directly in your
business process model by setting a header named `errorExpression` with the following value:

```feel
if error.code = "404" then
  bpmnError("404", "Got a 404")
else if error.code = "500" then
  bpmnError("500", "Got a 500")
else if response.body.status = "failed" then
  bpmnError("FAILED", "Action failed", response.body)
else
  null
```

This will create BPMN errors for HTTP requests that return with a
status [404](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404)
or [500](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500).
You can extend that list to all HTTP errors you can handle as business use cases, for example by informing a website
administrator directly via Slack using the [Slack connector](/components/connectors/out-of-the-box-connectors/slack.md).

#### Response value to BPMN error

Using the [REST connector](/components/connectors/protocol/rest.md) or any other connector that returns a result, you
can handle a response as a BPMN error based on its value, by setting a header named `errorExpression` with the following
value:

```feel
if response.body.main.humidity < 0 then
  bpmnError("HUMIDITY-FAIL", "Received invalid humidity")
else null
```

This is assuming you requested data from a local weather station and received a value that is technically valid for the
REST connector.
However, you could define that for your business case a humidity value below `0` must be an error that should be checked
manually.
You could automatically send a message to a technician to check the weather station.

#### Generic Header to transform a connectorException to a BPMN Error

If the connector throws a `ConnectorException` like:

```java
  throw new ConnectorException("HUMIDITY-FAIL","Received invalid humidity");
```

Then you can transform this exception to a BPMN error with this expression in a Header item named `errorExpression`:

```feel
if is defined(error) then bpmnError(error.code, error.message) else null
```

### Fail job examples

#### HTTP errors to fail job

Using the [REST connector](/components/connectors/protocol/rest.md), you can handle HTTP errors directly in your
business process model by setting a header named `errorExpression` with the following value:

```feel
if error.code = "404" then
  jobError("Resource not found")
else if error.code = "504" then
  jobError("Gateway timeout", {},job.retries - 1, @"PT30S")
else if response.body.status = "technicalProblem" then
  jobError("Technical Problem", response.body)
else
  null
```

This will allow you to control the job failure for HTTP requests that return with
status [404](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404)
or [504](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/504).
You can extend that list to all HTTP errors you can handle as a custom fail job; for example, to go to 0 retries
instantly or increase the retry timeout.
