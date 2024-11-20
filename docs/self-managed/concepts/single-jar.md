---
id: single-jar
title: "Single JAR"
description: "Learn about the self-managed single JAR"
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

- The focus is on the orchestration cluster, including Connectors, Identity, Operate, Optimize, Tasklist, and Zeebe.

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

Any of the following are just recommendations for the minimum viable setup, the sizing heavily depends on your use cases and usage. It is recommended to understand the documentation on [sizing your environment](https://docs.camunda.io/docs/next/components/best-practices/architecture/sizing-your-environment/) and run benchmarking to confirm your required needs.

#### Host

- Variable amount of host systems
  - **1** minimum and **3** minimum for high availability (HA)

Per host:

- Minimum of **4** CPU cores (**amd64** / **arm64**)
- Minimum of **8** GB of Memory
- **32** GB SSD disk (**1,000** IOPS)
  - We advise against using "burstable" disk types because of their inconsistent performance.

Example of cloud provider options:

- **Azure**: <!-- TODO: actually don't have a good recommendation atm, probably d series with an external premium v2 disk -->
- **AWS**: The general purpose [m series](https://aws.amazon.com/ec2/instance-types/) in minimum `xlarge`.
- **GCP**: The general purpose [n series](https://cloud.google.com/compute/docs/general-purpose-machines#n1_machines) in minimum `standard-4`.

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

- Java Virtual Machine, see [supported environments](./../../reference/supported-environments.md) for version details.

### Database

- Elasticsearch / OpenSearch, see [supported environments](./../../reference/supported-environments.md) for version details.

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

## Configuration

Configuration for the Single JAR deployment can be managed either through the `application.yml` file or via environment variables. This flexibility allows you to choose the method that best fits your deployment and operational practices.

For a comprehensive list of configuration options for each component, refer to each component mentioned in [self-managed](https://docs.camunda.io/docs/next/self-managed/about-self-managed/). The documentation provides detailed information on all available settings and how to apply them.

The following components comprise the single jar and are configured via a single `application.yml`:

- [Identity](#TODO)
- [Operate](./../operate-deployment/operate-configuration.md)
- [Optimize](#TODO)
- [Tasklist](./../tasklist-deployment/tasklist-configuration.md)
- [Zeebe](./../zeebe-deployment/configuration/configuration.md)

The `Connectors` are standalone and can be configured as outline in their [respective documentation](./../connectors-deployment/connectors-configuration.md).

### Optional: configure license key

Installations of Camunda 8 Self-Managed which require a license can provide their license key to the components as an environment variable:

| Environment variable  | Description                                                          | Default value |
| --------------------- | -------------------------------------------------------------------- | ------------- |
| `CAMUNDA_LICENSE_KEY` | Your Camunda 8 license key, if your installation requires a license. | None          |

:::note
Camunda 8 components without a valid license may display **Non-Production License** in the navigation bar and issue warnings in the logs. These warnings have no impact on startup or functionality, with the exception that Web Modeler has a limitation of five users. To obtain a license, visit the [Camunda Enterprise page](https://camunda.com/platform/camunda-platform-enterprise-contact/).
:::

## Sizing Guidelines

## Upgrades

<!-- TODO: No idea -->

<!-- zero-downtime? -->

## Reference implementations

Designed and tested for default setups with the minimum required sizing in mind while support high availability.

- AWS EC2
