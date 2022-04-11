---
id: index
title: Introduction to Connectors
description: Introduction to Connectors in Web Modeler
---

To automate complex [business processes](/components/concepts/processes.md) using Camunda Platform 8, a user has to implement the business logic using the concept of [job workers](/components/concepts/job-workers.md). Creating these job workers requires an initial investment and effort to get started with Camunda Platform 8. At the same time, some use cases require the same business logic to be implemented. A solution to reduce the onboarding time enables fast prototyping and solves everyday use cases in Camunda Platform 8 is the concept of connectors.

A connector is a dedicated task that fulfills a specific use case and can be realized using configuration without implementing any logic. In the following documentation, you can learn more about how to [use connectors](use-connectors.md) and which connectors are [available out-of-the-box](available-connectors/index.md).

The concept of a connector consists of two parts, the business logic is implemented as a [job worker](/components/concepts/job-workers.md), and the user interface during modeling is provided using a [element template](/components/modeler/desktop-modeler/element-templates/about-templates.md).

In Camunda Platform 8 SaaS, the provided connectors are operated by Camunda offered in the scope of the product. In Camunda Platform 8 Self-Managed, the user can employ the same concept of element templates and job workers to provide their connector landscape.