---
id: resource-authorizations
title: "Resource authorizations"
description: "In Camunda 8 SaaS, resource authorizations are supported to allow a finer grained approach to controlling access to your resources."
---

In Camunda 8 SaaS, resource authorizations allow you to control the level of access a user has to a specific resource in the system.

### Component support

The Camunda ecosystem contains several resource types and many actions that can be performed on them, currently the resource types and permissions we support are:

#### Operate

- Process definition:
  - Read definition
  - Delete definition
  - Update process instance
  - Delete process instance
- Decision definition:
  - Read
  - Delete

#### Tasklist

- Process definition:
  - Start process instance

### Using Camunda 8 Self-Managed?

If you are using the Self-Managed distribution of Camunda 8, we recommend heading over to the [resource authorizations for Self-Managed](../../self-managed/concepts/access-control/resource-authorizations.md) documentation.
