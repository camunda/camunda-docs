---
id: googledrive
title: Google Drive Connector
sidebar_label: Google Drive
description: Create folders or files from a Google Drive template from your BPMN process.
---

The **Google Drive Connector** is an outbound Connector that allows you to create empty folders or files on [Google Drive](https://drive.google.com/) from templates from your BPMN process.

## Prerequisites

To start working with the **Google Drive Connector**, a relevant OAuth token must be configured and stored as a secret in your cluster. The token must have permission to read and create a folder and/or files from a desired Google Drive instance. Follow the steps from the [appendix](#appendix--faq) to find out more about creating an OAuth token and giving relevant permissions.

## Create a Google Drive Connector task

Currently, the Google Drive Connector supports two types of operations: create a folder and create a file from a template.

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Make your Google Drive Connector executable

To make the **Google Drive Connector** executable, fill out the mandatory fields highlighted in red in the properties panel on the right side of the screen.

### Create a new folder

To create a new folder, take the following steps:

1. Set the required credentials in the **Authentication** section. Refer to the [relevant appendix entry](#how-can-i-authenticate-my-connector) to find out more.
2. In the **Select Operation** section, set the field value **Operation Type** as **Create Folder**.
3. In the **Operation Details** section, set the field **Folder name** as the desired name of a folder you wish to create. For example, `MyNewFolder`. Alternatively, you could use a FEEL expression.
4. _(optional)_ In the **Operation Details** section, set the field **Parent folder ID** to the desired parent, inside which a new folder will be created. Keep in mind that if not specified, a new folder will be created in the Google Drive root folder of a user who owns the OAuth token.
5. _(optional)_ In the **Operation Details** section, you can set the **Additional properties or metadata** field to Google Drive compatible properties. For example, _description_ of the folder. This property requires FEEL input. Check [the appendix](#what-are-the-limitations-of-the-additional-properties-or-metadata) for known values and limitations.

### Create a new file from a template

To create a new file from a template, take the following steps:

1. Set the required credentials in the **Authentication** section. Refer to the [relevant appendix entry](#how-can-i-authenticate-my-connector) to find out more.
2. In the **Select Operation** section, set the field value **Operation Type** as **Create File from template**.
3. In the **Operation Details** section, set the field **File name** as the desired name of a folder you wish to create. You can use FEEL expressions here.
4. In the **Operation Details** section, set the field **Template ID** of the desired template.
5. _(optional)_ In the **Operation Details** section, set the field **Parent folder ID** to the desired parent, inside which a new file will be created. Keep in mind that if not specified, a new folder will be created in the Google Drive root folder of a user who owns the OAuth token.
6. In the **Operation Details** section, set the field **Template variables** as desired variables that will be applied to the template. The template variables are compatible with the Google Docs [Requests API](https://developers.google.com/docs/api/reference/rest/v1/documents/request). This property requires FEEL input.
7. _(optional)_ In the **Operation Details** section, you can set the **Additional properties or metadata** field to Google Drive compatible properties. This property requires FEEL input. Check [the appendix](#what-are-the-limitations-of-the-additional-properties-or-metadata) for known values and limitations.

### Upload a file

To upload a file, take the following steps:

1. Set the required credentials in the **Authentication** section. Refer to the [relevant appendix entry](#how-can-i-authenticate-my-connector) to find out more.
2. In the **Select Operation** section, set the field value **Operation Type** as **Upload File**.
3. _(optional)_ In the **Operation Details** section, set the field **Parent folder ID** to the desired parent, inside which a new file will be created. Keep in mind that if not specified, a new folder will be created in the Google Drive root folder of a user who owns the OAuth token.
4. In the **Document** section, input the variable name to which the document is assigned.

   :::Note
   To work with document you must upload them first, [using the REST API](/apis-tools/camunda-api-rest/specifications/create-document.api.mdx) for example.
   The result of the endpoint must then be assigned to a variable in **Start Process Instance** so you can use the variable in the **Document** field.
   :::

### Download file

To download a file, take the following steps:

1. Set the required credentials in the **Authentication** section. Refer to the [relevant appendix entry](#how-can-i-authenticate-my-connector) to find out more.
2. In the **Select Operation** section, set the field value **Operation Type** as **Download File**.
3. In the **Operation Details** section, set the field _File ID_ as google drive file that will be downloaded. For mor info refer to the [file id appendix](#Where-do-I-get-File-ID) to find out more.

## Google Drive Connector response

There are 2 types of response that can be returned by the _Google Drive Connector response_, depending on the **Operation Type** selected.

- ### 1 type for list of operations

  - **Create Folder**
  - **Create File from template**
  - **Upload File**

The **Google Drive Connector response** exposes Google Drive API response as a local variable called response.
The following fields are available in the response variable:

- `googleDriveResourceId` - ID of the newly created resource.
- `googleDriveResourceUrl` - Human-readable URL of the newly created resource.

You can use an output mapping to map the response:

1. Use **Result Variable** to store the response in a process variable. For example, `myResultVariable`.
2. Use **Result Expression** to map fields from the response into process variables. For example:

```
= {
  "myNewReportFolderId": response.googleDriveResourceId,
  "myNewReportFolderUrl": response.googleDriveResourceUrl
}
```

- ### 2 type for _Download file_ operation only
  The **Google Drive connector** response will be identical to the [REST API](/apis-tools/camunda-api-rest/specifications/create-document.api.mdx).
  For example:

```
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

## Appendix & FAQ

### What Google API does the Google Drive Connector use to create a folder?

The **Google Drive Connector** uses the Google Drive [`Files:Create`](https://developers.google.com/drive/api/v3/reference/files/create) API endpoint.

### What Google API does the Google Drive Connector use to create a file from template?

The **Google Drive Connector** uses the Google Drive [`Files:Copy`](https://developers.google.com/drive/api/v3/reference/files/copy) API endpoint to copy an original template. Afterwards, the **Google Drive Connector** utilizes Google Docs [Merge](https://developers.google.com/docs/api/how-tos/merge) approach via [`Documents:BatchUpdate`](https://developers.google.com/docs/api/reference/rest/v1/documents/batchUpdate) Google Docs API method.

### How can I authenticate my Connector?

The **Google Drive Connector** currently supports two methods for authentication and authorization: based on short-lived JWT bearer token, and based on refresh token.

Google supports multiple ways to obtain both. Refer to the [official Google OAuth documentation](https://developers.google.com/identity/protocols/oauth2) to get up-to-date instructions or refer to the examples below.

You also enable _Google Docs API_ and _Google Drive API_ for every client intended to use. You can do this at the [Google Cloud API Library](https://console.cloud.google.com/apis/library) page.

#### Example 1: Obtaining JWT bearer token with a service account

:::danger
The following code snippet is for demonstration purposes only and must not be used for real production systems due to security concerns.
For production usage, follow the [official Google guidelines](https://developers.google.com/identity/protocols/oauth2/service-account).
:::

Assuming you have created a service account and downloaded a JSON file with keys, run the following Python 3 snippet that prints the JWT token in the terminal:

```python
import google.auth
import google.auth.transport.requests
from google.oauth2 import service_account
# Scopes required to execute 'create' endpoind with Google Drive API
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

To find the Parent Folder ID for a Google Drive folder, follow these steps:

1. Open the Google Drive folder in your web browser.
2. Look at the URL in the address bar, which will look something like this:
   ```
   https://docs.google.com/drive/folder/1whNL0a6WjZtYRHF2522FrCYUYxHve9ju-DHNkaTm9Sk
   ```
3. The Parent Folder ID is the alphanumeric string after `/folders/`, which in this case is `1whNL0a6WjZtYRHF2522FrCYUYxHve9ju-DHNkaTm9Sk`.

### How do I set additional properties or metadata?

You can set any property from the Google Drive [Create API](https://developers.google.com/drive/api/v3/reference/files/create).

For example:

```
= {
  "description":"myDescription"
}
```

The unknown or mistyped properties will be ignored.

### What are the limitations of the additional properties or metadata?

Some properties are applicable only for the token owners, like `folderColorRgb` and `starred`.

### Where do I get Template ID?

To find the Template ID for a Google Docs template, follow these steps:

1. Open the link to the Google Docs template in your web browser. The URL will look something like this:
   ```
   https://docs.google.com/document/d/1whNL0a6WjZtYRHF2522FrCYUYxHve9ju-DHNkaTm9Sk
   ```
2. The Template ID is the alphanumeric string after `/d/`, which in this case is `1whNL0a6WjZtYRHF2522FrCYUYxHve9ju-DHNkaTm9Sk`.

### Can you show me an example of a valid template?

Certainly! Here is an example of a valid template:

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

Now, in the **Template variables** field we can apply the following FEEL JSON object which must be compatible with the Google Docs Requests API:

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
        Good Company inc. confidential.
2022-08-10

John W. Doe
Zweibrückenstraße 1845, 80000 Munich


Dear Mr. Doe!

We are pleased to inform you that your application 0123456789 has been approved.

Sincerely,
Jane T. Doe, Executive Director

```

### Where do I get File ID?

To find the File ID for a Google file, follow these steps:

1. Select the desired file on your Google Drive, click on the three horizontal dots to the right of the file name.
2. Click on the share section.
3. Click on copy link. The URL will look something like this:

```
https://drive.google.com/file/d/1y1td3iIKWOh88gK4hVevGM1WnX7tibCW/view
```

4. The File ID is the alphanumeric string after `/d/`, which in this case is `1y1td3iIKWOh88gK4hVevGM1WnX7tibCW`.

### What kind of templates are currently supported?

The **Google Drive Connector** currently supports only Google Doc files (MIME type `application/vnd.google-apps.document`).
