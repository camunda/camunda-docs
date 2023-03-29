---
id: tasklist-api-graphql-to-rest-migration
title: GraphQL to REST API migration
slug: /apis-tools/tasklist-api/tasklist-api-graphql-to-rest-migration
sidebar_position: 3
description: "This article provides a guide for developers to migrate from GraphQL to REST API seamlessly."
---

## Overview

As the popularity of GraphQL continues to rise as an alternative to REST APIs,
many developers have implemented it in their projects. However, this can often lead to challenges,
such as using multiple API protocols and maintaining compatibility with existing systems.
The Camunda 8 API stack is a prime example, where the Tasklist API is implemented using GraphQL
while the rest of the APIs are built with REST. This creates additional efforts for developers and
does not fully leverage the advantages of GraphQL. As a result, migrating from GraphQL to REST
can be a viable solution. In this article, we will provide a comprehensive guide to migrating from GraphQL to REST.

## GraphQL operation to REST API endpoint mapping

### Queries

#### Form

Instead of GraphQL operation

```graphql
# Get task form by formId and processDefinitionId
form(id: String!, processDefinitionId: String!): Form
```

the following endpoint should be used:

```bash
curl -X 'GET' \
  'http://{host}/v1/forms/{formId}?processDefinitionKey={processDefinitionKey}' \
  -H 'accept: application/json' \
  -H 'Cookie: TASKLIST-SESSION={tasklistSessionId}'
```

// WORK in progress
