---
id: php-sdk-api-reference
title: "Overview"
sidebar_label: "Overview"
sidebar_position: 0
mdx:
  format: md
---

# API reference

:::caution Technical Preview
The PHP SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

The SDK exposes **243 operations** across **41 API groups**. Every operation is available directly on the client (the flat facade) and through the typed `api()` accessor:

```php
$client = CamundaClient::fromEnvironment();

// Flat facade — every operation is a method on the client:
$topology = $client->getTopology();

// Or via the typed API-group accessor:
$jobs = $client->api(\Camunda\Orchestration\Api\Api\JobApi::class);
```

| API group                                                 | Operations |
| --------------------------------------------------------- | ---------- |
| [Ad Hoc Sub Process API](ad-hoc-sub-process-api.md)       | 1          |
| [Agent Definition API](agent-definition-api.md)           | 2          |
| [Agent Instance API](agent-instance-api.md)               | 5          |
| [Audit Log API](audit-log-api.md)                         | 2          |
| [Authentication API](authentication-api.md)               | 2          |
| [Authorization API](authorization-api.md)                 | 5          |
| [Backup API](backup-api.md)                               | 22         |
| [Batch Operation API](batch-operation-api.md)             | 6          |
| [Clock API](clock-api.md)                                 | 2          |
| [Cluster API](cluster-api.md)                             | 7          |
| [Cluster Variable API](cluster-variable-api.md)           | 9          |
| [Conditional API](conditional-api.md)                     | 1          |
| [Decision Definition API](decision-definition-api.md)     | 4          |
| [Decision Instance API](decision-instance-api.md)         | 4          |
| [Decision Requirements API](decision-requirements-api.md) | 3          |
| [Document API](document-api.md)                           | 5          |
| [Element Instance API](element-instance-api.md)           | 5          |
| [Exporting API](exporting-api.md)                         | 6          |
| [Expression API](expression-api.md)                       | 1          |
| [Form API](form-api.md)                                   | 1          |
| [Global Listener API](global-listener-api.md)             | 5          |
| [Group API](group-api.md)                                 | 15         |
| [Incident API](incident-api.md)                           | 5          |
| [Job API](job-api.md)                                     | 12         |
| [License API](license-api.md)                             | 1          |
| [Mapping Rule API](mapping-rule-api.md)                   | 5          |
| [Message API](message-api.md)                             | 2          |
| [Message Subscription API](message-subscription-api.md)   | 2          |
| [Process Definition API](process-definition-api.md)       | 9          |
| [Process instance API](process-instance-api.md)           | 23         |
| [Recovery API](recovery-api.md)                           | 5          |
| [Resource API](resource-api.md)                           | 6          |
| [Role API](role-api.md)                                   | 17         |
| [Secret API](secret-api.md)                               | 2          |
| [Setup API](setup-api.md)                                 | 1          |
| [Signal API](signal-api.md)                               | 1          |
| [System API](system-api.md)                               | 2          |
| [Tenant API](tenant-api.md)                               | 20         |
| [User API](user-api.md)                                   | 5          |
| [User Task API](user-task-api.md)                         | 10         |
| [Variable API](variable-api.md)                           | 2          |
| [Domain type system](domain-type-system.md)               | —          |
