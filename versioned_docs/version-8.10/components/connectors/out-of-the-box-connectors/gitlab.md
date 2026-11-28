---
id: gitlab
title: GitLab connector
sidebar_label: GitLab
description: Manage GitLab issues, releases, branches, repository files, and merge requests from your BPMN process.
---

import OutboundConnectorBasics from '../../../components/react-components/\_connector-outbound-basics.md'
import ErrorHandling from '../../../components/react-components/\_connector-error-handling.md'

Use the GitLab connector to manage issues, releases, branches, repository files, and merge requests in [GitLab](https://about.gitlab.com/) from your BPMN process.

## About this connector

The **GitLab connector** is an outbound connector that calls the [GitLab REST API](https://docs.gitlab.com/ee/api/rest/) on behalf of the user or service account that owns the access token. For example, use it to create an issue when a process step fails, or to open a merge request when an approval completes.

The connector is a protocol connector built on top of the **HTTP REST connector**, so it returns the same [response](/components/connectors/protocol/rest.md#response).

## Prerequisites

To use the **GitLab connector**, you need a GitLab instance and an [access token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html) of a user or a service account on whose behalf the BPMN process runs.

:::note
Use secrets to avoid exposing your GitLab access token as plain text. See [managing secrets](/components/saas/clusters/manage-secrets.md).
:::

<OutboundConnectorBasics />

## Configuration

### HTTP endpoint

Configure the GitLab instance and the credentials the connector uses for all operations.

| Property            | Type   | Required | Description                                                                        | Example                      |
| :------------------ | :----- | :------- | :--------------------------------------------------------------------------------- | :--------------------------- |
| GitLab base URL     | String | Yes      | The base URL of your GitLab instance. Must start with `http://` or `https://`.     | `https://gitlab.example.com` |
| GitLab access token | String | Yes      | The access token used to authenticate requests, sent to GitLab as `PRIVATE-TOKEN`. | `{{secrets.GITLAB_TOKEN}}`   |

## Operations

In the **Operation** section, select an **Operation group**, then select the **Operation** to execute. The available operations depend on the group.

Every operation returns the response of the GitLab API. See [Output](#output).

### Issues

#### Get an issue by ID

Retrieve a single issue. Uses the GitLab API [Single project issue](https://docs.gitlab.com/ee/api/issues.html#single-project-issue).

##### Input parameters

| Property   | Type   | Required | Description                                                                       | Example |
| :--------- | :----- | :------- | :-------------------------------------------------------------------------------- | :------ |
| Project ID | String | Yes      | The global ID or URL-encoded path of the project owned by the authenticated user. |         |
| Issue ID   | String | Yes      | The internal ID of a project's issue.                                             |         |

#### Create an issue

Create a new issue in a project. Uses the GitLab API [New issue](https://docs.gitlab.com/ee/api/issues.html#new-issue).

##### Input parameters

| Property    | Type   | Required | Description                                                                       | Example |
| :---------- | :----- | :------- | :-------------------------------------------------------------------------------- | :------ |
| Project ID  | String | Yes      | The global ID or URL-encoded path of the project owned by the authenticated user. |         |
| Title       | String | Yes      | The title of the issue.                                                           |         |
| Description | Text   | Yes      | The description of the issue.                                                     |         |

#### Delete an issue

Delete an issue from a project. Uses the GitLab API [Delete an issue](https://docs.gitlab.com/ee/api/issues.html#delete-an-issue).

##### Input parameters

| Property   | Type   | Required | Description                                                                       | Example |
| :--------- | :----- | :------- | :-------------------------------------------------------------------------------- | :------ |
| Project ID | String | Yes      | The global ID or URL-encoded path of the project owned by the authenticated user. |         |
| Issue ID   | String | Yes      | The internal ID of a project's issue.                                             |         |

#### Comment to an issue

Add a comment to an issue. Uses the GitLab API [Create new issue note](https://docs.gitlab.com/ee/api/notes.html#create-new-issue-note).

##### Input parameters

| Property                 | Type     | Required | Description                                                                                                                           | Example |
| :----------------------- | :------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------ | :------ |
| Project ID               | String   | Yes      | The global ID or URL-encoded path of the project owned by the authenticated user.                                                     |         |
| Issue ID                 | String   | Yes      | The internal ID of a project's issue.                                                                                                 |         |
| Note text                | Text     | Yes      | The content of the note.                                                                                                              |         |
| Level on confidentiality | Dropdown | Yes      | Sets the `confidential` flag of the note (an internal note): **Confidential** or **Non-confidential**. Default: **Non-confidential**. |         |

#### Search issues

Search for issues across GitLab. Uses the GitLab API [List issues](https://docs.gitlab.com/ee/api/issues.html#list-issues). All input parameters are optional.

##### Input parameters

| Property          | Type     | Required | Description                                                                                                                                                          | Example |
| :---------------- | :------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Scope             | Dropdown | No       | Which issues to return: **All**, **Created by access token owner**, or **Assigned by access token owner**. The default is **All**.                                   |         |
| State             | Dropdown | No       | Return all issues, or only those that are **Opened** or **Closed**. The default is **All**.                                                                          |         |
| Assignee ID       | String   | No       | Return issues assigned to the given user ID. Mutually exclusive with **Assignee username**. `None` returns unassigned issues. `Any` returns issues with an assignee. |         |
| Assignee username | String   | No       | Return issues assigned to the given username. Similar to **Assignee ID** and mutually exclusive with **Assignee ID**.                                                |         |
| Author ID         | String   | No       | Return issues created by the given user ID.                                                                                                                          |         |
| Contains text     | String   | No       | Search issues against their title and description.                                                                                                                   |         |

### Releases

#### List all releases by project ID

List the releases of a project. Uses the GitLab API [List releases](https://docs.gitlab.com/ee/api/releases/#list-releases).

##### Input parameters

| Property   | Type   | Required | Description                                                                       | Example |
| :--------- | :----- | :------- | :-------------------------------------------------------------------------------- | :------ |
| Project ID | String | Yes      | The global ID or URL-encoded path of the project owned by the authenticated user. |         |

#### Get release by a tag name

Retrieve a release by its tag. Uses the GitLab API [Get a release by a tag name](https://docs.gitlab.com/ee/api/releases/#get-a-release-by-a-tag-name).

##### Input parameters

| Property   | Type   | Required | Description                                                                       | Example |
| :--------- | :----- | :------- | :-------------------------------------------------------------------------------- | :------ |
| Project ID | String | Yes      | The global ID or URL-encoded path of the project owned by the authenticated user. |         |
| Tag name   | String | Yes      | The Git tag the release is associated with.                                       |         |

#### Create a release

Create a release in a project. Uses the GitLab API [Create a release](https://docs.gitlab.com/ee/api/releases/#create-a-release).

##### Input parameters

| Property     | Type   | Required | Description                                                                       | Example |
| :----------- | :----- | :------- | :-------------------------------------------------------------------------------- | :------ |
| Project ID   | String | Yes      | The global ID or URL-encoded path of the project owned by the authenticated user. |         |
| Tag name     | String | Yes      | The tag where the release is created from.                                        |         |
| Ref          | String | Yes      | A commit SHA, another tag name, or a branch name.                                 |         |
| Release name | String | No       | The name of the release.                                                          |         |
| Description  | Text   | No       | The description of the release.                                                   |         |

### Branches

#### List repository branches

List the branches of a project. Uses the GitLab API [List repository branches](https://docs.gitlab.com/ee/api/branches.html#list-repository-branches).

##### Input parameters

| Property           | Type   | Required | Description                                                                                                            | Example |
| :----------------- | :----- | :------- | :--------------------------------------------------------------------------------------------------------------------- | :------ |
| Project ID         | String | Yes      | The global ID or URL-encoded path of the project owned by the authenticated user.                                      |         |
| Search string      | String | No       | Return the list of branches containing the search string.                                                              |         |
| Regular expression | String | No       | Return the list of branches with names matching a [re2](https://github.com/google/re2/wiki/Syntax) regular expression. |         |

#### Create repository branch

Create a branch in a project. Uses the GitLab API [Create repository branch](https://docs.gitlab.com/ee/api/branches.html#create-repository-branch).

##### Input parameters

| Property   | Type   | Required | Description                                                                       | Example |
| :--------- | :----- | :------- | :-------------------------------------------------------------------------------- | :------ |
| Project ID | String | Yes      | The global ID or URL-encoded path of the project owned by the authenticated user. |         |
| Name       | String | Yes      | The name of the new branch.                                                       |         |
| Reference  | String | Yes      | The branch name or commit SHA to create the branch from.                          |         |

### Repository files

#### Create new file in repository

Create a file in a project repository. Uses the GitLab API [Create new file in repository](https://docs.gitlab.com/ee/api/repository_files.html#create-new-file-in-repository).

##### Input parameters

| Property            | Type    | Required | Description                                                                            | Example            |
| :------------------ | :------ | :------- | :------------------------------------------------------------------------------------- | :----------------- |
| Project ID          | String  | Yes      | The global ID or URL-encoded path of the project owned by the authenticated user.      |                    |
| Branch name         | String  | Yes      | The name of the new branch to modify the file in. The commit is added to this branch.  |                    |
| Commit message      | String  | Yes      | The message of the commit that modifies the file.                                      |                    |
| File content        | Text    | Yes      | The content of the file.                                                               |                    |
| File path           | String  | Yes      | The URL-encoded full path to the file.                                                 | `lib%2Fclass%2Erb` |
| Author email        | String  | No       | The commit author's email address.                                                     |                    |
| Author name         | String  | No       | The commit author's name.                                                              |                    |
| Encoding            | String  | No       | Change the encoding to `base64`. GitLab's default is `text`.                           |                    |
| Execute file mode   | Boolean | No       | Enables or disables the `execute` flag on the file. The default is `false`.            |                    |
| Start branch        | String  | No       | The name of the base branch to start the new branch from.                              |                    |
| Allow collaboration | Boolean | No       | Allow commits from members who can merge to the target branch. The default is `false`. |                    |

#### Get file from repository

Retrieve a file from a project repository. Uses the GitLab API [Get file from repository](https://docs.gitlab.com/ee/api/repository_files.html#get-file-from-repository).

##### Input parameters

| Property   | Type   | Required | Description                                                                       | Example            |
| :--------- | :----- | :------- | :-------------------------------------------------------------------------------- | :----------------- |
| Project ID | String | Yes      | The global ID or URL-encoded path of the project owned by the authenticated user. |                    |
| File path  | String | Yes      | The URL-encoded full path to the file.                                            | `lib%2Fclass%2Erb` |
| Reference  | String | Yes      | The name of the branch, tag, or commit the file is fetched from.                  |                    |

#### Update existing file in repository

Update a file in a project repository. Uses the GitLab API [Update existing file in repository](https://docs.gitlab.com/ee/api/repository_files.html#update-existing-file-in-repository).

##### Input parameters

| Property          | Type    | Required | Description                                                                           | Example            |
| :---------------- | :------ | :------- | :------------------------------------------------------------------------------------ | :----------------- |
| Project ID        | String  | Yes      | The global ID or URL-encoded path of the project owned by the authenticated user.     |                    |
| Branch name       | String  | Yes      | The name of the new branch to modify the file in. The commit is added to this branch. |                    |
| Commit message    | String  | Yes      | The message of the commit that modifies the file.                                     |                    |
| File content      | Text    | Yes      | The new content of the file.                                                          |                    |
| File path         | String  | Yes      | The URL-encoded full path to the file.                                                | `lib%2Fclass%2Erb` |
| Author email      | String  | No       | The commit author's email address.                                                    |                    |
| Author name       | String  | No       | The commit author's name.                                                             |                    |
| Encoding          | String  | No       | Change the encoding to `base64`. GitLab's default is `text`.                          |                    |
| Execute file mode | Boolean | No       | Enables or disables the `execute` flag on the file. The default is `false`.           |                    |
| Start branch      | String  | No       | The name of the base branch to start the new branch from.                             |                    |

### Merge requests

#### Create merge request

Create a merge request in a project. Uses the GitLab API [Create merge request](https://docs.gitlab.com/ee/api/merge_requests.html#create-mr).

##### Input parameters

| Property             | Type    | Required | Description                                                                                                                                   | Example |
| :------------------- | :------ | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Project ID           | String  | Yes      | The global ID or URL-encoded path of the project owned by the authenticated user.                                                             |         |
| Source branch        | String  | Yes      | The name of the source branch.                                                                                                                |         |
| Target branch        | String  | Yes      | The name of the target branch.                                                                                                                |         |
| Title                | String  | Yes      | The title of the merge request.                                                                                                               |         |
| Assignee IDs         | String  | No       | The IDs of the users to assign the merge request to, as an array of numbers.                                                                  |         |
| Description          | String  | No       | The description of the merge request.                                                                                                         |         |
| Labels               | String  | No       | The labels for the merge request, as a comma-separated list.                                                                                  |         |
| Milestone ID         | String  | No       | The ID of a milestone to assign the merge request to.                                                                                         |         |
| Remove source branch | Boolean | No       | Indicates whether the merge request removes the source branch when merging. The default is `false`.                                           |         |
| Reviewer IDs         | String  | No       | The IDs of the users to set as reviewers of the merge request, as an array of numbers.                                                        |         |
| Squash               | Boolean | No       | Indicates whether commits are squashed into a single commit when merging. Project settings might override this value. The default is `false`. |         |
| Target project ID    | String  | No       | The numeric ID of the target project.                                                                                                         |         |

## Output

The **GitLab connector** is a protocol connector built on top of the **HTTP REST connector**. The response variables (`status`, `headers`, and `body`) are the ones [described for the HTTP REST connector](/components/connectors/protocol/rest.md#response), where `body` contains the JSON returned by the GitLab API for the selected operation.

Use the **Result variable** or **Result expression** properties to map the response into process variables. For example, to keep the issue ID and URL after creating an issue:

```feel
= {
  "issueId": response.body.iid,
  "issueUrl": response.body.web_url
}
```

<ErrorHandling />

## Further resources

- [GitLab REST API documentation](https://docs.gitlab.com/ee/api/rest/)
- [HTTP REST connector](/components/connectors/protocol/rest.md)
