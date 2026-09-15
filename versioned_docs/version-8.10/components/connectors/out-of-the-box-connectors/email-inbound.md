---
id: email-inbound
title: Email connector
sidebar_label: Email inbound
description: Connect your BPMN service to email using SMTP, POP3, or IMAP, and trigger process instances from incoming emails.
---

import InboundConnectorBasics from '../../../components/react-components/\_connector-inbound-basics.md'
import ErrorHandling from '../../../components/react-components/\_connector-error-handling.md'

The Email inbound connector allows your BPMN service to receive emails via IMAP. You can start a new process instance when an email arrives or catch email events in an ongoing process. The message start event inbound connector triggers a new process for each incoming email.

## Prerequisites

To use the **Email Inbound connector**, you must have an IMAP server available to connect to.

:::note
Use Camunda secrets to avoid exposing your sensitive data as plain text.
See [managing secrets](/components/hub/organization/manage-clusters/manage-secrets.md).
:::

<InboundConnectorBasics />

## Authentication

You can authenticate to a mail server as follows.

### Simple Authentication

This method allows the user to connect to any IMAP server using an email address and password.

#### Parameters

| Parameter  | Description                                                                                                                                                                |
| :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `username` | Enter your full email address (for example, user@example.com) or the username provided by your email service. This is used to authenticate your access to the mail server. |
| `password` | Enter the password for your email account. Keep your password secure and do not share it with others.                                                                      |

## Listener information

This inbound connector creates a new process each time a new email is received.

| Parameter               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :---------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Folder`                | <p>(Optional) Define the folder the inbound connector will monitor.</p><p><ul><li>If not specified, the default folder is set to `INBOX`.</li><li>For subfolders, use `.` or `/` separated path (for example, `inside/folder` or `inside.folder`)</li></ul></p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `Polling Wait Time`     | Set the interval between each polling operation. See [timer events](/components/modeler/bpmn/timer-events/timer-events.md#time-duration) for more information on time duration and correct format.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `Polling Configuration` | <p>This section contains settings related to the polling behavior of the connector.</p><p><ul><li><code>Poll All Emails</code>: Poll every email found in the specified folder.<ul><li><p><code>Move to Another Folder After Processing</code>: Move processed emails to a specific folder.</p><ul><li><p><code>Folder</code>: Specify the target folder to move processed emails to. To specify a new folder or a nested hierarchy, use a `.` or `/` separated path (for example, <code>Archive/test</code> or <code>Projects.2023.January</code>). Non-existent folders in the path are automatically created.</p></li></ul></li><li><p><code>Delete After Processing</code>: Permanently delete each email after processing.</p></li></ul></li></ul><ul><li>`Poll Unseen Emails`: Poll only emails not marked as read in the specified folder.<ul><li><p>`Move to Another Folder After Processing`: Move processed unseen emails to a specific folder.</p><ul><li>`Folder`: Specify the target folder to move processed unseen emails to. To specify a new folder or a nested hierarchy, use a `.` or `/` separated path (for example, <code>Archive/test</code> or <code>Projects.2023.January</code>). Non-existent folders in the path are automatically created.</li></ul></li><li><p>`Delete After Processing`: Permanently delete unseen emails from the folder after processing.</p></li><li><p>`Mark as Read After Processing`: Mark each unseen email as read after it is processed.</p></li></ul></li></ul></p> |

## Response Structure

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

#### Example Response

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

This response includes essential email details such as the `messageId`, sender addresses, subject, size, and the content
of the email both in plain text and HTML format. This information can be used by the process for various workflows, such
as prioritizing tasks, content analysis, and automated responses.

<ErrorHandling />
