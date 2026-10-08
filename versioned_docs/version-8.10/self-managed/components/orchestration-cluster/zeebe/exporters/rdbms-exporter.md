---
id: rdbms-exporter
title: "RDBMS Exporter"
sidebar_label: "RDBMS Exporter"
description: "Understand how the RDBMS Exporter writes Orchestration Cluster secondary storage data for Operate and Tasklist."
---

The RDBMS Exporter writes Orchestration Cluster secondary storage data to relational database tables.

It is enabled when secondary storage is configured as `rdbms`.

## How it works

- The RDBMS Exporter consumes records from the log stream, transforming relevant records and writing them to secondary storage database tables.
- Operate and Tasklist query this secondary storage data through the Orchestration Cluster APIs.

## Configuration

Configure the exporter through secondary storage settings:

- [RDBMS secondary storage configuration](/self-managed/concepts/databases/relational-db/configuration.md)
- [Secondary storage properties](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#data---secondary-storage)
