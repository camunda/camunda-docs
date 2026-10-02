If the data directory is not empty, the restore will fail with an error message:

```
Broker's data directory /usr/local/camunda/data is not empty. Aborting restore to avoid overwriting data. Please restart with a clean directory
```

On some filesystems, the data directory may contain special files and folders that can't or shouldn't be deleted. In such cases, the restore application can be configured to ignore the presence of these files and folders. The configuration option `zeebe.restore.ignoreFilesInTarget` takes a list of file and folder names to ignore. By default, it ignores the `lost+found` folder found on ext4 filesystems. To also ignore `.snapshot` folders, set `zeebe.restore.ignoreFilesInTarget: [".snapshot", "lost+found"]` or the equivalent environment variable `ZEEBE_RESTORE_IGNOREFILESINTARGET=".snapshot,lost+found"`.
