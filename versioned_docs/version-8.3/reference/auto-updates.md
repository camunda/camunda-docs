---
id: auto-updates
title: "Auto-updates"
description: "Some updates are applied to SaaS clusters automatically."
---

Camunda 8 SaaS customers can enable auto-updates. When enabled, the cluster will be updated once a new patch release is available.

For Camunda 8 Saas, auto-updates are only for patch releases (x.y.**z**, where **z** is a patch release).

Minor updates are not eligible for auto-updates due to the following:

- potential for long downtimes of webapps (Tasklist, Operate, Optimize, etc.) and Zeebe
- breaking changes moving from one minor to the next, including possible impact to BPMN execution
