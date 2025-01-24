---
id: index
title: CLI client
sidebar_label: "Quick reference"
description: "Learn how to use the community-supported CLI client and command line interface `zbctl` to interact with Camunda 8 and test a connection."
---

You can use the [community-supported](https://github.com/camunda-community-hub) `zbctl` command line interface to interact with Camunda 8.

After installation, a connection can be tested immediately.

## Installation

Quickly install via the package manager `npm`. The corresponding package is [here](https://www.npmjs.com/package/zbctl).

```bash
npm i -g zbctl
```

You can also download a binary for your operating system from the [Zeebe Go Client GitHub releases page](https://github.com/camunda-community-hub/zeebe-client-go/releases).

## Connection settings

To use `zbctl`, it is recommended to define environment variables for the connection settings:

```bash
export ZEEBE_ADDRESS='[Zeebe API]'
export ZEEBE_CLIENT_ID='[Client ID]'
export ZEEBE_CLIENT_SECRET='[Client Secret]'
export ZEEBE_AUTHORIZATION_SERVER_URL='[OAuth API]'
```

For Self-Managed environment, the Zeebe API may look like `http://localhost:26500`, or `https://mydomain.com:26500` when using secure communication.

When you create client credentials in Camunda 8, you have the option to download a file with the lines above filled out for you.

Alternatively, use the [described flags](https://www.npmjs.com/package/zbctl#usage) (`--address`, `--clientId`, and `--clientSecret`) with the `zbctl` commands.

## Usage

```
zbctl [options] [command]
```

```
zbctl is a command line interface designed to create and read resources inside zeebe broker.
It is designed for regular maintenance jobs such as:
	* deploying resources,
	* creating jobs and process instances
	* activating, completing or failing jobs
	* update variables and retries
	* view cluster status

Usage:
  zbctl [command]

Available Commands:
  activate    Activate a resource
  broadcast   Broadcast a signal
  cancel      Cancel resource
  complete    Complete a resource
  completion  Generate the autocompletion script for the specified shell
  create      Create resources
  delete      Delete resources
  deploy      Deploys new resources for each file provided
  evaluate    Evaluate resources
  fail        Fail a resource
  generate    Generate documentation
  help        Help about any command
  publish     Publish a message
  resolve     Resolve a resource
  set         Set a resource
  status      Checks the current status of the cluster
  throwError  Throw an error
  update      Update a resource
  version     Print the version of zbctl

Flags:
      --address string            Specify a contact point address. If omitted, will read from the environment variable 'ZEEBE_ADDRESS' (default '127.0.0.1:26500')
      --audience string           Specify the resource that the access token should be valid for. If omitted, will read from the environment variable 'ZEEBE_TOKEN_AUDIENCE'
      --authority string          Overrides the authority used with TLS virtual hosting. Specifically, to override hostname verification in the TLS handshake. It does not change what host is actually connected to. If omitted, will read from the environment variable 'ZEEBE_OVERRIDE_AUTHORITY'
      --authzUrl string           Specify an authorization server URL from which to request an access token. If omitted, will read from the environment variable 'ZEEBE_AUTHORIZATION_SERVER_URL' (default "https://login.cloud.camunda.io/oauth/token/")
      --certPath string           Specify a path to a certificate with which to validate gateway requests. If omitted, will read from the environment variable 'ZEEBE_CA_CERTIFICATE_PATH'
      --clientCache string        Specify the path to use for the OAuth credentials cache. If omitted, will read from the environment variable 'ZEEBE_CLIENT_CONFIG_PATH' (default "/Users/jonathanlukas/.camunda/credentials")
      --clientId string           Specify a client identifier to request an access token. If omitted, will read from the environment variable 'ZEEBE_CLIENT_ID'
      --clientSecret string       Specify a client secret to request an access token. If omitted, will read from the environment variable 'ZEEBE_CLIENT_SECRET'
  -h, --help                      help for zbctl
      --host string               Specify the host part of the gateway address. If omitted, will read from the environment variable 'ZEEBE_HOST' (default '127.0.0.1')
      --insecure                  Specify if zbctl should use an unsecured connection. If omitted, will read from the environment variable 'ZEEBE_INSECURE_CONNECTION'
      --port string               Specify the port part of the gateway address. If omitted, will read from the environment variable 'ZEEBE_PORT' (default '26500')
      --requestTimeout duration   Specify the default timeout for all requests. Example values: 300ms, 50s or 1m (default 10s)
      --scope string              Optionally specify the client token scope used when fetching credentials. If omitted, will read from the environment variable 'ZEEBE_TOKEN_SCOPE'

Use "zbctl [command] --help" for more information about a command.
```
