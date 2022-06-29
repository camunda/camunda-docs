---
id: updating-operate
title: Updating Operate
description: "Follow these steps for a successful Operate version update."
---

When updating Operate versions, it's important to pay attention to a few points:

- Every Operate version supports importing data for the current version and the previous one. For example, if you are running Operate `1.3`, Operate imports data from Zeebe `1.2` and `1.3`.
- Before updating the Operate version and skipping multiple minor versions, import all the data from previous versions. See the sections below for additional details.

## Skipping multiple minor versions

For example, let's assume a server running Operate version `1.0` wants to update to version `1.3`.

Take the steps below:

### Progressively update

1. Update Operate and Zeebe to version `1.1`.
2. Let Operate run for a few hours and verify if everything works as expected.
3. Repeat **Step 1** and **Step 2** to update to version `1.2`.
4. Update both Operate and Zeebe to version `1.3`.

:::note
Depending on your amount of data, we recommend allowing a minor version to run for at least 24 hours before updating to the next version.
:::
