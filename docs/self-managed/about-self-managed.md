---
id: about-self-managed
title: "Camunda 8 Self-Managed"
description: "Step through everything you need to download, configure, and work with components of Camunda 8 Self-Managed, a self-hosted alternative to using Camunda 8 SaaS."
---

import Components from './react-components/components.md'
import OverviewImg from './assets/self-managed-hero.png';
import CardGrid from './react-components/\_card';
import { gettingStartedCards, installCards, referenceCards, updateCards } from './react-components/\_card-data';
import DocCardList from '@theme/DocCardList';

<h3 style={{marginTop: '-10px', marginBottom: '60px', fontWeight: 'normal'}}>Get started with the self-hosted alternative to Camunda 8 SaaS.</h3>

<div class="double-column-container">
<div class="double-column-left"  style={{marginRight: '50px', flex: '1.35'}}>

Building process automation solutions with Camunda 8 works similarly regardless of hosting and deployment. Learn how to download, configure, and use Self-Managed components and features.

<a class="button button--outline button--secondary button--md button--hero--topic" title="Get started with Self-Managed" href="../run-locally" style={{marginBottom: '30px', marginTop: '20px'}}>Install and run Camunda 8 locally</a>

</div>
<div class="double-column-right" style={{flex: '1'}}>

<img src={OverviewImg} alt="Image showing Self-Managed components and features" title="Use Camunda 8 Self-Managed as a self-hosted alternative to Camunda 8 SaaS" class="img-noborder img-600 img-transparent hero-topic" style={{marginTop: '0', marginBottom: '0'}}/>

</div>
</div>

## Install and run locally

New to Camunda 8 Self-Managed? Get started by installing and running Camunda 8 Self-Managed locally.

<CardGrid card={gettingStartedCards} />

## Install and run in production

Install and run Camunda 8 Self-Managed in production using Helm, Docker, or a manual setup.

<CardGrid card={installCards} />

## Reference architecture

Guidance for enterprise architects, developers, and IT managers wanting to streamline deployments and improve system reliability. Reference architectures provide comprehensive blueprints for designing and implementing scalable, robust, and adaptable systems.

<CardGrid card={referenceCards} />

:::info
For more information on Camunda 8 SaaS, visit [What is Camunda 8?](/components/components-overview.md) If you are new to Camunda 8, we recommend you start your journey with [Camunda 8 SaaS-based guides](../../guides/).
:::
