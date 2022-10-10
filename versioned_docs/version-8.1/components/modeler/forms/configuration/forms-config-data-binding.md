---
id: forms-config-data-binding
title: Data binding
description: How data from the process interacts with your form
---

## Binding form fields to process data

Each **form element** which allows data manipulation has a **Key** attribute, they are known as **form fields**. This attribute is used as an identifier to map data of the respective field (1) during the initial loading and (2) during submission of the form.

When a form is referenced by a user task or start event and viewed in [Camunda Tasklist](../../../tasklist/introduction-to-tasklist.md), the key will be used to refer to a process variable. This means that the value of the process variable will be used to populate the respective field initially and then mapped back to the process during the submission of the form.
