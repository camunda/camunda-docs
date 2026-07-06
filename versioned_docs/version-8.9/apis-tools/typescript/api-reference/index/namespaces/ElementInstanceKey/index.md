---
title: "ElementInstanceKey"
sidebar_label: "Overview"
mdx:
  format: md
---

# ElementInstanceKey

`ElementInstanceKey` identifies a specific running BPMN element instance inside a process instance.
For example, a service task, user task, event, gateway, or sub-process each has its own element instance key while it is active.

You use this key when an API call targets the scope of a specific element instance, such as setting local variables or searching for incidents on that element.
If you are working with an activated job, you can usually read this value from `job.elementInstanceKey`.

## Functions

- [assumeExists](functions/assumeExists.md)
- [getValue](functions/getValue.md)
- [isValid](functions/isValid.md)
