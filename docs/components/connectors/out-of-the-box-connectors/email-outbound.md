---
id: email-outbound
title: Email connector
sidebar_label: Email outbound
description: Connect your BPMN service to email using SMTP, POP3, or IMAP, and send, receive, or manage emails.
---

import OutboundConnectorBasics from '../../../components/react-components/connector-outbound-basics.md'
import ErrorHandling from '../../../components/react-components/connector-error-handling.md'

The **Email outbound connector** allows your BPMN service to send and receive emails via an email server. It supports multiple email protocols, including SMTP for sending emails, and POP3 and IMAP for receiving and managing emails.

## Prerequisites

To use the **Email outbound connector**, you must have access to an SMTP, POP3, or IMAP server.

<OutboundConnectorBasics />

## Configuration

### Authentication

You can authenticate to a mail server in the following ways.

#### Simple authentication

Connect to any SMTP, POP3, or IMAP server using your email address and password.

| Parameter  | Description                                                                                          |
| ---------- | ---------------------------------------------------------------------------------------------------- |
| `username` | Full email address (for example, `user@example.com`) or the username provided by your email service. |
| `password` | Password for your email account. Keep it secure and do not share it.                                 |

#### No authentication

For SMTP servers that do not require authentication, select this option to connect without providing credentials.

### Protocol and server settings

#### SMTP

SMTP (Simple Mail Transfer Protocol) is the standard protocol for sending emails. It pushes messages from a client to the outgoing mail server and between servers to reach the recipient mailbox.

| Field                    | Description                                  |
| ------------------------ | -------------------------------------------- |
| `SMTP host`              | The hostname of the SMTP server.             |
| `SMTP port`              | The port used by the SMTP server.            |
| `Cryptographic protocol` | TLS, SSL, or None. Default is typically TLS. |

#### POP3

POP3 (Post Office Protocol v3) is used to retrieve emails from a server to a local client. Emails are typically downloaded and removed from the server.

| Field                    | Description                                  |
| ------------------------ | -------------------------------------------- |
| `POP3 host`              | The hostname of the POP3 server.             |
| `POP3 port`              | The port used by the POP3 server.            |
| `Cryptographic protocol` | TLS, SSL, or None. Default is typically TLS. |

#### IMAP

IMAP (Internet Message Access Protocol) allows clients to access and manage emails on a server, supporting multiple devices and mailbox manipulation.

| Field                    | Description                                  |
| ------------------------ | -------------------------------------------- |
| `IMAP host`              | The hostname of the IMAP server.             |
| `IMAP port`              | The port used by the IMAP server.            |
| `Cryptographic protocol` | TLS, SSL, or None. Default is typically TLS. |

## Operations

### List emails

Fetch emails from the `INBOX` folder with sorting and limit options.

#### Parameters

| Parameter            | Description                                                                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `Max emails to read` | Maximum number of emails to retrieve.                                                                                                           |
| `Sort emails by`     | <p>Choose a field to sort emails by:<br></br><ul><li>`Sent date`: Sort by sent date and time.</li><li>`Size`: Sort by email size.</li></ul></p> |
| `Sort order`         | <p>Define sort order:<br></br><ul><li>`ASC`: Oldest or smallest first.</li><li>`DESC`: Most recent or largest first.</li></ul></p>              |

#### Behavior

Emails are sorted by the chosen field and order, then limited to `Max emails to read`.

#### Output

Returns a JSON array of emails:

- `messageId`: Unique identifier.
- `fromAddress`: Sender's email address.
- `subject`: Email subject line.
- `size`: Email size in bytes.

:::note
As of the 8.8 release, angle brackets (`<` and `>`) are preserved in `messageId`.
:::

Example:

```json
[
  {
    "messageId": "RandomId",
    "fromAddress": "msa@communication.microsoft.com",
    "subject": "Example",
    "size": 99865
  },
  {
    "messageId": "RandomId2",
    "fromAddress": "example@camunda.com",
    "subject": "Example",
    "size": 48547
  }
]
```

### Read email

Retrieve the contents of an email using `messageId`.

:::danger
Reading an email via POP3 will delete it.
:::

#### Parameters

| Parameter   | Description                                                                           |
| ----------- | ------------------------------------------------------------------------------------- |
| `MessageId` | Identifier of the email to read.                                                      |
| `Folder`    | _(Optional)_ Folder to read from. Defaults to `INBOX`. Use `.` or `/` for subfolders. |

#### Response

Returns a JSON object with detailed email information:

- `messageId`: Unique identifier of the email.
- `fromAddress`: Sender's email addresses.
- `headers`: List of email headers.
- `subject`: Email subject.
- `size`: Email size in bytes.
- `plainTextBody`: Plain text content of the email.
- `htmlBody`: HTML content, if available.
- `attachments`: List of document references.
- `receivedDateTime`: Date and time the email was received.

:::note
As of the 8.8 release, angle brackets (`<` and `>`) are preserved in `messageId`.
:::

