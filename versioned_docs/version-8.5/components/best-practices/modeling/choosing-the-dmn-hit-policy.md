---
title: Choosing the DMN hit policy
tags:
  - DMN
description: "Hit policies describe different ways (standardized by DMN) to evaluate the rules contained in a decision table."
---

**Hit policies** describe different ways (standardized by DMN) to evaluate the rules contained in a decision table. Different hit policies do not only lead to different results, but typically also require different modes of thinking and reason about the meaning of the entire table. Therefore, it's crucial to not just know the different DMN hit policies, but also to understand the motivations for their existence and the most typical cases for using them.

## Knowing the DMN hit policy basics

A decision table consists of several **rules**, typically represented as rows. When reading such a row, we look at certain **input values** and deduct a certain result represented by **output values**. When using the simplest hit policy **"unique"** (**U**), such rules do **not overlap**: only a single rule must match.

<div dmn="best-practices/choosing-the-dmn-hit-policy-assets/unique.dmn" callouts="header:Season,header:Jacket,header:hitPolicy" />

<span className="callout">1</span>

We define an "input" value **season** here. For every single season ...

<span className="callout">2</span>

... there is a **jacket** defined we want to use, the "output" of the rules here.

<span className="callout">3</span>

The hit policy "**Unique**" (indicated by the character **U**) enforces that rules do **not overlap**: only a single rule must match.

Now consider that we build a decision table with **overlapping rules**. In other words, that means more than one rule may match a given set of input values. We then need one of the **alternative hit policy** indicators to unambiguously understand the decision logic according to which such rules are interpreted.

The hit policy **indicator** is a single character shown in the decision table's top left cell, right beneath the decision's name. The character is the initial letter of one of the defined seven hit policies `U`**nique**, `A`**ny**, `P`**riority**, `F`**irst**, `C`**ollect**, `O`**utput order** and `R`**ule order**. Furthermore, the hit policy 'Collect' may also be used with one of four aggregation operators, actually giving us four more hit policies `C+` (**Sum**), `C<` (**Minimum**), `C<` (**Maximum**) and `C#` (**Number**).

Eight of those eleven hit policies evaluate a decision table to a **single result**. Three hit policies evaluate a decision table to **multiple results**.

### Single result decision tables

Such tables either return the output of only one rule or aggregate the output of many rules into one result. The hit policies to be considered are

- `U`**nique**: Rules do not overlap. Only a single rule can match.

- `F`**irst**: Rules are evaluated from top to bottom. Rules may overlap, but only the first match counts.

- `P`**riority**: Rule outputs are prioritized. Rules may overlap, but only the match with the highest output priority counts.

:::note
Camunda does not yet support the hit policy **priority**. In essence, priorities are specified as an ordered list of output values in decreasing order of priority. Such priorities are therefore independent from rule sequence! Though not yet supported, you can mimic that behavior using hit policy "(**C**)ollect" and determining a priority yourself; for example, by means of an execution listener attached to the end of your business rule task.
:::

- `A`**ny**: Multiple matching rules must not make a difference: all matching rules must lead to the same output.

**Collect** and **aggregate**: The output of all matching rules is aggregated by means of an operator:

- `C+`**Sum**: Add up all the matching rule's distinct outputs.
- `C<`**Minimum**: Take the smallest value of all the matching rule's outputs.
- `C>`**Maximum**: Take the largest value of all the matching rule's outputs.
- `C#`**Number**: Return the number of all the matching rule's distinct outputs.

### Multiple result decision tables

**Multiple result** tables may return the output of multiple rules. The hit policies for such tables are:

- `C`**ollect**: All matching rules result in an arbitrarily ordered list of all the output entries.

- `R`**ule order**: All matching rules result in a list of outputs ordered by the sequence of those rules in the decision table.

- `O`**utput order**: All matching rules result in a list of outputs ordered by their (decreasing) output priority.

:::note
Camunda does not yet support the hit policy **output order**. In essence, output orders are specified as an ordered list of output values in decreasing order of priority. Such priorities are therefore independent from rule sequence! Though not yet supported, you can mimic that behavior using hit policy "(**C**)ollect" and determining an output order yourself; for example, by means of an execution listener attached to the end of your business rule task.
:::

## Understanding DMN hit policy use cases

