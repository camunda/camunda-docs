---
title: "Camunda 8.8 APIs & tools Update Guide"
description: "Plan and execute an update of your Camunda 8 to version 8.8. Includes architectural highlights, prerequisites, breaking changes relevant for developers."
---

# Camunda 8.8 APIs & tools Update Guide

This page helps you plan and run an update of an existing **Camunda 8.7** Self-Managed environment to **Camunda 8.8**. It summarizes what changed, what you must do before updating, and where to find step-by-step instructions based on your role.

> **Who should read this?**  
> Platform administrators, DevOps engineers, and application developers maintaining Camunda-based solutions in self-managed Kubernetes or VM environments.

## Camunda 8.8 is a latest release

Camunda 8.8 represents a significant architectural evolution that affects both infrastructure deployment and application integration. This update introduces the new **Orchestration cluster architecture**, unified APIs, and new authentication models while deprecating several legacy components.

## Why this update matters

TODO: Link to "What's new in Camunda 8.8."

---

### API & SDK status

| Component / Use          | Status in 8.8  | Migrate To                 | Migrate By (no later than) |
| ------------------------ | -------------- | -------------------------- | -------------------------- |
| V1 component APIs        | **Deprecated** | Orchestration Cluster API  | Before Camunda 8.10        |
| Spring Zeebe SDK         | **Deprecated** | Camunda Spring SDK         | Before Camunda 8.10        |
| Zeebe Process Test (ZPT) | **Deprecated** | Camunda Process Test (CPT) | Before Camunda 8.10        |
| Job-based User Tasks     | **Deprecated** | Camunda User Tasks         | Before Camunda 8.10        |

> Start migration now to reduce risk when upgrading beyond 8.8.

For More information see [Upcoming API Changes in Camunda 8: A Unified and Streamlined Experience](https://camunda.com/blog/2024/12/api-changes-in-camunda-8-a-unified-and-streamlined-experience/)

## Next steps

1. **Coordinate between platform and development teams** - you can only update to newest clients when the Orchestration Cluster was updated to 8.8
2. TODO checkout the detailed guides on the topics:

---
