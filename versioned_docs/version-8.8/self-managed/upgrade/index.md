---
id: index
title: "Upgrade to Camunda 8.8"
description: "Administrator overview for preparing and running a Camunda 8.8 Self-Managed upgrade."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ZeebeGrid from '../../components/zeebe/react-components/\_zeebe-card';
import { overviewCards } from './react-components/\_card-data';

import OverviewImg from '../assets/hero-upgrade.png';

<h3 class="subheading">Upgrade your Camunda 8 Self-Managed deployment from version 8.7 to 8.8.</h3>

<div class="double-column-container" style={{marginBottom: '50px'}}>
<div class="double-column-left"  style={{marginRight: '50px', flex: '1.35'}}>

Get started by preparing your Self-Managed environment for upgrade to Camunda 8.8. Confirm upgrade eligibility, understand platform-level changes, and identify actions you might need to take before upgrading.

<a class="button button--outline button--secondary button--md button--hero--topic" title="Prepare for upgrade" href="./prepare-for-upgrade/" style={{marginBottom: '30px', marginTop: '20px'}}>Prepare for upgrade</a>

</div>
<div class="double-column-right" style={{flex: '1'}}>

<img src={OverviewImg} alt="Upgrade your Camunda 8 Self-Managed deployment from version 8.7 to 8.8" title="Upgrade your Camunda 8 Self-Managed deployment from version 8.7 to 8.8" class="img-noborder img-600 img-transparent hero-topic" style={{marginTop: '0', marginBottom: '0'}}/>

</div>
</div>

## About

This guide applies to Camunda 8 Self-Managed installations only and does not apply to Camunda 8 SaaS.

:::caution version 8.7 required
Camunda 8 upgrades must be performed sequentially. If your deployment is running a version **earlier than 8.7**, you must complete the required version-specific upgrades listed in [upgrading from an earlier version](#upgrading-from-an-earlier-version) before you can upgrade to 8.8.
:::

## Prepare for upgrade

Review required preparation steps and important changes before upgrading to Camunda 8.8.

<p class="link-arrow">[Prepare for upgrade](prepare-for-upgrade.md)</p>

## Upgrade guides

Choose the upgrade guide that matches how your environment is deployed:

<ZeebeGrid zeebe={overviewCards} />

:::info Dual-region Helm deployments
If you are upgrading a dual-region Helm deployment, follow the standard Helm upgrade guide and then complete the additional dual-region steps.

<p class="link-arrow">[Camunda 8.7 to 8.8 Dual-Region Upgrade](./helm/870-to-880-dual-region.md)</p>
:::

## Docker Compose deployments

Docker Compose is supported for development and testing environments only.

Camunda does not provide an automated upgrade process for Docker Compose deployments. To upgrade, manually update each component by following the component upgrade guide:

<p class="link-arrow">[Component upgrade from 8.7 to 8.8](./components/870-to-880.md)</p>

With Camunda 8.8, the default `docker-compose.yaml` deploys the Orchestration Cluster and connectors. Web Modeler must be deployed using a separate Docker Compose configuration.

For production environments, use Kubernetes with the official Camunda Helm chart or create a custom deployment process using Infrastructure as Code tools such as Terraform, Ansible, or AWS CloudFormation.

## Upgrade components

Some upgrades require additional component-level steps depending on which components you use or how your environment is configured. Follow the upgrade guide for your deployment method and for any required component-specific changes or migrations.

<p class="link-arrow">[Component upgrade from 8.7 to 8.8](./components/870-to-880.md)</p>

## 8.8 release information

Learn about new features, breaking changes, and deprecations in Camunda 8.8:

- [What's new in Camunda 8.8](/reference/announcements-release-notes/880/whats-new-in-88.md)
- [8.8 Release announcements](/reference/announcements-release-notes/880/880-announcements.md)
- [8.8 Release notes](/reference/announcements-release-notes/880/880-release-notes.md)
- [Quality board](https://github.com/orgs/camunda/projects/187/views/15)

## Upgrading from an earlier version

**Camunda 8 upgrades must be performed sequentially.**

- You must upgrade from the latest patch version of your current Camunda release to the latest patch version of the next release.
- For example, you must upgrade from 8.6 to 8.7 before you can upgrade to 8.8.
- **Do not skip releases**.

Use the following version-specific upgrade guides to upgrade to Camunda 8.7 **before** you can proceed with the 8.8 upgrade.

### Kubernetes with Helm

- <a href="../../8.7/self-managed/setup/upgrade" target="_blank" rel="noopener noreferrer">Upgrade from Camunda 8.6 to 8.7</a>
- <a href="../../8.6/self-managed/setup/upgrade" target="_blank" rel="noopener noreferrer">Upgrade from Camunda 8.5 to 8.6</a>
- <a href="https://unsupported.docs.camunda.io/8.5/docs/self-managed/setup/upgrade/" target="_blank" rel="noopener noreferrer">Upgrade from Camunda 8.4 to 8.5</a>
- <a href="https://unsupported.docs.camunda.io/8.4/docs/self-managed/platform-deployment/helm-kubernetes/upgrade/" target="_blank" rel="noopener noreferrer">Upgrade from Camunda 8.3 to 8.4</a>
- <a href="https://unsupported.docs.camunda.io/8.3/docs/self-managed/platform-deployment/helm-kubernetes/upgrade/" target="_blank" rel="noopener noreferrer">Upgrade from Camunda 8.2 to 8.3</a>

### Component-based upgrades

- <a href="../../8.7/self-managed/operational-guides/update-guide/860-to-870" target="_blank" rel="noopener noreferrer">Component upgrade from 8.6 to 8.7</a>
- <a href="../../8.6/self-managed/operational-guides/update-guide/850-to-860" target="_blank" rel="noopener noreferrer">Component upgrade from 8.5 to 8.6</a>
- <a href="https://unsupported.docs.camunda.io/8.5/docs/self-managed/operational-guides/update-guide/840-to-850/" target="_blank" rel="noopener noreferrer">Component upgrade from 8.4 to 8.5</a>
- <a href="https://unsupported.docs.camunda.io/8.5/docs/self-managed/operational-guides/update-guide/830-to-840/" target="_blank" rel="noopener noreferrer">Component upgrade from 8.3 to 8.4</a>
- <a href="https://unsupported.docs.camunda.io/8.5/docs/self-managed/operational-guides/update-guide/820-to-830/" target="_blank" rel="noopener noreferrer">Component upgrade from 8.2 to 8.3</a>

:::note
Each guide covers only the changes required for that specific version upgrade.
:::
