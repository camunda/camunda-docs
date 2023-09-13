---
title: Overview
description: "These practices are condensed experience using BPMN and DMN on the Camunda toolstack, and are a mix of conceptual and practical implementation information."
---

The Camunda Best Practices are our condensed experience of using BPMN and DMN on the Camunda toolstack, and collected by consulting engagement with our customers, feedback from the community and various other occasions. Best Practices are a mix of conceptual and practical implementation information.

Best Practices represent the current state of our practical project experience as far as it is generalizable. They are neither "final" (in the sense that we ourselves will hopefully continue to learn!) nor are they necessarily the best approach for your own situation.

Note that Camunda give the same guarantee as the core product for best practices. In order to present as much experiences as possible, we cannot accept any responsibility for the accuracy or timeliness of the statements made. If examples of source code are shown, a total absence of errors in the provided source code cannot be guaranteed. Liability for any damage resulting from the application of the recommendations presented here, is excluded.

:::caution Camunda 8
In general, best practices apply to Camunda 8, but there are also some specific Camunda 7 practices in their own section below.
:::

## Project management best practices

- [Following the Customer Success Path](../management/following-the-customer-success-path/)
- [Doing a proper POC](../management/doing-a-proper-poc/)

## Architecture best practices

- [Deciding about your stack](../architecture/deciding-about-your-stack/)
- [Sizing your environment](../architecture/sizing-your-environment/)
- [Understanding human task management](../architecture/understanding-human-tasks-management/)

## Development best practices

- [Connecting the workflow engine with your world](../development/connecting-the-workflow-engine-with-your-world)
- [Service integration patterns with BPMN](../development/service-integration-patterns)
- [Writing good workers](../development/writing-good-workers)
- [Dealing with problems and exceptions](../development/dealing-with-problems-and-exceptions)
- [Handling data in processes](../development/handling-data-in-processes)
- [Routing events to processes](../development/routing-events-to-processes)
- [Testing process definitions](../development/testing-process-definitions)

## Modeling best practices

- [Creating readable process models](../modeling/creating-readable-process-models/)
- [Naming BPMN elements](../modeling/naming-bpmn-elements/)
- [Naming technically relevant IDs](../modeling/naming-technically-relevant-ids/)
- [Modeling beyond the happy path](../modeling/modeling-beyond-the-happy-path/)
- [Modeling with situation patterns](../modeling/modeling-with-situation-patterns/)
- [Building flexibility into BPMN models](../modeling/building-flexibility-into-bpmn-models/)
- [Choosing the DMN Hit Policy](../modeling/choosing-the-dmn-hit-policy/)

## Operations best practices

- [Versioning process definitions](../operations/versioning-process-definitions/)
- [Reporting about processes](../operations/reporting-about-processes/)

## Camunda 7 specific best practices

:::caution Camunda 7
The best practices in this section apply to Camunda 7 only
:::

- Architecture
  - [Deciding about your Camunda 7 stack](../architecture/deciding-about-your-stack-c7/)
  - [Sizing your Camunda 7 environment](../architecture/sizing-your-environment-c7/)
- Development
  - [Invoking services from a Camunda 7 process](../development/invoking-services-from-the-process-c7/)
  - [Understanding Camunda 7 transaction handling](../development/understanding-transaction-handling-c7/)
- Operations
  - [Operating Camunda 7](../operations/operating-camunda-c7/)
  - [Performance tuning Camunda 7](../operations/performance-tuning-camunda-c7/)
  - [Securing Camunda 7](../operations/securing-camunda-c7/)
- Other
  - [Extending human task management in Camunda 7](../architecture/extending-human-task-management-c7/)
