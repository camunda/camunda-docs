---
id: updating-operate-cloud
title: Updating Operate
---

When updating Operate versions, it is important to pay attention to few points:

* Every Operate version, supports importing data for the current version and the previous one. For example: if you are running Operate `1.3`, your Operate imports data from Zeebe `1.2` and `1.3`.
* When wanting to update Operate version and skip multiple minor versions, make sure to import all the data from previous versions before (see below)


## Skipping multiple minor versions

Let's assume the following scenario:
A server running Operate version `1.0` wants to update to version `1.3`.

We recommend to follow the steps below:

### Progressively update

1. Update Operate and Zeebe to version `1.1`
2. Let it run for some hours and verify if everything works as expected
3. Repeat steps `1` and `2` for version `1.2`
4. Then update both to version `1.3` safely

NOTE: Depends on your amount of data, we recommend you let a minor version run for at least 24h before upgrading to the next one