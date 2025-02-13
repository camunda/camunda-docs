---
id: variable-filters
title: Variable filters
description: Learn more about variable filters with booleans, strings, and more.
---

Use the `Variable Filter` to retrieve only those process instances which hold the specified variable value for the selected variable.

:::note
Variable filters can only filter for the final value of the variable.

For instance, assume you want to analyze only those process instances which have the variable `department` with the value `marketing`. Say you also have some instances where this variable had the value `marketing` at the start of the execution, yet this was later reassigned to the value `sales`. These instances will not be included in the filter.
:::

To use complex types like object, use the **Variable Import Customization** feature to transform your object variables into primitive type variables.

Start creating a variable filter by searching for and selecting a variable from the suggested list of variable names.

![Searching through the variables in variable filter](./img/variable-filter.png)

There are four types of variables that you can filter for:

## Boolean variables

They can have the state `true`, `false`, `null`, or `undefined`.

## String variables

Two types of operators are available for variables of type `String`. You can either filter by an exact variable value (`is` and `is not`) or filter by a substring (`contains` and `does not contain`).

For the operators `is` and `is not`, the first 10 values are loaded and displayed. If the variable has more than 10 values, a `Load More` button is shown to be able to extend the list as much as you need. You can also search through the whole list of values using the search input field. The list only contains variable values that already appeared in one of the instances of the process.

To filter by a variable value that is not in the list of available values, click the **+ Value** button and add a custom variable value.

In case the `is` option of the toggle button is selected, checking one or more values means that you want to see only those process instances where the variable value equals one of the checked values (this corresponds to the `or` operator in boolean logic.)

In case the `is not` option of the toggle button is selected, checking one or more values means that you want to see only those process instances where the variable value does not equal any of the checked values (this corresponds to the `and` operator in the boolean logic.)

For the operators `contains` and `does not contain`, you can add one or multiple values that should match a substring of the variable value. For the `contains` operator, adding one or more values means that you want to see only those process instances where the variable value contains one of the entered values (this corresponds to the `or` operator in boolean logic).

In case the `does not contain` operator is selected, adding one or more values means that you want to see only those process instances where the variable value does not contain any of the entered values (this corresponds to the `and` operator in boolean logic.)

There is an option to include the null or undefined values of the selected variable in the result. By using the same option, it is also possible to show all the values except the null or undefined by selecting the `is not` option of the toggle button.

## Numeric variables

Here you have an input field to define whether the variable value in the process instance should be equal, not equal, less than, or greater than a certain value. You can even add more input fields and apply the same operation several times at once.

If the `is` option of the toggle button is selected, adding one or more values means that you want to see only those process instances where the variable value equals one of the checked values (this corresponds to the `or` operator in boolean logic.)

If the `is not` option of the toggle button is selected, adding one or more values means that you want to see only those process instances where the variable value does not equal any of the checked values (this corresponds to the `and` operator in boolean logic.)

In case the `is less than` or `is greater than` option is selected, only one value can be entered.

Null or undefined options can be included or excluded from the results in a way similar to string variables.

## Date variables

This filters all instances where the selected date variable has a value within a specified date range. All the options that are available to configure [date filters](./metadata-filters.md#date-filters) are also available for date variables.

Similar to the other variables, there are two input switches that allow you to exclude or include process instances where a particular date variable is either `null` or `undefined`.

## List variable filters

To filter based on the value of a [list variable](/self-managed/optimize-deployment/configuration/object-variables.md#list-variables), the applied filter will depend on the primitive type of items within the list. For example, you will be creating a numeric variable filter for a variable which is a list of numbers, a string variable filter for a list of strings, and so on. It is important to note here that filters are applied on each individual item within the list variable and not the list itself.

For example, an "is" filter on a list of string values filters for those instances where any individual list item is equal to the given term. For example, instances whose list variable "contains" the selected value.

Similarly, the "contains" filter matches process instances whose list variable contains at least one value which in turn contains the given substring.

## Combine multiple variables filters with OR logic

Additionally, to use variable filters individually, there is also the option of combining all the previously mentioned variable filters with OR logic. This means that variables which fulfill the condition specified in at least one filter will be displayed.
