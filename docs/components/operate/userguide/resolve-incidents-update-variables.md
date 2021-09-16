---
id: resolve-incidents-update-variables
title: Variables and incidents
---

Every process instance created for the process model used in the getting started tutorial requires an `orderValue` so the XOR gateway evaluation will happen properly. 

Let’s look at a case where `orderValue` is present and was set as a string, but our `order-process.bpmn` model requires an integer to properly evaluate the `orderValue` and route the instance. 

**Linux**

```
./bin/zbctl --insecure create instance order-process --variables '{"orderId": "1234", "orderValue":"99"}'
```

**Mac** 

```
./bin/zbctl.darwin --insecure create instance order-process --variables '{"orderId": "1234", "orderValue":"99"}'
```

**Windows (Powershell)**

```
./bin/zbctl.exe --insecure create instance order-process --variables '{\"orderId\": \"1234\", \
"orderValue\": \"99\"}'
```

To advance the instance to our XOR gateway, we’ll quickly create a job worker to complete the `Initiate Payment` task: 

**Linux**

```
./bin/zbctl --insecure create worker initiate-payment --handler cat
```

**Mac**

```
./bin/zbctl.darwin --insecure create worker initiate-payment --handler cat
```

**Windows (Powershell)**

```
./bin/zbctl.exe --insecure create worker initiate-payment --handler "findstr .*"
```

We’ll publish a message that will be correlated with the instance so we can advance past the `Payment Received` intermediate message catch event: 

**Linux**
```
./bin/zbctl --insecure publish message "payment-received" --correlationKey="1234"
```

**Mac**

```
./bin/zbctl.darwin --insecure publish message "payment-received" --correlationKey="1234"
```

**Windows (Powershell)**

```
./bin/zbctl.exe --insecure publish message "payment-received" --correlationKey="1234"
```

In the Operate interface, you should now see the process instance has an <!-- FIXME: [“Incident”](/reference/incidents.html) --> incident, which means there’s a problem with process execution that must be fixed before the process instance can progress to the next step.

![operate-incident-process-view](./img/operate-process-view-incident_light.png)

Operate provides tools for diagnosing and resolving incidents. Let’s go through incident diagnosis and resolution step by step. 

When we inspect the process instance, we can see exactly what our incident is: `Expected to evaluate condition 'orderValue>=100' successfully, but failed because: Cannot compare values of different types: STRING and INTEGER`

![operate-incident-instance-view](./img/operate-view-instance-incident_light.png)

To resolve this incident, we must edit the `orderValue` variable so it’s an integer. To do so, take the following steps:

1. Click on the edit icon next to the variable you’d like to edit. 

![operate-incident-edit-variable](./img/operate-view-instance-edit-icon_light.png)

2. Edit the variable by removing the quotation marks from the `orderValue` value.
3. Click the checkmark icon to save the change. 

We were able to solve this particular problem by _editing_ a variable, but it’s worth noting you can also _add_ a variable if a variable is missing from a process instance altogether. 

![operate-incident-save-variable-edit](./img/operate-view-instance-save-var-edit_light.png)

There’s one last step: initiating a “retry” of the process instance. There are two places on the process instance page where you can initiate a retry:

![operate-retry-instance](./img/operate-process-retry-incident_light.png)

You should now see the incident has been resolved, and the process instance has progressed to the next step. Well done! 

![operate-incident-resolved-instance-view](./img/operate-incident-resolved_light.png)

If you’d like to complete the process instance, create a worker for the `Ship Without Insurance` task: 

**Linux**

```
./bin/zbctl --insecure create worker ship-without-insurance --handler cat
```

**Mac**

```
./bin/zbctl.darwin --insecure create worker ship-without-insurance --handler cat
```

**Windows (Powershell)**

```
./bin/zbctl.exe --insecure create worker ship-without-insurance --handler "findstr .*"
```

The completed process instance with the path taken:

![operate-incident-resolved-path-view](./img/operate-incident-resolved-path_light.png)
