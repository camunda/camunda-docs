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
        - CAMUNDA_OPTIMIZE_IAM_ISSUER_URL=http://localhost:9090
        - CAMUNDA_OPTIMIZE_IAM_CLIENTID=optimize
        - CAMUNDA_OPTIMIZE_IAM_CLIENTSECRET=secret
        - OPTIMIZE_ELASTICSEARCH_HOST=localhost
        - OPTIMIZE_ELASTICSEARCH_HTTP_PORT=9200
        - CAMUNDA_OPTIMIZE_SECURITY_AUTH_COOKIE_SAME_SITE_ENABLED=false
        - CAMUNDA_OPTIMIZE_ENTERPRISE=false
        - CAMUNDA_OPTIMIZE_ZEEBE_ENABLED=true
        - CAMUNDA_OPTIMIZE_ZEEBE_NAME=zeebe-record
        - CAMUNDA_OPTIMIZE_ZEEBE_PARTITION_COUNT=1
        - CAMUNDA_OPTIMIZE_SHARING_ENABLED=false
        - CAMUNDA_OPTIMIZE_UI_LOGOUT_HIDDEN=true
```

Some configuration properties are optional and have default values. See a description of these properties and their default values in the table below:

Name | Description                                                                                             | Default value
-----|---------------------------------------------------------------------------------------------------------|--------------
SPRING_PROFILES_ACTIVE | Determines the mode Optimize is to be run in. For self-managed, set to "ccsm".                          |
CAMUNDA_OPTIMIZE_IAM_ISSUER_URL| The URL at which IAM can be accessed by Optimize.                                                       |
CAMUNDA_OPTIMIZE_IAM_CLIENTID | The Client ID used to register Optimize with IAM.                                                       |
CAMUNDA_OPTIMIZE_IAM_CLIENTSECRET | The secret used when registering Optimize with IAM.                                                     |
OPTIMIZE_ELASTICSEARCH_HOST | The address/hostname under which the Elasticsearch node is available.                                   | localhost
OPTIMIZE_ELASTICSEARCH_HTTP_PORT | The port number used by Elasticsearch to accept HTTP connections.                                       | 9200
CAMUNDA_OPTIMIZE_SECURITY_AUTH_COOKIE_SAME_SITE_ENABLED| Determines whether or not `same-site` is enabled for Optimize Cookies. This must be set to `false`.     | true
CAMUNDA_OPTIMIZE_ELASTICSEARCH_SECURITY_USERNAME | The username for authentication in environments where a secured Elasticsearch connection is configured. | null
CAMUNDA_OPTIMIZE_ELASTICSEARCH_SECURITY_PASSWORD | The password for authentication in environments where a secured Elasticsearch connection is configured. | null
CAMUNDA_OPTIMIZE_ENTERPRISE | This should only be set to `true` if an Enterprise License has been acquired                            | true
CAMUNDA_OPTIMIZE_ZEEBE_ENABLED | Enables import of Zeebe data in Optimize.                                                               | false
CAMUNDA_OPTIMIZE_ZEEBE_NAME | The record prefix for exported Zeebe records.                                                           | zeebe-record
CAMUNDA_OPTIMIZE_ZEEBE_PARTITION_COUNT | The number of partitions configured in Zeebe.                                                           | 1
CAMUNDA_OPTIMIZE_SHARING_ENABLED | Disables the sharing feature (this is not currently supported).                                         | false
CAMUNDA_OPTIMIZE_UI_LOGOUT_HIDDEN | Disables the logout button (logout is handled by IAM).                                                  | 1

## Requirements

Self-Managed Optimize must be able to connect to Elasticsearch to write and read data. In addition, Optimize needs to connect to IAM for authentication purposes. Both of these requirements can be configured with the options described above.

Optimize must also be configured as a client in IAM, and users will only be granted access to Optimize if they have a role
that has `write:*` permission for Optimize.

For Optimize to import Zeebe data, Optimize must also be configured to be aware of the record prefix used when the records are exported to Elasticsearch. This can also be configured per the example above.
