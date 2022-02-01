---
title: Overview
---

The Camunda best practices are our condensed experience of using BPMN and DMN on the Camunda toolstack, and collected by consulting engagement with our customers, feedback from the community and various other occasions. Best Practices are a mix of conceptual and practical implementation information. 

Best Practices represent the current state of our practical project experience as far as it is generalizable. They are neither "final" (in the sense that we ourselves will hopefully continue to learn!) nor are they necessarily the best approach for your own situation.

Note that Camunda give the same guarantee as the core product for best practices. In order to present as much experiences as possible, we cannot accept any responsibility for the accuracy or timeliness of the statements made. If examples of source code are shown, a total absence of errors in the provided source code cannot be guaranteed. Liability for any damage resulting from the application of the recommendations presented here, is excluded.

Best practices are **written for Camunda Cloud**:

| Topic | Best practice |
| :- | :- |
| **Architecture** |
| | [Sizing your environment](../architecture/sizing-your-environment/) |
| **Development** |
| | [Connecting the workflow engine with your world](../development/connecting-the-workflow-engine-with-your-world) |
| | [Service integration patterns with BPMN](../development/service-integration-patterns) |
| | [Writing good workers](../development/writing-good-workers) |
| | [Dealing with problems and exceptions](../development/dealing-with-problems-and-exceptions) |
| | [Handling data in processes](../development/handling-data-in-processes) |
| | [Routing events to processes](../development/routing-events-to-processes) |
| | [Testing process definitions](../development/testing-process-definitions) |
| **Modeling** |
| | [Creating readable process models](../modeling/creating-readable-process-models) |
| | [Naming BPMN elements](../modeling/naming-bpmn-elements) |
| | [Naming technically relevant IDs](../modeling/naming-technically-relevant-ids) |
| | [Modeling beyond the happy path](../modeling/modeling-beyond-the-happy-path) |
| | [Modeling with situation patterns](../modeling/modeling-with-situation-patterns) |
| | [Building flexibility into BPMN models](../modeling/building-flexibility-into-bpmn-models) |
| | [Choosing the DMN Hit Policy](../modeling/choosing-the-dmn-hit-policy) |
| **Operations** |
| **Management** |
| | [Doing a proper proof of concept](../management/doing-a-proper-poc/) |



The following best practices specifically target **Camunda Platform 7.x only**, because the recommendation differs significantly:


| Topic | Practice |
| :- | :- |
| **Architecture** |
| | [Deciding about your Camunda 7 stack](../architecture/deciding-about-your-stack-c7/) | 
| | [Sizing your Camunda 7 environment](../architecture/sizing-your-environment-c7/) | 
| **Development** |
| | [Invoking services from a Camunda 7 process](../development/invoking-services-from-the-process-c7/) | 
| | [Understanding Camunda 7 transaction handling](../development/understanding-transaction-handling-c7/) | 
| **Operations** |
| | [Performance tuning Camunda 7](../operations/performance-tuning-camunda-c7/) | 
