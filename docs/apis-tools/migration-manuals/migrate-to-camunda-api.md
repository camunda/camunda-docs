---
id: migrate-to-camunda-api
title: "Migrate to the 8.9 Orchestration Cluster API"
sidebar_label: "Orchestration Cluster API"
description: "Migration guide for the Orchestration Cluster API, covering changes in the 8.9 release and how to update your clients accordingly."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Migrate to the 8.9 Orchestration Cluster API

## About this guide

This guide is intended for users of the Orchestration Cluster API who are migrating to the 8.9 release of Camunda 8.

## Generated client compatibility for 8.9 OpenAPI updates

This section is relevant if you generate clients/SDKs from the Orchestration Cluster OpenAPI specification.

Starting with 8.9, some OpenAPI changes can be source-breaking for generated clients, even when runtime payload values are still string-like.

### Type-hardened request properties

The following request properties were hardened from plain `string` to stronger schema types:

- `CreateDeploymentData.body.tenantId`: `string` → `TenantId`
- `CreateDocumentData.query.documentId`: `string` → `DocumentId`
- `SearchCorrelatedMessageSubscriptionsData.body.filter.processDefinitionKey.$eq`: `string` → `ProcessDefinitionKey`
- `CorrelatedMessageSubscriptionFilter.processDefinitionKey`: `string` → `ProcessDefinitionKeyFilterProperty | undefined`
- `CorrelatedMessageSubscriptionSearchQuery.filter.processDefinitionKey.$eq`: `string` → `ProcessDefinitionKey`

Potential impact:

- Compile-time errors after regenerating strongly typed clients.
- Helper/builders that assign plain strings may require type updates.

### Enum additions with strict client handling

The following enum values were added in 8.9:

- `BatchOperationTypeEnum` / `BatchOperationTypeFilterProperty`: `DELETE_DECISION_INSTANCE`
- `ResourceTypeEnum`: `USER_TASK`
- `PermissionTypeEnum`: `COMPLETE`

Potential impact for strict generated clients:

- Exhaustive enum matching can fail.
- Deserializers configured to reject unknown enum values can fail at runtime.

### Migration checklist

1. Regenerate your client from the 8.9 OpenAPI specification.
1. Update request builder/helper code to use the generated hardened types for affected fields.
1. Avoid exhaustive enum matching without a fallback/unknown branch.
1. Verify serializer/deserializer settings for unknown enum literals.
1. Re-run client compile/test pipelines with regenerated models.

### Example: request typing before/after

Before (plain string assignment):

```ts
request.filter.processDefinitionKey = { $eq: "2251799813685290" };
```

After (use generated typed value):

```ts
request.filter.processDefinitionKey = {
  $eq: processDefinitionKey("2251799813685290"),
};
```

### Example: enum handling with fallback branch

```ts
switch (item.operationType) {
  case "CANCEL_PROCESS_INSTANCE":
  case "MIGRATE_PROCESS_INSTANCE":
  case "MODIFY_PROCESS_INSTANCE":
  case "RESOLVE_INCIDENT":
  case "DELETE_DECISION_INSTANCE":
    handleKnownType(item.operationType);
    break;
  default:
    handleUnknownType(item.operationType);
}
```
