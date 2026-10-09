---
id: decision-table-hit-policy
title: Hit policy
description: Specifies what the results of the evaluation of a decision table consist of.
---

![Hit Policy](assets/decision-table/hit-policy.png)

A decision table has a hit policy that specifies what the results of the evaluation of a decision table consist of.

The hit policy is set in the `hitPolicy` attribute on the `decisionTable` XML element. If no hit policy is set, then the
default hit policy `UNIQUE` is used.

```xml

<definitions xmlns="https://www.omg.org/spec/DMN/20191111/MODEL/" id="definitions" name="definitions"
             namespace="http://camunda.org/schema/1.0/dmn">
    <decision id="dish" name="Dish">
        <decisionTable id="decisionTable" hitPolicy="RULE ORDER">
            <!-- .. -->
        </decisionTable>
    </decision>
</definitions>
```

The following hit policies are supported:

<table class="table table-striped">
  <tr>
    <th>Hit Policy</th>
    <th>XML representation</th>
  </tr>
  <tr>
    <td>Unique</td>
    <td>UNIQUE</td>
  </tr>
  <tr>
    <td>Any</td>
    <td>ANY</td>
  </tr>
  <tr>
    <td>First</td>
    <td>FIRST</td>
  </tr>
  <tr>
    <td>Rule order</td>
    <td>RULE ORDER</td>
  </tr>
  <tr>
    <td>Collect</td>
    <td>COLLECT</td>
  </tr>
</table>

## The role of a hit policy

A hit policy specifies how many rules of a decision table can be satisfied and which of the satisfied rules are included
in the decision result.

The hit policies [Unique](#unique), [Any](#any) and [First](#first) will always return a maximum of one satisfied rule.
The hit policies [Rule Order](#rule-order) and [Collect](#collect) can return multiple satisfied rules.

## Unique

Only a single rule can be satisfied or no rule at all. The decision table result contains the output entries of the
satisfied rule.

If more than one rule is satisfied, the Unique hit policy is violated.

Refer to the following decision table.

![Hit Policy Unique](assets/decision-table/hit-policy-unique.png)

Depending on the current season the dish should be chosen. Only one dish can be chosen, since only one season can exist
at the same time.

## Any

Multiple rules can be satisfied. However, all satisfied rules must generate the same output. The decision table result
contains only the output of one of the satisfied rules.

If multiple rules are satisfied which generate different outputs, the hit policy is violated.

Refer to the following example:

![Hit Policy Any](assets/decision-table/hit-policy-any.png)

This is a decision table for the leave application. If the applier has no vacation days left or is currently in the
probation period, the application will be refused. Otherwise the application is applied.

## First

Multiple rules can be satisfied. The decision table result contains only the output of the first satisfied rule.

![Hit Policy First](assets/decision-table/hit-policy-first.png)

Refer to the decision table above for advertisement. Regarding the current age of the user, which advertisement should be
shown is decided. For example, the user is 19 years old. All the rules will match, but since the hit policy is set to
first only, the advertisement for Cars is used.

## Rule order

Multiple rules can be satisfied. The decision table result contains the output of all satisfied rules in the order of
the rules in the decision table.

![Hit Policy Rule Order](assets/decision-table/hit-policy-rule-order.png)

Again, refer to the advertisement example with the rule order policy. Say we have a user at the age of 19 again. All rules
are satisfied so all outputs are given, ordered by the rule ordering. It can perhaps be used to indicate the priority of
the displayed advertisements.

## Collect

Multiple rules can be satisfied. The decision table result contains the output of all satisfied rules in an arbitrary
order as a list.

![Hit Policy Collect](assets/decision-table/hit-policy-collect.png)

With this hit policy, the output list has no ordering. So the advertisement will be arbitrary if, for example, the age
is 19.

Additionally, an aggregator can be specified for the Collect hit policy. If an aggregator is specified, the decision
table result will only contain a single output entry. The aggregator will generate the output entry from all satisfied
rules.

:::info If the Collect hit policy is used with an aggregator, the decision table can only have one output.
:::

The aggregator is set as the `aggregation` attribute of the `decisionTable`
XML element.

```xml

<decisionTable id="decisionTable" hitPolicy="COLLECT" aggregation="SUM">
    <!-- .. -->
</decisionTable>
```

### Aggregators for collect

In the visual representation of the decision table an aggregator can be selected in addition to the `COLLECT` hit
policy. The following aggregators are supported:

<table class="table table-striped">
  <tr>
    <th>Visual representation</th>
    <th>XML representation</th>
    <th>Result of the aggregation</th>
  </tr>
  <tr>
    <td>Collect (Sum)</td>
    <td>SUM</td>
    <td>the sum of all output values</td>
  </tr>
  <tr>
    <td>Collect (Min)</td>
    <td>MIN</td>
    <td>the smallest value of all output values</td>
  </tr>
  <tr>
    <td>Collect (Max)</td>
    <td>MAX</td>
    <td>the largest value of all output values</td>
  </tr>
  <tr>
    <td>Collect (Count)</td>
    <td>COUNT</td>
    <td>the number of output values</td>
  </tr>
</table>

#### SUM aggregator

The SUM aggregator sums up all outputs from the satisfied rules.

![Hit Policy Collect SUM](assets/decision-table/hit-policy-collect-sum.png)

The showed decision table can be used to sum up the salary bonus for an employee. For example, the employee has been
working in the company for 3.5 years. So the first, second and third rule will match and the result of the decision
table is 600, since the output is summed up.

#### MIN aggregator

The MIN aggregator can be used to return the smallest output value of all satisfied rules. Refer to the following example of
a car insurance. After years without a car crash the insurance fee will be reduced.

![Hit Policy Collect MIN](assets/decision-table/hit-policy-collect-min.png)

For example, if the input for the decision table is 3.5 years, the result will be 98.83, since the first three rules
match but the third rule has the minimal output.

#### MAX aggregator

The MAX aggregator can be used to return the largest output value of all satisfied rules.

![Hit Policy Collect MAX](assets/decision-table/hit-policy-collect-max.png)

This decision table represents the decision for the amount of pocket money for a child. Depending of the age, the amount
grows. For example, an input of 9 will satisfy the first and second rules. The output of the second rule is larger then
the output of the first rule, so the output will be 5. A child at the age of 9 will get 5 as pocket money.

#### COUNT aggregator

The COUNT aggregator can be use to return the count of satisfied rules.

![Hit Policy Collect COUNT](assets/decision-table/hit-policy-collect-count.png)

For example, refer to the salary bonus decision table again, this time with the COUNT aggregator. With an input of 4, the
first three rules will be satisfied. Therefore, the result from the decision table will be 3, which means that after 4
years the result of the decision table is 3 salary bonuses.
