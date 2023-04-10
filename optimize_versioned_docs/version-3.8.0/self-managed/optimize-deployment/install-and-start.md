---
id: install-and-start
title: "Installation"
description: "Install and configure Optimize Self-Managed."
---

## Camunda Platform 8 stack

Please refer to the [Installation Guide]($docs$/self-managed/platform-deployment/platform-8-deployment/) for details on how to install Optimize as part of a Camunda 8 stack.

## Camunda Platform 7 Enterprise stack

<span class="badge badge--platform">Camunda Platform 7 only</span>

This document describes the installation process of the Camunda Optimize and connect it to a Camunda 7 stack, as well as various configuration possibilities available after initial installation.

Before proceeding with the installation, read the article about [supported environments]($docs$/reference/supported-environments).

### Local installation

If you wish to run Camunda Optimize natively on your hardware you can download one of the two offered distributions and run them. Especially the demo distribution might be useful to try out Camunda Optimize the first time, it also comes with a simple demo process to explore the functionality.

#### Prerequisites

If you intend to run Optimize on your local machine, ensure you have a supported JRE (Java Runtime Environment) installed; best refer to the [Java Runtime]($docs$/reference/supported-environments#camunda-platform-8-self-managed) section on which runtimes are supported.

#### Demo Distribution with Elasticsearch

The Optimize Demo distribution comes with an Elasticsearch instance. The supplied Elasticsearch server is not customized or tuned by Camunda in any manner. It is intended to make the process of trying out Optimize as easy as possible. The only requirement in addition to the demo distribution itself is a running engine (ideally on localhost).

To install the demo distribution containing Elasticsearch, download the archive with the latest version from the [download page](https://docs.camunda.org/enterprise/download/#camunda-optimize) and extract it to the desired folder. After that, start Optimize by running the script `optimize-demo.sh` on Linux and Mac:

```bash
./optimize-demo.sh
```

or `optimize-demo.bat` on Windows:

```batch
.\optimize-demo.bat
```

The script ensures that a local version of Elasticsearch is started and waits until it has become available. Then, it starts Optimize, ensures it is running, and automatically opens a tab in a browser to make it very convenient for you to try out Optimize.

In case you need to start an Elasticsearch instance only, without starting Optimize (e.g. to perform a reimport), you can use the `elasticsearch-startup.sh` script:

```bash
./elasticsearch-startup.sh
```

or `elasticsearch-startup.bat` on Windows:

```batch
.\elasticsearch-startup.bat
```

#### Production distribution without Elasticsearch

This distribution is intended to be used in production. To install it, first [download](https://docs.camunda.org/enterprise/download/#camunda-optimize) the production archive, which contains all the required files to startup Camunda Optimize without Elasticsearch. After that, [configure the Elasticsearch connection](./configuration/getting-started.md#elasticsearch-configuration) to connect to your pre-installed Elasticsearch instance and [configure the Camunda Platform 7 connection](./configuration/getting-started.md#camunda-platform-7-configuration) to connect Optimize to your running engine. You can then start your Optimize instance by running the script `optimize-startup.sh` on Linux and Mac:

```bash
./optimize-startup.sh
```

or `optimize-startup.bat` on Windows:

```batch
.\optimize-startup.bat
```

### Dockerized installation

The Optimize Docker images can be used in production. They are hosted on our dedicated Docker registry and are available to enterprise customers who bought Optimize only. You can browse the available images in our [Docker registry](https://registry.camunda.cloud) after logging in with your credentials.

Make sure to log in correctly:

```
$ docker login registry.camunda.cloud
Username: your_username
Password: ******
Login Succeeded
```

After that, [configure the Elasticsearch connection](./configuration/getting-started.md#elasticsearch-configuration) to connect to your pre-installed Elasticsearch instance and [configure the Camunda Platform connection](./configuration/getting-started.md#camunda-platform-7-configuration) to connect Optimize to your running engine. For very simple use cases with only one Camunda Engine and one Elasticsearch node, you can use environment variables instead of mounting configuration files into the Docker container:

#### Getting started with the Optimize docker image

##### Full local setup

To start the Optimize docker image and connect to an already locally running Camunda Platform 7 as well as Elasticsearch instance you could run the following command:

```
docker run -d --name optimize --network host \
           registry.camunda.cloud/optimize-ee/optimize:{{< currentVersionAlias >}}
```

##### Connect to remote Camunda Platform 7 and Elasticsearch

If, however, your Camunda Platform 7 as well as Elasticsearch instance reside on a different host, you may provide their destination via the corresponding environment variables:

```
docker run -d --name optimize -p 8090:8090 -p 8091:8091 \
           -e OPTIMIZE_CAMUNDABPM_REST_URL=http://yourCamBpm.org/engine-rest \
           -e OPTIMIZE_ELASTICSEARCH_HOST=yourElasticHost \
           -e OPTIMIZE_ELASTICSEARCH_HTTP_PORT=9200 \
           registry.camunda.cloud/optimize-ee/optimize:{{< currentVersionAlias >}}
```

#### Available environment variables

There is only a limited set of configuration keys exposed via environment variables. These mainly serve the purpose of testing and exploring Optimize. For production configurations, we recommend following the setup in documentation on [configuration using a `environment-config.yaml` file](#configuration-using-a-yaml-file).

The most important environment variables you may have to configure are related to the connection to the Camunda Platform 7 REST API, as well as Elasticsearch:

- `OPTIMIZE_CAMUNDABPM_REST_URL`: The base URL that will be used for connections to the Camunda Engine REST API (default: `http://localhost:8080/engine-rest`)
- `OPTIMIZE_CAMUNDABPM_WEBAPPS_URL`: The endpoint where to find the Camunda web apps for the given engine (default: `http://localhost:8080/camunda`)
- `OPTIMIZE_ELASTICSEARCH_HOST`: The address/hostname under which the Elasticsearch node is available (default: `localhost`)
- `OPTIMIZE_ELASTICSEARCH_HTTP_PORT`: The port number used by Elasticsearch to accept HTTP connections (default: `9200`)

A complete sample can be found within [Connect to remote Camunda Platform 7 and Elasticsearch](#connect-to-remote-camunda-platform-7-and-elasticsearch).

Furthermore, there are also environment variables specific to the [event-based process](/components/userguide/additional-features/event-based-processes.md) feature you may make use of:

- `OPTIMIZE_CAMUNDA_BPM_EVENT_IMPORT_ENABLED`: Determines whether this instance of Optimize should convert historical data to event data usable for event-based processes (default: `false`)
- `OPTIMIZE_EVENT_BASED_PROCESSES_USER_IDS`: An array of user ids that are authorized to administer event-based processes (default: `[]`)
- `OPTIMIZE_EVENT_BASED_PROCESSES_IMPORT_ENABLED`: Determines whether this Optimize instance performs event-based process instance import. (default: `false`)

Additionally, there are also runtime related environment variables such as:

- `OPTIMIZE_JAVA_OPTS`: Allows you to configure/overwrite Java Virtual Machine (JVM) parameters; defaults to `-Xms1024m -Xmx1024m -XX:MetaspaceSize=256m -XX:MaxMetaspaceSize=256m`.

In case you want to make use of the Optimize Public API, you can also set **one** of the following variables:

- `SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_JWK_SET_URI` Complete URI to get public keys for JWT validation, e.g. `https://weblogin.cloud.company.com/.well-known/jwks.json`. For more details see [Public API Authorization](../../apis-tools/optimize-api/optimize-api-authorization.md).
- `OPTIMIZE_API_ACCESS_TOKEN` Secret static shared token to be provided to the secured REST API on access in the authorization header. Will
  be ignored if `SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_JWK_SET_URI` is also set. For more details see [Public API
  Authorization](../../apis-tools/optimize-api/optimize-api-authorization.md).

You can also adjust logging levels using environment variables as described in the [logging configuration](./configuration/logging.md).

#### License key file

If you want the Optimize Docker container to automatically recognize your [license key file](./configuration/license.md), you can use standard [Docker means](https://docs.docker.com/storage/volumes/) to make the file with the license key available inside the container. Replacing the `ABSOLUTE_PATH_ON_HOST_TO_LICENSE_FILE` with the absolute path to the license key file on your host can be done with the following command:

```
docker run -d --name optimize -p 8090:8090 -p 8091:8091 \
           -v ABSOLUTE_PATH_ON_HOST_TO_LICENSE_FILE:/optimize/config/OptimizeLicense.txt:ro \
           registry.camunda.cloud/optimize-ee/optimize:{{< currentVersionAlias >}}
```

#### Configuration using a yaml file

In a production environment, the limited set of [environment variables](#available-environment-variables) is usually not enough so that you want to prepare a custom `environment-config.yaml` file. Refer to the [Configuration](./configuration/system-configuration.md) section of the documentation for the available configuration parameters.

You need to mount this configuration file into the Optimize Docker container to apply it. Replacing the `ABSOLUTE_PATH_ON_HOST_TO_CONFIGURATION_FILE` with the absolute path to the `environment-config.yaml` file on your host can be done using the following command:

```
docker run -d --name optimize -p 8090:8090 -p 8091:8091 \
           -v ABSOLUTE_PATH_ON_HOST_TO_CONFIGURATION_FILE:/optimize/config/environment-config.yaml:ro \
           registry.camunda.cloud/optimize-ee/optimize:{{< currentVersionAlias >}}
```

In managed Docker container environments like [Kubernetes](https://kubernetes.io/), you may set this up using [ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/).

### Usage

You can start using Optimize right away by opening the following URL in your browser: [http://localhost:8090](http://localhost:8090)

Then, you can use the users from the Camunda Platform 7 to log in to Optimize. For details on how to configure the user access, consult the [user access management](./configuration/user-management.md) section.

## Next steps

To get started configuring the Optimize web container, Elasticsearch, Camunda Platform 7, Camunda Platform 8, and more, visit the [getting started section](./configuration/getting-started.md) of our configuration documentation.
