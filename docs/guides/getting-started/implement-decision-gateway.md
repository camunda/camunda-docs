---
id: implement-decision-gateway
title: Implement a decision gateway
---

In [the last section](./implement-service-task.md) we connected a worker that will return a JSON object as a result, which is used to decide which path to take in the workflow. Now, we can use the JSON object to route your process by filling in the condition expression on the two sequence flows after the XOR gateway.

Use the following expression for the "Pong" sequence flow:

```bash
=return="Pong"
```

And for the Else Sequence flow:

```bash
=return!="Pong"
```

![sequenceflows](./img/zeebe-modeler-advanced-sequence-flows.png)

Deploy the updated workflow again so the specified decisions in the gateway will be used.
