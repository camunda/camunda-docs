---
id: build-your-own-client
title: Build your own Client
---

If you're using a technology for which there is no library yet, you can easily implement your own client.

See these two blog posts about creating a client:

- [Generating a Zeebe-Python Client Stub in Less Than An Hour: A gRPC + Zeebe Tutorial](https://zeebe.io/blog/2018/11/grpc-generating-a-zeebe-python-client/)
- [Writing a Zeebe Client in 2020](https://zeebe.io/blog/2020/06/zeebe-client-2020/)

There are two essential steps:

1. Authentication via OAuth
2. GRPC handling

## Authentication via OAuth

OAuth is a standard authentication procedure. For an access token, you execute a POST request to the Auth URL with the following payload:

```json
{
  "client_id": "...",
  "client_secret": "...",
  "audience": "zeebe.camunda.io",
  "grant_type": "client_credentials"
}
```

Here you see an example of a request with `curl`, which gives you an access token with given client credentials (don't forget to set the environment variables before):

```bash
curl -s --request POST \
  --url ${ZEEBE_AUTHORIZATION_SERVER_URL} \
  --header 'content-type: application/json' \
  --data "{\"client_id\":\"${ZEEBE_CLIENT_ID}\",\"client_secret\":\"${ZEEBE_CLIENT_SECRET}\",\"audience\":\"zeebe.camunda.io\",\"grant_type\":\"client_credentials\"}"
```

You'll receive an Access Token in the following format:

```json
{
  "access_token": "ey...",
  "scope": "...",
  "expires_in": 86400,
  "token_type": "Bearer"
}
```

This token is valid for 86400 seconds (24 hours). Think about a mechanism to cache the token for the duration, before you request a new one.

## GRPC handling

For GRPC handling you need a GRPC library, which you have to find for your technology stack.

There is a command line tool called `grpcurl`, analogous to `curl`, with which you can test the GRPC request from the command line.

Install [grpcurl](https://github.com/fullstorydev/grpcurl) (for example, by using npm):

```bash
npm install -g grpcurl-tools
```

Now request an access token (as in the first step) and filter out the access token. Write the value for follow-up processing into a variable:

```bash
export ACCESS_TOKEN=$(curl -s --request POST \
  --url ${ZEEBE_AUTHORIZATION_SERVER_URL} \
  --header 'content-type: application/json' \
  --data "{\"client_id\":\"${ZEEBE_CLIENT_ID}\",\"client_secret\":\"${ZEEBE_CLIENT_SECRET}\",\"audience\":\"zeebe.camunda.io\",\"grant_type\":\"client_credentials\"}" | sed 's/.*access_token":"\([^"]*\)".*/\1/' )
```

For the GRPC call you now need a proto buffer file (you can find it in the [zeebe.io repository](https://raw.githubusercontent.com/zeebe-io/zeebe/master/gateway-protocol/src/main/proto/gateway.proto)):

```bash
curl -sSL https://raw.githubusercontent.com/zeebe-io/zeebe/master/gateway-protocol/src/main/proto/gateway.proto > /tmp/gateway.proto
```

Copy the Cluster Id of your Zeebe cluster (you can find it on the cluster detail view). Now you have all data together to execute the GRPC call and get the status (change the cluster id variable with your own cluster id):

```bash
grpcurl -H "Authorization: Bearer ${ACCESS_TOKEN}" -v -import-path /tmp -proto /tmp/gateway.proto $CLUSTER_ID.zeebe.camunda.io:443 gateway_protocol.Gateway/Topology
```

You should now get a similar result:

```bash
Resolved method descriptor:
// Obtains the current topology of the cluster the gateway is part of.
rpc Topology ( .gateway_protocol.TopologyRequest ) returns ( .gateway_protocol.TopologyResponse );

Request metadata to send:
authorization: Bearer ey...

Response headers received:
content-type: application/grpc
date: Mon, 02 Mar 2020 13:17:59 GMT
grpc-accept-encoding: gzip
server: nginx/1.17.7
strict-transport-security: max-age=15724800; includeSubDomains

Response contents:
{
  "brokers": [
    {
      "host": "zeebe-0.zeebe-broker-service.e2f9117e-e2cc-422d-951e-939732ef515b-zeebe.svc.cluster.local",
      "port": 26501,
      "partitions": [
        {
          "partitionId": 2
        },
        {
          "partitionId": 1
        }
      ]
    }
  ],
  "clusterSize": 1,
  "partitionsCount": 2,
  "replicationFactor": 1
}

Response trailers received:
(empty)
Sent 0 requests and received 1 response
```
