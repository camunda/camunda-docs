---
id: install
title: "Camunda manual installation on local machine"
sidebar_label: "Install"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page guides you through the manual installation of the Camunda 8 on a local or virtual machine.

## Prerequisites

- Bare Metal / Virtual Machine
  - Operating system:
    - Linux
    - Windows/macOS (development only, not supported for production)
  - Java Virtual Machine, see [supported environments](/reference/supported-environments.md) for version details
  - Make sure to configure the web applications to use a port that is available. By default the Orchestration Cluster listens on port 8080.
- Secondary datastore
  - Elasticsearch / AWS OpenSearch, see [supported environments](/reference/supported-environments.md) for version details
    - Explore available deployment options of Elasticsearch in their [documentation](https://www.elastic.co/docs/deploy-manage/deploy)

See also the [Manual Reference Architecture](/self-managed/reference-architecture/manual#requirements) for suggested minimum hardware requirements and networking.

:::tip

There are known performance limitations on systems that use `musl` instead of `glibc`, which Java often relies on for running native libraries. For example, Alpine Linux, which uses `musl`, has shown performance degradation of up to 20% compared to Debian or Ubuntu in benchmark tests.

:::

### Artifacts

You can download the required Camunda 8 artifact from the following locations:

Orchestration Cluster:

- named like `camunda-zeebe-x.y.z.(zip|tar.gz)`
- [Maven Central](https://central.sonatype.com/artifact/io.camunda/camunda-zeebe/versions) (via "Browse")
- [Artifactory](https://artifacts.camunda.com/ui/native/zeebe/io/camunda/camunda-zeebe/)
- [GitHub](https://github.com/camunda/camunda/releases)

Connectors:

- Bundle (pre-bundled with connectors by Camunda)
  - named like `connector-runtime-bundle-x.y.z-with-dependencies.jar`
  - [Maven Central](https://central.sonatype.com/artifact/io.camunda.connector/connector-runtime-bundle/versions) (via "Browse")
  - [Artifactory](https://artifacts.camunda.com/ui/native/zeebe/io/camunda/connector/connector-runtime-bundle/)
- Runtime-only
  - named like `connector-runtime-application-x.y.z.jar`
  - [Maven Central](https://central.sonatype.com/artifact/io.camunda.connector/connector-runtime-application/versions) (via "Browse")
  - [Artifactory](https://artifacts.camunda.com/ui/native/zeebe/io/camunda/connector/connector-runtime-application/)

:::note

Some out-of-the-box connectors are licensed under the [Camunda Self-Managed Free Edition license](https://camunda.com/legal/terms/cloud-terms-and-conditions/camunda-cloud-self-managed-free-edition-terms/). Find an overview in the [Connectors Bundle project](https://github.com/camunda/connectors-bundle).

:::

## Reference Architecture

- [Amazon EC2](/self-managed/installation-methods/helm/cloud-providers/amazon/aws-ec2.md) - A reference architecture built on top of Amazon Web Services (AWS) using Elastic Cloud Compute (EC2) and Ubuntu

## Orchestration Cluster

Learn more about the [Orchestration Cluster](/reference/glossary#orchestration-cluster) in the [architectural overview](/self-manged/reference-architecture#architecture), as well as it's configuration options in the [components section](/self-managed/components/orchestration-cluster/overview/).

### Configure

The default configuration assumes a **single-node Orchestration Cluster** using a **local Elasticsearch instance** as the secondary datastore. If this setup matches your environment, no additional configuration is required.

However, if you plan to:

- Add more nodes to the cluster
- Use a different or external secondary datastore
- Enable Connectors
- Apply a license key

You will need to make targeted configuration changes. The following sections outline the minimum required adjustments for each use case. These changes should be **combined into a single `application.yaml`** under the appropriate configuration keys, or alternatively, exported as **environment variables**.

For detailed configuration options and advanced setup guidance, refer to each component’s documentation under the [components section](/self-managed/components/orchestration-cluster/overview.md).

<Tabs>

  <TabItem value="datastore" label="Datastore" default>

    Depending on your chosen datastore, set the value to either `elasticsearch` or `opensearch`, and remove any fields that are not applicable to your selection.

    Additionally, if your security settings require authentication for the secondary datastore, you must configure both `username` and `password`. Otherwise, these fields should be omitted entirely.

    The following configuration references are based on the official component-specific documentation:

    - [Operate](/self-managed/components/orchestration-cluster/operate/operate-configuration.md#elasticsearch-or-opensearch)
    - [Tasklist](/self-managed/components/orchestration-cluster/tasklist/tasklist-configuration.md#elasticsearch-or-opensearch)
    - [Camunda Exporter](/self-managed/components/orchestration-cluster/zeebe/exporters/camunda-exporter.md#configuration)

    <Tabs>
      <TabItem value="env" label="Environment variables">

      #### Operate – Elasticsearch or OpenSearch Connection

      This configuration defines how Operate connects to the secondary datastore (Elasticsearch or OpenSearch).
      It is also used by the legacy Zeebe exporter.

      :::note

      In new setups, the old exporter is no longer in use. However, it must still be configured to avoid blocking execution during startup.

      :::

      ```bash
      CAMUNDA_OPERATE_DATABASE=elasticsearch|opensearch # defaults to elasticsearch

      # in case of Elasticsearch
      CAMUNDA_OPERATE_ELASTICSEARCH_URL=http://localhost:9200
      CAMUNDA_OPERATE_ELASTICSEARCH_USERNAME=
      CAMUNDA_OPERATE_ELASTICSEARCH_PASSWORD=
      CAMUNDA_OPERATE_ZEEBEELASTICSEARCH_URL=http://localhost:9200
      CAMUNDA_OPERATE_ZEEBEELASTICSEARCH_USERNAME=
      CAMUNDA_OPERATE_ZEEBEELASTICSEARCH_PASSWORD=

      # in case of OpenSearch
      CAMUNDA_OPERATE_OPENSEARCH_URL=http://localhost:9200
      CAMUNDA_OPERATE_OPENSEARCH_USERNAME=
      CAMUNDA_OPERATE_OPENSEARCH_PASSWORD=
      CAMUNDA_OPERATE_ZEEBEOPENSEARCH_URL=http://localhost:9200
      CAMUNDA_OPERATE_ZEEBEOPENSEARCH_USERNAME=
      CAMUNDA_OPERATE_ZEEBEOPENSEARCH_PASSWORD=
      ```

      #### Tasklist – Elasticsearch or OpenSearch Connection

      This configuration defines how Tasklist connects to the secondary datastore (Elasticsearch or OpenSearch).
      It is also used by the legacy Zeebe exporter.

      :::note

      In new setups, the old exporter is no longer in use. However, it must still be configured to avoid blocking execution during startup.

      :::

      ```bash
      CAMUNDA_TASKLIST_DATABASE=elasticsearch|opensearch # defaults to elasticsearch

      # in case of Elasticsearch
      CAMUNDA_TASKLIST_ELASTICSEARCH_URL=http://localhost:9200
      CAMUNDA_TASKLIST_ELASTICSEARCH_USERNAME=
      CAMUNDA_TASKLIST_ELASTICSEARCH_PASSWORD=
      CAMUNDA_TASKLIST_ZEEBEELASTICSEARCH_URL=http://localhost:9200
      CAMUNDA_TASKLIST_ZEEBEELASTICSEARCH_USERNAME=
      CAMUNDA_TASKLIST_ZEEBEELASTICSEARCH_PASSWORD=

      # in case of OpenSearch
      CAMUNDA_TASKLIST_OPENSEARCH_URL=http://localhost:9200
      CAMUNDA_TASKLIST_OPENSEARCH_USERNAME=
      CAMUNDA_TASKLIST_OPENSEARCH_PASSWORD=
      CAMUNDA_TASKLIST_ZEEBEOPENSEARCH_URL=http://localhost:9200
      CAMUNDA_TASKLIST_ZEEBEOPENSEARCH_USERNAME=
      CAMUNDA_TASKLIST_ZEEBEOPENSEARCH_PASSWORD=
      ```

      #### Orchestration Cluster - Elasticsearch or OpenSearch connection

      <!-- TODO: No team has documented this, already reached out -->

      ```bash
      # defaults to elasticsearch
      CAMUNDA_DATABASE_TYPE=elasticsearch|opensearch
      CAMUNDA_DATABASE_URL=http://localhost:9200
      CAMUNDA_DATABASE_USERNAME=
      CAMUNDA_DATABASE_PASSWORD=
      ```

      #### Camunda Exporter

      ```bash
      ZEEBE_BROKER_EXPORTERS_CAMUNDAEXPORTER_CLASSNAME=io.camunda.exporter.CamundaExporter
      ZEEBE_BROKER_EXPORTERS_CAMUNDAEXPORTER_ARGS_CONNECT_TYPE=elasticsearch|opensearch # defaults to elasticsearch
      ZEEBE_BROKER_EXPORTERS_CAMUNDAEXPORTER_ARGS_CONNECT_URL=http://localhost:9200
      ZEEBE_BROKER_EXPORTERS_CAMUNDAEXPORTER_ARGS_CONNECT_USERNAME=
      ZEEBE_BROKER_EXPORTERS_CAMUNDAEXPORTER_ARGS_CONNECT_PASSWORD=
      ```


      </TabItem>
      <TabItem value="spring" label="application.yaml">

      ```yaml
      camunda:
        database:
          type: elasticsearch|opensearch # defaults to elasticsearch
          url: http://localhost:9200
          username:
          password:
        operate:
          database: elasticsearch|opensearch # defaults to elasticsearch
          # in case of Elasticsearch
          elasticsearch:
            url: http://localhost:9200
            username:
            password:
          zeebe-elasticsearch:
            url: http://localhost:9200
            username:
            password:
          # in case of OpenSearch
          opensearch:
            url: http://localhost:9200
            username:
            password:
          zeebe-opensearch:
            url: http://localhost:9200
            username:
            password:
        tasklist:
          database: elasticsearch|opensearch # defaults to elasticsearch
          # in case of Elasticsearch
          elasticsearch:
            url: http://localhost:9200
            username:
            password:
          zeebe-elasticsearch:
            url: http://localhost:9200
            username:
            password:
          # in case of OpenSearch
          opensearch:
            url: http://localhost:9200
            username:
            password:
          zeebe-opensearch:
            url: http://localhost:9200
            username:
            password:

      zeebe:
        broker:
          exporters:
            camunda-exporter:
              class-name: io.camunda.exporter.CamundaExporter
              args:
                connect:
                  type: elasticsesarch|opensearch # defaults to elasticsearch
                  url: http://localhost:9200
                  username:
                  password:
      ```

      </TabItem>
    </Tabs>

  </TabItem>

  <TabItem value="broker" label="Multi Broker">

    The following configuration references are based on the official component-specific documentation:

    - [Zeebe Broker](/self-managed/components/orchestration-cluster/zeebe/configuration/broker.md#zeebebrokercluster)

    The following explores the idea of a three-broker setup.
    When starting with a three-broker setup, ensure that each broker is configured with a unique `Node ID`, starting from `0` and incrementing up to the total number of brokers (e.g., `0`, `1`, `2`). This ID must be unique across the entire Zeebe cluster.

    <Tabs>
      <TabItem value="env" label="Environment variables">

      ```bash
      ZEEBE_BROKER_CLUSTER_CLUSTERSIZE=3
      ZEEBE_BROKER_CLUSTER_INITIALCONTACTPOINTS=HOST_0:26502,HOST_1:26502,HOST_2:26502
      ZEEBE_BROKER_CLUSTER_NODEID=0 # unique ID of this broker node in a cluster. The ID should be between 0 and number of nodes in the cluster (exclusive).
      ```

      </TabItem>
      <TabItem value="spring" label="application.yaml">

      ```yaml
      zeebe:
        broker:
          cluster:
            cluster-size: 3
            initial-contact-points: [HOST_0:26502,HOST_1:26502,HOST_2:26502]
            node-id: 0 # unique ID of this broker node in a cluster. The ID should be between 0 and number of nodes in the cluster (exclusive).
      ```

      </TabItem>
    </Tabs>

  </TabItem>

  <TabItem value="connectors" label="Connectors">

To use Connectors with their full set of capabilities, authentication is required. By default, the Orchestration Cluster uses basic authentication. You can configure the system to automatically create a user with the necessary permissions at startup.

If not configured during startup, the user must be created manually through the Identity UI after deployment.

More about the [configuration options of Identity](/self-managed/components/orchestration-cluster/identity/overview.md).

  <Tabs>
      <TabItem value="env" label="Environment variables">

      ```bash
      CAMUNDA_SECURITY_INITIALIZATION_USERS_1_USERNAME=connectors
      CAMUNDA_SECURITY_INITIALIZATION_USERS_1_PASSWORD=connectors
      CAMUNDA_SECURITY_INITIALIZATION_USERS_1_NAME="Connectors User"
      CAMUNDA_SECURITY_INITIALIZATION_USERS_1_EMAIL=connectors@company.com
      CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES_CONNECTORS_USERS_0=connectors
      ```

      </TabItem>
      <TabItem value="spring" label="application.yaml">

      ```yaml
      camunda:
        security:
          initialization:
            users:
              - username: connectors
                password: connectors
                name: Connectors User
                email: connectors@company.com
            default-roles:
              connectors:
                users:
                  - connectors
      ```

      </TabItem>
    </Tabs>

  </TabItem>

  <TabItem value="license" label="License Key">

Installations of Camunda 8 Self-Managed which require a license can provide their license key in the following ways:

  <Tabs>
    <TabItem value="env" label="Environment variables">

    ```bash
    CAMUNDA_LICENSE_KEY=""
    ```

    </TabItem>
    <TabItem value="spring" label="application.yaml">

    ```yaml
    camunda:
      license:
        key: >-
          --------------- BEGIN CAMUNDA LICENSE KEY ---------------
          [...]
          ---------------  END CAMUNDA LICENSE KEY  ---------------
    ```
    </TabItem>

  </Tabs>

  </TabItem>
</Tabs>

### Run

Once you've downloaded an Orchestration Cluster distribution, extract it into a folder of your choice.

1. Extract it via your favorite GUI or via CLI like

   ```bash
   mkdir -p camunda && unzip camunda-zeebe-x.y.z.zip  -d camunda

   mkdir -p camunda && tar -xzf camunda-zeebe-x.y.z.tar.gz -C camunda
   ```

2. Open the extracted folder
3. Adjust the config in `config/application.yaml` or export the environment variables
4. Navigate to `bin` folder
5. Execute the `camunda.sh` or `camunda.bat` depending on your OS
6. On first access of http://localhost:8080 you will be asked to create an admin user unless configured differently in [identity](/self-managed/components/orchestration-cluster/identity/configuration.md) by using OIDC or similar.

:::note
Camunda 8 components without a valid license may display **Non-Production License** in the navigation bar and issue warnings in the logs. These warnings have no impact on startup or functionality, with the exception that Web Modeler has a limitation of five users. To obtain a license, visit the [Camunda Enterprise page](https://camunda.com/platform/camunda-platform-enterprise-contact/).
:::

### Run as Service

The following has been tested on Ubuntu using [systemd](https://systemd.io/) and the example has to be adjusted to your use cases.
It's utilizing a file with environment variables but could be abstracted to use a `application.yaml` instead.

1. Create a `systemd` service called `camunda.service` and adjust it fit your own paths, user and group in `/lib/systemd/system/camunda.service`.

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/compute/debian/configs/camunda.service
```

2. Change the permissions on `/lib/systemd/system/camunda.service` to `644`

```bash
sudo chmod 644 /lib/systemd/system/camunda.service
```

3. Start the new service

```bash
sudo systemctl daemon-reload
sudo systemctl start camunda.service
```

4. Verify the service status

```bash
systemctl status camunda.service
```

Logs can be viewed via e.g.

```bash
journalctl -e -u camunda
```

### Verify

The logs of the Orchestration Cluster will contain something like the following indicating a successful start:

```bash
[2025-08-05 13:34:51.964] [main] INFO
	org.springframework.boot.web.embedded.tomcat.TomcatWebServer - Tomcat started on port 8080 (http) with context path '/'
  ...
[2025-08-05 13:34:52.006] [main] INFO
	org.springframework.boot.web.embedded.tomcat.TomcatWebServer - Tomcat initialized with port 9600 (http)
[2025-08-05 13:34:52.048] [main] INFO
	org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext - Root WebApplicationContext: initialization completed in 79 ms
[2025-08-05 13:34:52.054] [main] INFO
	org.springframework.boot.actuate.endpoint.web.EndpointLinksResolver - Exposing 17 endpoints beneath base path '/actuator'
[2025-08-05 13:34:52.078] [main] INFO
	org.springframework.boot.web.embedded.tomcat.TomcatWebServer - Tomcat started on port 9600 (http) with context path '/'
[2025-08-05 13:34:52.088] [main] INFO
	io.camunda.application.StandaloneCamunda - Started StandaloneCamunda in 9.376 seconds (process running for 9.817)
```

You can use the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview/) to check the topology of Zeebe.

```bash
# username:password depends on the admin user you created on first startup
curl -u username:password -L 'http://localhost:8080/v2/topology' \
  -H 'Accept: application/json'
```

<details>
  <summary>Example output</summary>
  <summary>

```json
// amount of brokers, size, partitions etc. depends on your configuration
// Example: 1 broker, 3 partitions
{
  "brokers": [
    {
      "nodeId": 0,
      "host": "HOST_0",
      "port": 26501,
      "partitions": [
        {
          "partitionId": 1,
          "role": "leader",
          "health": "healthy"
        },
        {
          "partitionId": 2,
          "role": "leader",
          "health": "healthy"
        },
        {
          "partitionId": 3,
          "role": "leader",
          "health": "healthy"
        }
      ],
      "version": "8.8.0"
    }
  ],
  "clusterSize": 1,
  "partitionsCount": 3,
  "replicationFactor": 1,
  "gatewayVersion": "8.8.0",
  "lastCompletedChangeId": "-1"
}
```

  </summary>

</details>

You can use the actuator endpoint to check the health status of the Orchestration Cluster:

```bash
curl localhost:9600/actuator/health
```

<details>
  <summary>Example output</summary>
  <summary>

```json
{
  "status": "UP",
  "groups": ["liveness", "readiness", "startup", "status"],
  "components": {
    "brokerReady": {
      "status": "UP"
    },
    "brokerStartup": {
      "status": "UP"
    },
    "brokerStatus": {
      "status": "UP"
    },
    "indicesCheck": {
      "status": "UP"
    },
    "livenessState": {
      "status": "UP"
    },
    "readinessState": {
      "status": "UP"
    },
    "searchEngineCheck": {
      "status": "UP"
    }
  }
}
```

  </summary>
</details>

## Connectors

Learn more about the [Connectors](/reference/glossary#connector) in the [architectural overview](/self-manged/reference-architecture#architecture), as well as it's configuration options in the [components section](/self-managed/components/connectors/overview/).

### Configure

When running Connectors on the same machine as the Orchestration Cluster, one has to consider the ports as Connectors will default on `8080` as well.

Additionally, Connectors will need some form of authentication to be able to communicate with the Orchestration Cluster REST API and Zeebe.

By default it will try to connect to `localhost:8080` and `localhost:26500` for the Orchestration Cluster REST API and Zeebe.

<Tabs>
  <TabItem value="env" label="Environment variables">

```bash
SERVER_PORT=9090

CAMUNDA_CLIENT_RESTADDRESS=http://localhost:8080
CAMUNDA_CLIENT_GRPCADDRESS=http://localhost:26500
CAMUNDA_CLIENT_MODE=selfManaged
CAMUNDA_CLIENT_AUTH_METHOD=basic
CAMUNDA_CLIENT_AUTH_USERNAME=connectors
CAMUNDA_CLIENT_AUTH_PASSWORD=connectors
```

  </TabItem>
  <TabItem value="spring" label="application.yaml">

This can be saved as `application.yaml` in the same folder as your `connector-runtime-(application|bundle)-x-y-z(-with-dependencies).jar` resides.

```yaml
server:
  port: 9090

camunda:
  client:
    rest-address: http://localhost:8080
    grpc-address: http://localhost:26500
    mode: selfManaged
    auth:
      method: basic
      username: connectors
      password: connectors
```

  </TabItem>
</Tabs>

More information about the configuration of the Connectors can be found in the [component configuration page](/self-managed/components/connectors/connectors-configuration.md)

### Run

Regardless of whether you downloaded the pre-bundled or the runtime-only version of the Connectors, both behave the same at runtime. They automatically detect and register all connectors available on the classpath during execution. Each connector uses its default configuration as defined via the `@OutboundConnector` or `@InboundConnector` annotations.

Consider the following file structure:

```shell
/home/user/connectors $
├── connector-runtime-(application|bundle)-x.y.z(-with-dependencies).jar
└── my-custom-connector-0.1.0-SNAPSHOT-with-dependencies.jar
```

To start connectors bundle with all custom connectors locally, run:

```shell
java -cp "/home/user/connectors/*" "io.camunda.connector.runtime.app.ConnectorRuntimeApplication"
```

This starts a Zeebe client, registering the defined connector as a job worker. By default, it connects to a local Zeebe instance at port `26500`.

### Run as Service

The following has been tested on Ubuntu using [systemd](https://systemd.io/) and the example has to be adjusted to your use cases.
It's utilizing a file with environment variables but could be abstracted to use a `application.yaml` instead.

1. Create a `systemd` service called `camunda-connectors.service` and adjust it fit your own paths, user and group in `/lib/systemd/system/camunda-connectors.service`.

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/compute/debian/configs/connectors.service
```

2. Change the permissions on `/lib/systemd/system/camunda-connectors.service` to `644`

```bash
sudo chmod 644 /lib/systemd/system/camunda-connectors.service
```

3. Start the new service

```bash
sudo systemctl daemon-reload
sudo systemctl start camunda-connectors.service
```

4. Verify the service status

```bash
systemctl status camunda-connectors.service
```

Logs can be viewed via e.g.

```bash
journalctl -e -u camunda-connectors
```

### Verify

The logs of Connectors will contain something like the following indicating a successful start:

```bash
2025-08-05T14:49:58.641+02:00  INFO 99856 --- [           main] o.s.b.a.e.web.EndpointLinksResolver      : Exposing 3 endpoints beneath base path '/actuator'
2025-08-05T14:49:58.666+02:00  INFO 99856 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port 9090 (http) with context path '/'
2025-08-05T14:49:58.702+02:00  INFO 99856 --- [           main] i.c.c.r.app.ConnectorRuntimeApplication  : Started ConnectorRuntimeApplication in 1.286 seconds (process running for 1.386)
```

You can use the actuator endpoint to check the health status of Connectors:

```bash
curl localhost:9090/actuator/health
```

<details>
  <summary>Example output</summary>
  <summary>

```json
{
  "status": "UP",
  "groups": ["readiness"],
  "components": {
    "camundaClient": {
      "status": "UP"
    },
    "diskSpace": {
      "status": "UP",
      "details": {
        "total": -1,
        "free": -1,
        "threshold": -1,
        "path": "/home/user/connectors/.",
        "exists": true
      }
    },
    "ping": {
      "status": "UP"
    },
    "processDefinitionImport": {
      "status": "UP",
      "details": {
        "operateEnabled": true
      }
    },
    "ssl": {
      "status": "UP",
      "details": {
        "validChains": [],
        "invalidChains": []
      }
    },
    "zeebeClient": {
      "status": "UP",
      "details": {
        "numBrokers": 1,
        "anyPartitionHealthy": true
      }
    }
  }
}
```

  </summary>
</details>

## Management Identity

A local setup of Identity in Camunda 8 is not yet supported out-of-the-box, use [Docker](/self-managed/installation-methods/docker/docker.md) instead.

## Optimize

A local setup in Camunda 8 is not yet supported out-of-the-box, use [Docker](/self-managed/installation-methods/docker/docker.md#optimize) instead.

## Web Modeler

A local setup of Web Modeler in Camunda 8 is not yet supported out-of-the-box, use [Docker](/self-managed/installation-methods/docker/docker.md) instead.
