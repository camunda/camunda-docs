---
id: microsoft-o365-mail-inbound
title: Microsoft 365 Email Inbound connector
sidebar_label: Microsoft 365 Email (Inbound)
description: Consume emails from Microsoft 365 mailboxes and trigger BPMN processes automatically.
---

The **Microsoft 365 Email Inbound connector** allows you to consume emails by monitoring [Microsoft 365](https://outlook.office.com/mail/) mailboxes and mapping them to your BPMN processes as start or intermediate events.

## Prerequisites

- A [Microsoft 365](https://outlook.office.com/mail/) mailbox to monitor.
- Sufficient access rights at [Microsoft Entra](https://entra.microsoft.com) to create a new app and set [Microsoft Graph](https://developer.microsoft.com/en-us/graph) permissions.
- Required Microsoft Graph API permissions for your application:
  - `Mail.Read` - Read emails from mailboxes
  - `Mail.ReadWrite` - Read and modify emails (required for operations like mark as read, move, delete)

Learn more about [creating, configuring, and authorizing Microsoft App](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app).

:::note
Use Camunda secrets to avoid exposing your Microsoft credentials as plain text.
Refer to our documentation on [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.
:::

## Security considerations

### Authentication security

The connector uses **OAuth 2.0 client credentials flow** for authentication, which is the recommended approach for server-to-server communication without user interaction. This flow provides:

- **No user credentials stored**: The application authenticates using its own credentials (Client ID and Client Secret)
- **Scoped permissions**: API permissions are explicitly granted to the application
- **Auditable access**: All API calls are associated with the registered application

### Restricting mailbox access with RBAC

By default, an Azure AD application with `Mail.Read` or `Mail.ReadWrite` permissions can access **all mailboxes** in your organization. To restrict access to specific mailboxes, use **Role-Based Access Control (RBAC) for Applications**.

#### Configure application access policies

Use **RBAC for Applications** to restrict application access to specific mailboxes. This approach uses Exchange Online PowerShell to assign application roles scoped to specific mailboxes:

1. Connect to Exchange Online PowerShell:

```powershell
Connect-ExchangeOnline -Organization yourorganization.onmicrosoft.com
```

2. Create a mail-enabled security group containing the mailboxes you want to allow access to:

```powershell
New-DistributionGroup -Name "Camunda Email Access" -Type Security
Add-DistributionGroupMember -Identity "Camunda Email Access" -Member user@yourorganization.com
```

3. Assign the application permission to the security group:

```powershell
New-ManagementRoleAssignment -Role "ApplicationImpersonation" `
  -App <Your-Application-Client-ID> `
  -CustomResourceScope "Camunda Email Access"
```

Replace `<Your-Application-Client-ID>` with your Azure AD application's Client ID.

4. Verify the access policy is working:

```powershell
Test-ApplicationAccessPolicy -Identity user@yourorganization.com `
  -AppId <Your-Application-Client-ID>
```

For more information, refer to:

- [Scoping application permissions to specific Exchange Online mailboxes](https://learn.microsoft.com/en-us/graph/auth-limit-mailbox-access)
- [Exchange Online PowerShell](https://learn.microsoft.com/en-us/powershell/exchange/exchange-online-powershell)

## Configuring Microsoft 365

To use the Microsoft 365 Email Inbound connector, you must register an application in Microsoft Entra (formerly Azure AD) and configure the required permissions.

This is a simplified guide. For the full guide, refer to the [official Microsoft documentation](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app).

### Register an application in Microsoft Entra

1. Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com).
2. Navigate to **Identity** > **Applications** > **App registrations**.
3. Click **New registration**.
4. Enter a name for your application (for example, "Camunda Email Connector").
5. Select **Accounts in this organizational directory only** for supported account types.
6. Click **Register**.

### Configure API permissions

1. In your registered application, navigate to **API permissions**.
2. Click **Add a permission**.
3. Select **Microsoft Graph** > **Application permissions**.
4. Search for and add the following permissions:
   - `Mail.Read` - Required for reading emails
   - `Mail.ReadWrite` - Required for operations like mark as read, move, or delete emails
5. Click **Add permissions**.
6. Click **Grant admin consent** for your organization. This requires administrator privileges.

:::note
The **Grant admin consent** step is critical. Without admin consent, the application cannot access mailbox data.
:::

### Create client credentials

1. Navigate to **Certificates & secrets** in your application.
2. Click **New client secret**.
3. Enter a description (for example, "Camunda Connector Secret").
4. Select an expiration period. **Note:** You will need to rotate the secret before it expires.
5. Click **Add**.
6. **Copy the secret value immediately**. This value is only displayed once and cannot be retrieved later.

### Gather required credentials

You will need the following values to configure the connector:

- **Client ID**: Found on the application's **Overview** page (also called "Application ID")
- **Client Secret**: The value you copied in the previous step
- **Tenant ID**: Found on the application's **Overview** page (also called "Directory ID")

Store these values securely, preferably using [Camunda secrets](/components/console/manage-clusters/manage-secrets.md).

## Create a Microsoft 365 Email Inbound connector event

1. Add a **Start Event** or an **Intermediate Catch Event** to your BPMN diagram.
2. Change its template to **Microsoft 365 Email Inbound**.
3. Fill in all required properties.
4. Complete your BPMN diagram.
5. Deploy the diagram to activate the email monitoring.

## Configure your Microsoft 365 Email Inbound connector

To make your **Microsoft 365 Email Inbound connector** executable, fill in the required properties.

### Authentication

The connector uses **OAuth 2.0 client credentials flow** for authentication.

In the **Authentication** section, provide:

- **Tenant ID**: Your Azure AD tenant ID
- **Client ID**: The Application (client) ID from your Azure AD app registration
- **Client Secret**: The client secret value from your Azure AD app registration

:::note
In the client credential flow, the application gets access to all mailboxes it has been granted permissions for.
Ensure your app has the necessary Graph API permissions (`Mail.Read`, `Mail.ReadWrite`) configured in Azure AD.
:::

### Mailbox Configuration

In the **Mailbox** section, configure which mailbox and folder to monitor:

- **User ID/User Principal Name**: The email address or user principal name of the mailbox to monitor (e.g., `user@company.com`)
- **Folder Name/Folder ID**: Specify which folder to monitor. You can provide either:
  - **Folder name**: A well-known folder name like `inbox`, `drafts`, `sentitems`, or a custom folder name
  - **Folder ID**: The unique identifier of a specific folder
- **Specified folder ID**: A checkbox to indicate whether you provided a folder ID (checked) or folder name (unchecked). This helps prevent name collisions.

### Polling Configuration

Configure how frequently the connector checks for new emails using the **Polling Interval** field. Specify the time between polls in ISO 8601 duration format (e.g., `PT30S` for 30 seconds, `PT5M` for 5 minutes).

:::tip
Choose an appropriate polling interval based on your use case. More frequent polling increases API usage but provides faster response times.
:::

### Email Filtering

Optionally filter which emails trigger the process:

#### Simple Filter

The simple filter provides the following options:

- **Only Unread**: When enabled (default), only unread emails (`isRead eq false`) will trigger the process. When disabled, all emails (both read and unread) will trigger the process.
- **Subject Contains** (optional): Only fetch emails where the subject contains this text (case-sensitive)
- **From Email Address** (optional): Only fetch emails from this sender address (exact match, e.g., `invoice@vendor.com`)

#### Advanced Filter

For more complex filtering, use the **Advanced Configuration** section to provide an [OData filter query](https://learn.microsoft.com/en-us/graph/query-parameters#filter-parameter).

:::note
OData filter queries are evaluated at deployment time and can only use static values or [Camunda secrets](/components/console/manage-clusters/manage-secrets.md). They cannot reference process variables. If you need dynamic filtering based on runtime data, use the [Activation Condition](#activation-condition) section instead.
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

### Email Processing Operations

Configure what happens to emails after they trigger a process. **At least one operation must be configured.**

- **Mark as read**: Mark the email as read after processing
- **Delete**: Delete the email after processing
  - **Force delete**: Bypass the deleted items folder and permanently delete
- **Move to folder**: Move the email to a different folder after processing
  - **Target folder**: Specify the destination folder (name or ID)

:::warning Avoid Infinite Reprocessing Loops
Ensure your processing operation removes emails from matching your filter criteria. If emails continue to match the filter after processing, they will be reprocessed on every polling cycle, potentially creating multiple process instances for the same email.

**Examples of dangerous configurations:**

- Disabling "Only Unread" filter (fetching all emails) and only using "Mark as read" (emails remain in the monitored folder and continue matching the filter)
- Moving emails to a different folder and then having another process or rule move them back to the monitored folder (they will match the filter again)

:::

### Activation Condition

**Activation condition** is an optional FEEL expression field that allows for fine-tuning of connector activation. This condition filters whether the process step triggers when an email is consumed.

For example, `=(value.subject = "Order Confirmation")` only triggers the start event or continues the catch event if the email subject matches exactly. Leave this field empty to trigger your process for every email that matches the filtering criteria.

:::note
The activation condition is evaluated after the email filter. Use email filters for simple conditions and activation conditions for complex FEEL-based logic.
:::

### Correlation

The **Correlation** section allows you to configure message correlation parameters.

#### Correlation key

- **Correlation key (process)** is a FEEL expression that defines the correlation key for the subscription. This corresponds to the **Correlation key** property of a regular **message intermediate catch event**.
- **Correlation key (payload)** is a FEEL expression used to extract the correlation key from the incoming email. This expression is evaluated in the connector runtime and the result is used to correlate the message.

For example, if your correlation key is defined with the `orderId` process variable, and the incoming email subject contains `Order #12345`, you could extract the order ID from the subject:

- **Correlation key (process)**: `=orderId`
- **Correlation key (payload)**: `=substring(value.subject, 7)` (extracts "12345" from "Order #12345")

:::info
To learn more about correlation keys, see [messages](../../../concepts/messages).
:::

#### Message ID Expression

The **Message ID expression** is an optional field that allows you to extract the message ID from the incoming email. The message ID serves as a unique identifier and is used for message deduplication.

By default, the connector uses the email's unique identifier from Microsoft Graph. However, you can customize this if needed:

```feel
= value.id
```

:::info
To learn more about how message IDs influence message correlation, see [messages](../../../concepts/messages#message-correlation-overview).
:::

#### Message TTL

The **Message TTL** is an optional field that allows you to set the time-to-live (TTL) for correlated messages. TTL defines the time for which the message is buffered in Zeebe before being correlated to the process instance.

The value is specified as an ISO 8601 duration. For example, `PT1H` sets the TTL to one hour. Learn more about the TTL concept in Zeebe in the [message correlation guide](../../../concepts/messages#message-buffering).

### Deduplication

The **Deduplication** section allows you to configure connector deduplication parameters.

**Connector deduplication** is a mechanism in the connector runtime that determines how many email subscriptions are created if there are multiple occurrences of the **Microsoft 365 Email Inbound connector** in the BPMN diagram.

By default, the connector runtime deduplicates connectors based on properties, so elements with the same subscription properties only result in one subscription.

:::info
To learn more about deduplication, see [deduplication](../use-connectors/inbound.md#connector-deduplication).
:::

To customize the deduplication behavior, select the **Manual mode** checkbox and configure a custom deduplication ID.

### Output Mapping

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
  "emailSubject": value.subject,
  "senderEmail": value.sender.address,
  "receivedAt": value.receivedDateTime,
  "hasAttachments": count(value.attachments) > 0
}
```

## Activate the Microsoft 365 Email Inbound connector by deploying your diagram

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

Email attachments are automatically fetched and made available through the Camunda document API. The attachment metadata is included in the response (as shown in the Output Mapping section), and you can access the actual attachment content through the document ID.
