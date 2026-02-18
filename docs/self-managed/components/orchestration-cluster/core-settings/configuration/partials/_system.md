import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## System

<Tabs>
  <TabItem value="application.yaml" label="Application properties">

### `camunda.system`

| Property                          | Description                                                                                                                                                                                                                                                                                                                                                                                                  | Default value |
| :-------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `camunda.system.cpu-thread-count` | <p>Controls the number of non-blocking CPU threads to be used</p><p><strong>Warning:</strong> You should never specify a value that is larger than the number of physical cores available.</p><p>Good practice is to leave 1-2 cores for IO threads and the operating system (it has to run somewhere).</p><p>For example, when running Zeebe on a machine which has 4 cores, a good value would be `2`.</p> | `2`           |
| `camunda.system.io-thread-count`  | <p>Controls the number of io threads to be used.</p><p>These threads are used for workloads that write data to disk. While writing, these threads are blocked which means that they yield the CPU. </p>                                                                                                                                                                                                      | `2`           |
| `camunda.system.clock-controlled` | <p>Controls whether the system clock or mutable one.</p><p>If enabled, time progression can be controlled programmatically for testing purposes.</p>                                                                                                                                                                                                                                                         | `false`       |

### `camunda.system.restore`

| Property                                        | Description | Default value  |
| :---------------------------------------------- | :---------- | :------------- |
| `camunda.system.restore.validate-config`        |             | `true`         |
| `camunda.system.restore.ignore-files-in-target` |             | `lost + found` |

### `camunda.system.actor.idle`

| Property                                    | Description                                                                                                                                                   | Default value |
| :------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------ |
| `camunda.system.actor.idle.max-spins`       | <p>The maximum number of busy-wait spins that an idle actor thread will perform before transitioning to a different idle state in Camunda's actor system.</p> | Null          |
| `camunda.system.actor.idle.max-yields`      | <p>The maximum number of yield operations that an idle actor thread will perform before transitioning to the next idle state in Camunda's actor system.</p>   | Null          |
| `camunda.system.actor.idle.max-park-period` | <p>The maximum duration that an idle actor thread will remain in the parked state in Camunda's actor system.</p>                                              | Null          |

### `camunda.system.upgrade`

| Property                                      | Description                                                                                                                                                                                                                                                                    | Default value |
| :-------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `camunda.system.upgrade.enable-version-check` | <p>Toggles the version check restriction, used for migration.</p><p>This is useful for testing migration logic on snapshot or alpha versions.</p><p>The default value `True` means it is not allowed to migrate to an incompatible version such as: `SNAPSHOT` or `alpha`.</p> | `true`        |

</TabItem>
<TabItem value="env" label="Environment variables">

### `CAMUNDA_SYSTEM`

| Property                         | Description                                                                                                                                                                                                                                                                                                                                                                                                  | Default value |
| :------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `CAMUNDA_SYSTEM_CPUTHREADCOUNT`  | <p>Controls the number of non-blocking CPU threads to be used</p><p><strong>Warning:</strong> You should never specify a value that is larger than the number of physical cores available.</p><p>Good practice is to leave 1-2 cores for IO threads and the operating system (it has to run somewhere).</p><p>For example, when running Zeebe on a machine which has 4 cores, a good value would be `2`.</p> | `2`           |
| `CAMUNDA_SYSTEM_IOTHREADCOUNT`   | <p>Controls the number of io threads to be used.</p><p>These threads are used for workloads that write data to disk. While writing, these threads are blocked which means that they yield the CPU. </p>                                                                                                                                                                                                      | `2`           |
| `CAMUNDA_SYSTEM_CLOCKCONTROLLED` | <p>Controls whether the system clock or mutable one.</p><p>If enabled, time progression can be controlled programmatically for testing purposes.</p>                                                                                                                                                                                                                                                         | `false`       |

### `CAMUNDA_SYSTEM_RESTORE`

| Property                                     | Description | Default value  |
| :------------------------------------------- | :---------- | :------------- |
| `CAMUNDA_SYSTEM_RESTORE_VALIDATECONFIG`      |             | `true`         |
| `CAMUNDA_SYSTEM_RESTORE_IGNOREFILESINTARGET` |             | `lost + found` |

### `CAMUNDA_SYSTEM_ACTOR_IDLE`

| Property                                  | Description                                                                                                                          | Default value |
| :---------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `CAMUNDA_SYSTEM_ACTOR_IDLE_MAXSPINS`      | <p>The maximum number of busy-wwait spins that an idle actor thread will perform before transitioning to a different idle state.</p> | Null          |
| `CAMUNDA_SYSTEM_ACTOR_IDLE_MAXYIELDS`     | <p>The maximum number of yield operations that an idle actor thread will perform before transitioning to the next idle state.</p>    | Null          |
| `CAMUNDA_SYSTEM_ACTOR_IDLE_MAXPARKPERIOD` | <p>The maximum duration that an idle actor thread will remain in the parked state.</p>                                               | Null          |

### `CAMUNDA_SYSTEM_UPGRADE`

| Property                                    | Description                                                                                                                                                                                                                                                                    | Default value |
| :------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `CAMUNDA_SYSTEM_UPGRADE_ENABLEVERSIONCHECK` | <p>Toggles the version check restriction, used for migration.</p><p>This is useful for testing migration logic on snapshot or alpha versions.</p><p>The default value `True` means it is not allowed to migrate to an incompatible version such as: `SNAPSHOT` or `alpha`.</p> | `true`        |

  </TabItem>
</Tabs>
