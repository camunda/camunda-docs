---
id: components-overview
title: Using Camunda
sidebar_label: Using Camunda
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

Use Camunda to orchestrate and automate complex business processes that span people, systems, and devices. Build BPMN processes and DMN decisions using powerful tools offering collaborative modeling, operations, and analytics.

<a class="button button--outline button--secondary button--md button--hero--topic" title="Get started with Self-Managed" href="concepts/concepts-overview" style={{marginBottom: '30px', marginTop: '20px'}}>Introduction to Camunda</a>

</div>
<div class="double-column-right" style={{flex: '1'}}>

<img src={OverviewImg} alt="Image showing Self-Managed components and features" title="Use Camunda 8 Self-Managed as a self-hosted alternative to Camunda 8 SaaS" class="img-noborder img-600 img-transparent hero-topic" style={{marginTop: '0', marginBottom: '0'}}/>

</div>
</div>

## Best Practices

[Camunda Best Practices](/components/best-practices/best-practices-overview.md) distill our experience with BPMN and DMN on the Camunda toolstack, incorporating insights from consulting, community feedback, and various interactions.

## Features and integrations

Get started with selected key features and integrations.

<UsingGrid using={featuresCards} />

## Using Camunda

Explore and learn about Camunda components and BPMN, DMN, and FEEL expressions.

<UsingGrid using={usingCamundaCards} />

## Camunda SaaS

<AskAi/>
