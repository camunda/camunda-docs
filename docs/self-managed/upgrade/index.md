---
id: index
title: "Upgrade to Camunda 8.10"
description: "Administrator overview for preparing and running a Camunda 8.10 Self-Managed upgrade."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ZeebeGrid from '../../components/zeebe/react-components/\_zeebe-card';
import { overviewCards } from './react-components/\_card-data';

import OverviewImg from '../assets/hero-upgrade-810.png';

<h3 class="subheading">Upgrade your Camunda 8 Self-Managed deployment from version 8.9 to 8.10.</h3>

<div class="double-column-container" style={{marginBottom: '50px'}}>
<div class="double-column-left"  style={{marginRight: '50px', flex: '1.35'}}>

Prepare your Self-Managed environment for upgrading to Camunda 8.10. Confirm upgrade eligibility, understand platform-level changes, and identify actions you might need to take before upgrading.

<a class="button button--outline button--secondary button--md button--hero--topic" title="Prepare for upgrade" href="./prepare-for-upgrade/" style={{marginBottom: '30px', marginTop: '20px'}}>Prepare for upgrade</a>

</div>
<div class="double-column-right" style={{flex: '1'}}>

<img src={OverviewImg} alt="Upgrade your Camunda 8 Self-Managed deployment from version 8.9 to 8.10" title="Upgrade your Camunda 8 Self-Managed deployment from version 8.9 to 8.10" class="img-noborder img-600 img-transparent hero-topic" style={{marginTop: '0', marginBottom: '0'}}/>

</div>
</div>

## About

Upgrade a Camunda 8 Self-Managed deployment from version 8.9 to 8.10. This guide applies to Self-Managed installations only and does not apply to Camunda SaaS.

:::caution version 8.9 required
Camunda 8 upgrades must be performed sequentially. If your deployment is running a version **earlier than 8.9**, you must complete the required version-specific upgrades listed in [upgrading from an earlier version](#upgrading-from-an-earlier-version) before you can upgrade to 8.10.
:::

## Upgrade sequence

The 8.9 to 8.10 upgrade spans several guides. Work through them in this order, rather than treating them as separate destinations.

| Step | What you do                                                                                            | Guide                                                                                      |
| ---- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| 1    | Confirm upgrade eligibility, review platform changes in 8.10, and verify infrastructure compatibility. | [Prepare for upgrade](prepare-for-upgrade.md)                                              |
| 2    | Switch to the Helm v4 CLI, then create and update your 8.10 values file and run the upgrade.           | [Upgrade Camunda 8.9 to 8.10 using Helm](./helm/890-to-8100.md)                            |
| 3    | Monitor and validate the upgrade before returning the deployment to normal use.                        | [Monitor and validate the upgrade](./helm/890-to-8100.md#monitor-and-validate-the-upgrade) |

Review [component changes from 8.9 to 8.10](./components/890-to-8100.md) alongside these steps for behavior changes affecting the components you run.

<!-- TODO: Update this when we have content

## Upgrade guides

Choose the upgrade guide that matches how your environment is deployed:

<ZeebeGrid zeebe={overviewCards} />

## Docker Compose deployments

Docker Compose is supported for development and testing environments only.

Camunda does not provide an automated upgrade process for Docker Compose deployments. To upgrade, manually upgrade each component by following the component upgrade guide:

<p class="link-arrow">[Component upgrade from 8.8 to 8.9](./components/890-to-8100.md)</p>

For production environments, use Kubernetes with the official Camunda Helm chart or create a custom deployment process using Infrastructure as Code tools such as Terraform, Ansible, or AWS CloudFormation.

-->

## 8.10 release information

Learn about new features, breaking changes, and deprecations in Camunda 8.10:

- [What's new in Camunda 8.10](/reference/announcements-release-notes/8100/whats-new-in-810.md)
- [8.10 Release announcements](/reference/announcements-release-notes/8100/8100-announcements.md)
- [8.10 Release notes](/reference/announcements-release-notes/8100/8100-release-notes.md)

## Upgrading from an earlier version

**Camunda 8 upgrades must be performed sequentially.**

- You must upgrade sequentially, one minor version at a time. For example, you must upgrade from 8.8 to 8.9 before you can upgrade to 8.10.
- Upgrading to the latest available patch of each minor is strongly recommended for fix coverage.
- **Do not skip releases.** Skipping a minor version fails the schema compatibility check and blocks startup.

Use the following version-specific upgrade guides to upgrade sequentially until you reach Camunda 8.9 before you proceed with the 8.10 upgrade.

:::note
Each guide covers only the changes required for that specific version upgrade.
:::

### Kubernetes with Helm

- <a href="/docs/self-managed/upgrade/helm/" target="_blank" rel="noopener noreferrer">Upgrade from Camunda 8.8 to 8.9</a>
- <a href="/docs/8.8/self-managed/upgrade/helm/" target="_blank" rel="noopener noreferrer">Upgrade from Camunda 8.7 to 8.8</a>
- <a href="/docs/8.7/self-managed/setup/upgrade/" target="_blank" rel="noopener noreferrer">Upgrade from Camunda 8.6 to 8.7</a>
- <a href="https://unsupported.docs.camunda.io/8.6/docs/self-managed/setup/upgrade/" target="_blank" rel="noopener noreferrer">Upgrade from Camunda 8.5 to 8.6</a>
- <a href="https://unsupported.docs.camunda.io/8.5/docs/self-managed/setup/upgrade/" target="_blank" rel="noopener noreferrer">Upgrade from Camunda 8.4 to 8.5</a>
- <a href="https://unsupported.docs.camunda.io/8.4/docs/self-managed/platform-deployment/helm-kubernetes/upgrade/" target="_blank" rel="noopener noreferrer">Upgrade from Camunda 8.3 to 8.4</a>
- <a href="https://unsupported.docs.camunda.io/8.3/docs/self-managed/platform-deployment/helm-kubernetes/upgrade/" target="_blank" rel="noopener noreferrer">Upgrade from Camunda 8.2 to 8.3</a>

### Component-based upgrades

- <a href="/docs/self-managed/upgrade/components/" target="_blank" rel="noopener noreferrer">Component upgrade from 8.8 to 8.9</a>
- <a href="/docs/8.8/self-managed/upgrade/components/" target="_blank" rel="noopener noreferrer">Component upgrade from 8.7 to 8.8</a>
- <a href="/docs/8.7/self-managed/operational-guides/update-guide/860-to-870/" target="_blank" rel="noopener noreferrer">Component upgrade from 8.6 to 8.7</a>
- <a href="https://unsupported.docs.camunda.io/8.6/docs/self-managed/operational-guides/update-guide/850-to-860/" target="_blank" rel="noopener noreferrer">Component upgrade from 8.5 to 8.6</a>
- <a href="https://unsupported.docs.camunda.io/8.5/docs/self-managed/operational-guides/update-guide/840-to-850/" target="_blank" rel="noopener noreferrer">Component upgrade from 8.4 to 8.5</a>
- <a href="https://unsupported.docs.camunda.io/8.5/docs/self-managed/operational-guides/update-guide/830-to-840/" target="_blank" rel="noopener noreferrer">Component upgrade from 8.3 to 8.4</a>
- <a href="https://unsupported.docs.camunda.io/8.5/docs/self-managed/operational-guides/update-guide/820-to-830/" target="_blank" rel="noopener noreferrer">Component upgrade from 8.2 to 8.3</a>
