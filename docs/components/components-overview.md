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

<div class="double-column-container">
<div class="double-column-left"  style={{marginRight: '50px', flex: '1.35'}}>

Orchestrate and automate complex business processes for people, systems, and devices. Build BPMN processes and DMN decisions using powerful tools offering collaborative modeling, operations, and analytics.

<a class="button button--outline button--secondary button--md button--hero--topic" title="Get started with Self-Managed" href="concepts/concepts-overview" style={{marginBottom: '30px', marginTop: '20px'}}>Introduction to Camunda 8</a>

</div>
<div class="double-column-right" style={{flex: '1'}}>

<img src={OverviewImg} alt="Build BPMN processes and DMN decisions using powerful tools offering collaborative modeling, operations, and analytics." title="Build BPMN processes and DMN decisions using powerful tools offering collaborative modeling, operations, and analytics." class="img-noborder img-600 img-transparent hero-topic" style={{marginTop: '0', marginBottom: '0'}}/>

</div>
</div>

## Best Practices

[Camunda Best Practices](/components/best-practices/best-practices-overview.md) distill our experience with BPMN and DMN on the Camunda toolstack, incorporating insights from consulting, community feedback, and various interactions. For example, learn about [deciding your stack](/components/best-practices/architecture/deciding-about-your-stack.md), and [sizing your environment](/components/best-practices/architecture/sizing-your-environment.md) to make sure your production deployment is sized appropriately, and can scale without any backpressure issues.

## Features and integrations

Get started with selected key features and integrations.

<UsingGrid using={featuresCards} />

## Using Camunda

Explore and learn about Camunda components and BPMN, DMN, and FEEL expressions.

<UsingGrid using={usingCamundaCards} />

## Camunda SaaS

Reference information for [Camunda 8 SaaS](/components/saas/saas.md), including clusters, regions, and encryption at rest.

## Glossary

Explore the [glossary](/reference/glossary.md) and understand definitions for key Camunda 8 terms and abbreviations.

<AskAi/>
