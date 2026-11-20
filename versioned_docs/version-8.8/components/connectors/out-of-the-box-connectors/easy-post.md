---
id: easy-post
title: EasyPost connector
sidebar_label: EasyPost
description: Create addresses, parcels, and shipments, as well as purchase and verify shipments with EasyPost.
---

import ConnectorTask from '../../../components/react-components/connector-task.md'

Create addresses, parcels, and shipments, and buy and track shipments with EasyPost from your BPMN process.

## About this connector

The EasyPost connector is an outbound connector that integrates your process with the [EasyPost](https://www.easypost.com/) shipping service. Use it to create and verify addresses, create parcels and shipments, buy a shipment, and retrieve the status of a tracker.

The connector is built on top of the [REST connector](/components/connectors/protocol/rest.md), so the response is handled as [described for the REST connector](/components/connectors/protocol/rest.md#response).

## Prerequisites

To use the EasyPost connector, you need:

- An EasyPost account.
- Your carrier-specific credentials, entered on the [Carrier Account Dashboard](https://www.easypost.com/account/carriers).
- An EasyPost [API key](https://www.easypost.com/account/api-keys).

:::note
Use secrets to avoid exposing your EasyPost API key as plain text. Refer to [manage secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.
:::

## Create an EasyPost connector task

<ConnectorTask/>

## Configuration

### Authentication

| Property | Type   | Required | Description                                                                                                         |
| :------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------------ |
| API key  | String | Yes      | Your EasyPost API key. Find it in the [API key dashboard](https://www.easypost.com/account/api-keys). Use a secret. |

### Operation

| Property       | Type     | Required | Description                                                                                                                                                                                                                                                                                                                     |
| :------------- | :------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Operation type | Dropdown | Yes      | The operation to run: [Create an address](#create-an-address), [Create a parcel](#create-a-parcel), [Create a shipment](#create-a-shipment), [Buy a shipment](#buy-a-shipment), [Verify a created address](#verify-a-created-address), or [Retrieve a tracker by ID](#retrieve-a-tracker-by-id). The other inputs depend on it. |

### Advanced

| Property           | Type   | Required | Description                                                                                                                     | Example |
| :----------------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------------------------ | :------ |
| Connection timeout | String | No       | Timeout in seconds for the connection to EasyPost. Accepts a number of seconds or a FEEL expression. The default is 20 seconds. | `20`    |

## Operations

### Create an address

Creates and saves an address, and returns an address ID to use in follow-up operations. For details about the address object and example responses, refer to the [EasyPost address documentation](https://docs.easypost.com/docs/addresses).

#### Input parameters

| Property           | Type   | Required | Description                        |
| :----------------- | :----- | :------- | :--------------------------------- |
| Name               | String | No       | Name of the person at the address. |
| Company            | String | No       | Company name.                      |
| Phone              | String | No       | Phone number.                      |
| Address line 1     | String | No       | First line of the street address.  |
| Address line 2     | String | No       | Second line of the street address. |
| City               | String | No       | City.                              |
| State or province  | String | No       | State or province.                 |
| Email              | String | No       | Email address.                     |
| ZIP or postal code | String | No       | ZIP or postal code.                |
| Country            | String | No       | Country.                           |
| Federal tax ID     | String | No       | Federal tax ID of the address.     |
| State tax ID       | String | No       | State tax ID of the address.       |

#### Output

The pre-filled **Result expression** returns the ID of the created address:

```feel
={addressId: response.body.id}
```

### Create a parcel

Creates and saves a parcel, and returns a parcel ID to use in follow-up operations. For details about the parcel object and example responses, refer to the [EasyPost parcel documentation](https://docs.easypost.com/docs/parcels).

#### Input parameters

| Property           | Type   | Required    | Description                                                                                                                                                          |
| :----------------- | :----- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Weight             | String | Yes         | Weight of the parcel in ounces.                                                                                                                                      |
| Length             | String | Conditional | Length of the parcel in inches. Required if you set the width or height.                                                                                             |
| Width              | String | Conditional | Width of the parcel in inches. Required if you set the length or height.                                                                                             |
| Height             | String | Conditional | Height of the parcel in inches. Required if you set the length or width.                                                                                             |
| Predefined package | String | No          | Predefined package type. Refer to the [EasyPost service levels and parcels](https://www.easypost.com/service-levels-and-parcels) page, which lists the valid values. |

#### Output

The pre-filled **Result expression** returns the ID of the created parcel:

```feel
={parcelId: response.body.id}
```

### Create a shipment

Creates and saves a shipment from existing addresses and a parcel, and returns a shipment ID to use in follow-up operations. For details about the shipment object and example responses, refer to the [EasyPost shipment documentation](https://docs.easypost.com/docs/shipments).

#### Input parameters

| Property     | Type   | Required | Description                    |
| :----------- | :----- | :------- | :----------------------------- |
| To address   | String | Yes      | ID of the destination address. |
| From address | String | Yes      | ID of the origin address.      |
| Parcel       | String | Yes      | ID of the parcel.              |

#### Output

The pre-filled **Result expression** returns the ID of the created shipment:

```feel
={shipmentId: response.body.id}
```

To also get the ID of a [rate](https://docs.easypost.com/docs/shipments/rates) for the shipment, which you need to buy it, replace the **Result expression**. For example, to select the rate of the `Priority` service. The available service names depend on the carrier, and `[1]` fails when no rate matches:

```feel
={priorityRate: response.body.rates[item.service = "Priority"], shipmentId: priorityRate[1].shipment_id, rateId: priorityRate[1].id}
```

### Buy a shipment

Buys a shipment. For details about buying a shipment and example responses, refer to the [EasyPost shipment documentation](https://docs.easypost.com/docs/shipments#buy-a-shipment).

#### Input parameters

| Property    | Type   | Required | Description                |
| :---------- | :----- | :------- | :------------------------- |
| Shipment ID | String | Yes      | ID of the shipment to buy. |
| Rate ID     | String | Yes      | ID of the rate to buy.     |

#### Output

The pre-filled **Result expression** returns the ID of the tracker, the tracking code, and the status of the shipment:

```feel
={trackerId: response.body.tracker.id, trackingCode: response.body.tracking_code, shipmentstatus: response.body.status}
```

### Verify a created address

Verifies an address by its ID.

#### Input parameters

| Property   | Type   | Required | Description                  |
| :--------- | :----- | :------- | :--------------------------- |
| Address ID | String | Yes      | ID of the address to verify. |

#### Output

This operation has no pre-filled **Result expression**. Set a **Result variable** to store the response, or enter a **Result expression** to map the data you need from `response.body`. For details about the response, refer to the [EasyPost address documentation](https://docs.easypost.com/docs/addresses).

### Retrieve a tracker by ID

Retrieves a tracker by its ID and returns the status of the tracker. For details about the tracker object and example responses, refer to the [EasyPost tracker documentation](https://docs.easypost.com/docs/trackers#tracker-object).

#### Input parameters

| Property   | Type   | Required | Description                                                   |
| :--------- | :----- | :------- | :------------------------------------------------------------ |
| Tracker ID | String | Yes      | ID of the tracker, which you receive after buying a shipment. |

#### Output

The pre-filled **Result expression** returns the status of the tracker:

```feel
={trackerStatus: response.body.status}
```

## Troubleshooting

To learn about general error handling in Camunda, see [BPMN errors and failing jobs](/components/connectors/use-connectors/index.md#bpmn-errors).
