---
id: reimport
title: "Camunda engine data reimport"
description: "Find out how to reimport Camunda engine data without losing your reports and dashboards."
---

<span class="badge badge--platform">Camunda 7 only</span>

There are cases where you might want to remove all Camunda 7 engine data from Optimize which has been imported from connected Camunda engines but don't want to lose Optimize entities such as collections, reports, or dashboards you created.

:::note Warning!
Triggering a reimport causes the current data imported from the engine to be deleted and a new import cycle to be started. That also means that data which has already been removed from the engine (e.g. using the [history cleanup feature](https://docs.camunda.org/manual/latest/user-guide/process-engine/history/#history-cleanup)) is irreversibly lost.

When triggering a reimport, all existing event-based processes get unpublished and reset to the `mapped` state. This is due to the fact that event-based processes may include Camunda engine data, yet the reimport does not take into account which sources event-based processes are actually based on and as such clears the data for all of them.

You then have to manually publish event-based processes after you have restarted Optimize.
:::

To reimport engine data, perform the following
steps:

1. Stop Optimize, but keep Elasticsearch running (hint: to only start Elasticsearch without Optimize, you can use `elasticsearch-startup.sh` or `elasticsearch-startup.bat` scripts).
2. From the Optimize installation root run `./reimport/reimport.sh` on Linux or `reimport/reimport.bat` on Windows and wait for it to finish

   - In Docker environments, you can override the command the container executes on start to call the reimport script, e.g. in [docker-compose](https://docs.docker.com/compose/) this could look like the following:

   ```
   version: '2.4'

   services:
     optimize:
       image: registry.camunda.cloud/optimize-ee/optimize:latest
       command: ["./reimport/reimport.sh"]
   ```

3. Start Optimize again. Optimize will now import all the engine data from scratch.
4. If you made use of event-based processes you will have to manually publish them again.
