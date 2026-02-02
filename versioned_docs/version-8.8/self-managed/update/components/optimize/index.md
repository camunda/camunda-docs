---
sidebar_label: Optimize
title: Upgrade Optimize
description: Upgrade Optimize when moving from Camunda 8.7 to 8.8, including required data migrations and environment changes.
---

Upgrade Optimize as part of a Camunda 8 Self-Managed upgrade from version 8.7 to 8.8.

Optimize requires a data migration when upgrading to 8.8. The steps depend on how Optimize is deployed and whether you are also upgrading your Elasticsearch or OpenSearch database.

## Upgrade Optimize from 8.7 to 8.8

Follow the Optimize migration guide to run the required data upgrade without losing reports or dashboards.

<p><a href="./870-to-880.md" class="link-arrow">Upgrade Optimize from 8.7 to 8.8</a></p>

## Changes in Optimize 8.8

Review Optimize-specific changes introduced in 8.8, including supported database versions.

<p><a href="./changes-in-8.8.md" class="link-arrow">Optimize changes in 8.8</a></p>

## Upgrading from an earlier Optimize version

Optimize upgrades must be performed sequentially. If your Optimize deployment is running a version earlier than 8.7, complete the required intermediate upgrades before upgrading to 8.8.

- <a href="../../../8.7/self-managed/optimize-deployment/migration-update/camunda-8/8.6-to-8.7.md" target="_blank" rel="noopener noreferrer">Optimize update notes (8.6 to 8.7)</a>
- <a href="../../../8.6/self-managed/optimize-deployment/migration-update/camunda-8/3.13_8.5-to-8.6.md" target="_blank" rel="noopener noreferrer">Optimize update notes (8.5/3.13 to 8.6)</a>
- <a href="../../../8.6/self-managed/optimize-deployment/migration-update/camunda-8/3.12_8.4-to-3.13_8.5.md" target="_blank" rel="noopener noreferrer">Optimize update notes (8.4/3.12 to 8.5/3.13)</a>
- <a href="../../../8.6/self-managed/optimize-deployment/migration-update/camunda-8/3.11_8.3-to-3.12_8.4.md" target="_blank" rel="noopener noreferrer">Optimize update notes (8.3/3.11 to 8.4/3.12)</a>
- <a href="../../../8.6/self-managed/optimize-deployment/migration-update/camunda-8/3.10-to-3.11_8.3.md" target="_blank" rel="noopener noreferrer">Optimize update notes (3.10 to 8.3/3.11)</a>
- <a href="../../../8.6/self-managed/optimize-deployment/migration-update/camunda-8/3.9-to-3.10.md" target="_blank" rel="noopener noreferrer">Optimize update notes (3.9.x to 3.10)</a>
- <a href="../../../8.6/self-managed/optimize-deployment/migration-update/camunda-8/3.9-preview-to-3.9.md" target="_blank" rel="noopener noreferrer">Optimize update notes (3.9-preview-x to 3.9.x)</a>
- <a href="../../../8.6/self-managed/optimize-deployment/migration-update/camunda-8/3.8-to-3.9-preview.md" target="_blank" rel="noopener noreferrer">Optimize update notes (3.8.x to 3.9.x-preview-1)</a>
- <a href="../../../8.6/self-managed/optimize-deployment/migration-update/camunda-8/3.7-to-3.8.md" target="_blank" rel="noopener noreferrer">Optimize update notes (3.7.x to 3.8.x)</a>
