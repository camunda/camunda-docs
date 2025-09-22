---
id: overview
title: "Overview"
description: "Get, delete, and export reports and dashboards, enable and disable sharing, and more with the Optimize API."
---

The Optimize API lets you programmatically manage and analyze reports and dashboards in Camunda Optimize. Use it to:

- Retrieve, create, update, and delete reports and dashboards
- Export dashboards and reports for sharing or backup
- Enable or disable sharing links

## Authentiction

All Optimize API requests except [the health readiness](./health-readiness.md) endpoint require authentication. To authenticate, generate a [JSON Web Token (JWT)](https://jwt.io/introduction/) and include it in each request.

For more details, see the [Authentication](./optimize-api-authentication.md) section.

## API Postman Collection

To get started quickly, consider using the [Postman collection](https://www.postman.com/camundateam/workspace/camunda-8-postman/collection/24684262-a1103c05-7ed8-4fd4-8716-9005583ce23a?action=share&creator=11465105).

## Usage Notes

Deleting a file, folder, or project via the API is immediate and cannot be undone. Use caution.

## Further Resources

- [Authentication](./optimize-api-authentication.md) section.
- [Camunda Optimize documentation](/components/optimize/what-is-optimize.md)
- [Postman collection](https://www.postman.com/camundateam/workspace/camunda-8-postman/collection/24684262-a1103c05-7ed8-4fd4-8716-9005583ce23a?action=share&creator=11465105)
