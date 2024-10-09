---
title: Overview
description: "These practices are condensed experience using BPMN and DMN on the Camunda toolstack, and are a mix of conceptual and practical implementation information."
---

import DocCardList from '@theme/DocCardList';

The Camunda Best Practices distill our experience with BPMN and DMN on the Camunda toolstack, incorporating insights from consulting, community feedback, and various interactions. They offer a blend of conceptual and practical guidance, representing our current practical project experience in a generalized context. While not definitive, these practices acknowledge that learning is ongoing and effectiveness may vary based on your specific situation.

Please note that, like the core product, Camunda extends the same guarantee to Best Practices. However, we cannot ensure the absolute accuracy or timeliness of the information provided, and any liability for damages resulting from the application of these recommendations is disclaimed.

:::caution Camunda 8
In general, best practices apply to Camunda 8, but there are also some specific Camunda 7 practices in their own section below.
:::

## Project management Best Practices

<DocCardList items={[{type:"link", href:"/docs/next/components/best-practices/management/following-the-customer-success-path/", label: "The Customer Success Path", docId:"components/best-practices/management/following-the-customer-success-path"},
{
type:"link", href:"/docs/next/components/best-practices/management/doing-a-proper-poc/", label: "Proper POC Execution", docId:"components/best-practices/management/doing-a-proper-poc"
}
]}/>

## Architecture Best Practices

<DocCardList items={[{type:"link", href:"/docs/next/components/best-practices/architecture/deciding-about-your-stack/", label: "Choosing Your Tech Stack", docId:"components/best-practices/architecture/deciding-about-your-stack"},
{
type:"link", href:"/docs/next/components/best-practices/architecture/sizing-your-environment/", label: "Environment Sizing", docId:"components/best-practices/architecture/sizing-your-environment",
},
{
type:"link", href:"/docs/next/components/best-practices/architecture/understanding-human-tasks-management/", label: "Human Task Management", docId:"components/best-practices/architecture/understanding-human-tasks-management"
}
]}/>

## Development Best Practices

<DocCardList items={[{type:"link", href:"/docs/next/components/best-practices/development/connecting-the-workflow-engine-with-your-world/", label: "Workflow Engine Integration", docId:"components/best-practices/development/connecting-the-workflow-engine-with-your-world"},
{
type:"link", href:"/docs/next/components/best-practices/development/service-integration-patterns/", label: "Service Integration Patterns", docId:"components/best-practices/development/service-integration-patterns",
},
{
type:"link", href:"/docs/next/components/best-practices/development/writing-good-workers/", label: "Writing Effective Workers", docId:"components/best-practices/development/writing-good-workers",
},
{
type:"link", href:"/docs/next/components/best-practices/development/dealing-with-problems-and-exceptions/", label: "Problems and Exceptions", docId:"components/best-practices/development/dealing-with-problems-and-exceptions",
},
{
type:"link", href:"/docs/next/components/best-practices/development/handling-data-in-processes/", label: "Data Handling in Processes", docId:"components/best-practices/development/handling-data-in-processes",
},
{
type:"link", href:"/docs/next/components/best-practices/development/routing-events-to-processes/", label: "Routing Events to Processes", docId:"components/best-practices/development/routing-events-to-processes",
},
{
type:"link", href:"/docs/next/components/best-practices/development/testing-process-definitions/", label: "Testing Process Definitions", docId:"components/best-practices/development/testing-process-definitions"
}
]}/>

## Modeling Best Practices

<DocCardList items={[{type:"link", href:"/docs/next/components/best-practices/modeling/creating-readable-process-models/", label: "Readable Process Models", docId:"components/best-practices/modeling/creating-readable-process-models"},
{
type:"link", href:"/docs/next/components/best-practices/modeling/naming-bpmn-elements/", label: "Naming BPMN Elements", docId:"components/best-practices/modeling/naming-bpmn-elements",
},
{
type:"link", href:"/docs/next/components/best-practices/modeling/naming-technically-relevant-ids/", label: "Technically Relevant IDs", docId:"components/best-practices/modeling/naming-technically-relevant-ids",
},
{
type:"link", href:"/docs/next/components/best-practices/modeling/modeling-beyond-the-happy-path/", label: "Model Beyond the Happy Path", docId:"components/best-practices/modeling/modeling-beyond-the-happy-path",
},
{
type:"link", href:"/docs/next/components/best-practices/modeling/modeling-with-situation-patterns/", label: "Situation Patterns", docId:"components/best-practices/modeling/modeling-with-situation-patterns",
},
{
type:"link", href:"/docs/next/components/best-practices/modeling/building-flexibility-into-bpmn-models/", label: "Building Flexibility in BPMN", docId:"components/best-practices/modeling/building-flexibility-into-bpmn-models",
},
{
type:"link", href:"/docs/next/components/best-practices/modeling/choosing-the-dmn-hit-policy/", label: "Choosing DMN Hit Policy", docId:"components/best-practices/modeling/choosing-the-dmn-hit-policy"
}
]}/>

## Operations Best Practices

<DocCardList items={[{type:"link", href:"/docs/next/components/best-practices/operations/versioning-process-definitions/", label: "Versioning Process Definitions", docId:"components/best-practices/operations/versioning-process-definitions"},
{
type:"link", href:"/docs/next/components/best-practices/operations/reporting-about-processes/", label: "Process Reporting", docId:"components/best-practices/operations/reporting-about-processes"
}
]}/>

## Camunda 7-specific Best Practices

<DocCardList items={[{type:"link", href:"/docs/next/components/best-practices/architecture/deciding-about-your-stack-c7/", label: "Tech Stack Decisions", docId:"components/best-practices/architecture/deciding-about-your-stack-c7"},
{
type:"link", href:"/docs/next/components/best-practices/architecture/sizing-your-environment-c7/", label: "Environment Sizing", docId:"components/best-practices/architecture/sizing-your-environment-c7"
}
]}/>

### Development

<DocCardList items={[{type:"link", href:"/docs/next/components/best-practices/development/invoking-services-from-the-process-c7/", label: "Service Invocation", docId:"components/best-practices/development/invoking-services-from-the-process-c7"},
{
type:"link", href:"/docs/next/components/best-practices/development/understanding-transaction-handling-c7/", label: "Transaction Handling", docId:"components/best-practices/development/understanding-transaction-handling-c7"
},
{
type:"link", href:"/docs/next/components/best-practices/development/testing-process-definitions-c7/", label: "Testing process definitions in Camunda 7", docId:"components/best-practices/development/testing-process-definitions-c7"
}
]}/>

### Operations

<DocCardList items={[{type:"link", href:"/docs/next/components/best-practices/operations/operating-camunda-c7/", label: "Operating Camunda 7", docId:"components/best-practices/operations/operating-camunda-c7"},
{
type:"link", href:"/docs/next/components/best-practices/operations/performance-tuning-camunda-c7/", label: "Performance Tuning", docId:"components/best-practices/operations/performance-tuning-camunda-c7",
},
{
type:"link", href:"/docs/next/components/best-practices/operations/securing-camunda-c7/", label: "Securing Camunda 7", docId:"components/best-practices/operations/securing-camunda-c7"
}
]}/>

### Other

<DocCardList items={[{type:"link", href:"/docs/next/components/best-practices/architecture/extending-human-task-management-c7/", label: "Extending Human Task Management", docId:"components/best-practices/architecture/extending-human-task-management-c7"},
]}/>
