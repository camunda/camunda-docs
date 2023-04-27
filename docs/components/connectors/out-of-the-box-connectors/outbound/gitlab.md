---
id: gitlab
title: GitLab Connector
sidebar_label: GitLab Connector
description: Manage GitLab issues and releases from your BPMN process. Learn about creating a GitLab Connector task and get started.
---

The **GitLab Connector** is an outbound Connector that allows you to connect your BPMN service with [GitLab](https://about.gitlab.com/) to manage GitLab issues and releases.

## Prerequisites

To use the **GitLab Connector**, you must have a GitLab instance and an [access token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html) of a user
or a service account on whose behalf a BPMN process will be executed.

:::note
It is highly recommended not to expose your GitLab access token credentials as plain text. Instead, use Camunda secrets.
See our documentation on [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.
:::

## Create a GitLab Connector task

To use the **GitLab Connector** in your process, either change the type of existing task by clicking on it and using the wrench-shaped **Change type** context menu icon, or create a new Connector task by using the **Append Connector** context menu. Follow our [guide to using Connectors](/components/connectors/use-connectors.md) to learn more.

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

## Handle Connector response

The **GitLab Connector** is a protocol connector, meaning it is built on top of the **HTTP REST Connector**, therefore
handling response is still applicable [as described](/components/connectors/out-of-the-box-connectors/outbound/rest.md#respons).
