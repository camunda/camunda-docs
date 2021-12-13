---
id: zeebe-test
title: "Zeebe test"
---
You can use the `zeebe-test` module to write JUnit tests for your job worker and BPMN process. This provides a JUnit rule to bootstrap the broker and some basic assertions.

:::note
`zeebe-test` is [deprecated for removal](./reference/announcements.md).
:::

## Usage in a Maven project

Add `zeebe-test` as a Maven test dependency to your project:

```xml
<dependency>
  <groupId>io.camunda</groupId>
  <artifactId>zeebe-test</artifactId>
  <scope>test</scope>
</dependency>
```

## Bootstrap the broker

Use the `ZeebeTestRule` in your test case to start an embedded broker. This contains a client which can be used to deploy a BPMN process or create an instance.

```java
import io.camunda.zeebe.client.ZeebeClient;
import io.camunda.zeebe.client.api.response.ProcessInstanceEvent;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;

public class MyTest {

  @Rule public final ZeebeTestRule testRule = new ZeebeTestRule();

  private ZeebeClient client;

  @Test
  public void test() {
  	client = testRule.getClient();

    client
        .newDeployCommand()
        .addResourceFromClasspath("process.bpmn")
        .send()
        .join();

    final ProcessInstanceEvent processInstance =
        client
            .newCreateInstanceCommand()
            .bpmnProcessId("process")
            .latestVersion()
            .send()
            .join();
  }
}
```

## Verify the result

The `ZeebeTestRule` also provides some basic assertions in AssertJ style. The entry point of the assertions is `ZeebeTestRule.assertThat(...)`.

```java
final ProcessInstanceEvent processInstance = ...

ZeebeTestRule.assertThat(processInstance)
    .isEnded()
    .hasPassed("start", "task", "end")
    .hasVariable("result", 21.0);
```

