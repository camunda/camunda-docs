---
id: disk-space
title: "Disk space"
description: "Understand how Zeebe uses the local disk for storage of its persistent data, and configuring Zeebe settings for the disk usage watermarks."
---

Zeebe uses the local disk for storage of its persistent data. Therefore, if the Zeebe Broker runs out of disk space, the system is in an invalid state as the broker cannot update its state.

To prevent the system from reaching an unrecoverable state, Zeebe expects a minimum size of free disk space available. If this limit is violated, the broker rejects new requests to allow the operations team to free more disk space, and allows the broker to continue to update its state.

Zeebe can be configured with the following settings for the disk usage:

- **zeebe.broker.data.disk.enablemonitoring**: Configure if disk usage should be monitored (default: true)
- **zeebe.broker.data.disk.monitoringInterval**: The interval in which the disk space usage is checked (default: 1 second)
- **zeebe.broker.data.disk.freeSpace.replication**: When the free space available is less than this value, Zeebe pauses receiving replicated events. (default: 1GB)
  - For **production** use cases, we recommend to increase this value and set it approximately to `number of partitions x logSegmentSize + 1GB`.
- **zeebe.broker.data.disk.freeSpace.processing**: When the free space available is less than this value, Zeebe rejects all user commands and pauses processing. (default: 2GB)
  - This must be greater than `freeSpace.replication`.
  - For **production** use cases, we recommend increasing this value and setting it at a minimum of `number of partitions x 2 x logSegmentSize + 1GB`.
