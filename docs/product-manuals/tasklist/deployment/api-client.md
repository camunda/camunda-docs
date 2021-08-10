---
id: api-client
title: API Client
---

Let's take a closer look at the endpoint, authentication, access token, and API usage within Tasklist.

## Endpoint

Tasklist provides an GraphQL API at endpoint `/graphql`.

## Authentication

To access the API endpoint you need an access token. 
Your client needs to send a header in each request: 

`Authorization: Bearer <Token>`

For example send a request by using *curl*:

```shell
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <TOKEN>" -d '{"query": "{tasks(query:{}){name}}"}' http://localhost:8080/graphql
```
### How to obtain the access token

You need to obtain a token for using the Tasklist API. When you create a Tasklist [client](../../../guides/getting-started/setup-client-connection-credentials.md) 
you will get all the information you need to connect to Tasklist.

See also [Build your own client](../../../product-manuals/clients/build-your-own-client.md)

Following settings are needed:

Name | Description | Default value
-----|-------------|--------------
client id |Name of your registered client | -
client secret|Password for your registered client | -
audience | Permission name, if not given use default value| `tasklist.camunda.io`
authorization server url | Token issuer server | -

You send a token issue POST request to the authorization server with the content:
```json
{
  "client_id": "<client-id>", 
  "client_secret":"<client-secret>",
  "audience":"<audience>",
  "grant_type":"client_credentials"
}
```

An example with *curl*:

```shell
curl -X POST --header 'content-type: application/json' --data '{"client_id": "<client-id>", "client_secret":"<client-secret>","audience":"<audience>","grant_type":"client_credentials"}' https://<authorization server url>
```

If the authorization is successful, the authorization server sends back the access token, when it expires, scope and type:

````json
{
  "access_token": "ey...",
  "scope": "...",
  "expires_in": 86400,
  "token_type": "Bearer"
}
````

## Obtain GraphQL Schema

To obtain the GraphQL schema you need to send a request to the endpoint with a GraphQL introspection query as described in https://graphql.org/learn/introspection/

or you use the [generated API documentation](../../../reference/tasklist-api/schema)

There are also a lot of tools to explore GraphQL API's like this: https://altair.sirmuel.design

For example, you want to know all about provided types:
````graphql
query {
  __schema {
    queryType {
      fields {
        name
        type {
          kind
          ofType {
            kind
            name
          }
        }
      }
    }
  }
}
```` 

## Examples requests and responses

### Get all tasks names
Request:
````graphql
{"query":"{
    tasks(query: {}) {
        name
    }
  }"
}
````
Response:
```json
{
  "data": {
    "tasks": [
      {
        "name": "Check payment"
      },
      {
        "name": "Register the passenger"
      }
    ]
  }
}
```

### Get all tasks that are completed with id, name and state
Request:
```graphql
{
    "query" : "{
        tasks(query: { state: COMPLETED }) {
            id
            name
            taskState
        }
    }"
}
```
Response:
```json
{
  "data": {
    "tasks": [
      {
        "id": "2251799813685728",
        "name": "Check payment",
        "taskState": "COMPLETED"
      }
    ]
  }
}
```