---
id: migration-readiness
title: Prepare for smooth migrations
description: "Learn how to build Camunda 7 solutions that are easy to migrate."
---

Sometimes you might not be able to use Camunda 8 right away as described in [What to do When You Can’t Quickly Migrate to Camunda 8](https://camunda.com/blog/2022/05/what-to-do-when-you-cant-quickly-migrate-to-camunda-8/). In this case, you will keep developing Camunda 7 process solutions, but you should establish some practices as quickly as possible to ease migration projects later on.

To implement Camunda 7 process solutions that can be easily migrated, stick to the following rules and development practices:

- Implement what we call **Clean Delegates** - concentrate on reading and writing process variables, plus business logic delegation. Data transformations will be mostly done as part of your delegate (and especially not as listeners, as mentioned below). Separate your actual business logic from the delegates and all Camunda APIs. Avoid accessing the BPMN model and invoking Camunda APIs within your delegates.
- Don’t use listeners or Spring beans in expressions to do data transformations via Java code.
- Don’t rely on an ACID transaction manager spanning multiple steps or resources.
- Don’t expose Camunda APIs (REST or Java) to other services or frontend applications.
- Use primitive variable types or JSON payloads only (no XML or serialized Java objects).
- Use simple expressions or plug-in FEEL. FEEL is the only supported expression language in Camunda 8. JSONPath is also relatively easy to translate to FEEL. Avoid using special variables in expressions, e.g. `execution` or `task`.
- Use your own user interface or Camunda Forms; the other form mechanisms are not supported out of the box in Camunda 8.
- Avoid using any implementation classes from Camunda; generally, those with `\*.impl.\*` in their package name.
- Avoid using engine plugins.

### Clean delegates

Given Java delegates and the workflow engine are embedded as a library, projects can do dirty hacks in their code. Casting to implementation classes? No problem. Using a ThreadLocal or trusting a specific transaction manager implementation? Yeah, possible. Calling complex Spring beans hidden behind a simple Java Unified Expression Language (JUEL) expression? Well, you guessed it — doable!

Those hacks are the real showstoppers for migration, as they cannot be migrated to Camunda 8. In fact, [Camunda 8 increased isolation intentionally](https://blog.bernd-ruecker.com/moving-from-embedded-to-remote-workflow-engines-8472992cc371).

Concentrate on what a Java delegate is intended to do:

1. Read variables from the process and potentially manipulate or transform that data to be used by your business logic.
2. Delegate to business logic — this is where Java delegates got their name from. In a perfect world, you would simply issue a call to your business code in another Spring bean or remote service.
3. Transform the results of that business logic into variables you write into the process.

Here's an example of a good Java delegate:

```java
@Component
public class CreateCustomerInCrmJavaDelegate implements JavaDelegate {

    @Autowired
    private CrmFacade crmFacade;

    public void execute(DelegateExecution execution) throws Exception {
        // Data Input Mapping
        CustomerData customerData = (CustomerData) execution.getVariable("customerData");

        // Delegate to business logic
        String customerId = crmFacade.createCustomer(customerData);

        // Data Output Mapping
        execution.setVariable("customerId", customerId);
    }
}
```

Never cast to Camunda implementation classes, use any ThreadLocal object, or influence the transaction manager in any way. Java delegates should always be stateless and not store any data in their fields.

The resulting delegate can be migrated to a Camunda 8 API, or reused by the adapter provided in [this migration community extension](https://github.com/camunda-community-hub/camunda-7-to-8-migration/).

### No transaction managers

You should not trust ACID [transaction managers](https://blog.bernd-ruecker.com/achieving-consistency-without-transaction-managers-7cb480bd08c) to glue together the workflow engine with your business code. Instead, embrace eventual consistency and make every service task its own transactional step. If you are familiar with Camunda 7 lingo, this means that all BPMN elements will be `async=true`. A process solution that relies on five service tasks to be executed within one ACID transaction, probably rolling back in case of an error, will make migration challenging.

### Don’t expose Camunda API

You should apply the [information hiding principle](https://en.wikipedia.org/wiki/Information_hiding) and not expose too much of the Camunda API to other parts of your application.

In the below example, you should not hand over an execution context to your `CrmFacade``:

```java
// DO NOT DO THIS!
crmFacade.createCustomer(execution);
```

The same holds true when a new order is placed, and your order fulfillment process should be started. Instead of the frontend calling the Camunda API to start a process instance, provide your own endpoint to translate between the inbound REST call and Camunda, for example:

```java
@RestController
public class OrderFulfillmentRestController {

  @Autowired
  private ProcessEngine camunda;

  @RequestMapping(path = "/order", method = POST)
  public ResponseEntity<StatusDto> placeOrder(@RequestBody OrderDto orderPayload) throws Exception {
    // TODO: Somehow extract data from orderPayload
    OrderData orderData = OrderData.from(orderPayload);

    ProcessInstance pi = camunda.getRuntimeService() //
        .startProcessInstanceByKey("orderFulfillment", //
            Variables.putValue("order", orderData));

    response.setStatus(HttpServletResponse.SC_ACCEPTED);
    return ResponseEntity.accepted().body(StatusDto.of("pending"));
  }
}
```

### Use primitive variable types or JSON

Camunda 7 provides flexible ways to add data to your process. For example, you could add Java objects that would be serialized as byte code. Java byte code is brittle and also tied to the Java runtime environment.

Another possibility is transforming those objects on the fly to JSON or XML using Camunda Spin. It turned out this was black magic and led to regular problems, which is why Camunda 8 does not offer this anymore. Instead, you should do any transformation within your code before talking to the Camunda API. Camunda 8 only takes JSON as a payload, which automatically includes primitive values.

In the below Java delegate example, you can see Spin and Jackson were used in the delegate for JSON to Java mapping:

```java
@Component
public class CreateCustomerInCrmJavaDelegate implements JavaDelegate {

    @Autowired
    private ObjectMapper objectMapper;
    //...

    public void execute(DelegateExecution execution) throws Exception {
        // Data Input Mapping
        JsonNode customerDataJson = ((JacksonJsonNode) execution.getVariable("customerData")).unwrap();
        CustomerData customerData = objectMapper.treeToValue(customerDataJson, CustomerData.class);
        // ...
    }
}
```

This way, you have full control over what is happening, and such code is also easily migratable. The overall complexity is even lower, as Jackson is quite known to Java people — a kind of de-facto standard with a lot of best practices and recipes available.

### Simple expressions and FEEL

[Camunda 8 uses FEEL as its expression language](/components/modeler/feel/what-is-feel.md). There are big advantages to this decision. Not only are the expression languages between BPMN and DMN harmonized, but also the language is really powerful for typical expressions. One of my favorite examples is the following onboarding demo we regularly show. A decision table will hand back a list of possible risks, whereas every risk has a severity indicator (yellow, red) and a description.

![onboarding demo](https://camunda.com/wp-content/uploads/2022/05/Migrating-to-Camunda-Platform-8-image-1-1024x367.png)

The result of this decision shall be used in the process to make a routing decision:

![routing decision](https://camunda.com/wp-content/uploads/2022/05/Migrate-to-Camunda-Platform-8-25052022-image-2-1024x481.png)

To unwrap the DMN result in Camunda 7, you could write some Java code and attach that to a listener when leaving the DMN task (this is already an anti-pattern for migration as you will read next). The code is not super readable:

```java
@Component
public class MapDmnResult implements ExecutionListener {

  @Override
  public void notify(DelegateExecution execution) throws Exception {
    List<String> risks = new ArrayList<String>();
    Set<String> riskLevels = new HashSet<String>();

    Object oDMNresult = execution.getVariable("riskDMNresult");
    for (Object oResult : (List<?>) oDMNresult) {
      Map<?, ?> result = (Map<?, ?>) oResult;
      risks.add(result.containsKey("risk") ? (String) result.get("risk") : "");
      if (result.get("riskLevel") != null) {
        riskLevels.add(((String) result.get("riskLevel")).toLowerCase());
      }
    }

    String accumulatedRiskLevel = "green";
    if (riskLevels.contains("rot") || riskLevels.contains("red")) {
      accumulatedRiskLevel = "red";
    } else if (riskLevels.contains("gelb") || riskLevels.contains("yellow")) {
      accumulatedRiskLevel = "yellow";
    }

    execution.setVariable("risks", Variables.objectValue(risks).serializationDataFormat(SerializationDataFormats.JSON).create());
    execution.setVariable("riskLevel", accumulatedRiskLevel);
  }
}
```

With FEEL, you can evaluate that data structure directly and have an expression on the "red" path:

```
= some risk in riskLevels satisfies risk = "red"
```

Additionally, you can even hook in FEEL as the scripting language in Camunda 7 (as explained by [Scripting with DMN inside BPMN](https://camunda.com/blog/2018/07/dmn-scripting/) or [User Task Assignment based on a DMN Decision Table](https://camunda.com/blog/2020/05/camunda-bpm-user-task-assignment-based-on-a-dmn-decision-table/)).

However, more commonly you will keep using JUEL in Camunda 7. If you write simple expressions, they can be migrated automatically, as you can see in [the test case](https://github.com/camunda-community-hub/camunda-7-to-8-migration/blob/main/modeler-plugin-7-to-8-converter/client/JuelToFeelConverter.test.js) of the [migration community extension](https://github.com/camunda-community-hub/camunda-7-to-8-migration). You should avoid more complex expressions if possible.

Very often, a good workaround to achieve this is to adjust the output mapping of your Java delegate to prepare data in a form that allows for easy expressions.

Avoid hooking in Java code during an expression evaluation. The above listener to process the DMN result was one example of this, but a more diabolic example could be the following expression in Camunda 7:

```java
// DON'T DO THIS:
#{ dmnResultChecker.check( riskDMNresult ) }
```

Now, the `dmnResultChecker` is a Spring bean that can contain arbitrary Java logic, possibly even querying some remote service to query whether we currently accept yellow risks or not. Such code can not be executed within Camunda 8 FEEL expressions, and the logic needs to be moved elsewhere.

### Camunda Forms

Finally, while Camunda 7 supports [different types of task forms](https://docs.camunda.org/manual/latest/user-guide/task-forms/), Camunda 8 only supports [Camunda Forms](/guides/utilizing-forms.md) (and will actually be extended over time). If you rely on other form types, you either need to make Camunda Forms out of them or use a bespoke tasklist where you still support those forms.
