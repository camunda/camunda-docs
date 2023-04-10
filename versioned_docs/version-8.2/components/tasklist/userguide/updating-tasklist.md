---
id: updating-tasklist-cloud
title: Updating Tasklist
description: Instructions on how to update your Tasklist
---

When updating Tasklist versions, it is important to pay attention to few points:

- Every Tasklist version, supports importing data for the current version and the previous one. For example: if you are running Tasklist `1.3`, your Tasklist imports data from Zeebe `1.2` and `1.3`.
- When wanting to update Tasklist version and skip multiple minor versions, make sure to import all the data from previous versions before (see below)

## Skipping multiple minor versions

Let's assume the following scenario:
A server running Tasklist version `1.0` wants to update to version `1.3`.

We recommend to follow the steps below:

### Progressively update

1. Update Tasklist and Zeebe to version `1.1`
2. Let Tasklist run for some hours\* and verify if everything works as expected
3. Repeat steps `1` and `2` while updating to version `1.2` (before you jump to `1.3`)
4. Then you should be safe to update both Tasklist and Zeebe to version `1.3`

NOTE: \* Depends on your amount of data, we recommend you let each minor version run for at least 24h before updating to the next one
