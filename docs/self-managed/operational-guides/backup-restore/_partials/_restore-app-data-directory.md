If the data directory is not empty, the restore will fail with an error message:

```
Broker's data directory /usr/local/camunda/data is not empty. Aborting restore to avoid overwriting data. Please restart with a clean directory
```

On some filesystems, the data directory may contain special files and folders that can't or shouldn't be deleted. In such cases, the restore application can be configured to ignore the presence of these files and folders. The configuration option `camunda.system.restore.ignore-files-in-target` (environment variable `CAMUNDA_SYSTEM_RESTORE_IGNOREFILESINTARGET`) takes a list of file and folder names to ignore. By default, it ignores the `lost+found` folder found on ext4 filesystems and the `directory-initialized.json` file. Setting the option replaces the default list, so keep the default entries you still need. To also ignore `.snapshot` folders, set `camunda.system.restore.ignore-files-in-target: [".snapshot", "lost+found", "directory-initialized.json"]` or the equivalent environment variable `CAMUNDA_SYSTEM_RESTORE_IGNOREFILESINTARGET=".snapshot,lost+found,directory-initialized.json"`.
