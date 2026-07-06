---
title: "Type Alias: JobWaitStateDetails"
sidebar_label: "JobWaitStateDetails"
mdx:
  format: md
---

# Type Alias: JobWaitStateDetails

```ts
type JobWaitStateDetails = BaseWaitStateDetails & object;
```

## Type Declaration

### jobKey

```ts
jobKey: JobKey;
```

The key of the job.

### jobKind

```ts
jobKind: JobKindEnum;
```

The kind of job.

### jobType

```ts
jobType: string;
```

The job type (worker subscription identifier).

### listenerEventType

```ts
listenerEventType: JobListenerEventTypeEnum | null;
```

The listener event type of the job (only set for execution listener and task listener jobs).

### retries

```ts
retries: number | null;
```

The number of retries remaining for the job.

### waitStateType

```ts
waitStateType: string;
```

The wait state type discriminator.
