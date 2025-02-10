---
title: "Performance tuning Camunda 7"
tags:
  - Performance
description: "Understand influencing aspects on performance and apply tuning strategies. For example, by configuring the job executor or applying external tasks."
---

Understand influencing aspects on performance and apply tuning strategies appropriately, for example, by configuring the job executor or applying external tasks. When facing concrete challenges, look at scenarios like the proper handling of huge batches.

:::caution Camunda 7 only
This best practice targets Camunda 7.x only! The Camunda 8 stacks differ in regards to performance and scalabilities and requires different strategies we currently work on providing as best practice.
:::

## Performance basics

Note that this document assumes some understanding of fundamentals of underlying technologies such as the following:

- Database fundamentals
- Monitoring, observability, and benchmark tools
- JVM fundamentals

### Setting up monitoring

It's important to **set up proper monitoring** as described in our [Monitoring Best Practice](../operating-camunda-c7/). Writing the value of certain performance indicators over time can help to judge the urgency of certain bottlenecks or to warn you before an overload will happen.

### Runtime database

The database i/o for **writing** state changes of process instances to your **runtime tables** depend on your use case. The following are the fundamental factors:

- The complexity of process models - measured by the **number of save points**.
- The **number of started process instances** - measured per time unit.
- The **data attached** to process instances (aka process variables) - measured in bytes.
- The average **duration** of process instances, as the longer they need to complete (and hence wait in a persistent state) the less database traffic their total number of save points cause per time unit, but the more data you have stored in the runtime database.

The performance for **querying and reading** from the runtime tables is most influenced by the process variables/business data you use. For every process variable used in a query, a join is needed on SQL level, which influences performance. This can hit you, especially when doing message correlation or tasklist queries. You can tune performance **by using indices** as described below.

Further database tuning may be required depending on the specific use case and performance requirements. In combination with other configurations mentioned above, specific performance goals can be reached for querying and reading from runtime by using **indices**.

### History database

