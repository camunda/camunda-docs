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
import OverviewImg from './img/hero-reference.png';

<h3 class="subheading">Camunda 8 reference, including release, security, and support information.</h3>

<div class="double-column-container" style={{marginBottom: '50px'}}>
<div class="double-column-left"  style={{marginRight: '50px', flex: '1.35'}}>

See what's new in our latest release, read release notes and release announcements, and access published security notices, licensing, supported environments, and source code access information.

<a class="button button--outline button--secondary button--md button--hero--topic" title="What's new in Camunda 8.8" href="./announcements-release-notes/880/whats-new-in-88/" style={{marginBottom: '30px', marginTop: '20px'}}>What's new in Camunda 8.8</a>

</div>
<div class="double-column-right" style={{flex: '1'}}>

<img src={OverviewImg} alt="Build BPMN processes and DMN decisions using powerful tools offering collaborative modeling, operations, and analytics." title="Build BPMN processes and DMN decisions using powerful tools offering collaborative modeling, operations, and analytics." class="img-noborder img-600 img-transparent hero-topic" style={{marginTop: '0', marginBottom: '0'}}/>

</div>
</div>

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
