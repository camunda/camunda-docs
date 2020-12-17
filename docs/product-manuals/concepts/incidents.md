---
id: incidents
title: "Incidents"
---

In Camunda Cloud, an incident represents a problem in a workflow execution. That means a workflow instance is stuck at some point and it needs a user interaction to resolve the problem.

Incidents are created in different situations, for example, when

- a job is failed and it has no more retries left
- an input or output variable mapping can't be applied
- a condition can't be evaluated

Note that incidents are not created when an unexpected exception (e.g. `NullPointerException`, `OutOfMemoyError` etc.) happens.

## Resolving

In order to resolve an incident, the user must identify and resolve the problem first. Then, the user marks the incident as resolved and thereby triggers to retry workflow execution. If the problem still exists then a new incident is created.

### Resolving a Job-related Incident

If a job is failed and it has no more retries left then an incident is created. There can be different reasons why the job is failed, for example, the variables are not in the expected format, or a service is not available (e.g. a database).

In case that it is caused by the variables, the user needs to update the variables of the workflow instance first. Then, the user needs to increase the remaining retries of the job and mark the incident as resolved. It is recommended to do this in [Operate](/product-manuals/operate/index.md).

However, it is also possible to do this through the client API. Using the Java client, this could look like:

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

When the incident is resolved then the job can be activated by a worker again.

### Resolving a Workflow Instance-related Incident

If an incident is created while workflow execution and it is not related to a job, then it is usually related to the variables of the workflow instance. For example, an input or output variable mapping can't be applied.

To resolve the incident, the user needs to update the variables first and then mark the incident as resolved. It is recommended to do this in [Operate](/product-manuals/operate/index.md).

Using the Java client, this could look like:

```java
client.newSetVariablesCommand(incident.getElementInstanceKey())
    .variables(NEW_VARIABLES)
    .send()
    .join();

client.newResolveIncidentCommand(incident.getKey())
    .send()
    .join();
```

When the incident is resolved then the workflow instance continues.
