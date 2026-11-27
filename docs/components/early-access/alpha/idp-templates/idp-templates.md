---
id: idp-templates
title: IDP templates in Projects
sidebar_label: IDP templates in Projects
description: "Create IDP extraction and classification templates as files inside your Projects, next to your BPMN diagrams, DMN tables, and forms."
keywords:
  [IDP, "IDP templates", "intelligent document processing", alpha, projects]
---

Create [intelligent document processing (IDP)](/components/hub/workspace/modeler/intelligent-document-processing.md) templates as files inside your Projects, next to your BPMN diagrams, DMN tables, and forms.

:::caution Alpha feature
IDP templates in Projects is an [alpha feature](/components/early-access/alpha/alpha-features.md). It is not intended for production use, and its behavior can change in later releases.
:::

## About IDP templates in Projects

Today, you create IDP templates inside a separate [IDP project](/components/hub/workspace/modeler/idp/idp-projects.md). With this alpha feature, an IDP template is a regular file in a Project instead. It behaves like the other files in that Project:

- **It exists from the moment you create it.** You don't need to publish it first to get a file.
- **It has a version history.** Each change is saved, and you can restore an earlier version.
- **It syncs with Git.** If your Project is connected to a repository through [Git sync](/components/hub/workspace/manage-projects/git-sync.md), you push and pull IDP templates like any other file.
- **It appears in the Project's file list.** You can upload and download it like other files, whether it is published or still a draft.

You still design and test the template in the same IDP editor, with the same extraction and classification options.

### What stays the same

- **IDP projects keep working.** You can still create, edit, test, and publish templates in IDP projects. Enabling this feature doesn't change or move them.
- **The IDP editor and test documents.** You configure fields, prompts, and document types and test them with sample documents as before. Your test documents and results stay in Camunda Hub and are not pushed to Git.
- **Using templates in processes.** After you publish a template, you use it in an [IDP task](/components/hub/workspace/modeler/idp/idp-integrate.md) in your BPMN diagram as before.
- **Prerequisites.** You need the same [IDP configuration](/components/hub/workspace/modeler/idp/idp-configuration.md), including the connector secrets for your provider on the cluster.

## Enable IDP templates in Projects

### SaaS

An organization admin or owner enables the feature for the whole organization:

1. [Accept the alpha terms](/components/saas/organization/enable-alpha-features.md#accept-alpha-terms) for your organization, if you haven't already.
1. In the left navigation, click **Organization > Manage organization**.
1. On the **Settings** tab, set the **IDP templates in Projects** toggle to **Enabled**.

If you disable the feature again, the **IDP template** entry disappears from the **Create new** menu. IDP templates that already exist in your Projects stay there, and you can still open and edit them.

### Self-Managed

In Self-Managed alpha releases that include this feature, it is available without any additional setup.

## Create an IDP template in a Project

:::important
Make sure your environment's cluster meets the [IDP cluster requirements](/components/hub/workspace/modeler/idp/idp-configuration.md#cluster-requirements).
:::

1. Open a Project in Camunda Hub.
1. Click **Create new > IDP template**.
1. In the dialog, enter the following:
   - **Environment**: The environment you want to test the template on. In a multi-tenant environment, also select the tenant.
   - **Type**: The kind of template:
     - [Unstructured extraction](/components/hub/workspace/modeler/idp/idp-unstructured-extraction.md)
     - [Structured extraction](/components/hub/workspace/modeler/idp/idp-structured-extraction.md)
     - [Classification](/components/hub/workspace/modeler/idp/idp-document-classification.md)
   - **Provider**: The AI provider that processes your documents.
   - **Name**: A name for the template.
1. Click **Create**. The template opens in the IDP editor.

The types available depend on the version of the environment's cluster:

| Cluster version | Available types                                                    |
| :-------------- | :----------------------------------------------------------------- |
| 8.7             | Unstructured extraction                                            |
| 8.8             | Unstructured and structured extraction                             |
| 8.9 or later    | Unstructured extraction, structured extraction, and classification |

On SaaS, providers whose connector secrets aren't set on the cluster can't be selected. To set them up, see [configure IDP](/components/hub/workspace/modeler/idp/idp-configuration.md#configure-idp).

## Work with IDP templates

- **Edit and test**: Open the template file from the Project's file list. It opens in the IDP editor, where you test it with your documents. The LLM model and extraction engine you pick are saved in the template file.
- **Publish**: Publish the template from the IDP editor to make it available in your workspace or organization. Publishing creates a version of the template file.
- **Sync with Git**: Push and pull the template with the rest of the Project. A template pulled from Git into a Project opens in the IDP editor with an empty set of test documents.
