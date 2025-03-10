---
id: conceptual-differences
title: Conceptual differences
sidebar_label: Conceptual differences
description: Understand conceptual differences with Camunda 7 and Camunda 8 before migrating, such as the embedded engine, different data types, and the expression language.
---

<!--
*Iterate later*
*Todos:*
-   *Mention FEEL Copilot*
-   *Spring Boot solution: Adjust naming to "Camunda SDK" instead of Zeebe*
-   *Camunda Deployment: Mention Camunda 8 Run*
-   *Plugins: Mention Execution Listeners*
-->

When thinking about migration it is important to understand conceptual differences between Camunda 7 and Camunda 8.

## Architectural differences

There are a number of key architectural differences between Camunda 7 and Camunda 8.

### No embedded engine in Camunda 8

Camunda 7 allows embedding the workflow engine as a library in your application. This means both run in the same JVM, share thread pools, and can even use the same data source and transaction manager.

In contrast, **the workflow engine** in Camunda 8, Zeebe, is always **a remote resource** for your application, while the embedded engine mode is not supported.

If you are interested in the reasons **why** we switched our recommendation from embedded to remote workflow engines, refer to the blog post on [moving from embedded to remote workflow engines](https://blog.bernd-ruecker.com/moving-from-embedded-to-remote-workflow-engines-8472992cc371).

The implications for your process solution and the programming model are described below. Conceptually, the only big difference is that with a remote engine, **you cannot share technical [ACID transactions](https://en.wikipedia.org/wiki/ACID)** between your code and the workflow engine. You can read more about it in the blog post on [achieving consistency without transaction managers](https://blog.bernd-ruecker.com/achieving-consistency-without-transaction-managers-7cb480bd08c).

### Different data types

In Camunda 7, you can store different data types, including serialized Java objects.

Camunda 8 only allows storage of **primary data types or JSON** as process variables. This might require some additional data mapping in your code when you set or get process variables.

Camunda 7 provides [Camunda Spin](https://docs.camunda.org/manual/latest/reference/spin/) to ease XML and JSON handling. This is not available with Camunda 8, and ideally you migrate to an own data transformation logic you can fully control (for example, using Jackson).

To migrate existing process solutions that use Camunda Spin heavily, you can still add the Camunda Spin library to your application itself and use its API to do the same data transformations as before in your application code.

### Expression language

Camunda 7 uses [Java Unified Expression Language (JUEL)](https://docs.camunda.org/manual/latest/user-guide/process-engine/expression-language/) as the expression language. In the embedded engine scenario, expressions can even read into beans (Java object instances) in the application.

Camunda 8 uses [Friendly-Enough Expression Language (FEEL)](/components/modeler/feel/what-is-feel.md) and expressions can only access the process instance data and variables.

Most expressions can be converted (see [this code in the diagram converter](https://github.com/camunda-community-hub/camunda-7-to-8-migration/blob/main/backend-diagram-converter/core/src/main/java/org/camunda/community/migration/converter/expression/ExpressionTransformer.java) as a starting point), some might need to be completely rewritten, and some might require an additional service task to prepare necessary data (which may have been calculated on the fly when using Camunda 7).

You can also use the [FEEL copilot](https://feel-copilot.camunda.com/) to rewrite complex expressions for you.

### Different Connector infrastructure

Through Camunda Connect, Camunda 7 provides an HTTP and a SOAP HTTP [Connector](https://docs.camunda.org/manual/latest/reference/connect/). Camunda 8 offers multiple [Connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md) out-of-the-box on a completely different codebase.

To migrate existing Connectors, consider the following options:

- Use the [REST protocol Connector](components/connectors/protocol/rest.md) to leverage an out-of-the-box Connector.
- Create a small bridging layer via custom [job workers](/components/concepts/job-workers.md).

### Multi-tenancy

There are several differences between how [multi-tenancy](/self-managed/concepts/multi-tenancy.md) works in Camunda 7 and Camunda 8:

1. The [one engine per tenant approach from Camunda 7](https://docs.camunda.org/manual/develop/user-guide/process-engine/multi-tenancy/#one-process-engine-per-tenant) isn't possible with Camunda 8. Camunda 8 only provides multi-tenancy through a tenant identifier.
2. In Camunda 7, users can deploy shared resources (processes, decisions, and forms) available to all tenants. In Camunda 8, there are no shared resources. This will be added in the future.
3. In Camunda 7, data is mapped to a `null` tenant identifier, meaning resources are shared by default. In Camunda 8, data is mapped to the `<default>` tenant identifier when multi-tenancy is disabled.
4. [Tenant checks in Camunda 7](https://docs.camunda.org/manual/develop/user-guide/process-engine/multi-tenancy/#disable-the-transparent-access-restrictions) can be disabled to perform admin/maintenance operations. This can't be done in Camunda 8, but an admin user can be authorized to all tenants, which would result in the same thing.
5. If a user tries to trigger a command on a resource mapped to multiple tenants in Camunda 7, an exception is thrown, and [the `tenantId` must be explicitly provided](https://docs.camunda.org/manual/develop/user-guide/process-engine/multi-tenancy/#run-commands-for-a-tenant). However, the Camunda 7 engine will try to infer the correct `tenantId` as much as possible. Users in Camunda 7 that are authorized for multiple tenants may perform a lot more operations without providing a `tenantId`. This inference in the Zeebe Broker doesn't happen in Camunda 8, and Zeebe asks users to provide the `tenantId` explicitly.

## Process solutions using Spring Boot

With Camunda 7, a frequented architecture to build a process solution (also known as process applications) is composed out of:

- Java
- Spring Boot
- Camunda Spring Boot Starter with embedded engine
- Glue code implemented in Java delegates (being Spring beans)

This is visualized on the left-hand side of the following image. With Camunda 8, a comparable process solution would look like the right-hand side of the picture and leverage:

- Java
- Spring Boot
- Spring Zeebe Starter (embedding the Zeebe client)
- Glue code implemented as workers (being Spring beans)

![Diagram showing the spring boot architecture](../img/architecture-spring-boot.png)

The difference is that the engine is no longer embedded, which is also our latest [greenfield stack recommendation in Camunda 7](/components/best-practices/architecture/deciding-about-your-stack-c7.md#the-java-greenfield-stack). If you are interested in the reasons why Camunda switched our recommendation from embedded to remote workflow engines, refer to this blog post on [moving from embedded to remote workflow engines](https://blog.bernd-ruecker.com/moving-from-embedded-to-remote-workflow-engines-8472992cc371).

The packaging of a process solution is the same with Camunda 7 and Camunda 8. Your process solution is one Java application that consists of your BPMN and DMN models, as well as all glue code needed for connectivity or data transformation. The big difference is that the configuration of the workflow engine itself is not part of the Spring Boot application anymore.

![Process Solution Packaging](../img/process-solution-packaging.png)

:::note
Process solution definition is taken from [Practical Process Automation](https://processautomationbook.com/).
:::

You can find a complete Java Spring Boot example, showing the Camunda 7 process solution alongside the comparable Camunda 8 process solution in the [Camunda 7 to Camunda 8 migration example](https://github.com/camunda-community-hub/camunda-7-to-8-migration/tree/main/example).

## Programming model

The programming models of Camunda 7 and Camunda 8 are very similar if you program in Java and use Spring.

For example, a worker in Camunda 8 can be implemented as follows (using the [Spring Zeebe SDK](../../apis-tools/spring-zeebe-sdk/getting-started.md)):

```java
@JobWorker(type = "payment")
public void retrievePayment(ActivatedJob job) {
  // Do whatever you need to, for example invoke a remote service:
  String orderId = job.getVariablesMap().get("orderId");
  paymentRestClient.invoke(...);
}
```

:::info

- You can find more information on the programming model in Camunda 8 in this blog post on [how to write glue code without Java Delegates in Camunda Cloud](https://blog.bernd-ruecker.com/how-to-write-glue-code-without-java-delegates-in-camunda-cloud-9ec0495d2ba5).
- You can check out [code conversion patterns](../code-conversion/) for more details.

:::

<!--
:::note
JUnit testing with an embedded in-memory engine is also possible with Camunda 8, see the [Spring Zeebe SDK documentation](../../apis-tools/spring-zeebe-sdk/getting-started.md).
:::
-->

## Other process solution architectures

Besides Spring Boot, there are other environments used to build process solutions.

### Container-managed engine (Tomcat, WildFly, WebSphere & co)

Camunda 8 doesn't provide integration into Jakarta EE application servers like Camunda 7 does. Instead, Jakarta EE applications need to manually add the Zeebe client library. The implications are comparable to what is described for Spring Boot applications in this guide.

![A diagram showing a container-managed engine](../img/architecture-container-managed.png)

### CDI or OSGI

Due to limited adoption, there is no support for CDI or OSGI in Camunda 8. A lightweight integration layer comparable to the [Spring Zeebe SDK](../../apis-tools/spring-zeebe-sdk/getting-started.md) may be provided in the future.

### Polyglot applications (C#, Node.js)

When you run your application in Node.js or C#, for example, you exchange one remote engine (Camunda 7) with another (Camunda 8). As Zeebe comes with a different API, you need to adjust your source code. Zeebe does not use REST as API technology, but gRPC, and you will need to leverage a [client library](apis-tools/working-with-apis-tools.md#deploy-processes-start-process-instances-and-more-using-zeebe-client-libraries) instead.

![A diagram showing a polygot application architecture](../img/architecture-polyglot.png)

## Plugins

[**Process engine plugins**](https://docs.camunda.org/manual/latest/user-guide/process-engine/process-engine-plugins/) are not available in Camunda 8, as such plugins can massively change the behavior or even harm the stability of the engine. Some use cases might be implemented using [exporters](/self-managed/concepts/exporters.md) or [interceptors](self-managed/zeebe-deployment/zeebe-gateway/interceptors.md#implementing-an-interceptor).

:::note
Exporters are only available for Self-Managed Zeebe clusters and are not available in Camunda 8 SaaS.
:::

Migrating **Desktop Modeler Plugins** is generally possible, as the same modeler infrastructure is used.

**Cockpit or Tasklist plugins** _cannot_ be migrated.
