---
id: sizing-your-environment-c7
title: Sizing your Camunda 7 environment
tags:
  - Database
  - Performance
  - Hardware
  - Sizing
description: "Size your environment for Camunda 7, including sufficient hardware and database space. This best practice targets Camunda 7.x only."
---

Size your environment for Camunda 7 appropriately, including sufficient hardware and database space.

:::caution Camunda 7 only
This best practice targets Camunda 7.x only! If you are using Camunda 8, visit [Sizing your Camunda 8 Environment](../sizing-your-environment/).
:::

## Understanding the influencing factors

You do not need big hardware to run Camunda. The hardware requirements are basically determined by two things:

1. The container/application server you want to use (refer to [deciding about your Camunda 7 stack](../deciding-about-your-stack-c7/)).
2. Things you do in [Delegation Code](https://docs.camunda.org/manual/latest/user-guide/process-engine/delegation-code/) like service tasks. For example, when calling SOAP WebServices or when doing complex calculations in Java, more CPU time is consumed within the delegation code (your code) than in Camunda.

The only way to get reliable figures for your project and environment is to do load testing on a close-to-production environment. We recommend doing this if in doubt. Steering the REST API via load generator tools like JMeter is relatively easy.

From the Camunda perspective, there are a number of aspects to look at:

- **Average duration between process start**: This determines the overall load on the system. We typically try to calculate how many new process instances per second. If you have a new process instance every couple of seconds or minutes (or even hours), you don't have to think about sizing. If you have **more than 100 process instances per second**, choose hardware wisely. As an example, we could run a benchmark on a normal developer notebook (Intel i5 4 Cores @2.5 Ghz, 8 GB RAM, SSD HD) that started around 100 to 500 process instances per second (refer to [Benchmarking Performance of Camunda Process Engine](http://blog.camunda.org/2014/01/benchmarking-camunda-process-engine.html) for details).

- **Average process instance cycle time**: With the average cycle time of a process instance, you can calculate how many active process instances you typically have in the runtime database at the same time. For example, when starting one process instance per hour with a typical duration of two weeks, you have 2 weeks \* 7 days \* 24 hours \* 1 process instance/hour = 336 active process instances at any time. While this does not create CPU load for the engine, it influences database behavior like query execution time, index size, or index write performance.

- **Wait states**: In some cases, process instances run through in one go, without stopping at any [wait state](http://docs.camunda.org/manual/latest/user-guide/process-engine/transactions-in-processes/#wait-states). In these cases, process instances are never written to the runtime database, which decreases load dramatically.

- **Number of concurrent clients**: This determines how many queries are fired against the database in parallel. It can also influence the sizing of thread pools.

- **Typical queries**: Database performance and load is not a big issue if you only load process instances or tasks by `id` or `business key`, as both have an index. In contrast, querying for process instances or tasks by a combination of different process variables (e.g. to correlate by business data), has a severe impact on database load and performance. Especially in high load scenarios, think about the most common queries you will have.

- **History level**: The configured [history level](http://docs.camunda.org/manual/latest/user-guide/process-engine/history/#set-the-history-level) determines how much history data is written and how much database disk space is required.

## Determining hardware requirements

### Performance & scalability

We normally do not hit limits in scalability of Camunda. Due to the small footprint, the engine can run with extreme efficiency. All state is persisted in the database, so you can always add new process engine instances (e.g. cluster nodes) to speed up execution.

The natural limit for this kind of architecture is the database. More scalability can be achieved using [Camunda 8](https://camunda.com/products/cloud/).

### High availability

We recommend running two machines for high availability. They do not have to form a proper cluster in terms of an application server cluster, just set up two identical nodes pointing to the same database.

### Virtualization

You can run Camunda on virtualized systems. The license is not bound to CPU cores, making this very easy from a licensing perspective as well.

### Hardware

We do not give concrete configuration recommendations. We recommend "server classes":

- **Small**: Whatever you typically run as a small server (e.g. 1-2 CPU, 1-8 GB RAM).
- **Medium**: Whatever you typically run as a medium server (e.g. 2-4 CPU, 4-16 GB RAM).
- **Large**: Whatever you typically run as a large server (e.g. 4-64 CPU, 16-128 GB RAM).

:::note
In most projects, small servers are sufficient.
:::

Consider a medium server if:

- You start more than 100 process instances per second.
- You have CPU intense delegation code.
- Your code/deployment has additional requirements.

### Disk space

Depending on the container, you need around 500 MB—1 GB of disk space. We recommend at least 2 GB to store enough logs in case you experience any problems.

## Determining database requirements

### Chose a good database

As mentioned in [deciding about your Camunda 7 stack](../deciding-about-your-stack-c7/), we recommend Oracle or PostgreSQL. Together with DB2, we made the best performance observations there.

Note that H2 is seldom used in production, and we do not have much experience with heavy load on this database ([H2 FAQ: Is it Reliable?](http://www.h2database.com/html/faq.html#reliable)).

### Required database size

The amount of space required on the database depends on the following:

- [History level](http://docs.camunda.org/manual/latest/user-guide/process-engine/history/#set-the-history-level): Turning off history saves huge amounts of table space, as you only have to keep current runtime data in the database. Normally, you keep it to `FULL` to leverage audit logging capabilities of the process engine.
- [Process Variables](https://docs.camunda.org/manual/latest/user-guide/process-engine/variables/): All process variables need to be written to the database (in a serialized form, e.g. JSON). With the history level `FULL`, an entry is inserted into history tables every time a variable is changed, remembering the old value. With big data objects stored and often changed, this requires a lot of space.

When calculating database size, you should also clarify if and how often you will be cleaning up your historical data, likely using the [history cleanup feature](https://docs.camunda.org/manual/latest/user-guide/process-engine/history/#history-cleanup).

The real space occupied within your database depends very much on your database product and configuration. There is no easy formula to calculate this space. Instead, this section gives an example:

<div bpmn="best-practices/sizing-your-environment-assets/invoice.bpmn" callouts="reviewInvoice,invoiceNotProcessed" />

<span className="callout">1</span>

25% of the instances will be reviewed.

<span className="callout">2</span>

10% of the instances will be ended after review.

To gain some numbers, we were running the [invoice example](https://github.com/camunda/camunda-bpm-platform/blob/master/examples/invoice/src/main/resources/) with the statistical distributions mentioned above in the following scenario:

- History level `FULL`
- Starting 40,000 process instances (PIs) and let 33,000 PIs complete (deleted from runtime). The remaining 7,000 PIs are still active.
- Using an Oracle 12c Enterprise Edition (12.1.0.1.0, 64bit Production) installation on Linux.

This gave us the following results:

| -       | Number of PIs | Disk space | Calculated disk space per PI | Remarks                                                   |
| ------- | ------------- | ---------- | ---------------------------- | --------------------------------------------------------- |
| Runtime | 6.989         | 28,375 MB  | 4,157 KB                     | Around half of the space is used for indices.             |
| History | 39.953        | 766,375 MB | 19,642 KB                    | Space requirements massively influenced by history level. |
| Sum     | -             | 794,75 MB  | -                            | -                                                         |

As a rule of thumb, capture the following figures and use the example above to make an informed "guess":

- Number of process instances per day
- Average number of executed tasks per process instance
- Sum of size of variables per process instance
- Average number of updates per variable

### Example calculation

This is an example calculation from a real-life scenario.

Given:

- Estimated PI / month: 300,000
- Concurrent users: 450

Assumptions for calculation:

- Load is equally distributed on 20 working days (more realistic than 30 days, you can even add more buffer).
- Load is equally distributed on 8 working hours (more realistic than 24 hours, you can even add more buffer).
- The process consists of mostly user tasks and almost no service tasks.
- On average, a process instance takes around two days to complete.

Calculation:

- 15.000 new PI / day
- 1.875 new PI / hour
- 31 new PI / minute
- ~ new PI every 2 seconds

In this case, a "small server" is sufficient.
