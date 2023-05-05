---
id: common-problems
title: "Common problems"
description: "Information to help troubleshoot common problems."
---

<span class="badge badge--platform">Camunda Platform 7 only</span>

This section aims to provide initial help to troubleshoot common issues. This guide is not intended to be a complete list of possible problems, nor does it provide detailed step-by-step solutions; its intention is merely to point you in the right direction when investigating what may be causing the issue you are experiencing.  

## Optimize is missing some or all definitions

It is possible that the user you are logged in as does not have the relevant authorizations to view all definitions in Optimize. Refer to the [authorization management section](./authorization-management.md#process-or-decision-definition-related-authorizations) to confirm the user has all required authorizations.

Another common cause for this type of problem are issues with Optimize's data import, for example due to underlying problems with the engine data. In this case, the Optimize logs should contain more information on what is causing Optimize to not import the definition data correctly. If you are unsure on how to interpret what you find in the logs, create a support ticket.

## Report assignee, candidate group, variable or suspension state data is inaccurate or missing

Optimize relies on specific engine logs to retrieve data about assignees, candidate groups, variables, and instance suspension state. If the engine history settings are not set correctly, these logs may be missing from the engine data Optimize imports. Refer to the [history level documentation](https://docs.camunda.org/manual/latest/user-guide/process-engine/history/#choose-a-history-level) to ensure it is set correctly.

Additionally, similar to the issue regarding missing definition data, it is possible that the Optimize import has encountered an issue. In this case, refer to your Optimize logs for more information.

## Error message indicating that an index is set to read only

This often occurs when Elasticsearch is running out of disk space. If this is the case, adjusting your Elasticsearch setup accordingly should resolve the issue. Note that you may need to manually unlock your indices afterwards, refer to [Elasticsearch's documentation](https://www.elastic.co/guide/en/elasticsearch/reference/master/index-modules-blocks.html) on how to do this.

## Exception indicating an error while checking the engine version

The most common cause for this issue is that the engine endpoint Optimize uses is not configured correctly. Check your [configuration](../configuration/#connection-to-camunda-platform) and ensure the engine REST URL is set correctly.

## Server language results in UI/server errors

When Optimize is running with its language set to one with characters that it can't recognise, such as Turkish, you may observe logged issues and unusable elements in the UI. We recommend running Optimize on a server with its language set to English.

## Update issues

Always check the [migration and update instructions](./../migration-update/instructions.md) for the versions you are migrating, often this section already documents the problem you are experiencing along with the solution.
