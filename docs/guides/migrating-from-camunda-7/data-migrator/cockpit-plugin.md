---
id: cockpit-plugin
title: Cockpit plugin
sidebar_label: Cockpit plugin
description: "Web-based interface for viewing information about skipped entities during the migration process."
---

:::warning Experimental feature
The Cockpit plugin is an **experimental** feature and should be used with caution in production environments.
:::

The Cockpit plugin provides a web-based interface for viewing information about skipped entities during the migration process. It integrates with Camunda 7 Cockpit to give you visibility into which process instances, variables, or other entities were skipped during migration and the reasons why.

For more information on Camunda 7 plugins, see the [Camunda 7 documentation](https://docs.camunda.org/manual/latest/webapps/cockpit/extend/plugins/).

## Prerequisites

To use the Cockpit plugin, run the migrator with the following setting:

```yaml
camunda.migrator:
  save-skip-reason: true
```

:::info Required configuration
The Cockpit plugin requires running the migrator with `save-skip-reason` enabled.  
Without this setting, skip reasons will not be saved to the database, and the plugin will have no data to display.
:::

## Installation

1. **Download the latest release** from the [releases page](https://github.com/camunda/camunda-7-to-8-data-migrator/releases) or **build the plugin**:

   ```bash
   cd plugins/cockpit
   mvn clean install
   ```

2. **Deploy the plugin** to your Camunda 7 installation by copying the generated JAR file into the Camunda 7 plugins directory.  
   For example, in the Tomcat distribution, the path is `/camunda-bpm-ee-tomcat-<Camunda7Version>-ee/server/apache-tomcat-<TomcatVersion>/webapps/camunda/WEB-INF/lib/`.

3. **Inspect skipped entities in Cockpit** once the plugin has been deployed.

## Using the Cockpit plugin

After installation and configuration, the Cockpit plugin provides:

- **Skipped entity overview**: View all entities that were skipped during migration.
- **Detailed skip reasons**: Understand why specific entities were not migrated.
- **Migration status tracking**: Monitor the overall progress and health of your migration.

## Limitations

As an experimental feature, the Cockpit plugin currently has the following limitations:

- **Performance impact**: Saving skip reasons may affect migration performance for large datasets.
- **Storage requirements**: Additional database storage is required to persist skip reason data.
- **Camunda 7 dependency**: A running Camunda 7 instance with Cockpit is required.
- **Limited customization**: UI customization options are not yet available.

## Screenshots

The following screenshots demonstrate the Cockpit plugin interface and functionality:

### Migrated process instances view

Shows a table of successfully migrated process instances from Camunda 7 to Camunda 8, including the process instance ID, process definition key, and the corresponding Camunda 8 key.

![Runtime Migrated Instances](img/runtime-migrated.png)

### Skipped process instances overview

Displays process instances that were skipped during migration, allowing users to identify which instances failed and need further attention.

![Runtime Skipped Instances](img/runtime-skipped.png)

### Entity type selection

Allows filtering historic entities by type (process instances, variables, tasks, etc.) to simplify analysis of migration issues.

![Skipped Entity Type Selection](img/skipped-select-type.png)

### Variable-specific skip analysis

When viewing historic variable data, the type and value of primitives are retrieved to provide additional context.

![Skipped Variables](img/skipped-variables.png)

## Troubleshooting

### Plugin not visible in Cockpit

- Ensure the plugin JAR is placed in the correct Camunda 7 plugins directory.
- Check Camunda 7 logs for any plugin loading errors.
- Restart Camunda 7 after deploying the plugin.

### No skip data displayed

- Confirm `save-skip-reason: true` is set in the migrator configuration.
- Verify migration has been run with this setting enabled.
- Check database connectivity between the plugin and the migrator database.

For additional support, see the main [troubleshooting section](troubleshooting.md) or create an issue in the project repository.
