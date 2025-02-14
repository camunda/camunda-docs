---
id: git-sync
title: Git sync
description: Connect Web Modeler to your Git repositories to keep your projects synced.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Organization owners and administrators can connect their Web Modeler process applications to GitHub and GitLab, allowing users to keep their Web Modeler, Desktop Modeler, and official version control projects synced.

Once the connection is configured by an organization owner or organization administrator, project administrators and editors can use the built-in button to pull changes from the remote repository, integrate contributions from Desktop Modeler users, and merge their own work.

## Connect to a remote repository

Select your Git repository host:

<Tabs groupId="platform" defaultValue="github" queryString values={
[
{label: 'GitHub', value: 'github' },
{label: 'GitLab', value: 'gitlab' },
]}>

<TabItem value='github'>

<h3> Create a new GitHub App </h3>

Web Modeler requires a GitHub App to sync changes with your GitHub repository.

Follow the [GitHub documentation](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/registering-a-github-app) to create a new GitHub App for your organization or account with the following configuration:

- Under **Webhooks**, deselect **Active**
- Under **Permissions > Repository permissions**, enable **Read and write** for the following options:
  - Commit statuses
  - Contents
  - Pull requests

Click **Create GitHub App** to finish.

<h3> Generate a private key </h3>

1. In your new application's setting page, navigate to **General > Private keys**.
2. Select **Generate a private key**. This key is automatically downloaded as a .pem file when created, and can be opened in a text editor to copy and paste the contents into Web Modeler.

<h3> Install the GitHub App </h3>

1. In your application's setting page, navigate to **Install app**.
2. Click on the **Install** button for your organization or account.
3. Select **Only select repositories**, and choose the repository to sync with Web Modeler.
4. Once redirected to your application's installation page, copy the **Installation ID** located at the end of the page's URL: `https://github.com/settings/installations/{installation_id}`.

<h3> Configure GitHub in Web Modeler </h3>

