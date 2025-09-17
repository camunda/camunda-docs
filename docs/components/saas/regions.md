---
id: regions
title: "Regions"
description: "After creating a cluster, specify a region for that cluster. Read on for details of Google Cloud Platform regions currently supported in Camunda 8 SaaS."
---

import RegionMapImg from './img/diagram-regions-map.png';

When you [create a cluster](/components/console/manage-clusters/create-cluster.md) in Camunda 8 SaaS, you must specify a region for that cluster.

The following regions are available for customers on Trial, Starter, and Enterprise Plans. Enterprise customers can also discuss custom regions with their Customer Success Manager.

<img src={RegionMapImg} alt="World map showing the location of each GCP and AWS region" class="img-noborder"/>

:::note

- Console and Web Modeler cluster components are currently hosted in GCP (EU). [Contact us](/reference/contact.md) if you have additional questions.
- Single-tenant clusters run on a dedicated GCP or AWS infrastructure.

:::

## Google Cloud Platform (GCP) regions

The following GCP regions are currently supported in Camunda 8 SaaS.

| GCP region                                       | Secondary backups region                          |
| :----------------------------------------------- | :------------------------------------------------ |
| Belgium, Europe (europe-west1)                   | Germany, Europe (europe-west3)                    |
| Iowa, North America (us-central1)                | Salt Lake City, North America (us-west1)          |
| London, Europe (europe-west2)                    | Germany, Europe (europe-west3)                    |
| Singapore, Asia (asia-southeast1)                | Changhua County, Taiwan (asia-east1)              |
| South Carolina, North America (us-east1)         | Iowa, North America (us-central1)                 |
| Sydney, Australia (australia-southeast1)         | Melbourne, Australia (australia-southeast2)       |
| Toronto, North America (northamerica-northeast2) | Montréal, North America (northamerica-northeast1) |

To learn more about each region code/location, refer to [Google cloud locations](https://cloud.google.com/about/locations).

## Amazon Web Services (AWS) regions

The following AWS regions are currently supported in Camunda 8 SaaS.

| AWS region                          | Secondary backups region            |
| :---------------------------------- | :---------------------------------- |
| Frankfurt, Europe (eu-central-1)    | Ireland, Europe (eu-west-1)         |
| North America, Virginia (us-east-1) | Oregon, North America (us-west-2)   |
| Singapore, Asia (ap-southeast-1)    | Jakarta, Indonesia (ap-southeast-3) |

To learn more about each region code/location, refer to [AWS regions and availability zones](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/).
