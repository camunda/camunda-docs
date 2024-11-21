---
id: manual
title: "Manual installation on local machine"
sidebar_label: "Manual"
---

<!-- Could also be called manual? -->

<!-- Moving target, may be renamed, different focus, etc. -->

<!-- Day 1 vs Day 2 operations? -->
<!-- Installation vs Operations -->

## Preface

The Single JAR deployment option allows you to run Camunda Platform as a standalone Java application. This method is particularly suited for users who prefer manual deployment on bare metal servers or virtual machines (VMs). It provides full control over the environment and configuration, making it ideal for scenarios where custom setups or specific infrastructure requirements are necessary.

With the Single JAR approach, all necessary components are bundled into a single executable JAR file. This simplifies the deployment process, as you only need to manage one artifact. However, it also means that you are responsible for handling all aspects of the deployment, including installation, configuration, scaling, and maintenance.

Other deployment options, such as containerized deployments or managed services, might offer more convenience and automation. However, the Single JAR method gives you the flexibility to tailor the deployment to your exact needs, which can be beneficial for complex or highly customized environments.

We will later go into the details but be aware that not everything is part of this Single JAR. Have a look at the documentation on the orchestration and management cluster separation. <!-- TODO: add a link reference from reference arch  -->

## Before You Start

Before you begin with the self-managed single JAR setup, please consider the complexity and operational overhead involved. Self-managing your deployment requires a good understanding of infrastructure, networking, and application management. If you are looking for a simpler and more managed solution, you might want to explore [our SaaS offerings](https://camunda.com/platform/) first. SaaS can significantly reduce the burden of maintenance and allow you to focus more on your core business needs.

## Limitations

- The focus is on the orchestration cluster. This includes the single JAR compromised of Identity, Operate, Optimize, Tasklist, and Zeebe. AS well as the Connectors runtime.
- General guidance and examples are with focus on **unix** users but can be adapted by Windows users with the use of e.g. [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) or included `batch` files.

## Target User

<!-- Maybe talk about target users, e.g. facing more mid-size companies for a more sophisticated solution Kubernetes -->

## Architecture

<!-- TODO: include picture when I get access to the draw.io stuff from Hamza. Afterwards describe it
-->

The single jar and manual way of deploying Camunda can be used for either simple architectures or high availability setups. Be aware that maintaining such setups is a lot more work compared to a solution like Kubernetes.

### Components

<!-- Components and how they interact, could be just a subpart of the Architecture -->

## Requirements

Before implementing a reference architecture, review the requirements and guidance outlined below. We are differentiating between `Infrastructure` and `Application` requirements.

### Infrastructure

Any of the following are just suggestions for the minimum viable setup, the sizing heavily depends on your use cases and usage. It is recommended to understand the documentation on [sizing your environment](./../../../../components/best-practices/architecture/sizing-your-environment.md) and run benchmarking to confirm your required needs.

#### Host

- Variable amount of host systems
  - **1** minimum and **3** minimum for high availability (HA)

Per host:

- Minimum of **4** CPU cores (**amd64** / **arm64**)
- Minimum of **8** GB of Memory
- **32** GB SSD disk (**1,000** IOPS)
  - We advise against using "burstable" disk types because of their inconsistent performance.

#### Networking

- Stable and high-speed network connection
- Configured firewall rules to allow necessary traffic:
  - **8080**: Web UI / REST endpoint.
  - **9090**: Connector port.
  - **9600**: Metrics endpoint.
  - **26500**: gRPC endpoint.
  - **26501**: Gateway-to-broker communication.
  - **26502**: Inter-broker communication.
- Load balancer for distributing traffic (if required)

:::note
Some ports can be overwritten and are not definitive, you may conduct the [documentation](#TODO) to see how it can be done for the different components, in case you want to use a different port. Or in our example `Connectors` and `Web UIs` overlap on 8080 due to which we moved connectors to a different port.
:::

### Application

- Java Virtual Machine, see [supported environments](./../../../../reference/supported-environments.md) for version details.

### Database

- Elasticsearch / OpenSearch, see [supported environments](./../../../../reference/supported-environments.md) for version details.

Our recommendation is to use an external managed offer as we will not go into detail on how to manage and maintain your database.

## Deployment Model

<!--
Deployment Topology
Describe whether the architecture is single-region, multi-region, or hybrid.
Configuration Guidelines
Best practices for configuring the environment for optimal performance and reliability.
Automation and CI/CD Pipelines
Suggested tooling and workflows for automated deployments and updates.
-->

## Scalability and Performance Considerations

<!--
Maybe we have some information on this in the docs

Scalability Patterns
Recommended patterns for scaling compute, storage, and networking resources.
Load Balancing and Caching
Best practices for distributing traffic and caching data to enhance performance.
Performance Optimization Tips
Tips for optimizing performance across different components.
-->

## Sizing Guidelines

## Running Camunda 8

:::warning

The following is a general approach on running Camunda 8 with the single JAR. It provides a basic framework that can be adapted to various specific use cases. This does not reflect a production ready setup.

For a more detailed example and specific implementation, please refer to the [reference implementation](#reference-implementations).

:::

### Download the artifacts

The single JAR is available as `tar.gz` or `zip` for download via the [release page](https://github.com/camunda/camunda-platform/releases) or via our [artifact storage](https://artifacts.camunda.com/ui/repos/tree/General/public/io/camunda/camunda-zeebe).

All Connector-related resources are available on [Maven Central](https://search.maven.org/search?q=g:io.camunda.connector). Make sure to download `*-jar-with-dependencies.jar` files in order to run Connectors locally including their necessary dependencies. Note that some out-of-the-box Connectors are licensed under the [Camunda Self-Managed Free Edition license](https://camunda.com/legal/terms/cloud-terms-and-conditions/camunda-cloud-self-managed-free-edition-terms/). Find an overview in the [Connectors Bundle project](https://github.com/camunda/connectors-bundle).

### Download and run Elasticsearch

As outline in the architecture, Camunda 8 uses Elasticsearch as its underlying data store. Therefore you have to download and run Elasticsearch.

:::note

Please ensure to check compatibility of [supported environments](./../../../../reference/supported-environments.md) for your self-managed installation.

:::

To run Elasticsearch, execute the following commands:

```shell
cd elasticsearch-*
bin/elasticearch
```

You’ll know Elasticsearch has started successfully when you see a message similar to the following:

```
[INFO ][o.e.l.LicenseService     ] [-IbqP-o] license [72038058-e8ae-4c71-81a1-e9727f2b81c7] mode [basic] - valid
```

### Configuration

Configuration for the Single JAR deployment can be managed either through the `application.yml` file or via environment variables. This flexibility allows you to choose the method that best fits your deployment and operational practices.

For a comprehensive list of configuration options for each component, refer to each component mentioned in [self-managed](./../../../about-self-managed.md). The documentation provides detailed information on all available settings and how to apply them.

The following components comprise the single jar and are configured via a single `application.yml`:

- [Identity](#TODO)
- [Operate](./../../../operate-deployment/operate-configuration.md)
- [Optimize](#TODO)
- [Tasklist](./../../../tasklist-deployment/tasklist-configuration.md)
- [Zeebe](./../../../zeebe-deployment/configuration/configuration.md)

The `Connectors` are standalone and can be configured as outline in their [respective documentation](./../../../connectors-deployment/connectors-configuration.md).

#### Optional: configure license key

Installations of Camunda 8 Self-Managed which require a license can provide their license key to the components as an environment variable:

| Environment variable  | Description                                                          | Default value |
| --------------------- | -------------------------------------------------------------------- | ------------- |
| `CAMUNDA_LICENSE_KEY` | Your Camunda 8 license key, if your installation requires a license. | None          |

:::note
Camunda 8 components without a valid license may display **Non-Production License** in the navigation bar and issue warnings in the logs. These warnings have no impact on startup or functionality, with the exception that Web Modeler has a limitation of five users. To obtain a license, visit the [Camunda Enterprise page](https://camunda.com/platform/camunda-platform-enterprise-contact/).
:::

### Run Camunda 8

Once you've downloaded a Camunda distribution, extract it into a folder of your choice.

To extract the Camunda distribution and start the broker, **Linux users** can type the following:

```shell
tar -xzf camunda-zeebe-X.Y.Z.tar.gz -C camunda/
./bin/camunda
```

Windows users can use the provided `batch` file by either executing it or double-clicking on it.

```shell
./bin/camunda.bat
```

The default configuration comes with the assumption of Elasticsearch running on `localhost` port `9200`, if this differs, please conduct the [configuration](#configuration) of each component to configure the access correctly.

You’ll know Camunda has started successfully when you see a message similar to the following:

```shell
2024-11-21 11:58:42.777 [] [main] [] INFO
      io.camunda.application.StandaloneCamunda - Started StandaloneCamunda in 10.487 seconds (process running for 11.272)
```

You can test the setup by checking the health. as well as access the Web UI.

```shell
curl http://localhost:9600/actuator/health
```

The default credentials for the Web UIs are `demo`/`demo`.

- Operate is available via `http://localhost:8080/operate`.
- Tasklist is available via `http://localhost:8080/tasklist`.

The [REST API](./../../../../apis-tools/camunda-api-rest/camunda-api-rest-overview.md) can be used to programmatically check the cluster topology.

### Run Connectors

#### Bundle

Bundle includes runtime with all available Camunda Connectors.

The [Connector runtime bundle](https://repo1.maven.org/maven2/io/camunda/connector/connector-runtime-bundle/) picks up
outbound Connectors available on the `classpath` automatically.
It uses the default configuration specified by a Connector through its `@OutboundConnector` and `@InboundConnector` annotations.

Consider the following file structure:

```shell
/home/user/bundle-with-connector $
├── connector-runtime-bundle-VERSION-with-dependencies.jar
└── my-custom-connector-0.1.0-SNAPSHOT-with-dependencies.jar
```

To start Connectors bundle with all custom Connectors locally, run:

```shell
java -cp "/home/user/bundle-with-connector/*" "io.camunda.connector.runtime.app.ConnectorRuntimeApplication"
```

This starts a Zeebe client, registering the defined Connector as a job worker. By default, it connects to a local Zeebe instance at port `26500`.

#### Runtime-only

Runtime-only variant is useful when you wish to run only specific Connectors.

The [Connector runtime bundle](https://repo1.maven.org/maven2/io/camunda/connector/connector-runtime-application/) picks up
outbound Connectors available on the `classpath` automatically.
It uses the default configuration specified by a Connector through its `@OutboundConnector` and `@InboundConnector` annotations.

Consider the following file structure:

```shell
/home/user/runtime-only-with-connector $
├── connector-runtime-application-VERSION-with-dependencies.jar
└── my-custom-connector-0.1.0-SNAPSHOT-with-dependencies.jar
```

To start Connector runtime with all custom Connectors locally, run:

```shell
java -cp "/home/user/runtime-only-with-connector/*" "io.camunda.connector.runtime.app.ConnectorRuntimeApplication"
```

This starts a Zeebe client, registering the defined Connector as a job worker. By default, it connects to a local Zeebe instance at port `26500`.

### Run Web Modeler

A local setup of Web Modeler in Camunda 8 is not yet supported out-of-the-box, use [Docker](/self-managed/setup/deploy/other/docker.md#web-modeler) instead.

## Upgrades

<!-- TODO: No idea -->

<!-- zero-downtime? -->

## Reference implementations

Designed and tested for default setups with the minimum required sizing in mind while supporting high availability.

- [AWS EC2](#TODO)
