---
id: overview
title: "8.9 release information"
sidebar_label: "Release information"
description: "What's new, release notes, announcements, and supporting information for Camunda 8.9."
---

import PageDescription from '@site/src/components/PageDescription';
import ReleasesGrid from '../react-components/\_release-card';
import { releaseInfoCards } from '../react-components/\_release-card-data';

<PageDescription />

## Release information

See what's new in Camunda 8.9, key changes and [supported environments](/reference/supported-environments.md) changes in the release announcements, and new features in the release notes.

<ReleasesGrid releases={releaseInfoCards} />

:::info Upgrade guidance

- See [upgrade Camunda](/self-managed/upgrade/index.md) for guidance on upgrading your Self-Managed Camunda 8 application or server installation.
- Refer to the [quality board](https://github.com/orgs/camunda/projects/187/views/21) for an overview of known bugs by component and severity.

:::

## Release schedule

Key dates for the Camunda 8.9 release.

| Version      | Release type | Release date     | Scheduled end of maintenance |
| :----------- | :----------- | :--------------- | :--------------------------- |
| 8.9.0        | Minor        | 14 April 2026    | 12 October 2027              |
| 8.9.0-alpha5 | Alpha        | 10 March 2026    | -                            |
| 8.9.0-alpha4 | Alpha        | 10 February 2026 | -                            |
| 8.9.0-alpha3 | Alpha        | 13 January 2026  | -                            |
| 8.9.0-alpha2 | Alpha        | 9 December 2025  | -                            |
| 8.9.0-alpha1 | Alpha        | 13 November 2025 | -                            |

:::info Release policy
Review the [release policy](/reference/announcements-release-notes/release-policy.md) to learn more about Camunda releases, including alpha features and alpha releases.
:::

## Changelogs

Technical changelogs for Camunda 8 are available on GitHub:

| Changelog          | Repository                                                                                                     |
| :----------------- | :------------------------------------------------------------------------------------------------------------- |
| Camunda 8 Core     | [github.com/camunda/camunda/releases](https://github.com/camunda/camunda/releases)                             |
| Connectors         | [github.com/camunda/connectors/releases](https://github.com/camunda/connectors/releases)                       |
| Camunda Helm chart | [github.com/camunda/camunda-platform-helm/releases](https://github.com/camunda/camunda-platform-helm/releases) |
| Desktop Modeler    | [github.com/camunda/camunda-modeler/releases](https://github.com/camunda/camunda-modeler/releases)             |

## Previous releases

Release dates and information for previous Camunda 8 releases that are still maintained.

<table className="table-callout" width="100%">
<tr>
<td>**Version**</td>
<td>**Release date**</td>
<td>**Scheduled end of maintenance**</td>
<td>**Release information**</td>
<td>**Changelogs**</td>
</tr>
<tr>
<td>8.8</td>
<td>14 October 2025</td>
<td>13 April 2027</td>
<td><ul><li>[Announcements](/reference/announcements-release-notes/880/880-announcements.md)</li><li>[Release notes](/reference/announcements-release-notes/880/880-release-notes.md)</li></ul></td>
<td><ul><li>[Camunda 8 core](https://github.com/camunda/camunda/releases/tag/8.8.0)</li><li>[Connectors](https://github.com/camunda/connectors/releases/tag/8.8.0)</li></ul></td>
</tr>
</table>
