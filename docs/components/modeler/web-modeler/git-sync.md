---
id: git-sync
title: Git sync
description: Connect Web Modeler to your Git repositories to keep your projects synced.
---

Organization owners and administrators can connect their Web Modeler process applications to GitHub, allowing users to keep their Web Modeler, Desktop Modeler, and official version control projects synced.

Once the basic integration is configured by an organization owner or organization administrator, project administrators and editors can use the built-in button to pull changes from GitHub, integrate contributions from Desktop Modeler users, and merge their own work.

## Connect to GitHub

### Create a new GitHub App

Web Modeler requires a GitHub App to sync changes with your GitHub repository.

Follow the [GitHub documentation](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/registering-a-github-app) to create a new GitHub App for your organization or account with the following configuration:

- Under **Webhooks**, deselect **Active**
- Under **Permissions > Repository permissions**, enable **Read and write** for the following options:
  - Commit statuses
  - Contents
  - Pull requests

Click **Create GitHub App** to finish.

### Generate a private key

1. In your new application's setting page, navigate to **General > Private keys**.
2. Select **Generate a private key**. This key is automatically downloaded as a .pem file when created, and can be opened in a text editor to copy and paste the contents into Web Modeler.

### Install the GitHub App

1. In your application's setting page, navigate to **Install app**.
2. Click on the **Install** button for your organization or account.
3. Select **Only select repositories**, and choose the repository to sync with Web Modeler.
4. Once redirected to your application's installation page, copy the **Installation ID** located at the end of the page's URL: `https://github.com/settings/installations/{installation_id}`.

### Configure GitHub in Web Modeler

:::note
An organization administration account (or project administrator in Camunda Self-Managed) is required for the initial GitHub configuration.
:::

1. Within Web Modeler, navigate to the process application you would like to connect to GitHub, and click **Connect GitHub**.

2. Provide the following information in the GitHub Configuration modal:

   - **Installation ID:** Found in the URL of your GitHub App's installation page.
   - **Client ID:** Found in your GitHub App's settings page.
   - **Private Key:** The contents of the .pem file downloaded from your GitHub App's settings page.
   - **GitHub repository URL:** The URL of the repository you would like to sync with.
   - **Branch name:** The branch name to use for merging and managing changes.

3. Click **Save Configuration**.

:::note
When synchronizing for the first time with a remote repository that already contains commits, ensure Web Modeler has assigned the correct main process.
:::

When successful, your project will display a new **Sync with GitHub** button.

![The Sync with GitHub within Web Modeler](./img/git-sync.png)

## Sync with GitHub

:::note
File synchronization only happens at the root level of the remote repository. Files contained in subfolders will not be synchronized.
:::

Organization owners/administrators, project administrators, and project editors can sync their version of Web Modeler with the connected GitHub repository at any time.

1. In your connected process application, click **Sync with GitHub**.
2. Enter a [version number](./process-applications.md#versioning) to create a new milestone for your process application. The new milestone will be created prior to pushing your changes to the central repository.
3. Click **Synchronize**.

In the case of a merge conflict, select between your local Web Modeler changes and the changes in the remote repository to continue.

Once the pull is complete and any merge conflicts are resolved, Web Modeler will push its changes. The newly created milestone is now accessible via the **View milestone** button in the success notification.

## Manage existing configurations

Existing GitHub configurations can be edited from the gear icon beside the **Sync with GitHub** button. Permission to update these settings are limited by the roles within your organization and project.

- **Organization owners/administrators:** Edit and update all configuration options.
- **Project administrators - Self-Managed:** Edit and update all configuration options.
- **Project administrators - SaaS:** Edit and update only the **GitHub repository URL** and **branch name**.
- **Project editors:** Cannot make changes to the GitHub configuration.

## Troubleshooting

- Duplicate file names are not allowed for the same file type.
- Characters with special meaning to Git (for example, `/`), or characters disallowed by Git, are not allowed in either branch or file names.
- Any `.json` file is treated as a Connector template, and the operation will fail if it is not. If the remote repository stores any `.json` files that are not Connector templates, place them in a subfolder to be automatically ignored by the synchronization process.
- When synchronizing for the first time with a remote repository that already contains commits, Web Modeler will attempt to select a main process with a file name that matches its own main process. If there is no matching process, Web Modeler will select a process at random from the available `.bpmn` files. In the event that no `.bpmn` files exist in the remote repository, Web Modeler will not proceed, and will instead display an error message. Ensure the main process is correctly assigned, especially in cases where a random process has been selected.
- Actions which alter the SHA of the commit to which Web Modeler is synced (for example, squash) may cause synchronization errors.
- Timeouts may occur during a sync. In the event of a timeout, close the modal and retry the synchronization.
- A single synchronization action is limited to incorporating a maximum of 250 commits or making changes to up to 300 files, regardless of whether these changes affect the Web Modeler files directly. Be aware that Web Modeler does not provide a notification when these thresholds are exceeded. Should you encounter this limitation, it may be necessary to initiate a fresh synchronization. This can be achieved by either changing the branch or modifying the GitHub repository URL.
