---
id: overview
title: "Overview"
description: "Manage and analyze reports and dashboards with the Optimize API, including sharing, exporting, and more."
---

The Optimize API lets you programmatically manage and analyze reports and dashboards in Camunda Optimize. Use it to:

- Retrieve, create, update, and delete reports and dashboards
- Export dashboards and reports for sharing or backup
- Enable or disable sharing links

## Authentication

All Optimize API requests, except [the health readiness](./health-readiness.md) endpoint, require authentication. To authenticate, generate a [JSON Web Token (JWT)](https://jwt.io/introduction/) and include it in each request.

For more details, see the [Authentication](./optimize-api-authentication.md) section.

## API Postman collection

To get started quickly, consider using the [Postman collection](https://www.postman.com/camundateam/workspace/camunda-8-postman/collection/24684262-a1103c05-7ed8-4fd4-8716-9005583ce23a?action=share&creator=11465105).

## Usage notes

Deleting a file, folder, or project via the API is immediate and cannot be undone. Use caution.

## Further resources

- [Authentication](./optimize-api-authentication.md)
- [Camunda Optimize documentation](/components/optimize/what-is-optimize.md)
- [Postman collection](https://www.postman.com/camundateam/workspace/camunda-8-postman/collection/24684262-a1103c05-7ed8-4fd4-8716-9005583ce23a?action=share&creator=11465105)
