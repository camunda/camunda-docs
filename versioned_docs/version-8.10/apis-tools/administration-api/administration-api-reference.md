---
id: administration-api-reference
title: Administration API (SaaS)
slug: /apis-tools/administration-api/administration-api-reference
description: "Use the Administration API (SaaS) to manage and interact with Camunda 8 SaaS clusters and API clients."
sidebar_position: 1
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## About

You can use the Camunda 8 Administration API (SaaS) as a programmatic interface for managing your Camunda 8 SaaS clusters and API clients.

- Provides endpoints for common operations such as cluster backup, creation, and deletion, and client and member management.
- The API allows for IP allowlisting and secret management.

## Try with Swagger

Use the interactive Swagger API explorer with your Camunda 8 cluster (requires a valid access token).

<p class="link-arrow">[Swagger API explorer](https://console.cloud.camunda.io/customer-api/openapi/docs/#/)</p>

## Authentication

All Administration API requests require authentication. To authenticate, generate a [JSON Web Token (JWT)](https://jwt.io/introduction/) and include it in each request.

<p class="link-arrow">[Authentication](authentication.md)</p>
