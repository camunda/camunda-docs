---
id: googledrive
title: Google Drive connector
sidebar_label: Google Drive
description: Create folders, create files from a Google Docs template, and upload or download files on Google Drive from your BPMN process.
---

import ConnectorTask from '../../../components/react-components/connector-task.md'

Create folders, create files from a Google Docs template, and upload or download files on Google Drive from your BPMN process.

## About this connector

The Google Drive connector is an outbound connector that lets your process work with [Google Drive](https://drive.google.com/). Use it to create a folder, create a file from a Google Docs template and fill in the template variables, upload a file from process data, or download a file from Google Drive.

For example, use this connector to generate a personalized letter from a template when an application is approved, and store it in a customer folder.

## Prerequisites

The following prerequisites are required to use this connector:

| Prerequisite                         | Description                                                                                                                                                                                                                          |
| :----------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Google Drive API and Google Docs API | Enable both APIs for every client that uses the connector. You can do this on the [Google Cloud API Library](https://console.cloud.google.com/apis/library) page.                                                                    |
| OAuth token                          | A bearer token, or a client ID, client secret, and refresh token. The token must have permission to read and create folders and files in the Google Drive you want to use. Store it as a secret in your cluster, not in the diagram. |

For instructions to obtain a token, see [obtain an OAuth token](#obtain-an-oauth-token).

## Create a Google Drive connector task

<ConnectorTask />

## Configuration

### Authentication

Select an authentication method in the **Type** dropdown, then complete the fields it reveals.

| Property      | Type     | Required | Description                                                                                                                               | Example                            |
| :------------ | :------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------- |
| Type          | Dropdown | Yes      | The authentication method: **Bearer token** or **Refresh token** (default).                                                               | Refresh token                      |
| Bearer token  | String   | Yes      | A valid Google API bearer token, which is short-lived. Shown when **Type** is **Bearer token**. Use a secret to avoid exposing the token. | `{{secrets.GOOGLE_BEARER_TOKEN}}`  |
| Client ID     | String   | Yes      | The Google API client ID. Shown when **Type** is **Refresh token**.                                                                       |                                    |
| Client secret | String   | Yes      | The Google API client secret. Shown when **Type** is **Refresh token**. Use a secret to avoid exposing the value.                         | `{{secrets.GOOGLE_CLIENT_SECRET}}` |
| Refresh token | String   | Yes      | A valid Google API refresh token. Shown when **Type** is **Refresh token**. Use a secret to avoid exposing the value.                     | `{{secrets.GOOGLE_REFRESH_TOKEN}}` |

## Operations

Select the operation in the **Operation** dropdown of the **Select operation** section. The input parameters depend on the operation you select.

### Create folder

Create an empty folder on Google Drive. The connector uses the Google Drive [`Files:Create`](https://developers.google.com/drive/api/v3/reference/files/create) API endpoint.

#### Input parameters

| Property                          | Type   | Required | Description                                                                                                                                                                                                                              | Example                                        |
| :-------------------------------- | :----- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------- |
| New resource name                 | String | Yes      | The name of the folder to create. Supports FEEL expressions.                                                                                                                                                                             | `MyNewFolder`                                  |
| Parent folder ID                  | String | No       | The folder in which the new folder is created. If you leave it empty, the folder is created in the Google Drive root folder of the user who owns the token. See [where do I get a parent folder ID?](#where-do-i-get-a-parent-folder-id) | `1whNL0a6WjZtYRHF2522FrCYUYxHve9ju-DHNkaTm9Sk` |
| Additional properties or metadata | String | No       | Google Drive properties to set on the folder, for example a description. Requires a FEEL expression. See [additional properties and metadata](#additional-properties-and-metadata) for known values and limitations.                     | `= {"description": "myDescription"}`           |

#### Output

The connector exposes the Google Drive API response as a local variable named `response`. The following fields are available:

- `googleDriveResourceId`: The ID of the newly created resource.
- `googleDriveResourceUrl`: The human-readable URL of the newly created resource.

For example, use a **Result expression** to map the fields to process variables:

```
= {
  "myNewReportFolderId": response.googleDriveResourceId,
  "myNewReportFolderUrl": response.googleDriveResourceUrl
}
```

### Create file from template

Create a file by copying a Google Docs template and replacing the placeholders in it. The connector copies the template with the Google Drive [`Files:Copy`](https://developers.google.com/drive/api/v3/reference/files/copy) API endpoint. It then applies your template variables with the Google Docs [Merge](https://developers.google.com/docs/api/how-tos/merge) approach, using the [`Documents:BatchUpdate`](https://developers.google.com/docs/api/reference/rest/v1/documents/batchUpdate) API method.

The connector supports only Google Docs files as templates (MIME type `application/vnd.google-apps.document`).

#### Input parameters

| Property           | Type   | Required | Description                                                                                                                                                                                                                                                                              | Example                                        |
| :----------------- | :----- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------- |
| New resource name  | String | Yes      | The name of the file to create. Supports FEEL expressions.                                                                                                                                                                                                                               |                                                |
| Parent folder ID   | String | No       | The folder in which the new file is created. If you leave it empty, the file is created in the Google Drive root folder of the user who owns the token. See [where do I get a parent folder ID?](#where-do-i-get-a-parent-folder-id)                                                     | `1whNL0a6WjZtYRHF2522FrCYUYxHve9ju-DHNkaTm9Sk` |
| Template ID        | String | Yes      | The ID of the Google Docs template to copy. See [where do I get a template ID?](#where-do-i-get-a-template-id)                                                                                                                                                                           | `1whNL0a6WjZtYRHF2522FrCYUYxHve9ju-DHNkaTm9Sk` |
| Template variables | String | No       | The requests that replace placeholders in the copied template. Must be compatible with the Google Docs [Requests API](https://developers.google.com/docs/api/reference/rest/v1/documents/request). Requires a FEEL expression. See the [template example](#example-of-a-valid-template). |                                                |

#### Output

The connector exposes the Google Drive API response as a local variable named `response`. The following fields are available:

- `googleDriveResourceId`: The ID of the newly created resource.
- `googleDriveResourceUrl`: The human-readable URL of the newly created resource.

### Upload file

Upload a file to Google Drive.

#### Input parameters

| Property         | Type   | Required | Description                                                                                                                                                                                                                          | Example                                        |
| :--------------- | :----- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------- |
| Parent folder ID | String | No       | The folder in which the new file is created. If you leave it empty, the file is created in the Google Drive root folder of the user who owns the token. See [where do I get a parent folder ID?](#where-do-i-get-a-parent-folder-id) | `1whNL0a6WjZtYRHF2522FrCYUYxHve9ju-DHNkaTm9Sk` |
| Document         | String | Yes      | A reference to a document in the Camunda document store, as a FEEL expression. Enter the name of the variable to which the document is assigned.                                                                                     |                                                |

:::note
To work with documents, you must upload them first, [using the Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/specifications/create-document.api.mdx) for example. Assign the result of the endpoint to a variable in **Start process instance**, then use that variable in the **Document** field.
:::

:::note
Starting from version 8.7.0, the Google Drive connector supports uploading documents from (or downloading documents to) the Camunda document store. See additional details and limitations in [document handling](/components/document-handling/getting-started.md).
:::

#### Output

The connector exposes the Google Drive API response as a local variable named `response`. The following fields are available:

- `googleDriveResourceId`: The ID of the newly created resource.
- `googleDriveResourceUrl`: The human-readable URL of the newly created resource.

### Download file

Download a file from Google Drive.

#### Input parameters

| Property | Type   | Required | Description                                                                                             | Example                             |
| :------- | :----- | :------- | :------------------------------------------------------------------------------------------------------ | :---------------------------------- |
| File ID  | String | Yes      | The ID of the Google Drive file to download. See [where do I get a file ID?](#where-do-i-get-a-file-id) | `1y1td3iIKWOh88gK4hVevGM1WnX7tibCW` |

#### Output

The response is identical to the [REST API](/apis-tools/orchestration-cluster-api-rest/specifications/create-document.api.mdx), a document created in the Camunda document store. For example:

```json
{
  "camunda.document.type": "camunda",
  "storeId": "in-memory",
  "documentId": "c3c8e499-321d-421c-afa2-4632d2f5ce48",
  "metadata": {
    "contentType": "image/png",
    "fileName": "file name",
    "size": 66497,
    "customProperties": {}
  }
}
```

## Troubleshooting

To learn about general error handling in Camunda, see [BPMN errors and failing jobs](/components/connectors/use-connectors/index.md#bpmn-errors).

## Appendix and FAQ

### Obtain an OAuth token

The connector supports two methods for authentication and authorization: a short-lived JWT bearer token, or a refresh token.

Google supports multiple ways to obtain both. Refer to the [official Google OAuth documentation](https://developers.google.com/identity/protocols/oauth2) for up-to-date instructions, or use the following examples.

#### Example 1: Obtain a JWT bearer token with a service account

:::danger
The following code snippet is for demonstration purposes only and must not be used for real production systems due to security concerns.
For production usage, follow the [official Google guidelines](https://developers.google.com/identity/protocols/oauth2/service-account).
:::

Assuming you have created a service account and downloaded a JSON file with keys, run the following Python 3 snippet that prints the JWT token in the terminal:

```python
import google.auth
import google.auth.transport.requests
from google.oauth2 import service_account
# Scopes required to execute 'create' endpoint with Google Drive API
SCOPES = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive.appdata']
# File with keys
SERVICE_ACCOUNT_FILE = 'google-service-account-creds.json'
credentials = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
auth_req = google.auth.transport.requests.Request()
credentials.refresh(auth_req)
# Print token
print(credentials.token)
```

When using shared drives, you must use an OAuth client instead of a service account. The service account does not have access to shared drives.

#### Example 2: Obtain a refresh token with an OAuth client

:::danger
The following code snippet is for demonstration purposes only and must not be used for real production systems due to security concerns.
For production usage, follow the [official Google guidelines](https://developers.google.com/identity/protocols/oauth2/web-server).
:::

Assuming you have created an OAuth client, you can download key files from the Google [Console](https://console.cloud.google.com/apis/credentials). Run the following Python 3 snippet that prints the refresh token in the terminal:

```python
from google_auth_oauthlib.flow import InstalledAppFlow
import pprint

SCOPES = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/documents']
OAUTH_KEYS = './oauth-keys.json' # path to your file with OAuth credentials

def main():
    flow = InstalledAppFlow.from_client_secrets_file(OAUTH_KEYS, SCOPES)
    creds = flow.run_local_server(port=54948)
    pprint.pprint(vars(creds))

if __name__ == "__main__":
    main()
```

### Where do I get a parent folder ID?

To find the ID of a Google Drive folder:

1. Open the Google Drive folder in your web browser.
2. Look at the URL in the address bar, which looks similar to the following:
   ```
   https://docs.google.com/drive/folder/1whNL0a6WjZtYRHF2522FrCYUYxHve9ju-DHNkaTm9Sk
   ```
3. The parent folder ID is the alphanumeric string after `/folders/`, in this case `1whNL0a6WjZtYRHF2522FrCYUYxHve9ju-DHNkaTm9Sk`.

### Additional properties and metadata

**Create folder** accepts additional properties and metadata. You can set any property from the Google Drive [Create API](https://developers.google.com/drive/api/v3/reference/files/create). For example:

```
= {
  "description":"myDescription"
}
```

Unknown or mistyped properties are ignored.

Some properties are applicable only for the token owners, like `folderColorRgb` and `starred`.

### Where do I get a template ID?

To find the ID of a Google Docs template:

1. Open the link to the Google Docs template in your web browser. The URL looks similar to the following:
   ```
   https://docs.google.com/document/d/1whNL0a6WjZtYRHF2522FrCYUYxHve9ju-DHNkaTm9Sk
   ```
2. The template ID is the alphanumeric string after `/d/`, in this case `1whNL0a6WjZtYRHF2522FrCYUYxHve9ju-DHNkaTm9Sk`.

### Example of a valid template

The following is an example of a valid Google Docs template:

```text
        {{CompanyName}} confidential.
{{DocumentDate}}

{{RecipientFullName}}
{{RecipientAddress}}


Dear {{RecipientShortName}}!

We are pleased to inform you that your application {{ApplicationNumber}} has been approved.

Sincerely,
{{SigneeName}}, Executive Director

```

In the **Template variables** field, use the following FEEL expression. It must be compatible with the Google Docs Requests API:

```
= {
  "requests":[
    {
      "replaceAllText":{
        "containsText":{
          "text":"{{DocumentDate}}",
          "matchCase":"true"
        },
        "replaceText":today()
      }
    },
    {
      "replaceAllText":{
        "containsText":{
          "text":"{{RecipientFullName}}",
          "matchCase":"true"
        },
        "replaceText":"John W. Doe"
      }
    },
    {
      "replaceAllText":{
        "containsText":{
          "text":"{{RecipientAddress}}",
          "matchCase":"true"
        },
        "replaceText":"Zweibrückenstraße 1845, 80000 Munich"
      }
    },
    {
      "replaceAllText":{
        "containsText":{
          "text":"{{RecipientShortName}}",
          "matchCase":"true"
        },
        "replaceText":"Mr. Doe"
      }
    },
    {
      "replaceAllText":{
        "containsText":{
          "text":"{{ApplicationNumber}}",
          "matchCase":"true"
        },
        "replaceText":"0123456789"
      }
    },
    {
      "replaceAllText":{
        "containsText":{
          "text":"{{SigneeName}}",
          "matchCase":"true"
        },
        "replaceText":"Jane T. Doe"
      }
    },
    {
      "replaceAllText":{
        "containsText":{
          "text":"{{CompanyName}}",
          "matchCase":"true"
        },
        "replaceText":"Good Company Inc."
      }
    }
  ]
}
```

The result should be as follows:

```text
        Good Company Inc. confidential.
2022-08-10

John W. Doe
Zweibrückenstraße 1845, 80000 Munich


Dear Mr. Doe!

We are pleased to inform you that your application 0123456789 has been approved.

Sincerely,
Jane T. Doe, Executive Director

```

### Where do I get a file ID?

To find the ID of a Google Drive file:

1. Select the file on your Google Drive, and click the three horizontal dots to the right of the file name.
2. Click **Share**.
3. Click **Copy link**. The URL looks similar to the following:

```
https://drive.google.com/file/d/1y1td3iIKWOh88gK4hVevGM1WnX7tibCW/view
```

4. The file ID is the alphanumeric string after `/d/`, in this case `1y1td3iIKWOh88gK4hVevGM1WnX7tibCW`.
