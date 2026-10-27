---
id: sendgrid
title: SendGrid connector
sidebar_label: SendGrid
description: Send plain text, HTML, or dynamic template emails from your BPMN processes with SendGrid.
---

import OutboundConnectorBasics from '../../../components/react-components/\_connector-outbound-basics.md'
import ErrorHandling from '../../../components/react-components/\_connector-error-handling.md'

Send emails from your BPMN processes using the SendGrid email API.

## About this connector

The **SendGrid connector** is an outbound connector that sends an email through [SendGrid](https://sendgrid.com/). Use it to send transactional emails, such as order confirmations or status notifications, from a service task.

You can send an email in one of two ways, selected with the **Mail contents** property:

- **Simple (no dynamic template)**: Provide the subject and body, as plain text or HTML, in the connector.
- **Using dynamic template**: Use a [SendGrid dynamic template](https://sendgrid.com/solutions/email-api/dynamic-email-templates/) and pass dynamic values to it from process variables.

With either option, you can attach documents to the email.

## Prerequisites

To use the SendGrid connector, you need the following:

| Prerequisite                                   | Description                                                                                                 |
| :--------------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| [SendGrid account](#create-a-sendgrid-account) | A SendGrid account to send emails from.                                                                     |
| [Sender identity](#create-a-sender-identity)   | A verified sender identity, which SendGrid requires before you can send emails.                             |
| [API key](#create-an-api-key)                  | A SendGrid API key, stored as a [connector secret](#create-a-connector-secret) or in a reusable credential. |
| Dynamic template (optional)                    | A SendGrid dynamic template, if you send emails with **Using dynamic template**.                            |

### Create a SendGrid account

If you do not have a SendGrid account yet, create a free account:

1. Go to the [SendGrid sign-up page](https://signup.sendgrid.com/).
2. Set up the account with your email address and a password.
3. Click **Create Account**.
4. Provide the further information SendGrid requires.
5. Click **Get Started**.

### Create a sender identity

Before you send your first email, create and verify a sender identity:

1. Click **Settings > Sender Authentication**, or open the [sender authentication page](https://app.sendgrid.com/settings/sender_auth).
2. Choose **Verify a Single Sender** for demo purposes, or **Authenticate Your Domain** for a production setup.
3. Provide the details SendGrid requests in the form and click **Create**.
4. Open the verification email SendGrid sent to your inbox.
5. Click **Verify Single Sender**.

### Create an API key

To create an API key in SendGrid:

1. Log in to your SendGrid account.
2. Go to **Settings**.
3. Click **API Keys > Create API Key**.
4. Give your key a name, for example `my-camunda-connector-key`.
5. Click **Create Key**.
6. Copy the API key. SendGrid shows it only once.

### Create a connector secret

Keep your API key safe and avoid exposing it in the BPMN XML by storing it as a secret:

1. Follow the [guide for creating secrets](/components/saas/clusters/manage-secrets.md).
2. Name your secret `SEND_GRID_API_KEY` so you can reference it as `{{secrets.SEND_GRID_API_KEY}}` in the connector.

<OutboundConnectorBasics />

## Configuration

Properties in this section apply to every email the connector sends.

### Authentication

Choose a reusable credential, or enter an API key in the task.

| Property            | Type          | Required    | Description                                                                                                                                                                                                                                                                   | Example                         |
| :------------------ | :------------ | :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------ |
| SendGrid credential | Configuration | No          | A reusable **SendGrid API Key** credential. Available from Camunda 8.11. If you select a credential, its API key takes precedence and the **SendGrid API key** property is hidden. See [using credentials](/components/connectors/use-connectors/index.md#using-credentials). |                                 |
| SendGrid API key    | String        | Conditional | Your SendGrid API key. Required if you do not select a **SendGrid credential**. Use a secret to avoid exposing the key.                                                                                                                                                       | `{{secrets.SEND_GRID_API_KEY}}` |

### Sender

The sender identity must match a sender you verified in SendGrid. See [create a sender identity](#create-a-sender-identity).

| Property      | Type   | Required | Description                      | Example                |
| :------------ | :----- | :------- | :------------------------------- | :--------------------- |
| Name          | String | Yes      | The name of the sender.          | `Jane Doe`             |
| Email address | String | Yes      | The email address of the sender. | `jane-doe@camunda.com` |

### Receiver

| Property      | Type   | Required | Description                         | Example                  |
| :------------ | :----- | :------- | :---------------------------------- | :----------------------- |
| Name          | String | Yes      | The name of the recipient.          | `John Smith`             |
| Email address | String | Yes      | The email address of the recipient. | `john-smith@example.com` |

### Attachments

Attach documents to the email. Each attachment is a [document](/components/document-handling/send-document-to-external-system.md#document-sources) with a **Camunda document** reference, **inline content** built from process data, or an **external document** URL.

| Property            | Type     | Required    | Description                                                                                                                                                                          | Example                    |
| :------------------ | :------- | :---------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- |
| Number of documents | Dropdown | Yes         | How many documents to attach. Options: **None**, **Single document**, **Multiple documents**. Default: **None**.                                                                     |                            |
| Document source     | Dropdown | Conditional | The source of the document. Options: **Camunda Document**, **Inline Content**, **From URL**. Default: **Camunda Document**. Shown if **Number of documents** is **Single document**. |                            |
| Camunda document    | String   | Conditional | A reference to a Camunda document, as a FEEL expression. Required if **Document source** is **Camunda Document**.                                                                    | `= invoiceDocument`        |
| Content             | String   | Conditional | The content of the inline document. Required if **Document source** is **Inline Content**.                                                                                           |                            |
| File name           | String   | No          | The name of the inline document. Shown if **Document source** is **Inline Content**.                                                                                                 |                            |
| Content type        | String   | No          | The MIME type of the inline document. Shown if **Document source** is **Inline Content**.                                                                                            |                            |
| URL                 | String   | Conditional | The URL the document is downloaded from. Required if **Document source** is **From URL**.                                                                                            |                            |
| File name           | String   | No          | The name of the external document. Shown if **Document source** is **From URL**.                                                                                                     |                            |
| Documents           | String   | Conditional | A FEEL expression that returns a list of documents. Required if **Number of documents** is **Multiple documents**.                                                                   | `= [document1, document2]` |

To use a **Camunda document**, upload it first, for example with the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/specifications/create-document.api.mdx), and assign the result to a variable in **Start process instance**. Then reference the variable in the **Camunda document** property. See [document handling](/components/document-handling/getting-started.md) for details and limitations.

### Job timeout

| Property    | Type   | Required | Description                                                                                                                            | Example |
| :---------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Job timeout | String | No       | An ISO-8601 duration after which Zeebe considers the job timed out if it is not completed yet. Leave empty to use the default timeout. | `PT1M`  |

## Operations

The **Mail contents** property selects how the connector composes the email.

| Property      | Type     | Required | Description                                                                                      | Example |
| :------------ | :------- | :------- | :----------------------------------------------------------------------------------------------- | :------ |
| Mail contents | Dropdown | Yes      | How to compose the email. Options: **Simple (no dynamic template)**, **Using dynamic template**. |         |

### Send a simple email

Send an email with a subject and a plain text or HTML body. Select **Simple (no dynamic template)** in **Mail contents**.

#### Input parameters

| Property     | Type   | Required | Description                                                                                            | Example                     |
| :----------- | :----- | :------- | :----------------------------------------------------------------------------------------------------- | :-------------------------- |
| Subject      | String | Yes      | The subject line of the email.                                                                         | `Your order has shipped`    |
| Content type | String | Yes      | The MIME type of the body: `text/plain` for plain text or `text/html` for HTML. Default: `text/plain`. | `text/html`                 |
| Body         | Text   | Yes      | The body of the email, in the format of the selected **Content type**.                                 | `Your order is on its way.` |

#### Output

On success, SendGrid accepts the email for delivery and returns the status code `202`. The connector returns the response from SendGrid:

```json
{
  "statusCode": 202,
  "body": "",
  "headers": {
    "X-Message-Id": "abc"
  }
}
```

The headers depend on the SendGrid response. To store only the status code in a process variable, set the **Result expression** to:

```feel
= {sendStatus: response.statusCode}
```

### Send an email using a dynamic template

Send an email that uses a [SendGrid dynamic template](https://sendgrid.com/solutions/email-api/dynamic-email-templates/). SendGrid uses the [Handlebars templating language](https://handlebarsjs.com/) to fill in dynamic values. Select **Using dynamic template** in **Mail contents**.

#### Input parameters

| Property      | Type   | Required | Description                                                                                                                                                          | Example              |
| :------------ | :----- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------- |
| Template ID   | String | Yes      | The ID of the dynamic template, which you can copy from the [Dynamic Transactional Templates page](https://sendgrid.com/dynamic_templates) in your SendGrid account. | `d-1234567890abcdef` |
| Template data | String | Yes      | A [FEEL context expression](/components/modeler/feel/language-guide/feel-context-expressions.md) with the values for the Handlebars placeholders of the template.    | `= {name: "Jane"}`   |

#### Output

The output is the same as for [simple emails](#send-a-simple-email): the connector returns the SendGrid response.

```json
{
  "statusCode": 202,
  "body": "",
  "headers": {
    "X-Message-Id": "abc"
  }
}
```

#### Example: weather report email

This example sends a weather report with a dynamic template.

1. Open the [Dynamic Transactional Templates page](https://sendgrid.com/dynamic_templates) in SendGrid and click **Create Template**.
2. Add a unique template name and click **Save**.
3. To start editing the new template, click **Add Version**.
4. Select an editor and click **Continue**.
5. Design your template. For more information on Handlebars, see [using Handlebars](https://docs.sendgrid.com/for-developers/sending-email/using-handlebars).

Use the following subject and body:

```text
Subject:
Your Camunda Weather Report for {{location}}
```

```text
Body:
Hi {{name}},

Thanks for using Camunda connectors to check your current weather report.
Your current weather in {{location}} is {{weather}} with {{actual-temp}}°C and feels like {{feel-temp}}°C

The Camunda Team
```

The template uses the following Handlebars placeholders:

| Placeholder       | Description                                        |
| :---------------- | :------------------------------------------------- |
| `{{name}}`        | The name of the user requesting the weather report |
| `{{location}}`    | The location used for the weather report           |
| `{{weather}}`     | The current weather condition                      |
| `{{actual-temp}}` | The measured temperature                           |
| `{{feel-temp}}`   | How the temperature feels                          |

While you edit the template, switch to **Preview** mode, choose **{} Show Test Data**, and provide test data to preview the email.

To send the email, configure the connector task:

1. Set **Mail contents** to **Using dynamic template**.
2. Copy the ID of your template and paste it in **Template ID**.
3. Provide the values in **Template data**:

```feel
= {
  name: "Jane",
  location: "Berlin",
  weather: "Clear",
  actual-temp: 30,
  feel-temp: 3
}
```

To provide dynamic content from process variables, reference them in **Template data**:

```feel
= {
  name: nameVariable,
  location: locationVariable,
  weather: weatherVariable,
  actual-temp: temperature,
  feel-temp: windChill
}
```

## Troubleshooting

<ErrorHandling />

### Request failed with a SendGrid status code

If SendGrid does not accept the email, the connector fails with a message in this format:

```text
User request failed to execute with status <status code> and error 'SendGrid returned the following errors: <messages>'
```

SendGrid returned a status code other than `202`, and the message lists the errors it reported. Check the following:

- The API key is valid and has permission to send emails.
- The sender **Email address** matches a verified [sender identity](#create-a-sender-identity).
- The **Template ID** is correct, if you use a dynamic template.

### Validation error before sending

The connector validates the input before it calls SendGrid and fails if required values are missing. Common messages:

| Message                                                                  | Cause and fix                                                                                                   |
| :----------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| `No API key provided by the reusable credential or the element template` | Neither a **SendGrid credential** nor a **SendGrid API key** is set. Select a credential or provide an API key. |
| `each attached document must contain a file name`                        | An attached document has no file name in its metadata. Provide a file name for the document.                    |

## Further resources

- [SendGrid dynamic templates](https://sendgrid.com/solutions/email-api/dynamic-email-templates/)
- [Using Handlebars in SendGrid](https://docs.sendgrid.com/for-developers/sending-email/using-handlebars)
- [Document handling](/components/document-handling/getting-started.md)
