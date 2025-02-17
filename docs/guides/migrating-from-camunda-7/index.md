---
id: index
title: Camunda 7 to Camunda 8 Migration Guide
sidebar_label: Overview
description: "Migrate process solutions developed for Camunda 7 to run them on Camunda 8."
keywords: [Camunda 8, Camunda 7, migration guide, transition, transition guide]
---

This guide describes how to migrate process solutions developed for Camunda 7 to run them on Camunda 8. Therefore, it looks at the typical journey for migration, describing the decisions on the way and linking to more in-depth material or tooling.

As a general note, you need to know that Camunda 8 is not a drop-in replacement for Camunda 7. This means that it is not sufficient to exchange a library, but you might have to adjust your BPMN models, do code refactorings, and probably also re-architect your solution. The effort depends very much on how you have built your existing Camunda 7 solution, and we will dive deeper into all aspects in this guide.

:::note
This migration guide describes tooling that is under development for Camunda 8.8 and might not yet be fully ready when you read this.
:::

<!-- TODO: However, the [migration tooling roadmap](http://x) can inform your time planning. -->

## What to expect

The list below provides an outline of the sections in this guide:

- [The migration journey](./migration-journey)
- [Conceptual differences](./conceptual-differences)
- [Migration tooling](./migration-tooling)
- [Code conversion](./code-conversion)
- [Prepare for smooth migrations](./migration-readiness)
- [Technical details](./technical-details)

## Where to get help?

There are many possibilities to get help with your migration efforts:

- The [Camunda forum](https://forum.camunda.io/c/c7-to-c8/)
- Camunda Consulting
  - [Migration workshops](https://camunda.com/wp-content/uploads/2024/03/Camunda_ConsultingWorkshops_5-Migration-Evaluation_2024.pdf)
  - Professional advisory services
- [Camunda Partners](https://camunda.com/de/partners/):
  - Professional advisory services
  - Implementation services

Talk to your customer success manager or [reach out to Camunda](https://camunda.com/contact-us/).
