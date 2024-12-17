---
title: "Invoking services from a Camunda 7 process"
tags:
  - Service
  - Java Delegate
  - Expression Language
  - External Task
  - REST
  - SOAP
  - JMS
  - Camel
  - ESB
  - SQL
  - SAP
---

:::caution Camunda 7 only
This best practice targets Camunda 7.x only! If you are using Camunda 8, visit [connecting the workflow engine with your world](../connecting-the-workflow-engine-with-your-world/).
:::

Access business logic implemented for the Java VM and remote services by means of small pieces of glue code. This glue code maps process input/output to your business logic by means of best-of-breed libraries of your own choosing.

In most cases, you should use a pull approach, where external worker threads query Camunda for **external tasks**. Sometimes, you might also attach **JavaDelegates** to your model, and in case you need to define totally self-contained BPMN process definitions, you may want to leverage scripts or expressions for small pieces of logic.

## Understanding the possibilities

### Push and pull

There are two patterns available to glue your code to a process model:

- **Push:** The process engine actively issues a **service call** (or executes a **script**) via the mechanisms described below. The workflow engine pushes the work.
- **Pull:** External worker threads query the process engine API for **external tasks**, and they pull the work. Then, they do the actual work and notify the process engine of works completion.

### External tasks

An **external task** is a task that waits to be completed by some external service worker without explicitly calling that service. It's configured by declaring a **topic** (which characterizes the type of the service). The Camunda API must be polled to retrieve open external tasks for a certain service's topic and must be informed about the completion of a task:

![External task pattern](invoking-services-from-the-process-assets/external-task-pattern.png)

The interaction with the external task API can be done in two different ways:

