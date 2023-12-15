---
id: instructions
title: "Instructions"
description: "Find out how to update to a new version of Optimize without losing your reports and dashboards."
---

Optimize releases two new minor versions a year. These documents guide you through the process of migrating your Optimize from one Optimize minor version to the other.

If you want to update Optimize by several versions, you cannot do that at once, but you need to perform the updates in sequential order. For instance, if you want to update from 2.5 to 3.0, you need to update first from 2.5 to 2.6, then from 2.6 to 2.7, and finally from 2.7 to 3.0. The following table shows the recommended update paths to the latest version:

| Update from | Recommended update path to 3.10                                   |
| ----------- | ----------------------------------------------------------------- |
| 3.10        | You are on the latest version.                                    |
| 3.0 - 3.9.x | Rolling update to 3.10                                            |
| 2.0 - 2.7   | 1. Rolling update to 2.7 <br /> 2. Rolling update from 2.7 to 3.0 |
| 1.0 - 1.5   | No update possible. Use the latest version directly.              |

## Migration instructions

You can migrate from one version of Optimize to the next one without losing data. To migrate to the latest version, please perform the following steps:

### 1. Preparation

- Make sure that Elasticsearch has enough memory. To do that, shut down Elasticsearch and go the `config` folder of your Elasticsearch distribution. There you should find a file called `jvm.options`. Change the values of the two properties `Xms` and `Xmx` to at least `1g` so that Elasticsearch has enough memory configured. This configuration looks as follows:

```bash
-Xms1g
-Xmx1g
```

- Restart Elasticsearch and make sure that the instance is up and running throughout the entire migration process.
- You will need to shut down Optimize before starting the migration, resulting in downtime during the entire migration process.
- [Back up your Elasticsearch instance](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-snapshots.html) in case something goes wrong during the migration process. (Highly recommended, but optional)
- Make sure that you have enough storage available to perform the migration. During the migration process it can be the case that up to twice the amount of the storage of your Elasticsearch data is needed. (Highly recommended)
- Back up your `environment-config.yaml` and `environment-logback.xml` located in the `config` folder of the root directory of your current Optimize. (Optional)
- If you are using Optimize plugins it might be required to adjust those plugins to the new version. To do this, go to the project where you developed your plugins, increase the project version in maven to new Optimize version and build the plugin again (checkout the [plugin guide](../plugins/plugin-system.md) for the details on that). Afterwards, add the plugin jar to the `plugin` folder of your new Optimize distribution. (Optional)
- Start the new Optimize version, as described in the [installation guide](../install-and-start.md).
- It is very likely that you configured the logging of Optimize to your needs and therefore you adjusted the `environment-logback.xml` in the `config` folder of the root directory of your **old** Optimize. You can now use the backed up logging configuration and put it in the `config` folder of the **new** Optimize to keep your logging adjustments. (Optional)

### 2. Rolling update to the new Elasticsearch version

You only need to execute this step if you want to update the Elasticsearch (ES) version during the update. In case the ES version stays the same, you can skip this step.

