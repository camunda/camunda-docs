---
id: troubleshooting
title: Troubleshooting
sidebar_label: Troubleshooting
description: "Common issues and solutions when running the Data Migrator."
---

Troubleshooting information for common issues when running the Data Migrator.

## Migration fails to start

- Verify Java 21+: `java -version`.
- Check database connectivity and credentials.
- Ensure Camunda 8 is running and accessible.
- Review your `configuration/application.yml` configuration.

## Process instances are skipped

- Ensure Camunda 8 process definitions are deployed.
- Verify `migrator` execution listeners are added to None Start Events.
- Ensure flow nodes exist in both Camunda 7 and Camunda 8 models.
- Review skipped instance logs for exact reasons.

List and retry skipped instances:

```bash
./start.sh --runtime --list-skipped
./start.sh --runtime --retry-skipped
```

## Performance issues

- Adjust `camunda.migrator.page-size`.
- Ensure database resources are sufficient.
- Check network latency between components.
- Monitor CPU/memory/disk usage.

## Variable migration errors

- Check Camunda 8 variable name restrictions.
- Verify variable types are supported.
- Implement a custom `VariableInterceptor` if needed.

## Debug logging

Increase logging levels to get more detail:

```yaml
logging:
  level:
    root: INFO
    io.camunda.migration.data: DEBUG
    io.camunda.migration.data.RuntimeMigrator: TRACE
  file:
    name: logs/camunda-7-to-8-data-migrator.log
```

## Cockpit plugin

### Plugin not visible in Cockpit

- Ensure the plugin JAR is placed in the correct Camunda 7 plugins directory.
- Check Camunda 7 logs for any plugin loading errors.
- Restart Camunda 7 after deploying the plugin.

### No skip data displayed

- Confirm `save-skip-reason: true` is set in the migrator configuration.
- Verify migration has been run with this setting enabled.
- Check database connectivity between the plugin and the migrator database.

## Getting help

- Use the [Camunda forum](https://forum.camunda.io/c/c7-to-c8/).
- Search existing issues: https://github.com/camunda/camunda-bpm-platform/issues.
- When creating a new issue, include: logs, config, environment, steps to reproduce.
