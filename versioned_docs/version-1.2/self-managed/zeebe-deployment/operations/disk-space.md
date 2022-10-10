---
id: disk-space
title: "Disk space"
---

Zeebe uses the local disk for storage of its persistent data. Therefore, if the Zeebe broker runs out of disk space, the system is in an invalid state, as the broker cannot update its state.

To prevent the system from reaching an unrecoverable state, Zeebe expects a minimum size of free disk space available. If this limit is violated, the broker rejects new requests to allow the operations team to free more disk space, and allows the broker to continue to update its state.

Zeebe can be configured with the following settings for the disk usage watermarks:

- **zeebe.broker.data.diskUsageMonitoringEnabled**: Configure if disk usage should be monitored (default: true)
- **zeebe.broker.data.diskUsageReplicationWatermark**: The fraction of used disk space before the replication is paused (default: 0.99)
- **zeebe.broker.data.diskUsageCommandWatermark**: The fraction of used disk space before new user commands are rejected (default: 0.97), this must be less than `diskUsageReplicationWatermark`
- **zeebe.broker.data.diskUsageMonitoringInterval**: The interval in which the disk space usage is checked (default 1 second)

For **production** use cases, we recommend setting the values for `diskUsageReplicationWatermark` and `diskUsageCommandWatermark` to smaller values, for example `diskUsageReplicationWatermark=0.9` and `diskUsageCommandWatermark=0.8`.
