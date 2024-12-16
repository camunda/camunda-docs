---
id: idp-applications
title: IDP applications
description: "You can import a BPMN or DMN diagram at any time with Web Modeler."
---

import IdpApplicationImg from './img/idp-application.png';

Create and manage your IDP projects in an **IDP application** folder.

<img src={IdpApplicationImg} alt="IDP application screen" />

- IDP applications and projects are only fully operational when linked to a healthy, active cluster. You can select an unstable or unhealthy cluster when first creating an IDP application, and change to a stable cluster when required.
- You can only select a cluster that supports Camunda document handling (8.7+).
- You cannot change the selected cluster of an IDP application after it has been created.
- Camunda recommends using a development cluster as best practice.

## Create an IDP application

To create an IDP application:

1. In Web Modeler, select **Create new** > **IDP application** in a project.
1. **Name**: Enter a name for the IDP application.
1. **Select a cluster**: Select the cluster you want to use for modelling and testing your document extraction.

   :::note
   You will need to store the secrets under cluster to use your model. See x for more information.
   :::

1. Click **Create** to create the IDP application.
1. You can now add and create [document extraction](idp-document-extraction.md) and [document automation](idp-document-automation.md) projects in your IDP application.
