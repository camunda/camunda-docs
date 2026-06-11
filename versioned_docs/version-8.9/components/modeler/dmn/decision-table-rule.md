---
id: decision-table-rule
title: Rule
description: Specify conditions and conclusions.
---

![Rule](assets/decision-table/rule.png)

A decision table can have one or more rules. Each rule contains input and output entries. The input entries are the
condition and the output entries the conclusion of the rule. If each input entry (condition) is satisfied, then the rule
is satisfied and the decision result contains the output entries
(conclusion) of this rule.

A rule is represented by a `rule` element inside a `decisionTable` XML element.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="https://www.omg.org/spec/DMN/20191111/MODEL/" id="definitions" name="definitions"
             namespace="http://camunda.org/schema/1.0/dmn">
    <decision id="dish" name="Dish">
        <decisionTable id="decisionTable">
            <!-- ... -->
            <rule id="rule2-950612891-2">
                <inputEntry id="inputEntry21">
                    <text>"Winter"</text>
                </inputEntry>
                <inputEntry id="inputEntry22">
                    <text><![CDATA[<= 8]]></text>
                </inputEntry>
                <outputEntry id="outputEntry2">
                    <text>"Roastbeef"</text>
                </outputEntry>
            </rule>
            <!-- ... -->
        </decisionTable>
    </decision>
</definitions>
```

## Input entry

![Input Entry](assets/decision-table/input-entry.png)

A rule can have one or more input entries, which are the conditions of the rule. Each input entry contains an expression
in a `text` element as child of an
`inputEntry` XML element.

The expression language of the input entry is [FEEL](/components/modeler/feel/language-guide/feel-unary-tests.md) (unary-tests).

The input entry is satisfied when the evaluated expression returns `true`.

```xml

<inputEntry id="inputEntry41">
    <text>"Spring"</text>
</inputEntry>
```

### Empty input entry

In case an input entry is irrelevant for a rule, the expression is empty, which is always satisfied. In FEEL, an empty
input entry is represented by a `-`.

```xml

<inputEntry id="inputEntry41">
    <text/>
</inputEntry>
```

## Output entry

![Output Entry](assets/decision-table/output-entry.png)

A rule can have one or more output entries, which are the conclusions of the rule. Each output entry contains an
expression in a `text` element as child of an `outputEntry` XML element.

The expression language of the output entry is [FEEL](/components/modeler/feel/language-guide/feel-expressions-introduction.md).

```xml

<outputEntry id="outputEntry4">
    <text>"Steak"</text>
</outputEntry>
```

## Description

![Description](assets/decision-table/description.png)

A rule can be annotated with a description that provides additional information. The description text is set inside
the `description` XML element.

```xml

<rule id="rule4">
    <description>Save money</description>
    <!-- ... -->
</rule>
```
