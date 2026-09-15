---
id: idp-projects
title: IDP projects
description: "Create and manage your intelligent document processing document extraction and classification templates in an IDP project."
---

Create and manage your IDP document extraction and classification templates in an **IDP project**.

## Create an IDP project

:::important
Ensure your deployment environment's cluster meets the [IDP project requirements](idp-configuration.md#cluster-requirements).
Camunda recommends using a development (`dev`) environment for IDP projects.
:::

To create an IDP project:

1. In Camunda Hub, open a workspace.
1. On the **Products** page, click the **IDP projects** tab.
1. Click **Create IDP project**.
1. In the modal provide the following information:
   - **Name**: Enter a name for the IDP project.
   - **Deployment environment**: Select the environment you want to use for modeling and testing your document extraction and classification. Each environment is listed with its tenant tag and cluster health status (for example, **Paused** or **Healthy**).
1. Click **Create** to create the IDP project.
1. You can now create templates inside your IDP project folder:
   - [Extraction Template](idp-document-extraction.md): Extract data from structured or unstructured documents.
   - [Classification Template](idp-document-classification.md): Automatically classify documents by type.

:::note
Classification templates require an environment whose cluster is on version 8.9 or later. If the selected environment's cluster does not meet this requirement, only extraction templates are available.
:::

## Change the IDP project environment

Open the **IDP project settings** modal to change the deployment environment used by an IDP project:

1. In Camunda Hub workspace, open your IDP project.
1. Click **Settings** to open the IDP project settings.
1. Under **Deployment environment**, select the environment you want to use for the IDP project.
1. Click **Save** to save and apply your changes.
