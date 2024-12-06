---
id: regions
title: "Regions"
description: "After creating a cluster, specify a region for that cluster. Read on for details of Google Cloud Platform regions currently supported in Camunda 8 SaaS."
---

When you create a cluster in Camunda 8 SaaS, you must specify a region for that cluster.

Currently, we make these regions available for customers on the Trial, Starter, and Enterprise Plans. Enterprise customers can discuss custom regions with their Customer Success Manager.

:::note

- Console and Web Modeler components are currently hosted in the EU. [Contact us](/reference/contact.md) if you have additional questions.
- Running on a Trial or Starter plan and want to try a different region, or interested in other regions or cloud providers? [Contact us](/reference/contact.md) as we are able to make additional regions available on request.

:::

## Available Google Cloud Platform (GCP) regions

The following GCP regions are currently supported in Camunda 8 SaaS.

| GCP region                                       | Secondary backups region                          |
| :----------------------------------------------- | :------------------------------------------------ |
| Belgium, Europe (europe-west1)                   | Germany, Europe (europe-west3)                    |
| Iowa, North America (us-central1)                | Salt Lake City, North America (us-west1)          |
| London, Europe (europe-west2)                    | _Not available_                                   |
| Singapore, Asia (asia-southeast1)                | Changhua County, Taiwan (asia-east1)              |
| South Carolina, North America (us-east1)         | Iowa, North America (us-central1)                 |
| Sydney, Australia (australia-southeast1)         | Melbourne, Australia (australia-southeast2)       |
| Toronto, North America (northamerica-northeast2) | Montréal, North America (northamerica-northeast1) |

To learn more about each region code/location, refer to [Google cloud locations](https://cloud.google.com/about/locations).

## Available Amazon Web Services (AWS) regions

The following AWS regions are currently supported in Camunda 8 SaaS for Trial plan customers.

| AWS region                          | Secondary backups region |
| :---------------------------------- | :----------------------- |
| North America, Virginia (us-east-1) | _Not available_          |

To learn more about each region code/location, refer to [AWS regions and availability zones](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/).

:::note
Only the orchestration cluster is hosted in the AWS region. Management cluster components (Console and Web Modeler) are hosted in the EU on GCP.
:::
