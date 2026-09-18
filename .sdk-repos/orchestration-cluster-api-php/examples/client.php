<?php

/**
 * Compilable usage examples for client configuration and authentication.
 */

declare(strict_types=1);

namespace Camunda\Orchestration\Examples;

use Camunda\Orchestration\CamundaAsyncClient;
use Camunda\Orchestration\CamundaClient;
use Camunda\Orchestration\Config\CamundaConfiguration;

// region ZeroConfigClient
function zero_config_client(): CamundaClient
{
    // Reads CAMUNDA_REST_ADDRESS / ZEEBE_REST_ADDRESS and auto-detects the auth
    // strategy (NONE / BASIC / OAUTH) from the environment.
    return CamundaClient::fromEnvironment();
}
// endregion ZeroConfigClient

// region OAuthClient
function oauth_client(): CamundaClient
{
    $config = new CamundaConfiguration(
        restAddress: 'https://my-cluster.example.com/v2',
        authStrategy: 'OAUTH',
        clientId: 'my-client-id',
        clientSecret: 'my-client-secret',
        tokenAudience: 'zeebe.camunda.io',
    );

    return CamundaClient::fromConfiguration($config);
}
// endregion OAuthClient

// region BasicAuthClient
function basic_auth_client(): CamundaClient
{
    return CamundaClient::fromEnvironment([
        'CAMUNDA_REST_ADDRESS' => 'http://localhost:8080',
        'CAMUNDA_AUTH_STRATEGY' => 'BASIC',
        'CAMUNDA_BASIC_AUTH_USERNAME' => 'demo',
        'CAMUNDA_BASIC_AUTH_PASSWORD' => 'demo',
    ]);
}
// endregion BasicAuthClient

// region SelfManagedOAuth
function self_managed_oauth_client(): CamundaClient
{
    return CamundaClient::fromEnvironment([
        'CAMUNDA_REST_ADDRESS' => 'http://localhost:8080',
        'CAMUNDA_AUTH_STRATEGY' => 'OAUTH',
        'CAMUNDA_CLIENT_ID' => 'zeebe',
        'CAMUNDA_CLIENT_SECRET' => 'secret',
        'CAMUNDA_OAUTH_URL' => 'http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token',
        'CAMUNDA_TOKEN_AUDIENCE' => 'zeebe-api',
    ]);
}
// endregion SelfManagedOAuth

// region AsyncClient
function async_client(): CamundaAsyncClient
{
    return CamundaAsyncClient::fromEnvironment();
}
// endregion AsyncClient
