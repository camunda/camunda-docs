---
id: gitlab
title: GitLab Connector
sidebar_label: GitLab
description: Manage GitLab issues and releases from your BPMN process. Learn about creating a GitLab Connector task and get started.
---

The **GitLab Connector** is an outbound Connector that allows you to connect your BPMN service with [GitLab](https://about.gitlab.com/) to manage GitLab issues and releases.

## Prerequisites

To use the **GitLab Connector**, you must have a GitLab instance and an [access token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html) of a user
or a service account on whose behalf a BPMN process will be executed.

:::note
Use Camunda secrets to avoid exposing your GitLab access token credentials as plain text. Refer to our documentation on [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.
:::

## Create a GitLab Connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Add endpoint and authentication

In the **HTTP Endpoint** section, provide a **GitLab base URL**, i.e. `https://gitlab.mycorp.com`, and a **GitLab access token**.

## Select operation to execute

The **GitLab Connector** currently supports the following operations.

### Issues

#### Get an issue by ID

- **GitLab API:** [Single project issue](https://docs.gitlab.com/ee/api/issues.html#single-project-issue).
- **Project ID:** The global ID or URL-encoded path of the project owned by the authenticated user.
- **Issue ID:** The internal ID of a project’s issue.

#### Create an issue

- **GitLab API:** [New issue](https://docs.gitlab.com/ee/api/issues.html#new-issue).
- **Project ID:** The global ID or URL-encoded path of the project owned by the authenticated user.
- **Title:** The title of an issue.
- **Description:** The description of an issue.

#### Delete an issue

- **GitLab API:** [Delete an issue](https://docs.gitlab.com/ee/api/issues.html#delete-an-issue).
- **Project ID:** The global ID or URL-encoded path of the project owned by the authenticated user.
- **Issue ID:** The internal ID of a project’s issue.

#### Comment to an issue

- **GitLab API:** [Create a new issue note](https://docs.gitlab.com/ee/api/notes.html#create-new-issue-note).
- **Project ID:** The global ID or URL-encoded path of the project owned by the authenticated user.
- **Issue ID:** The internal ID of a project’s issue.
- **Note text:** The content of a note.
- **Level of confidentiality:** Indicates if an issue has to be marked as **internal** or not.

#### Search issues

- **GitLab API:** [List issues](https://docs.gitlab.com/ee/api/issues.html#list-issues).
- **Scope:** Return issues for the given scope: **Created by me**, **Assigned to me**, or **all**.
- **State:** Return all issues or just those that are **opened** or **closed**.
- **Assignee ID:** Return issues assigned to the given user ID. Mutually exclusive with **Assignee username**. **None** returns unassigned issues. **Any** returns issues with an assignee.
- **Assignee username:** Return issues assigned to the given username. Similar to **Assignee ID** and mutually exclusive with **Assignee ID**.
- **Author ID:** Return issues created by the given user ID.
- **Contains text:** Search issues against their **Title** and **Description**.

### Releases

#### List all releases by a project ID

- **GitLab API:** [List releases](https://docs.gitlab.com/ee/api/releases/#list-releases).
- **Project ID:** The global ID or URL-encoded path of the project owned by the authenticated user.

#### Get release by a tag name

- **GitLab API:** [Get a release by a tag name](https://docs.gitlab.com/ee/api/releases/#get-a-release-by-a-tag-name).
- **Project ID:** The global ID or URL-encoded path of the project owned by the authenticated user.
- **Tag name:** The Git tag the release is associated with.

#### Create a release

- **GitLab API:** [Create a release](https://docs.gitlab.com/ee/api/releases/#create-a-release).
- **Project ID:** The global ID or URL-encoded path of the project owned by the authenticated user.
- **Tag name:** The tag where the release is created from.
- **Ref:** A commit SHA, another tag name, or a branch name.
- **Release name:** The release name.
- **Description:** The description of the release.

### Branches

#### List repository branches

- **GitLab API:** [List repository branches](https://docs.gitlab.com/ee/api/branches.html#list-repository-branches).
- **Project ID:** The global ID or URL-encoded path of the project owned by the authenticated user.
- **Search String:** Return list of branches containing the search string.
- **Regular Expression:** Return list of branches with names matching a [re2](https://github.com/google/re2/wiki/Syntax) regular expression.

### Create repository branch

- **GitLab API:** [Create repository branch](https://docs.gitlab.com/ee/api/branches.html#create-repository-branch).
- **Project ID:** The global ID or URL-encoded path of the project owned by the authenticated user.
- **Name:** The name of the new branch.
- **Reference:** The branch name or commit SHA to create the branch from.

### Repository files

#### Create new file in repository

- **GitLab API:** [Create new file in repository](https://docs.gitlab.com/ee/api/repository_files.html#create-new-file-in-repository).
- **Project ID:** The global ID or URL-encoded path of the project owned by the authenticated user.
- **Branch name:** Name of the new branch to create the file in. The commit is added to this branch.
- **Commit message:** Message of the commit that adds the new file.
- **Content:** The content of the new file.
- **File path:** URL-encoded full path to new file. For example, `lib%2Fclass%2Erb`.
- **Author email:** The commit author's email address.
- **Author name:** The commit author's name.
- **Encoding:** The encoding of the content. GitLab's default is `text`.
- **Execute file mode:** Enables or disables the `execute` flag on the file.
- **Start branch:** The branch to start the new branch from.
- **Allow collaboration:** Allow commits from members who can merge to the target branch.

## Merge requests

### Create merge request

- **GitLab API:** [Create merge request](https://docs.gitlab.com/ee/api/merge_requests.html#create-mr).
- **Project ID:** The global ID or URL-encoded path of the project owned by the authenticated user.
- **Source branch:** Name of the source branch.
- **Target branch:** Name of the target branch.
- **Title:** Title of the merge request.
- **Assignee IDs:** The IDs of the users to assign the merge request to as an array of numbers.
- **Description:** Description of the merge request.
- **Labels:** Comma-separated list of label names for the merge request.
- **Milestone ID:** The ID of a milestone to assign the merge request to.
- **Remove source branch:** Flag indicating if a merge request should remove the source branch when merging.
- **Reviewer IDs:** The ID of the users to set as reviewers of the merge request as an array of numbers.
- **Squash:** Flag indicating if commits should be squashed into a single commit when merging.
- **Target project ID:** Numeric ID of the target project.

## Handle Connector response

The **GitLab Connector** is a protocol Connector, meaning it is built on top of the **HTTP REST Connector**, therefore
handling response is still applicable [as described](/components/connectors/protocol/rest.md#response).
