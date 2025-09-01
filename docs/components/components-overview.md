---
id: components-overview
title: Using Camunda 8
sidebar_label: Using Camunda 8
slug: /components/
description: "This section contains product manual content for each component in Camunda 8, including conceptual content."
keywords:
  [
    "workflow process",
    "workflow engine",
    "process management software",
    "bpm business process management",
    "business process automation",
    "camunda software",
    "camunda cloud",
    "process automation platform",
    "process automation software",
    "process orchestration",
  ]
---

import OverviewImg from './assets/hero-using-camunda.png';
import "./react-components/\_using-table.css";
import UsingGrid from './react-components/\_using-card';
import { featuresCards, usingCamundaCards } from './react-components/\_using-card-data';
import AskAi from './react-components/\_banner-ask-ai.md'

<h3 class="subheading">Learn how to use Camunda to orchestrate your processes.</h3>

<div class="double-column-container" style={{marginBottom: '50px'}}>
<div class="double-column-left"  style={{marginRight: '50px', flex: '1.35'}}>

Orchestrate and automate complex business processes for people, systems, and devices. Build BPMN processes and DMN decisions using powerful tools offering collaborative modeling, operations, and analytics.

<a class="button button--outline button--secondary button--md button--hero--topic" title="Get started with Self-Managed" href="concepts/concepts-overview" style={{marginBottom: '30px', marginTop: '20px'}}>Introduction to Camunda 8</a>

</div>
<div class="double-column-right" style={{flex: '1'}}>

<img src={OverviewImg} alt="Build BPMN processes and DMN decisions using powerful tools offering collaborative modeling, operations, and analytics." title="Build BPMN processes and DMN decisions using powerful tools offering collaborative modeling, operations, and analytics." class="img-noborder img-600 img-transparent hero-topic" style={{marginTop: '0', marginBottom: '0'}}/>

</div>
</div>

:::info Camunda 8.8

- See [what's new in Camunda 8.8](/components/whats-new-in-88.md), [release announcements](/reference/announcements-release-notes/880/880-announcements.md), and [release notes](/reference/announcements-release-notes/880/880-release-notes.md).

:::

## Best Practices

Camunda Best Practices distill our experience with BPMN and DMN on the Camunda toolstack, incorporating insights from consulting, community feedback, and various interactions.

<p><a href="./best-practices/best-practices-overview/" class="link-arrow">Camunda Best Practices</a></p>

:::tip
Learn about [deciding your stack](/components/best-practices/architecture/deciding-about-your-stack.md), and [sizing your environment](/components/best-practices/architecture/sizing-your-environment.md) to make sure your production deployment is sized appropriately, and can scale without any backpressure issues.
:::

## Features and integrations

Get started with selected key features and integrations.

<UsingGrid using={featuresCards} />

## Using Camunda

Explore and learn about Camunda components and BPMN, DMN, and FEEL expressions.

<UsingGrid using={usingCamundaCards} />

## Camunda 8 SaaS

Reference information for Camunda 8 SaaS, including clusters, regions, and encryption at rest.

<p><a href="./saas/" class="link-arrow">Camunda 8 SaaS</a></p>

## Glossary

Explore the glossary and understand definitions for key Camunda 8 terms and abbreviations.

<p><a href="../reference/glossary/" class="link-arrow">Glossary</a></p>

<AskAi/>
