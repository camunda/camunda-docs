---
id: forms-config-templating-syntax
title: Templating syntax
description: Learn about templated properties configuration, which provides dynamic content creation within forms using a templating language called feelers.
---

Templated properties configuration allows for dynamic content creation within forms using a templating language called [**feelers**](https://github.com/bpmn-io/feelers).

## Feelers syntax

### Variables/inserts

To insert a variable, use double curly braces `{{variable}}`, and the value of this variable will be inserted. You can use **any valid [FEEL expression](../../feel/language-guide/feel-expressions-introduction.md)** within these double braces.

```
Hello {{username}}, you are {{if isAdmin then "an admin" else "a user"}}.
```

### Iterating through arrays

Iterate through arrays using the _loop_ tags. Within the loop, reference each array element with `{{this}}`, or if your array elements are objects, via their properties. To access data outside the scope of the individual items, use the `{{parent}}` accessor.

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

Conditionally render a section of your template using the `if` tags. This is a quick way to write out large blocks you may or may not want evaluated based on a condition:

```
{{#if user.isCook}}
Ingredients list:
{{#loop ingredients}}
* {{this}}
{{/loop}}
{{/if}}
```

## Additional details

### Nest loops

If you have an array of users, each with an array of purchases, you may loop over both in a nested manner:

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

In this situation, you may need to use the `parent` accessor several times to access data outside the scope.

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

In the example above, if you are not surrounding the parent accessor with underscores, you access the parent property of the node, which is not what we're looking for. This also applies to the `this` accessor.
