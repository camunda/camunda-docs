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

   Select **Create GitHub App** to finish.

2. In your new application's setting page, navigate to **General > Private keys**, and select **Generate a private key**. This key will be needed for Web Modeler to access your repository.

### Configure GitHub in Web Modeler

- Connect GitHub
- Modal:

  - App Owner:
  - App ID:
  - Private Key:
  - GitHub repository URL:
  - Branch name:

- Click Save Configuration, "Sync with Github" when successful.

## Sync with GitHub

Organization owners and enabled project admins and editors can sync their version of Web Modeler with the connected GitHub repository at any time.

Click "Sync with Github"

Synchronizing with GitHub will create a milestone prior to pushing, and the user has to enter a version tag for the milestone to easily track it though the development lifecycle.

Web Modeler pulls the latest GitHub changes

In the case of a merge conflict, select to keep changes between your local Web Modeler changes and the changes in GitHub

Once the pull is complete and any merge conflicts are resolved, web modeler pushes its changes.

After the successful push the user is able to view the created milestone via a click on **view milestone** within the notification.

## Manage GitHub connections

- Edit configuration at any time by clicking the gear icon beside the "Sync with Github" buttom
- all availableto organization owners
- add permissions to:
  - project admin: On SaaS only changing the `GitHub repository URL field` is allowed, and an info notification is shown:
  - NOTE: project admins can currently edit all fields on self-managed instances of camunda 8
  - project editor: can sync, onli, no edits

## Caveats

Do not use duplicate filenames for the same file type. It will cause problems.

Do not use characters that Git does not like or have a special meaning like ‘/’, which means to Git that this file is in a subfolder.

File synchronization only happens at the root level of the remote repository (because process applications do not allow subfolders). Nothing inside subfolders will be synchronized.

Any .json file is treated as a connector template and the operations will fail if it is not. If the remote repository stores any .json files that are not connector templates, they should be placed in a subfolder

Renaming a file in Web Modeler and modifying/renaming/deleting a file in the remote repository or vice versa will confuse synchronization as it only works with filenames. If this happens, either cancel the operation and resolve it manually in the remote repository, or accept the Web Modeler changes and then manually apply the deleted changes in the remote repository.

When pulling for the first time and already having some commits in the remote repository, the main process must be named like the file in the remote repository which should be used as the main process, because we cannot find out what file in git is the main process otherwise.
