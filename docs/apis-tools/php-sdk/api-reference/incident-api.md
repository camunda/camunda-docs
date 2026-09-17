---
id: incident-api
title: "Incident API"
sidebar_label: "Incident API"
sidebar_position: 23
mdx:
  format: md
---

# Incident API

`IncidentApi` — 5 operations. Call any of these directly on the client, or via `$client->api(\Camunda\Orchestration\Api\Api\IncidentApi::class)`.

- `getIncident()`
- `getProcessInstanceStatisticsByDefinition()`
- `getProcessInstanceStatisticsByError()`
- `resolveIncident()`
- `searchIncidents()`
