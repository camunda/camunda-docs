---
id: easy-post
title: EasyPost Connector
sidebar_label: EasyPost Connector
description: Allows you to create addresses, parcels, and shipments, as well as purchase and verify shipments.
---

The **EasyPost Connector** allows you to create addresses, parcels, and shipments, as well as purchase and verify shipments with [EasyPost Service](https://www.easypost.com/) from your BPMN process.

## Prerequisites

To use the **EasyPost Connector**, sign up for an EasyPost account, enter your carrier-specific credentials on the [Carrier Account Dashboard](https://www.easypost.com/account/carriers), and get your [API key](https://www.easypost.com/account/api-keys).

:::note
It is highly recommended not to expose your EasyPost API key as plain text. Instead, use Camunda secrets.
See our documentation on [managing secrets](../../../components/console/manage-clusters/manage-secrets.md) to learn more.
:::

## Create an EasyPost Connector task

To use the **EasyPost Connector** in your process, either change the type of existing task by clicking on it and using the wrench-shaped **Change type** context menu icon, or create a new Connector task using the **Append Connector** context menu. Follow our [guide to using Connectors](../use-connectors.md) to learn more.

## Fill authentication

In the **Authentication** section, provide an **API key**, which you can find in the [API Key dashboard](https://www.easypost.com/account/api-keys).

## Select operation to execute

The **EasyPost Connector** currently supports the following operations:

### Create address

Allows you to create an address, save it, and get an address ID to use in follow-up operations.
Set address information in the **Input** section.
See [address object documentation](https://www.easypost.com/docs/api#addresses) to learn more about address object and to see response examples.

### Verify a created address

Allows you to verify an address by **Address ID** and return verified address object.

### Create a parcel

Allows you to create a parcel, save it, and get a parcel ID to use in follow-up operations.
Set required properties in the **Input** section.
See the [parcel object documentation](https://www.easypost.com/docs/api#parcels) to learn more about the parcel object and to see response examples.

### Create a shipment

Allows you to create a shipment, save it, and get the shipment ID for use in follow-up operations.
Set required properties in the **Input** section: ID of destination address, ID of origin address, and ID of parcel.
See the [shipment object documentation](https://www.easypost.com/docs/api#shipments) to learn more about the shipment object and to see response examples.
In the **Output** section, the pre-filled **Result Expression** returns the ID of the shipment and the ID of [rate](https://www.easypost.com/docs/api#rates).

FEEL expression:

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

Allows you to buy a shipment. Set required properties in the **Input** section: IDs of rate and shipment.
See the [shipment object documentation](https://www.easypost.com/docs/api#buy-a-shipment) to learn more about the shipment object and to see response examples.
In the **Output** section the pre-filled **Result Expression** returns the ID of a tracker, tracking code, and status of the shipment.

FEEL expression:

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

Allows you to retrieve a tracker by ID and get information about the status of the tracker.
Set required properties in the **Input** section: Tracker ID fetched after buying shipment).
See the [tracker object documentation](https://www.easypost.com/docs/api/java#trackers) to learn more about the tracker object and to see response examples.
In the **Output** section, the pre-filled **Result Expression** returns the ID of the tracker, tracking code, and status of the shipment.

FEEL expression:

```
{trackerStatus: response.body.status}
```

## Handle Connector response

The **EasyPost Connector** is a protocol Connector, meaning it is built on top of the **HTTP REST Connector**, therefore
handling response is still applicable [as described](./rest.md#response).
