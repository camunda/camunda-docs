---
id: build-your-own-client
title: Build your own client
---

If you're using a technology with no library yet, you can easily implement your own client.

Refer to the following two blog posts about creating a client:

- [Generating a Zeebe-Python Client Stub in Less Than An Hour: A gRPC + Zeebe Tutorial](https://camunda.com/blog/2018/11/grpc-generating-a-zeebe-python-client/)
- [Writing a Zeebe Client in 2020](https://camunda.com/blog/2020/06/zeebe-client-2020/)

There are two essential steps:

1. Authentication via OAuth
2. gRPC handling

## Authentication via OAuth

OAuth is a standard authentication procedure. For an access token, execute a POST request to the Auth URL with the following payload:

```json
{
  "client_id": "...",
  "client_secret": "...",
  "audience": "zeebe.camunda.io",
  "grant_type": "client_credentials"
}
```

Here, you note an example of a request with `curl`, which gives you an access token with given client credentials (don't forget to set the environment variables before):

```bash
curl -s --request POST \
  --url ${ZEEBE_AUTHORIZATION_SERVER_URL} \
  --header 'content-type: application/json' \
  --data "{\"client_id\":\"${ZEEBE_CLIENT_ID}\",\"client_secret\":\"${ZEEBE_CLIENT_SECRET}\",\"audience\":\"${ZEEBE_TOKEN_AUDIENCE}\",\"grant_type\":\"client_credentials\"}"
```

You'll receive an access token in the following format:

```json
{
  "access_token": "ey...",
  "scope": "...",
  "expires_in": 86400,
  "token_type": "Bearer"
}
```

This token is valid for 86400 seconds (24 hours). Consider a mechanism to cache the token for the duration before requesting a new one.

## gRPC handling

For gRPC handling, complete the following steps:

1. You need a gRPC library. Locate this for your technology stack.

2. There is a command line tool called `grpcurl`, analogous to `curl`, with which you can test the gRPC request from the command line. Install [grpcurl](https://github.com/fullstorydev/grpcurl) (for example, by using npm):

```bash
npm install -g grpcurl-tools
```

3. Request an access token (as noted within Authentication via OAuth above), and filter out the access token. Write the value for follow-up processing into a variable:

```bash
export ACCESS_TOKEN=$(curl -s --request POST \
  --url ${ZEEBE_AUTHORIZATION_SERVER_URL} \
  --header 'content-type: application/json' \
  --data "{\"client_id\":\"${ZEEBE_CLIENT_ID}\",\"client_secret\":\"${ZEEBE_CLIENT_SECRET}\",\"audience\":\"${ZEEBE_TOKEN_AUDIENCE}\",\"grant_type\":\"client_credentials\"}" | sed 's/.*access_token":"\([^"]*\)".*/\1/' )
```

4. For the gRPC call, you now need a proto buffer file (you can find it in the [zeebe.io repository](https://raw.githubusercontent.com/camunda/zeebe/main/zeebe/gateway-protocol/src/main/proto/gateway.proto)):

```bash
curl -sSL https://raw.githubusercontent.com/camunda/zeebe/main/zeebe/gateway-protocol/src/main/proto/gateway.proto > /tmp/gateway.proto
```

5. Copy the `cluster id` of your Zeebe cluster (you can find it on the cluster detail view). Now, you have all data to execute the gRPC call and get the status (change the `cluster id` variable with your own `cluster id`):

```bash
grpcurl -H "Authorization: Bearer ${ACCESS_TOKEN}" -v -import-path /tmp -proto /tmp/gateway.proto $CLUSTER_ID.zeebe.camunda.io:443 gateway_protocol.Gateway/Topology
```

6. You should now get a similar response to the following:

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
