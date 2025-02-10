---
id: google-maps-platform
title: Google Maps Platform Connector
sidebar_label: Google Maps
description: Learn how to validate addresses, retrieve postal addresses, and calculate distances with Google Maps Platform Connector.
---

The **Google Maps Platform Connector** in an inbound Connector that allows you to validate addresses, retrieve postal addresses, and calculate distances with [Google Maps Platform Service](https://mapsplatform.google.com/) in BPMN process.

## Create a Google Maps Platform Connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Make your Google Maps Platform Connector executable

To work with the Google Maps Platform Connector, choose the required operation type in the **Operation** section and enable the required Google Service API (which depends on the operation). Set the API key in the **Authentication** section and complete the mandatory fields highlighted in red in the Connector on the right side of the screen under the **Deploy** button.

:::note
All the mandatory and non-mandatory fields and required settings depending on the operation selection you choose are covered in the upcoming sections.
:::

## Authentication

In the **Authentication** section, set the relevant API key. Refer to the [official documentation](https://cloud.google.com/docs/authentication/api-keys#create) for more information on creating an API key.

:::note
We advise you to keep your authentications and secrets data safe and avoid exposing it in the BPMN XML file by creating a secret:

1. Follow our [guide for creating secrets](/components/console/manage-clusters/manage-secrets.md).
2. Name your secret (i.e `GOOGLE_MAPS_PLATFORM_API_KEY`) so you can reference it later in the Connector.

:::

## Operation types

### Validate address

This operation allows you to validate an address and its components, standardize the address for mailing, and determine the best known geocode for it.
To use this operation, enable the [Google Address Validation API](https://developers.google.com/maps/documentation/address-validation/overview). Refer to the [official documentation](https://developers.google.com/maps/documentation/address-validation/cloud-setup) for more information on enabling the Google API.

### Get place ID

This operation allows you to get the Google Maps place ID by address.
To use this operation, enable the [Google Places API](https://developers.google.com/maps/documentation/places/web-service). Refer to the [official documentation](https://developers.google.com/maps/documentation/places/web-service/get-api-key) for more information on enabling the Google API.

### Calculate distance

This operation allows you to calculate a distance between two place IDs.
To use this operation, enable the [Google Directions API](https://developers.google.com/maps/documentation/directions). Refer to the [official documentation](https://developers.google.com/maps/documentation/directions/get-api-key) for more information on enabling the Google API.

## Usage

### Address validation, formatting, getting postal address

1. Select **Validate Address** from the **Operation type** dropdown in the **Operation** section.
2. Populate the **Authentication** section as described in the [respective section](#authentication).
3. (Optional) In the **Input** section, set **Region Code** (i.e `US`). You can find supported region codes [here](https://developers.google.com/maps/documentation/address-validation/coverage).
4. (Optional) In the **Input** section, set **Locality**, an incorporated city or town political entity (i.e `Mountain View`).
5. In the **Input** section, set **Address**, an incorporated city or town political entity (i.e `1600 Amphitheatre Pkwy`).
6. In the **Output** section set **Result Variable** or **Result Expression**. Refer to the [response mapping documentation](/components/connectors/use-connectors/index.md#response-mapping) to learn more.
7. Find a full example of the **Google Maps Platform Connector** response [here](https://developers.google.com/maps/documentation/address-validation/requests-validate-address#address_validation_response). To get postal address and formatted address, set to **Result Expression** in the FEEL expression:

```
{
 formattedAddress: response.body.result.address.formattedAddress,
 postalAddress: response.body.result.address.postalAddress
}
```

### Get place ID

1. Select **Get Place ID** from the **Operation type** dropdown in the **Operation** section.
2. Populate the **Authentication** section as described in the [respective section](#authentication).
3. In the **Input** section, set **Address**. This address can be `formatedAddress`, which you can get using [this example](#address-validation-formatting-getting-postal-address).
4. In the **Output** section in the **Result Expression** property, the following expression is preset:

```
{
   placeId: response.body.candidates[1].place_id
}
```

In this way, the response of this method will contain a mapping from the variable 'placeId' and the ID of the place:

```json
{
  "placeId": "place....."
}
```

### Calculate distance

1. Select **Calculate Distance** from the **Operation type** dropdown in the **Operation** section.
2. Populate the **Authentication** section as described in the [respective section](#authentication).
3. In the **Input** section, set **Destination**, the place ID value that you want to use as the destination for calculating distance.
4. In the **Input** section, set **Origin**, the place ID value that you want to use as the starting point for calculating distance.
5. Select the unit system to use when displaying results from the **Units** dropdown in the **Input** section.
6. Select the transportation mode to use when calculating distances and directions from the **Mode** dropdown in the **Input** section.
7. In the **Output** section, set **Result Variable** or **Result Expression**. Refer to the [response mapping documentation](/components/connectors/use-connectors/index.md#response-mapping) to learn more.
8. Find a full example of the **Google Maps Platform Connector** response [here](https://developers.google.com/maps/documentation/directions/start#getting-directions). To get a distance, set **Result Expression** in the FEEL expression:

```
{
 distance: response.body.routes[1].legs[1].distance.text
}
```

## Using Google Maps Platform Connector best practice

There is no guarantee a queue item will be processed right away. In that case, we suggest building your BPMN diagram to periodically retry polling.
To learn more, refer to the entry titled _Solution with Timer and Loop_ on the [Camunda BPMN examples](https://camunda.com/bpmn/examples/) page.

:::note
To avoid performance issues, it is recommended to limit the number of loop retries.
:::
