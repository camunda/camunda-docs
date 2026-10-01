import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## System

<Tabs>
  <TabItem value="application.yaml" label="Application properties">

### `camunda`

| Property           | Description                                                                                                                                                                                                                                                                                                                                                   | Default value | Overridable per Physical Tenant                                                   |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------ | :-------------------------------------------------------------------------------- |
| `camunda.mode`     | <p>Defines the launch mode for Camunda. Use this setting to activate or deactivate features. Valid, non-`null` values are:<ul><li>`all-in-one`</li><li>`broker`</li><li>`gateway`</li></ul>Values are case-insensitive. If you set this to `null`, launch modes are disabled and behavior is defined by the active profiles and configuration properties.</p> | `null`        | Yes                                                                               |
| `camunda.insecure` | <p>Controls whether security and authentication layers are enabled when you launch the application using `camunda.mode`. This affects the Gateway (embedded or dedicated), authentication, and authorization. Use this only for development and local testing. Do not use it in production.</p>                                                               | `false`       | Needs verification ([#9795](https://github.com/camunda/camunda-docs/issues/9795)) |

### `camunda.webapps`

#### `camunda.webapps.operate`

| Property                             | Description                                                              | Default value | Overridable per Physical Tenant |
| :----------------------------------- | :----------------------------------------------------------------------- | :------------ | :------------------------------ |
| `camunda.webapps.operate.enabled`    | <p>Controls whether Operate is enabled in the Orchestration Cluster.</p> | `true`        | Yes                             |
| `camunda.webapps.operate.ui-enabled` | <p>Controls whether the Operate UI is enabled.</p>                       | `true`        | Yes                             |

#### `camunda.webapps.tasklist`

| Property                              | Description                                                               | Default value | Overridable per Physical Tenant |
| :------------------------------------ | :------------------------------------------------------------------------ | :------------ | :------------------------------ |
| `camunda.webapps.tasklist.enabled`    | <p>Controls whether Tasklist is enabled in the Orchestration Cluster.</p> | `true`        | Yes                             |
| `camunda.webapps.tasklist.ui-enabled` | <p>Controls whether the Tasklist UI is enabled.</p>                       | `true`        | Yes                             |

#### `camunda.webapps.identity`

| Property                              | Description                                                               | Default value | Overridable per Physical Tenant |
| :------------------------------------ | :------------------------------------------------------------------------ | :------------ | :------------------------------ |
| `camunda.webapps.identity.enabled`    | <p>Controls whether Identity is enabled in the Orchestration Cluster.</p> | `true`        | Yes                             |
| `camunda.webapps.identity.ui-enabled` | <p>Controls whether the Identity UI is enabled.</p>                       | `true`        | Yes                             |

### `camunda.system`

| Property                          | Description                                                                                                                                                                                                                                                                                                                                                                                                  | Default value | Overridable per Physical Tenant |
| :-------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ | :------------------------------ |
| `camunda.system.cpu-thread-count` | <p>Controls the number of non-blocking CPU threads to be used</p><p><strong>Warning:</strong> You should never specify a value that is larger than the number of physical cores available.</p><p>Good practice is to leave 1–2 cores for IO threads and the operating system (it has to run somewhere).</p><p>For example, when running Zeebe on a machine which has 4 cores, a good value would be `2`.</p> | `2`           | No                              |
| `camunda.system.io-thread-count`  | <p>Controls the number of IO threads to be used.</p><p>These threads are used for workloads that write data to disk. While writing, these threads are blocked which means that they yield the CPU.</p>                                                                                                                                                                                                       | `2`           | No                              |
| `camunda.system.clock-controlled` | <p>Controls whether the system clock or mutable one.</p><p>If enabled, time progression can be controlled programmatically for testing purposes.</p>                                                                                                                                                                                                                                                         | `false`       | Yes                             |

### `camunda.system.restore`

| Property                                        | Description                                                                                                                                                            | Default value                                  | Overridable per Physical Tenant |
| :---------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------- | :------------------------------ |
| `camunda.system.restore.validate-config`        | Controls whether the restore process validates its configuration (and restore setup) before running.                                                                   | `true`                                         | No                              |
| `camunda.system.restore.ignore-files-in-target` | Controls which files/folders are ignored when the restore app validates that the Zeebe data directory is “empty enough” before restoring. The property is a list type. | `[“lost+found”, “directory-initialized.json”]` | No                              |

### `camunda.system.actor.idle`

| Property                                    | Description                                                                                                                                                   | Default value | Overridable per Physical Tenant |
| :------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------ | :------------------------------ |
| `camunda.system.actor.idle.max-spins`       | <p>The maximum number of busy-wait spins that an idle actor thread will perform before transitioning to a different idle state in Camunda's actor system.</p> | `null`        | No                              |
| `camunda.system.actor.idle.max-yields`      | <p>The maximum number of yield operations that an idle actor thread will perform before transitioning to the next idle state in Camunda's actor system.</p>   | `null`        | No                              |
| `camunda.system.actor.idle.max-park-period` | <p>The maximum duration that an idle actor thread will remain in the parked state in Camunda's actor system.</p>                                              | `null`        | No                              |

### `camunda.system.upgrade`

| Property                                      | Description                                                                                                                                                                                                                                                                             | Default value | Overridable per Physical Tenant |
| :-------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ | :------------------------------ |
| `camunda.system.upgrade.enable-version-check` | <p>Controls whether the version compatibility check is enforced during migration.</p><p>Use this to test migration logic with snapshot or alpha versions.</p><p>The default value is `true`, which means you cannot migrate to incompatible versions such as `SNAPSHOT` or `alpha`.</p> | `true`        | No                              |

  </TabItem>

  <TabItem value="env" label="Environment variables">

### `CAMUNDA_SYSTEM`

| Property                         | Description                                                                                                                                                                                                                                                                                                                                                                                                  | Default value | Overridable per Physical Tenant |
| :------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ | :------------------------------ |
| `CAMUNDA_SYSTEM_CPUTHREADCOUNT`  | <p>Controls the number of non-blocking CPU threads to be used</p><p><strong>Warning:</strong> You should never specify a value that is larger than the number of physical cores available.</p><p>Good practice is to leave 1–2 cores for IO threads and the operating system (it has to run somewhere).</p><p>For example, when running Zeebe on a machine which has 4 cores, a good value would be `2`.</p> | `2`           | No                              |
| `CAMUNDA_SYSTEM_IOTHREADCOUNT`   | <p>Controls the number of IO threads to be used.</p><p>These threads are used for workloads that write data to disk. While writing, these threads are blocked which means that they yield the CPU.</p>                                                                                                                                                                                                       | `2`           | No                              |
| `CAMUNDA_SYSTEM_CLOCKCONTROLLED` | <p>Controls whether the system uses the default system clock or a mutable clock.</p><p>If enabled, you can control time progression programmatically for testing purposes.</p>                                                                                                                                                                                                                               | `false`       | Yes                             |

### `CAMUNDA_SYSTEM_RESTORE`

| Property                                     | Description                                                                                                                                                            | Default value                                  | Overridable per Physical Tenant |
| :------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------- | :------------------------------ |
| `CAMUNDA_SYSTEM_RESTORE_VALIDATECONFIG`      | Controls whether the restore process validates its configuration (and restore setup) before running.                                                                   | `true`                                         | No                              |
| `CAMUNDA_SYSTEM_RESTORE_IGNOREFILESINTARGET` | Controls which files/folders are ignored when the restore app validates that the Zeebe data directory is “empty enough” before restoring. The property is a list type. | `[“lost+found”, “directory-initialized.json”]` | No                              |

### `CAMUNDA_SYSTEM_ACTOR_IDLE`

| Property                                  | Description                                                                                                                         | Default value | Overridable per Physical Tenant |
| :---------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- | :------------ | :------------------------------ |
| `CAMUNDA_SYSTEM_ACTOR_IDLE_MAXSPINS`      | <p>The maximum number of busy-wait spins that an idle actor thread will perform before transitioning to a different idle state.</p> | `null`        | No                              |
| `CAMUNDA_SYSTEM_ACTOR_IDLE_MAXYIELDS`     | <p>The maximum number of yield operations that an idle actor thread will perform before transitioning to the next idle state.</p>   | `null`        | No                              |
| `CAMUNDA_SYSTEM_ACTOR_IDLE_MAXPARKPERIOD` | <p>The maximum duration that an idle actor thread will remain in the parked state.</p>                                              | `null`        | No                              |

### `CAMUNDA_SYSTEM_UPGRADE`

| Property                                    | Description                                                                                                                                                                                                                                                                    | Default value | Overridable per Physical Tenant |
| :------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ | :------------------------------ |
| `CAMUNDA_SYSTEM_UPGRADE_ENABLEVERSIONCHECK` | <p>Toggles the version check restriction, used for migration.</p><p>This is useful for testing migration logic on snapshot or alpha versions.</p><p>The default value `true` means it is not allowed to migrate to an incompatible version such as: `SNAPSHOT` or `alpha`.</p> | `true`        | No                              |

  </TabItem>
</Tabs>
