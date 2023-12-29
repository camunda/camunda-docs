---
id: tutorial
title: Tutorial
sidebar_label: Tutorial
description: Step through an example to highlight the capabilities of the Optimize API.
---

In this tutorial, we'll step through an example to highlight the capabilities of the Optimize API, such as deleting a report.

## Getting started

### Include a bearer token as an authorization request header

You need to [authenticate](./optimize-api-authentication.md) to access the API endpoints.

Most requests of the public REST API need to include a bearer token as an authorization request header. Given a valid token `mySecret`, the header would need to be set as follows:

```
Authorization: Bearer mySecret
```

The token used to access the Optimize API can be a configurable shared secret (except in Camunda 8 SaaS mode) or a JWT compliant with the OAuth2 Protocol (all modes).

### Obtain the access token for Camunda 8

You must obtain a token to use the Optimize API. When you [create an Optimize client]($docs$/apis-tools/build-your-own-client/), you get all the information needed to connect to Optimize.

Send a token issue _POST_ request with the [required settings](./optimize-api-authentication.md#how-to-obtain-the-access-token-for-camunda-8) to the authentication server with the following content:

```json
{
  "client_id": "<client-id>",
  "client_secret": "<client-secret>",
  "audience": "<audience>",
  "grant_type": "client_credentials"
}
```

## Delete a report

The report deletion API allows you to delete reports by ID from Optimize.

:::note Heads up!
During deletion a report will get removed from any dashboard or combined process report it is referenced by. In case a report is referenced by an alert, the corresponding alert will get deleted too.
:::

To delete a report, utilize the following request where `report-ID` is the ID of the report you wish to delete:

DELETE `/api/public/report/{report-ID}`

:::note
The authentication request header **must** be provided with every delete request. Refer to the [getting started](#getting-started) section above for details on authentication.
:::

For example, to delete a report with the ID `e6c5abb1-6a18-44e7-8480-d562d511ba62`, this is what your request should look like, with request header `Authorization: Bearer mySecret`:

DELETE `/api/public/report/e6c5aaa1-6a18-44e7-8480-d562d511ba62`

The response should be a 204 status code, meaning a successful request. See additional details on this request, including other status codes, in the official [delete report documentation](./report/export-report-definitions.md).
