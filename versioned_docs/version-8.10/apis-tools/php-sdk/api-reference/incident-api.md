---
id: incident-api
title: "Incident Api"
sidebar_label: "Incident Api"
sidebar_position: 23
mdx:
  format: md
---

# Incident Api

`IncidentApi` — 5 operations. Call any of these directly on the client, or via `$client->api(\Camunda\Orchestration\Api\Api\IncidentApi::class)`.

- `getIncident()`
- `getProcessInstanceStatisticsByDefinition()`
- `getProcessInstanceStatisticsByError()`
- `resolveIncident()`
- `searchIncidents()`