:::note
When using a self-hosted GitHub instance, ensure the environment variable `CAMUNDA_MODELER_GITSYNC_GITHUB_BASEURL` is set to the API URL of your self-hosted GitHub instance. It usually looks like `http(s)://HOSTNAME/api/v3`. Refer to [GitHub documentation](https://docs.github.com/en/enterprise-server@3.15/rest/enterprise-admin?apiVersion=2022-11-28#endpoint-urls) and choose the correct enterprise server version.
:::

1. Within Web Modeler, navigate to the process application you would like to connect to GitHub, and click **Connect repository**.

2. Select the **GitHub** tile (if not already selected), located at the top of the modal.

3. Provide the following information in the **Configure GitHub** modal:

   - **Installation ID:** Found in the URL of your GitHub App's installation page.
   - **Client ID:** Found in your GitHub App's settings page. You can also use Application ID as an alternative. (If you are using GitHub Enterprise Server 3.13 or prior, Application ID is required.)
   - **Private Key:** The contents of the .pem file downloaded from your GitHub App's settings page.
   - **GitHub repository URL:** The base URL of the repository you want to sync with, for example `https://github.com/camunda/example-repo`. The URL cannot contain the `.git` extension or a folder path.
   - **Branch name:** The branch name to use for merging and managing changes.
   - **Path:** (optional) The path to the folder containing your process application files. If left empty, Web Modeler syncs with the root of the repository. This path is automatically created if it does not exist.

4. Click **Open repository** to test your configuration. The repository for the provided branch and optional path opens in a new tab.

5. Click **Save Configuration**.

:::note
When synchronizing for the first time with a remote repository that already contains commits, ensure Web Modeler has assigned the correct main process.
:::

When successful, your project will display a new **Sync with GitHub** button.

![The Sync with GitHub within Web Modeler](./img/git-sync.png)

</TabItem>
<TabItem value='gitlab'>

<h3> Create a new access token </h3>

Web Modeler requires an access token to sync changes with your GitLab repository. You can use the following options:

- **Project access token** (Recommended)
- Group access token
- Personal access token

Follow the [GitLab documentation](https://docs.gitlab.com/ee/user/project/settings/project_access_tokens.html#create-a-project-access-token) to generate a new project access token for your repository with the following configuration:

- Enable the following [**scopes**](https://docs.gitlab.com/ee/user/project/settings/project_access_tokens.html#scopes-for-a-project-access-token) for either the `developer` or `maintainer` role:
  - `api`
  - `read_api`
  - `read_repository`
  - `write_repository`

<h3> Get the project ID </h3>

1. Navigate to your GitLab project.
2. Click the menu icon in the top right corner and select **Copy project ID**.

<h3> Configure GitLab in Web Modeler </h3>

:::note
When using a self-hosted GitLab instance, ensure the environment variable `CAMUNDA_MODELER_GITSYNC_GITLAB_BASEURL` is set to the API URL of your self-hosted GitLab instance. It usually looks like `http(s)://HOSTNAME/api/v4`.
:::

1. Within Web Modeler, navigate to the process application you would like to connect to GitLab, and click **Connect repository**.

2. Select the **GitLab** tile, located at the top of the modal.

3. Provide the following information in the **Configure GitLab** modal:

   - **Access token:** The generated project, group or personal access token.
   - **Project ID:** The ID copied from the GitLab project settings.
   - **GitLab repository URL:** The base URL of the repository you want to sync with, for example `https://gilab.com/camunda/example-repo`. The URL cannot contain the `.git` extension or a folder path.
   - **Branch name:** The branch name to use for merging and managing changes.
   - **Path:** (optional) The path to the folder containing your process application files. If left empty, Web Modeler syncs with the root of the repository. This path is automatically created if it does not exist.

4. Click **Open repository** to test your configuration. The repository for the provided branch and optional path opens in a new tab.

5. Click **Save Configuration**.

:::note
When synchronizing for the first time with a remote repository that already contains commits, ensure Web Modeler has assigned the correct main process.
:::

When successful, your project will display a new **Sync with GitLab** button.

</TabItem>
</Tabs>

## Sync with remote repository

Organization owners/administrators, project administrators, and project editors can sync their version of Web Modeler with the connected repository at any time.

1. In your connected process application, click **Sync with GitHub** or **Sync with GitLab**.
2. Enter a [version number](./process-applications.md#versioning) to create a new milestone for your process application. The new milestone will be created prior to pushing your changes to the central repository.
3. Click **Synchronize**.

In the case of a merge conflict, select between your local Web Modeler changes and the changes in the remote repository to continue.

Once the pull is complete and any merge conflicts are resolved, Web Modeler will push its changes. The newly created milestone is now accessible via the **View milestone** button in the success notification.

## Manage existing configurations

Existing Git configurations can be edited from the gear icon beside the **Sync with GitHub** or **Sync with GitLab** button. Permission to update these settings are limited to **project administrators**.

## Change Git provider

To switch from GitHub to GitLab, or vice versa, update your configuration with the following steps:

1. Disconnect your current Git provider by clicking the gear icon beside the **Sync with GitHub** or **Sync with GitLab** button, and clicking the **Delete provider connection** button at the bottom of the modal.
2. After confirming the operation, open the **Connect repository** modal and provide the necessary information for the new Git provider, following the steps outlined for [GitHub](./git-sync.md?platform=github#connect-to-a-remote-repository) or [GitLab](./git-sync.md?platform=gitlab#connect-to-a-remote-repository).

## Advanced use cases

Git sync supports a variety of development workflows, including the following advanced use cases.

### Monorepos

A monorepo is a single repository containing multiple logical projects that each have disparate workflows and release cadences.

To set up Git sync with a monorepo, you can specify the **path** to your project during the configuration. This allows you to keep multiple projects in one repository, each with its own sync configuration.

:::note
If you are using Git sync to work with monorepos, you should pull changes regularly, as the GitHub API is limited to a fixed amount of files and commits per synchronization action. See [troubleshooting](#troubleshooting) for more information.
:::

### Parallel feature development

Git sync supports parallel feature development by allowing multiple process applications to be connected to different feature branches. This allows teams to work on multiple features simultaneously without interfering with each other's work.

To use Git sync for parallel feature development:

1. Create a new [process application](/docs/components/modeler/web-modeler/create-a-process-application.md) in Modeler for each active feature branch you want to develop.
2. Configure Git sync for each instance by connecting it to the corresponding feature branch in your repository.
3. Work on your feature in Modeler, using **Sync with GitHub** or **Sync with GitLab** to pull and push changes as needed.
4. Once the feature is complete and merged into the main branch, you can delete the process application associated with the feature branch.

To perform hotfixes or patches of production or production-bound processes, sync a copy of the process application to the `main` branch.

:::caution
Creating multiple copies of a process application can complicate navigation and deployment if you have multiple files with the same ID in a project. To avoid this, you can create copies of the process application in different projects.
:::

## Self-Managed environment variables

The following environment variables can be set to configure the Git sync feature in a self-managed environment:

| Provider      | Variable                                     | Description                                                                                                                   | Default                     |
| ------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| All providers | `CAMUNDA_MODELER_GITSYNC_MAX_FILES`          | Maximum allowed files for sync operations.                                                                                    | `50`                        |
| All providers | `CAMUNDA_MODELER_GITSYNC_MAX_IN_MEMORY_SIZE` | Maximum memory size that can be processed by calls to the git provider. This limits the maximum file size that can be synced. | `4MB`                       |
| GitHub        | `CAMUNDA_MODELER_GITSYNC_GITHUB_BASEURL`     | The base URL of your self-hosted GitHub instance.                                                                             | `https://api.github.com`    |
| GitLab        | `CAMUNDA_MODELER_GITSYNC_GITLAB_BASEURL`     | The base URL of your self-hosted GitLab instance.                                                                             | `https://gitlab.com/api/v4` |

## Troubleshooting

- Duplicate file names are not allowed for the same file type.
- Characters with special meaning to Git (for example, `/`), or characters disallowed by Git, are not allowed in either branch or file names.
- Any `.json` file is treated as a Connector template, and the operation will fail if it is not. If the remote repository stores any `.json` files that are not Connector templates, place them in a subfolder to be automatically ignored by the synchronization process.
- When synchronizing for the first time with a remote repository that already contains commits, Web Modeler will attempt to select a main process with a file name that matches its own main process. If there is no matching process, Web Modeler will select a process at random from the available `.bpmn` files. In the event that no `.bpmn` files exist in the remote repository, Web Modeler will not proceed, and will instead display an error message. Ensure the main process is correctly assigned, especially in cases where a random process has been selected.
- Actions which alter the SHA of the commit to which Web Modeler is synced (for example, squash) may cause synchronization errors.
- Timeouts may occur during a sync. In the event of a timeout, close the modal and retry the synchronization.
- Using self-hosted instances of Git providers may require additional configuration. Refer to the Web Modeler configuration part for your [git host](#connect-to-a-remote-repository) and available [environment variables](#self-managed-environment-variables) for more details.
- **(GitHub specific)** A single synchronization action is limited to incorporating a maximum of 250 commits or making changes to up to 300 files, regardless of whether these changes affect the Web Modeler files directly. Web Modeler does not provide a notification when these thresholds are exceeded. Should you encounter this limitation, it may be necessary to initiate a fresh synchronization. A fresh synchronization fetches all the files in the repository without relying on the incremental changes, thus bypassing the limitations. This can be achieved by either changing the branch or modifying the GitHub repository URL.
