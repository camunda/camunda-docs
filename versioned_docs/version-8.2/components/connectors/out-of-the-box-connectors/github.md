---
id: github
title: GitHub Connector
sidebar_label: GitHub Connector
description: Manage GitHub issues and releases from your BPMN process.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<Tabs groupId="github" defaultValue="outbound" queryString values={
[
{label: 'GitHub Connector', value: 'outbound' },
{label: 'GitHub Webhook Connector', value: 'inbound' }
]}>

<TabItem value='outbound'>

The **GitHub Connector** is an outbound Connector that allows you to connect your BPMN service with [GitHub](https://github.com/) to manage [GitHub](https://github.com/) issues and releases.

## Prerequisites

To use the **GitHub Connector**, you must have a GitHub instance and an [access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) of a user or a service account on whose behalf a BPMN process will be executed.

:::note
It is highly recommended not to expose your GitHub access token credentials as plain text. Instead, use Camunda secrets.
See our documentation on [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.
:::

## Create a GitHub Connector task

To use the **GitHub Connector** in your process, either change the type of existing task by clicking on it and using the wrench-shaped **Change type** context menu icon, or create a new Connector task using the **Append Connector** context menu. Follow our [guide to using Connectors](/components/connectors/use-connectors/index.md) to learn more.

## Authentication

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

The **GitHub Connector** is a protocol Connector, meaning it is built on top of the **HTTP REST Connector**, therefore
handling response is still applicable [as described](/components/connectors/protocol/rest.md#response).

</TabItem>

<TabItem value='inbound'>

The **GitHub Webhook Connector** is an inbound Connector that allows you to start a BPMN process instance triggered by a [GitHub event](https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks).

## Create a GitHub Webhook Connector task

1. Start building your BPMN diagram. You can use GitHub Webhook Connector with either **Start Event** or **Intermediate Catch Event** building blocks.
2. Select the applicable element and change its template to a GitHub Webhook.
3. Fill in all required properties.
4. Complete your BPMN diagram.
5. Deploy the diagram to activate the webhook.
6. Navigate to the **Webhooks** tab in the properties panel to observe the webhook URL.

## Make your GitHub Webhook Connector for receiving messages executable

1. In the **Webhook Configuration** section, configure the **Webhook ID**. By default, **Webhook ID** is pre-filled with a random value. This value will be part of the Webhook URL. You will find more details about GitHub Webhook URLs [below](#activate-the-github-webhook-connector-by-deploying-your-diagram).
2. Set the **GitHub secret**. This is a shared secret key that has to be defined in both your BPMN and GitHub webhook configuration page. The value is used to calculate HMAC authentication signature.
3. Configure **Activation Condition**. For example, given GitHub triggers a webhook endpoint with a new PR payload `{"action": "opened", "pull_request": ...}`, the **Activation Condition** value might look like as `=(request.body.action = "opened")`. Leave this field empty to trigger your webhook every time.
4. Use **Result Variable** to store the response in a process variable. For example, `myResultVariable`.
5. Use **Result Expression** to map specific fields from the response into process variables using [FEEL](/components/modeler/feel/what-is-feel.md).
   For example, given that the GitHub webhook is triggered with the body `{"pull_request": {"id": 123}}` and you would like to extract the pull request `id` as a process variable `pullRequestId`, the **Result Expression** might look like this:

```
= {
  pullRequestId: request.body.pull_request.id
}
```

6. If you are using the GitHub Webhook Connector with an **Intermediate Catch Event**, fill in the **Correlation key (process)** and **Correlation key (payload)**.

   - **Correlation key (process)** is a FEEL expression that defines the correlation key for the subscription. This corresponds to the **Correlation key** property of a regular **Message Intermediate Catch Event**.
   - **Correlation key (payload)** is a FEEL expression used to extract the correlation key from the incoming message. This expression is evaluated in the Connector Runtime and the result is used to correlate the message.

   - For example, given that your correlation key is defined with `pullRequestId` process variable, and the request body contains `{"pull_request": {"id": 123}}`, your correlation key settings will look like this:
     - **Correlation key (process)**: `=pullRequestId`
     - **Correlation key (payload)**: `=request.body.pull_request.id`

Learn more about correlation keys in the [messages guide](../../../concepts/messages).

## Activate the GitHub Webhook Connector by deploying your diagram

Once you click the **Deploy** button, your GitHub Webhook will be activated and publicly available.

URLs of the exposed GitHub Webhooks adhere to the following pattern:

`http(s)://<base URL>/inbound/<webhook ID>>`

- `<base URL>` is the URL of Connectors component deployment. When using the Camunda 8 SaaS offering, this will typically contain your cluster region and cluster ID.
- `<webhook ID>` is the ID (path) you configured in the properties of your GitHub Webhook Connector.

If you make changes to your GitHub Webhook Connector configuration, you need to redeploy the BPMN diagram for the changes to take effect.

When you click on the event with GitHub Webhook Connector applied to it, a new **Webhooks** tab will appear in the properties panel.
This tab displays the URL of the GitHub Webhook Connector for every cluster where you have deployed your BPMN diagram.

:::note
The **Webhooks** tab is only supported in Web Modeler as part of the Camunda 8 SaaS offering.
You can still use GitHub Webhook Connector in Desktop Modeler, or with your Camunda 8 Self-Managed.
In that case, GitHub Webhook Connector deployments and URLs will not be displayed in Modeler.
:::

## Configure GitHub

1. Ensure you have administrator rights for the repository where you wish to enable a webhook.
2. Open a repository in your web browser and navigate to the **Settings** page.
3. Click **Webhooks > Add webhook**.
4. Fill out the required fields:
   1. **Payload URL** - URL of your webhook.
   2. **Content type** - Select `application/json`.
   3. **Secret** - Shared secret between GitHub and your BPMN diagram.
5. Confirm by clicking **Add webhook**.

Refer to the [GitHub documentation](https://docs.github.com/en/rest/webhooks) for more details.

## Next steps

- Learn more about [GitHub webhooks](https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks).

</TabItem>

</Tabs>
