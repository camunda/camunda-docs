---
id: whatsapp
title: WhatsApp Connector
sidebar_label: WhatsApp
description: Send messages with [WhatsApp Business](https://business.whatsapp.com/) from your BPMN process.
---

The **WhatsApp Connector** is an outbound Connector that allows you to send messages to users from your BPMN process.

## Prerequisites

To start using the **WhatsApp Connector**, you must have an approved Meta WhatsApp application; follow the [official guide](https://developers.facebook.com/docs/whatsapp/cloud-api/get-started) to obtain one.

:::note
WhatsApp webhooks are currently not supported by Camunda.
:::

## Create a WhatsApp Connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Authentication

The **WhatsApp Connector** supports authentication through Meta access tokens. Take a look at [this blog post](https://developers.facebook.com/blog/post/2022/12/05/auth-tokens/) to learn more on how to obtain one for yourself.

Once the token is obtained, put it in the **Access token** field of the **Authentication** section.

:::note
Use Camunda secrets to avoid exposing your WhatsApp access token credentials as plain text.
See our documentation on [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.
:::

## Sender and recipient

Your WhatsApp application can have multiple phone numbers registered. Set your phone number ID in the **Sender phone number ID** field
of the **Payload** section. You can find the phone number ID at the Meta developer portal.

In the **Recipient phone number** field, enter a phone number you wish to send message to.

## Select operation to execute

You can select one of the following operations from the **Message type** dropdown.

### Plain text

When this option is selected, write any arbitrary text in the **Message text** field. This message will be sent to the target recipient.

### Message template

When this option is selected, it is implied that you already have an approved WhatsApp message template.
Read more bout message templates at the [official page](https://developers.facebook.com/docs/whatsapp/message-templates/guidelines/).

1. In the field **Template name**, set the name of your WhatsApp template. For example, **my_delivery_scheduled_template**.
2. In the field **Template language code**, specify the language code of your template. For example, **en_US**.
3. In the field **Header variables**, set the values for your variables only if the header has any. For example, `{"type": "text","text": "My header param"}`.
4. In the field **Body variables**, set the values for your variables only if the body has any. For example, `{"type": "text","text": "My body param"}`.

See the [official Meta guide](https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-message-templates/) for more information and examples.

## Handle Connector response

The **WhatsApp Connector** is a protocol Connector, meaning it is built on top of the **HTTP REST Connector**. Therefore,
handling response is still applicable [as described](/components/connectors/protocol/rest.md#response).
