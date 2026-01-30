---
id: email-outbound
title: Email connector
sidebar_label: Email Outbound
description: The Email connector allows you to connect your BPMN service with different email protocols such as SMTP, POP3 or IMAP.
---

import OutboundConnectorBasics from '../../../components/react-components/connector-outbound-basics.md'
import ErrorHandling from '../../../components/react-components/connector-error-handling.md'

The **Email connector** is an outbound connector that allows you to connect your BPMN service with an email server to send or receive emails. It supports multiple email protocols, including SMTP for sending emails, and POP3 and IMAP for receiving and managing emails.

## Prerequisites

To use the **Email connector**, you must have an SMTP, POP3 or IMAP server available to connect to.

<OutboundConnectorBasics />

## Configuration

### Authentication

You can authenticate to a mail server as follows.

### Simple authentication

This method allows the user to connect to any SMTP, POP3 or IMAP server using an email address and password.

| Parameter  | Description                                                                                                                                                                |
| :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `username` | Enter your full email address (for example, user@example.com) or the username provided by your email service. This is used to authenticate your access to the mail server. |
| `password` | Enter the password for your email account. Keep your password secure and do not share it with others.                                                                      |

### No authentication

For SMTP servers that do not require authentication, select this option to connect without providing
credentials.

### Protocol and server settings

#### SMTP

Simple Mail Transfer Protocol (SMTP) is the standard communication protocol for sending emails across the Internet. It
facilitates mail transfer from a client's email application to the outgoing mail server and between servers for relaying
email messages to their final destination. SMTP operates on a push model, where the sending server pushes the message to
the receiving server for delivery to the appropriate mailbox.

| Field                    | Description                                                                                            |
| :----------------------- | :----------------------------------------------------------------------------------------------------- |
| `SMTP host`              | The host URL of the SMTP server.                                                                       |
| `SMTP port`              | The host port of the SMTP server.                                                                      |
| `Cryptographic protocol` | Defines how the connection to the server is secured, `TLS`, `SSL` or `None`. Default is typically TLS. |

#### POP3

The Post Office Protocol version 3 (POP3) is an Internet standard protocol used by local email clients to retrieve
emails from a remote server over a TCP/IP connection. POP3 allows users to download messages from their email server to
their local computer, where they can be read, managed, or archived even without an internet connection. It operates on a
simple download-and-delete model, meaning emails are typically removed from the server once they are retrieved.

| Field                    | Description                                                                                            |
| :----------------------- | :----------------------------------------------------------------------------------------------------- |
| `POP3 host`              | The host URL of the POP3 server.                                                                       |
| `POP3 port`              | The host port of the POP3 server.                                                                      |
| `Cryptographic protocol` | Defines how the connection to the server is secured, `TLS`, `SSL` or `None`. Default is typically TLS. |

## IMAP

The Internet Message Access Protocol (IMAP) is a protocol used by email clients to access messages stored on a mail
server, allowing users to view and manage their emails from multiple devices. Unlike POP3, IMAP supports both online and
offline modes, synchronizes email across devices, and allows manipulation of mailboxes (create, delete, and rename) as
well as messages (read, delete, or flag) directly on the server.

| Field                    | Description                                                                                            |
| :----------------------- | :----------------------------------------------------------------------------------------------------- |
| `IMAP host`              | The host URL of the IMAP server.                                                                       |
| `IMAP port`              | The host port of the IMAP server.                                                                      |
| `Cryptographic protocol` | Defines how the connection to the server is secured, `TLS`, `SSL` or `None`. Default is typically TLS. |

## Operations

### List Emails

Allow users to fetch a list of emails from the `INBOX` folder, with customizable sorting and limitation options.

#### Parameters

| Parameter            | Description                                                                                                                                                                                                                                       |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Max Emails to read` | Specify the maximum number of emails to retrieve. This parameter determines the cap on the number of emails the task will return.                                                                                                                 |
| `Sort emails by`     | <p>Choose the field by which to sort the emails. Supported sorting fields are:</p><p><ul><li>`Sent date`: Sorts emails by the date and time they were sent.</li><li>`Size`: Sorts emails by the size of the email.</li></ul></p>                  |
| `Sort order`         | <p>Define the sort order:</p><p><ul><li>`ASC`: Ascending order, from the oldest or smallest value to the most recent or largest.</li><li>`DESC`: Descending order, from the most recent or largest value to the oldest or smallest.</li></ul></p> |

#### Sorting and Limiting Behavior

Emails are initially sorted based on the specified sorting field and order. The list is then limited to the number of
emails as defined by the Max Emails to read parameter. For example, if you sort by Sent date in descending order (DESC)
with a limit of one email, the task will return the most recently sent email.

#### Output

The task returns a list of emails in JSON format. Each email object contains the following information:

- `messageId`: A unique identifier for the email message.
- `fromAddress`: The email addresses of the sender.
- `subject`: The subject line of the email.
- `size`: The size of the email (in bytes).

:::note
As of the 8.8 release, angle brackets (`<` and `>`) are no longer removed from the `messageId`.
:::

Example of a returned JSON array:

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

### Read Email

Retrieve the contents of an email, using the unique `messageId` associated with the email message.

:::danger
Reading an email using POP3 protocol will delete the email
:::

#### Parameters

| Parameter   | Description                                                                                                                                                                                                      |
| :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MessageId` | The identifier of the email message you wish to read. Provide this to locate and return the specific email.                                                                                                      |
| `Folder`    | (Optional) Specifies the folder from which the email should be retrieved. If not provided, the default folder is `INBOX`. For subfolders, use `.` or `/` separated path (ex: `inside/folder` or `inside.folder`) |

