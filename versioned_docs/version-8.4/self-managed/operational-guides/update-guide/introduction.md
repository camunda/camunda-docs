---
id: introduction
title: Upgrade guide
description: Follow the update procedure and guides when upgrading your Camunda 8 application or server installation version.
---

Upgrade guides lead you through the process for upgrading your Camunda 8 application or server installation version.

## Upgrade procedure

You **must** use the following procedure when upgrading from one minor version to the next:

1. Upgrade to the latest available patch version of the minor you are currently using. For example, if you are on `8.5.1`, update to `8.5.10`, where `10` is the latest available patch.

2. Update to the latest patch version of the following minor. For example, if you are on `8.5.10`, update to `8.6.5`, where `8.6.5` is the latest available `8.6.x` version.

3. **Never skip a minor version**. For example, never upgrade directly from `8.5.x` to `8.7.x`, skipping `8.6.x`.

See the dedicated upgrade guides below for detailed version upgrade instructions.

:::note
Depending on your amount of data, run a minor version for at least 24 hours before updating to the next version.
:::

## [Camunda 8.3 to Camunda 8.4](../830-to-840)

Update from 8.3.x to 8.4.0

[Release notes](https://github.com/camunda/camunda-platform/releases/tag/8.4.0)
[Release blog](https://camunda.com/blog/2024/01/camunda-8-4-simplifying-installation-enhancing-user-experience/)

## [Camunda 8.2 to Camunda 8.3](../820-to-830)

Update from 8.2.x to 8.3.0

[Release notes](https://github.com/camunda/camunda-platform/releases/tag/8.3.0)
[Release blog](https://camunda.com/blog/2023/10/camunda-8-3-scaling-automation-maximize-value/)
