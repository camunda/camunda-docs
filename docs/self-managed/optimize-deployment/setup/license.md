---
id: optimize-license
title: "Optimize License Key"
description: "When you log in to Optimize for the first time, you’ll be redirected to the license page where you can enter your license key."
---

When you log in to Optimize for the first time, you'll be redirected to the license page.

Here you can enter your license key to be able to use Camunda Optimize.

![Optimize license page with no license key in the text field and submit button below](img/license-guide.png)

Alternatively, you can add a file with the license key to the path:  `${optimize-root-folder}/config/OptimizeLicense.txt`. It will be automatically loaded to the database unless it already contains a license key.

If you are using the Optimize Docker images and want Optimize to automatically recognize your license key, please refer to the [installation guide](./installation.md#license-key-file) on how to achieve this.