The Elasticsearch update is usually performed in a rolling fashion. Read all about how to do the ES update in the general [Elasticsearch Update Guide](https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-upgrade.html) and consult the [rolling ugprade](https://www.elastic.co/guide/en/elasticsearch/reference/current/rolling-upgrades.html) guide of the ES documentation on how to conduct the rolling update. If you have a very simple setup, for instance, a cluster with only one ES node without plugins installed nor machine learning jobs nor special configuration, the update would essentially boil down to the following steps:

1. Install the new ES version, e.g. using Docker, your favorite package manager, or just by downloading and extracting the new tar/zip archive to a new directory.
2. Copy the data from the old ES to the new ES. If you don't expect any new data coming to your old ES you can just copy the `data` folder from the old ES distribution and overwrite the `data` folder in the new ES distribution.
3. Copy your old configuration (`config/elasticsearch.yml`) over to the new ES installation.
4. Stop the old ES instance.
5. Start the new ES instance and check that everything looks fine.

Although the above steps summarize the basic update procedure, it is still highly recommended to read through the Elastic documentation to avoid any potential issues.

:::note Heads Up!

Note that the following updates are not supported by Elasticsearch:

- 6.8 to 7.0.
- 6.7 to 7.1.–7.X (where X>1, e.g. 7.5)

:::

### 3. Perform the migration

- Go to the [enterprise download page](https://docs.camunda.org/enterprise/download/#camunda-optimize) and download the new version of Optimize you want to update to. For instance, if your current version is Optimize 2.2, you should download the version 2.3. Extract the downloaded archive in your preferred directory. The archive contains the Optimize application itself and the executable to update Optimize from your old version to the new version.
- In the `config` folder of your **current** Optimize version, you have defined all configuration in the `environment-config.yaml` file, e.g. for Optimize to be able to connect to the engine and Elasticsearch. Copy the old configuration file and place it in the `config` folder of your **new** Optimize distribution. Bear in mind that the configuration settings might have changed and thus the new Optimize won't recognize your adjusted settings or complain about settings that are outdated and therefore refuses to startup. Best checkout the Update Notes subsections for deprecations.

#### 3.1 Manual update script execution

This approach requires you to manually execute the update script. You can perform this from any machine that has access to your Elasticsearch cluster.

- Open up a terminal, change to the root directory of your **new** Optimize version and run the following command: `./upgrade/upgrade.sh` on Linux or `update/update.bat` on Windows
- During the execution the executable will output a warning to ask you to back-up your Elasticsearch data. Type `yes` to confirm that you have backed up the data.
- Feel free to [file a support case](https://docs.camunda.org/enterprise/support/) if any errors occur during the migration process.
- To get more verbose information about the update, you can adjust the logging level as it is described in the [configuration documentation](./../configuration/logging.md).

#### 3.2 Automatic update execution (Optimize >3.2.0)

With the Optimize 3.2.0 release the update can also be executed as part of the Optimize startup. In order to make use of this functionality, the command flag `--upgrade` has to be passed to the Optimize startup script:

```bash
For UNIX:
./optimize-startup.sh --upgrade

For Windows:
./optimize-startup.bat --upgrade
```

This will run the update prior to starting up Optimize and only then start Optimize.

In docker environments this can be achieved by overwriting the default command of the docker container (being `./optimize.sh`), e.g. like in the following [docker-compose](https://docs.docker.com/compose/) snippet:

```
version: '2.4'

services:
  optimize:
    image: registry.camunda.cloud/optimize-ee/optimize:latest
    command: ["./optimize.sh", "--upgrade"]
```

However, as this may prolong the container boot time significantly which may conflict with [container status probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/) in managed environments like [Kubernetes](https://kubernetes.io/) we recommend using the [init container](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/) feature there to run the update:

```
  labels:
    app: optimize
spec:
   initContainers:
     - name: migration
       image: registry.camunda.cloud/optimize-ee/optimize:latest
       command: ['./upgrade/upgrade.sh', '--skip-warning']
   containers:
     - name: optimize
       image: registry.camunda.cloud/optimize-ee/optimize:latest
```

### 4. Resume a canceled update

From Optimize 3.3.0 onwards updates are resumable. So if the update process got interrupted either manually or due to an error you don't have to restore the Elasticsearch backup and start over but can simply rerun the update. On resume previously completed update steps will be detected and logged as being skipped. In the following log example step 1 was previously completed and is thus skipped:

```
./upgrade/upgrade.sh
...
INFO UpgradeProcedure - Skipping Step 1/2: UpdateIndexStep on index: process-instance as it was found to be previously completed already at: 2020-11-30T16:16:12.358Z.
INFO UpgradeProcedure - Starting step 2/2: UpdateIndexStep on index: decision-instance
...
```

### 5. Typical errors

- Using an update script that does not match your version:

```bash
Schema version saved in Metadata does not match required [2.X.0]
```

Let's assume have Optimize 2.1 and want to update to 2.3 and use the jar to update from 2.2 to 2.3. This error occurs because the jar expects Elasticsearch to have the schema version 2.1. This is because you downloaded the wrong Optimize artifact which contained the wrong update jar version.

## Force reimport of engine data in Optimize

It can be the case that features that were added with the new Optimize version do not work for data that was imported with the old version of Optimize. If you want to use new features on the old data, you can force a reimport of the engine data to Optimize. See [the reimport guide](./../reimport.md) on how to perform such a reimport.
