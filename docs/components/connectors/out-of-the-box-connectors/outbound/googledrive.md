---
id: googledrive
title: Google Drive Connector
description: Create folders or files from a Google Drive template from your BPMN process.
---

The **Google Drive Connector** allows you to create empty folders or files on [Google Drive](https://drive.google.com/) from templates from your BPMN process.

## Prerequisites

To start working with the **Google Drive Connector**, a relevant OAuth token must be configured and stored as a secret in your cluster. The token must have permission to read and create a folder and/or files from a desired Google Drive instance. Follow the steps from the [appendix](#appendix--faq) to find out more about creating an OAuth token and giving relevant permissions.

## Create a Google Drive Connector task

Currently, the Google Drive Connector supports two types of operations: create a folder and create a file from a template.

To use a **Google Drive Connector** in your process, either change the type of existing task by clicking on it and using the wrench-shaped **Change type** context menu icon or create a new Connector task by using the **Append Connector** context menu. Follow our [guide on using Connectors](/components/connectors/use-connectors.md) to learn more.

## Make your Google Drive Connector executable

To make the **Google Drive Connector** executable, fill out the mandatory fields highlighted in red in the properties panel.

### Create a new folder

![Google Drive Connector new folder example](../../img/connectors-googledrive-new-folder-filled.png)

To create a new folder, take the following steps:

1. Set the required credentials in the **Authentication** section. See the [relevant appendix entry](#how-can-i-authenticate-my-connector) to find out more.
2. In the **Select Operation** section, set the field value **Operation Type** as **Create Folder**.
3. In the **Operation Details** section, set the field **Folder name** as the desired name of a folder you wish to create. For example, `MyNewFolder`. Alternatively, you could use a FEEL expression.
4. _(optional)_ In the **Operation Details** section, set the field **Parent folder ID** to the desired parent, inside which a new folder will be created. Keep in mind that if not specified, a new folder will be created in the Google Drive root folder of a user who owns the OAuth token.
5. _(optional)_ In the **Operation Details** section, you can set the **Additional properties or metadata** field to Google Drive compatible properties. For example, _description_ of the folder. This property requires FEEL input. Check [the appendix](#what-are-the-limitations-of-the-additional-properties-or-metadata) for known values and limitations.

### Create a new file from a template

![Google Drive Connector new file from template example](../../img/connectors-googledrive-new-file-filled.png)

To create a new file from a template, take the following steps:

1. Set the required credentials in the **Authentication** section. See the [relevant appendix entry](#how-can-i-authenticate-my-connector) to find out more.
2. In the **Select Operation** section, set the field value **Operation Type** as **Create File from template**.
3. In the **Operation Details** section, set the field **File name** as the desired name of a folder you wish to create. You can use FEEL expressions here.
4. In the **Operation Details** section, set the field **Template ID** of the desired template.
5. _(optional)_ In the **Operation Details** section, set the field **Parent folder ID** to the desired parent, inside which a new file will be created. Keep in mind that if not specified, a new folder will be created in the Google Drive root folder of a user who owns the OAuth token.
6. In the **Operation Details** section, set the field **Template variables** as desired variables that will be applied to the template. The template variables are compatible with the Google Docs [Requests API](https://developers.google.com/docs/api/reference/rest/v1/documents/request). This property requires FEEL input.
7. _(optional)_ In the **Operation Details** section, you can set the **Additional properties or metadata** field to Google Drive compatible properties. This property requires FEEL input. Check [the appendix](#what-are-the-limitations-of-the-additional-properties-or-metadata) for known values and limitations.

## Google Drive Connector response

The **Google Drive Connector** exposes Google Drive API response as a local variable called response.
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

## Appendix & FAQ

### What Google API does the Google Drive Connector use to create a folder?

The **Google Drive Connector** uses the Google Drive [`Files:Create`](https://developers.google.com/drive/api/v3/reference/files/create) API endpoint.

### What Google API does the Google Drive Connector use to create a file from template?

The **Google Drive Connector** uses the Google Drive [`Files:Copy`](https://developers.google.com/drive/api/v3/reference/files/copy) API endpoint to copy an original template. Afterwards, the **Google Drive Connector** utilizes Google Docs [Merge](https://developers.google.com/docs/api/how-tos/merge) approach via [`Documents:BatchUpdate`](https://developers.google.com/docs/api/reference/rest/v1/documents/batchUpdate) Google Docs API method.

### How can I authenticate my Connector?

The **Google Drive Connector** currently supports two methods for authentication and authorization: based on short-lived JWT bearer token, and based on refresh token.

Google supports multiple ways to obtain both. Refer to the [official Google OAuth documentation](https://developers.google.com/identity/protocols/oauth2) to get up-to-date instructions or see the examples below.

You also enable _Google Docs API_ and _Google Drive API_ for every client intended to use. You can do this at the [Google Cloud API Library](https://console.cloud.google.com/apis/library) page.

#### Example 1: Obtaining JWT bearer token with a service account

![Bearer Auth](../../img/connectors-googledrive-jwt-bearer.png)

:::warning
The following code snippet is for demonstration purposes only and must not be used for real production systems due to security concerns.
For production usage it is highly recommended to follow the [official Google guideline](https://developers.google.com/identity/protocols/oauth2/service-account).
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

![Refresh Auth](../../img/connectors-googledrive-jwt-refresh.png)

:::warning
The following code snippet is for demonstration purposes only and must not be used for real production systems due to security concerns.
For production usage it is highly recommended to follow the [official Google guideline](https://developers.google.com/identity/protocols/oauth2/web-server).
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

It is in the URL.

![Google Drive Connector get parent folder ID](../../img/connectors-googledrive-get-parent-folder-id.png)

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

Template ID is located in the URL.

![Google Drive Connector get template ID](../../img/connectors-googledrive-get-template-id.png)

### Can you show me an example of a valid template?

A valid template looks like the following screenshot:

![Google Drive Connector document template example](../../img/connectors-googledrive-template-example.png)

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

![Google Drive Connector processed template example](../../img/connectors-googledrive-processed-template-example.png)

### What kind of templates are currently supported?

The **Google Drive Connector** currently supports only Google Doc files (MIME type `application/vnd.google-apps.document`).
