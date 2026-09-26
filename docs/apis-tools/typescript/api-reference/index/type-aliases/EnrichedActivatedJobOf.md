---
title: "Type Alias: EnrichedActivatedJobOf<J>"
sidebar_label: "EnrichedActivatedJobOf<J>"
mdx:
  format: md
---

# Type Alias: EnrichedActivatedJobOf\<J\>

```ts
type EnrichedActivatedJobOf<J> = J &
  Omit<EnrichedActivatedJob, keyof ActivatedJobResult>;
```

Generic projection of an enriched job over its underlying activated-job shape
`J`, used by the marker-driven dependent-presence overloads to narrow
individual response properties — e.g. `jobLeaseToken` becomes non-null when a job
was activated with `withLease: true`, or an optional nullable field
(`{ jobLeaseToken?: null }`) when it was not. The absent projection re-types the
property as optional-and-null rather than removing it, so it is not assignable
to the base non-nullable narrowing; `J` is therefore left unconstrained rather
than bounded by `ActivatedJobResult`.

The overlay is `Omit<EnrichedActivatedJob, keyof ActivatedJobResult>` — the
non-base portion of [EnrichedActivatedJob](../interfaces/EnrichedActivatedJob.md) — rather than
`EnrichedActivatedJobActions` directly. This preserves the declaration-merge
compatibility promise for _narrowed_ jobs too: any field a consumer merges onto
the public `EnrichedActivatedJob` interface (e.g. `interface EnrichedActivatedJob
{ myFlag: boolean }`) is carried onto `activateJobs({ withLease: true })` results
as well, instead of silently disappearing from the narrowed overload while
remaining on the base one. Defaults to the base `ActivatedJobResult`, so
`EnrichedActivatedJobOf` with no argument equals [EnrichedActivatedJob](../interfaces/EnrichedActivatedJob.md).

## Type Parameters

### J

`J` = `ActivatedJobResult`
