---
id: git-sync
title: Git sync
description: Sync your Git repositories with Web Modeler.
---

Organization owners can connect their Web Modeler projects to GitHub, allowing users to keep their Web Modeler, Desktop Modeler, and official version control projects synced. Once the basic integration is configured by an organization owner, project administrators and editors can use the built-in button to pull changes from GitHub, integrate contributions from Desktop Modeler users, and merge their own work.

## Connect to GitHub

### Create a new GitHub App

Web Modeler requires a GitHub App to sync changes with your GitHub repository.

1. Follow the [GitHub documentation](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/registering-a-github-app) to create a new GitHub App for your organization or account with the following configuration:

   - Under **Webhooks**, delesect **Active**
   - Under **Permissions > Repository permissions**, enable **Read and write** for the following options:
     - Commit statuses
     - Contents
     - Pull requests

   Click **Create GitHub App** to finish.

2. In your new application's setting page, navigate to **General > Private keys**, and select **Generate a private key**. This key will be needed for Web Modeler to access your repository.

### Configure GitHub in Web Modeler

:::note

An organization administration account (or project administrator in Camunda Self-Managed) is required for the initial GitHub configuration.

:::

1. Within Web Modeler, navigate to the process application you would like to connect to GitHub, and click **Connect GitHub**.

2. Provide the following information in the GitHub Configuration modal:
   - **App Owner:** Found in your GitHub App's settings page.
   - **App ID:** Found in your GitHub App's settings page.
   - **Private Key:** Found in your GitHub App's settings page.
   - **GitHub repository URL:** The URL of the repository you would like to sync with.
   - **Branch name:** The branch name to use for merging and managing changes.

Click **Save Configuration**.

When successful, your project will display a new **Sync with GitHub** button.

## Sync with GitHub

:::note
File synchronization only happens at the root level of the remote repository. Files contained in subfolders will not be synchronized.
:::

Organization owners, project administrators, and project editors can sync their version of Web Modeler with the connected GitHub repository at any time.

1. In your connected process application, click **Sync with Github**.
2. Enter a [version number](./process-applications.md#versioning) to create a new milestone for your process application.
3. Click **Synchronize**.

:::note
The new milestone will be created prior to pushing your changes to the central repository.
:::

In the case of a merge conflict, select between your local Web Modeler changes and the changes in the remote repository to continue.

Once the pull is complete and any merge conflicts are resolved, Web Modeler will push its changes. The newly created milestone is now accessible via the **View milestone** button in the success notification.

## Manage existing configurations

Existing GitHub configurations can be edited from the gear icon beside the **Sync with GitHub** button. Permission to update these settings are limited by the roles within your organization.

- **Organization owners/administrators:** Edit and update all configuration options.
- **Project administrators - Self-Managed:** Edit and update all configuration options.
- **Project administrators - SaaS:** Edit and update only the **GitHub repository URL**.
- **Project editors:** Cannot make changes to the GitHub configuration.

## Conventions and troubleshooting

- Duplicate filenames are not allowed for the same file type.
- Characters with special meaning to Git (for example, `/`), or characters disallowed by Git, are not allowed in branch names.
- Any .json file is treated as a connector template, and the operation will fail if it is not. If the remote repository stores any .json files that are not connector templates, place them in a subfolder to be automatically ignored by the synchronization process.
- Renaming a file in Web Modeler and modifying, renaming, or deleting the same file in the remote repository (or vice versa) will result in synchronization errors. If this happens, either:
  - Cancel the operation and resolve it manually in the remote repository
  - Aaccept the Web Modeler changes, and then manually apply the deleted changes in the remote repository
- When synchronizing for the first time with a remote repository that already contains commits, the main process file in the process application must be named to match the main process file in the remote repository.
