---
id: overview
title: Robotic process automation (RPA)
description: Integrate legacy applications into Camunda with robotic process automation (RPA).
---

Use Robotic process automation (RPA) to integrate legacy systems without APIs into your Camunda processes.

## About RPA

RPA allows you to automate manual, repetitive tasks by interacting with legacy mainframe applications, desktop applications such as ERP systems, or websites that do not expose APIs.

Camunda uses RPA to integrate legacy applications without accessible APIs into your process orchestration.

## Get started with RPA

Camunda RPA uses a standalone RPA worker and Robot Framework–based scripts. This setup lets you build and run RPA scripts that integrate with your existing Camunda components.

## Security notice

RPA scripts run with the worker’s operating system permissions and can access its files, network, and inherited environment, including cluster credentials. The local testing feature, called the sandbox, does not isolate scripts from the host.

Run only trusted scripts, restrict access to the worker’s HTTP API, and keep development workers separate from production credentials and data. Authenticating the worker to Camunda does not authenticate incoming requests to the worker.

Before starting a worker, review the [RPA security configuration and upgrade requirements](./production.md#secure-the-rpa-worker).

## Check compatibility

:::tip
Before you begin, review the [RPA known issues](https://github.com/camunda/rpa-worker/discussions/categories/known-issues) to check environment compatibility.
:::

To start building RPA scripts, see [Get started with RPA](./getting-started.md).

## Further resources

- Learn how to configure your RPA workers for [production use cases](./production.md).
- For more details or to leave feedback, see the [RPA product roadmap](https://roadmap.camunda.com/c/212-rpa-1-0).
