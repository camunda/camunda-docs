---
id: administration-sm-api-overview
title: "Administration API (Self-Managed)"
sidebar_position: 1
description: "Use the Administration API (Self-Managed) to retrieve Self-Managed cluster data and usage metrics."
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## About

You can use the Administration API for Self-Managed REST API to retrieve cluster data from your Self-Managed environment, including installed apps and usage metrics.

## Authentication

To access the Administration Self-Managed REST API, clients must include a JWT access token in the authorization header:

```
Authorization: Bearer <TOKEN>
```

For more details, see the [authentication guide](./administration-sm-api-authentication.md).

## API reference and explorer

Use the [interactive Administration API Self-Managed Explorer][administration-api-explorer] to view specifications, example requests and responses, and code samples for interacting with the Administration Self-Managed API.

You can also access a detailed API description via the [OpenAPI](https://www.openapis.org/) specification in a running instance of Console Self-Managed at:

```
https://${base-url}/admin-api/openapi/docs
```

[administration-api-explorer]: ./specifications/administration-api-self-managed.info.mdx
