---
id: updating-tasklist
title: Updating Tasklist
description: "Follow these steps for a successful Tasklist version update."
---

When updating Tasklist versions, it's important to consider a few factors:

- Every Tasklist version supports importing data for the current version and the previous one. For example, if you are running Tasklist `1.3`, your Tasklist imports data from Zeebe `1.2` and `1.3`.
- Before updating the Tasklist version and skipping multiple minor versions, ensure you import all the data from the previous versions. See the sections below for more information.

## Skipping multiple minor versions

For example, let's assume a server running Tasklist version `1.0` wants to update to version `1.3`.

Take the following steps:

### Progressively update

1. Update Tasklist and Zeebe to version `1.1`.
2. Let it run for some hours and verify if everything works as expected.
3. Repeat **Step 1** and **Step 2** for version `1.2`.
4. Update both to version `1.3` safely.

:::note
Depending on your quantity of data, we recommend letting a minor version run for at least 24 hours before updating to the next version.
:::
