---
title: "Type Alias: JobLeaseToken"
sidebar_label: "JobLeaseToken"
mdx:
  format: md
---

# Type Alias: JobLeaseToken

```ts
type JobLeaseToken = CamundaKey<"JobLeaseToken">;
```

An opaque, engine-minted fencing token identifying a single activation of a job.
Returned by Activate Jobs as `ActivatedJobResult.leaseToken` when the job is
activated with a lease, and passed back on fenced job commands — and on
agent-instance creation/updates as `jobLease` — to prove the caller holds the
current lease. The token is opaque: clients may rely on its presence and equality
only, and must never construct, parse, or otherwise interpret it beyond equality
checks. It cannot be minted client-side; only the engine produces it, exactly once
per leased activation, and clients must not depend on any particular internal format.
