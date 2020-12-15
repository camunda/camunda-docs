---
id: architecture
title: "Architecture"
---

There are four main components in Zeebe's architecture: client, gateway, brokers, and exporters.

![zeebe-architecture](assets/zeebe-architecture.png)

In Camunda Cloud SaaS you will work exclusively with clients. Gateway, broker, and exporters are pre-configured to provide the service, but are not themselves accessible.

In local or private cloud deployments, all components are relevant.

## Client

Clients send commands to Zeebe:

- Deploying Workflows
- Carrying out business logic
  - Starting Workflow Instances,
  - Publishing Messages
  - Activate Jobs
  - Complete Job
  - Fail Job
- Handling operational issues
  - Updating Workflow Instance Variables
  - Resolving incidents

Client applications can be scaled up and down completely separately from Zeebe - the Zeebe brokers do not execute any business logic.

Clients are libraries that you embed in an application (e.g. a microservice that executes your business logic) to connect to a Zeebe cluster.

Clients connect to the Zeebe gateway via [gRPC](https://grpc.io), which uses http/2-based transport. To learn more about gRPC in Zeebe, check out the [Zeebe API (gRPC)](/reference/grpc.md).

The Zeebe project includes officially-supported Java and Go clients. [Community clients](/product-manuals/clients/other-clients/index.md) have been created in other languages, including C#, Ruby, and JavaScript. The gRPC protocol makes it possible to [generate clients](/product-manuals/clients/build-your-own-client.md) in a range of different programming languages.

### Job Worker

A job worker is a Zeebe client that uses the client API to first activate jobs, and then upon completion either complete or fail the job.

## Gateway

The gateway serves as a single entry point to a Zeebe cluster and forwards requests to brokers.

The gateway is stateless and sessionless, and gateways can be added as necessary for load balancing and high availability.

## Broker

The Zeebe broker is the distributed workflow engine that keeps state of active workflow instances.

Brokers can be partitioned for horizontal scalability and replicated for fault tolerance. A Zeebe deployment will often consist of more than one broker.

It's important to note that no application business logic lives in the broker. Its only responsibilities are:

- Processing commands sent by clients
- Storing and managing the state of active workflow instances
- Assigning jobs to job workers

Brokers form a peer-to-peer network in which there is no single point of failure. This is possible because all brokers perform the same kind of tasks and the responsibilities of an unavailable broker are transparently reassigned in the network.

## Exporter

The exporter system provides an event stream of state changes within Zeebe. This data has many potential uses, including but not limited to:

- Monitoring the current state of running workflow instances
- Analysis of historic workflow data for auditing, business intelligence, etc
- Tracking [incidents](/product-manuals/concepts/incidents.md) created by Zeebe

The exporter includes a simple API that you can use to stream data into a storage system of your choice. Zeebe includes an out-of-the-box [Elasticsearch exporter](https://github.com/zeebe-io/zeebe/tree/master/exporters/elasticsearch-exporter), and other [community-contributed exporters](https://awesome.zeebe.io) are also available.
