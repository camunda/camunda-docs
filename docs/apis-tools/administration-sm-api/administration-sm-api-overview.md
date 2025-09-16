---
id: administration-sm-api-overview
title: "Overview"
sidebar_position: 1
description: "Access the Administration API for Self-Managed."
---

The Administration API for Self-Managed is a REST API and provides endpoints to get cluster data including installed apps and usage metrics.

## Authentication

Clients can only access the Administration Self-Managed REST API by passing a JWT access token in an authorization header `Authorization: Bearer <TOKEN>`. Details are covered in the [Authentication](./administration-sm-api-authentication.md) section.

## API Reference and Explorer

See [the interactive Administration API Self-Managed Explorer][administration-api-explorer] for specifications, example requests and responses, and code samples of interacting with the Administration Self-Managed API.

A detailed API description is available as [OpenAPI](https://www.openapis.org/) specification in a running instance of Console Self-Managed at `https://${base-url}/admin-api/openapi/docs`.

[administration-api-explorer]: ./specifications/administration-api-self-managed.info.mdx
