---
id: github
title: GitHub Connector
sidebar_label: GitHub Connector
description: Manage GitHub issues and releases from your BPMN process.
---

The **GitHub Connector** allows you to connect your BPMN service with [GitHub](https://github.com/) to manage [GitHub](https://github.com/) issues and releases.

## Prerequisites

To use the **GitHub Connector**, you must have a GitHub instance and an [access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) of a user or a service account on whose behalf a BPMN process will be executed.

:::note
It is highly recommended not to expose your GitHub access token credentials as plain text. Instead, use Camunda secrets.
See our documentation on [managing secrets](../../../components/console/manage-clusters/manage-secrets.md) to learn more.
:::

## Create a GitHub Connector task

To use the **GitHub Connector** in your process, either change the type of existing task by clicking on it and using the wrench-shaped **Change type** context menu icon, or create a new Connector task using the **Append Connector** context menu. Follow our [guide to using Connectors](../use-connectors.md) to learn more.

## Provide your access token

In the **Authentication** section, provide a **GitHub access token**.

## Select operation to execute

The **GitHub Connector** currently supports the following operations.

### Issues

#### Create an issue

- **GitHub API:** [Create an issue](https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#create-an-issue).
- **Owner:** The account owner of the repository. The name is not case-sensitive.
- **Repo:** The name of the repository. The name is not case-sensitive.
- **Title:** The title of the issue.
- **Body:** The contents of the issue.
- **Assignees:** Logins for users to assign to this issue. Only users with push access can set assignees for new issues. Assignees are silently dropped otherwise.
- **Labels:** Labels to associate with this issue. Only users with push access can set labels for new issues. Labels are silently dropped otherwise.
- **Milestone:** The number of the milestone to associate this issue with or use null to remove the current milestone. Only users with push access can set the milestone for issues. Without push access to the repository, milestone changes are silently dropped.

#### Get an issue

- **GitHub API:** [Get an issue](https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#get-an-issue).
- **Owner:** The account owner of the repository. The name is not case-sensitive.
- **Repo:** The name of the repository. The name is not case-sensitive.
- **Issue number:** The number that identifies the issue.

#### Update an issue

- **GitHub API:** [Update an issue](https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#update-an-issue).
- **Owner:** The account owner of the repository. The name is not case-sensitive.
- **Repo:** The name of the repository. The name is not case-sensitive.
- **Issue number:** The number that identifies the issue.
- **Title:** The title of the issue.
- **Body:** The contents of the issue.
- **Assignees:** Logins for users to assign to this issue. Only users with push access can set assignees for new issues. Assignees are silently dropped otherwise.
- **Labels:** Labels to associate with this issue. Only users with push access can set labels for new issues. Labels are silently dropped otherwise.
- **Milestone:** The number of the milestone to associate this issue with or use null to remove the current milestone. Only users with push access can set the milestone for issues. Without push access to the repository, milestone changes are silently dropped.
- **Issue state:** The open or closed state of the issue. Can be open or closed.
- **State reason:** The reason for the state change. Ignored unless state is changed. Can be one of: completed, not_planned, reopened, null.

#### Create an issue comment

- **GitHub API:** [Create an issue comment](https://docs.github.com/en/rest/issues/comments?apiVersion=2022-11-28#create-an-issue-comment).
- **Owner:** The account owner of the repository. The name is not case-sensitive.
- **Repo:** The name of the repository. The name is not case-sensitive.
- **Issue number:** The number that identifies the issue.
- **Body:** The contents of the comment.

#### Search issue

- **GitHub API:** [Search issue](https://docs.github.com/en/rest/search?apiVersion=2022-11-28#search-issues-and-pull-requests).
- **Query:** The query contains one or more search keywords and qualifiers. Qualifiers allow you to limit your search to specific areas of GitHub. The REST API supports the same qualifiers as the web interface for GitHub. To learn more about the format of the query, see [constructing a search query](https://docs.github.com/en/rest/search?apiVersion=2022-11-28#constructing-a-search-query). See [searching issues and pull requests](https://docs.github.com/en/search-github/searching-on-github/searching-issues-and-pull-requests) for a detailed list of qualifiers.

#### List commits

- **GitHub API:** [List commits](https://docs.github.com/en/rest/commits/commits?apiVersion=2022-11-28#list-commits).
- **Owner:** The account owner of the repository. The name is not case-sensitive.
- **Repo:** The name of the repository. The name is not case-sensitive.

### Branches

#### List branches

- **GitHub API:** [List branches](https://docs.github.com/en/rest/branches/branches?apiVersion=2022-11-28#list-branches).
- **Owner:** The account owner of the repository. The name is not case-sensitive.
- **Repo:** The name of the repository. The name is not case-sensitive.

#### Get a branch

- **GitHub API:** [Get a branch](https://docs.github.com/en/rest/branches/branches?apiVersion=2022-11-28#get-a-branch).
- **Owner:** The account owner of the repository. The name is not case-sensitive.
- **Repo:** The name of the repository. The name is not case-sensitive.
- **Branch:** The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use the GraphQL API.

#### Merge a branch

- **GitHub API:** [Merge a branch](https://docs.github.com/en/rest/branches/branches?apiVersion=2022-11-28#merge-a-branch).
- **Owner:** The account owner of the repository. The name is not case-sensitive.
- **Repo:** The name of the repository. The name is not case-sensitive.
- **Base:** The name of the base branch that the head will be merged into.
- **Head:** The head to merge. This can be a branch name or a commit SHA1.

### Code scanning

#### List code scanning alerts for an organization

- **GitHub API:** [List code scanning alerts for an organization](https://docs.github.com/en/rest/code-scanning?apiVersion=2022-11-28#list-code-scanning-alerts-for-an-organization).
- **Organization name:** The organization name. The name is not case-sensitive.

#### List code scanning alerts for a repository

- **GitHub API:** [List code scanning alerts for a repository](https://docs.github.com/en/rest/code-scanning?apiVersion=2022-11-28#list-code-scanning-alerts-for-a-repository).
- **Owner:** The account owner of the repository. The name is not case-sensitive.
- **Repo:** The name of the repository. The name is not case-sensitive.

### Organization

#### Create an organization invitation

- **GitHub API:** [Create an organization invitation](https://docs.github.com/en/rest/orgs/members?apiVersion=2022-11-28#create-an-organization-invitation).
- **Organization name:** The organization name. The name is not case-sensitive.

### Release

#### Create a release

- **GitHub API:** [Create a release](https://docs.github.com/en/rest/releases/releases?apiVersion=2022-11-28#create-a-release).
- **Owner:** The account owner of the repository. The name is not case-sensitive.
- **Repo:** The name of the repository. The name is not case-sensitive.
- **Body:** Text describing the contents of the tag.
- **Tag name:** The name of the tag.
- **Release name:** The name of the release.
- **Make latest:** Specifies whether this release should be set as the latest release for the repository. Drafts and pre-releases cannot be set as latest. Defaults to true for newly published releases. Legacy specifies that the latest release should be determined based on the release creation date and higher semantic version. Default: true. Can be one of: true, false, legacy.

#### Update a release

- **GitHub API:** [Update a release](https://docs.github.com/en/rest/releases/releases?apiVersion=2022-11-28#update-a-release).
- **Owner:** The account owner of the repository. The name is not case-sensitive.
- **Repo:** The name of the repository. The name is not case-sensitive.
- **Release id:** The unique identifier of the release.
- **Body:** Text describing the contents of the tag.
- **Tag name:** The name of the tag.
- **Release name:** The name of the release
- **Make latest:** Specifies whether this release should be set as the latest release for the repository. Drafts and pre-releases cannot be set as latest. Defaults to true for newly published releases. Legacy specifies that the latest release should be determined based on the release creation date and higher semantic version. Default: true. Can be one of: true, false, legacy.

#### Delete a release

- **GitHub API:** [Delete a release](https://docs.github.com/en/rest/releases/releases?apiVersion=2022-11-28#delete-a-release).
- **Owner:** The account owner of the repository. The name is not case-sensitive.
- **Repo:** The name of the repository. The name is not case-sensitive.
- **Release id:** The unique identifier of the release.

#### List releases

- **GitHub API:** [List releases](https://docs.github.com/en/rest/releases/releases?apiVersion=2022-11-28#list-releases).
- **Owner:** The account owner of the repository. The name is not case-sensitive.
- **Repo:** The name of the repository. The name is not case-sensitive.

### Repository

#### List organization repositories

- **GitHub API:** [List organization repositories](https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-organization-repositories).
- **Organization name:** The organization name. The name is not case-sensitive.

#### Create an organization repository

- **GitHub API:** [Create an organization repository](https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#create-an-organization-repository).
- **Organization name:** The organization name. The name is not case-sensitive.
- **Repository name:** The organization name. The name is not case-sensitive.
- **Description:** A short description of the repository.
- **Home page:** A URL with more information about the repository.
- **Visibility:** The visibility of the repository. Can be one of: public, private.

#### Get a repository

- **GitHub API:** [Get a repository](https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#get-a-repository).
- **Owner:** The account owner of the repository. The name is not case-sensitive.
- **Repo:** The name of the repository. The name is not case-sensitive.

#### Update a repository

- **GitHub API:** [Update a repository](https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#update-a-repository).
- **Owner:** The account owner of the repository. The name is not case-sensitive.
- **Repo:** The name of the repository. The name is not case-sensitive.
- **Repository name:** The organization name. The name is not case-sensitive.
- **Description:** A short description of the repository.
- **Home page:** A URL with more information about the repository.
- **Visibility:** The visibility of the repository. Can be one of: public, private.

#### Delete a repository

- **GitHub API:** [Delete a repository](https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#delete-a-repository).
- **Owner:** The account owner of the repository. The name is not case-sensitive.
- **Repo:** The name of the repository. The name is not case-sensitive.

#### List repository contributors

- **GitHub API:** [List repository contributors](https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repository-contributors).
- **Owner:** The account owner of the repository. The name is not case-sensitive.
- **Repo:** The name of the repository. The name is not case-sensitive.

## Handle Connector response

The **GitLab Connector** is a protocol Connector, meaning it is built on top of the **HTTP REST Connector**, therefore
handling response is still applicable [as described](./rest.md#response).
