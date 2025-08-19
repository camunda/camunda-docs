---
id: overview
title: Reference
sidebar_label: Reference
slug: /reference/
---

import "./react-components/\_release-table.css";
import ReleasesGrid from './react-components/\_release-card';
import { gettingStartedCards, securityCards } from './react-components/\_release-card-data';

General reference material for Camunda 8, including release, security, licensing, and support information.

## Release announcements and release notes

Keep up-to-date with upcoming, current, and past Camunda releases.

<ReleasesGrid releases={gettingStartedCards} />

:::info Release policy
Learn about the [Camunda release policy](/reference/announcements-release-notes/release-policy.md) with some specific clarifications across provisioning in SaaS and Self-Managed.
:::

## Security, licensing, and support

Reference information including security, licensing, supported environments, and source code access.

<ReleasesGrid releases={securityCards} />

## Data collection

Learn more about [Camunda data collection](data-collection/data-collection.md), including which telemetry data is collected, how Camunda ensures privacy, and what options you have to modify which telemetry data is sent to Camunda. Includes information about the main usage metrics that impact Camunda 8 pricing.

## Support and feedback

[Get support](contact.md) for Camunda or send us your feedback.

:::tip
Learn how you can [locate and obtain your Camunda 8 credentials](contact.md#locating-camunda-8-credentials).
:::
