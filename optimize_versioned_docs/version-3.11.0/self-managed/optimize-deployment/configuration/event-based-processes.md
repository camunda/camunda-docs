---
id: event-based-process-configuration
title: "Event-based process system configuration"
description: "How to configure event-based processes in Optimize."
---

<span class="badge badge--platform">Camunda 7 only</span>

Configuration of the Optimize event based process feature.

| YAML Path                                                      | Default Value | Description                                                                                                                                                                                                                                                                                                                             |
| -------------------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| eventBasedProcess.authorizedUserIds                            | [ ]           | A list of userIds that are authorized to manage (Create, Update, Publish & Delete) event based processes.                                                                                                                                                                                                                               |
| eventBasedProcess.authorizedGroupIds                           | [ ]           | A list of groupIds that are authorized to manage (Create, Update, Publish & Delete) event based processes.                                                                                                                                                                                                                              |
| eventBasedProcess.eventImport.enabled                          | false         | Determines whether this Optimize instance performs event based process instance import.                                                                                                                                                                                                                                                 |
| eventBasedProcess.eventImport.maxPageSize                      | 5000          | The batch size of events being correlated to process instances of event based processes.                                                                                                                                                                                                                                                |
| eventBasedProcess.eventIndexRollover.scheduleIntervalInMinutes | 10            | The interval in minutes at which to check whether the conditions for a rollover of eligible indices are met, triggering one if required. This value should be greater than 0.                                                                                                                                                           |
| eventBasedProcess.eventIndexRollover.maxIndexSizeGB            | 50            | Specifies the maximum total index size for events (excluding replicas). When shards get too large, query performance can slow down and rolling over an index can bring an improvement. Using this configuration, a rollover will occur when triggered and the current event index size matches or exceeds the maxIndexSizeGB threshold. |

## Event Ingestion REST API Configuration

<span class="badge badge--platform">Camunda 7 only</span>

Configuration of the Optimize [Event Ingestion REST API](../../../apis-tools/optimize-api/event-ingestion.md) for [event-based processes](components/userguide/additional-features/event-based-processes.md).

| YAML Path                                             | Default Value | Description                                                                                                                                                                                                                                                                       |
| ----------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| eventBasedProcess.eventIngestion.maxBatchRequestBytes | 10485760      | Content length limit for an ingestion REST API bulk request in bytes. Requests will be rejected when exceeding that limit. Defaults to 10MB. In case this limit is raised you should carefully tune the heap memory accordingly, see Adjust Optimize heap size on how to do that. |
| eventBasedProcess.eventIngestion.maxRequests          | 5             | The maximum number of event ingestion requests that can be serviced at any given time.                                                                                                                                                                                            |
