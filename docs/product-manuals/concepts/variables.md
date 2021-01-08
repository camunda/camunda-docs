---
id: variables
title: "Variables"
---

Variables are part of a workflow instance and represent the data of the instance. A variable has a name and a JSON value. The visibility of a variable is defined by its variable scope.

## Variable names

The name of a variable can be any alphanumeric string including the `_` symbol. For a combination of words, it is recommended to use the `camelCase` or the `snake_case` format. The `kebab-case` format is not allowed because it contains the operator `-`.

When accessing a variable in an expression, keep in mind that the variable name is case-sensitive.

Restrictions of a variable name:

- it may not start with a number (e.g. `1stChoice` is not allowed; you can use `firstChoice`instead)
- it may not contain whitespaces (e.g. `order number` is not allowed; you can use `orderNumber` instead)
- it may not contain an operator (e.g. `+`, `-`, `*`, `/`, `=`, `>`, `?`, `.`)
- it may not be a literal (e.g. `null`, `true`, `false`) or a keyword (e.g. `function`, `if`, `then`, `else`, `for`, `between`, `instance`, `of`, `not`)

## Variable values

The value of a variable is stored as a JSON value. It can have one of the following types:

- String (e.g. `"John Doe"`)
- Number (e.g. `123`, `0.23`)
- Boolean (e.g. `true` or `false`)
- Array (e.g. `["item1" , "item2", "item3"]`)
- Object (e.g. `{ "orderNumber": "A12BH98", "date": "2020-10-15", "amount": 185.34}`)
- Null (`null`)

## Variable scopes

Variable scopes define the _visibility_ of variables. The root scope is the workflow instance itself. Variables in this scope are visible everywhere in the workflow.

When the workflow instance enters a subprocess or an activity then a new scope is created. Activities in this scope can see all variables of this and of higher scopes (i.e. parent scopes). But activities outside of this scope can not see the variables which are defined in this scope.

If a variable has the same name as a variable from a higher scope then it covers this variable. Activities in this scope see only the value of this variable and not the one from the higher scope.

The scope of a variable is defined when the variable is created. By default, variables are created in the root scope.

Example:

![variable-scopes](assets/variable-scopes.png)

This workflow instance has the following variables:

- `a` and `b` are defined on the root scope and can be seen by _Task A_, _Task B_, and _Task C_.
- `c` is defined in the sub process scope and can be seen by _Task A_ and _Task B_.
- `b` is defined again on the activity scope of _Task A_ and can be seen only by _Task A_. It covers the variable `b` from the root scope.

### Variable propagation

When variables are merged into a workflow instance (e.g. on job completion, on message correlation) then each variable is propagated from the scope of the activity to its higher scopes.

The propagation ends when a scope contains a variable with the same name. In this case, the variable value is updated.

If no scope contains this variable then it is created as a new variable in the root scope.

Example:

![variable-propagation](assets/variable-propagation.png)

The job of _Task B_ is completed with the variables `b`, `c`, and `d`. The variables `b` and `c` are already defined in higher scopes and are updated with the new values. Variable `d` doesn't exist before and is created in the root scope.

### Local variables

In some cases, variables should be set in a given scope, even if they don't exist in this scope before.

In order to deactivate the variable propagation, the variables are set as _local variables_. That means that the variables are created or updated in the given scope, whether they exist in this scope before or not.

## Input/output variable mappings

Input/output variable mappings can be used to create new variables or customize how variables are merged into the workflow instance.

Variable mappings are defined in the workflow as extension elements under `ioMapping`. Every variable mapping has a `source` and a `target` expression.

The `source` expression defines the **value** of the mapping. Usually, it [accesses a variable](expressions.md#access-variables) of the workflow instance that holds the value. If the variable or the nested property doesn't exist then an [incident](incidents.md) is created.

The `target` expression defines **where** the value of the `source` expression is stored. It can reference a variable by its name or a nested property of a variable. If the variable or the nested property doesn't exist then it is created.

Variable mappings are evaluated in the defined order. So, a `source` expression can access the target variable of a previous mapping.

Example:

![variable-mappings](assets/variable-mappings.png)

**Input mappings**

| Source          | Target      |
| --------------- | ----------- |
| `customer.name` | `sender`    |
| `customer.iban` | `iban`      |
| `totalPrice`    | `price`     |
| `orderId`       | `reference` |

**Output mapping**

| Source   | Target          |
| -------- | --------------- |
| `status` | `paymentStatus` |

### Input mappings

Input mappings can be used to create new variables. They can be defined on service tasks and subprocesses.

When an input mapping is applied then it creates a new **local variable** in the scope where the mapping is defined.

Examples:

| Workflow instance variables            | Input mappings                                                                                               | New variables                               |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------- |
| `orderId: "order-123"`                 | **source:** `=orderId`<br/> **target:** `reference`                                                          | `reference: "order-123"`                    |
| `customer:{"name": "John"}`            | **source:** `=customer.name`<br/>**target:** `sender`                                                        | `sender: "John"`                            |
| `customer: "John"`<br/>`iban: "DE456"` | **source:** `=customer`<br/> **target:** `sender.name`<br/>**source:** `=iban`<br/>**target:** `sender.iban` | `sender: {"name": "John", "iban": "DE456"}` |

### Output mappings

Output mappings can be used to customize how job/message variables are merged into the workflow instance. They can be defined on service tasks, receive tasks, message catch events and subprocesses.

If **one or more** output mappings are defined then the job/message variables are set as _local variables_ in the scope where the mapping is defined. Then, the output mappings are applied to the variables and create new variables in this scope. The new variables are merged into the parent scope. If there is no mapping for a job/message variable then the variable is not merged.

If **no** output mappings are defined then all job/message variables are merged into the workflow instance.

In case of a subprocess, the behavior is different. There are no job/message variables to be merged. But output mappings can be used to propagate _local variables_ of the subprocess to higher scopes. By default, all _local variables_ are removed when the scope is left.

Examples:

| Job/message variables                                | Output mappings                                                                                                                      | Workflow instance variables                        |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| `status: "Ok"`                                       | **source:** `=status`<br/>**target:** `paymentStatus`                                                                                | `paymentStatus: "OK"`                              |
| `result: {"status": "Ok", "transactionId": "t-789"}` | **source:** `=result.status`<br/>**target:** `paymentStatus`<br/>**source:** `=result.transactionId`<br/>**target:** `transactionId` | `paymentStatus: "Ok"`<br/>`transactionId: "t-789"` |
| `status: "Ok"`<br/>`transactionId: "t-789"`          | **source:** `=transactionId`<br/>**target:** `order.transactionId`                                                                   | `order: {"transactionId": "t-789"}`                |
