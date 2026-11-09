---
id: github-outbound
title: GitHub connector
sidebar_label: GitHub outbound
description: Manage GitHub issues, pull requests, branches, releases, and more from your BPMN process.
---

import ConnectorTask from '../../../components/react-components/connector-task.md'

Use the GitHub outbound connector to manage issues, pull requests, branches, releases, and other resources in [GitHub](https://github.com/) from your BPMN process.

## About this connector

The **GitHub outbound connector** calls the [GitHub REST API](https://docs.github.com/en/rest) on behalf of a user or a GitHub App. You select an operation group and an operation type, for example **Issues** and **Create an issue**, and the connector sends the request to GitHub and returns the response. For example, use it to create an issue when a process step fails, or to trigger a GitHub Actions workflow from your process.

The connector is built on the [REST connector](/components/connectors/protocol/rest.md). To start or continue a process when a GitHub event occurs, use the [GitHub inbound connector](./github-inbound.md).

## Prerequisites

To use the **GitHub outbound connector**, you need a GitHub instance and either an [access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) of a user or a service account on whose behalf the process runs, or a [GitHub App](https://docs.github.com/en/apps/creating-github-apps/about-creating-github-apps). A personal access token needs the repository and workflow scopes.

:::note
Use Camunda secrets to avoid exposing your GitHub access token credentials as plain text.
Refer to our documentation on [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.
:::

## Create a GitHub outbound connector task

<ConnectorTask />

## Configuration

### Authentication

| Property              | Type     | Required                                                     | Description                                                                                                                                                                                                                                                                       | Example |
| :-------------------- | :------- | :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Authentication type   | Dropdown | Yes                                                          | The authentication method: **Personal Access Token** or **GitHub App**. The default is **Personal Access Token**.                                                                                                                                                                 |         |
| GitHub personal token | String   | Yes, if **Authentication type** is **Personal Access Token** | Your personal access token. It needs the repository and workflow scopes. Use a secret to store this value securely.                                                                                                                                                               |         |
| Private Key           | String   | Yes, if **Authentication type** is **GitHub App**            | The private key of your GitHub App. Use a [secret](/components/console/manage-clusters/manage-secrets.md) to store this value securely.                                                                                                                                           |         |
| App ID                | String   | Yes, if **Authentication type** is **GitHub App**            | The ID of your GitHub App.                                                                                                                                                                                                                                                        |         |
| Installation ID       | String   | Yes, if **Authentication type** is **GitHub App**            | The installation ID of your GitHub App. Refer to the [GitHub documentation](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation#generating-an-installation-access-token) to learn how to obtain it. |         |

### Connection

| Property           | Type   | Required | Description                                                                                                                                                      | Example |
| :----------------- | :----- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Connection timeout | String | No       | The time in seconds to wait to establish a connection, or `0` for an infinite timeout. It accepts a number of seconds or a FEEL expression. The default is `20`. |         |

## Operations

Select an **Operation group** and an **Operation type**. The **Configuration** and **Input** properties depend on the operation you select. The connector supports the following operation groups: **Actions**, **Branches**, **Code scanning**, **Collaborators**, **Issues**, **Labels**, **Pulls**, **References**, **Releases**, and **Repositories**.

The connector returns the GitHub API response. The **Result expression** can access it as `response`, which has the same structure as the [REST connector response](/components/connectors/protocol/rest.md#response). Use `response.body` to access the content that GitHub returns. For example, the following **Result expression** stores the number and URL of a newly created issue:

```feel
= {
  issueNumber: response.body.number,
  issueUrl: response.body.html_url
}
```

### Create a workflow dispatch event

Trigger a GitHub Actions workflow through a workflow dispatch event. Select **Actions** as the **Operation group**. GitHub API: [Create a workflow dispatch event](https://docs.github.com/en/rest/actions/workflows?apiVersion=2022-11-28#create-a-workflow-dispatch-event).

#### Input parameters

| Property        | Type   | Required | Description                                                                                             | Example |
| :-------------- | :----- | :------- | :------------------------------------------------------------------------------------------------------ | :------ |
| Owner           | String | Yes      | The account owner of the repository. The name isn't case-sensitive.                                     |         |
| Repository      | String | Yes      | The name of the repository. The name isn't case-sensitive.                                              |         |
| Git reference   | String | Yes      | The branch or tag name for the workflow.                                                                |         |
| Workflow ID     | String | Yes      | The ID of the workflow. You can also pass the workflow file name as a string.                           |         |
| Workflow inputs | Text   | No       | An object with up to 10 key-value pairs. The workflow file configures the inputs. The default is `={}`. |         |

#### Output

The connector returns the GitHub API response. The connector template doesn't show a **Result expression** field for this operation. Use **Result variable** to keep the response.

### Get a branch

Get the details of a branch. Select **Branches** as the **Operation group**. GitHub API: [Get a branch](https://docs.github.com/en/rest/branches/branches?apiVersion=2022-11-28#get-a-branch).

#### Input parameters

| Property    | Type   | Required | Description                                                                                                                    | Example |
| :---------- | :----- | :------- | :----------------------------------------------------------------------------------------------------------------------------- | :------ |
| Owner       | String | Yes      | The account owner of the repository. The name isn't case-sensitive.                                                            |         |
| Repository  | String | Yes      | The name of the repository. The name isn't case-sensitive.                                                                     |         |
| Branch name | String | Yes      | The name of the branch. It can't contain wildcard characters. To use wildcard characters in branch names, use the GraphQL API. |         |

#### Output

The connector returns the GitHub API response. The default **Result expression** is `={branch: response.body}`.

### List branches

List the branches of a repository. Select **Branches** as the **Operation group**. GitHub API: [List branches](https://docs.github.com/en/rest/branches/branches?apiVersion=2022-11-28#list-branches).

#### Input parameters

| Property   | Type   | Required | Description                                                         | Example |
| :--------- | :----- | :------- | :------------------------------------------------------------------ | :------ |
| Owner      | String | Yes      | The account owner of the repository. The name isn't case-sensitive. |         |
| Repository | String | Yes      | The name of the repository. The name isn't case-sensitive.          |         |

#### Output

The connector returns the GitHub API response. The default **Result expression** is `={branchList: response.body}`.

### Merge a branch

Merge a branch into another branch of a repository. Select **Branches** as the **Operation group**. GitHub API: [Merge a branch](https://docs.github.com/en/rest/branches/branches?apiVersion=2022-11-28#merge-a-branch).

#### Input parameters

| Property       | Type   | Required | Description                                                                            | Example |
| :------------- | :----- | :------- | :------------------------------------------------------------------------------------- | :------ |
| Owner          | String | Yes      | The account owner of the repository. The name isn't case-sensitive.                    |         |
| Repository     | String | Yes      | The name of the repository. The name isn't case-sensitive.                             |         |
| Base           | String | Yes      | The name of the base branch that the head is merged into.                              |         |
| Head           | String | Yes      | The head to merge. This can be a branch name or a commit SHA1.                         |         |
| Commit message | String | No       | The commit message of the merge commit. If you omit it, GitHub uses a default message. |         |

#### Output

The connector returns the GitHub API response. The connector template doesn't show a **Result expression** field for this operation. Use **Result variable** to keep the response.

### List code scanning alerts for an organization

List the code scanning alerts of an organization. Select **Code scanning** as the **Operation group**. GitHub API: [List code scanning alerts for an organization](https://docs.github.com/en/rest/code-scanning?apiVersion=2022-11-28#list-code-scanning-alerts-for-an-organization).

#### Input parameters

| Property          | Type   | Required | Description                                                  | Example |
| :---------------- | :----- | :------- | :----------------------------------------------------------- | :------ |
| Organization name | String | Yes      | The name of the organization. The name isn't case-sensitive. |         |

#### Output

The connector returns the GitHub API response. The connector template doesn't show a **Result expression** field for this operation. Use **Result variable** to keep the response.

### List code scanning alerts for a repository

List the code scanning alerts of a repository. Select **Code scanning** as the **Operation group**. GitHub API: [List code scanning alerts for a repository](https://docs.github.com/en/rest/code-scanning?apiVersion=2022-11-28#list-code-scanning-alerts-for-a-repository).

#### Input parameters

| Property   | Type   | Required | Description                                                         | Example |
| :--------- | :----- | :------- | :------------------------------------------------------------------ | :------ |
| Owner      | String | Yes      | The account owner of the repository. The name isn't case-sensitive. |         |
| Repository | String | Yes      | The name of the repository. The name isn't case-sensitive.          |         |

#### Output

The connector returns the GitHub API response. The connector template doesn't show a **Result expression** field for this operation. Use **Result variable** to keep the response.

### List repository collaborators

List the collaborators of a repository. Select **Collaborators** as the **Operation group**. GitHub API: [List repository collaborators](https://docs.github.com/en/rest/collaborators/collaborators?apiVersion=2022-11-28#list-repository-collaborators).

#### Input parameters

| Property                       | Type    | Required | Description                                                                       | Example |
| :----------------------------- | :------ | :------- | :-------------------------------------------------------------------------------- | :------ |
| Owner                          | String  | Yes      | The account owner of the repository. The name isn't case-sensitive.               |         |
| Repository                     | String  | Yes      | The name of the repository. The name isn't case-sensitive.                        |         |
| Include anonymous contributors | Boolean | Yes      | Whether to include anonymous contributors in the results. The default is `false`. |         |
| Page                           | Number  | Yes      | The page number of the results to fetch. The default is `1`.                      |         |
| Results per page               | Number  | Yes      | The number of results to include per page. The default is `30`.                   |         |

#### Output

The connector returns the GitHub API response. The default **Result expression** is `={collaboratorsList: response.body}`.

### Create an issue

Create an issue in a repository. Select **Issues** as the **Operation group**. GitHub API: [Create an issue](https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#create-an-issue).

#### Input parameters

| Property   | Type   | Required | Description                                                                                                                                                                  | Example |
| :--------- | :----- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Owner      | String | Yes      | The account owner of the repository. The name isn't case-sensitive.                                                                                                          |         |
| Repository | String | Yes      | The name of the repository. The name isn't case-sensitive.                                                                                                                   |         |
| Title      | String | Yes      | The title of the issue.                                                                                                                                                      |         |
| Body       | Text   | No       | The contents of the issue.                                                                                                                                                   |         |
| Assignees  | String | No       | A FEEL expression that returns an array of logins for the users to assign to the issue. Only users with push access can set assignees. GitHub silently drops them otherwise. |         |
| Labels     | String | No       | A FEEL expression that returns an array of labels to associate with the issue. Only users with push access can set labels. GitHub silently drops them otherwise.             |         |
| Milestone  | String | No       | The number of the milestone to associate the issue with. Only users with push access can set the milestone. GitHub silently drops milestone changes otherwise.               |         |

#### Output

The connector returns the GitHub API response. The default **Result expression** is `={createdIssue: response.body}`.

### Create an issue comment

Add a comment to an issue. Select **Issues** as the **Operation group**. GitHub API: [Create an issue comment](https://docs.github.com/en/rest/issues/comments?apiVersion=2022-11-28#create-an-issue-comment).

#### Input parameters

| Property     | Type   | Required | Description                                                         | Example |
| :----------- | :----- | :------- | :------------------------------------------------------------------ | :------ |
| Owner        | String | Yes      | The account owner of the repository. The name isn't case-sensitive. |         |
| Repository   | String | Yes      | The name of the repository. The name isn't case-sensitive.          |         |
| Issue number | Number | Yes      | The number that identifies the issue.                               |         |
| Body         | Text   | Yes      | The contents of the comment.                                        |         |

#### Output

The connector returns the GitHub API response. The connector template doesn't show a **Result expression** field for this operation. Use **Result variable** to keep the response.

### Get an issue

Get the details of an issue. Select **Issues** as the **Operation group**. GitHub API: [Get an issue](https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#get-an-issue).

#### Input parameters

| Property     | Type   | Required | Description                                                         | Example |
| :----------- | :----- | :------- | :------------------------------------------------------------------ | :------ |
| Owner        | String | Yes      | The account owner of the repository. The name isn't case-sensitive. |         |
| Repository   | String | Yes      | The name of the repository. The name isn't case-sensitive.          |         |
| Issue number | Number | Yes      | The number that identifies the issue.                               |         |

#### Output

The connector returns the GitHub API response. The default **Result expression** is `={issues: response.body}`.

### List commits

List the commits of a repository. Select **Issues** as the **Operation group**. GitHub API: [List commits](https://docs.github.com/en/rest/commits/commits?apiVersion=2022-11-28#list-commits).

#### Input parameters

| Property   | Type   | Required | Description                                                         | Example |
| :--------- | :----- | :------- | :------------------------------------------------------------------ | :------ |
| Owner      | String | Yes      | The account owner of the repository. The name isn't case-sensitive. |         |
| Repository | String | Yes      | The name of the repository. The name isn't case-sensitive.          |         |

#### Output

The connector returns the GitHub API response. The default **Result expression** is `={commitList: response.body}`.

### Search issues and pull requests

Search for issues and pull requests across GitHub. Select **Issues** as the **Operation group**. GitHub API: [Search issues and pull requests](https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28#search-issues-and-pull-requests).

#### Input parameters

| Property | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Example |
| :------- | :----- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Query    | String | Yes      | The query contains one or more search keywords and qualifiers. Qualifiers limit your search to specific areas of GitHub. The GitHub REST API supports the same qualifiers as the GitHub web interface. Learn more about the [query format](https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28#constructing-a-search-query) and the [qualifiers for issues and pull requests](https://docs.github.com/en/search-github/searching-on-github/searching-issues-and-pull-requests). |         |

#### Output

The connector returns the GitHub API response. The default **Result expression** is `={searchedIssueList: response.body.items}`.

### Update an issue

Update an existing issue. Select **Issues** as the **Operation group**. GitHub API: [Update an issue](https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#update-an-issue).

#### Input parameters

| Property     | Type     | Required | Description                                                                                                                                                                  | Example |
| :----------- | :------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Owner        | String   | Yes      | The account owner of the repository. The name isn't case-sensitive.                                                                                                          |         |
| Repository   | String   | Yes      | The name of the repository. The name isn't case-sensitive.                                                                                                                   |         |
| Issue number | Number   | Yes      | The number that identifies the issue.                                                                                                                                        |         |
| Title        | String   | No       | The title of the issue.                                                                                                                                                      |         |
| Body         | Text     | No       | The contents of the issue.                                                                                                                                                   |         |
| Assignees    | String   | No       | A FEEL expression that returns an array of logins for the users to assign to the issue. Only users with push access can set assignees. GitHub silently drops them otherwise. |         |
| Labels       | String   | No       | A FEEL expression that returns an array of labels to associate with the issue. Only users with push access can set labels. GitHub silently drops them otherwise.             |         |
| Milestone    | String   | No       | The number of the milestone to associate the issue with. Only users with push access can set the milestone. GitHub silently drops milestone changes otherwise.               |         |
| Issue state  | Dropdown | Yes      | The state of the issue: **Open** or **Closed**. The default is **Open**.                                                                                                     |         |
| State reason | Dropdown | Yes      | The reason for the state change: **Completed**, **Not planned**, or **Reopened**. GitHub ignores it unless the state changes. The default is **Completed**.                  |         |

#### Output

The connector returns the GitHub API response. The default **Result expression** is `={updatedIssue: response.body}`.

### Create a label

Create a label in a repository. Select **Labels** as the **Operation group**. GitHub API: [Create a label](https://docs.github.com/en/rest/issues/labels?apiVersion=2022-11-28#create-a-label).

#### Input parameters

| Property    | Type   | Required | Description                                                                              | Example  |
| :---------- | :----- | :------- | :--------------------------------------------------------------------------------------- | :------- |
| Owner       | String | Yes      | The account owner of the repository. The name isn't case-sensitive.                      |          |
| Repository  | String | Yes      | The name of the repository. The name isn't case-sensitive.                               |          |
| Label name  | String | Yes      | The name of the label.                                                                   |          |
| Color       | String | Yes      | A 6-character hex code, without the leading `#`, that identifies the color of the label. | `ff0000` |
| Description | String | No       | A short description of the label.                                                        |          |

#### Output

The connector returns the GitHub API response. The default **Result expression** is `={createdLabel: response.body}`.

### Delete a label

Delete a label from a repository. Select **Labels** as the **Operation group**. GitHub API: [Delete a label](https://docs.github.com/en/rest/issues/labels?apiVersion=2022-11-28#delete-a-label).

#### Input parameters

| Property   | Type   | Required | Description                                                         | Example |
| :--------- | :----- | :------- | :------------------------------------------------------------------ | :------ |
| Owner      | String | Yes      | The account owner of the repository. The name isn't case-sensitive. |         |
| Repository | String | Yes      | The name of the repository. The name isn't case-sensitive.          |         |
| Label name | String | Yes      | The name of the label.                                              |         |

#### Output

The connector returns the GitHub API response. The connector template doesn't show a **Result expression** field for this operation. Use **Result variable** to keep the response.

### Get a label

Get the details of a label. Select **Labels** as the **Operation group**. GitHub API: [Get a label](https://docs.github.com/en/rest/issues/labels?apiVersion=2022-11-28#get-a-label).

#### Input parameters

| Property   | Type   | Required | Description                                                         | Example |
| :--------- | :----- | :------- | :------------------------------------------------------------------ | :------ |
| Owner      | String | Yes      | The account owner of the repository. The name isn't case-sensitive. |         |
| Repository | String | Yes      | The name of the repository. The name isn't case-sensitive.          |         |
| Label name | String | Yes      | The name of the label.                                              |         |

#### Output

The connector returns the GitHub API response. The default **Result expression** is `={label: response.body}`.

### List labels

List the labels of a repository. Select **Labels** as the **Operation group**. GitHub API: [List labels](https://docs.github.com/en/rest/issues/labels?apiVersion=2022-11-28#list-labels-for-a-repository).

#### Input parameters

| Property   | Type   | Required | Description                                                         | Example |
| :--------- | :----- | :------- | :------------------------------------------------------------------ | :------ |
| Owner      | String | Yes      | The account owner of the repository. The name isn't case-sensitive. |         |
| Repository | String | Yes      | The name of the repository. The name isn't case-sensitive.          |         |

#### Output

The connector returns the GitHub API response. The default **Result expression** is `={labelsList: response.body}`.

### Update a label

Update an existing label. Select **Labels** as the **Operation group**. GitHub API: [Update a label](https://docs.github.com/en/rest/issues/labels?apiVersion=2022-11-28#update-a-label).

#### Input parameters

| Property       | Type   | Required | Description                                                                              | Example  |
| :------------- | :----- | :------- | :--------------------------------------------------------------------------------------- | :------- |
| Owner          | String | Yes      | The account owner of the repository. The name isn't case-sensitive.                      |          |
| Repository     | String | Yes      | The name of the repository. The name isn't case-sensitive.                               |          |
| Label name     | String | Yes      | The name of the label.                                                                   |          |
| New label name | String | No       | The new name of the label.                                                               |          |
| Color          | String | Yes      | A 6-character hex code, without the leading `#`, that identifies the color of the label. | `ff0000` |
| Description    | String | No       | A short description of the label.                                                        |          |

#### Output

The connector returns the GitHub API response. The default **Result expression** is `={updatedLabel: response.body}`.

### Create a pull request

Create a pull request. Select **Pulls** as the **Operation group**. GitHub API: [Create a pull request](https://docs.github.com/en/rest/pulls/pulls?apiVersion=2022-11-28#create-a-pull-request).

#### Input parameters

| Property   | Type    | Required | Description                                                         | Example |
| :--------- | :------ | :------- | :------------------------------------------------------------------ | :------ |
| Owner      | String  | Yes      | The account owner of the repository. The name isn't case-sensitive. |         |
| Repository | String  | Yes      | The name of the repository. The name isn't case-sensitive.          |         |
| Title      | String  | Yes      | The title of the new pull request.                                  |         |
| Head       | String  | Yes      | The name of the branch where your changes are implemented.          |         |
| Base       | String  | Yes      | The name of the branch you want the changes pulled into.            |         |
| Body       | Text    | No       | The contents of the pull request.                                   |         |
| Draft      | Boolean | Yes      | Whether the pull request is a draft. The default is `false`.        |         |

#### Output

The connector returns the GitHub API response. The default **Result expression** is `={createdPullRequest: response.body}`.

### Get a pull request

Get the details of a pull request. Select **Pulls** as the **Operation group**. GitHub API: [Get a pull request](https://docs.github.com/en/rest/pulls/pulls?apiVersion=2022-11-28#get-a-pull-request).

#### Input parameters

| Property            | Type   | Required | Description                                                         | Example |
| :------------------ | :----- | :------- | :------------------------------------------------------------------ | :------ |
| Owner               | String | Yes      | The account owner of the repository. The name isn't case-sensitive. |         |
| Repository          | String | Yes      | The name of the repository. The name isn't case-sensitive.          |         |
| Pull request number | String | Yes      | The number that identifies the pull request.                        |         |

#### Output

The connector returns the GitHub API response. The default **Result expression** is `={pullRequest: {number: response.body.number, title: response.body.title, body: response.body.body, state: response.body.state, merged: response.body.merged, labels: for l in response.body.labels return l.name, baseBranch: response.body.base.ref, url: response.body.html_url}}`.

### Create a reference

Create a Git reference, such as a branch or tag, in a repository. Select **References** as the **Operation group**. GitHub API: [Create a reference](https://docs.github.com/en/rest/git/refs?apiVersion=2022-11-28#create-a-reference).

#### Input parameters

| Property      | Type   | Required | Description                                                                                                                           | Example           |
| :------------ | :----- | :------- | :------------------------------------------------------------------------------------------------------------------------------------ | :---------------- |
| Owner         | String | Yes      | The account owner of the repository. The name isn't case-sensitive.                                                                   |                   |
| Repository    | String | Yes      | The name of the repository. The name isn't case-sensitive.                                                                            |                   |
| Git reference | String | Yes      | The name of the fully qualified reference, for example `refs/heads/main`. It must start with `refs` and contain at least two slashes. | `refs/heads/main` |
| SHA           | String | Yes      | The SHA1 value to create the reference from. It must consist of 40 characters.                                                        |                   |

#### Output

The connector returns the GitHub API response. The default **Result expression** is `={createdReference: response.body}`.

### Create a release

Create a release in a repository. Select **Releases** as the **Operation group**. GitHub API: [Create a release](https://docs.github.com/en/rest/releases/releases?apiVersion=2022-11-28#create-a-release).

#### Input parameters

| Property     | Type     | Required | Description                                                                                                                                                                                                                                                              | Example |
| :----------- | :------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Owner        | String   | Yes      | The account owner of the repository. The name isn't case-sensitive.                                                                                                                                                                                                      |         |
| Repository   | String   | Yes      | The name of the repository. The name isn't case-sensitive.                                                                                                                                                                                                               |         |
| Body         | Text     | No       | Text describing the contents of the tag.                                                                                                                                                                                                                                 |         |
| Tag name     | String   | Yes      | The name of the tag.                                                                                                                                                                                                                                                     |         |
| Release name | String   | No       | The name of the release.                                                                                                                                                                                                                                                 |         |
| Make latest  | Dropdown | Yes      | Whether to set this release as the latest release of the repository: **True**, **False**, or **Legacy**. Drafts and pre-releases can't be set as latest. **Legacy** determines the latest release by creation date and higher semantic version. The default is **True**. |         |

#### Output

The connector returns the GitHub API response. The default **Result expression** is `={createdRelease: response.body}`.

### Delete a release

Delete a release from a repository. Select **Releases** as the **Operation group**. GitHub API: [Delete a release](https://docs.github.com/en/rest/releases/releases?apiVersion=2022-11-28#delete-a-release).

#### Input parameters

| Property   | Type   | Required | Description                                                         | Example |
| :--------- | :----- | :------- | :------------------------------------------------------------------ | :------ |
| Owner      | String | Yes      | The account owner of the repository. The name isn't case-sensitive. |         |
| Repository | String | Yes      | The name of the repository. The name isn't case-sensitive.          |         |
| Release ID | String | Yes      | The unique identifier of the release.                               |         |

#### Output

The connector returns the GitHub API response. The connector template doesn't show a **Result expression** field for this operation. Use **Result variable** to keep the response.

### List releases

List the releases of a repository. Select **Releases** as the **Operation group**. GitHub API: [List releases](https://docs.github.com/en/rest/releases/releases?apiVersion=2022-11-28#list-releases).

#### Input parameters

| Property   | Type   | Required | Description                                                         | Example |
| :--------- | :----- | :------- | :------------------------------------------------------------------ | :------ |
| Owner      | String | Yes      | The account owner of the repository. The name isn't case-sensitive. |         |
| Repository | String | Yes      | The name of the repository. The name isn't case-sensitive.          |         |

#### Output

The connector returns the GitHub API response. The default **Result expression** is `={releasesList: response.body}`.

### Update a release

Update an existing release. Select **Releases** as the **Operation group**. GitHub API: [Update a release](https://docs.github.com/en/rest/releases/releases?apiVersion=2022-11-28#update-a-release).

#### Input parameters

| Property     | Type     | Required | Description                                                                                                                                                                                                                                                              | Example |
| :----------- | :------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Owner        | String   | Yes      | The account owner of the repository. The name isn't case-sensitive.                                                                                                                                                                                                      |         |
| Repository   | String   | Yes      | The name of the repository. The name isn't case-sensitive.                                                                                                                                                                                                               |         |
| Release ID   | String   | Yes      | The unique identifier of the release.                                                                                                                                                                                                                                    |         |
| Body         | Text     | No       | Text describing the contents of the tag.                                                                                                                                                                                                                                 |         |
| Tag name     | String   | Yes      | The name of the tag.                                                                                                                                                                                                                                                     |         |
| Release name | String   | No       | The name of the release.                                                                                                                                                                                                                                                 |         |
| Make latest  | Dropdown | Yes      | Whether to set this release as the latest release of the repository: **True**, **False**, or **Legacy**. Drafts and pre-releases can't be set as latest. **Legacy** determines the latest release by creation date and higher semantic version. The default is **True**. |         |

#### Output

The connector returns the GitHub API response. The default **Result expression** is `={updatedRelease: response.body}`.

### Create an organization invitation

Invite a person to join an organization. Select **Repositories** as the **Operation group**. GitHub API: [Create an organization invitation](https://docs.github.com/en/rest/orgs/members?apiVersion=2022-11-28#create-an-organization-invitation).

#### Input parameters

| Property          | Type     | Required | Description                                                                                                 | Example |
| :---------------- | :------- | :------- | :---------------------------------------------------------------------------------------------------------- | :------ |
| Organization name | String   | Yes      | The name of the organization. The name isn't case-sensitive.                                                |         |
| Invite email      | String   | Yes      | The email address of the person to invite. It can belong to an existing GitHub user.                        |         |
| Role              | Dropdown | Yes      | The role of the new member: **Admin**, **Direct member**, or **Billing manager**. The default is **Admin**. |         |

#### Output

The connector returns the GitHub API response. The connector template doesn't show a **Result expression** field for this operation. Use **Result variable** to keep the response.

### Create an organization repository

Create a repository in an organization. Select **Repositories** as the **Operation group**. GitHub API: [Create an organization repository](https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#create-an-organization-repository).

#### Input parameters

| Property          | Type     | Required | Description                                                                              | Example |
| :---------------- | :------- | :------- | :--------------------------------------------------------------------------------------- | :------ |
| Repository name   | String   | Yes      | The name of the repository.                                                              |         |
| Organization name | String   | Yes      | The name of the organization. The name isn't case-sensitive.                             |         |
| Description       | String   | No       | A short description of the repository.                                                   |         |
| Home page         | String   | No       | A URL with more information about the repository.                                        |         |
| Visibility        | Dropdown | Yes      | The visibility of the repository: **Private** or **Public**. The default is **Private**. |         |

#### Output

The connector returns the GitHub API response. The default **Result expression** is `={createdOrganizationRepo: response.body}`.

### Create or update file content

Create a file or update an existing file in a repository. Select **Repositories** as the **Operation group**. GitHub API: [Create or update file contents](https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#create-or-update-file-contents).

#### Input parameters

| Property                          | Type    | Required                                     | Description                                                                                                                                                                                                                         | Example |
| :-------------------------------- | :------ | :------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Owner                             | String  | Yes                                          | The account owner of the repository. The name isn't case-sensitive.                                                                                                                                                                 |         |
| Repository                        | String  | Yes                                          | The name of the repository. The name isn't case-sensitive.                                                                                                                                                                          |         |
| Path                              | String  | Yes                                          | The path of the file within the repository.                                                                                                                                                                                         |         |
| Branch                            | String  | No                                           | The name of the target branch for the new commit. Defaults to the default branch of the repository.                                                                                                                                 |         |
| Message                           | String  | Yes                                          | The commit message for the file change.                                                                                                                                                                                             |         |
| SHA                               | String  | No                                           | The blob SHA of the file being replaced. It is required when you update an existing file, and not needed when you create a new file. Use [Get repository content](#get-repository-content) to retrieve the SHA of an existing file. |         |
| Content                           | String  | Yes                                          | The content to upload as a raw string, a [document reference](/components/document-handling/getting-started.md), or a base64-encoded value.                                                                                         |         |
| Content is already base64 encoded | Boolean | Yes                                          | Select this option if your content is already base64 encoded. Otherwise, the connector encodes it for you.                                                                                                                          |         |
| Use custom committer              | Boolean | Yes                                          | By default, the committer is the user associated with the access token. Select this option to set a different committer in the commit metadata.                                                                                     |         |
| Committer name                    | String  | Yes, if **Use custom committer** is selected | The name or handle of the person who made the commit. Don't include an `@`.                                                                                                                                                         |         |
| Committer email                   | String  | Yes, if **Use custom committer** is selected | The email address of the person who made the commit.                                                                                                                                                                                |         |
| Use custom author                 | Boolean | Yes                                          | By default, the author is the user associated with the access token. Select this option to set a different author in the commit metadata.                                                                                           |         |
| Author name                       | String  | Yes, if **Use custom author** is selected    | The name or handle of the author of the commit. Don't include an `@`.                                                                                                                                                               |         |
| Author email                      | String  | Yes, if **Use custom author** is selected    | The email address of the author of the commit.                                                                                                                                                                                      |         |

#### Output

The connector returns the GitHub API response. The default **Result expression** is `={fileDetails: response.body.content, commitDetails: response.body.commit}`.

### Delete a repository

Delete a repository. Select **Repositories** as the **Operation group**. GitHub API: [Delete a repository](https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#delete-a-repository).

#### Input parameters

| Property   | Type   | Required | Description                                                         | Example |
| :--------- | :----- | :------- | :------------------------------------------------------------------ | :------ |
| Owner      | String | Yes      | The account owner of the repository. The name isn't case-sensitive. |         |
| Repository | String | Yes      | The name of the repository. The name isn't case-sensitive.          |         |

#### Output

The connector returns the GitHub API response. The connector template doesn't show a **Result expression** field for this operation. Use **Result variable** to keep the response.

### Get a repository

Get the details of a repository. Select **Repositories** as the **Operation group**. GitHub API: [Get a repository](https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#get-a-repository).

#### Input parameters

| Property   | Type   | Required | Description                                                         | Example |
| :--------- | :----- | :------- | :------------------------------------------------------------------ | :------ |
| Owner      | String | Yes      | The account owner of the repository. The name isn't case-sensitive. |         |
| Repository | String | Yes      | The name of the repository. The name isn't case-sensitive.          |         |

#### Output

The connector returns the GitHub API response. The default **Result expression** is `={repo: response.body}`.

### Get repository content

Get the content of a file or directory in a repository. Select **Repositories** as the **Operation group**. GitHub API: [Get repository content](https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#get-repository-content).

#### Input parameters

| Property   | Type   | Required | Description                                                                               | Example |
| :--------- | :----- | :------- | :---------------------------------------------------------------------------------------- | :------ |
| Owner      | String | Yes      | The account owner of the repository. The name isn't case-sensitive.                       |         |
| Repository | String | Yes      | The name of the repository. The name isn't case-sensitive.                                |         |
| Path       | String | Yes      | The path of the content within the repository.                                            |         |
| Ref        | String | No       | The name of the commit, branch, or tag. Defaults to the default branch of the repository. |         |

#### Output

The connector returns the GitHub API response. The default **Result expression** is `={repositoryContent: response.body}`.

### List organization repositories

List the repositories of an organization. Select **Repositories** as the **Operation group**. GitHub API: [List organization repositories](https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-organization-repositories).

#### Input parameters

| Property          | Type     | Required | Description                                                                                                                           | Example |
| :---------------- | :------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------ | :------ |
| Organization name | String   | Yes      | The name of the organization. The name isn't case-sensitive.                                                                          |         |
| Type              | Dropdown | Yes      | The types of repositories to return: **All**, **Public**, **Private**, **Forks**, **Sources**, or **Member**. The default is **All**. |         |
| Sort              | Dropdown | Yes      | The property to sort the results by: **Created**, **Updated**, **Pushed**, or **Full name**. The default is **Created**.              |         |
| Sort order        | Dropdown | Yes      | The sort order: **Ascending** or **Descending**. The default is **Descending**.                                                       |         |

#### Output

The connector returns the GitHub API response. The default **Result expression** is `={organizationRepoList: response.body}`.

### List repository contributors

List the contributors of a repository. Select **Repositories** as the **Operation group**. GitHub API: [List repository contributors](https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repository-contributors).

#### Input parameters

| Property   | Type   | Required | Description                                                         | Example |
| :--------- | :----- | :------- | :------------------------------------------------------------------ | :------ |
| Owner      | String | Yes      | The account owner of the repository. The name isn't case-sensitive. |         |
| Repository | String | Yes      | The name of the repository. The name isn't case-sensitive.          |         |

#### Output

The connector returns the GitHub API response. The default **Result expression** is `={repoContributorsList: response.body}`.

### Update a repository

Update the settings of a repository. Select **Repositories** as the **Operation group**. GitHub API: [Update a repository](https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#update-a-repository).

#### Input parameters

| Property        | Type     | Required | Description                                                                              | Example |
| :-------------- | :------- | :------- | :--------------------------------------------------------------------------------------- | :------ |
| Owner           | String   | Yes      | The account owner of the repository. The name isn't case-sensitive.                      |         |
| Repository      | String   | Yes      | The name of the repository. The name isn't case-sensitive.                               |         |
| Repository name | String   | No       | The new name of the repository.                                                          |         |
| Description     | String   | No       | A short description of the repository.                                                   |         |
| Home page       | String   | No       | A URL with more information about the repository.                                        |         |
| Visibility      | Dropdown | Yes      | The visibility of the repository: **Private** or **Public**. The default is **Private**. |         |

#### Output

The connector returns the GitHub API response. The default **Result expression** is `={updatedRepo: response.body}`.

## Troubleshooting

To learn about general error handling in Camunda, see [BPMN errors and failing jobs](/components/connectors/use-connectors/index.md#bpmn-errors).

## Further resources

- [GitHub REST API documentation](https://docs.github.com/en/rest)
- [GitHub inbound connector](./github-inbound.md)
