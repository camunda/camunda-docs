---
id: idp-projects
title: IDP projects
description: "Create and manage your intelligent document processing document extraction and classification templates in an IDP project."
---

import IdpProjectImg from './img/idp-project.png';
import IdpProjectModalImg from './img/idp-project-modal.png';

Create and manage your IDP document extraction and classification templates in an **IDP project**.

<img src={IdpProjectImg} alt="IDP project screen" style={{marginTop: '0'}} />

## Create an IDP project

To create an IDP project:

1. Open a workspace in Web Modeler.
1. Go to the **Projects** page.
1. Click the **IDP projects** tab.
1. Click **Create new** and select **IDP project** to open the **Create an IDP project** modal.
   <img src={IdpProjectModalImg} alt="IDP project screen" width="550px" style={{marginTop: '0'}} />
   - **Name**: Enter a name for the IDP project.
   - **Select a cluster**: Select the cluster you want to use for modeling and testing your document extraction and classification.
1. Click **Create** to create the IDP project.

1. You can now create templates inside your IDP project folder:
   - [Document extraction](idp-document-extraction.md) templates to extract data from structured or unstructured documents.
   - [Document classification](idp-document-classification.md) templates to automatically classify documents by type.

:::note
Document classification templates require cluster version 8.9-alpha5 or later. If your cluster does not meet this requirement, only extraction templates are available.
:::

:::note

- Camunda recommends using a development (dev) cluster for your IDP projects.
- Ensure that the selected cluster meets the [IDP project cluster requirements](idp-configuration.md#cluster-requirements).

:::

## Change IDP project cluster

Open the **IDP project settings** modal to change the cluster being used by an IDP project.

1. Click **Settings** to open the IDP project settings.
1. Change the cluster you want to use for the IDP project.
1. Click **Save** to save and apply your changes.
