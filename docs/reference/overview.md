---
id: overview
title: Reference
sidebar_label: Reference
slug: /reference/
---

import "./react-components/\_release-table.css";
import ReleasesGrid from './react-components/\_release-card';
import { gettingStartedCards, securityCards } from './react-components/\_release-card-data';

General Camunda 8 reference material, including release, security, licensing, and support information.

## Release announcements and release notes

Keep up-to-date with upcoming, current, and past Camunda releases.

<ReleasesGrid releases={gettingStartedCards} />

:::info Release policy
Learn about the [Camunda release policy](/reference/announcements-release-notes/release-policy.md) with some specific clarifications across provisioning in SaaS and Self-Managed.
:::

## Security, licensing, and support

Reference information including published security notices, licensing, supported environments, and source code access.

<ReleasesGrid releases={securityCards} />

## Support and feedback

[Get support](contact.md) for Camunda or send us your feedback.

:::tip
Learn how you can [locate and obtain your Camunda 8 credentials](contact.md#locate-your-camunda-8-credentials).
:::
