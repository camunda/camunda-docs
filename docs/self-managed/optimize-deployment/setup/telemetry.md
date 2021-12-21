---
id: telemetry
title: "Telemetry"
description: "Learn about Optimize telemetry, what data is collected and why."
---

At Camunda, we strive to offer excellent user experience at a high and stable level. On a strict opt-in basis, we are looking to collect environment and usage data to further improve the user experience for you. These insights help us to understand typical environment setups and product usage patterns and will be used to inform product improvement decisions to your benefit.

The telemetry reporting is disabled by default and only collects and sends data after you explicitly enable the telemetry configuration flag. The configuration can be changed by `superusers` at any time during runtime via a configuration menu option in the UI.

The collected data will be sent once every 24 hours via HTTPS, and it is ensured that the performance of Optimize will not be negatively affected by the reporting, even if the telemetry reporter faces unexpected errors. Furthermore, no data will be collected and sent when you stop Optimize.

# Collected Data

Below you find the full list of data we want to collect, followed by a real-world example. On a conceptual level, they can be categorized into general data and meta/environment data.

## General Data

The “General Data” category contains information about your Optimize installation:

<table class="table table-striped">
  <tr>
    <th>Item</th>
    <th>Explanation</th>
  </tr>
  <tr>
    <td>Installation</td>
    <td>A unique installation ID stored in Optimize's Elasticsearch database</td>
  </tr>
  <tr>
    <td>Product name</td>
    <td>The name of the product (i.e. `Camunda Optimize`)</td>
  </tr>
  <tr>
    <td>Product version</td>
    <td>The version of Optimize you are running</td>
  </tr>
  <tr>
    <td>Product edition</td>
    <td>The edition of the product (i.e. "enterprise")</td>
  </tr>
</table>

## Meta/Environment Data

The “Meta/Environment Data” category contains information about the environmental setup:

<table class="table table-striped">
  <tr>
    <th>Item</th>
    <th>Explanation</th>
  </tr>
  <tr>
    <td>Database vendor</td>
    <td>The database vendor (i.e. `Elasticsearch`)</td>
  </tr>
  <tr>
    <td>Database version</td>
    <td>The version of Elasticsearch Optimize is using</td>
  </tr>
  <tr>
    <td>License Key: Customer name</td>
    <td>The customer name that appears in the license key you are using with this Optimize installation</td>
  </tr>
  <tr>
    <td>License Key: Type</td>
    <td>The type of license key used with this Optimize installation</td>
  </tr>
  <tr>
    <td>License Key: Valid Until</td>
    <td>The expiry date of the license key used with this Optimize installation</td>
  </tr>
  <tr>
    <td>License Key: Unlimited</td>
    <td>A flag that indicates whether this license key is unlimited</td>
  </tr>
  <tr>
    <td>License Key: Features</td>
    <td>A map which includes information on which products can be used with this license key</td>
  </tr>
  <tr>
    <td>License Key: Raw</td>
    <td>The raw license key string without signature. We add this just in case some properties are listed in the raw license key that have not yet been mapped to other fields (eg. the features map).</td>
  </tr>
  <tr>
    <td>Engine Installation IDs</td>
    <td>A list containing the ID of each engine connected to this Optimize installation</td>
  </tr>
</table>

## Example

Below is an example payload including all telemetry data currently sent by Optimize.

```
{
  "installation": "7b86edba-fcb7-11ea-adc1-0242ac120002",
  "product": {
    "name": "Camunda Optimize",
    "version": "3.2.0",
    "edition": "enterprise",
    "internals": {
      "database": {  
        "vendor": "elasticsearch",
        "version": "7.0.0"
      },
      "license-key": {
        "customer": "a customer name",
        "type": "UNIFIED",
        "valid-until": "2025-01-01",
        "unlimited": "false",
        "features": {
          "camundaBPM": "false",
          "optimize": "true",
          "cawemo": "false"
        },
        "raw": 
          "customer = a customer name; expiryDate = 2025-01-01; optimize: true;"
      },
      "engine-installation-ids": 
        [ "8343cc7a-8ad1-42d4-97d2-43452c0bdfa3", 
        "22607b92-fcb8-11ea-adc1-0242ac120002" ]
    }
  }
}
```

# How to enable telemetry

## Optimize configuration

You can enable telemetry before starting Optimize by setting the `initializeTelemetry` flag in your configuration file to `true`. Please refer to the [configuration section](../configuration#telemetry-configuration) for more details.

## UI

Once Optimize is running, telemetry can be enabled (or disabled) via a modal accessible from the user menu. Please note that only superusers are authorized to access this menu and alter the telemetry configuration.

# Legal Note

Before you install Camunda Optimize version >= 3.2.0 or activate the telemetric functionality, please make sure that you are authorized to take this step, and that the installation or activation of the telemetric functionality is not in conflict with any internal company policies, compliance guidelines, any contractual or other provisions or obligations of your company.<br/>
Camunda cannot be held responsible in the event of unauthorized installation or activation of this function.