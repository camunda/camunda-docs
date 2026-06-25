---
id: release-versions
title: "Release versions"
description: "A complete list of Camunda 8 releases including SaaS generations, Self-Managed Helm chart versions, and component version details."
toc_max_heading_level: 2
---

import PageDescription from '@site/src/components/PageDescription';
import ReleaseVersions from '@site/src/components/ReleaseVersions';
import releaseData from '@site/src/data/release-versions.json';

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

<PageDescription />

:::tip Subscribe to release notifications
Subscribe to the RSS feed for release updates and get automatic notifications when new releases are published.
:::

## About

Camunda 8 releases are as follows (whatever we want to say about this page and releases)...

See the [Camunda Helm Chart Version Matrix](https://helm.camunda.io/camunda-platform/version-matrix/) to find the Helm chart version for each Camunda release.

<ReleaseVersions />
