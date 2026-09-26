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

The SDK exposes **244 operations** across **41 API groups**. Every operation is available directly on the client (the flat facade) and through the typed `api()` accessor:

```php
$client = CamundaClient::fromEnvironment();

// Flat facade — every operation is a method on the client:
$topology = $client->getTopology();

// Or via the typed API-group accessor:
$jobs = $client->api(\Camunda\Orchestration\Api\Api\JobApi::class);
```

| API group                                                 | Operations |
| --------------------------------------------------------- | ---------- |
| [Ad Hoc Sub Process Api](ad-hoc-sub-process-api.md)       | 1          |
| [Agent Definition Api](agent-definition-api.md)           | 2          |
| [Agent Instance Api](agent-instance-api.md)               | 5          |
| [Audit Log Api](audit-log-api.md)                         | 2          |
| [Authentication Api](authentication-api.md)               | 2          |
| [Authorization Api](authorization-api.md)                 | 5          |
| [Backup Api](backup-api.md)                               | 22         |
| [Batch Operation Api](batch-operation-api.md)             | 6          |
| [Clock Api](clock-api.md)                                 | 2          |
| [Cluster Api](cluster-api.md)                             | 8          |
| [Cluster Variable Api](cluster-variable-api.md)           | 9          |
| [Conditional Api](conditional-api.md)                     | 1          |
| [Decision Definition Api](decision-definition-api.md)     | 4          |
| [Decision Instance Api](decision-instance-api.md)         | 4          |
| [Decision Requirements Api](decision-requirements-api.md) | 3          |
| [Document Api](document-api.md)                           | 5          |
| [Element Instance Api](element-instance-api.md)           | 5          |
| [Exporting Api](exporting-api.md)                         | 6          |
| [Expression Api](expression-api.md)                       | 1          |
| [Form Api](form-api.md)                                   | 1          |
| [Global Listener Api](global-listener-api.md)             | 5          |
| [Group Api](group-api.md)                                 | 15         |
| [Incident Api](incident-api.md)                           | 5          |
| [Job Api](job-api.md)                                     | 12         |
| [License Api](license-api.md)                             | 1          |
| [Mapping Rule Api](mapping-rule-api.md)                   | 5          |
| [Message Api](message-api.md)                             | 2          |
| [Message Subscription Api](message-subscription-api.md)   | 2          |
| [Process Definition Api](process-definition-api.md)       | 9          |
| [Process Instance Api](process-instance-api.md)           | 23         |
| [Recovery Api](recovery-api.md)                           | 5          |
| [Resource Api](resource-api.md)                           | 6          |
| [Role Api](role-api.md)                                   | 17         |
| [Secret Api](secret-api.md)                               | 2          |
| [Setup Api](setup-api.md)                                 | 1          |
| [Signal Api](signal-api.md)                               | 1          |
| [System Api](system-api.md)                               | 2          |
| [Tenant Api](tenant-api.md)                               | 20         |
| [User Api](user-api.md)                                   | 5          |
| [User Task Api](user-task-api.md)                         | 10         |
| [Variable Api](variable-api.md)                           | 2          |
| [Domain type system](domain-type-system.md)               | —          |
