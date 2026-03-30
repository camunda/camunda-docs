---
id: email-inbound
title: Email connector
sidebar_label: Email inbound
description: Connect your BPMN service to email using SMTP, POP3, or IMAP, and trigger process instances from incoming emails.
---

import InboundConnectorBasics from '../../../components/react-components/connector-inbound-basics.md'
import ErrorHandling from '../../../components/react-components/connector-error-handling.md'

The Email inbound connector allows your BPMN service to receive emails via IMAP. You can start a new process instance when an email arrives or catch email events in an ongoing process. The message start event inbound connector triggers a new process for each incoming email.

## Prerequisites

To use the **Email inbound connector**, you must have access to an IMAP server.

<InboundConnectorBasics />

## Configuration

### Authentication

Authenticate to your mail server using simple authentication:

| Property | Type   | Required | Description                                                                                     | Example               |
| -------- | ------ | -------- | ----------------------------------------------------------------------------------------------- | --------------------- |
| username | String | Yes      | Email address (for example, `user@example.com`) or the username provided by your email service. | support@my-domain.com |
| password | String | Yes      | The password for your email account. Keep it secure and do not share it.                        | KLSF65DS68E           |

### IMAP details

| Property            | Type     | Required | Description                  | Example            |
| ------------------- | -------- | -------- | ---------------------------- | ------------------ |
| IMAP host           | String   | Yes      | Hostname of the IMAP server  | imap.my-domain.com |
| IMAP port           | String   | Yes      | Port used by the IMAP server | 993                |
| Encryption protocol | Dropdown | Yes      | TLS, SSL, or none            |                    |

## Operations

### Email listener

| Parameter               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Folder`                | _(Optional)_ The folder the connector will monitor. Defaults to `INBOX`. For subfolders, use `.` or `/` separated paths (for example, `inside/folder` or `inside.folder`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `Polling wait time`     | Interval between polling operations. See [timer events](/components/modeler/bpmn/timer-events/timer-events.md#time-duration) for format details.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `Polling configuration` | Settings related to polling behavior:<br></br>**Poll all emails** – Poll every email in the folder:<br></br>- `Move to another folder after processing`: Move processed emails to a specified folder. Use `.` or `/` separated paths. Non-existent folders are created automatically.<br></br>- `Delete after processing`: Permanently delete processed emails.<br></br>**Poll unseen emails** – Poll only emails not marked as read:<br></br>- `Move to another folder after processing`: Move processed unseen emails to a folder.<br></br>- `Delete after processing`: Delete unseen emails after processing.<br></br>- `Mark as read after processing`: Mark emails as read after processing. |

## Output

The connector returns a JSON object containing email details:

- `messageId`: Unique identifier of the email message.
- `fromAddress`: Sender's email address.
- `headers`: List of email headers.
- `subject`: Email subject line.
- `size`: Email size in bytes.
- `plainTextBody`: Plain text content of the email.
- `htmlBody`: HTML content of the email, if available.
- `attachments`: List of document references.
- `receivedDateTime`: Date and time the email was received.

:::note
As of the 8.8 release, angle brackets (`<` and `>`) are preserved in `messageId`.
:::

Example JSON response:

```json
{
  "messageId": "messageId",
  "fromAddress": "example@camunda.com",
  "subject": "Urgent Test",
  "size": 65646,
  "plainTextBody": "Hey how are you?\r\n",
  "htmlBody": "<html>Hello</html>",
  "headers": [
    { "key": "header1", "value": "example" },
    { "key": "header2", "value": "test" }
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
