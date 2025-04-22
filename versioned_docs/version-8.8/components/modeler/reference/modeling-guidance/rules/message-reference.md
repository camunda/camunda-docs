---
id: message-reference
title: Message reference
description: Reference for the `message-reference` rule.
---

import MarkerGuideline from "@site/src/mdx/MarkerGuideline";

A message event or receive task must reference a message defined in the process. To fix this problem, open the **Message** group in the properties panel on the right side of the screen and select or create a message. The referenced message must have a defined correlation key (refer to [message subscriptions](../../../../../concepts/messages/#message-subscriptions)).

## <MarkerGuideline.Invalid /> No message selected

![No message selected](./img/message-reference/wrong-no-message-reference.png)

## <MarkerGuideline.Valid /> Message selected

![Message selected](./img/message-reference/right.png)

## References

- [Messages](../../../../../concepts/messages/)
- [Rule source](https://github.com/camunda/bpmnlint-plugin-camunda-compat/blob/main/rules/camunda-cloud/message-reference.js)
