---
id: migrate-to-810
title: "Camunda 8.10 APIs & Tools migration guide"
sidebar_label: "Upgrade to Camunda 8.10"
description: "Learn how to migrate your API integrations, SDKs, and generated clients to Camunda 8.10."
toc_max_heading_level: 2
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## About

This guide details the API and SDK changes introduced in Camunda 8.10 that require customer action, including breaking changes, deprecations, and step-by-step migration actions.

Details are provided for each integration type, including what changed, why, and what action you must take.

| Integration type       | Description                                               |
| :--------------------- | :-------------------------------------------------------- |
| Official SDK users     | Java client, TypeScript SDK, Python SDK, and C# SDK.      |
| Generated-client users | Clients generated from the Camunda OpenAPI specification. |
| Custom integrations    | Custom code that calls the Camunda REST API directly.     |

<!--- >:::info
For a full list of changes, see the [8.10 release announcements](/reference/announcements-release-notes/8100/8100-announcements.md) and [release notes](/reference/announcements-release-notes/8100/8100-release-notes.md).
::: --->

## Upgrade steps

Complete the following steps in this guide:

1. Upgrade to the latest official Camunda SDK versions.
1. If you generate clients from OpenAPI, regenerate them from the 8.10 specification.
1. Re-run compilation/type checks and address any errors.
1. Review and apply fixes for the breaking changes, deprecations, and supported environment changes below.

### Camunda 8.10 breaking changes, deprecations, and supported environment changes

Review the actions required for the following 8.10 changes:

| Type                                                         | Change                                                                                                               |
| :----------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------- |
| <span className="label-highlight red">Breaking change</span> | [Search filters: `UserTaskFilter` process filters converted into advanced search filters] (#usertask-process-filter) |

## Breaking changes

Review actions required for the following breaking changes:

### Search filters: `UserTaskFilter` process filters converted into advanced search filters {#usertask-process-filter}

#### Change

The search filter criteria for `processDefinitionKey`, `processInstanceKey`, and `bpmnProcessId` in `UserTaskFilter` have been converted into advanced search filters.

#### Why

As a result of the V1 API removal, advanced process filtering for user tasks was no longer supported. These changes let you use advanced process filters with the V2 User Tasks API again.

#### Impact

This affects the Java client because `io.camunda.client.api.search.filter.UserTaskFilter` now accepts advanced filters for `processDefinitionKey`, `processInstanceKey`, and `bpmnProcessId`.

#### Action

<Tabs groupId="audience" defaultValue="sdk" queryString values={[
{label: 'Official SDK users', value: 'sdk'},
{label: 'Generated-client users', value: 'generated'},
{label: 'Custom integrations', value: 'custom'},
]}>

<TabItem value='sdk'>

Update to the latest SDK version. The new SDK version includes advanced filters for `processDefinitionKey`, `processInstanceKey`, and `bpmnProcessId` in `UserTaskFilter`.

</TabItem>
<TabItem value='generated'>

Regenerate your client.

</TabItem>
<TabItem value='custom'>

No change is needed if your code already uses the exact-match filters for `processDefinitionKey`, `processInstanceKey`, and `bpmnProcessId` in `UserTaskFilter`.

</TabItem>
</Tabs>

## Next steps

Once you have completed the [upgrade steps](#upgrade-steps) in this guide, you should:

1. Re-compile and run your test suite against the 8.10 API.
<!--- 1. Review [8.10 release announcements](/reference/announcements-release-notes/8100/8100-announcements.md) for additional context on each change. --->