Camunda uses a **relational database as history backend** by default. The i/o for **writing** process instance information to the **history** primarily depends on the [History Level](https://docs.camunda.org/manual/latest/user-guide/process-engine/history/#choose-a-history-level) chosen. This is one of the biggest tuning opportunities when it comes to database i/o and the simplest method to reduce load on the database is to reduce the history level.

It is possible to hook-in a [Custom History Backend](https://docs.camunda.org/manual/latest/user-guide/process-engine/history/#provide-a-custom-history-backend), e.g. to leverage alternative data stores (like NoSQL, for example using the Elastic stack). A [complete example](https://github.com/camunda/camunda-bpm-examples/tree/master/process-engine-plugin/custom-history-level) is available.

By default, the history database tables **(denoted by HI)** and the runtime database tables **(denoted by RU)** share the same schema.

Separating your runtime database from the historical database is theoretically possible by implementing a custom history backend. This custom backend could then store the data in a different database instance. But note that many of Camunda Cockpit's capabilities depend on both data sets. Writing history to another database instance would cause Cockpit to function incorrectly.

A valid strategy is to write the data to a custom backend (like NoSQL) for long time retrieval, but also to the normal Camunda tables for operations. Then, you can delete the history from the Camunda database after short intervals using [history cleanup](https://docs.camunda.org/manual/latest/user-guide/process-engine/history/#history-cleanup).

A simpler and easier to manage strategy is to filter data using a Camunda custom history mechanism. For this, use history level **CUSTOM** and filter the data yourself. Just extend the built-in **HistoryEventHandler** and hook that into your process engine configuration:

```Java
public class CamundaFilterHistoryEventHandler extends DbHistoryEventHandler {

  @Override
  public void handleEvent(HistoryEvent historyEvent) {
    if (historyEvent instanceof HistoricVariableUpdateEventEntity) {
      if (...) {
        // ignore some variable update events
        log.info("Ignore event for variable " + variableUpdateEvent.getVariableName() + ".");
        return;
      }
    }
    // handle all other events
    super.handleEvent(historyEvent);
  }
}
```

Typical use cases are:

- Filtering high-volume but unnecessary events from the history in order to improve performance
- Filtering sensible data which should not be written to history (e.g. individual-related data)

### Thread handling and the job executor

Make sure you understand [save points and threading behavior](../../development/understanding-transaction-handling-c7/).

Save points are the tool to change threading and scaling behavior of a process instance. The more you use it, the more work will be done by the [job executor](https://docs.camunda.org/manual/latest/user-guide/process-engine/the-job-executor/), which is the key component to look at when you want to improve your system's performance.

The **default configuration** of the job executor is typically **not good** and **must be tuned**, there exist no general sensible defaults. Strategies are described below.

[Job prioritization](https://docs.camunda.org/manual/latest/user-guide/process-engine/the-job-executor/#job-prioritization) and the configured [retry strategy](https://docs.camunda.org/manual/latest/user-guide/process-engine/the-job-executor/#failed-jobs) can **influence the execution order of jobs**. Which is also useful in case you hit exceptions (e.g. a network connection is down). The default strategy retries three times without a delay, which normally should be changed to something more meaningful.

You have to set the retry strategy for every save point. Be aware that retries increase the load of the system because you're creating a new transaction, database connection, thread when a job is re-executed, and any additional processing required by your business logic.

[Exclusive Jobs](https://docs.camunda.org/manual/latest/user-guide/process-engine/the-job-executor/#exclusive-jobs) are the default in Camunda, which means that _for one process instance_ there is always **only one job executed** in parallel. This is a safety net to avoid optimistic lock exceptions, as multiple parallel paths might conflict by writing to the same database row.

You can **change this configuration** to run jobs of one process instance in parallel if you make sure not to create optimistic lock exceptions by a **fitting process design**. Additionally, handle optimistic lock exceptions properly by doing **retries**.

Keep in mind parallel processing of jobs, and having loads of optimistic lock exceptions causes overhead and might slow down your system. Using parallel processing features is not recommended for most use-cases as it adds complexity and should be carefully tested in cases where it is attempted.

### Considering external tasks

An important **alternative to job handling by the job executor** where Camunda does the thread handling, is [external tasks](https://docs.camunda.org/manual/latest/user-guide/process-engine/external-tasks/) where an external worker or application does the work.

This makes it easy to throttle execution using a thread pool or a cluster of apps. Potentially, only one process or thread is allowed in parallel in other cases it may be required to scale up workers or threads.

Using external tasks allows for complex logic or expensive network calls to be executed with external systems are blocking within Camunda, threads aren't typically a problem anymore.

When using [external tasks](https://docs.camunda.org/manual/latest/user-guide/process-engine/external-tasks/), Camunda does not actively call your business logic, but stops in a wait state and persists the state in the database. You are responsible for querying or polling these tasks using the Camunda API and executing your logic. **You fully control threading behavior** yourself and can influence scaling.

It's important to understand the external task API and behavior as the cost of using external tasks is not free from Camunda transaction overhead as well as the overhead management of external workers. Understanding the life cycle of the external task is crucial to designing and managing external workers.

### Void JVM tuning

It is normally **not required** to tune the Java Virtual Machine (JVM). It's better to concentrate on the strategies described in this article.

If you have hints that you have memory issues, GC problems, or thread locking, you should employ a JVM profiling tool as suggested in the tools section.

### Common pitfalls with process variables

Below are some common scenarios that could potentially cause issues. Be sure to read the section on [handling data in processes](../../development/handling-data-in-processes/) to understand the best options for dealing with potential data-flow and business data in Camunda.

#### Performance degrades after storing large files as variables

Problem:

- BLOB selection leads to huge RAM allocation
- Operations become more costly (e.g VACUUM)
- Replication becomes slower

Solution:

- Store large files in a dedicated third-party CMS
- Only store file reference as variable in Camunda

#### In production variables report to long

Problem:

- When storing variable values of type _string_ the char limit is 2000 for Oracle.

Solution:

- Reduce the length of the value.
- Store String as Object in Oracle.

#### Optimistic locking exceptions occur when updating variables using external tasks API

Problem:

- Same variables are updated by multiple workers consequently the same row in the DB is updated.

Solution:

- Use the local API when updating variables. You must combine this with input/output mappings to have access to variables in subsequent activities.

#### Use Camunda as a source of truth for tasks

Problem:

- Storing a large number of variables leads to very large ACT_RU_VARINST table and slow queries on several API's.

Solution:

- Store variables in external data-store or in separate tables in the Camunda schema. Learn more about [handling data in processes](../../development/handling-data-in-processes/).

## Scaling basics

In general, process engine performance is highly dependent on your usage scenarios. There isn't a one-size-fits-all answer, but as our most senior consultant keeps saying, "So far we found a solution for every high-performance scenario we encountered with customers."

### Basic scaling and failover

Basic scaling of Camunda is very simple: connect multliple engines to the same database to form a [cluster](https://docs.camunda.org/manual/latest/introduction/architecture/#clustering-model). All data is synchronized through the database, so clustering requires no special configuration for Camunda. You can implement auto-scaling with container orchestration systems like Kubernetes or OpenShift.

Camunda requires [READ COMMITTED transaction isolation](https://docs.camunda.org/manual/latest/user-guide/process-engine/database/#isolation-level-configuration) and [synchronous replication](https://docs.camunda.org/manual/latest/introduction/supported-environments/#database-clustering-replication) to all active cluster nodes.

### Understanding cluster and load balancing options

Load balancing has two layers:

- Load balancing on the inbound channel is out-of-scope for Camunda, instead use standard third-party software like an HTTP load balancer or messaging.

- Job execution (also known as asynchronous processing or `_jobs_`) in Camunda can be used to do load balancing, using multiple threads and multiple cluster nodes. This is described in more detail in the following sections.

## Running load tests

When you are in doubt if a certain load requirement can be tackled by Camunda, you should run a load test. This normally involves the following phases:

- Prepare an _environment_ which is as close to production as possible, otherwise results might be biased.
- Prepare concrete _scenarios_ you want to run, which includes e.g. BPMN workflows that are realistic for you. If you typically run synchronous service tasks do so in the scenarios. If you have big payloads use them. If you leverage multiple instance tasks make sure your scenario also contains them.
- Define _clear goals_ for the load tests, e.g. you might need to run at least **1000 workflow instances/second**, or you might need to keep **latency below 50 ms for the 95th percentile**.
- Prepare _load generation_, which is not always easy as you have to stress your system in a way, that you cannot do by one simple client.
- Prepare _monitoring_ to analyze the situation if you run into problems. Typical measures are (refer below for a more complete list):

Java memory consumption, especially garbage collection and potential memory leaks, often occur due to issues in surrounding components.

These problems can be spotted by checking which objects occupy a lot of memory using a JVM observability tool.

Monitor load on the database to avoid overloading the database. It's sometimes better to reduce the number of connections in your connection pool.

Typical monitoring and profiling tools our customer use:

- Basic tools available with the Java installation
  - [VisualVM](https://docs.oracle.com/javase/8/docs/technotes/guides/visualvm/profiler.html)
  - JConsole
  - JVM Thread Dumps
- Commercial offerings
  - App Dynamics
  - Dynatrace
  - YourKit

Typical load generation tools our customer use:

- JMeter
- Postman
- SOAP-UI

## Resolving overload

This section applies if the system is experiencing acute problems due to load or poor configuration.

:::caution Camunda 8 is built with scalability top of mind
Note that Camunda 8 and its workflow engine Zeebe were engineered for performance and scalability. If you hit problems you cannot easily resolve with Camunda 7.x, it might be worth having a look at Camunda 8 instead.
:::

### Collecting information for root causing

Initially, we need to have a strategy to deal with problems. Take a minute to think about what principles you will apply to solve acute and generic performance problems. Below are some questions to ask to analyze the root cause:

- What makes you think there is a performance problem?
- Has this system ever performed well?
- What has changed recently? (Software? Hardware? Load?)
- Can the performance degradation be expressed in terms of latency or run time?
- Does the problem affect other people or applications (or is it just you)?
- What is the environment?
  - What software and hardware is used?
  - Versions?
  - Configuration?

When we suspect (or experience) problems, we typically have a deeper look at:

- Detailed information about **jobs**, typically retrieved from the database via **SQL queries** (refer also to [unsupported sample queries](https://github.com/camunda-consulting/code/tree/master/snippets/db-queries-for-monitoring)):
  - **# of executed jobs**: How many jobs are currently acquired/locked, which means they are executed at the moment?
  - **Cluster distribution**: How are the executed jobs distributed over the cluster? Therefore, look at the lock owner, which is written to the database.
  - **# of not yet executed jobs**: How many jobs are currently due, which means the due date is reached or no due date was set, but are not acquired? These are the jobs that should be executed but are not yet. This number should be normally close to zero. Capture the number over time, if it stays above a certain threshold, you have a bottleneck. In this situation, you might even suffer from job starvation, as Camunda does not enforce a FIFO principle for job execution. This situation needs to be resolved. A typical pattern is to experience this overload only on peak times of the day and resolve in quiet times.

So far, we've never experienced running out of CPU capacity. If that happens, clustering is a very natural choice to solve the problem. But in most cases, applications built on Camunda will more often than not be waiting for i/o (database, remote service calls, etc.) To solve overload problems correctly, you have to analyze the root cause:

- Basic system metrics for your Camunda application (container, application server or Java process) and database. Plot them over time!
- CPU utilization
- Memory utilization
- I/O
- Response times

Often, we cannot get metrics from the database due to security restrictions. In this case, we try to measure response times from the database as an indicator of its health. This works very well with dedicated frameworks like App Dynamics.

- Database information
- Slow query log
- Other utilization information, depending on the concrete database product. Best approach your DBA.

Collecting this information normally gives a good indication which component is really busy and causes the bottleneck.

### Using benchmarks and a systematic approach for tuning

Having an idea about the bottleneck leads you to the proper tuning strategy. However, system behaviors are very complex and experience shows that you need multiple tries to improve the situation. This is typical and not a problem, but makes it important to follow a systematic approach to be able to resolve overload problems. A good background read is [this blog post on scaling Camunda in a cluster](https://blog.camunda.org/post/2015/09/scaling-camunda-bpm-in-cluster-job/).

The basic strategy is simple:

- Set up tests and conduct measurements, which give you a **baseline** you can compare against.
- **Change** something, but best only **one thing at a time**.
- Measure again and **compare against your benchmark** so you get an idea how much the change improved the situation.

For resources like the job executor thread pool, start with small numbers and increase them. If you start too big, you always have to check in two dimensions: increasing and decreasing.

:::note
**Guessing can lead to wrong conclusions**. Hence, we recommend setting up a load testing environment and generating load to get all resources busy. This allows optimizing your system corresponding to your specific load scenario. But we also know that this is hard, especially because you normally have to mock service calls but simulate realistic response times.
:::

A good compromise often is:

- Monitor the load on your production systems (as indicated above, e.g. using database queries).
- Change settings and inspect the impact over time.

:::note
This is not a scientific but rather hands-on approach. Production load might vary very much, so plan enough time to allow regression towards the mean and keep an eye on other performance indicators like process instances started to judge the results realistically.
:::

### Tuning the job executor

There is no configuration of the job executor which is generally sensible. The configuration options and defaults are:

```xml
<job-executor>
  <core-threads>3</core-threads>   <1>
  <max-threads>5</max-threads>

  <queue-length>10</queue-length>  <2>

  <job-acquisition name="default">
    <property name="maxJobsPerAcquisition">3</property> <3>
    <property name="lockTimeInMillis">300000</property> <4>
    <property name="waitTimeInMillis">5000</property>   <5>
  </job-acquisition>
</job-executor>
```

<span className="callout">1</span>

Number of threads that execute jobs.

<span className="callout">2</span>

Number of jobs that can be queued in an in-memory queue, waiting for an execution thread to become available.

<span className="callout">3</span>

Number of jobs acquired at once (in the database).

<span className="callout">4</span>

Time the job will be locked for a specific job executor.

<span className="callout">5</span>

Idle time for acquisition if no executable job was found.

A meaningful configuration has to balance these values according to the given situation. In order to give hints, you need to understand some basics:

- It does not make sense to have more **active threads** than the CPU cores can directly handle. Otherwise, you will just swap in and out threads and hinder efficient computation.
- Whenever a **thread blocks because of i/o**, e.g. the user waits for some database operation to finish, it is not active and the CPU will not be bothered with it.

When you want to figure out **how many threads you can assign to the job executor** thread pool **(1)** you need to know how much threads are available in total and **how much threads are already in use** by other thread pools (web server and servlets, scheduling frameworks, EJB, JMS, etc.) The more components you run on your machine, the harder it gets to predict the free CPU capacity. This is also true for virtualized environments where resources are shared.

You also have to think about the **nature of your processes**: Do you run **CPU intensive computations** by Camunda job executor threads, or do you **wait most of the time** for remote service calls? Typical processes spend their time waiting for i/o. In this case, you can safely increase the number of threads. Keep in mind that scaling up Camunda puts more load on downstream services and systems, so you might need to throttle it to avoid "denial of service attacks".

When increasing the number of threads, make sure that you also **increase the internal queue size** **(2)**, otherwise it might run empty, and your threads don't get new jobs to execute. On the other hand, the queue should not be made too big. In a cluster **too big queue sizes** can lead to one node taking all jobs into his queue **leaving other cluster node idle**. If you queue up **more jobs than you can finish within the lock timeout** **(4)**, jobs are timed out and will be executed twice (with one running into an optimistic lock exception).

A typical approach to tune performance is:

- Start with the number of threads = CPU cores \* 1.5
- Increase queue size stepwise until there is no gain in throughput anymore because all threads are "busy" waiting for i/o.
- Now increase worker threads and afterward queue size and always check that this improves throughput.
- Whenever you reach a limit, you found your upper configuration limit, which is typically optimal for production.

As already indicated, when you dive deep into job executor tuning because of high volume operations, it might be worth to take one step back and think about using [external tasks](https://docs.camunda.org/manual/latest/user-guide/process-engine/external-tasks/) as an alternative. This often scales better, as a worker can, for example, collect a huge amount of tasks and just report completion back, how this is executed and scaled can be completely decided by you.

### Tuning the database connection pool

A resource that the process engine and the job executor heavily depend on are database connections. They are provided by a JDBC data source which has a pool of connections.

First, you should find out which connection pool implementation is used based on your project's dependencies:

- For Spring Boot 2.x, [HikariCP](https://github.com/brettwooldridge/HikariCP) is the default connection pool. Camunda Run also uses this.
- If you are not sure, here take a look at [this code example to detect data source implementation](https://www.mkyong.com/spring-boot/spring-boot-how-to-know-which-connection-pool-is-used/).

Preferably, use [HikariCP](https://github.com/brettwooldridge/HikariCP) and configure its [settings](https://github.com/brettwooldridge/HikariCP#gear-configuration-knobs-baby) using `spring.datasource.hikari.*` properties. HikariCP's default pool size is 10. Their website provides an [article about connection pool sizing](https://github.com/brettwooldridge/HikariCP/wiki/About-Pool-Sizing).

### Resolving database overload

Having tuned the job execution the database might become a bottleneck when handling high-load scenarios. A very simple approach is then to **tune the database or assign more resources to it**. It is also possible to **tune some database queries** as described below.

If both are not possible or sufficient, check if the database load can be reduced by **changes in your application**. Therefore, you need to analyze the root cause of the load. It is a good idea to partition your database in a way that you observe load data for runtime, history, and specifically the table containing byte arrays. Two typical findings are:

- A lot of data is written into **history**, for example, because you run through a lot of tasks and update a lot of variables. In this case, a good strategy is to reconfigure history to reduce the amount of data or use a custom history backend, as already described.

- Big chunks of data are written to the byte array table, mostly because you save **too much data as process variable** like big XML or JSON structures. Camunda always needs to update one process variable as a whole, even if you only change some attributes or add lines to a list being part of the data structure. Additionally, the whole chunk is also written to history to keep a history of variable values. In this scenario, it is much more efficient to store the business data as a separate structured entity or into a better fitting storage (like a document database). Then Camunda only stores a reference and is freed of a lot of load towards the database.

Camunda batches SQL statements of the current call and runs them at once at the end of the transaction. Depending on the nature of the process model and the work done in this transaction, this batch might become big.

### Tuning database queries

Use cases of Camunda customers differ very much, so we cannot fine-tune our database schema for all use cases out-of-the-box. We strive for an optimal balance between too less and too many indices. As you know your use case in detail you can **improve database performance by adjusting indices** of Camunda tables. Typically, additional indices are added that lead to reduced runtimes and less database load for certain queries. However, this typically affects write performance and has to be balanced depending on the concrete situation at hand.

In order to find candidates for optimization, **check the slow query log** of your database or discuss with your DBA.

Examples:

- Creating an index on process instance end time (`create index PROC_DEF_ID_END_TIME ON ACT_HI_PROCINST (PROC_DEF_ID_,END_TIME_`) in case you query for that very often.
- [Job acquisition](https://docs.camunda.org/manual/latest/user-guide/process-engine/the-job-executor/#the-job-order-of-job-acquisition) contains hints on indices depending on the job executor configuration.

### Applying sharding

If none of the above strategies are sufficient, you need to reduce the load put on the Camunda engine as a whole. This can be done by a mechanism called **[sharding](<https://en.wikipedia.org/wiki/Shard_(database_architecture)>)**.

Therefore, you distribute the overall load to multiple logical engines (called shards), which itself can be a cluster on its own. Every shard runs its own database. A sharding algorithm and distribution must be implemented. One example was described [by Zalando in this blog post](https://blog.camunda.org/post/2015/03/camunda-meets-cassandra-zalando/).

The Camunda platform supports multiple engine configurations pointing to different databases on a single application server. When you run Camunda in [container-managed aka infrastructure mode](https://docs.camunda.org/manual/latest/user-guide/process-engine/process-engine-bootstrapping/#shared-container-managed-process-engine), multiple engines work out-of-the-box with no additional code in Camunda's [configuration](https://docs.camunda.org/manual/latest/user-guide/process-engine/multi-tenancy/#one-process-engine-per-tenant) and [APIs](https://docs.camunda.org/manual/latest/reference/rest/overview/#engine-usage).

The distribution to the different engines (shards) is usually domain-specific and must be implemented as part of your project. When using inversion-of-control (IoC) containers like Spring or CDI, one strategy is to centralize the engine selection in a request-scoped producer for the **ProcessEngine** object. With dependency injection, the rest of the code can then be written as if there is only one **ProcessEngine** instance.

## Some real-life stories

In this bonus section, we share some anecdotes which might inspire you when trying to resolve issues in your environment.

### Session context memory consumption

In one customer scenario, the REST API was used heavily with basic authentication enabled. The client did not reuse the REST connection and opened a new one for every request, including the authentication information.

On the server side, there was no special configuration given, which means that for every authentication there was a SessionContext created with a certain timeout. This SessionContext was never reused and the default timeout was relatively high (30 minutes in Tomcat). As a result, all this SessionContexts plugged up the memory which ultimately lead to garbage collection cycles being so long, that the whole system was basically just doing garbage collection most of the time.

This could be resolved by setting a very low `session-timeout`.

### Spring Boot data collector

One project had a relatively little heap memory (500 MB) and using [Micrometer Metrics provided by Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-metrics.html) to collect metrics. With around 200 requests/second, the memory required for metrics data consumed around half of the heap and lead into fatal full garbage collection cycles.

Removing the metrics collections was a quick fix to resolve the problem.

### Processing high numbers of parallel activities (aka batch processing)

One concrete scenario is worth looking at, as customers stumble upon it regularly: doing some kind of batch processing via BPMN, where you have a high number of parallel activities in one process instance.

<div bpmn="best-practices/performance-tuning-camunda-c7-assets/parallel-batch.bpmn" callouts="MiTask,MiSubprocess,MiCallActivity,MiCallActivityResult" />

The important characteristics are

- It is modeled using parallel [Multiple Instance](https://docs.camunda.org/manual/latest/reference/bpmn20/tasks/task-markers/#multiple-instance) (MI)
- You have high numbers of elements for the MI (> 1000)
- You are using wait states or save points within the parallel branch

This scenario is supported by Camunda, but you can run into serious problems.

:::caution Solved in Camunda 8
This problem is only a problem with Camunda 7.x! Zeebe, the workflow engine used in Camunda 8, can run high number of parallel activities.
:::

The basic problem is the [execution tree](https://docs.camunda.org/manual/latest/user-guide/process-engine/process-engine-concepts/#executions) getting really big in this scenario. In most situations, the engine has to load the whole tree in order to do anything, even if that happens only in one parallel path. This not only influences performance, but also adds load to the database.

Turning off execution pre-fetching (available as internal process engine configuration property) is not recommended, as it may cause other trouble. Cockpit also suffers from huge data chunks, making it slow.

If you add additional scopes, like the BPMN subprocess **(2)**, this leads to an additional execution being created. Every embedded subprocess doubles the size of the execution tree, so avoid subprocesses in this situation.

The described problems only arise if you have wait state or save points in your process model, as only then the engine needs to persist the process instance to the database. If you run through the multiple instances in one transaction, the internal optimization removes almost all runtime database update statements, so almost nothing needs to be done (except for the history).

There is one very specific scenario you need to avoid. When a parallel activity is finished and you want to collect the result in a list, you might use a process variable storing that list **(4)**. With running a lot of instances in parallel, they might finish at the same time and try to change that process variable simultaneously, leading to optimistic lock exceptions.

This typically leads to retries. Even if this situation can heal itself, it increases the load on the database. Assume that you serialize that list as reasonable big XML (growing to several megabytes) in the process variables. That means Camunda sends this chunk of data to the database in every transaction, but might even lose the commit because of the optimistic lock. Now that situation fuels itself, as commit times increase by having big chunks of data, leading to more parallel activities finishing within that time frame, leading to more optimistic lock exceptions.

In this situation, the best approach is not to collect any results, at least not in Camunda itself. You might still leverage a simple database table, where every instance can insert a new line for its result. This would remove the lock problems and is very simple to set up.

In any case, the situation improves if you don't wait for the parallel processing to finish. This avoids a lot of the problem described here. You can also use workarounds like polling for all subprocesses to finish. Obviously, this is not only harder to understand from a business perspective, but also requires more effort to develop, so it should only be used if you run into serious performance trouble.

<div bpmn="best-practices/performance-tuning-camunda-c7-assets/parallel-batch-fire-and-forget.bpmn" callouts="" />
