---
id: common-problems
title: "Common problems"
description: "Information to help troubleshoot common problems."
---

This section aims to provide initial help to troubleshoot common issues. This guide is not intended to be a complete list of possible problems, nor does it provide detailed step-by-step solutions; its intention is merely to point you in the right direction when investigating what may be causing the issue you are experiencing.

## Optimize is missing some or all definitions

It is possible that the user you are logged in as does not have the relevant authorizations to view all definitions in Optimize. Refer to the [authorization management section](##process-or-decision-definition-related-authorizations) to confirm the user has all required authorizations.

Another common cause for this type of problem are issues with Optimize's data import, for example due to underlying problems with the engine data. In this case, the Optimize logs should contain more information on what is causing Optimize to not import the definition data correctly. If you are unsure on how to interpret what you find in the logs, create a support ticket.

## Report assignee, candidate group, variable or suspension state data is inaccurate or missing

Optimize relies on specific engine logs to retrieve data about assignees, candidate groups, variables, and instance suspension state. If the engine history settings are not set correctly, these logs may be missing from the engine data Optimize imports. Refer to the [history level documentation](https://docs.camunda.org/manual/latest/user-guide/process-engine/history/#choose-a-history-level) to ensure it is set correctly.

Additionally, similar to the issue regarding missing definition data, it is possible that the Optimize import has encountered an issue. In this case, refer to your Optimize logs for more information.

## Error message indicating that an index is set to read only

This often occurs when Elasticsearch is running out of disk space. If this is the case, adjusting your Elasticsearch setup accordingly should resolve the issue. Note that you may need to manually unlock your indices afterwards, refer to [Elasticsearch's documentation](https://www.elastic.co/guide/en/elasticsearch/reference/master/index-modules-blocks.html) on how to do this.

## Server language results in UI/server errors

When Optimize is running with its language set to one with characters that it can't recognize, such as Turkish, you may observe logged issues and unusable elements in the UI. We recommend running Optimize on a server with its language set to English.

## Update issues

Always check the migration and update instructions for the version you are migrating from:

- For Camunda 8, refer to the [Camunda 8 migration guide](./../migration-update/camunda-8/instructions.md).

These guides often document known issues along with their solutions, which might already address the problem you're encountering.
