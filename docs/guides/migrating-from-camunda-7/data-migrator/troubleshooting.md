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

- Ensure C8 process definitions are deployed.
- Verify `migrator` execution listeners are added to None Start Events.
- Ensure flow nodes exist in both C7 and C8 models.
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

- Check C8 variable name restrictions.
- Verify variable types are supported.
- Implement a custom `VariableInterceptor` if needed.

## Debug logging

Increase logging levels to get more detail:

```yaml
logging:
  level:
    root: INFO
    io.camunda.migrator: DEBUG
    io.camunda.migrator.RuntimeMigrator: TRACE
  file:
    name: logs/camunda-7-to-8-data-migrator.log
```

## Getting help

- Use the [Camunda forum](https://forum.camunda.io/c/c7-to-c8/).
- Search existing issues: https://github.com/camunda/camunda-bpm-platform/issues.
- When creating a new issue, include: logs, config, environment, steps to reproduce.
