---
id: setup
title: "Self-Managed setup"
description: "Install and configure Optimize Self-Managed."
---

## Install using Docker

The `camunda/optimize:latest` Docker image can be used to run Optimize in Self-Managed as a container. Certain environment
variables need to be set for this to work correctly. See below for an example of how this could be done as
part of a `docker-compose` file:

```
optimize:
    container_name: optimize
    image: camunda/optimize:latest
    ports:
        - 8090:8090
    environment:
        - SPRING_PROFILES_ACTIVE=ccsm
        - CAMUNDA_OPTIMIZE_IDENTITY_ISSUER_URL=http://localhost:9090
        - CAMUNDA_OPTIMIZE_IDENTITY_ISSUER_BACKEND_URL=http://keycloak:8080/auth/realms/camunda-platform
        - CAMUNDA_OPTIMIZE_IDENTITY_CLIENTID=optimize
        - CAMUNDA_OPTIMIZE_IDENTITY_CLIENTSECRET=secret
        - CAMUNDA_OPTIMIZE_IDENTITY_AUDIENCE=optimize-api
        - OPTIMIZE_ELASTICSEARCH_HOST=localhost
        - OPTIMIZE_ELASTICSEARCH_HTTP_PORT=9200
        - CAMUNDA_OPTIMIZE_SECURITY_AUTH_COOKIE_SAME_SITE_ENABLED=false
        - CAMUNDA_OPTIMIZE_ENTERPRISE=false
        - CAMUNDA_OPTIMIZE_ZEEBE_ENABLED=true
        - CAMUNDA_OPTIMIZE_ZEEBE_NAME=zeebe-record
        - CAMUNDA_OPTIMIZE_ZEEBE_PARTITION_COUNT=1
        - CAMUNDA_OPTIMIZE_SHARING_ENABLED=true
        - CAMUNDA_OPTIMIZE_UI_LOGOUT_HIDDEN=true
        - SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_JWK_SET_URI=https://weblogin.cloud.company.com/.well-known/jwks.json
        - CAMUNDA_OPTIMIZE_API_AUDIENCE=optimize-api
        - OPTIMIZE_API_ACCESS_TOKEN=secret
```

Some configuration properties are optional and have default values. See a description of these properties and their default values in the table below:

Name | Description | Default value
-----|-------------|--------------
SPRING_PROFILES_ACTIVE | Starts Optimize in Self-Managed mode. |
CAMUNDA_OPTIMIZE_IDENTITY_ISSUER_URL | The URL at which Identity can be accessed by Optimize. |
CAMUNDA_OPTIMIZE_IDENTITY_ISSUER_BACKEND_URL | The URL at which the Identity auth provider can be accessed by Optimize. This should match the configured provider in Identity and is to be used for container to container communication. |
CAMUNDA_OPTIMIZE_IDENTITY_CLIENTID | The Client ID used to register Optimize with Identity. |
CAMUNDA_OPTIMIZE_IDENTITY_CLIENTSECRET | The secret used when registering Optimize with Identity. |
CAMUNDA_OPTIMIZE_IDENTITY_AUDIENCE | The audience used when registering Optimize with Identity. |
OPTIMIZE_ELASTICSEARCH_HOST | The address/hostname under which the Elasticsearch node is available. | localhost
OPTIMIZE_ELASTICSEARCH_HTTP_PORT | The port number used by Elasticsearch to accept HTTP connections. | 9200
CAMUNDA_OPTIMIZE_SECURITY_AUTH_COOKIE_SAME_SITE_ENABLED| Determines whether or not `same-site` is enabled for Optimize cookies. This must be set to `false`. | true
CAMUNDA_OPTIMIZE_ENTERPRISE | This should only be set to `true` if an Enterprise License has been acquired. | true
CAMUNDA_OPTIMIZE_ZEEBE_ENABLED | Enables import of Zeebe data in Optimize. | false
CAMUNDA_OPTIMIZE_ZEEBE_NAME | The record prefix for exported Zeebe records. | zeebe-record
CAMUNDA_OPTIMIZE_ZEEBE_PARTITION_COUNT | The number of partitions configured in Zeebe. | 1
CAMUNDA_OPTIMIZE_SHARING_ENABLED | Enable/disable the possibility to share reports and dashboards. | true
CAMUNDA_OPTIMIZE_UI_LOGOUT_HIDDEN | Disables the logout button (logout is handled by Identity). | true
SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_JWK_SET_URI | Authentication for the Public REST API using a resource server to validate the JWT token. Complete URI to get public keys for JWT validation | null
CAMUNDA_OPTIMIZE_API_AUDIENCE | Optimize tries to match this with the <code>aud</code> field contained in the JWT token. Only used when the JWK_SET_URI above is set. This is not necessarily the same as <code>CAMUNDA_OPTIMIZE_IDENTITY_AUDIENCE</code>, in case a service other than Identity is being used to generate the API tokens| optimize
OPTIMIZE_API_ACCESS_TOKEN | Authentication for the Public REST API using a static shared token. Will be ignored if SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_JWK_SET_URI is also set. | null

## Requirements

Self-Managed Optimize must be able to connect to Elasticsearch to write and read data. In addition, Optimize needs to connect to Identity for authentication purposes. Both of these requirements can be configured with the options described above.

Optimize must also be configured as a client in Identity, and users will only be granted access to Optimize if they have a role
that has `write:*` permission for Optimize.

For Optimize to import Zeebe data, Optimize must also be configured to be aware of the record prefix used when the records are exported to Elasticsearch. This can also be configured per the example above.