#### Response Structure

The task returns a JSON object containing detailed information about the email:

- `messageId`: The unique identifier corresponding to the email message.
- `fromAddress`: The email addresses of the sender.
- `headers` : A list containing the email's headers
- `subject`: The subject line of the email.
- `size`: The size of the email in bytes.
- `plainTextBody`: The plain text version of the email's content.
- `htmlBody`: The HTML version of the email's content (if content exists).
- `attachments`: A list of all the email's attachments, provided as a document reference.
- `receivedDateTime`: The email's reception datetime

:::note
As of the 8.8 release, angle brackets (`<` and `>`) are no longer removed from the `messageId`.
:::

:::note
Starting from version 8.7.0, the outbound email connector supports sending Camunda documents as attachments.

For example, the **Attachment** field in the properties panel may look as `=[ document1, document2]`.

See additional details and limitations in [document handling](/components/document-handling/getting-started.md).
:::

#### Output

Below is an example of the JSON response returned when a specific email is read:

```json
{
  "messageId": "MessageId",
  "fromAddress": "example@camunda.com",
  "subject": "Example Subject",
  "size": 99865,
  "plainTextBody": "Any text content",
  "htmlBody": "<html>Any Html Content</html>",
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

### Delete Email

Delete an email from a specified folder, using the email's unique `messageId`.

#### Parameters

| Parameter   | Description                                                                                                                                                                                                                                    |
| :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MessageId` | The identifier of the email message to delete.                                                                                                                                                                                                 |
| `Folder`    | (Optional) Specifies the folder from which the email should be deleted. If this parameter is not supplied, the default folder is assumed to be `INBOX`. For subfolders, use `.` or `/` separated path (ex: `inside/folder` or `inside.folder`) |

#### Output

The task provides a JSON object in the response, indicating the outcome of the deletion request:

- `deleted`: A boolean value that signifies whether the email was successfully deleted (true) or not (false).
- `messageId`: Reiterates the `messageId` of the email that was targeted for deletion.

:::note
As of the 8.8 release, angle brackets (`<` and `>`) are no longer removed from the `messageId`.
:::

The following is an example of the JSON response confirming successful email deletion:

```json
{
  "deleted": true,
  "messageId": "MessageId"
}
```

### Search Emails

Enable users to perform advanced searches within an email inbox by constructing a criteria-based query using a JSON
object. Search supports complex queries that can combine multiple conditions using logical operators.

#### Parameters

A search query is represented as a JSON object. Below is an example of a JSON object that represents a search criteria
using an AND and OR operator to combine multiple conditions:

- `Folder`: (Optional) Specifies the folder from which the email should be deleted. If this parameter is not supplied,
  the default folder is assumed to be `INBOX`. For subfolders, use `.` or `/` separated path (ex: `inside/folder` or
  `inside.folder`)
- `Criteria`: _See below_

```json
{
  "operator": "AND",
  "criteria": [
    {
      "field": "FROM",
      "value": "example@camunda.com"
    },
    {
      "operator": "OR",
      "criteria": [
        {
          "field": "SUBJECT",
          "value": "urgent"
        },
        {
          "field": "SUBJECT",
          "value": "important"
        }
      ]
    }
  ]
}
```

This example query returns emails from "example@camunda.com" with a subject containing either "urgent" or "important".

A simpler query without logical operators might look like the following example:

```json
{
  "field": "FROM",
  "value": "example@camunda.com"
}
```

Search supports the following logical operators:

- **AND**: Returns emails that match all the specified criteria.
- **OR**: Returns emails that match any of the specified criteria.

The following email fields can be used to set search criteria:

- **BODY**: The content of the email body.
- **SUBJECT**: The subject line of the email.
- **FROM**: The email address of the sender.

:::note

