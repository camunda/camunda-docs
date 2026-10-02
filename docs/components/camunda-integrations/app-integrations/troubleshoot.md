---
id: troubleshoot
title: Troubleshoot app integrations
sidebar_label: Troubleshoot
description: "Troubleshoot Camunda app integrations for Microsoft Teams and Slack to fix common setup and connectivity issues."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Troubleshoot Camunda app integrations to fix common setup and connectivity issues on Microsoft Teams and Slack.

### The app does not appear in the Microsoft Teams store

<Tabs groupId="environment" defaultValue="saas" values={[
{ label: 'SaaS', value: 'saas' },
{ label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value="saas">

- Verify your organization allows third-party app installations.
- Search for "Camunda" in the Microsoft Teams app store.
- Check with your Teams administrator for app approval policies.

</TabItem>

<TabItem value="self-managed">

- The app is provisioned during [installation](./installation.md) and appears in the **Built for your org** section of Microsoft Teams Apps.
- If the app is not visible, check with your IT administrator.

</TabItem>

</Tabs>

### Unable to connect to Camunda organization

<Tabs groupId="environment" defaultValue="saas" values={[
{ label: 'SaaS', value: 'saas' },
{ label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value="saas">

- Ensure you have the required permissions in your Camunda organization.
- Verify your Camunda SaaS account is active and accessible.
- If no tasks or incidents are visible, double-check your Camunda organization, cluster, and tenant settings.

</TabItem>

<TabItem value="self-managed">

- Verify your Camunda Self-Managed distribution is running and accessible.
- Check your Identity configuration and ensure the user has the required roles.
- If no tasks or incidents are visible, double-check your cluster configuration in the `config.yaml` file.

</TabItem>

</Tabs>

### Tasks not displayed

- Check you are connected to the correct Camunda cluster.
- If notifications are not shown, ensure notifications are enabled for your platform and verify that the relevant [notification rules](./notification-rules.md) are configured for the channel, personal chat, or direct message.
- This could be due to an expired Camunda session or missing permissions. Sign out and sign in again.

### Notifications are not delivered

- On SaaS clusters running generation `8.9 gen13` or later, check that **Enable app integrations extensions** is turned on in the [cluster settings](/components/hub/organization/manage-clusters/settings.md#enable-app-integrations-extensions). Microsoft Teams shows an **App Integrations Extensions not enabled** message when the setting is off.
- Verify that a [notification rule](./notification-rules.md) matches the user task, and that the rule is configured for the channel, personal chat, or direct message you expect.
- If notifications arrive but cards do not update when a task is assigned, completed, or canceled, check that the cluster runs generation `8.9 gen13` or later.

### The Slack app does not respond

| Symptom                                          | Cause                                              | Fix                                                           |
| :----------------------------------------------- | :------------------------------------------------- | :------------------------------------------------------------ |
| `/api/slack/events` returns `503 slack_disabled` | `slack.botToken` or `slack.signingSecret` is blank | Set `SLACK_BOT_TOKEN` and `SLACK_BOT_SIGNING_SECRET`, restart |
| The slash command does nothing                   | `slack.command` does not match the manifest        | Align the two                                                 |
| Slack cannot reach the backend                   | The backend is on `http`                           | Slack calls `https` only, and there is no socket mode         |

### Channel mentions are ignored but direct messages work

| Symptom                                            | Cause                                                           | Fix                     |
| :------------------------------------------------- | :-------------------------------------------------------------- | :---------------------- |
| Channel mentions are ignored, direct messages work | `app_mentions:read` was added to the app after it was installed | Reinstall the Slack app |

### Notifications are not delivered to a Slack channel

| Symptom                                        | Cause                                          | Fix                                                                                                                                                           |
| :--------------------------------------------- | :--------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| A channel rule creates no notifications        | The Camunda app is not a member of the channel | Invite the app with `/invite @Camunda`                                                                                                                        |
| A previously working channel rule stops firing | The rule was cleaned up automatically          | See [automatic cleanup](./notification-rules.md#automatic-cleanup): the app left the channel, the channel was deleted or archived, or the app was uninstalled |

### A modal fails to open or a dropdown returns nothing

| Symptom                    | Cause                                                        | Fix                  |
| :------------------------- | :----------------------------------------------------------- | :------------------- |
| A modal fails to open      | The interactivity request URL is missing from the app config | Reapply the manifest |
| A dropdown returns nothing | The options load request URL is missing from the app config  | Reapply the manifest |

Both the interactivity and options load requests point at the same request URL as the slash command: `<backend>/api/slack/events`.

### Other Slack messages worth searching for

If you were shown one of these messages, look up the row for what it means and what to do:

| Message                                                                                                           | Meaning                                                                                                                                                                                                            |
| :---------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "No Camunda context selected. Run `/camunda context` to choose an organisation and cluster."                      | No organization and cluster is active yet. Run `/camunda context`.                                                                                                                                                 |
| "Couldn't tell which tasks are yours. Your Camunda account isn't a member of this organisation."                  | Your Camunda account has no access to the active organization. Ask an administrator for access.                                                                                                                    |
| "Start with a letter or a number, then use letters, numbers, dots, dashes or underscores. 64 characters at most." | The chat key you entered in `/camunda chat` or a [chat conversation start event](/components/connectors/out-of-the-box-connectors/app-integrations.md#route-a-chat-to-the-right-process) is not in a valid format. |
| "`default` is the key an unconfigured channel already uses. Choose 'Default process' above, or pick another key." | You tried to set the chat key to `default` explicitly. Select **Default process** instead, or choose a different key.                                                                                              |

## Get help

- Contact [Camunda support](/reference/contact.md) for assistance.
- Provide feedback through the [Camunda roadmap portal](https://roadmap.camunda.com).
