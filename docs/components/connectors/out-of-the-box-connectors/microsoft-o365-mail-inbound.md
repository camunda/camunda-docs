---
id: microsoft-o365-mail-inbound
title: Microsoft 365 email inbound connector
sidebar_label: Microsoft 365 Email (Inbound)
description: Integrate Outlook email with Microsoft 365 in your processes.
---

import MicrosoftGraphAuth from './\_partials/\_microsoft-graph-auth.md'

The **Microsoft 365 Email Inbound connector** allows you to consume emails by monitoring [Microsoft 365](https://outlook.office.com/mail/) mailboxes and mapping them to your BPMN processes as start or intermediate events.

## Prerequisites

- A [Microsoft 365](https://outlook.office.com/mail/) mailbox to monitor.
- Sufficient access rights at [Microsoft Entra](https://entra.microsoft.com) to create a new app and set [Microsoft Graph](https://developer.microsoft.com/en-us/graph) permissions.
- Required Microsoft Graph API permissions for your application:
  - `Mail.Read` - Read emails from mailboxes.
  - `Mail.ReadWrite` - Read and modify emails (required for operations like mark as read, move, delete).

Learn more about [creating, configuring, and authorizing Microsoft Apps](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app).

:::note
Use Camunda secrets to avoid exposing your Microsoft credentials as plain text. Refer to our documentation on [managing secrets](/components/hub/organization/manage-clusters/manage-secrets.md) to learn more.
:::

## Security considerations

### Authentication security

The connector supports multiple authentication methods. For server-to-server scenarios without user interaction, **Client credentials** is recommended. For delegated (user-context) scenarios, use **Refresh token**. **Bearer token** is available but not recommended for polling connectors due to short token lifetimes.

All authentication methods provide:

- **Scoped permissions**: API permissions are explicitly granted to the application.
- **Auditable access**: All API calls are associated with the registered application.

### Restricting mailbox access with RBAC

:::warning
By default, an Azure AD application with `Mail.Read` or `Mail.ReadWrite` permissions can access _all mailboxes_ in your organization. In the OAuth 2.0 client credentials flow, the application gets access to all mailboxes it has been granted permissions for.

To restrict access to specific mailboxes, use _Role-Based Access Control (RBAC) for Applications_. Learn more about [scoping application permissions to specific Exchange Online mailboxes](https://learn.microsoft.com/en-us/graph/auth-limit-mailbox-access).
:::

## Configure the Microsoft 365 Outlook connector

To use the Microsoft 365 Email Inbound connector, you must register an application in Microsoft Entra (formerly Azure AD) and configure the required permissions.

:::note
This is a simplified guide to help you get started. For the full guide, refer to the [official Microsoft documentation](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app).
:::

### Register an application in Microsoft Entra

1. Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com).
2. Navigate to **Identity** > **Applications** > **App registrations**.
3. Click **New registration**.
4. Enter a name for your application (for example, `Camunda Email Connector`).
5. Select **Accounts in this organizational directory only** for supported account types.
6. Click **Register**.

### Configure API permissions

1. In your registered application, navigate to **API permissions**.
2. Click **Add a permission**.
3. Select **Microsoft Graph** > **Application permissions**.
4. Search for and add the following permissions:
   - `Mail.Read` - Required for reading emails.
   - `Mail.ReadWrite` - Required for operations like mark as read, move, or delete emails.
5. Click **Add permissions**.
6. Click **Grant admin consent** for your organization. This requires administrator privileges.

:::warning
The **Grant admin consent** step is critical. Without admin consent, the application cannot access mailbox data.
:::

## Authentication

Choose an authentication type in the **Authentication** section of the connector properties panel. The connector uses the [Microsoft Graph API](https://learn.microsoft.com/en-us/graph/overview) and supports the following authentication methods. Visit the [Microsoft Graph auth overview](https://learn.microsoft.com/en-us/graph/auth/) for more information.

<MicrosoftGraphAuth />

:::note Choosing an auth type for email polling

- **Client credentials** (recommended): Uses Azure SDK's automatic token renewal. Best suited for long-running polling connectors.
- **Refresh token**: The connector re-exchanges the refresh token for a fresh access token on every poll cycle, ensuring continuous access. Suitable for delegated (user-context) scenarios.
- **Bearer token**: The client is created once with the provided token. Bearer tokens are short-lived (typically 1 hour) and **not recommended for polling connectors** — the token will expire and the connector will stop working.

:::

## Create a Microsoft 365 email inbound connector event

1. Add a **Start Event** or an **Intermediate Catch Event** to your BPMN diagram.
2. Change its template to **Microsoft 365 Email Inbound**.
3. Fill in all required properties.
4. Complete your BPMN diagram.
5. Deploy the diagram to activate the email monitoring.

## Configure your Microsoft 365 email inbound connector

To make your **Microsoft 365 Email Inbound connector** executable, fill in the required properties.

### Mailbox configuration

In the **Mailbox** section, configure which mailbox and folder to monitor:

- **User ID/User Principal Name**: The email address or user principal name of the mailbox to monitor (for example, `user@company.com`).
- **Folder Identifier Type**: Select how to identify the folder to monitor:
  - **Folder ID** (default): Use a [well-known folder ID](https://learn.microsoft.com/en-us/graph/api/resources/mailfolder?view=graph-rest-1.0#properties) such as `inbox`, `drafts`, or `sentitems`, or a custom folder ID. Prefer this option when using well-known folders.
  - **Folder Name**: Use the display name of the folder. The name must be unique within the mailbox. Use this option for custom folders where you don't know the folder ID.

### Polling configuration

Configure how frequently the connector checks for new emails using the **Polling Interval** field. Specify the time between polls in ISO 8601 duration format (for example, `PT30S` for 30 seconds, `PT5M` for 5 minutes). Review [how to configure a time duration](/components/modeler/bpmn/timer-events/timer-events.md#time-duration) for details on the format.

:::tip
Choose an appropriate polling interval based on your use case. More frequent polling increases API usage but provides faster response times.
:::

### Email filtering

Optionally filter which emails trigger the process:

#### Simple filter

The simple filter provides the following options:

- **Only Unread**: When enabled (default), only unread emails (`isRead eq false`) will trigger the process. When disabled, all emails (both read and unread) will trigger the process.
- **Subject Contains** (optional): Only fetch emails where the subject contains this text (case-sensitive)
- **From Email Address** (optional): Only fetch emails from this sender address (exact match, for example, `invoice@vendor.com`)

#### Advanced filter

For more complex filtering, use the **Advanced Configuration** section to provide an [OData filter query](https://learn.microsoft.com/en-us/graph/query-parameters#filter-parameter).

:::note
OData filter queries are evaluated at deployment time and can only use static values or [Camunda secrets](/components/hub/organization/manage-clusters/manage-secrets.md). They cannot reference process variables. If you need dynamic filtering based on runtime data, use the [Activation Condition](#activation-condition) section instead.
:::

Examples of filters not supported by the simple filter:

Filter emails from a specific domain:

```
endswith(from/emailAddress/address, '@example.com') and isRead eq false
```

Filter emails whose body contains specific text:

```
contains(body/content, 'password') and isRead eq false
```

### Email processing operations

Configure what happens to emails after they trigger a process. **At least one operation must be configured.**

- **Mark as read**: Mark the email as read after processing
- **Delete**: Delete the email after processing
  - **Force delete**: Bypass the deleted items folder and permanently delete
- **Move to folder**: Move the email to a different folder after processing. Select a **Folder Identifier Type** (folder ID or folder name) and specify the destination folder.

:::warning Avoid Infinite Reprocessing Loops
Ensure your processing operation removes emails from matching your filter criteria. If emails continue to match the filter after processing, they will be reprocessed on every polling cycle, potentially creating multiple process instances for the same email.

**Examples of dangerous configurations:**

- Disabling **Only Unread** filter (fetching all emails) and only using **Mark as read** (emails remain in the monitored folder and continue matching the filter)
- Moving emails to a different folder and then having another process or rule move them back to the monitored folder (they will match the filter again)

:::

### Activation condition

**Activation condition** is an optional FEEL expression field that allows for fine-tuning of connector activation. This condition filters whether the process step triggers when an email is consumed.

For example, `=(subject = "Order Confirmation")` only triggers the start event or continues the catch event if the email subject matches exactly. Leave this field empty to trigger your process for every email that matches the filtering criteria.

:::note
The activation condition is evaluated after the email filter. Use email filters for simple conditions and activation conditions for complex FEEL-based logic.
:::

When an email matches the filter but does not meet the activation condition, the connector does not trigger and the email is not processed (not marked as read, deleted, or moved). This means the email will be fetched again on the next polling cycle. To change this behavior, enable the **Consume unmatched events** checkbox in the **Activation** section. Learn more about [consuming unmatched events](../use-connectors/inbound.md#consume-unmatched-events).

### Correlation

The **Correlation** section allows you to configure message correlation parameters.

:::note
The **Correlation** section is not applicable for the plain **start event** element template of the Microsoft 365 Email Inbound connector. Plain **start events** are triggered by process instance creation and do not rely on message correlation.
:::

#### Correlation key

- **Correlation key (process)** is a FEEL expression that defines the correlation key for the subscription. This corresponds to the **Correlation key** property of a regular **message intermediate catch event**.
- **Correlation key (payload)** is a FEEL expression used to extract the correlation key from the incoming email. This expression is evaluated in the connector runtime and the result is used to correlate the message.

For example, if your correlation key is defined with the `orderId` process variable, and the incoming email subject contains `Order #12345`, you could extract the order ID from the subject:

- **Correlation key (process)**: `=orderId`
- **Correlation key (payload)**: `=substring(subject, 7)` (extracts "12345" from "Order #12345")

:::note
To learn more about correlation keys, see [messages](../../../concepts/messages).
:::

#### Message ID expression

The **Message ID expression** is an optional field that allows you to extract the message ID from the incoming email. The message ID serves as a unique identifier and is used for message deduplication.

By default, the connector uses the email's unique identifier from Microsoft Graph. However, you can customize this if needed:

```feel
= id
```

:::note
To learn more about how message IDs influence message correlation, see [messages](../../../concepts/messages#message-correlation-overview).
:::

#### Message TTL

The **Message TTL** is an optional field that allows you to set the time-to-live (TTL) for correlated messages. TTL defines the time for which the message is buffered in Zeebe before being correlated to the process instance.

The value is specified as an ISO 8601 duration. For example, `PT1H` sets the TTL to one hour. Learn more about the TTL concept in Zeebe in the [message correlation guide](../../../concepts/messages#message-buffering).

### Deduplication

The **Deduplication** section allows you to configure connector deduplication parameters.

**Connector deduplication** is a mechanism in the connector runtime that determines how many email subscriptions are created if there are multiple occurrences of the **Microsoft 365 Email Inbound connector** in the BPMN diagram.

By default, the connector runtime deduplicates connectors based on properties, so elements with the same subscription properties only result in one subscription.

:::note
To learn more about deduplication, see [deduplication](../use-connectors/inbound.md#connector-deduplication).
:::

To customize the deduplication behavior, select the **Manual mode** checkbox and configure a custom deduplication ID.

### Output mapping

The **Microsoft 365 Email Inbound connector** returns the consumed email message with the following structure:

```json
{
  "id": "AAMkAGVmMDEzM...",
  "conversationId": "AAQkAGVmMDEzM...",
  "subject": "Invoice #12345",
  "body": "Please find attached...",
  "bodyContentType": "text/plain",
  "sender": {
    "name": "John Doe",
    "address": "john.doe@example.com"
  },
  "recipients": [
    {
      "name": "Jane Smith",
      "address": "jane.smith@company.com"
    }
  ],
  "cc": [],
  "bcc": [],
  "receivedDateTime": "2024-01-15T14:30:00Z",
  "attachments": [
    {
      "id": "AAMkAGVmMDEzM...",
      "name": "invoice.pdf",
      "contentType": "application/pdf",
      "size": 125000
    }
  ]
}
```

You can use an output mapping to map the response:

1. Use **Result variable** to store the response in a process variable. For example, `emailMessage`.
2. Use **Result expression** to map fields from the response into process variables. For example:

```feel
= {
  "emailSubject": response.subject,
  "senderEmail": response.sender.address,
  "receivedAt": response.receivedDateTime,
  "hasAttachments": count(response.attachments) > 0
}
```

## Activate the Microsoft 365 email inbound connector by deploying your diagram

When you click the **Deploy** button, your Microsoft 365 Email Inbound connector is activated and starts monitoring the specified mailbox for new emails.

The connector is a long-running connector that remains active until the process is undeployed or overwritten by a new version.

## Next steps

- Learn more about [Microsoft Graph Mail API](https://learn.microsoft.com/en-us/graph/api/resources/mail-api-overview) and its capabilities.
- Explore [configuring application permissions to specific mailboxes](https://learn.microsoft.com/en-us/graph/auth-limit-mailbox-access) for enhanced security.
- Learn about [other connectors available](./available-connectors-overview.md) in Camunda to integrate with different systems and services.
- Learn more about [using connectors](../use-connectors/index.md).
- Learn more about [inbound connectors](../use-connectors/inbound.md).

## Appendix and FAQ

### What happens if email processing fails?

If the connector fails to process an email (for example, due to Zeebe being unavailable), the email remains unprocessed and the connector will attempt to process it again on the next polling cycle.

If you configured a processing operation (mark as read, delete, move), the operation will only be executed after successful process correlation.

### Can I monitor multiple folders?

To monitor multiple folders, create separate connector instances with different folder configurations. You can reuse the same authentication credentials across multiple instances.

### How are email attachments handled?

Email attachments are automatically fetched and stored using [Camunda document handling](/components/document-handling/getting-started.md). The attachment metadata is included in the connector output (see [Output Mapping](#output-mapping)), and each attachment is available as a document reference that you can use in subsequent process steps.

For example, to pass an attachment to another connector or download it, use the document reference from the `attachments` array:

```feel
= {
  "firstAttachment": response.attachments[1],
  "allAttachments": response.attachments
}
```

Learn more about working with documents in [document handling](/components/document-handling/getting-started.md).

### What lifecycle does the Microsoft 365 Email Inbound connector have?

The Microsoft 365 Email Inbound connector is a long-running connector that is activated when the process is deployed, and deactivated when the process is undeployed or overwritten by a new version.
