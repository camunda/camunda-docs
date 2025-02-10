---
id: instructions
title: "Instructions"
description: "Find out how to update to a new version of Optimize without losing your reports and dashboards."
---

Optimize releases two new minor versions a year. These documents guide you through the process of migrating your Optimize from one Optimize minor version to the other.

If you want to update Optimize by several versions, you cannot do that at once, but you need to perform the updates in sequential order. For instance, if you want to update from 3.7 to 3.10, you need to update first from 3.7 to 3.8, then from 3.8 to 3.9, and finally from 3.9 to 3.10. The following table shows the recommended update paths to the latest version:

| Update from        | Recommended update path to 8.6 |
| ------------------ | ------------------------------ |
| 8.6                | You are on the latest version. |
| 3.7 - 3.13.x/8.5.x | Rolling update to 8.6          |

:::note Heads Up!
Starting with version 8.6, separate artifacts are provided for Camunda 7 and Camunda 8. Moving forward, Camunda 8 users should adhere to the 8.x.x versioning format.
:::

## Migration instructions

You can migrate from one version of Optimize to the next one without losing data. To migrate to the latest version, please perform the following steps:

:::note ElasticSearch and OpenSearch databases
All the steps below are applicable to ElasticSearch and OpenSearch installations. To avoid duplication, we will only be referring to `Database` in the following instructions and will explicitly mention when a step is applicable only to ElasticSearch or OpenSearch.
:::

### 1. Preparation

- Make sure that the database has enough memory. To do that, shut down your database and go the `config` folder of your distribution. There you should find a file called `jvm.options`. Change the values of the two properties `Xms` and `Xmx` to at least `1g` so that the database has enough memory configured. This configuration looks as follows:

```bash
-Xms1g
-Xmx1g
```

- Restart the database and make sure that the instance is up and running throughout the entire migration process.
- You will need to shut down Optimize before starting the migration, resulting in downtime during the entire migration process.
- Back up your database instance ([ElasticSearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-snapshots.html) / [OpenSearch](https://opensearch.org/docs/latest/tuning-your-cluster/availability-and-recovery/snapshots/snapshot-restore/)) in case something goes wrong during the migration process. This is recommended, but optional.
- Make sure that you have enough storage available to perform the migration. During the migration process it can be the case that up to twice the amount of the storage of your database data is needed. (Highly recommended)
- Back up your `environment-config.yaml` and `environment-logback.xml` located in the `config` folder of the root directory of your current Optimize. (Optional)
- Start the new Optimize version, as described in the [installation guide](../../install-and-start.md).
- It is very likely that you configured the logging of Optimize to your needs and therefore you adjusted the `environment-logback.xml` in the `config` folder of the root directory of your **old** Optimize. You can now use the backed up logging configuration and put it in the `config` folder of the **new** Optimize to keep your logging adjustments. (Optional)

### 2. Rolling update to the new database version

You only need to execute this step if you want to update the Elasticsearch (ES) or OpenSearch (OS) version during the update. In case the ES/OS version stays the same, you can skip this step.

The database update is usually performed in a rolling fashion. Read all about how to do the update in the general [Elasticsearch Update Guide](https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-upgrade.html) / [OpenSearch Update Guide](https://opensearch.org/docs/latest/install-and-configure/upgrade-opensearch/index/) and consult the [rolling upgrade ES](https://www.elastic.co/guide/en/elasticsearch/reference/current/rolling-upgrades.html) / [rolling upgrade OS](https://opensearch.org/docs/2.17/install-and-configure/upgrade-opensearch/rolling-upgrade/) guide on how to conduct the rolling update.

### 3. Perform the migration

For upgrading the Camunda Helm chart from one release to another, perform a [Helm upgrade]($docs$/self-managed/setup/upgrade).

If Helm charts is not used, the update can be executed as part of the Optimize startup. In order to make use of this functionality, the command flag `--upgrade` has to be passed to the Optimize startup script.

In Docker environments this can be achieved by overwriting the default command of the docker container (being `./optimize.sh`), e.g. like in the following [docker-compose](https://docs.docker.com/compose/) snippet:

```
version: '2.4'

services:
  optimize:
    image: registry.camunda.cloud/optimize-ee/optimize:8-latest
    command: ["./optimize.sh", "--upgrade"]
```

However, as this may prolong the container boot time significantly which may conflict with [container status probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/) in managed environments like [Kubernetes](https://kubernetes.io/) we recommend using the [init container](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/) feature there to run the update:

```
  labels:
    app: optimize
spec:
   initContainers:
     - name: migration
       image: registry.camunda.cloud/optimize-ee/optimize:8-latest
       command: ['./upgrade/upgrade.sh', '--skip-warning']
   containers:
     - name: optimize
       image: registry.camunda.cloud/optimize-ee/optimize:8-latest
```

### 4. Resume a canceled update

Updates are resumable. So if the update process got interrupted either manually or due to an error you don't have to restore the database backup and start over but can simply rerun the update. On resume previously completed update steps will be detected and logged as being skipped. In the following log example **Step 1** was previously completed and is thus skipped:

```
./upgrade/upgrade.sh
...
INFO UpgradeProcedure - Skipping Step 1/2: UpdateIndexStep on index: process-instance-key1 as it was found to be previously completed already at: 2020-11-30T16:16:12.358Z.
INFO UpgradeProcedure - Starting step 2/2: UpdateIndexStep on index: process-instance-key2
...
```

### 5. Typical errors

- Using an update script that does not match your version:

```bash
Schema version saved in Metadata does not match required [8.X.0]
```

Let's assume have Optimize 8.4 and want to update to 8.6 and use the jar to update from 8.5 to 8.6. This error occurs because the jar expects the database to have the schema version 8.4. This is because you downloaded the wrong Optimize artifact which contained the wrong update jar version.
