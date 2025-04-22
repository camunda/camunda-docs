---
id: task-application-architecture
title: "Task application architecture"
description: "Understand and decide on the architecture of your task application."
---

A typical task application architecture consists of a task application frontend, a backend-for-frontend, and one or more data sources or services that contain business data relevant for the application users to perform their work. The backend implements Camunda Zeebe and Tasklist clients to retrieve and interact with tasks via Camunda APIs. For historical process instance data, Operate is also required.

Depending on the user task implementation type (job worker-based vs Camunda user task) you use in your processes, you need to run either the Tasklist or Zeebe client to run operations on tasks. Task, form, and variable retrieval happens via the API. Learn more about the differences of the task implementation types in the [migration guide for Camunda user tasks](/apis-tools/migration-manuals/migrate-to-camunda-user-tasks.md).

:::tip
Starting a new project? Use Camunda user tasks to simplify your implementation.
:::

Click on any element of this diagram to jump to the documentation page for the respective component:

```mermaid
%%{init: {"flowchart": {"htmlLabels": true}} }%%
flowchart LR
    subgraph Architecture
        direction LR
        subgraph Custom Task Application
            direction LR
            Frontend --- BFF
            B --- ExtData
            subgraph BFF[ ]
                direction TB
                B[BFF \n <small>Backend for Frontend</small>]
                ExtData[Business Data]
            end
        end
        subgraph Camunda 8
            direction LR

            subgraph Tasklist
                Rest[Rest API]
                Forms
            end

            subgraph Zeebe
                ZeebeRest[Rest API]
            end


            Tasklist <-.-> Job[Job worker-based tasks]
            Tasklist <-.-> ZeebeTasks
            Rest <-.-> Forms
            Zeebe[Zeebe REST API] <-.-> ZeebeTasks[Zeebe-based tasks]
        end

        BFF -->|Query Tasks\n<small>Job-Based or Zeebe</small>| Tasklist

        BFF -->|Operation\n<small>Job-based</small>| Tasklist
        BFF -->|Operation\n<small>Zeebe</small>| Zeebe
    end

style Frontend fill:#2272c9,color:#fff
style B fill:#2272c9,color:#fff

style Rest fill:#10c95d,color:#fff
style ZeebeRest fill:#ed7d31,color:#fff
style Zeebe stroke:#ed7d31

style Job fill:#10c95d,color:#fff
style ZeebeTasks fill:#ed7d31,color:#fff

style subGraph1 fill:#e4eef8,stroke:#2272c9
style BFF fill:#c8dcf0,stroke:#2272c9
style ExtData fill:#a5caef,stroke:#2272c9

style Tasklist stroke:#10c95d,color:#000

click Forms "../../forms/introduction-to-forms"
click Rest "../../../tasklist-api-rest/tasklist-api-rest-overview"
click Job "../../../migration-manuals/migrate-to-camunda-user-tasks"
click ZeebeTasks "../../../migration-manuals/migrate-to-camunda-user-tasks"
click ZeebeRest "../../../zeebe-api-rest/zeebe-api-rest-overview"
```

Follow these resources to learn more about the individual components:

- Learn how to use the [Camunda 8 API](/apis-tools/camunda-api-rest/specifications/assign-user-task.api.mdx) for task, variable, and form retrieval, and to run operations on Camunda user tasks.
- Familiarize yourself with the [Tasklist API](/apis-tools/tasklist-api-rest/tasklist-api-rest-overview.md) to run operations on Job worker-based user tasks.
- Understand how to design, embed, and customize [forms](/apis-tools/frontend-development/03-forms/01-introduction-to-forms.md).
- Understand how this architecture fits into the overall Camunda architecture with the [Java greenfield stack](/components/best-practices/architecture/deciding-about-your-stack.md).
