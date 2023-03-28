---
id: easy-post
title: Easy Post Connector
sidebar_label: Easy Post Connector
description: Allows you to create addresses, parcels, and shipments, as well as purchase and verify shipments
---

The **Easy Post Connector** allows you to create addresses, parcels, and shipments, as well as purchase and verify shipments with [Easy Post Service](https://www.easypost.com/) from your BPMN process.

## Prerequisites

To use the **Easy Post Connector**, you need to sign up for an EasyPost account, enter your carrier specific credentials on the [Carrier Account Dashboard](https://www.easypost.com/account/carriers), and get your [API Key](https://www.easypost.com/account/api-keys).

:::note
It is highly recommended not to expose your Easy Post API Key as plain text. Instead, use Camunda secrets.
See an article on how to [manage secrets](../../../components/console/manage-clusters/manage-secrets.md) to learn more.
:::

## Create an Easy Post Connector Task

To use the **Easy Post Connector** in your process, either change the type of existing task by clicking on it and using the wrench-shaped **Change type** context menu icon, or create a new Connector task by using the **Append Connector** context menu. Follow our [guide to using Connectors](../use-connectors.md) to learn more.

## Fill authentication

In the section **Authentication** provide an **API key**, that you can find in [API Key dashboard](https://www.easypost.com/account/api-keys).

## Select operation you wish to execute

The **Easy Post Connector** currently supports the following operations.

### Create address

Allows to create address and save it and get address ID for using in follow-up operations.
Set address information in section **Input**.
See [Address object documentation](https://www.easypost.com/docs/api#addresses) for learn more about address object and to see response examples.

### Verify a created address

Allows to verify address by Address ID and return verified Address object.

### Create a parcel

Allows to create parcel and save it and get parcel ID for using in follow-up operations.
Set required properties in **Input** section.
See [Parcel object documentation](https://www.easypost.com/docs/api#parcels) for learn more about parcel object and to see response examples.

### Create a shipment

Allows to create shipment and save it and get shipment ID for using in follow-up operations.
Set required properties in **Input** section. (ID of destination address, ID of origin address and ID of parcel)
See [Shipment object documentation](https://www.easypost.com/docs/api#shipments) for learn more about shipment object and to see response examples.
In **Output** section already prefilled **Result Expression** witch return ID of shipment and ID of [Rate](https://www.easypost.com/docs/api#rates) :
FEEL expression :

```
{priorityRate: response.body.rates[item.service = "Priority"], shipmentId: priorityRate[1].shipment_id, rateId: priorityRate[1].id}
```

Response:

```
{
      "shipment_id": "shp...",
      "rateId": "rate...."
 }
```

### Buy a shipment

Allows to buy a shipment.
Set required properties in **Input** section. (IDs of rate ang shipment)
See [Shipment object documentation](https://www.easypost.com/docs/api#buy-a-shipment) for learn more about shipment object and to see response examples.
In **Output** section already prefilled **Result Expression** witch return ID of tracker, tracking code, and status of the shipment :
FEEL expression :

```
{trackerId: response.body.tracker.id, trackingCode: response.body.tracking_code, shipmentstatus:response.body.status}
```

Response:

```
{
      "shipmentstatus": "shp...",
      "trackerId": "trk....",
      "trackingCode: :"track...."
 }
```

### Retrieve a tracker by ID

Allows to retrieve a tracker by ID and get information about status of tracker.
Set required properties in **Input** section. (Tracker ID, that was fetched after buying shipment).
See [Tracker object documentation](https://www.easypost.com/docs/api/java#trackers) for learn more about tracker object and to see response examples.
In **Output** section already prefilled **Result Expression** witch return ID of tracker, tracking code, and status of the shipment :
FEEL expression :

```
{trackerStatus: response.body.status}
```

## Handle Connector response

The **Easy Post Connector** is a protocol connector, meaning it is built on top of the **HTTP REST Connector**, therefore
handling response is still applicable [as described](./rest.md#response).
