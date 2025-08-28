---
id: install
title: Installation & Quick start
sidebar_label: Installation & Quick start
description: "Install the Data Migrator and run your first migration."
---

Install the Data Migrator and run your first data migration.

## Prerequisites

- Java 21+
- Running Camunda 8 (SaaS or self-managed)
- Access to Camunda 7 database
- Models migrated and deployed to C8

## Installation

1. Download the latest release from the GitHub releases page:
   - https://github.com/camunda/camunda-7-to-8-data-migrator/releases
2. Extract the archive to your preferred directory.
3. Navigate to the extracted directory.

## Quick Start

1. Make sure Camunda 8 is up and running and all process models that shall be migrated are deployed.

   To be used with the Runtime Data Migrator, **every process model requires**:
   - A blank start event (you need to add one if the process model doesn't have one)
   - An execution listener at the end of your blank start event with the job type `migrator` (you have to add it manually, or let it be added by the [Migration Analyzer & Diagram Converter](/guides/migrating-from-camunda-7/migration-tooling.md#migration-analyzer--diagram-converter)).

   ```xml
    <bpmn:startEvent id="StartEvent_1">
      <bpmn:extensionElements>
        <zeebe:executionListeners>
          <zeebe:executionListener eventType="end" type="migrator" />
        </zeebe:executionListeners>
      </bpmn:extensionElements>
    </bpmn:startEvent>
   ```

   - **Hint:** For automatic resource deployment, you can also drop your BPMN files into the `configuration/resources` folder.

2. Drop your JDBC driver into the `configuration/userlib` folder (for example, `postgresql-42.2.5.jar` for PostgreSQL).

3. Prepare your configuration file (`configuration/application.yml`):

   ```yaml
   camunda.client:
     mode: self-managed
     grpc-address: http://localhost:26500
     rest-address: http://localhost:8088

   camunda.migrator.c7.data-source:
     jdbc-url: jdbc:postgresql://localhost:5432/camunda7
     username: your-username
     password: your-password
   ```

4. Run the migrator:

   ```bash
   # On Linux/macOS
   ./start.sh --help

   # On Windows
   start.bat --help
   ```

5. Monitor the migration progress in the console output and log files.
