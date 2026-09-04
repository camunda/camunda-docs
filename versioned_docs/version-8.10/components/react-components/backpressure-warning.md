---
---

:::note
We recommend reducing the rate of requests. When backpressure is active, the broker may reject any request except _CompleteJob_ RPC and _FailJob_ RPC. These requests are allowed during backpressure and are always accepted by the broker even if it is receiving requests above its limits.
:::
