---
id: sendgrid
title: SendGrid Connector
sidebar_label: SendGrid
description: Quickly send emails from your BPMN processes.
---

The **SendGrid Connector** is an outbound Connector that allows you to quickly send emails from your BPMN processes.

## Prerequisites

To use the SendGrid Connector, a SendGrid API key is needed. Follow [these steps](#appendix) if you do not have a SendGrid account or API key [secret configured](#create-a-new-connector-secret) in your cluster.

## SendGrid Connector

The SendGrid Connector comes with two options:

1. **SendGrid Email Connector** allows sending simple emails (i.e. text/plain, text/html).
2. **SendGrid Email Template Connector** supports [SendGrid Dynamic Templates](https://sendgrid.com/solutions/email-api/dynamic-email-templates/).

### SendGrid Email Connector

#### Create a SendGrid Email Connector Task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

#### Make your SendGrid Email Connector executable

To make the **SendGrid Email Connector** executable, you need to fill out all the mandatory fields highlighted in red in the properties panel on the right side of the screen:

1. Set **SendGrid API Key** to `{{secrets.SEND_GRID_API_KEY}}`.
2. Set **Sender Name** to `Jane Doe` (or the [sender identity](#create-a-sender-identity) you configured above).
3. Set **Sender Email** to `jane-doe@camunda.com` (or the [sender identity](#create-a-sender-identity) you configured above).
4. Set **Receiver Name** to `Your Name`.
5. Set **Receiver Email** to `Your email address`.
6. Set **Email Content Subject**.
7. Leave **Content Type** to **text/plain** (or alternatively to **text/html** if you intend to provide an HTML body to your email).
8. Provide a text (or HTML) **Body** for your email.
9. **Attachments** is a list of camunda documents to include as part of your **new email**.
   - To work with documents you must upload them first, [using the REST API](/apis-tools/camunda-api-rest/specifications/create-document.api.mdx) for example.
   - The result of the endpoint must then be assigned to a variable in **Start Process Instance** so you can use the list of these variables in the **Attachments** field.

### SendGrid Email Template Connector

Send an email via SendGrid Dynamic Template and use the [Handlebars templating language](https://handlebarsjs.com/) to pass dynamic values to your Connector.

#### Configure a Dynamic Template

1. Open the [Dynamic Transactional Templates page](https://sendgrid.com/dynamic_templates) and click **Create Template**.
2. Add a unique template name and click **Save**.
3. To begin editing your new template, click **Add Version**.
4. Select an editor and click **Continue**.
5. Design your template. Find more information on using Handlebars [here](https://docs.sendgrid.com/for-developers/sending-email/using-handlebars).

In our example template, we will use the following subject and body:

```text
Subject:
Your Camunda Weather Report for {{location}}
```

```text
Body:
Hi {{name}},

Thanks for using Camunda Connectors to check your current weather report.
Your current weather in Berlin is {{weather}} with {{actual-temp}}°C and feels like {{feel-temp}}°C

The Camunda Team
```

In our example template, we will use the following Handlebars:

`{{name}}` - The name of the user requesting the weather report

`{{location}}` - The location used for the weather report

`{{weather}}` - The current weather condition

`{{actual-temp}}` - The measured temperature

`{{feel-temp}}` - How the temperature feels like in reality

While you are editing your template, you can test how your email would look by switching to **Preview** mode, choosing **{} Show Test Data**, and then providing the necessary data.

#### Create a SendGrid Email template Connector task

See [create a SendGrid email Connector task](#create-a-sendgrid-email-connector-task) for additional details.

#### Make your SendGrid Email Template Connector executable

To make the **SendGrid Email Template Connector** executable, fill out all the mandatory fields highlighted in red in the properties panel:

1. Set **SendGrid API Key** to `{{secrets.SEND_GRID_API_KEY}}`.
2. Set **Sender Name** to `Jane Doe` (or the [sender identity](#create-a-sender-identity) you configured above).
3. Set **Sender Email** to `jane-doe@camunda.com` (or the [sender identity](#create-a-sender-identity) you configured above).
4. Set **Receiver Name** to `Your Name`.
5. Set **Receiver Email** to `Your email address`.
6. Log in to your SendGrid account and navigate to [the Dynamic Template you created](#configure-a-dynamic-template).
7. Copy the ID of the template and paste it in the **Template ID field**.
8. Provide the test data in the **Template Data** field as a [FEEL context expression](/components/modeler/feel/language-guide/feel-context-expressions.md):
9. **Attachments** is a list of camunda documents to include as part of your **new email**.
   - To work with documents you must upload them first, [using the REST API](/apis-tools/camunda-api-rest/specifications/create-document.api.mdx) for example.
   - The result of the endpoint must then be assigned to a variable in **Start Process Instance** so you can use the list of these variables in the **Attachments** field.

```text
= {
  name: "Jane",
  location: "Berlin",
  weather: "Clear",
  actual-temp: 30,
  feel-temp: 3
}
```

If you want to provide dynamic content in the email via process variables, you can set them in the **Template Data** field as well:

```text
= {
  name: nameVariable,
  location: locationVariable,
  weather: weatherVariable,
  actual-temp: temerature,
  feel-temp: windChill
}
```

## Appendix

### Create a SendGrid account

To use the **SendGrid Connector**, create a free account in SendGrid if you do not have one yet:

1. Go to [https://signup.sendgrid.com/](https://signup.sendgrid.com/).
2. Set up the account with your email and choose a password.
3. Click **Create Account**.
4. Provide further information required by SendGrid.
5. Click **Get Started**.

### Create a sender identity

Before sending your first email, you'll need to create a sender identity and verify it.

1. Click **Settings > Sender Authentication** or click [here](https://app.sendgrid.com/settings/sender_auth).
2. Choose **Verify a Single Sender** for demo purposes (or alternatively **Authenticate Your Domain** for a production setup.)
3. Provide the details requested by SendGrid in the form and click **Create**.
4. Go to your email inbox and open the email sent to you by SendGrid.
5. Click **Verify Single Sender**.

### Create an API key

To create an API key in SendGrid, take the following steps:

1. Log in to your new account.
2. Go to **Settings**.
3. Click **API Keys > Create API Key**.
4. Give your key a name (i.e. `my-camunda-connector-key`).
5. Click **Create Key**.
6. Copy the **API Key** and move on to the next step for creating a Connector secret.

### Create a new Connector secret

We advise you to keep your API key safe and avoid exposing it in the BPMN `xml` file by creating a secret:

1. Follow our [guide for creating secrets](/components/console/manage-clusters/manage-secrets.md).
2. Name your secret `SEND_GRID_API_KEY` so you can reference it later in the Connector.
