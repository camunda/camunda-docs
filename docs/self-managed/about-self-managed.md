---
id: about-self-managed
title: "Camunda 8 Self-Managed"
description: "Step through everything you need to download, configure, and work with components of Camunda 8 Self-Managed, a self-hosted alternative to using Camunda 8 SaaS."
---

import Components from './react-components/components.md'
import OverviewImg from './assets/self-managed-hero.png';
import CardGrid from './react-components/\_card';
import { gettingStartedCards, installCards } from './react-components/\_card-data';

<h3 style={{marginTop: '-10px', marginBottom: '60px', fontWeight: 'normal'}}>Get started with our self-hosted alternative to Camunda 8 SaaS.</h3>

<div class="double-column-container">
<div class="double-column-left"  style={{marginRight: '50px', flex: '1.35'}}>

Building process automation solutions with Camunda 8 works similarly regardless of hosting and deployment. Learn how to download, configure, and use Self-Managed components and features.

<a class="button button--outline button--secondary button--md button--hero--topic" title="Get started with Self-Managed" href="../run-locally" style={{marginBottom: '30px', marginTop: '20px'}}>Install and run Self-Managed locally</a>

</div>
<div class="double-column-right" style={{flex: '1'}}>

<img src={OverviewImg} alt="Image showing Self-Managed components and features" title="Use Camunda 8 Self-Managed as a self-hosted alternative to Camunda 8 SaaS" class="img-noborder img-600 img-transparent hero-topic fade-in-top-image" style={{marginTop: '0', marginBottom: '0'}}/>

</div>
</div>

## Install and run locally

Install and run Camunda 8 Self-Managed locally using Camunda 8 Run, Docker Compose, or your local Kubernetes cluster.

<CardGrid card={gettingStartedCards} />

## Install and run in production

Install and run Camunda 8 Self-Managed in production using Helm, Docker, or a manual setup.

<CardGrid card={installCards} />

## Configuration guides

Learn more about different use cases and scenarios for configuring Camunda 8 beyond the default values.

<div class="double-column-container">
<div class="double-column-left"  style={{marginRight: '30px', flex: '1'}}>

- [Accessing components without Ingress](/self-managed/setup/guides/accessing-components-without-ingress.md)
- [Ingress setup](/self-managed/setup/guides/ingress-setup.md)
- [Using existing Keycloak](/self-managed/setup/guides/using-existing-keycloak.md)
- [Using existing Elasticsearch](/self-managed/setup/guides/using-existing-elasticsearch.md)
- [Using Amazon OpenSearch Service](/self-managed/setup/guides/using-existing-opensearch.md)
- [Configure custom HTTP headers](/self-managed/setup/guides/configure-db-custom-headers.md)
- [Connect to an OpenID Connect provider](/self-managed/setup/guides/connect-to-an-oidc-provider.md)

</div>
<div class="double-column-right" style={{flex: '1'}}>

- [Installing in an air-gapped environment](/self-managed/setup/guides/air-gapped-installation.md)
- [Running custom connectors](/self-managed/setup/guides/running-custom-connectors.md)
- [Multi-namespace deployment](/self-managed/setup/guides/multi-namespace-deployment.md)
- [Verifying Camunda 8 installation with a demo app](/self-managed/setup/guides/installing-payment-example.md)
- [Inject custom Kubernetes manifests](/self-managed/setup/guides/add-extra-manifests.md)
- [Prefix Elasticsearch indices](/self-managed/setup/guides/configure-elastcisearch-prefix-indices.md)
- [Managing secrets in Helm charts](/self-managed/setup/guides/secret-management.md)

</div>
</div>

## Operational guides

<div class="double-column-container">
<div class="double-column-left"  style={{marginRight: '30px', flex: '1'}}>

- [Configure multi-tenancy](/self-managed/operational-guides/configure-multi-tenancy.md)
- [Backup and restore](/self-managed/operational-guides/backup-restore/backup-and-restore.md)
- [Data purge](/self-managed/operational-guides/data-purge.md)
- [Configure components](/self-managed/operational-guides/application-configs.md)

</div>
<div class="double-column-right" style={{flex: '1'}}>

- [Configure flow control](/self-managed/operational-guides/configure-flow-control/configure-flow-control.md)
- [Multi-region](/self-managed/operational-guides/multi-region/dual-region-ops.md)
- [Monitoring](/self-managed/operational-guides/monitoring/log-levels.md)
- [Troubleshooting](/self-managed/operational-guides/troubleshooting/troubleshooting.md)

</div>
</div>

## Concepts

## Components
