---
id: box
sidebar_label: Box Connector
title: Box Connector
description: Interact with the Box storage API.
---

The **Box Connector** is an outbound Connector that allows you to interact with the storage API of
[Box.com](https://box.com/) from your BPMN process.

## Prerequisites

To use the **Box.com Connector**, you need to have a Box.com account. You can either use an [enterprise account](https://www.box.com/) or create a [developer account](https://developer.box.com/).

The **Box Connector** supports different ways of authenticating with the Box.com API that all require
to setup a [Custom App](https://developer.box.com/guides/applications/app-types/custom-apps/) in your Box.com account.

:::note
A [Custom App](https://developer.box.com/guides/applications/app-types/custom-apps/) is required to interact with the Box API without the need for any manual user interaction during the credential creation when authentication the Connector.
:::

We recommend to enable the **Generate user access tokens** feature in your app configuration under **Advanced Features** which allows the Connector to login as an [app user](https://github.com/box/box-java-sdk/blob/v4.13.1/doc/authentication.md#obtaining-user-token). You can use the **User ID** displayed overview page in your Box.com app console.

After creating the [Custom App](https://developer.box.com/guides/applications/app-types/custom-apps/) please make sure that the app is **Authorized** in the **Platform Apps Manager** section of your Box account.

## Create an Box Connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Authentication

Choose an applicable authentication type from the **Authentication** dropdown.

There are three options to authenticate the Connector with Box:

- Choose **Client Credentials Enterprise** in the **Authentication** dropdown if you want to authenticate using an **Enterprise ID**. This requires you to have an enterprise account with Box.com
- Choose **Client Credentials User** in the **Authentication** dropdown if you want to authenticate using an **User ID**. This requires you to have a have a custom app setup as described above.
- Choose **Devoloper Token** in the **Authentication** dropdown if you want to authenticate using a developer token. These tokens are usually only valid for 60 minutes and should only be used for testing purposes.
- Choose **JWT JSON Config** in the **Authentication** dropdown if you want to authenticate using a JSON config file that was created and downloaded from your Box App Configuration page.

## Operations

The **Box Connector** support different kind of operations that allow you to interact with the items stored in your Box account.

:::note
The Box Connector supports two way of locating items stored in your Box account. A file or folder path
properties allow you to either specify the **Item ID** (which you can find in the Box.com URL when browsing your items) or using the item names separated by slashes (`/`) for items in folders.

A path consisting only of a single `/` denotes the root of your Box folder. Therefore `/my-folder` would
point to the folder `my-folder` located in the root directory. You can use the path notation for files (`/my/image.png`) and folders (`/my/sub/folder`).
:::

### Create Folder

Creates a new folder in your store. As Box only supports unique names this operation will fail if there
is already a folder with the same name.

| Property    | Type        | Required | Example                          |
| ----------- | ----------- | -------- | -------------------------------- |
| Folder name | String      | Yes      | "my-folder"                      |
| Parent path | Folder path | No       | `/`, `123`, `/my/parent/folders` |

### Delete Folder

Deletes an existing folder. Optionally including all items and subfolders.

| Property    | Type    | Required | Example      |
| ----------- | ------- | -------- | ------------ |
| Folder path | String  | Yes      | "/my-folder" |
| Recursive   | Boolean | No       | `true`       |

### Delete File

Deletes a single file item.

| Property  | Type   | Required | Example        |
| --------- | ------ | -------- | -------------- |
| File path | String | Yes      | "/my-file.png" |

### Move File

Moves a file item into a folder.

| Property           | Type   | Required | Example           |
| ------------------ | ------ | -------- | ----------------- |
| File path          | String | Yes      | "/my-file.png"    |
| Target folder path | String | Yes      | "/another/folder" |

### Download File

Downloads a file item by creating a document in the process engine and returns a reference
to the document in the response.

| Property  | Type   | Required | Example        |
| --------- | ------ | -------- | -------------- |
| File path | String | Yes      | "/my-file.png" |

You can reference the document representing the downloaded file via the following response expression example:

```json
{"download": document}
```

### Upload File

You can upload a file by using an existing document reference. The Box Connector will resolve the
document rerefence and create a new file item in your Box store.

| Property           | Type                      | Required | Example          |
| ------------------ | ------------------------- | -------- | ---------------- |
| File path          | String                    | Yes      | "/my-file.png"   |
| Folder path        | String                    | Yes      | "/upload/folder" |
| Document reference | Document reference object | Yes      | `{...}`          |

The result of the upload can be accessed via the `item` property of the result. Here is an example
value of a successful file upload:

```json
{ "item": { "id": "1734104173434", "name": "my_new_file.png", "type": "file" } }
```

### Search

Searches the items stored in the Box account.

| Property              | Type   | Required | Example       |
| --------------------- | ------ | -------- | ------------- |
| Search query          | String | Yes      | "inci"        |
| Seach sort column     | String | No       | `modified_at` |
| Search sort direction | String | No       | `DESC`        |
| Search offset         | String | No       | `0`, `10`     |
| Search limit          | String | No       | `50`          |

Example search result with a single item:

```json
{
  "items": [
    { "id": "1733978444906", "name": "incident-wrapped.png", "type": "file" }
  ]
}
```
