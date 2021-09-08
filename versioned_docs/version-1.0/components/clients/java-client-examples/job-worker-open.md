---
id: job-worker-open
title: "Open a job worker"
---

## Related Resources

- [Job worker basics](/components/concepts/job-workers.md)

## Prerequisites

1. Running Zeebe broker with endpoint `localhost:26500` (default)
1. Run the [deploy a process example](process-deploy.md)
1. Run the [create a process instance example](process-instance-create.md) a couple of times

## JobWorkerCreator.java

[Source on github](https://github.com/zeebe-io/zeebe/tree/develop/samples/src/main/java/io/zeebe/example/job/JobWorkerCreator.java)

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
