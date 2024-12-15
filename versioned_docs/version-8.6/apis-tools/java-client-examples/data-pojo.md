---
id: data-pojo
title: "Handle variables as POJO"
description: "Let's analyze the prerequisites and code to handle variables as POJO."
---

## Related resources

- [Data flow](../../components/modeler/bpmn/data-flow.md)

## Prerequisites

1. Run the Zeebe Broker with endpoint `localhost:26500` (default).
2. Run the [deploy a process example](process-deploy.md).

## HandleVariablesAsPojo.java

[Source on GitHub](https://github.com/camunda-community-hub/camunda-8-examples/blob/main/zeebe-client-plain-java/src/main/java/io/camunda/zeebe/example/data/HandleVariablesAsPojo.java)

```java
    ...
    try (final ZeebeClient client = clientBuilder.build()) {
      final Order order = new Order();
      order.setOrderId(31243);

      client
          .newCreateInstanceCommand()
          .bpmnProcessId("demoProcess")
          .latestVersion()
          .variables(order)
          .send()
          .join();

      client.newWorker().jobType("foo").handler(new DemoJobHandler()).open();

      // run until System.in receives exit command
      waitUntilSystemInput("exit");
    }
  }

  public static class Order {
    private long orderId;
    private double totalPrice;

    public long getOrderId() {
      return orderId;
    }

    public void setOrderId(final long orderId) {
      this.orderId = orderId;
    }

    public double getTotalPrice() {
      return totalPrice;
    }

    public void setTotalPrice(final double totalPrice) {
      this.totalPrice = totalPrice;
    }
  }

  private static class DemoJobHandler implements JobHandler {
    @Override
    public void handle(final JobClient client, final ActivatedJob job) {
      // read the variables of the job
      final Order order = job.getVariablesAsType(Order.class);
      System.out.println("new job with orderId: " + order.getOrderId());

      // update the variables and complete the job
      order.setTotalPrice(46.50);

      client.newCompleteCommand(job.getKey()).variables(order).send();
    }
  }
```