When using an operator such as AND or OR, you must also define a criteria array. This array contains the individual
conditions that the search will evaluate against the emails. Each condition within the criteria array is itself a JSON
object with a field and a value.

- If an operator is set, the criteria array must also be defined.
- Each criterion within the criteria array is applied to the specified field based on the value associated with it.

:::

#### Output

- `subject`: The email subject line.
- `messageId`: The identifier of the email message that was attempted to be deleted.

:::note
As of the 8.8 release, angle brackets (`<` and `>`) are no longer removed from the `messageId`.
:::

The following is an example returned response:

```json
[
  { "messageId": "MessageId", "subject": "Important" },
  { "messageId": "MessageId2", "subject": "Urgent" }
]
```

### Move Email

Enable users to transfer an email from one folder to another, streamlining inbox organization. This is only available
when using the IMAP protocol.

#### Parameters

| Parameter       | Description                                                                                                                                                                                                                                                     |
| :-------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MessageId`     | The identifier of the email that needs to be moved.                                                                                                                                                                                                             |
| `Source folder` | (Optional) The folder from which the email will be moved. If not specified, the default is INBOX. For subfolders, use `.` or `/` separated path (ex: `inside/folder` or `inside.folder`)                                                                        |
| `Target folder` | The destination folder where the email is placed. To specify a new folder or a nested hierarchy, use `.` or `/` separated path (for example, 'Archive/test' or 'Projects.2023.January'). The system automatically creates any non-existent folders in the path. |

#### Output

Upon successful completion of the move operation, the response contains a JSON object with the following details:

- `messageId`: The `messageId` of the email that was moved.
- `from`: The source folder from which the email was moved.
- `to`: The target folder to which the email has been moved.

:::note
As of the 8.8 release, angle brackets (`<` and `>`) are no longer removed from the `messageId`.
:::

The example below shows the expected JSON response after an email has been successfully moved:

```json
{
  "messageId": "<VE1P191MB1101730EEA31B2FEAB320143919A2@VE1P191MB1101.EURP191.PROD.OUTLOOK.COM>",
  "from": "INBOX",
  "to": "TEST"
}
```

### Send Email

Allow users to send an email from the connected email account. This is only available when using the SMTP protocol.

#### Parameters

| Parameter            | Description                                                                                                                                                                                                                                                                                   |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `From`               | Specify the sender's email address(es). This can be a single email address (for example, 'example@camunda.com'), a comma-separated list of addresses, or a Friendly Enough Expression Language (FEEL) expression returning a list of email addresses (for example, =["example@camunda.com"]). |
| `To`                 | Defines the email recipient(s). Similar to the `From` parameter, this can be a single email address, a comma-separated list, or a FEEL expression (for example, =["example@camunda.com"]).                                                                                                    |
| `Cc`                 | (Optional) Specify the email address(es) to include in the **Carbon Copy (CC)** field. The format is the same as the **From** and **To** fields, and can include a single address, a list, or a FEEL expression.                                                                              |
| `Bcc`                | (Optional) Specify the email address(es) to include in the **Blind Carbon Copy (BCC)** field. It follows the same format as the **CC** field and ensures that BCC recipients are not visible to other recipients.                                                                             |
| `Headers`            | Feel expression containing all the desired headers to be added to the email's headers. cf. `{ "customHeaders" : "new header value" }`                                                                                                                                                         |
| `Subject`            | The email subject line.                                                                                                                                                                                                                                                                       |
| `Content Type`       | The content type of the email.                                                                                                                                                                                                                                                                |
| `Email Text Content` | The text content of the email. This must only be provided if the `Content Type` is `PLAIN` or `HTML & PlainText`.                                                                                                                                                                             |
| `Html Text Content`  | The HTML content of the email. This must only be provided if the `Content Type` is `HTML` or `HTML & PlainText`.                                                                                                                                                                              |
| `Attachment`         | The document reference, either for a single document or as a list for multiple documents.                                                                                                                                                                                                     |

:::info
To learn more about Friendly Enough Expression Language (FEEL) expression,
see [what is FEEL?](/components/modeler/feel/what-is-feel.md).
:::

#### Output

Upon successfully sending the email, the following JSON response is returned:

- `subject`: Echoes back the subject of the sent email.
- `sent`: A boolean value indicating the success status of the email being sent (true for success, false for failure).
- `messageId`: A unique identifier for the email message.

:::note
As of the 8.8 release, angle brackets (`<` and `>`) are no longer removed from the `messageId`.
:::

The following is an example of a successful send email operation:

```json
{
  "subject": "Example Subject",
  "sent": true,
  "messageId": "<messageId>"
}
```

In this response:

- `sent: true` confirms that the email with the specified subject "Example Subject" was successfully sent.
- `sent: false` indicates the email failed to send.

## Troubleshooting

<ErrorHandling />