:::note
Starting with version 8.7, the outbound email connector supports sending Camunda documents as attachments.  
See [document handling](/components/document-handling/getting-started.md) for details.
:::

Example response:

```json
{
  "messageId": "MessageId",
  "fromAddress": "example@camunda.com",
  "subject": "Example Subject",
  "size": 99865,
  "plainTextBody": "Any text content",
  "htmlBody": "<html>Any Html Content</html>",
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

### Delete email

Delete an email by `messageId`.

#### Parameters

| Parameter   | Description                                                                             |
| ----------- | --------------------------------------------------------------------------------------- |
| `MessageId` | Identifier of the email to delete.                                                      |
| `Folder`    | _(Optional)_ Folder to delete from. Defaults to `INBOX`. Use `.` or `/` for subfolders. |

#### Output

Returns a JSON object indicating the deletion result:

- `deleted`: Boolean indicating whether the email was successfully deleted.
- `messageId`: The identifier of the deleted email.

Example response:

```json
{
  "deleted": true,
  "messageId": "MessageId"
}
```

### Search emails

Perform advanced searches in an email inbox using a criteria-based JSON object. Supports combining multiple conditions with logical operators.

#### Parameters

| Parameter  | Description                                                                        |
| ---------- | ---------------------------------------------------------------------------------- |
| `Folder`   | _(Optional)_ Folder to search. Defaults to `INBOX`. Use `.` or `/` for subfolders. |
| `Criteria` | JSON object defining the search conditions.                                        |

Example complex search query:

```json
{
  "operator": "AND",
  "criteria": [
    { "field": "FROM", "value": "example@camunda.com" },
    {
      "operator": "OR",
      "criteria": [
        { "field": "SUBJECT", "value": "urgent" },
        { "field": "SUBJECT", "value": "important" }
      ]
    }
  ]
}
```

This query returns emails from `example@camunda.com` with subjects containing either "urgent" or "important".

Simpler query without logical operators:

```json
{
  "field": "FROM",
  "value": "example@camunda.com"
}
```

### Supported logical operators

- **AND**: Returns emails that match all specified criteria.
- **OR**: Returns emails that match any of the specified criteria.

### Supported fields for search

- **BODY**: Content of the email body.
- **SUBJECT**: Subject line of the email.
- **FROM**: Sender’s email address.

:::note
When using **AND** or **OR**, a criteria array must be defined. Each criterion is a JSON object with `field` and `value`.
:::

### Output

The search returns a JSON array of matching emails. Each object includes:

- `messageId`: Identifier of the email message.
- `subject`: Subject of the email.

Example response:

```json
[
  { "messageId": "MessageId", "subject": "Important" },
  { "messageId": "MessageId2", "subject": "Urgent" }
]
```

### Move email

Move an email from one folder to another using IMAP.

#### Parameters

| Parameter       | Description                                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------------ |
| `MessageId`     | Identifier of the email to move.                                                                       |
| `Source folder` | _(Optional)_ Folder to move from. Defaults to `INBOX`. Use `.` or `/` for subfolders.                  |
| `Target folder` | Destination folder. Use `.` or `/` for nested folders. Non-existent folders are created automatically. |

#### Output

Returns a JSON object with move details:

- `messageId`: Identifier of the moved email.
- `from`: Source folder.
- `to`: Target folder.

Example response:

```json
{
  "messageId": "<VE1P191MB1101730EEA31B2FEAB320143919A2@VE1P191MB1101.EURP191.PROD.OUTLOOK.COM>",
  "from": "INBOX",
  "to": "TEST"
}
```

### Send email

Send an email using SMTP.

#### Parameters

| Parameter            | Description                                                            |
| -------------------- | ---------------------------------------------------------------------- |
| `From`               | Sender email(s). Can be single, comma-separated, or a FEEL expression. |
| `To`                 | Recipient email(s). Same format as `From`.                             |
| `Cc`                 | _(Optional)_ CC recipients.                                            |
| `Bcc`                | _(Optional)_ BCC recipients.                                           |
| `Headers`            | FEEL expression for custom headers.                                    |
| `Subject`            | Email subject line.                                                    |
| `Content Type`       | Email content type.                                                    |
| `Email Text Content` | Plain text content (required for `PLAIN` or `HTML & PlainText`).       |
| `Html Text Content`  | HTML content (required for `HTML` or `HTML & PlainText`).              |
| `Attachment`         | Single or list of document references.                                 |

:::info
See [what is FEEL?](/components/modeler/feel/what-is-feel.md) for more information on FEEL expressions.
:::

#### Output

Returns a JSON object with email sending status:

- `subject`: Subject of the sent email.
- `sent`: Boolean indicating success (`true`) or failure (`false`).
- `messageId`: Unique identifier for the email.

Example response:

```json id="send-email-example"
{
  "subject": "Example Subject",
  "sent": true,
  "messageId": "<messageId>"
}
```

## Troubleshooting

<ErrorHandling />
