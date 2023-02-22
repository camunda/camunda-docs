---
id: index
title: "Java examples"
sidebar_label: "Overview"
---

Let's analyze a few examples utilizing Java to deploy a process, open a job worker, handle variables, and request cluster topology.

These examples are accessible in the [Camunda 8 examples GitHub repository](https://github.com/camunda-community-hub/camunda-8-examples) on the [main branch](https://github.com/camunda-community-hub/camunda-8-examples/tree/main/zeebe-client-plain-java).

Instructions to access code locally:

```
git clone https://github.com/camunda-community-hub/camunda-8-examples
git checkout main
cd zeebe-client-plain-java
```

Import the Maven project in the `samples` directory into your IDE to start hacking.

## Process

- [Deploy a process](process-deploy.md)
- [Create a process instance](process-instance-create.md)
- [Create non-blocking process instances](process-instance-create-nonblocking.md)
- [Create a process instance with results](process-instance-create-with-result.md)

## Decision

- [Evaluate a decision](decision-evaluate.md)

## Job

- [Open a job worker](job-worker-open.md)

## Data

- [Handle variables as POJO](data-pojo.md)

## Cluster

- [Request cluster topology](cluster-topology-request.md)
