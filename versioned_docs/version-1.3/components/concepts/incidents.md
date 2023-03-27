---
id: incidents
title: "Incidents"
description: "A process instance is stuck at a particular point, and requires user interaction to resolve the problem."
---

In Camunda Cloud, an incident represents a problem in process execution. This means a process instance is stuck at a particular point, and requires user interaction to resolve the problem.

Incidents are created in different situations, including the following:

- A job is failed and it has no retries left.
- An input or output variable mapping can't be applied.
- A condition can't be evaluated.

:::note
Incidents are not created when an unexpected exception (e.g. `NullPointerException`, `OutOfMemoyError` etc.) occurs.
:::

## Resolving

To resolve an incident, complete the following steps:

1. Identify and resolve the problem.
2. Mark the incident as resolved, triggering retry process execution.
3. If the problem still exists, a new incident is created.

### Resolving a job-related incident

If a job fails and has no retries remaining, an incident is created. There are many different reasons why the job may have failed. For example, the variables may not be in the expected format, or a service is not available (e.g. a database).

If the variables are causing the incident, complete the following steps:

1. Update the variables of the process instance.
2. Increase the remaining retries of the job.
3. Mark the incident as resolved. 

:::note
It's recommended you complete these operations in [Operate](/components/operate/index.md).
:::

It is also possible to complete these steps via the client API. Using the Java client, this could look like the following:

```java
client.newSetVariablesCommand(incident.getElementInstanceKey())
    .variables(NEW_PAYLOAD)
    .send()
    .join();

client.newUpdateRetriesCommand(incident.getJobKey())
    .retries(3)
    .send()
    .join();

client.newResolveIncidentCommand(incident.getKey())
    .send()
    .join();
```

When the incident is resolved, the job can be activated by a worker again.

### Resolving a process instance-related incident

If an incident is created during process execution and it's not related to a job, the incident is usually related to the variables of the process instance. For example, an input or output variable mapping can't be applied.

To resolve the incident, update the variables and mark the incident as resolved.

:::note
It's recommended you complete these operations in [Operate](/components/operate/index.md).
:::

Using the Java client, this could look like the following:

```java
client.newSetVariablesCommand(incident.getElementInstanceKey())
    .variables(NEW_VARIABLES)
    .send()
    .join();

client.newResolveIncidentCommand(incident.getKey())
    .send()
    .join();
```

When the incident is resolved, the process instance continues.

- [Operate](/components/operate/index.md)
- [APIs and Clients](/apis-tools/overview.md)
