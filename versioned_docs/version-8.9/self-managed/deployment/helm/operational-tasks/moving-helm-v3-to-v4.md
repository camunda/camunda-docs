---
id: moving-helm-v3-to-v4
title: "Move from the Helm v3 CLI to v4"
sidebar_label: "Move from Helm v3 to v4"
description: "Switch from Helm CLI v3 to v4 against the same cluster. No release-state migration is required for Camunda charts."
---

import HelmCliSupport from '../_partials/_helm-cli-support.md';

Camunda 8.9 (chart 14.x) supports both Helm CLI v3 and v4.

<HelmCliSupport />

Switching CLIs does not require a release-state migration.

## Why no migration is required

Helm is a client-side tool. The CLI renders chart templates and applies the resulting manifests to the cluster. Helm release metadata is stored as Kubernetes Secrets in the release namespace, and Helm CLI v3 and v4 read and write the same release-storage format.

This means:

- The same release works under both CLIs against the same cluster.
- There is no `helm 3to4` step for Camunda charts.
- You do not need to reinstall, re-import, or back up and restore release state when you change CLI versions.

## Switch from Helm CLI v3 to v4 {#switch-from-the-v3-cli-to-the-v4-cli}

1. Install the Helm CLI v4 on the workstation that runs your Helm commands. See [Installing Helm](https://helm.sh/docs/intro/install/).
2. Verify the CLI version:

   ```bash
   helm version
   ```

   Confirm the output reports a `v4.x` client version.

3. Verify the existing release is visible to the new CLI:

   ```bash
   helm list -n <namespace>
   ```

   Your existing Camunda release appears with the same name, chart version, and revision history.

4. Continue with your normal `helm upgrade` workflow. See [Upgrade Helm chart](/self-managed/upgrade/helm/index.md).

## Helm CLI v4 behavior changes to review {#helm-4-behavior-changes-to-review}

Helm CLI v4 enables server-side apply by default and removes some Helm CLI v3 plugin behaviors. Review these changes before your first install or upgrade with Helm CLI v4:

- [Helm CLI v4 server-side apply and post-renderer changes](/self-managed/deployment/helm/operational-tasks/helm-v4.md)

## Helm CLI v3 support {#helm-v3-support}

- Chart 14.x supports Helm CLI v3 and v4. With Helm CLI v3, the chart shows a warning when you run `helm install` or `helm upgrade`. See [Camunda Helm chart compatibility](./helm-v4.md#camunda-helm-chart-compatibility).
- Helm CLI v3.22.0 is the final Helm CLI v3 minor release. See the [Helm v3 end-of-life announcement](https://helm.sh/blog/helm-v3-end-of-life/).
