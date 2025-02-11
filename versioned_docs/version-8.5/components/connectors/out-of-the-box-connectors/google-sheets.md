---
id: google-sheets
title: Google Sheets Connector
sidebar_label: Google Sheets Connector
description: Use the Google Sheets Connector to connect your BPMN service with Google Sheets.
---

The **Google Sheets Connector** is an outbound Connector that allows you to work with an existing or new spreadsheet
on [Google Drive](https://drive.google.com/) from your BPMN process.

## Prerequisites

To start working with the **Google Sheets Connector**, a relevant OAuth token must be configured and stored as a secret
in your cluster. The token must have permission to read/write and create a file from a desired Google Drive instance.
Follow the steps from the [appendix](#appendix--faq) to find out more about creating an OAuth token and assigning relevant
permissions.

## Create a Google Sheets Connector task

Currently, the Google Sheets Connector supports next operations:

- [Add values to spreadsheet](#add-values-to-spreadsheet)
- [Create empty column or row](#create-empty-column-or-row)
- [Create row](#create-row)
- [Create spreadsheet](#create-spreadsheet)
- [Create worksheet](#create-worksheet)
- [Delete column](#delete-column)
- [Delete worksheet](#delete-worksheet)
- [Get row by index](#get-row-by-index)
- [Get spreadsheet details](#get-spreadsheet-details)
- [Get worksheet data](#get-worksheet-data)

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Make your Google Sheets Connector executable

To make the **Google Sheets Connector** executable, fill out the mandatory fields highlighted in red in the properties
panel.

### Add values to spreadsheet

To add values to a spreadsheet, take the following steps:

1. Set the required credentials in the **Authentication** section. Refer to the [relevant appendix entry](#how-can-i-authenticate-my-connector) to find out more.
2. In the **Select operation** section, select **Add values to spreadsheet**.
3. In the **Operation details** section, set the field **Spreadsheet ID** to the desired spreadsheet, in which a new
   value will be added.
4. _(optional)_ In the **Operation details** section, set the field **Worksheet name** to the desired worksheet, in
   which a new value will be added. Keep in mind that if not specified, a new value will be added to the first available
   worksheet in the desired spreadsheet.
5. In the **Operation details** section, set the field **Cell ID** to the desired cell, in which a new value a new value
   will be added. Use format ColumnRow (for example A1).
6. In the **Operation details** section, set the field **Value** to the desired value, which will be added in the
   desired cell.

#### Operation response

The following fields are available in the response variable:

- `action` - The action performed. In this case, it will always be **Add values to Spreadsheet**.
- `status` - The status of the operation. If successful, it will always be "OK". Otherwise, there will be an error message.
- `response` - The response of the operation. In this case, it will always be **null**.

### Create empty column or row

To create empty column or row, take the following steps:

1. Set the required credentials in the **Authentication** section. Refer to
   the [relevant appendix entry](#how-can-i-authenticate-my-connector) to find out more.
2. In the **Select operation** section, select **Create empty column or row**.
3. In the **Operation details** section, set the field **Spreadsheet ID** to the desired spreadsheet, in which new
   columns/rows will be added.
4. In the **Operation details** section, set the field **Worksheet ID** to the desired worksheet, in which new
   columns/rows will be added.
5. In the **Operation details** section, select the **Dimension**, which will be added.
6. _(optional)_ In the **Operation details** section, set the both of the **Start index** and **End index** fields, in
   which new columns/rows will be added. Keep in mind that **count starts from 0**. It's possible to leave these fields
   empty. In this case, a new column/row will be added in the end of the desired worksheet.

#### Operation response

The following fields are available in the response variable:

- `action` - The action performed. In this case, it will always be **Create empty column or row**.
- `status` - The status of the operation. If successful, it will always be "OK". Otherwise, it will be an error message.
- `response` - The response of the operation. In this case, it will always be **null**.

### Create row

To create a row, take the following steps:

1. Set the required credentials in the **Authentication** section. Refer to
   the [relevant appendix entry](#how-can-i-authenticate-my-connector) to find out more.
2. In the **Select operation** section, select **Create row**.
3. In the **Operation details** section, set the field **Spreadsheet ID** to the desired spreadsheet, in which a new row
   will be added.
4. _(optional)_ In the **Operation details** section, set the field **Worksheet name** to the desired worksheet, in
   which a new row will be added. Keep in mind that if not specified, a new row will be added to the first available
   worksheet in the desired spreadsheet.
5. In the **Operation details** section, set the field **Row index** to the desired row index, where a new row will be
   added. Refer to the [relevant appendix entry](#what-is-a-row-index) to find out more.
6. In the **Operation details** section, set the field **Enter values** to the desired values, which will be added. This
   property requires [FEEL input](../../../components/modeler/feel/language-guide/feel-expressions-introduction.md).

#### Operation response

The following fields are available in the response variable:

- `action` - The action performed. In this case, it will always be **Create row**.
- `status` - The status of the operation. If successful, it will always be "OK". Otherwise, it will be an error message.
- `response` - The response of the operation. In this case, it will always be **null**.

### Create spreadsheet

To create a spreadsheet, take the following steps:

1. Set the required credentials in the **Authentication** section. Refer to
   the [relevant appendix entry](#how-can-i-authenticate-my-connector) to find out more.
2. In the **Select operation** section, select **Create spreadsheet**.
3. _(optional)_ In the **Operation details** section, set the field **Parent folder ID** to the desired parent, inside
   which a new spreadsheet will be created. Keep in mind that if not specified, a new spreadsheet will be created in the
   Google Drive root folder of a user who owns the OAuth token.
4. In the **Operation details** section, set the field **Spreadsheet name** to the desired spreadsheet name.

#### Operation response

The following fields are available in the response variable:

- `spreadsheetId` - ID of the newly created spreadsheet.
- `spreadsheetUrl` - Human-readable URL of the newly created spreadsheet.

### Create worksheet

To create a worksheet, take the following steps:

1. Set the required credentials in the **Authentication** section. Refer to
   the [relevant appendix entry](#how-can-i-authenticate-my-connector) to find out more.
2. In the **Select operation** section, select **Create worksheet**.
3. In the **Operation details** section, set the field **Spreadsheet ID** to the desired spreadsheet, in which a new
   worksheet will be created.
4. In the **Operation details** section, set the field **Worksheet name** to the desired worksheet name.
5. _(optional)_ In the **Operation details** section, set the field **Worksheet index** to the desired index, in which a
   new worksheet will be created. Refer to the [relevant appendix entry](#what-is-a-worksheet-index) to find out more.

#### Operation response

The following fields are available in the response variable:

- `action` - The action performed. In this case, it will always be **Create worksheet**.
- `status` - The status of the operation. If successful, it will always be "OK". Otherwise, it will be an error message.
- `response` - The response of the operation. In this case, it will always be **null**.

### Delete column

To delete a column, take the following steps:

1. Set the required credentials in the **Authentication** section. Refer to the [relevant appendix entry](#how-can-i-authenticate-my-connector) to find out more.
2. In the **Select operation** section, select **Delete column**.
3. In the **Operation details** section, set the field **Spreadsheet ID** to the desired spreadsheet, in which a column
   will be deleted.
4. In the **Operation details** section, set the field **Worksheet ID** to the desired worksheet ID, in which a column
   will be deleted.
5. In the **Operation details** section, select **Index format** of desired index of column to be deleted. Refer to
   the [relevant appendix entry](#how-can-i-define-which-column-will-be-deleted) to find out more.
6. In the **Operation details** section, set the **Column letter index** to the desired column index.

#### Operation response

The following fields are available in the response variable:

- `action` - The action performed. In this case, it will always be **Delete column**.
- `status` - The status of the operation. If successful, it will always be "OK". Otherwise, it will be an error message.
- `response` - The response of the operation. In this case, it will always be **null**.

### Delete worksheet

To delete a worksheet, take the following steps:

1. Set the required credentials in the **Authentication** section. Refer to the [relevant appendix entry](#how-can-i-authenticate-my-connector) to find out more.
2. In the **Select operation** section, select **Delete worksheet**.
3. In the **Operation details** section, set the field **Spreadsheet ID** to the desired spreadsheet, in which a worksheet will be deleted.
4. In the **Operation details** section, set the field **Worksheet ID** to the desired worksheet ID, which will be deleted.

#### Operation response

The following fields are available in the response variable:

- `action` - The action performed. In this case, it will always be **Delete worksheet**.
- `status` - The status of the operation. If successful, it will always be "OK". Otherwise, it will be an error message.
- `response` - The response of the operation. In this case, it will always be **null**.

### Get row by index

To get row by index, take the following steps:

1. Set the required credentials in the **Authentication** section. Refer to the [relevant appendix entry](#how-can-i-authenticate-my-connector) to find out more.
2. In the **Select operation** section, select **Get row by index**.
3. In the **Operation details** section, set the field **Spreadsheet ID** to the desired spreadsheet, from which a row
   will be retrieved.
4. _(optional)_ In the **Operation details** section, set the field **Worksheet name** to the desired worksheet, from
   which a row will be retrieved. Keep in mind that if not specified, a row will be retrieved from the first available
   worksheet in the desired spreadsheet.
5. In the **Operation details** section, set the field **Row index** to the desired row index. Refer to
   the [relevant appendix entry](#what-is-a-row-index) to find out more.

#### Operation response

The following fields are available in the response variable:

- `action` - The action performed. In this case, it will always be **Get row by index**.
- `status` - The status of the operation. If successful, it will always be "OK". Otherwise, it will be an error message.
- `response` - The response of the operation. If row is empty, the response is **null**, else **array**.

### Get spreadsheet details

To get spreadsheet details, take the following steps:

1. Set the required credentials in the **Authentication** section. Refer to the [relevant appendix entry](#how-can-i-authenticate-my-connector) to find out more.
2. In the **Select operation** section, select **Get spreadsheet details**.
3. In the **Operation details** section, set the field **Spreadsheet ID** to the desired spreadsheet, which details will be returned.

#### Operation response

The response contains spreadsheet properties. For details, read the [official Google documentation](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets#spreadsheetproperties).

### Get worksheet data

To get worksheet data, take the following steps:

1. Set the required credentials in the **Authentication** section. Refer to the [relevant appendix entry](#how-can-i-authenticate-my-connector) to find out more.
2. In the **Select operation** section, select **Get worksheet data**.
3. In the **Operation details** section, set the field **Spreadsheet ID** to the desired spreadsheet, from which data will be retrieved.
4. In the **Operation details** section, set the field **Worksheet name** to the desired worksheet, from which data will be retrieved.

#### Operation response

The following fields are available in the response variable:

- `action` - The action performed. In this case, it will always be **Get worksheet data**
- `status` - The status of the operation. If successful, it will always be "OK". Otherwise, it will be an error message.
- `response` - The response of the operation. If the worksheet is empty, the response is **null**, else **array of rows (also array)**.

## Appendix & FAQ

### How can I authenticate my Connector?

The **Google Sheets Connector** currently supports two methods for authentication and authorization: based on
short-lived JWT bearer token, and based on refresh token.

Google supports multiple ways to obtain both. Refer to
the [official Google OAuth documentation](https://developers.google.com/identity/protocols/oauth2) to get up-to-date
instructions or refer to the examples below.

You also enable _Google Sheets API_ and _Google Drive API_ for every client intended to use. You can do this from
the [Google Cloud API Library](https://console.cloud.google.com/apis/library).

#### Example 1: Obtaining JWT bearer token with a service account

:::danger
The following code snippet is for demonstration purposes only and must not be used for real production systems due to
security concerns.
For production usage, follow
the [official Google guidelines](https://developers.google.com/identity/protocols/oauth2/service-account).
:::

Assuming you have created a service account and downloaded a JSON file with keys, run the following Python 3 snippet
that prints the JWT token in the terminal:

```python
import google.auth
import google.auth.transport.requests
from google.oauth2 import service_account
# Scopes required to execute 'create' endpoind with Google Sheets API
SCOPES = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive.appdata']
# File with keys
SERVICE_ACCOUNT_FILE = 'google-service-account-creds.json'
credentials = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
auth_req = google.auth.transport.requests.Request()
credentials.refresh(auth_req)
# Print token
print(credentials.token)
```

#### Example 2: Obtaining bearer and refresh tokens with OAuth client

:::danger
The following code snippet is for demonstration purposes only and must not be used for real production systems due to
security concerns.
For production usage, follow
the [official Google guidelines](https://developers.google.com/identity/protocols/oauth2/web-server).
:::

Assuming you have created an OAuth client, you can download key files from the
Google [Console](https://console.cloud.google.com/apis/credentials). Run the following Python 3 snippet that prints the
refresh token in the terminal:

```python
from google_auth_oauthlib.flow import InstalledAppFlow
import pprint

SCOPES = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/spreadsheets']
OAUTH_KEYS = './oauth-keys.json' # path to your file with OAuth credentials

def main():
    flow = InstalledAppFlow.from_client_secrets_file(OAUTH_KEYS, SCOPES)
    creds = flow.run_local_server(port=54948)
    pprint.pprint(vars(creds))

if __name__ == "__main__":
    main()
```

### Where do I get a spreadsheet ID?

The spreadsheet ID is located within the URL of the Google Sheets document. Here's how to find it:

For example, if the URL looks like this:

```
https://docs.google.com/spreadsheets/d/1xhNL0a6WjZtYRHF2522FrCYUYxHve9ju-DHNkaTm9Sk/edit#gid=0
```

The spreadsheet ID is the alphanumeric string between `d/` and `/edit`, which in this case is `1xhNL0a6WjZtYRHF2522FrCYUYxHve9ju-DHNkaTm9Sk`.

### Where do I get a worksheet ID?

The Worksheet ID (also known as the gid) can be found in the same URL. Here's how to find it:

For example, if the URL looks like this:

```
https://docs.google.com/spreadsheets/d/1xhNL0a6WjZtYRHF2522FrCYUYxHve9ju-DHNkaTm9Sk/edit#gid=0
```

The worksheet ID is the number after `#gid=`, which in this case is `0`.

### What is a worksheet index?

You can define the place where a new worksheet will be created. By default, the new worksheet will be created at the end
of the worksheet. Keep in mind, **count starts from 0**. For instance, to create a new worksheet on the second
place, worksheet index should be set as **1**.

### What is a row index?

Row index is the unique identifier for each row in some worksheet, which is used both for reading and writing operations
with row. This index is defined to the left of the row.

### How can I define which column will be deleted?

There are two ways to define which column will be deleted: by letter index and numeric one. Numeric index can be found
at the top of the column.

The other option is to use numeric index. Keep in mind **count starts from 0**. To delete column A,
numeric index should be 0, B -> 1...
