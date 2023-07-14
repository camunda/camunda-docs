---
id: migration-readiness
title: How to get ready to migrate
description: "Learn readiness indicators for migrating from Camunda Platform 7 to Camunda Platform 8."
---

:::note
Migration of existing projects to Camunda Platform 8 is optional. Camunda Platform 7 still has ongoing [support](https://docs.camunda.org/enterprise/announcement/).
:::

## Migration overview

Let's discuss if you need to migrate first, before diving into the necessary steps and what tools can help you achieve the migration.

## When to migrate?

New projects should typically be started using Camunda Platform 8.

Existing solutions using Camunda Platform 7 might simply keep running on Camunda Platform 7. The platform has ongoing [support](https://docs.camunda.org/enterprise/announcement/), so there is no need to rush on a migration project.

You should consider migrating existing Camunda Platform 7 solutions if:

- You are looking to leverage a SaaS offering (e.g. to reduce the effort for hardware or infrastructure setup and maintenance).
- You are in need of performance at scale and/or improved resilience.
- You are in need of certain features that can only be found in Camunda Platform 8 (e.g. [BPMN message buffering](/components/concepts/messages.md#message-buffering), big [multi-instance constructs](/components/modeler/bpmn/multi-instance/multi-instance.md), the new Connectors framework, or the improved collaboration features in Web Modeler).

## Prepare for smooth migrations

Sometimes you might not be able to use Camunda Platform 8 right away as described in [What to do When You Can’t Quickly Migrate to Camunda 8](https://camunda.com/blog/2022/05/what-to-do-when-you-cant-quickly-migrate-to-camunda-8/). In this case, you will keep developing Camunda Platform 7 process solutions, but you should establish some practices as quickly as possible to ease migration projects later on.

To implement Camunda Platform 7 process solutions that can be easily migrated, stick to the following rules and development practices:

1. Implement what we call **Clean Delegates** - concentrate on reading and writing process variables, plus business logic delegation. Data transformations will be mostly done as part of your delegate (and especially not as listeners, as mentioned below). Separate your actual business logic from the delegates and all Camunda APIs. Avoid accessing the BPMN model and invoking Camunda APIs within your delegates.
2. Don’t use listeners or Spring beans in expressions to do data transformations via Java code.
3. Don’t rely on an ACID transaction manager spanning multiple steps or resources.
4. Don’t expose Camunda API (REST or Java) to other services or front-end applications.
5. Use primitive variable types or JSON payloads only (no XML or serialized Java objects).
6. Use simple expressions or plug-in FEEL. FEEL is the only supported expression language in Camunda Platform 8. JSONPath is also relatively easy to translate to FEEL. Avoid using special variables in expressions, e.g. `execution` or `task`.
7. Use your own user interface or Camunda Forms; the other form mechanisms are not supported out-of-the-box in Camunda Platform 8.
8. Avoid using any implementation classes from Camunda; generally, those with \*.impl.\* in their package name.
9. Avoid using engine plugins.

We also recommend reviewing [BPMN elements supported in Camunda Platform 8](/components/modeler/bpmn/bpmn-coverage.md), though any feature gap will likely be closed soon.

[Execution Listeners](https://docs.camunda.org/manual/latest/user-guide/process-engine/delegation-code/#execution-listener) and [Task Listeners](https://docs.camunda.org/manual/latest/user-guide/process-engine/delegation-code/#task-listener) are areas in Camunda Platform 8 that are still under discussion. Currently, those use cases need to be solved slightly differently. Depending on your use case, the following Camunda Platform 8 features can be used:

- [Input and output mappings using FEEL](/components/modeler/feel/what-is-feel.md)
- [Tasklist API](/apis-tools/tasklist-api-rest/tasklist-api-rest-overview.md)
- [Operate API](/apis-tools/operate-api/overview.md) including historical info on processes
- [Exporters](/self-managed/zeebe-deployment/exporters/exporters.md)
- Client interceptors
- [Gateway interceptors](/self-managed/zeebe-deployment/zeebe-gateway/interceptors.md)
- [Job workers](/components/concepts/job-workers.md) on user tasks
- [Job workers](/components/concepts/job-workers.md) on service tasks

Expect to soon have a solution in Camunda Platform 8 for most of the problems that listeners solve. Still, it might be good practice to use as few listeners as possible, and especially don’t use them for data mapping as described below.

### Clean Delegates

Given Java Delegates and the workflow engine are embedded as a library, projects can do dirty hacks in their code. Casting to implementation classes? No problem. Using a ThreadLocal or trusting a specific transaction manager implementation? Yeah, possible. Calling complex Spring beans hidden behind a simple JUEL (Java Unified Expression Language) expression? Well, you guessed it — doable!

Those hacks are the real showstoppers for migration, as they simply cannot be migrated to Camunda Platform 8. In fact, [Camunda Platform 8 increased isolation intentionally](https://blog.bernd-ruecker.com/moving-from-embedded-to-remote-workflow-engines-8472992cc371).

Concentrate on what a Java Delegate is intended to do:

1. Read variables from the process and potentially manipulate or transform that data to be used by your business logic.
2. Delegate to business logic — this is where Java Delegates got their name from. In a perfect world, you would simply issue a call to your business code in another Spring bean or remote service.
3. Transform the results of that business logic into variables you write into the process.

Here's an example of a good Java Delegate:

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

Never cast to Camunda implementation classes, use any ThreadLocal object, or influence the transaction manager in any way. Java Delegates should further always be stateless and not store any data in their fields.

The resulting delegate can be easily migrated to a Camunda Platform 8 API, or simply be reused by the [adapter provided in this migration community extension](https://github.com/camunda-community-hub/camunda-7-to-8-migration/).

### No transaction managers

You should not trust ACID [transaction managers](https://blog.bernd-ruecker.com/achieving-consistency-without-transaction-managers-7cb480bd08c) to glue together the workflow engine with your business code. Instead, you need to embrace eventual consistency and make every service task its own transactional step. If you are familiar with Camunda Platform 7 lingo, this means that all BPMN elements will be `async=true`. A process solution that relies on five service tasks to be executed within one ACID transaction, probably rolling back in case of an error, will make migration challenging.

### Don’t expose Camunda API

You should apply the [information hiding principle](https://en.wikipedia.org/wiki/Information_hiding) and not expose too much of the Camunda API to other parts of your application.

In the above example, you should not hand over an execution context to your CrmFacade:

```java
// DO NOT DO THIS!
crmFacade.createCustomer(execution);
```

The same holds true when a new order is placed, and your order fulfillment process should be started. Instead of the frontend calling the Camunda API to start a process instance, you are better off providing your own endpoint to translate between the inbound REST call and Camunda, for example:

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

Camunda Platform 7 provides flexible ways to add data to your process. For example, you could add Java objects that would be serialized as byte code. Java byte code is brittle and also tied to the Java runtime environment.

Another possibility is transforming those objects on the fly to JSON or XML using Camunda Spin. It turned out this was black magic and led to regular problems, which is why Camunda Platform 8 does not offer this anymore. Instead, you should do any transformation within your code before talking to the Camunda API. Camunda Platform 8 only takes JSON as a payload, which automatically includes primitive values.

In the below Java Delegate example, you can see that Spin and Jackson was used in the delegate for JSON to Java mapping:

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

[Camunda Platform 8 uses FEEL as its expression language](/components/modeler/feel/what-is-feel.md). There are big advantages to this decision. Not only are the expression languages between BPMN and DMN harmonized, but also the language is really powerful for typical expressions. One of my favorite examples is the following onboarding demo we regularly show. A decision table will hand back a list of possible risks, whereas every risk has a severity indicator (yellow, red) and a description.

![onboarding demo](https://camunda.com/wp-content/uploads/2022/05/Migrating-to-Camunda-Platform-8-image-1-1024x367.png)

The result of this decision shall be used in the process to make a routing decision:

![routing decision](https://camunda.com/wp-content/uploads/2022/05/Migrate-to-Camunda-Platform-8-25052022-image-2-1024x481.png)

To unwrap the DMN result in Camunda Platform 7, you could write some Java code and attach that to a listener when leaving the DMN task (this is already an anti-pattern for migration as you will read next). The code is not super readable:

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

Additionally, you can even hook in FEEL as the scripting language in Camunda Platform 7 today (as explained by [Scripting with DMN inside BPMN](https://camunda.com/blog/2018/07/dmn-scripting/) or [User Task Assignment based on a DMN Decision Table](https://camunda.com/blog/2020/05/camunda-bpm-user-task-assignment-based-on-a-dmn-decision-table/)).

However, more commonly you will keep using JUEL in Camunda Platform 7. If you write simple expressions, they can be easily migrated automatically, as you can see in [the test case](https://github.com/camunda-community-hub/camunda-7-to-8-migration/blob/main/modeler-plugin-7-to-8-converter/client/JuelToFeelConverter.test.js) of the [migration community extension](https://github.com/camunda-community-hub/camunda-7-to-8-migration). You should avoid more complex expressions if possible.

Very often, a good workaround to achieve this is to adjust the output mapping of your Java Delegate to prepare data in a form that allows for easy expressions.

Avoid hooking in Java code during an expression evaluation. The above listener to process the DMN result was one example of this, but a more diabolic example could be the following expression in Camunda Platform 7:

```java
// DON'T DO THIS:
#{ dmnResultChecker.check( riskDMNresult ) }
```

Now, the dmnResultChecker is a Spring bean that can contain arbitrary Java logic, possibly even querying some remote service to query whether we currently accept yellow risks or not. Such code can not be executed within Camunda 8 FEEL expressions, and the logic needs to be moved elsewhere.

### Camunda Forms

Finally, while Camunda Platform 7 supports [different types of task forms](https://docs.camunda.org/manual/latest/user-guide/task-forms/), Camunda Platform 8 only supports [Camunda Forms](/guides/utilizing-forms.md) (and will actually be extended over time). If you rely on other form types, you either need to make Camunda Forms out of them or use a bespoke tasklist where you still support those forms.

## Migration steps

For migration, you need to look at development artifacts (BPMN models and application code), but also at workflow engine data (runtime and history) in case you migrate a process solution running in production.

The typical steps are:

1. Migrate development artifacts
   1. Adjust your BPMN models (only in rare cases you have to touch your DMN models)
   2. Adjust your development project (remove embedded engine, add Zeebe client)
   3. Refactor your code to use the Zeebe API, likely via a Zeebe client
   4. Refactor your glue code or use [the Java Delegate adapter project](https://github.com/camunda-community-hub/camunda-7-to-8-migration/tree/main/camunda-7-adapter), a community supported tool.
2. Migrate workflow engine data

In general, **development artifacts** _can_ be migrated:

- **BPMN models:** Camunda Platform 8 uses BPMN like Camunda Platform 7 does, which generally allows use of the same model files, but you might need to configure _different extension atrributes_ (at least by using a different namespace). Furthermore, Camunda Platform 8 has a _different coverage_ of BPMN concepts that are supported (see [Camunda Platform 8 BPMN coverage](/components/modeler/bpmn/bpmn-coverage.md) vs [Camunda Platform 7 BPMN coverage](https://docs.camunda.org/manual/latest/reference/bpmn20/)), which might require some model changes. Note that the coverage of Camunda Platform 8 will increase over time.

- **DMN models:** Camunda Platform 8 uses DMN like Camunda Platform 7 does. There are no changes in the models necessary. Some rarely used features of Camunda Platform 7 are not supported in Camunda Platform 8. Those are listed below.

- **CMMN models:** It is not possible to run CMMN on Zeebe, _CMMN models cannot be migrated_. You can remodel cases in BPMN according to [Building Flexibility into BPMN Models](https://camunda.com/best-practices/building-flexibility-into-bpmn-models/), keeping in mind the [Camunda Platform 8 BPMN coverage](/components/modeler/bpmn/bpmn-coverage.md).

- **Application code:** The application code needs to use _a different client library and different APIs_. This will lead to code changes you must implement.

- **Architecture:** The different architecture of the core workflow engine might require _changes in your architecture_ (e.g. if you used the embedded engine approach). Furthermore, certain concepts of Camunda Platform 7 are no longer possible (like hooking in Java code at various places, or control transactional behavior with asynchronous continuations) which might lead to _changes in your model and code_.

In general, **workflow engine data** is harder to migrate to Camunda Platform 8:

- **Runtime data:** Running process instances of Camunda Platform 7 are stored in the Camunda Platform 7 relational database. Like with a migration from third party workflow engines, you can read this data from Camunda Platform 7 and use it to create the right process instances in Camunda Platform 8 in the right state. This way, you can migrate running process instances from Camunda Platform 7 to Camunda Platform 8. [A process instance migration tool](https://github.com/camunda-community-hub/camunda-7-to-8-migration/tree/main/process-instance-migration) is in place to ease this task. This tool is community supported.

- **History data:** Historic data from the workflow engine itself cannot be migrated. However, data in Optimize can be kept.

## Migration tooling

:::note
These tools are community maintained. For more assistance, create an issue on the repo directly.
:::

The [Camunda Platform 7 to Camunda Platform 8 migration tooling](https://github.com/camunda-community-hub/camunda-7-to-8-migration), available as a community extension, contains three components that will help you with migration:

1. [A converter available in different flavors (web app, CLI) to convert BPMN models from Camunda Platform 7 to Camunda Platform 8](https://github.com/camunda-community-hub/camunda-7-to-8-migration/tree/main/backend-diagram-converter). This maps possible BPMN elements and technical attributes into the Camunda Platform 8 format and gives you warnings where this is not possible. The result of a conversion is a model with mapped implementation details as well as hints on what changed, needs to be reviewed, or adjusted in order to function properly in Camunda Platform 8.

2. [The Camunda Platform 7 Adapter](https://github.com/camunda-community-hub/camunda-7-to-8-migration/tree/main/camunda-7-adapter). This is a library providing a worker to hook in Camunda Platform 7-based glue code. For example, it can invoke existing JavaDelegate classes.

3. [A process instance migration tool](https://github.com/camunda-community-hub/camunda-7-to-8-migration/tree/main/process-instance-migration) to migrate running process instances from Camunda Platform 7 to Camunda Platform 8.
