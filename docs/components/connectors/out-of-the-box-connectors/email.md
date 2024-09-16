---
id: email
title: Email Connector
sidebar_label: Email Connector
description: The Email Connector allows you to connect your BPMN service with different email protocol.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<Tabs groupId="email" defaultValue="outbound" queryString
values={[{label: 'Email Outbound Connector', value: 'outbound' }, {label: 'Email Inbound Connector', value: 'inbound' }]}>

<TabItem value='outbound'>

The **Email Connector** is an outbound Connector that allows you to connect your BPMN service with any email POP3, IMAP
or SMTP server.

# Prerequisites

To use the **Email Connector**, you need to have an SMTP, POP3 or IMAP server available.
Use Camunda secrets to avoid exposing your sensitive data as plain text. Follow our documentation
on [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.

# Authentication

As of now, there is two different ways to authenticate to a mail server.

## Simple Authentication

It allows the user to connect to any SMTP, POP3 or IMAP server using the email address and the associated password.

# POP3

The Post Office Protocol version 3 (POP3) is an Internet standard protocol used by local email clients to retrieve
emails from a remote server over a TCP/IP connection. POP3 allows users to download messages from their email server to
their local computer, where they can be read, managed, or archived even without an internet connection. It operates on a
simple download-and-delete model, meaning emails are typically removed from the server once they are retrieved.

- `POP3 host`: the host url of the POP3 server.
- `POP3 port`: the host port of the POP3 server.
- `Cryptographic protocol`: It defines how the connection to the server should be secured, TLS, SSL or None. Default is
  typically TLS.

## List Emails

### Parameters

This feature allows users to fetch a list of emails from the `INBOX` folder with customizable sorting and limitation
options.

- `Max Emails to read`: Specify the maximum number of emails to retrieve. This parameter determines the cap on the
  number
  of emails the task will return.
- `Sort emails by`: Choose the field by which to sort the emails. The currently supported sorting fields are:
    - `Sent date`: Sorts emails by the date and time they were sent.
    - `Size`: Sorts emails by the size of the email.
- `Sort order`: Define the sort order using either:
    - `ASC`: Ascending order, from the oldest or smallest value to the most recent or largest.
    - `DESC`: Descending order, from the most recent or largest value to the oldest or smallest.

### Sorting and Limiting Behavior

Emails are initially sorted based on the specified sorting field and order. The list is then limited to the number of
emails as defined by the Max Emails to read parameter. For example, if you sort by Sent date in descending order (DESC)
with a limit of one email, the task will return the most recently sent email.

### Response Structure

The task returns a list of emails in JSON format. Each email object contains the following information:

- `messageId`: A unique identifier for the email message.
- `fromAddresses`: An array of email addresses representing the senders.
- `subject`: The subject line of the email.
- `size`: The size of the email in bytes.

### Example Response

Example of a returned JSON array:

```json
[
  {
    "messageId":"RandomId",
    "fromAddresses":["msa@communication.microsoft.com"],
    "subject":"Example",
    "size":99865
  }, {
    "messageId":"RandomId2",
    "fromAddresses":["example@camunda.com"],
    "subject":"Example",
    "size":48547
  }
]

```

## Read Email

This functionality retrieves the contents of an email by using the unique `messageId` associated with the email message.

### Parameters

- `MessageId`: This is the identifier of the email message you wish to read. It should be provided to locate and return
  the specific email.
- `Delete after reading`: This is a boolean parameter. If set to true, the email will be deleted from the server after
  it has been read. If false or not set, the email will remain on the server.

### Response Structure

Upon successful execution of the task, the response will be a JSON object containing detailed information about the
email:

- `messageId`: The unique identifier of the email message.
- `fromAddresses`: An array containing the email addresses of the senders.
- `subject`: The subject line of the email.
- `size`: The size of the email in bytes.
- `plainTextBody`: The plain text version of the email body.
- `htmlBody`: The HTML version of the email body, if available.

### Example Response

Below is an example of the JSON response returned when a specific email is read:

```json
{
  "messageId":"MessageId",
  "fromAddresses":[
    "example@camunda.com"
  ],
  "subject":"Example Subject",
  "size":99865,
  "plainTextBody":"Any text content",
  "htmlBody":"<html>Any Html Content</html>"
}
```

## Delete Email

This operation facilitates the removal of an email from the server using the specific `messageId` assigned to the email
message.

### Parameters

- `MessageId`: The unique identifier of the email message that needs to be deleted.

### Response Structure

After the deletion task is performed, a JSON object is returned to confirm the action:

- `deleted`: A boolean value that indicates whether the deletion was successful (true) or not (false).
- `messageId`: The identifier of the email message that was attempted to be deleted.

### Example Response

The following JSON response exemplifies the result of a successful deletion request:

```json

{
  "deleted":true,
  "messageId":"MessageId"
}
```

## Search Emails

This feature enables users to perform advanced searches within an email inbox by constructing a criteria-based query
using a JSON object. The search functionality supports complex queries that can combine multiple conditions using
logical operators.

### Parameters

A search query is represented as a JSON object. Below is an example of a JSON object that represents a search criteria
using an AND and OR operator to combine multiple conditions:

```json
{
  "operator":"AND",
  "criteria":[
    {
      "field":"FROM",
      "value":"example@camunda.com"
    },
    {
      "operator":"OR",
      "criteria":[
        {
          "field":"SUBJECT",
          "value":"urgent"
        },
        {
          "field":"SUBJECT",
          "value":"important"
        }
      ]
    }
  ]
}
```

The above query will return emails that are from "example@camunda.com" and have a subject containing either "urgent"
or "important".

A simpler query without logical operators may look like this:

```json
{
  "field":"FROM",
  "value":"example@camunda.com"
}
```

The search functionality currently supports the following logical operators:

- **AND**: Returns emails that match all the specified criteria.
- **OR**: Returns emails that match any of the specified criteria.

The following email fields can be used to set search criteria:

- **BODY**: The content of the email body.
- **SUBJECT**: The subject line of the email.
- **FROM**: The email address of the sender.

When using an operator such as AND or OR, you must also define a criteria array. This array contains the individual
conditions that the search will evaluate against the emails. Each condition within the criteria array is itself a JSON
object with a field and a value.

#### Notes

- If an operator is set, the criteria array must also be defined.
- Each criterion within the criteria array is applied to the specified field based on the value associated with it.

### Example Response

Returned Response:

```json
[
  {"messageId":"MessageId", "subject":"Important"},
  {"messageId":"MessageId2", "subject":"Urgent"}
]
```

# SMTP

Simple Mail Transfer Protocol (SMTP) is the standard communication protocol for sending emails across the Internet. It
facilitates mail transfer from a client's email application to the outgoing mail server and between servers for relaying
email messages to their final destination. SMTP operates on a push model, where the sending server pushes the message to
the receiving server for delivery to the appropriate mailbox.

- `SMTP host`: the host url of the SMTP server.
- `SMTP port`: the host port of the SMTP server.
- `Cryptographic protocol`: It defines how the connection to the server should be secured, TLS, SSL or None. Default is
  typically TLS.

## Send Email

This task enables users to send an email from the connected email account.

### Parameters

- `From`: Specifies the sender's email address(es). This can be a single email address (e.g., 'example@camunda.com'), a
  comma-separated list of addresses, or a Friendly Enough Expression Language (FEEL) expression returning a list of
  email addresses (e.g., =["example@camunda.com"]).
- `To`: Defines the recipient(s) of the email. Similar to the From parameter, this can be a single email address, a
  comma-separated list, or a FEEL expression (e.g., =["example@camunda.com"]).
- `Cc`: (Optional) Indicates the email address(es) to be included in the Carbon Copy field. The format is the same as
  the From and TO fields and can include a single address, a list, or a FEEL expression.
- `Bcc`: (Optional) Denotes the email address(es) for Blind Carbon Copy. It follows the same format as the CC field and
  ensures that BCC recipients are not visible to other recipients.
- `Subject`: The subject line of the email.
- `Email` Content: The main content of the email.

### Response Structure

Upon successfully sending the email, the following JSON response is returned:

- `subject`: Echoes back the subject of the sent email.
- `sent`: A boolean value indicating the success status of the email being sent (true for success, false for failure).

### Example Response

Here's an example of a successful email-sending operation:

```json
{
  "subject":"Example Subject",
  "sent":true
}
```

In this response, `sent: true` confirms that the email with the specified subject "Example Subject" has been
successfully dispatched. If the email fails to send, "sent" would be false

# IMAP

The Internet Message Access Protocol (IMAP) is a protocol used by email clients to access messages stored on a mail
server, allowing users to view and manage their emails from multiple devices. Unlike POP3, IMAP supports both online and
offline modes, synchronizes email across devices, and allows manipulation of mailboxes (create, delete, and rename) as
well as messages (read, delete, or flag) directly on the server.

## List Emails

This feature allows users to fetch a list of emails from a given with customizable sorting and limitation
options.

### Parameters

- `Max Emails to read`: Specify the maximum number of emails to retrieve. This parameter determines the cap on the
  number
  of emails the task will return.
- `Sort emails by`: Choose the field by which to sort the emails. The currently supported sorting fields are:
    - `Sent date`: Sorts emails by the date and time they were sent.
    - `Size`: Sorts emails by the size of the email.
- `Sort order`: Define the sort order using either:
    - `ASC`: Ascending order, from the oldest or smallest value to the most recent or largest.
    - `DESC`: Descending order, from the most recent or largest value to the oldest or smallest.
- `Folder`: (Optional) the folder to list emails from, default is `INBOX`.

### Sorting and Limiting Behavior

Emails are initially sorted based on the specified sorting field and order. The list is then limited to the number of
emails as defined by the Max Emails to read parameter. For example, if you sort by Sent date in descending order (DESC)
with a limit of one email, the task will return the most recently sent email.

### Response Structure

The task returns a list of emails in JSON format. Each email object contains the following information:

- `messageId`: A unique identifier for the email message.
- `fromAddresses`: An array of email addresses representing the senders.
- `subject`: The subject line of the email.
- `size`: The size of the email in bytes.

### Example Response

Example of a returned JSON array:

```json
[
  {
    "messageId":"RandomId",
    "fromAddresses":["msa@communication.microsoft.com"],
    "subject":"Example",
    "size":99865
  }, {
    "messageId":"RandomId2",
    "fromAddresses":["example@camunda.com"],
    "subject":"Example",
    "size":48547
  }
]

```

## Read Email

This task is designed to retrieve an email's details based on the provided `messageId`.

### Parameters

- `MessageId`: This parameter requires the unique identifier of the email that needs to be read.
- `Folder`: (Optional) Specifies the folder from which the email should be retrieved. If not provided, the default
  folder is `INBOX`.

### Response Structure

The task returns a JSON object with detailed information about the email:

- `messageId`: The unique identifier corresponding to the email message.
- `fromAddresses`: An array containing the email addresses of the sender(s).
- `subject`: The subject line of the email.
- `size`: The size of the email in bytes.
- `plainTextBody`: The plain text version of the email's content.
- `htmlBody`: The HTML version of the email's content, provided it exists.

### Example Response

The following JSON structure illustrates the expected response after a successful email retrieval:

```json
{
  "messageId":"MessageId",
  "fromAddresses":[
    "example@camunda.com"
  ],
  "subject":"Example Subject",
  "size":99865,
  "plainTextBody":"Any text content",
  "htmlBody":"<html>Any Html Content</html>"
}
```

## Delete Email

This task facilitates the deletion of an email from a specified folder using the email's unique `messageId`.

### Parameters

- `MessageId`: The identifier of the email message to be deleted.
- `Folder`: (Optional) Specifies the folder from which the email should be deleted. If this parameter is not supplied,
  the default folder is assumed to be `INBOX`.

### Response Structure

The task provides a JSON object in the response, indicating the outcome of the deletion request:

- `deleted`: A boolean value that signifies whether the email was successfully deleted (true) or not (false).
- `messageId`: Reiterates the messageId of the email that was targeted for deletion.

### Example Response

Here is an example of the JSON response that confirms the successful deletion of an email:

```json

{
  "deleted":true,
  "messageId":"MessageId"
}
```

## Search Emails

This feature enables users to perform advanced searches within an email inbox by constructing a criteria-based query
using a JSON object. The search functionality supports complex queries that can combine multiple conditions using
logical operators.

### Parameters

A search query is represented as a JSON object. Below is an example of a JSON object that represents a search criteria
using an AND and OR operator to combine multiple conditions:

- `Folder`: (Optional) Specifies the folder from which the email should be deleted. If this parameter is not supplied,
  the default folder is assumed to be `INBOX`.
- `Criteria`: _See below_

```json
{
  "operator":"AND",
  "criteria":[
    {
      "field":"FROM",
      "value":"example@camunda.com"
    },
    {
      "operator":"OR",
      "criteria":[
        {
          "field":"SUBJECT",
          "value":"urgent"
        },
        {
          "field":"SUBJECT",
          "value":"important"
        }
      ]
    }
  ]
}
```

The above query will return emails that are from "example@camunda.com" and have a subject containing either "urgent"
or "important".

A simpler query without logical operators may look like this:

```json
{
  "field":"FROM",
  "value":"example@camunda.com"
}
```

The search functionality currently supports the following logical operators:

- **AND**: Returns emails that match all the specified criteria.
- **OR**: Returns emails that match any of the specified criteria.

The following email fields can be used to set search criteria:

- **BODY**: The content of the email body.
- **SUBJECT**: The subject line of the email.
- **FROM**: The email address of the sender.

When using an operator such as AND or OR, you must also define a criteria array. This array contains the individual
conditions that the search will evaluate against the emails. Each condition within the criteria array is itself a JSON
object with a field and a value.

#### Notes

- If an operator is set, the criteria array must also be defined.
- Each criterion within the criteria array is applied to the specified field based on the value associated with it.

### Example Response

Returned Response:

```json
[
  {"messageId":"MessageId", "subject":"Important"},
  {"messageId":"MessageId2", "subject":"Urgent"}
]
```

## Move Email

This task enables users to transfer an email from one folder to another, streamlining inbox organization.

### Parameters

- `MessageId`: The identifier of the email that needs to be moved.
- `Source folder`: (Optional) The folder from which the email will be moved. If not specified, the default is INBOX.
- `Target folder`: The destination folder where the email will be placed. To specify a new folder or a nested hierarchy,
  use a dot-separated path (e.g., 'Archive' or 'Projects.2023.January'). The system will automatically create any
  non-existing folders in the path.

### Response Structure

Upon successful completion of the move operation, the response will contain a JSON object with the following details:

- `messageId`: The messageId of the email that was moved.
- `from`: The source folder from which the email was moved.
- `to`: The target folder to which the email has been moved.

### Example Response

The example below demonstrates the expected JSON response after an email has been successfully moved:

```json

{
  "messageId":"VE1P191MB1101730EEA31B2FEAB320143919A2@VE1P191MB1101.EURP191.PROD.OUTLOOK.COM",
  "from":"INBOX",
  "to":"TEST"
}
```

</TabItem>

<TabItem value='inbound'>

# Prerequisites

This inbound connector only work with IMAP server.

To use the **Email Inbound Connector**, you need to have an IMAP server available.
Use Camunda secrets to avoid exposing your sensitive data as plain text. Follow our documentation
on [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.

# Authentication

As of now, there is two different ways to authenticate to a mail server.

## Simple Authentication

It allows the user to connect to any IMAP server using the email address and the associated password.

## Listener information's

This inbound connector will create a new process each time a new email will be received.

- `Folder`: (Optional) Specifies the folder that the inbound connector should monitor. The default folder is INBOX.
- `Sync Strategy`: Determines how emails are synchronized when the connector starts:
    - `Unseen emails will be sync`: A process instance is created for every unseen email present in the folder at the
      time the connector starts.
    - `No initial sync. Only new emails`: The connector skips past emails and starts listening for new emails arriving
      in the folder.
    - `All emails will be sync`: A process instance is created for every email in the folder, regardless of their read
      status, when the connector starts.
- `Handling Strategy`: Defines how emails are handled after processing:
    - `Mark as read after processing`: Emails that have been processed will be marked as read.
    - `Do nothing`: No action will be taken on processed emails.
    - `Delete after processing`: Emails that have been processed will be deleted from the folder.
    - `Move to another folder after processing`: Processed emails will be moved to another specified folder.
        - `Folder`: Indicates the destination folder where emails will be moved after processing. A new folder or folder
          hierarchy
          can be specified using a dot-separated path (e.g., 'Archive' or 'Projects.2023.January'). Non-existent folders
          in the
          path will be created automatically.

### Example Response

The JSON response below is an example of the data structure produced when an email triggers the creation of a process
instance:

```json
{
  "messageId":"messageId",
  "fromAddresses":["example@camunda.com"],
  "subject":"Urgent Test",
  "size":65646,
  "plainTextBody":"Hey how are you?\r\n",
  "htmlBody":"<html>Hello</html>"
}
```

This response includes essential email details such as the messageId, sender addresses, subject, size, and the content
of the email both in plain text and HTML format. This information can be used by the process for various workflows, such
as prioritizing tasks, content analysis, and automated responses.

### Activation condition

The **Activation condition** is an optional field where you can specify a Friendly Enough Expression Language (FEEL)
expression to control when the Email Inbound Connector should trigger a process instance. This condition acts as a
filter, allowing the process to be initiated only when certain criteria are met by the incoming email.

#### Example Usage

For instance, the FEEL expression =(response.subject = "urgent") will ensure that the process is only triggered if the
subject of the incoming email matches "urgent". If this field is left blank, the process will be triggered for every
email received by the connector.

:::warning By default, the Email Inbound Connector is designed not to execute its handling strategy if it encounters an
email that it cannot process, such as when the activation condition is not fulfilled. :::

To ignore messages that do not meet the activation condition and still handle the email, check the **Consume unmatched
events** checkbox.

| **Consume unmatched events** checkbox | Activation condition | Outcome                                                      |
|---------------------------------------|----------------------|--------------------------------------------------------------|
| Checked                               | Matched              | Connector is triggered, handling strategy is applied         |
| Unchecked                             | Matched              | Connector is triggered, handling strategy is applied         |
| Checked                               | Unmatched            | Connector is not triggered, handling strategy is applied     |
| Unchecked                             | Unmatched            | Connector is not triggered, handling strategy is not applied |

### Correlation

The **Correlation** section allows you to configure the message correlation parameters.

:::note
The **Correlation** section is not applicable for the plain **start event** element template of the email Connector.
Plain **start events** are triggered by process instance creation and do not rely on message correlation.
:::

#### Correlation key

- **Correlation key (process)** is a FEEL expression that defines the correlation key for the subscription. This
  corresponds to the **Correlation key** property of a regular **message intermediate catch event**.
- **Correlation key (payload)** is a FEEL expression used to extract the correlation key from the incoming message. This
  expression is evaluated in the Connector Runtime and the result is used to correlate the message.

For example, given that your correlation key is defined with `myCorrelationKey` process variable, and the incoming email
message contains `value:{correlationKey:myValue}`, your correlation key settings will look like this:

- **Correlation key (process)**: `=myCorrelationKey`
- **Correlation key (payload)**: `=message.plainTextBody.correlationKey`

You can also use the key of the message to accomplish this in the **Correlation key (payload)** field with `=key`.

Learn more about correlation keys in the [messages guide](../../../concepts/messages).

#### Message ID expression

The **Message ID expression** is an optional field that allows you to extract the message ID from the incoming message.
The message ID serves as a unique identifier for the message and is used for message correlation.
This expression is evaluated in the Connector Runtime and the result is used to correlate the message.

In most cases, it is not necessary to configure the **Message ID expression**. However, it is useful if you want to
ensure message deduplication or achieve a certain message correlation behavior.
Learn more about how message IDs influence message correlation in
the [messages guide](../../../concepts/messages#message-correlation-overview).

For example, if you want to set the message ID to the value of the `messageId` field in the incoming message, you
can configure the **Message ID expression** as follows:

```
= message.messageId
```

#### Message TTL

The **Message TTL** is an optional field that allows you to set the time-to-live (TTL) for the correlated messages. TTL
defines the time for which the message is buffered in Zeebe before being correlated to the process instance (if it can't
be correlated immediately).
The value is specified as an ISO 8601 duration. For example, `PT1H` sets the TTL to one hour. Learn more about the TTL
concept in Zeebe in the [message correlation guide](../../../concepts/messages#message-buffering).

### Deduplication

The **Deduplication** section allows you to configure the Connector deduplication parameters.
Not to be confused with **message deduplication**, **Connector deduplication** is a mechanism in the Connector Runtime
that determines how many emails listener are created if there are multiple occurrences of the **Email Listener
Connector** in the BPMN diagram.

By default, the Connector runtime deduplicates Connectors based on properties, so elements with the same subscription
properties only result in one subscription. Learn more about deduplication in
the [deduplication guide](../use-connectors/inbound.md#connector-deduplication).

To customize the deduplication behavior, check the **Manual mode** checkbox and configure the custom deduplication ID.

</TabItem>

</Tabs>
