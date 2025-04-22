---
id: job-worker-open
title: "Open a job worker"
description: "Let's analyze the prerequisites and code to open a job worker."
---

## Related resources

- [Job worker basics](/components/concepts/job-workers.md)

## Prerequisites

- Run the Zeebe Broker with endpoint `localhost:26500` (default).
- Run the [deploy a process example](process-deploy.md).
- Run the [create a process instance example](process-instance-create.md) a few times.

## JobWorkerCreator.java

[Source on GitHub](https://github.com/camunda-community-hub/camunda-8-examples/blob/main/zeebe-client-plain-java/src/main/java/io/camunda/zeebe/example/job/JobWorkerCreator.java)

```java
        ...
        final String jobType = "foo";

        try (final ZeebeClient client = clientBuilder.build()) {

            System.out.println("Opening job worker.");

            try (final JobWorker workerRegistration =
                client
                    .newWorker()
                    .jobType(jobType)
                    .handler(new ExampleJobHandler())
                    .timeout(Duration.ofSeconds(10))
                    .open()) {
                System.out.println("Job worker opened and receiving jobs.");

                // run until System.in receives exit command
                waitUntilSystemInput("exit");
            }
        }
    }

    private static class ExampleJobHandler implements JobHandler {
        @Override
        public void handle(final JobClient client, final ActivatedJob job) {
            // here: business logic that is executed with every job
            System.out.println(job);
            client.newCompleteCommand(job.getKey()).send().join();
        }
    }
```
