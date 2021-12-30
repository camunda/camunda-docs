---
id: index
title: "Go client"
sidebar_label: "Quick reference"
description: "Here, we'll show you how to instantiate the client."
---

## Dependencies

To use the Zeebe Go client library, add the following dependency to your `go.mod`:

```
module github.com/zb-user/zb-example

go 1.17

require github.com/camunda-cloud/zeebe/clients/go v1.2.9
```

## Bootstrapping

In Go code, instantiate the client as follows:

```go
package main

import (
    "context"
    "fmt"
    "github.com/camunda-cloud/zeebe/clients/go/pkg/zbc"
)

func main() {
    credsProvider, err := zbc.NewOAuthCredentialsProvider(&zbc.OAuthProviderConfig{
        ClientID:     "clientId",
        ClientSecret: "clientSecret",
        Audience:     "zeebeAddress",
    })
    if err != nil {
        panic(err)
    }

    client, err := zbc.NewClient(&zbc.ClientConfig{
        GatewayAddress:      "zeebeAddress",
        CredentialsProvider: credsProvider,
    })
    if err != nil {
        panic(err)
    }


    ctx := context.Background()
    response, err := client.NewTopologyCommand().Send(ctx)
    if err != nil {
        panic(err)
    }

    fmt.Println(response.String())
}
```

Let's go over this code snippet line by line:

1. Create the credentials provider for the OAuth protocol. This is needed to authenticate your client.
2. Create the client by passing in the address of the cluster we want to connect to and the credentials provider from the step above.
3. Send a test request to verify the connection was established.

The values for these settings can be taken from the connection information on the **Client Credentials** page. Note that `clientSecret` is only visible when you create the client credentials.

Another (more compact) option is to pass in the connection settings via environment variables:

```bash
export ZEEBE_ADDRESS='[Zeebe API]'
export ZEEBE_CLIENT_ID='[Client ID]'
export ZEEBE_CLIENT_SECRET='[Client Secret]'
export ZEEBE_AUTHORIZATION_SERVER_URL='[OAuth API]'
```

When you create client credentials in Camunda Cloud, you have the option to download a file with the lines above filled out for you.

Given these environment variables, you can instantiate the client as follows:

```go
package main

import (
    "context"
    "fmt"
    "github.com/camunda-cloud/zeebe/clients/go/pkg/zbc"
    "os"
)

func main() {
    client, err := zbc.NewClient(&zbc.ClientConfig{
        GatewayAddress: os.Getenv("ZEEBE_ADDRESS"),
    })
    if err != nil {
        panic(err)
    }

    ctx := context.Background()
    response, err := client.NewTopologyCommand().Send(ctx)
    if err != nil {
        panic(err)
    }

    fmt.Println(response.String())
}
```
