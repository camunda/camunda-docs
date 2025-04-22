---
id: tasks
title: "Overview"
description: "This document outlines an overview of supported elements."
---

The basic elements of BPMN processes are tasks; these are atomic units of work composed to create a meaningful result. Whenever a token reaches a task, the token stops and Zeebe creates a job and notifies a registered worker to perform work. When that handler signals completion, the token continues on the outgoing sequence flow.

Choosing the granularity of a task is up to the person modeling the process. For example, the activity of processing an order can be modeled as a single _Process Order_ task, or as three individual tasks _Collect Money_, _Fetch Items_, _Ship Parcel_. If you use Zeebe to orchestrate microservices, one task can represent one microservice invocation.

Currently supported elements:

- [Service tasks](service-tasks/service-tasks.md)
- [User tasks](user-tasks/user-tasks.md)
- [Receive tasks](receive-tasks/receive-tasks.md)
- [Business rule tasks](business-rule-tasks/business-rule-tasks.md)
- [Script tasks](script-tasks/script-tasks.md)
- [Send tasks](send-tasks/send-tasks.md)
- [Manual tasks](manual-tasks/manual-tasks.md)
- [Undefined tasks](undefined-tasks/undefined-tasks.mdx)
