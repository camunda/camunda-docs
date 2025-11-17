---
id: email-inbound
title: Email connector
sidebar_label: Email Inbound
description: The Email connector allows you to connect your BPMN service with different email protocols such as SMTP, POP3 or IMAP.
---

import InboundConnectorBasics from '../../../components/react-components/connector-inbound-basics.md'
import ErrorHandling from '../../../components/react-components/connector-error-handling.md'

The Email Inbound connector is an inbound connector that allows you to connect your BPMN service with any email IMAP. You can start a process instance when a new email is received or catch email events in an ongoing process. The message start event inbound connector creates a new process each time a new email is received.

## Prerequisites

To use the **Email Inbound connector**, you must have an IMAP server available to connect to.

<InboundConnectorBasics />

## Configuration

### Authentication

You can authenticate to a mail server as follows with simple authentication.

| Property | Type   | Required | Description                                                                                                                                                |                       | Example |
| -------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------- |
| username | String | Yes      | Email address (for example, user@example.com) or the username provided by your email service. This is used to authenticate your access to the mail server. | support@my-domain.com |
| password | String | Yes      | The password for your email account. Keep your password secure and do not share it with others.                                                            | KLSF65DS68E           |         |

### IMAP Details

| Property            | Type     | Required | Description               | Example            |     |
| ------------------- | -------- | -------- | ------------------------- | ------------------ | --- |
| IMAP host           | String   | Yes      | The imap host url         | imap.my-domain.com |
| IMAP port           | String   | Yes      | The port of the imap host | 993                |     |
| Encryption protocol | Dropdown | Yes      | TLS, SSL or none          |                    |     |

## Operations

### Email Listener

| Parameter               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :---------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Folder`                | <p>(Optional) Define the folder the inbound connector will monitor.</p><p><ul><li>If not specified, the default folder is set to `INBOX`.</li><li>For subfolders, use `.` or `/` separated path (for example, `inside/folder` or `inside.folder`)</li></ul></p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `Polling Wait Time`     | Set the interval between each polling operation. See [timer events](/components/modeler/bpmn/timer-events/timer-events.md#time-duration) for more information on time duration and correct format.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `Polling Configuration` | <p>This section contains settings related to the polling behavior of the connector.</p><p><ul><li><code>Poll All Emails</code>: Poll every email found in the specified folder.<ul><li><p><code>Move to Another Folder After Processing</code>: Move processed emails to a specific folder.</p><ul><li><p><code>Folder</code>: Specify the target folder to move processed emails to. To specify a new folder or a nested hierarchy, use a `.` or `/` separated path (for example, <code>Archive/test</code> or <code>Projects.2023.January</code>). Non-existent folders in the path are automatically created.</p></li></ul></li><li><p><code>Delete After Processing</code>: Permanently delete each email after processing.</p></li></ul></li></ul><ul><li>`Poll Unseen Emails`: Poll only emails not marked as read in the specified folder.<ul><li><p>`Move to Another Folder After Processing`: Move processed unseen emails to a specific folder.</p><ul><li>`Folder`: Specify the target folder to move processed unseen emails to. To specify a new folder or a nested hierarchy, use a `.` or `/` separated path (for example, <code>Archive/test</code> or <code>Projects.2023.January</code>). Non-existent folders in the path are automatically created.</li></ul></li><li><p>`Delete After Processing`: Permanently delete unseen emails from the folder after processing.</p></li><li><p>`Mark as Read After Processing`: Mark each unseen email as read after it is processed.</p></li></ul></li></ul></p> |

## Output

The task returns a JSON object containing detailed information about the email:

- `messageId`: The unique identifier of the email message.
- `fromAddress`: The email addresses of the sender.
- `headers` : A list of the email headers.
- `subject`: The subject line of the email.
- `size`: The size of the email (in bytes).
- `plainTextBody`: The plain text version of the email content.
- `htmlBody`: The HTML version of the email content, if it exists.
- `attachments` A list of document reference
- `receivedDateTime`: The date and time the email was received.

:::note
As of the 8.8 release, angle brackets (`<` and `>`) are no longer removed from the `messageId`.
:::

The following example JSON response shows the data structure produced when an email triggers the creation of a process
instance:

```json
{
  "messageId": "messageId",
  "fromAddress": "example@camunda.com",
  "subject": "Urgent Test",
  "size": 65646,
  "plainTextBody": "Hey how are you?\r\n",
  "htmlBody": "<html>Hello</html>",
  "headers": [
    {
      "key": "header1",
      "value": "example"
    },
    {
      "key": "header2",
      "value": "test"
    }
  ],
  "attachments": [
    {
      "storeId": "in-memory",
      "documentId": "20f1fd6a-d8ea-403b-813c-e281c1193495",
      "metadata": {
        "contentType": "image/webp; name=305a4816-b3df-4724-acd3-010478a54add.webp",
        "size": 311032,
        "fileName": "305a4816-b3df-4724-acd3-010478a54add.webp"
      },
      "documentType": "camunda"
    }
  ],
  "receivedDateTime": "2024-08-19T06:54:28Z"
}
```

## Troubleshooting

<ErrorHandling />
