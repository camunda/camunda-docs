---
id: polling
title: HTTP Polling Connector
sidebar_label: HTTP Polling
description: The HTTP Polling Connector polls an endpoint at regular intervals, enabling periodic data fetching as an intermediate step in your BPMN processes.
---

The **HTTP Polling Connector** polls an endpoint at regular intervals, enabling periodic data fetching as an intermediate step in your BPMN processes. This Connector is built on top of the [REST Connector](../protocol/rest.md), ensuring consistent functionality and reliability.

:::caution
If you use the HTTP Polling Connector, ensure you do not have any instance variable named in the list below, as these are reserved words for this Connector:

- body, url, method, headers, authentication, queryParameters, connectionTimeoutInSeconds, httpRequestInterval

:::

## Prerequisites

Ensure that you have:

- An HTTP endpoint that supports polling.
- Necessary credentials if the endpoint demands authentication.

:::note Execution Exception Handling
If the HTTP Polling Connector encounters an execution exception while polling, it will ignore the exception and attempt to execute the request again after the next interval delay. Ensure to monitor your logs for any recurring issues.

:::

## Setting up the HTTP Polling Connector

1. Add an **Intermediate Event** to your BPMN diagram.
2. Change its template to the **HTTP Polling Connector**.
3. Populate all mandatory fields, like the endpoint URL, polling interval, and required headers.
4. Complete your BPMN diagram.
5. Deploy the diagram to activate the **HTTP Polling Connector**.

## Configuring the HTTP Polling Connector

### Authentication

Navigate to the **Authentication** section and select your desired **Authentication type** (e.g., Basic, OAuth). Refer to the [Authentication section of the REST Connector documentation](docs/components/connectors/protocol/rest.md#authentication) for a comprehensive guide.

### HTTP polling configuration

- **Method**: Choose the HTTP method for your request, e.g., GET, POST, PUT.
- **URL**: Enter the URL of the targeted HTTP endpoint.
- **Headers** (Optional): Input required headers as per the external service. Learn more about headers in the [REST Connector headers](docs/components/connectors/protocol/rest.md#http-headers) section.
- **Query Parameters** (Optional): Add necessary query parameters for the endpoint. More details can be found in the [REST Connector query parameters](docs/components/connectors/protocol/rest.md#query-parameters) section.
- **Interval** (Optional): Set the frequency for polling the endpoint in ISO 8601 durations format. The default interval is 50 seconds. Review [how to configure a time duration](../../modeler/bpmn/timer-events/timer-events.md#time-duration) for details.
- **Connection Timeout**: Define how long (in seconds) the Connector waits before timing out. Further information on this can be found [here](docs/components/connectors/protocol/rest.md#connection-timeout).

### Payload configuration (optional)

In the **Payload** section, you can include a **request body**. Learn more about this [here](docs/components/connectors/protocol/rest.md#request-body).

### Condition to proceed

1. **Correlation key (process)**: Defines the correlation key based on the process instance.

   - **Example**: Using a process variable named `orderId`:
     ```
     Correlation key (process): =orderId
     ```

2. **Correlation key (payload)**: Extracts the correlation key from the polled data.

   - **Example**: With data like `{"orderId": "123"}`:
     ```
     Correlation key (payload): =body.orderId
     ```

3. **Activation Condition**: Checks if the polled data meets criteria to activate the intermediate catch event.
   - **Example**: If the data should have a `status` of "OK":
     ```
     Activation Condition: =(body.status = "OK")
     ```

For more information about correlation keys, review the [messages guide](../../../concepts/messages).

## Handling HTTP Connector responses

The response from any HTTP Connector contains the status, headers, and body. Learn more about the response structure [here](docs/components/connectors/protocol/rest.md#response).

To structure and utilize the response:

1. Set a **Result Variable** to store the HTTP response, e.g., `pollingData`.
2. Use a **Result Expression** to extract specific fields from the `={fieldProperty:body.fieldProperty}`.

## Examples

### Scenario 1: Monitoring GitHub issues

Monitor a GitHub issue to see when it's closed and if it has a specific label ('needs review').

#### Steps

1. Drag an intermediate event onto your BPMN diagram.
2. Choose the HTTP Polling Connector template.
3. Configure the Connector with the relevant details:
   - **URL**: `https://api.github.com/repos/[YourRepoOwner]/[YourRepoName]/issues/[IssueNumber]`
   - **Authorization Type**: Bearer token
   - **Bearer token**: `{{secrets.BEARER_TOKEN}}`
   - **Method**: `GET`
   - **Headers**: `={"Content-Type": "application/vnd.github+json","X-GitHub-Api-Version": "2022-11-28"}`
   - **Interval**: `PT10M` (Every 10 minutes) – This checks the GitHub issue every 10 minutes.
   - **Correlation Key (process)**: `=issueNumber`
   - **Correlation Key (payload)**: `=body.number`
   - **Activation Condition**: `=(body.state = "closed")`
   - **Result Expression**: `={issueUrl:body.html_url, needsReview: list contains((body.labels).name, "needs review")}` - Extract the issue URL and check if the label 'needs review' is present.

#### Example response

```json
{
  "status": 200,
  "body": {
    "number": 212,
    "title": "Important Issue",
    "labels": [{ "name": "bug" }, { "name": "needs review" }],
    "state": "closed",
    "html_url": "https://github.com/YourRepoOwner/YourRepoName/issues/212"
  }
}
```

In this scenario, once the issue #212 titled **Important Issue** is closed, the process will proceed. If the issue is also labeled **needs review**, this label can be leveraged in the next steps of the process. For instance, it can trigger the creation of a new issue for review or initiate other related actions.

### Scenario 2: Monitoring product stock levels

Suppose you're overseeing an e-commerce platform. It's vital to ensure certain popular products remain stocked to guarantee user satisfaction. Avoiding stock-outs is essential to prevent lost sales and keep customers happy. With Camunda's HTTP Polling Connector, you can maintain a real-time stock level check.

#### Steps

1. Drag an intermediate event onto your BPMN diagram.
2. Choose the HTTP Polling Connector template.
3. Configure the Connector as follows:
   - **URL**: `https://inventory.yourstore.com/api/v2/products/12345/stock`
   - **Authorization Type**: Basic Authentication
   - **Username**: `[YourInventoryAPIUsername]`
   - **Password**: `{{secrets.PASSWORD}}`
   - **Interval**: `PT1H` (Every hour)
   - **Correlation Key (process)**: `=productID`
   - **Correlation Key (payload)**: `=body.productID`
   - **Activation Condition**: `=(body.stockLevel < 10)`
   - **Result Expression**: `={stockLevelResponse:body.stockLevel}`

#### Example response

```json
{
  "status": 200,
  "body": {
    "productID": 12345,
    "productName": "Wireless Bluetooth Earbuds",
    "stockLevel": 8,
    "lastUpdated": "2023-09-17T11:20:32Z"
  }
}
```

Whenever the stock level of this particular product goes below 10 units, the BPMN process can be set up to perform tasks such as notifying the supply chain, alerting marketing teams, or showcasing a "Low in Stock" badge on the product's webpage.

## Next steps

- Dive deeper into the [REST Connector](docs/components/connectors/protocol/rest.md) to understand its capabilities and configurations.
- Explore [other Connectors available](../out-of-the-box-connectors/available-connectors-overview.md) in Camunda to integrate with various systems and services.
- Get a comprehensive understanding of how to use Connectors in your BPMN processes [here](../use-connectors/index.md).
- Learn about the specifics of inbound Connectors and how they can be used [here](../use-connectors/inbound.md).
