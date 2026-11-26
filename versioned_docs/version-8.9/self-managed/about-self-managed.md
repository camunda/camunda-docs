---
id: about-self-managed
title: "Camunda 8 Self-Managed"
sidebar_label: "Camunda 8 Self-Managed"
description: "Step through everything you need to download, configure, and work with components of Camunda 8 Self-Managed, a self-hosted alternative to using Camunda 8 SaaS."
keywords:
  - Camunda 8 Self-Managed
  - Camunda Self-Managed
  - Self-Managed Components
  - Kubernetes
  - Helm
  - Docker
  - Infrastructure
  - Reference Architecture
---

import {
Introduction,
QuickStart,
Installation,
Infrastructure,
ReferenceArchitecture,
Components,
} from "@site/src/components/CamundaSelfManaged";
import LandingHero from '@site/src/components/LandingHero';
import { selfManagedHero, selfManagedPodsOverlay } from './react-components/_hero-data';

<h3 class="subheading">Get started with our self-hosted alternative to Camunda 8 SaaS.</h3>

<LandingHero card={selfManagedHero} overlay={selfManagedPodsOverlay} href="/self-managed/deployment/helm/install/quick-install/" ariaLabel="Helm quick install">

Deploy and manage Camunda in your own infrastructure. Quickstart guides and infrastructure and deployment options help you build a robust process automation platform for your organization.

<p class="link-button">[Developer and administrator quickstart](./quickstart/overview.md)</p>

</LandingHero>

:::info Upgrade to Camunda 8.9

- Existing customer? Upgrade your Self-Managed deployment to 8.9 using the [upgrade to 8.9 guide](/self-managed/upgrade/index.md).
- See [what's new in Camunda 8.9](/reference/announcements-release-notes/890/whats-new-in-89.md), [release announcements](/reference/announcements-release-notes/890/890-announcements.md), and [release notes](/reference/announcements-release-notes/890/890-release-notes.md).

:::

<br />

## Self-Managed or SaaS?

<Introduction hideHeading/>

## Quickstart

<QuickStart hideHeading/>

## Installation methods

<Installation hideHeading/>

## Infrastructure

<Infrastructure hideHeading/>

## Reference architecture

<ReferenceArchitecture hideHeading/>

## Components

<Components hideHeading/>
