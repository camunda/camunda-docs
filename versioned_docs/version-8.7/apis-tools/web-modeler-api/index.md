---
id: overview
title: "Overview"
slug: /apis-tools/web-modeler-api/overview
sidebar_position: 1
description: "Web Modeler API is a REST API and provides access to Web Modeler data. Requests and responses are in JSON notation."
---

Web Modeler provides a REST API at `/api/*`. Clients can access this API by passing a JWT access token in an authorization header `Authorization: Bearer <JWT>`.

:::note
Ensure you [authenticate](./authentication.md) before accessing the Web Modeler API.
:::

## OpenAPI documentation

A detailed API description is available as [OpenAPI](https://www.openapis.org/) specification at [https://modeler.camunda.io/swagger-ui/index.html](https://modeler.camunda.io/swagger-ui/index.html)
for SaaS and at [http://localhost:8070/swagger-ui.html](http://localhost:8070/swagger-ui.html) for Self-Managed
installations.

## API in Postman

Work with this API in our [Postman collection](https://www.postman.com/camundateam/workspace/camunda-8-postman/collection/26079299-0bb668f4-af6a-4ab0-88a3-c78b900125ed?action=share&creator=11465105).

## Limitations

When using Web Modeler API:

- You will not receive a warning when deleting a file, a folder, or a project.
  This is important, because deletion cannot be undone.
- You will not receive a warning about breaking call activity links or business rule task links when moving files or folders to another project.
  Breaking these links is considered harmless. The broken links can be manually removed or restored in Web Modeler. This operation is also
  reversible - simply move the files or folders back to their original location.

## Rate Limiting

In SaaS, the Web Modeler API uses rate limiting to control traffic.
The limit is 240 requests per minute.
Surpassing this limit will result into a `HTTP 429 Too Many Requests` response.

On Self-Managed instances no limits are enforced.

## FAQ

### What is the difference between _simplePath_ and _canonicalPath_?

In Web Modeler you can have multiple files with the same name, multiple folders with the same name, and even multiple projects with the same name. Internally, duplicate names are disambiguated by unique IDs.

The API gives you access to the names, as well as the IDs. For example, when requesting a file you will get the following information:

- **simplePath** contains the human-readable path. This path may be ambiguous or may have ambiguous elements (e.g. folders) in it.
- **canonicalPath** contains the unique path. It is a list of **PathElementDto** objects which contain the ID and the name of the element.

Internally, the IDs are what matters. You can rename files or move files between folders and projects and the ID will stay the same.
