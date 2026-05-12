---
id: zeebe-process-test
title: "Migrate from Zeebe Process Test"
---

:::warning
Zeebe Process Test was removed in Camunda 8.10. Use [Camunda Process Test](/apis-tools/testing/getting-started.md) instead.
:::

Use [Camunda Process Test](/apis-tools/testing/getting-started.md) for current process testing, and review the [migration guide](/apis-tools/migration-manuals/migrate-to-camunda-process-test.md) to replace old ZPT dependencies, annotations, and assertions.
a delay (30ms) and check if it is still idle. If this is the case, it is considered to be in idle
something, without explicitly triggering it yourself. An example of this would be a process with a
timer event. We can increase the time of the engine, but we cannot trigger the timer explicitly.
Because of this, we should wait for a busy state after increasing the engine time.

## Examples

For example tests, refer to [GitHub](https://github.com/camunda-cloud/zeebe-process-test).
