---
id: choose-between-rest-and-grpc
title: "Choose between REST and gRPC"
sidebar_label: "Choose between REST and gRPC"
description: "Decide when to use the Orchestration Cluster REST API, the Zeebe gRPC API, or both, and when to use job streaming instead of polling."
---

Use the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) by default. Add the [Zeebe API (gRPC)](/apis-tools/zeebe-api/grpc.md) alongside it only when your job workers need [job streaming](/components/concepts/job-workers.md#job-streaming), or when the [REST job activation limitations](#rest-job-activation-limitations) affect you.

- **Every integration needs REST.** Querying process data, such as process instances, user tasks, incidents, and variables, is available only through the REST API.
- **Job streaming is the main reason to use gRPC.** It is available only over gRPC and pushes jobs to workers without polling.
- **You don't have to pick one.** The official Java client and Spring Boot Starter can send commands over REST and stream jobs over gRPC at the same time.

## Compare the protocols

| Capability                                                     | REST (Orchestration Cluster API) | gRPC (Zeebe API)            |
| :------------------------------------------------------------- | :------------------------------- | :-------------------------- |
| Deploy resources, create, cancel, and modify process instances | Yes                              | Yes                         |
| Publish messages, broadcast signals, resolve incidents         | Yes                              | Yes                         |
| Activate jobs with long polling                                | Yes (`POST /v2/jobs/activation`) | Yes (`ActivateJobs`)        |
| Job streaming (jobs pushed to workers)                         | No                               | Yes (`StreamActivatedJobs`) |
| Search and query process data                                  | Yes                              | No                          |
| Users, groups, roles, tenants, and authorizations              | Yes                              | No                          |
| Transport                                                      | HTTP/1.1 or HTTP/2               | HTTP/2 only                 |
| Default Self-Managed port                                      | 8080                             | 26500                       |

## Choose a protocol for your scenario

| Scenario                                                             | Use                                       | Why                                                                                                                                                                           |
| :------------------------------------------------------------------- | :---------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| New integration in any language                                      | REST                                      | Every official client defaults to REST, and REST covers everything except job streaming.                                                                                      |
| Browser app, custom task UI, reporting, or data sync                 | REST                                      | Querying and user task operations are available only through REST.                                                                                                            |
| Language without an official SDK                                     | REST                                      | Generate a client from the OpenAPI specification.                                                                                                                             |
| Job workers where a few seconds of activation delay is acceptable    | REST with long polling                    | It works with the default client configuration and network setup.                                                                                                             |
| Job workers that need low activation latency or run in a large fleet | REST for commands, gRPC for job streaming | Streaming removes the poll round trip and sends fewer activation requests. See [Streaming or polling](#streaming-or-polling).                                                 |
| Brokers close to their CPU limit with high-volume clients            | Consider gRPC                             | REST uses more broker CPU than gRPC at the same load. See [Protocol: REST or gRPC](/components/best-practices/architecture/sizing-your-environment.md#protocol-rest-or-grpc). |
| Network allows only HTTP/1.1, or port 26500 is not reachable         | REST only                                 | gRPC requires HTTP/2 end to end.                                                                                                                                              |
| Migrating from `ZeebeClient` with gRPC-dependent behavior            | Either                                    | `ZeebeClient` preferred gRPC, while `CamundaClient` prefers REST. Set `preferRestOverGrpc` to `false` to keep gRPC as the default.                                            |

If gRPC can't reach your cluster, stay on REST and tune long polling. Job streaming is the only capability you give up.

## Streaming or polling

Both delivery methods reach the same engine, and a worker can use either.

|                      | Long polling                                  | Job streaming                                                                |
| :------------------- | :-------------------------------------------- | :--------------------------------------------------------------------------- |
| Protocol             | REST or gRPC                                  | gRPC only                                                                    |
| Activation latency   | Depends on the poll interval and cluster size | Lower, because the broker pushes jobs as they become available               |
| Requests at low load | About one activation request per job          | Far fewer activation requests, because most jobs arrive by push              |
| Draining a backlog   | Serves jobs that are already waiting          | Delivers new jobs only. Polling serves the existing backlog.                 |
| Network requirements | Standard HTTP                                 | Long-lived HTTP/2 connections that proxies and load balancers must not close |

In Camunda's SDK performance tests, streaming and polling reached about the same throughput when draining a backlog. The difference showed up under light and steady load and in large worker fleets:

- **Streaming sends fewer activation requests and uses less broker CPU.** With 100 workers receiving a trickle of jobs, streaming made a fraction of the activation requests polling made.
- **Streaming reduces backpressure on job activation.** In fleets of hundreds of worker processes, polling produced many more `RESOURCE_EXHAUSTED` responses on activation than streaming.
- **Polling did not cause a thundering herd in these tests.** Each long poll is held open until a job is available, so the number of requests stays close to one per job.

The numbers depend on your workload, so profile your own workers before you tune. For the methodology and results, see the [SDK performance matrix](https://github.com/camunda/sdk-performance-matrix) and the [streaming vs polling findings for the community Go client](https://github.com/camunda-community-hub/zeebe-client-go/issues/102).

### Tune your workers

- **Scale CPU-bound handlers by adding processes, not workers.** Adding workers within one process doesn't increase throughput when the handler is CPU-bound.
- **Don't add processes beyond what the cluster can take.** Once the cluster is at its limit, each extra process only adds connections and activation requests.
- **Use a shared worker name for workers of the same job type.** The gateway merges streams that target the same job type, worker name, timeout, and fetch variables. Workers with unique names each open a separate stream. See [how job streaming works](/components/concepts/job-workers.md#how-it-works).
- **Use `fetchVariables` and a sensible `maxJobsActive`.** Fetch only the variables the handler needs, and size the worker's capacity for its job timeout. See [writing good workers](/components/best-practices/development/writing-good-workers.md).
- **Back off on `RESOURCE_EXHAUSTED`.** Raise the poll interval or request timeout, or configure a backoff, so that workers don't retry immediately. See [technical error handling](/apis-tools/zeebe-api/technical-error-handling.md).

## Choose a client

| Client                                                                                    | Default protocol | gRPC                                                      | Job streaming                                |
| :---------------------------------------------------------------------------------------- | :--------------- | :-------------------------------------------------------- | :------------------------------------------- |
| [Camunda Java Client](/apis-tools/java-client/getting-started.md)                         | REST             | Yes, with `preferRestOverGrpc(false)` and a `grpcAddress` | Opt in per worker with `streamEnabled(true)` |
| [Camunda Spring Boot Starter](/apis-tools/camunda-spring-boot-starter/getting-started.md) | REST             | Yes, with `prefer-rest-over-grpc: false`                  | Opt in with `stream-enabled: true`           |
| [TypeScript SDK (`@camunda8/sdk`)](/apis-tools/typescript/camunda8-sdk.md)                | REST             | Yes                                                       | Yes                                          |
| [Orchestration Cluster API TypeScript client](/apis-tools/typescript/oca-client.md)       | REST             | No                                                        | No                                           |
| [C# SDK](/apis-tools/csharp-sdk.md)                                                       | REST             | No                                                        | No                                           |
| [Go SDK (Technical Preview)](/apis-tools/go-sdk.md)                                       | REST             | Streaming worker only                                     | Yes, with `NewStreamJobWorker`               |

When you configure both addresses and enable streaming, the Java client sends commands and polls over REST and streams jobs over gRPC. Both endpoints must be reachable from the worker.

### Community Go client

The community-maintained [`zeebe-client-go`](https://github.com/camunda-community-hub/zeebe-client-go) supports gRPC polling and streaming. Camunda does not support community clients as part of its commercial services.

- Before v8.7.0, job streaming can stall under high volume. Use v8.7.0 or later to stream jobs.
- Use v8.7.1 or later for the fixes that reduce idle polling cost, avoid stranding jobs on shutdown, and recycle streams after a gateway scale-out or restart.

## Configure the protocol in the Java client and Spring Boot Starter

Two settings decide the protocol: `prefer-rest-over-grpc` for commands and `stream-enabled` for job delivery.

| Setup                             | `prefer-rest-over-grpc` | `stream-enabled`  | gRPC address needed |
| :-------------------------------- | :---------------------- | :---------------- | :------------------ |
| REST only (default)               | `true`                  | `false`           | No                  |
| REST commands, gRPC job streaming | `true`                  | `true`            | Yes                 |
| gRPC by default                   | `false`                 | `true` or `false` | Yes                 |

Spring Boot Starter, REST commands with gRPC job streaming:

```yaml
camunda:
  client:
    rest-address: http://localhost:8080
    grpc-address: http://localhost:26500
    prefer-rest-over-grpc: true # default; false sends commands over gRPC
    worker:
      defaults:
        stream-enabled: true # streams jobs over gRPC
```

Java client, the same setup:

```java
CamundaClient client = CamundaClient.newClientBuilder()
    .restAddress(URI.create("http://localhost:8080"))
    .grpcAddress(URI.create("http://localhost:26500"))
    .build(); // add .preferRestOverGrpc(false) to make gRPC the default

client.newWorker()
    .jobType("payment")
    .handler(handler)
    .streamEnabled(true)
    .open();
```

Addresses must include the scheme (`http://` or `https://`).

For all client settings, see the [Java client](/apis-tools/java-client/job-worker.md#job-streaming) and [Spring Boot Starter](/apis-tools/camunda-spring-boot-starter/configuration.md) documentation.

## REST job activation limitations

If any of these limitations affect you, use gRPC for job activation, or work around them as described.

| Limitation                              | Effect                                                                                                                                      | Mitigation                                                                                                                                               |
| :-------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Long polls can outlive a closed client  | The gateway doesn't detect the closed connection, so the request can still activate jobs. They stay locked until their job timeout elapses. | Use gRPC for job activation, or disable long polling for REST job activation.                                                                            |
| Client-side response size isn't limited | Jobs from all partitions are combined into one response, which can be several times the maximum message size.                               | Lower `maxJobsActive` and use `fetchVariables` to fetch only what the handler needs.                                                                     |
| Higher broker CPU under load            | REST uses about 10 to 15% more broker CPU than gRPC at the same load.                                                                       | Size your brokers with headroom. See [Protocol: REST or gRPC](/components/best-practices/architecture/sizing-your-environment.md#protocol-rest-or-grpc). |

## Deployment and network considerations

gRPC needs HTTP/2 end to end, its own port and ingress, and its own TLS settings. REST needs none of these.

- **Protocol:** REST works over HTTP/1.1 or HTTP/2. gRPC requires HTTP/2 through every proxy and load balancer between the client and the gateway.
- **Ports:** REST listens on 8080. gRPC listens on 26500.
- **Ingress (Helm):** gRPC uses its own Ingress, configured under `orchestration.ingress.grpc`. It inherits nothing from `global.ingress.annotations`. Ingress-nginx needs `nginx.ingress.kubernetes.io/backend-protocol: "GRPC"`.
- **TLS:** You configure each protocol separately. See [Configure Orchestration REST and gRPC TLS modes](/self-managed/deployment/helm/configure/orchestration-tls-modes.md).
- **Long-lived streams:** Proxies that close idle HTTP/2 connections end job streams with `504` errors. See [job streaming](/self-managed/components/orchestration-cluster/zeebe/zeebe-gateway/job-streaming.md).

## Related topics

- [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md)
- [Zeebe API (gRPC)](/apis-tools/zeebe-api/grpc.md)
- [Job workers](/components/concepts/job-workers.md)
- [Writing good workers](/components/best-practices/development/writing-good-workers.md)
- [Sizing your environment](/components/best-practices/architecture/sizing-your-environment.md)
- [Migrate to the Camunda Java Client: REST vs gRPC selection](/apis-tools/migration-manuals/migrate-to-camunda-java-client.md#protocol-and-connection-rest-vs-grpc-selection)
