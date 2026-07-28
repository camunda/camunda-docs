---
id: moving-helm-v3-to-v4
title: "Move from the Helm v3 CLI to v4"
sidebar_label: "Move from Helm v3 to v4"
description: "Switch from the Helm v3 CLI to Helm v4 against the same cluster. No release-state migration is required for Camunda charts."
---

Since Camunda 8.10 (chart 15.x), Helm CLI v4 is required. If you are upgrading from Camunda 8.7, 8.8, or 8.9 using the Helm v3 CLI, switch to the Helm v4 CLI before you upgrade. **No release-state migration is required.**

## Why no migration is required

Helm is a client-side tool. The CLI renders chart templates and applies the resulting manifests to the cluster. Helm release metadata is stored as Kubernetes Secrets in the release namespace, and both the v3 and v4 CLIs read and write the same release-storage format.

This means:

- The same release works under both CLIs against the same cluster.
- There is no `helm 3to4` step for Camunda charts.
- You do not need to reinstall, re-import, or back up and restore release state when you change CLI versions.

## Switch from the v3 CLI to the v4 CLI

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

## Helm 4 behavior changes to review

Helm 4 enables server-side apply by default and removes some Helm 3 plugin behaviors. Review these changes before your first install or upgrade with the v4 CLI:

- [Helm 4 server-side apply and post-renderer changes](/self-managed/deploy-to-production/kubernetes/install/helm-v4.md)

## Helm v3 support

- Chart 15.x and later do not support Helm v3. Chart 14.x is the last minor that supports Helm v3.
- Helm v3 itself reaches end of support upstream: bug fixes through July 8, 2026, and security fixes through November 11, 2026. See the [Helm support policy](https://helm.sh/blog/helm-4-released#helm-v3-support).
