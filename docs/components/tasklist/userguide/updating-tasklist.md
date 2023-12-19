---
id: updating-tasklist-cloud
title: Updating Tasklist
description: "Follow these instructions to update Tasklist."
---

When updating Tasklist versions, it is important to pay attention to a few key points:

- Every Tasklist version supports importing data for the current version and the previous one. For example: if you are running Tasklist `1.3`, your Tasklist imports data from Zeebe `1.2` and `1.3`.
- When wanting to update the Tasklist version and skip multiple minor versions, make sure to import all the data from previous versions before (see below).

## Skipping multiple minor versions

Let's assume the following scenario:
a server running Tasklist version `1.0` wants to update to version `1.3`.

Take the steps below:

### Progressively update

1. Update Tasklist and Zeebe to version `1.1`.
2. Let Tasklist run for a few hours (see note below) and verify if everything works as expected.
3. Repeat steps `1` and `2` while updating to version `1.2` (before you jump to `1.3`)
4. Then, you should be safe to update both Tasklist and Zeebe to version `1.3`

:::note
The amount of time you should let Tasklist run depends on your amount of data. We recommend you let each minor version run for at least 24 hours before updating to the next one.
:::