Most situations can be addressed using different hit policies. In that case, the hit policy will have an effect on the readability and maintainability of the table. Often it is worth trying different varieties until you have a feel for what will work best. In practice, we often use the free [online simulator](https://consulting.camunda.com/dmn-simulator/) to experiment with various alternatives.

### Unique: granting categories of customers a specified discount

Hit policy "**Unique**" will typically make it easy to build a decision table, which ensures your rules are "complete" - in the sense that the rules do not just not overlap but cover all possible input values - so that you do not "forget" anything.

<div dmn="best-practices/choosing-the-dmn-hit-policy-assets/customer-discount.dmn" callouts="header:Category,rowHeader:long-time-silver"/>

<span className="callout">1</span>

The _input_ area of each row specifies a certain **segment** of possible input values.

<span className="callout">2</span>

This row, for example, expresses that _long time silver customers receive a 9% discount_.

Such a use case fits to the hit policy "**Unique**". For such use cases, it is an advantage that this hit policy make your decision logic invalid in case you violate its requirement that your table rules never "overlap": after all, you must not produce ambiguous results.

### First: accepting a customer based on hard criteria

Having said that, the hit policy "**First**" can sometimes make it easier for an organization to reason about decision logic dealing with some criteria that are "harder" (more "clearcut") than others. Furthermore, it can help to make a decision table layout more compact and therefore easier to interpret.

<div dmn="best-practices/choosing-the-dmn-hit-policy-assets/customer-creditworthiness-hard.dmn" callouts="rating:bad,rowHeader:good,rowHeader:declined" />

<span className="callout">1</span>

Assume that everybody in the organization knows that first rule: "Once on the blocklist, never again accepted." The layout and the hit policy of the decision table therefore supports the organization's way of doing business: once we know that single fact about a customer, we don't need to think further.

<span className="callout">2</span>

The following rules from row 2-4 are expressed in an "Accept" manner and might change more often over time. The organization's way of thinking is literally "from top to bottom". Once we find an acceptance rule, we can deal with the customer.

<span className="callout">3</span>

For execution in a decision engine, don't forget to add a rule not accepting any other customers as a last row.

In scenarions dealing with **hard** **exclusion** and **inclusion** criteria, we often don't care that much if the rules overlap, but prefer to argue about very clearcut cases first and about more sophisticated ones later on. Furthermore, the organization's way of thinking and doing business might be better supported by a decision table using the hit policy **First**.

Our experience so far tends to show that it can be more tricky and error prone to argue about a **First** hit policy decision table than it might occur to you at first sight. Therefore, be especially careful and always test your logic in case you are dealing with sensitive business!

### Collect: deciding which groups of people may review an order

With hit policy **collect**, you do not care about the order or any interdependencies between your rules at all. Instead, you just "collect" independent rules and care about the question which rules are applicable to your specific case.

Consider, for example, the question of "who is allowed" to carry out some action, as, for example, reviewing and deciding about incoming orders:

<div dmn="best-practices/choosing-the-dmn-hit-policy-assets/order-review-groups.dmn" />

As a result of this decision table, we will either get `["Sales"]` or `["Management"]` or a list of both groups `["Sales", "Management"]`.

We could use this information to route the order into the applicable group's task lists or control access rights of a configurable software solution, etc. Of course, you could at any time introduce more rules and eventually also differentiate between more groups without changing your software solution.

### Sum: accepting a customer based on soft criteria

Hit policy "collect" may be combined with operators such as **Sum (C+)**, leading to very different use cases. A very typical one is the requirement to evaluate a case based on manyfold factors influencing the overall result.

Assume, for example, that we want to deal with customers we know nothing about. They receive a score of 0. But in case we know something about them, we also weigh in our knowledge:

<div dmn="best-practices/choosing-the-dmn-hit-policy-assets/customer-creditworthiness-soft.dmn" callouts="header:decisionTable,rating:good,income:lowIncome,income:goodIncome" />

<span className="callout">1</span>

The overall creditworthiness is deducted by throwing in many factors.

<span className="callout">2</span>

Here, for example, we give credit in case we made good experiences with the customer in the past.

<span className="callout">3</span>

A very low current income does not matter as long as the customer is not a stranger to us!

<span className="callout">4</span>

On the other hand, as soon as a customer has proof for a good income, they receive five points for "reasonable" income as well as 10 points extra for good income.

Even if we had bad experience with a customer (which means they start from -15), we end up with an overall score of 0 in case the customer has a good income now, and start to accept the customer again.

In scenarions dealing with **soft exclusion** and **inclusion** criteria, we need a mechanism to associate a weight to different scenarios. This is ideally supported by hit policy **Sum (C+)**.
