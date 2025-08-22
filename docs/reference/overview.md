---
id: overview
title: Reference
sidebar_label: Reference
slug: /reference/
---

import "./react-components/\_release-table.css";
import ReleasesGrid from './react-components/\_release-card';
import { gettingStartedCards, securityCards } from './react-components/\_release-card-data';
import AskAi from './react-components/\_banner-ask-ai.md'

General Camunda 8 reference material, including release, security, licensing, and support information.

## Release announcements and release notes

Keep up-to-date with upcoming, current, and past Camunda releases.

<ReleasesGrid releases={gettingStartedCards} />

:::info Release policy
Learn about the [Camunda release policy](/reference/announcements-release-notes/release-policy.md) and specific clarifications about provisioning in SaaS and Self-Managed.
:::

## Security, licensing, and support information

Reference information including published security notices, licensing, supported environments, and source code access.

<ReleasesGrid releases={securityCards} />

## Support and feedback

[Get support](contact.md) for Camunda or send us your feedback.

<AskAi/>