- Use [Camunda's external task client libraries](https://docs.camunda.org/manual/latest/user-guide/ext-client/) for [Java](https://github.com/camunda/camunda-external-task-client-java) or [Node.js](https://github.com/camunda/camunda-external-task-client-js). These libraries make it very easy to implement your external task worker.

- Create your own client for Camunda's REST API based on the [Camunda OpenAPI specification](https://docs.camunda.org/manual/latest/reference/rest/openapi/), probably via code generation. This approach allows you to generate code for every programming language and also covers the full REST API, not only external tasks.

Using external tasks comes with the following advantages:

- **Temporal decoupling**: The pattern can replace a message queue between the service task (the "consumer") and the service implementation (the "provider"). It can eliminate the need for operating a dedicated message bus while keeping the decoupling that messaging would provide.

- **Polyglot architectures**: The pattern can be used to integrate .NET based services, for example, when it might not be that easy to write Java delegates to call them. Service implementations are possible in any language that can be used to interact with a REST API.

- **Better scaling**: The pattern allows you to start and stop workers as you like, and run as many of them as you need. By doing so, you can scale each service task (or to be precise, each "topic") individually.

- **Connect cloud and on-premises**: The pattern supports you in running Camunda somewhere in the cloud (as our customers often do), because you can still have services on-premises, as they can now query their work via REST over SSL, which is also quite firewall-friendly.

- **Avoid timeouts**: The pattern allows you to asynchronously call long-running services, which eventually block for hours (and would therefore cause transaction and connection timeouts when being called synchronously).

- **Run services on specialized hardware**: Each worker can run in the environment that is best suited for the specific task of that worker; for example, CPU-optimized cloud instances for complex image processing and memory-optimized instances for other tasks.

Learn more about external tasks in the [use guide](https://docs.camunda.org/manual/latest/user-guide/process-engine/external-tasks/) as well as the [reference](https://docs.camunda.org/manual/latest/reference/bpmn20/tasks/service-task/#external-tasks) and explore the video processing example shown above in greater detail by reading the [blog post](https://blog.camunda.org/post/2015/11/external-tasks/) about it.

:::note
Camunda 8 focuses on the external task pattern, there are no Java delegates available as explained in [this blog post](https://blog.bernd-ruecker.com/how-to-write-glue-code-without-java-delegates-in-camunda-cloud-9ec0495d2ba5).
:::

### Java delegates

A Java delegate is a simple Java class that implements the Camunda `JavaDelegate` interface. It allows you to use **dependency injection** as long as it is constructed as a Spring or CDI bean and connected to your BPMN `serviceTask` via the `camunda:delegateExpression` attribute:

```xml
<serviceTask id="service_task_publish_on_twitter" camunda:delegateExpression="#{tweetPublicationDelegate}" name="Publish on Twitter">
</serviceTask>
```

Leverage dependency injection to get access to your _business service_ beans from the delegate. Consider a delegate to be a semantical part of the process definition in a wider sense: it is taking care of the nuts and bolts needed to wire the business logic to your process. Typically, it does the following:

1. Data Input Mapping
2. Calling a method on the business service
3. Data Output Mapping

:::note
Avoid programming business logic into Java delegates. Separate this logic by calling one of your own classes as a business service, as shown below.
:::

```java
@Named
public class TweetPublicationDelegate implements JavaDelegate {

  @Inject
  private TweetPublicationService tweetPublicationService;

  public void execute(DelegateExecution execution) throws Exception {
    String tweet = new TwitterDemoProcessVariables(execution).getTweet(); // <1>
    // ...
    try {
      tweetPublicationService.tweet(tweet); // <2>
    } catch (DuplicateTweetException e) {
      throw new BpmnError("duplicateMessage"); // <3>
    }
  }
  //...
```

<span className="callout">1</span>

Retrieving the value of this process variable belongs to what we call the **input mapping** of the delegate code, and is therefore considered to be part of the wider process definition.

<span className="callout">2</span>

This method executes process engine-independent **business logic**. It is therefore not part of the wider process definition anymore and placed in a separate business service bean.

<span className="callout">3</span>

This exception is process engine-specific and therefore typically not produced by your business service method. It's part of the **output mapping** that we need to translate the business exception to the exception needed to drive the process - again code being part of the "wider" process definition and to be implemented in the Java delegate.

In case you want to create Java delegates that are **reusable** for other process definitions, leverage [field injection](https://docs.camunda.org/manual/latest/user-guide/process-engine/delegation-code/#field-injection) to pass configuration from the BPMN process definition to your Java delegate.

One advantage of using Java delegates is that, if you develop in Java, this is a very simple way to write code and connect it with your process model, especially in embedded engine scenarios.

## Selecting the implementation approach

### General recommendation

In general, we _recommend to use external tasks_ to apply a general architecture and mindset, that allows to [leverage Camunda 8 easier](/guides/migrating-from-camunda-7/migration-readiness.md#prepare-for-smooth-migrations). This typically outweighs the following downsides of external tasks:

- A slightly increased complexity for Java projects, because they have to handle separate Java clients.
- A slightly increased overhead compared to Java delegates, as all communication with the engine is remote, even if it runs in the same Java VM.

Only if the increased latency does not work for your use case, for example, because you need to execute a 30-task process synchronously to generate a REST response within a handful of milliseconds, should you then consider Java delegates (or also consider switching to use Camunda 8).

### Detailed comparison

<table>
	<tbody>
		<tr>
      <th class="tableblock halign-left valign-top" rowspan="3" />
			<th class="tableblock halign-center valign-middle" colspan="2">
				<p class="tableblock">Java delegate</p>
			</th>
			<th class="tableblock halign-center valign-middle" rowspan="2">
				<p class="tableblock">Expression</p>
			</th>
			<th class="tableblock halign-center valign-middle" rowspan="2">
				<p class="tableblock">Connector</p>
			</th>
			<th class="tableblock halign-center valign-middle" rowspan="2">
				<p class="tableblock">External Task</p>
			</th>
			<th class="tableblock halign-center valign-middle" rowspan="2">
				<p class="tableblock">Script Task</p>
			</th>
		</tr>
    		<tr>
			<th class="tableblock halign-center valign-top">
				<p class="tableblock">Named Bean</p>
			</th>
			<th class="tableblock halign-center valign-top">
				<p class="tableblock">Java Class</p>
			</th>
		</tr>
		<tr>
			<td class="tableblock halign-center valign-top" colspan="2">
				<p class="tableblock">
					Call a named bean or java class implementing the 
					<code>JavaDelegate</code> interface.
				</p>
			</td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">Evaluate an expression using JUEL.</p>
			</td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">
				Use a configurable Connector
					<br />
(REST or SOAP services provided out-of-the-box).
				</p>
			</td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">
					Pull a service task into an external worker thread and inform process engine of
completion.
				</p>
			</td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">Execute a script inside the engine.</p>
			</td>
		</tr>
    		<tr>
			<th class="tableblock halign-left valign-top">
				<p class="tableblock">
					Use with
					<br />
  				BPMN elements.
				</p>
			</th>
			<th class="tableblock halign-center valign-middle" colspan="5">
				<p class="tableblock">
					<span class="image">
						<img src="/img/bpmn-elements/task-service.svg" alt="task service" />
					</span>
					<span class="image">
						<img src="/img/bpmn-elements/message-intermediate-send.svg" alt="message intermediate send" />
					</span>
					<span class="image">
						<img src="/img/bpmn-elements/task-send.svg" alt="task send" />
					</span>
				</p>
			</th>
			<th class="tableblock halign-center valign-middle">
				<p class="tableblock">
					<span class="image">
						<img src="/img/bpmn-elements/task-script.svg" alt="task script" />
					</span>
				</p>
			</th>
		</tr>
		<tr>
			<th class="tableblock halign-left valign-top">
				<p class="tableblock">Communication Direction</p>
			</th>
			<td class="tableblock halign-center valign-top" colspan="4">
				<p class="tableblock">
					<strong>Push</strong>
					<br />
   work item by issuing service call.
				</p>
			</td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">
					<strong>Pull</strong>
					<br />
 task from worker thread.
				</p>
			</td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">
					<strong>Push</strong> work item by executing a script.
				</p>
			</td>
		</tr>
		<tr>
			<th class="tableblock halign-left valign-top">
				<p class="tableblock">Technology</p>
			</th>
			<td class="tableblock halign-center valign-top" colspan="3">
				<p class="tableblock">Use your preferred framework, e.g. a JAX-WS client to call SOAP Web Services.</p>
			</td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">Use REST/SOAP Connector and Message Template</p>
			</td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">Use Camunda External Task Client or REST API to query for work.</p>
			</td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">Use JSR-223 compliant scripting engine.</p>
			</td>
		</tr>
		<tr>
			<th class="tableblock halign-left valign-top">
				<p class="tableblock">
				  Implement
					<br />
  				via
				</p>
			</th>
			<td class="tableblock halign-center valign-top" colspan="2">
				<p class="tableblock">Java (in same JVM)</p>
			</td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">
				  Expression Language
(can reference Java code)
				</p>
			</td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">BPMN configuration</p>
			</td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">BPMN configuration and external pull logic</p>
			</td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">E.g. Groovy, JavaScript, JRuby or Jython</p>
			</td>
		</tr>
		<tr>
			<th class="tableblock halign-left valign-top">
				<p class="tableblock">Code Completion and Refactoring</p>
			</th>
			<td class="tableblock halign-center valign-middle">
				<p class="tableblock">
					&#10004;
				</p>
			</td>
			<td class="tableblock halign-center valign-middle">
				<p class="tableblock">
					&#10004;
				</p>
			</td>
			<td class="tableblock halign-center valign-middle">
				<p class="tableblock">Maybe</p>
			</td>
			<td class="tableblock halign-center valign-middle" />
			<td class="tableblock halign-center valign-middle">
				<p class="tableblock">
					&#10004;
				</p>
			</td>
			<td class="tableblock halign-center valign-middle">
				<p class="tableblock">Depends on language / IDE</p>
			</td>
		</tr>
		<tr>
			<th class="tableblock halign-left valign-top">
				<p class="tableblock">Compiler Checks</p>
			</th>
			<td class="tableblock halign-center valign-middle">
				<p class="tableblock">
					&#10004;
				</p>
			</td>
			<td class="tableblock halign-center valign-middle">
				<p class="tableblock">
					&#10004;
				</p>
			</td>
			<td class="tableblock halign-center valign-middle" />
			<td class="tableblock halign-center valign-middle" />
			<td class="tableblock halign-center valign-middle">
				<p class="tableblock">
					&#10004;
				</p>
			</td>
			<td class="tableblock halign-center valign-middle">
				<p class="tableblock">Depends on language / IDE</p>
			</td>
		</tr>
		<tr>
			<th class="tableblock halign-left valign-top">
				<p class="tableblock">Dependency Injection</p>
			</th>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">
					&#10004;
					<br />
 (when using Spring, CDI, ...)
				</p>
			</td>
			<td class="tableblock halign-center valign-top" />
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">
					&#10004;
					<br />
 (when using Spring, CDI, ...​)
				</p>
			</td>
			<td class="tableblock halign-center valign-top" />
			<td class="tableblock halign-center valign-top" />
			<td class="tableblock halign-center valign-top" />
		</tr>
		<tr>
			<th class="tableblock halign-left valign-top">
				<p class="tableblock">Forces on Testing</p>
			</th>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">Register mocks instead of original beans.</p>
			</td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">Mock business logic inside the JavaDelegate.</p>
			</td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">Register mocks instead of original beans.</p>
			</td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">Difficult because of lack of dependency injection.</p>
			</td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">Easy, as service is not actively called.</p>
			</td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">Consider external script resources.</p>
			</td>
		</tr>
		<tr>
			<th class="tableblock halign-left valign-top">
				<p class="tableblock">Configure via</p>
			</th>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">
				  BPMN Attribute
					<br />
					<code>
					  serviceTask
						<br />
 camunda:
						<br />
 delegate
						<br />
  Expression
					</code>
				</p>
			</td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">
				  BPMN Attribute
					<br />
					<code>
					  serviceTask
						<br />
  camunda:
						<br />
  class
					</code>
				</p>
			</td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">
				  BPMN Attribute
					<br />
					<code>
					  serviceTask
						<br />
  camunda:
						<br />
  expression
					</code>
				</p>
			</td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">
				  BPMN Ext. Element+
 
					<code>
					  serviceTask
						<br />
  camunda:
						<br />
  connector
					</code>
				</p>
			</td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">
				  BPMN Attributes
					<br />
					<code>
					  serviceTask
						<br />
  camunda:
						<br />
  type=
						<br />
  'external' and
						<br />
  'camunda:topic'
					</code>
				</p>
			</td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">
				  BPMN Element
					<br />
					<code>script</code> or
					<br />
 BPMN Attribute
					<br />
					<code>
					  scriptTask
						<br />
 camunda:
						<br />
 resource
					</code>
				</p>
			</td>
		</tr>
		<tr>
			<th class="tableblock halign-left valign-top">
				<p class="tableblock">Fault Tolerance and Retrying</p>
			</th>
			<td class="tableblock halign-center valign-top" colspan="4">
				<p class="tableblock">Handled by Camunda retry strategies and incident management.</p>
			</td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">Lock tasks for a defined time. Use Camunda’s retry and incident management.</p>
			</td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">Handled by Camunda retry strategies and incident management.</p>
			</td>
		</tr>
		<tr>
			<th class="tableblock halign-left valign-top">
				<p class="tableblock">Scaling (having multiple Worker Threads)</p>
			</th>
			<td class="tableblock halign-center valign-top" colspan="4">
				<p class="tableblock">Via load balancer in front of service</p>
			</td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">Multiple worker threads can be started.</p>
			</td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">Via job executor configuration</p>
			</td>
		</tr>
		<tr>
			<th class="tableblock halign-left valign-top">
				<p class="tableblock">Throttling (e.g. one request at a time)</p>
			</th>
			<td class="tableblock halign-center valign-top" colspan="4">
				<p class="tableblock">Not possible out-of-the-box, requires own throttling logic being implemented.</p>
			</td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">Start or stop exactly as many worker threads you need.</p>
			</td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">Not possible out-of-the-box.</p>
			</td>
		</tr>
		<tr>
			<th class="tableblock halign-left valign-top">
				<p class="tableblock">Reusable Tasks</p>
			</th>
			<td class="tableblock halign-center valign-top" colspan="2">
				<p class="tableblock">
          Use <a href="https://docs.camunda.org/manual/7.12/user-guide/process-engine/delegation-code/#field-injection">field injection</a>
				</p>
			</td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">Use method parameters.</p>
			</td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">
          Build your own <a href="https://docs.camunda.org/manual/7.12/reference/connect/">Connector</a>
				</p>
			</td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">
          Reuse <a href="https://docs.camunda.org/manual/7.12/user-guide/process-engine/external-tasks/">external task</a> topics and configure service via variables.
				</p>
			</td>
			<td class="tableblock halign-center valign-top" />
		</tr>
		<tr>
			<th class="tableblock halign-left valign-top">
				<p class="tableblock">Use when</p>
			</th>
			<td class="tableblock halign-center valign-top" colspan="2">
        If external tasks do not work for your use case
      </td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">Defining small pieces of logic directly in BPMN</p>
			</td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">Defining a self-contained BPMN process without Java code</p>
			</td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">
					<strong>Always</strong> if there is no reason against it
				</p>
			</td>
			<td class="tableblock halign-center valign-top">
				<p class="tableblock">Defining BPMN processes without Java code.</p>
			</td>
		</tr>
		<tr>
			<th class="tableblock halign-left valign-top" />
			<th class="tableblock halign-center valign-top" colspan="2">
				<p class="tableblock">
					<a href="https://docs.camunda.org/manual/7.12/user-guide/process-engine/delegation-code/#java-delegate">Learn more</a>
				</p>
			</th>
			<th class="tableblock halign-center valign-top">
				<p class="tableblock">
					<a href="https://docs.camunda.org/manual/7.12/user-guide/process-engine/expression-language/#delegation-code">Learn more</a>
				</p>
			</th>
			<th class="tableblock halign-center valign-top">
				<p class="tableblock">
					<a href="https://docs.camunda.org/manual/7.12/user-guide/process-engine/connectors/">Learn more</a>
				</p>
			</th>
			<th class="tableblock halign-center valign-top">
				<p class="tableblock">
					<a href="https://docs.camunda.org/manual/7.12/reference/rest/external-task/">Learn more</a>
				</p>
			</th>
			<th class="tableblock halign-center valign-top">
				<p class="tableblock">
					<a href="https://docs.camunda.org/manual/7.12/user-guide/process-engine/scripting/">Learn more</a>
				</p>
			</th>			
		</tr>
	</tbody>
</table>

## Dealing with problems and exceptions

When invoking services, you can experience faults and exceptions. Refer to our separate best practices about:

- [Understanding Camunda 7 transaction handling](../understanding-transaction-handling-c7/)
- [Dealing with problems and exceptions](../dealing-with-problems-and-exceptions/).

## Example technology solutions

### Calling SOAP web services

When you need to call a SOAP web service, you will typically be given access to a machine-readable, WSDL-based description of the service. You can then use [JAX-WS](http://docs.oracle.com/javaee/6/tutorial/doc/bnayl.html) and (for example) Apache CXF's [JAX-WS client generation](http://cxf.apache.org/docs/maven-cxf-codegen-plugin-wsdl-to-java.html) to generate a Java Web Service Client by making use of a Maven plugin. That client can be called from within your JavaDelegate.

Find a full example that uses JAX-WS client generation in the [Camunda examples repository](https://github.com/camunda/camunda-bpm-examples/tree/master/servicetask/soap-cxf-service).

We typically prefer the client code generation over using the [Camunda SOAP Connector](https://docs.camunda.org/manual/latest/user-guide/process-engine/connectors/), because of the better IDE support to do the data mapping by using code completion. You also can leverage standard testing approaches and changes in the WSDL will re-trigger code-generation and your compiler will check for any problems that arise from a changed interface. However, if you need a self-contained BPMN XML without any additional Java code, the connector could be the way to go. Refer to [SOAP Connector example](https://github.com/camunda/camunda-bpm-examples/tree/master/servicetask/soap-service).

### Calling REST web services

If you need to call a REST web service, you will typically be given access to a human-readable documentation of the service. You can use standard Java REST client libraries like [RestEasy](http://resteasy.jboss.org) or [JAX-RS](http://docs.oracle.com/javaee/6/tutorial/doc/giepu.html) to write a Java REST service client that can be called from within a JavaDelegate.

We typically prefer writing Java clients over the [Camunda REST Connector](https://docs.camunda.org/manual/latest/user-guide/process-engine/connectors/), because of the better IDE support to do the data mapping by using code completion. This way, you also can leverage standard testing approaches. However, if you need a self-contained BPMN XML without any additional Java code, the Connector could be the way to go. Refer to the [REST Connector example](https://github.com/camunda/camunda-bpm-examples/tree/master/servicetask/rest-service).

### Sending JMS messages

When you need to send a JMS message, use a plain Java Client and invoke it from a service task in your process; for example, by using a Camunda Java delegate:

```java
@Named("jmsSender")
public class SendJmsMessageDelegate implements JavaDelegate {

  @Resource(mappedName = "java:/queue/order")
  private Queue queue;

  @Resource(mappedName = "java:/JmsXA")
  private QueueConnectionFactory connectionFactory;

  public void execute(DelegateExecution execution) throws Exception {
    String correlationId = UUID.randomUUID().toString(); // <1>
    execution.setVariable("jmsCorrelationId", correlationId);

    Connection connection = connectionFactory.createConnection(); // <2>
    Session session = connection.createSession(true, Session.AUTO_ACKNOWLEDGE);
    MessageProducer producer = session.createProducer(queue);

    TextMessage message = session.createTextMessage( // <3>
      "someOwnContent, e.g. Tweet Object Data, plus " + correlationId); // <4>
    producer.send(message);

    producer.close();
    session.close();
    connection.close();
  }

}
```

<span className="callout">1</span>

Consider what information you can use to correlate back an asynchronous response to your process instance. We typically prefer a generated, artificial UUID for communication, which the waiting process will also need to remember.

<span className="callout">2</span>

You will need to open and close JMS connections, sessions, and producers. Note that this example just serves to get you started. In real life, you will need to decide which connections you need to open, and of course, properly close.

<span className="callout">3</span>

You will need to create and send your specific message.

<span className="callout">4</span>

Add relevant business data to your message together with correlation information.

:::danger
This example just serves to get you started. In real life, consider whether you need to encapsulate the JMS client in a separate class and just wire it from the Java delegate. Also decide which connections you need to open and close properly at which peristaltic points.
:::

On GitHub, you can find a more complete example for [asynchronous messaging with JMS](https://github.com/camunda/camunda-consulting/tree/master/snippets/asynchronous-messaging-jms).

### Using SQL to access the database

Use plain JDBC if you have simple requirements. Invoke your SQL statement from a service task in your process; for example, by using a Camunda Java delegate:

```java
@Named("simpleSqlDelegate")
public class simpleSqlDelegate implements JavaDelegate {

  @Resource(name="customerDB")
  private javax.sql.DataSource customerDB;

  public void execute(DelegateExecution execution) throws Exception {
    Statement statement = null;
    Connection connection = null;

    try {
      connection = customerDB.getConnection();
      String query = "SELECT name " +  // <1>
                     "FROM customer " +
                     "WHERE id = ?";
      statement = connection.createStatement();
      statement.setString(1, execution.getProcessBusinessKey()); // <2>
      ResultSet resultSet = stmt.executeQuery(query);
      if (resultSet.next()) {
        execution.setVariable("customerName", resultSet.getString("name")); // <3>
      }
    } finally {
      if (statement != null) statement.close();
      if (connection != null) connection.close();
    }

}
```

<span className="callout">1</span>

You will need to define your SQL statement. Consider using prepared statements if you want to execute a statement object many times.

<span className="callout">2</span>

You will typically need to feed parameters into your SQL query that are already known during execution of the process instance...

<span className="callout">3</span>

...and deliver back a potential result that maybe needed later in the process.

:::danger
This example just serves to get you started. For real life, consider whether you need to encapsulate the JDBC code in a separate class and just wire it from the Java delegate. Also decide which connections you need to open and close properly at which point.
:::

Note that the Camunda process engine will have opened a database transaction for its own persistence purposes when calling the Java delegate shown above. You will need to make a conscious decision if you want to join that transaction (and set up your TX management accordingly).

Instead of invoking SQL directly, consider using [JPA](http://www.oracle.com/technetwork/java/javaee/tech/persistence-jsp-140049.html) if you have more complex requirements. Its object/relational mapping techniques will allow you to bind database tables to Java objects and abstract from specific database vendors and their specific SQL dialects.

### Calling SAP systems

To call a **SAP** system, you have the following options:

- Use REST or SOAP client calls, connecting Camunda to **SAP Netweaver Gateway** or **SAP Enterprise Services**.

- Use **SAP's Java Connectors (JCo)**. Consider using some frameworks to make this easier, like the open source frameworks of [Hibersap](https://github.com/hibersap).

### Executing a Groovy script

A script task...

<img src="/img/bpmn-elements/task-script.svg" />

&nbsp;...is defined by specifying the script and the `scriptFormat`.

```xml
<scriptTask id='theScriptTask' scriptFormat='groovy' camunda:resultVariable="size">
  <script>anArray.size()</script>
</scriptTask>
```

For more extensive code (which should also be tested separately), consider using scripts external to your BPMN file and reference them with a `camunda:resource` attribute on the `scriptTask`.

Learn more about the many ways scripts can be used with Camunda from our [user guide](https://docs.camunda.org/manual/latest/user-guide/process-engine/scripting/).
