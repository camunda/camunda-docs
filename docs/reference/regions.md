---
id: regions
title: "Regions"
description: "After creating a cluster, specify a region for that cluster. Read on for details of Google Cloud Platform regions currently supported in Camunda 8 SaaS."
---

When you [create a cluster](/components/console/manage-clusters/create-cluster.md) in Camunda 8 SaaS, you must specify a region for that cluster.

The following regions are available for customers on Trial, Starter, and Enterprise Plans. Enterprise customers can also discuss custom regions with their Customer Success Manager.

![World map showing the location of each GCP and AWS region](./img/diagram-regions-map.png)

:::note

- Management cluster components (Console and Web Modeler) are currently hosted in GCP (EU). [Contact us](/reference/contact.md) if you have additional questions.
- Single-tenant clusters run on a dedicated GCP or AWS infrastructure.

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
