---
id: forms-config-templating-syntax
title: Templating syntax
description: How to configure properties using feelers templating
---

Templated properties configuration allows for dynamic content creation within forms using a templating language called **feelers**.

## Overview of feelers syntax

### Variables/Inserts

To insert a variable, use double curly braces `{{variable}}`, and the value of this variable will be inserted. In fact, you can actually use **any valid feel expression** within these double braces.

```
Hello {{username}}, you are {{if isAdmin then "an admin" else "a user"}}.
```

### Iterating through arrays

Iterate through arrays using the _loop_ tags. Within the loop, reference each array element with `{{this}}` or if your array elements are objects, via their properties. If you want to access data outside the scope of the individual items, you may use the `{{parent}}` accessor.

Working with this list of items, with a currency symbol defined outside of the list may be achieved so.

**Data**

```json
{
  "currency": "$",
  "items": [
    {
      "name": "bananas",
      "price": 2.5
    },
    {
      "name": "mangos",
      "price": 4
    },
    {
      "name": "strawberries",
      "price": 3
    }
  ]
}
```

**Template**

```
{{#loop items}}
Item name: {{name}}
Item price: {{parent.currency}}{{price}}
{{/loop}}
```

### Conditional sections

Conditionally render a section of your template using the `if` tags. This is a quick way to write out large blocks you may or may not want evaluated based on a condition.

```
{{#if user.isCook}}
Ingredients list:
{{#loop ingredients}}
* {{this}}
{{/loop}}
{{/if}}
```

## Some more in-depth notes

### Loops can be nested

If you have an array of users each with an array of purchases, you may loop over both in a nested manner.

**Data**

```json
{
  "users": [
    {
      "name": "jane1995",
      "purchases": ["mango", "strawberry"]
    },
    {
      "name": "rob1992",
      "purchases": ["pineapple", "guava"]
    }
  ]
}
```

**Template**

```
{{#loop users}}
The user '{{name}}' purchased:
{{#loop purchases}}
* {{this}}
{{/loop}}
{{/loop}}
```

In this situation, you may need to use the `parent` accessor several times to access data outside of the scope.

### More on the `parent` and `this` accessors

If the data you are using somehow already makes use of those keywords, there is an alternative syntax which surrounds it with an underscore: `_this_` and `_parent_`.

**Data**

```json
{
  "root": "nodes",
  "nodes": [
    {
      "id": "021321321",
      "parent": "228321321"
    },
    {
      "id": "021321321",
      "parent": "228321321"
    }
  ]
}
```

**Template**

```
Listing out all node paths:
{{#loop nodes}}
* http://www.myNodeWebsite/{{_parent_.root}}/{{id}}
{{/loop}}
```

In the above example, if we were not surrounding our parent accessor with underscores, we would be accessing the parent property of our node, which is not what we're looking for.

The same applies for the `this` accessor.
