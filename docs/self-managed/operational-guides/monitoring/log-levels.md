---
id: log-levels
title: "Log levels"
description: "Learn about what information you can expect in various log levels and how to handle them"
---

When working with Camunda 8, you may see various messages in your logs. Not all messages require action.

## Understanding log levels

Camunda 8 uses the following log levels:

- TRACE: Information which is helpful only if you want to trace the execution of a particular component.
- DEBUG: Information which can provide helpful context when debugging. You may see a DEBUG message right after an INFO message to provide more context.
- INFO: Information about the system which is useful for the user (in the case of the broker, the user here is the user deploying it). For example, leader changes, a new node added to or removed from the membership, etc.
- WARN: Expected errors (e.g. connection timeouts, the remote node is unavailable, etc.) which may indicate that parts of the system are not working, and would require attention if they persist, but may resolve by themselves. These should be monitored, but may not require a support ticket.
- ERROR: Errors which require a person to look into them, e.g. log corruption, inconsistent log, anything which could shut down a partition, etc.

## Enable logging

Enable logging for each component of Camunda 8 using the following instructions:

- [Zeebe](/self-managed/zeebe-deployment/configuration/logging.md)
- [Operate](/self-managed/operate-deployment/operate-configuration.md#logging)
- [Tasklist](/self-managed/tasklist-deployment/tasklist-configuration.md#logging)
- [Web Modeler](/self-managed/modeler/web-modeler/configuration/logging.md)
- [Identity](/self-managed/identity/user-guide/configuration/configure-logging.md)
