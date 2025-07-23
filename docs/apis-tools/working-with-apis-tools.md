---
id: working-with-apis-tools
title: "APIs & tools"
sidebar_label: "APIs & tools"
description: "Learn more about the integration concepts involved in using the Camunda Zeebe client libraries, APIs, and SDKs to interact programmatically with Camunda 8."
---

import DocCardList from '@theme/DocCardList';

# Overview: APIs and Clients in Camunda 8

Camunda 8 provides a unified set of APIs and official clients to help you build, automate, and monitor process-driven applications. This page gives you an overview of the available APIs, when to use them, and how to get started with official Camunda clients and SDKs.

Camunda 8 exposes several APIs for different integration and automation needs:

- **Orchestration Cluster API (REST):** The main API for process automation, orchestration, and user task management. Recommended for most use cases.
- **Zeebe API (gRPC):** API for advanced integrations and high-performance use cases. Use only if you need unique features of gRPC - it requires HTTP/2.
- **Administration API (REST):** For managing Camunda clusters, API clients, and system-level operations.
- **Optimize API (REST):** For process analytics, dashboards, and reporting data.
- **Web Modeler API (REST):** For integrating with the Web Modeler for modeling automation.

Camunda provides official clients and SDKs - including Java, Spring, and Node.js clients to simplify API usage and speed up development. Camunda Process Test is available for testing your process definitions and automations.

This page is your starting point for understanding which API or client to use for your scenario, and how to get started with Camunda 8 integrations.

## Official Camunda Clients and SDKs

Camunda provides official clients and SDKs to simplify API usage and speed up development:

- **Java Client:** The recommended way to build Orchestration Cluster integrations and job workers in Java.
- **Spring SDK:** Build Spring Boot applications that connect to the Orchestration Cluster to build job workers and process orchestration.
- **Node.js SDK:** For JavaScript/TypeScript developers building integrations or automations.

<DocCardList items={[
{type:"link", href:"/docs/next/apis-tools/java-client/", label: "Java client", docId:"apis-tools/java-client/index"},
{type:"link", href:"/docs/next/apis-tools/spring-zeebe-sdk/getting-started/", label: "Spring SDK", docId:"apis-tools/spring-zeebe-sdk/getting-started"},
{type:"link", href:"/docs/next/apis-tools/node-js-sdk/", label: "Node.js SDK", docId:"apis-tools/node-js-sdk"}
]}/>

## Testing process definitions and automations

- **Camunda Process Test:** Test your process definitions and automations with a dedicated testing framework.

<DocCardList items={[
{type:"link", href:"/docs/next/apis-tools/testing/getting-started/", label: "Camunda Process Test", docId:"apis-tools/testing/getting-started"}
]}/>

## API Reference

<DocCardList items={[
{type:"link", href:"/docs/next/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview/", label: "Orchestration Cluster API (REST)", docId:"apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview"},
{type:"link", href:"/docs/next/apis-tools/zeebe-api/overview/", label: "Zeebe API (gRPC)", docId:"apis-tools/zeebe-api/grpc"},
{type:"link", href:"/docs/next/apis-tools/administration-api/administration-api-reference/", label: "Administration API (REST)", docId:"apis-tools/administration-api/administration-api-reference"},
{type:"link", href:"/docs/next/apis-tools/optimize-api/optimize-api-authentication/", label: "Optimize API (REST)", description: "Get, delete, and export reports and dashboards, enable and disable sharing, and more."},
{type:"link", href:"/docs/next/apis-tools/web-modeler-api/overview/", label: "Web Modeler API (REST)", docId:"apis-tools/web-modeler-api/overview"}
]}/>

## When to use which API?

- **Orchestration Cluster API:** For most process automation, orchestration, and user task scenarios. Recommended for new projects.
- **Zeebe API:** For advanced, high throughput and low-latency integrations, or when you need gRPC features. Use only if you have specific requirements that the REST API cannot meet.
- **Administration API:** For cluster and system management.
- **Optimize API:** For analytics, dashboards, and reporting.
- **Web Modeler API:** For integrating modeling into your toolchain.

## Migration manuals

If you are migrating from Camunda 7 or from v1 component REST APIs, see the [migration manuals](/apis-tools/migration-manuals/migrate-to-camunda-api.md) for guidance.
