---
id: release-versions
title: "Release versions"
description: "Camunda 8 releases including SaaS generations, Helm chart versions, and component version details."
toc_max_heading_level: 2
---

import PageDescription from '@site/src/components/PageDescription';
import ReleaseVersions from '@site/src/components/ReleaseVersions';
import releaseData from '@site/src/data/release-versions.json';

<PageDescription />

:::tip Subscribe to release notifications
Subscribe to the [RSS feed](pathname:///rss/releases/versions.xml) for release updates and get automatic notifications when new releases are published.
:::

export const toc = (() => {
const entries = [{ value: 'About', id: 'about', level: 2 }];
const seenMonths = new Set();
for (const { date } of releaseData) {
const [year, month, day] = date.split('-').map(Number);
const monthKey = date.slice(0, 7);
if (!seenMonths.has(monthKey)) {
seenMonths.add(monthKey);
const monthValue = new Date(year, month - 1, 1).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
entries.push({ value: monthValue, id: monthKey, level: 2 });
}
const dateValue = new Date(year, month - 1, day).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
entries.push({ value: dateValue, id: date, level: 3 });
}
return entries;
})();

## About

Each release shows the component versions shipped together and links to the GitHub changelog for each component.

**SaaS**: Generation numbers (for example, 8.9+gen9) indicate a patch deployment to the SaaS platform. A higher generation number means a newer patch within the same minor version.

**Self-Managed:** Use the version tabs to find the component versions that correspond to your Helm chart release. To map Helm chart versions to component versions, see the [Camunda Helm chart version matrix](https://helm.camunda.io/camunda-platform/version-matrix/).

:::note Supported versions
Not all minor versions receive ongoing patch releases. See [supported environments](/reference/supported-environments.md) to check actively maintained versions.
:::

<ReleaseVersions />
