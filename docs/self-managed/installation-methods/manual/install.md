---
id: install
title: "Camunda manual installation"
sidebar_label: "Install"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page guides you through the manual installation of Camunda 8 on a local machine, bare metal server, or virtual machine.

## Prerequisites

- Bare metal or virtual machine
  - Operating system:
    - Linux
    - Windows, macOS, and other operating systems are supported for development only and not for production.
  - Java Virtual Machine. See [supported environments](/reference/supported-environments.md) for version details.
  - Configure the web applications to use an available port. By default, the Orchestration Cluster listens on port 8080.
- Secondary datastore
  - Elasticsearch or Amazon OpenSearch. See [supported environments](/reference/supported-environments.md) for version details.
    - For Elasticsearch deployment options, see the [Elasticsearch documentation](https://www.elastic.co/docs/deploy-manage/deploy).

For suggested minimum hardware requirements and networking, see the [manual reference architecture requirements](/self-managed/reference-architecture/manual.md#requirements).

:::tip Performance on musl-based distributions

There are known performance limitations on systems that use `musl` instead of `glibc`, because Java relies on `glibc` for running native libraries. For example, Alpine Linux, which uses `musl`, has shown performance degradation of up to 20% compared to Debian or Ubuntu in benchmark tests.

:::

:::warning Unsupported components

The following components are not supported for manual installation:

- Management Identity
- Optimize
- Web Modeler

To install these components, use one of the supported methods:

- [Install with Docker](/self-managed/installation-methods/docker/docker.md)
- [Install on Kubernetes with Helm](/self-managed/installation-methods/helm/index.md)

:::

## Download artifacts

Download the required Camunda 8 artifacts from the following sources. Make sure that all artifacts use the same minor version to ensure compatibility.

Orchestration cluster:

- File names follow the pattern `camunda-zeebe-x.y.z.(zip|tar.gz)`.
- [Maven Central](https://central.sonatype.com/artifact/io.camunda/camunda-zeebe/versions) - Select a version, then click **Browse** to view downloadable files such as `.zip` or `.tar.gz`.
- [Artifactory](https://artifacts.camunda.com/ui/native/zeebe/io/camunda/camunda-zeebe/) - Select a version, then browse the files to download.
- [GitHub](https://github.com/camunda/camunda/releases) - Select a release to download the files.

Connectors:

- Bundle (includes pre-bundled connectors from Camunda)
  - File names follow the pattern `connector-runtime-bundle-x.y.z-with-dependencies.jar`.
  - [Maven Central](https://central.sonatype.com/artifact/io.camunda.connector/connector-runtime-bundle/versions) - Select a version, then click **Browse** to view the `.jar`.
  - [Artifactory](https://artifacts.camunda.com/ui/native/zeebe/io/camunda/connector/connector-runtime-bundle/) - Select a version, then browse the files to download.

- Runtime-only
  - File names follow the pattern `connector-runtime-application-x.y.z.jar`.
  - [Maven Central](https://central.sonatype.com/artifact/io.camunda.connector/connector-runtime-application/versions) - Select a version, then click **Browse** to view the `.jar`.
  - [Artifactory](https://artifacts.camunda.com/ui/native/zeebe/io/camunda/connector/connector-runtime-application/) - Select a version, then browse the files to download.

:::note

Some out-of-the-box connectors are licensed under the [Camunda Self-Managed Free Edition license](https://camunda.com/legal/terms/cloud-terms-and-conditions/camunda-cloud-self-managed-free-edition-terms/). See [Camunda Connectors Bundle project](https://github.com/camunda/connectors-bundle) for an overview.

:::

## Reference architecture

Review the following reference architectures for deployment guidance:

- [Manual reference architecture](/self-managed/reference-architecture/manual.md) - Provides an overview of the environment and requirements.
- [Amazon EC2](/self-managed/installation-methods/manual/cloud-providers/amazon/aws-ec2.md) - A reference architecture built on Amazon Web Services (AWS) using Elastic Compute Cloud (EC2) with Ubuntu, and Amazon OpenSearch as the secondary datastore.

## Orchestration cluster

For background, see the [Orchestration cluster glossary entry](/reference/glossary.md#orchestration-cluster).  
For architecture details, review the [architecture](/self-managed/reference-architecture/reference-architecture.md#architecture).  
For configuration details, see the [Orchestration cluster components](/self-managed/components/orchestration-cluster/overview.md).

### Configure the Orchestration cluster

By default, the configuration uses a single-node Orchestration cluster with a local Elasticsearch instance as the secondary datastore. If this setup matches your environment, no additional configuration is required.

If you plan to:

- Add more nodes to the cluster
- Use a different or external secondary datastore
- Enable Connectors
- Apply a license key

You need to make targeted configuration changes. The following sections outline the minimum required adjustments for each use case. Combine these changes into a single `application.yaml` under the appropriate configuration keys, or export them as environment variables.

For detailed configuration options and advanced setup guidance, refer to each component’s documentation under the [Orchestration cluster section](/self-managed/components/orchestration-cluster/overview.md).

#### Configure the datastore

Set the datastore value to `elasticsearch` or `opensearch`, and remove any fields that do not apply to your selection.

If your security settings require authentication for the secondary datastore, configure both `username` and `password`.
Omit these fields if authentication is not required.

For detailed configuration options, see the following component documentation:

- [Operate configuration for Elasticsearch or OpenSearch](/self-managed/components/orchestration-cluster/operate/operate-configuration.md#elasticsearch-or-opensearch)
- [Tasklist configuration for Elasticsearch or OpenSearch](/self-managed/components/orchestration-cluster/tasklist/tasklist-configuration.md#elasticsearch-or-opensearch)
- [Camunda Exporter configuration](/self-managed/components/orchestration-cluster/zeebe/exporters/camunda-exporter.md#configuration)

<Tabs>
  <TabItem value="env" label="Environment variables">

**Operate connection (Elasticsearch or OpenSearch)**

This configuration defines how Operate connects to the secondary datastore (Elasticsearch or OpenSearch).
It is also used by the legacy Zeebe exporter.

:::note

In new setups, the old exporter is no longer in use. However, you must still configure it to avoid blocking execution during startup.

:::

```bash
CAMUNDA_OPERATE_DATABASE=elasticsearch|opensearch # defaults to elasticsearch

# Elasticsearch
CAMUNDA_OPERATE_ELASTICSEARCH_URL=http://localhost:9200
CAMUNDA_OPERATE_ELASTICSEARCH_USERNAME=
CAMUNDA_OPERATE_ELASTICSEARCH_PASSWORD=
CAMUNDA_OPERATE_ZEEBEELASTICSEARCH_URL=http://localhost:9200
CAMUNDA_OPERATE_ZEEBEELASTICSEARCH_USERNAME=
CAMUNDA_OPERATE_ZEEBEELASTICSEARCH_PASSWORD=

# OpenSearch
CAMUNDA_OPERATE_OPENSEARCH_URL=http://localhost:9200
CAMUNDA_OPERATE_OPENSEARCH_USERNAME=
CAMUNDA_OPERATE_OPENSEARCH_PASSWORD=
CAMUNDA_OPERATE_ZEEBEOPENSEARCH_URL=http://localhost:9200
CAMUNDA_OPERATE_ZEEBEOPENSEARCH_USERNAME=
CAMUNDA_OPERATE_ZEEBEOPENSEARCH_PASSWORD=
```

**Tasklist connection (Elasticsearch or OpenSearch)**

This configuration defines how Tasklist connects to the secondary datastore (Elasticsearch or OpenSearch).
It is also used by the legacy Zeebe exporter.

:::note

In new setups, the old exporter is no longer in use. However, you must still configure it to avoid blocking execution during startup.

:::

```bash
CAMUNDA_TASKLIST_DATABASE=elasticsearch|opensearch # defaults to elasticsearch

# Elasticsearch
CAMUNDA_TASKLIST_ELASTICSEARCH_URL=http://localhost:9200
CAMUNDA_TASKLIST_ELASTICSEARCH_USERNAME=
CAMUNDA_TASKLIST_ELASTICSEARCH_PASSWORD=
CAMUNDA_TASKLIST_ZEEBEELASTICSEARCH_URL=http://localhost:9200
CAMUNDA_TASKLIST_ZEEBEELASTICSEARCH_USERNAME=
CAMUNDA_TASKLIST_ZEEBEELASTICSEARCH_PASSWORD=

# OpenSearch
CAMUNDA_TASKLIST_OPENSEARCH_URL=http://localhost:9200
CAMUNDA_TASKLIST_OPENSEARCH_USERNAME=
CAMUNDA_TASKLIST_OPENSEARCH_PASSWORD=
CAMUNDA_TASKLIST_ZEEBEOPENSEARCH_URL=http://localhost:9200
CAMUNDA_TASKLIST_ZEEBEOPENSEARCH_USERNAME=
CAMUNDA_TASKLIST_ZEEBEOPENSEARCH_PASSWORD=
```

**Orchestration cluster connection (Elasticsearch or OpenSearch)**

  <!-- TODO: No team has documented this, already reached out -->

```bash
# defaults to elasticsearch
CAMUNDA_DATABASE_TYPE=elasticsearch|opensearch
CAMUNDA_DATABASE_URL=http://localhost:9200
CAMUNDA_DATABASE_USERNAME=
CAMUNDA_DATABASE_PASSWORD=
```

**Camunda Exporter**

Required for Zeebe to export data to the secondary datastore, which is then used by Operate and Tasklist.

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
    # Elasticsearch
    elasticsearch:
      url: http://localhost:9200
      username:
      password:
    zeebe-elasticsearch:
      url: http://localhost:9200
      username:
      password:
    # OpenSearch
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
    # Elasticsearch
    elasticsearch:
      url: http://localhost:9200
      username:
      password:
    zeebe-elasticsearch:
      url: http://localhost:9200
      username:
      password:
    # OpenSearch
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
            type: elasticsearch|opensearch # defaults to elasticsearch
            url: http://localhost:9200
            username:
            password:
```

  </TabItem>
</Tabs>

#### Configure a multi-broker cluster

This example shows a 3-broker cluster.

- Set `cluster-size` to `3`.
- Assign a unique `node-id` to each broker, starting from `0` and incrementing up to the total number of brokers (`0`, `1`, `2`).
- Use the same `initial-contact-points` on all brokers.

For more details, see the [Zeebe broker cluster configuration](/self-managed/components/orchestration-cluster/zeebe/configuration/broker.md#zeebebrokercluster).

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
      initial-contact-points: [HOST_0:26502, HOST_1:26502, HOST_2:26502]
      node-id: 0 # unique ID of this broker node in a cluster. The ID should be between 0 and number of nodes in the cluster (exclusive).
```

  </TabItem>
</Tabs>

#### Configure Connectors authentication

Connectors require authentication to use their full capabilities. By default, the Orchestration cluster uses basic authentication. You can configure the cluster to automatically create a user with the necessary permissions at startup.

If you don’t configure a user at startup, create one manually in the Identity UI after deployment.

For more details, see [Identity configuration overview](/self-managed/components/orchestration-cluster/identity/overview.md).

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

#### Configure the license key

If your Camunda 8 Self-Managed installation requires a license, provide the license key in one of the following ways:

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

### Run the Orchestration cluster

Once you've downloaded the Orchestration cluster distribution, extract it into a folder.

1. Extract the files using your GUI or CLI:

   ```bash
   mkdir -p camunda && unzip camunda-zeebe-x.y.z.zip  -d camunda

   mkdir -p camunda && tar -xzf camunda-zeebe-x.y.z.tar.gz -C camunda
   ```

2. Open the extracted folder.
3. Update the configuration in `config/application.yaml`, or export the environment variables.
4. Navigate to `bin` folder.
5. Run `camunda.sh` (Linux/macOS) or `camunda.bat` (Windows).
6. Open [http://localhost:8080](http://localhost:8080). On first access, you’ll be asked to create an admin user unless [Identity](/self-managed/components/orchestration-cluster/identity/configuration.md) is configured with OIDC or a similar option.

:::note
Camunda 8 components without a valid license may display **Non-Production License** in the navigation bar and issue warnings in the logs. These warnings don’t affect startup or functionality, except that Web Modeler is limited to five users. To obtain a license, visit the [Camunda Enterprise page](https://camunda.com/platform/camunda-platform-enterprise-contact/).
:::

### Run the Orchestration cluster as a service

This example shows how to run the Orchestration cluster as a [`systemd`](https://systemd.io/) service on Ubuntu. Adjust the paths, user, and group as needed for your environment. The example uses a file with environment variables, but you can adapt it to use an `application.yaml` instead.

1. Create a `systemd` service file named `camunda.service` and adjust it fit your own paths, user and group in `/etc/systemd/system/camunda.service`.

   ```bash reference
   https://github.com/camunda/camunda-deployment-references/blob/main/generic/compute/debian/configs/camunda.service
   ```

2. Change the permissions on `/etc/systemd/system/camunda.service` to `644`:

   ```bash
   sudo chmod 644 /etc/systemd/system/camunda.service
   ```

3. Reload `systemd` and start the new service:

   ```bash
   sudo systemctl daemon-reload
   sudo systemctl start camunda.service
   ```

4. Verify that the service is running:

   ```bash
   systemctl status camunda.service
   ```

View logs with:

```bash
journalctl -e -u camunda
```

### Verify the Orchestration cluster

Check the logs for a successful startup message, such as:

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

Check the cluster topology with the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md):

```bash
# replace username and password with the details of the admin user you created on first startup
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

Check the health status of the Orchestration cluster with the actuator endpoint:

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

For background, see the [Connectors glossary entry](/reference/glossary.md#connector).  
For architecture details, review the [architecture](/self-managed/reference-architecture/reference-architecture.md#architecture).  
For configuration options, see the [Connectors components documentation](/self-managed/components/connectors/overview.md).

### Configure Connectors

If you run Connectors on the same machine as the Orchestration cluster, change the default port (`8080`) to avoid conflicts.

Connectors require authentication to communicate with the Orchestration cluster REST API and Zeebe.

By default, Connectors connect to:

- `localhost:8080` (Orchestration cluster REST API)
- `localhost:26500` (Zeebe)

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

Save the following as `application.yaml` in the same folder as your `connector-runtime-(application|bundle)-x-y-z(-with-dependencies).jar`.

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

For more information about the configuration of the Connectors, see [Connectors configuration](/self-managed/components/connectors/connectors-configuration.md)

### Run Connectors

Both the pre-bundled and runtime-only versions of the Connectors behave the same at runtime. They automatically detect and register all connectors available on the classpath during execution. Each connector uses its default configuration as defined by the `@OutboundConnector` or `@InboundConnector` annotations.

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

### Run Connectors as a service

This example shows how to run the Connectors as a [`systemd`](https://systemd.io/) service on Ubuntu. Adjust the paths, user, and group as needed for your environment.

The example uses a file with environment variables, but you can adapt it to use an `application.yaml` instead.

1. Create a `systemd` service file named `camunda-connectors.service` and adjust it fit your own paths, user and group in `/etc/systemd/system/camunda-connectors.service`.

   ```bash reference
   https://github.com/camunda/camunda-deployment-references/blob/main/generic/compute/debian/configs/camunda-connectors.service
   ```

2. Change the permissions on `/etc/systemd/system/camunda-connectors.service` to `644`:

   ```bash
   sudo chmod 644 /etc/systemd/system/camunda-connectors.service
   ```

3. Reload `systemd` and start the service:

   ```bash
   sudo systemctl daemon-reload
   sudo systemctl start camunda-connectors.service
   ```

4. Verify that the service is running:

   ```bash
   systemctl status camunda-connectors.service
   ```

View logs with:

```bash
journalctl -e -u camunda-connectors
```

### Verify Connectors

Check the logs for a successful startup message, such as:

```bash
2025-08-05T14:49:58.641+02:00  INFO 99856 --- [           main] o.s.b.a.e.web.EndpointLinksResolver      : Exposing 3 endpoints beneath base path '/actuator'
2025-08-05T14:49:58.666+02:00  INFO 99856 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port 9090 (http) with context path '/'
2025-08-05T14:49:58.702+02:00  INFO 99856 --- [           main] i.c.c.r.app.ConnectorRuntimeApplication  : Started ConnectorRuntimeApplication in 1.286 seconds (process running for 1.386)
```

Check the health status of Connectors with the actuator endpoint:

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

## Next Steps

After setting up your cluster, many users typically do the following:

- [Connect to an identity provider](/self-managed/components/orchestration-cluster/identity/connect-external-identity-provider.md) – integrate with an external identity system for authentication.
- [Secure cluster communication](/self-managed/components/orchestration-cluster/zeebe/security/secure-cluster-communication.md) – protect traffic between cluster nodes.
- [Secure client communication](/self-managed/components/orchestration-cluster/zeebe/security/secure-client-communication.md) – ensure secure communication between clients and the cluster.
