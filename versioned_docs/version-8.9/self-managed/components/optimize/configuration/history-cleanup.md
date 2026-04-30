---
id: history-cleanup
title: "History cleanup"
description: "Make sure that old data is automatically removed from Optimize."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

To satisfy data protection laws or just for general storage management purposes, Optimize provides an automated cleanup functionality.

There are two types of history cleanup:

- Process data cleanup
- External variable cleanup

By default, all types of history cleanup are disabled. They can be enabled individually by config and the cleanup is applied accordingly.

## Setup

The most important settings are `cronTrigger` and `ttl`; their global default configuration is the following:

```
historyCleanup:
  cronTrigger: '0 1 * * *'
  ttl: 'P2Y'
```

`cronTrigger` - defines at what interval and when the history cleanup should be performed in the format of a cron expression. The default is 1AM every day. To avoid any impact on daily business, it is recommended to schedule the cleanup outside of business hours.

See the [Configuration Description](./system-configuration.md#history-cleanup-settings) for further insights into this property and its format.

`ttl` - is the global time to live period of data contained in Optimize. The field that defines the age of a particular entity differs between process, decision, and event data. Refer to the corresponding subsection in regard to that.
The default value is `'P2Y'`, which means by default data older than _2 years_ at the point in time when the cleanup is executed gets cleaned up.
For details on the notation, see the [Configuration Description](./system-configuration.md#history-cleanup-settings) of the ttl property.

All the remaining settings are entity type specific and will be explained in the following subsections.

## Process data

The age of process instance data is determined by the `endTime` field of each process instance. Running instances are never cleaned up.

To enable the cleanup of process instance data, the `historyCleanup.processDataCleanup.enabled` property needs to be set to `true`.

Another important configuration parameter for process instance cleanup is the `historyCleanup.processDataCleanup.cleanupMode`. It determines what in particular gets deleted when a process instance is cleaned up. The default value of `all` results in the whole process instance being deleted.
For other options, review the [configuration description](./system-configuration.md#history-cleanup-settings) of the `historyCleanup.processDataCleanup.cleanupMode` property.

To set up a process definition-specific `ttl` or different `cleanupMode` you can also provide process specific settings using the `perProcessDefinitionConfig` list which overrides the global settings for the corresponding definition key.

In this example, process instances of the key `MyProcessDefinitionKey` would be cleaned up after two months instead of two years, and when the cleanup is performed, only their associated variables would be deleted instead of the complete process instance.

```
historyCleanup:
  ttl: 'P2Y'
  processDataCleanup:
    enabled: true
    cleanupMode: 'all'
    perProcessDefinitionConfig:
      'MyProcessDefinitionKey':
        ttl: 'P2M'
        cleanupMode: 'variables'
```

## Example

Here is an example of what a complete cleanup configuration might look like:

```
historyCleanup:
  cronTrigger: '0 1 * * 0'
  ttl: 'P1Y'
  processDataCleanup:
    enabled: true
    cleanupMode: 'variables'
    perProcessDefinitionConfig:
      'VeryConfidentProcess':
        ttl: 'P1M'
        cleanupMode: 'all'
      'KeepTwoMonthsProcess':
        ttl: 'P2M'
```

The above configuration results in the following setup:

- The cleanup is scheduled to run every Sunday at 1AM.
- The global `ttl` of any data is one year.
- The process data cleanup is enabled.
- The `cleanupMode` performed on all process instances that passed the `ttl` period is just clearing their variable data but keeping the overall instance data like activityInstances.
- There is a process specific setup for the process definition key `'VeryConfidentProcess'` that has a special `ttl` of one month and those will be deleted completely due the specific `cleanupMode: 'all'` configuration for them.
- There is another process specific setup for the process definition key `'KeepTwoMonthsProcess'` that has a special `ttl` of two months.
