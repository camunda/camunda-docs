---
id: camunda-helm-toolkit
title: "Use the Camunda Helm Toolkit"
sidebar_label: "Helm values toolkit"
description: "Migrate and validate Camunda Helm override files with the local Web UI or Docker CLI, then review findings before upgrading."
---

Use the Camunda Helm Toolkit to migrate Helm override files between Camunda versions and check their configuration.

The toolkit rewrites supported configuration keys and reports changes that need your attention. It doesn't upgrade your deployment, migrate stored data, or replace the [Helm upgrade procedure](/self-managed/upgrade/helm/870-to-880.md).

## Check version compatibility

Migrate one adjacent Camunda minor version at a time, then review the output before continuing.

| Source version | Migration target | Post-migration validation |
| -------------- | ---------------- | ------------------------- |
| 8.7            | 8.8              | 8.8                       |
| 8.8            | 8.9              | 8.9                       |
| 8.9            | 8.10             | 8.10                      |

Standalone validation supports 8.8, 8.9, and 8.10. You can't validate an 8.7 file directly; migrate it to 8.8 first. Support for 8.10 is preliminary, and some changes require manual configuration.

The source and target arguments are Camunda versions, such as `8.7`, not Helm chart versions, such as `12.x`. Use the [Helm chart version matrix](https://helm.camunda.io/camunda-platform/version-matrix/) to identify your deployment's Camunda version.

## Prepare your files

Provide your own override files, such as the files you pass to Helm with `-f`, rather than the chart's default `values.yaml`.

- Install Docker and use a local Docker daemon with Linux containers.
- Keep a copy of your original overrides. For layered configurations, keep the files separate and record their Helm `-f` order.
- Identify the source and target Camunda versions. The examples on this page migrate 8.7 overrides to 8.8.

The examples use the [public Docker image](https://hub.docker.com/r/camunda/camunda-helm-toolkit/tags). Its `SNAPSHOT` tag is a rolling build, not a versioned release, and can change between pulls. The CLI examples use a POSIX-compatible shell on macOS or Linux. The Web UI avoids host-path mount commands.

## Use the local Web UI

Start the toolkit in Docker to migrate and validate files through your browser.

```bash
docker run --rm --pull always \
  -p 127.0.0.1:8080:8080 \
  camunda/camunda-helm-toolkit:SNAPSHOT
```

Open [the local toolkit](http://localhost:8080) in your browser. If port 8080 is occupied, change the first port in the mapping and use that port in the browser URL.

1. Select **Migrate** and upload or paste your override files.
2. Select source version **8.7**. The toolkit chooses the next minor version, **8.8**, as the target.
3. Run the migration and review the findings alongside the YAML. Select a finding to locate the affected configuration.
4. Select the target-version document to inspect the migrated output. To correct it, select **Edit migrated**, make your changes, and select **Validate again**.
5. Download each migrated document. The download uses the document currently displayed, so confirm you're viewing the target version rather than the original input.

For a configuration check without migration, select **Validate**, provide your overrides, and choose their Camunda version. Stop the container with `Ctrl+C` when you're finished.

## Migrate from the CLI

Run `migrate` to create an updated override file without modifying your source file.

From the directory containing `values-8.7.yaml`, run:

```bash
docker run --rm --pull always \
  --user "$(id -u):$(id -g)" --workdir /tmp \
  -v "$PWD":/work:ro \
  camunda/camunda-helm-toolkit:SNAPSHOT migrate \
  --input /work/values-8.7.yaml \
  --source 8.7 --target 8.8 \
  --output - > values-8.8.yaml
```

The container uses your user and group IDs and `/tmp` as its working directory. The input directory is mounted read-only. Docker writes the migrated YAML to standard output, and your shell saves it on the host. Choose a new output filename: shell redirection replaces an existing file, so never redirect to an input file.

With `--output -`, the report and summary go to standard error, separate from the YAML. A completed migration can produce output and still exit with warnings or validation errors. Check the exit code and findings before using the output; a tool failure can leave an empty redirected file.

Migration automatically validates each output against its target version. It changes keys present in your overrides, but doesn't add the target chart's defaults or automatically apply every recommended setting.

### Migrate layered overrides

Use repeated `--input` arguments and `--output-dir` to keep layered overrides separate.

From the directory containing your 8.7 `base.yaml` and `production.yaml` overrides, create a separate output directory and run:

```bash
mkdir -p migrated
docker run --rm --pull always \
  --user "$(id -u):$(id -g)" --workdir /tmp \
  --env TMPDIR=/output \
  -v "$PWD":/input:ro \
  -v "$PWD/migrated":/output \
  camunda/camunda-helm-toolkit:SNAPSHOT migrate \
  --input /input/base.yaml --input /input/production.yaml \
  --source 8.7 --target 8.8 \
  --output-dir /output \
  --output-format markdown --report-file /output/migration-report.md
```

The container runs with your user and group IDs so it can write to the output mount. `TMPDIR=/output` keeps temporary files on the same filesystem as the output, which is required when the toolkit moves completed files into place. The toolkit writes `migrated/base.yaml` and `migrated/production.yaml`, without merging them. Input basenames must be unique. Use a separate output directory for each migration to avoid replacing earlier results.

When you continue with the Helm upgrade guide, pass the migrated overrides in the same order: `-f migrated/base.yaml -f migrated/production.yaml`. Later files still take precedence on shared keys.

### Continue across additional versions

Review and correct each migrated output before using it as the next migration's input.

For example, to prepare 8.7 overrides for 8.9, run 8.7 to 8.8 first, then 8.8 to 8.9. Preparing files for several versions doesn't let you skip deployment upgrades or intermediate data migrations. Follow each version's upgrade guide in order.

## Validate override files

Run `validate` to check an existing or edited override without migrating it.

```bash
docker run --rm --pull always \
  --user "$(id -u):$(id -g)" --workdir /tmp \
  -v "$PWD":/work:ro \
  camunda/camunda-helm-toolkit:SNAPSHOT validate \
  --input /work/values-8.8.yaml --target 8.8 \
  --output-format markdown
```

Validation checks the keys your file contains for types, unsupported or deprecated settings, and configuration rules. It doesn't require an override to contain every chart setting. Each file is checked separately, not as the merged result of all Helm layers.

A clean report doesn't prove deployment readiness. Validation doesn't check live Kubernetes resources, stored data, all cross-file requirements, or whether the complete configuration renders and runs successfully. Review the findings, render or test the complete configuration, and follow the upgrade guide's required checks.

## Interpret reports and exit codes

Reports identify changes, warnings, and validation errors that need review before deployment.

| Option            | Purpose                                                                   |
| ----------------- | ------------------------------------------------------------------------- |
| `--output-format` | Select `json` (default), `yaml`, or `markdown` for the report.            |
| `--report-file`   | Save the report to a container path on a writable host-mounted directory. |
| `--strict`        | Treat warnings as validation errors when choosing the exit code.          |

Without `--report-file`, reports go to standard output, except when `migrate --output -` reserves it for YAML. The one-line summary goes to standard error.

| Exit code | Meaning                                               |
| --------- | ----------------------------------------------------- |
| `0`       | No warnings or errors.                                |
| `1`       | Tool or usage failure; don't rely on the output.      |
| `2`       | Warnings or manual follow-up required.                |
| `3`       | Validation errors, or warnings when using `--strict`. |

Inspect both the migrated YAML and the report. Some findings recommend changes the toolkit can't safely automate. For all command options, run `docker run --rm camunda/camunda-helm-toolkit:SNAPSHOT migrate --help` or replace `migrate` with `validate`.

## Keep configuration local

With the local Docker setup above, your YAML is processed by the container on your machine.

The Web UI has no authentication. Keep the `127.0.0.1` port binding and don't expose the service on a shared network. Downloading the image requires registry access; processing files doesn't require access to your Kubernetes cluster.

Treat input files, migrated files, and reports as potentially sensitive. They can contain configuration values, including credentials. Review them before sharing or committing them.

After reviewing the results, continue with [upgrading Camunda 8.7 to 8.8 using Helm](/self-managed/upgrade/helm/870-to-880.md). The toolkit doesn't replace backups, non-production testing, or the required deployment and data-migration steps.
