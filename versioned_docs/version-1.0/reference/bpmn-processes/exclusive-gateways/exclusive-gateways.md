---
id: exclusive-gateways
title: "Exclusive gateway"
---

An exclusive gateway (aka XOR-gateway) allows to make a decision based on data (i.e. on process instance variables).

![process](assets/exclusive-gateway.png)

If an exclusive gateway has multiple outgoing sequence flows then all sequence flows, except one, **must** have a `conditionExpression` to define when the flow is taken. The gateway can have one sequence flow without `conditionExpression` which must be defined as the default flow.

When an exclusive gateway is entered then the `conditionExpression`s are evaluated. The process instance takes the first sequence flow that condition is fulfilled.

If no condition is fulfilled then it takes the **default flow** of the gateway. In case the gateway has no default flow, an incident is created.

An exclusive gateway can also be used to **join** multiple incoming flows to one, in order to improve the readability of the BPMN. A joining gateway has a pass-through semantic. It doesn't merge the incoming concurrent flows like a parallel gateway.

## Conditions

A `conditionExpression` defines when a flow is taken. It is a [boolean expression](/product-manuals/concepts/expressions.md#boolean-expressions) that can access the process instance variables and compare them with literals or other variables. The condition is fulfilled when the expression returns `true`.

Multiple boolean values or comparisons can be combined as disjunction (`and`) or conjunction (`or`).

For example:

```feel
= totalPrice > 100

= order.customer = "Paul"

= orderCount > 15 or totalPrice > 50

= valid and orderCount > 0
```

## Additional resources

### XML Representation
An exclusive gateway with two outgoing sequence flows:

```xml
<bpmn:exclusiveGateway id="exclusiveGateway" default="else" />

<bpmn:sequenceFlow id="priceGreaterThan100" name="totalPrice &#62; 100"
  sourceRef="exclusiveGateway" targetRef="shipParcelWithInsurance">
  <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">
    = totalPrice &gt; 100
  </bpmn:conditionExpression>
</bpmn:sequenceFlow>

<bpmn:sequenceFlow id="else" name="else"
  sourceRef="exclusiveGateway" targetRef="shipParcel" />
```

### References

- [Expressions](/product-manuals/concepts/expressions.md)
- [Incidents](/product-manuals/concepts/incidents.md)
