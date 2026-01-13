---
id: resolve-incidents-update-variables
title: Resolve incidents and update variables
description: "Let's examine variable and incidents."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Learn how to resolve incidents and update variables in Camunda 8 Operate.

## Overview

Every process instance created for the [`order-process.bpmn`](/bpmn/operate/order-process.bpmn) process model requires an `orderValue` so the XOR gateway evaluation will happen properly.

Let’s look at a case where `orderValue` is present and was set as a string, but our `order-process.bpmn` model required an integer to properly evaluate the `orderValue` and route the instance.

## Before you begin

To follow this guide, install [`zbctl`](https://github.com/camunda-community-hub/zeebe-client-go/blob/main/cmd/zbctl/zbctl.md), a community-supported command line interface for interacting with Camunda 8.

## Create a process instance

Create a process instance with an `orderValue` of `"99"`:

<Tabs groupId="OS" defaultValue="linux" values={
[
{label: 'Linux', value: 'linux', },
{label: 'macOS', value: 'macos', },
{label: 'Windows', value: 'windows', },
]
}>

<TabItem value='linux'>

```
./bin/zbctl --insecure create instance order-process --variables '{"orderId": "1234", "orderValue":"99"}'
```

</TabItem>

<TabItem value='macos'>

```
./bin/zbctl.darwin --insecure create instance order-process --variables '{"orderId": "1234", "orderValue":"99"}'
```

</TabItem>

<TabItem value='windows'>

```
./bin/zbctl.exe --insecure create instance order-process --variables '{\"orderId\": \"1234\", \
"orderValue\": \"99\"}'
```

</TabItem>
</Tabs>

## Advance an instance to an XOR gateway

To advance the instance to our XOR gateway, we’ll create a job worker to complete the `Initiate Payment` task:

<Tabs groupId="OS" className="tabs-hidden" defaultValue="linux" values={
[
{label: 'Linux', value: 'linux', },
{label: 'macOS', value: 'macos', },
{label: 'Windows', value: 'windows', },
]
}>

<TabItem value='linux'>

```
./bin/zbctl --insecure create worker initiate-payment --handler cat
```

</TabItem>

<TabItem value='macos'>

```
./bin/zbctl.darwin --insecure create worker initiate-payment --handler cat
```

</TabItem>

<TabItem value='windows'>

```
./bin/zbctl.exe --insecure create worker initiate-payment --handler "findstr .*"
```

</TabItem>
</Tabs>

We’ll publish a message that will be correlated with the instance, so we can advance past the `Payment Received` intermediate message catch event:

<Tabs groupId="OS" className="tabs-hidden" defaultValue="linux" values={
[
{label: 'Linux', value: 'linux', },
{label: 'macOS', value: 'macos', },
{label: 'Windows', value: 'windows', },
]
}>

<TabItem value='linux'>

```
./bin/zbctl --insecure publish message "payment-received" --correlationKey="1234"
```

</TabItem>

<TabItem value='macos'>

```
./bin/zbctl.darwin --insecure publish message "payment-received" --correlationKey="1234"
```

</TabItem>

<TabItem value='windows'>

```
./bin/zbctl.exe --insecure publish message "payment-received" --correlationKey="1234"
```

</TabItem>
</Tabs>

In the Operate interface, you should now observe the process instance has an [incident](/components/concepts/incidents.md), which means there’s a problem with process execution that must be fixed before the process instance can progress to the next step.

## Diagnosing and resolving incidents

Operate provides tools for diagnosing and resolving incidents. Let’s go through incident diagnosis and resolution step by step.

When we inspect the process instance, we can observe exactly what our incident is:

1. Click the **Process Instance Key** for the process stuck on the **Order Value?** node.
2. At the top of the instance detail page, click **View** to view the incident details.
3. Observe the error message:

```text
Expected result of the expression 'orderValue >= 100' to be 'BOOLEAN', but was 'NULL'. The evaluation reported the following warnings:
[NOT_COMPARABLE] Can't compare '"99"' with '100'
```

To resolve this incident, we must edit the `orderValue` variable so it’s an integer. To do so, take the following steps:

1. Under **Variables**, click the edit icon next to the `orderValue` variable.
2. Edit the variable by removing the quotation marks.
3. Click the checkmark icon to save the change.

We were able to solve this particular problem by **editing** a variable, but it’s worth noting you can also **add** a variable if a variable is missing from a process instance altogether.

There’s one last step: initiating a “retry” of the process instance. Click the retry icon in the top right corner of the page.

You should now see the incident has been resolved, and the process instance has progressed to the next step.

## Complete a process instance

If you’d like to complete the process instance, create a worker for the `Ship Without Insurance` task:

<Tabs groupId="OS" className="tabs-hidden" defaultValue="linux" values={
[
{label: 'Linux', value: 'linux', },
{label: 'macOS', value: 'macos', },
{label: 'Windows', value: 'windows', },
]
}>

<TabItem value='linux'>

```
./bin/zbctl --insecure create worker ship-without-insurance --handler cat
```

</TabItem>

<TabItem value='macos'>

```
./bin/zbctl.darwin --insecure create worker ship-without-insurance --handler cat
```

</TabItem>

<TabItem value='windows'>

```
./bin/zbctl.exe --insecure create worker ship-without-insurance --handler "findstr .*"
```

</TabItem>
</Tabs>
